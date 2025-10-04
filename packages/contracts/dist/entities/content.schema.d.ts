import { z } from 'zod';
export declare const contentTypeSchema: z.ZodEnum<["article", "video", "audio", "podcast", "book", "course", "webinar", "other"]>;
export declare const contentFormatSchema: z.ZodEnum<["text", "html", "markdown"]>;
export declare const contentStatusSchema: z.ZodEnum<["draft", "published", "archived", "scheduled", "under_review"]>;
export declare const visibilitySchema: z.ZodEnum<["public", "private", "organization", "invite_only"]>;
export declare const licenseTypeSchema: z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "custom"]>;
export declare const theologicalDisciplineSchema: z.ZodEnum<["systematic", "biblical", "practical", "historical", "philosophical", "missional", "pastoral"]>;
export declare const seriesTypeSchema: z.ZodEnum<["course", "learning_path", "book_series", "podcast_series", "video_series", "framework"]>;
export declare const difficultySchema: z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>;
export declare const attachmentSchema: z.ZodObject<{
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
}>;
/**
 * Complete Content Item Entity Schema
 * This is the single source of truth for all content item data structures
 */
export declare const ContentItemEntitySchema: z.ZodObject<{
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
 * Complete Content Category Entity Schema
 * This is the single source of truth for all content category data structures
 */
export declare const ContentCategoryEntitySchema: z.ZodObject<{
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
 * Complete Content Series Entity Schema
 * This is the single source of truth for all content series data structures
 */
export declare const ContentSeriesEntitySchema: z.ZodObject<{
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
 * Complete Content Cross Reference Entity Schema
 * This is the single source of truth for all content cross reference data structures
 */
export declare const ContentCrossReferenceEntitySchema: z.ZodObject<{
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
 * Create Content Item Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateContentItemSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "published" | "scheduled";
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
 * Update Content Item Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateContentItemSchema: z.ZodObject<{
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
}>;
/**
 * Content Item Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const ContentItemQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Create Content Category Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateContentCategorySchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Content Category Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateContentCategorySchema: z.ZodObject<{
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
}>;
/**
 * Content Category Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const ContentCategoryQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Create Content Series Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateContentSeriesSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Content Series Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateContentSeriesSchema: z.ZodObject<{
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
}>;
/**
 * Content Series Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const ContentSeriesQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Create Content Cross Reference Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateContentCrossReferenceSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Content Cross Reference Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateContentCrossReferenceSchema: z.ZodObject<{
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
}>;
/**
 * Content Cross Reference Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const ContentCrossReferenceQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
export type ContentItemEntity = z.infer<typeof ContentItemEntitySchema>;
export type CreateContentItem = z.infer<typeof CreateContentItemSchema>;
export type UpdateContentItem = z.infer<typeof UpdateContentItemSchema>;
export type ContentItemQuery = z.infer<typeof ContentItemQuerySchema>;
export type ContentCategoryEntity = z.infer<typeof ContentCategoryEntitySchema>;
export type CreateContentCategory = z.infer<typeof CreateContentCategorySchema>;
export type UpdateContentCategory = z.infer<typeof UpdateContentCategorySchema>;
export type ContentCategoryQuery = z.infer<typeof ContentCategoryQuerySchema>;
export type ContentSeriesEntity = z.infer<typeof ContentSeriesEntitySchema>;
export type CreateContentSeries = z.infer<typeof CreateContentSeriesSchema>;
export type UpdateContentSeries = z.infer<typeof UpdateContentSeriesSchema>;
export type ContentSeriesQuery = z.infer<typeof ContentSeriesQuerySchema>;
export type ContentCrossReferenceEntity = z.infer<typeof ContentCrossReferenceEntitySchema>;
export type CreateContentCrossReference = z.infer<typeof CreateContentCrossReferenceSchema>;
export type UpdateContentCrossReference = z.infer<typeof UpdateContentCrossReferenceSchema>;
export type ContentCrossReferenceQuery = z.infer<typeof ContentCrossReferenceQuerySchema>;
export type ContentType = z.infer<typeof contentTypeSchema>;
export type ContentFormat = z.infer<typeof contentFormatSchema>;
export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type LicenseType = z.infer<typeof licenseTypeSchema>;
export type TheologicalDiscipline = z.infer<typeof theologicalDisciplineSchema>;
export type SeriesType = z.infer<typeof seriesTypeSchema>;
export type Difficulty = z.infer<typeof difficultySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
//# sourceMappingURL=content.schema.d.ts.map