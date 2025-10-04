// Global type definitions for Alan Hirsch Digital Platform
// This file provides centralized type definitions and utilities

import { z } from 'zod';

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
  timestamp?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
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
// Component Props Types
// ============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string;
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
// Content Types (Re-exported from contracts)
// ============================================================================

// Re-export content types from contracts
export type {
  ContentCategoryResponse,
  ContentItemResponse,
  ContentSeriesResponse,
  PaginatedContentCategoryListResponse,
  PaginatedContentItemListResponse,
  PaginatedContentSeriesListResponse,
} from '@platform/shared/contracts';

// ============================================================================
// Assessment Types (Re-exported from contracts)
// ============================================================================

// Re-export assessment types from contracts
export type {
  AssessmentQuestionResponse,
  AssessmentResponse as AssessmentResponseDTO,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
  UserAssessmentResponse,
  UserAssessmentWithDetailsResponse,
} from '@platform/shared/contracts';

// ============================================================================
// Subscription & Payment Types (Re-exported from contracts)
// ============================================================================

// These types are now re-exported from contracts to avoid duplication

// ============================================================================
// Community Types (Re-exported from contracts)
// ============================================================================

// These types are now re-exported from contracts to avoid duplication

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
// Component Props Types
// ============================================================================

export * from '@/lib/types/component-props';

// ============================================================================
// Export all types from contracts
// ============================================================================

// Re-export all contract types to maintain backward compatibility
export type {
  AiContentJob,
  // AI System
  AiConversation,
  AiCrossReferenceSuggestion,
  AiMessage,
  ApiKey,
  // Assessment System
  Assessment,
  AssessmentQuestion,
  AssessmentResponse,
  AssessmentSearch,
  AssessmentWithQuestions,
  Attachment,
  // System & Administration
  AuditLog,
  Collaboration,
  // Community & Networking
  Community,
  CommunityMembership,
  CommunityPost,
  CommunityPostVote,
  CompleteAssessmentInput,
  // Content Management
  ContentCategory,
  ContentCrossReference,
  ContentItem,
  ContentSeries,
  Coupon,
  // Shared Types
  CulturalContext,
  FeatureFlag,
  LearningOutcome,
  MembershipRole,
  MinistryRole,
  MovementMetric,
  NewAiContentJob,
  NewAiConversation,
  NewAiCrossReferenceSuggestion,
  NewAiMessage,
  NewApiKey,
  NewAssessment,
  NewAssessmentQuestion,
  NewAssessmentResponse,
  NewAuditLog,
  NewCollaboration,
  NewCommunity,
  NewCommunityMembership,
  NewCommunityPost,
  NewCommunityPostVote,
  NewContentCategory,
  NewContentCrossReference,
  NewContentItem,
  NewContentSeries,
  NewCoupon,
  NewFeatureFlag,
  NewLearningOutcome,
  NewMovementMetric,
  NewOrganization,
  NewOrganizationMembership,
  NewPaymentMethod,
  NewPerformanceReport,
  NewSeriesContentItem,
  NewSubscriptionPlan,
  NewSystemNotification,
  NewTheologicalConcept,
  NewTransaction,
  NewUserAnalyticsEvent,
  NewUserAssessment,
  NewUserConsent,
  NewUserContentInteraction,
  NewUserFeatureFlag,
  NewUserNotificationStatus,
  NewUserProfile,
  NewUserSubscription,
  Organization,
  OrganizationMembership,
  OrganizationType,
  PaymentMethod,
  PerformanceReport,
  SaveResponsesInput,
  SeriesContentItem,
  StartAssessmentInput,
  // Subscriptions & Financial
  SubscriptionPlan,
  SubscriptionStatus,
  SystemNotification,
  TheologicalConcept,
  Transaction,
  // Analytics & Tracking
  UserAnalyticsEvent,
  UserAssessment,
  UserAssessmentFilters,
  UserConsent,
  UserContentInteraction,
  UserFeatureFlag,
  UserNotificationStatus,
  // Auth & User Management
  UserProfile,
  UserSubscription,
  Visibility,
} from '@platform/shared/contracts';
