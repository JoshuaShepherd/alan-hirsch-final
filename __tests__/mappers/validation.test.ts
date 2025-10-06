import {
  toContentItemEntity,
  toContentItemResponseDTO,
  toUserProfileEntity,
  toUserProfileResponseDTO,
} from '@/lib/mappers';
import type { ContentItemRow, UserProfileRow } from '@platform/database';
import {
  contentItemEntitySchema,
  contentItemResponseSchema,
  userProfileEntitySchema,
  userProfileResponseSchema,
} from '@platform/shared/contracts';
import { describe, expect, it } from 'vitest';

// ============================================================================
// MOCK DATA FACTORIES
// ============================================================================

function createMockUserProfileRow(): UserProfileRow {
  return {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    first_name: 'John',
    last_name: 'Doe',
    display_name: 'Johnny',
    bio: 'Test bio',
    avatar_url: 'https://example.com/avatar.jpg',
    ministry_role: 'senior_pastor',
    denomination: 'Baptist',
    organization_name: 'Test Church',
    years_in_ministry: 10,
    country_code: 'US',
    timezone: 'America/New_York',
    cultural_context: 'western',

    // APEST Assessment Scores
    assessment_movement_alignment: 85,
    assessment_audience_engagement: 72,
    assessment_content_readiness: 78,
    assessment_revenue_potential: 65,
    assessment_network_effects: 90,
    assessment_strategic_fit: 68,
    assessment_total: 458,

    // Leadership & Platform
    leader_tier: 'advanced',
    subdomain: 'john-doe',
    custom_domain: 'johndoe.com',
    platform_title: 'John Doe Ministry',
    language_primary: 'en',
    subscription_tier: 'premium',

    // Complex Fields
    theological_focus: ['ecclesiology', 'missiology'],
    brand_colors: {
      accent: '#059669',
      primary: '#2563eb',
      secondary: '#64748b',
    },
    email_notifications: {
      dailyDigest: true,
      revenueReports: true,
      communityUpdates: true,
      collaborationRequests: false,
    },
    privacy_settings: {
      publicProfile: true,
      shareAnalytics: false,
      allowNetworking: true,
      showAssessmentResults: false,
    },

    // Onboarding & Status
    onboarding_completed: true,
    onboarding_step: 5,
    account_status: 'active',

    // Timestamps
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-12-01T00:00:00Z'),
    last_active_at: new Date('2023-12-01T12:00:00Z'),
  };
}

function createMockContentItemRow(): ContentItemRow {
  return {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Test Article',
    slug: 'test-article',
    excerpt: 'Test excerpt',
    content: 'Test content',
    author_id: '123e4567-e89b-12d3-a456-426614174000',
    co_authors: [],
    content_type: 'article',
    format: 'markdown',
    word_count: 1500,
    estimated_reading_time: 8,

    // Engagement metrics
    view_count: 1250,
    like_count: 45,
    share_count: 12,
    comment_count: 8,
    bookmark_count: 23,

    // Categorization
    primary_category_id: '123e4567-e89b-12d3-a456-426614174002',
    secondary_categories: ['123e4567-e89b-12d3-a456-426614174003'],
    tags: ['leadership', 'ministry'],
    theological_themes: ['ecclesiology'],

    // Series information
    series_id: '123e4567-e89b-12d3-a456-426614174004',
    series_order: 1,

    // Visibility & status
    visibility: 'public',
    status: 'published',

    // AI enhancement
    network_amplification_score: 7.5,
    cross_reference_count: 3,
    ai_enhanced: true,
    ai_summary: 'AI generated summary',
    ai_key_points: ['Point 1', 'Point 2'],

    // Media & attachments
    featured_image_url: 'https://example.com/image.jpg',
    video_url: null,
    audio_url: null,
    attachments: [
      {
        name: 'document.pdf',
        url: 'https://example.com/document.pdf',
        type: 'application/pdf',
        size: 1024000,
      },
    ],

    // SEO & metadata
    meta_title: 'Test Article - SEO Title',
    meta_description: 'Test meta description',
    canonical_url: 'https://example.com/test-article',
    original_source: null,

    // Publication & scheduling
    published_at: new Date('2023-06-01T00:00:00Z'),
    scheduled_at: null,

    // Licensing
    license_type: 'all_rights_reserved',
    attribution_required: true,

    // Timestamps
    created_at: new Date('2023-05-01T00:00:00Z'),
    updated_at: new Date('2023-06-01T00:00:00Z'),
  };
}

function createMockUserProfileRowWithRelations() {
  const baseRow = createMockUserProfileRow();
  return {
    ...baseRow,
    organization: {
      id: '123e4567-e89b-12d3-a456-426614174005',
      name: 'Test Church',
      slug: 'test-church',
      type: 'church',
    },
    subscription: {
      id: '123e4567-e89b-12d3-a456-426614174006',
      planName: 'Premium Plan',
      status: 'active',
      tier: 'premium',
    },
  };
}

function createMockContentItemRowWithRelations() {
  const baseRow = createMockContentItemRow();
  return {
    ...baseRow,
    author: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'Johnny',
      avatarUrl: 'https://example.com/avatar.jpg',
    },
    primaryCategory: {
      id: '123e4567-e89b-12d3-a456-426614174002',
      name: 'Leadership',
      slug: 'leadership',
    },
    series: {
      id: '123e4567-e89b-12d3-a456-426614174004',
      title: 'Leadership Series',
      slug: 'leadership-series',
      totalEpisodes: 5,
    },
    coAuthors: [
      {
        id: '123e4567-e89b-12d3-a456-426614174007',
        firstName: 'Jane',
        lastName: 'Smith',
        displayName: 'Jane Smith',
      },
    ],
  };
}

// ============================================================================
// USER MAPPER VALIDATION TESTS
// ============================================================================

describe('User Mapper Output Validation', () => {
  describe('toUserProfileEntity', () => {
    it('should produce valid UserProfileEntity', () => {
      const mockRow = createMockUserProfileRow();
      const result = toUserProfileEntity(mockRow);

      // Validate against contract schema
      expect(() => userProfileEntitySchema.parse(result)).not.toThrow();

      // Verify specific fields
      expect(result.id).toBe(mockRow.id);
      expect(result.email).toBe(mockRow.email);
      expect(result.firstName).toBe(mockRow.first_name);
      expect(result.lastName).toBe(mockRow.last_name);
      expect(result.displayName).toBe(mockRow.display_name);
      expect(result.ministryRole).toBe(mockRow.ministry_role);
      expect(result.assessmentMovementAlignment).toBe(
        mockRow.assessment_movement_alignment
      );
      expect(result.createdAt).toBe(mockRow.created_at.toISOString());
    });

    it('should handle optional fields correctly', () => {
      const mockRow = createMockUserProfileRow();
      // Remove optional fields
      delete mockRow.display_name;
      delete mockRow.bio;
      delete mockRow.avatar_url;
      delete mockRow.denomination;

      const result = toUserProfileEntity(mockRow);

      expect(() => userProfileEntitySchema.parse(result)).not.toThrow();
      expect(result.displayName).toBeUndefined();
      expect(result.bio).toBeUndefined();
      expect(result.avatarUrl).toBeUndefined();
      expect(result.denomination).toBeUndefined();
    });

    it('should handle null values correctly', () => {
      const mockRow = createMockUserProfileRow();
      mockRow.display_name = null;
      mockRow.bio = null;
      mockRow.avatar_url = null;

      const result = toUserProfileEntity(mockRow);

      expect(() => userProfileEntitySchema.parse(result)).not.toThrow();
      expect(result.displayName).toBeUndefined();
      expect(result.bio).toBeUndefined();
      expect(result.avatarUrl).toBeUndefined();
    });
  });

  describe('toUserProfileResponseDTO', () => {
    it('should produce valid UserProfileResponse', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      const result = toUserProfileResponseDTO(mockRow);

      // Validate against contract schema
      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();

      // Verify computed fields
      expect(result.isActive).toBe(true);
      expect(result.hasCompletedOnboarding).toBe(true);
      expect(result.fullName).toBe('John Doe');
      expect(result.displayNameOrFullName).toBe('Johnny');
      expect(result.hasCustomDomain).toBe(true);
      expect(result.hasSubdomain).toBe(true);
      expect(result.isPublicProfile).toBe(true);
      expect(result.canReceiveNotifications).toBe(true);
      expect(result.assessmentCompleted).toBe(true);
      expect(result.primaryGift).toBe('evangelistic'); // Highest APEST score
      expect(result.secondaryGift).toBe('apostolic'); // Second highest
      expect(result.ministryExperience).toBe('10 years in ministry');
      expect(result.locationDisplay).toBe('US (America/New_York)');

      // Verify related data
      expect(result.organization).toBeDefined();
      expect(result.organization?.name).toBe('Test Church');
      expect(result.subscription).toBeDefined();
      expect(result.subscription?.tier).toBe('premium');
    });

    it('should handle inactive user correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      mockRow.account_status = 'suspended';
      mockRow.onboarding_completed = false;

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.isActive).toBe(false);
      expect(result.hasCompletedOnboarding).toBe(false);
    });

    it('should handle APEST scores correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      // Set specific APEST scores
      mockRow.assessment_movement_alignment = 95; // Apostolic
      mockRow.assessment_audience_engagement = 80; // Prophetic
      mockRow.assessment_content_readiness = 70; // Teaching
      mockRow.assessment_network_effects = 85; // Evangelistic
      mockRow.assessment_strategic_fit = 75; // Shepherding

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.primaryGift).toBe('apostolic');
      expect(result.secondaryGift).toBe('evangelistic');
    });

    it('should handle zero APEST scores correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      // Set all APEST scores to 0
      mockRow.assessment_movement_alignment = 0;
      mockRow.assessment_audience_engagement = 0;
      mockRow.assessment_content_readiness = 0;
      mockRow.assessment_network_effects = 0;
      mockRow.assessment_strategic_fit = 0;
      mockRow.assessment_total = 0;

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.assessmentCompleted).toBe(false);
      expect(result.primaryGift).toBeDefined(); // Should still have a primary gift
      expect(result.secondaryGift).toBeDefined(); // Should still have a secondary gift
    });

    it('should handle missing ministry experience correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      mockRow.years_in_ministry = null;

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.ministryExperience).toBeUndefined();
    });

    it('should handle missing location correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      mockRow.country_code = null;
      mockRow.timezone = null;

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.locationDisplay).toBeUndefined();
    });

    it('should handle privacy settings correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      mockRow.privacy_settings = { publicProfile: false };

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.isPublicProfile).toBe(false);
    });

    it('should handle email notifications correctly', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      mockRow.email_notifications = {
        dailyDigest: false,
        revenueReports: false,
        communityUpdates: false,
        collaborationRequests: false,
      };

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.canReceiveNotifications).toBe(false);
    });
  });
});

// ============================================================================
// CONTENT MAPPER VALIDATION TESTS
// ============================================================================

describe('Content Mapper Output Validation', () => {
  describe('toContentItemEntity', () => {
    it('should produce valid ContentItemEntity', () => {
      const mockRow = createMockContentItemRow();
      const result = toContentItemEntity(mockRow);

      // Validate against contract schema
      expect(() => contentItemEntitySchema.parse(result)).not.toThrow();

      // Verify specific fields
      expect(result.id).toBe(mockRow.id);
      expect(result.title).toBe(mockRow.title);
      expect(result.slug).toBe(mockRow.slug);
      expect(result.authorId).toBe(mockRow.author_id);
      expect(result.contentType).toBe(mockRow.content_type);
      expect(result.viewCount).toBe(mockRow.view_count);
      expect(result.createdAt).toBe(mockRow.created_at.toISOString());
    });

    it('should handle optional fields correctly', () => {
      const mockRow = createMockContentItemRow();
      // Remove optional fields
      delete mockRow.excerpt;
      delete mockRow.content;
      delete mockRow.featured_image_url;
      delete mockRow.video_url;
      delete mockRow.audio_url;

      const result = toContentItemEntity(mockRow);

      expect(() => contentItemEntitySchema.parse(result)).not.toThrow();
      expect(result.excerpt).toBeUndefined();
      expect(result.content).toBeUndefined();
      expect(result.featuredImageUrl).toBeUndefined();
      expect(result.videoUrl).toBeUndefined();
      expect(result.audioUrl).toBeUndefined();
    });

    it('should handle arrays correctly', () => {
      const mockRow = createMockContentItemRow();
      mockRow.tags = ['tag1', 'tag2', 'tag3'];
      mockRow.theological_themes = ['theme1', 'theme2'];
      mockRow.attachments = [
        {
          name: 'file1.pdf',
          url: 'https://example.com/file1.pdf',
          type: 'application/pdf',
          size: 1024,
        },
        {
          name: 'file2.jpg',
          url: 'https://example.com/file2.jpg',
          type: 'image/jpeg',
          size: 2048,
        },
      ];

      const result = toContentItemEntity(mockRow);

      expect(() => contentItemEntitySchema.parse(result)).not.toThrow();
      expect(result.tags).toEqual(['tag1', 'tag2', 'tag3']);
      expect(result.theologicalThemes).toEqual(['theme1', 'theme2']);
      expect(result.attachments).toHaveLength(2);
    });
  });

  describe('toContentItemResponseDTO', () => {
    it('should produce valid ContentItemResponse', () => {
      const mockRow = createMockContentItemRowWithRelations();
      const result = toContentItemResponseDTO(mockRow);

      // Validate against contract schema
      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();

      // Verify computed fields
      expect(result.isPublished).toBe(true);
      expect(result.isDraft).toBe(false);
      expect(result.isScheduled).toBe(false);
      expect(result.isArchived).toBe(false);
      expect(result.hasFeaturedImage).toBe(true);
      expect(result.hasVideo).toBe(false);
      expect(result.hasAudio).toBe(false);
      expect(result.hasAttachments).toBe(true);
      expect(result.isAiEnhanced).toBe(true);
      expect(result.readingTimeText).toBe('8 min read');
      expect(result.viewCountText).toBeDefined();
      expect(result.engagementScore).toBeGreaterThanOrEqual(0);
      expect(result.engagementScore).toBeLessThanOrEqual(10);

      // Verify related data
      expect(result.author).toBeDefined();
      expect(result.author?.firstName).toBe('John');
      expect(result.primaryCategory).toBeDefined();
      expect(result.primaryCategory?.name).toBe('Leadership');
      expect(result.series).toBeDefined();
      expect(result.series?.title).toBe('Leadership Series');
      expect(result.coAuthors).toHaveLength(1);
      expect(result.coAuthors[0].firstName).toBe('Jane');
    });

    it('should handle draft content correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.status = 'draft';

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.isPublished).toBe(false);
      expect(result.isDraft).toBe(true);
      expect(result.isScheduled).toBe(false);
      expect(result.isArchived).toBe(false);
    });

    it('should handle scheduled content correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.status = 'scheduled';
      mockRow.scheduled_at = new Date(Date.now() + 86400000); // Tomorrow

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.isPublished).toBe(false);
      expect(result.isDraft).toBe(false);
      expect(result.isScheduled).toBe(true);
      expect(result.isArchived).toBe(false);
    });

    it('should handle archived content correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.status = 'archived';

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.isPublished).toBe(false);
      expect(result.isDraft).toBe(false);
      expect(result.isScheduled).toBe(false);
      expect(result.isArchived).toBe(true);
    });

    it('should handle content without media correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.featured_image_url = null;
      mockRow.video_url = null;
      mockRow.audio_url = null;
      mockRow.attachments = [];

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.hasFeaturedImage).toBe(false);
      expect(result.hasVideo).toBe(false);
      expect(result.hasAudio).toBe(false);
      expect(result.hasAttachments).toBe(false);
    });

    it('should calculate reading time correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.estimated_reading_time = null;
      mockRow.word_count = 1000;

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.readingTimeText).toBe('5 min read'); // 1000 / 200 = 5
    });

    it('should handle zero engagement metrics correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.view_count = 0;
      mockRow.like_count = 0;
      mockRow.share_count = 0;
      mockRow.comment_count = 0;
      mockRow.bookmark_count = 0;

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.engagementScore).toBe(0);
      expect(result.viewCountText).toBe('0');
    });

    it('should handle high engagement metrics correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.view_count = 100000;
      mockRow.like_count = 5000;
      mockRow.share_count = 1000;
      mockRow.comment_count = 500;
      mockRow.bookmark_count = 2000;

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.engagementScore).toBeGreaterThan(5);
      expect(result.engagementScore).toBeLessThanOrEqual(10);
      expect(result.viewCountText).toBe('100K');
    });

    it('should handle AI enhancement correctly', () => {
      const mockRow = createMockContentItemRowWithRelations();
      mockRow.ai_enhanced = false;
      mockRow.ai_summary = null;
      mockRow.ai_key_points = [];

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.isAiEnhanced).toBe(false);
    });
  });
});

// ============================================================================
// EDGE CASE VALIDATION TESTS
// ============================================================================

describe('Edge Case Validation', () => {
  describe('Null and Undefined Handling', () => {
    it('should handle completely null optional fields', () => {
      const mockRow = createMockUserProfileRow();
      // Set all optional fields to null
      mockRow.display_name = null;
      mockRow.bio = null;
      mockRow.avatar_url = null;
      mockRow.denomination = null;
      mockRow.organization_name = null;
      mockRow.years_in_ministry = null;
      mockRow.country_code = null;
      mockRow.timezone = null;
      mockRow.cultural_context = null;
      mockRow.leader_tier = null;
      mockRow.subdomain = null;
      mockRow.custom_domain = null;
      mockRow.platform_title = null;

      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.displayName).toBeUndefined();
      expect(result.bio).toBeUndefined();
      expect(result.avatarUrl).toBeUndefined();
    });

    it('should handle empty arrays correctly', () => {
      const mockRow = createMockContentItemRow();
      mockRow.tags = [];
      mockRow.theological_themes = [];
      mockRow.attachments = [];

      const result = toContentItemResponseDTO(mockRow);

      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
      expect(result.tags).toEqual([]);
      expect(result.theologicalThemes).toEqual([]);
      expect(result.attachments).toEqual([]);
    });
  });

  describe('Date Handling', () => {
    it('should format all dates as ISO strings', () => {
      const mockRow = createMockUserProfileRow();
      const result = toUserProfileResponseDTO(mockRow);

      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
      expect(result.createdAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
      expect(result.updatedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
      expect(result.lastActiveAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      );
    });
  });

  describe('Type Safety', () => {
    it('should ensure all required fields are present', () => {
      const mockRow = createMockUserProfileRowWithRelations();
      const result = toUserProfileResponseDTO(mockRow);

      // Check that all required fields from the schema are present
      const requiredFields = [
        'id',
        'email',
        'firstName',
        'lastName',
        'ministryRole',
        'languagePrimary',
        'subscriptionTier',
        'theologicalFocus',
        'brandColors',
        'emailNotifications',
        'privacySettings',
        'onboardingCompleted',
        'onboardingStep',
        'accountStatus',
        'createdAt',
        'updatedAt',
        'lastActiveAt',
        // Computed fields
        'isActive',
        'hasCompletedOnboarding',
        'fullName',
        'displayNameOrFullName',
        'hasCustomDomain',
        'hasSubdomain',
        'isPublicProfile',
        'canReceiveNotifications',
        'assessmentCompleted',
        'readingTimeText',
        'viewCountText',
        'engagementScore',
      ];

      requiredFields.forEach(field => {
        expect(result).toHaveProperty(field);
      });
    });
  });
});

// ============================================================================
// PERFORMANCE VALIDATION TESTS
// ============================================================================

describe('Performance Validation', () => {
  it('should handle large datasets efficiently', () => {
    const startTime = performance.now();

    // Create 1000 user profiles
    const results = Array.from({ length: 1000 }, () => {
      const mockRow = createMockUserProfileRowWithRelations();
      return toUserProfileResponseDTO(mockRow);
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Should complete in under 1 second
    expect(executionTime).toBeLessThan(1000);
    expect(results).toHaveLength(1000);

    // All results should be valid
    results.forEach(result => {
      expect(() => userProfileResponseSchema.parse(result)).not.toThrow();
    });
  });

  it('should handle large content datasets efficiently', () => {
    const startTime = performance.now();

    // Create 1000 content items
    const results = Array.from({ length: 1000 }, () => {
      const mockRow = createMockContentItemRowWithRelations();
      return toContentItemResponseDTO(mockRow);
    });

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Should complete in under 1 second
    expect(executionTime).toBeLessThan(1000);
    expect(results).toHaveLength(1000);

    // All results should be valid
    results.forEach(result => {
      expect(() => contentItemResponseSchema.parse(result)).not.toThrow();
    });
  });
});
