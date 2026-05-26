---
title: "Rate Limiting a Payment Gateway in Production"
description: "Token bucket and sliding window solve different problems in payment gateways. I compared both in a live fintech system. Here is when each wins."
pubDate: 2026-05-26
author: "Bio Lumbantoruan"
tags: ["fintech", "payments", "api-design", "backend"]
image: "/images/blog/rate-limiting-payment-gateway-production.jpg"
draft: false
---

A payment gateway without rate limiting is a loaded gun pointed at your provider contract. Stripe charges per request. GoPay and OVO throttle you without warning. Exceed your limits and transactions drop with no error, customers see failures, and your support queue fills up on a Friday night.

I learned this the hard way. One of my marketplace backends sent a burst of 200 payment requests in under a second during a flash sale. The payment provider rejected 140 of them. The ones that got through had no ordering guarantees. Reconciliation that night took four hours instead of twenty minutes.

Rate limiting on a payment gateway is not the same as rate limiting a general API. Payment traffic comes in bursts, carries financial consequences when dropped, and needs to account for downstream provider limits that you do not control.

## Two Algorithms Worth Considering

Most rate limiting discussions cover four or five algorithms. For payment gateways, two matter: token bucket and sliding window log. The others (fixed window, leaky bucket, sliding window counter) have specific weaknesses that make them poor fits for financial traffic.

### Token Bucket

Think of a bucket that holds tokens. Each request removes one token. Tokens refill at a constant rate, up to a maximum capacity (the burst size).

Parameters:
- **Rate:** how many tokens added per second (e.g., 10)
- **Capacity:** maximum tokens the bucket holds (e.g., 50)

A bucket with capacity 50 and rate 10/sec can handle a burst of 50 requests, then sustains 10 requests per second after that. The burst allowance is what makes token bucket useful for payment traffic.

When a flash sale generates a spike of 40 charge requests in one second, the bucket absorbs it. Under steady traffic, the refill rate enforces the sustained limit.

```python
import time
import threading

class TokenBucket:
    def __init__(self, rate: float, capacity: int):
        self.rate = rate
        self.capacity = capacity
        self.tokens = capacity
        self.last_refill = time.monotonic()
        self.lock = threading.Lock()

    def consume(self, tokens: int = 1) -> bool:
        with self.lock:
            now = time.monotonic()
            elapsed = now - self.last_refill
            self.tokens = min(
                self.capacity,
                self.tokens + elapsed * self.rate
            )
            self.last_refill = now

            if self.tokens >= tokens:
                self.tokens -= tokens
                return True
            return False
```

Token bucket has two properties that suit payment gateways:

**Burst tolerance.** Payment traffic is not uniform. A customer checks out, the system processes the charge, sends a confirmation, and then nothing for seconds. Token bucket saves up capacity for these bursts instead of discarding it.

**Memory efficient.** One counter per client. No logs, no timestamps, no arrays. In a gateway handling thousands of distinct API keys, this matters.

The weakness: token bucket allows bursts up to the full capacity. If your downstream provider has a hard "no more than 30 requests in any 60-second window" rule, a token bucket with capacity 50 will violate it during a burst.

### Sliding Window Log

Track every request timestamp in a sorted set. To decide whether to allow a request, count timestamps within the last N seconds. If the count exceeds the limit, reject. If under the limit, add the new timestamp.

```python
import time
import threading

class SlidingWindowLog:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        self.requests: list[float] = []
        self.lock = threading.Lock()

    def allow(self) -> bool:
        with self.lock:
            now = time.monotonic()
            cutoff = now - self.window_seconds

            # Prune old entries
            self.requests = [
                t for t in self.requests if t > cutoff
            ]

            if len(self.requests) < self.limit:
                self.requests.append(now)
                return True
            return False
```

Sliding window log gives you a hard guarantee: no more than N requests in any rolling window. Period. No burst exceptions, no capacity accumulation.

This precision matters when your payment provider enforces a strict per-minute limit. If the contract says "maximum 100 requests per 60 seconds," sliding window log enforces that contract with zero violations.

The trade-off is memory. Every request adds a timestamp. Under high throughput, that sorted set grows. For a gateway processing 500 requests per second per client with a 60-second window, you store 30,000 timestamps per client. With 100 clients, that is 3 million entries in memory.

A variant called sliding window counter reduces this by combining fixed windows with weighted interpolation, but it introduces approximation errors at window boundaries. For financial systems, I prefer the exactness of the full log.

## Where I Use Each

After running both in production payment systems, my rule is:

**Token bucket for upstream rate limiting** (controlling how fast my service sends requests to the payment provider). Payment providers like Stripe document their rate limits as sustained rates with burst allowances. Token bucket maps to this model. A rate of 25 tokens/sec with a capacity of 100 matches Stripe's documented limits for most endpoints.

**Sliding window log for downstream rate limiting** (controlling how many requests clients send to my gateway). My API consumers have contractual limits. A merchant on the basic plan gets 60 requests per minute. I need exact enforcement because overages affect my provider costs. Sliding window log gives me audit-proof enforcement.

```python
from fastapi import FastAPI, Request, HTTPException
from functools import wraps

app = FastAPI()

# Token bucket for upstream (provider-facing)
provider_limiter = TokenBucket(rate=25, capacity=100)

# Sliding window for downstream (client-facing, per API key)
client_limiters: dict[str, SlidingWindowLog] = {}

def get_client_limiter(api_key: str) -> SlidingWindowLog:
    if api_key not in client_limiters:
        client_limiters[api_key] = SlidingWindowLog(
            limit=60, window_seconds=60
        )
    return client_limiters[api_key]

@app.post("/api/payments/charge")
async def create_charge(request: Request):
    api_key = request.headers.get("X-API-Key", "")

    # Downstream check: is this client within their limit?
    limiter = get_client_limiter(api_key)
    if not limiter.allow():
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. Retry after 60 seconds.",
            headers={"Retry-After": "60"}
        )

    # Upstream check: can we send to the provider?
    if not provider_limiter.consume():
        raise HTTPException(
            status_code=503,
            detail="Provider rate limit reached. Please retry.",
            headers={"Retry-After": "5"}
        )

    return await process_charge(request)
```

Two layers, two algorithms, each solving the problem it handles best.

## Distributed Considerations

The implementations above use in-memory state. In production, my gateway runs multiple instances behind a load balancer. Local state does not work.

I move both limiters to Redis.

Token bucket in Redis uses two keys per client: one for the current token count, one for the last refill timestamp. A Lua script makes the read-refill-check-decrement cycle atomic. Redis single-threaded execution guarantees no race conditions.

Sliding window log in Redis uses a sorted set per client, with timestamps as scores. `ZREMRANGEBYSCORE` prunes old entries, `ZCARD` counts current entries, `ZADD` inserts the new timestamp. All three operations run in a Lua script for atomicity.

```lua
-- Sliding window log in Redis (Lua script)
local key = KEYS[1]
local now = tonumber(ARGV[1])
local window = tonumber(ARGV[2])
local limit = tonumber(ARGV[3])

redis.call('ZREMRANGEBYSCORE', key, '-inf', now - window)
local count = redis.call('ZCARD', key)

if count < limit then
    redis.call('ZADD', key, now, now .. '-' .. math.random(1000000))
    redis.call('EXPIRE', key, window)
    return 1
end

return 0
```

The `math.random` suffix on the sorted set member handles the edge case where two requests arrive at the same millisecond. Without it, identical scores would overwrite each other and undercount.

Memory for the sliding window log stays bounded because the `EXPIRE` sets a TTL on the key. When a client stops sending requests, the sorted set evaporates after the window duration. Active clients keep their set, but the pruning ensures it never exceeds the limit plus one.

## The 429 Response Contract

Rate-limited requests should return 429 with a `Retry-After` header. This is not optional. Clients need to know when to retry.

For token bucket, compute retry-after from the deficit: how many tokens short, divided by the refill rate. If the bucket needs 3 more tokens and the rate is 10/sec, retry-after is 0.3 seconds (round up to 1).

For sliding window log, retry-after is the window duration minus the age of the oldest request in the set. When the oldest request in a 60-second window is 45 seconds old, the client waits 15 seconds for it to expire.

I return these values in the response headers and body. Client SDKs parse them and back off without guessing.

## What I Stopped Doing

I used to implement fixed window rate limiting (reset the counter every 60 seconds). The problem is boundary bursts. A client sends 60 requests at second 59 and 60 requests at second 1 of the next window. That is 120 requests in two seconds, and the "60 per minute" limit stayed intact on paper. Payment providers notice this pattern and so should you.

I also stopped using leaky bucket for payment traffic. Leaky bucket processes requests at a fixed rate with no burst allowance. Payment requests are not a steady stream. Forcing them into a constant-rate queue adds latency to bursts without any benefit. Leaky bucket works for traffic shaping on network links. It is the wrong model for financial API gateways.

## Picking Between Them

Use token bucket when:
- Your downstream provider documents burst + sustained limits
- You want memory-efficient rate limiting per API key
- You anticipate burst traffic and consider it acceptable

Use sliding window log when:
- You need exact rolling window enforcement
- Contractual limits have zero tolerance for overages
- Audit trails matter (you can log the sorted set for dispute resolution)

Architecture is about trade-offs, not silver bullets. Token bucket trades precision for efficiency. Sliding window log trades efficiency for precision. In a payment gateway, I need both, so I run both at different layers.

For systems that handle money, one algorithm is seldom the right answer. You need the right algorithm at the right boundary.
