import { z } from "zod";

// Shared enums
export const NotificationStatusEnum = z.enum([
  "sent",
  "delivered",
  "read",
  "dismissed",
  "clicked",
]);

// Ingress (Create/Update DTOs)
export const UserNotificationStatusCreateSchema = z.object({
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: NotificationStatusEnum,
  sentAt: z.string().datetime().optional(),
  readAt: z.string().datetime().optional(),
  dismissedAt: z.string().datetime().optional(),
  clickedAt: z.string().datetime().optional(),
});

export const UserNotificationStatusUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  notificationId: z.string().uuid().optional(),
  status: NotificationStatusEnum.optional(),
  sentAt: z.string().datetime().optional(),
  readAt: z.string().datetime().optional(),
  dismissedAt: z.string().datetime().optional(),
  clickedAt: z.string().datetime().optional(),
});

// Egress (API Response DTO)
export const UserNotificationStatusResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  notificationId: z.string().uuid(),
  status: NotificationStatusEnum,
  sentAt: z.string().datetime().nullable(),
  readAt: z.string().datetime().nullable(),
  dismissedAt: z.string().datetime().nullable(),
  clickedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserNotificationStatusListResponseSchema = z.object({
  data: z.array(UserNotificationStatusResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserNotificationStatusCreate = z.infer<typeof UserNotificationStatusCreateSchema>;
export type UserNotificationStatusUpdate = z.infer<typeof UserNotificationStatusUpdateSchema>;
export type UserNotificationStatusResponse = z.infer<typeof UserNotificationStatusResponseSchema>;
export type UserNotificationStatusListResponse = z.infer<typeof UserNotificationStatusListResponseSchema>;

