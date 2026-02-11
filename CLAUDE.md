# Denuncia Cívica – Frontend

## Project Overview

Frontend de plataforma para documentación y visibilización de presuntos presos políticos. Construido con Next.js 15 App Router. Maneja información sensible; la seguridad y privacidad son prioridad absoluta.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Forms**: React Hook Form + Zod
- **Data Fetching**: TanStack Query (client), fetch (server components)
- **Auth**: Google OAuth → JWT (httpOnly cookies)
- **Icons**: Lucide React
- **Theme**: next-themes (dark mode)

## Design System

- **Primary**: Navy (#1e293b) – trust, authority
- **Accent**: Amber (#f59e0b) – action, visibility
- **Display Font**: Playfair Display (serif) – headings
- **Body Font**: Inter (sans-serif) – text, labels
- **Components**: shadcn/ui as base, customized via CSS variables
- **Reference**: Design guidelines in `specs/mvp-denuncia-civica/research.md`

## Architecture

- Server Components para páginas públicas (SSR/SSG)
- Client Components para formularios y UI interactiva
- API route handlers como BFF cuando necesario
- Auth state via context provider + httpOnly cookies
- Rutas protegidas: `/admin/*` (moderador), `/panel/*` (comunicador)

## Branching

- `main`: producción
- `preview`: iteración Vercel
- Feature branches: `feat/`, `fix/`, `chore/` (conventional commits)

## Critical Rules

1. **NUNCA** almacenar datos sensibles en localStorage/sessionStorage/cookies
2. **NUNCA** loggear datos personales de denunciantes en consola
3. Datos del formulario de denuncia solo viven en React state
4. Toda página pública debe funcionar con SSR (SEO)
5. Mobile-first: diseñar para 320px primero
6. No usar `any` en TypeScript

## Key Specs

- PRD + User Stories: `specs/mvp-denuncia-civica/spec.md`
- Design Reference: `specs/mvp-denuncia-civica/research.md`
- Implementation Plan: `specs/mvp-denuncia-civica/plan.md`
- Tasks: `specs/mvp-denuncia-civica/tasks.md`
- Constitution: `specs/mvp-denuncia-civica/constitution.md`
- API Contracts: See backend repo `specs/mvp-denuncia-civica/contracts/api-contracts.md`
