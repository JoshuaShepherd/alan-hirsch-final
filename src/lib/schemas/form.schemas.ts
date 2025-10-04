import { z } from 'zod';

// ============================================================================
// FORM VALIDATION SCHEMAS - User input validation for forms
// ============================================================================

// Common Form Components
// ============================================================================

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long' })
  .max(128, { message: 'Password cannot exceed 128 characters' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  });

export const confirmPasswordSchema = z.string();

export const termsAcceptanceSchema = z.boolean().refine(val => val === true, {
  message: 'You must accept the terms and conditions',
});

export const captchaSchema = z.string().min(1, {
  message: 'Please complete the captcha verification',
});

// Authentication Forms
// ============================================================================

/**
 * User Registration Form Schema
 */
export const userRegistrationFormSchema = z
  .object({
    email: z.string().email({ message: 'Please enter a valid email address' }),
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    firstName: z
      .string()
      .min(1, { message: 'First name is required' })
      .max(255, { message: 'First name cannot exceed 255 characters' })
      .regex(/^[a-zA-Z\s\-'\.]+$/, {
        message: 'First name contains invalid characters',
      }),
    lastName: z
      .string()
      .min(1, { message: 'Last name is required' })
      .max(255, { message: 'Last name cannot exceed 255 characters' })
      .regex(/^[a-zA-Z\s\-'\.]+$/, {
        message: 'Last name contains invalid characters',
      }),
    ministryRole: z
      .string()
      .min(1, { message: 'Please select your ministry role' }),
    denomination: z.string().optional(),
    organizationName: z.string().optional(),
    yearsInMinistry: z.number().int().min(0).max(100).optional(),
    countryCode: z.string().length(2).optional(),
    timezone: z.string().optional(),
    culturalContext: z.string().optional(),
    acceptTerms: termsAcceptanceSchema,
    captcha: captchaSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * User Login Form Schema
 */
export const userLoginFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(1, { message: 'Password is required' }),
  rememberMe: z.boolean().default(false),
  captcha: captchaSchema,
});

/**
 * Password Reset Request Form Schema
 */
export const passwordResetRequestFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  captcha: captchaSchema,
});

/**
 * Password Reset Form Schema
 */
export const passwordResetFormSchema = z
  .object({
    token: z.string().min(1, { message: 'Reset token is required' }),
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

/**
 * Email Verification Form Schema
 */
export const emailVerificationFormSchema = z.object({
  token: z.string().min(1, { message: 'Verification token is required' }),
});

// User Profile Forms
// ============================================================================

/**
 * User Profile Update Form Schema
 */
export const userProfileUpdateFormSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(255, { message: 'First name cannot exceed 255 characters' })
    .regex(/^[a-zA-Z\s\-'\.]+$/, {
      message: 'First name contains invalid characters',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(255, { message: 'Last name cannot exceed 255 characters' })
    .regex(/^[a-zA-Z\s\-'\.]+$/, {
      message: 'Last name contains invalid characters',
    }),
  displayName: z
    .string()
    .max(255, { message: 'Display name cannot exceed 255 characters' })
    .optional(),
  bio: z
    .string()
    .max(5000, { message: 'Bio cannot exceed 5000 characters' })
    .optional(),
  avatarUrl: z.string().url({ message: 'Please enter a valid URL' }).optional(),
  ministryRole: z
    .string()
    .min(1, { message: 'Please select your ministry role' }),
  denomination: z
    .string()
    .max(255, { message: 'Denomination cannot exceed 255 characters' })
    .optional(),
  organizationName: z
    .string()
    .max(255, { message: 'Organization name cannot exceed 255 characters' })
    .optional(),
  yearsInMinistry: z.number().int().min(0).max(100).optional(),
  countryCode: z.string().length(2).optional(),
  timezone: z.string().max(100).optional(),
  culturalContext: z.string().max(100).optional(),
  platformTitle: z
    .string()
    .max(255, { message: 'Platform title cannot exceed 255 characters' })
    .optional(),
  languagePrimary: z.string().max(10).default('en'),
  theologicalFocus: z.array(z.string()).default([]),
});

/**
 * User Settings Form Schema
 */
export const userSettingsFormSchema = z.object({
  emailNotifications: z.object({
    dailyDigest: z.boolean(),
    collaborationRequests: z.boolean(),
    revenueReports: z.boolean(),
    communityUpdates: z.boolean(),
  }),
  privacySettings: z.object({
    publicProfile: z.boolean(),
    showAssessmentResults: z.boolean(),
    allowNetworking: z.boolean(),
    shareAnalytics: z.boolean(),
  }),
  brandColors: z
    .object({
      primary: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, {
          message: 'Primary color must be a valid hex color',
        }),
      secondary: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, {
          message: 'Secondary color must be a valid hex color',
        }),
      accent: z
        .string()
        .regex(/^#[0-9A-Fa-f]{6}$/, {
          message: 'Accent color must be a valid hex color',
        }),
    })
    .optional(),
});

/**
 * Platform Configuration Form Schema
 */
export const platformConfigurationFormSchema = z.object({
  subdomain: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message:
        'Subdomain can only contain lowercase letters, numbers, and hyphens',
    })
    .min(3, { message: 'Subdomain must be at least 3 characters' })
    .max(50, { message: 'Subdomain cannot exceed 50 characters' })
    .optional(),
  customDomain: z
    .string()
    .max(255, { message: 'Custom domain cannot exceed 255 characters' })
    .optional(),
  platformTitle: z
    .string()
    .min(1, { message: 'Platform title is required' })
    .max(255, { message: 'Platform title cannot exceed 255 characters' }),
});

// Content Forms
// ============================================================================

/**
 * Content Creation/Edit Form Schema
 */
export const contentFormSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: 'Title is required' })
      .max(500, { message: 'Title cannot exceed 500 characters' }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, {
        message:
          'Slug can only contain lowercase letters, numbers, and hyphens',
      })
      .max(100, { message: 'Slug cannot exceed 100 characters' })
      .optional(),
    excerpt: z
      .string()
      .max(2000, { message: 'Excerpt cannot exceed 2000 characters' })
      .optional(),
    content: z.string().min(1, { message: 'Content is required' }),
    contentType: z.enum(
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
        message: 'Please select a valid content type',
      }
    ),
    format: z.enum(['text', 'html', 'markdown']).default('text'),
    primaryCategoryId: z
      .string()
      .uuid({ message: 'Please select a valid category' })
      .optional(),
    secondaryCategoryIds: z.array(z.string().uuid()).default([]),
    tags: z.array(z.string()).default([]),
    theologicalThemes: z.array(z.string()).default([]),
    seriesId: z.string().uuid().optional(),
    seriesOrder: z.number().int().min(1).optional(),
    visibility: z
      .enum(['public', 'private', 'organization', 'invite_only'])
      .default('public'),
    status: z
      .enum(['draft', 'published', 'archived', 'scheduled'])
      .default('draft'),
    featuredImageUrl: z
      .string()
      .url({ message: 'Please enter a valid image URL' })
      .optional(),
    videoUrl: z
      .string()
      .url({ message: 'Please enter a valid video URL' })
      .optional(),
    audioUrl: z
      .string()
      .url({ message: 'Please enter a valid audio URL' })
      .optional(),
    metaTitle: z
      .string()
      .max(255, { message: 'Meta title cannot exceed 255 characters' })
      .optional(),
    metaDescription: z
      .string()
      .max(500, { message: 'Meta description cannot exceed 500 characters' })
      .optional(),
    canonicalUrl: z
      .string()
      .url({ message: 'Please enter a valid canonical URL' })
      .optional(),
    originalSource: z
      .string()
      .max(500, { message: 'Original source cannot exceed 500 characters' })
      .optional(),
    publishedAt: z.string().datetime().optional(),
    scheduledAt: z.string().datetime().optional(),
    licenseType: z
      .enum([
        'all_rights_reserved',
        'creative_commons',
        'public_domain',
        'custom',
      ])
      .default('all_rights_reserved'),
    attributionRequired: z.boolean().default(true),
  })
  .refine(
    data => {
      if (data.status === 'scheduled' && !data.scheduledAt) {
        return false;
      }
      return true;
    },
    {
      message: "Scheduled date is required when status is 'scheduled'",
      path: ['scheduledAt'],
    }
  );

// Assessment Forms
// ============================================================================

/**
 * Assessment Response Form Schema
 */
export const assessmentResponseFormSchema = z
  .object({
    questionId: z.string().uuid({ message: 'Invalid question ID' }),
    responseValue: z.number().int().min(1).max(5).optional(),
    responseText: z.string().max(1000).optional(),
    confidence: z.number().int().min(1).max(5).optional(),
    skipped: z.boolean().default(false),
  })
  .refine(
    data => {
      // At least one response field must be provided if not skipped
      if (!data.skipped) {
        return (
          data.responseValue !== undefined || data.responseText !== undefined
        );
      }
      return true;
    },
    {
      message: 'Please provide a response or mark as skipped',
    }
  );

/**
 * Assessment Submission Form Schema
 */
export const assessmentSubmissionFormSchema = z.object({
  assessmentId: z.string().uuid({ message: 'Invalid assessment ID' }),
  responses: z.array(assessmentResponseFormSchema).min(1, {
    message: 'At least one response is required',
  }),
  culturalContext: z.string().optional(),
  languagePreference: z.string().max(10).optional(),
});

// Community Forms
// ============================================================================

/**
 * Community Creation Form Schema
 */
export const communityCreationFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Community name is required' })
    .max(255, { message: 'Community name cannot exceed 255 characters' }),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    .max(100, { message: 'Slug cannot exceed 100 characters' })
    .optional(),
  description: z
    .string()
    .max(2000, { message: 'Description cannot exceed 2000 characters' })
    .optional(),
  communityType: z
    .string()
    .min(1, { message: 'Please select a community type' }),
  maxMembers: z.number().int().min(1).optional(),
  guidelines: z
    .string()
    .max(5000, { message: 'Guidelines cannot exceed 5000 characters' })
    .optional(),
  geographicFocus: z.array(z.string()).default([]),
  culturalContext: z.string().max(100).default('global'),
  languagePrimary: z.string().max(10).default('en'),
  languagesSupported: z.array(z.string()).default(['en']),
  visibility: z.enum(['public', 'private']).default('public'),
  joinApprovalRequired: z.boolean().default(false),
  allowGuestPosts: z.boolean().default(false),
  moderationLevel: z.enum(['none', 'moderated', 'strict']).default('moderated'),
  rules: z.array(z.string()).default([]),
});

/**
 * Community Join Request Form Schema
 */
export const communityJoinRequestFormSchema = z.object({
  communityId: z.string().uuid({ message: 'Invalid community ID' }),
  message: z
    .string()
    .max(1000, { message: 'Message cannot exceed 1000 characters' })
    .optional(),
});

// Organization Forms
// ============================================================================

/**
 * Organization Creation Form Schema
 */
export const organizationCreationFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Organization name is required' })
    .max(255, { message: 'Organization name cannot exceed 255 characters' }),
  slug: z
    .string()
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug can only contain lowercase letters, numbers, and hyphens',
    })
    .max(100, { message: 'Slug cannot exceed 100 characters' })
    .optional(),
  description: z
    .string()
    .max(2000, { message: 'Description cannot exceed 2000 characters' })
    .optional(),
  website: z
    .string()
    .url({ message: 'Please enter a valid website URL' })
    .optional(),
  logoUrl: z
    .string()
    .url({ message: 'Please enter a valid logo URL' })
    .optional(),
  organizationType: z
    .string()
    .min(1, { message: 'Please select an organization type' }),
  sizeCategory: z.string().max(100).optional(),
  contactEmail: z
    .string()
    .email({ message: 'Please enter a valid contact email' })
    .optional(),
  contactPhone: z
    .string()
    .regex(/^\+?[\d\s\-\(\)]+$/, {
      message: 'Please enter a valid phone number',
    })
    .optional(),
  billingEmail: z
    .string()
    .email({ message: 'Please enter a valid billing email' })
    .optional(),
  licenseType: z
    .enum(['individual', 'team', 'enterprise'])
    .default('individual'),
  maxUsers: z.number().int().min(1).default(1),
});

/**
 * Organization Invitation Form Schema
 */
export const organizationInvitationFormSchema = z.object({
  organizationId: z.string().uuid({ message: 'Invalid organization ID' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  role: z.string().min(1, { message: 'Please select a role' }),
  message: z
    .string()
    .max(1000, { message: 'Message cannot exceed 1000 characters' })
    .optional(),
});

// Search Forms
// ============================================================================

/**
 * Search Form Schema
 */
export const searchFormSchema = z.object({
  query: z
    .string()
    .min(1, { message: 'Search query is required' })
    .max(255, { message: 'Search query cannot exceed 255 characters' }),
  types: z
    .array(z.enum(['users', 'content', 'communities', 'assessments']))
    .default(['users', 'content', 'communities']),
  contentType: z
    .array(
      z.enum([
        'article',
        'video',
        'audio',
        'podcast',
        'book',
        'course',
        'webinar',
        'other',
      ])
    )
    .optional(),
  communityType: z.array(z.string()).optional(),
  assessmentType: z
    .array(
      z.enum([
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ])
    )
    .optional(),
  countryCode: z.string().length(2).optional(),
  culturalContext: z.string().optional(),
});

// Contact Forms
// ============================================================================

/**
 * Contact Form Schema
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(255, { message: 'Name cannot exceed 255 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  subject: z
    .string()
    .min(1, { message: 'Subject is required' })
    .max(255, { message: 'Subject cannot exceed 255 characters' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters' })
    .max(5000, { message: 'Message cannot exceed 5000 characters' }),
  captcha: captchaSchema,
});

// ============================================================================
// TYPE EXPORTS - Extract TypeScript types from form schemas
// ============================================================================

// Authentication Form Types
export type UserRegistrationForm = z.infer<typeof userRegistrationFormSchema>;
export type UserLoginForm = z.infer<typeof userLoginFormSchema>;
export type PasswordResetRequestForm = z.infer<
  typeof passwordResetRequestFormSchema
>;
export type PasswordResetForm = z.infer<typeof passwordResetFormSchema>;
export type EmailVerificationForm = z.infer<typeof emailVerificationFormSchema>;

// User Profile Form Types
export type UserProfileUpdateForm = z.infer<typeof userProfileUpdateFormSchema>;
export type UserSettingsForm = z.infer<typeof userSettingsFormSchema>;
export type PlatformConfigurationForm = z.infer<
  typeof platformConfigurationFormSchema
>;

// Content Form Types
export type ContentForm = z.infer<typeof contentFormSchema>;

// Assessment Form Types
export type AssessmentResponseForm = z.infer<
  typeof assessmentResponseFormSchema
>;
export type AssessmentSubmissionForm = z.infer<
  typeof assessmentSubmissionFormSchema
>;

// Community Form Types
export type CommunityCreationForm = z.infer<typeof communityCreationFormSchema>;
export type CommunityJoinRequestForm = z.infer<
  typeof communityJoinRequestFormSchema
>;

// Organization Form Types
export type OrganizationCreationForm = z.infer<
  typeof organizationCreationFormSchema
>;
export type OrganizationInvitationForm = z.infer<
  typeof organizationInvitationFormSchema
>;

// Search Form Types
export type SearchForm = z.infer<typeof searchFormSchema>;

// Contact Form Types
export type ContactForm = z.infer<typeof contactFormSchema>;
