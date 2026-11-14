# project-online-map.md — Architecture, URL Silos & Dynamic Admin Map

This document is the spatial and functional map of the **Hessekhub (حس خوب)** platform. It defines the Monorepo structure, the Public SEO/GEO/AEO URL hierarchy, the Transactional & PWA routes, and the exact mapping between the **Dynamic Admin Panel** and the **Public Website**.

---

## 1. Monorepo Directory Structure

```text
hesekhoob-platform/
├── AGENTS.md                        # AI Agent rules & guardrails
├── project-online-map.md            # This file: System & URL topology
├── docs/
│   ├── specs/
│   │   ├── PRD.md                   # Product Requirements (Modules A to L)
│   │   ├── DESIGN_SYSTEM.md         # Official Design System V2.0 (OKLab & Tokens)
│   │   └── NUTRITION_ENGINE.md      # BMR/TDEE & Multi-variable adaptive rules
│   └── seo-geo/
│       ├── GEO_AEO_STRATEGY.md      # LLM optimization, llms.txt & Answer Capsules
│       ├── JSON_LD_TEMPLATES.md     # Connected Knowledge Graph schemas
│       └── REDIRECTS_301.json       # Legacy URL migration map
├── packages/
│   ├── design-tokens/               # tokens.json, tokens.css, tailwind.preset.js
│   ├── ui/                          # Shared RTL Token-driven React Components
│   ├── database/                    # Prisma schema, migrations, and Mashhad seed data
│   └── shared-types/                # Shared DTOs, Zod schemas & API contracts
└── apps/
    ├── api/                         # NestJS Modular Monolith Backend
    │   └── src/modules/
    │       ├── cms/                 # Dynamic pages, blocks, media, SEO/GEO config
    │       ├── auth/                # OTP login, sessions, RBAC
    │       ├── nutrition-engine/    # Calorie calculation, adaptive regulator (C-01..C-09)
    │       ├── programs-packages/   # Diet programs, coverage tiers, subscriptions
    │       ├── cafe/                # Boutique Cafe menu, QR ordering, Pick-up hub
    │       ├── kitchen-ops/         # 14-day rotational menu, BOM, thermal labels
    │       ├── logistics/           # Mashhad zones, delivery slots, courier web list
    │       ├── finance-ledger/      # Immutable ledger, Iranian payment gateways, wallet
    │       ├── crm-growth/          # Leads, unfinished form recovery, referral codes
    │       └── product-cockpit/     # Module I: Events, funnels, experiments, decisions
    └── web/                         # Next.js App Router (Public SEO/GEO + PWA + Panels)
        └── src/app/
            ├── (public)/            # SSR/ISR SEO, GEO & Transactional Storefront
            ├── (funnel)/            # Smart Onboarding, Package Customization & Checkout
            ├── (customer-pwa)/      # Customer App (/app/* - Comfortable Density)
            ├── (panels)/            # Admin, CMS, Nutritionist, Kitchen & Cockpit (Compact)
            └── api/                 # Revalidation webhooks, llms.txt & feed generators
```

---

## 2. Public URL Topology & Intent Silos

### 2.1 GEO / AEO & Machine-Readable Feeds
| Route | Format | Purpose |
|---|---|---|
| `/llms.txt` | Markdown | Concise index of Hessekhub’s core identity, services in Mashhad, packages, cafe menu, and authoritative links for AI Agents (ChatGPT, Perplexity, Claude, Gemini). |
| `/llms-full.txt` | Markdown | Complete, high-density markdown dump of all diet programs, rotational menu items with exact macros, scientific FAQs, and Mashhad delivery zones for deep LLM ingestion. |
| `/api/public/entity-graph.json` | JSON-LD | Machine-readable Knowledge Graph of the entire Hessekhub entity (DietNutrition + Restaurant + Product offers). |
| `/sitemap.xml` & `/robots.txt` | XML / Text | Dynamic sitemaps (Pages, Programs, Local Landings, Cafe Menu, Magazine) explicitly welcoming OAI-SearchBot, PerplexityBot, Google-Extended, and ClaudeBot. |

### 2.2 Diet Programs & Mashhad Delivery Silos (High SEO & Commercial Intent)
| URL Pattern | Rendering | Primary Intent (SEO / GEO / Conversion) | JSON-LD Schemas |
|---|---|---|---|
| `/` | ISR (Tag: `page:home`) | Brand authority («سبک زندگی سالم و پکیج غذای رژیمی در مشهد»), dynamic value props, package comparison, cafe showcase, interactive BMR preview, social proof. | `Organization`, `LocalBusiness`, `WebSite`, `FAQPage` |
| `/programs` | ISR (Tag: `programs`) | Compare all outcome-based programs & coverage tiers (Full 6-Day Package, Executive Workday Lunch Package, No-Dinner Package, 3-Day Trial Box, Maintenance Phase). | `ItemList`, `Product`, `Offer` |
| `/programs/[slug]` | ISR (Tag: `program:[slug]`) | Deep landing page for a specific goal (Weight Loss, Hypertrophy/Athlete, Weight Maintenance, Executive Workday). Includes Direct Answer Capsule (AEO), sample rotational menu, pricing anchor table, and instant «شروع برنامه و ثبت‌نام» CTA. | `Product`, `Offer`, `AggregateRating`, `FAQPage`, `BreadcrumbList` |
| `/mashhad/[intent-slug]` | ISR (Programmatic SEO) | High-intent local landing pages generated from Admin templates (e.g., `/mashhad/diet-food-delivery`, `/mashhad/workday-healthy-lunch-sajjad`, `/mashhad/ketogenic-meal-plan`). | `Service`, `LocalBusiness`, `Product`, `FAQPage` |
| `/menu-showcase` | ISR (Tag: `menu`) | Live showcase of the 14-day rotational menu with exact calories, protein, carbs, fat, and ingredients so users see the food quality before registering. | `Menu`, `MenuItem`, `NutritionInformation` |

### 2.3 Health Boutique Cafe Silo (Dine-in, QR Table & Online Ordering)
| URL Pattern | Rendering | Primary Intent | JSON-LD Schemas |
|---|---|---|---|
| `/cafe` | ISR (Tag: `cafe:home`) | Showcase «کافه‌بوتیک سلامتی حس خوب» in Mashhad: atmosphere, location map, opening hours (8 AM – 12 AM), Friday Cheat-Day reservation, and Pick-up Hub info. | `Restaurant`, `CafeOrCoffeeShop`, `GeoCoordinates` |
| `/cafe/menu` | ISR (Tag: `cafe:menu`) | Full interactive digital menu (Breakfast, Lunch, Dinner, Salads, Healthy Snacks, Coffee & Non-Coffee Drinks) with live macro/allergen filters and direct online ordering / table QR ordering. | `Menu`, `MenuSection`, `MenuItem`, `NutritionInformation` |
| `/cafe/checkout` | SSR / Client | Cart review, table number (for dine-in) or delivery/pick-up time selection, wallet/gateway payment, and instant POS order creation (F-01..F-04). | — |

### 2.4 Funnel & Transactional Routes (Smart Conversion Engine)
| URL Pattern | Purpose & Backend Integration |
|---|---|
| `/tools/calorie-calculator` | SEO & AEO Magnet: Free scientific BMR/TDEE & Macro calculator + Body Type analyzer. Ranks for high-volume nutrition queries and converts visitors directly into the pre-filled Onboarding Funnel. |
| `/start` (Onboarding A-04..A-09) | Step-by-Step Diagnostic Funnel: Goal -> Body Metrics -> Physiological/Medical Screening -> Allergies & Taste Profile -> Instant Preview of Personalized Plan & Target Date -> Select Coverage Tier (Full / Workday / 3-Day Trial). |
| `/checkout` (A-11..A-13) | Address & Mashhad Zone selection (or Cafe Pick-up), Delivery time slot, Discount/Referral code, and Payment Gateway redirect. |
| `/payment/callback` | Verifies transaction with FinanceLedger, immediately activates Subscription or CafeOrder, triggers SMS confirmation, and redirects user to their live `/app/today` dashboard. |

---

## 3. Authenticated Portals (`apps/web/src/app/(customer-pwa)` & `(panels)`)

### 3.1 Customer PWA (`/app/*` — `data-density="comfortable"`)
- `/app/today`: Today’s meals, delivery status, Home Plate Guide (for partial plans), 10-second daily status log.
- `/app/menu`: Weekly rotational menu viewer + 1-tap swap between Option A & Option B (locked 48h prior).
- `/app/check-in`: Friday morning check-in (fasting weight slider, waist circumference, water-retention/cycle chips) + scientific response card (`bg-calm`).
- `/app/subscription`: Freeze days (up to 48h prior), switch delivery address or Cafe Pick-up, 1-click renewal, wallet balance.

### 3.2 Unified Admin, CMS & Operational Panels (`/panel/*` — `data-density="compact"`)
- `/panel/cms/*`: Website & SEO/GEO Control Center (Full dynamic control over pages, texts, images, menus, FAQs, and schemas).
- `/panel/nutritionist/*`: Priority check-in queue (B-01), 360° customer dossier, 1-click multi-variable calorie approval (B-03).
- `/panel/kitchen/*`: Dish bank (D-01), 14-day rotational menu planner (D-04), daily aggregated production sheet (D-08), thermal label printer (D-11).
- `/panel/cockpit/*`: Module I (Product Cockpit): Dual North Star dashboard, conversion funnels, cohort retention, experiment board (I-13), decision log (I-15).

---

## 4. Dynamic Admin Matrix: What Controls What

| Website Element | Admin Panel Module | Database Entity | Revalidation Tag |
|---|---|---|---|
| **Hero, Texts, Banners & Page Sections** | صفحه‌ساز و مدیریت بلاک‌ها (Block Builder) | `CmsPage`, `CmsSectionBlock` (JSON schema with validated typography/color tokens) | `page:[slug]` |
| **All Images, Videos & Alt Texts** | کتابخانه رسانه (Media Library G-04) | `MediaAsset` (stores original + auto-generated AVIF/WebP, alt, dimensions) | `media:[id]` |
| **Package Names, Tiers, Prices & Decoys** | مدیریت برنامه‌ها و تعرفه‌ها (H-01, K-08) | `ProgramTemplate`, `MealCoverageTier`, `PricingRule` | `programs` |
| **Rotational Dishes & Cafe Menu Items** | بانک غذا و منوی کافه (D-01, F-01) | `Meal`, `MealVariant`, `CafeMenuItem` (macros, allergens, photos, stock status) | `menu`, `cafe:menu` |
| **SEO, GEO (`llms.txt`) & AEO FAQs** | مرکز فرماندهی سئو و هوش مصنوعی | `SeoGeoConfig`, `FaqItem`, `ProgrammaticLanding`, `RedirectRule` | `seo:global`, `llms-txt` |
| **Mashhad Delivery Zones & Time Slots** | تنظیمات لجستیک و مناطق (E-01, K-08) | `DeliveryZone` (polygon/neighborhoods), `DeliverySlot`, `PickupPoint` | `logistics:zones` |

---

## 5. End-to-End System Topology (Search to Activation)

```text
[Search Engine / AI Agent (ChatGPT, Perplexity, Google)]
       │  (Reads SSR HTML, JSON-LD Graph & /llms.txt)
       ▼
[User Lands on Dynamic Page (/programs/weight-loss or /cafe/menu)]
       │  (100% content & images served from CMS Cache via ISR)
       ▼
[Interactive Onboarding (/start) OR Direct Food Order (/cafe/checkout)]
       │  1. Calculates BMR/TDEE & Macro Split (C-01)
       │  2. Authenticates via Mobile OTP (A-01)
       │  3. Creates Invoice & Pending Subscription/Order
       ▼
[Iranian Payment Gateway (IPG) ──► Callback to /api/finance/verify]
       │
       ├──► [1. FinanceLedger]: Records immutable transaction (J-01)
       ├──► [2. Subscription/Order]: Status -> ACTIVE (or PENDING_MEDICAL_REVIEW if flagged)
       ├──► [3. NutritionEngine]: Generates Week 1 CaloriePlan & default MenuAssignments
       ├──► [4. KitchenOps]: Adds meals to upcoming Daily Production Sheet (D-08)
       ├──► [5. NotificationEngine]: Sends instant SMS & Push confirmation (L-01)
       └──► [6. ProductCockpit]: Fires `subscription_activated` event to Module I (I-02)
```

