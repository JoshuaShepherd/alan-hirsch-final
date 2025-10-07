import { z } from 'zod';

// Shared enums
export const OrganizationTypeEnum = z.enum([
  'church',
  'denomination',
  'seminary',
  'ministry_network',
  'nonprofit',
  'business',
  'other',
]);

export const SizeCategoryEnum = z.enum([
  'startup',
  'small',
  'medium',
  'large',
  'enterprise',
]);

export const OrganizationLicenseTypeEnum = z.enum([
  'individual',
  'team',
  'enterprise',
]);

export const OrganizationStatusEnum = z.enum([
  'trial',
  'active',
  'suspended',
  'cancelled',
]);

// Ingress (Create/Update DTOs)
export const OrganizationCreateSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  organizationType: OrganizationTypeEnum,
  sizeCategory: SizeCategoryEnum.optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  licenseType: OrganizationLicenseTypeEnum.default('individual'),
  maxUsers: z.number().int().min(1).default(1),
  billingEmail: z.string().email().optional(),
  accountOwnerId: z.string().uuid().optional(),
  stripeCustomerId: z.string().optional(),
  stripeProductId: z.string().optional(),
  status: OrganizationStatusEnum.default('trial'),
});

export const OrganizationUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  slug: z.string().optional(),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  organizationType: OrganizationTypeEnum.optional(),
  sizeCategory: SizeCategoryEnum.optional(),
  contactEmail: z.string().email().optional(),
  contactPhone: z.string().optional(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
    })
    .optional(),
  licenseType: OrganizationLicenseTypeEnum.optional(),
  maxUsers: z.number().int().min(1).optional(),
  billingEmail: z.string().email().optional(),
  accountOwnerId: z.string().uuid().optional(),
  stripeCustomerId: z.string().optional(),
  stripeProductId: z.string().optional(),
  status: OrganizationStatusEnum.optional(),
});

// Egress (API Response DTO)
export const OrganizationResponseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  website: z.string().nullable(),
  logoUrl: z.string().nullable(),
  organizationType: OrganizationTypeEnum,
  sizeCategory: SizeCategoryEnum.nullable(),
  contactEmail: z.string().nullable(),
  contactPhone: z.string().nullable(),
  address: z
    .object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      country: z.string(),
      postalCode: z.string(),
    })
    .nullable(),
  licenseType: OrganizationLicenseTypeEnum,
  maxUsers: z.number().int(),
  billingEmail: z.string().nullable(),
  accountOwnerId: z.string().uuid().nullable(),
  stripeCustomerId: z.string().nullable(),
  stripeProductId: z.string().nullable(),
  status: OrganizationStatusEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const OrganizationListResponseSchema = z.object({
  data: z.array(OrganizationResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type OrganizationCreate = z.infer<typeof OrganizationCreateSchema>;
export type OrganizationUpdate = z.infer<typeof OrganizationUpdateSchema>;
export type OrganizationResponse = z.infer<typeof OrganizationResponseSchema>;
export type OrganizationListResponse = z.infer<
  typeof OrganizationListResponseSchema
>;
