import { pgTable, uuid, text, timestamp, integer, jsonb, boolean, decimal, } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userProfiles } from './auth';
import { contentItems } from './content';
// AI Conversations - AI chat sessions with context and quality tracking
export const aiConversations = pgTable('ai_conversations', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
    // Conversation Classification
    conversationType: text('conversation_type', {
        enum: ['theological_discussion', 'content_creation', 'assessment_guidance', 'ministry_advice',
            'leadership_coaching', 'content_discovery', 'research_assistance', 'general']
    }).notNull(),
    // Context & Topic
    title: text('title'),
    primaryTopic: text('primary_topic'),
    theologicalContext: jsonb('theological_context').$type(),
    // Personalization Context
    userApestProfile: jsonb('user_apest_profile').$type(),
    ministryContext: jsonb('ministry_context').$type(),
    culturalContext: text('cultural_context'),
    // Conversation Metrics
    totalMessages: integer('total_messages').default(0),
    conversationDurationMinutes: integer('conversation_duration_minutes'),
    // Quality & Satisfaction
    userSatisfactionRating: integer('user_satisfaction_rating'), // 1-5 scale
    theologicalAccuracyVerified: boolean('theological_accuracy_verified').default(false),
    helpfulnessRating: integer('helpfulness_rating'), // 1-5 scale
    // AI Model Information
    aiModel: text('ai_model').default('gpt-4'),
    modelVersion: text('model_version'),
    totalTokensUsed: integer('total_tokens_used').default(0),
    // Content References
    referencedContent: jsonb('referenced_content').$type().default([]), // Content IDs
    generatedInsights: text('generated_insights'),
    // Status
    status: text('status', {
        enum: ['active', 'completed', 'abandoned', 'archived']
    }).default('active'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    completedAt: timestamp('completed_at'),
});
// AI Messages - Individual messages with content references and feedback
export const aiMessages = pgTable('ai_messages', {
    id: uuid('id').primaryKey().defaultRandom(),
    conversationId: uuid('conversation_id').notNull().references(() => aiConversations.id, { onDelete: 'cascade' }),
    // Message Content
    role: text('role', {
        enum: ['user', 'assistant', 'system']
    }).notNull(),
    content: text('content').notNull(),
    // Message Metadata
    messageIndex: integer('message_index').notNull(),
    tokenCount: integer('token_count'),
    // Content References
    citedContent: jsonb('cited_content').$type().default([]),
    // Quality Indicators
    confidence: decimal('confidence', { precision: 3, scale: 2 }),
    factualAccuracy: boolean('factual_accuracy'),
    theologicalSoundness: boolean('theological_soundness'),
    // User Feedback
    userRating: integer('user_rating'), // 1-5 scale
    userFeedback: text('user_feedback'),
    flaggedForReview: boolean('flagged_for_review').default(false),
    // Processing Information
    processingTime: integer('processing_time'), // milliseconds
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// AI Content Jobs - Background AI processing tasks
export const aiContentJobs = pgTable('ai_content_jobs', {
    id: uuid('id').primaryKey().defaultRandom(),
    contentId: uuid('content_id').references(() => contentItems.id, { onDelete: 'cascade' }),
    userId: uuid('user_id').references(() => userProfiles.id),
    // Job Classification
    jobType: text('job_type', {
        enum: ['summarize', 'extract_key_points', 'generate_cross_references', 'enhance_seo',
            'translate', 'generate_questions', 'create_outline', 'fact_check']
    }).notNull(),
    // Job Configuration
    parameters: jsonb('parameters').$type().default({}),
    priority: text('priority', {
        enum: ['low', 'normal', 'high', 'urgent']
    }).default('normal'),
    // Processing Status
    status: text('status', {
        enum: ['pending', 'processing', 'completed', 'failed', 'cancelled']
    }).default('pending'),
    // Results
    result: jsonb('result').$type(),
    confidenceScore: decimal('confidence_score', { precision: 3, scale: 2 }),
    // Quality Control
    humanReviewed: boolean('human_reviewed').default(false),
    humanApproved: boolean('human_approved'),
    reviewNotes: text('review_notes'),
    // Processing Information
    aiModel: text('ai_model').default('gpt-4'),
    tokensUsed: integer('tokens_used'),
    processingCost: decimal('processing_cost', { precision: 8, scale: 4 }),
    // Error Handling
    errorMessage: text('error_message'),
    retryCount: integer('retry_count').default(0),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    startedAt: timestamp('started_at'),
    completedAt: timestamp('completed_at'),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// AI Cross Reference Suggestions - AI-generated content connection suggestions
export const aiCrossReferenceSuggestions = pgTable('ai_cross_reference_suggestions', {
    id: uuid('id').primaryKey().defaultRandom(),
    sourceContentId: uuid('source_content_id').notNull().references(() => contentItems.id, { onDelete: 'cascade' }),
    targetContentId: uuid('target_content_id').notNull().references(() => contentItems.id, { onDelete: 'cascade' }),
    // AI Analysis
    suggestedReferenceType: text('suggested_reference_type', {
        enum: ['builds_on', 'contradicts', 'supports', 'extends', 'applies', 'critiques', 'synthesizes']
    }).notNull(),
    // Confidence & Quality
    confidenceScore: decimal('confidence_score', { precision: 3, scale: 2 }).notNull(),
    relevanceScore: decimal('relevance_score', { precision: 3, scale: 2 }).notNull(),
    // AI Reasoning
    reasoning: text('reasoning'),
    keyConnections: jsonb('key_connections').$type(),
    // Human Review
    humanReviewed: boolean('human_reviewed').default(false),
    humanApproved: boolean('human_approved'),
    reviewNotes: text('review_notes'),
    // Implementation Status
    status: text('status', {
        enum: ['pending', 'approved', 'rejected', 'implemented']
    }).default('pending'),
    // AI Model Information
    aiModel: text('ai_model').default('gpt-4'),
    modelVersion: text('model_version'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    reviewedAt: timestamp('reviewed_at'),
    implementedAt: timestamp('implemented_at'),
});
// Theological Concepts - Knowledge graph for AI cross-referencing
export const theologicalConcepts = pgTable('theological_concepts', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    slug: text('slug').notNull().unique(),
    definition: text('definition'),
    // Classification
    conceptType: text('concept_type', {
        enum: ['doctrine', 'practice', 'tradition', 'movement', 'person', 'event', 'text']
    }).notNull(),
    // Theological Context
    theologicalTradition: jsonb('theological_tradition').$type().default([]),
    biblicalReferences: jsonb('biblical_references').$type().default([]),
    historicalPeriod: text('historical_period'),
    // Relationships
    relatedConcepts: jsonb('related_concepts').$type().default([]), // Concept IDs
    synonyms: jsonb('synonyms').$type().default([]),
    // APEST Relevance
    apestRelevance: jsonb('apest_relevance').$type().default({ apostolic: 5, prophetic: 5, evangelistic: 5, shepherding: 5, teaching: 5 }),
    // Usage Statistics
    contentReferences: integer('content_references').default(0),
    searchCount: integer('search_count').default(0),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Relations
export const aiConversationsRelations = relations(aiConversations, ({ one, many }) => ({
    user: one(userProfiles, {
        fields: [aiConversations.userId],
        references: [userProfiles.id],
    }),
    messages: many(aiMessages),
}));
export const aiMessagesRelations = relations(aiMessages, ({ one }) => ({
    conversation: one(aiConversations, {
        fields: [aiMessages.conversationId],
        references: [aiConversations.id],
    }),
}));
export const aiContentJobsRelations = relations(aiContentJobs, ({ one }) => ({
    content: one(contentItems, {
        fields: [aiContentJobs.contentId],
        references: [contentItems.id],
    }),
    user: one(userProfiles, {
        fields: [aiContentJobs.userId],
        references: [userProfiles.id],
    }),
}));
export const aiCrossReferenceSuggestionsRelations = relations(aiCrossReferenceSuggestions, ({ one }) => ({
    sourceContent: one(contentItems, {
        fields: [aiCrossReferenceSuggestions.sourceContentId],
        references: [contentItems.id],
        relationName: 'sourceContent',
    }),
    targetContent: one(contentItems, {
        fields: [aiCrossReferenceSuggestions.targetContentId],
        references: [contentItems.id],
        relationName: 'targetContent',
    }),
}));
//# sourceMappingURL=ai.js.map