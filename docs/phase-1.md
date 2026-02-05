I'll quickly scan the key pages/components to tailor Phase 1 copy updates to your current sections and propose a precise, low-effort plan without writing any code yet. Then I’ll outline Phase 2 assets to create or mock.



[9 tools called]

Got it. Let’s lock the plan into two phases as you outlined. I’ll keep this in Ask mode: no code, just clear, ready-to-apply content and asset recommendations.

### Phase 1 — Content-only updates (no new static assets)
Goal: Clarify persona, sharpen value prop, emphasize benefits, add credibility and CTAs, improve SEO. Below is page/section-specific copy you can paste into existing components.

- Hero (`src/app/page.tsx` via `Hero` component)
  - Headline: “Enterprise multi‑agent chatbots across every channel”
  - Subheadline (benefit-first): “Launch production chatbots 3× faster, cut support costs by 35–60%, and scale securely across web, voice, and messaging.”
  - Persona qualifier: “Built for enterprise CX, operations and IT teams.”
  - CTAs: “Request demo” (primary), “Join waitlist” (secondary)
  - Beta tag: “Beta release November 2025. In pilot with enterprise customers.”

- Features — MultiAgent (`src/components/MultiAgent.tsx`)
  - Section subtitle: “What you get” instead of “Advanced AI Capabilities”.
  - Replace descriptions with outcome phrasing:
    - “Multi-Agent Execution” → “Resolve complex requests in one flow (sequential/parallel orchestration).”
    - “Memory Management” → “Higher first-contact resolution via context retention and retrieval.”
    - “Guardrails & Self‑Reflection” → “Safer responses with built‑in validation and red‑teaming.”
    - “Multi‑Language Support” → “Serve 100+ languages to grow global CS coverage.”
    - “Hybrid Search” → “Reduce hallucinations with retrieval + citations.”
    - “Real-Time Processing” → “Under 1s p95 response on enterprise workloads.”
  - Add a one-liner above grid: “Outcomes: faster time‑to‑resolution, fewer escalations, lower handle time.”

- Channels (`src/components/Channels.tsx`)
  - Lead: “Deploy once, reach every channel.”
  - Benefit line: “Eliminate per‑channel rework. Configure once, reuse across WhatsApp, Web, SMS, Slack, Teams, Voice.”
  - Micro-copy under grid: “Bring-your-own accounts. Enterprise routing and compliance supported.”

- Custom Tools (`src/components/CustomTools.tsx`)
  - Section header: “Integrate with your business. No brittle glue.”
  - Paragraph: “Connect CRMs, ERPs, billing and data sources with a secure tool sandbox and SDK. Track usage and performance for each tool.”
  - Bullet outcomes:
    - “Accelerate integration delivery by 50–70%.”
    - “Hardened sandbox to protect systems of record.”
    - “SDKs for TypeScript and Python.”

- Security (`src/components/Security.tsx`)
  - Header: “Enterprise‑grade security, governance and uptime”
  - Micro-benefits:
    - “RBAC & audit trails” → “Meet internal control and compliance needs.”
    - “Real‑time analytics” → “Track quality, cost and SLA adherence.”
    - “99.9% uptime” → “Global, redundant infrastructure.”
  - Add readiness note under header: “Security review available during beta. SOC 2 in progress.”

- Enterprise page (`src/app/enterprise/page.tsx`)
  - Hero: “From pilot to global rollout.”
  - Sub: “Orchestrate specialized agents, automate processes and integrate securely—at enterprise scale.”
  - Add short “Who it’s for” band: “CX leaders, Ops, IT and Platform teams.”
  - Add “Implementation timeline” text block:
    - “Week 1–2: Use‑case design and integration plan”
    - “Week 3–4: Build and pilot”
    - “Week 5+: Scale and governance”
  - CTA: “Request enterprise demo”

- Global Reach page (`src/app/global-reach/page.tsx`)
  - Hero: “Serve customers in 100+ languages—consistently.”
  - Sub: “Multilingual NLU, locale routing and translation memory reduce per‑locale maintenance.”
  - Add benefits band:
    - “Reduce translation rework by 60%”
    - “Consistent tone and compliance across locales”
    - “Auto‑fallback and escalation routing”

- Pricing (referenced by `Pricing` component)
  - Headline: “Transparent beta pricing”
  - Copy:
    - “Starter (Beta): from $499/month”
    - “Growth: from $1,999/month”
    - “Enterprise: custom”
    - Note: “Beta pricing includes priority onboarding; SLAs limited during beta.”
  - CTA: “Contact us for pricing” + “Join waitlist”

- Proof & credibility (text-only for now)
  - Add a slim band (text only): “In pilot with large enterprises in retail and telecom” and “Early pilots report 25–40% reduction in average handle time.”
  - Testimonials placeholder: “Head of CX, Global Retailer: ‘mChatBot cut our agent escalations by 32% in the first 6 weeks.’”

- SEO metadata (text-only)
  - Home title: “mChatBot — Enterprise Multi‑Agent Chatbots Across Every Channel”
  - Description: “Launch multi‑agent chatbots 3× faster, reduce support costs and scale securely across web, voice and messaging. Built for enterprise CX, Ops and IT.”
  - Keywords: “enterprise chatbot platform, multi‑agent AI, omnichannel chatbot, enterprise automation, AI customer service”

- Navigation/UX quick wins (no assets)
  - Add top “Jump to” anchor links on home: “Benefits · Features · Channels · Security · Pricing”
  - Secondary CTA in header “Request demo”
  - Footer link: “Security & Compliance”, “Beta roadmap”

If you want, I can adapt this copy precisely to each component’s props/structure when you switch to Agent mode.

### Part 2
Here’s a Phase‑1 (content-only) checklist for those components, aligned to the marketing suggestions: emphasize benefits, add credibility/readiness notes, and clarify outcomes. No assets required.

### Enterprise
- EnterpriseManagement.tsx
  - Headline: “Enterprise Canvas Governance” → keep, but add outcome subline: “Reduce release risk and speed rollouts with version control, approvals, and audit trails.”
  - Replace feature blurbs with outcomes:
    - “Version Control” → “Ship confidently with full rollback and change history.”
    - “Collaborative Editing” → “Cut handoffs; review and approve changes in one place.”
    - “Audit Trail” → “Meet internal control requirements with complete traceability.”
    - “Lifecycle Management” → “Standardize Draft → Review → Publish with automated gates.”
  - Add slim note under header: “Security review available during beta. SOC 2 in progress.”

- MultiAgentOrchestration.tsx
  - Subtitle (under “Agent Orchestration”): change to outcomes: “Resolve complex requests in one flow with task distribution and real‑time coordination.”
  - Map feature blurbs to outcomes:
    - “Agent Communication” → “Fewer retries via reliable message routing.”
    - “Task Distribution” → “Higher throughput with smart load balancing.”
    - “Collaborative Problem Solving” → “Better FCR via collective reasoning.”
    - “Agent Specialization” → “Faster answers with role‑based expertise.”
  - Add one‑liner band above the grids: “Outcomes: faster resolution, fewer escalations, higher throughput.”

- BusinessAutomation.tsx
  - Subtitle: “Automate complex business processes…” → make benefit‑first: “Cut manual work and errors with visual workflows and deep integrations.”
  - Feature blurbs to outcomes:
    - “Workflow Orchestration” → “Reduce time‑to‑automation with drag‑and‑drop flows.”
    - “Integration Hub” → “Connect CRMs/ERPs faster; avoid brittle scripts.”
    - “Process Optimization” → “Find bottlenecks; improve SLAs automatically.”
    - “Automation Analytics” → “Track ROI, efficiency and cost per process.”
  - Add slim band under header: “Pilots report 25–40% faster process cycle times.”

### Global Reach
- Multilingual.tsx
  - Header OK, add outcome subline: “Reduce per‑locale maintenance with translation memory and locale routing.”
  - Bullet phrasing to benefits:
    - “Automatic translation and language detection” → “Instant translation and detection reduce agent handoffs.”
    - “Voice‑to‑text and IVR integration” → “Serve voice and IVR with consistent NLU.”
    - “Localization and regional optimization” → “Compliant tone and terminology per locale.”
    - “Support for 100+ languages” → “Expand coverage without per‑language builds.”
  - Small note: “Enterprise glossary and tone guides supported during beta.”

Optional Phase‑1 micro‑additions (text-only)
- Add a tiny “Implementation timeline” note to BusinessAutomation (mirroring Enterprise page) if you want consistency.
- Add a “Who it’s for” one‑liner beneath EnterpriseManagement and BusinessAutomation headers (e.g., “Platform, Ops, and CX teams”).

If you want, I can convert these into exact copy changes in those files when you switch to Agent mode.