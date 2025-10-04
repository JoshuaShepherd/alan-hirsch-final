import { pgTable, uuid, text, timestamp, integer, jsonb, boolean, } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userProfiles } from './auth';
// Audit Logs - Complete activity audit trail
export const auditLogs = pgTable('audit_logs', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id),
    // Action Classification
    action: text('action').notNull(),
    resource: text('resource').notNull(), // Table or resource name
    resourceId: text('resource_id'), // ID of affected resource
    // Risk Assessment
    riskLevel: text('risk_level', {
        enum: ['low', 'medium', 'high', 'critical']
    }).default('low'),
    // Change Tracking
    oldValues: jsonb('old_values').$type(),
    newValues: jsonb('new_values').$type(),
    // Context
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    sessionId: text('session_id'),
    // Request Context
    requestId: text('request_id'),
    endpoint: text('endpoint'),
    httpMethod: text('http_method'),
    // Additional Metadata
    metadata: jsonb('metadata').$type().default({}),
    // Security Context
    authenticationMethod: text('authentication_method'),
    permissions: jsonb('permissions').$type().default([]),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
});
// Feature Flags - Gradual feature rollout and A/B testing
export const featureFlags = pgTable('feature_flags', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull().unique(),
    key: text('key').notNull().unique(),
    description: text('description'),
    // Flag Configuration
    flagType: text('flag_type', {
        enum: ['boolean', 'string', 'number', 'json']
    }).default('boolean'),
    // Default Values
    defaultValue: jsonb('default_value').$type().default(false),
    // Targeting Rules
    targetingRules: jsonb('targeting_rules').$type().default([]),
    // Rollout Configuration
    rolloutPercentage: integer('rollout_percentage').default(0), // 0-100
    rolloutStrategy: text('rollout_strategy', {
        enum: ['percentage', 'user_list', 'attribute_based', 'gradual']
    }).default('percentage'),
    // Environment & Status
    environment: text('environment', {
        enum: ['development', 'staging', 'production']
    }).default('development'),
    isActive: boolean('is_active').default(false),
    // Metadata
    tags: jsonb('tags').$type().default([]),
    owner: text('owner'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
    archivedAt: timestamp('archived_at'),
});
// User Feature Flags - User-specific feature flag overrides
export const userFeatureFlags = pgTable('user_feature_flags', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
    flagId: uuid('flag_id').notNull().references(() => featureFlags.id, { onDelete: 'cascade' }),
    // Override Value
    value: jsonb('value').$type().notNull(),
    // Context
    reason: text('reason'),
    setBy: uuid('set_by').references(() => userProfiles.id),
    // Expiration
    expiresAt: timestamp('expires_at'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// User Consents - GDPR compliance and consent management
export const userConsents = pgTable('user_consents', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
    // Consent Classification
    consentType: text('consent_type', {
        enum: ['terms_of_service', 'privacy_policy', 'marketing_emails', 'analytics_tracking',
            'personalization', 'third_party_sharing', 'ai_processing', 'data_retention']
    }).notNull(),
    // Consent Status
    consentGiven: boolean('consent_given').notNull(),
    consentVersion: text('consent_version').notNull(), // Version of terms/policy
    // Legal Basis (GDPR)
    legalBasis: text('legal_basis', {
        enum: ['consent', 'contract', 'legal_obligation', 'vital_interests', 'public_task', 'legitimate_interests']
    }).default('consent'),
    // Context
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    consentMethod: text('consent_method', {
        enum: ['explicit_opt_in', 'implicit_acceptance', 'pre_checked_box', 'continued_use']
    }).default('explicit_opt_in'),
    // Withdrawal
    withdrawnAt: timestamp('withdrawn_at'),
    withdrawalReason: text('withdrawal_reason'),
    // Timestamps
    givenAt: timestamp('given_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// System Notifications - Platform-wide notifications and announcements
export const systemNotifications = pgTable('system_notifications', {
    id: uuid('id').primaryKey().defaultRandom(),
    // Notification Content
    title: text('title').notNull(),
    message: text('message').notNull(),
    // Classification
    notificationType: text('notification_type', {
        enum: ['system_maintenance', 'feature_announcement', 'security_alert', 'policy_update', 'general']
    }).notNull(),
    // Priority & Urgency
    priority: text('priority', {
        enum: ['low', 'normal', 'high', 'urgent']
    }).default('normal'),
    // Targeting
    targetAudience: text('target_audience', {
        enum: ['all_users', 'subscribers_only', 'leaders_only', 'specific_users', 'organization']
    }).default('all_users'),
    targetUserIds: jsonb('target_user_ids').$type().default([]),
    // Display Configuration
    displayMethod: text('display_method', {
        enum: ['banner', 'modal', 'toast', 'email', 'in_app']
    }).default('banner'),
    isDismissible: boolean('is_dismissible').default(true),
    // Scheduling
    scheduledAt: timestamp('scheduled_at'),
    expiresAt: timestamp('expires_at'),
    // Status
    isActive: boolean('is_active').default(true),
    // Actions
    actionUrl: text('action_url'),
    actionText: text('action_text'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// User Notification Status - Track which notifications users have seen/dismissed
export const userNotificationStatus = pgTable('user_notification_status', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull().references(() => userProfiles.id, { onDelete: 'cascade' }),
    notificationId: uuid('notification_id').notNull().references(() => systemNotifications.id, { onDelete: 'cascade' }),
    // Status
    status: text('status', {
        enum: ['sent', 'delivered', 'read', 'dismissed', 'clicked']
    }).notNull(),
    // Timestamps
    sentAt: timestamp('sent_at'),
    readAt: timestamp('read_at'),
    dismissedAt: timestamp('dismissed_at'),
    clickedAt: timestamp('clicked_at'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// API Keys - For external integrations and API access
export const apiKeys = pgTable('api_keys', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => userProfiles.id, { onDelete: 'cascade' }),
    // Key Details
    name: text('name').notNull(),
    keyHash: text('key_hash').notNull().unique(), // Hashed version of the key
    keyPrefix: text('key_prefix').notNull(), // First few characters for identification
    // Permissions & Scope
    scopes: jsonb('scopes').$type().default([]),
    permissions: jsonb('permissions').$type().default([]),
    // Usage Limits
    rateLimit: integer('rate_limit').default(1000), // Requests per hour
    usageCount: integer('usage_count').default(0),
    // Status
    isActive: boolean('is_active').default(true),
    // Expiration
    expiresAt: timestamp('expires_at'),
    // Last Usage
    lastUsedAt: timestamp('last_used_at'),
    lastUsedIp: text('last_used_ip'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Relations
export const auditLogsRelations = relations(auditLogs, ({ one }) => ({
    user: one(userProfiles, {
        fields: [auditLogs.userId],
        references: [userProfiles.id],
    }),
}));
export const featureFlagsRelations = relations(featureFlags, ({ many }) => ({
    userOverrides: many(userFeatureFlags),
}));
export const userFeatureFlagsRelations = relations(userFeatureFlags, ({ one }) => ({
    user: one(userProfiles, {
        fields: [userFeatureFlags.userId],
        references: [userProfiles.id],
    }),
    flag: one(featureFlags, {
        fields: [userFeatureFlags.flagId],
        references: [featureFlags.id],
    }),
    setByUser: one(userProfiles, {
        fields: [userFeatureFlags.setBy],
        references: [userProfiles.id],
    }),
}));
export const userConsentsRelations = relations(userConsents, ({ one }) => ({
    user: one(userProfiles, {
        fields: [userConsents.userId],
        references: [userProfiles.id],
    }),
}));
export const systemNotificationsRelations = relations(systemNotifications, ({ many }) => ({
    userStatuses: many(userNotificationStatus),
}));
export const userNotificationStatusRelations = relations(userNotificationStatus, ({ one }) => ({
    user: one(userProfiles, {
        fields: [userNotificationStatus.userId],
        references: [userProfiles.id],
    }),
    notification: one(systemNotifications, {
        fields: [userNotificationStatus.notificationId],
        references: [systemNotifications.id],
    }),
}));
export const apiKeysRelations = relations(apiKeys, ({ one }) => ({
    user: one(userProfiles, {
        fields: [apiKeys.userId],
        references: [userProfiles.id],
    }),
}));
//# sourceMappingURL=system.js.map