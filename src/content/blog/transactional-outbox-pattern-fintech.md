---
title: "Why I Use Transactional Outbox in Fintech APIs"
description: "Payment events that vanish between your database and message broker cost real money. The outbox pattern closes that gap without distributed transactions."
pubDate: 2026-05-23
author: "Bio Lumbantoruan"
tags: ["fintech", "architecture", "event-driven"]
image: "/images/blog/transactional-outbox-pattern-fintech.svg"
draft: false
---

A payment completes. The database commits. The service tries to publish an event to your message broker. The broker is down. The event is gone. The customer sees a successful transaction, but the downstream service that sends confirmation emails, updates ledgers, and triggers reconciliation has no idea it happened.

I have seen this exact scenario in production. The fix is not retry logic. The fix is not a distributed transaction. The fix is the transactional outbox pattern, and if you build systems that move money, you should understand it.

## The Problem: Two Systems, One Transaction

Most payment flows do two things in quick succession:

1. Write business state to a database (transaction status, ledger entry, audit record)
2. Publish an event to a message broker (Kafka, RabbitMQ, Redis Streams)

These are two separate systems. There is no atomic way to commit to both at the same time, at least not without two-phase commit, which nobody uses in practice because it couples your database to your broker and kills availability.

So you pick an order. Write to the database first, then publish. But what happens if the publish fails? Your database says the payment succeeded. Your event pipeline says nothing happened. Downstream services are out of sync.

Publish first, then write? If the database write fails, you have events for transactions that never happened. That is worse.

The core problem: you cannot atomically update a database and publish a message to a separate system.

## The Outbox Pattern: Write Once, Relay Later

The solution is straightforward:

1. **Within the same database transaction** that updates your business entities, also write the event to an `outbox` table.
2. A **separate relay process** reads the outbox table and publishes events to the message broker.
3. After successful publish, the relay marks the outbox row as sent (or deletes it).

Both writes, the business entity and the outbox entry, live in the same database. One transaction. One commit. If the transaction rolls back, the outbox entry rolls back too. No phantom events.

Here is what the outbox table looks like in practice:

```sql
CREATE TABLE outbox (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    aggregate_id  VARCHAR(255) NOT NULL,
    event_type  VARCHAR(255) NOT NULL,
    payload     JSONB NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW(),
    published   BOOLEAN DEFAULT FALSE
);

CREATE INDEX idx_outbox_unpublished ON outbox (created_at) WHERE published = FALSE;
```

The `aggregate_id` ties the event back to the entity that produced it. The partial index on `published = FALSE` keeps the relay query fast even as the table grows.

## A Real Example: Payment Status Updates

In a payment gateway I built, the flow looks like this:

```python
async def process_payment(db: AsyncSession, payment_request: PaymentRequest):
    async with db.begin():
        # 1. Create the payment record
        payment = Payment(
            id=uuid4(),
            amount=payment_request.amount,
            currency=payment_request.currency,
            status="COMPLETED",
            provider_ref=provider_response.reference,
        )
        db.add(payment)

        # 2. Write the event to outbox, same transaction
        event = OutboxEvent(
            aggregate_id=str(payment.id),
            event_type="payment.completed",
            payload={
                "payment_id": str(payment.id),
                "amount": payment_request.amount,
                "currency": payment_request.currency,
                "provider_ref": provider_response.reference,
            },
        )
        db.add(event)

    # Transaction commits. Both payment and event are persisted.
    # If the transaction fails, neither exists. Clean.
```

The relay service runs as a background worker. It polls the outbox table (or uses PostgreSQL's `LISTEN/NOTIFY` for near-real-time), publishes to Kafka, and marks rows as published.

If the broker is down, the events sit in the outbox. When the broker recovers, the relay picks them up. No data loss. No reconciliation job. No 2 AM alert about missing events.

## The Relay: Polling vs Tail

There are two common relay strategies:

**Tail-based (CDC):** Use Debezium or a similar change data capture tool to tail the database transaction log (PostgreSQL WAL, MySQL binlog). Events appear in your message broker with sub-second latency. This is the approach I prefer for high-throughput systems. Debezium reads the WAL entry for the outbox table and publishes directly to Kafka.

**Polling:** A worker queries `SELECT * FROM outbox WHERE published = FALSE ORDER BY created_at LIMIT 100` on a timer. Simpler to set up, works with any database, but adds latency (1-5 seconds depending on your poll interval). For payment systems processing a few hundred transactions per minute, polling is adequate and far less operationally complex.

The trade-off is between operational simplicity and latency. In my experience, polling works fine for most payment systems because downstream consumers (ledger updates, notifications) can tolerate a few seconds of delay. If you need sub-second event delivery, CDC is worth the added infrastructure.

## What About Ordering?

Events must be published in the order they were created. The outbox table handles this: order by `created_at` (or an auto-incrementing sequence) and publish sequentially per aggregate.

One nuance: if you have multiple relay instances, you need to ensure ordering per aggregate, not globally. A payment with ID `abc-123` must have its events published in order, but `abc-123` and `def-456` can publish concurrently. Partition your relay work by `aggregate_id` to handle this.

## Idempotency Matters

The relay might publish the same event twice. It could crash after publishing but before marking the row. Downstream consumers must handle duplicate events.

This is where idempotency keys come in. Every outbox event carries a unique `id` (UUID). Consumers use this as an idempotency key: process the event if the ID is new, skip it if already seen. A simple `processed_events` table or a Redis SET does the job.

## When the Outbox Pattern Is Overkill

Not every system needs this. If you are building a CRUD app where an occasional missed event means a delayed notification, the complexity is not justified. A simple retry queue with exponential backoff suffices.

But if you are building systems where event loss means:
- Financial records go out of sync
- Reconciliation requires manual intervention
- Customers see incorrect balances or missing transactions

Then the outbox pattern is not optional. It is infrastructure.

## What I Learned Building This in Production

After implementing the outbox pattern across multiple payment services, three things stand out:

**Schema discipline pays off.** Standardize your outbox table structure across services. Same column names, same payload format. When all services in a domain share the same relay infrastructure, you avoid duplicating operational tooling.

**Monitor the outbox depth.** If unpublished events accumulate, something is wrong with the relay or the broker. A simple metric, `outbox_unpublished_count`, gives you visibility into the health of your event pipeline.

**Keep outbox rows temporary.** Either delete published rows on a schedule or partition the table by time. An unbounded outbox table slows down your relay queries, even with the partial index.

The transactional outbox pattern solves a specific, expensive problem in distributed systems: guaranteeing that database state changes and their corresponding events stay consistent. In fintech, where consistency is money, that guarantee is worth the added complexity.

Architecture is about trade-offs, not silver bullets. The outbox pattern trades a small amount of operational overhead for a strong guarantee that your events never go missing. For systems that handle money, that is a trade I will make every time.
