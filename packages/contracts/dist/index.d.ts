export * from './entities';
export * from './operations';
export * from './api';
export type { CreateUser, PublicUser, UpdateUser, UserEntity, UserForm, UserQuery, } from './entities/user.schema';
export type { AssessmentEntity, AssessmentQuery, AssessmentQuestionEntity, AssessmentResponseEntity, AssessmentResponseQuery, CreateAssessment, CreateAssessmentQuestion, CreateAssessmentResponse, CreateUserAssessment, UpdateAssessment, UpdateAssessmentQuestion, UpdateAssessmentResponse, UpdateUserAssessment, UserAssessmentEntity, UserAssessmentQuery, } from './entities/assessment.schema';
export type { CreateOrganization, CreateOrganizationMembership, OrganizationEntity, OrganizationForm, OrganizationInvitation, OrganizationMembershipEntity, OrganizationMembershipQuery, OrganizationQuery, UpdateOrganization, UpdateOrganizationMembership, } from './entities/organization.schema';
export type { ContentCategoryEntity, ContentCategoryQuery, ContentCrossReferenceEntity, ContentCrossReferenceQuery, ContentItemEntity, ContentItemQuery, ContentSeriesEntity, ContentSeriesQuery, CreateContentCategory, CreateContentCrossReference, CreateContentItem, CreateContentSeries, UpdateContentCategory, UpdateContentCrossReference, UpdateContentItem, UpdateContentSeries, } from './entities/content.schema';
export declare const PACKAGE_VERSION = "0.1.0";
export declare const PACKAGE_NAME = "@platform/contracts";
import { z } from 'zod';
/**
 * Validate data against a schema and return typed result
 */
export declare function validateSchema<T>(schema: z.ZodSchema<T>, data: unknown): {
    success: true;
    data: T;
} | {
    success: false;
    error: z.ZodError;
};
/**
 * Validate data against a schema and throw on error
 */
export declare function validateSchemaOrThrow<T>(schema: z.ZodSchema<T>, data: unknown): T;
/**
 * Check if data matches a schema without throwing
 */
export declare function isValidSchema<T>(schema: z.ZodSchema<T>, data: unknown): data is T;
//# sourceMappingURL=index.d.ts.map