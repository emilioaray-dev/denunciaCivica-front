export type CaseStatus =
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'verified'
  | 'rejected'
  | 'info_requested';

export type CaseCategory =
  | 'peaceful_protest'
  | 'freedom_of_expression'
  | 'human_rights'
  | 'community_leadership'
  | 'student_protest'
  | 'legal_defense'
  | 'journalism'
  | 'other';

export interface CasePublic {
  id: string;
  detaineeName: string;
  detaineeAge?: number;
  detentionDate: string;
  residenceCity: string;
  detentionLocation: string;
  detentionCenter?: string;
  category: CaseCategory;
  summary: string;
  status: 'verified';
  isAnonymized: boolean;
  supportCount: number;
  publishedAt: string;
}

export interface CaseDetail extends Omit<CasePublic, 'summary' | 'status'> {
  circumstances: string;
  status: CaseStatus;
  createdAt: string;
  timeline: CaseTimelineEvent[];
}

export interface CaseTimelineEvent {
  event: string;
  date: string;
  type: 'info' | 'success' | 'warning';
}

export interface TrackingResult {
  trackingCode: string;
  status: CaseStatus;
  statusLabel: string;
  lastUpdated: string;
  message?: string;
}
