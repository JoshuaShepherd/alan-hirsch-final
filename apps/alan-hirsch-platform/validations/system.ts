import { z } from 'zod';

// Audit Log Validation Schemas - ⏳ PLANNED
export const riskLevelSchema = z.enum([
  'low',
  'medium',
  'high',
  'critical'
]);

export const auditLogSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  
  // Action Classification
  action: z.string().min(1),
  resource: z.string().min(1),
  resourceId: z.string().optional(),
  
  // Risk Assessment
  riskLevel: riskLevelSchema.default('low'),
  
  // Change Tracking
  oldValues: z.record(z.string(), z.any()).optional(),
  newValues: z.record(z.string(), z.any()).optional(),
  
  // Context
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  sessionId: z.string().optional(),
  
  // Request Context
  requestId: z.string().optional(),
  endpoint: z.string().optional(),
  httpMethod: z.string().optional(),
  
  // Additional Metadata
  metadata: z.record(z.string(), z.any()).default({}),
  
  // Security Context
  authenticationMethod: z.string().optional(),
  permissions: z.array(z.string()).default([]),
  
  // Timestamps
  createdAt: z.date()
});

export const newAuditLogSchema = auditLogSchema.omit({
  createdAt: true
}).partial({
  id: true
});

// Feature Flag Validation Schemas
export const flagTypeSchema = z.enum([
  'boolean',
  'string',
  'number',
  'json'
]);

export const rolloutStrategySchema = z.enum([
  'percentage',
  'user_list',
  'attribute_based',
  'gradual'
]);

export const environmentSchema = z.enum([
  'development',
  'staging',
  'production'
]);

export const targetingConditionSchema = z.object({
  attribute: z.string(),
  operator: z.string(),
  value: z.any()
});

export const targetingRuleSchema = z.object({
  conditions: z.array(targetingConditionSchema),
  value: z.any()
});

export const featureFlagSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  key: z.string().min(1).regex(/^[a-z0-9_-]+$/),
  description: z.string().optional(),
  
  // Flag Configuration
  flagType: flagTypeSchema.default('boolean'),
  
  // Default Values
  defaultValue: z.any().default(false),
  
  // Targeting Rules
  targetingRules: z.array(targetingRuleSchema).default([]),
  
  // Rollout Configuration
  rolloutPercentage: z.number().int().min(0).max(100).default(0),
  rolloutStrategy: rolloutStrategySchema.default('percentage'),
  
  // Environment & Status
  environment: environmentSchema.default('development'),
  isActive: z.boolean().default(false),
  
  // Metadata
  tags: z.array(z.string()).default([]),
  owner: z.string().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
  archivedAt: z.date().optional()
});

export const newFeatureFlagSchema = featureFlagSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  archivedAt: true
});

// User Feature Flag Validation Schemas
export const userFeatureFlagSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  flagId: z.string().uuid(),
  
  // Override Value
  value: z.any(),
  
  // Context
  reason: z.string().optional(),
  setBy: z.string().uuid().optional(),
  
  // Expiration
  expiresAt: z.date().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newUserFeatureFlagSchema = userFeatureFlagSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  expiresAt: true
});

// User Consent Validation Schemas
export const consentTypeSchema = z.enum([
  'terms_of_service',
  'privacy_policy',
  'marketing_emails',
  'analytics_tracking',
  'personalization',
  'third_party_sharing',
  'ai_processing',
  'data_retention'
]);

export const legalBasisSchema = z.enum([
  'consent',
  'contract',
  'legal_obligation',
  'vital_interests',
  'public_task',
  'legitimate_interests'
]);

export const consentMethodSchema = z.enum([
  'explicit_opt_in',
  'implicit_acceptance',
  'pre_checked_box',
  'continued_use'
]);

export const userConsentSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  
  // Consent Classification
  consentType: consentTypeSchema,
  
  // Consent Status
  consentGiven: z.boolean(),
  consentVersion: z.string().min(1),
  
  // Legal Basis (GDPR)
  legalBasis: legalBasisSchema.default('consent'),
  
  // Context
  ipAddress: z.string().ip().optional(),
  userAgent: z.string().optional(),
  consentMethod: consentMethodSchema.default('explicit_opt_in'),
  
  // Withdrawal
  withdrawnAt: z.date().optional(),
  withdrawalReason: z.string().optional(),
  
  // Timestamps
  givenAt: z.date(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newUserConsentSchema = userConsentSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  withdrawnAt: true
});

// System Notification Validation Schemas
export const notificationTypeSchema = z.enum([
  'system_maintenance',
  'feature_announcement',
  'security_alert',
  'policy_update',
  'general'
]);

export const prioritySchema = z.enum([
  'low',
  'normal',
  'high',
  'urgent'
]);

export const targetAudienceSchema = z.enum([
  'all_users',
  'subscribers_only',
  'leaders_only',
  'specific_users',
  'organization'
]);

export const displayMethodSchema = z.enum([
  'banner',
  'modal',
  'toast',
  'email',
  'in_app'
]);

export const systemNotificationSchema = z.object({
  id: z.string().uuid(),
  
  // Notification Content
  title: z.string().min(1),
  message: z.string().min(1),
  
  // Classification
  notificationType: notificationTypeSchema,
  
  // Priority & Urgency
  priority: prioritySchema.default('normal'),
  
  // Targeting
  targetAudience: targetAudienceSchema.default('all_users'),
  targetUserIds: z.array(z.string().uuid()).default([]),
  
  // Display Configuration
  displayMethod: displayMethodSchema.default('banner'),
  isDismissible: z.boolean().default(true),
  
  // Scheduling
  scheduledAt: z.date().optional(),
  expiresAt: z.date().optional(),
  
  // Status
  isActive: z.boolean().default(true),
  
  // Actions
  actionUrl: z.string().url().optional(),
  actionText: z.string().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newSystemNotificationSchema = systemNotificationSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  scheduledAt: true,
  expiresAt: true
});

// User Notification Status Validation Schemas
export const notificationStatusSchema = z.enum([
  'sent',
  'delivered',
  'read',
  'dismissed',
  'clicked'
]);

export const userNotificationStatusSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
  
  // Status
  status: notificationStatusSchema,
  
  // Timestamps
  sentAt: z.date().optional(),
  readAt: z.date().optional(),
  dismissedAt: z.date().optional(),
  clickedAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newUserNotificationStatusSchema = userNotificationStatusSchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  sentAt: true,
  readAt: true,
  dismissedAt: true,
  clickedAt: true
});

// API Key Validation Schemas
export const apiKeySchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  
  // Key Details
  name: z.string().min(1),
  keyHash: z.string().min(1),
  keyPrefix: z.string().min(1),
  
  // Permissions & Scope
  scopes: z.array(z.string()).default([]),
  permissions: z.array(z.string()).default([]),
  
  // Usage Limits
  rateLimit: z.number().int().min(1).default(1000), // Requests per hour
  usageCount: z.number().int().min(0).default(0),
  
  // Status
  isActive: z.boolean().default(true),
  
  // Expiration
  expiresAt: z.date().optional(),
  
  // Last Usage
  lastUsedAt: z.date().optional(),
  lastUsedIp: z.string().ip().optional(),
  
  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date()
});

export const newApiKeySchema = apiKeySchema.omit({
  createdAt: true,
  updatedAt: true
}).partial({
  id: true,
  expiresAt: true,
  lastUsedAt: true
});

// Type exports
export type AuditLog = z.infer<typeof auditLogSchema>;
export type NewAuditLog = z.infer<typeof newAuditLogSchema>;
export type FeatureFlag = z.infer<typeof featureFlagSchema>;
export type NewFeatureFlag = z.infer<typeof newFeatureFlagSchema>;
export type UserFeatureFlag = z.infer<typeof userFeatureFlagSchema>;
export type NewUserFeatureFlag = z.infer<typeof newUserFeatureFlagSchema>;
export type UserConsent = z.infer<typeof userConsentSchema>;
export type NewUserConsent = z.infer<typeof newUserConsentSchema>;
export type SystemNotification = z.infer<typeof systemNotificationSchema>;
export type NewSystemNotification = z.infer<typeof newSystemNotificationSchema>;
export type UserNotificationStatus = z.infer<typeof userNotificationStatusSchema>;
export type NewUserNotificationStatus = z.infer<typeof newUserNotificationStatusSchema>;
export type ApiKey = z.infer<typeof apiKeySchema>;
export type NewApiKey = z.infer<typeof newApiKeySchema>;
