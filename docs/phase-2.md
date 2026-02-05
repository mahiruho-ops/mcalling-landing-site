### Phase 2 — Asset plan (what to attach/build next)
Create or mock with real libraries, then deploy:

- Workflow Canvas visual
  - Option A: short screen recording/gif of your builder flow.
  - Option B: static diagram mocked with `react-flow` rendering a sample orchestration (safe for beta).

- Architecture diagram
  - Generate with Mermaid or SVG (React component), showing channels → gateway → multi‑agent orchestrator → tools/integrations → observability.

- Sequence diagram
  - Mermaid sequence for “User → Channel → Orchestrator → Tools → Response”.

- KPI/Analytics visualization
  - Use `react-chartjs-2` or `recharts` to show AHT reduction, FCR, cost per conversation.

- Integration logos grid
  - Use official brand assets where permitted; otherwise neutral icon + text tiles you already have, upgraded with subtle brand colors.

- Security/compliance badges
  - Placeholder badges (SOC 2, ISO 27001, GDPR) with clarifying text “in progress” or “supported”.

- Case study PDF or one‑pager
  - A single-page downloadable with Before/After metrics and rollout timeline.

- SDK snippets
  - Minimal TypeScript and Python snippets showing a “tool” definition and registration (rendered with syntax highlight, no external image).

- Roadmap timeline
  - Simple timeline component showing “Beta Nov 2025 → GA Q1 2026”.

- Customer logos/testimonial headshots
  - If unavailable, start with initials-only avatars and text quotes.

- Short 15–30s hero video
  - Silent loop: channels switching, a flow executing, metrics ticking up (Lottie or MP4).

Suggested libraries/tools to generate assets
- Diagrams: Mermaid for sequence/architecture; or lightweight SVG components.
- Canvas mock: `react-flow` for workflow; keep it static/uninteractive for performance.
- Charts: `recharts` or `react-chartjs-2`.
- Media: Lightweight MP4 or Lottie for hero loop.
- SEO helpers: `next-seo` for structured metadata (Phase 1 can be text-only; Phase 2 can formalize).

Success criteria
- Phase 1: Clear persona and value prop, benefits-first, visible CTAs, beta clarity, basic pricing, text-only proof; no new images/assets.
- Phase 2: At least 3 visual anchors (workflow, architecture, KPI chart), trust signals (badges/logos), and one short demo loop.

Want me to convert this copy into exact component text updates when you switch to Agent mode?