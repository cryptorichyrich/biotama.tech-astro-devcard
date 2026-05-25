---
title: "CQRS in Practice: When Textbook Patterns Meet Real Constraints"
description: "CQRS looks elegant in architecture diagrams. In production, it introduces complexity you didn't plan for. Here's what I learned applying it under real constraints."
pubDate: 2026-05-25
author: "Bio Lumbantoruan"
tags: ["architecture", "cqrs", "design-patterns"]
image: "/images/blog/cqrs-in-practice-real-constraints.jpg"
draft: false
---

I first sketched a CQRS architecture on a whiteboard in 2022. Two separate models, clean event streams, a read store that never worried about write contention. It looked beautiful. Six months later, I was debugging sync issues between command and query databases at 2 AM, wondering where the elegance went.

CQRS, Command Query Responsibility Segregation, is one of those patterns that sells itself on a diagram and challenges you in production. The concept is sound: separate your write model from your read model so each can scale and evolve independently. The textbook version involves event sourcing, message buses, eventual consistency, and eventually a system that handles complex domain logic with grace.

The real version involves dealing with stale reads, debugging out-of-order events, and explaining to your team why the data they just wrote isn't visible yet.

## Where CQRS Earns Its Keep

I applied CQRS in a transaction monitoring system for a fintech platform. The write side handled payment commands: create transaction, update status, flag suspicious activity. Each command went through validation, persisted to the primary database, and published an event.

The read side served a different purpose. The dashboard needed to aggregate transaction volumes by merchant, time window, and risk category. The reporting pipeline needed historical trends. The compliance team needed filtered views of flagged transactions.

Running these queries against the write model would have required complex joins across normalized tables, with locks competing against incoming writes. The read model flattened everything into denormalized views optimized for specific query patterns. A single transaction event could update five different read projections, each tuned for a different access pattern.

```python
# Write side: command handler
class CreateTransactionHandler:
    def __init__(self, db: Session, event_bus: EventBus):
        self.db = db
        self.event_bus = event_bus

    async def handle(self, command: CreateTransaction):
        transaction = Transaction(
            id=command.id,
            amount=command.amount,
            currency=command.currency,
            merchant_id=command.merchant_id,
            status="pending",
        )
        self.db.add(transaction)
        await self.db.commit()

        await self.event_bus.publish(TransactionCreated(
            transaction_id=transaction.id,
            amount=transaction.amount,
            currency=transaction.currency,
            merchant_id=transaction.merchant_id,
            created_at=transaction.created_at,
        ))
```

```python
# Read side: projection handler
class TransactionDashboardProjection:
    def __init__(self, read_db: Session):
        self.read_db = read_db

    async def handle(self, event: TransactionCreated):
        # Update merchant volume view
        await self.read_db.execute(
            update(MerchantVolumeView)
            .where(MerchantVolumeView.merchant_id == event.merchant_id)
            .values(
                total_volume=MerchantVolumeView.total_volume + event.amount,
                transaction_count=MerchantVolumeView.transaction_count + 1,
            )
        )
```

This separation paid off. The write database stayed small and normalized. The read databases (we used separate PostgreSQL schemas, not separate servers) handled dashboard queries in under 50ms. When a new report requirement came in, I added a new projection without touching the write side at all.

## Where It Gets Messy

The problems started with consistency.

A merchant submits a payment. The frontend redirects them to a confirmation page. The confirmation page queries the read model. The event hasn't been processed yet. The merchant sees "no transactions found." Support gets a ticket.

This is the eventual consistency tax. The textbook says "design for it." The production reality is that users expect read-after-write consistency, and no amount of architectural purity changes that expectation.

I solved this with a hybrid approach: for the specific flow where the user initiates an action and needs immediate feedback, the frontend queries the write model directly. The read model serves everything else: dashboards, reports, analytics. This creates a split-brain API surface, but it beats the alternative of showing stale data to a user who just submitted something.

```python
# The compromise: conditional read source
@router.get("/transactions/{transaction_id}")
async def get_transaction(
    transaction_id: str,
    source: str = Query("read", enum=["read", "write"]),
    write_db: Session = Depends(get_write_db),
    read_db: Session = Depends(get_read_db),
):
    db = write_db if source == "write" else read_db
    result = await db.get(TransactionView, transaction_id)
    if not result:
        raise HTTPException(404)
    return result
```

The second problem was projection rebuilds. A bug in a projection handler corrupted a read view. I needed to rebuild it from the event log. That sounds simple: replay events from the beginning. In practice, replaying six months of events against a projection that now has a different schema means your rebuild script needs to handle schema migrations applied during that period. I ended up maintaining a separate rebuild pipeline that versioned projection handlers.

The third problem was operational complexity. Two models means two sets of database migrations, two monitoring dashboards, two sets of tests. The cognitive load on the team increased. New developers took longer to understand where to add code because the answer was always "it depends on which side you're working on."

## When I Skip CQRS

After that project, I developed a heuristic: I skip CQRS when the read and write patterns are similar enough that a single model serves both without performance issues.

Most CRUD applications fall into this category. A user management system where reads and writes both touch the same user record with the same fields does not need CQRS. A blog CMS where the read pattern (list posts, show post) maps cleanly to the write pattern (create post, update post) does not need CQRS.

I also skip it when the team is small. CQRS adds architectural overhead that a team of two or three developers will struggle to maintain. The pattern only justifies itself when the complexity it manages exceeds the complexity it introduces.

For the fintech platform, that threshold was crossed when we had three distinct read access patterns (dashboard, reporting, compliance) that each needed different denormalizations of the same transaction data. The write side had complex validation and state machine logic that didn't belong anywhere near those read queries.

## What I Do Instead of Full CQRS

For projects that need read optimization but can't justify the full CQRS investment, I use a pattern I call "read model views." It's a lighter version:

1. Single write database, normalized.
2. Materialized views or database-level computed columns for common read patterns.
3. Application-level caching for hot queries.
4. No event bus, no separate projections, no eventual consistency.

```sql
-- Materialized view for merchant volume reporting
CREATE MATERIALIZED VIEW merchant_daily_volume AS
SELECT
    merchant_id,
    DATE(created_at) AS transaction_date,
    COUNT(*) AS transaction_count,
    SUM(amount) AS total_volume,
    COUNT(*) FILTER (WHERE status = 'flagged') AS flagged_count
FROM transactions
GROUP BY merchant_id, DATE(created_at);

-- Refresh strategy: periodic or on-demand
REFRESH MATERIALIZED VIEW CONCURRENTLY merchant_daily_volume;
```

This gives you 80% of the read optimization benefit with 20% of the operational cost. You trade the ability to evolve read models independently, but for most projects that trade is worth it.

## The Decision Framework

I ask myself three questions before introducing CQRS:

1. **Do reads and writes have fundamentally different shapes?** If the write model is normalized relational data and the read model needs pre-computed aggregates across multiple dimensions, CQRS earns its keep. If they're similar, skip it.

2. **Is eventual consistency acceptable?** If the domain requires the user to see their writes immediately and the read model can't keep up, you need workarounds. Those workarounds add complexity that offsets the pattern's benefits.

3. **Can the team support it?** Two models, two schemas, event replay pipelines, projection rebuild tooling. This is infrastructure, and it needs owners who understand it.

Architecture is about trade-offs, not silver bullets. CQRS solved a real problem for me in transaction monitoring. It also created problems I didn't anticipate. The pattern is a tool, not a goal. Use it when the domain complexity warrants it, and reach for simpler alternatives first.

Read next: [Why I Use Transactional Outbox Pattern in Fintech APIs](/blog/transactional-outbox-pattern-fintech)
