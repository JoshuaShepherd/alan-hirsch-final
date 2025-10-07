// Global type definitions for Alan Hirsch Digital Platform
// This file provides centralized type definitions and utilities

import { z } from 'zod';

// ============================================================================
// API Response Types (Aligned with ALIGNMENT_REFERENCE)
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

export interface ValidationErrorDetail {
  field: string;
  message: string;
  code: string;
}

// ============================================================================
// Authentication & User Types
// ============================================================================

export interface AuthUser {
  id: string;
  email: string;
  [key: string]: unknown;
}

export interface SessionUser extends AuthUser {
  profile?: import('@/lib/contracts').UserProfile;
  organizations?: import('@/lib/contracts').Organization[];
}

// ============================================================================
// Form & Action Types
// ============================================================================

export interface ActionState {
  error?: string;
  success?: string;
  [key: string]: unknown;
}

export interface FormFieldError {
  field: string;
  message: string;
}

// ============================================================================
// Database Query Types
// ============================================================================

export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface FilterOptions {
  [key: string]: unknown;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface AnalyticsEvent {
  id: string;
  userId?: string;
  eventType: string;
  eventAction: string;
  eventLabel?: string;
  contentId?: string;
  properties?: Record<string, unknown>;
  createdAt: Date;
}

export interface DashboardStats {
  contentStats: {
    totalContent: number;
    publishedContent: number;
    totalViews: number;
  };
  subscriptionStats: {
    totalSubscribers: number;
    activeSubscribers: number;
  };
  recentActivity: AnalyticsEvent[];
}

// ============================================================================
// Utility Types
// ============================================================================

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type NonNullable<T> = T extends null | undefined ? never : T;

// ============================================================================
// Type Guards
// ============================================================================

export function isApiResponse<T>(value: unknown): value is ApiResponse<T> {
  return (
    typeof value === 'object' &&
    value !== null &&
    ('data' in value || 'error' in value || 'success' in value)
  );
}

export function isPaginatedResponse<T>(
  value: unknown
): value is PaginatedResponse<T> {
  return (
    isApiResponse<T[]>(value) &&
    'pagination' in value &&
    typeof (value as PaginatedResponse<T>).pagination === 'object'
  );
}

export function isValidationError(
  value: unknown
): value is ValidationErrorDetail {
  return (
    typeof value === 'object' &&
    value !== null &&
    'field' in value &&
    'message' in value &&
    typeof (value as ValidationErrorDetail).field === 'string' &&
    typeof (value as ValidationErrorDetail).message === 'string'
  );
}

// ============================================================================
// Zod Schema Utilities
// ============================================================================

export const createPaginatedSchema = <T>(itemSchema: z.ZodSchema<T>) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      page: z.number().int().min(1),
      limit: z.number().int().min(1),
      total: z.number().int().min(0),
      hasMore: z.boolean(),
    }),
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

export const createResponseSchema = <T>(dataSchema: z.ZodSchema<T>) =>
  z.object({
    data: dataSchema,
    success: z.boolean(),
    error: z.string().optional(),
    message: z.string().optional(),
  });

// ============================================================================
// Environment Types
// ============================================================================

export interface EnvironmentConfig {
  NODE_ENV: 'development' | 'production' | 'test';
  DATABASE_URL: string;
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_WEBHOOK_SECRET: string;
  NEXTAUTH_SECRET: string;
  NEXTAUTH_URL: string;
}

// ============================================================================
// Error Types
// ============================================================================

export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly details?: unknown;

  constructor(
    message: string,
    code: string = 'INTERNAL_ERROR',
    statusCode: number = 500,
    details?: unknown
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  public override readonly code: string = 'VALIDATION_ERROR';

  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id
      ? `${resource} with ID ${id} not found`
      : `${resource} not found`;
    super(message, 'NOT_FOUND', 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 'UNAUTHORIZED', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 'FORBIDDEN', 403);
  }
}

// ============================================================================
// Export all types from contracts (Aligned with ALIGNMENT_REFERENCE)
// ============================================================================

// Re-export all contract types to maintain backward compatibility
export type {
  // AI Types
  AiContentJob,
  AiContentJobEntity,
  AiContentJobResponse,
  AiConversation,
  AiConversationEntity,
  AiConversationResponse,
  AiCrossReferenceSuggestion,
  AiCrossReferenceSuggestionEntity,
  AiCrossReferenceSuggestionResponse,
  AiMessage,
  AiMessageEntity,
  AiMessageResponse,
  // Assessment Types
  Assessment,
  AssessmentEntity,
  AssessmentQuery,
  AssessmentQuestion,
  AssessmentQuestionEntity,
  AssessmentQuestionQuery,
  AssessmentQuestionResponse,
  AssessmentResponse,
  AssessmentResponseEntity,
  AssessmentResponseQuery,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  CompleteAssessmentInput,
  // Content Types
  ContentCategory,
  ContentCategoryEntity,
  ContentCategoryQuery,
  ContentCategoryResponse,
  ContentCrossReference,
  ContentCrossReferenceEntity,
  ContentItem,
  ContentItemEntity,
  ContentItemForm,
  ContentItemQuery,
  ContentItemResponse,
  ContentSeries,
  ContentSeriesEntity,
  ContentSeriesQuery,
  ContentSeriesResponse,
  CreateAiContentJob,
  CreateAiConversation,
  CreateAiCrossReferenceSuggestion,
  CreateAiMessage,
  CreateAssessment,
  CreateAssessmentQuestion,
  CreateAssessmentResponse,
  CreateContentCategory,
  CreateContentItem,
  CreateContentSeries,
  // Organization Types
  CreateOrganization,
  CreateOrganizationMembership,
  CreateTheologicalConcept,
  CreateUserAssessment,
  // User Types
  CreateUserProfile,
  NewAiContentJob,
  NewAiConversation,
  NewAiCrossReferenceSuggestion,
  NewAiMessage,
  NewAssessment,
  NewAssessmentQuestion,
  NewAssessmentResponse,
  NewContentCategory,
  NewContentCrossReference,
  NewContentItem,
  NewContentSeries,
  NewOrganization,
  NewOrganizationMembership,
  NewSeriesContentItem,
  NewTheologicalConcept,
  NewUserAssessment,
  NewUserProfile,
  Organization,
  OrganizationEntity,
  OrganizationForm,
  OrganizationInvitation,
  OrganizationMembership,
  OrganizationMembershipEntity,
  OrganizationMembershipQuery,
  OrganizationMembershipResponse,
  OrganizationQuery,
  OrganizationResponse,
  PublicUser,
  SaveResponsesInput,
  SeriesContentItem,
  StartAssessmentInput,
  TheologicalConcept,
  TheologicalConceptEntity,
  TheologicalConceptResponse,
  UpdateAiContentJob,
  UpdateAiConversation,
  UpdateAiCrossReferenceSuggestion,
  UpdateAiMessage,
  UpdateAssessment,
  UpdateAssessmentQuestion,
  UpdateAssessmentResponse,
  UpdateContentCategory,
  UpdateContentItem,
  UpdateContentSeries,
  UpdateOrganization,
  UpdateOrganizationMembership,
  UpdateTheologicalConcept,
  UpdateUserAssessment,
  UpdateUserProfile,
  UserAssessment,
  UserAssessmentEntity,
  UserAssessmentFilters,
  UserAssessmentQuery,
  UserAssessmentResponse,
  UserAssessmentWithDetailsResponse,
  UserEntity,
  UserForm,
  UserProfile,
  UserProfileEntity,
  UserProfileForm,
  UserProfileQuery,
  UserProfileResponse,
  UserQuery,
} from '@/lib/contracts';

// ============================================================================
// COMPUTED FIELD TYPES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================
// These types represent computed fields that are added by mappers

export interface UserProfileComputedFields {
  isActive: boolean;
  hasCompletedOnboarding: boolean;
  fullName: string;
  displayNameOrFullName: string;
  hasCustomDomain: boolean;
  hasSubdomain: boolean;
  isPublicProfile: boolean;
  canReceiveNotifications: boolean;
  assessmentCompleted: boolean;
  primaryGift?: string;
  secondaryGift?: string;
  ministryExperience?: string;
  locationDisplay?: string;
}

export interface ContentItemComputedFields {
  isPublished: boolean;
  isDraft: boolean;
  isScheduled: boolean;
  isArchived: boolean;
  hasFeaturedImage: boolean;
  hasVideo: boolean;
  hasAudio: boolean;
  hasAttachments: boolean;
  isAiEnhanced: boolean;
  readingTimeText: string;
  viewCountText: string;
  engagementScore: number;
}

export interface AssessmentComputedFields {
  isActive: boolean;
  isPublished: boolean;
  isDraft: boolean;
  hasQuestions: boolean;
  questionCountText: string;
  durationText?: string;
  validityScoreText?: string;
  reliabilityScoreText?: string;
}

export interface OrganizationComputedFields {
  isActive: boolean;
  isTrial: boolean;
  hasCustomLogo: boolean;
  hasWebsite: boolean;
  memberCount: number;
  displayName: string;
  statusDisplay: string;
  licenseTypeDisplay: string;
}

// ============================================================================
// MAPPER PATTERN TYPES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================
// These types represent the bidirectional mapper architecture

export type MapperResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
    };

export interface EntityMapper<TEntity, TRow> {
  toEntity: (row: TRow) => MapperResult<TEntity>;
  fromEntity: (entity: TEntity) => TRow;
}

export interface ResponseMapper<TResponse, TRow> {
  toResponseDTO: (
    row: TRow & Record<string, unknown>
  ) => MapperResult<TResponse>;
}

export interface CreateMapper<TCreate, TNewRow> {
  fromCreate: (data: TCreate) => MapperResult<TNewRow>;
}

export interface UpdateMapper<TUpdate, TPartialRow> {
  fromUpdate: (data: TUpdate) => MapperResult<TPartialRow>;
}

export interface BidirectionalMapper<
  TEntity,
  TResponse,
  TCreate,
  TUpdate,
  TRow,
  TNewRow,
> extends EntityMapper<TEntity, TRow>,
    ResponseMapper<TResponse, TRow>,
    CreateMapper<TCreate, TNewRow>,
    UpdateMapper<TUpdate, Partial<TNewRow>> {}

// ============================================================================
// APEST PROFILE TYPES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================

export interface APESTProfile {
  primary: string;
  secondary: string;
  scores: {
    apostolic: number;
    prophetic: number;
    evangelistic: number;
    shepherding: number;
    teaching: number;
  };
  total: number;
  assessmentCompleted: boolean;
}

export interface APESTScores {
  apostolic: number;
  prophetic: number;
  evangelistic: number;
  shepherding: number;
  teaching: number;
}

// ============================================================================
// VALIDATION UTILITY TYPES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================

export type ValidationResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: {
        message: string;
        details?: Record<string, unknown>;
      };
    };

export interface SchemaValidationOptions {
  stripUnknown?: boolean;
  abortEarly?: boolean;
  context?: Record<string, unknown>;
}

// ============================================================================
// PAGINATION TYPES (Enhanced from ALIGNMENT_REFERENCE.md)
// ============================================================================

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
  hasPrev: boolean;
}

export interface PaginatedListResponse<T> {
  data: T[];
  pagination: PaginationInfo;
  success: boolean;
  error?: string;
  message?: string;
}

// ============================================================================
// MINISTRY PLATFORM TYPES (From ALIGNMENT_REFERENCE.md)
// ============================================================================

export interface MinistryPlatformResponse<T = unknown> extends ApiResponse<T> {
  timestamp: string;
  requestId: string;
  version: string;
}

export interface CrossEntityValidation {
  entityType: string;
  entityId: string;
  validationRules: string[];
  isValid: boolean;
  errors: string[];
}

export interface RoleBasedValidation {
  userId: string;
  role: string;
  permissions: string[];
  hasAccess: boolean;
  reason?: string;
}

export interface OrganizationScopedRequest {
  organizationId: string;
  userId: string;
  role: string;
  permissions: string[];
}

// ============================================================================
// Component Props Types (Re-exported from component-props.ts)
// ============================================================================

// Re-export all component prop types to avoid duplication
export * from '@/lib/types/component-props';
