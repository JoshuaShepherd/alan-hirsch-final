import { z } from 'zod';
// ============================================================================
// SYSTEM & ADMINISTRATION ENTITY SCHEMAS
// ============================================================================
// Placeholder schemas for system and administration functionality
// API Key Entity Schema
export const apiKeyEntitySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    keyHash: z.string().min(32).max(64),
    permissions: z.array(z.string()).default([]),
    isActive: z.boolean().default(true),
    lastUsedAt: z.string().datetime().optional(),
    expiresAt: z.string().datetime().optional(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Audit Log Entity Schema
export const auditLogEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid().optional(),
    organizationId: z.string().uuid().optional(),
    action: z.string().min(1).max(100),
    resourceType: z.string().min(1).max(50),
    resourceId: z.string().uuid().optional(),
    details: z.record(z.unknown()).optional(),
    ipAddress: z.string().ip().optional(),
    userAgent: z.string().max(500).optional(),
    timestamp: z.string().datetime(),
    createdAt: z.string().datetime(),
});
// Feature Flag Entity Schema
export const featureFlagEntitySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    isEnabled: z.boolean().default(false),
    rolloutPercentage: z.number().min(0).max(100).default(0),
    targetUsers: z.array(z.string().uuid()).default([]),
    targetOrganizations: z.array(z.string().uuid()).default([]),
    conditions: z.record(z.unknown()).optional(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// User Feature Flag Entity Schema
export const userFeatureFlagEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    featureFlagId: z.string().uuid(),
    isEnabled: z.boolean(),
    reason: z.string().max(200).optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// User Consent Entity Schema
export const userConsentEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    consentType: z.enum([
        'privacy',
        'marketing',
        'analytics',
        'cookies',
        'terms',
    ]),
    granted: z.boolean(),
    version: z.string().max(20),
    grantedAt: z.string().datetime().optional(),
    revokedAt: z.string().datetime().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// System Notification Entity Schema
export const systemNotificationEntitySchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(200),
    message: z.string().min(1).max(1000),
    type: z.enum(['info', 'warning', 'error', 'success']),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
    targetUsers: z.array(z.string().uuid()).default([]),
    targetOrganizations: z.array(z.string().uuid()).default([]),
    isActive: z.boolean().default(true),
    scheduledAt: z.string().datetime().optional(),
    expiresAt: z.string().datetime().optional(),
    createdBy: z.string().uuid(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// User Notification Status Entity Schema
export const userNotificationStatusEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    notificationId: z.string().uuid(),
    status: z.enum(['unread', 'read', 'dismissed']).default('unread'),
    readAt: z.string().datetime().optional(),
    dismissedAt: z.string().datetime().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// ============================================================================
// CREATE SCHEMAS
// ============================================================================
export const createApiKeySchema = apiKeyEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createAuditLogSchema = auditLogEntitySchema.omit({
    id: true,
    createdAt: true,
});
export const createFeatureFlagSchema = featureFlagEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createUserFeatureFlagSchema = userFeatureFlagEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createUserConsentSchema = userConsentEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createSystemNotificationSchema = systemNotificationEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createUserNotificationStatusSchema = userNotificationStatusEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
// ============================================================================
// UPDATE SCHEMAS
// ============================================================================
export const updateApiKeySchema = createApiKeySchema.partial();
export const updateFeatureFlagSchema = createFeatureFlagSchema.partial();
export const updateUserFeatureFlagSchema = createUserFeatureFlagSchema.partial();
export const updateUserConsentSchema = createUserConsentSchema.partial();
export const updateSystemNotificationSchema = createSystemNotificationSchema.partial();
export const updateUserNotificationStatusSchema = createUserNotificationStatusSchema.partial();
// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================
export const apiKeySchema = apiKeyEntitySchema;
export const auditLogSchema = auditLogEntitySchema;
export const featureFlagSchema = featureFlagEntitySchema;
export const userFeatureFlagSchema = userFeatureFlagEntitySchema;
export const userConsentSchema = userConsentEntitySchema;
export const systemNotificationSchema = systemNotificationEntitySchema;
export const userNotificationStatusSchema = userNotificationStatusEntitySchema;
export const newApiKeySchema = createApiKeySchema;
export const newAuditLogSchema = createAuditLogSchema;
export const newFeatureFlagSchema = createFeatureFlagSchema;
export const newSystemNotificationSchema = createSystemNotificationSchema;
export const newUserConsentSchema = createUserConsentSchema;
export const newUserFeatureFlagSchema = createUserFeatureFlagSchema;
export const newUserNotificationStatusSchema = createUserNotificationStatusSchema;
//# sourceMappingURL=system.schema.js.map