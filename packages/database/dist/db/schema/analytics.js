import { relations } from 'drizzle-orm';
import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uuid, } from 'drizzle-orm/pg-core';
import { userProfiles } from './auth';
import { communities } from './community';
import { contentItems } from './content';
// User Analytics Events - Detailed user behavior tracking
export const userAnalyticsEvents = pgTable('user_analytics_events', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id, {
        onDelete: 'cascade',
    }),
    // Event Classification
    eventType: text('event_type', {
        enum: [
            'page_view',
            'content_view',
            'content_interaction',
            'search',
            'assessment_start',
            'assessment_complete',
            'ai_conversation',
            'community_post',
            'subscription_event',
            'error',
        ],
    }).notNull(),
    eventCategory: text('event_category'),
    eventAction: text('event_action').notNull(),
    eventLabel: text('event_label'),
    // Context & Metadata
    pageUrl: text('page_url'),
    referrer: text('referrer'),
    userAgent: text('user_agent'),
    ipAddress: text('ip_address'),
    // Content Attribution
    contentId: uuid('content_id').references(() => contentItems.id),
    contentType: text('content_type'),
    // Network Attribution
    leaderProfileId: uuid('leader_profile_id').references(() => userProfiles.id),
    organizationId: uuid('organization_id'),
    communityId: uuid('community_id').references(() => communities.id),
    // Session Information
    sessionId: text('session_id'),
    sessionDuration: integer('session_duration'), // seconds
    // Engagement Metrics
    timeOnPage: integer('time_on_page'), // seconds
    scrollDepth: integer('scroll_depth'), // percentage
    clickCount: integer('click_count').default(0),
    // Personalization Data
    apestProfile: jsonb('apest_profile').$type(),
    ministryContext: jsonb('ministry_context').$type(),
    // UTM Tracking
    utmSource: text('utm_source'),
    utmMedium: text('utm_medium'),
    utmCampaign: text('utm_campaign'),
    utmTerm: text('utm_term'),
    utmContent: text('utm_content'),
    // Device & Technical
    deviceType: text('device_type', {
        enum: ['desktop', 'tablet', 'mobile', 'other'],
    }),
    browserName: text('browser_name'),
    operatingSystem: text('operating_system'),
    screenResolution: text('screen_resolution'),
    // Geographic
    country: text('country'),
    region: text('region'),
    city: text('city'),
    timezone: text('timezone'),
    // Custom Properties
    properties: jsonb('properties').$type().default({}),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
// User Content Interactions - Track user engagement and learning progress
export const userContentInteractions = pgTable('user_content_interactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => userProfiles.id, { onDelete: 'cascade' }),
    contentId: uuid('content_id')
        .notNull()
        .references(() => contentItems.id, { onDelete: 'cascade' }),
    communityId: uuid('community_id').references(() => communities.id, {
        onDelete: 'cascade',
    }),
    // Interaction Type
    interactionType: text('interaction_type', {
        enum: [
            'view',
            'like',
            'bookmark',
            'share',
            'comment',
            'download',
            'complete',
        ],
    }).notNull(),
    // Progress Tracking
    progressPercentage: integer('progress_percentage').default(0),
    timeSpentMinutes: integer('time_spent_minutes').default(0),
    // Learning Status
    status: text('status', {
        enum: ['not_started', 'in_progress', 'completed', 'bookmarked', 'skipped'],
    }).default('not_started'),
    // Implementation Tracking
    implementationStatus: text('implementation_status', {
        enum: [
            'not_applicable',
            'planning',
            'implementing',
            'implemented',
            'abandoned',
        ],
    }),
    implementationNotes: text('implementation_notes'),
    // Quality & Feedback
    rating: integer('rating'), // 1-5 scale
    feedback: text('feedback'),
    wouldRecommend: boolean('would_recommend'),
    // Timestamps
    firstAccessedAt: timestamp('first_accessed_at').notNull().defaultNow(),
    lastAccessedAt: timestamp('last_accessed_at').notNull().defaultNow(),
    completedAt: timestamp('completed_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Learning Outcomes - Measure actual ministry impact and behavior change
export const learningOutcomes = pgTable('learning_outcomes', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => userProfiles.id, { onDelete: 'cascade' }),
    contentId: uuid('content_id').references(() => contentItems.id),
    // Outcome Classification
    outcomeType: text('outcome_type', {
        enum: [
            'knowledge_gain',
            'skill_development',
            'behavior_change',
            'ministry_impact',
            'leadership_growth',
            'theological_understanding',
        ],
    }).notNull(),
    // Measurement
    outcomeDescription: text('outcome_description').notNull(),
    measurementMethod: text('measurement_method', {
        enum: [
            'self_reported',
            'peer_observed',
            'supervisor_confirmed',
            'objective_metric',
        ],
    }).notNull(),
    // Quantitative Measures
    baselineScore: integer('baseline_score'),
    currentScore: integer('current_score'),
    improvementPercentage: decimal('improvement_percentage', {
        precision: 5,
        scale: 2,
    }),
    // Verification
    verifiedBy: text('verified_by', {
        enum: ['self', 'peer', 'supervisor', 'third_party'],
    }).default('self'),
    verificationNotes: text('verification_notes'),
    // Context
    ministryContext: jsonb('ministry_context').$type(),
    // Timeline
    measuredAt: timestamp('measured_at').notNull(),
    followUpScheduledAt: timestamp('follow_up_scheduled_at'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Movement Metrics - Regional and global movement health indicators
export const movementMetrics = pgTable('movement_metrics', {
    id: uuid('id').primaryKey().defaultRandom(),
    // Geographic Scope
    region: text('region').notNull(), // Country code or region identifier
    subregion: text('subregion'),
    // Metric Classification
    metricType: text('metric_type', {
        enum: [
            'user_growth',
            'content_engagement',
            'assessment_completion',
            'community_activity',
            'leader_development',
            'network_expansion',
            'revenue_growth',
        ],
    }).notNull(),
    // Measurement Period
    periodType: text('period_type', {
        enum: ['daily', 'weekly', 'monthly', 'quarterly', 'annual'],
    }).notNull(),
    periodStart: timestamp('period_start').notNull(),
    periodEnd: timestamp('period_end').notNull(),
    // Metrics Data
    value: decimal('value', { precision: 12, scale: 2 }).notNull(),
    previousValue: decimal('previous_value', { precision: 12, scale: 2 }),
    changePercentage: decimal('change_percentage', { precision: 5, scale: 2 }),
    // Context & Breakdown
    breakdown: jsonb('breakdown').$type().default({}),
    metadata: jsonb('metadata').$type().default({}),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
// Performance Reports - Leader dashboard data and network analytics
export const performanceReports = pgTable('performance_reports', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id, {
        onDelete: 'cascade',
    }),
    // Report Configuration
    reportType: text('report_type', {
        enum: [
            'leader_dashboard',
            'content_performance',
            'network_analytics',
            'revenue_summary',
            'engagement_report',
            'assessment_insights',
        ],
    }).notNull(),
    // Time Period
    periodStart: timestamp('period_start').notNull(),
    periodEnd: timestamp('period_end').notNull(),
    // Report Data
    data: jsonb('data').$type().notNull(),
    // Key Metrics Summary
    keyMetrics: jsonb('key_metrics').$type(),
    // Insights & Recommendations
    insights: jsonb('insights').$type().default([]),
    recommendations: jsonb('recommendations').$type().default([]),
    // Status
    status: text('status', {
        enum: ['generating', 'completed', 'failed'],
    }).default('generating'),
    // Timestamps
    generatedAt: timestamp('generated_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
// Relations
export const userAnalyticsEventsRelations = relations(userAnalyticsEvents, ({ one }) => ({
    user: one(userProfiles, {
        fields: [userAnalyticsEvents.userId],
        references: [userProfiles.id],
    }),
    content: one(contentItems, {
        fields: [userAnalyticsEvents.contentId],
        references: [contentItems.id],
    }),
    leaderProfile: one(userProfiles, {
        fields: [userAnalyticsEvents.leaderProfileId],
        references: [userProfiles.id],
    }),
}));
export const userContentInteractionsRelations = relations(userContentInteractions, ({ one }) => ({
    user: one(userProfiles, {
        fields: [userContentInteractions.userId],
        references: [userProfiles.id],
    }),
    content: one(contentItems, {
        fields: [userContentInteractions.contentId],
        references: [contentItems.id],
    }),
}));
export const learningOutcomesRelations = relations(learningOutcomes, ({ one }) => ({
    user: one(userProfiles, {
        fields: [learningOutcomes.userId],
        references: [userProfiles.id],
    }),
    content: one(contentItems, {
        fields: [learningOutcomes.contentId],
        references: [contentItems.id],
    }),
}));
export const performanceReportsRelations = relations(performanceReports, ({ one }) => ({
    user: one(userProfiles, {
        fields: [performanceReports.userId],
        references: [userProfiles.id],
    }),
}));
//# sourceMappingURL=analytics.js.map