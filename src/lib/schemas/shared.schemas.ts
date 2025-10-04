import { z } from 'zod';

// ============================================================================
// SHARED SCHEMA COMPONENTS - Reusable across all database schemas
// ============================================================================

// Base Types
export const uuidSchema = z.string().uuid({
  message: 'Must be a valid UUID format',
});

export const timestampSchema = z.string().datetime({
  message: 'Must be a valid ISO 8601 datetime string',
});

export const emailSchema = z.string().email({
  message: 'Must be a valid email address',
});

export const urlSchema = z.string().url({
  message: 'Must be a valid URL',
});

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, {
    message: 'Slug must contain only lowercase letters, numbers, and hyphens',
  })
  .min(1, {
    message: 'Slug cannot be empty',
  })
  .max(100, {
    message: 'Slug cannot exceed 100 characters',
  });

export const countryCodeSchema = z
  .string()
  .length(2, {
    message: 'Country code must be exactly 2 characters (ISO 3166-1 alpha-2)',
  })
  .regex(/^[A-Z]{2}$/, {
    message: 'Country code must be uppercase letters only',
  });

// JSON/JSONB Schemas
export const jsonbSchema = z
  .any()
  .refine(
    val => typeof val === 'object' && val !== null && !Array.isArray(val),
    {
      message: 'Must be a valid JSON object',
    }
  );

export const jsonbArraySchema = z.array(z.unknown(), {
  message: 'Must be a valid JSON array',
});

// Enums from Database Constraints
export const assessmentTypeEnum = z.enum(
  [
    'apest',
    'mdna',
    'cultural_intelligence',
    'leadership_style',
    'spiritual_gifts',
    'other',
  ],
  {
    message: 'Must be a valid assessment type',
  }
);

export const culturalAdaptationEnum = z.enum(
  [
    'western',
    'eastern',
    'african',
    'latin_american',
    'middle_eastern',
    'oceanic',
    'universal',
  ],
  {
    message: 'Must be a valid cultural adaptation region',
  }
);

export const scoringMethodEnum = z.enum(
  ['likert_5', 'likert_7', 'binary', 'ranking', 'weighted'],
  {
    message: 'Must be a valid scoring method',
  }
);

export const assessmentStatusEnum = z.enum(
  ['draft', 'active', 'archived', 'under_review'],
  {
    message: 'Must be a valid assessment status',
  }
);

export const questionTypeEnum = z.enum(
  ['likert', 'multiple_choice', 'binary', 'ranking', 'text'],
  {
    message: 'Must be a valid question type',
  }
);

export const apestDimensionEnum = z.enum(
  ['apostolic', 'prophetic', 'evangelistic', 'shepherding', 'teaching'],
  {
    message: 'Must be a valid APEST dimension',
  }
);

// Common Status Enums
export const accountStatusEnum = z.enum(
  ['active', 'inactive', 'suspended', 'pending_verification'],
  {
    message: 'Must be a valid account status',
  }
);

export const subscriptionStatusEnum = z.enum(
  ['active', 'cancelled', 'past_due', 'unpaid', 'trialing', 'paused'],
  {
    message: 'Must be a valid subscription status',
  }
);

export const organizationStatusEnum = z.enum(
  ['active', 'inactive', 'trial', 'suspended'],
  {
    message: 'Must be a valid organization status',
  }
);

export const membershipStatusEnum = z.enum(
  ['pending', 'active', 'inactive', 'suspended'],
  {
    message: 'Must be a valid membership status',
  }
);

export const contentStatusEnum = z.enum(
  ['draft', 'published', 'archived', 'scheduled'],
  {
    message: 'Must be a valid content status',
  }
);

export const visibilityEnum = z.enum(
  ['public', 'private', 'organization', 'invite_only'],
  {
    message: 'Must be a valid visibility setting',
  }
);

export const communityVisibilityEnum = z.enum(['public', 'private'], {
  message: 'Must be a valid community visibility setting',
});

export const moderationLevelEnum = z.enum(['none', 'moderated', 'strict'], {
  message: 'Must be a valid moderation level',
});

export const contentTypeEnum = z.enum(
  [
    'article',
    'video',
    'audio',
    'podcast',
    'book',
    'course',
    'webinar',
    'other',
  ],
  {
    message: 'Must be a valid content type',
  }
);

export const formatEnum = z.enum(['text', 'html', 'markdown'], {
  message: 'Must be a valid content format',
});

export const licenseTypeEnum = z.enum(
  ['all_rights_reserved', 'creative_commons', 'public_domain', 'custom'],
  {
    message: 'Must be a valid license type',
  }
);

// Common Numeric Constraints
export const positiveIntSchema = z.number().int().min(0, {
  message: 'Must be a non-negative integer',
});

export const percentageSchema = z.number().min(0).max(100, {
  message: 'Must be between 0 and 100',
});

export const scoreSchema = z.number().int().min(0).max(100, {
  message: 'Must be an integer between 0 and 100',
});

export const apestScoreSchema = z.number().int().min(0).max(100, {
  message: 'APEST scores must be between 0 and 100',
});

export const apestTotalSchema = z.number().int().min(0).max(600, {
  message: 'Total APEST score must be between 0 and 600',
});

// Common String Constraints
export const nameSchema = z
  .string()
  .min(1, { message: 'Name cannot be empty' })
  .max(255, { message: 'Name cannot exceed 255 characters' });

export const titleSchema = z
  .string()
  .min(1, { message: 'Title cannot be empty' })
  .max(500, { message: 'Title cannot exceed 500 characters' });

export const descriptionSchema = z
  .string()
  .max(2000, { message: 'Description cannot exceed 2000 characters' })
  .optional();

export const bioSchema = z
  .string()
  .max(5000, { message: 'Bio cannot exceed 5000 characters' })
  .optional();

export const textContentSchema = z
  .string()
  .min(1, { message: 'Content cannot be empty' });

export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s\-\(\)]+$/, {
    message: 'Must be a valid phone number',
  })
  .optional();

// Common Boolean Defaults
export const defaultTrueSchema = z.boolean().default(true);
export const defaultFalseSchema = z.boolean().default(false);

// Common Default Values
export const defaultNowSchema = z
  .string()
  .datetime()
  .default(() => new Date().toISOString());
export const defaultEmptyArraySchema = z.array(z.unknown()).default([]);
export const defaultEmptyObjectSchema = z.record(z.unknown()).default({});

// Type exports
export type Uuid = z.infer<typeof uuidSchema>;
export type Timestamp = z.infer<typeof timestampSchema>;
export type Email = z.infer<typeof emailSchema>;
export type Url = z.infer<typeof urlSchema>;
export type Slug = z.infer<typeof slugSchema>;
export type CountryCode = z.infer<typeof countryCodeSchema>;
export type Jsonb = z.infer<typeof jsonbSchema>;
export type JsonbArray = z.infer<typeof jsonbArraySchema>;

export type AssessmentType = z.infer<typeof assessmentTypeEnum>;
export type CulturalAdaptation = z.infer<typeof culturalAdaptationEnum>;
export type ScoringMethod = z.infer<typeof scoringMethodEnum>;
export type AssessmentStatus = z.infer<typeof assessmentStatusEnum>;
export type QuestionType = z.infer<typeof questionTypeEnum>;
export type ApestDimension = z.infer<typeof apestDimensionEnum>;

export type AccountStatus = z.infer<typeof accountStatusEnum>;
export type SubscriptionStatus = z.infer<typeof subscriptionStatusEnum>;
export type OrganizationStatus = z.infer<typeof organizationStatusEnum>;
export type MembershipStatus = z.infer<typeof membershipStatusEnum>;
export type ContentStatus = z.infer<typeof contentStatusEnum>;
export type Visibility = z.infer<typeof visibilityEnum>;
export type CommunityVisibility = z.infer<typeof communityVisibilityEnum>;
export type ModerationLevel = z.infer<typeof moderationLevelEnum>;
export type ContentType = z.infer<typeof contentTypeEnum>;
export type Format = z.infer<typeof formatEnum>;
export type LicenseType = z.infer<typeof licenseTypeEnum>;
