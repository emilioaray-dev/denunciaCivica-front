# Research: Denuncia Cívica – Design Reference Analysis

**Source**: https://github.com/emilioaray-dev/sentinel-platform.git
**Analyzed**: 2026-02-11

## Design System Summary

### Color Palette (CSS Variables, HSL)

#### Light Mode
| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | 210 20% 98% | Page background (near-white light blue) |
| `--foreground` | 215 25% 12% | Primary text (dark blue-gray) |
| `--primary` | 215 30% 18% | Dark navy (buttons, headers) |
| `--primary-foreground` | 210 20% 98% | Text on primary |
| `--secondary` | 210 15% 93% | Light gray-blue backgrounds |
| `--accent` | 38 92% 50% | Vibrant amber/gold (CTAs, highlights) |
| `--success` | 152 60% 36% | Verified status (emerald green) |
| `--warning` | 38 92% 50% | Amber (same as accent) |
| `--info` | 205 80% 50% | Informational (bright blue) |
| `--destructive` | 0 72% 51% | Errors, rejected status (red) |
| `--muted` | 210 15% 95% | Muted backgrounds |
| `--muted-foreground` | 215 12% 50% | Secondary text |
| `--border` | 214 20% 88% | Light borders |
| `--radius` | 0.5rem | Default border radius |

#### Dark Mode
| Token | HSL Value |
|-------|-----------|
| `--background` | 215 30% 8% |
| `--foreground` | 210 20% 92% |
| `--card` | 215 28% 12% |
| `--primary` | 38 92% 50% (accent becomes primary) |
| `--secondary` | 215 25% 18% |

#### Custom Tokens
```css
--hero-gradient: linear-gradient(135deg, hsl(215 30% 14%) 0%, hsl(215 25% 22%) 50%, hsl(220 20% 28%) 100%);
--card-shadow: 0 1px 3px hsl(215 25% 12% / 0.06), 0 4px 12px hsl(215 25% 12% / 0.04);
--card-shadow-hover: 0 4px 12px hsl(215 25% 12% / 0.1), 0 8px 24px hsl(215 25% 12% / 0.06);
--amber-glow: 0 0 40px hsl(38 92% 50% / 0.15);
```

### Typography

| Type | Font | Weights | Usage |
|------|------|---------|-------|
| Display | Playfair Display (serif) | 400, 500, 600, 700 | H1, H2, H3 |
| Body | Inter (sans-serif) | 300, 400, 500, 600, 700 | Body, labels, buttons |

### Animations

| Name | Description | Duration |
|------|-------------|----------|
| `fade-in` | Fade + slide up (translateY 12→0) | 0.5s ease-out |
| `pulse-gentle` | Subtle opacity pulse | 2s ease-in-out infinite |
| `accordion-down/up` | Expand/collapse | 0.2s ease-out |

### Component Patterns from Sentinel Platform

1. **Card hover**: shadow elevation + translateY(-2px) + title color → accent
2. **Hero section**: Background image with 85% opacity gradient overlay
3. **Stats bar**: 4-column grid with icon + number + label
4. **Trust indicators**: 4-column grid cards with icon + title + description
5. **Multi-step form**: Numbered progress bar + card per step + back/next navigation
6. **Status badges**: Color-coded by status (verified=green, pending=yellow, rejected=red)
7. **Case cards**: Link wrapper, badge + category + title + summary (2-line clamp) + meta + support count

### Icons Used (Lucide React)

Shield, ShieldCheck, Lock, Eye, EyeOff, Heart, Users, UserCheck, FileText, Filter, Search, ArrowLeft, ArrowRight, CheckCircle, AlertTriangle, Info, Menu, X, Calendar, MapPin, ExternalLink

### Page Structure from Sentinel

| Page | SSR/SSG | Key Sections |
|------|---------|-------------|
| Landing (/) | SSG | Hero, StatsBar, FeaturedCases, TrustIndicators, CTA |
| Explorer (/explorar) | SSR | Search, CategoryFilters, CaseGrid |
| Case Detail (/caso/:id) | SSR | Back link, Status, Detail, Timeline, Support |
| Report (/denunciar) | Client | 5-step form wizard |
| About (/sobre) | SSG | Mission, Process, Security, Roles |
| 404 | Static | Centered 404 message |

### Statuses from Reference

```typescript
type CaseStatus = 'draft' | 'submitted' | 'under_review' | 'info_requested' | 'verified' | 'rejected';

const statusConfig = {
  draft: { label: 'Borrador', color: 'gray' },
  submitted: { label: 'Enviado', color: 'blue' },
  under_review: { label: 'En revisión', color: 'warning' },
  info_requested: { label: 'Info. solicitada', color: 'warning' },
  verified: { label: 'Verificado', color: 'success', icon: CheckCircle },
  rejected: { label: 'Rechazado', color: 'destructive' },
};
```

### Categories from Reference

```typescript
const categories = [
  { value: 'peaceful_protest', label: 'Manifestación pacífica' },
  { value: 'freedom_of_expression', label: 'Libertad de expresión' },
  { value: 'human_rights', label: 'Derechos humanos' },
  { value: 'community_leadership', label: 'Liderazgo comunitario' },
  { value: 'student_protest', label: 'Protesta estudiantil' },
  { value: 'legal_defense', label: 'Defensa legal' },
  { value: 'journalism', label: 'Periodismo' },
  { value: 'other', label: 'Otro' },
];
```

### Dependencies to Install

**Core**:
- next@15, react@19, react-dom@19, typescript@5

**UI**:
- tailwindcss@4, @tailwindcss/postcss
- shadcn/ui (via `npx shadcn@latest init`)
- lucide-react, next-themes, sonner

**Forms**:
- react-hook-form, @hookform/resolvers, zod

**Data**:
- @tanstack/react-query

**Fonts**:
- @next/font (built-in) or Google Fonts link

**Dev**:
- eslint, prettier, @commitlint/cli, @commitlint/config-conventional, husky
