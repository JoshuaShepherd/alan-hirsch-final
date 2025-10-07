import { z } from "zod";

// Shared enums
export const ConsentTypeEnum = z.enum([
  "terms_of_service",
  "privacy_policy",
  "marketing_emails",
  "analytics_tracking",
  "personalization",
  "third_party_sharing",
  "ai_processing",
  "data_retention",
]);

export const LegalBasisEnum = z.enum([
  "consent",
  "contract",
  "legal_obligation",
  "vital_interests",
  "public_task",
  "legitimate_interests",
]);

export const ConsentMethodEnum = z.enum([
  "explicit_opt_in",
  "implicit_acceptance",
  "pre_checked_box",
  "continued_use",
]);

// Ingress (Create/Update DTOs)
export const UserConsentCreateSchema = z.object({
  userId: z.string().uuid(),
  consentType: ConsentTypeEnum,
  consentGiven: z.boolean(),
  consentVersion: z.string(),
  legalBasis: LegalBasisEnum.default("consent"),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  consentMethod: ConsentMethodEnum.default("explicit_opt_in"),
  withdrawnAt: z.string().datetime().optional(),
  withdrawalReason: z.string().optional(),
});

export const UserConsentUpdateSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid().optional(),
  consentType: ConsentTypeEnum.optional(),
  consentGiven: z.boolean().optional(),
  consentVersion: z.string().optional(),
  legalBasis: LegalBasisEnum.optional(),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
  consentMethod: ConsentMethodEnum.optional(),
  withdrawnAt: z.string().datetime().optional(),
  withdrawalReason: z.string().optional(),
});

// Egress (API Response DTO)
export const UserConsentResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  consentType: ConsentTypeEnum,
  consentGiven: z.boolean(),
  consentVersion: z.string(),
  legalBasis: LegalBasisEnum,
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  consentMethod: ConsentMethodEnum,
  withdrawnAt: z.string().datetime().nullable(),
  withdrawalReason: z.string().nullable(),
  givenAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

// List envelope (standardized)
export const UserConsentListResponseSchema = z.object({
  data: z.array(UserConsentResponseSchema),
  page: z.number().int().min(1),
  limit: z.number().int().min(1),
  total: z.number().int().min(0),
});

// Types
export type UserConsentCreate = z.infer<typeof UserConsentCreateSchema>;
export type UserConsentUpdate = z.infer<typeof UserConsentUpdateSchema>;
export type UserConsentResponse = z.infer<typeof UserConsentResponseSchema>;
export type UserConsentListResponse = z.infer<typeof UserConsentListResponseSchema>;

