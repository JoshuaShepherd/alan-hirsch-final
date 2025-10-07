import { z } from "zod";

// Shared enums
export const TransactionTypeEnum = z.enum([
  "subscription",
  "one_time_purchase",
  "refund",
  "chargeback",
  "credit",
]);

export const TransactionStatusEnum = z.enum([
  "pending",
  "succeeded",
  "failed",
  "cancelled",
  "refunded",
]);

export const PaymentMethodEnum = z.enum([
  "card",
  "bank_transfer",
  "paypal",
  "other",
]);

// Ingress (Create/Update DTOs)
export const TransactionCreateSchema = z.object({
  userId: z.string().uuid(),
  subscriptionId: z.string().uuid().optional(),
  transactionType: TransactionTypeEnum,
  grossAmount: z.number().min(0),
  platformFee: z.number().min(0),
  leaderAmount: z.number().min(0),
  currency: z.string().default("USD"),
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  attributedToNetworkEffect: z.boolean().default(false),
  networkAmplificationFactor: z.number().min(0).max(2).default(1.0),
  status: TransactionStatusEnum.default("pending"),
  paymentStatus: TransactionStatusEnum.default("pending"),
  paymentMethod: PaymentMethodEnum.optional(),
  stripePaymentIntentId: z.string().optional(),
  stripeChargeId: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).default({}),
});

export const TransactionUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  subscriptionId: z.string().uuid().optional(),
  transactionType: TransactionTypeEnum.optional(),
  grossAmount: z.number().min(0).optional(),
  platformFee: z.number().min(0).optional(),
  leaderAmount: z.number().min(0).optional(),
  currency: z.string().optional(),
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  attributedToNetworkEffect: z.boolean().optional(),
  networkAmplificationFactor: z.number().min(0).max(2).optional(),
  status: TransactionStatusEnum.optional(),
  paymentStatus: TransactionStatusEnum.optional(),
  paymentMethod: PaymentMethodEnum.optional(),
  stripePaymentIntentId: z.string().optional(),
  stripeChargeId: z.string().optional(),
  description: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

// Egress (API Response DTO)
export const TransactionResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  subscriptionId: z.string().uuid().nullable(),
  transactionType: TransactionTypeEnum,
  grossAmount: z.number(),
  platformFee: z.number(),
  leaderAmount: z.number(),
  currency: z.string(),
  leaderProfileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  attributedToNetworkEffect: z.boolean(),
  networkAmplificationFactor: z.number(),
  status: TransactionStatusEnum,
  paymentStatus: TransactionStatusEnum,
  paymentMethod: PaymentMethodEnum.nullable(),
  stripePaymentIntentId: z.string().nullable(),
  stripeChargeId: z.string().nullable(),
  description: z.string().nullable(),
  metadata: z.record(z.unknown()),
  processedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const TransactionListResponseSchema = z.object({
  data: z.array(TransactionResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type TransactionCreate = z.infer<typeof TransactionCreateSchema>;
export type TransactionUpdate = z.infer<typeof TransactionUpdateSchema>;
export type TransactionResponse = z.infer<typeof TransactionResponseSchema>;
export type TransactionListResponse = z.infer<typeof TransactionListResponseSchema>;

