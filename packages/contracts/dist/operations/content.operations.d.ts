import { z } from 'zod';
/**
 * Create Content Item Operation Schema
 * Derived from CreateContentItemSchema with operation-specific validation
 */
export declare const CreateContentItemOperationSchema: z.ZodObject<{
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
 * Update Content Item Operation Schema
 * Derived from UpdateContentItemSchema with operation-specific validation
 */
export declare const UpdateContentItemOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
 * Publish Content Item Operation Schema
 * Publish content with validation
 */
export declare const PublishContentItemOperationSchema: z.ZodObject<{
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
 * Schedule Content Item Operation Schema
 * Schedule content for future publication
 */
export declare const ScheduleContentItemOperationSchema: z.ZodObject<{
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
 * Get Content Item Operation Schema
 * Content item retrieval with options
 */
export declare const GetContentItemOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * List Content Items Operation Schema
 * Paginated content item listing with filters
 */
export declare const ListContentItemsOperationSchema: z.ZodObject<{
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
 * Search Content Items Operation Schema
 * Full-text search for content items
 */
export declare const SearchContentItemsOperationSchema: z.ZodObject<{
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
 * Create Content Category Operation Schema
 * Derived from CreateContentCategorySchema with operation-specific validation
 */
export declare const CreateContentCategoryOperationSchema: z.ZodObject<{
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
 * Update Content Category Operation Schema
 * Derived from UpdateContentCategorySchema with operation-specific validation
 */
export declare const UpdateContentCategoryOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
 * Reorder Content Categories Operation Schema
 * Bulk reordering of categories
 */
export declare const ReorderContentCategoriesOperationSchema: z.ZodObject<{
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
 * Get Content Category Operation Schema
 * Category retrieval with options
 */
export declare const GetContentCategoryOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * List Content Categories Operation Schema
 * Paginated category listing with filters
 */
export declare const ListContentCategoriesOperationSchema: z.ZodObject<{
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
 * Create Content Series Operation Schema
 * Derived from CreateContentSeriesSchema with operation-specific validation
 */
export declare const CreateContentSeriesOperationSchema: z.ZodObject<{
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
 * Update Content Series Operation Schema
 * Derived from UpdateContentSeriesSchema with operation-specific validation
 */
export declare const UpdateContentSeriesOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
 * Add Content to Series Operation Schema
 * Add content item to series
 */
export declare const AddContentToSeriesOperationSchema: z.ZodObject<{
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
 * Remove Content from Series Operation Schema
 * Remove content item from series
 */
export declare const RemoveContentFromSeriesOperationSchema: z.ZodObject<{
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
 * Reorder Series Content Operation Schema
 * Reorder content items within series
 */
export declare const ReorderSeriesContentOperationSchema: z.ZodObject<{
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
 * Get Content Series Operation Schema
 * Series retrieval with options
 */
export declare const GetContentSeriesOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * List Content Series Operation Schema
 * Paginated series listing with filters
 */
export declare const ListContentSeriesOperationSchema: z.ZodObject<{
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
 * Create Content Cross Reference Operation Schema
 * Derived from CreateContentCrossReferenceSchema with operation-specific validation
 */
export declare const CreateContentCrossReferenceOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Update Content Cross Reference Operation Schema
 * Derived from UpdateContentCrossReferenceSchema with operation-specific validation
 */
export declare const UpdateContentCrossReferenceOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Get Content Cross References Operation Schema
 * Retrieve cross references for content
 */
export declare const GetContentCrossReferencesOperationSchema: z.ZodObject<{
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
 * List Content Cross References Operation Schema
 * Paginated cross reference listing
 */
export declare const ListContentCrossReferencesOperationSchema: z.ZodObject<{
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
 * Get Content Analytics Operation Schema
 * Retrieve content performance metrics
 */
export declare const GetContentAnalyticsOperationSchema: z.ZodObject<{
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
 * Get Content Performance Operation Schema
 * Retrieve content performance summary
 */
export declare const GetContentPerformanceOperationSchema: z.ZodObject<{
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
export type CreateContentItemOperation = z.infer<typeof CreateContentItemOperationSchema>;
export type UpdateContentItemOperation = z.infer<typeof UpdateContentItemOperationSchema>;
export type PublishContentItemOperation = z.infer<typeof PublishContentItemOperationSchema>;
export type ScheduleContentItemOperation = z.infer<typeof ScheduleContentItemOperationSchema>;
export type GetContentItemOperation = z.infer<typeof GetContentItemOperationSchema>;
export type ListContentItemsOperation = z.infer<typeof ListContentItemsOperationSchema>;
export type SearchContentItemsOperation = z.infer<typeof SearchContentItemsOperationSchema>;
export type CreateContentCategoryOperation = z.infer<typeof CreateContentCategoryOperationSchema>;
export type UpdateContentCategoryOperation = z.infer<typeof UpdateContentCategoryOperationSchema>;
export type ReorderContentCategoriesOperation = z.infer<typeof ReorderContentCategoriesOperationSchema>;
export type GetContentCategoryOperation = z.infer<typeof GetContentCategoryOperationSchema>;
export type ListContentCategoriesOperation = z.infer<typeof ListContentCategoriesOperationSchema>;
export type CreateContentSeriesOperation = z.infer<typeof CreateContentSeriesOperationSchema>;
export type UpdateContentSeriesOperation = z.infer<typeof UpdateContentSeriesOperationSchema>;
export type AddContentToSeriesOperation = z.infer<typeof AddContentToSeriesOperationSchema>;
export type RemoveContentFromSeriesOperation = z.infer<typeof RemoveContentFromSeriesOperationSchema>;
export type ReorderSeriesContentOperation = z.infer<typeof ReorderSeriesContentOperationSchema>;
export type GetContentSeriesOperation = z.infer<typeof GetContentSeriesOperationSchema>;
export type ListContentSeriesOperation = z.infer<typeof ListContentSeriesOperationSchema>;
export type CreateContentCrossReferenceOperation = z.infer<typeof CreateContentCrossReferenceOperationSchema>;
export type UpdateContentCrossReferenceOperation = z.infer<typeof UpdateContentCrossReferenceOperationSchema>;
export type GetContentCrossReferencesOperation = z.infer<typeof GetContentCrossReferencesOperationSchema>;
export type ListContentCrossReferencesOperation = z.infer<typeof ListContentCrossReferencesOperationSchema>;
export type GetContentAnalyticsOperation = z.infer<typeof GetContentAnalyticsOperationSchema>;
export type GetContentPerformanceOperation = z.infer<typeof GetContentPerformanceOperationSchema>;
//# sourceMappingURL=content.operations.d.ts.map