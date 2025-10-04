import { z } from 'zod';
/**
 * Create Content Item Operation Schema
 * Derived from CreateContentItemSchema with operation-specific validation
 */
export declare const CreateContentItemOperationSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
    published_at: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    content_type: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
    format: z.ZodDefault<z.ZodEnum<["text", "html", "markdown"]>>;
    word_count: z.ZodOptional<z.ZodNumber>;
    estimated_reading_time: z.ZodOptional<z.ZodNumber>;
    view_count: z.ZodDefault<z.ZodNumber>;
    like_count: z.ZodDefault<z.ZodNumber>;
    share_count: z.ZodDefault<z.ZodNumber>;
    comment_count: z.ZodDefault<z.ZodNumber>;
    bookmark_count: z.ZodDefault<z.ZodNumber>;
    primary_category_id: z.ZodOptional<z.ZodString>;
    secondary_categories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theological_themes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    series_id: z.ZodOptional<z.ZodString>;
    series_order: z.ZodOptional<z.ZodNumber>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>;
    network_amplification_score: z.ZodDefault<z.ZodNumber>;
    cross_reference_count: z.ZodDefault<z.ZodNumber>;
    ai_enhanced: z.ZodDefault<z.ZodBoolean>;
    ai_summary: z.ZodOptional<z.ZodString>;
    ai_key_points: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    featured_image_url: z.ZodOptional<z.ZodString>;
    video_url: z.ZodOptional<z.ZodString>;
    audio_url: z.ZodOptional<z.ZodString>;
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
    meta_title: z.ZodOptional<z.ZodString>;
    meta_description: z.ZodOptional<z.ZodString>;
    canonical_url: z.ZodOptional<z.ZodString>;
    original_source: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
    attribution_required: z.ZodDefault<z.ZodBoolean>;
} & {
    title: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    content: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    format: "text" | "html" | "markdown";
    view_count: number;
    like_count: number;
    share_count: number;
    comment_count: number;
    bookmark_count: number;
    secondary_categories: string[];
    tags: string[];
    theological_themes: string[];
    visibility: "public" | "private" | "organization" | "invite_only";
    network_amplification_score: number;
    cross_reference_count: number;
    ai_enhanced: boolean;
    ai_key_points: string[];
    attachments: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[];
    license_type: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain";
    attribution_required: boolean;
    slug?: string | undefined;
    published_at?: string | undefined;
    excerpt?: string | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    primary_category_id?: string | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    ai_summary?: string | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
}, {
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    excerpt?: string | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
}>;
/**
 * Update Content Item Operation Schema
 * Derived from UpdateContentItemSchema with operation-specific validation
 */
export declare const UpdateContentItemOperationSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>>;
    slug: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    content_type: z.ZodOptional<z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>>;
    format: z.ZodOptional<z.ZodDefault<z.ZodEnum<["text", "html", "markdown"]>>>;
    word_count: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    estimated_reading_time: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    view_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    like_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    share_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    comment_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    bookmark_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    primary_category_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    secondary_categories: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    theological_themes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    series_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    series_order: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>>;
    network_amplification_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    cross_reference_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    ai_enhanced: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    ai_summary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    ai_key_points: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    featured_image_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    video_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    audio_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    attachments: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
    meta_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    meta_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    canonical_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    original_source: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scheduled_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    license_type: z.ZodOptional<z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>>;
    attribution_required: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    content_type?: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar" | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
}, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    content_type?: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar" | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
}>, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    content_type?: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar" | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
}, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    content_type?: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar" | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string | undefined;
    series_order?: number | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
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
    scheduled_at: string;
    content_id: string;
    published_at?: string | undefined;
}, {
    scheduled_at: string;
    content_id: string;
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
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    content: z.ZodOptional<z.ZodString>;
    format: z.ZodOptional<z.ZodDefault<z.ZodEnum<["text", "html", "markdown"]>>>;
    word_count: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    estimated_reading_time: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    view_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    like_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    share_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    comment_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    bookmark_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    secondary_categories: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    series_order: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    network_amplification_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    cross_reference_count: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    ai_summary: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    ai_key_points: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    featured_image_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    video_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    audio_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    attachments: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>>;
    meta_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    meta_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    canonical_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    original_source: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scheduled_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    license_type: z.ZodOptional<z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>>;
    attribution_required: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    search: z.ZodOptional<z.ZodString>;
    content_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>, "many">>;
    visibility: z.ZodOptional<z.ZodArray<z.ZodEnum<["public", "private", "organization", "invite_only"]>, "many">>;
    primary_category_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    theological_themes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    series_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ai_enhanced: z.ZodOptional<z.ZodBoolean>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    published_after: z.ZodOptional<z.ZodString>;
    published_before: z.ZodOptional<z.ZodString>;
    view_count_min: z.ZodOptional<z.ZodNumber>;
    view_count_max: z.ZodOptional<z.ZodNumber>;
    like_count_min: z.ZodOptional<z.ZodNumber>;
    like_count_max: z.ZodOptional<z.ZodNumber>;
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
    offset: number;
    sort_by: "created_at" | "updated_at" | "published_at" | "title" | "view_count" | "like_count";
    sort_order: "asc" | "desc";
    include_author: boolean;
    include_category: boolean;
    include_series: boolean;
    status?: ("draft" | "archived" | "under_review" | "published" | "scheduled")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    published_after?: string | undefined;
    published_before?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    content_type?: ("other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar")[] | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string[] | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string[] | undefined;
    series_order?: number | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
    view_count_min?: number | undefined;
    view_count_max?: number | undefined;
    like_count_min?: number | undefined;
    like_count_max?: number | undefined;
}, {
    status?: ("draft" | "archived" | "under_review" | "published" | "scheduled")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    slug?: string | undefined;
    published_at?: string | undefined;
    published_after?: string | undefined;
    published_before?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    content_type?: ("other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar")[] | undefined;
    format?: "text" | "html" | "markdown" | undefined;
    word_count?: number | undefined;
    estimated_reading_time?: number | undefined;
    view_count?: number | undefined;
    like_count?: number | undefined;
    share_count?: number | undefined;
    comment_count?: number | undefined;
    bookmark_count?: number | undefined;
    primary_category_id?: string[] | undefined;
    secondary_categories?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    series_id?: string[] | undefined;
    series_order?: number | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    network_amplification_score?: number | undefined;
    cross_reference_count?: number | undefined;
    ai_enhanced?: boolean | undefined;
    ai_summary?: string | undefined;
    ai_key_points?: string[] | undefined;
    featured_image_url?: string | undefined;
    video_url?: string | undefined;
    audio_url?: string | undefined;
    attachments?: {
        type: string;
        name: string;
        url: string;
        size: number;
    }[] | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    canonical_url?: string | undefined;
    original_source?: string | undefined;
    scheduled_at?: string | undefined;
    license_type?: "custom" | "all_rights_reserved" | "creative_commons" | "public_domain" | undefined;
    attribution_required?: boolean | undefined;
    view_count_min?: number | undefined;
    view_count_max?: number | undefined;
    like_count_min?: number | undefined;
    like_count_max?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "updated_at" | "published_at" | "title" | "view_count" | "like_count" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_author?: boolean | undefined;
    include_category?: boolean | undefined;
    include_series?: boolean | undefined;
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
    sort_by: "created_at" | "published_at" | "view_count" | "like_count" | "relevance";
    sort_order: "asc" | "desc";
    query: string;
    status?: ("draft" | "archived" | "under_review" | "published" | "scheduled")[] | undefined;
    content_type?: ("other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar")[] | undefined;
    primary_category_id?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
}, {
    query: string;
    status?: ("draft" | "archived" | "under_review" | "published" | "scheduled")[] | undefined;
    content_type?: ("other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar")[] | undefined;
    primary_category_id?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort_by?: "created_at" | "published_at" | "view_count" | "like_count" | "relevance" | undefined;
    sort_order?: "asc" | "desc" | undefined;
}>;
/**
 * Create Content Category Operation Schema
 * Derived from CreateContentCategorySchema with operation-specific validation
 */
export declare const CreateContentCategoryOperationSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    order_index: z.ZodDefault<z.ZodNumber>;
    meta_description: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    theological_discipline: z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>;
    movement_relevance_score: z.ZodDefault<z.ZodNumber>;
    apest_relevance: z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodNumber;
        prophetic: z.ZodNumber;
        evangelistic: z.ZodNumber;
        shepherding: z.ZodNumber;
        teaching: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }>>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    is_active: z.ZodDefault<z.ZodBoolean>;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    order_index: number;
    movement_relevance_score: number;
    apest_relevance: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    };
    keywords: string[];
    is_active: boolean;
    description?: string | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
}, {
    name: string;
    slug: string;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
}>;
/**
 * Update Content Category Operation Schema
 * Derived from UpdateContentCategorySchema with operation-specific validation
 */
export declare const UpdateContentCategoryOperationSchema: z.ZodEffects<z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    order_index: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    meta_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    parent_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    theological_discipline: z.ZodOptional<z.ZodOptional<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>>>;
    movement_relevance_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    apest_relevance: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodNumber;
        prophetic: z.ZodNumber;
        evangelistic: z.ZodNumber;
        shepherding: z.ZodNumber;
        teaching: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }>>>;
    keywords: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    is_active: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
}>, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
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
        order_index: number;
        category_id: string;
    }, {
        order_index: number;
        category_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    category_orders: {
        order_index: number;
        category_id: string;
    }[];
}, {
    category_orders: {
        order_index: number;
        category_id: string;
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
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    order_index: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    movement_relevance_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    apest_relevance: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodNumber;
        prophetic: z.ZodNumber;
        evangelistic: z.ZodNumber;
        shepherding: z.ZodNumber;
        teaching: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }>>>;
    meta_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    keywords: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    search: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    theological_discipline: z.ZodOptional<z.ZodArray<z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>, "many">>;
    is_active: z.ZodOptional<z.ZodBoolean>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
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
    offset: number;
    sort_by: "created_at" | "updated_at" | "name" | "order_index";
    sort_order: "asc" | "desc";
    include_parent: boolean;
    include_children: boolean;
    include_content_count: boolean;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string[] | undefined;
    theological_discipline?: ("systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral")[] | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
}, {
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    order_index?: number | undefined;
    meta_description?: string | undefined;
    parent_id?: string[] | undefined;
    theological_discipline?: ("systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral")[] | undefined;
    movement_relevance_score?: number | undefined;
    apest_relevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
    keywords?: string[] | undefined;
    is_active?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "updated_at" | "name" | "order_index" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_parent?: boolean | undefined;
    include_children?: boolean | undefined;
    include_content_count?: boolean | undefined;
}>;
/**
 * Create Content Series Operation Schema
 * Derived from CreateContentSeriesSchema with operation-specific validation
 */
export declare const CreateContentSeriesOperationSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
    description: z.ZodOptional<z.ZodString>;
    estimated_duration: z.ZodOptional<z.ZodNumber>;
    published_at: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    primary_category_id: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theological_themes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>;
    featured_image_url: z.ZodOptional<z.ZodString>;
    meta_title: z.ZodOptional<z.ZodString>;
    meta_description: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    series_type: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    total_items: z.ZodDefault<z.ZodNumber>;
    completion_rate: z.ZodDefault<z.ZodNumber>;
    thumbnail_url: z.ZodOptional<z.ZodString>;
} & {
    title: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    slug: string;
    title: string;
    tags: string[];
    theological_themes: string[];
    visibility: "public" | "private" | "organization" | "invite_only";
    series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
    total_items: number;
    completion_rate: number;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    thumbnail_url?: string | undefined;
}, {
    slug: string;
    title: string;
    series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
}>;
/**
 * Update Content Series Operation Schema
 * Derived from UpdateContentSeriesSchema with operation-specific validation
 */
export declare const UpdateContentSeriesOperationSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    estimated_duration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    title: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    primary_category_id: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    theological_themes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    visibility: z.ZodOptional<z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>>;
    featured_image_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    meta_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    meta_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scheduled_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    series_type: z.ZodOptional<z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>>;
    difficulty: z.ZodOptional<z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>>;
    total_items: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    completion_rate: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    thumbnail_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    series_type?: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
}, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    series_type?: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
}>, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    series_type?: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
}, {
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: "public" | "private" | "organization" | "invite_only" | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    series_type?: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework" | undefined;
    difficulty?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
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
    series_id: string;
    content_id: string;
    order_index?: number | undefined;
}, {
    series_id: string;
    content_id: string;
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
    series_id: string;
    content_id: string;
}, {
    series_id: string;
    content_id: string;
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
        order_index: number;
        content_id: string;
    }, {
        order_index: number;
        content_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    series_id: string;
    content_orders: {
        order_index: number;
        content_id: string;
    }[];
}, {
    series_id: string;
    content_orders: {
        order_index: number;
        content_id: string;
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
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    excerpt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    total_items: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    estimated_duration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    completion_rate: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    theological_themes: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    featured_image_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    thumbnail_url: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    meta_title: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    meta_description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scheduled_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    search: z.ZodOptional<z.ZodString>;
    series_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>, "many">>;
    difficulty: z.ZodOptional<z.ZodArray<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>, "many">>;
    visibility: z.ZodOptional<z.ZodArray<z.ZodEnum<["public", "private", "organization", "invite_only"]>, "many">>;
    primary_category_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    published_after: z.ZodOptional<z.ZodString>;
    published_before: z.ZodOptional<z.ZodString>;
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
    offset: number;
    sort_by: "created_at" | "updated_at" | "published_at" | "title" | "total_items";
    sort_order: "asc" | "desc";
    include_category: boolean;
    include_content: boolean;
    status?: ("draft" | "archived" | "under_review" | "published" | "scheduled")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    published_after?: string | undefined;
    published_before?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    series_type?: ("course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework")[] | undefined;
    difficulty?: ("beginner" | "intermediate" | "advanced" | "expert")[] | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
}, {
    status?: ("draft" | "archived" | "under_review" | "published" | "scheduled")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    published_at?: string | undefined;
    published_after?: string | undefined;
    published_before?: string | undefined;
    title?: string | undefined;
    excerpt?: string | undefined;
    primary_category_id?: string[] | undefined;
    tags?: string[] | undefined;
    theological_themes?: string[] | undefined;
    visibility?: ("public" | "private" | "organization" | "invite_only")[] | undefined;
    featured_image_url?: string | undefined;
    meta_title?: string | undefined;
    meta_description?: string | undefined;
    scheduled_at?: string | undefined;
    series_type?: ("course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework")[] | undefined;
    difficulty?: ("beginner" | "intermediate" | "advanced" | "expert")[] | undefined;
    total_items?: number | undefined;
    completion_rate?: number | undefined;
    thumbnail_url?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "updated_at" | "published_at" | "title" | "total_items" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_category?: boolean | undefined;
    include_content?: boolean | undefined;
}>;
/**
 * Create Content Cross Reference Operation Schema
 * Derived from CreateContentCrossReferenceSchema with operation-specific validation
 */
export declare const CreateContentCrossReferenceOperationSchema: z.ZodEffects<z.ZodObject<{
    relevance_score: z.ZodDefault<z.ZodNumber>;
    context: z.ZodOptional<z.ZodString>;
    ai_generated: z.ZodDefault<z.ZodBoolean>;
    confidence_score: z.ZodOptional<z.ZodNumber>;
} & {
    source_content_id: z.ZodString;
    target_content_id: z.ZodString;
    reference_type: z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>;
}, "strip", z.ZodTypeAny, {
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score: number;
    ai_generated: boolean;
    context?: string | undefined;
    confidence_score?: number | undefined;
}, {
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}>, {
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score: number;
    ai_generated: boolean;
    context?: string | undefined;
    confidence_score?: number | undefined;
}, {
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}>;
/**
 * Update Content Cross Reference Operation Schema
 * Derived from UpdateContentCrossReferenceSchema with operation-specific validation
 */
export declare const UpdateContentCrossReferenceOperationSchema: z.ZodEffects<z.ZodObject<{
    source_content_id: z.ZodOptional<z.ZodString>;
    target_content_id: z.ZodOptional<z.ZodString>;
    reference_type: z.ZodOptional<z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>>;
    relevance_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    context: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    ai_generated: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    confidence_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
}, "strip", z.ZodTypeAny, {
    source_content_id?: string | undefined;
    target_content_id?: string | undefined;
    reference_type?: "citation" | "quotation" | "expansion" | "contradiction" | "support" | undefined;
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}, {
    source_content_id?: string | undefined;
    target_content_id?: string | undefined;
    reference_type?: "citation" | "quotation" | "expansion" | "contradiction" | "support" | undefined;
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}>, {
    source_content_id?: string | undefined;
    target_content_id?: string | undefined;
    reference_type?: "citation" | "quotation" | "expansion" | "contradiction" | "support" | undefined;
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}, {
    source_content_id?: string | undefined;
    target_content_id?: string | undefined;
    reference_type?: "citation" | "quotation" | "expansion" | "contradiction" | "support" | undefined;
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
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
    id: z.ZodOptional<z.ZodString>;
    relevance_score: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    context: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    confidence_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    source_content_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    target_content_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    reference_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>, "many">>;
    ai_generated: z.ZodOptional<z.ZodBoolean>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "relevance_score", "reference_type"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_target_content: z.ZodDefault<z.ZodBoolean>;
    include_source_content: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    offset: number;
    sort_by: "created_at" | "reference_type" | "relevance_score";
    sort_order: "asc" | "desc";
    include_target_content: boolean;
    include_source_content: boolean;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    source_content_id?: string[] | undefined;
    target_content_id?: string[] | undefined;
    reference_type?: ("citation" | "quotation" | "expansion" | "contradiction" | "support")[] | undefined;
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}, {
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    source_content_id?: string[] | undefined;
    target_content_id?: string[] | undefined;
    reference_type?: ("citation" | "quotation" | "expansion" | "contradiction" | "support")[] | undefined;
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "reference_type" | "relevance_score" | undefined;
    sort_order?: "asc" | "desc" | undefined;
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
    include_comparisons: boolean;
    include_trends: boolean;
    content_id: string;
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