import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';

// User Profiles - Extended profiles beyond Supabase auth
export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey(), // References auth.users.id
  email: text('email').notNull().unique(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  displayName: text('display_name'),
  bio: text('bio'),
  avatarUrl: text('avatar_url'),

  // Ministry Context
  ministryRole: text('ministry_role', {
    enum: [
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
    ],
  }).notNull(),
  denomination: text('denomination'),
  organizationName: text('organization_name'),
  yearsInMinistry: integer('years_in_ministry'),

  // Geographic & Cultural Context
  countryCode: text('country_code'),
  timezone: text('timezone'),
  languagePrimary: text('language_primary').default('en'),
  culturalContext: text('cultural_context', {
    enum: [
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'mixed',
      'global',
    ],
  }),

  // APEST Assessment Scores (0-100 scale)
  assessmentMovementAlignment: integer('assessment_movement_alignment'),
  assessmentAudienceEngagement: integer('assessment_audience_engagement'),
  assessmentContentReadiness: integer('assessment_content_readiness'),
  assessmentRevenuePotential: integer('assessment_revenue_potential'),
  assessmentNetworkEffects: integer('assessment_network_effects'),
  assessmentStrategicFit: integer('assessment_strategic_fit'),
  assessmentTotal: integer('assessment_total'), // Sum of above scores

  // Leader Tier (based on 100-point rubric)
  leaderTier: text('leader_tier', {
    enum: ['core', 'network', 'emerging', 'community'],
  }),

  // Platform Configuration (for leaders)
  subdomain: text('subdomain').unique(),
  customDomain: text('custom_domain').unique(),
  platformTitle: text('platform_title'),

  // Subscription & Access
  subscriptionTier: text('subscription_tier', {
    enum: ['free', 'individual', 'professional', 'leader', 'institutional'],
  }).default('free'),

  // Theological Focus Areas
  theologicalFocus: jsonb('theological_focus').$type<string[]>().default([]),

  // Settings (JSONB for flexibility)
  brandColors: jsonb('brand_colors')
    .$type<{
      primary: string;
      secondary: string;
      accent: string;
    }>()
    .default({ primary: '#2563eb', secondary: '#64748b', accent: '#059669' }),

  emailNotifications: jsonb('email_notifications')
    .$type<{
      dailyDigest: boolean;
      collaborationRequests: boolean;
      revenueReports: boolean;
      communityUpdates: boolean;
    }>()
    .default({
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    }),

  privacySettings: jsonb('privacy_settings')
    .$type<{
      publicProfile: boolean;
      showAssessmentResults: boolean;
      allowNetworking: boolean;
      shareAnalytics: boolean;
    }>()
    .default({
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    }),

  // Onboarding & Status
  onboardingCompleted: boolean('onboarding_completed').default(false),
  onboardingStep: integer('onboarding_step').default(1),
  accountStatus: text('account_status', {
    enum: ['active', 'inactive', 'suspended', 'pending_verification'],
  }).default('pending_verification'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  lastActiveAt: timestamp('last_active_at').notNull().defaultNow(),
});

// Organizations - Churches, denominations, seminaries, networks
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  website: text('website'),
  logoUrl: text('logo_url'),

  // Organization Classification
  organizationType: text('organization_type', {
    enum: [
      'church',
      'denomination',
      'seminary',
      'ministry_network',
      'nonprofit',
      'business',
      'other',
    ],
  }).notNull(),
  sizeCategory: text('size_category', {
    enum: ['small', 'medium', 'large', 'enterprise'],
  }),

  // Contact Information
  contactEmail: text('contact_email'),
  contactPhone: text('contact_phone'),
  address: jsonb('address').$type<{
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  }>(),

  // Licensing & Billing
  licenseType: text('license_type', {
    enum: ['individual', 'institutional', 'enterprise'],
  }).default('individual'),
  maxUsers: integer('max_users').default(1),
  billingEmail: text('billing_email'),

  // Ownership
  accountOwnerId: uuid('account_owner_id').references(() => userProfiles.id),

  // Stripe Integration
  stripeCustomerId: text('stripe_customer_id'),
  stripeProductId: text('stripe_product_id'),

  // Status
  status: text('status', {
    enum: ['active', 'inactive', 'trial', 'suspended'],
  }).default('trial'),

  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Organization Memberships - User-organization relationships
export const organizationMemberships = pgTable('organization_memberships', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => userProfiles.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id')
    .notNull()
    .references(() => organizations.id, { onDelete: 'cascade' }),

  // Role & Permissions
  role: text('role', {
    enum: ['owner', 'admin', 'member', 'viewer'],
  }).notNull(),
  permissions: jsonb('permissions').$type<string[]>().default([]),

  // Status
  status: text('status', {
    enum: ['active', 'inactive', 'pending', 'invited'],
  }).default('pending'),

  // Timestamps
  joinedAt: timestamp('joined_at').defaultNow(),
  invitedAt: timestamp('invited_at'),
  invitedBy: uuid('invited_by').references(() => userProfiles.id),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Relations
export const userProfilesRelations = relations(userProfiles, ({ many }) => ({
  organizationMemberships: many(organizationMemberships),
  ownedOrganizations: many(organizations),
}));

export const organizationsRelations = relations(
  organizations,
  ({ many, one }) => ({
    memberships: many(organizationMemberships),
    owner: one(userProfiles, {
      fields: [organizations.accountOwnerId],
      references: [userProfiles.id],
    }),
  })
);

export const organizationMembershipsRelations = relations(
  organizationMemberships,
  ({ one }) => ({
    user: one(userProfiles, {
      fields: [organizationMemberships.userId],
      references: [userProfiles.id],
    }),
    organization: one(organizations, {
      fields: [organizationMemberships.organizationId],
      references: [organizations.id],
    }),
    inviter: one(userProfiles, {
      fields: [organizationMemberships.invitedBy],
      references: [userProfiles.id],
    }),
  })
);

// Type exports
export type UserProfile = typeof userProfiles.$inferSelect;
export type NewUserProfile = typeof userProfiles.$inferInsert;
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type OrganizationMembership =
  typeof organizationMemberships.$inferSelect;
export type NewOrganizationMembership =
  typeof organizationMemberships.$inferInsert;
