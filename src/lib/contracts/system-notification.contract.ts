import { z } from "zod";

// Shared enums
export const NotificationTypeEnum = z.enum([
  "system_maintenance",
  "feature_announcement",
  "security_alert",
  "policy_update",
  "general",
]);

export const PriorityEnum = z.enum([
  "low",
  "normal",
  "high",
  "urgent",
]);

export const TargetAudienceEnum = z.enum([
  "all_users",
  "subscribers_only",
  "leaders_only",
  "specific_users",
  "organization",
]);

export const DisplayMethodEnum = z.enum([
  "banner",
  "modal",
  "toast",
  "email",
  "in_app",
]);

// Ingress (Create/Update DTOs)
export const SystemNotificationCreateSchema = z.object({
  title: z.string(),
  message: z.string(),
  notificationType: NotificationTypeEnum,
  priority: PriorityEnum.default("normal"),
  targetAudience: TargetAudienceEnum.default("all_users"),
  targetUserIds: z.array(z.string()).default([]),
  displayMethod: DisplayMethodEnum.default("banner"),
  isDismissible: z.boolean().default(true),
  scheduledAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isActive: z.boolean().default(true),
  actionUrl: z.string().url().optional(),
  actionText: z.string().optional(),
});

export const SystemNotificationUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  message: z.string().optional(),
  notificationType: NotificationTypeEnum.optional(),
  priority: PriorityEnum.optional(),
  targetAudience: TargetAudienceEnum.optional(),
  targetUserIds: z.array(z.string()).optional(),
  displayMethod: DisplayMethodEnum.optional(),
  isDismissible: z.boolean().optional(),
  scheduledAt: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
  isActive: z.boolean().optional(),
  actionUrl: z.string().url().optional(),
  actionText: z.string().optional(),
});

// Egress (API Response DTO)
export const SystemNotificationResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  notificationType: NotificationTypeEnum,
  priority: PriorityEnum,
  targetAudience: TargetAudienceEnum,
  targetUserIds: z.array(z.string()),
  displayMethod: DisplayMethodEnum,
  isDismissible: z.boolean(),
  scheduledAt: z.string().datetime().nullable(),
  expiresAt: z.string().datetime().nullable(),
  isActive: z.boolean(),
  actionUrl: z.string().nullable(),
  actionText: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const SystemNotificationListResponseSchema = z.object({
  data: z.array(SystemNotificationResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type SystemNotificationCreate = z.infer<typeof SystemNotificationCreateSchema>;
export type SystemNotificationUpdate = z.infer<typeof SystemNotificationUpdateSchema>;
export type SystemNotificationResponse = z.infer<typeof SystemNotificationResponseSchema>;
export type SystemNotificationListResponse = z.infer<typeof SystemNotificationListResponseSchema>;

