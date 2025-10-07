import { z } from "zod";

// Shared enums
export const OrganizationRoleEnum = z.enum([
  "owner",
  "admin",
  "member",
  "viewer",
]);

export const MembershipStatusEnum = z.enum([
  "pending",
  "active",
  "inactive",
  "cancelled",
]);

// Ingress (Create/Update DTOs)
export const OrganizationMembershipCreateSchema = z.object({
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  role: OrganizationRoleEnum,
  permissions: z.array(z.string()).default([]),
  status: MembershipStatusEnum.default("pending"),
  invitedBy: z.string().uuid().optional(),
});

export const OrganizationMembershipUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),
  role: OrganizationRoleEnum.optional(),
  permissions: z.array(z.string()).optional(),
  status: MembershipStatusEnum.optional(),
  invitedBy: z.string().uuid().optional(),
});

// Egress (API Response DTO)
export const OrganizationMembershipResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  organizationId: z.string().uuid(),
  role: OrganizationRoleEnum,
  permissions: z.array(z.string()),
  status: MembershipStatusEnum,
  joinedAt: z.string().datetime().nullable(),
  invitedAt: z.string().datetime().nullable(),
  invitedBy: z.string().uuid().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const OrganizationMembershipListResponseSchema = z.object({
  data: z.array(OrganizationMembershipResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type OrganizationMembershipCreate = z.infer<typeof OrganizationMembershipCreateSchema>;
export type OrganizationMembershipUpdate = z.infer<typeof OrganizationMembershipUpdateSchema>;
export type OrganizationMembershipResponse = z.infer<typeof OrganizationMembershipResponseSchema>;
export type OrganizationMembershipListResponse = z.infer<typeof OrganizationMembershipListResponseSchema>;

