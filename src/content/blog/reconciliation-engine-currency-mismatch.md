---
title: "Building a Reconciliation Engine for Currency Mismatch"
description: "Multi-currency transactions break naive reconciliation. I built an engine with threshold-based matching that handles FX rate gaps and rounding without drowning in false positives."
pubDate: 2026-05-25
author: "Bio Lumbantoruan"
tags: ["fintech", "reconciliation", "architecture"]
image: "/images/blog/reconciliation-engine-currency-mismatch.svg"
draft: false
---

A payment gateway settles in USD. Your ledger records the transaction in IDR at the mid-market rate. The provider's settlement arrives 48 hours later at a different rate. The amounts do not match. Your reconciliation report flags a discrepancy. Someone on the finance team spends two hours tracing a $0.47 gap that no one caused and no one can fix.

I have watched this scenario repeat across payment systems. The root cause is the assumption that reconciliation means matching exact amounts. When multiple currencies and FX rates enter the picture, exact matching breaks. You need a reconciliation engine designed for imprecision.

## Why Currency Mismatch Happens

Three forces create mismatches in multi-currency transactions:

**Rate timing.** You authorize a payment at one FX rate and settle at another. The rate moves between those two points. The amounts diverge. In volatile markets, the gap is significant. In stable markets, it is small but nonzero.

**Provider markups.** Payment providers apply their own FX spreads. Your system converts at the mid-market rate. The provider converts at their rate. The difference shows up as a reconciliation gap.

**Rounding differences.** Different systems round at different precision levels. A conversion from USD 100.00 to IDR might produce 1,584,723 in one system and 1,584,720 in another. Three units of discrepancy from rounding rules.

These mismatches are the normal byproduct of converting money across systems that use different rates or precision rules. A reconciliation engine must account for them.

## The Naive Approach (And Why It Fails)

Most teams start with exact matching: compare the transaction amount in the ledger with the settlement amount from the provider. If they match, mark the transaction as reconciled. If not, flag it for manual review.

This works for single-currency systems. In multi-currency flows, it generates false positives. Rate gaps, rounding differences, and provider markups cause mismatches on legitimate transactions. The finance team drowns in tickets for discrepancies that do not indicate problems.

I built a reconciliation engine for a payment system that processes transactions across IDR, USD, SGD, and MYR. Exact matching produced a 40% exception rate. Forty percent of the transactions the engine flagged were not errors. They were currency conversions.

The goal changed: build an engine that distinguishes between expected currency mismatch and genuine discrepancies.

## Designing the Reconciliation Engine

The engine has four layers.

### 1. Normalization

Before comparing anything, normalize both sides to a common currency and precision.

```python
class TransactionNormalizer:
    def normalize(self, txn: Transaction, target_currency: str, rate: float) -> NormalizedAmount:
        if txn.currency == target_currency:
            return NormalizedAmount(
                amount=txn.amount,
                currency=target_currency,
                precision=txn.precision,
            )
        converted = txn.amount * rate
        rounded = round(converted, self.precision_rules[target_currency])
        return NormalizedAmount(
            amount=rounded,
            currency=target_currency,
            precision=self.precision_rules[target_currency],
        )
```

Normalization converts both the ledger entry and the provider settlement to the same currency using a reference rate. The reference rate comes from a rate provider (central bank, Reuters, stored historical rates), not from the payment provider's rate. This creates a neutral comparison baseline.

### 2. Threshold-Based Matching

Instead of requiring exact matches, define acceptable variance thresholds per currency pair and transaction size.

```python
class ThresholdMatcher:
    def __init__(self):
        self.thresholds = {
            ("USD", "IDR"): {"percentage": 0.005, "absolute": 5000},
            ("USD", "SGD"): {"percentage": 0.003, "absolute": 1.00},
            ("USD", "MYR"): {"percentage": 0.003, "absolute": 5.00},
        }

    def match(self, ledger_amount: float, settlement_amount: float, currency_pair: tuple) -> MatchResult:
        threshold = self.thresholds.get(currency_pair)
        if not threshold:
            return MatchResult(status="MANUAL", reason="No threshold defined")

        diff = abs(ledger_amount - settlement_amount)
        pct_diff = diff / max(ledger_amount, settlement_amount)

        if diff <= threshold["absolute"] or pct_diff <= threshold["percentage"]:
            return MatchResult(status="MATCHED", variance=diff)

        return MatchResult(status="EXCEPTION", variance=diff, reason="Exceeds threshold")
```

The threshold has two components: percentage and absolute. Percentage catches proportional gaps from rate movement on large amounts. Absolute catches rounding artifacts on small amounts. A transaction matches if it satisfies either condition.

How do you set thresholds? Pull the last 90 days of FX rate movements between your currency pairs. Calculate the maximum spread between authorization and settlement rates. Add a safety margin. I use the 99th percentile spread multiplied by 1.5 as the starting threshold, then adjust based on false positive rates in production.

### 3. Rate Attribution

When a match succeeds with a variance, the engine records the implied rate. This provides audit trail evidence and helps finance teams understand the gap.

```python
def compute_implied_rate(
    ledger_amount: float, ledger_currency: str,
    settlement_amount: float, settlement_currency: str,
) -> ImpliedRate:
    if ledger_currency == settlement_currency:
        return ImpliedRate(rate=1.0, source="same_currency")
    rate = settlement_amount / ledger_amount
    return ImpliedRate(
        rate=rate,
        source="implied_from_settlement",
        spread_vs_midmarket=rate - get_midmarket_rate(ledger_currency, settlement_currency),
    )
```

The spread versus midmarket tells you how much the provider marked up the conversion. Over time, this data helps you evaluate whether a provider's FX rates are competitive.

### 4. Exception Classification

Not all exceptions carry the same weight. The engine classifies them to route to the right team:

```python
class ExceptionClassifier:
    def classify(self, result: MatchResult, txn: Transaction) -> ExceptionType:
        if result.status != "EXCEPTION":
            return ExceptionType.NONE

        if txn.provider == "internal":
            return ExceptionType.OPERATIONAL

        if result.variance > txn.amount * 0.05:
            return ExceptionType.SUSPICIOUS

        if txn.age_days > 7:
            return ExceptionType.STALE

        return ExceptionType.FX_VARIANCE
```

The classification determines the workflow. `FX_VARIANCE` exceptions route to a finance dashboard for bulk approval. `SUSPICIOUS` exceptions trigger an alert. `STALE` exceptions flag for process review.

## The Reconciliation Pipeline in Practice

Putting the layers together, the pipeline processes a batch of transactions:

```python
async def reconcile_batch(transactions: list[Transaction], rate_provider: RateProvider):
    results = []

    for txn in transactions:
        ledger_rate = rate_provider.get_rate(txn.currency, "USD", txn.auth_date)
        settlement_rate = rate_provider.get_rate(txn.currency, "USD", txn.settlement_date)

        ledger_normalized = normalizer.normalize(txn.ledger_entry, "USD", ledger_rate)
        settlement_normalized = normalizer.normalize(txn.settlement, "USD", settlement_rate)

        match_result = matcher.match(
            ledger_normalized.amount,
            settlement_normalized.amount,
            (ledger_normalized.currency, settlement_normalized.currency),
        )

        if match_result.status == "MATCHED" and match_result.variance > 0:
            match_result.implied_rate = compute_implied_rate(
                txn.ledger_entry.amount, txn.ledger_entry.currency,
                txn.settlement.amount, txn.settlement.currency,
            )

        match_result.exception_type = classifier.classify(match_result, txn)
        results.append(match_result)

    return results
```

The batch runs on a schedule. Hourly for same-day settlement. Daily for T+1 or T+2. Each run processes new settlements against their corresponding ledger entries.

## Lessons from Production

After running this engine across multiple payment services, three observations stand out.

**Thresholds need calibration.** FX markets shift. A threshold that worked in January might be too tight in March during a currency volatility spike. Review thresholds each month and adjust based on the exception rate. Your target is an exception rate under 5% for FX-related transactions.

**Audit every decision.** Every match, threshold comparison, and rate attribution gets logged. When regulators or auditors question a $0.30 variance on a transaction, you have the full trail: the rates used, the threshold applied, the implied spread calculated.

**Separate FX variance from genuine errors.** The biggest win came from routing expected currency mismatches to a different workflow than genuine discrepancies. Before this separation, finance teams treated all exceptions with the same urgency. A 30-cent FX gap received the same investigation as a missing $5,000 settlement. The classification layer fixed this.

## When You Need This

If your system processes transactions in a single currency, exact matching works. Keep it simple.

If your system handles two or more currencies, crosses borders, or uses a payment provider that settles in a different currency than your ledger, you need threshold-based reconciliation. The cost of building it is a few days of engineering. The cost of not building it is a finance team that spends hours each week investigating phantom discrepancies.

Threshold-based reconciliation trades perfect matching (which does not exist in multi-currency systems) for pragmatic matching that handles the noise of FX rates and rounding. For systems that move money across borders, that trade is worth making on day one.
