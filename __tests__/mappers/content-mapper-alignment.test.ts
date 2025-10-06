import type { CreateContentItem, UpdateContentItem } from '@platform/contracts';
import type {
  ContentCategory,
  ContentItem,
  ContentSeries,
} from '@platform/database';
import { describe, expect, it } from 'vitest';

// Import the actual mapper functions
import {
  fromCreateContentItem,
  fromUpdateContentItem,
  getReadingTimeEstimate,
  isContentPublic,
  toContentCategoryEntity,
  toContentItemEntity,
  toContentItemResponseDTO,
  toContentSeriesEntity,
} from '../../apps/alan-hirsch-platform/lib/mappers/content';

describe('Content Mapper Alignment Tests', () => {
  const mockContentItemRow: ContentItem = {
    id: '123e4567-e89b-12d3-a456-426614174001',
    title: 'Test Article',
    slug: 'test-article',
    excerpt: 'This is a test article excerpt',
    content: 'This is the full content of the test article.',
    author_id: '123e4567-e89b-12d3-a456-426614174000',
    co_authors: ['author1', 'author2'],
    content_type: 'article',
    format: 'text',
    word_count: 1500,
    estimated_reading_time: 8,
    view_count: 1250,
    like_count: 45,
    share_count: 12,
    comment_count: 8,
    bookmark_count: 23,
    primary_category_id: 'cat-123',
    secondary_categories: ['cat-456', 'cat-789'],
    tags: ['ministry', 'leadership', 'test'],
    theological_themes: ['missional', 'apostolic'],
    series_id: 'series-123',
    series_order: 1,
    visibility: 'public',
    status: 'published',
    network_amplification_score: '7.5',
    cross_reference_count: 5,
    ai_enhanced: true,
    ai_summary: 'AI-generated summary',
    ai_key_points: ['Point 1', 'Point 2', 'Point 3'],
    featured_image_url: 'https://example.com/image.jpg',
    video_url: null,
    audio_url: null,
    attachments: [
      {
        name: 'file.pdf',
        url: 'https://example.com/file.pdf',
        type: 'application/pdf',
        size: 1024,
      },
    ],
    meta_title: 'Test Article Meta Title',
    meta_description: 'Test article meta description',
    canonical_url: 'https://example.com/test-article',
    original_source: 'Original source',
    published_at: new Date('2023-05-01T00:00:00Z'),
    scheduled_at: null,
    license_type: 'all_rights_reserved',
    attribution_required: true,
    created_at: new Date('2023-04-01T00:00:00Z'),
    updated_at: new Date('2023-05-01T00:00:00Z'),
  };

  const mockContentItemWithRelations = {
    ...mockContentItemRow,
    author: {
      id: '123e4567-e89b-12d3-a456-426614174000',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'Johnny',
      avatarUrl: 'https://example.com/avatar.jpg',
    },
    primaryCategory: {
      id: 'cat-123',
      name: 'Leadership',
      slug: 'leadership',
    },
    series: {
      id: 'series-123',
      title: 'Leadership Series',
      slug: 'leadership-series',
      totalEpisodes: 5,
    },
    coAuthors: [
      {
        id: 'author1',
        firstName: 'Jane',
        lastName: 'Smith',
        displayName: 'Jane S.',
      },
      {
        id: 'author2',
        firstName: 'Bob',
        lastName: 'Johnson',
        displayName: 'Bob J.',
      },
    ],
  };

  const mockContentCategoryRow: ContentCategory = {
    id: 'cat-123',
    name: 'Leadership',
    slug: 'leadership',
    description: 'Leadership development content',
    parent_id: 'cat-parent-123',
    order_index: 1,
    theological_discipline: 'practical',
    movement_relevance_score: 8,
    apest_relevance: {
      apostolic: 8,
      prophetic: 6,
      evangelistic: 7,
      shepherding: 9,
      teaching: 8,
    },
    meta_description: 'Leadership meta description',
    keywords: ['leadership', 'development', 'ministry'],
    is_active: true,
    created_at: new Date('2023-01-01T00:00:00Z'),
    updated_at: new Date('2023-06-01T00:00:00Z'),
  };

  const mockContentSeriesRow: ContentSeries = {
    id: 'series-123',
    title: 'Leadership Series',
    slug: 'leadership-series',
    description: 'A comprehensive series on leadership',
    excerpt: 'Leadership series excerpt',
    author_id: '123e4567-e89b-12d3-a456-426614174000',
    collaborators: ['collab1', 'collab2'],
    series_type: 'course',
    difficulty: 'intermediate',
    total_items: 5,
    estimated_duration: 120,
    primary_category_id: 'cat-123',
    tags: ['leadership', 'course', 'series'],
    visibility: 'public',
    status: 'published',
    featured_image_url: 'https://example.com/series-image.jpg',
    meta_description: 'Leadership series meta description',
    created_at: new Date('2023-03-01T00:00:00Z'),
    updated_at: new Date('2023-06-01T00:00:00Z'),
    published_at: new Date('2023-04-01T00:00:00Z'),
  };

  describe('toContentItemEntity', () => {
    it('should transform database row to ContentItemEntity correctly', () => {
      const result = toContentItemEntity(mockContentItemRow);

      expect(result).toMatchObject({
        id: '123e4567-e89b-12d3-a456-426614174001',
        title: 'Test Article',
        slug: 'test-article',
        excerpt: 'This is a test article excerpt',
        content: 'This is the full content of the test article.',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        coAuthors: ['author1', 'author2'],
        contentType: 'article',
        format: 'text',
        wordCount: 1500,
        estimatedReadingTime: 8,
        viewCount: 1250,
        likeCount: 45,
        shareCount: 12,
        commentCount: 8,
        bookmarkCount: 23,
        primaryCategoryId: 'cat-123',
        secondaryCategories: ['cat-456', 'cat-789'],
        tags: ['ministry', 'leadership', 'test'],
        theologicalThemes: ['missional', 'apostolic'],
        seriesId: 'series-123',
        seriesOrder: 1,
        visibility: 'public',
        status: 'published',
        networkAmplificationScore: 7.5,
        crossReferenceCount: 5,
        aiEnhanced: true,
        aiSummary: 'AI-generated summary',
        aiKeyPoints: ['Point 1', 'Point 2', 'Point 3'],
        featuredImageUrl: 'https://example.com/image.jpg',
        videoUrl: undefined,
        audioUrl: undefined,
        attachments: [
          {
            name: 'file.pdf',
            url: 'https://example.com/file.pdf',
            type: 'application/pdf',
            size: 1024,
          },
        ],
        metaTitle: 'Test Article Meta Title',
        metaDescription: 'Test article meta description',
        canonicalUrl: 'https://example.com/test-article',
        originalSource: 'Original source',
        licenseType: 'all_rights_reserved',
        attributionRequired: true,
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-04-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-05-01T00:00:00.000Z');
      expect(result.publishedAt).toBe('2023-05-01T00:00:00.000Z');
      expect(result.scheduledAt).toBeUndefined();
    });

    it('should handle null and undefined values correctly', () => {
      const rowWithNulls: ContentItem = {
        ...mockContentItemRow,
        excerpt: null,
        content: null,
        co_authors: null,
        word_count: null,
        estimated_reading_time: null,
        primary_category_id: null,
        secondary_categories: null,
        tags: null,
        theological_themes: null,
        series_id: null,
        series_order: null,
        featured_image_url: null,
        video_url: null,
        audio_url: null,
        attachments: null,
        meta_title: null,
        meta_description: null,
        canonical_url: null,
        original_source: null,
        published_at: null,
        scheduled_at: null,
      };

      const result = toContentItemEntity(rowWithNulls);

      expect(result.excerpt).toBeUndefined();
      expect(result.content).toBeUndefined();
      expect(result.coAuthors).toEqual([]);
      expect(result.wordCount).toBeUndefined();
      expect(result.estimatedReadingTime).toBeUndefined();
      expect(result.primaryCategoryId).toBeUndefined();
      expect(result.secondaryCategories).toEqual([]);
      expect(result.tags).toEqual([]);
      expect(result.theologicalThemes).toEqual([]);
      expect(result.seriesId).toBeUndefined();
      expect(result.seriesOrder).toBeUndefined();
      expect(result.featuredImageUrl).toBeUndefined();
      expect(result.videoUrl).toBeUndefined();
      expect(result.audioUrl).toBeUndefined();
      expect(result.attachments).toEqual([]);
      expect(result.metaTitle).toBeUndefined();
      expect(result.metaDescription).toBeUndefined();
      expect(result.canonicalUrl).toBeUndefined();
      expect(result.originalSource).toBeUndefined();
      expect(result.publishedAt).toBeUndefined();
      expect(result.scheduledAt).toBeUndefined();
    });

    it('should provide default values for arrays and objects', () => {
      const rowWithDefaults: ContentItem = {
        ...mockContentItemRow,
        co_authors: [],
        secondary_categories: [],
        tags: [],
        theological_themes: [],
        attachments: [],
      };

      const result = toContentItemEntity(rowWithDefaults);

      expect(result.coAuthors).toEqual([]);
      expect(result.secondaryCategories).toEqual([]);
      expect(result.tags).toEqual([]);
      expect(result.theologicalThemes).toEqual([]);
      expect(result.attachments).toEqual([]);
    });
  });

  describe('toContentItemResponseDTO', () => {
    it('should transform database row with relations to ContentItemResponse', () => {
      const result = toContentItemResponseDTO(mockContentItemWithRelations);

      // Validate base entity fields
      expect(result.id).toBe('123e4567-e89b-12d3-a456-426614174001');
      expect(result.title).toBe('Test Article');
      expect(result.slug).toBe('test-article');

      // Validate computed fields
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
      expect(result.viewCountText).toBe('1.3K');
      expect(result.engagementScore).toBeGreaterThanOrEqual(0);
      expect(result.engagementScore).toBeLessThanOrEqual(10);

      // Validate related data
      expect(result.author).toEqual({
        id: '123e4567-e89b-12d3-a456-426614174000',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'Johnny',
        avatarUrl: 'https://example.com/avatar.jpg',
      });

      expect(result.primaryCategory).toEqual({
        id: 'cat-123',
        name: 'Leadership',
        slug: 'leadership',
      });

      expect(result.series).toEqual({
        id: 'series-123',
        title: 'Leadership Series',
        slug: 'leadership-series',
        totalEpisodes: 5,
      });

      expect(result.coAuthors).toEqual([
        {
          id: 'author1',
          firstName: 'Jane',
          lastName: 'Smith',
          displayName: 'Jane S.',
        },
        {
          id: 'author2',
          firstName: 'Bob',
          lastName: 'Johnson',
          displayName: 'Bob J.',
        },
      ]);
    });

    it('should handle draft status correctly', () => {
      const draftRow = {
        ...mockContentItemRow,
        status: 'draft',
      };

      const result = toContentItemResponseDTO(draftRow);

      expect(result.isPublished).toBe(false);
      expect(result.isDraft).toBe(true);
      expect(result.isScheduled).toBe(false);
      expect(result.isArchived).toBe(false);
    });

    it('should handle scheduled status correctly', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7); // 7 days from now

      const scheduledRow = {
        ...mockContentItemRow,
        status: 'scheduled',
        scheduled_at: futureDate,
      };

      const result = toContentItemResponseDTO(scheduledRow);

      expect(result.isPublished).toBe(false);
      expect(result.isDraft).toBe(false);
      expect(result.isScheduled).toBe(true);
      expect(result.isArchived).toBe(false);
    });

    it('should calculate reading time from word count when not provided', () => {
      const rowWithoutReadingTime = {
        ...mockContentItemRow,
        estimated_reading_time: null,
        word_count: 1000,
      };

      const result = toContentItemResponseDTO(rowWithoutReadingTime);

      expect(result.readingTimeText).toBe('5 min read'); // 1000 / 200 = 5
    });

    it('should handle missing word count and reading time', () => {
      const rowWithoutTime = {
        ...mockContentItemRow,
        estimated_reading_time: null,
        word_count: null,
      };

      const result = toContentItemResponseDTO(rowWithoutTime);

      expect(result.readingTimeText).toBe('Unknown');
    });
  });

  describe('toContentCategoryEntity', () => {
    it('should transform database row to ContentCategoryEntity correctly', () => {
      const result = toContentCategoryEntity(mockContentCategoryRow);

      expect(result).toMatchObject({
        id: 'cat-123',
        name: 'Leadership',
        slug: 'leadership',
        description: 'Leadership development content',
        parentId: 'cat-parent-123',
        orderIndex: 1,
        theologicalDiscipline: 'practical',
        movementRelevanceScore: 8,
        apestRelevance: {
          apostolic: 8,
          prophetic: 6,
          evangelistic: 7,
          shepherding: 9,
          teaching: 8,
        },
        metaDescription: 'Leadership meta description',
        keywords: ['leadership', 'development', 'ministry'],
        isActive: true,
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-01-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-06-01T00:00:00.000Z');
    });
  });

  describe('toContentSeriesEntity', () => {
    it('should transform database row to ContentSeriesEntity correctly', () => {
      const result = toContentSeriesEntity(mockContentSeriesRow);

      expect(result).toMatchObject({
        id: 'series-123',
        title: 'Leadership Series',
        slug: 'leadership-series',
        description: 'A comprehensive series on leadership',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        collaborators: ['collab1', 'collab2'],
        seriesType: 'course',
        difficulty: 'intermediate',
        totalItems: 5,
        estimatedDuration: 120,
        primaryCategoryId: 'cat-123',
        tags: ['leadership', 'course', 'series'],
        visibility: 'public',
        status: 'published',
        featuredImageUrl: 'https://example.com/series-image.jpg',
        metaDescription: 'Leadership series meta description',
      });

      // Validate timestamps are ISO strings
      expect(result.createdAt).toBe('2023-03-01T00:00:00.000Z');
      expect(result.updatedAt).toBe('2023-06-01T00:00:00.000Z');
      expect(result.publishedAt).toBe('2023-04-01T00:00:00.000Z');
    });
  });

  describe('fromCreateContentItem', () => {
    it('should transform CreateContentItem to database insert format', () => {
      const createData: CreateContentItem = {
        title: 'New Article',
        slug: 'new-article',
        excerpt: 'New article excerpt',
        content: 'New article content',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        coAuthors: ['author1'],
        contentType: 'article',
        format: 'text',
        wordCount: 1000,
        estimatedReadingTime: 5,
        primaryCategoryId: 'cat-123',
        secondaryCategories: ['cat-456'],
        tags: ['new', 'article'],
        theologicalThemes: ['missional'],
        seriesId: 'series-123',
        seriesOrder: 1,
        visibility: 'public',
        status: 'draft',
        featuredImageUrl: 'https://example.com/new-image.jpg',
        videoUrl: null,
        audioUrl: null,
        attachments: [],
        metaTitle: 'New Article Meta',
        metaDescription: 'New article meta description',
        canonicalUrl: 'https://example.com/new-article',
        originalSource: null,
        publishedAt: null,
        scheduledAt: null,
        licenseType: 'all_rights_reserved',
        attributionRequired: true,
      };

      const result = fromCreateContentItem(createData);

      expect(result).toMatchObject({
        title: 'New Article',
        slug: 'new-article',
        excerpt: 'New article excerpt',
        content: 'New article content',
        author_id: '123e4567-e89b-12d3-a456-426614174000',
        co_authors: ['author1'],
        content_type: 'article',
        format: 'text',
        word_count: 1000,
        estimated_reading_time: 5,
        primary_category_id: 'cat-123',
        secondary_categories: ['cat-456'],
        tags: ['new', 'article'],
        theological_themes: ['missional'],
        series_id: 'series-123',
        series_order: 1,
        visibility: 'public',
        status: 'draft',
        featured_image_url: 'https://example.com/new-image.jpg',
        video_url: null,
        audio_url: null,
        attachments: [],
        meta_title: 'New Article Meta',
        meta_description: 'New article meta description',
        canonical_url: 'https://example.com/new-article',
        original_source: null,
        license_type: 'all_rights_reserved',
        attribution_required: true,
      });

      expect(result.published_at).toBeNull();
      expect(result.scheduled_at).toBeNull();
    });

    it('should convert ISO date strings to Date objects', () => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 7);

      const createDataWithDates: CreateContentItem = {
        title: 'Scheduled Article',
        slug: 'scheduled-article',
        authorId: '123e4567-e89b-12d3-a456-426614174000',
        contentType: 'article',
        publishedAt: futureDate.toISOString(),
        scheduledAt: futureDate.toISOString(),
      };

      const result = fromCreateContentItem(createDataWithDates);

      expect(result.published_at).toEqual(futureDate);
      expect(result.scheduled_at).toEqual(futureDate);
    });
  });

  describe('fromUpdateContentItem', () => {
    it('should transform UpdateContentItem to database update format', () => {
      const updateData: UpdateContentItem = {
        title: 'Updated Title',
        excerpt: 'Updated excerpt',
        content: 'Updated content',
        wordCount: 2000,
        status: 'published',
        tags: ['updated', 'tags'],
      };

      const result = fromUpdateContentItem(updateData);

      expect(result).toMatchObject({
        title: 'Updated Title',
        excerpt: 'Updated excerpt',
        content: 'Updated content',
        word_count: 2000,
        status: 'published',
        tags: ['updated', 'tags'],
      });

      // Should always update the updated_at timestamp
      expect(result.updated_at).toBeInstanceOf(Date);
    });

    it('should only include defined fields in update', () => {
      const updateData: UpdateContentItem = {
        title: 'Only Title Updated',
      };

      const result = fromUpdateContentItem(updateData);

      expect(result.title).toBe('Only Title Updated');
      expect(result.excerpt).toBeUndefined();
      expect(result.content).toBeUndefined();
      expect(result.updated_at).toBeInstanceOf(Date);
    });
  });

  describe('Utility Functions', () => {
    describe('isContentPublic', () => {
      it('should return true for published public content', () => {
        const publishedContent = toContentItemResponseDTO({
          ...mockContentItemRow,
          status: 'published',
          visibility: 'public',
        });
        expect(isContentPublic(publishedContent)).toBe(true);
      });

      it('should return false for draft content', () => {
        const draftContent = toContentItemResponseDTO({
          ...mockContentItemRow,
          status: 'draft',
          visibility: 'public',
        });
        expect(isContentPublic(draftContent)).toBe(false);
      });

      it('should return false for private content', () => {
        const privateContent = toContentItemResponseDTO({
          ...mockContentItemRow,
          status: 'published',
          visibility: 'private',
        });
        expect(isContentPublic(privateContent)).toBe(false);
      });
    });

    describe('getReadingTimeEstimate', () => {
      it('should return estimated reading time when available', () => {
        const content = toContentItemResponseDTO(mockContentItemRow);
        expect(getReadingTimeEstimate(content)).toBe('8 min read');
      });

      it('should calculate reading time from word count', () => {
        const content = toContentItemResponseDTO({
          ...mockContentItemRow,
          estimated_reading_time: null,
          word_count: 1000,
        });
        expect(getReadingTimeEstimate(content)).toBe('5 min read');
      });

      it('should return Unknown when no time data available', () => {
        const content = toContentItemResponseDTO({
          ...mockContentItemRow,
          estimated_reading_time: null,
          word_count: null,
        });
        expect(getReadingTimeEstimate(content)).toBe('Unknown');
      });
    });
  });
});
