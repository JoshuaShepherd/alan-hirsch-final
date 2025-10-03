// Global type definitions for Alan Hirsch Digital Platform
// This file provides centralized type definitions and utilities

import { z } from 'zod';
import type { UserProfile, Organization, OrganizationMembership } from '@/lib/contracts';

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

export interface ValidationError {
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
  profile?: UserProfile;
  organizations?: Organization[];
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
// Content Types
// ============================================================================

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  visibility: 'public' | 'private' | 'members_only';
  authorId: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContentWithAuthor extends ContentItem {
  author: {
    id: string;
    displayName: string;
    avatarUrl?: string;
  };
}

// ============================================================================
// Assessment Types
// ============================================================================

export interface Assessment {
  id: string;
  name: string;
  description?: string;
  assessmentType: 'apest' | 'leadership' | 'spiritual_gifts';
  status: 'active' | 'inactive' | 'draft';
  estimatedDuration: number; // in minutes
  createdAt: Date;
  updatedAt: Date;
}

export interface AssessmentQuestion {
  id: string;
  assessmentId: string;
  questionText: string;
  questionType: 'multiple_choice' | 'scale' | 'text';
  options?: string[];
  order: number;
  required: boolean;
}

export interface UserAssessment {
  id: string;
  userId: string;
  assessmentId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  startedAt?: Date;
  completedAt?: Date;
  score?: number;
  responses?: AssessmentResponse[];
}

export interface AssessmentResponse {
  id: string;
  userAssessmentId: string;
  questionId: string;
  responseValue: string | number;
  createdAt: Date;
}

// ============================================================================
// Subscription & Payment Types
// ============================================================================

export interface SubscriptionPlan {
  id: string;
  name: string;
  description?: string;
  price: number; // in cents
  currency: string;
  interval: 'month' | 'year';
  features: string[];
  isActive: boolean;
  sortOrder: number;
}

export interface UserSubscription {
  id: string;
  userId: string;
  planId: string;
  status: 'active' | 'inactive' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  stripeSubscriptionId?: string;
}

// ============================================================================
// Community Types
// ============================================================================

export interface Community {
  id: string;
  name: string;
  description?: string;
  visibility: 'public' | 'private' | 'invite_only';
  isActive: boolean;
  createdBy: string;
  currentMemberCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityMembership {
  id: string;
  userId: string;
  communityId: string;
  role: 'admin' | 'moderator' | 'member';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: Date;
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

export function isPaginatedResponse<T>(value: unknown): value is PaginatedResponse<T> {
  return (
    isApiResponse<T[]>(value) &&
    'pagination' in value &&
    typeof (value as PaginatedResponse<T>).pagination === 'object'
  );
}

export function isValidationError(value: unknown): value is ValidationError {
  return (
    typeof value === 'object' &&
    value !== null &&
    'field' in value &&
    'message' in value &&
    typeof (value as ValidationError).field === 'string' &&
    typeof (value as ValidationError).message === 'string'
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
  public readonly code: string = 'VALIDATION_ERROR';
  
  constructor(message: string, details?: unknown) {
    super(message, 'VALIDATION_ERROR', 400, details);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} with ID ${id} not found` : `${resource} not found`;
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
// Export all types
// ============================================================================

export type {
  UserProfile,
  Organization,
  OrganizationMembership,
} from '@/lib/contracts';
