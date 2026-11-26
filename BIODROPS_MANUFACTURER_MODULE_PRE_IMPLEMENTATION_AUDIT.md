# BIODROPS — Complete Project Understanding & Architectural Audit

**Document:** `BIODROPS_MANUFACTURER_MODULE_PRE_IMPLEMENTATION_AUDIT.md`  
**Target System:** BIODROPS Web Application (`/home/user/murshid/Biodrops`)  
**Purpose:** Pre-implementation architectural audit prior to designing or building a **Manufacturer Management Page / Module**.  
**Status:** Analysis-Only (No application source code, database schema, or APIs were modified during this audit.)

---

## Legend: Evidence Classification

Throughout this report, findings are explicitly categorized as:
- **[VERIFIED]**: Directly observed in repository source files, configuration, or package manifests.
- **[INFERRED]**: Reasonably deduced from TypeScript DTOs, upstream proxy routes, or unused dependencies.
- **[RECOMMENDED]**: Proposed architectural direction for the future Manufacturer Management module.

---

## 1. Project Overview

**[VERIFIED]** **BIODROPS** (`biodrops` v0.1.0) is the public-facing web platform for **BIODROPS — Premium Packaged Mineral Water**, an initiative of **Biofix Technology LLP** (Kondotty, Malappuram, Kerala, India).

The application serves two primary purposes:
1. **Brand, Product & Quality Showcase:** Presents BIODROPS' 14-stage purification pipeline, Biofix Quality Management System (BQMS), BIS IS:14543 / FSSAI / ISO 9001:2015 certifications, customer segments, and contact inquiry form.
2. **Consumer-Facing Batch Verification & Manufacturer Transparency (`/KNOWYOURWATER`):** Allows customers to enter a 20L jar batch number (or open `/KNOWYOURWATER?batch=...`), inspect real-time laboratory water quality results, view certified production partner details, and generate/download a formatted PDF water quality report (`pdfmake`).

**[VERIFIED]** Notably, Biodrops does **not** currently contain an internal admin dashboard, local PostgreSQL/Prisma models, inventory/order/purchase management, or authentication routes—even though `prisma`, `pg`, `next-auth`, and `bcryptjs` are present in `package.json`. Authoritative manufacturer and batch data is currently fetched read-only from an external upstream service (**Aquora Public API** at `https://aquora-backend.webziointernational.in`).

---

## 2. Technology Stack

**[VERIFIED]** From `package.json`, `next.config.ts`, `tsconfig.json`, and `app/globals.css`:

| Layer | Technology / Package | Version / Details |
| :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `16.2.6` (`next dev --webpack`, `next build`) |
| **UI Library** | React / React DOM | `19.2.4` |
| **Language** | TypeScript | `^5` (`strict: true`, `@/*` path alias) |
| **Styling** | Tailwind CSS + PostCSS | `^4.3.0` (`@tailwindcss/postcss`, `@import "tailwindcss"` in `app/globals.css`) |
| **Animation & Scroll** | Framer Motion, GSAP, `@gsap/react`, Lenis | `framer-motion ^12.39.0`, `gsap ^3.15.0`, `lenis ^1.3.23` |
| **3D / Graphics** | Three.js, `@react-three/fiber`, `@react-three/drei` | `three ^0.184.0`, R3F `^9.6.1`, Drei `^10.7.7` |
| **Icons** | `lucide-react` | `^1.16.0` |
| **PDF & QR Generation** | `pdfmake`, `qrcode.react` | `pdfmake ^0.3.11`, `qrcode.react ^4.2.0` |
| **Date Utilities** | `date-fns` | `^4.4.0` (plus custom local-timezone helpers in `lib/date.ts`) |
| **ORM / DB (Declared Only)** | `prisma`, `pg`, `prisma.config.ts` | `prisma ^7.8.0`, `pg ^8.23.0` *(no `prisma/schema.prisma` file exists)* |
| **Auth (Declared Only)** | `next-auth`, `bcryptjs` | `next-auth ^4.24.14`, `bcryptjs ^3.0.3` *(no active auth routes or config exist)* |
| **Testing & Linting** | `vitest`, `eslint`, `eslint-config-next` | `vitest ^4.1.11`, `eslint ^9` |

---

## 3. Complete Repository Architecture

**[VERIFIED]** Key directories and files observed in `/home/user/murshid/Biodrops`:

- `app/` — Next.js App Router pages, metadata, SEO routes, and API proxy routes:
  - `app/layout.tsx` — Root layout loading Google Fonts (`Inter`, `Archivo`, `Space_Grotesk`), `SmoothScrollProvider`, `ScrollProgress`, `Navbar`, `FloatingActions`, and JSON-LD Schema.org graph.
  - `app/globals.css` — Tailwind v4 entry, font imports (`Inter`, `Satoshi`, `DM Serif Display`), CSS variables (`--bg-primary: #F4F6F8`, `--text-dark: #070D0E`, `--text-muted: #6B7C80`, `--accent: #56C7D9`).
  - `app/page.tsx` — Home landing page (`Hero`, `ProductShowcase`, `PurificationProcess`, `WhyBiodrops`, `WhoWeServe`, `BQMSSection`, `ContactSection`, `Footer`).
  - `app/KNOWYOURWATER/page.tsx` — Batch verification & certified manufacturers directory page.
  - `app/process/page.tsx` — 14-Stage purification process page.
  - `app/why-us/page.tsx` — Brand value proposition page.
  - `app/bqms/page.tsx` — Biofix Quality Management System (BQMS) overview page.
  - `app/certifications/page.tsx` — BIS IS:14543, FSSAI, and BQMS certifications page.
  - `app/faq/page.tsx` — Frequently Asked Questions page with `FAQPage` JSON-LD.
  - `app/about/page.tsx` — Company story & Biofix Technology LLP background.
  - `app/about-ai/page.tsx` — Machine-readable brand reference guide.
  - `app/terms/page.tsx`, `app/privacy/page.tsx`, `app/cookies/page.tsx` — Legal/policy pages (referenced in `app/sitemap.ts` and `components/sections/Footer.tsx`).
  - `app/sitemap.ts`, `app/robots.ts` — Dynamic SEO sitemap and robots configuration (`/api/` disallowed in `robots.ts`).
  - `app/api/public/manufacturers/route.ts` — Next.js Route Handler proxying `GET /api/public/manufacturers` to Aquora backend.
  - `app/api/public/water-verification/[batchNumber]/route.ts` — Next.js Route Handler proxying `GET /api/public/water/batches/:batchNumber` to Aquora backend.
- `components/`
  - `components/layout/Navbar.tsx` — Fixed floating pill navigation bar with scroll-hide behavior and mobile drawer.
  - `components/layout/FloatingActions.tsx` — Fixed bottom-right quick action pills (`Verify Batch` -> `/KNOWYOURWATER`, `Order Now` -> `https://app.edrops.in/customer/shop`).
  - `components/providers/SmoothScrollProvider.tsx` — Lenis smooth scrolling synchronized with GSAP `ScrollTrigger`.
  - `components/effects/ScrollFade.tsx`, `components/effects/ScrollProgress.tsx` — Framer Motion reveal and top progress bar.
  - `components/sections/` — Page sections (`Hero.tsx`, `ProductShowcase.tsx`, `PurificationProcess.tsx`, `ProcessClient.tsx`, `WhyBiodrops.tsx`, `WhoWeServe.tsx`, `BQMSSection.tsx`, `ContactSection.tsx`, `KnowYourWaterForm.tsx`, `BatchResults.tsx`, `Footer.tsx`).
- `services/`
  - `services/aquoraPublicApi.ts` — Typed client API service for Aquora Public API (`fetchAquoraManufacturers`, `verifyAquoraBatch`).
- `lib/`
  - `lib/seoConfig.ts` — Centralized brand/NAP config (`SITE_CONFIG`) and Schema.org generators.
  - `lib/biodropsWaterReportAdapter.ts` — Transforms Aquora batch verification JSON into the PDF report contract with IS 14543 limit checks.
  - `lib/date.ts` — Timezone-safe ISO date parsing and shelf-life/best-before calculation.
- `bqms-water-report-pdf/` — Self-contained `pdfmake` report generation package (`index.ts`, `core/`, `utils/`, `types/`, `assets/`).
- `prisma.config.ts` — Prisma 7 configuration file referencing `prisma/schema.prisma`, `prisma/migrations`, and `DATABASE_URL`.

---

## 4. Existing Modules and Their Functionality

### 4.1 Marketing & Brand Showcase Modules
- **Purpose:** Present BIODROPS products, 14-stage purification, BQMS quality framework, target customer segments, and certifications.
- **Frontend:** `app/page.tsx`, `app/process/page.tsx`, `app/why-us/page.tsx`, `app/bqms/page.tsx`, `app/certifications/page.tsx`, `app/about/page.tsx`, `app/faq/page.tsx`, `app/about-ai/page.tsx`.
- **Backend / DB:** None (static/SSR content).
- **CRUD / Permissions:** Public read-only.

### 4.2 Contact Inquiry Module (`components/sections/ContactSection.tsx`)
- **Purpose:** Collects user inquiries (`name`, `email`, `subject`, `message`).
- **Behavior [VERIFIED]:** Currently a client-side simulated submission (`await new Promise((r) => setTimeout(r, 1800))` in `ContactSection.tsx` lines 85–90). No backend API call or database persistence exists.

### 4.3 Know Your Water / Batch Verification Module
- **Purpose:** Verify 20L jar batch numbers and display certified manufacturing partners.
- **Frontend:** `app/KNOWYOURWATER/page.tsx`, `components/sections/KnowYourWaterForm.tsx`, `components/sections/BatchResults.tsx`.
- **Features [VERIFIED]:**
  - Loads certified manufacturers on mount via `fetchAquoraManufacturers()` and renders a responsive 4-column card grid (initials/logo, verified badge, address, license number, email, phone).
  - Supports `?batch=...` URL query parameter auto-lookup and manual form submission with `AbortController` cancellation and a 30-second error cooldown timer.
  - Displays verified batch details across 4 cards: **Manufacturer**, **Expiry**, **Licenses & Approvals** (FSSAI, BIS/ISI, custom licenses), and **Water Quality** (pH, TDS, turbidity, microbiology, sterilization).
  - Downloads a full PDF lab report via `verifyAquoraBatch(batchNo, { full: true })` -> `adaptVerifyBatchToWaterReport()` -> `downloadWaterReportPdf()`.
- **Backend Proxy:** `app/api/public/manufacturers/route.ts` and `app/api/public/water-verification/[batchNumber]/route.ts`.
- **CRUD / Permissions:** Public read-only (`GET` only).

### 4.4 Absent Modules (Verified Non-Existent)
**[VERIFIED]** The following modules **do not exist** in this repository:
- Admin Dashboard / Backoffice (`/admin` does not exist)
- Authentication / Login (`/login`, `/api/auth/[...nextauth]` do not exist)
- Product Management, Inventory / Stock Movements, Purchase / Procurement, Supplier Management, Order Processing (orders are linked externally to `https://app.edrops.in/customer/shop` in `FloatingActions.tsx`), Payments / Financial Records.

---

## 5. Database Architecture and Relationships

**[VERIFIED]**
- `prisma.config.ts` exists at the project root and points to `prisma/schema.prisma` and `prisma/migrations` using `process.env["DATABASE_URL"]`.
- `package.json` includes `prisma: ^7.8.0` and `pg: ^8.23.0`.
- **However, `prisma/schema.prisma` does NOT exist in the repository.** There are no local database models, primary keys, foreign keys, enums, indexes, or migrations defined in this codebase.

**[INFERRED]**
- The authoritative Manufacturer and Batch data model lives in the external **Aquora** backend (`aquora-backend.webziointernational.in`), where manufacturers appear to be represented as **tenants** (`isBiodropsProduction: boolean`) with fields defined in `AquoraManufacturerDto` (`services/aquoraPublicApi.ts` lines 8–25):
  - Identity: `id`, `name`, `code`, `subdomain`, `customDomain`, `logoUrl`, `badgeLetters`
  - Location & Contact: `address`, `location`, `email`, `phone`
  - Regulatory & Tax: `licenseNumber`, `gstNumber`, `panNumber`
  - Flags & Audit: `isBiodropsProduction`, `createdAt`

---

## 6. Authentication and Authorization

**[VERIFIED]**
- `next-auth` (`^4.24.14`) and `bcryptjs` (`^3.0.3`) are listed in `package.json`.
- However, there is **no** `lib/auth.ts`, **no** `app/api/auth/[...nextauth]/route.ts`, **no** `middleware.ts` or `proxy.ts`, and **no** role-based access control (RBAC) anywhere in the repository.
- All existing routes and `/api/public/*` endpoints are publicly accessible without authentication.

---

## 7. Existing Business Workflows

**[VERIFIED]** Only two operational workflows exist in this codebase:
1. **Certified Manufacturer Discovery (`KnowYourWaterForm.tsx` -> `aquoraPublicApi.ts` -> `/api/public/manufacturers`):**
   - Fetches tenants flagged `IsBiodropsProduction === true` from Aquora and displays them as verified production partners.
2. **Batch Quality Verification & PDF Report Generation (`KnowYourWaterForm.tsx` -> `BatchResults.tsx` -> `biodropsWaterReportAdapter.ts` -> `bqms-water-report-pdf/`):**
   - Queries `/api/public/water-verification/[batchNumber]` (and `?full=true` on PDF download).
   - Evaluates IS 14543 compliance thresholds in `biodropsWaterReportAdapter.ts` (e.g., pH `6.5–8.5`, TDS `<= 500 mg/L`, Turbidity `<= 1.0 NTU`, microbiology `Absent`).
   - Generates a client-side PDF report with `pdfmake`.

**External Workflows (Out-of-Repo [VERIFIED]):**
- Customer ordering redirects externally to `https://app.edrops.in/customer/shop` (`components/layout/FloatingActions.tsx`).
- Manufacturer, batch, and lab data management occurs upstream in Aquora (`https://aquora-backend.webziointernational.in`).

---

## 8. Frontend UI/UX Conventions

**[VERIFIED]** Observed across `app/globals.css`, `app/layout.tsx`, `components/layout/Navbar.tsx`, `components/sections/KnowYourWaterForm.tsx`, `components/sections/BatchResults.tsx`, and `components/sections/ProcessClient.tsx`:

- **Color Palette:**
  - Light Surface Background: `#F4F6F8` (`--bg-primary`)
  - Card Surface: `#FFFFFF` with `border-[#E5E7EB]` or `border-gray-100`
  - Dark Hero / Header / Footer: `#070D0E`
  - Primary Brand Accent (Cyan/Teal): `#56C7D9` and `#15b5a3` (used in `KNOWYOURWATER` and `BQMS`)
  - Action Highlight (Lime Yellow): `#cfef00` (Navbar Contact CTA, FloatingActions Order Now, Process badges)
  - Muted Text: `#6B7C80`
- **Typography:**
  - Body: `Inter` (`var(--font-inter)`)
  - Display / Headings: `Satoshi`, `Inter`, and `DM Serif Display` (`font-serif` on `/KNOWYOURWATER`, `/about`, `/certifications`)
- **Navigation & Layout:**
  - Floating glassmorphic pill `Navbar` (`fixed top-0`, hides on scroll down, reveals on scroll up).
  - Page containers use `max-w-5xl` to `max-w-[1400px]` with `px-4 sm:px-6 lg:px-8`.
- **Cards, Forms, Loading & Error States:**
  - Rounded cards (`rounded-2xl` / `rounded-3xl`) with subtle shadows and hover elevation (`hover:-translate-y-0.5`).
  - Skeleton loaders using `animate-pulse` (`BatchResultsSkeleton`, `KnowYourWaterForm` manufacturer grid skeleton).
  - Animated state transitions via `framer-motion` (`AnimatePresence`, `ScrollFade`).
  - Inline error banners with amber cooldown badges and empty-state cards.
  - No existing admin sidebar, data table, pagination controls, or confirmation dialog components exist in the repo yet.

---

## 9. Backend API Architecture

**[VERIFIED]**
- **Pattern:** Next.js App Router Route Handlers (`app/api/public/.../route.ts`) acting as **same-origin BFF/proxy endpoints** to Aquora (`getUpstreamBaseUrl()`).
- **Environment Variables Used:**
  - `AQUORA_PUBLIC_API_URL`
  - `NEXT_PUBLIC_AQUORA_PUBLIC_API_URL`
  - `NEXT_PUBLIC_AQUORA_API_URL`
  - `AQUORA_API_URL`
  - Fallback: `https://aquora-backend.webziointernational.in`
- **Timeouts & Caching:**
  - 10-second `AbortController` timeout returning `504` (`AQUORA_TIMEOUT`) or `502` (`AQUORA_CONNECTION_FAILED`).
  - `/api/public/manufacturers` uses `next: { revalidate: 60 }` and `Cache-Control: public, s-maxage=60, stale-while-revalidate=300`.
  - `/api/public/water-verification/[batchNumber]` uses `cache: "no-store"`.
- **Response Envelope (`AquoraApiResponse<T>`):**
  - `{ success: boolean, message?: string, data?: T, code?: string, errors?: string[] }`.
  - Supports both direct arrays and `AquoraPagedResult<T>` (`items`, `totalCount`, `page`, `pageSize`, `totalPages`).

---

## 10. Manufacturer Module Integration Opportunities

**[RECOMMENDED]**
1. **Reuse `AquoraManufacturerDto` & Proxy Pattern:** `services/aquoraPublicApi.ts` already defines `AquoraManufacturerDto` (including `id`, `name`, `code`, `address`, `location`, `licenseNumber`, `gstNumber`, `panNumber`, `email`, `phone`, `isBiodropsProduction`, `createdAt`) and `AquoraPagedResult<T>` with `search`, `page`, and `pageSize` query parameters.
2. **Public vs. Admin Separation:**
   - **If the Manufacturer Page is a public directory / plant showcase:** It can consume `GET /api/public/manufacturers` (already cached and typed) and link each manufacturer to `/KNOWYOURWATER`.
   - **If the Manufacturer Management Page is an authenticated Admin CRUD module:** It must integrate with either (a) Aquora's private/admin APIs (requiring service-to-service auth/API keys) or (b) a newly initialized local PostgreSQL + Prisma schema (`prisma/schema.prisma`) plus `next-auth` authentication.
3. **Batch Verification Cross-Linking:** Verified manufacturers can link directly to `/KNOWYOURWATER` or filter batches produced by that facility.

---

## 11. Potential Technical Risks

1. **Dual Source-of-Truth Risk (Local DB vs. Aquora) [VERIFIED / CRITICAL]:**
   - Aquora is currently the authoritative source for `manufacturers` and `batches`. Creating a separate local `Manufacturer` table in PostgreSQL without syncing to Aquora could cause `/KNOWYOURWATER` and the Management Page to diverge.
2. **Missing Auth & Database Scaffolding [VERIFIED]:**
   - Although `next-auth`, `prisma`, `pg`, and `bcryptjs` are in `package.json`, **zero** auth middleware, user tables, or `prisma/schema.prisma` exist. Exposing write endpoints (`POST`/`PATCH`/`DELETE`) without implementing `next-auth` + RBAC first would be a severe security vulnerability.
3. **Caching Staleness [VERIFIED]:**
   - `app/api/public/manufacturers/route.ts` caches responses for 60s (`s-maxage=60, stale-while-revalidate=300`). Admin mutations would not appear immediately unless cache revalidation (`revalidatePath` / `no-store` for admin routes) is handled.
4. **No Existing Admin UI Primitives [VERIFIED]:**
   - There is no existing admin layout, sidebar, data table, modal/drawer, or toast system; these must be built consistently with Biodrops' `#F4F6F8` / `#070D0E` / `#56C7D9` / `#cfef00` design system.

---

## 12. Recommended Manufacturer Module Architecture

**[RECOMMENDED]**
Before writing code, confirm whether Manufacturer Management will be backed by **Aquora Admin APIs** or a **local Prisma/PostgreSQL database**. Assuming an authenticated Admin Management module:

1. **Authentication Layer (Prerequisite if Admin CRUD):**
   - Implement `lib/auth.ts` (NextAuth Credentials provider + `bcryptjs`), `app/api/auth/[...nextauth]/route.ts`, and `middleware.ts` protecting `/admin/:path*` and `/api/admin/:path*` with role checks (`ADMIN` / `OPERATOR`).
2. **Data Layer:**
   - **Option A (Aquora-Backed):** Add authenticated server-only proxy routes under `app/api/admin/manufacturers/` forwarding to Aquora's management endpoints using server-side credentials.
   - **Option B (Local Prisma + Sync):** Create `prisma/schema.prisma` with a `Manufacturer` model mirroring `AquoraManufacturerDto` fields (`id`, `name`, `code`, `address`, `location`, `licenseNumber`, `gstNumber`, `panNumber`, `email`, `phone`, `isBiodropsProduction`, `status`, `createdAt`, `updatedAt`).
3. **Frontend Architecture:**
   - Route: `app/admin/manufacturers/page.tsx` (or `/manufacturers` if public-facing).
   - Components under `components/admin/manufacturers/`:
     - `ManufacturersTable.tsx` (search, status filter, pagination using `AquoraPagedResult` shape)
     - `ManufacturerFormModal.tsx` (create/edit drawer or modal matching Biodrops' rounded-2xl / `#56C7D9` focus styles)
     - `ManufacturerStatusBadge.tsx` & `ConfirmDeleteDialog.tsx`

---

## 13. Files Likely to Require Modification (Future Implementation Phase)

**[RECOMMENDED]** *(No files modified during this audit)*

| File Path | Purpose of Future Change |
| :--- | :--- |
| `services/aquoraPublicApi.ts` | Reuse/extend `AquoraManufacturerDto` and `AquoraPagedResult` types for management views. |
| `app/api/admin/manufacturers/route.ts` *(new)* | Authenticated `GET` (list/search/paginate) and `POST` (create) handlers. |
| `app/api/admin/manufacturers/[id]/route.ts` *(new)* | Authenticated `GET`, `PATCH` (update/toggle active), and `DELETE` handlers. |
| `app/admin/layout.tsx` & `app/admin/manufacturers/page.tsx` *(new)* | Admin shell/sidebar and Manufacturer Management page. |
| `prisma/schema.prisma` *(new, if local DB)* | Define `User` and `Manufacturer` models if not delegating persistence to Aquora. |
| `lib/auth.ts` & `middleware.ts` *(new, if admin CRUD)* | Session management and route/API protection. |

---

## 14. Implementation Recommendations

1. **Clarify Source of Truth First:** Confirm whether Manufacturer CRUD should call **Aquora's backend APIs** or use a **local PostgreSQL database via Prisma**.
2. **Clarify Scope (Public vs. Admin):** Confirm whether the requested page is a **public-facing Manufacturer / Plant Directory** (read-only, using existing `/api/public/manufacturers`) or an **internal Admin Manufacturer Management CRUD portal** (requiring login, roles, and write APIs).
3. **Build Auth Before Write APIs:** If CRUD is required, implement `next-auth` + role checks before exposing any `POST`/`PATCH`/`DELETE` routes.
4. **Preserve Design Consistency:** Match the existing `#F4F6F8` background, `#070D0E` dark accents, `#56C7D9` / `#15b5a3` teal highlights, `#cfef00` primary CTAs, `Inter`/`Satoshi` typography, and `animate-pulse` skeleton patterns.
