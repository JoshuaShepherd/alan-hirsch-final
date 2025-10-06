export { BaseService, QueryFiltersSchema, type PaginatedResult, type QueryFilters, type QueryFiltersType, type ServiceError, type TransactionContext, } from './base.service';
export { UserService } from './user.service';
export { ContentCategoryService, ContentItemService } from './content.service';
export { AssessmentQuestionService, AssessmentResponseService, AssessmentService, UserAssessmentService, } from './assessment.service';
export { OrganizationMembershipService, OrganizationService, } from './organization.service';
export { CommunityService } from './community.service';
export { AnalyticsService } from './analytics.service';
export { UploadService } from './upload.service';
/**
 * Service Factory - Create new instances of services
 * Useful for testing or when you need multiple instances
 */
export declare class ServiceFactory {
    /**
     * Create a new instance of UserService
     */
    static createUserService(): UserService;
    /**
     * Create a new instance of ContentItemService
     */
    static createContentItemService(): ContentItemService;
    /**
     * Create a new instance of ContentCategoryService
     */
    static createContentCategoryService(): ContentCategoryService;
    /**
     * Create a new instance of AssessmentService
     */
    static createAssessmentService(): AssessmentService;
    /**
     * Create a new instance of AssessmentQuestionService
     */
    static createAssessmentQuestionService(): AssessmentQuestionService;
    /**
     * Create a new instance of UserAssessmentService
     */
    static createUserAssessmentService(): UserAssessmentService;
    /**
     * Create a new instance of AssessmentResponseService
     */
    static createAssessmentResponseService(): AssessmentResponseService;
    /**
     * Create a new instance of OrganizationService
     */
    static createOrganizationService(): OrganizationService;
    /**
     * Create a new instance of OrganizationMembershipService
     */
    static createOrganizationMembershipService(): OrganizationMembershipService;
    /**
     * Create a new instance of CommunityService
     */
    static createCommunityService(): CommunityService;
    /**
     * Create a new instance of TransactionService
     */
    static createTransactionService(): TransactionService;
}
/**
 * Transaction service for managing database transactions
 */
export declare class TransactionService {
    /**
     * Execute operations within a database transaction
     */
    executeInTransaction<T>(operations: (tx: any) => Promise<T>): Promise<T>;
}
/**
 * Service utilities for common operations
 */
export declare class ServiceUtils {
    /**
     * Execute multiple operations in a transaction
     */
    static executeInTransaction<T>(operations: (services: any) => Promise<T>): Promise<T>;
    /**
     * Validate multiple entities at once
     */
    static validateEntities<T extends Record<string, any>>(entities: T, schemas: {
        [K in keyof T]: any;
    }): T;
    /**
     * Handle service errors consistently
     */
    static handleServiceError(error: unknown, operation: string, entityName: string): never;
}
import { analyticsService, assessmentService, communityService, contentService, organizationService, uploadService, userService } from './service-instances';
export { analyticsService, assessmentService, communityService, contentService, organizationService, uploadService, userService, };
import { AssessmentQuestionService, AssessmentResponseService, AssessmentService, UserAssessmentService } from './assessment.service';
import { CommunityService } from './community.service';
import { ContentCategoryService, ContentItemService } from './content.service';
import { OrganizationMembershipService, OrganizationService } from './organization.service';
import { UserService } from './user.service';
/**
 * Simple service access - direct instances for backward compatibility
 */
export declare const services: {
    user: () => UserService;
    contentItem: () => ContentItemService;
    contentCategory: () => ContentCategoryService;
    assessment: () => AssessmentService;
    assessmentQuestion: () => AssessmentQuestionService;
    userAssessment: () => UserAssessmentService;
    assessmentResponse: () => AssessmentResponseService;
    organization: () => OrganizationService;
    organizationMembership: () => OrganizationMembershipService;
    community: () => CommunityService;
    transaction: () => TransactionService;
};
declare const _default: {
    ServiceFactory: typeof ServiceFactory;
    ServiceUtils: typeof ServiceUtils;
    services: {
        user: () => UserService;
        contentItem: () => ContentItemService;
        contentCategory: () => ContentCategoryService;
        assessment: () => AssessmentService;
        assessmentQuestion: () => AssessmentQuestionService;
        userAssessment: () => UserAssessmentService;
        assessmentResponse: () => AssessmentResponseService;
        organization: () => OrganizationService;
        organizationMembership: () => OrganizationMembershipService;
        community: () => CommunityService;
        transaction: () => TransactionService;
    };
};
export default _default;
//# sourceMappingURL=index.d.ts.map