import { z } from 'zod';

// ============================================================================
// COMMON ENUM SCHEMAS
// ============================================================================
// Shared enums and types used across multiple entities

// Organization Types
export const organizationTypeSchema = z.enum([
  'church',
  'denomination',
  'seminary',
  'ministry_network',
  'nonprofit',
  'business',
  'other',
]);

// Membership Roles
export const membershipRoleSchema = z.enum([
  'owner',
  'admin',
  'member',
  'viewer',
]);

// Ministry Roles (re-exported from user schema for consistency)
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

// Subscription Status
export const subscriptionStatusSchema = z.enum([
  'active',
  'cancelled',
  'past_due',
  'unpaid',
  'trialing',
  'paused',
]);

// Visibility Levels
export const visibilitySchema = z.enum(['public', 'private', 'unlisted']);

// Cultural Context
export const culturalContextSchema = z.enum([
  'western',
  'eastern',
  'african',
  'latin_american',
  'middle_eastern',
  'oceanic',
  'mixed',
  'global',
]);

// Attachment Schema
export const attachmentSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number().int().positive(),
});

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type OrganizationType = z.infer<typeof organizationTypeSchema>;
export type MembershipRole = z.infer<typeof membershipRoleSchema>;
export type MinistryRole = z.infer<typeof ministryRoleSchema>;
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type CulturalContext = z.infer<typeof culturalContextSchema>;
export type Attachment = z.infer<typeof attachmentSchema>;


