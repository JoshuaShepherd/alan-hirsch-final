import { z } from 'zod';

// ============================================================================
// SHARED ENUMS AND TYPES
// ============================================================================

export const ministryRoleSchema = z.enum([
  'senior_pastor',
  'associate_pastor',
  'church_planter',
  'denominational_leader',
  'seminary_professor',
  'seminary_student',
  'ministry_staff',
  'missionary',
  'marketplace_minister',
  'nonprofit_leader',
  'consultant',
  'academic_researcher',
  'emerging_leader',
  'other',
]);

export const culturalContextSchema = z.enum([
  'western',
  'eastern',
  'african',
  'latin_american',
  'middle_eastern',
  'oceanic',
  'universal',
  'global',
]);

export const organizationTypeSchema = z.enum([
  'church',
  'denomination',
  'seminary',
  'nonprofit',
  'ministry',
  'business',
  'other',
]);

export const membershipRoleSchema = z.enum([
  'owner',
  'admin',
  'member',
  'viewer',
]);

export const leaderTierSchema = z.enum([
  'core',
  'network',
  'emerging',
  'community',
]);

export const subscriptionTierSchema = z.enum([
  'free',
  'individual',
  'professional',
  'leader',
  'institutional',
]);

export const accountStatusSchema = z.enum([
  'active',
  'inactive',
  'suspended',
  'pending_verification',
]);

export const brandColorsSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  accent: z.string(),
});

export const emailNotificationsSchema = z.object({
  dailyDigest: z.boolean(),
  collaborationRequests: z.boolean(),
  revenueReports: z.boolean(),
  communityUpdates: z.boolean(),
});

export const privacySettingsSchema = z.object({
  publicProfile: z.boolean(),
  showAssessmentResults: z.boolean(),
  allowNetworking: z.boolean(),
  shareAnalytics: z.boolean(),
});

// ============================================================================
// USER ENTITY SCHEMA - SINGLE SOURCE OF TRUTH
// ============================================================================

/**
 * Complete User Profile Entity Schema
 * This is the single source of truth for all user data structures
 */
export const UserEntitySchema = z.object({
  // Core Identity
  id: z.string().uuid(),
  email: z.string().email(),
  first_name: z.string().min(1).max(255),
  last_name: z.string().min(1).max(255),
  display_name: z.string().max(255).optional(),
  bio: z.string().max(5000).optional(),
  avatar_url: z.string().url().optional(),

  // Ministry Context
  ministry_role: ministryRoleSchema,
  denomination: z.string().max(255).optional(),
  organization_name: z.string().max(255).optional(),
  years_in_ministry: z.number().int().min(0).max(100).optional(),

  // Geographic & Cultural Context
  country_code: z.string().length(2).optional(),
  timezone: z.string().max(100).optional(),
  language_primary: z.string().max(10).default('en'),
  cultural_context: culturalContextSchema.optional(),

  // APEST Assessment Scores (0-100 scale)
  assessment_movement_alignment: z.number().int().min(0).max(100).optional(),
  assessment_audience_engagement: z.number().int().min(0).max(100).optional(),
  assessment_content_readiness: z.number().int().min(0).max(100).optional(),
  assessment_revenue_potential: z.number().int().min(0).max(100).optional(),
  assessment_network_effects: z.number().int().min(0).max(100).optional(),
  assessment_strategic_fit: z.number().int().min(0).max(100).optional(),
  assessment_total: z.number().int().min(0).max(600).optional(),

  // Leader Tier
  leader_tier: leaderTierSchema.optional(),

  // Platform Configuration
  subdomain: z
    .string()
    .regex(/^[a-z0-9-]+$/)
    .optional(),
  custom_domain: z.string().optional(),
  platform_title: z.string().max(255).optional(),

  // Subscription & Access
  subscription_tier: subscriptionTierSchema.default('free'),

  // Theological Focus Areas
  theological_focus: z.array(z.string()).default([]),

  // Settings
  brand_colors: brandColorsSchema.optional(),
  email_notifications: emailNotificationsSchema.optional(),
  privacy_settings: privacySettingsSchema.optional(),

  // Account Status
  account_status: accountStatusSchema.default('active'),

  // Timestamps
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  last_active_at: z.string().datetime().optional(),
});

// ============================================================================
// DERIVED SCHEMAS - NO DUPLICATION
// ============================================================================

/**
 * Create User Schema - Derived from Entity
 * Omits auto-generated fields
 */
export const CreateUserSchema = UserEntitySchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

/**
 * Update User Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export const UpdateUserSchema = CreateUserSchema.partial();

/**
 * User Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export const UserQuerySchema = UserEntitySchema.partial().extend({
  // Search fields
  search: z.string().optional(),

  // Filter fields
  ministry_role: z.array(ministryRoleSchema).optional(),
  country_code: z.array(z.string().length(2)).optional(),
  cultural_context: z.array(culturalContextSchema).optional(),
  leader_tier: z.array(leaderTierSchema).optional(),
  subscription_tier: z.array(subscriptionTierSchema).optional(),
  account_status: z.array(accountStatusSchema).optional(),

  // Date range filters
  created_after: z.string().datetime().optional(),
  created_before: z.string().datetime().optional(),
  last_active_after: z.string().datetime().optional(),
  last_active_before: z.string().datetime().optional(),
});

/**
 * Public User Schema - For public display
 * Hides sensitive fields
 */
export const PublicUserSchema = UserEntitySchema.omit({
  email: true,
  email_notifications: true,
  privacy_settings: true,
  assessment_movement_alignment: true,
  assessment_audience_engagement: true,
  assessment_content_readiness: true,
  assessment_revenue_potential: true,
  assessment_network_effects: true,
  assessment_strategic_fit: true,
  assessment_total: true,
});

/**
 * User Form Schema - For form validation
 * Extends create schema with form-specific fields
 */
export const UserFormSchema = CreateUserSchema.extend({
  confirm_password: z.string().min(8).optional(),
  terms_accepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type UserEntity = z.infer<typeof UserEntitySchema>;
export type CreateUser = z.infer<typeof CreateUserSchema>;
export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UserQuery = z.infer<typeof UserQuerySchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;
export type UserForm = z.infer<typeof UserFormSchema>;

// Shared type exports
export type MinistryRole = z.infer<typeof ministryRoleSchema>;
export type CulturalContext = z.infer<typeof culturalContextSchema>;
export type OrganizationType = z.infer<typeof organizationTypeSchema>;
export type MembershipRole = z.infer<typeof membershipRoleSchema>;
export type LeaderTier = z.infer<typeof leaderTierSchema>;
export type SubscriptionTier = z.infer<typeof subscriptionTierSchema>;
export type AccountStatus = z.infer<typeof accountStatusSchema>;
export type BrandColors = z.infer<typeof brandColorsSchema>;
export type EmailNotifications = z.infer<typeof emailNotificationsSchema>;
export type PrivacySettings = z.infer<typeof privacySettingsSchema>;
