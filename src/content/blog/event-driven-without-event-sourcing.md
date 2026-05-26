---
title: "Event-Driven Architecture Without Event Sourcing Complexity"
description: "Event-driven doesn't require event sourcing. You can decouple services with lightweight event patterns — no Kafka cluster or distributed systems PhD needed."
pubDate: 2026-05-26
author: "Bio Lumbantoruan"
tags: ["architecture", "event-driven", "design-patterns"]
image: "/images/blog/event-driven-without-event-sourcing.svg"
draft: false
---

Most teams hear "event-driven" and picture Kafka clusters, event sourcing, CQRS, and a three-month ramp-up. That picture costs more than it delivers for most projects.

I built Srabutan's order pipeline on pure event-driven patterns without a single event store. No event sourcing. No Kafka. Just RabbitMQ, a few strategic exchanges, and the outbox pattern. Two years later, I have not regretted that choice once.

## Two Families, One Confusion

Event-driven architecture splits into two families that people keep confusing:

1. **Event notification:** something happened, go check it out
2. **Event-carried state transfer:** something happened, here is all the data

Event sourcing belongs to neither family. It is a persistence pattern where the event log serves as the source of truth. You can build event-driven systems without it.

## When Event Sourcing Earns Its Keep

Event sourcing makes sense when regulators demand full audit trails, when you need temporal queries ("what was the account balance at 3:14 PM last Tuesday?"), or when complex business processes require replay for debugging. Ledgers. Trading platforms. Compliance-heavy domains.

It also demands you model every state change as an immutable event, build projections for querying current state, and manage schema evolution across an append-only log. The operational overhead compounds fast.

## When It Costs More Than It Returns

Skip event sourcing when you want services to react to events without rebuilding state from scratch. When your domain is straightforward CRUD with async workflows. When your team ships features and has no use for a time machine through every state change.

Most backend systems fall into this category. The order service at Srabutan processes payments, reserves inventory, and dispatches notifications — all event-driven, none event-sourced.

## The Patterns I Use Instead

### Outbox Pattern + Message Broker

You write to your database and publish an event. The broker is down. Your event vanishes. The database commit succeeded but the downstream services have no idea anything happened.

The outbox pattern writes the event to a database table inside the same transaction as the business write. A separate worker reads the outbox table and publishes to the broker. One atomic transaction. No distributed coordination.

I run this pattern on most services I build. A PostgreSQL `outbox_events` table, a small Python worker polling every 100ms, and RabbitMQ handling distribution. When a customer places an order in Srabutan, the placement triggers invoice generation, inventory reservation, notification dispatch, and analytics — all through events, none through direct service calls.

### Change Data Capture

Sometimes you cannot modify the source system to emit events. CDC captures database changes at the WAL level and turns them into event streams. Debezium with PostgreSQL is the standard setup. I have used this pattern when hooking legacy systems into event-driven migrations. The source stays untouched. Consumers get real-time updates.

### Plain Pub/Sub With Competing Consumers

Not every event needs a stream. Work distribution often needs nothing more than a fanout exchange for broadcasting or a direct exchange for load balancing. RabbitMQ handles both. Sometimes boring is the right choice.

## What I Refuse to Do

I set retention policies on event streams. Storage costs money and stale data adds noise.

I do not make state changes into events unless they matter to another service. "User updated email address" does not deserve an event.

I do not pretend eventual consistency is free. It carries real costs in user experience and debugging complexity. Name those costs during design review, not during the 2 AM incident call.

## The Real Cost of Over-Engineering

A team I consulted for spent two months setting up Kafka, a schema registry, Avro serialization, and event sourcing — all to power a notification service that sent three emails per day. The architecture consumed more engineering time than the business value it produced.

This happens because conference talks showcase the hard patterns. Nobody gives a keynote about keeping it simple. Nobody flies to a conference to present "we used RabbitMQ and it worked fine."

Event-driven architecture solves one core problem: decoupling. It lets services operate independently. It handles failures through retry and dead-letter queues. It keeps your system responsive when dependencies slow down. None of that needs event sourcing.

Start with the outbox pattern and a message broker. Add event sourcing when the business demands it, not when a conference talk convinces you it is mandatory.
