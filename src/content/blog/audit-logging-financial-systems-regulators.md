---
title: "Financial Audit Logs: What to Record and What Regulators Want"
description: "Most fintech audit logs fail regulatory review because engineers log for debugging, not compliance. Here is what regulators query and how to build for it."
pubDate: 2026-05-27
author: "Bio Lumbantoruan"
tags: ["fintech", "compliance", "architecture", "audit-logging"]
image: "/images/blog/audit-logging-financial-systems-regulators.jpg"
draft: false
---

A regulator sends your company a letter requesting six months of transaction logs for a specific merchant account. You have two weeks to respond. Your logs contain HTTP status codes and request paths, but lack the business context the regulator needs. Your team scrambles through databases, reconstructs events from scattered tables, and delivers a spreadsheet that took three engineers four days to assemble. The regulator rejects it. The timestamps use a different timezone than required.

I have received these requests in fintech systems. The difference between teams that respond in hours and teams that respond in weeks comes down to one design decision: building audit logs for the question, not the error.

## Why Financial Audit Logs Are Different

Application logging serves operations. Stack traces, error rates, latency percentiles. These help you debug and monitor.

Audit logging serves accountability. Who changed this record? When? From which IP? What was the previous value? These questions come from regulators, dispute investigators, and compliance officers.

PCI DSS Requirement 10 states you must "track and monitor all access to network resources and cardholder data." Bank Indonesia and OJK have similar mandates for Indonesian fintech companies. The common thread: regulators want an immutable, queryable record of any action that touches financial data.

Most engineering teams discover this gap during their first regulatory audit, not during planning.

## The Event Taxonomy

Not all events carry the same audit weight. I categorize financial system events into four tiers:

**Tier 1: Mandatory.** These appear in each regulatory request:
- Transaction state changes (created, authorized, captured, refunded, voided)
- Balance modifications (credits, debits, adjustments)
- Permission and role changes
- Login and authentication events
- Data export and bulk operations

**Tier 2: Recommended.** These provide context during investigations:
- API key rotations
- Configuration changes (rate limits, fee structures)
- Webhook deliveries (success and failure)
- Manual overrides and admin actions

**Tier 3: Debugging only.** These belong in application logs, not audit logs:
- Cache invalidation events
- Background job execution
- Service health checks

**Tier 4: Do not log.** These create compliance risk:
- Full card numbers (PAN)
- CVV/CVC codes
- Authentication tokens and session secrets
- Encryption keys
- Full government ID numbers

The taxonomy matters because regulators test scope. If your audit logs contain card numbers, you have expanded your PCI DSS compliance scope to include the audit log storage itself. If your logs lack transaction state changes, you cannot answer the most basic regulatory question.

## What Regulators Ask For

In my experience, regulatory requests follow predictable patterns:

**The "show me the trail" request.** A regulator wants the complete history of a specific transaction, from initiation to final state. They expect to see each status transition, who or what triggered it, the timestamp in UTC, and any error details.

**The "who has access" request.** After a data breach or insider threat incident, regulators request a complete record of permission changes: who granted access, to whom, which resources, and when.

**The "suspicious pattern" request.** A pattern of transactions flagged by your fraud system triggers a review. The regulator wants to see the transaction sequence, the triggering rules, and the resolution path.

Each of these queries targets structured, immutable records with consistent timestamps. Application logs with inconsistent formats and rotating file retention cannot serve these requests.

## The Implementation Pattern

I use a dedicated audit service that writes to an append-only store. The schema looks like this:

```python
from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class AuditAction(str, Enum):
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"
    AUTHORIZE = "authorize"
    CAPTURE = "capture"
    REFUND = "refund"
    VOID = "void"
    EXPORT = "export"

class AuditEvent(BaseModel):
    event_id: str           # UUID
    timestamp: datetime     # UTC, ISO 8601
    action: AuditAction
    actor_id: str           # who performed the action
    actor_type: str         # "user", "system", "api_key"
    resource_type: str      # "transaction", "account", "role"
    resource_id: str        # the record identifier
    previous_state: dict | None  # snapshot before change
    new_state: dict | None       # snapshot after change
    ip_address: str
    user_agent: str
    correlation_id: str     # links to the request trace
    metadata: dict          # action-specific context
```

Three fields deserve explanation:

**`previous_state` and `new_state`.** These capture the before and after of each change. When a transaction moves from "authorized" to "captured," the audit record shows both values. This eliminates the need to reconstruct state from event sequences.

**`correlation_id`.** This links the audit event to your application traces. When debugging, you can jump from the audit log to the distributed trace. When responding to regulators, you can ignore it.

**`actor_type`.** System-initiated actions (cron jobs, background workers) require distinction from human actions. Regulators care about this distinction.

## What to Exclude from State Snapshots

The `previous_state` and `new_state` fields require sanitization. Strip these fields before writing the audit record:

- Card numbers (store only the last four digits and the BIN)
- CVV values
- Passwords or password hashes
- API key secrets
- Full government ID numbers (mask all but the last four characters)

I use a sanitization layer that strips these fields before writing:

```python
SENSITIVE_FIELDS = {
    "card_number": lambda v: f"****{v[-4:]}" if v else None,
    "cvv": lambda _: None,
    "password": lambda _: "[REDACTED]",
    "api_secret": lambda _: "[REDACTED]",
    "id_number": lambda v: f"****{v[-4:]}" if v else None,
}

def sanitize_state(state: dict) -> dict:
    return {
        k: SENSITIVE_FIELDS.get(k, lambda v: v)(v)
        for k, v in state.items()
    }
```

This keeps audit logs useful for compliance without expanding your PCI scope.

## Storage: Append-Only and Immutable

Audit logs must be append-only. No updates, no deletes, no corrections. If an audit record contains an error, you write a correction record that references the original.

I use PostgreSQL with partitioned tables for audit data. Monthly partitions keep query performance stable as the table grows. A separate database user with INSERT-only permissions prevents accidental modifications.

```sql
CREATE TABLE audit_events (
    event_id        UUID PRIMARY KEY,
    timestamp       TIMESTAMPTZ NOT NULL,
    action          VARCHAR(20) NOT NULL,
    actor_id        VARCHAR(100) NOT NULL,
    actor_type      VARCHAR(20) NOT NULL,
    resource_type   VARCHAR(50) NOT NULL,
    resource_id     VARCHAR(100) NOT NULL,
    previous_state  JSONB,
    new_state       JSONB,
    ip_address      INET,
    user_agent      TEXT,
    correlation_id  VARCHAR(100),
    metadata        JSONB
);

-- Monthly partition
CREATE TABLE audit_events_2026_06 PARTITION OF audit_events
    FOR VALUES FROM ('2026-06-01') TO ('2026-07-01');
```

Retention policies vary by regulation. PCI DSS requires at least one year of logs, available for immediate analysis, with a minimum of three months available online. Bank Indonesia requires five years for transaction records. Design your retention policy for the strictest applicable regulation, not the loosest.

## The Query Pattern

When a regulatory request arrives, you need to query by:
- `resource_id` (show me the history of this transaction)
- `actor_id` (show me what this user did)
- `action` (show me all refunds in this period)
- `timestamp` range (show me events between these dates)
- `resource_type` (show me all role changes)

These five query dimensions cover 95% of regulatory requests. Build indexes for all of them. A materialized view that pre-aggregates common queries reduces response time from hours to minutes.

## The Cost of Getting It Wrong

I have seen two failure modes in production:

**Under-logging.** A team logged only errors. When a dispute arose over a transaction that showed as "completed" on the customer end but "failed" on the processor end, there was no audit trail for the state transition. The dispute dragged on for weeks because the team could not prove what happened.

**Over-logging.** Another team logged request and response bodies for each API call, including full card numbers. When PCI compliance auditors reviewed their log storage, the entire logging infrastructure fell into scope. The remediation cost more than building a proper audit system from scratch.

The balance is specific: log enough to reconstruct any financial event's history, sanitize enough to avoid expanding compliance scope, and structure the data so regulators can query it without your engineering team's involvement.

Architecture is about trade-offs, not silver bullets. Audit logging trades storage and indexing overhead for the ability to answer regulatory questions in minutes instead of days. For any system that handles money, that trade pays for itself the first time a compliance officer sends you a request with a deadline.
