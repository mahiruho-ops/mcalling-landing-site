# Technology Use Cases — How to Use MChatbot for SaaS, Product, and Internal Teams

_MChatbot helps technology companies improve customer journeys, support operations, and incident response by automating chat flows across web, in-app, messaging, and internal channels. Below, you'll find practical examples showing how SaaS, product, support, DevOps, and other teams can use MChatbot._

---

## Who is This For?
- SaaS teams: founders, product/growth, customer support, sales, DevOps/SRE, security, CX
- Anyone looking to automate plan selection, onboarding, helpdesk, incident management, status updates, billing, renewals and more

---

## What MChatbot Can Help You Do

- Guide users to the right product or plan with interactive flows on your site or in-app
- Onboard new users with step-by-step walkthroughs and default setup
- Deflect common support questions or API issues before they create tickets
- Accelerate internal incident response and status updates (Slack, Teams, etc.)
- Automate billing and upgrade flows right in chat
- Send proactive communication for outages or planned maintenance
- Surface renewal and expansion opportunities, and handle compliance/security questions with approved answers

---

## Platform Components

- **Template Agent**: Configurable chat “brain” with your FAQs, docs, model, and policies
- **Node Libraries**: Plug-in connectors for docs, CRM, billing, ticketing, status, DevOps/oncall, SSO, and more
- **Bot**: Connects your flows to channels—Web Chat, Slack, Teams, WhatsApp, Email, in-app
- **Workflow**: Automates follow-ups: notifications, ticketing, webhooks, escalation, audit

### Example Node Types

- **Agent Nodes**:
    - Knowledge Base (docs, API refs, pricing, help guides)
    - CRM (lead capture, qualification, renewals)
    - Billing (usage, upgrades, discounts)
    - Ticketing (Zendesk, Jira Service Mgmt., Freshdesk, etc.)
    - DevOps/Oncall (PagerDuty, Opsgenie), Status (Statuspage)
    - Repo/Issues (GitHub, Jira), Release Notes
    - SSO/Identity, Guardrail (policies), Memory Store, Human Handoff
- **Channel Nodes**: Web/in-app chat, Slack, MS Teams, WhatsApp, Email
- **Workflow Nodes**: Email/webhook triggers, ticket create/update, broadcast, escalation, audit, CSAT/NPS survey

---

## Common Use Case Flows

_Below are step-by-step examples of how teams and users interact with MChatbot:_

---

### 1. Product/Plan Discovery & Guided Trial

**Where:** Website or in-app

**How it works:**
- User selects "Find the right plan"
- Bot asks about team size or needs
- Suggests a matching plan
- Offers to start a trial, captures details in CRM, sends link and welcome email

**Sample Chat**:
- User: “We’re a 15‑person startup needing SSO.”
- Bot: “Pro plan fits your needs. Ready to start a 14-day trial?”
- User: “Yes.”
- Bot: “Here’s your trial link. Want quick onboarding help?”

**Result:** Self-serve sales assist for higher conversion.

---

### 2. In-App Onboarding & Interactive Product Tours

**Where:** In your SaaS app (web chat/in-app widget)

**How it works:**
- On first login, bot offers a guided setup
- Walks users through key actions (e.g., invite team, connect integrations)
- Optionally applies default settings automatically
- Collects quick feedback and shares helpful docs

**Sample Chat**:
- User: “How do I invite my team?”
- Bot: “Go to Settings → Team. Would you like me to send invites now?”

**Result:** Faster, smoother onboarding and user activation.

---

### 3. Support Triage & Deflection

**Where:** Website or Slack support

**How it works:**
- User asks about a problem (“Can’t connect to API” or “401 auth error”)
- Bot analyzes and suggests fixes from your help guides
- If unresolved, can auto-create detailed support tickets and attach logs
- Option for human escalation

**Sample Chat**:
- User: “401 errors on auth.”
- Bot: “This may be a token scope issue. Try regenerating with ‘read:orders’. Should I create a support ticket?”

**Result:** Users get answers instantly; actual tickets only when needed.

---

### 4. Incident Response & Escalation (Internal SRE/DevOps)

**Where:** Slack or Teams for internal ops

**How it works:**
- PagerDuty or monitoring alert triggers the chat
- Bot summarizes incident and links runbooks
- Can create incident tickets in Jira/GitHub, update Statuspage
- Coordinates resolution steps and posts follow-up survey

**Sample Chat:**
- Bot: “High latency detected in US‑East. Should I apply autoscaling runbook?”
- Engineer: “Yes, and open Jira ticket.”

**Result:** Faster MTTA/MTTR and standardized incident workflows.

---

### 5. Status Updates & Maintenance Broadcasts

**Where:** Email, WhatsApp, Statuspage

**How it works:**
- Schedule planned maintenance or notify outages
- Bot identifies affected accounts from CRM
- Sends proactive updates and closure notifications across channels

**Sample Message:**
- “We’re performing maintenance 22:00–23:00 UTC. Service may be unavailable. You’ll be notified when complete.”

**Result:** Reduces confusion and ticket surges during incidents.

---

### 6. Billing, Usage, and Upgrades

**Where:** Chat in web app or email

**How it works:**
- User checks plan/usage or asks about upgrades
- Bot retrieves current plan, usage, and promo options (e.g., 10% off)
- Can send checkout/payment links and confirm changes

**Sample Chat:**
- User: “We hit limits. What are the options?”
- Bot: “Upgrade to Pro for SSO and higher limits. 10% off this week. Want the checkout link?”

**Result:** Simplifies expansion and billing questions.

---

### 7. Renewal Outreach & Feedback

**Where:** Email, WhatsApp (for renewals)

**How it works:**
- 30 days before renewal, bot reaches out
- Recaps value, confirms renewal contact, checks for blockers
- Can escalate to Customer Success if needed

**Sample Chat:**
- Bot: “Renewal is in 30 days — extend now for 12% discount?”

**Result:** Improved retention and proactive risk handling.

---

### 8. Security & Compliance Q&A

**Where:** Website or email

**How it works:**
- User asks about certifications (SOC2, HIPAA, etc.)
- Bot provides accurate, approved answers from your docs
- Gated docs can require contact info; sales notified for follow-up

**Sample Chat:**
- User: “HIPAA support?”
- Bot: “We’re not a HIPAA Business Associate, but we offer encryption-at-rest/in-transit, SSO, and SCIM.”

**Result:** Users get clear, compliant info every time.

---

## Best Practices & Notes

- Use official copy for security/compliance answers
- Avoid sharing personal/sensitive info in chat replies
- Respect user opt-in/opt-out for notifications and message channels

## Metrics to Monitor

- Website-to-trial conversion rate
- Ticket deflection and first-response time
- Incident response speed (MTTA/MTTR)
- Expansion/renewal (NRR) and CSAT/NPS

## How To Get Started (Summary)

1. Create your Technology Template Agent
2. Add required Node Libraries (KB, CRM, Billing, Ticketing, DevOps, SSO, etc.)
3. Connect to your channels: Web, Slack, Teams, WhatsApp, Email
4. Build sample workflows (product finder, onboarding, support, incident)
5. Launch to a small group, collect feedback, iterate

## Outcomes

- **Users:** Faster answers, clear status, easier setup, less wait time  
- **Teams:** Fewer support tickets, quicker resolutions, higher product adoption, more renewals

If you have questions or want guidance, check out the docs or reach out to our support team.
