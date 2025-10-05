// ============================================================================
// SERVICES INDEX
// ============================================================================
// Main entry point for all aligned services following the alignment reference patterns
// Framework-agnostic service layer that orchestrates query modules + mappers

// ============================================================================
// CORE TYPES AND UTILITIES
// ============================================================================

export * from './base.service';
export * from './types';

// ============================================================================
// DOMAIN SERVICES
// ============================================================================

// User Management Services
export * from './user.service';
export type {
  CreateUserInput,
  CreateUserOutput,
  UpdateUserInput,
  UpdateUserOutput,
  UserListOutput,
  UserQueryInput,
} from './user.service';

// Content Management Services
export * from './content.service';
export type {
  ContentItemListOutput,
  ContentItemQueryInput,
  CreateContentCategoryInput,
  CreateContentCategoryOutput,
  CreateContentItemInput,
  CreateContentItemOutput,
  CreateContentSeriesInput,
  CreateContentSeriesOutput,
  UpdateContentCategoryInput,
  UpdateContentCategoryOutput,
  UpdateContentItemInput,
  UpdateContentItemOutput,
  UpdateContentSeriesInput,
  UpdateContentSeriesOutput,
} from './content.service';

// Assessment System Services
export * from './assessment.service';
export type {
  AssessmentListOutput,
  AssessmentQueryInput,
  CreateAssessmentInput,
  CreateAssessmentOutput,
  CreateAssessmentQuestionInput,
  CreateAssessmentQuestionOutput,
  CreateAssessmentResponseInput,
  CreateAssessmentResponseOutput,
  CreateUserAssessmentInput,
  CreateUserAssessmentOutput,
  UpdateAssessmentInput,
  UpdateAssessmentOutput,
  UpdateAssessmentQuestionInput,
  UpdateAssessmentQuestionOutput,
  UpdateAssessmentResponseInput,
  UpdateAssessmentResponseOutput,
  UpdateUserAssessmentInput,
  UpdateUserAssessmentOutput,
} from './assessment.service';

// Organization Services
export * from './organization.service';
export type {
  CreateOrganizationInput,
  CreateOrganizationMembershipInput,
  CreateOrganizationMembershipOutput,
  CreateOrganizationOutput,
  OrganizationListOutput,
  OrganizationQueryInput,
  UpdateOrganizationInput,
  UpdateOrganizationMembershipInput,
  UpdateOrganizationMembershipOutput,
  UpdateOrganizationOutput,
} from './organization.service';

// AI Services
export * from './ai.service';
export type {
  CreateAiContentJobInput,
  CreateAiContentJobOutput,
  CreateAiConversationInput,
  CreateAiConversationOutput,
  CreateAiCrossReferenceSuggestionInput,
  CreateAiCrossReferenceSuggestionOutput,
  CreateAiMessageInput,
  CreateAiMessageOutput,
  CreateTheologicalConceptInput,
  CreateTheologicalConceptOutput,
  UpdateAiContentJobInput,
  UpdateAiContentJobOutput,
  UpdateAiConversationInput,
  UpdateAiConversationOutput,
  UpdateAiCrossReferenceSuggestionInput,
  UpdateAiCrossReferenceSuggestionOutput,
  UpdateAiMessageInput,
  UpdateAiMessageOutput,
  UpdateTheologicalConceptInput,
  UpdateTheologicalConceptOutput,
} from './ai.service';

// ============================================================================
// SERVICE FACTORY
// ============================================================================

import {
  AiContentJobService,
  AiConversationService,
  AiCrossReferenceSuggestionService,
  AiMessageService,
  TheologicalConceptService,
} from './ai.service';
import {
  AssessmentQuestionService,
  AssessmentResponseService,
  AssessmentService,
  UserAssessmentService,
} from './assessment.service';
import {
  ContentCategoryService,
  ContentItemService,
  ContentSeriesService,
} from './content.service';
import {
  OrganizationMembershipService,
  OrganizationService,
} from './organization.service';
import { UserService } from './user.service';

/**
 * Service Factory - Create new instances of services
 * Useful for testing or when you need multiple instances
 */
export class ServiceFactory {
  /**
   * User Management Services
   */
  static createUserService(): UserService {
    return new UserService();
  }

  /**
   * Content Management Services
   */
  static createContentItemService(): ContentItemService {
    return new ContentItemService();
  }

  static createContentCategoryService(): ContentCategoryService {
    return new ContentCategoryService();
  }

  static createContentSeriesService(): ContentSeriesService {
    return new ContentSeriesService();
  }

  /**
   * Assessment System Services
   */
  static createAssessmentService(): AssessmentService {
    return new AssessmentService();
  }

  static createAssessmentQuestionService(): AssessmentQuestionService {
    return new AssessmentQuestionService();
  }

  static createUserAssessmentService(): UserAssessmentService {
    return new UserAssessmentService();
  }

  static createAssessmentResponseService(): AssessmentResponseService {
    return new AssessmentResponseService();
  }

  /**
   * Organization Services
   */
  static createOrganizationService(): OrganizationService {
    return new OrganizationService();
  }

  static createOrganizationMembershipService(): OrganizationMembershipService {
    return new OrganizationMembershipService();
  }

  /**
   * AI Services
   */
  static createAiConversationService(): AiConversationService {
    return new AiConversationService();
  }

  static createAiMessageService(): AiMessageService {
    return new AiMessageService();
  }

  static createAiContentJobService(): AiContentJobService {
    return new AiContentJobService();
  }

  static createAiCrossReferenceSuggestionService(): AiCrossReferenceSuggestionService {
    return new AiCrossReferenceSuggestionService();
  }

  static createTheologicalConceptService(): TheologicalConceptService {
    return new TheologicalConceptService();
  }
}

// ============================================================================
// SINGLETON SERVICE INSTANCES
// ============================================================================

/**
 * Singleton service instances for common use cases
 * These are shared instances that can be used across the application
 */
export const services = {
  // User Management
  user: new UserService(),

  // Content Management
  contentItem: new ContentItemService(),
  contentCategory: new ContentCategoryService(),
  contentSeries: new ContentSeriesService(),

  // Assessment System
  assessment: new AssessmentService(),
  assessmentQuestion: new AssessmentQuestionService(),
  userAssessment: new UserAssessmentService(),
  assessmentResponse: new AssessmentResponseService(),

  // Organization Management
  organization: new OrganizationService(),
  organizationMembership: new OrganizationMembershipService(),

  // AI Services
  aiConversation: new AiConversationService(),
  aiMessage: new AiMessageService(),
  aiContentJob: new AiContentJobService(),
  aiCrossReferenceSuggestion: new AiCrossReferenceSuggestionService(),
  theologicalConcept: new TheologicalConceptService(),
};

// ============================================================================
// SERVICE UTILITIES
// ============================================================================

import { ServiceContext, ServiceContextBuilder } from './types';

/**
 * Service utilities for common operations
 */
export class ServiceUtils {
  /**
   * Create a service context from basic parameters
   */
  static createContext(
    userId: string,
    tenantId?: string,
    role?: string
  ): ServiceContext {
    return ServiceContextBuilder.create()
      .withUserId(userId)
      .withTenantId(tenantId || '')
      .withRole(role as any)
      .build();
  }

  /**
   * Create a service context for admin operations
   */
  static createAdminContext(userId: string): ServiceContext {
    return ServiceContextBuilder.create()
      .withUserId(userId)
      .withRole('admin')
      .build();
  }

  /**
   * Create a service context for organization operations
   */
  static createOrganizationContext(
    userId: string,
    organizationId: string,
    role: string = 'member'
  ): ServiceContext {
    return ServiceContextBuilder.create()
      .withUserId(userId)
      .withTenantId(organizationId)
      .withRole(role as any)
      .build();
  }

  /**
   * Validate that a service result is successful
   */
  static validateServiceResult<T>(result: {
    success: boolean;
    data?: T;
    error?: any;
  }): T {
    if (!result.success) {
      throw result.error || new Error('Service operation failed');
    }
    if (!result.data) {
      throw new Error('Service operation returned no data');
    }
    return result.data;
  }

  /**
   * Handle service errors consistently
   */
  static handleServiceError(
    error: unknown,
    operation: string,
    entityName: string
  ): never {
    if (error instanceof Error) {
      // Check for common service errors
      if (error.message.includes('not found')) {
        throw new Error(`${entityName} not found`);
      }
      if (error.message.includes('access denied')) {
        throw new Error(`Access denied for ${entityName} ${operation}`);
      }
      if (error.message.includes('already exists')) {
        throw new Error(`${entityName} already exists`);
      }
    }

    throw new Error(
      `${entityName} ${operation} failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

// ============================================================================
// DEFAULT EXPORTS
// ============================================================================

export default {
  ServiceFactory,
  ServiceUtils,
  services,
};
