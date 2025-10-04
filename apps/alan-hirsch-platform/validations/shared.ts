import { z } from 'zod';

// ============================================================================
// SHARED SCHEMAS - Common schemas used across multiple domains
// ============================================================================

// Cultural Context Schema - Used in auth and community
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

// Visibility Schema - Used in content and community
export const visibilitySchema = z.enum([
  'public',
  'premium',
  'vip',
  'private',
  'organization',
  'invite_only',
]);

// Attachment Schema - Used in content and community
export const attachmentSchema = z.object({
  name: z.string(),
  url: z.string().url(),
  type: z.string(),
  size: z.number().int().min(0),
});

// Membership Role Schema - Used in auth and community
export const membershipRoleSchema = z.enum([
  'owner',
  'admin',
  'member',
  'viewer',
]);

// Organization Type Schema - Used in auth
export const organizationTypeSchema = z.enum([
  'church',
  'denomination',
  'seminary',
  'ministry_network',
  'nonprofit',
  'business',
  'other',
]);

// Subscription Status Schema - Used in subscriptions
export const subscriptionStatusSchema = z.enum([
  'active',
  'cancelled',
  'past_due',
  'unpaid',
  'trialing',
  'paused',
]);

// Ministry Role Schema - Used in auth
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

// Type exports
export type CulturalContext = z.infer<typeof culturalContextSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type Attachment = z.infer<typeof attachmentSchema>;
export type MembershipRole = z.infer<typeof membershipRoleSchema>;
export type OrganizationType = z.infer<typeof organizationTypeSchema>;
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;
export type MinistryRole = z.infer<typeof ministryRoleSchema>;
