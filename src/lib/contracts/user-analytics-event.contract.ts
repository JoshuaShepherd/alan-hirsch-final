import { z } from "zod";

// Shared enums
export const EventTypeEnum = z.enum([
  "page_view",
  "content_view",
  "content_interaction",
  "search",
  "assessment_start",
  "assessment_complete",
  "ai_conversation",
  "community_post",
  "subscription_event",
  "error",
]);

export const DeviceTypeEnum = z.enum([
  "desktop",
  "tablet",
  "mobile",
  "other",
]);

// Ingress (Create/Update DTOs)
export const UserAnalyticsEventCreateSchema = z.object({
  userId: z.string().uuid().optional(),
  eventType: EventTypeEnum,
  eventCategory: z.string().optional(),
  eventAction: z.string(),
  eventLabel: z.string().optional(),
  pageUrl: z.string().url().optional(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  contentId: z.string().uuid().optional(),
  contentType: z.string().optional(),
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  communityId: z.string().uuid().optional(),
  sessionId: z.string().optional(),
  sessionDuration: z.number().int().min(0).optional(),
  timeOnPage: z.number().int().min(0).optional(),
  scrollDepth: z.number().int().min(0).max(100).optional(),
  clickCount: z.number().int().min(0).default(0),
  apestProfile: z.object({
    primary: z.string(),
    scores: z.record(z.string(), z.number()),
  }).optional(),
  ministryContext: z.object({
    role: z.string(),
    experience: z.number(),
  }).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  deviceType: DeviceTypeEnum.optional(),
  browserName: z.string().optional(),
  operatingSystem: z.string().optional(),
  screenResolution: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  timezone: z.string().optional(),
  properties: z.record(z.unknown()).default({}),
});

export const UserAnalyticsEventUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  eventType: EventTypeEnum.optional(),
  eventCategory: z.string().optional(),
  eventAction: z.string().optional(),
  eventLabel: z.string().optional(),
  pageUrl: z.string().url().optional(),
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  contentId: z.string().uuid().optional(),
  contentType: z.string().optional(),
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  communityId: z.string().uuid().optional(),
  sessionId: z.string().optional(),
  sessionDuration: z.number().int().min(0).optional(),
  timeOnPage: z.number().int().min(0).optional(),
  scrollDepth: z.number().int().min(0).max(100).optional(),
  clickCount: z.number().int().min(0).optional(),
  apestProfile: z.object({
    primary: z.string(),
    scores: z.record(z.string(), z.number()),
  }).optional(),
  ministryContext: z.object({
    role: z.string(),
    experience: z.number(),
  }).optional(),
  utmSource: z.string().optional(),
  utmMedium: z.string().optional(),
  utmCampaign: z.string().optional(),
  utmTerm: z.string().optional(),
  utmContent: z.string().optional(),
  deviceType: DeviceTypeEnum.optional(),
  browserName: z.string().optional(),
  operatingSystem: z.string().optional(),
  screenResolution: z.string().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  timezone: z.string().optional(),
  properties: z.record(z.unknown()).optional(),
});

// Egress (API Response DTO)
export const UserAnalyticsEventResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  eventType: EventTypeEnum,
  eventCategory: z.string().nullable(),
  eventAction: z.string(),
  eventLabel: z.string().nullable(),
  pageUrl: z.string().nullable(),
  referrer: z.string().nullable(),
  userAgent: z.string().nullable(),
  ipAddress: z.string().nullable(),
  contentId: z.string().uuid().nullable(),
  contentType: z.string().nullable(),
  leaderProfileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  communityId: z.string().uuid().nullable(),
  sessionId: z.string().nullable(),
  sessionDuration: z.number().int().nullable(),
  timeOnPage: z.number().int().nullable(),
  scrollDepth: z.number().int().nullable(),
  clickCount: z.number().int(),
  apestProfile: z.object({
    primary: z.string(),
    scores: z.record(z.string(), z.number()),
  }).nullable(),
  ministryContext: z.object({
    role: z.string(),
    experience: z.number(),
  }).nullable(),
  utmSource: z.string().nullable(),
  utmMedium: z.string().nullable(),
  utmCampaign: z.string().nullable(),
  utmTerm: z.string().nullable(),
  utmContent: z.string().nullable(),
  deviceType: DeviceTypeEnum.nullable(),
  browserName: z.string().nullable(),
  operatingSystem: z.string().nullable(),
  screenResolution: z.string().nullable(),
  country: z.string().nullable(),
  region: z.string().nullable(),
  city: z.string().nullable(),
  timezone: z.string().nullable(),
  properties: z.record(z.unknown()),
  createdAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserAnalyticsEventListResponseSchema = z.object({
  data: z.array(UserAnalyticsEventResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserAnalyticsEventCreate = z.infer<typeof UserAnalyticsEventCreateSchema>;
export type UserAnalyticsEventUpdate = z.infer<typeof UserAnalyticsEventUpdateSchema>;
export type UserAnalyticsEventResponse = z.infer<typeof UserAnalyticsEventResponseSchema>;
export type UserAnalyticsEventListResponse = z.infer<typeof UserAnalyticsEventListResponseSchema>;

