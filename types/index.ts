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
  ContentItemResponse,
  ContentCategoryResponse,
  ContentSeriesResponse,
  PaginatedContentItemListResponse,
  PaginatedContentCategoryListResponse,
  PaginatedContentSeriesListResponse,
} from '@/lib/contracts';

// ============================================================================
// Assessment Types (Re-exported from contracts)
// ============================================================================

// Re-export assessment types from contracts
export type {
  AssessmentResponse as AssessmentResponseDTO,
  AssessmentQuestionResponse,
  UserAssessmentResponse,
  AssessmentResponseResponse,
  AssessmentWithQuestionsResponse,
  UserAssessmentWithDetailsResponse,
  PaginatedAssessmentListResponse,
  PaginatedUserAssessmentListResponse,
} from '@/lib/contracts';

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
// Export all types from contracts
// ============================================================================

// Re-export all contract types to maintain backward compatibility
export type {
  // Auth & User Management
  UserProfile,
  NewUserProfile,
  Organization,
  NewOrganization,
  OrganizationMembership,
  NewOrganizationMembership,

  // Assessment System
  Assessment,
  NewAssessment,
  AssessmentQuestion,
  NewAssessmentQuestion,
  UserAssessment,
  NewUserAssessment,
  AssessmentResponse,
  NewAssessmentResponse,
  AssessmentWithQuestions,
  StartAssessmentInput,
  SaveResponsesInput,
  CompleteAssessmentInput,
  AssessmentSearch,
  UserAssessmentFilters,

  // Content Management
  ContentCategory,
  NewContentCategory,
  ContentSeries,
  NewContentSeries,
  ContentItem,
  NewContentItem,
  SeriesContentItem,
  NewSeriesContentItem,
  ContentCrossReference,
  NewContentCrossReference,

  // AI System
  AiConversation,
  NewAiConversation,
  AiMessage,
  NewAiMessage,
  AiContentJob,
  NewAiContentJob,
  AiCrossReferenceSuggestion,
  NewAiCrossReferenceSuggestion,
  TheologicalConcept,
  NewTheologicalConcept,

  // Community & Networking
  Community,
  NewCommunity,
  CommunityMembership,
  NewCommunityMembership,
  CommunityPost,
  NewCommunityPost,
  CommunityPostVote,
  NewCommunityPostVote,
  Collaboration,
  NewCollaboration,

  // Subscriptions & Financial
  SubscriptionPlan,
  NewSubscriptionPlan,
  UserSubscription,
  NewUserSubscription,
  Transaction,
  NewTransaction,
  PaymentMethod,
  NewPaymentMethod,
  Coupon,
  NewCoupon,

  // Analytics & Tracking
  UserAnalyticsEvent,
  NewUserAnalyticsEvent,
  UserContentInteraction,
  NewUserContentInteraction,
  LearningOutcome,
  NewLearningOutcome,
  MovementMetric,
  NewMovementMetric,
  PerformanceReport,
  NewPerformanceReport,

  // System & Administration
  AuditLog,
  NewAuditLog,
  FeatureFlag,
  NewFeatureFlag,
  UserFeatureFlag,
  NewUserFeatureFlag,
  UserConsent,
  NewUserConsent,
  SystemNotification,
  NewSystemNotification,
  UserNotificationStatus,
  NewUserNotificationStatus,
  ApiKey,
  NewApiKey,

  // Shared Types
  CulturalContext,
  Visibility,
  Attachment,
  MembershipRole,
  OrganizationType,
  SubscriptionStatus,
  MinistryRole,
} from '@/lib/contracts';
