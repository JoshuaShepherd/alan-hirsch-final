import { z } from "zod";

// Ingress (Create/Update DTOs)
export const UserFeatureFlagCreateSchema = z.object({
  userId: z.string().uuid(),
  flagId: z.string().uuid(),
  value: z.unknown(),
  reason: z.string().optional(),
  setBy: z.string().uuid().optional(),
  expiresAt: z.string().datetime().optional(),
});

export const UserFeatureFlagUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  flagId: z.string().uuid().optional(),
  value: z.unknown().optional(),
  reason: z.string().optional(),
  setBy: z.string().uuid().optional(),
  expiresAt: z.string().datetime().optional(),
});

// Egress (API Response DTO)
export const UserFeatureFlagResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  flagId: z.string().uuid(),
  value: z.unknown(),
  reason: z.string().nullable(),
  setBy: z.string().uuid().nullable(),
  expiresAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserFeatureFlagListResponseSchema = z.object({
  data: z.array(UserFeatureFlagResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserFeatureFlagCreate = z.infer<typeof UserFeatureFlagCreateSchema>;
export type UserFeatureFlagUpdate = z.infer<typeof UserFeatureFlagUpdateSchema>;
export type UserFeatureFlagResponse = z.infer<typeof UserFeatureFlagResponseSchema>;
export type UserFeatureFlagListResponse = z.infer<typeof UserFeatureFlagListResponseSchema>;

