# Denuncia Cívica – Frontend Constitution

## Core Principles

### I. Privacy by Design
Todo componente que maneje datos de denunciantes debe asumir que la información es sensible. Nunca almacenar datos sensibles en localStorage, sessionStorage o cookies. Los datos del formulario de denuncia solo viven en memoria (React state) y se envían al backend en un solo request al final del proceso. No hacer logging de datos personales en consola.

### II. Security-First UI
Cada pantalla que interactúe con datos sensibles debe mostrar indicadores de seguridad visibles. Los trust indicators no son decorativos, son funcionales para generar confianza. CSRF tokens obligatorios en formularios. CSP headers configurados en Next.js middleware. No inline scripts.

### III. Server-First Rendering
Priorizar Server Components y SSR para contenido público (SEO, performance). Usar Client Components solo donde se requiere interactividad (formularios, filtros, acciones). Las páginas públicas (landing, explorar, detalle de caso, about) deben funcionar sin JavaScript habilitado en modo básico. API calls desde Server Components cuando sea posible.

### IV. Mobile-First Responsive
Todas las interfaces se diseñan primero para móvil. La mayoría de denunciantes accederán desde dispositivos móviles en contextos difíciles (conectividad limitada, prisa). El formulario de denuncia debe ser usable en pantallas de 320px. Optimizar para 3G: lazy loading, imágenes optimizadas, bundle splitting agresivo.

### V. Design System Consistency
Usar el sistema de diseño derivado de sentinel-platform. Colores: navy primary (#1e293b), amber accent (#f59e0b). Fuentes: Playfair Display para títulos, Inter para cuerpo. Componentes base de shadcn/ui. No crear componentes custom si shadcn/ui los provee. CSS variables para tokens, Tailwind para utilidades.

### VI. Conventional Commits
Todos los commits siguen conventional commits: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`. Branch naming: `feat/descripcion`, `fix/descripcion`, `chore/descripcion`. Ramas principales: `main` (producción), `preview` (iteración Vercel).

## Technical Constraints

- Next.js 15 con App Router
- TypeScript strict mode
- Tailwind CSS 4 + shadcn/ui
- React Hook Form + Zod para formularios
- TanStack Query para data fetching client-side
- Lucide React para iconografía
- next-themes para dark mode
- No usar `any` en TypeScript. Preferir `unknown` + type guards
- No usar `useEffect` para data fetching (usar Server Components o TanStack Query)
- Máximo 3 niveles de nesting en componentes

## Quality Gates

- TypeScript: 0 errores de tipo
- ESLint: 0 warnings
- Lighthouse: > 90 en todas las categorías para páginas públicas
- Bundle size: < 200KB first load JS
- Accesibilidad: WCAG 2.1 AA mínimo

## Governance

La constitución del frontend es la fuente de verdad para decisiones de arquitectura UI. Cualquier desviación debe documentarse en el PR correspondiente con justificación. La constitución puede enmendarse con acuerdo del equipo y documentación del cambio.

**Version**: 1.0.0 | **Ratified**: 2026-02-11 | **Last Amended**: 2026-02-11
