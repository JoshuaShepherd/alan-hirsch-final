import { z } from 'zod';
import { movementMetricEntitySchema } from './analytics.schema';
import { userAssessmentEntitySchema } from './assessment.schema';
import { communityEntitySchema } from './community.schema';
import { contentItemEntitySchema } from './content.schema';
import { organizationEntitySchema } from './organization.schema';
import { userProfileEntitySchema } from './user.schema';
export declare const crossEntityValidationSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    assessmentId: z.ZodOptional<z.ZodString>;
    contentId: z.ZodOptional<z.ZodString>;
    validatePermissions: z.ZodDefault<z.ZodBoolean>;
    validateOwnership: z.ZodDefault<z.ZodBoolean>;
    contentOwnership: z.ZodOptional<z.ZodObject<{
        contentId: z.ZodString;
        userId: z.ZodString;
        isOwner: z.ZodBoolean;
        userHasAccess: z.ZodBoolean;
        canEdit: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        contentId: string;
        isOwner: boolean;
        userHasAccess: boolean;
        canEdit: boolean;
    }, {
        userId: string;
        contentId: string;
        isOwner: boolean;
        userHasAccess: boolean;
        canEdit: boolean;
    }>>;
    assessmentEligibility: z.ZodOptional<z.ZodObject<{
        assessmentId: z.ZodString;
        userId: z.ZodString;
        isEligible: z.ZodBoolean;
        canTakeAssessment: z.ZodBoolean;
        hasCompleted: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        assessmentId: string;
        isEligible: boolean;
        canTakeAssessment: boolean;
        hasCompleted: boolean;
    }, {
        userId: string;
        assessmentId: string;
        isEligible: boolean;
        canTakeAssessment: boolean;
        hasCompleted: boolean;
    }>>;
    organizationAccess: z.ZodOptional<z.ZodObject<{
        organizationId: z.ZodString;
        userId: z.ZodString;
        hasActiveMembership: z.ZodBoolean;
        membershipRole: z.ZodString;
        hasRequiredPermissions: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        userId: string;
        organizationId: string;
        hasActiveMembership: boolean;
        membershipRole: string;
        hasRequiredPermissions: boolean;
    }, {
        userId: string;
        organizationId: string;
        hasActiveMembership: boolean;
        membershipRole: string;
        hasRequiredPermissions: boolean;
    }>>;
}, "strip", z.ZodTypeAny, {
    validatePermissions: boolean;
    validateOwnership: boolean;
    userId?: string | undefined;
    organizationId?: string | undefined;
    assessmentId?: string | undefined;
    contentId?: string | undefined;
    contentOwnership?: {
        userId: string;
        contentId: string;
        isOwner: boolean;
        userHasAccess: boolean;
        canEdit: boolean;
    } | undefined;
    assessmentEligibility?: {
        userId: string;
        assessmentId: string;
        isEligible: boolean;
        canTakeAssessment: boolean;
        hasCompleted: boolean;
    } | undefined;
    organizationAccess?: {
        userId: string;
        organizationId: string;
        hasActiveMembership: boolean;
        membershipRole: string;
        hasRequiredPermissions: boolean;
    } | undefined;
}, {
    userId?: string | undefined;
    organizationId?: string | undefined;
    assessmentId?: string | undefined;
    contentId?: string | undefined;
    validatePermissions?: boolean | undefined;
    validateOwnership?: boolean | undefined;
    contentOwnership?: {
        userId: string;
        contentId: string;
        isOwner: boolean;
        userHasAccess: boolean;
        canEdit: boolean;
    } | undefined;
    assessmentEligibility?: {
        userId: string;
        assessmentId: string;
        isEligible: boolean;
        canTakeAssessment: boolean;
        hasCompleted: boolean;
    } | undefined;
    organizationAccess?: {
        userId: string;
        organizationId: string;
        hasActiveMembership: boolean;
        membershipRole: string;
        hasRequiredPermissions: boolean;
    } | undefined;
}>;
export declare const ministryPlatformErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    timestamp: z.ZodString;
    requestId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    code: string;
    message: string;
    timestamp: string;
    userId?: string | undefined;
    organizationId?: string | undefined;
    details?: Record<string, unknown> | undefined;
    requestId?: string | undefined;
}, {
    code: string;
    message: string;
    timestamp: string;
    userId?: string | undefined;
    organizationId?: string | undefined;
    details?: Record<string, unknown> | undefined;
    requestId?: string | undefined;
}>;
export declare const organizationScopedRequestSchema: z.ZodObject<{
    organizationId: z.ZodString;
    userId: z.ZodOptional<z.ZodString>;
    permissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    includeInactive: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    includeInactive: boolean;
    userId?: string | undefined;
    permissions?: string[] | undefined;
}, {
    organizationId: string;
    userId?: string | undefined;
    permissions?: string[] | undefined;
    includeInactive?: boolean | undefined;
}>;
export declare const roleBasedValidationSchema: z.ZodObject<{
    userId: z.ZodString;
    organizationId: z.ZodString;
    requiredRoles: z.ZodArray<z.ZodString, "many">;
    requiredPermissions: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    allowInherited: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    organizationId: string;
    requiredRoles: string[];
    allowInherited: boolean;
    requiredPermissions?: string[] | undefined;
}, {
    userId: string;
    organizationId: string;
    requiredRoles: string[];
    requiredPermissions?: string[] | undefined;
    allowInherited?: boolean | undefined;
}>;
export declare const ministryPaginatedResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodUnknown, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrevious: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    }>;
    meta: z.ZodOptional<z.ZodObject<{
        timestamp: z.ZodString;
        requestId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
        requestId?: string | undefined;
    }, {
        timestamp: string;
        requestId?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    data: unknown[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    meta?: {
        timestamp: string;
        requestId?: string | undefined;
    } | undefined;
}, {
    data: unknown[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
    };
    meta?: {
        timestamp: string;
        requestId?: string | undefined;
    } | undefined;
}>;
export declare const ministryPlatformResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodOptional<z.ZodUnknown>;
    error: z.ZodOptional<z.ZodObject<{
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        timestamp: z.ZodString;
        requestId: z.ZodOptional<z.ZodString>;
        userId: z.ZodOptional<z.ZodString>;
        organizationId: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        code: string;
        message: string;
        timestamp: string;
        userId?: string | undefined;
        organizationId?: string | undefined;
        details?: Record<string, unknown> | undefined;
        requestId?: string | undefined;
    }, {
        code: string;
        message: string;
        timestamp: string;
        userId?: string | undefined;
        organizationId?: string | undefined;
        details?: Record<string, unknown> | undefined;
        requestId?: string | undefined;
    }>>;
    meta: z.ZodOptional<z.ZodObject<{
        timestamp: z.ZodString;
        requestId: z.ZodOptional<z.ZodString>;
        version: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
        requestId?: string | undefined;
        version?: string | undefined;
    }, {
        timestamp: string;
        requestId?: string | undefined;
        version?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data?: unknown;
    meta?: {
        timestamp: string;
        requestId?: string | undefined;
        version?: string | undefined;
    } | undefined;
    error?: {
        code: string;
        message: string;
        timestamp: string;
        userId?: string | undefined;
        organizationId?: string | undefined;
        details?: Record<string, unknown> | undefined;
        requestId?: string | undefined;
    } | undefined;
}, {
    success: boolean;
    data?: unknown;
    meta?: {
        timestamp: string;
        requestId?: string | undefined;
        version?: string | undefined;
    } | undefined;
    error?: {
        code: string;
        message: string;
        timestamp: string;
        userId?: string | undefined;
        organizationId?: string | undefined;
        details?: Record<string, unknown> | undefined;
        requestId?: string | undefined;
    } | undefined;
}>;
export type CrossEntityValidation = z.infer<typeof crossEntityValidationSchema>;
export type MinistryPlatformError = z.infer<typeof ministryPlatformErrorSchema>;
export type OrganizationScopedRequest = z.infer<typeof organizationScopedRequestSchema>;
export type RoleBasedValidation = z.infer<typeof roleBasedValidationSchema>;
export type MinistryPaginatedResponse = z.infer<typeof ministryPaginatedResponseSchema>;
export type MinistryPlatformResponse = z.infer<typeof ministryPlatformResponseSchema>;
export declare const ministryAssessmentSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    assessmentId: z.ZodString;
    startedAt: z.ZodString;
    completedAt: z.ZodOptional<z.ZodString>;
    completionPercentage: z.ZodDefault<z.ZodNumber>;
    rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    totalScore: z.ZodOptional<z.ZodNumber>;
    maxPossibleScore: z.ZodOptional<z.ZodNumber>;
    apostolicScore: z.ZodOptional<z.ZodNumber>;
    propheticScore: z.ZodOptional<z.ZodNumber>;
    evangelisticScore: z.ZodOptional<z.ZodNumber>;
    shepherdingScore: z.ZodOptional<z.ZodNumber>;
    teachingScore: z.ZodOptional<z.ZodNumber>;
    normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    responseConsistency: z.ZodOptional<z.ZodNumber>;
    completionTime: z.ZodOptional<z.ZodNumber>;
    confidenceLevel: z.ZodOptional<z.ZodNumber>;
    culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
    culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
    aiInsights: z.ZodOptional<z.ZodString>;
    personalizedRecommendations: z.ZodOptional<z.ZodObject<{
        strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    }>>;
    suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    assessmentId: string;
    id: string;
    startedAt: string;
    completionPercentage: number;
    culturalAdjustmentApplied: boolean;
    suggestedPeers: string[];
    complementaryGifts: string[];
    createdAt: string;
    updatedAt: string;
    completedAt?: string | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
}, {
    userId: string;
    assessmentId: string;
    id: string;
    startedAt: string;
    createdAt: string;
    updatedAt: string;
    completedAt?: string | undefined;
    completionPercentage?: number | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
}>;
export declare const ministryCommunitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    type: z.ZodDefault<z.ZodEnum<["public", "private", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived"]>>;
    memberCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    type: "public" | "private" | "invite_only";
    status: "active" | "inactive" | "archived";
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    memberCount: number;
    description?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    type?: "public" | "private" | "invite_only" | undefined;
    status?: "active" | "inactive" | "archived" | undefined;
    description?: string | undefined;
    memberCount?: number | undefined;
}>;
export declare const ministryContentItemSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
    format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
    wordCount: z.ZodOptional<z.ZodNumber>;
    estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
    viewCount: z.ZodDefault<z.ZodNumber>;
    likeCount: z.ZodDefault<z.ZodNumber>;
    shareCount: z.ZodDefault<z.ZodNumber>;
    commentCount: z.ZodDefault<z.ZodNumber>;
    bookmarkCount: z.ZodDefault<z.ZodNumber>;
    primaryCategoryId: z.ZodOptional<z.ZodString>;
    secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    seriesId: z.ZodOptional<z.ZodString>;
    seriesOrder: z.ZodOptional<z.ZodNumber>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
    networkAmplificationScore: z.ZodDefault<z.ZodNumber>;
    crossReferenceCount: z.ZodDefault<z.ZodNumber>;
    aiEnhanced: z.ZodDefault<z.ZodBoolean>;
    aiSummary: z.ZodOptional<z.ZodString>;
    aiKeyPoints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    featuredImageUrl: z.ZodOptional<z.ZodString>;
    videoUrl: z.ZodOptional<z.ZodString>;
    audioUrl: z.ZodOptional<z.ZodString>;
    attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        type: z.ZodString;
        size: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        type: string;
        name: string;
        url: string;
        size: number;
    }, {
        type: string;
        name: string;
        url: string;
        size: number;
    }>, "many">>;
    metaTitle: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    canonicalUrl: z.ZodOptional<z.ZodString>;
    originalSource: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
    attributionRequired: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "archived" | "draft" | "published" | "under_review" | "scheduled";
    id: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    title: string;
    authorId: string;
    coAuthors: string[];
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
    viewCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    bookmarkCount: number;
    secondaryCategories: string[];
    tags: string[];
    theologicalThemes: string[];
    visibility: "public" | "private" | "invite_only" | "premium" | "vip" | "organization";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    excerpt?: string | undefined;
    content?: string | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    primaryCategoryId?: string | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    aiSummary?: string | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    slug: string;
    title: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    status?: "archived" | "draft" | "published" | "under_review" | "scheduled" | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    coAuthors?: string[] | undefined;
    format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    viewCount?: number | undefined;
    likeCount?: number | undefined;
    shareCount?: number | undefined;
    commentCount?: number | undefined;
    bookmarkCount?: number | undefined;
    primaryCategoryId?: string | undefined;
    secondaryCategories?: string[] | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    visibility?: "public" | "private" | "invite_only" | "premium" | "vip" | "organization" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    metaDescription?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}>;
export declare const ministryMetricsSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
    metricType: z.ZodEnum<["engagement", "growth", "impact", "revenue", "reach"]>;
    metricName: z.ZodString;
    value: z.ZodNumber;
    unit: z.ZodOptional<z.ZodString>;
    period: z.ZodEnum<["daily", "weekly", "monthly", "quarterly", "yearly"]>;
    periodStart: z.ZodString;
    periodEnd: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
    metricName: string;
    period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
    periodStart: string;
    periodEnd: string;
    organizationId?: string | undefined;
    unit?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}, {
    value: number;
    id: string;
    createdAt: string;
    updatedAt: string;
    metricType: "engagement" | "growth" | "impact" | "revenue" | "reach";
    metricName: string;
    period: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
    periodStart: string;
    periodEnd: string;
    organizationId?: string | undefined;
    unit?: string | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const ministryOrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    logoUrl: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
    sizeCategory: z.ZodOptional<z.ZodEnum<["startup", "small", "medium", "large", "enterprise"]>>;
    contactEmail: z.ZodOptional<z.ZodString>;
    contactPhone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
        postalCode: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }, {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    }>>;
    licenseType: z.ZodDefault<z.ZodEnum<["individual", "team", "enterprise"]>>;
    maxUsers: z.ZodDefault<z.ZodNumber>;
    billingEmail: z.ZodOptional<z.ZodString>;
    accountOwnerId: z.ZodOptional<z.ZodString>;
    stripeCustomerId: z.ZodOptional<z.ZodString>;
    stripeProductId: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["trial", "active", "suspended", "cancelled"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "active" | "trial" | "suspended" | "cancelled";
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    licenseType: "enterprise" | "individual" | "team";
    organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
    maxUsers: number;
    description?: string | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
    status?: "active" | "trial" | "suspended" | "cancelled" | undefined;
    description?: string | undefined;
    licenseType?: "enterprise" | "individual" | "team" | undefined;
    website?: string | undefined;
    logoUrl?: string | undefined;
    sizeCategory?: "startup" | "small" | "medium" | "large" | "enterprise" | undefined;
    contactEmail?: string | undefined;
    contactPhone?: string | undefined;
    address?: {
        street?: string | undefined;
        city?: string | undefined;
        state?: string | undefined;
        country?: string | undefined;
        postalCode?: string | undefined;
    } | undefined;
    maxUsers?: number | undefined;
    billingEmail?: string | undefined;
    accountOwnerId?: string | undefined;
    stripeCustomerId?: string | undefined;
    stripeProductId?: string | undefined;
}>;
export declare const ministryUserProfileSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    passwordHash: z.ZodOptional<z.ZodString>;
    firstName: z.ZodString;
    lastName: z.ZodString;
    displayName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    avatarUrl: z.ZodOptional<z.ZodString>;
    ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
    denomination: z.ZodOptional<z.ZodString>;
    organizationName: z.ZodOptional<z.ZodString>;
    yearsInMinistry: z.ZodOptional<z.ZodNumber>;
    countryCode: z.ZodOptional<z.ZodString>;
    timezone: z.ZodOptional<z.ZodString>;
    languagePrimary: z.ZodDefault<z.ZodString>;
    culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
    assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
    assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
    assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
    assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
    assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
    assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
    assessmentTotal: z.ZodOptional<z.ZodNumber>;
    leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
    subdomain: z.ZodOptional<z.ZodString>;
    customDomain: z.ZodOptional<z.ZodString>;
    platformTitle: z.ZodOptional<z.ZodString>;
    subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
    theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    brandColors: z.ZodDefault<z.ZodObject<{
        primary: z.ZodDefault<z.ZodString>;
        secondary: z.ZodDefault<z.ZodString>;
        accent: z.ZodDefault<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        accent: string;
    }, {
        primary?: string | undefined;
        secondary?: string | undefined;
        accent?: string | undefined;
    }>>;
    emailNotifications: z.ZodDefault<z.ZodObject<{
        dailyDigest: z.ZodDefault<z.ZodBoolean>;
        collaborationRequests: z.ZodDefault<z.ZodBoolean>;
        revenueReports: z.ZodDefault<z.ZodBoolean>;
        communityUpdates: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    }, {
        dailyDigest?: boolean | undefined;
        collaborationRequests?: boolean | undefined;
        revenueReports?: boolean | undefined;
        communityUpdates?: boolean | undefined;
    }>>;
    privacySettings: z.ZodDefault<z.ZodObject<{
        publicProfile: z.ZodDefault<z.ZodBoolean>;
        showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
        allowNetworking: z.ZodDefault<z.ZodBoolean>;
        shareAnalytics: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    }, {
        publicProfile?: boolean | undefined;
        showAssessmentResults?: boolean | undefined;
        allowNetworking?: boolean | undefined;
        shareAnalytics?: boolean | undefined;
    }>>;
    onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
    onboardingStep: z.ZodDefault<z.ZodNumber>;
    accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    lastActiveAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
    languagePrimary: string;
    subscriptionTier: "individual" | "free" | "professional" | "leader" | "institutional";
    theologicalFocus: string[];
    brandColors: {
        primary: string;
        secondary: string;
        accent: string;
    };
    emailNotifications: {
        dailyDigest: boolean;
        collaborationRequests: boolean;
        revenueReports: boolean;
        communityUpdates: boolean;
    };
    privacySettings: {
        publicProfile: boolean;
        showAssessmentResults: boolean;
        allowNetworking: boolean;
        shareAnalytics: boolean;
    };
    onboardingCompleted: boolean;
    onboardingStep: number;
    accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
    lastActiveAt: string;
    denomination?: string | undefined;
    passwordHash?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    avatarUrl?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    assessmentMovementAlignment?: number | undefined;
    assessmentAudienceEngagement?: number | undefined;
    assessmentContentReadiness?: number | undefined;
    assessmentRevenuePotential?: number | undefined;
    assessmentNetworkEffects?: number | undefined;
    assessmentStrategicFit?: number | undefined;
    assessmentTotal?: number | undefined;
    leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    customDomain?: string | undefined;
    platformTitle?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    email: string;
    firstName: string;
    lastName: string;
    ministryRole: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
    lastActiveAt: string;
    denomination?: string | undefined;
    passwordHash?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    avatarUrl?: string | undefined;
    organizationName?: string | undefined;
    yearsInMinistry?: number | undefined;
    countryCode?: string | undefined;
    timezone?: string | undefined;
    languagePrimary?: string | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    assessmentMovementAlignment?: number | undefined;
    assessmentAudienceEngagement?: number | undefined;
    assessmentContentReadiness?: number | undefined;
    assessmentRevenuePotential?: number | undefined;
    assessmentNetworkEffects?: number | undefined;
    assessmentStrategicFit?: number | undefined;
    assessmentTotal?: number | undefined;
    leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
    subdomain?: string | undefined;
    customDomain?: string | undefined;
    platformTitle?: string | undefined;
    subscriptionTier?: "individual" | "free" | "professional" | "leader" | "institutional" | undefined;
    theologicalFocus?: string[] | undefined;
    brandColors?: {
        primary?: string | undefined;
        secondary?: string | undefined;
        accent?: string | undefined;
    } | undefined;
    emailNotifications?: {
        dailyDigest?: boolean | undefined;
        collaborationRequests?: boolean | undefined;
        revenueReports?: boolean | undefined;
        communityUpdates?: boolean | undefined;
    } | undefined;
    privacySettings?: {
        publicProfile?: boolean | undefined;
        showAssessmentResults?: boolean | undefined;
        allowNetworking?: boolean | undefined;
        shareAnalytics?: boolean | undefined;
    } | undefined;
    onboardingCompleted?: boolean | undefined;
    onboardingStep?: number | undefined;
    accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
}>;
export type MinistryAssessment = z.infer<typeof userAssessmentEntitySchema>;
export type MinistryCommunity = z.infer<typeof communityEntitySchema>;
export type MinistryContentItem = z.infer<typeof contentItemEntitySchema>;
export type MinistryMetrics = z.infer<typeof movementMetricEntitySchema>;
export type MinistryOrganization = z.infer<typeof organizationEntitySchema>;
export type MinistryUserProfile = z.infer<typeof userProfileEntitySchema>;
export type OrganizationContext = z.infer<typeof organizationEntitySchema>;
//# sourceMappingURL=ministry-platform.schema.d.ts.map