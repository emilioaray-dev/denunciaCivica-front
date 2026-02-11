import type { CaseStatus, CaseCategory } from '@/types';

export const STATUS_CONFIG: Record<CaseStatus, { labelKey: string; color: string }> = {
  draft: { labelKey: 'draft', color: 'gray' },
  submitted: { labelKey: 'submitted', color: 'blue' },
  under_review: { labelKey: 'under_review', color: 'warning' },
  info_requested: { labelKey: 'info_requested', color: 'warning' },
  verified: { labelKey: 'verified', color: 'success' },
  rejected: { labelKey: 'rejected', color: 'destructive' },
};

export const CATEGORY_KEYS: { value: CaseCategory; labelKey: string }[] = [
  { value: 'peaceful_protest', labelKey: 'peaceful_protest' },
  { value: 'freedom_of_expression', labelKey: 'freedom_of_expression' },
  { value: 'human_rights', labelKey: 'human_rights' },
  { value: 'community_leadership', labelKey: 'community_leadership' },
  { value: 'student_protest', labelKey: 'student_protest' },
  { value: 'legal_defense', labelKey: 'legal_defense' },
  { value: 'journalism', labelKey: 'journalism' },
  { value: 'other', labelKey: 'other' },
];

export const ROUTES = {
  HOME: '/',
  EXPLORAR: '/explorar',
  DENUNCIAR: '/denunciar',
  CONSULTAR: '/consultar',
  SOBRE: '/sobre',
  CASO: (id: string) => `/caso/${id}`,
  LOGIN: '/auth/login',
  ADMIN_MODERACION: '/admin/moderacion',
  PANEL_COMUNICADOR: '/panel/comunicador',
} as const;
