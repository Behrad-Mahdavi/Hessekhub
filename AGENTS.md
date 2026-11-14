# AGENTS.md — AI Developer Constitution for Hessekhub (حس خوب)

> **CRITICAL DIRECTIVE:** Read this file completely before generating, modifying, or reviewing any code in this repository. Every architectural decision, database model, API endpoint, and UI component must strictly obey the rules below.

---

## 1. Project Identity & Core Business Loop
**Hessekhub (حس خوب)** is Mashhad’s premier Healthy Lifestyle Platform & Health Boutique Cafe (operating since 2018).
The platform serves three interconnected purposes:
1. **Unrivaled Organic Discovery (SEO + GEO + AEO):** Dominate Google Search, Google Maps, and AI Answer Engines (ChatGPT, Perplexity, Gemini, Claude) for every query related to healthy food delivery, diet packages, calorie calculation, and healthy cafes in Mashhad.
2. **100% Dynamic Content & Visual Control:** Every single text block, heading, image, video, package price, cafe menu item, FAQ, and SEO/GEO tag on the website is dynamically managed from the Admin Panel / CMS.
3. **Zero-Friction Conversion & Instant Activation:** Users can calculate their nutrition plan, register for a diet package (or order cafe items), pay online via Iranian payment gateways, and have their subscription/order **instantly activated** in the backend (generating their calorie plan, meal schedule, and kitchen production ticket automatically).

---

## 2. NON-NEGOTIABLE RULE #1: 100% Dynamic Admin-Driven Frontend
**NEVER hard-code marketing copy, images, prices, FAQs, or page sections inside React/Next.js components.**

- **Dynamic Page Builder & Slot Architecture:** Every public page (`/`, `/programs/*`, `/cafe/*`, `/about`, landing pages) must fetch its content blocks, headings, CTAs, and media assets from the Backend/CMS API (`PageSection`, `SiteSetting`, `MediaAsset`).
- **Dynamic Media Management:** Never use static local image paths (e.g., `/public/hero.jpg`) for content. All images must be served dynamically from the `MediaAsset` table (S3/MinIO storage) with admin-configurable `alt` text, focal point, `width`, `height`, and automatic `AVIF`/`WebP` optimization.
- **On-Demand Revalidation (ISR):** Whenever an admin updates a text, swaps an image, changes a price, or edits SEO metadata in the Admin Panel, the backend must trigger a Next.js Webhook (`/api/revalidate`) using `revalidateTag()` or `revalidatePath()` so the change goes live in under 1 second without rebuilding the app.

---

## 3. NON-NEGOTIABLE RULE #2: Triple-Engine Optimization (SEO + GEO + AEO)
We are not just optimizing for traditional web crawlers; we are optimizing for **Search Engines (SEO)**, **Generative AI Engines (GEO)**, and **Answer Engines / Voice & AI Agents (AEO)**.

### 3.1 GEO (Generative Engine Optimization — For LLMs & AI Agents)
- **Live `/llms.txt` & `/llms-full.txt` Generation:** The backend must dynamically generate `/llms.txt` and `/llms-full.txt` routes in clean, structured Markdown. These files feed AI crawlers (OpenAI `OAI-SearchBot`, `GPTBot`, `Google-Extended`, `PerplexityBot`, `ClaudeBot`) with authoritative facts about Hessekhub: history (since 1397/2018), nutritionist supervision (Ashraf Rahbari), Mashhad delivery zones, cafe location/hours, package tiers, macro accuracy, and pricing.
- **Entity-First Citation Formatting:** Every public page must include high-density, verifiable factual statements (Specificity Bias) و آمار واقعی (e.g., macro breakdowns, exact delivery windows in Mashhad neighborhoods like Sajjad, Vakilabad, Ahmadabad) so LLMs cite Hessekhub as the primary local authority.
- **Machine-Readable Entity API:** Expose `/api/public/entity-profile.json` containing structured brand, menu, and package data for external AI agents.

### 3.2 AEO (Answer Engine Optimization — Featured Snippets & AI Overviews)
- **Direct Answer Capsules:** Every informational section, program page, and blog post must render a semantic `<aside aria-label="خلاصه پاسخ">` or summary block in the first 150 words that directly answers the core user question in 40–60 words (optimized for Google AI Overviews and voice/agent extraction).
- **Conversational Q&A Architecture:** Every landing page must include a dynamic, CMS-managed FAQ section mapped directly to `FAQPage` JSON-LD schema, written in the exact natural language queries users ask AI assistants (e.g., *«بهترین پکیج غذای رژیمی در مشهد با ارسال روزانه کدام است؟»*).

### 3.3 Technical & Programmatic SEO
- **Rendering Strategy:** All public discovery, program, cafe, and blog routes MUST use **SSR** or **ISR** (Server Components). Client-side fetching (`useEffect`) for primary page content is strictly forbidden on public routes.
- **Connected JSON-LD Knowledge Graph:** Every page must inject a unified `<script type="application/ld+json">` graph using `@id` references connecting:
  - `Organization` & `LocalBusiness` / `Restaurant` (with exact GeoCoordinates in Mashhad, opening hours, priceRange, and `sameAs` social links).
  - `Product` & `Offer` (for diet packages, including dynamic pricing, availability, and `AggregateRating`).
  - `Menu` & `MenuItem` + `NutritionInformation` (calories, protein, carbs, fat for every cafe and package dish).
  - `BreadcrumbList` & `FAQPage`.
- **Core Web Vitals Budget:** First Load JS `< 140KB`, Fonts `< 95KB`, `LCP < 2.0s`, `CLS < 0.05`.

---

## 4. NON-NEGOTIABLE RULE #3: End-to-End Transactional & Activation Flow
The website is a live transactional machine, not a brochure. Agents must ensure seamless integration across these 4 steps:
1. **Interactive Onboarding & Order Builder:** Users either build their personalized diet package (via the step-by-step smart form calculating BMR/TDEE and selecting Meal Coverage Tier: Full-Board, Workday, or 3-Day Trial) OR select items from the Health Boutique Cafe menu.
2. **Draft Persistence & Lead Capture:** Every step of the form auto-saves to the backend (`OnboardingDraft`) and captures the user's mobile number via OTP (`A-01`) so unfinished funnels can be recovered.
3. **Payment Gateway Abstraction:** Orders connect to Iranian payment gateways (Zarinpal / Saman / Behpardakht) via a clean adapter layer (`PaymentService`) with an immutable `Ledger` record (`J-01`).
4. **Instant Automated Activation:** Upon payment callback (`200 OK` verification):
   - The `Subscription` or `CafeOrder` status transitions to `ACTIVE` / `CONFIRMED` automatically.
   - The `NutritionEngine` generates the user's weekly `CaloriePlan` and assigns default meals from the 14-day rotational menu (`MenuAssignment`).
   - Medical high-risk flags (`A-06`) are routed to the Nutritionist Queue (`B-01`), while standard plans go straight to the Kitchen Production Sheet (`D-08`) and user's PWA Today screen (`A-16`).

---

## 5. NON-NEGOTIABLE RULE #4: Design System & UI Discipline
Design is a core competitive moat of Hessekhub. All UI code must strictly obey `docs/specs/DESIGN_SYSTEM.md` (V2.0):
- **Zero Hard-Coded Styles:** Never write raw hex codes (`#264FA3`), arbitrary pixel spacing, or raw shadows. Use ONLY semantic tokens (`var(--hk-*)`) and mapped Tailwind classes (`bg-canvas`, `bg-surface`, `text-strong`, `primary`, `luxe`, `accent`).
- **80/15/5 Color Distribution:** 80% warm neutrals (`canvas`, `surface`, `subtle`), 15% `primary` blue & `ink`, 5% brand accents.
- **Respect the Body:** NEVER use red (`danger` / `vermilion`) for weight gain, weight plateau, or calorie numbers.
- **Persian-First & Strict RTL:**
  - Use ONLY CSS Logical Properties (`ms-*`, `me-*`, `ps-*`, `pe-*`, `start-*`, `end-*`, `text-start`). Physical classes (`ml-*`, `mr-*`, `pl-*`, `pr-*`, `left-*`, `right-*`, `text-left`, `text-right`) are banned by linter.
  - Primary font is `IRANSansFaNum` (for all Persian text and 100% of numbers) paired with `Montserrat-Latin` (for English letters only).
  - Never apply `letter-spacing` (`tracking-*`) to Persian text.
  - Format all numbers, prices, and weights using `Intl.NumberFormat('fa-IR')`.
- **Dual Density & Touch Targets:** Customer App & Website use `data-density="comfortable"` (`52px` controls, `radius-pill` buttons). Admin/Nutritionist/Kitchen panels use `data-density="compact"` (`40px` controls, `radius-md` buttons, minimum `44×44px` hit area).
- **9 Component States:** Every interactive component must implement `Default`, `Hover`, `Focus-visible`, `Active`, `Disabled`, `Loading`, `Error`, `Success`, and `Empty` states.

---

## 6. Tech Stack & Monorepo Standards
- **Package Manager:** `pnpm` + `Turborepo`
- **Frontend (`apps/web`):** Next.js (App Router, TypeScript, SSR/ISR, PWA via Serwist, Tailwind CSS)
- **Backend (`apps/api`):** NestJS (Modular Monolith matching Modules A–L, OpenAPI/Swagger, BullMQ + Redis)
- **Database (`packages/database`):** PostgreSQL + Prisma ORM
- **Design System (`packages/design-tokens` & `packages/ui`):** Shared CSS variables, Tailwind preset, and React components

### Pre-Commit Agent Verification Checklist
Before finishing any task, the agent must verify:
1. Is 100% of the text/media in this feature editable by the admin in the backend?
2. Does this page output valid Semantic HTML5, JSON-LD Schema, and AEO/GEO metadata?
3. Are all styles coming strictly from `--hk-*` semantic tokens with Logical RTL properties?
4. Do `pnpm lint`, `pnpm typecheck`, and `pnpm test` pass with zero warnings?

