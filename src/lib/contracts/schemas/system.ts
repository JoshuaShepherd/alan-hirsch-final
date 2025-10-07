// Auto-generated contracts for system
// Generated at: 2025-10-06T20:01:40.351Z

import { z } from 'zod';

// Entity validation schema for auditLogs
export const auditLogsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid().nullable(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().nullable(),
  riskLevel: z.string().nullable(),
  oldValues: z.any(),
  newValues: z.any(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  sessionId: z.string().nullable(),
  requestId: z.string().nullable(),
  endpoint: z.string().nullable(),
  httpMethod: z.string().nullable(),
  metadata: z.record(z.string(), z.any()),
  authenticationMethod: z.string().nullable(),
  permissions: z.array(z.string()),
  createdAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for auditLogs
export const createauditLogsSchema = z.object({
  userId: z.string().uuid(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string(),
  riskLevel: z.string(),
  oldValues: z.any().optional(),
  newValues: z.any().optional(),
  ipAddress: z.string(),
  userAgent: z.string(),
  sessionId: z.string(),
  requestId: z.string(),
  endpoint: z.string(),
  httpMethod: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  authenticationMethod: z.string(),
  permissions: z.array(z.string()).optional(),
});

// Update validation schema for auditLogs
export const updateauditLogsSchema = z
  .object({
    userId: z.string().uuid(),
    action: z.string(),
    resource: z.string(),
    resourceId: z.string(),
    riskLevel: z.string(),
    oldValues: z.any().optional(),
    newValues: z.any().optional(),
    ipAddress: z.string(),
    userAgent: z.string(),
    sessionId: z.string(),
    requestId: z.string(),
    endpoint: z.string(),
    httpMethod: z.string(),
    metadata: z.record(z.string(), z.any()).optional(),
    authenticationMethod: z.string(),
    permissions: z.array(z.string()).optional(),
  })
  .partial();

// Query validation schema for auditLogs
export const auditLogsQuerySchema = z.object({
  userId: z.string().uuid(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string(),
  riskLevel: z.string(),
  oldValues: z.any().optional(),
  newValues: z.any().optional(),
  ipAddress: z.string(),
  userAgent: z.string(),
  sessionId: z.string(),
  requestId: z.string(),
  endpoint: z.string(),
  httpMethod: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  authenticationMethod: z.string(),
  permissions: z.array(z.string()).optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for featureFlags
export const featureFlagsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  name: z.string(),
  key: z.string(),
  description: z.string().nullable(),
  flagType: z.string().nullable(),
  defaultValue: z.any(),
  targetingRules: z.any(),
  rolloutPercentage: z.number().int().default(0).nullable(),
  rolloutStrategy: z.string().nullable(),
  environment: z.string().nullable(),
  isActive: z.boolean().default(false).nullable(),
  tags: z.array(z.string()),
  owner: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
  archivedAt: z.string().datetime().nullable(),
});

// Create validation schema for featureFlags
export const createfeatureFlagsSchema = z.object({
  name: z.string(),
  key: z.string(),
  description: z.string(),
  flagType: z.string(),
  defaultValue: z.any().optional(),
  targetingRules: z.any().optional(),
  rolloutPercentage: z.number().int().optional().default(0),
  rolloutStrategy: z.string(),
  environment: z.string(),
  isActive: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional(),
  owner: z.string(),
  archivedAt: z.string().datetime(),
});

// Update validation schema for featureFlags
export const updatefeatureFlagsSchema = z
  .object({
    name: z.string(),
    key: z.string(),
    description: z.string(),
    flagType: z.string(),
    defaultValue: z.any().optional(),
    targetingRules: z.any().optional(),
    rolloutPercentage: z.number().int().optional().default(0),
    rolloutStrategy: z.string(),
    environment: z.string(),
    isActive: z.boolean().optional().default(false),
    tags: z.array(z.string()).optional(),
    owner: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
    archivedAt: z.string().datetime(),
  })
  .partial();

// Query validation schema for featureFlags
export const featureFlagsQuerySchema = z.object({
  name: z.string(),
  key: z.string(),
  description: z.string(),
  flagType: z.string(),
  defaultValue: z.any().optional(),
  targetingRules: z.any().optional(),
  rolloutPercentage: z.number().int().optional().default(0),
  rolloutStrategy: z.string(),
  environment: z.string(),
  isActive: z.boolean().optional().default(false),
  tags: z.array(z.string()).optional(),
  owner: z.string(),
  archivedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for userFeatureFlags
export const userFeatureFlagsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  flagId: z.string().uuid(),
  value: z.any(),
  reason: z.string().nullable(),
  setBy: z.string().uuid().nullable(),
  expiresAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userFeatureFlags
export const createuserFeatureFlagsSchema = z.object({
  userId: z.string().uuid(),
  flagId: z.string().uuid(),
  value: z.any(),
  reason: z.string(),
  setBy: z.string().uuid(),
  expiresAt: z.string().datetime(),
});

// Update validation schema for userFeatureFlags
export const updateuserFeatureFlagsSchema = z
  .object({
    userId: z.string().uuid(),
    flagId: z.string().uuid(),
    value: z.any().optional(),
    reason: z.string(),
    setBy: z.string().uuid(),
    expiresAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userFeatureFlags
export const userFeatureFlagsQuerySchema = z.object({
  userId: z.string().uuid(),
  flagId: z.string().uuid(),
  value: z.any().optional(),
  reason: z.string(),
  setBy: z.string().uuid(),
  expiresAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for userConsents
export const userConsentsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  consentType: z.string().nullable(),
  consentGiven: z.boolean(),
  consentVersion: z.string(),
  legalBasis: z.string().nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  consentMethod: z.string().nullable(),
  withdrawnAt: z.string().datetime().nullable(),
  withdrawalReason: z.string().nullable(),
  givenAt: z.string().datetime().default('NOW()'),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userConsents
export const createuserConsentsSchema = z.object({
  userId: z.string().uuid(),
  consentType: z.string(),
  consentGiven: z.boolean(),
  consentVersion: z.string(),
  legalBasis: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  consentMethod: z.string(),
  withdrawnAt: z.string().datetime(),
  withdrawalReason: z.string(),
  givenAt: z.string().datetime().default('NOW()'),
});

// Update validation schema for userConsents
export const updateuserConsentsSchema = z
  .object({
    userId: z.string().uuid(),
    consentType: z.string(),
    consentGiven: z.boolean(),
    consentVersion: z.string(),
    legalBasis: z.string(),
    ipAddress: z.string(),
    userAgent: z.string(),
    consentMethod: z.string(),
    withdrawnAt: z.string().datetime(),
    withdrawalReason: z.string(),
    givenAt: z.string().datetime().optional().default('NOW()'),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userConsents
export const userConsentsQuerySchema = z.object({
  userId: z.string().uuid(),
  consentType: z.string(),
  consentGiven: z.boolean(),
  consentVersion: z.string(),
  legalBasis: z.string(),
  ipAddress: z.string(),
  userAgent: z.string(),
  consentMethod: z.string(),
  withdrawnAt: z.string().datetime(),
  withdrawalReason: z.string(),
  givenAt: z.string().datetime().optional().default('NOW()'),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for systemNotifications
export const systemNotificationsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  title: z.string(),
  message: z.string(),
  notificationType: z.enum(['email', 'push', 'in_app', 'sms']).nullable(),
  priority: z.string().nullable(),
  targetAudience: z.string().nullable(),
  targetUserIds: z.any(),
  displayMethod: z.string().nullable(),
  isDismissible: z.boolean().default(true).nullable(),
  scheduledAt: z.string().datetime().nullable(),
  expiresAt: z.string().datetime().nullable(),
  isActive: z.boolean().default(true).nullable(),
  actionUrl: z.string().nullable(),
  actionText: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for systemNotifications
export const createsystemNotificationsSchema = z.object({
  title: z.string(),
  message: z.string(),
  notificationType: z.enum(['email', 'push', 'in_app', 'sms']),
  priority: z.string(),
  targetAudience: z.string(),
  targetUserIds: z.any().optional(),
  displayMethod: z.string(),
  isDismissible: z.boolean().optional().default(true),
  scheduledAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  isActive: z.boolean().optional().default(true),
  actionUrl: z.string(),
  actionText: z.string(),
});

// Update validation schema for systemNotifications
export const updatesystemNotificationsSchema = z
  .object({
    title: z.string(),
    message: z.string(),
    notificationType: z.enum(['email', 'push', 'in_app', 'sms']),
    priority: z.string(),
    targetAudience: z.string(),
    targetUserIds: z.any().optional(),
    displayMethod: z.string(),
    isDismissible: z.boolean().optional().default(true),
    scheduledAt: z.string().datetime(),
    expiresAt: z.string().datetime(),
    isActive: z.boolean().optional().default(true),
    actionUrl: z.string(),
    actionText: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for systemNotifications
export const systemNotificationsQuerySchema = z.object({
  title: z.string(),
  message: z.string(),
  notificationType: z.enum(['email', 'push', 'in_app', 'sms']),
  priority: z.string(),
  targetAudience: z.string(),
  targetUserIds: z.any().optional(),
  displayMethod: z.string(),
  isDismissible: z.boolean().optional().default(true),
  scheduledAt: z.string().datetime(),
  expiresAt: z.string().datetime(),
  isActive: z.boolean().optional().default(true),
  actionUrl: z.string(),
  actionText: z.string(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for userNotificationStatus
export const userNotificationStatusEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  sentAt: z.string().datetime().nullable(),
  readAt: z.string().datetime().nullable(),
  dismissedAt: z.string().datetime().nullable(),
  clickedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userNotificationStatus
export const createuserNotificationStatusSchema = z.object({
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  sentAt: z.string().datetime(),
  readAt: z.string().datetime(),
  dismissedAt: z.string().datetime(),
  clickedAt: z.string().datetime(),
});

// Update validation schema for userNotificationStatus
export const updateuserNotificationStatusSchema = z
  .object({
    userId: z.string().uuid(),
    notificationId: z.string().uuid(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    sentAt: z.string().datetime(),
    readAt: z.string().datetime(),
    dismissedAt: z.string().datetime(),
    clickedAt: z.string().datetime(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userNotificationStatus
export const userNotificationStatusQuerySchema = z.object({
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  sentAt: z.string().datetime(),
  readAt: z.string().datetime(),
  dismissedAt: z.string().datetime(),
  clickedAt: z.string().datetime(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for apiKeys
export const apiKeysEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid().nullable(),
  name: z.string(),
  keyHash: z.string(),
  keyPrefix: z.string(),
  scopes: z.any(),
  permissions: z.array(z.string()),
  rateLimit: z.number().int().default(1000).nullable(),
  usageCount: z.number().int().default(0).nullable(),
  isActive: z.boolean().default(true).nullable(),
  expiresAt: z.string().datetime().nullable(),
  lastUsedAt: z.string().datetime().nullable(),
  lastUsedIp: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for apiKeys
export const createapiKeysSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  keyHash: z.string(),
  keyPrefix: z.string(),
  scopes: z.any().optional(),
  permissions: z.array(z.string()).optional(),
  rateLimit: z.number().int().optional().default(1000),
  usageCount: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
  expiresAt: z.string().datetime(),
  lastUsedAt: z.string().datetime(),
  lastUsedIp: z.string(),
});

// Update validation schema for apiKeys
export const updateapiKeysSchema = z
  .object({
    userId: z.string().uuid(),
    name: z.string(),
    keyHash: z.string(),
    keyPrefix: z.string(),
    scopes: z.any().optional(),
    permissions: z.array(z.string()).optional(),
    rateLimit: z.number().int().optional().default(1000),
    usageCount: z.number().int().optional().default(0),
    isActive: z.boolean().optional().default(true),
    expiresAt: z.string().datetime(),
    lastUsedAt: z.string().datetime(),
    lastUsedIp: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for apiKeys
export const apiKeysQuerySchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  keyHash: z.string(),
  keyPrefix: z.string(),
  scopes: z.any().optional(),
  permissions: z.array(z.string()).optional(),
  rateLimit: z.number().int().optional().default(1000),
  usageCount: z.number().int().optional().default(0),
  isActive: z.boolean().optional().default(true),
  expiresAt: z.string().datetime(),
  lastUsedAt: z.string().datetime(),
  lastUsedIp: z.string(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
