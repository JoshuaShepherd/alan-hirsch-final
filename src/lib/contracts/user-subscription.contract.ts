import { z } from "zod";

// Shared enums
export const SubscriptionStatusEnum = z.enum([
  "active",
  "cancelled",
  "past_due",
  "unpaid",
  "trialing",
  "paused",
]);

export const BillingCycleEnum = z.enum([
  "monthly",
  "annual",
]);

// Ingress (Create/Update DTOs)
export const UserSubscriptionCreateSchema = z.object({
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  status: SubscriptionStatusEnum,
  amount: z.number().min(0),
  currency: z.string().default("USD"),
  billingCycle: BillingCycleEnum,
  aiInteractionsUsed: z.number().int().min(0).default(0),
  aiInteractionsLimit: z.number().int().min(0).optional(),
  storageUsed: z.number().int().min(0).default(0),
  trialEndsAt: z.string().datetime().optional(),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  cancelledAt: z.string().datetime().optional(),
  cancellationReason: z.string().optional(),
  cancelAtPeriodEnd: z.boolean().default(false),
  stripeSubscriptionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
});

export const UserSubscriptionUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  planId: z.string().uuid().optional(),
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  status: SubscriptionStatusEnum.optional(),
  amount: z.number().min(0).optional(),
  currency: z.string().optional(),
  billingCycle: BillingCycleEnum.optional(),
  aiInteractionsUsed: z.number().int().min(0).optional(),
  aiInteractionsLimit: z.number().int().min(0).optional(),
  storageUsed: z.number().int().min(0).optional(),
  trialEndsAt: z.string().datetime().optional(),
  currentPeriodStart: z.string().datetime().optional(),
  currentPeriodEnd: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  cancellationReason: z.string().optional(),
  cancelAtPeriodEnd: z.boolean().optional(),
  stripeSubscriptionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),
});

// Egress (API Response DTO)
export const UserSubscriptionResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  leaderProfileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  status: SubscriptionStatusEnum,
  amount: z.number(),
  currency: z.string(),
  billingCycle: BillingCycleEnum,
  aiInteractionsUsed: z.number().int(),
  aiInteractionsLimit: z.number().int().nullable(),
  storageUsed: z.number().int(),
  trialEndsAt: z.string().datetime().nullable(),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  cancelledAt: z.string().datetime().nullable(),
  cancellationReason: z.string().nullable(),
  cancelAtPeriodEnd: z.boolean(),
  stripeSubscriptionId: z.string().nullable(),
  stripeCustomerId: z.string().nullable(),
  monthsSubscribed: z.number().int(),
  totalRevenue: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserSubscriptionListResponseSchema = z.object({
  data: z.array(UserSubscriptionResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserSubscriptionCreate = z.infer<typeof UserSubscriptionCreateSchema>;
export type UserSubscriptionUpdate = z.infer<typeof UserSubscriptionUpdateSchema>;
export type UserSubscriptionResponse = z.infer<typeof UserSubscriptionResponseSchema>;
export type UserSubscriptionListResponse = z.infer<typeof UserSubscriptionListResponseSchema>;

