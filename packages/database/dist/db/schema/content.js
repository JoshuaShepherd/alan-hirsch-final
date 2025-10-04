import { pgTable, uuid, text, timestamp, integer, jsonb, boolean, decimal, } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userProfiles } from './auth';
// Content Categories - Hierarchical taxonomy with APEST relevance
export const contentCategories = pgTable('content_categories', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    // Hierarchy
    parentId: uuid('parent_id').references(() => contentCategories.id),
    orderIndex: integer('order_index').default(0),
    // Theological Classification
    theologicalDiscipline: text('theological_discipline', {
        enum: [
            'systematic',
            'biblical',
            'practical',
            'historical',
            'philosophical',
            'missional',
            'pastoral',
        ],
    }),
    // Movement Relevance (1-10 scale)
    movementRelevanceScore: integer('movement_relevance_score').default(5),
    // APEST Relevance Scoring
    apestRelevance: jsonb('apest_relevance')
        .$type()
        .default({
        apostolic: 5,
        prophetic: 5,
        evangelistic: 5,
        shepherding: 5,
        teaching: 5,
    }),
    // SEO & Discovery
    metaDescription: text('meta_description'),
    keywords: jsonb('keywords').$type().default([]),
    // Status
    isActive: boolean('is_active').default(true),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Content Series - Structured learning paths and course organization
export const contentSeries = pgTable('content_series', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    excerpt: text('excerpt'),
    // Author & Attribution
    authorId: uuid('author_id')
        .notNull()
        .references(() => userProfiles.id),
    collaborators: jsonb('collaborators').$type().default([]), // User IDs
    // Series Configuration
    seriesType: text('series_type', {
        enum: [
            'course',
            'learning_path',
            'book_series',
            'podcast_series',
            'video_series',
            'framework',
        ],
    }).notNull(),
    difficulty: text('difficulty', {
        enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    }).default('intermediate'),
    // Content Organization
    totalItems: integer('total_items').default(0),
    estimatedDuration: integer('estimated_duration'), // minutes
    // Categorization
    primaryCategoryId: uuid('primary_category_id').references(() => contentCategories.id),
    tags: jsonb('tags').$type().default([]),
    // Visibility & Access
    visibility: text('visibility', {
        enum: [
            'public',
            'premium',
            'vip',
            'private',
            'organization',
            'invite_only',
        ],
    }).default('public'),
    status: text('status', {
        enum: ['draft', 'published', 'archived', 'under_review'],
    }).default('draft'),
    // SEO & Media
    featuredImageUrl: text('featured_image_url'),
    metaDescription: text('meta_description'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    publishedAt: timestamp('published_at'),
});
// Content Items - Main content repository
export const contentItems = pgTable('content_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    slug: text('slug').notNull().unique(),
    excerpt: text('excerpt'),
    content: text('content'), // Main content body
    // Author & Attribution
    authorId: uuid('author_id')
        .notNull()
        .references(() => userProfiles.id),
    coAuthors: jsonb('co_authors').$type().default([]), // User IDs
    // Content Classification
    contentType: text('content_type', {
        enum: [
            'article',
            'video',
            'podcast',
            'framework',
            'tool',
            'case_study',
            'interview',
            'course_lesson',
        ],
    }).notNull(),
    format: text('format', {
        enum: ['text', 'video', 'audio', 'interactive', 'pdf', 'presentation'],
    }).default('text'),
    // Content Metrics
    wordCount: integer('word_count'),
    estimatedReadingTime: integer('estimated_reading_time'), // minutes
    viewCount: integer('view_count').default(0),
    likeCount: integer('like_count').default(0),
    shareCount: integer('share_count').default(0),
    commentCount: integer('comment_count').default(0),
    bookmarkCount: integer('bookmark_count').default(0),
    // Categorization & Tagging
    primaryCategoryId: uuid('primary_category_id').references(() => contentCategories.id),
    secondaryCategories: jsonb('secondary_categories')
        .$type()
        .default([]), // Category IDs
    tags: jsonb('tags').$type().default([]),
    theologicalThemes: jsonb('theological_themes').$type().default([]),
    // Series Association
    seriesId: uuid('series_id').references(() => contentSeries.id),
    seriesOrder: integer('series_order'),
    // Visibility & Access Control
    visibility: text('visibility', {
        enum: [
            'public',
            'premium',
            'vip',
            'private',
            'organization',
            'invite_only',
        ],
    }).default('public'),
    status: text('status', {
        enum: ['draft', 'published', 'archived', 'under_review', 'scheduled'],
    }).default('draft'),
    // Network Amplification
    networkAmplificationScore: decimal('network_amplification_score', {
        precision: 3,
        scale: 1,
    }).default('0.0'),
    crossReferenceCount: integer('cross_reference_count').default(0),
    // AI Enhancement
    aiEnhanced: boolean('ai_enhanced').default(false),
    aiSummary: text('ai_summary'),
    aiKeyPoints: jsonb('ai_key_points').$type().default([]),
    // Media & Assets
    featuredImageUrl: text('featured_image_url'),
    videoUrl: text('video_url'),
    audioUrl: text('audio_url'),
    attachments: jsonb('attachments')
        .$type()
        .default([]),
    // SEO & Discovery
    metaTitle: text('meta_title'),
    metaDescription: text('meta_description'),
    canonicalUrl: text('canonical_url'),
    // Attribution & Permissions
    originalSource: text('original_source'),
    licenseType: text('license_type', {
        enum: [
            'all_rights_reserved',
            'creative_commons',
            'public_domain',
            'fair_use',
        ],
    }).default('all_rights_reserved'),
    attributionRequired: boolean('attribution_required').default(true),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    publishedAt: timestamp('published_at'),
    scheduledAt: timestamp('scheduled_at'),
});
// Series Content Items - Ordered content within series
export const seriesContentItems = pgTable('series_content_items', {
    id: uuid('id').primaryKey().defaultRandom(),
    seriesId: uuid('series_id')
        .notNull()
        .references(() => contentSeries.id, { onDelete: 'cascade' }),
    contentId: uuid('content_id')
        .notNull()
        .references(() => contentItems.id, { onDelete: 'cascade' }),
    // Ordering
    orderIndex: integer('order_index').notNull(),
    // Prerequisites
    prerequisites: jsonb('prerequisites').$type().default([]), // Content IDs
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
// Content Cross References - Network amplification system
export const contentCrossReferences = pgTable('content_cross_references', {
    id: uuid('id').primaryKey().defaultRandom(),
    sourceContentId: uuid('source_content_id')
        .notNull()
        .references(() => contentItems.id, { onDelete: 'cascade' }),
    targetContentId: uuid('target_content_id')
        .notNull()
        .references(() => contentItems.id, { onDelete: 'cascade' }),
    // Reference Classification
    referenceType: text('reference_type', {
        enum: [
            'builds_on',
            'contradicts',
            'supports',
            'extends',
            'applies',
            'critiques',
            'synthesizes',
        ],
    }).notNull(),
    // Quality & Relevance
    relevanceScore: integer('relevance_score').default(5), // 1-10 scale
    qualityScore: integer('quality_score').default(5), // 1-10 scale
    // Context
    contextDescription: text('context_description'),
    // Approval Workflow
    isAuthorApproved: boolean('is_author_approved').default(false),
    isAiGenerated: boolean('is_ai_generated').default(false),
    // Analytics
    clickCount: integer('click_count').default(0),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Relations
export const contentCategoriesRelations = relations(contentCategories, ({ one, many }) => ({
    parent: one(contentCategories, {
        fields: [contentCategories.parentId],
        references: [contentCategories.id],
    }),
    children: many(contentCategories),
    contentItems: many(contentItems),
    contentSeries: many(contentSeries),
}));
export const contentSeriesRelations = relations(contentSeries, ({ one, many }) => ({
    author: one(userProfiles, {
        fields: [contentSeries.authorId],
        references: [userProfiles.id],
    }),
    primaryCategory: one(contentCategories, {
        fields: [contentSeries.primaryCategoryId],
        references: [contentCategories.id],
    }),
    seriesItems: many(seriesContentItems),
    contentItems: many(contentItems),
}));
export const contentItemsRelations = relations(contentItems, ({ one, many }) => ({
    author: one(userProfiles, {
        fields: [contentItems.authorId],
        references: [userProfiles.id],
    }),
    primaryCategory: one(contentCategories, {
        fields: [contentItems.primaryCategoryId],
        references: [contentCategories.id],
    }),
    series: one(contentSeries, {
        fields: [contentItems.seriesId],
        references: [contentSeries.id],
    }),
    seriesItems: many(seriesContentItems),
    outgoingReferences: many(contentCrossReferences, {
        relationName: 'sourceContent',
    }),
    incomingReferences: many(contentCrossReferences, {
        relationName: 'targetContent',
    }),
}));
export const seriesContentItemsRelations = relations(seriesContentItems, ({ one }) => ({
    series: one(contentSeries, {
        fields: [seriesContentItems.seriesId],
        references: [contentSeries.id],
    }),
    content: one(contentItems, {
        fields: [seriesContentItems.contentId],
        references: [contentItems.id],
    }),
}));
export const contentCrossReferencesRelations = relations(contentCrossReferences, ({ one }) => ({
    sourceContent: one(contentItems, {
        fields: [contentCrossReferences.sourceContentId],
        references: [contentItems.id],
        relationName: 'sourceContent',
    }),
    targetContent: one(contentItems, {
        fields: [contentCrossReferences.targetContentId],
        references: [contentItems.id],
        relationName: 'targetContent',
    }),
}));
//# sourceMappingURL=content.js.map