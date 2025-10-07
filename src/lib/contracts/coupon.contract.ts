import { z } from "zod";

// Shared enums
export const DiscountTypeEnum = z.enum([
  "percentage",
  "fixed_amount",
]);

// Ingress (Create/Update DTOs)
export const CouponCreateSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  discountType: DiscountTypeEnum,
  discountValue: z.number().min(0),
  currency: z.string().default("USD"),
  maxUses: z.number().int().min(1).optional(),
  usedCount: z.number().int().min(0).default(0),
  maxUsesPerUser: z.number().int().min(1).default(1),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().optional(),
  minimumAmount: z.number().min(0).optional(),
  applicablePlans: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
  stripeCouponId: z.string().optional(),
});

export const CouponUpdateSchema = z.object({
  id: z.string().uuid(),
  code: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  discountType: DiscountTypeEnum.optional(),
  discountValue: z.number().min(0).optional(),
  currency: z.string().optional(),
  maxUses: z.number().int().min(1).optional(),
  usedCount: z.number().int().min(0).optional(),
  maxUsesPerUser: z.number().int().min(1).optional(),
  validFrom: z.string().datetime().optional(),
  validUntil: z.string().datetime().optional(),
  minimumAmount: z.number().min(0).optional(),
  applicablePlans: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  stripeCouponId: z.string().optional(),
});

// Egress (API Response DTO)
export const CouponResponseSchema = z.object({
  id: z.string().uuid(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  discountType: DiscountTypeEnum,
  discountValue: z.number(),
  currency: z.string(),
  maxUses: z.number().int().nullable(),
  usedCount: z.number().int(),
  maxUsesPerUser: z.number().int(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().nullable(),
  minimumAmount: z.number().nullable(),
  applicablePlans: z.array(z.string()),
  isActive: z.boolean(),
  stripeCouponId: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const CouponListResponseSchema = z.object({
  data: z.array(CouponResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type CouponCreate = z.infer<typeof CouponCreateSchema>;
export type CouponUpdate = z.infer<typeof CouponUpdateSchema>;
export type CouponResponse = z.infer<typeof CouponResponseSchema>;
export type CouponListResponse = z.infer<typeof CouponListResponseSchema>;

