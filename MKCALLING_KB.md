# mKcalling Knowledge Base

**Version:** 1.0 · **Effective:** April 2026  
**Audience:** Retrieved by `fetch_mkcalling_kb(section)` — reference only, not a system prompt.

Each section below is addressable by its **`section` ID** in the section heading.

---

## Section: `product-overview`

### Identity

| Item | Value |
|------|-------|
| **Product name** | mKcalling |
| **Tagline** | Automate business calls with AI — without hiring callers or managing AI complexity |
| **Category** | SaaS AI Calling Platform (managed) |
| **Legal entity** | Mahiruho Consulting Services Pvt. Ltd. |
| **Marketing site** | https://mkcalling.mchatbot.ai |
| **Application dashboard** | https://app.calling.mchatbot.ai |
| **Billing in app** | https://app.calling.mchatbot.ai/dashboard/billing |
| **Parent company** | https://www.mahiruho.com (12+ years IT delivery for government and private sector) |

### One-sentence description

**mKcalling** is an AI voice calling platform that handles **inbound and outbound business calls** for sales, support, reminders, and follow-ups — **configured and managed for you**, built for Indian businesses.

### What mKcalling IS

- A SaaS AI Calling Platform
- Designed for sales, support, reminders, and follow-ups
- Delivered with **managed onboarding and configuration**
- Built for predictable, scalable calling
- **All-inclusive pricing** in marketing terms — LLM, STT, TTS, and telephony are bundled (no separate metered AI add-ons on the bill)
- **Pay only for connected talk time** on successful connected calls

### What mKcalling IS NOT

- Not a call center or BPO
- Not an outcome-based sales or collections **service** (software + managed setup, not guaranteed recovery)
- Not a telecom CPaaS / raw API-only toolkit for developers
- Not a DIY prompt playground — customers don't need AI engineers; Mahiruho manages setup and tuning

### Core value propositions

1. **Managed service** — discovery, agent design, knowledge base ingestion, QA, go-live, ongoing tuning.
2. **India-first** — Indian phone numbers (DIDs), Indian languages, India-hosted data positioning.
3. **Transparent usage billing** — tiered per-minute rate on **actual connected time**; failed/unanswered attempts are not billed (marketing claim).
4. **Human safety** — escalation to human phone numbers; callback scheduling; DNC, recordings, RBAC, AI disclosure.
5. **Integrations** — Zoho CRM, WhatsApp, Calendly, outbound webhooks, API keys for programmatic outbound.

---

## Section: `audience-fit`

### Best fit

- Indian **SMBs and growing teams** handling **~100+ calls per day** (primary qualifier on pricing page)
- Businesses where **missed calls, delayed response, or limited calling capacity** affect revenue or service quality
- Teams spending on manual calling or outsourced agents who want **predictable costs** without building AI in-house
- Use cases: lead qualification, appointment booking, payment reminders, inbound reception, follow-ups, verification, feedback/NPS

### Typical investment anchor (marketing)

Most growing teams invest roughly **₹25,000–₹75,000 per month (ex-GST)** depending on workflow complexity and usage — **plus 18% GST** as applicable. Calculator results can fall outside this range.

### Poor fit (disqualifier)

- Very **low call volumes** or goal is only to **replace one telecaller at minimum cost**
- Expectation of a **fully outcome-based** collections or sales agency
- Need for **enterprise-scale custom architecture** without a discovery conversation

If volume is under 100/day, mKcalling can still be discussed — set expectations that ROI and setup effort may differ (estimator sets `showLowVolumeNote: true` for `lt100`).

### Enterprise fit

- **300–500+ calls/day**, multi-team / multi-location, integration-heavy environments
- **Sales-assisted** — no self-serve checkout; implementations **from ₹2,50,000 ex-GST**

---

## Section: `onboarding`

### SMB self-serve path

```
Pricing calculator (landing or in-app)
  → Save estimate (quote intent)
  → Create Account (auth)
  → Sign in to calling app
  → Claim estimate (/business/billing/claim)
  → Billing profile + Pay (Razorpay)
  → Provisioning → Active → Go-live
```

### Key URLs

| Step | URL / path |
|------|------------|
| Pricing & calculator | https://mkcalling.mchatbot.ai/pricing |
| Schedule demo | https://mkcalling.mchatbot.ai/schedule-demo |
| Contact | https://mkcalling.mchatbot.ai/contact |
| Product overview | https://mkcalling.mchatbot.ai/product |
| Sign up / app | https://app.calling.mchatbot.ai |

### CTAs by intent

| User intent | Recommend |
|-------------|-----------|
| Wants numbers first | Personalised estimate → **Create Account & Continue** or **Schedule a Consultation** |
| Wants to talk to someone | **Schedule a Demo / Consultation** → `/schedule-demo` |
| Already has account | **Billing dashboard** in app |
| Enterprise scale | **Schedule Enterprise Discovery Call** — no instant public quote |

### Onboarding statuses (customer-visible)

| Status | Meaning |
|--------|---------|
| Not started | No plan yet — run estimator |
| Quote claimed | Estimate saved — complete billing & pay |
| Plan selected | Ready for payment |
| Payment pending | Checkout in progress |
| Payment received | Paid — account being set up |
| Provisioning | Channels/agents being configured |
| **Active** | Plan live; usage metering applies from go-live |
| Payment failed | Retry from Billing |
| Cancelled | Contact support |

### Trial vs production usage

- **Trial window:** Between activation and **go-live** — calls allowed, production credit not consumed.
- **Production:** From **go-live** — setup usage credit granted; connected seconds debited.
- Calls may be **blocked** when credit is exhausted or expired.

**Free trial:** Marketing/legal copy references a **7-day free trial** (see Terms). Onboarding target: **~2 business days** after payment for provisioning start.

---

## Section: `capabilities`

### Dashboard areas (calling app)

| Area | What customers do |
|------|---------------------|
| Overview | Account snapshot |
| Calls | History, live monitoring, AI summaries |
| Agents | Create/configure AI voice agents |
| Phone Numbers | Manage lines for inbound/outbound |
| Contact Groups & Contacts | Audience management |
| Campaigns | Automated outbound calling |
| Knowledge Base | Business documents for agents |
| API Keys & LLM Keys | Programmatic access; optional BYO LLM |
| Integrations | Calendly, WhatsApp, Zoho CRM, webhooks |
| Billing | Plan, payment, usage, invoices |
| Settings | Business profile, escalation, notifications |

**Multi-business:** One login can manage multiple businesses.

### AI voice agents

- Name and unique **agent key** (used in API)
- Language and voice (TTS: Google, Sarvam, etc.)
- Greeting prompt and LLM system prompt
- LLM provider, model, temperature
- Active/inactive toggle
- **Tasks:** appointment booking (Calendly), post-call WhatsApp/email notifications
- **Knowledge:** linked business KB documents
- **Human escalation:** transfer to configured phone number
- **Unlimited agents** per account (marketing positioning)

### Inbound calling

- Assign phone numbers; default inbound agent per number
- Real-time STT → AI → TTS conversation
- Optional human escalation
- **Outbound webhooks (v1): inbound only** — events `call.inbound.received`, `call.status.changed`

### Outbound calling

- **API-initiated** outbound via API keys
- **Campaigns:** CSV lead upload, working hours, retries, queue visibility
- **UI dialer** for manual initiation and monitoring
- Default outbound agent per phone number

### Call intelligence

- AI call summaries (overview, key points, action items)
- Recordings and transcripts
- Live status and logs

### Campaigns (outbound at scale)

- CSV import (`phone_number` required; other columns = AI context)
- Primary + optional follow-up agent
- Configurable caller ID, working hours (timezone-aware), retry rules
- Lifecycle: Draft → Running → Paused → Stopped / Completed
- Runs until manually stopped

### Languages (marketing)

English, Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, and mix-lingual options. Multi-language as a **paid add-on** in setup estimator.

---

## Section: `pricing-model`

| Rule | Value |
|------|-------|
| Currency | **INR** |
| Price display | **Exclusive of GST** unless stated |
| GST | **18%** additional on taxable supplies |
| Metering unit | **Connected talk time** (actual seconds, not rounded up per UI copy) |
| Failed / unanswered | **Not billed** (marketing claim) |
| SMB estimates | **Indicative**, not binding quotes |
| Enterprise | Custom after discovery; **from ₹2,50,000 ex-GST** implementation |

### SMB cost components

| Component | Description |
|-----------|-------------|
| **One-time setup & workflow enablement** | Scales with tier, use case count, complexity, add-ons |
| **Channel + DID capacity** | **₹28,500/year ex-GST per concurrent path** (1 path = 1 channel + 1 DID, billed annually) |
| **Connected talk time** | Metered at tier per-minute rate |
| **First checkout** | Setup + first year channel/DID (+ GST via Razorpay) |
| **Setup usage credit** | Complimentary minutes = floor(setup ÷ tier rate); valid **3 months from go-live** |

### Plan tiers (SMB)

| Tier | Rate (connected minute, ex-GST) | Setup base (ex-GST) | Positioning |
|------|----------------------------------|---------------------|-------------|
| **Starter** | ₹7/min | ₹10,000 | One focused AI calling workflow |
| **Growth** | ₹6/min | ₹17,500 | Regular call-flow automation |
| **Scale** | ₹5/min | ₹28,000 | Higher concurrency, broader automation |

Tier is **auto-recommended** by the estimator from volume, complexity, concurrency, use cases, and add-ons.

### Setup modifiers (ex-GST)

| Modifier | Amount |
|----------|--------|
| Each additional use case (after first) | +₹6,500 |
| Basic complexity | +₹0 |
| Standard complexity | +₹7,500 |
| Advanced complexity | +₹18,500 |
| Each optional add-on | +₹4,500 |

Setup total is **rounded to nearest ₹500**.

### Prepaid minute packages (reference)

Packages in UI: **1,000 – 25,000 minutes**, validity **15 days – 10 months**, billed at tier rate + GST. **Self-serve in-app recharge is coming soon** — contact support when credit is low.

### Enterprise pricing (public framing)

- Implementations **start from ₹2,50,000 ex-GST**
- Monthly and consumption billing confirmed after discovery
- Typically includes: dedicated/isolated options, advanced KB ingestion, custom CRM/ERP integrations, monitoring cadence, priority support, compliance workshops
- **No self-serve billing checkout** for enterprise

---

## Section: `estimator-inputs`

Reference for `calculate_smb_pricing_estimate`. API: `POST /v1/estimator/smb/calculate` (public, rate-limited).

### Request example

```json
{
  "dailyVolume": "v100_250",
  "useCases": ["lead_qual", "appointments"],
  "concurrency": "unsure",
  "avgCallDurationMin": 3,
  "complexity": "standard",
  "addons": ["crm"]
}
```

### `dailyVolume` (required)

| ID | Label | Internal calls/day range |
|----|-------|--------------------------|
| `lt100` | Less than 100 | 25 – 99 |
| `v100_250` | 100 – 250 | 100 – 250 |
| `v250_500` | 250 – 500 | 250 – 500 |
| `v500p` | 500+ | 500 – 2,000 |

**NL mapping examples:** "about 150 calls" → `v100_250`; "50 calls" → `lt100`; "600+" → `v500p`.

### `useCases` (required, minimum 1)

| ID | Label |
|----|-------|
| `lead_qual` | Lead qualification / sales calls |
| `inbound_support` | Inbound support / reception |
| `missed_followup` | Missed call follow-up |
| `collections` | Payment reminders / collections |
| `appointments` | Appointment booking / reminders |
| `other` | Other |

### Natural language → use case ID

| User says | Map to |
|-----------|--------|
| lead qualification, sales calls, outbound sales | `lead_qual` |
| support, reception, inbound | `inbound_support` |
| missed call, callback | `missed_followup` |
| payment reminder, EMI, collections | `collections` |
| appointment, booking, reminders | `appointments` |
| unclear / other workflow | `other` |

### `concurrency`

| ID | Label | Notes |
|----|-------|-------|
| `1` | 1 concurrent path | |
| `2` | 2 | |
| `3` | 3 | |
| `4` | 4 | |
| `unsure` | Not sure | Inferred: lt100→1, v100_250→2, v250_500→3, v500p→4 |

Each concurrent path = 1 channel + 1 DID bundled.

### `avgCallDurationMin`

- Number **1–15** minutes; default **3**
- Monthly minutes estimated as: `dailyRange × duration × 30 days`

### `complexity`

| ID | Label |
|----|-------|
| `basic` | One simple workflow, limited branching |
| `standard` | Two to three workflows, moderate branching |
| `advanced` | Multi-step flows, heavier tuning |

### `addons` (optional)

| ID | Label |
|----|-------|
| `crm` | CRM integration |
| `multilang` | Multi-language support |
| `reporting` | Advanced reporting |
| `custom_workflow` | Custom workflow design |
| `priority` | Priority support |
| `org_ai_consultation` | Organization Level AI Consultation |

---

## Section: `estimator-output`

How to interpret `data.estimate` from `calculate_smb_pricing_estimate`.

### Response fields

| Field | Meaning |
|-------|---------|
| `tier` | Recommended plan: Starter / Growth / Scale |
| `tierBlurb` | Short tier positioning line |
| `perMinuteExGst` | Usage rate for this tier |
| `setupOneTimeExGst` | One-time setup (ex-GST) |
| `channelAnnualExGst` | Annual channel+DID charge (ex-GST) |
| `channelMonthlyEquivExGst` | Monthly equivalent for planning only |
| `minutesLow` / `minutesHigh` | Estimated monthly connected minutes range |
| `usageMonthlyLowExGst` / `usageMonthlyHighExGst` | Estimated monthly usage charge range |
| `typicalMonthlyExGstLow` / `typicalMonthlyExGstHigh` | **Headline monthly range** (channel equiv + usage) |
| `firstYearExGstLow` / `firstYearExGstHigh` | First year incl. setup + annual channel + 12 mo usage |
| `ongoingYearExGstLow` / `ongoingYearExGstHigh` | Year 2+ (no setup) |
| `freeConnectedMinutesFromSetup` | Complimentary usage credit minutes |
| `effectiveConcurrency` | Paths used in calculation |
| `inferredConcurrency` | true if user selected "unsure" |
| `showLowVolumeNote` | true if lt100 — mention volume fit caveat |
| `integrationLikely` | true if crm/custom_workflow/org_ai_consultation selected |

### Disclaimers (always include when presenting estimates)

1. All figures are **ex-GST**; add **18% GST** for tax-inclusive totals.
2. Estimates are **indicative** — final pricing depends on discovery, voice/language choices, integrations, and production tuning.
3. Setup usage credit is **not subtracted** from displayed monthly/year totals.
4. Channel+DID is **billed annually**; monthly figure is for comparison only.
5. First payment at checkout = **setup + first year channel/DID** (+ GST), not just monthly usage.

### Example user-facing reply (template)

> Based on your inputs (~100–250 calls/day, lead qualification + appointments, standard complexity), mKcalling recommends the **Growth** plan at **₹6/min** (ex-GST) for connected talk time.
>
> **Indicative monthly investment:** roughly **₹XX,000–₹YY,000 ex-GST** (channel capacity + estimated usage). **GST @ 18%** applies on top.
>
> **One-time setup:** ₹ZZ,ZZZ ex-GST, including about **N complimentary connected minutes** valid for 3 months after go-live.
>
> **Annual channel capacity:** ₹28,500 ex-GST per concurrent path (X paths).
>
> These are planning figures, not a binding quote. Next steps: **create an account** to save this estimate, or **schedule a consultation** at https://mkcalling.mchatbot.ai/schedule-demo .

---

## Section: `use-cases`

Marketing pages at `/use-cases/{slug}`:

| Slug | Title |
|------|-------|
| `sales-lead-qualification` | Sales & Lead Qualification |
| `appointment-booking-reminders` | Appointment Booking & Reminders |
| `payment-reminders-collections` | Payment Reminders & Collections |
| `customer-support-followups` | Customer Support & Follow-ups |
| `verification-onboarding` | Verification & Onboarding Calls |
| `feedback-nps` | Feedback & NPS Calls |

**Estimator IDs differ from marketing slugs.** For pricing tool use `lead_qual`, `inbound_support`, etc. (see `estimator-inputs`).

---

## Section: `industries`

Industry pages at `/industries/{slug}`:

`healthcare` · `education` · `real-estate` · `banking-dsa` · `bfsi-fintech` · `insurance` · `hospitality-travel` · `ecommerce-d2c` · `logistics` · `automotive` · `field-service-maintenance`

**Banking-DSA** is a highlighted focus vertical.

Common pain points: missed leads, EMI/collections follow-up, appointment no-shows, verification calls, support overflow.

---

## Section: `integrations`

### Zoho CRM

- OAuth connect per business
- Sync call outcomes and AI summaries to Zoho
- Manual "Sync to Zoho" from call detail

### WhatsApp (Meta Cloud API)

- WABA ID, phone number ID, access token configuration
- Approved message templates for **post-call notification rules** on agents

### Calendly

- OAuth connect (user calendar)
- Agent task: **appointment booking** — AI checks availability and books slots post-call

### Outbound webhooks (customer systems)

- Register HTTPS endpoint + signing secret in Integrations
- **v1 scope: inbound calls only**
- Events: `call.inbound.received`, `call.status.changed`, plus test event
- HMAC signature verification required
- **Not in v1 payload:** transcripts, recordings, outbound/campaign events

### API keys (programmatic outbound)

- **List active agents** (`GET /webhook/agents` with API key)
- **Create outbound call sessions** with `context_data`
- Poll call session status
- Documented in app: **Dashboard → API Keys → Documentation**

### LLM keys

Optional bring-your-own LLM provider keys for agent intelligence.

---

## Section: `competitive-positioning`

### vs DIY AI tools

mKcalling owns production path: workflows, voice stack, QA, tuning for Indian numbers — customer isn't debugging prompts and carriers when volume spikes.

### vs freelancer-built automations

Documented delivery, named accountability, ongoing optimization — not a one-time script that goes stale.

### vs raw API / CPaaS platforms

Business-aware rollout: agent design, QA, observability, managed iteration — not engineering-only prototypes.

### vs call centers / BPO

Software platform with metered usage, not per-seat outsourcing or outcome guarantees.

---

## Section: `legal-contact`

### Trust & compliance (summary)

| Topic | Summary |
|-------|---------|
| DNC | Do-not-call list support |
| Recordings | Call recording and audit logs |
| AI disclosure | Ethical use and disclosure |
| RBAC | Role-based access |
| Data | India-hosted data positioning |
| Minimum age | 18 |
| Governing law | India; jurisdiction Kolkata courts |
| Refund resolution | Up to **15 business days** |
| Billing error reports | Within **30 days** |

**Legal pages:** `/trust-compliance` · `/terms` · `/privacy` · `/shipping` · `/cancellation-refunds` · `/contact`

### Contacts

| Purpose | Email |
|---------|-------|
| Sales | sales@mahiruho.com |
| Support / billing | support@mahiruho.com |
| Refunds | refund.request@mahiruho.com |
| Grievance | grievance@mahiruho.com |

**Phone:** +91-7943446840  
**Hours:** Mon–Fri, 10:00 AM – 7:00 PM IST  
**Response time:** within 48 business hours  

**Registered address:** P-30 Purbayan, #3 Rifle Range Road, Belgharia, Kolkata, West Bengal 700056, India

### Escalation guide

| Situation | Action |
|-----------|--------|
| Custom discount or contract terms | sales@mahiruho.com |
| Account-specific invoice or payment issue | support@mahiruho.com |
| Refund request | refund.request@mahiruho.com |
| Legal / grievance | grievance@mahiruho.com |
| User wants binding quote | Schedule consultation; estimates are indicative |
| Angry or compliance-critical issue | Acknowledge, provide grievance email |

---

## Section: `limitations`

| Topic | Current state |
|-------|---------------|
| Enterprise self-serve billing | Sales-led only |
| In-app minute package purchase | Coming soon; contact support today |
| Channel/DID annual renewal self-serve | Deferred |
| Outbound webhook events | Not yet; inbound only in v1 |
| Webhook payload richness | No transcript/recording in v1 |
| Saved landing estimates | Indicative; claim window applies |
| Monthly usage invoicing | Usage tracked; separate monthly usage invoices not yet |
| GST e-invoice (IRP) | Standard PDF tax invoices today |
| Live call transfer | Roadmap; callback scheduling available today |

Do not describe "not yet" items as generally available.

---

## Section: `faq`

### How is pricing calculated?

Three SMB components: **one-time setup**, **annual channel+DID capacity** (₹28,500/year per concurrent path), and **metered connected minutes** at tier rate. Personalised ranges come from the estimator tool.

### Do you charge for failed or unanswered calls?

**No** — billing applies to **connected talk time** on successful connected outcomes.

### Is the calculator quote binding?

**No.** Indicative tier and range; final terms confirmed after discovery and before payment.

### What's included in setup?

Workflow enablement, agent configuration, knowledge base ingestion, testing/QA, go-live support — scoped by tier, use case count, complexity, and add-ons.

### What's the setup usage credit?

Complimentary connected minutes = setup fee ÷ tier per-minute rate, valid **3 months from go-live**. Separate from future prepaid packages.

### Can I try before paying?

**7-day free trial** referenced in Terms. Flow: estimate → account → billing checkout. Trial window exists before go-live.

### Do you support Hindi / regional languages?

Yes — English, Hindi, Bengali, Marathi, Tamil, Telugu, Kannada, mix-lingual. Multi-language setup may be an add-on.

### Can it integrate with our CRM?

**Zoho CRM** natively; **webhooks** for custom systems; **CRM integration** as setup add-on. Other CRMs via webhooks/API on request.

### Can we trigger outbound calls from our app?

Yes — **API keys** for programmatic outbound; list agents and create call sessions with context data.

### What about inbound calls to our number?

Assign Indian DIDs, set default inbound agent, optional human escalation, inbound webhooks (v1).

### Who operates mKcalling?

**Mahiruho Consulting Services Pvt. Ltd.**, Kolkata — 12+ years delivering software for government and private clients.

---

## Section: `enterprise-discovery`

Qualitative fields for enterprise prospects (no instant public quote):

| Field | Options |
|-------|---------|
| **Scale** | 300–500 / 500–1,000 / 1,000+ / multi-team-multi-location |
| **Domain** | sales, support, collections, verification, mixed |
| **Current setup** | human team, outsourced, CRM+manual, telephony stack, existing AI tools |
| **Integrations** | CRM, ERP, webhook/API, dashboards, audit/RBAC |
| **Service** | managed launch, ongoing optimization, dedicated environment, need scoping |

**Public framing:** Custom enterprise setup; implementations **from ₹2,50,000 ex-GST**; monthly/consumption after discovery. CTA: **Schedule Enterprise Discovery Call** at https://mkcalling.mchatbot.ai/schedule-demo .

---

## Section: `glossary`

| Term | Definition |
|------|------------|
| **Connected minute** | Billable unit: actual connected call time |
| **Concurrent path** | One simultaneous call = 1 channel + 1 DID bundled |
| **DID** | Direct inward dialing — Indian phone number |
| **Agent key** | Unique identifier for an AI agent in API calls |
| **Go-live** | Date when production usage metering and setup credit begin |
| **Quote intent** | Server-saved estimate linked after signup |
| **ex-GST** | Price before Goods and Services Tax |
| **Tier** | Starter / Growth / Scale — determines per-minute rate |
| **Setup credit** | Complimentary minutes from setup fee |
| **Campaign** | Scheduled bulk outbound calling to a lead list |

---

*Maintainers: update with `MKCALLING_SYSTEM_PROMPT.md` and billing-api pricebook when pricing or features change.*
