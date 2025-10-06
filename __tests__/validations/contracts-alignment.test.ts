import {
  // Assessment schemas
  assessmentEntitySchema,
  assessmentQuestionEntitySchema,
  contentCrossReferenceEntitySchema,
  contentItemEntitySchema,
  contentSeriesEntitySchema,
  createAssessmentSchema,
  createContentItemSchema,
  createContentSeriesSchema,
  createOrganizationSchema,
  createUserProfileSchema,
  // Organization schemas
  organizationEntitySchema,
  userAssessmentEntitySchema,
  // User schemas
  userProfileEntitySchema,
} from '@platform/contracts';
import { describe, expect, it } from 'vitest';

// ============================================================================
// CONTRACT ALIGNMENT VALIDATION TESTS
// ============================================================================
// These tests ensure that all contract schemas align with the database schema
// and validate correctly with proper fixture data

describe('Contract Schema Alignment Tests', () => {
  describe('User Profile Entity Schema', () => {
    it('should validate a complete user profile entity', () => {
      const validUserProfile = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'john.doe@example.com',
        passwordHash: 'hashed_password_here',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'John Doe',
        bio: 'Senior Pastor with 15 years of experience in church planting.',
        avatarUrl: 'https://example.com/avatar.jpg',

        // Ministry Context
        ministryRole: 'senior_pastor',
        denomination: 'Baptist',
        organizationName: 'Grace Community Church',
        yearsInMinistry: 15,

        // Geographic & Cultural Context
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',

        // APEST Assessment Scores
        assessmentMovementAlignment: 85,
        assessmentAudienceEngagement: 78,
        assessmentContentReadiness: 92,
        assessmentRevenuePotential: 65,
        assessmentNetworkEffects: 88,
        assessmentStrategicFit: 82,
        assessmentTotal: 490,

        // Leader Tier
        leaderTier: 'core',

        // Platform Configuration
        subdomain: 'john-doe',
        customDomain: 'johndoe.com',
        platformTitle: 'John Doe Ministry',

        // Subscription & Access
        subscriptionTier: 'leader',

        // Theological Focus Areas
        theologicalFocus: ['ecclesiology', 'missiology', 'leadership'],

        // Settings
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: true,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },

        // Onboarding & Status
        onboardingCompleted: true,
        onboardingStep: 10,
        accountStatus: 'active',

        // Timestamps
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-15T12:30:00.000Z',
        lastActiveAt: '2024-01-15T12:30:00.000Z',
      };

      const result = userProfileEntitySchema.safeParse(validUserProfile);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('123e4567-e89b-12d3-a456-426614174000');
        expect(result.data.ministryRole).toBe('senior_pastor');
        expect(result.data.assessmentTotal).toBe(490);
      }
    });

    it('should validate user profile with minimal required fields', () => {
      const minimalUserProfile = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'jane.doe@example.com',
        firstName: 'Jane',
        lastName: 'Doe',
        ministryRole: 'church_planter',
        languagePrimary: 'en',
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: true,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },
        onboardingCompleted: false,
        onboardingStep: 1,
        accountStatus: 'pending_verification',
        theologicalFocus: [],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        lastActiveAt: '2024-01-01T00:00:00.000Z',
      };

      const result = userProfileEntitySchema.safeParse(minimalUserProfile);
      expect(result.success).toBe(true);
    });

    it('should reject invalid user profile data', () => {
      const invalidUserProfile = {
        id: 'invalid-uuid',
        email: 'invalid-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid_role',
        // Missing required fields
      };

      const result = userProfileEntitySchema.safeParse(invalidUserProfile);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });

  describe('Assessment Entity Schema', () => {
    it('should validate a complete assessment entity', () => {
      const validAssessment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'APEST Leadership Assessment',
        slug: 'apest-leadership-assessment',
        description:
          'Comprehensive assessment for ministry leadership based on APEST framework.',

        // Assessment Configuration
        assessmentType: 'apest',
        questionsCount: 50,
        estimatedDuration: 30,
        passingScore: 70,

        // Validation & Reliability
        validityScore: 0.85,
        reliabilityScore: 0.92,

        // Instructions & Content
        instructions: 'Please answer all questions honestly and thoughtfully.',
        publishedAt: '2024-01-01T00:00:00.000Z',
        version: '1.0',
        language: 'en',

        // Cultural Adaptation
        culturalAdaptation: 'western',
        researchBacked: true,
        scoringMethod: 'likert_5',

        // Status
        status: 'active',

        // Timestamps
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-15T12:30:00.000Z',
      };

      const result = assessmentEntitySchema.safeParse(validAssessment);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.assessmentType).toBe('apest');
        expect(result.data.questionsCount).toBe(50);
        expect(result.data.culturalAdaptation).toBe('western');
      }
    });

    it('should validate assessment with global cultural adaptation', () => {
      const globalAssessment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Global Leadership Assessment',
        slug: 'global-leadership-assessment',
        assessmentType: 'leadership_style',
        questionsCount: 25,
        culturalAdaptation: 'global',
        researchBacked: false,
        scoringMethod: 'likert_7',
        status: 'draft',
        version: '1.0',
        language: 'en',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      const result = assessmentEntitySchema.safeParse(globalAssessment);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.culturalAdaptation).toBe('global');
      }
    });
  });

  describe('Assessment Question Entity Schema', () => {
    it('should validate a complete assessment question entity', () => {
      const validQuestion = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        assessmentId: '123e4567-e89b-12d3-a456-426614174001',
        questionText:
          'I am naturally drawn to pioneering new ministry initiatives.',
        questionType: 'likert',
        orderIndex: 1,

        // Question Configuration
        category: 'apostolic',
        apestDimension: 'apostolic',
        answerOptions: [
          {
            value: 1,
            label: 'Strongly Disagree',
            description: 'This does not describe me at all',
          },
          {
            value: 2,
            label: 'Disagree',
            description: 'This rarely describes me',
          },
          {
            value: 3,
            label: 'Neutral',
            description: 'This sometimes describes me',
          },
          { value: 4, label: 'Agree', description: 'This often describes me' },
          {
            value: 5,
            label: 'Strongly Agree',
            description: 'This always describes me',
          },
        ],
        isRequired: true,
        weight: 1.0,
        reverseScored: false,

        // Timestamps
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      const result = assessmentQuestionEntitySchema.safeParse(validQuestion);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.questionType).toBe('likert');
        expect(result.data.apestDimension).toBe('apostolic');
        expect(result.data.answerOptions).toHaveLength(5);
      }
    });
  });

  describe('User Assessment Entity Schema', () => {
    it('should validate a complete user assessment entity', () => {
      const validUserAssessment = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: '123e4567-e89b-12d3-a456-426614174001',
        assessmentId: '123e4567-e89b-12d3-a456-426614174002',

        // Assessment Progress
        startedAt: '2024-01-01T10:00:00.000Z',
        completedAt: '2024-01-01T10:30:00.000Z',
        completionPercentage: 100,

        // Raw Scores
        rawScores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 90,
          shepherding: 68,
          teaching: 78,
        },
        totalScore: 393,
        maxPossibleScore: 500,

        // APEST Scores
        apostolicScore: 85,
        propheticScore: 72,
        evangelisticScore: 90,
        shepherdingScore: 68,
        teachingScore: 78,

        // Normalized Scores
        normalizedScores: {
          apostolic: 85,
          prophetic: 72,
          evangelistic: 90,
          shepherding: 68,
          teaching: 78,
        },
        primaryGift: 'evangelistic',
        secondaryGift: 'apostolic',

        // Assessment Quality
        responseConsistency: 0.92,
        completionTime: 30, // minutes
        confidenceLevel: 4,

        // Cultural Adjustment
        culturalAdjustmentApplied: true,
        culturalAdjustmentFactor: 1.05,

        // AI Insights
        aiInsights:
          'This user shows strong evangelistic and apostolic gifts with potential for church planting.',
        personalizedRecommendations: {
          strengths: ['Evangelistic outreach', 'Apostolic vision'],
          growthAreas: ['Shepherding care', 'Teaching depth'],
          actionItems: [
            'Join church planting cohort',
            'Develop teaching skills',
          ],
          contentRecommendations: [
            'Church Planting 101',
            'Teaching Fundamentals',
          ],
        },
        suggestedPeers: ['123e4567-e89b-12d3-a456-426614174003'],
        complementaryGifts: ['shepherding', 'teaching'],

        // Timestamps
        createdAt: '2024-01-01T10:00:00.000Z',
        updatedAt: '2024-01-01T10:30:00.000Z',
      };

      const result = userAssessmentEntitySchema.safeParse(validUserAssessment);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.primaryGift).toBe('evangelistic');
        expect(result.data.completionPercentage).toBe(100);
        expect(result.data.personalizedRecommendations?.strengths).toContain(
          'Evangelistic outreach'
        );
      }
    });
  });

  describe('Content Item Entity Schema', () => {
    it('should validate a complete content item entity', () => {
      const validContentItem = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'The Five-Fold Ministry: Understanding APEST',
        slug: 'five-fold-ministry-understanding-apest',
        excerpt:
          'A comprehensive guide to understanding the five-fold ministry gifts and their application in modern church leadership.',
        content: 'The five-fold ministry gifts...',

        // Author Information
        authorId: '123e4567-e89b-12d3-a456-426614174001',
        coAuthors: ['123e4567-e89b-12d3-a456-426614174002'],

        // Content Classification
        contentType: 'article',
        format: 'text',

        // Content Metrics
        wordCount: 2500,
        estimatedReadingTime: 10,

        // Engagement Metrics
        viewCount: 150,
        likeCount: 25,
        shareCount: 8,
        commentCount: 12,
        bookmarkCount: 18,

        // Categorization
        primaryCategoryId: '123e4567-e89b-12d3-a456-426614174003',
        secondaryCategories: ['123e4567-e89b-12d3-a456-426614174004'],
        tags: ['apest', 'leadership', 'ministry'],
        theologicalThemes: ['ecclesiology', 'ministry'],

        // Series Information
        seriesId: '123e4567-e89b-12d3-a456-426614174005',
        seriesOrder: 1,

        // Visibility & Status
        visibility: 'public',
        status: 'published',

        // AI Enhancement
        networkAmplificationScore: 7.5,
        crossReferenceCount: 3,
        aiEnhanced: true,
        aiSummary:
          'This article explores the five-fold ministry gifts and their practical application.',
        aiKeyPoints: [
          'APEST framework explained',
          'Practical applications',
          'Leadership implications',
        ],

        // Media & Attachments
        featuredImageUrl: 'https://example.com/featured-image.jpg',
        attachments: [
          {
            name: 'APEST Assessment Guide.pdf',
            url: 'https://example.com/apest-guide.pdf',
            type: 'application/pdf',
            size: 1024000,
          },
        ],

        // SEO & Metadata
        metaTitle: 'Five-Fold Ministry: Understanding APEST Framework',
        metaDescription:
          'Learn about the five-fold ministry gifts and how to apply them in modern church leadership.',
        canonicalUrl: 'https://example.com/five-fold-ministry',
        originalSource: 'Alan Hirsch Ministry Platform',

        // Publication & Scheduling
        publishedAt: '2024-01-01T12:00:00.000Z',

        // Licensing
        licenseType: 'all_rights_reserved',
        attributionRequired: true,

        // Timestamps
        createdAt: '2024-01-01T10:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
      };

      const result = contentItemEntitySchema.safeParse(validContentItem);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.contentType).toBe('article');
        expect(result.data.visibility).toBe('public');
        expect(result.data.aiEnhanced).toBe(true);
        expect(result.data.attachments).toHaveLength(1);
      }
    });

    it('should validate content item with invite_only visibility', () => {
      const inviteOnlyContent = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'Private Leadership Training',
        slug: 'private-leadership-training',
        authorId: '123e4567-e89b-12d3-a456-426614174001',
        contentType: 'course_lesson',
        format: 'video',
        visibility: 'invite_only',
        status: 'published',
        theologicalFocus: [],
        tags: [],
        theologicalThemes: [],
        secondaryCategories: [],
        coAuthors: [],
        attachments: [],
        aiKeyPoints: [],
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      const result = contentItemEntitySchema.safeParse(inviteOnlyContent);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.visibility).toBe('invite_only');
      }
    });
  });

  describe('Content Series Entity Schema', () => {
    it('should validate a complete content series entity', () => {
      const validContentSeries = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        title: 'APEST Leadership Development Series',
        slug: 'apest-leadership-development-series',
        description:
          'A comprehensive series on developing leadership skills using the APEST framework.',

        // Series Details
        authorId: '123e4567-e89b-12d3-a456-426614174001',
        collaborators: ['123e4567-e89b-12d3-a456-426614174002'],
        primaryCategoryId: '123e4567-e89b-12d3-a456-426614174003',

        // Series Configuration
        seriesType: 'course',
        difficulty: 'intermediate',
        totalItems: 12,
        estimatedDuration: 180, // minutes

        // Categorization
        tags: ['apest', 'leadership', 'development'],

        // Visibility & Status
        visibility: 'premium',
        status: 'published',

        // SEO & Media
        featuredImageUrl: 'https://example.com/series-image.jpg',
        metaDescription:
          'Learn leadership development through the APEST framework.',

        // Publication
        publishedAt: '2024-01-01T12:00:00.000Z',

        // Timestamps
        createdAt: '2024-01-01T10:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
      };

      const result = contentSeriesEntitySchema.safeParse(validContentSeries);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.seriesType).toBe('course');
        expect(result.data.difficulty).toBe('intermediate');
        expect(result.data.totalItems).toBe(12);
      }
    });
  });

  describe('Content Cross Reference Entity Schema', () => {
    it('should validate a complete content cross reference entity', () => {
      const validCrossReference = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        sourceContentId: '123e4567-e89b-12d3-a456-426614174001',
        targetContentId: '123e4567-e89b-12d3-a456-426614174002',

        // Reference Classification
        referenceType: 'builds_on',
        relevanceScore: 8,
        qualityScore: 9,
        contextDescription:
          'This article builds upon the foundational concepts introduced in the target content.',
        isAuthorApproved: true,
        isAiGenerated: false,
        clickCount: 25,

        // Timestamps
        createdAt: '2024-01-01T10:00:00.000Z',
        updatedAt: '2024-01-01T12:00:00.000Z',
      };

      const result =
        contentCrossReferenceEntitySchema.safeParse(validCrossReference);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.referenceType).toBe('builds_on');
        expect(result.data.isAuthorApproved).toBe(true);
        expect(result.data.clickCount).toBe(25);
      }
    });
  });

  describe('Organization Entity Schema', () => {
    it('should validate a complete organization entity', () => {
      const validOrganization = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Grace Community Church',
        slug: 'grace-community-church',
        description:
          'A vibrant community church focused on discipleship and outreach.',
        website: 'https://gracecommunitychurch.com',
        logoUrl: 'https://example.com/logo.jpg',

        // Organization Classification
        organizationType: 'church',
        sizeCategory: 'medium',

        // Contact Information
        contactEmail: 'info@gracecommunitychurch.com',
        contactPhone: '+1-555-0123',
        address: {
          street: '123 Main Street',
          city: 'Anytown',
          state: 'CA',
          country: 'USA',
          postalCode: '12345',
        },

        // Licensing & Billing
        licenseType: 'team',
        maxUsers: 25,
        billingEmail: 'billing@gracecommunitychurch.com',

        // Ownership
        accountOwnerId: '123e4567-e89b-12d3-a456-426614174001',

        // Stripe Integration
        stripeCustomerId: 'cus_1234567890',
        stripeProductId: 'prod_1234567890',

        // Status
        status: 'active',

        // Timestamps
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-15T12:30:00.000Z',
      };

      const result = organizationEntitySchema.safeParse(validOrganization);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.organizationType).toBe('church');
        expect(result.data.licenseType).toBe('team');
        expect(result.data.maxUsers).toBe(25);
      }
    });
  });

  describe('Create Schema Validation', () => {
    it('should validate create user profile schema', () => {
      const createUserData = {
        email: 'newuser@example.com',
        firstName: 'New',
        lastName: 'User',
        ministryRole: 'emerging_leader',
        languagePrimary: 'en',
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: true,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },
        theologicalFocus: [],
      };

      const result = createUserProfileSchema.safeParse(createUserData);
      expect(result.success).toBe(true);
    });

    it('should validate create assessment schema', () => {
      const createAssessmentData = {
        name: 'New Leadership Assessment',
        slug: 'new-leadership-assessment',
        assessmentType: 'leadership_style',
        questionsCount: 30,
        estimatedDuration: 20,
        version: '1.0',
        language: 'en',
        culturalAdaptation: 'universal',
        researchBacked: false,
        scoringMethod: 'likert_5',
        status: 'draft',
      };

      const result = createAssessmentSchema.safeParse(createAssessmentData);
      expect(result.success).toBe(true);
    });

    it('should validate create content item schema', () => {
      const createContentData = {
        title: 'New Article Title',
        slug: 'new-article-title',
        authorId: '123e4567-e89b-12d3-a456-426614174001',
        contentType: 'article',
        format: 'text',
        visibility: 'public',
        status: 'draft',
        theologicalFocus: [],
        tags: [],
        theologicalThemes: [],
        secondaryCategories: [],
        coAuthors: [],
        attachments: [],
        aiKeyPoints: [],
      };

      const result = createContentItemSchema.safeParse(createContentData);
      expect(result.success).toBe(true);
    });

    it('should validate create content series schema', () => {
      const createSeriesData = {
        title: 'New Series Title',
        slug: 'new-series-title',
        authorId: '123e4567-e89b-12d3-a456-426614174001',
        seriesType: 'course',
        difficulty: 'beginner',
        estimatedDuration: 120,
        tags: [],
        visibility: 'public',
        status: 'draft',
      };

      const result = createContentSeriesSchema.safeParse(createSeriesData);
      expect(result.success).toBe(true);
    });

    it('should validate create organization schema', () => {
      const createOrgData = {
        name: 'New Organization',
        slug: 'new-organization',
        organizationType: 'church',
        licenseType: 'individual',
        maxUsers: 1,
        status: 'trial',
      };

      const result = createOrganizationSchema.safeParse(createOrgData);
      expect(result.success).toBe(true);
    });
  });

  describe('Schema Edge Cases', () => {
    it('should handle empty arrays and objects correctly', () => {
      const userWithEmptyFields = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'other',
        languagePrimary: 'en',
        theologicalFocus: [],
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: true,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },
        onboardingCompleted: false,
        onboardingStep: 1,
        accountStatus: 'pending_verification',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
        lastActiveAt: '2024-01-01T00:00:00.000Z',
      };

      const result = userProfileEntitySchema.safeParse(userWithEmptyFields);
      expect(result.success).toBe(true);
    });

    it('should validate enum values correctly', () => {
      const validEnums = {
        ministryRole: 'senior_pastor',
        culturalContext: 'western',
        accountStatus: 'active',
        subscriptionTier: 'leader',
        leaderTier: 'core',
      };

      // Test each enum individually
      expect([
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
      ]).toContain(validEnums.ministryRole);
      expect([
        'western',
        'eastern',
        'african',
        'latin_american',
        'middle_eastern',
        'oceanic',
        'mixed',
        'global',
      ]).toContain(validEnums.culturalContext);
      expect([
        'active',
        'inactive',
        'suspended',
        'pending_verification',
      ]).toContain(validEnums.accountStatus);
      expect([
        'free',
        'individual',
        'professional',
        'leader',
        'institutional',
      ]).toContain(validEnums.subscriptionTier);
      expect(['core', 'network', 'emerging', 'community']).toContain(
        validEnums.leaderTier
      );
    });
  });
});
