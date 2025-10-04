// Component Props Types - Alan Hirsch Digital Platform
// This file provides type-safe component prop interfaces derived from Zod schemas
import { assessmentSchema, communitySchema, contentItemSchema, subscriptionPlanSchema, userProfileSchema, } from '@/validations';
import { z } from 'zod';
// ============================================================================
// Runtime Validation Schemas for Component Props
// ============================================================================
// User Profile Display Schema
export const userCardPropsSchema = z.object({
    item: userProfileSchema,
    variant: z.enum(['default', 'compact', 'detailed', 'minimal']).optional(),
    showActions: z.boolean().optional(),
    showStats: z.boolean().optional(),
    showMinistryInfo: z.boolean().optional(),
    showAssessmentScores: z.boolean().optional(),
    showContactInfo: z.boolean().optional(),
    className: z.string().optional(),
});
// Assessment Display Schema
export const assessmentCardPropsSchema = z.object({
    item: assessmentSchema,
    variant: z.enum(['default', 'compact', 'detailed', 'minimal']).optional(),
    showActions: z.boolean().optional(),
    showStats: z.boolean().optional(),
    showQuestionCount: z.boolean().optional(),
    showDuration: z.boolean().optional(),
    showValidityScores: z.boolean().optional(),
    showCulturalAdaptation: z.boolean().optional(),
    className: z.string().optional(),
});
// Content Item Display Schema
export const contentItemCardPropsSchema = z.object({
    item: contentItemSchema,
    variant: z.enum(['default', 'compact', 'detailed', 'minimal']).optional(),
    showActions: z.boolean().optional(),
    showStats: z.boolean().optional(),
    showAuthor: z.boolean().optional(),
    showExcerpt: z.boolean().optional(),
    showTags: z.boolean().optional(),
    showCategory: z.boolean().optional(),
    className: z.string().optional(),
});
// Community Display Schema
export const communityCardPropsSchema = z.object({
    item: communitySchema,
    variant: z.enum(['default', 'compact', 'detailed', 'minimal']).optional(),
    showActions: z.boolean().optional(),
    showStats: z.boolean().optional(),
    showMemberCount: z.boolean().optional(),
    showPostCount: z.boolean().optional(),
    showModerationLevel: z.boolean().optional(),
    showJoinStatus: z.boolean().optional(),
    className: z.string().optional(),
});
// Subscription Plan Display Schema
export const subscriptionPlanCardPropsSchema = z.object({
    item: subscriptionPlanSchema,
    variant: z.enum(['default', 'compact', 'detailed', 'minimal']).optional(),
    showActions: z.boolean().optional(),
    showStats: z.boolean().optional(),
    showPricing: z.boolean().optional(),
    showFeatures: z.boolean().optional(),
    showPopular: z.boolean().optional(),
    showTrialInfo: z.boolean().optional(),
    currentPlan: z.boolean().optional(),
    className: z.string().optional(),
});
// Component prop validation helper
export function validateComponentProps(props, schema) {
    const result = schema.safeParse(props);
    if (!result.success) {
        console.error('Component props validation failed:', result.error);
        throw new Error(`Invalid component props: ${result.error.message}`);
    }
    return result.data;
}
//# sourceMappingURL=component-props.js.map