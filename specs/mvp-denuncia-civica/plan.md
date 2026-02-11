# Implementation Plan: Denuncia Cívica – Frontend

**Branch**: `preview` | **Date**: 2026-02-11 | **Spec**: `specs/mvp-denuncia-civica/spec.md`

## Summary

Frontend Next.js 15 App Router para plataforma de denuncia cívica. SSR para contenido público (SEO), Client Components para formularios interactivos. Design system basado en sentinel-platform (shadcn/ui + Tailwind). Mobile-first, privacy by design.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 22 LTS
**Primary Dependencies**: Next.js 15 (App Router), React 19, shadcn/ui, Tailwind CSS 4, TanStack Query, React Hook Form, Zod, Lucide React, next-themes
**Storage**: N/A (frontend es stateless, datos en backend API)
**Testing**: Vitest + Testing Library (Fase 3+)
**Target Platform**: Web (mobile-first, responsive)
**Project Type**: Web application (frontend only)
**Performance Goals**: < 2s LCP en 3G, > 90 Lighthouse score
**Constraints**: < 200KB first load JS, WCAG 2.1 AA
**Scale/Scope**: ~12 páginas/vistas, ~30 componentes custom

## Constitution Check

| Gate | Status |
|------|--------|
| Privacy by Design | Datos sensibles solo en React state, nunca persistidos client-side |
| Server-First Rendering | Páginas públicas como Server Components, formularios como Client |
| Mobile-First | Breakpoints: 320px → 768px → 1024px → 1280px |
| Design System | Tokens de sentinel-platform migrados a CSS variables |
| Conventional Commits | Configurado con commitlint + husky |

## Project Structure

### Documentation

```text
specs/mvp-denuncia-civica/
├── spec.md
├── constitution.md
├── plan.md (this file)
├── research.md
└── tasks.md
```

### Source Code

```text
src/
├── app/
│   ├── layout.tsx                    # Root layout (fonts, metadata, providers)
│   ├── page.tsx                      # Landing page (SSG)
│   ├── explorar/
│   │   └── page.tsx                  # Case explorer (SSR)
│   ├── caso/
│   │   └── [id]/
│   │       └── page.tsx              # Case detail (SSR)
│   ├── denunciar/
│   │   └── page.tsx                  # Report form (Client Component)
│   ├── consultar/
│   │   └── page.tsx                  # Track by code (Client Component)
│   ├── sobre/
│   │   └── page.tsx                  # About page (SSG)
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx              # Login page
│   │   └── callback/
│   │       └── page.tsx              # OAuth callback handler
│   ├── admin/
│   │   ├── layout.tsx                # Admin layout (auth guard)
│   │   ├── moderacion/
│   │   │   ├── page.tsx              # Moderation queue
│   │   │   └── [id]/
│   │   │       └── page.tsx          # Case moderation detail
│   │   └── usuarios/
│   │       └── page.tsx              # User management (admin only)
│   ├── panel/
│   │   ├── layout.tsx                # Communicator layout (auth guard)
│   │   └── comunicador/
│   │       └── page.tsx              # Communicator dashboard
│   └── not-found.tsx                 # 404 page
├── components/
│   ├── ui/                           # shadcn/ui components
│   ├── layout/
│   │   ├── site-header.tsx
│   │   ├── site-footer.tsx
│   │   └── nav-link.tsx
│   ├── cases/
│   │   ├── case-card.tsx
│   │   ├── case-grid.tsx
│   │   ├── case-filters.tsx
│   │   ├── case-search.tsx
│   │   ├── case-detail.tsx
│   │   ├── case-timeline.tsx
│   │   └── case-support-button.tsx
│   ├── report/
│   │   ├── report-form.tsx           # Multi-step form container
│   │   ├── step-consent.tsx
│   │   ├── step-detainee.tsx
│   │   ├── step-circumstances.tsx
│   │   ├── step-reporter.tsx
│   │   ├── step-evidence.tsx
│   │   ├── step-review.tsx
│   │   ├── report-progress.tsx
│   │   └── report-confirmation.tsx
│   ├── moderation/
│   │   ├── moderation-queue.tsx
│   │   ├── moderation-detail.tsx
│   │   └── moderation-actions.tsx
│   ├── communicator/
│   │   ├── communicator-dashboard.tsx
│   │   ├── communicator-filters.tsx
│   │   └── communicator-export.tsx
│   ├── landing/
│   │   ├── hero-section.tsx
│   │   ├── stats-bar.tsx
│   │   ├── featured-cases.tsx
│   │   ├── trust-indicators.tsx
│   │   └── cta-section.tsx
│   └── shared/
│       ├── status-badge.tsx
│       ├── category-tag.tsx
│       └── loading-skeleton.tsx
├── lib/
│   ├── utils.ts                      # cn() utility
│   ├── api.ts                        # API client (fetch wrapper)
│   ├── auth.ts                       # Auth helpers
│   └── constants.ts                  # Statuses, categories, etc.
├── hooks/
│   ├── use-cases.ts                  # TanStack Query hooks for cases
│   ├── use-auth.ts                   # Auth state hook
│   ├── use-mobile.ts                 # Mobile detection
│   └── use-support.ts               # Support action hook
├── types/
│   ├── case.ts                       # Case types
│   ├── api.ts                        # API response types
│   └── auth.ts                       # Auth types
├── providers/
│   ├── query-provider.tsx            # TanStack Query provider
│   ├── auth-provider.tsx             # Auth context provider
│   └── theme-provider.tsx            # next-themes provider
└── styles/
    └── globals.css                   # CSS variables, fonts, base styles
```

**Structure Decision**: Single frontend application with App Router. Server Components for public pages, Client Components for interactive features. Admin and communicator panels under protected routes.
