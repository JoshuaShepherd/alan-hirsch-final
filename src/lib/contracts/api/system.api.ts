// Auto-generated API contracts for system
// Generated at: 2025-10-06T20:01:40.351Z

import { z } from 'zod';
import {
  auditLogsEntitySchema,
  createauditLogsSchema,
  updateauditLogsSchema,
  auditLogsQuerySchema,
  featureFlagsEntitySchema,
  createfeatureFlagsSchema,
  updatefeatureFlagsSchema,
  featureFlagsQuerySchema,
  userFeatureFlagsEntitySchema,
  createuserFeatureFlagsSchema,
  updateuserFeatureFlagsSchema,
  userFeatureFlagsQuerySchema,
  userConsentsEntitySchema,
  createuserConsentsSchema,
  updateuserConsentsSchema,
  userConsentsQuerySchema,
  systemNotificationsEntitySchema,
  createsystemNotificationsSchema,
  updatesystemNotificationsSchema,
  systemNotificationsQuerySchema,
  userNotificationStatusEntitySchema,
  createuserNotificationStatusSchema,
  updateuserNotificationStatusSchema,
  userNotificationStatusQuerySchema,
  apiKeysEntitySchema,
  createapiKeysSchema,
  updateapiKeysSchema,
  apiKeysQuerySchema,
} from '../schemas/system';

// API schemas for system
// API request/response schemas for auditLogs
export const auditLogsApiRequestSchema = createauditLogsSchema;
export const auditLogsApiResponseSchema = auditLogsEntitySchema;
export const auditLogsApiUpdateSchema = updateauditLogsSchema;
export const auditLogsApiQuerySchema = auditLogsQuerySchema;

// API request/response schemas for featureFlags
export const featureFlagsApiRequestSchema = createfeatureFlagsSchema;
export const featureFlagsApiResponseSchema = featureFlagsEntitySchema;
export const featureFlagsApiUpdateSchema = updatefeatureFlagsSchema;
export const featureFlagsApiQuerySchema = featureFlagsQuerySchema;

// API request/response schemas for userFeatureFlags
export const userFeatureFlagsApiRequestSchema = createuserFeatureFlagsSchema;
export const userFeatureFlagsApiResponseSchema = userFeatureFlagsEntitySchema;
export const userFeatureFlagsApiUpdateSchema = updateuserFeatureFlagsSchema;
export const userFeatureFlagsApiQuerySchema = userFeatureFlagsQuerySchema;

// API request/response schemas for userConsents
export const userConsentsApiRequestSchema = createuserConsentsSchema;
export const userConsentsApiResponseSchema = userConsentsEntitySchema;
export const userConsentsApiUpdateSchema = updateuserConsentsSchema;
export const userConsentsApiQuerySchema = userConsentsQuerySchema;

// API request/response schemas for systemNotifications
export const systemNotificationsApiRequestSchema = createsystemNotificationsSchema;
export const systemNotificationsApiResponseSchema = systemNotificationsEntitySchema;
export const systemNotificationsApiUpdateSchema = updatesystemNotificationsSchema;
export const systemNotificationsApiQuerySchema = systemNotificationsQuerySchema;

// API request/response schemas for userNotificationStatus
export const userNotificationStatusApiRequestSchema = createuserNotificationStatusSchema;
export const userNotificationStatusApiResponseSchema = userNotificationStatusEntitySchema;
export const userNotificationStatusApiUpdateSchema = updateuserNotificationStatusSchema;
export const userNotificationStatusApiQuerySchema = userNotificationStatusQuerySchema;

// API request/response schemas for apiKeys
export const apiKeysApiRequestSchema = createapiKeysSchema;
export const apiKeysApiResponseSchema = apiKeysEntitySchema;
export const apiKeysApiUpdateSchema = updateapiKeysSchema;
export const apiKeysApiQuerySchema = apiKeysQuerySchema;

