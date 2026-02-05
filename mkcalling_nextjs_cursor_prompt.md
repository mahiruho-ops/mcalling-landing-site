# mKcalling Website Migration (Next.js) — Cursor “Vibe Coding” Prompt & Implementation Doc

**Context**
- You already have a production website at **mchatbot.ai** built with **Next.js**.
- You want to create a **new site for mKcalling** using the **same codebase/theme** (colors, typography, layout style, components).
- Only **content, information architecture, routes, and product branding** should change to reflect **mKcalling**.
- **Do NOT change** company backlinks such as links to **mahiruho.com** (keep as-is wherever they exist).
- Build this in Cursor using “vibe coding”: provide Cursor with a single high-quality prompt + clear acceptance criteria.

---

## 1) Cursor Master Prompt (paste into Cursor)

You are an expert Next.js engineer and UI developer. I have an existing Next.js marketing site codebase currently used for mchatbot.ai. I need you to fork/modify it to create a new marketing website for a product called **mKcalling**.

### Hard Constraints
- Preserve existing **theme**, **colors**, **typography**, **spacing system**, **component library**, and overall **visual style**.
- Keep **existing external company links** (especially any links to `mahiruho.com`) unchanged.
- Keep code quality consistent: TypeScript conventions, linting, existing folder structure, existing UI primitives.
- Maintain responsiveness and accessibility (keyboard focus, aria labels where relevant).
- No breaking changes to shared UI components unless required. Prefer creating new pages using existing components.

### Primary Goal
Replace mChatbot-specific content and navigation with mKcalling content and structure. The result should feel like “the same site system” but clearly branded and positioned for **mKcalling** (AI calling platform).

### Target Site Structure (Nav)
Create/adjust pages and nav links to:

Top Nav:
- Product
- Use Cases
- Industries
- Pricing
- How It Works
- Trust & Compliance
- Contact / Schedule a Demo

Footer:
- Keep existing company/footer structure and `mahiruho.com` link(s) unchanged.
- Update product-specific links to mKcalling pages.
- Keep legal links as-is if they’re company-level; if product-specific, create placeholders but do not invent legal claims.

### Content Requirements (mKcalling)
Use the following **Homepage messaging** and section ordering, maintaining the existing visual patterns:

**Homepage Sections**
1) Hero
   - Headline: “Automate Business Calls with AI — Without Hiring Callers or Managing AI”
   - Sub: “mKcalling is an AI Calling Platform that handles inbound and outbound business calls for sales, support, reminders, and follow-ups — fully configured and managed for you, built for Indian businesses.”
   - Bullets:
     - Inbound & Outbound AI Calling
     - Managed AI setup & training
     - Indian numbers • Indian languages • India-hosted data
     - Pay only for connected talk time
   - Primary CTA: “Schedule a Demo”
   - Secondary CTA: “View Pricing”
2) Problem (Manual Calling)
   - Emphasize missed calls, delays, attrition, inconsistent quality, limited scalability, high effective cost, weekends/holidays gap.
3) What mKcalling Does (Use case tiles)
   - Sales & Lead Qualification
   - Appointment Booking & Reminders
   - Payment Reminders & Collections
   - Customer Support & Follow-ups
   - Verification & Onboarding Calls
   - Feedback & NPS Calls
   - Note: AI handles routine; escalation via callback scheduling.
4) How It Works (Managed + Platform steps)
   - Discover → Configure agents/KB → AI handles calls → Escalation callback → Dashboard visibility.
5) Why mKcalling (Differentiators)
   - All-inclusive predictable pricing (LLM/STT/TTS/telephony/server/maintenance included)
   - No billing on failed/unanswered/busy attempts
   - Managed setup & tuning (no prompting burden)
   - India-first by design
   - Human-in-the-loop via callback
6) Industries (Grid) — MUST highlight Banking DSA
   - Healthcare, Education, Real Estate, Banking DSA, BFSI/Fintech, Insurance, Hospitality & Travel, E-commerce & D2C, Logistics, Automotive, Local Services
   - Add a highlighted callout for Banking DSA with key use cases.
7) Pricing teaser
   - Mention free minutes, unlimited agents, managed onboarding, recordings/transcripts/summaries, billing on connected talk time.
8) Trust & Control
   - DNC handling, recordings & audit logs, data stored in India, AI disclosure configurable, ethical/fair-use practices (generic).
9) Final CTA
   - “See mKcalling in Action” + “Schedule a Demo”

### Additional Pages (Create/Update)
Create the following pages using existing page templates/sections as much as possible:

1) `/product`
   - Explain inbound/outbound, managed service model, key platform capabilities (agents, campaigns, numbers, transcripts/summaries/sentiment/action items).
2) `/use-cases`
   - List use-case categories and link to detail pages:
     - `/use-cases/sales-lead-qualification`
     - `/use-cases/appointment-booking-reminders`
     - `/use-cases/payment-reminders-collections`
     - `/use-cases/customer-support-followups`
     - `/use-cases/verification-onboarding`
     - `/use-cases/feedback-nps`
   - Each use-case page should follow a consistent structure: Problem → What mKcalling does → Example workflow → Integrations → CTA.
3) `/industries`
   - Industry grid linking to:
     - `/industries/banking-dsa` (priority)
     - `/industries/healthcare`
     - `/industries/education`
     - `/industries/real-estate`
     - `/industries/bfsi-fintech`
     - `/industries/insurance`
     - `/industries/hospitality-travel`
     - `/industries/ecommerce-d2c`
     - `/industries/logistics`
     - `/industries/automotive`
     - `/industries/local-services`
4) `/pricing`
   - Implement the plan table and slab logic text (see “Pricing Content” section below).
   - Make it easy to understand “channels” and “DIDs”.
5) `/how-it-works`
   - Expand the 5-step process with visuals/steps.
6) `/trust-compliance`
   - India-first trust claims (generic, avoid legal overpromises):
     - DNC support, recordings, audit logs, India storage, retention up to 12 months, AI disclosure optional.
7) `/contact` or `/schedule-demo`
   - A conversion page with a form or CTA to existing booking method.
   - Reuse existing contact form component if present.

### Branding
- Replace “mChatbot” with “mKcalling” in all user-facing copy.
- Add mKcalling logo in the header and relevant places.
- Keep the overall styling the same; only replace assets/copy.
- Keep any “Mahiruho” company mentions and links.

### SEO
- Update metadata (title/description/og tags) per page for mKcalling.
- Keep structured data patterns from the existing site.

### Implementation Plan
1) Identify current route structure and nav config.
2) Create new routes/pages while reusing existing components.
3) Refactor content into a `content/` or `data/` layer (e.g., `src/content/mkcalling.ts`) to keep pages clean and editable.
4) Ensure `Schedule a Demo` CTA points to `/schedule-demo` (or existing contact route) consistently.
5) Validate build, run lint/tests, and ensure no broken links.

### Acceptance Criteria
- Theme and styling are unchanged from the existing codebase.
- Nav includes the specified items.
- Homepage matches the section flow and messaging above.
- Banking DSA appears on homepage industries section and has its own industry page.
- Pricing page includes free minutes + slabs + explanation of channels/DIDs.
- Footer and `mahiruho.com` links remain unchanged.
- No 404s for nav routes; internal links work; responsive on mobile.

Now inspect the existing repository and begin making changes. Provide a concise list of changed files and notes on where content is stored.

---

## 2) Pricing Content (for `/pricing` page)

### Shared Pricing Rules
- **Billing is per minute of connected talk time**.
- If connected talk time is **1 min 01 sec**, bill as **2 minutes** (round up to next full minute).
- **No charges** for unanswered/busy/failed attempts. No attempt fees.
- Free minutes are **account-level pooled** and **expire each monthly billing cycle** (no carry-forward).
- **All plans include** LLM + STT + TTS + telephony + server + maintenance costs.
- Premium voices/languages:
  - Available only in **Advanced**.
  - Either client uses their own API keys (pays provider directly), or uses our key with **+₹5.00/min** premium add-on.
- Default max call duration: **10 minutes** (configurable). Long-call use cases can be custom priced.

### Base Plan
- One-time implementation: **₹50,000**
- Platform fee:
  - Monthly: **₹25,000**
  - Quarterly: **₹60,000**
  - Half-yearly: **₹90,000**
  - Annually: **₹120,000**
- Free minutes/month: **1,500**
- Slabs:
  - 0–1500: **₹0.00/min**
  - 1501–5000: **₹9.50/min**
  - 5001–15000: **₹8.50/min**
  - 15001–20000: **₹8.00/min**
  - 20001+: **₹7.50/min**
- Unlimited AI agents
- KB docs: **up to 3**
- KB allocation: **1 KB per agent**
- Included DID: **1**
- Additional DID:
  - **₹1,500/DID/month** billed annually upfront = **₹18,000/year**
  - 5 DID pack: **₹50,000/year**
- Included concurrent channels: **1**
- Additional channel:
  - **₹12,000/channel/month**
  - **₹120,000/year** if paid annually

### Standard Plan
- One-time implementation: **₹85,000**
- Platform fee:
  - Monthly: **₹25,000**
  - Quarterly: **₹50,000**
  - Half-yearly: **₹120,000**
  - Annually: **₹180,000**
- Free minutes/month: **3,000**
- Slabs:
  - 0–3000: **₹0.00/min**
  - 3001–5000: **₹9.50/min**
  - 5001–10000: **₹8.50/min**
  - 10001–20000: **₹8.00/min**
  - 20001+: **₹7.00/min**
- Unlimited AI agents
- KB docs: **up to 5**
- KB allocation: **1 KB per agent**
- Included DID: **1**
- Additional DID:
  - **₹1,200/DID/month** billed annually upfront = **₹14,400/year**
  - 5 DID pack: **₹50,000/year**
- Included concurrent channels: **1**
- Additional channel:
  - **₹10,000/channel/month**
  - **₹96,000/year** if paid annually

### Advanced Plan
- One-time implementation: **₹150,000**
- Platform fee:
  - Half-yearly: **₹150,000**
  - Annually: **₹240,000**
- Free minutes/month: **5,000**
- Slabs:
  - 0–5000: **₹0.00/min**
  - 5001–15000: **₹8.50/min**
  - 15001–20000: **₹7.50/min**
  - 20001+: **₹7.00/min**
- Unlimited AI agents
- KB docs: **up to 10**
- KB allocation: **1 KB per agent**
- Included DID: **1**
- Additional DID:
  - **₹1,000/DID/month** billed annually upfront = **₹12,000/year**
  - 5 DID pack: **₹50,000/year**
- Included concurrent channels: **1**
- Additional channel:
  - **₹10,000/channel/month**
  - **₹96,000/year** if paid annually

### Managed Service Scope (include on Pricing or a separate section)
- Discovery workshops: **3–5** (depending on plan)
- Included use cases setup: **5–10**
- Included agent personas: **up to 10**
  - Additional personas: client can create themselves free; if done by us: **₹10,000/agent**
- KB ingestion + QA + iterations: **up to 5 rounds**
- Ongoing support: business hours
  - P1: **10 business hours**
  - P2: **24 business hours**
- Included revisions: **2/month**, additional revisions billed based on scope/complexity

---

## 3) Content Modeling Recommendation (so changes are easy)

Create a content module such as:
- `src/content/mkcalling/home.ts`
- `src/content/mkcalling/nav.ts`
- `src/content/mkcalling/pricing.ts`
- `src/content/mkcalling/useCases.ts`
- `src/content/mkcalling/industries.ts`
- `src/content/mkcalling/seo.ts`

Then pages can import and render. This reduces future edits and keeps consistency.

---

## 4) Component Reuse Guidance

When adapting from mchatbot.ai:
- Reuse:
  - Hero component
  - Feature grid / card sections
  - Testimonials / logos (remove if not applicable)
  - CTA band section
  - FAQ section component (if exists; populate later)
- Replace:
  - mChatbot-specific diagrams/words with mKcalling sections
  - Use-case list and routes
  - Enterprise-heavy claims
- Keep:
  - Header/footer layout
  - Buttons, typography scale, spacing, container widths
  - `mahiruho.com` links and brand footer references

---

## 5) QA Checklist (before pushing)

- [ ] Nav routes all exist and load
- [ ] No “mChatbot” remnants in UI copy
- [ ] Banking DSA present on homepage + has its own industry page
- [ ] Pricing numbers match exactly and are consistent in table + mobile view
- [ ] “Schedule a Demo” CTA works site-wide
- [ ] Footer company links unchanged (especially mahiruho.com)
- [ ] Mobile layout checked on iPhone width
- [ ] Lighthouse basic pass (optional)

---

## 6) Notes for Cursor Workflow

Suggested Cursor approach:
1) Ask Cursor to **list existing pages/routes**, nav config, content sources.
2) Ask Cursor to create a new `mkcalling` content layer and update pages to read from it.
3) Iterate page-by-page starting with homepage and nav.
4) Implement pricing carefully (copy exact numbers; avoid rounding errors).
5) Run `pnpm lint`/`npm run lint` and `npm run build`.

---

## 7) Asset Notes

- Add mKcalling logo as:
  - `public/assets/brand/mkcalling-logo.png` (or match existing conventions)
- Update header to use the new logo but keep sizing consistent.

---

**End of doc**
