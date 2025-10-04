// Alan Hirsch Digital Platform - Type-Safe Database Services
// Comprehensive service layer that bridges Zod validation with Drizzle ORM operations
// ============================================================================
// BASE SERVICES
// ============================================================================
export { BaseService, QueryFiltersSchema, TransactionService, } from './base.service';
// ============================================================================
// ENTITY SERVICES
// ============================================================================
// User Management Services
export { UserService } from './user.service';
// Content Management Services
export { ContentCategoryService, ContentItemService } from './content.service';
// Assessment System Services
export { AssessmentQuestionService, AssessmentResponseService, AssessmentService, UserAssessmentService, } from './assessment.service';
// Organization Services
export { OrganizationMembershipService, OrganizationService, } from './organization.service';
// Community Services
export { CommunityService } from './community.service';
// ============================================================================
// SIMPLIFIED SERVICE ACCESS
// ============================================================================
// Note: services object is defined after service instances are imported
/**
 * Service Factory - Create new instances of services
 * Useful for testing or when you need multiple instances
 */
export class ServiceFactory {
    /**
     * Create a new instance of UserService
     */
    static createUserService() {
        return new UserService();
    }
    /**
     * Create a new instance of ContentItemService
     */
    static createContentItemService() {
        return new ContentItemService();
    }
    /**
     * Create a new instance of ContentCategoryService
     */
    static createContentCategoryService() {
        return new ContentCategoryService();
    }
    /**
     * Create a new instance of AssessmentService
     */
    static createAssessmentService() {
        return new AssessmentService();
    }
    /**
     * Create a new instance of AssessmentQuestionService
     */
    static createAssessmentQuestionService() {
        return new AssessmentQuestionService();
    }
    /**
     * Create a new instance of UserAssessmentService
     */
    static createUserAssessmentService() {
        return new UserAssessmentService();
    }
    /**
     * Create a new instance of AssessmentResponseService
     */
    static createAssessmentResponseService() {
        return new AssessmentResponseService();
    }
    /**
     * Create a new instance of OrganizationService
     */
    static createOrganizationService() {
        return new OrganizationService();
    }
    /**
     * Create a new instance of OrganizationMembershipService
     */
    static createOrganizationMembershipService() {
        return new OrganizationMembershipService();
    }
    /**
     * Create a new instance of CommunityService
     */
    static createCommunityService() {
        return new CommunityService();
    }
    /**
     * Create a new instance of TransactionService
     */
    static createTransactionService() {
        return new TransactionService();
    }
}
// ============================================================================
// SERVICE UTILITIES
// ============================================================================
/**
 * Service utilities for common operations
 */
export class ServiceUtils {
    /**
     * Execute multiple operations in a transaction
     */
    static async executeInTransaction(operations) {
        const transactionService = services.transaction();
        return transactionService.executeInTransaction(async (tx) => {
            // Create temporary services with transaction context
            const txServices = {
                ...services,
                // Override services to use transaction context if needed
            };
            return operations(txServices);
        });
    }
    /**
     * Validate multiple entities at once
     */
    static validateEntities(entities, schemas) {
        const validated = {};
        for (const [key, entity] of Object.entries(entities)) {
            const schema = schemas[key];
            if (schema) {
                validated[key] = schema.parse(entity);
            }
            else {
                validated[key] = entity;
            }
        }
        return validated;
    }
    /**
     * Handle service errors consistently
     */
    static handleServiceError(error, operation, entityName) {
        if (error instanceof Error) {
            // Check for common database errors
            if (error.message.includes('duplicate key')) {
                throw new Error(`${entityName} already exists`);
            }
            if (error.message.includes('foreign key')) {
                throw new Error(`Invalid reference in ${entityName}`);
            }
            if (error.message.includes('not null')) {
                throw new Error(`Required field missing in ${entityName}`);
            }
        }
        throw new Error(`${entityName} ${operation} failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
// ============================================================================
// SERVICE INSTANCES (for backward compatibility)
// ============================================================================
// Note: Service instances are imported from service-instances.ts to avoid circular dependency issues
// ============================================================================
// DEFAULT EXPORTS
// ============================================================================
// ============================================================================
// SERVICE INSTANCES (for backward compatibility)
// ============================================================================
// Import service instances to avoid circular dependencies
import { analyticsService, assessmentService, communityService, contentService, organizationService, uploadService, userService, } from './service-instances';
export { analyticsService, assessmentService, communityService, contentService, organizationService, uploadService, userService, };
// ============================================================================
// SERVICE ACCESS OBJECT (defined after service instances are imported)
// ============================================================================
// Import service classes for the services object and ServiceFactory
import { AssessmentQuestionService, AssessmentResponseService, AssessmentService, UserAssessmentService, } from './assessment.service';
import { CommunityService } from './community.service';
import { ContentCategoryService, ContentItemService } from './content.service';
import { OrganizationMembershipService, OrganizationService, } from './organization.service';
import { UserService } from './user.service';
/**
 * Simple service access - direct instances for backward compatibility
 */
export const services = {
    // User Management
    user: () => userService,
    // Content Management
    contentItem: () => contentService,
    contentCategory: () => new ContentCategoryService(),
    // Assessment System
    assessment: () => assessmentService,
    assessmentQuestion: () => new AssessmentQuestionService(),
    userAssessment: () => new UserAssessmentService(),
    assessmentResponse: () => new AssessmentResponseService(),
    // Organization Management
    organization: () => organizationService,
    organizationMembership: () => new OrganizationMembershipService(),
    // Community Management
    community: () => communityService,
    // Transaction Management
    transaction: () => new TransactionService(),
};
// ============================================================================
// DEFAULT EXPORTS
// ============================================================================
export default {
    ServiceFactory,
    ServiceUtils,
    services,
};
//# sourceMappingURL=index.js.map