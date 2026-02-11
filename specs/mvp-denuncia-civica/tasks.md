# Tasks: Denuncia Cívica – Frontend

**Input**: Design documents from `specs/mvp-denuncia-civica/`
**Prerequisites**: plan.md, spec.md, constitution.md

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and design system setup

- [ ] FT-001 Initialize Next.js 15 with App Router, TypeScript strict, Tailwind CSS 4
- [ ] FT-002 Configure ESLint + Prettier + commitlint + husky
- [ ] FT-003 [P] Install and configure shadcn/ui (default style, slate base)
- [ ] FT-004 [P] Migrate design tokens from sentinel-platform to globals.css (colors, fonts, shadows, animations)
- [ ] FT-005 [P] Configure Google Fonts: Playfair Display + Inter
- [ ] FT-006 [P] Configure next-themes for dark mode support
- [ ] FT-007 Create root layout.tsx with providers (QueryProvider, AuthProvider, ThemeProvider)
- [ ] FT-008 [P] Create API client lib (fetch wrapper with base URL, error handling, auth headers)
- [ ] FT-009 [P] Create TypeScript types (case.ts, api.ts, auth.ts) matching API contracts
- [ ] FT-010 [P] Create constants (statuses, categories with labels, routes)
- [ ] FT-011 [P] Create .env.example with required variables documented

**Checkpoint**: Next.js app runs, design tokens applied, TypeScript compiles clean

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared layout components and auth infrastructure

- [ ] FT-012 [P] Build SiteHeader component (logo, nav, mobile hamburger, CTA button)
- [ ] FT-013 [P] Build SiteFooter component (3 columns, links, privacy info)
- [ ] FT-014 [P] Build NavLink component with active state detection
- [ ] FT-015 Create app-wide layout wrapping Header + main + Footer
- [ ] FT-016 [P] Build StatusBadge component (color-coded by case status)
- [ ] FT-017 [P] Build CategoryTag component
- [ ] FT-018 [P] Build LoadingSkeleton component (reusable)
- [ ] FT-019 Implement auth flow: login page, OAuth redirect, callback handler
- [ ] FT-020 Create AuthProvider context (token management, user state, role checks)
- [ ] FT-021 Create useAuth hook (login, logout, isAuthenticated, hasRole)
- [ ] FT-022 [P] Create protected route middleware for /admin/* and /panel/* routes
- [ ] FT-023 [P] Build 404 not-found page

**Checkpoint**: Navigation works, auth flow complete, protected routes enforce roles

---

## Phase 3: User Story 1 – Envío de Denuncia (Priority: P1)

**Goal**: A reporter can submit a complete denuncia and receive a tracking code

**Independent Test**: Complete the multi-step form, submit, verify tracking code displayed

### Implementation

- [ ] FT-024 [US1] Build ReportForm container component (step state machine, navigation)
- [ ] FT-025 [US1] Build ReportProgress component (step indicators with numbers)
- [ ] FT-026 [P] [US1] Build StepConsent component (warnings, checkbox, privacy info)
- [ ] FT-027 [P] [US1] Build StepDetainee component (name, age, date, location, category form)
- [ ] FT-028 [P] [US1] Build StepCircumstances component (textarea with counter, guidance)
- [ ] FT-029 [P] [US1] Build StepReporter component (email, name, relation, anonymous toggle)
- [ ] FT-030 [US1] Build StepEvidence component (file upload with drag-drop, preview, validation)
- [ ] FT-031 [US1] Build StepReview component (summary cards of all data, edit links per section)
- [ ] FT-032 [US1] Build ReportConfirmation component (success message, tracking code, security info)
- [ ] FT-033 [US1] Create Zod schemas for each form step validation
- [ ] FT-034 [US1] Integrate form submission with POST /api/v1/cases endpoint
- [ ] FT-035 [US1] Create /denunciar page.tsx wiring ReportForm component
- [ ] FT-036 [US1] Handle form errors, network failures, and CAPTCHA integration

**Checkpoint**: Full denuncia flow works end-to-end. Tracking code displayed on success.

---

## Phase 4: User Story 2 – Exploración Pública de Casos (Priority: P1)

**Goal**: Public users can browse, search, and filter verified cases

**Independent Test**: Navigate to /explorar, apply filters, click through to case detail

### Implementation

- [ ] FT-037 [P] [US2] Build CaseCard component (status badge, category, name, summary, location, support count)
- [ ] FT-038 [P] [US2] Build CaseGrid component (responsive grid layout)
- [ ] FT-039 [P] [US2] Build CaseFilters component (category buttons, country filter)
- [ ] FT-040 [P] [US2] Build CaseSearch component (text input with debounce)
- [ ] FT-041 [US2] Create useCases hook (TanStack Query with pagination, filters, search)
- [ ] FT-042 [US2] Create /explorar page.tsx (SSR with filters as search params)
- [ ] FT-043 [US2] Build CaseDetail component (full info, timeline, support)
- [ ] FT-044 [US2] Build CaseTimeline component (events list with status colors)
- [ ] FT-045 [US2] Create /caso/[id]/page.tsx (SSR with dynamic metadata for SEO)
- [ ] FT-046 [US2] Implement empty state for no results
- [ ] FT-047 [US2] Implement infinite scroll or "load more" pagination

**Checkpoint**: Cases browsable, searchable, filterable. Detail page renders with SEO metadata.

---

## Phase 5: User Story 3 – Moderación de Casos (Priority: P1)

**Goal**: Moderators can review, verify, reject, or request info on pending cases

**Independent Test**: Login as moderator, access queue, take action on a case

### Implementation

- [ ] FT-048 [US3] Build ModerationQueue component (table with case summary, status, date)
- [ ] FT-049 [US3] Build ModerationDetail component (full case view + reporter info + evidence viewer)
- [ ] FT-050 [US3] Build ModerationActions component (verify/reject/request_info buttons with modals)
- [ ] FT-051 [US3] Create /admin/moderacion/page.tsx (queue view)
- [ ] FT-052 [US3] Create /admin/moderacion/[id]/page.tsx (detail + actions)
- [ ] FT-053 [US3] Create admin layout.tsx with sidebar navigation and role guard
- [ ] FT-054 [US3] Integrate with moderation API endpoints
- [ ] FT-055 [US3] Handle optimistic updates on moderation actions

**Checkpoint**: Moderators can manage the full case lifecycle from their panel.

---

## Phase 6: User Story 4 – Apoyo Comunitario (Priority: P2)

**Goal**: Public users can support verified cases

### Implementation

- [ ] FT-056 [US4] Build CaseSupportButton component (count, animated state change)
- [ ] FT-057 [US4] Create useSupport hook (POST support, persist to localStorage, dedup)
- [ ] FT-058 [US4] Integrate support button in CaseDetail page
- [ ] FT-059 [US4] Add fingerprint generation utility (device hash for dedup)

**Checkpoint**: Users can support cases. Button reflects state across page visits.

---

## Phase 7: User Story 5 – Panel de Comunicadores (Priority: P2)

**Goal**: Communicators access extended case data and can export

### Implementation

- [ ] FT-060 [US5] Build CommunicatorDashboard component (stats cards + case table)
- [ ] FT-061 [US5] Build CommunicatorFilters component (date range + category + country)
- [ ] FT-062 [US5] Build CommunicatorExport component (format selector + download trigger)
- [ ] FT-063 [US5] Create /panel/comunicador/page.tsx with layout and role guard
- [ ] FT-064 [US5] Create panel layout.tsx with sidebar navigation
- [ ] FT-065 [US5] Integrate with communicator API endpoints

**Checkpoint**: Communicators can view extended data and export filtered cases.

---

## Phase 8: User Story 6 – Consulta por Tracking Code (Priority: P3)

**Goal**: Reporters can check their case status using the tracking code

### Implementation

- [ ] FT-066 [US6] Build TrackingForm component (code input + submit)
- [ ] FT-067 [US6] Build TrackingResult component (status display, status label, last updated)
- [ ] FT-068 [US6] Create /consultar/page.tsx
- [ ] FT-069 [US6] Integrate with GET /cases/track/:code endpoint

**Checkpoint**: Reporters can check status with their code. Invalid codes show generic "not found".

---

## Phase 9: Landing Page & Static Pages (Priority: P1)

**Goal**: Public-facing landing and informational pages

### Implementation

- [ ] FT-070 [P] Build HeroSection component (background, title, CTAs)
- [ ] FT-071 [P] Build StatsBar component (4 stat cards with icons)
- [ ] FT-072 [P] Build FeaturedCases component (3 latest verified cases)
- [ ] FT-073 [P] Build TrustIndicators component (4 security pillars)
- [ ] FT-074 [P] Build CTASection component (call to action for reporting)
- [ ] FT-075 Create / page.tsx (landing, SSG with revalidation)
- [ ] FT-076 Create /sobre/page.tsx (About: mission, process, security, roles)

**Checkpoint**: Landing page loads fast, communicates trust, and drives to action.

---

## Phase 10: Polish & Cross-Cutting Concerns

- [ ] FT-077 [P] SEO: meta tags, Open Graph, sitemap.xml, robots.txt
- [ ] FT-078 [P] Accessibility audit: keyboard nav, screen reader, contrast
- [ ] FT-079 [P] Loading states for all async operations
- [ ] FT-080 [P] Error boundaries for each route segment
- [ ] FT-081 Performance: lazy loading, image optimization (next/image), bundle analysis
- [ ] FT-082 [P] Favicon and PWA manifest
- [ ] FT-083 Dark mode verification across all pages

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies
- **Phase 2 (Foundational)**: Depends on Phase 1
- **Phase 3-9 (User Stories)**: All depend on Phase 2
- **Phase 9 (Landing)**: Can run in parallel with Phase 3-4
- **Phase 10 (Polish)**: After all user stories

### Recommended Sequence

1. Phase 1 → Phase 2 → Phase 9 (landing visible early)
2. Phase 3 (denuncia) → Phase 4 (explorar) → Phase 5 (moderación)
3. Phase 6 + 7 + 8 in parallel
4. Phase 10 (polish)

### Parallel Opportunities

- All [P] tasks within a phase can run in parallel
- Phase 9 (Landing) can start alongside Phase 3
- Phases 6, 7, 8 are independent of each other
