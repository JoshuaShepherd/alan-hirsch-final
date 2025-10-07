import { z } from "zod";

// Shared enums
export const FlagTypeEnum = z.enum([
  "boolean",
  "string",
  "number",
  "json",
]);

export const RolloutStrategyEnum = z.enum([
  "percentage",
  "user_list",
  "attribute_based",
  "gradual",
]);

export const EnvironmentEnum = z.enum([
  "development",
  "staging",
  "production",
]);

// Ingress (Create/Update DTOs)
export const FeatureFlagCreateSchema = z.object({
  name: z.string(),
  key: z.string(),
  description: z.string().optional(),
  flagType: FlagTypeEnum.default("boolean"),
  defaultValue: z.unknown().default(false),
  targetingRules: z.array(z.object({
    conditions: z.array(z.object({
      attribute: z.string(),
      operator: z.string(),
      value: z.unknown(),
    })),
    value: z.unknown(),
  })).default([]),
  rolloutPercentage: z.number().int().min(0).max(100).default(0),
  rolloutStrategy: RolloutStrategyEnum.default("percentage"),
  environment: EnvironmentEnum.default("development"),
  isActive: z.boolean().default(false),
  tags: z.array(z.string()).default([]),
  owner: z.string().optional(),
});

export const FeatureFlagUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  key: z.string().optional(),
  description: z.string().optional(),
  flagType: FlagTypeEnum.optional(),
  defaultValue: z.unknown().optional(),
  targetingRules: z.array(z.object({
    conditions: z.array(z.object({
      attribute: z.string(),
      operator: z.string(),
      value: z.unknown(),
    })),
    value: z.unknown(),
  })).optional(),
  rolloutPercentage: z.number().int().min(0).max(100).optional(),
  rolloutStrategy: RolloutStrategyEnum.optional(),
  environment: EnvironmentEnum.optional(),
  isActive: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  owner: z.string().optional(),
});

// Egress (API Response DTO)
export const FeatureFlagResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  key: z.string(),
  description: z.string().nullable(),
  flagType: FlagTypeEnum,
  defaultValue: z.unknown(),
  targetingRules: z.array(z.object({
    conditions: z.array(z.object({
      attribute: z.string(),
      operator: z.string(),
      value: z.unknown(),
    })),
    value: z.unknown(),
  })),
  rolloutPercentage: z.number().int(),
  rolloutStrategy: RolloutStrategyEnum,
  environment: EnvironmentEnum,
  isActive: z.boolean(),
  tags: z.array(z.string()),
  owner: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  archivedAt: z.string().datetime().nullable(),
});

// List envelope (standardized)
export const FeatureFlagListResponseSchema = z.object({
  data: z.array(FeatureFlagResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type FeatureFlagCreate = z.infer<typeof FeatureFlagCreateSchema>;
export type FeatureFlagUpdate = z.infer<typeof FeatureFlagUpdateSchema>;
export type FeatureFlagResponse = z.infer<typeof FeatureFlagResponseSchema>;
export type FeatureFlagListResponse = z.infer<typeof FeatureFlagListResponseSchema>;

