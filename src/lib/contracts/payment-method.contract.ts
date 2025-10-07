import { z } from "zod";

// Shared enums
export const PaymentMethodTypeEnum = z.enum([
  "card",
  "bank_account",
  "paypal",
]);

// Ingress (Create/Update DTOs)
export const PaymentMethodCreateSchema = z.object({
  userId: z.string().uuid(),
  type: PaymentMethodTypeEnum,
  last4: z.string().optional(),
  brand: z.string().optional(),
  expiryMonth: z.number().int().min(1).max(12).optional(),
  expiryYear: z.number().int().min(2024).optional(),
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),
  stripePaymentMethodId: z.string().optional(),
});

export const PaymentMethodUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  type: PaymentMethodTypeEnum.optional(),
  last4: z.string().optional(),
  brand: z.string().optional(),
  expiryMonth: z.number().int().min(1).max(12).optional(),
  expiryYear: z.number().int().min(2024).optional(),
  isDefault: z.boolean().optional(),
  isActive: z.boolean().optional(),
  stripePaymentMethodId: z.string().optional(),
});

// Egress (API Response DTO)
export const PaymentMethodResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  type: PaymentMethodTypeEnum,
  last4: z.string().nullable(),
  brand: z.string().nullable(),
  expiryMonth: z.number().int().nullable(),
  expiryYear: z.number().int().nullable(),
  isDefault: z.boolean(),
  isActive: z.boolean(),
  stripePaymentMethodId: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const PaymentMethodListResponseSchema = z.object({
  data: z.array(PaymentMethodResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type PaymentMethodCreate = z.infer<typeof PaymentMethodCreateSchema>;
export type PaymentMethodUpdate = z.infer<typeof PaymentMethodUpdateSchema>;
export type PaymentMethodResponse = z.infer<typeof PaymentMethodResponseSchema>;
export type PaymentMethodListResponse = z.infer<typeof PaymentMethodListResponseSchema>;

