---
title: "Idempotent Payment Endpoints: Lessons from Production"
description: "Duplicate payments from retry logic cost real money and trust. Idempotency keys prevent them, and most payment APIs get the implementation wrong."
pubDate: 2026-05-24
author: "Bio Lumbantoruan"
tags: ["fintech", "payments", "api-design"]
image: "/images/blog/idempotent-payment-endpoints-production.svg"
draft: false
---

A customer clicks "Pay." The request times out. Their browser retries. Your server processes the same charge twice. The customer sees two deductions. Your support team gets a ticket. Your reconciliation report shows a discrepancy. All because the endpoint lacked idempotency.

I have debugged this scenario in production payment systems. The fix is not disabling retries. Retries are a fact of distributed systems: network timeouts, load balancer failovers, client-side connection drops all trigger them. The fix is designing endpoints that handle duplicate requests without creating duplicate side effects. That mechanism is the idempotency key.

## What Idempotency Means in Payments

An operation is idempotent if executing it once produces the same result as executing it multiple times. `PUT /account/balance { "amount": 100 }` is not idempotent: each call adds 100. `PUT /account/balance { "set_to": 100 }` is idempotent: calling it ten times sets the balance to 100.

In payment APIs, idempotency works differently. You cannot make a charge operation idempotent by design because each charge creates a distinct transaction. Instead, you attach a unique key to each request, and the server remembers: "I processed a request with this key, here is the original response."

The client generates a UUID, sends it as a header (`Idempotency-Key: abc-123`), and the server uses it to deduplicate.

## Why This Matters in Production

Three scenarios cause duplicate requests:

**Client retries.** The payment provider takes 8 seconds to respond. The HTTP client times out at 5 seconds and retries. The first request succeeded, but the client does not know that. Without idempotency, the charge runs twice.

**Network failures.** A load balancer drops a connection mid-response. The client cannot tell if the server processed the request. The safe move is to retry. Without idempotency, that retry creates a duplicate.

**User behavior.** The customer double-clicks the pay button, or the frontend does not disable the button fast enough. Two identical requests arrive within 100ms.

In fintech, duplicates are not a minor inconvenience. They break ledger balances, trigger reconciliation alerts, and require manual correction. In regulated environments, they violate compliance rules.

## The Implementation Pattern

Here is the pattern I use in FastAPI services that handle payments:

```python
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel

class PaymentRequest(BaseModel):
    amount: int          # in cents
    currency: str
    customer_id: str
    description: str

@app.post("/api/payments")
async def create_payment(request: Request, body: PaymentRequest):
    idempotency_key = request.headers.get("Idempotency-Key")

    if not idempotency_key:
        raise HTTPException(
            status_code=400,
            detail="Idempotency-Key header is required"
        )

    # Check if we processed this key before
    cached = await get_cached_response(idempotency_key)
    if cached:
        return cached

    # Check if this key is in-flight
    if await is_key_locked(idempotency_key):
        raise HTTPException(
            status_code=409,
            detail="A request with this key is already being processed"
        )

    # Lock the key to prevent concurrent processing
    await lock_key(idempotency_key)

    try:
        result = await charge_payment(body)
        await cache_response(idempotency_key, result, ttl_hours=48)
        return result
    except Exception:
        # On failure, release the lock so the client can retry
        await release_lock(idempotency_key)
        raise
```

Three parts of this implementation matter:

**The cache check.** Before processing anything, look up the idempotency key. If a response exists, return it. The client gets the same answer whether this is the first request or the tenth.

**The lock.** When two requests with the same key arrive at the same time (double-click), only one should process. The lock prevents the second from creating a duplicate charge while the first is in flight. The second request gets a 409 Conflict.

**The TTL.** Idempotency keys expire. 24 to 48 hours is the standard range. Stripe uses 24 hours. After expiry, the key is forgotten and the same key can be reused. This prevents unbounded storage growth.

## Where the Storage Goes

The cache and lock need to be fast and shared across all instances of your service. Two options:

**Redis.** `SET idempotency:{key} {response} EX 172800` gives you atomic set-with-TTL. For the lock, `SET lock:{key} 1 NX EX 30` works. This is what I use for high-throughput services. Redis is fast, the operations are atomic, and the TTL handles cleanup without a cron job.

**Database table.** An `idempotency_keys` table with columns for the key, request hash, response body, and created_at timestamp. Slower than Redis but viable if you do not have Redis in your stack. Add an index on the key column and a cleanup job that deletes expired rows.

```sql
CREATE TABLE idempotency_keys (
    key            VARCHAR(255) PRIMARY KEY,
    request_hash   VARCHAR(64) NOT NULL,
    response_body  JSONB NOT NULL,
    status         VARCHAR(20) DEFAULT 'completed',
    created_at     TIMESTAMP DEFAULT NOW()
);
```

The `request_hash` column catches a subtle bug: a client reusing an idempotency key with a different request body. If the hash does not match, reject the request with a 422. Something went wrong on the client side.

## A Bug I Shipped: Missing the Request Hash

Early in my payment integration work, I implemented idempotency keys without storing the request body hash. The assumption was that the same key would carry the same request. Then a mobile app bug sent a new payment amount with a cached idempotency key from a previous transaction. The server returned the old response with the old amount, and the customer was charged the wrong value.

The fix was simple: hash the request body on the server, store it with the key, and reject mismatches. The client must generate a new key for each distinct request. This is a rule I now enforce on every payment endpoint.

## Webhooks Need the Same Treatment

Payment providers send webhooks to notify you of status changes, and these arrive multiple times for the same event. The same deduplication principle applies: use the event ID from the webhook payload as your key.

```python
@app.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    event = verify_signature(request)

    if await event_already_processed(event.id):
        return {"status": "ok"}

    await process_event(event)
    await mark_event_processed(event.id)
    return {"status": "ok"}
```

Provider event IDs are unique by design. Stripe guarantees that `evt_1234` refers to one specific event. Use that guarantee instead of generating your own keys for webhook handling.

## When to Require Idempotency Keys

Not every endpoint needs them. My rule: any endpoint that creates a side effect involving money or mutating financial state gets idempotency keys. That covers:

- Charge endpoints
- Refund endpoints
- Transfer endpoints
- Subscription creation

Read-only endpoints (`GET /payments/{id}`) are idempotent by nature. Balance inquiry endpoints do not need keys. For update endpoints, apply judgment: changing a customer email is idempotent if you set the value rather than toggle it.

## The Trade-off

Idempotency keys add a storage layer, a cache lookup on every request, and a lock mechanism. For endpoints processing hundreds of requests per second, this is negligible overhead against a Redis instance. For a low-traffic service, even a database table works fine.

What idempotency keys remove is far more valuable: the operational cost of duplicate charges, manual reconciliation, and customer support tickets filed at odd hours because a network timeout caused a double deduction.

Architecture is about trade-offs, not silver bullets. The idempotency key pattern trades a small amount of infrastructure complexity for a strong guarantee that retries do not become duplicate transactions. For systems that handle money, that trade is worth making on day one.
