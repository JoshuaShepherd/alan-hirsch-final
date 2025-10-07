import { z } from "zod";

// Ingress (Create/Update DTOs)
export const ApiKeyCreateSchema = z.object({
  userId: z.string().uuid().optional(),
  name: z.string(),
  keyHash: z.string(),
  keyPrefix: z.string(),
  scopes: z.array(z.string()).default([]),
  permissions: z.array(z.string()).default([]),
  rateLimit: z.number().int().min(1).default(1000),
  usageCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  expiresAt: z.string().datetime().optional(),
  lastUsedAt: z.string().datetime().optional(),
  lastUsedIp: z.string().optional(),
});

export const ApiKeyUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  name: z.string().optional(),
  keyHash: z.string().optional(),
  keyPrefix: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  permissions: z.array(z.string()).optional(),
  rateLimit: z.number().int().min(1).optional(),
  usageCount: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().datetime().optional(),
  lastUsedAt: z.string().datetime().optional(),
  lastUsedIp: z.string().optional(),
});

// Egress (API Response DTO)
export const ApiKeyResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  name: z.string(),
  keyHash: z.string(),
  keyPrefix: z.string(),
  scopes: z.array(z.string()),
  permissions: z.array(z.string()),
  rateLimit: z.number().int(),
  usageCount: z.number().int(),
  isActive: z.boolean(),
  expiresAt: z.string().datetime().nullable(),
  lastUsedAt: z.string().datetime().nullable(),
  lastUsedIp: z.string().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const ApiKeyListResponseSchema = z.object({
  data: z.array(ApiKeyResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type ApiKeyCreate = z.infer<typeof ApiKeyCreateSchema>;
export type ApiKeyUpdate = z.infer<typeof ApiKeyUpdateSchema>;
export type ApiKeyResponse = z.infer<typeof ApiKeyResponseSchema>;
export type ApiKeyListResponse = z.infer<typeof ApiKeyListResponseSchema>;

