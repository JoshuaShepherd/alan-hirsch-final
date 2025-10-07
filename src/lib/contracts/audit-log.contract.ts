import { z } from "zod";

// Shared enums
export const RiskLevelEnum = z.enum([
  "low",
  "medium",
  "high",
  "critical",
]);

// Ingress (Create/Update DTOs)
export const AuditLogCreateSchema = z.object({
  userId: z.string().uuid().optional(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().optional(),
  riskLevel: RiskLevelEnum.default("low"),
  oldValues: z.record(z.unknown()).optional(),
  newValues: z.record(z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  sessionId: z.string().optional(),
  requestId: z.string().optional(),
  endpoint: z.string().optional(),
  httpMethod: z.string().optional(),
  metadata: z.record(z.unknown()).default({}),
  authenticationMethod: z.string().optional(),
  permissions: z.array(z.string()).default([]),
});

export const AuditLogUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  action: z.string().optional(),
  resource: z.string().optional(),
  resourceId: z.string().optional(),
  riskLevel: RiskLevelEnum.optional(),
  oldValues: z.record(z.unknown()).optional(),
  newValues: z.record(z.unknown()).optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  sessionId: z.string().optional(),
  requestId: z.string().optional(),
  endpoint: z.string().optional(),
  httpMethod: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
  authenticationMethod: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

// Egress (API Response DTO)
export const AuditLogResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().nullable(),
  action: z.string(),
  resource: z.string(),
  resourceId: z.string().nullable(),
  riskLevel: RiskLevelEnum,
  oldValues: z.record(z.unknown()).nullable(),
  newValues: z.record(z.unknown()).nullable(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  sessionId: z.string().nullable(),
  requestId: z.string().nullable(),
  endpoint: z.string().nullable(),
  httpMethod: z.string().nullable(),
  metadata: z.record(z.unknown()),
  authenticationMethod: z.string().nullable(),
  permissions: z.array(z.string()),
  createdAt: z.string().datetime(),
});

// List envelope (standardized)
export const AuditLogListResponseSchema = z.object({
  data: z.array(AuditLogResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type AuditLogCreate = z.infer<typeof AuditLogCreateSchema>;
export type AuditLogUpdate = z.infer<typeof AuditLogUpdateSchema>;
export type AuditLogResponse = z.infer<typeof AuditLogResponseSchema>;
export type AuditLogListResponse = z.infer<typeof AuditLogListResponseSchema>;

