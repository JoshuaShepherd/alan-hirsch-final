// ============================================================================
// CONTRACT VALIDATION TESTS
// ============================================================================
// Tests to verify Zod schemas match the alignment reference

import { describe, expect, it } from 'vitest';

// Import contract schemas
import {
  assessmentEntitySchema,
  contentItemEntitySchema,
  organizationEntitySchema,
  userProfileEntitySchema,
  userProfileResponseSchema,
} from '@platform/contracts';

describe('Contract Schema Validation', () => {
  describe('User Entity Schema', () => {
    it('should validate complete user entity', () => {
      const validUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
      };

      const result = userProfileEntitySchema.safeParse(validUser);
      expect(result.success).toBe(true);
    });

    it('should validate optional fields', () => {
      const userWithOptionals = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
        displayName: 'Johnny',
        bio: 'Test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        culturalContext: 'western',
        assessmentMovementAlignment: 85,
        assessmentAudienceEngagement: 72,
        assessmentContentReadiness: 90,
        assessmentRevenuePotential: 68,
        assessmentNetworkEffects: 78,
        assessmentStrategicFit: 82,
        assessmentTotal: 475,
        leaderTier: 'core',
        subdomain: 'john-doe',
        customDomain: 'johndoe.com',
        platformTitle: 'John Doe Ministry',
        languagePrimary: 'en',
        subscriptionTier: 'professional',
        theologicalFocus: ['missional', 'apostolic'],
        brandColors: {
          accent: '#059669',
          primary: '#2563eb',
          secondary: '#64748b',
        },
        emailNotifications: {
          dailyDigest: true,
          revenueReports: true,
          communityUpdates: true,
          collaborationRequests: true,
        },
        privacySettings: {
          publicProfile: true,
          shareAnalytics: false,
          allowNetworking: true,
          showAssessmentResults: false,
        },
        onboardingCompleted: true,
        onboardingStep: 5,
      };

      const result = userProfileEntitySchema.safeParse(userWithOptionals);
      expect(result.success).toBe(true);
    });

    it('should reject invalid data', () => {
      const invalidUser = {
        id: 'invalid-uuid',
        email: 'invalid-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid-role',
        accountStatus: 'invalid-status',
        createdAt: 'invalid-date',
        updatedAt: 'invalid-date',
        lastActiveAt: 'invalid-date',
      };

      const result = userProfileEntitySchema.safeParse(invalidUser);
      expect(result.success).toBe(false);
    });
  });

  describe('User Profile Response Schema', () => {
    it('should validate response with computed fields', () => {
      const userResponse = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
        // Computed fields
        isActive: true,
        hasCompletedOnboarding: true,
        fullName: 'John Doe',
        displayNameOrFullName: 'Johnny',
        hasCustomDomain: true,
        hasSubdomain: true,
        isPublicProfile: true,
        canReceiveNotifications: true,
        assessmentCompleted: true,
        primaryGift: 'teaching',
        secondaryGift: 'apostolic',
        ministryExperience: '10 years in ministry',
        locationDisplay: 'US (America/New_York)',
      };

      const result = userProfileResponseSchema.safeParse(userResponse);
      expect(result.success).toBe(true);
    });
  });

  describe('Content Item Schema', () => {
    it('should validate content item entity', () => {
      const contentItem = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Article',
        slug: 'test-article',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        createdAt: '2023-05-01T00:00:00Z',
        updatedAt: '2023-06-01T00:00:00Z',
        wordCount: 500,
        estimatedReadingTime: 3,
        viewCount: 100,
        likeCount: 10,
        shareCount: 5,
        commentCount: 3,
        bookmarkCount: 2,
        tags: ['test', 'article'],
        theologicalThemes: ['leadership'],
        aiEnhanced: true,
        aiSummary: 'AI-generated summary',
        aiKeyPoints: ['Key point 1', 'Key point 2'],
        featuredImageUrl: 'https://example.com/image.jpg',
        publishedAt: '2023-05-01T00:00:00Z',
        licenseType: 'all_rights_reserved',
        attributionRequired: true,
      };

      const result = contentItemEntitySchema.safeParse(contentItem);
      expect(result.success).toBe(true);
    });
  });

  describe('Assessment Schema', () => {
    it('should validate assessment entity', () => {
      const assessment = {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'APEST Assessment',
        slug: 'apest-assessment',
        description: 'Test assessment description',
        assessmentType: 'apest',
        questionsCount: 25,
        estimatedDuration: 30,
        passingScore: 70,
        validityScore: 0.85,
        reliabilityScore: 0.9,
        instructions: 'Complete all questions honestly',
        publishedAt: '2023-01-01T00:00:00Z',
        version: '1.0',
        language: 'en',
        culturalAdaptation: 'universal',
        researchBacked: true,
        scoringMethod: 'likert_5',
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
      };

      const result = assessmentEntitySchema.safeParse(assessment);
      expect(result.success).toBe(true);
    });
  });

  describe('Organization Schema', () => {
    it('should validate organization entity', () => {
      const organization = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        name: 'Test Organization',
        slug: 'test-org',
        description: 'Test organization description',
        website: 'https://example.com',
        logoUrl: 'https://example.com/logo.jpg',
        organizationType: 'church',
        sizeCategory: 'medium',
        contactEmail: 'contact@example.com',
        contactPhone: '+1-555-123-4567',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          country: 'USA',
          postalCode: '12345',
        },
        billingEmail: 'billing@example.com',
        accountOwnerId: '123e4567-e89b-12d3-a456-426614174000',
        licenseType: 'team',
        maxUsers: 10,
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
      };

      const result = organizationEntitySchema.safeParse(organization);
      expect(result.success).toBe(true);
    });
  });

  describe('Schema Alignment', () => {
    it('should match alignment reference field mappings', () => {
      // Test that schemas match the alignment reference document
      const userSchema = userProfileEntitySchema.shape;

      // Required fields from alignment reference
      expect(userSchema.id).toBeDefined();
      expect(userSchema.email).toBeDefined();
      expect(userSchema.firstName).toBeDefined();
      expect(userSchema.lastName).toBeDefined();
      expect(userSchema.ministryRole).toBeDefined();
      expect(userSchema.accountStatus).toBeDefined();
      expect(userSchema.createdAt).toBeDefined();
      expect(userSchema.updatedAt).toBeDefined();
      expect(userSchema.lastActiveAt).toBeDefined();

      // Optional fields from alignment reference
      expect(userSchema.displayName).toBeDefined();
      expect(userSchema.bio).toBeDefined();
      expect(userSchema.avatarUrl).toBeDefined();
      expect(userSchema.denomination).toBeDefined();
      expect(userSchema.organizationName).toBeDefined();
      expect(userSchema.yearsInMinistry).toBeDefined();
      expect(userSchema.countryCode).toBeDefined();
      expect(userSchema.timezone).toBeDefined();
      expect(userSchema.culturalContext).toBeDefined();
      expect(userSchema.assessmentMovementAlignment).toBeDefined();
      expect(userSchema.assessmentAudienceEngagement).toBeDefined();
      expect(userSchema.assessmentContentReadiness).toBeDefined();
      expect(userSchema.assessmentRevenuePotential).toBeDefined();
      expect(userSchema.assessmentNetworkEffects).toBeDefined();
      expect(userSchema.assessmentStrategicFit).toBeDefined();
      expect(userSchema.assessmentTotal).toBeDefined();
      expect(userSchema.leaderTier).toBeDefined();
      expect(userSchema.subdomain).toBeDefined();
      expect(userSchema.customDomain).toBeDefined();
      expect(userSchema.platformTitle).toBeDefined();
      expect(userSchema.languagePrimary).toBeDefined();
      expect(userSchema.subscriptionTier).toBeDefined();
      expect(userSchema.theologicalFocus).toBeDefined();
      expect(userSchema.brandColors).toBeDefined();
      expect(userSchema.emailNotifications).toBeDefined();
      expect(userSchema.privacySettings).toBeDefined();
      expect(userSchema.onboardingCompleted).toBeDefined();
      expect(userSchema.onboardingStep).toBeDefined();
    });

    it('should have correct field types from alignment reference', () => {
      // Test that schemas can validate data with correct types
      const testUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-12-01T00:00:00Z',
        lastActiveAt: '2023-12-01T12:00:00Z',
        yearsInMinistry: 10,
        assessmentTotal: 85,
        onboardingStep: 5,
        theologicalFocus: ['theology', 'ministry'],
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: { weekly: true, monthly: false },
        privacySettings: { profile: 'public', email: 'private' },
      };

      const result = userProfileEntitySchema.safeParse(testUser);
      if (!result.success) {
        console.log('Validation errors:', result.error.errors);
      }
      expect(result.success).toBe(true);

      if (result.success) {
        expect(typeof result.data.id).toBe('string');
        expect(typeof result.data.email).toBe('string');
        expect(typeof result.data.firstName).toBe('string');
        expect(typeof result.data.lastName).toBe('string');
        expect(typeof result.data.yearsInMinistry).toBe('number');
        expect(typeof result.data.assessmentTotal).toBe('number');
        expect(typeof result.data.onboardingStep).toBe('number');
        expect(Array.isArray(result.data.theologicalFocus)).toBe(true);
        expect(typeof result.data.brandColors).toBe('object');
        expect(typeof result.data.emailNotifications).toBe('object');
        expect(typeof result.data.privacySettings).toBe('object');
      }
    });
  });
});
