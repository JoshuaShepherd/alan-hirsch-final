// Auto-generated types for common utilities
// Generated at: 2025-10-06T17:20:33.398Z

import { z } from 'zod';

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: PaginationMeta;
};

export type PaginatedResponse<T = unknown> = {
  items: T[];
  pagination: PaginationMeta;
  total: number;
};

export type ServiceResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: ServiceError;
};

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AnswerOption {
  id: string;
  text: string;
  value: string | number;
  order: number;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
  details?: Record<string, unknown>;
}

export interface ServiceError {
  code: string;
  message: string;
  context?: Record<string, unknown>;
}

// Enum types from schema
export type MinistryRole =
  | 'senior_pastor'
  | 'associate_pastor'
  | 'church_planter'
  | 'denominational_leader'
  | 'seminary_professor'
  | 'seminary_student'
  | 'ministry_staff'
  | 'missionary'
  | 'marketplace_minister'
  | 'nonprofit_leader'
  | 'consultant'
  | 'academic_researcher'
  | 'emerging_leader'
  | 'other';

export type OrganizationType =
  | 'church'
  | 'denomination'
  | 'seminary'
  | 'ministry_network'
  | 'nonprofit'
  | 'business'
  | 'other';

export type OrganizationStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'suspended';

export type OrganizationRole =
  | 'owner'
  | 'admin'
  | 'member'
  | 'viewer';

export type MembershipStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'suspended';

export type ContentType =
  | 'framework'
  | 'article'
  | 'video'
  | 'podcast'
  | 'tool'
  | 'case_study'
  | 'interview'
  | 'course_lesson';

export type ContentStatus =
  | 'draft'
  | 'review'
  | 'approved'
  | 'published'
  | 'archived'
  | 'deleted';

export type AssessmentType =
  | 'apest'
  | 'mdna'
  | 'cultural_intelligence'
  | 'leadership_style'
  | 'spiritual_gifts'
  | 'other';

export type AssessmentStatus =
  | 'active'
  | 'inactive'
  | 'draft'
  | 'archived';

export type QuestionType =
  | 'multiple_choice'
  | 'rating_scale'
  | 'text'
  | 'boolean';

export type CommunityVisibility =
  | 'public'
  | 'private'
  | 'members_only';

export type PostType =
  | 'discussion'
  | 'question'
  | 'announcement'
  | 'resource';

export type SortOrder =
  | 'asc'
  | 'desc';

export type SubscriptionTier =
  | 'free'
  | 'individual'
  | 'professional'
  | 'leader'
  | 'institutional';
