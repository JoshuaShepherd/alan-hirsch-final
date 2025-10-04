import { z } from 'zod';
import { PaginatedResponseSchema } from './user.contracts';
/**
 * Create Content Item API Request Contract
 * Derived from CreateContentItemOperationSchema
 */
export declare const CreateContentItemApiRequestSchema: z.ZodObject<{
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
 * Update Content Item API Request Contract
 * Derived from UpdateContentItemOperationSchema
 */
export declare const UpdateContentItemApiRequestSchema: z.ZodEffects<z.ZodObject<{
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
    scheduled_at: string;
    content_id: string;
    published_at?: string | undefined;
}, {
    scheduled_at: string;
    content_id: string;
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
 * Create Content Category API Request Contract
 * Derived from CreateContentCategoryOperationSchema
 */
export declare const CreateContentCategoryApiRequestSchema: z.ZodObject<{
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
 * Update Content Category API Request Contract
 * Derived from UpdateContentCategoryOperationSchema
 */
export declare const UpdateContentCategoryApiRequestSchema: z.ZodEffects<z.ZodObject<{
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
 * Reorder Content Categories API Request Contract
 * Derived from ReorderContentCategoriesOperationSchema
 */
export declare const ReorderContentCategoriesApiRequestSchema: z.ZodObject<{
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
 * Create Content Series API Request Contract
 * Derived from CreateContentSeriesOperationSchema
 */
export declare const CreateContentSeriesApiRequestSchema: z.ZodObject<{
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
 * Update Content Series API Request Contract
 * Derived from UpdateContentSeriesOperationSchema
 */
export declare const UpdateContentSeriesApiRequestSchema: z.ZodEffects<z.ZodObject<{
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
 * Add Content to Series API Request Contract
 * Derived from AddContentToSeriesOperationSchema
 */
export declare const AddContentToSeriesApiRequestSchema: z.ZodObject<{
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
 * Remove Content from Series API Request Contract
 * Derived from RemoveContentFromSeriesOperationSchema
 */
export declare const RemoveContentFromSeriesApiRequestSchema: z.ZodObject<{
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
 * Reorder Series Content API Request Contract
 * Derived from ReorderSeriesContentOperationSchema
 */
export declare const ReorderSeriesContentApiRequestSchema: z.ZodObject<{
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
 * Create Content Cross Reference API Request Contract
 * Derived from CreateContentCrossReferenceOperationSchema
 */
export declare const CreateContentCrossReferenceApiRequestSchema: z.ZodEffects<z.ZodObject<{
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
 * Update Content Cross Reference API Request Contract
 * Derived from UpdateContentCrossReferenceOperationSchema
 */
export declare const UpdateContentCrossReferenceApiRequestSchema: z.ZodEffects<z.ZodObject<{
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
 * Content Item API Response Contract
 * Derived from ContentItemEntitySchema
 */
export declare const ContentItemApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
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
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
    attribution_required: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
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
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
 * Content Item with Author API Response Contract
 * Extends content item with author information
 */
export declare const ContentItemWithAuthorApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
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
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
    attribution_required: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
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
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
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
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
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
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
 * Content Item with Category API Response Contract
 * Extends content item with category information
 */
export declare const ContentItemWithCategoryApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
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
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
    attribution_required: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
} & {
    category: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    }, {
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
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
    published_at?: string | undefined;
    category?: {
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
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
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    published_at?: string | undefined;
    category?: {
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
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
 * Content Item with Series API Response Contract
 * Extends content item with series information
 */
export declare const ContentItemWithSeriesApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodString;
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
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
    attribution_required: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
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
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
        description?: string | undefined;
    }, {
        id: string;
        slug: string;
        title: string;
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
        description?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
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
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
        description?: string | undefined;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
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
    content: z.ZodString;
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
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
    attribution_required: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
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
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    }, {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
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
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    }, {
        id: string;
        name: string;
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
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
        description?: string | undefined;
    }, {
        id: string;
        slug: string;
        title: string;
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
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
        relevance_score: number;
        target_content_title: string;
    }, {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        relevance_score: number;
        target_content_title: string;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
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
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    cross_references: {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        relevance_score: number;
        target_content_title: string;
    }[];
    published_at?: string | undefined;
    category?: {
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
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
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
        description?: string | undefined;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
    title: string;
    content: string;
    content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    author: {
        id: string;
        first_name: string;
        last_name: string;
        ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        display_name?: string | undefined;
        avatar_url?: string | undefined;
        organization_name?: string | undefined;
    };
    status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
    published_at?: string | undefined;
    category?: {
        id: string;
        name: string;
        slug: string;
        description?: string | undefined;
    } | undefined;
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
    series?: {
        id: string;
        slug: string;
        title: string;
        series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
        description?: string | undefined;
    } | undefined;
    cross_references?: {
        id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        relevance_score: number;
        target_content_title: string;
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
        content: z.ZodString;
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
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
        published_at: z.ZodOptional<z.ZodString>;
        scheduled_at: z.ZodOptional<z.ZodString>;
        license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
        attribution_required: z.ZodDefault<z.ZodBoolean>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
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
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        }, {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        created_at: string;
        updated_at: string;
        slug: string;
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
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
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
        id: string;
        created_at: string;
        updated_at: string;
        slug: string;
        title: string;
        content: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
        status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        created_at: string;
        updated_at: string;
        slug: string;
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
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
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
        created_at: string;
        updated_at: string;
        slug: string;
        title: string;
        content: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        author: {
            id: string;
            first_name: string;
            last_name: string;
            ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
            display_name?: string | undefined;
            avatar_url?: string | undefined;
            organization_name?: string | undefined;
        };
        status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
            content: z.ZodString;
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
            status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
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
            published_at: z.ZodOptional<z.ZodString>;
            scheduled_at: z.ZodOptional<z.ZodString>;
            license_type: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>>;
            attribution_required: z.ZodDefault<z.ZodBoolean>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
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
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            }, {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            status: "draft" | "archived" | "under_review" | "published" | "scheduled";
            id: string;
            created_at: string;
            updated_at: string;
            slug: string;
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
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
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
            id: string;
            created_at: string;
            updated_at: string;
            slug: string;
            title: string;
            content: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        query: string;
        total: number;
        took: number;
        content_items: {
            status: "draft" | "archived" | "under_review" | "published" | "scheduled";
            id: string;
            created_at: string;
            updated_at: string;
            slug: string;
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
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
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
        }[];
    }, {
        query: string;
        total: number;
        took: number;
        content_items: {
            id: string;
            created_at: string;
            updated_at: string;
            slug: string;
            title: string;
            content: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
        }[];
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
        took: number;
        content_items: {
            status: "draft" | "archived" | "under_review" | "published" | "scheduled";
            id: string;
            created_at: string;
            updated_at: string;
            slug: string;
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
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
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
        }[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        query: string;
        total: number;
        took: number;
        content_items: {
            id: string;
            created_at: string;
            updated_at: string;
            slug: string;
            title: string;
            content: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
            author: {
                id: string;
                first_name: string;
                last_name: string;
                ministry_role: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
                display_name?: string | undefined;
                avatar_url?: string | undefined;
                organization_name?: string | undefined;
            };
            status?: "draft" | "archived" | "under_review" | "published" | "scheduled" | undefined;
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
        }[];
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
    parent_id: z.ZodOptional<z.ZodString>;
    order_index: z.ZodDefault<z.ZodNumber>;
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
    meta_description: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
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
    id: string;
    created_at: string;
    updated_at: string;
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
 * Content Category with Parent API Response Contract
 * Extends category with parent information
 */
export declare const ContentCategoryWithParentApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    parent_id: z.ZodOptional<z.ZodString>;
    order_index: z.ZodDefault<z.ZodNumber>;
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
    meta_description: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
} & {
    parent: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
    }, {
        id: string;
        name: string;
        slug: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
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
    parent?: {
        id: string;
        name: string;
        slug: string;
    } | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
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
    parent?: {
        id: string;
        name: string;
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
    parent_id: z.ZodOptional<z.ZodString>;
    order_index: z.ZodDefault<z.ZodNumber>;
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
    meta_description: z.ZodOptional<z.ZodString>;
    keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    is_active: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
} & {
    children: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        order_index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }, {
        id: string;
        name: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
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
    children: {
        id: string;
        name: string;
        slug: string;
        order_index: number;
        description?: string | undefined;
    }[];
    description?: string | undefined;
    meta_description?: string | undefined;
    parent_id?: string | undefined;
    theological_discipline?: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral" | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
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
    children?: {
        id: string;
        name: string;
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
        parent_id: z.ZodOptional<z.ZodString>;
        order_index: z.ZodDefault<z.ZodNumber>;
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
        meta_description: z.ZodOptional<z.ZodString>;
        keywords: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        is_active: z.ZodDefault<z.ZodBoolean>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    } & {
        parent: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
        }, {
            id: string;
            name: string;
            slug: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        created_at: string;
        updated_at: string;
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
        parent?: {
            id: string;
            name: string;
            slug: string;
        } | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
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
        parent?: {
            id: string;
            name: string;
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
        id: string;
        created_at: string;
        updated_at: string;
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
        parent?: {
            id: string;
            name: string;
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
        id: string;
        created_at: string;
        updated_at: string;
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
        parent?: {
            id: string;
            name: string;
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
    excerpt: z.ZodOptional<z.ZodString>;
    series_type: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    total_items: z.ZodDefault<z.ZodNumber>;
    estimated_duration: z.ZodOptional<z.ZodNumber>;
    completion_rate: z.ZodDefault<z.ZodNumber>;
    primary_category_id: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theological_themes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
    featured_image_url: z.ZodOptional<z.ZodString>;
    thumbnail_url: z.ZodOptional<z.ZodString>;
    meta_title: z.ZodOptional<z.ZodString>;
    meta_description: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
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
    id: string;
    created_at: string;
    updated_at: string;
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
 * Content Series with Content API Response Contract
 * Extends series with content items
 */
export declare const ContentSeriesWithContentApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    series_type: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
    difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    total_items: z.ZodDefault<z.ZodNumber>;
    estimated_duration: z.ZodOptional<z.ZodNumber>;
    completion_rate: z.ZodDefault<z.ZodNumber>;
    primary_category_id: z.ZodOptional<z.ZodString>;
    tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theological_themes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    visibility: z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
    featured_image_url: z.ZodOptional<z.ZodString>;
    thumbnail_url: z.ZodOptional<z.ZodString>;
    meta_title: z.ZodOptional<z.ZodString>;
    meta_description: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodString>;
    scheduled_at: z.ZodOptional<z.ZodString>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
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
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        series_order: number;
        published_at?: string | undefined;
        excerpt?: string | undefined;
    }, {
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        series_order: number;
        published_at?: string | undefined;
        excerpt?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
    id: string;
    created_at: string;
    updated_at: string;
    slug: string;
    title: string;
    tags: string[];
    theological_themes: string[];
    visibility: "public" | "private" | "organization" | "invite_only";
    series_type: "course" | "learning_path" | "book_series" | "podcast_series" | "video_series" | "framework";
    total_items: number;
    completion_rate: number;
    content_items: {
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        series_order: number;
        published_at?: string | undefined;
        excerpt?: string | undefined;
    }[];
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
    id: string;
    created_at: string;
    updated_at: string;
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
    content_items?: {
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        series_order: number;
        published_at?: string | undefined;
        excerpt?: string | undefined;
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
        excerpt: z.ZodOptional<z.ZodString>;
        series_type: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
        difficulty: z.ZodOptional<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
        total_items: z.ZodDefault<z.ZodNumber>;
        estimated_duration: z.ZodOptional<z.ZodNumber>;
        completion_rate: z.ZodDefault<z.ZodNumber>;
        primary_category_id: z.ZodOptional<z.ZodString>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        theological_themes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "private", "organization", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>>;
        featured_image_url: z.ZodOptional<z.ZodString>;
        thumbnail_url: z.ZodOptional<z.ZodString>;
        meta_title: z.ZodOptional<z.ZodString>;
        meta_description: z.ZodOptional<z.ZodString>;
        published_at: z.ZodOptional<z.ZodString>;
        scheduled_at: z.ZodOptional<z.ZodString>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        created_at: string;
        updated_at: string;
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
        id: string;
        created_at: string;
        updated_at: string;
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
        status: "draft" | "archived" | "under_review" | "published" | "scheduled";
        id: string;
        created_at: string;
        updated_at: string;
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
        created_at: string;
        updated_at: string;
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
    source_content_id: z.ZodString;
    target_content_id: z.ZodString;
    reference_type: z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>;
    relevance_score: z.ZodDefault<z.ZodNumber>;
    context: z.ZodOptional<z.ZodString>;
    ai_generated: z.ZodDefault<z.ZodBoolean>;
    confidence_score: z.ZodOptional<z.ZodNumber>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score: number;
    ai_generated: boolean;
    context?: string | undefined;
    confidence_score?: number | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}>;
/**
 * Content Cross Reference with Details API Response Contract
 * Extends cross reference with content details
 */
export declare const ContentCrossReferenceWithDetailsApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    source_content_id: z.ZodString;
    target_content_id: z.ZodString;
    reference_type: z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>;
    relevance_score: z.ZodDefault<z.ZodNumber>;
    context: z.ZodOptional<z.ZodString>;
    ai_generated: z.ZodDefault<z.ZodBoolean>;
    confidence_score: z.ZodOptional<z.ZodNumber>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
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
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    }, {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
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
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    }, {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    relevance_score: number;
    ai_generated: boolean;
    source_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    };
    target_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    };
    context?: string | undefined;
    confidence_score?: number | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    source_content_id: string;
    target_content_id: string;
    reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
    source_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    };
    target_content: {
        id: string;
        slug: string;
        title: string;
        content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
    };
    relevance_score?: number | undefined;
    context?: string | undefined;
    ai_generated?: boolean | undefined;
    confidence_score?: number | undefined;
}>;
/**
 * Content Cross Reference List API Response Contract
 * Paginated list of content cross references
 */
export declare const ContentCrossReferenceListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        source_content_id: z.ZodString;
        target_content_id: z.ZodString;
        reference_type: z.ZodEnum<["citation", "quotation", "expansion", "contradiction", "support"]>;
        relevance_score: z.ZodDefault<z.ZodNumber>;
        context: z.ZodOptional<z.ZodString>;
        ai_generated: z.ZodDefault<z.ZodBoolean>;
        confidence_score: z.ZodOptional<z.ZodNumber>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
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
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        }, {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
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
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        }, {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        created_at: string;
        updated_at: string;
        source_content_id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        relevance_score: number;
        ai_generated: boolean;
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        context?: string | undefined;
        confidence_score?: number | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        source_content_id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        relevance_score?: number | undefined;
        context?: string | undefined;
        ai_generated?: boolean | undefined;
        confidence_score?: number | undefined;
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
        created_at: string;
        updated_at: string;
        source_content_id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        relevance_score: number;
        ai_generated: boolean;
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        context?: string | undefined;
        confidence_score?: number | undefined;
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
        created_at: string;
        updated_at: string;
        source_content_id: string;
        target_content_id: string;
        reference_type: "citation" | "quotation" | "expansion" | "contradiction" | "support";
        source_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        target_content: {
            id: string;
            slug: string;
            title: string;
            content_type: "other" | "article" | "video" | "audio" | "podcast" | "book" | "course" | "webinar";
        };
        relevance_score?: number | undefined;
        context?: string | undefined;
        ai_generated?: boolean | undefined;
        confidence_score?: number | undefined;
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
            share_count: number;
            comment_count: number;
            bookmark_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
        }, {
            like_count: number;
            share_count: number;
            comment_count: number;
            bookmark_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
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
            share_count: number;
            comment_count: number;
            bookmark_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
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
            share_count: number;
            comment_count: number;
            bookmark_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
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
            share_count: number;
            comment_count: number;
            bookmark_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
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
            share_count: number;
            comment_count: number;
            bookmark_count: number;
            total_views: number;
            unique_views: number;
            average_time_on_page: number;
            bounce_rate: number;
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