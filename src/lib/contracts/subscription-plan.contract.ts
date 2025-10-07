import { z } from "zod";

// Shared enums
export const PlanTypeEnum = z.enum([
  "free",
  "individual",
  "professional",
  "leader",
  "institutional",
  "enterprise",
]);

export const ContentAccessLevelEnum = z.enum([
  "free",
  "premium",
  "vip",
  "leader",
  "all",
]);

// Ingress (Create/Update DTOs)
export const SubscriptionPlanCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  planType: PlanTypeEnum,
  priceMonthly: z.number().min(0).optional(),
  priceAnnual: z.number().min(0).optional(),
  currency: z.string().default("USD"),
  contentAccessLevel: ContentAccessLevelEnum,
  features: z.object({
    contentLimit: z.number().nullable().optional(),
    aiInteractions: z.number(),
    communityAccess: z.boolean(),
    collaborationTools: z.boolean(),
    analytics: z.boolean(),
    customBranding: z.boolean(),
    apiAccess: z.boolean(),
    prioritySupport: z.boolean(),
    downloadContent: z.boolean(),
    offlineAccess: z.boolean(),
  }),
  maxUsers: z.number().int().min(1).default(1),
  storageLimit: z.number().int().min(0).optional(),
  bandwidthLimit: z.number().int().min(0).optional(),
  stripeProductId: z.string().optional(),
  stripePriceIdMonthly: z.string().optional(),
  stripePriceIdAnnual: z.string().optional(),
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  trialDays: z.number().int().min(0).default(0),
});

export const SubscriptionPlanUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  planType: PlanTypeEnum.optional(),
  priceMonthly: z.number().min(0).optional(),
  priceAnnual: z.number().min(0).optional(),
  currency: z.string().optional(),
  contentAccessLevel: ContentAccessLevelEnum.optional(),
  features: z.object({
    contentLimit: z.number().nullable().optional(),
    aiInteractions: z.number(),
    communityAccess: z.boolean(),
    collaborationTools: z.boolean(),
    analytics: z.boolean(),
    customBranding: z.boolean(),
    apiAccess: z.boolean(),
    prioritySupport: z.boolean(),
    downloadContent: z.boolean(),
    offlineAccess: z.boolean(),
  }).optional(),
  maxUsers: z.number().int().min(1).optional(),
  storageLimit: z.number().int().min(0).optional(),
  bandwidthLimit: z.number().int().min(0).optional(),
  stripeProductId: z.string().optional(),
  stripePriceIdMonthly: z.string().optional(),
  stripePriceIdAnnual: z.string().optional(),
  isActive: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  sortOrder: z.number().int().min(0).optional(),
  trialDays: z.number().int().min(0).optional(),
});

// Egress (API Response DTO)
export const SubscriptionPlanResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  planType: PlanTypeEnum,
  priceMonthly: z.number().nullable(),
  priceAnnual: z.number().nullable(),
  currency: z.string(),
  contentAccessLevel: ContentAccessLevelEnum,
  features: z.object({
    contentLimit: z.number().nullable(),
    aiInteractions: z.number(),
    communityAccess: z.boolean(),
    collaborationTools: z.boolean(),
    analytics: z.boolean(),
    customBranding: z.boolean(),
    apiAccess: z.boolean(),
    prioritySupport: z.boolean(),
    downloadContent: z.boolean(),
    offlineAccess: z.boolean(),
  }),
  maxUsers: z.number().int(),
  storageLimit: z.number().int().nullable(),
  bandwidthLimit: z.number().int().nullable(),
  stripeProductId: z.string().nullable(),
  stripePriceIdMonthly: z.string().nullable(),
  stripePriceIdAnnual: z.string().nullable(),
  isActive: z.boolean(),
  isPopular: z.boolean(),
  sortOrder: z.number().int(),
  trialDays: z.number().int(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const SubscriptionPlanListResponseSchema = z.object({
  data: z.array(SubscriptionPlanResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type SubscriptionPlanCreate = z.infer<typeof SubscriptionPlanCreateSchema>;
export type SubscriptionPlanUpdate = z.infer<typeof SubscriptionPlanUpdateSchema>;
export type SubscriptionPlanResponse = z.infer<typeof SubscriptionPlanResponseSchema>;
export type SubscriptionPlanListResponse = z.infer<typeof SubscriptionPlanListResponseSchema>;

