---
title: "PostgreSQL Partial Indexes Cut My Query Time by 60%"
description: "A partial index builds over a subset of your table. I shrank a 2.4 GB index to 180 MB and turned multi-second queries into sub-second ones. Here's when they work and where they backfire."
pubDate: 2026-05-27
author: "Bio Lumbantoruan"
tags: ["postgresql", "database", "performance", "backend"]
image: "/images/blog/postgresql-partial-indexes-cut-query-time.jpg"
draft: false
---

I found the query during a routine performance review on Srabutan's order database. A dashboard pulling pending orders ran 3.8 seconds every time, on a table with 4.2 million rows. The status column had a B-tree index. EXPLAIN ANALYZE confirmed PostgreSQL was using it. The problem was the index itself.

That status index spanned all 4.2 million rows. Only 280,000 orders were pending. The remaining 3.9 million — completed, cancelled, refunded — sat in the index contributing nothing except bloat and slower scans. PostgreSQL walked a 2.4 GB B-tree to find the 180 MB of rows that mattered.

A partial index fixed it. `CREATE INDEX ON orders (created_at) WHERE status = 'pending'` cut index size from 2.4 GB to 180 MB. Query time dropped from 3.8 seconds to 140 milliseconds. Smaller indexes mean fewer pages to scan, less I/O, and faster buffer cache warming. Pages scanned fell from roughly 300,000 to 22,000. Buffer cache hit ratio climbed from 87% to 99.2%.

## What a Partial Index Actually Is

A partial index is an index with a WHERE clause. PostgreSQL builds it over rows matching the predicate and ignores the rest.

```sql
-- Full index: every row, 2.4 GB
CREATE INDEX idx_orders_status ON orders (status);

-- Partial index: pending rows only, 180 MB
CREATE INDEX idx_orders_pending ON orders (created_at)
WHERE status = 'pending';
```

The second index contains entries for pending rows only. Queries that include `WHERE status = 'pending'` can use it. Queries that don't match the predicate skip it.

The predicate does not need to reference the indexed column. You can index `amount` on rows where `status = 'pending'`. The index stores amount values for pending rows, and queries filtering by status plus sorting by amount benefit.

## Three Scenarios Where Partial Indexes Earn Their Keep

### 1. Excluding the Dominant Value

The most common case: a column has one value across 80-95% of rows, and your queries target the minority.

Think `is_deleted = false` covering 98% of rows, where queries filter `WHERE is_deleted = false AND ...`. A full index wastes storage on the dominant value. A partial index on `WHERE is_deleted = false` skips the noise.

In fintech: a transactions table where 92% of rows are `status = 'settled'`. Your fraud detection queries filter `WHERE status IN ('flagged', 'held', 'reversed')`. A partial index on `WHERE status IN ('flagged', 'held', 'reversed')` covers the 8% you care about.

### 2. Partial Unique Constraints

This one doesn't get enough attention. A standard UNIQUE constraint applies to every row. But sometimes you need uniqueness only on a subset.

On Srabutan, each seller can have one active subscription. We track subscription history with a `subscriptions` table:

```sql
CREATE UNIQUE INDEX idx_one_active_sub
ON subscriptions (seller_id)
WHERE status = 'active';
```

This enforces "one active subscription per seller" while allowing unlimited cancelled and expired records. Before this, application code handled the constraint — with all the race conditions that implies.

Another fintech use case: ensure only one pending withdrawal per user, but allow unlimited completed withdrawals for audit history.

### 3. Soft-Delete Filtering Without Application Overhead

Most soft-delete implementations add `WHERE deleted_at IS NULL` to every query. A partial index on `WHERE deleted_at IS NULL` means the index contains live rows only. Queries get faster without changing a line of application code.

## When Partial Indexes Backfire

PostgreSQL's docs warn about this. Creating multiple non-overlapping partial indexes as a partitioning substitute is a trap:

```sql
-- DON'T DO THIS
CREATE INDEX idx_cat_1 ON items (data) WHERE category = 1;
CREATE INDEX idx_cat_2 ON items (data) WHERE category = 2;
CREATE INDEX idx_cat_3 ON items (data) WHERE category = 3;
```

The planner must evaluate each index separately. It doesn't understand they're exclusive. For every query, PostgreSQL tests all N indexes to see which match. This planning overhead often exceeds the scan savings. A single multicolumn index `(category, data)` outperforms this pattern every time.

If your table is large enough that a single index bottlenecks, use table partitioning. PostgreSQL understands partitioned tables and prunes irrelevant partitions at plan time.

Another gotcha: parameterized queries. A prepared statement with `WHERE status = $1` cannot match a partial index with `WHERE status = 'pending'`. The planner needs to prove at plan time that `$1` equals `'pending'`. It can't, because `$1` could be anything. The index sits unused.

## Finding Candidates in Your Database

A simple heuristic to spot partial index opportunities:

1. Find your largest indexes: `SELECT * FROM pg_indexes_size` view or query `pg_stat_user_indexes`
2. Look for columns where one value dominates (80%+)
3. Check if application queries always filter to a specific subset
4. If the subset is under 20% of rows, a partial index will cut index size by roughly 80%

The 60% query time improvement comes from real measurements. On Srabutan's order table, the pending-orders index kept the entire structure in memory. Sequential scans dropped to zero on relevant queries.

## What I'd Do Differently Now

I add partial indexes during schema design, not during performance emergencies. Every table with a dominant status column gets a partial index on the minority value from day one. The storage savings alone justify it. Why allocate gigabytes to rows you never query by that index?

The trade-off is maintenance. If your data distribution shifts — pending orders grow from 7% to 30% of your table — the partial index loses effectiveness. You may need to drop and recreate it with a new predicate, or fall back to a full index. For most workloads, distribution changes slowly enough that this isn't a concern.

Partial indexes sound specialized until you use one. Then you see candidates everywhere: active sessions, unread notifications, flagged transactions, non-archived records. Any column where one value is the default and your queries target the exceptions.

Start with your top three largest indexes. Check if any serve a dominant value. If one does, a partial index will shrink it, speed it up, and cost you five minutes to run `CREATE INDEX CONCURRENTLY`.

Inspired by the [PostgreSQL documentation on partial indexes](https://www.postgresql.org/docs/current/indexes-partial.html).
