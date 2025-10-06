import { z } from 'zod';
import { PaginatedResponseSchema } from './user.contracts';
/**
 * Create Content Item API Request Contract
 * Derived from CreateContentItemOperationSchema
 */
export declare const CreateContentItemApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
    metaDescription: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
    wordCount: z.ZodOptional<z.ZodNumber>;
    estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
    primaryCategoryId: z.ZodOptional<z.ZodString>;
    secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    seriesId: z.ZodOptional<z.ZodString>;
    seriesOrder: z.ZodOptional<z.ZodNumber>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
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
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
        size: number;
    }>, "many">>;
    metaTitle: z.ZodOptional<z.ZodString>;
    canonicalUrl: z.ZodOptional<z.ZodString>;
    originalSource: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    scheduledAt: z.ZodOptional<z.ZodString>;
    licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
    attributionRequired: z.ZodDefault<z.ZodBoolean>;
    contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
} & {
    title: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    content: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    title: string;
    content: string;
    authorId: string;
    coAuthors: string[];
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
    secondaryCategories: string[];
    tags: string[];
    theologicalThemes: string[];
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    slug?: string | undefined;
    metaDescription?: string | undefined;
    excerpt?: string | undefined;
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
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
}, {
    title: string;
    content: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    slug?: string | undefined;
    metaDescription?: string | undefined;
    excerpt?: string | undefined;
    coAuthors?: string[] | undefined;
    format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    primaryCategoryId?: string | undefined;
    secondaryCategories?: string[] | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}>;
/**
 * Update Content Item API Request Contract
 * Derived from UpdateContentItemOperationSchema
 */
export declare const UpdateContentItemApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    authorId: z.ZodOptional<z.ZodString>;
    coAuthors: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    format: z.ZodOptional<z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>>;
    wordCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    estimatedReadingTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    primaryCategoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    secondaryCategories: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    theologicalThemes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    seriesId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seriesOrder: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>>;
    networkAmplificationScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    crossReferenceCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    aiEnhanced: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    aiSummary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    aiKeyPoints: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    featuredImageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    videoUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    audioUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    attachments: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        url: z.ZodString;
        type: z.ZodString;
        size: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
        size: number;
    }>, "many">>>;
    metaTitle: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    canonicalUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    originalSource: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scheduledAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    licenseType: z.ZodOptional<z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>>;
    attributionRequired: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    contentType: z.ZodOptional<z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>>;
}, "slug">, "strip", z.ZodTypeAny, {
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    authorId?: string | undefined;
    coAuthors?: string[] | undefined;
    contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
    format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    primaryCategoryId?: string | undefined;
    secondaryCategories?: string[] | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}, {
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    authorId?: string | undefined;
    coAuthors?: string[] | undefined;
    contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
    format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    primaryCategoryId?: string | undefined;
    secondaryCategories?: string[] | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}>, {
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    authorId?: string | undefined;
    coAuthors?: string[] | undefined;
    contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
    format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    primaryCategoryId?: string | undefined;
    secondaryCategories?: string[] | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}, {
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    authorId?: string | undefined;
    coAuthors?: string[] | undefined;
    contentType?: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson" | undefined;
    format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
    wordCount?: number | undefined;
    estimatedReadingTime?: number | undefined;
    primaryCategoryId?: string | undefined;
    secondaryCategories?: string[] | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    seriesOrder?: number | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}>;
/**
 * Publish Content Item API Request Contract
 * Derived from PublishContentItemOperationSchema
 */
export declare const PublishContentItemApiRequestSchema: z.ZodObject<{
    content_id: z.ZodString;
    published_at: z.ZodOptional<z.ZodString>;
    meta_title: z.ZodOptional<z.ZodString>;
    meta_description: z.ZodOptional<z.ZodString>;
    canonical_url: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    published_at?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
}, {
    content_id: string;
    published_at?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
}>;
/**
 * Schedule Content Item API Request Contract
 * Derived from ScheduleContentItemOperationSchema
 */
export declare const ScheduleContentItemApiRequestSchema: z.ZodObject<{
    content_id: z.ZodString;
    scheduled_at: z.ZodString;
    published_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    scheduled_at: string;
    published_at?: string | undefined;
}, {
    content_id: string;
    scheduled_at: string;
    published_at?: string | undefined;
}>;
/**
 * Search Content Items API Request Contract
 * Derived from SearchContentItemsOperationSchema
 */
export declare const SearchContentItemsApiRequestSchema: z.ZodObject<{
    query: z.ZodString;
    content_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>, "many">>;
    visibility: z.ZodOptional<z.ZodArray<z.ZodEnum<["public", "private", "organization", "invite_only"]>, "many">>;
    primary_category_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    theological_themes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["relevance", "created_at", "published_at", "view_count", "like_count"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    query: string;
    sort_by: "published_at" | "relevance" | "created_at" | "view_count" | "like_count";
    sort_order: "asc" | "desc";
    status?: ("draft" | "published" | "archived" | "under_review" | "scheduled")[] | undefined;
    tags?: string[] | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    content_type?: ("other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar")[] | undefined;
    primary_category_id?: string[] | undefined;
    theological_themes?: string[] | undefined;
}, {
    query: string;
    status?: ("draft" | "published" | "archived" | "under_review" | "scheduled")[] | undefined;
    tags?: string[] | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    content_type?: ("other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar")[] | undefined;
    primary_category_id?: string[] | undefined;
    theological_themes?: string[] | undefined;
    sort_by?: "published_at" | "relevance" | "created_at" | "view_count" | "like_count" | undefined;
    sort_order?: "asc" | "desc" | undefined;
}>;
/**
 * Create Content Category API Request Contract
 * Derived from CreateContentCategoryOperationSchema
 */
export declare const CreateContentCategoryApiRequestSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    orderIndex: z.ZodDefault<z.ZodNumber>;
    theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
    movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
    apestRelevance: z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodDefault<z.ZodNumber>;
        prophetic: z.ZodDefault<z.ZodNumber>;
        evangelistic: z.ZodDefault<z.ZodNumber>;
        shepherding: z.ZodDefault<z.ZodNumber>;
        teaching: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    }>>;
    metaDescription: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    orderIndex: number;
    movementRelevanceScore: number;
    apestRelevance: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    };
    keywords: string[];
    isActive: boolean;
    description?: string | undefined;
    parentId?: string | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    metaDescription?: string | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
}>;
/**
 * Update Content Category API Request Contract
 * Derived from UpdateContentCategoryOperationSchema
 */
export declare const UpdateContentCategoryApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    parentId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    orderIndex: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    theologicalDiscipline: z.ZodOptional<z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>>;
    movementRelevanceScore: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    apestRelevance: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodDefault<z.ZodNumber>;
        prophetic: z.ZodDefault<z.ZodNumber>;
        evangelistic: z.ZodDefault<z.ZodNumber>;
        shepherding: z.ZodDefault<z.ZodNumber>;
        teaching: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    }>>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
}, "slug">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
}>, {
    name?: string | undefined;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
}>;
/**
 * Reorder Content Categories API Request Contract
 * Derived from ReorderContentCategoriesOperationSchema
 */
export declare const ReorderContentCategoriesApiRequestSchema: z.ZodObject<{
    category_orders: z.ZodArray<z.ZodObject<{
        category_id: z.ZodString;
        order_index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        category_id: string;
        order_index: number;
    }, {
        category_id: string;
        order_index: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    category_orders: {
        category_id: string;
        order_index: number;
    }[];
}, {
    category_orders: {
        category_id: string;
        order_index: number;
    }[];
}>;
/**
 * Create Content Series API Request Contract
 * Derived from CreateContentSeriesOperationSchema
 */
export declare const CreateContentSeriesApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>;
    description: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    primaryCategoryId: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
    featuredImageUrl: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    seriesType: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
} & {
    title: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review";
    slug: string;
    title: string;
    authorId: string;
    tags: string[];
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    collaborators: string[];
    seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
    difficulty: "beginner" | "intermediate" | "advanced" | "expert";
    description?: string | undefined;
    metaDescription?: string | undefined;
    primaryCategoryId?: string | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
}, {
    slug: string;
    title: string;
    authorId: string;
    seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    estimatedDuration?: number | undefined;
}>;
/**
 * Update Content Series API Request Contract
 * Derived from UpdateContentSeriesOperationSchema
 */
export declare const UpdateContentSeriesApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    metaDescription: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    authorId: z.ZodOptional<z.ZodString>;
    primaryCategoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>>;
    featuredImageUrl: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    collaborators: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    difficulty: z.ZodOptional<z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>>;
    estimatedDuration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    seriesType: z.ZodOptional<z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>>;
}, "slug">, "strip", z.ZodTypeAny, {
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    authorId?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    seriesType?: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    estimatedDuration?: number | undefined;
}, {
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    authorId?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    seriesType?: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    estimatedDuration?: number | undefined;
}>, {
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    authorId?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    seriesType?: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    estimatedDuration?: number | undefined;
}, {
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    title?: string | undefined;
    authorId?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    seriesType?: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    estimatedDuration?: number | undefined;
}>;
/**
 * Add Content to Series API Request Contract
 * Derived from AddContentToSeriesOperationSchema
 */
export declare const AddContentToSeriesApiRequestSchema: z.ZodObject<{
    series_id: z.ZodString;
    content_id: z.ZodString;
    order_index: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    series_id: string;
    order_index?: number | undefined;
}, {
    content_id: string;
    series_id: string;
    order_index?: number | undefined;
}>;
/**
 * Remove Content from Series API Request Contract
 * Derived from RemoveContentFromSeriesOperationSchema
 */
export declare const RemoveContentFromSeriesApiRequestSchema: z.ZodObject<{
    series_id: z.ZodString;
    content_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    series_id: string;
}, {
    content_id: string;
    series_id: string;
}>;
/**
 * Reorder Series Content API Request Contract
 * Derived from ReorderSeriesContentOperationSchema
 */
export declare const ReorderSeriesContentApiRequestSchema: z.ZodObject<{
    series_id: z.ZodString;
    content_orders: z.ZodArray<z.ZodObject<{
        content_id: z.ZodString;
        order_index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        content_id: string;
        order_index: number;
    }, {
        content_id: string;
        order_index: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    series_id: string;
    content_orders: {
        content_id: string;
        order_index: number;
    }[];
}, {
    series_id: string;
    content_orders: {
        content_id: string;
        order_index: number;
    }[];
}>;
/**
 * Create Content Cross Reference API Request Contract
 * Derived from CreateContentCrossReferenceOperationSchema
 */
export declare const CreateContentCrossReferenceApiRequestSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    referenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    relevanceScore: z.ZodDefault<z.ZodNumber>;
    qualityScore: z.ZodDefault<z.ZodNumber>;
    contextDescription: z.ZodOptional<z.ZodString>;
    isAuthorApproved: z.ZodDefault<z.ZodBoolean>;
    isAiGenerated: z.ZodDefault<z.ZodBoolean>;
    clickCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    source_content_id: z.ZodString;
    target_content_id: z.ZodString;
    reference_type: z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
}>, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
}>;
/**
 * Update Content Cross Reference API Request Contract
 * Derived from UpdateContentCrossReferenceOperationSchema
 */
export declare const UpdateContentCrossReferenceApiRequestSchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    referenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    relevanceScore: z.ZodDefault<z.ZodNumber>;
    qualityScore: z.ZodDefault<z.ZodNumber>;
    contextDescription: z.ZodOptional<z.ZodString>;
    isAuthorApproved: z.ZodDefault<z.ZodBoolean>;
    isAiGenerated: z.ZodDefault<z.ZodBoolean>;
    clickCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
}>, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
}>;
/**
 * Content Item API Response Contract
 * Derived from ContentItemEntitySchema
 */
export declare const ContentItemApiResponseSchema: z.ZodObject<{
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
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
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
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
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
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    metaDescription?: string | undefined;
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
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
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
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}>;
/**
 * Content Item with Author API Response Contract
 * Extends content item with author information
 */
export declare const ContentItemWithAuthorApiResponseSchema: z.ZodObject<{
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
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
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
} & {
    author: z.ZodObject<{
        id: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        display_name: z.ZodOptional<z.ZodString>;
        avatar_url: z.ZodOptional<z.ZodString>;
        ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
        organization_name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
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
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    metaDescription?: string | undefined;
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
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
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
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
}>;
/**
 * Content Item with Category API Response Contract
 * Extends content item with category information
 */
export declare const ContentItemWithCategoryApiResponseSchema: z.ZodObject<{
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
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
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
} & {
    category: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
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
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    metaDescription?: string | undefined;
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
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    category?: {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
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
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
    category?: {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
}>;
/**
 * Content Item with Series API Response Contract
 * Extends content item with series information
 */
export declare const ContentItemWithSeriesApiResponseSchema: z.ZodObject<{
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
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
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
} & {
    series: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        series_type: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    }, {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
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
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    metaDescription?: string | undefined;
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
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    } | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
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
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    } | undefined;
}>;
/**
 * Content Item with Full Details API Response Contract
 * Extends content item with all related information
 */
export declare const ContentItemWithFullDetailsApiResponseSchema: z.ZodObject<{
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
        name: string;
        url: string;
        type: string;
        size: number;
    }, {
        name: string;
        url: string;
        type: string;
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
} & {
    author: z.ZodObject<{
        id: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        display_name: z.ZodOptional<z.ZodString>;
        avatar_url: z.ZodOptional<z.ZodString>;
        ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
        organization_name: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }>;
    category: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    }>>;
    series: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        series_type: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    }, {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    }>>;
    cross_references: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        target_content_id: z.ZodString;
        target_content_title: z.ZodString;
        reference_type: z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>;
        relevance_score: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        target_content_title: string;
        relevance_score: number;
    }, {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        target_content_title: string;
        relevance_score: number;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
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
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    networkAmplificationScore: number;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiKeyPoints: string[];
    attachments: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[];
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    cross_references: {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        target_content_title: string;
        relevance_score: number;
    }[];
    metaDescription?: string | undefined;
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
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    } | undefined;
    category?: {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    metaDescription?: string | undefined;
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
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    networkAmplificationScore?: number | undefined;
    crossReferenceCount?: number | undefined;
    aiEnhanced?: boolean | undefined;
    aiSummary?: string | undefined;
    aiKeyPoints?: string[] | undefined;
    featuredImageUrl?: string | undefined;
    videoUrl?: string | undefined;
    audioUrl?: string | undefined;
    attachments?: {
        name: string;
        url: string;
        type: string;
        size: number;
    }[] | undefined;
    metaTitle?: string | undefined;
    canonicalUrl?: string | undefined;
    originalSource?: string | undefined;
    publishedAt?: string | undefined;
    scheduledAt?: string | undefined;
    licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
    attributionRequired?: boolean | undefined;
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        description?: string | undefined;
    } | undefined;
    category?: {
        name: string;
        id: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
    cross_references?: {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        target_content_title: string;
        relevance_score: number;
    }[] | undefined;
}>;
/**
 * Content Item List API Response Contract
 * Paginated list of content items
 */
export declare const ContentItemListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
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
            name: string;
            url: string;
            type: string;
            size: number;
        }, {
            name: string;
            url: string;
            type: string;
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
    } & {
        author: z.ZodObject<{
            id: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
            ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
            organization_name: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        }, {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
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
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
        metaDescription?: string | undefined;
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
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }, {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
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
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
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
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
        metaDescription?: string | undefined;
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
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
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
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Content Item Search API Response Contract
 * Search results for content items
 */
export declare const ContentItemSearchApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        content_items: z.ZodArray<z.ZodObject<{
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
                name: string;
                url: string;
                type: string;
                size: number;
            }, {
                name: string;
                url: string;
                type: string;
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
        } & {
            author: z.ZodObject<{
                id: z.ZodString;
                first_name: z.ZodString;
                last_name: z.ZodString;
                display_name: z.ZodOptional<z.ZodString>;
                avatar_url: z.ZodOptional<z.ZodString>;
                ministry_role: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
                organization_name: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            }, {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            status: "draft" | "published" | "archived" | "under_review" | "scheduled";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            metaDescription?: string | undefined;
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
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }, {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
            metaDescription?: string | undefined;
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
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
            licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
            attributionRequired?: boolean | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        query: string;
        total: number;
        content_items: {
            status: "draft" | "published" | "archived" | "under_review" | "scheduled";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            metaDescription?: string | undefined;
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
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }[];
        took: number;
    }, {
        query: string;
        total: number;
        content_items: {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
            metaDescription?: string | undefined;
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
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
            licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
            attributionRequired?: boolean | undefined;
        }[];
        took: number;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        query: string;
        total: number;
        content_items: {
            status: "draft" | "published" | "archived" | "under_review" | "scheduled";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
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
            visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
            networkAmplificationScore: number;
            crossReferenceCount: number;
            aiEnhanced: boolean;
            aiKeyPoints: string[];
            attachments: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[];
            licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
            attributionRequired: boolean;
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            metaDescription?: string | undefined;
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
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        query: string;
        total: number;
        content_items: {
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            title: string;
            authorId: string;
            contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "other" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
            metaDescription?: string | undefined;
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
            visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
            networkAmplificationScore?: number | undefined;
            crossReferenceCount?: number | undefined;
            aiEnhanced?: boolean | undefined;
            aiSummary?: string | undefined;
            aiKeyPoints?: string[] | undefined;
            featuredImageUrl?: string | undefined;
            videoUrl?: string | undefined;
            audioUrl?: string | undefined;
            attachments?: {
                name: string;
                url: string;
                type: string;
                size: number;
            }[] | undefined;
            metaTitle?: string | undefined;
            canonicalUrl?: string | undefined;
            originalSource?: string | undefined;
            publishedAt?: string | undefined;
            scheduledAt?: string | undefined;
            licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
            attributionRequired?: boolean | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Content Category API Response Contract
 * Derived from ContentCategoryEntitySchema
 */
export declare const ContentCategoryApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    orderIndex: z.ZodDefault<z.ZodNumber>;
    theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
    movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
    apestRelevance: z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodDefault<z.ZodNumber>;
        prophetic: z.ZodDefault<z.ZodNumber>;
        evangelistic: z.ZodDefault<z.ZodNumber>;
        shepherding: z.ZodDefault<z.ZodNumber>;
        teaching: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    }>>;
    metaDescription: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    slug: string;
    orderIndex: number;
    movementRelevanceScore: number;
    apestRelevance: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    };
    keywords: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    parentId?: string | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    metaDescription?: string | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
}>;
/**
 * Content Category with Parent API Response Contract
 * Extends category with parent information
 */
export declare const ContentCategoryWithParentApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    orderIndex: z.ZodDefault<z.ZodNumber>;
    theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
    movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
    apestRelevance: z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodDefault<z.ZodNumber>;
        prophetic: z.ZodDefault<z.ZodNumber>;
        evangelistic: z.ZodDefault<z.ZodNumber>;
        shepherding: z.ZodDefault<z.ZodNumber>;
        teaching: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    }>>;
    metaDescription: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    parent: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
    }, {
        name: string;
        id: string;
        slug: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    slug: string;
    orderIndex: number;
    movementRelevanceScore: number;
    apestRelevance: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    };
    keywords: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    parentId?: string | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    metaDescription?: string | undefined;
    parent?: {
        name: string;
        id: string;
        slug: string;
    } | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
    parent?: {
        name: string;
        id: string;
        slug: string;
    } | undefined;
}>;
/**
 * Content Category with Children API Response Contract
 * Extends category with children information
 */
export declare const ContentCategoryWithChildrenApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    orderIndex: z.ZodDefault<z.ZodNumber>;
    theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
    movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
    apestRelevance: z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodDefault<z.ZodNumber>;
        prophetic: z.ZodDefault<z.ZodNumber>;
        evangelistic: z.ZodDefault<z.ZodNumber>;
        shepherding: z.ZodDefault<z.ZodNumber>;
        teaching: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    }>>;
    metaDescription: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    children: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        order_index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    slug: string;
    orderIndex: number;
    movementRelevanceScore: number;
    apestRelevance: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    };
    keywords: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    children: {
        name: string;
        id: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }[];
    description?: string | undefined;
    parentId?: string | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    metaDescription?: string | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    parentId?: string | undefined;
    orderIndex?: number | undefined;
    theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movementRelevanceScore?: number | undefined;
    apestRelevance?: {
        apostolic?: number | undefined;
        prophetic?: number | undefined;
        evangelistic?: number | undefined;
        shepherding?: number | undefined;
        teaching?: number | undefined;
    } | undefined;
    metaDescription?: string | undefined;
    keywords?: string[] | undefined;
    isActive?: boolean | undefined;
    children?: {
        name: string;
        id: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }[] | undefined;
}>;
/**
 * Content Category List API Response Contract
 * Paginated list of content categories
 */
export declare const ContentCategoryListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        parentId: z.ZodOptional<z.ZodString>;
        orderIndex: z.ZodDefault<z.ZodNumber>;
        theologicalDiscipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
        movementRelevanceScore: z.ZodDefault<z.ZodNumber>;
        apestRelevance: z.ZodDefault<z.ZodObject<{
            apostolic: z.ZodDefault<z.ZodNumber>;
            prophetic: z.ZodDefault<z.ZodNumber>;
            evangelistic: z.ZodDefault<z.ZodNumber>;
            shepherding: z.ZodDefault<z.ZodNumber>;
            teaching: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        }, {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        }>>;
        metaDescription: z.ZodOptional<z.ZodString>;
        keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        isActive: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
        parent: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            id: string;
            slug: string;
        }, {
            name: string;
            id: string;
            slug: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
        slug: string;
        orderIndex: number;
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        keywords: string[];
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        metaDescription?: string | undefined;
        parent?: {
            name: string;
            id: string;
            slug: string;
        } | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
        parent?: {
            name: string;
            id: string;
            slug: string;
        } | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        name: string;
        id: string;
        slug: string;
        orderIndex: number;
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        keywords: string[];
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        metaDescription?: string | undefined;
        parent?: {
            name: string;
            id: string;
            slug: string;
        } | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        parentId?: string | undefined;
        orderIndex?: number | undefined;
        theologicalDiscipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
        movementRelevanceScore?: number | undefined;
        apestRelevance?: {
            apostolic?: number | undefined;
            prophetic?: number | undefined;
            evangelistic?: number | undefined;
            shepherding?: number | undefined;
            teaching?: number | undefined;
        } | undefined;
        metaDescription?: string | undefined;
        keywords?: string[] | undefined;
        isActive?: boolean | undefined;
        parent?: {
            name: string;
            id: string;
            slug: string;
        } | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Content Series API Response Contract
 * Derived from ContentSeriesEntitySchema
 */
export declare const ContentSeriesApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    primaryCategoryId: z.ZodOptional<z.ZodString>;
    seriesType: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    totalItems: z.ZodDefault<z.ZodNumber>;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>;
    featuredImageUrl: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    tags: string[];
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    collaborators: string[];
    seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
    difficulty: "beginner" | "intermediate" | "advanced" | "expert";
    totalItems: number;
    description?: string | undefined;
    metaDescription?: string | undefined;
    primaryCategoryId?: string | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    totalItems?: number | undefined;
    estimatedDuration?: number | undefined;
}>;
/**
 * Content Series with Content API Response Contract
 * Extends series with content items
 */
export declare const ContentSeriesWithContentApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    authorId: z.ZodString;
    collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    primaryCategoryId: z.ZodOptional<z.ZodString>;
    seriesType: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    totalItems: z.ZodDefault<z.ZodNumber>;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>;
    featuredImageUrl: z.ZodOptional<z.ZodString>;
    metaDescription: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    content_items: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        excerpt: z.ZodOptional<z.ZodString>;
        content_type: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
        status: z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>;
        published_at: z.ZodOptional<z.ZodString>;
        series_order: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        series_order: number;
        excerpt?: string | undefined;
        published_at?: string | undefined;
    }, {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        series_order: number;
        excerpt?: string | undefined;
        published_at?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    tags: string[];
    visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
    collaborators: string[];
    seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
    difficulty: "beginner" | "intermediate" | "advanced" | "expert";
    totalItems: number;
    content_items: {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        series_order: number;
        excerpt?: string | undefined;
        published_at?: string | undefined;
    }[];
    description?: string | undefined;
    metaDescription?: string | undefined;
    primaryCategoryId?: string | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
}, {
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    authorId: string;
    seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
    status?: "draft" | "published" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    metaDescription?: string | undefined;
    primaryCategoryId?: string | undefined;
    tags?: string[] | undefined;
    visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
    featuredImageUrl?: string | undefined;
    publishedAt?: string | undefined;
    collaborators?: string[] | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    totalItems?: number | undefined;
    estimatedDuration?: number | undefined;
    content_items?: {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        series_order: number;
        excerpt?: string | undefined;
        published_at?: string | undefined;
    }[] | undefined;
}>;
/**
 * Content Series List API Response Contract
 * Paginated list of content series
 */
export declare const ContentSeriesListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        authorId: z.ZodString;
        collaborators: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        primaryCategoryId: z.ZodOptional<z.ZodString>;
        seriesType: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
        difficulty: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
        totalItems: z.ZodDefault<z.ZodNumber>;
        estimatedDuration: z.ZodOptional<z.ZodNumber>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review"]>>;
        featuredImageUrl: z.ZodOptional<z.ZodString>;
        metaDescription: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        tags: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        collaborators: string[];
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        difficulty: "beginner" | "intermediate" | "advanced" | "expert";
        totalItems: number;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
    }, {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        status?: "draft" | "published" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        tags?: string[] | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        collaborators?: string[] | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
        totalItems?: number | undefined;
        estimatedDuration?: number | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        status: "draft" | "published" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        tags: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        collaborators: string[];
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        difficulty: "beginner" | "intermediate" | "advanced" | "expert";
        totalItems: number;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        seriesType: "framework" | "course" | "learning_path" | "book_series" | "podcast_series" | "video_series";
        status?: "draft" | "published" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        metaDescription?: string | undefined;
        primaryCategoryId?: string | undefined;
        tags?: string[] | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        featuredImageUrl?: string | undefined;
        publishedAt?: string | undefined;
        collaborators?: string[] | undefined;
        difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
        totalItems?: number | undefined;
        estimatedDuration?: number | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Content Cross Reference API Response Contract
 * Derived from ContentCrossReferenceEntitySchema
 */
export declare const ContentCrossReferenceApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    referenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    relevanceScore: z.ZodDefault<z.ZodNumber>;
    qualityScore: z.ZodDefault<z.ZodNumber>;
    contextDescription: z.ZodOptional<z.ZodString>;
    isAuthorApproved: z.ZodDefault<z.ZodBoolean>;
    isAiGenerated: z.ZodDefault<z.ZodBoolean>;
    clickCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
}>;
/**
 * Content Cross Reference with Details API Response Contract
 * Extends cross reference with content details
 */
export declare const ContentCrossReferenceWithDetailsApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    referenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    relevanceScore: z.ZodDefault<z.ZodNumber>;
    qualityScore: z.ZodDefault<z.ZodNumber>;
    contextDescription: z.ZodOptional<z.ZodString>;
    isAuthorApproved: z.ZodDefault<z.ZodBoolean>;
    isAiGenerated: z.ZodDefault<z.ZodBoolean>;
    clickCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    source_content: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        content_type: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    }, {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    }>;
    target_content: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        content_type: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    }, {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    source_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    };
    target_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    };
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    source_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    };
    target_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
    };
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
}>;
/**
 * Content Cross Reference List API Response Contract
 * Paginated list of content cross references
 */
export declare const ContentCrossReferenceListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        sourceContentId: z.ZodString;
        targetContentId: z.ZodString;
        referenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
        relevanceScore: z.ZodDefault<z.ZodNumber>;
        qualityScore: z.ZodDefault<z.ZodNumber>;
        contextDescription: z.ZodOptional<z.ZodString>;
        isAuthorApproved: z.ZodDefault<z.ZodBoolean>;
        isAiGenerated: z.ZodDefault<z.ZodBoolean>;
        clickCount: z.ZodDefault<z.ZodNumber>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
        source_content: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            slug: z.ZodString;
            content_type: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        }, {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        }>;
        target_content: z.ZodObject<{
            id: z.ZodString;
            title: z.ZodString;
            slug: z.ZodString;
            content_type: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        }, {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        sourceContentId: string;
        targetContentId: string;
        referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
        relevanceScore: number;
        qualityScore: number;
        isAuthorApproved: boolean;
        isAiGenerated: boolean;
        clickCount: number;
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        contextDescription?: string | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        sourceContentId: string;
        targetContentId: string;
        referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        relevanceScore?: number | undefined;
        qualityScore?: number | undefined;
        contextDescription?: string | undefined;
        isAuthorApproved?: boolean | undefined;
        isAiGenerated?: boolean | undefined;
        clickCount?: number | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        sourceContentId: string;
        targetContentId: string;
        referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
        relevanceScore: number;
        qualityScore: number;
        isAuthorApproved: boolean;
        isAiGenerated: boolean;
        clickCount: number;
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        contextDescription?: string | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        sourceContentId: string;
        targetContentId: string;
        referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "podcast" | "audio" | "course" | "book" | "webinar";
        };
        relevanceScore?: number | undefined;
        qualityScore?: number | undefined;
        contextDescription?: string | undefined;
        isAuthorApproved?: boolean | undefined;
        isAiGenerated?: boolean | undefined;
        clickCount?: number | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Content Analytics API Response Contract
 * Content performance metrics
 */
export declare const ContentAnalyticsApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        content_id: z.ZodString;
        engagement_metrics: z.ZodObject<{
            total_views: z.ZodNumber;
            unique_views: z.ZodNumber;
            average_time_on_page: z.ZodNumber;
            bounce_rate: z.ZodNumber;
            like_count: z.ZodNumber;
            share_count: z.ZodNumber;
            comment_count: z.ZodNumber;
            bookmark_count: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            like_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
        }, {
            like_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
        }>;
        traffic_metrics: z.ZodObject<{
            daily_views: z.ZodArray<z.ZodObject<{
                date: z.ZodString;
                views: z.ZodNumber;
                unique_views: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                date: string;
                unique_views: number;
                views: number;
            }, {
                date: string;
                unique_views: number;
                views: number;
            }>, "many">;
            referrer_sources: z.ZodArray<z.ZodObject<{
                source: z.ZodString;
                views: z.ZodNumber;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                views: number;
                source: string;
                percentage: number;
            }, {
                views: number;
                source: string;
                percentage: number;
            }>, "many">;
            geographic_distribution: z.ZodArray<z.ZodObject<{
                country: z.ZodString;
                views: z.ZodNumber;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                views: number;
                percentage: number;
                country: string;
            }, {
                views: number;
                percentage: number;
                country: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            daily_views: {
                date: string;
                unique_views: number;
                views: number;
            }[];
            referrer_sources: {
                views: number;
                source: string;
                percentage: number;
            }[];
            geographic_distribution: {
                views: number;
                percentage: number;
                country: string;
            }[];
        }, {
            daily_views: {
                date: string;
                unique_views: number;
                views: number;
            }[];
            referrer_sources: {
                views: number;
                source: string;
                percentage: number;
            }[];
            geographic_distribution: {
                views: number;
                percentage: number;
                country: string;
            }[];
        }>;
        sharing_metrics: z.ZodOptional<z.ZodObject<{
            social_shares: z.ZodArray<z.ZodObject<{
                platform: z.ZodString;
                shares: z.ZodNumber;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                percentage: number;
                platform: string;
                shares: number;
            }, {
                percentage: number;
                platform: string;
                shares: number;
            }>, "many">;
            email_shares: z.ZodNumber;
            direct_shares: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            social_shares: {
                percentage: number;
                platform: string;
                shares: number;
            }[];
            email_shares: number;
            direct_shares: number;
        }, {
            social_shares: {
                percentage: number;
                platform: string;
                shares: number;
            }[];
            email_shares: number;
            direct_shares: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        content_id: string;
        engagement_metrics: {
            like_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
        };
        traffic_metrics: {
            daily_views: {
                date: string;
                unique_views: number;
                views: number;
            }[];
            referrer_sources: {
                views: number;
                source: string;
                percentage: number;
            }[];
            geographic_distribution: {
                views: number;
                percentage: number;
                country: string;
            }[];
        };
        sharing_metrics?: {
            social_shares: {
                percentage: number;
                platform: string;
                shares: number;
            }[];
            email_shares: number;
            direct_shares: number;
        } | undefined;
    }, {
        content_id: string;
        engagement_metrics: {
            like_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
        };
        traffic_metrics: {
            daily_views: {
                date: string;
                unique_views: number;
                views: number;
            }[];
            referrer_sources: {
                views: number;
                source: string;
                percentage: number;
            }[];
            geographic_distribution: {
                views: number;
                percentage: number;
                country: string;
            }[];
        };
        sharing_metrics?: {
            social_shares: {
                percentage: number;
                platform: string;
                shares: number;
            }[];
            email_shares: number;
            direct_shares: number;
        } | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        content_id: string;
        engagement_metrics: {
            like_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
        };
        traffic_metrics: {
            daily_views: {
                date: string;
                unique_views: number;
                views: number;
            }[];
            referrer_sources: {
                views: number;
                source: string;
                percentage: number;
            }[];
            geographic_distribution: {
                views: number;
                percentage: number;
                country: string;
            }[];
        };
        sharing_metrics?: {
            social_shares: {
                percentage: number;
                platform: string;
                shares: number;
            }[];
            email_shares: number;
            direct_shares: number;
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        content_id: string;
        engagement_metrics: {
            like_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
        };
        traffic_metrics: {
            daily_views: {
                date: string;
                unique_views: number;
                views: number;
            }[];
            referrer_sources: {
                views: number;
                source: string;
                percentage: number;
            }[];
            geographic_distribution: {
                views: number;
                percentage: number;
                country: string;
            }[];
        };
        sharing_metrics?: {
            social_shares: {
                percentage: number;
                platform: string;
                shares: number;
            }[];
            email_shares: number;
            direct_shares: number;
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Content Performance API Response Contract
 * Content performance summary
 */
export declare const ContentPerformanceApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        content_id: z.ZodString;
        performance_score: z.ZodNumber;
        engagement_score: z.ZodNumber;
        reach_score: z.ZodNumber;
        impact_score: z.ZodNumber;
        comparisons: z.ZodOptional<z.ZodObject<{
            category_average: z.ZodNumber;
            author_average: z.ZodNumber;
            platform_average: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            category_average: number;
            author_average: number;
            platform_average: number;
        }, {
            category_average: number;
            author_average: number;
            platform_average: number;
        }>>;
        trends: z.ZodObject<{
            views_trend: z.ZodEnum<["increasing", "decreasing", "stable"]>;
            engagement_trend: z.ZodEnum<["increasing", "decreasing", "stable"]>;
            sharing_trend: z.ZodEnum<["increasing", "decreasing", "stable"]>;
        }, "strip", z.ZodTypeAny, {
            views_trend: "increasing" | "decreasing" | "stable";
            engagement_trend: "increasing" | "decreasing" | "stable";
            sharing_trend: "increasing" | "decreasing" | "stable";
        }, {
            views_trend: "increasing" | "decreasing" | "stable";
            engagement_trend: "increasing" | "decreasing" | "stable";
            sharing_trend: "increasing" | "decreasing" | "stable";
        }>;
        audience_insights: z.ZodOptional<z.ZodObject<{
            top_demographics: z.ZodArray<z.ZodObject<{
                demographic: z.ZodString;
                percentage: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                percentage: number;
                demographic: string;
            }, {
                percentage: number;
                demographic: string;
            }>, "many">;
            peak_viewing_times: z.ZodArray<z.ZodString, "many">;
            device_breakdown: z.ZodObject<{
                desktop: z.ZodNumber;
                mobile: z.ZodNumber;
                tablet: z.ZodNumber;
            }, "strip", z.ZodTypeAny, {
                desktop: number;
                mobile: number;
                tablet: number;
            }, {
                desktop: number;
                mobile: number;
                tablet: number;
            }>;
        }, "strip", z.ZodTypeAny, {
            top_demographics: {
                percentage: number;
                demographic: string;
            }[];
            peak_viewing_times: string[];
            device_breakdown: {
                desktop: number;
                mobile: number;
                tablet: number;
            };
        }, {
            top_demographics: {
                percentage: number;
                demographic: string;
            }[];
            peak_viewing_times: string[];
            device_breakdown: {
                desktop: number;
                mobile: number;
                tablet: number;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        content_id: string;
        performance_score: number;
        engagement_score: number;
        reach_score: number;
        impact_score: number;
        trends: {
            views_trend: "increasing" | "decreasing" | "stable";
            engagement_trend: "increasing" | "decreasing" | "stable";
            sharing_trend: "increasing" | "decreasing" | "stable";
        };
        comparisons?: {
            category_average: number;
            author_average: number;
            platform_average: number;
        } | undefined;
        audience_insights?: {
            top_demographics: {
                percentage: number;
                demographic: string;
            }[];
            peak_viewing_times: string[];
            device_breakdown: {
                desktop: number;
                mobile: number;
                tablet: number;
            };
        } | undefined;
    }, {
        content_id: string;
        performance_score: number;
        engagement_score: number;
        reach_score: number;
        impact_score: number;
        trends: {
            views_trend: "increasing" | "decreasing" | "stable";
            engagement_trend: "increasing" | "decreasing" | "stable";
            sharing_trend: "increasing" | "decreasing" | "stable";
        };
        comparisons?: {
            category_average: number;
            author_average: number;
            platform_average: number;
        } | undefined;
        audience_insights?: {
            top_demographics: {
                percentage: number;
                demographic: string;
            }[];
            peak_viewing_times: string[];
            device_breakdown: {
                desktop: number;
                mobile: number;
                tablet: number;
            };
        } | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        content_id: string;
        performance_score: number;
        engagement_score: number;
        reach_score: number;
        impact_score: number;
        trends: {
            views_trend: "increasing" | "decreasing" | "stable";
            engagement_trend: "increasing" | "decreasing" | "stable";
            sharing_trend: "increasing" | "decreasing" | "stable";
        };
        comparisons?: {
            category_average: number;
            author_average: number;
            platform_average: number;
        } | undefined;
        audience_insights?: {
            top_demographics: {
                percentage: number;
                demographic: string;
            }[];
            peak_viewing_times: string[];
            device_breakdown: {
                desktop: number;
                mobile: number;
                tablet: number;
            };
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        content_id: string;
        performance_score: number;
        engagement_score: number;
        reach_score: number;
        impact_score: number;
        trends: {
            views_trend: "increasing" | "decreasing" | "stable";
            engagement_trend: "increasing" | "decreasing" | "stable";
            sharing_trend: "increasing" | "decreasing" | "stable";
        };
        comparisons?: {
            category_average: number;
            author_average: number;
            platform_average: number;
        } | undefined;
        audience_insights?: {
            top_demographics: {
                percentage: number;
                demographic: string;
            }[];
            peak_viewing_times: string[];
            device_breakdown: {
                desktop: number;
                mobile: number;
                tablet: number;
            };
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Get Content Item API Query Contract
 * Derived from GetContentItemOperationSchema
 */
export declare const GetContentItemApiQuerySchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    include_author: z.ZodDefault<z.ZodBoolean>;
    include_category: z.ZodDefault<z.ZodBoolean>;
    include_series: z.ZodDefault<z.ZodBoolean>;
    include_cross_references: z.ZodDefault<z.ZodBoolean>;
    include_analytics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    include_author: boolean;
    include_category: boolean;
    include_series: boolean;
    include_cross_references: boolean;
    include_analytics: boolean;
    id?: string | undefined;
    slug?: string | undefined;
}, {
    id?: string | undefined;
    slug?: string | undefined;
    include_author?: boolean | undefined;
    include_category?: boolean | undefined;
    include_series?: boolean | undefined;
    include_cross_references?: boolean | undefined;
    include_analytics?: boolean | undefined;
}>, {
    include_author: boolean;
    include_category: boolean;
    include_series: boolean;
    include_cross_references: boolean;
    include_analytics: boolean;
    id?: string | undefined;
    slug?: string | undefined;
}, {
    id?: string | undefined;
    slug?: string | undefined;
    include_author?: boolean | undefined;
    include_category?: boolean | undefined;
    include_series?: boolean | undefined;
    include_cross_references?: boolean | undefined;
    include_analytics?: boolean | undefined;
}>;
/**
 * List Content Items API Query Contract
 * Derived from ListContentItemsOperationSchema
 */
export declare const ListContentItemsApiQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    authorId: z.ZodOptional<z.ZodString>;
    contentType: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    seriesId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodString>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    theologicalThemes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    aiEnhanced: z.ZodOptional<z.ZodBoolean>;
    publishedAfter: z.ZodOptional<z.ZodString>;
    publishedBefore: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "publishedAt", "title", "viewCount", "likeCount", "wordCount"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeAuthor: z.ZodDefault<z.ZodBoolean>;
    includeCategory: z.ZodDefault<z.ZodBoolean>;
    includeSeries: z.ZodDefault<z.ZodBoolean>;
    includeCoAuthors: z.ZodDefault<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "published_at", "title", "view_count", "like_count"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_author: z.ZodDefault<z.ZodBoolean>;
    include_category: z.ZodDefault<z.ZodBoolean>;
    include_series: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "title" | "wordCount" | "viewCount" | "likeCount" | "publishedAt";
    sortOrder: "asc" | "desc";
    includeAuthor: boolean;
    includeCategory: boolean;
    includeSeries: boolean;
    includeCoAuthors: boolean;
    sort_by: "title" | "published_at" | "created_at" | "view_count" | "like_count" | "updated_at";
    sort_order: "asc" | "desc";
    include_author: boolean;
    include_category: boolean;
    include_series: boolean;
    offset: number;
    status?: string | undefined;
    authorId?: string | undefined;
    contentType?: string | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    visibility?: string | undefined;
    aiEnhanced?: boolean | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
    publishedAfter?: string | undefined;
    publishedBefore?: string | undefined;
}, {
    status?: string | undefined;
    authorId?: string | undefined;
    contentType?: string | undefined;
    tags?: string[] | undefined;
    theologicalThemes?: string[] | undefined;
    seriesId?: string | undefined;
    visibility?: string | undefined;
    aiEnhanced?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "createdAt" | "updatedAt" | "title" | "wordCount" | "viewCount" | "likeCount" | "publishedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    categoryId?: string | undefined;
    publishedAfter?: string | undefined;
    publishedBefore?: string | undefined;
    includeAuthor?: boolean | undefined;
    includeCategory?: boolean | undefined;
    includeSeries?: boolean | undefined;
    includeCoAuthors?: boolean | undefined;
    sort_by?: "title" | "published_at" | "created_at" | "view_count" | "like_count" | "updated_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_author?: boolean | undefined;
    include_category?: boolean | undefined;
    include_series?: boolean | undefined;
    offset?: number | undefined;
}>;
/**
 * Get Content Category API Query Contract
 * Derived from GetContentCategoryOperationSchema
 */
export declare const GetContentCategoryApiQuerySchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    include_parent: z.ZodDefault<z.ZodBoolean>;
    include_children: z.ZodDefault<z.ZodBoolean>;
    include_content_count: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    include_parent: boolean;
    include_children: boolean;
    include_content_count: boolean;
    id?: string | undefined;
    slug?: string | undefined;
}, {
    id?: string | undefined;
    slug?: string | undefined;
    include_parent?: boolean | undefined;
    include_children?: boolean | undefined;
    include_content_count?: boolean | undefined;
}>, {
    include_parent: boolean;
    include_children: boolean;
    include_content_count: boolean;
    id?: string | undefined;
    slug?: string | undefined;
}, {
    id?: string | undefined;
    slug?: string | undefined;
    include_parent?: boolean | undefined;
    include_children?: boolean | undefined;
    include_content_count?: boolean | undefined;
}>;
/**
 * List Content Categories API Query Contract
 * Derived from ListContentCategoriesOperationSchema
 */
export declare const ListContentCategoriesApiQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    parentId: z.ZodOptional<z.ZodString>;
    theologicalDiscipline: z.ZodOptional<z.ZodString>;
    isActive: z.ZodOptional<z.ZodBoolean>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "name", "orderIndex", "contentCount"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeParent: z.ZodDefault<z.ZodBoolean>;
    includeChildren: z.ZodDefault<z.ZodBoolean>;
    includeContentCount: z.ZodDefault<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "name", "order_index"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_parent: z.ZodDefault<z.ZodBoolean>;
    include_children: z.ZodDefault<z.ZodBoolean>;
    include_content_count: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "name" | "orderIndex" | "createdAt" | "updatedAt" | "contentCount";
    sortOrder: "asc" | "desc";
    includeParent: boolean;
    includeChildren: boolean;
    includeContentCount: boolean;
    sort_by: "name" | "created_at" | "order_index" | "updated_at";
    sort_order: "asc" | "desc";
    offset: number;
    include_parent: boolean;
    include_children: boolean;
    include_content_count: boolean;
    parentId?: string | undefined;
    theologicalDiscipline?: string | undefined;
    isActive?: boolean | undefined;
    search?: string | undefined;
}, {
    parentId?: string | undefined;
    theologicalDiscipline?: string | undefined;
    isActive?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "name" | "orderIndex" | "createdAt" | "updatedAt" | "contentCount" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    includeParent?: boolean | undefined;
    includeChildren?: boolean | undefined;
    includeContentCount?: boolean | undefined;
    sort_by?: "name" | "created_at" | "order_index" | "updated_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    offset?: number | undefined;
    include_parent?: boolean | undefined;
    include_children?: boolean | undefined;
    include_content_count?: boolean | undefined;
}>;
/**
 * Get Content Series API Query Contract
 * Derived from GetContentSeriesOperationSchema
 */
export declare const GetContentSeriesApiQuerySchema: z.ZodEffects<z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    include_content: z.ZodDefault<z.ZodBoolean>;
    include_category: z.ZodDefault<z.ZodBoolean>;
    include_analytics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    include_category: boolean;
    include_analytics: boolean;
    include_content: boolean;
    id?: string | undefined;
    slug?: string | undefined;
}, {
    id?: string | undefined;
    slug?: string | undefined;
    include_category?: boolean | undefined;
    include_analytics?: boolean | undefined;
    include_content?: boolean | undefined;
}>, {
    include_category: boolean;
    include_analytics: boolean;
    include_content: boolean;
    id?: string | undefined;
    slug?: string | undefined;
}, {
    id?: string | undefined;
    slug?: string | undefined;
    include_category?: boolean | undefined;
    include_analytics?: boolean | undefined;
    include_content?: boolean | undefined;
}>;
/**
 * List Content Series API Query Contract
 * Derived from ListContentSeriesOperationSchema
 */
export declare const ListContentSeriesApiQuerySchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    authorId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    visibility: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "publishedAt", "title", "totalEpisodes"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeAuthor: z.ZodDefault<z.ZodBoolean>;
    includeCategory: z.ZodDefault<z.ZodBoolean>;
    includeEpisodes: z.ZodDefault<z.ZodBoolean>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "published_at", "title", "total_items"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_content: z.ZodDefault<z.ZodBoolean>;
    include_category: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "title" | "publishedAt" | "totalEpisodes";
    sortOrder: "asc" | "desc";
    includeAuthor: boolean;
    includeCategory: boolean;
    includeEpisodes: boolean;
    sort_by: "title" | "published_at" | "created_at" | "updated_at" | "total_items";
    sort_order: "asc" | "desc";
    include_category: boolean;
    offset: number;
    include_content: boolean;
    status?: string | undefined;
    authorId?: string | undefined;
    visibility?: string | undefined;
    search?: string | undefined;
    categoryId?: string | undefined;
}, {
    status?: string | undefined;
    authorId?: string | undefined;
    visibility?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "createdAt" | "updatedAt" | "title" | "publishedAt" | "totalEpisodes" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    categoryId?: string | undefined;
    includeAuthor?: boolean | undefined;
    includeCategory?: boolean | undefined;
    includeEpisodes?: boolean | undefined;
    sort_by?: "title" | "published_at" | "created_at" | "updated_at" | "total_items" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_category?: boolean | undefined;
    offset?: number | undefined;
    include_content?: boolean | undefined;
}>;
/**
 * Get Content Cross References API Query Contract
 * Derived from GetContentCrossReferencesOperationSchema
 */
export declare const GetContentCrossReferencesApiQuerySchema: z.ZodObject<{
    content_id: z.ZodString;
    reference_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>, "many">>;
    include_target_content: z.ZodDefault<z.ZodBoolean>;
    include_source_content: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    include_target_content: boolean;
    include_source_content: boolean;
    reference_type?: ("citation" | "quotation" | "expansion" | "contradiction" | "support")[] | undefined;
}, {
    content_id: string;
    reference_type?: ("citation" | "quotation" | "expansion" | "contradiction" | "support")[] | undefined;
    include_target_content?: boolean | undefined;
    include_source_content?: boolean | undefined;
}>;
/**
 * List Content Cross References API Query Contract
 * Derived from ListContentCrossReferencesOperationSchema
 */
export declare const ListContentCrossReferencesApiQuerySchema: z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    referenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    relevanceScore: z.ZodDefault<z.ZodNumber>;
    qualityScore: z.ZodDefault<z.ZodNumber>;
    contextDescription: z.ZodOptional<z.ZodString>;
    isAuthorApproved: z.ZodDefault<z.ZodBoolean>;
    isAiGenerated: z.ZodDefault<z.ZodBoolean>;
    clickCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "relevance_score", "reference_type"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_target_content: z.ZodDefault<z.ZodBoolean>;
    include_source_content: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore: number;
    qualityScore: number;
    isAuthorApproved: boolean;
    isAiGenerated: boolean;
    clickCount: number;
    page: number;
    limit: number;
    sort_by: "created_at" | "reference_type" | "relevance_score";
    sort_order: "asc" | "desc";
    offset: number;
    include_target_content: boolean;
    include_source_content: boolean;
    contextDescription?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    sourceContentId: string;
    targetContentId: string;
    referenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    relevanceScore?: number | undefined;
    qualityScore?: number | undefined;
    contextDescription?: string | undefined;
    isAuthorApproved?: boolean | undefined;
    isAiGenerated?: boolean | undefined;
    clickCount?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort_by?: "created_at" | "reference_type" | "relevance_score" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    offset?: number | undefined;
    include_target_content?: boolean | undefined;
    include_source_content?: boolean | undefined;
}>;
/**
 * Get Content Analytics API Query Contract
 * Derived from GetContentAnalyticsOperationSchema
 */
export declare const GetContentAnalyticsApiQuerySchema: z.ZodObject<{
    content_id: z.ZodString;
    date_range: z.ZodOptional<z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start_date: string;
        end_date: string;
    }, {
        start_date: string;
        end_date: string;
    }>>;
    include_engagement: z.ZodDefault<z.ZodBoolean>;
    include_traffic: z.ZodDefault<z.ZodBoolean>;
    include_sharing: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    include_engagement: boolean;
    include_traffic: boolean;
    include_sharing: boolean;
    date_range?: {
        start_date: string;
        end_date: string;
    } | undefined;
}, {
    content_id: string;
    date_range?: {
        start_date: string;
        end_date: string;
    } | undefined;
    include_engagement?: boolean | undefined;
    include_traffic?: boolean | undefined;
    include_sharing?: boolean | undefined;
}>;
/**
 * Get Content Performance API Query Contract
 * Derived from GetContentPerformanceOperationSchema
 */
export declare const GetContentPerformanceApiQuerySchema: z.ZodObject<{
    content_id: z.ZodString;
    include_comparisons: z.ZodDefault<z.ZodBoolean>;
    include_trends: z.ZodDefault<z.ZodBoolean>;
    include_audience: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    content_id: string;
    include_comparisons: boolean;
    include_trends: boolean;
    include_audience: boolean;
}, {
    content_id: string;
    include_comparisons?: boolean | undefined;
    include_trends?: boolean | undefined;
    include_audience?: boolean | undefined;
}>;
export type CreateContentItemApiRequest = z.infer<typeof CreateContentItemApiRequestSchema>;
export type UpdateContentItemApiRequest = z.infer<typeof UpdateContentItemApiRequestSchema>;
export type PublishContentItemApiRequest = z.infer<typeof PublishContentItemApiRequestSchema>;
export type ScheduleContentItemApiRequest = z.infer<typeof ScheduleContentItemApiRequestSchema>;
export type SearchContentItemsApiRequest = z.infer<typeof SearchContentItemsApiRequestSchema>;
export type CreateContentCategoryApiRequest = z.infer<typeof CreateContentCategoryApiRequestSchema>;
export type UpdateContentCategoryApiRequest = z.infer<typeof UpdateContentCategoryApiRequestSchema>;
export type ReorderContentCategoriesApiRequest = z.infer<typeof ReorderContentCategoriesApiRequestSchema>;
export type CreateContentSeriesApiRequest = z.infer<typeof CreateContentSeriesApiRequestSchema>;
export type UpdateContentSeriesApiRequest = z.infer<typeof UpdateContentSeriesApiRequestSchema>;
export type AddContentToSeriesApiRequest = z.infer<typeof AddContentToSeriesApiRequestSchema>;
export type RemoveContentFromSeriesApiRequest = z.infer<typeof RemoveContentFromSeriesApiRequestSchema>;
export type ReorderSeriesContentApiRequest = z.infer<typeof ReorderSeriesContentApiRequestSchema>;
export type CreateContentCrossReferenceApiRequest = z.infer<typeof CreateContentCrossReferenceApiRequestSchema>;
export type UpdateContentCrossReferenceApiRequest = z.infer<typeof UpdateContentCrossReferenceApiRequestSchema>;
export type ContentItemApiResponse = z.infer<typeof ContentItemApiResponseSchema>;
export type ContentItemWithAuthorApiResponse = z.infer<typeof ContentItemWithAuthorApiResponseSchema>;
export type ContentItemWithCategoryApiResponse = z.infer<typeof ContentItemWithCategoryApiResponseSchema>;
export type ContentItemWithSeriesApiResponse = z.infer<typeof ContentItemWithSeriesApiResponseSchema>;
export type ContentItemWithFullDetailsApiResponse = z.infer<typeof ContentItemWithFullDetailsApiResponseSchema>;
export type ContentItemListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof ContentItemWithAuthorApiResponseSchema>>>;
export type ContentItemSearchApiResponse = z.infer<typeof ContentItemSearchApiResponseSchema>;
export type ContentCategoryApiResponse = z.infer<typeof ContentCategoryApiResponseSchema>;
export type ContentCategoryWithParentApiResponse = z.infer<typeof ContentCategoryWithParentApiResponseSchema>;
export type ContentCategoryWithChildrenApiResponse = z.infer<typeof ContentCategoryWithChildrenApiResponseSchema>;
export type ContentCategoryListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof ContentCategoryWithParentApiResponseSchema>>>;
export type ContentSeriesApiResponse = z.infer<typeof ContentSeriesApiResponseSchema>;
export type ContentSeriesWithContentApiResponse = z.infer<typeof ContentSeriesWithContentApiResponseSchema>;
export type ContentSeriesListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof ContentSeriesApiResponseSchema>>>;
export type ContentCrossReferenceApiResponse = z.infer<typeof ContentCrossReferenceApiResponseSchema>;
export type ContentCrossReferenceWithDetailsApiResponse = z.infer<typeof ContentCrossReferenceWithDetailsApiResponseSchema>;
export type ContentCrossReferenceListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof ContentCrossReferenceWithDetailsApiResponseSchema>>>;
export type ContentAnalyticsApiResponse = z.infer<typeof ContentAnalyticsApiResponseSchema>;
export type ContentPerformanceApiResponse = z.infer<typeof ContentPerformanceApiResponseSchema>;
export type GetContentItemApiQuery = z.infer<typeof GetContentItemApiQuerySchema>;
export type ListContentItemsApiQuery = z.infer<typeof ListContentItemsApiQuerySchema>;
export type GetContentCategoryApiQuery = z.infer<typeof GetContentCategoryApiQuerySchema>;
export type ListContentCategoriesApiQuery = z.infer<typeof ListContentCategoriesApiQuerySchema>;
export type GetContentSeriesApiQuery = z.infer<typeof GetContentSeriesApiQuerySchema>;
export type ListContentSeriesApiQuery = z.infer<typeof ListContentSeriesApiQuerySchema>;
export type GetContentCrossReferencesApiQuery = z.infer<typeof GetContentCrossReferencesApiQuerySchema>;
export type ListContentCrossReferencesApiQuery = z.infer<typeof ListContentCrossReferencesApiQuerySchema>;
export type GetContentAnalyticsApiQuery = z.infer<typeof GetContentAnalyticsApiQuerySchema>;
export type GetContentPerformanceApiQuery = z.infer<typeof GetContentPerformanceApiQuerySchema>;
//# sourceMappingURL=content.contracts.d.ts.map