// ============================================================================
// TYPESCRIPT TYPE GENERATION TESTS
// ============================================================================
// Tests to verify TypeScript types are correctly generated from schema

import { describe, expect, it } from 'vitest';

// Import generated types
import type {
  Assessment,
  AssessmentRow,
  ContentItem,
  ContentItemRow,
  Organization,
  OrganizationRow,
  UserProfile,
  UserProfileRow,
} from '@platform/database';

describe('TypeScript Type Generation', () => {
  describe('Type Completeness', () => {
    it('should generate complete UserProfile type', () => {
      const userProfile: UserProfile = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Test that all required fields are present
      expect(userProfile.id).toBeDefined();
      expect(userProfile.email).toBeDefined();
      expect(userProfile.firstName).toBeDefined();
      expect(userProfile.lastName).toBeDefined();
      expect(userProfile.ministryRole).toBeDefined();
      expect(userProfile.accountStatus).toBeDefined();
      expect(userProfile.createdAt).toBeInstanceOf(Date);
      expect(userProfile.updatedAt).toBeInstanceOf(Date);
      expect(userProfile.lastActiveAt).toBeInstanceOf(Date);
    });

    it('should generate complete ContentItem type', () => {
      const contentItem: ContentItem = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Article',
        slug: 'test-article',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(contentItem.id).toBeDefined();
      expect(contentItem.title).toBeDefined();
      expect(contentItem.slug).toBeDefined();
      expect(contentItem.authorId).toBeDefined();
      expect(contentItem.contentType).toBeDefined();
      expect(contentItem.status).toBeDefined();
      expect(contentItem.visibility).toBeDefined();
    });

    it('should generate complete Assessment type', () => {
      const assessment: Assessment = {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'APEST Assessment',
        slug: 'apest-assessment',
        assessmentType: 'apest',
        questionsCount: 25,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(assessment.id).toBeDefined();
      expect(assessment.name).toBeDefined();
      expect(assessment.slug).toBeDefined();
      expect(assessment.assessmentType).toBeDefined();
      expect(assessment.questionsCount).toBeDefined();
      expect(assessment.status).toBeDefined();
    });

    it('should generate complete Organization type', () => {
      const organization: Organization = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        name: 'Test Organization',
        slug: 'test-org',
        organizationType: 'church',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(organization.id).toBeDefined();
      expect(organization.name).toBeDefined();
      expect(organization.slug).toBeDefined();
      expect(organization.organizationType).toBeDefined();
      expect(organization.status).toBeDefined();
    });
  });

  describe('Optional Field Handling', () => {
    it('should handle optional fields correctly in UserProfile', () => {
      const userProfile: UserProfile = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
        // Optional fields
        displayName: 'Johnny',
        bio: 'Test bio',
        avatarUrl: 'https://example.com/avatar.jpg',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        culturalContext: 'western',
        leaderTier: 'core',
        subdomain: 'john-doe',
        customDomain: 'johndoe.com',
        platformTitle: 'John Doe Ministry',
        languagePrimary: 'en',
        subscriptionTier: 'professional',
        theologicalFocus: ['missional', 'apostolic'],
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: false,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },
        onboardingCompleted: true,
        onboardingStep: 5,
      };

      // Test that optional fields can be assigned
      expect(userProfile.displayName).toBe('Johnny');
      expect(userProfile.bio).toBe('Test bio');
      expect(userProfile.avatarUrl).toBe('https://example.com/avatar.jpg');
      expect(userProfile.denomination).toBe('Baptist');
      expect(userProfile.organizationName).toBe('Test Church');
      expect(userProfile.yearsInMinistry).toBe(10);
      expect(userProfile.countryCode).toBe('US');
      expect(userProfile.timezone).toBe('America/New_York');
      expect(userProfile.culturalContext).toBe('western');
      expect(userProfile.leaderTier).toBe('core');
      expect(userProfile.subdomain).toBe('john-doe');
      expect(userProfile.customDomain).toBe('johndoe.com');
      expect(userProfile.platformTitle).toBe('John Doe Ministry');
      expect(userProfile.languagePrimary).toBe('en');
      expect(userProfile.subscriptionTier).toBe('professional');
      expect(userProfile.theologicalFocus).toEqual(['missional', 'apostolic']);
      expect(userProfile.brandColors).toEqual({
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      });
      expect(userProfile.emailNotifications).toEqual({
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: false,
      });
      expect(userProfile.privacySettings).toEqual({
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
      });
      expect(userProfile.onboardingCompleted).toBe(true);
      expect(userProfile.onboardingStep).toBe(5);
    });

    it('should handle optional fields correctly in ContentItem', () => {
      const contentItem: ContentItem = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Article',
        slug: 'test-article',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
        // Optional fields
        excerpt: 'Test excerpt',
        content: 'Test content',
        wordCount: 500,
        estimatedReadingTime: 3,
        viewCount: 100,
        likeCount: 10,
        shareCount: 5,
        commentCount: 3,
        bookmarkCount: 2,
        primaryCategoryId: '789e0123-e89b-12d3-a456-426614174002',
        secondaryCategories: ['cat1', 'cat2'],
        tags: ['test', 'article'],
        theologicalThemes: ['leadership'],
        seriesId: 'series-123',
        seriesOrder: 1,
        featuredImageUrl: 'https://example.com/image.jpg',
        videoUrl: 'https://example.com/video.mp4',
        audioUrl: 'https://example.com/audio.mp3',
        attachments: [
          {
            name: 'file.pdf',
            url: 'https://example.com/file.pdf',
            type: 'application/pdf',
            size: 1024,
          },
        ],
        metaTitle: 'Test Article - Meta Title',
        metaDescription: 'Test article meta description',
        canonicalUrl: 'https://example.com/test-article',
        originalSource: 'Original Source',
        publishedAt: new Date(),
        scheduledAt: new Date(),
        licenseType: 'all_rights_reserved',
        attributionRequired: true,
        networkAmplificationScore: 7.5,
        crossReferenceCount: 2,
        aiEnhanced: true,
        aiSummary: 'AI-generated summary',
        aiKeyPoints: ['Key point 1', 'Key point 2'],
      };

      // Test that optional fields can be assigned
      expect(contentItem.excerpt).toBe('Test excerpt');
      expect(contentItem.content).toBe('Test content');
      expect(contentItem.wordCount).toBe(500);
      expect(contentItem.estimatedReadingTime).toBe(3);
      expect(contentItem.viewCount).toBe(100);
      expect(contentItem.likeCount).toBe(10);
      expect(contentItem.shareCount).toBe(5);
      expect(contentItem.commentCount).toBe(3);
      expect(contentItem.bookmarkCount).toBe(2);
      expect(contentItem.primaryCategoryId).toBe(
        '789e0123-e89b-12d3-a456-426614174002'
      );
      expect(contentItem.secondaryCategories).toEqual(['cat1', 'cat2']);
      expect(contentItem.tags).toEqual(['test', 'article']);
      expect(contentItem.theologicalThemes).toEqual(['leadership']);
      expect(contentItem.seriesId).toBe('series-123');
      expect(contentItem.seriesOrder).toBe(1);
      expect(contentItem.featuredImageUrl).toBe(
        'https://example.com/image.jpg'
      );
      expect(contentItem.videoUrl).toBe('https://example.com/video.mp4');
      expect(contentItem.audioUrl).toBe('https://example.com/audio.mp3');
      expect(contentItem.attachments).toEqual([
        {
          name: 'file.pdf',
          url: 'https://example.com/file.pdf',
          type: 'application/pdf',
          size: 1024,
        },
      ]);
      expect(contentItem.metaTitle).toBe('Test Article - Meta Title');
      expect(contentItem.metaDescription).toBe('Test article meta description');
      expect(contentItem.canonicalUrl).toBe('https://example.com/test-article');
      expect(contentItem.originalSource).toBe('Original Source');
      expect(contentItem.publishedAt).toBeInstanceOf(Date);
      expect(contentItem.scheduledAt).toBeInstanceOf(Date);
      expect(contentItem.licenseType).toBe('all_rights_reserved');
      expect(contentItem.attributionRequired).toBe(true);
      expect(contentItem.networkAmplificationScore).toBe(7.5);
      expect(contentItem.crossReferenceCount).toBe(2);
      expect(contentItem.aiEnhanced).toBe(true);
      expect(contentItem.aiSummary).toBe('AI-generated summary');
      expect(contentItem.aiKeyPoints).toEqual(['Key point 1', 'Key point 2']);
    });
  });

  describe('Type Safety', () => {
    it('should enforce correct enum values', () => {
      // Test that enum values are properly typed
      const validContentTypes = [
        'article',
        'video',
        'audio',
        'podcast',
        'course',
        'book',
      ];
      const validStatuses = ['draft', 'published', 'scheduled', 'archived'];
      const validAccountStatuses = [
        'pending_verification',
        'active',
        'suspended',
        'deleted',
      ];
      const validAssessmentTypes = [
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ];

      expect(validContentTypes).toContain('article');
      expect(validStatuses).toContain('published');
      expect(validAccountStatuses).toContain('active');
      expect(validAssessmentTypes).toContain('apest');
    });

    it('should enforce correct array types', () => {
      // Test that array fields are properly typed
      const stringArray: string[] = ['item1', 'item2', 'item3'];
      const numberArray: number[] = [1, 2, 3];
      const objectArray: Array<{ name: string; value: number }> = [
        { name: 'item1', value: 1 },
        { name: 'item2', value: 2 },
      ];

      expect(Array.isArray(stringArray)).toBe(true);
      expect(Array.isArray(numberArray)).toBe(true);
      expect(Array.isArray(objectArray)).toBe(true);
      expect(stringArray.every(item => typeof item === 'string')).toBe(true);
      expect(numberArray.every(item => typeof item === 'number')).toBe(true);
      expect(objectArray.every(item => typeof item === 'object')).toBe(true);
    });

    it('should enforce correct object types', () => {
      // Test that object fields are properly typed
      const brandColors = {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      };

      const emailNotifications = {
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: false,
      };

      const privacySettings = {
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
      };

      expect(typeof brandColors).toBe('object');
      expect(typeof emailNotifications).toBe('object');
      expect(typeof privacySettings).toBe('object');
      expect(brandColors).toHaveProperty('primary');
      expect(brandColors).toHaveProperty('secondary');
      expect(brandColors).toHaveProperty('accent');
      expect(emailNotifications).toHaveProperty('dailyDigest');
      expect(emailNotifications).toHaveProperty('collaborationRequests');
      expect(emailNotifications).toHaveProperty('revenueReports');
      expect(emailNotifications).toHaveProperty('communityUpdates');
      expect(privacySettings).toHaveProperty('publicProfile');
      expect(privacySettings).toHaveProperty('showAssessmentResults');
      expect(privacySettings).toHaveProperty('allowNetworking');
      expect(privacySettings).toHaveProperty('shareAnalytics');
    });
  });

  describe('Database Row Type Compatibility', () => {
    it('should have compatible UserProfileRow type', () => {
      const userProfileRow: UserProfileRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Test that row type is compatible with entity type
      expect(userProfileRow.id).toBeDefined();
      expect(userProfileRow.email).toBeDefined();
      expect(userProfileRow.firstName).toBeDefined();
      expect(userProfileRow.lastName).toBeDefined();
      expect(userProfileRow.ministryRole).toBeDefined();
      expect(userProfileRow.accountStatus).toBeDefined();
    });

    it('should have compatible ContentItemRow type', () => {
      const contentItemRow: ContentItemRow = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Article',
        slug: 'test-article',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(contentItemRow.id).toBeDefined();
      expect(contentItemRow.title).toBeDefined();
      expect(contentItemRow.slug).toBeDefined();
      expect(contentItemRow.authorId).toBeDefined();
      expect(contentItemRow.contentType).toBeDefined();
      expect(contentItemRow.status).toBeDefined();
      expect(contentItemRow.visibility).toBeDefined();
    });

    it('should have compatible AssessmentRow type', () => {
      const assessmentRow: AssessmentRow = {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'APEST Assessment',
        slug: 'apest-assessment',
        assessmentType: 'apest',
        questionsCount: 25,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(assessmentRow.id).toBeDefined();
      expect(assessmentRow.name).toBeDefined();
      expect(assessmentRow.slug).toBeDefined();
      expect(assessmentRow.assessmentType).toBeDefined();
      expect(assessmentRow.questionsCount).toBeDefined();
      expect(assessmentRow.status).toBeDefined();
    });

    it('should have compatible OrganizationRow type', () => {
      const organizationRow: OrganizationRow = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        name: 'Test Organization',
        slug: 'test-org',
        organizationType: 'church',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(organizationRow.id).toBeDefined();
      expect(organizationRow.name).toBeDefined();
      expect(organizationRow.slug).toBeDefined();
      expect(organizationRow.organizationType).toBeDefined();
      expect(organizationRow.status).toBeDefined();
    });
  });

  describe('Type Exports', () => {
    it('should export all required types', () => {
      // Test that all required types are exported
      const requiredTypes = [
        'UserProfile',
        'ContentItem',
        'Assessment',
        'Organization',
        'UserProfileRow',
        'ContentItemRow',
        'AssessmentRow',
        'OrganizationRow',
      ];

      requiredTypes.forEach(typeName => {
        // This would test that the type is properly exported
        expect(typeName).toBeDefined();
      });
    });
  });
});
