# mKcalling Pricing Structure for Backend Billing App

This document extracts the pricing, estimator, and billing-related rules currently encoded in the mKcalling landing site. It is intended as a backend handoff for a separate billing application where customers can make payments, view connected-minute usage, and manage commercial details.

Source of truth reviewed:

- `src/lib/pricing-estimate.ts` for SMB calculator constants, formulas, and tier selection.
- `src/content/mkcalling/pricingPage.ts` for user-facing labels, disclaimers, enterprise framing, and selectable option values.
- `src/components/pricing-v2/SMBConfigurator.tsx` and `src/components/pricing-v2/EnterpriseConfigurator.tsx` for UI defaults and what users submit.
- `src/lib/pricing-context.ts`, `src/components/InterestForm.tsx`, and `src/app/api/interest/route.ts` for the pricing context payload passed from pricing to sales/demo flows.

## 1. Pricing Model Overview

mKcalling currently has two pricing paths:

1. SMB / Growing Teams: an indicative calculator that recommends one of three tiers and calculates setup, annual channel+DID capacity, monthly connected-minute usage, and first-year / ongoing yearly estimates.
2. Enterprise / High-Volume Teams: a discovery path with a stated implementation starting point and custom monthly / consumption pricing after discovery.

All prices in the landing site are shown as ex-GST unless explicitly stated. GST is shown as 18% additional on taxable supplies. The landing site does not implement GST invoice calculation, checkout, subscriptions, refunds, credits application, or payment gateway integration.

The backend billing app should treat the SMB calculator as an estimator specification, not as a complete billing engine.

## 2. Global Commercial Rules

| Rule | Current value / behavior |
| --- | --- |
| Currency | INR |
| Tax display | All pricing is exclusive of GST unless stated |
| GST rate shown in copy | 18% |
| Metered billing unit | Connected talk time / connected minutes |
| Failed or unanswered calls | Marketing copy says no billing on failed attempts; not modeled in estimator code |
| Minute rounding | UI copy says actual connected call time is used, not rounded up |
| Default monthly estimate period | 30 days |
| Payment gateway | None in this repo |
| Invoice generation | None in this repo |

Backend implication: the billing app needs its own invoice, tax, payment, credit application, and metering implementation. The landing site only provides indicative commercial rules and lead context.

## 3. SMB Pricing Components

### 3.1 Plan Tiers

The SMB estimator recommends one tier from a score. Each tier controls the per-connected-minute usage rate.

| Tier | Per connected minute, ex-GST | User-facing positioning |
| --- | ---: | --- |
| Starter | ₹7/min | Best for teams starting with one focused AI calling workflow |
| Growth | ₹6/min | Best for growing teams that need reliable automation across regular call flow |
| Scale | ₹5/min | Best for operations that need broader automation, higher concurrency, and optimization |

### 3.2 Channel + DID Capacity

Each concurrent path includes one channel and one DID as a bundle.

| Item | Price |
| --- | ---: |
| 1 concurrent path = 1 channel + 1 DID | ₹28,500 / year ex-GST |

Formula:

```text
channelAnnualExGst = effectiveConcurrency * 28,500
channelMonthlyEquivExGst = channelAnnualExGst / 12
```

Important billing note: the UI shows a monthly equivalent for comparison, but the charge is described as billed annually.

### 3.3 One-Time Setup and Workflow Enablement

Setup is calculated after the tier is selected.

| Component | Amount, ex-GST |
| --- | ---: |
| Starter base setup | ₹10,000 |
| Growth base setup | ₹17,500 |
| Scale base setup | ₹28,000 |
| Each additional use case after the first | ₹6,500 |
| Basic complexity add-on | ₹0 |
| Standard complexity add-on | ₹7,500 |
| Advanced complexity add-on | ₹18,500 |
| Each selected optional add-on | ₹4,500 |

Formula:

```text
base = tier setup base
useCaseCount = max(1, selectedUseCases.length)
extraUseCases = (useCaseCount - 1) * 6,500
complexityAdd = 0 | 7,500 | 18,500
addonAdd = selectedAddons.length * 4,500

setupOneTimeExGst = roundToNearest500(
  base + extraUseCases + complexityAdd + addonAdd
)
```

Rounding behavior:

```text
roundToNearest500(n) = Math.round(n / 500) * 500
```

### 3.4 Setup Usage Credit

The one-time setup amount creates a complimentary connected-minute usage credit.

Formula:

```text
freeConnectedMinutesFromSetup = floor(setupOneTimeExGst / perMinuteExGst)
```

Rules shown in the UI:

- Credit applies to metered connected talk time at the customer's tier rate.
- Credit is valid for 3 months from go-live.
- Indicative totals shown in the calculator are before netting this credit against usage.
- Final terms are confirmed in the order.

Backend implication: billing needs a credit ledger with validity dates, applied usage minutes or currency value, and expiry handling. The landing site only calculates the number of complimentary minutes.

### 3.5 Monthly Connected Minutes Estimation

The estimator converts a daily call-volume bucket and average connected call duration into a monthly connected-minute range.

| Daily volume input | Internal low | Internal high |
| --- | ---: | ---: |
| Less than 100 | 25 calls/day | 99 calls/day |
| 100 - 250 | 100 calls/day | 250 calls/day |
| 250 - 500 | 250 calls/day | 500 calls/day |
| 500+ | 500 calls/day | 2,000 calls/day |

Average duration rules:

- UI default: 3 minutes.
- Allowed range: 1 to 15 minutes.
- UI step: 0.5 minutes.
- Estimator clamps to 1-15 minutes.

Formula:

```text
duration = clamp(avgCallDurationMin, 1, 15)
minutesLow = round(dailyLow * duration * 30)
minutesHigh = round(dailyHigh * duration * 30)
```

### 3.6 Monthly Usage Charge

Usage is calculated from estimated connected minutes and the tier rate.

```text
usageMonthlyLowExGst = minutesLow * perMinuteExGst
usageMonthlyHighExGst = minutesHigh * perMinuteExGst
```

The UI labels this as "Usage (connected talk time)" and states that the rate depends on the recommended tier.

### 3.7 Typical Monthly, First-Year, and Ongoing-Year Views

The calculator produces planning views:

```text
typicalMonthlyLowRaw = channelMonthlyEquivExGst + usageMonthlyLowExGst
typicalMonthlyHighRaw = channelMonthlyEquivExGst + usageMonthlyHighExGst

typicalMonthlyExGstLow = roundToNearest500(typicalMonthlyLowRaw)
typicalMonthlyExGstHigh = roundToNearest500(
  max(typicalMonthlyHighRaw, typicalMonthlyLowRaw + 500)
)

ongoingYearExGstLow = roundToNearest500(channelAnnualExGst + usageMonthlyLowExGst * 12)
ongoingYearExGstHigh = roundToNearest500(channelAnnualExGst + usageMonthlyHighExGst * 12)

firstYearExGstLow = roundToNearest500(
  setupOneTimeExGst + channelAnnualExGst + usageMonthlyLowExGst * 12
)
firstYearExGstHigh = roundToNearest500(
  setupOneTimeExGst + channelAnnualExGst + usageMonthlyHighExGst * 12
)
```

Notes:

- First year includes one-time setup, annual bundled capacity, and 12 months of estimated usage.
- Ongoing year excludes one-time setup.
- Typical monthly uses annual channel+DID as a monthly equivalent plus estimated monthly usage.
- These totals are ex-GST.
- Usage credit from setup is not subtracted from these displayed totals.

## 4. SMB Tier Recommendation Algorithm

The tier is selected by scoring daily volume, workflow complexity, effective concurrency, estimated monthly minutes midpoint, use-case count, and add-on count.

### 4.1 Effective Concurrency

The user can select 1, 2, 3, 4, or "Not sure".

When "Not sure" is selected, concurrency is inferred from daily volume:

| Daily volume | Inferred concurrency |
| --- | ---: |
| Less than 100 | 1 |
| 100 - 250 | 2 |
| 250 - 500 | 3 |
| 500+ | 4 |

### 4.2 Score Inputs

Daily volume score:

| Daily volume | Score |
| --- | ---: |
| Less than 100 | 12 |
| 100 - 250 | 28 |
| 250 - 500 | 44 |
| 500+ | 58 |

Complexity score:

| Complexity | Score |
| --- | ---: |
| Basic | 12 |
| Standard | 28 |
| Advanced | 48 |

Concurrency score:

| Effective concurrency | Score |
| --- | ---: |
| 1 | 8 |
| 2 | 22 |
| 3 | 34 |
| 4 | 46 |

Monthly connected-minute midpoint score:

| Midpoint connected minutes / month | Score |
| --- | ---: |
| < 3,750 | 8 |
| < 7,500 | 18 |
| < 15,000 | 32 |
| >= 15,000 | 48 |

Additional score:

```text
score += min(useCaseCount, 6) * 7
score += addonCount * 10
```

### 4.3 Tier Thresholds

```text
if score < 52:
  tier = Starter
else if score < 95:
  tier = Growth
else:
  tier = Scale
```

## 5. SMB Selectable Values

The billing app should preserve the same canonical IDs if it imports estimator selections.

### 5.1 Use Cases

| ID | Label |
| --- | --- |
| lead_qual | Lead qualification / sales calls |
| inbound_support | Inbound support / reception |
| missed_followup | Missed call follow-up |
| collections | Payment reminders / collections |
| appointments | Appointment booking / reminders |
| other | Other |

At least one use case is required in the UI. The default selected use case is `lead_qual`.

### 5.2 Complexity

| ID | Label | Description |
| --- | --- | --- |
| basic | Basic | One simple workflow, limited branching |
| standard | Standard | Two to three workflows, moderate branching, more tuning |
| advanced | Advanced | Multi-step flows, heavier tuning, nuanced handling |

The SMB UI default is `standard`.

### 5.3 Optional Add-Ons

| ID | Label |
| --- | --- |
| crm | CRM integration |
| multilang | Multi-language support |
| reporting | Advanced reporting |
| custom_workflow | Custom workflow design |
| priority | Priority support |
| org_ai_consultation | Organization Level AI Consultation |

Each selected add-on adds ₹4,500 ex-GST to one-time setup.

The estimator marks `integrationLikely = true` when any of these add-ons are selected:

- `crm`
- `custom_workflow`
- `org_ai_consultation`

## 6. Enterprise Pricing

Enterprise does not have an instant public quote or calculator in the landing site.

Current public commercial statement:

- Enterprise implementations start from ₹2,50,000 ex-GST.
- Monthly and consumption billing depends on architecture, usage, security, and support scope.
- GST at 18% applies additionally as applicable.
- Final pricing is confirmed after discovery.

Enterprise discovery inputs:

| Field | Values |
| --- | --- |
| Organization scale | `300_500`, `500_1000`, `1000p`, `multi` |
| Use case domains | `sales`, `support`, `collections`, `verification`, `mixed` |
| Current setup | `human`, `outsourced`, `crm_manual`, `telephony`, `ai_tools` |
| Integration needs | `crm`, `erp`, `webhook`, `dashboards`, `audit` |
| Service expectations | `managed_launch`, `ongoing`, `dedicated`, `define` |

Enterprise engagements are described as potentially including:

- Dedicated or isolated deployment options.
- Advanced knowledge base ingestion and QA.
- Custom CRM, ERP, and internal-system integrations.
- Monitoring, iteration, and optimization cadence.
- Priority support and named solution alignment.
- Use-case workshops and compliance-oriented planning.

Backend implication: enterprise plans likely need manually configured contracts rather than only deterministic calculator output.

## 7. Pricing Context Payload

When a user proceeds from pricing to the interest / schedule-demo flow, the landing site stores a pricing context in browser localStorage and submits it with the interest form.

Storage key:

```text
mkc_pricing_context
```

Current version:

```text
1
```

Type shape:

```ts
interface PricingContextV1 {
  version: 1;
  source: "smb" | "enterprise";
  capturedAt: string;
  summaryLines: string[];
  smb?: {
    inputs: SmbEstimateInput;
    result: SmbEstimateResult;
    labels: PricingContextLabelSnapshot;
  };
  enterprise?: {
    inputs: {
      scale: string;
      scaleLabel: string;
      domainValues: string[];
      domainLabels: string[];
      currentSetup: string;
      setupLabel: string;
      integrationIds: string[];
      integrationLabels: string[];
      serviceValues: string[];
      serviceLabels: string[];
    };
  };
  interestFormPrefill: {
    primaryUseCase: string[];
    monthlyCallingMinutes?: string;
    callingDirection?: string;
    currentCallingSetup?: string;
  };
}
```

For SMB, `smb.result` contains the full computed estimate:

- `tier`
- `effectiveConcurrency`
- `inferredConcurrency`
- `showLowVolumeNote`
- `integrationLikely`
- `tierBlurb`
- `perMinuteExGst`
- `minutesLow`
- `minutesHigh`
- `avgCallDurationMin`
- `setupOneTimeExGst`
- `channelAnnualExGst`
- `channelMonthlyEquivExGst`
- `usageMonthlyLowExGst`
- `usageMonthlyHighExGst`
- `firstYearExGstLow`
- `firstYearExGstHigh`
- `ongoingYearExGstLow`
- `ongoingYearExGstHigh`
- `typicalMonthlyExGstLow`
- `typicalMonthlyExGstHigh`
- `freeConnectedMinutesFromSetup`

The `/api/interest` endpoint accepts this context and sends both a summary and full JSON in internal email fields:

- `pricingEstimatorSource`
- `pricingEstimatorSummary`
- `pricingEstimatorJson`

If scheduler booking is enabled, the raw pricing context is also stored inside the booking `interestPayload`.

Backend implication: this payload is a useful migration seed for billing-app onboarding, but the billing app should version and validate its own contract instead of depending directly on localStorage shape.

## 8. Interest Form Mapping

SMB use-case IDs are mapped to interest-form use cases:

| SMB ID | Interest form use case |
| --- | --- |
| lead_qual | Sales & Lead Qualification |
| inbound_support | Customer Support & Follow-ups |
| missed_followup | Customer Support & Follow-ups |
| collections | Payment Reminders & Collections |
| appointments | Appointment Booking & Reminders |
| other | Other/Not in this List |

Enterprise domains are mapped to interest-form use cases:

| Enterprise domain | Interest form use case |
| --- | --- |
| sales | Sales & Lead Qualification |
| support | Customer Support & Follow-ups |
| collections | Payment Reminders & Collections |
| verification | Verification & Onboarding |
| mixed | Other/Not in this List |

SMB estimated monthly minutes are mapped to the interest form using `minutesHigh` only:

| High estimate | Interest form bucket |
| --- | --- |
| <= 1,500 | 0-1,500 |
| <= 3,000 | 1,501-3,000 |
| <= 5,000 | 3,001-5,000 |
| <= 10,000 | 5,001-10,000 |
| <= 20,000 | 10,001-20,000 |
| > 20,000 | 20,001+ |

Enterprise discovery does not collect monthly calling minutes in the interest form. The API substitutes:

```text
Not specified (enterprise discovery)
```

## 9. Suggested Backend Billing Entities

The billing app will likely need entities beyond what the landing site currently models:

- Customer / account.
- Contract or order with source `smb_estimator`, `enterprise_contract`, or manual override.
- Plan tier: Starter, Growth, Scale, Enterprise Custom.
- One-time setup charge.
- Annual channel+DID capacity subscription line.
- Metered connected-minute usage line.
- Usage credit ledger generated from setup charge.
- Tax profile and GST calculation.
- Invoice and payment records.
- Usage import / metering records per call.
- Plan version or price-book version to avoid retroactive price changes.
- Add-on selections and implementation scope items.
- Manual adjustments, discounts, coupons, write-offs, refunds, and credit notes.

## 10. Billing Decisions Still Open

The landing site does not answer these backend questions:

1. Whether connected seconds should be billed exactly, rounded to nearest second, rounded to minute, or aggregated monthly before rounding.
2. Whether GST should apply to setup, channel+DID, metered usage, and credits uniformly.
3. Whether the setup usage credit is minute-based or currency-value-based internally.
4. Whether unused setup credit expires hard at 3 months or can be extended manually.
5. Whether annual channel+DID is prepaid only, prorated on mid-cycle changes, or refundable.
6. Whether concurrency upgrades take effect immediately and how prorated annual capacity is handled.
7. Whether add-ons are only setup-scope modifiers or can become recurring line items later.
8. How enterprise contracts override SMB price-book logic.
9. Whether discounts should apply before or after tax.
10. How failed, busy, unanswered, voicemail, transferred, or partially connected calls are classified for billing.
11. Whether "actual connected call time, rather than rounding up" should be a hard billing invariant or only marketing copy.

## 11. Implementation Recommendation

For the billing app, create a versioned price book from these constants rather than duplicating formulas inline:

- `currency = INR`
- `taxDisplayRate = 0.18`
- `channelDidAnnualExGst = 28500`
- `daysPerMonthForEstimates = 30`
- `usageCreditValidityMonthsFromGoLive = 3`
- tier rates: Starter ₹7/min, Growth ₹6/min, Scale ₹5/min
- setup bases: Starter ₹10,000, Growth ₹17,500, Scale ₹28,000
- setup modifiers: additional use case ₹6,500, standard complexity ₹7,500, advanced complexity ₹18,500, add-on ₹4,500

The estimator can remain as a quotation helper, while actual billing should be driven by:

- Customer contract terms.
- Metered connected-call usage from production systems.
- Generated invoices and tax calculation.
- Explicit credit application and expiry rules.

## 12. Known Source Caveats

- The pricing hero says most growing teams invest roughly ₹25K-₹75K/month ex-GST, but the calculator can produce values outside that range depending on selected volume, duration, concurrency, complexity, and add-ons.
- Some marketing copy says "all-inclusive pricing with free minutes", while the calculator separates setup, annual capacity, and metered usage. Treat the calculator as the stronger implementation source.
- The estimator models connected minutes from expected volume, not actual call events.
- There is no payment processor in this repo. Mentions of Stripe in UI content are examples of integrations, not billing-provider integration.
- Existing scheduler `minutes` fields are appointment-slot durations and hold windows, not billable call minutes.
