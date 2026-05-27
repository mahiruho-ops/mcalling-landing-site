# mKcalling Legal Pages — Input Questionnaire for Razorpay Integration

**Purpose:** Collect answers needed to publish minimal legal/compliance pages on the mKcalling landing site for Razorpay merchant onboarding.

**Product:** mKcalling (AI Calling Platform)  
**Operator (inferred):** Mahiruho Consulting Services Pvt. Ltd.  
**Site (inferred):** https://mkcalling.mchatbot.ai  

**Pages to create:**
1. Terms & Conditions  
2. Privacy Policy  
3. Shipping Policy *(digital delivery / service fulfillment)*  
4. Contact Us  
5. Cancellation & Refunds  

**Instructions:** Fill in answers inline. Where `[ ]` checkboxes appear, mark one or more. Where `___` appears, write free text. Skip only if marked *Optional*.

---

## Section 1 — Legal Entity & Registration

### 1.1 Registered legal name (exact spelling as on incorporation/GST certificate)

```
Answer: ___
```

- [X] Confirm: **Mahiruho Consulting Services Pvt. Ltd.**
- [ ] Different (specify above)

---

### 1.2 Registered office address (full — used on legal pages & invoices)

```
Street / Building: P-30 Purbayan, #3 Rifle Range Road,
Area / Locality: Belgharia
City: Kolkata
State: West-Bengal
PIN: 700056
Country: [X] India  [ ] Other: ___
```

---

### 1.3 Corporate identifiers

| Field | Answer | Required for Razorpay? |
|-------|--------|------------------------|
| GSTIN | ___ | Yes (recommended) |
| CIN | ___ | Optional |
| PAN (company) | ___ | Optional on public pages |

---

### 1.4 Brand vs legal entity on legal pages

How should pages refer to the seller?

- [X] **A.** “mKcalling, a product of Mahiruho Consulting Services Pvt. Ltd.”
- [ ] **B.** “Mahiruho Consulting Services Pvt. Ltd. (mKcalling)”
- [ ] **C.** Legal name only; mKcalling mentioned as product name in body
- [ ] **D.** Other: ___

---

### 1.5 Governing law & jurisdiction (disputes)

```
Governing law: [X] Laws of India  [ ] Other: ___

Courts / jurisdiction city: Kolkata, West Bengal
(e.g. Kolkata, West Bengal)
```

---

## Section 2 — Contact & Support Details

### 2.1 Primary support email (shown on Contact Us & legal pages)

```
Answer: ___
```

- [ ] mkcalling.sales@mahiruho.com  
- [X] support@mahiruho.com (or similar — specify)  
- [ ] hello@mahiruho.com  
- [ ] Other: ___

---

### 2.2 Billing / payments email *(if different from support)*

```
Answer: same as support
```

---

### 2.3 Support phone number (with country code)

```
Answer: +91-7943446840
```

- [ ] Not published on website (Razorpay may still require one — confirm internally)
- [X] Publish on Contact Us only
- [ ] Publish on Contact Us + footer

---

### 2.4 Business hours & response expectations

```
Business days: [X] Mon–Fri  [ ] Mon–Sat  [ ] 7 days  [ ] Other: ___

Hours (IST): 10 to 7

Expected first response time:
  [ ] Within 24 business hours
  [X] Within 48 business hours
  [ ] Within 72 business hours
  [ ] Other: ___
```

---

### 2.5 Website URL to register with Razorpay

- [X] https://mkcalling.mchatbot.ai  
- [ ] https://mahiruho.com/mkcalling (or path — specify)  
- [X] Other production URL: https://app.calling.mchatbot.ai/dashboard/billing

Note: I am confuse between thses 2, 1st one is the landing site from where the user journey starts, but the payment gateway is impl on this app.calling.mchatbot.ai... page which is a protected page(authentication needed)
---

## Section 3 — Product & Commercial Model

*(Confirm what customers pay for — drives Terms, Shipping, and Refunds)*

### 3.1 Customer type

- [ ] **B2B only** (companies / organizations)
- [X] **B2B primary**, individuals allowed
- [ ] **B2C allowed**

Minimum age if individuals allowed: 18

---

### 3.2 What can be purchased via Razorpay? *(check all that apply)*

- [X] One-time setup / implementation fee  
- [X] Platform subscription (recurring)  
- [X] Prepaid usage / connected-minute packs  
- [X] Add-ons (DIDs, concurrent channels, etc.)  
- [X] Enterprise custom invoice + payment link  
- [ ] Other: ___

---

### 3.3 Subscription billing cycles offered

- [ ] Monthly  
- [ ] Quarterly  
- [ ] Half-yearly  
- [X] Annual  
- [ ] Custom (enterprise only)

---

### 3.4 Pricing & tax display (confirm for legal copy)

- [X] All prices **exclusive of GST**; GST @ **18%** added at invoice/checkout  
- [ ] Prices inclusive of GST  
- [ ] Mixed (specify): ___

Currency: **[ ] INR only**  [ ] Other: ___

---

### 3.5 Metered usage rules (confirm for Terms)

Connected talk time billing:

- [ ] Bill per **connected minute**, rounded **up** to next full minute (e.g. 1:01 → 2 min)  
- [X] Different rule: exact seconds

Failed / unanswered / busy calls:

- [X] **Not billed** (no attempt fee)  
- [ ] Billed differently: ___

Free minutes:

- [X] Account-level pool; **expire each billing cycle** (no carry-forward)  
- [ ] Different: ___

---

### 3.6 Checkout & contract flow

How does a customer commit and pay?

- [X] Self-serve checkout on billing portal → accept Terms at payment  
- [X] Sales quote → customer pays via Razorpay link → Terms accepted on pay  
- [X] Signed SOW/MSA offline → payment link sent separately  
- [ ] Combination (describe): ___

URL of billing / checkout app *(if separate from landing site)*:

```
Answer: https://app.calling.mchatbot.ai/dashboard/billing
```

URL of customer app / dashboard *(after activation)*:

```
Answer: https://app.calling.mchatbot.ai
```

---

## Section 4 — Service Delivery (“Shipping” Policy)

*mKcalling is a digital SaaS service — this page describes fulfillment, not courier shipping.*

### 4.1 Delivery method (wording preference)

- [ ] **A.** “Digital delivery — no physical goods shipped”  
- [ ] **B.** “Service activation and platform access provided electronically”  
- [X] **C.** Use both phrases above  

---

### 4.2 When does service / account access begin?

- [ ] Immediately upon successful payment  
- [ ] After payment + automated account provisioning (within ___ hours)  
- [X] After payment + **onboarding / implementation** (typical timeline: 2 business days)  
- [ ] Staged: partial access after payment, full production after go-live (describe): ___

---

### 4.3 What is “delivered” to the customer? *(check all)*

- [X] Platform login / dashboard access  
- [X] AI agent configuration & managed setup  
- [X] Phone number (DID) provisioning  
- [X] Knowledge base ingestion  
- [X] Training / handover session  
- [ ] Documentation / runbooks  
- [ ] Other: ___

---

### 4.4 Geographic availability

- [ ] India only  
- [X] India primary; international on request  
- [ ] Other: ___

---

### 4.5 Delivery failures / delays

If onboarding is delayed beyond committed timeline:

- [X] Customer notified by email; revised ETA provided  
- [ ] Escalation contact: ___  
- [ ] Refund/cancellation option if delay exceeds ___ days (see Section 6)  
- [X] Not applicable / handled case-by-case  

---

## Section 5 — Terms & Conditions

### 5.1 Existing legal documents to reuse?

- [X] **No** — create mKcalling-specific Terms from scratch  
- [ ] **Yes** — adapt from Mahiruho parent company docs  
  - Link or attach: ___  
- [ ] **Yes** — adapt from another product (MChatbot, etc.): ___

---

### 5.2 Account eligibility & registration

Customer must provide accurate:

- [X] Company name, authorized contact, email, phone  
- [X] GSTIN (for Indian B2B invoices) — required / optional: optional  
- [X] KYC or business verification before go-live — yes/no: yes

---

### 5.3 Acceptable use (confirm / extend)

Include standard restrictions?

- [X] Lawful use only; comply with TRAI / telecom regulations  
- [X] Customer responsible for consent, DND, and outreach compliance  
- [X] No spam, harassment, illegal, or deceptive calling  
- [X] No reselling platform access without agreement  
- [X] Mahiruho may suspend for misuse (per Trust & Compliance)  
- [ ] Additional restrictions: ___

---

### 5.4 Service level / availability

- [X] **Best effort** — no guaranteed uptime SLA on standard plans  
- [ ] Published SLA: ___% uptime — plan tier: ___  
- [ ] Enterprise SLA in separate contract only  

---

### 5.5 Intellectual property

- [X] Customer retains ownership of their data, scripts, KB content  
- [X] Mahiruho retains platform, software, and pre-built templates  
- [ ] Custom work-for-hire terms: ___ *(Optional)*

---

### 5.6 Limitation of liability (pick a cap template)

- [ ] **A.** Limited to fees paid by customer in the **last 3 months**  
- [ ] **B.** Limited to fees paid in the **last 12 months**  
- [ ] **C.** Limited to amount of the **specific transaction** in dispute  
- [ ] **D.** Custom (legal review required): ___

Exclude indirect/consequential damages?

- [ ] Yes (standard)  
- [ ] No / custom: ___

---

### 5.7 Price changes

If plan or usage rates change:

- [ ] ___ days **prior notice** via email / dashboard  
  - Suggested: [ ] 15  [ ] 30  [ ] 60 days  
- [ ] Existing prepaid term honored until renewal  
- [ ] Enterprise: per contract only  

---

### 5.8 Termination by Mahiruho

Grounds to suspend or terminate *(check all)*:

- [X] Non-payment  
- [X] Acceptable use violation  
- [X] Regulatory or legal requirement  
- [X] Extended inactivity (specify): ___  
- [ ] Other: ___

---

### 5.9 Force majeure

- [X] Include standard force majeure clause  
- [ ] Omit for minimal page  

---

## Section 6 — Cancellation & Refunds

*Most critical for Razorpay review — please decide explicitly.*

### 6.1 Subscription cancellation — who initiates?

- [ ] Customer can cancel anytime from dashboard  
- [X] Customer must email support to cancel  
- [ ] Ops/sales only  
- [ ] Combination: ___

---

### 6.2 When does cancellation take effect?

- [ ] **End of current billing period** (no renewal)  
- [ ] **Immediate** (access revoked on cancel)  
- [X] **Immediate cancel, access until period end**  
- [ ] Enterprise: per contract  

---

### 6.3 Refund — one-time setup / implementation fee

- [ ] **Non-refundable** once work has started  
- [ ] **Fully refundable** if cancelled within ___ days **and** onboarding not started  
- [ ] **Partial refund** if cancelled mid-onboarding (define % or formula): ___  
- [ ] **Case-by-case** — contact support  
- [ ] Other: ___

Define “work started”: ___

---

### 6.4 Refund — platform subscription (recurring fee)

For unused portion of prepaid period (monthly/quarterly/annual):

- [ ] **No refund** on cancellation (service until period end only)  
- [ ] **Pro-rata refund** of unused full months  
- [ ] **Pro-rata refund** minus ___% admin fee  
- [ ] Annual plans: refund within ___ days of purchase only  
- [ ] Case-by-case  

---

### 6.5 Refund — prepaid usage / minute credits

- [X] **Non-refundable** once credited to account  
- [ ] Refund **unused balance** on account closure  
- [X] Expired free minutes: **never refunded** (confirm): [X] Yes  [ ] No  

---

### 6.6 Refund — add-ons (DIDs, channels, etc.)

- [X] Non-refundable after provisioning  
- [ ] Pro-rata for unused prepaid annual add-ons  
- [ ] Case-by-case  

---

### 6.7 Billing errors & duplicate charges

- [ ] Full refund or credit for proven duplicate/erroneous charge  
- [X] Customer must report within ___ days (suggest: 30)  
- [ ] Refund processed within ___ business days (suggest: 7–14)  

---

### 6.8 Refund method

- [X] Original payment method (via Razorpay)  
- [ ] Bank transfer (NEFT/IMPS)  
- [ ] Account credit toward future invoices  
- [ ] Combination: ___

---

### 6.9 Chargebacks / payment disputes

- [ ] Customer must contact support **before** initiating bank chargeback  
- [ ] Account may be suspended during dispute  
- [ ] Standard Razorpay dispute process applies  

---

### 6.6 Refund request process

```
Contact: email refund.request@mahiruho.com 
Include: payment ID, date, amount, reason

Internal approval by: [ ] Support  [X] Finance  [ ] Founders  [ ] Other: ___

Target resolution timeline: 15 business days
```

---

### 6.10 Cooling-off / trial

- [ ] No free trial — N/A  
- [X] Free trial 7 days — refund if converted by mistake: NO Refund  
- [ ] Pilot / POC with separate refund terms: ___

---

## Section 7 — Privacy Policy

### 7.1 Scope

- [X] **mKcalling-specific** Privacy Policy on mkcalling site  
- [X] **Link to** Mahiruho group Privacy Policy: ___  
- [ ] Hybrid: short mKcalling page + link to parent policy  

---

### 7.2 Personal data collected *(confirm / extend)*

- [X] Name, email, phone, company name (forms, account)  
- [X] Billing & GST details  
- [X] Payment data (**processed by Razorpay** — we do not store card details)  
- [X] Call recordings, transcripts, call metadata  
- [X] Usage / analytics (connected minutes, feature usage)  
- [X] IP address, device/browser, cookies  
- [X] Calendar booking data (demo scheduler)  
- [ ] Other: ___

---

### 7.3 Data location & processing

Trust page states data stored/processed in **India**.

- [ ] **Confirm — accurate**  
- [X] **Partial** — specify exceptions (e.g. LLM provider regions): Google llm models use global location i.e us-central  
- [ ] **Update required** — new wording: ___

---

### 7.4 Data retention

| Data type | Retention period |
|-----------|------------------|
| Call recordings / logs | [X] 12 months  [ ] Other: ___ |
| Account / profile data | 7 Years |
| Billing / invoice records | 7 years (suggest: 7+ years for tax) |
| Marketing / lead form data | 7 years |
| Cookies / analytics | 12 Months |

---

### 7.5 Third-party processors / sub-processors *(check all that apply)*

- [X] **Razorpay** — payments  
- [X] **Telephony / CPaaS provider(s)** — name optional on page: Telecmi, Twilio
- [X] **LLM / STT / TTS providers** — names optional: Google, Openai, Sarvam
- [X] **Google Calendar / Google Cloud** — scheduling  
- [X] **Email (SMTP)** — transactional email  
- [X] **Meta Pixel / analytics** — marketing analytics  
- [X] **reCAPTCHA** — bot protection  
- [X] **Hosting / cloud** (e.g. AWS, Supabase): Cloudflare tunnel with inhouse system
- [ ] Other: ___

List publicly on Privacy Policy?

- [X] Category only (“payment processor”, “telephony provider”)  
- [ ] Named vendors where possible  
- [ ] Named vendors + link to their privacy policies  

---

### 7.6 Cookies & tracking

- [X] Minimal — session / functional only  
- [X] Analytics / marketing cookies (Meta Pixel, etc.) — need cookie notice?  
  - [X] Yes — banner required  
  - [ ] No — disclose in Privacy Policy only  

---

### 7.7 User rights (India / general)

Include statements for:

- [X] Access / correction of personal data  
- [ ] Deletion request (subject to legal retention)  
- [ ] Opt-out of marketing communications  
- [X] Grievance / privacy contact (email): ___  

Grievance officer name & designation *(Optional but recommended)*:

```
Name: 
Email: grievance@mahiruho.com
```

---

### 7.8 Children’s data

- [X] Service not directed at minors under 18  
- [ ] Other: ___

---

## Section 8 — Contact Us Page

### 8.1 Page format

- [X] **Static** — email, phone, address, hours only  
- [X] **Static + mailto links**  
- [X] **Contact form** (new or reuse interest form fields)  
- [ ] **Link out** to schedule demo as primary CTA  

---

### 8.2 Information to display *(check all)*

- [X] Support email  
- [X] Sales email  
- [X] Billing email  
- [X] Phone  
- [X] Registered office address  
- [X] Business hours  
- [X] LinkedIn: https://www.linkedin.com/company/mahiruho-consulting-services  
- [X] Link to schedule demo: /schedule-demo  
- [ ] Map embed *(Optional)*  

---

### 8.3 Form fields *(if contact form)*

- [X] Name  
- [X] Email  
- [X] Phone  
- [X] Company  
- [X] Subject dropdown: [X] Sales  [X] Billing  [X] Support  [X] Other  
- [X] Message  
- [object ] reCAPTCHA  

Submit action:

- [X] Email to support  
- [ ] Store in DB  
- [ ] Existing `/api/interest` endpoint  

---

## Section 9 — Website Implementation Preferences

### 9.1 URL paths

- [X] `/terms`  
- [X] `/privacy`  
- [X] `/shipping`  
- [X] `/contact`  
- [X] `/cancellation-refunds`  

Alternative paths (if any): ___

---

### 9.2 Footer links

Add all five pages to footer?

- [ ] Yes — alongside existing “Trust & Compliance”  
- [X] Yes — replace/group with Trust & Compliance  
- [ ] Minimal set for Razorpay only: ___

---

### 9.3 Content approach

- [ ] **Minimal** — Razorpay compliance, plain English, ~1–2 screens each  
- [X] **Standard B2B SaaS** — moderate detail  
- [ ] **Legal comprehensive** — lawyer-reviewed length  

Tone:

- [ ] Plain English, short paragraphs  
- [X] Formal legal tone  

---

### 9.4 Effective date & versioning

```
Policy effective date: 1st April 2026  (e.g. 1 June 2026)

Show “Last updated” on each page?
  [X] Yes  [ ] No

Notify customers on material changes?
  [X] Email + notice on site  [ ] Site only  [ ] Not required for v1
```

---

### 9.5 Cross-links between pages

- [ ] Each legal page links to the other four + Contact Us  
- [ ] Footer only — no inline cross-links  
- [X] Terms accepted at checkout link to `/terms` and `/privacy`  

---

## Section 10 — Razorpay-Specific Checklist

Confirm alignment with Razorpay merchant KYC:

| Razorpay expectation | Your confirmation |
|---------------------|-------------------|
| Terms & Conditions URL live on same domain | [X] Yes |
| Privacy Policy URL live | [X] Yes |
| Shipping / delivery policy URL live | [X] Yes |
| Refund & cancellation policy URL live | [X] Yes |
| Contact page with email + phone | [X] Yes |
| Policies describe **actual** products/services sold | [X] Yes |
| Business name matches KYC documents | [X] Yes |
| Policies linked from website footer | [X] Yes |

---

## Section 11 — Open Doubts / Decisions Deferred

*(Internal notes — fill as you decide)*

| # | Doubt | Owner | Decision |
|---|-------|-------|----------|
| 1 | Are refunds implemented in billing-api yet, or policy-first? |not imepmentd yet | |
| 2 | Is checkout on billing app or landing site? |calling app| |
| 3 | Same legal pages on billing subdomain? | do we need that? | |
| 4 | Reuse Mahiruho policies vs mKcalling-only? |Yes | |
| 5 | Named AI/telephony vendors on Privacy Policy? | no | |
| 6 | Grievance officer required for your entity type? |no| |
| 7 | Cookie banner needed (Meta Pixel)? | yes | |
| 8 | Enterprise manual billing — same refund policy? | not implemented yet, ignored for now | |

---

## Section 12 — Quick Submit (Minimum Viable Answers)

*If you want to unblock implementation fast, fill at least these:*

```
1. Legal name: ___
2. Registered address: ___
3. GSTIN: ___
4. Support email: ___
5. Support phone: ___
6. Razorpay website URL: ___
7. Setup fee refund rule (one line): ___
8. Subscription refund rule (one line): ___
9. Service activation timeline after payment: ___
10. Reuse parent company legal docs? yes/no: ___
11. Contact page: static / form: ___
12. Governing jurisdiction city: ___
```

---

## Appendix A — Values Already in Codebase (pending your confirmation)

| Item | Current site / docs value | Confirm? |
|------|---------------------------|----------|
| Product name | mKcalling | [X] Yes [ ] No |
| Legal entity | Mahiruho Consulting Services Pvt. Ltd. | [X] Yes [ ] No |
| Site URL | https://mkcalling.mchatbot.ai | [X] Yes [ ] No |
| Currency | INR | [X] Yes [ ] No |
| GST | 18%, ex-GST pricing | [X] Yes [ ] No |
| Billing unit | Connected minutes, no round up | [X] Yes [ ] No |
| Failed calls | Not billed | [X] Yes [ ] No |
| Free minutes | Expire each cycle, no carry-forward | [X] Yes [ ] No |
| Data in India | Stated on Trust page | [X] Yes [] No |
| Call retention | 12 months | [X] Yes [ ] No |
| Sales email | sales@mahiruho.com | [X] Yes [ ] No |

---

## Appendix B — Suggested Default Policy Stance (if you want “sensible B2B defaults”)

*Select if you want us to draft using conservative SaaS defaults without answering every question above:*

- [ ] **Use suggested defaults** — I will review draft before publish  
- [X] **Do not use defaults** — wait for full questionnaire  

Suggested defaults summary:

1. B2B SaaS; digital delivery only; activation after payment + onboarding (5–15 business days).  
2. Setup fee non-refundable once onboarding work starts.  
3. Subscriptions: cancel at period end; no pro-rata refund for prepaid period.  
4. Usage/credits: non-refundable once consumed or credited.  
5. Billing errors refunded within 14 business days.  
6. Liability cap: fees paid in last 12 months.  
7. Privacy: India processing, 12-month call retention, Razorpay for payments, categories for other processors.  

---

**Document version:** 1.0  
**Created for:** mKcalling landing site — Razorpay legal pages  
**Next step:** Return filled Sections 1–2, 6, and 12 (minimum), or mark Appendix B defaults approved.
