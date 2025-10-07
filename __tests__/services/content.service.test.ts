// ============================================================================
// CONTENT SERVICE TESTS
// ============================================================================
// Comprehensive unit tests for ContentItemService following alignment reference patterns

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ContentItemService } from '../../apps/alan-hirsch-platform/lib/services/content.service';
import {
  ForbiddenError,
  NotFoundError,
  ServiceContext,
  ServiceContextBuilder,
} from '../../apps/alan-hirsch-platform/lib/services/types';

// Mock the query modules and mappers
vi.mock('@platform/database/queries/content', () => ({
  createContentItem: vi.fn(),
  getContentItemById: vi.fn(),
  getContentItemBySlug: vi.fn(),
  getContentItemsWithDetails: vi.fn(),
  searchContentItems: vi.fn(),
  getContentItemsByAuthor: vi.fn(),
  getContentItemsByCategory: vi.fn(),
  getContentItemsBySeries: vi.fn(),
  getTrendingContentItems: vi.fn(),
  getContentStats: vi.fn(),
  updateContentItem: vi.fn(),
  deleteContentItem: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/content', () => ({
  toContentItemEntity: vi.fn(),
  toContentItemResponseDTO: vi.fn(),
  fromCreateContentItem: vi.fn(),
  fromUpdateContentItem: vi.fn(),
}));

// DISABLED: Services deleted for rebuild - will be restored in Phase 1.3
describe.skip('ContentItemService - DISABLED FOR REBUILD', () => {
  let contentService: ContentItemService;
  let context: ServiceContext;

  beforeEach(() => {
    contentService = new ContentItemService();
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create content successfully', async () => {
      const createData = {
        title: 'Test Article',
        slug: 'test-article',
        content: 'This is test content',
        contentType: 'article',
        authorId: 'user-123',
      };

      const mockDbResult = { id: 'content-123', ...createData };
      const mockResponse = {
        id: 'content-123',
        ...createData,
        isPublished: false,
      };

      vi.mocked(contentService['executeCreate']).mockResolvedValue(
        mockDbResult
      );
      vi.mocked(contentService['mapDbToEntity']).mockReturnValue(mockResponse);

      const result = await contentService.create(createData, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should enforce create business rules', async () => {
      const createData = {
        title: 'Test Article',
        slug: 'test-article',
        content: 'This is test content',
        contentType: 'article',
        authorId: 'user-123',
      };

      // Test with guest role (should fail)
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      const result = await contentService.create(createData, guestContext);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('findBySlug', () => {
    it('should find content by slug successfully', async () => {
      const slug = 'test-article';
      const mockDbResult = { id: 'content-123', slug, title: 'Test Article' };
      const mockResponse = {
        id: 'content-123',
        slug,
        title: 'Test Article',
        isPublished: true,
      };

      const { getContentItemBySlug } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(getContentItemBySlug).mockResolvedValue(mockDbResult);
      vi.mocked(contentService['mapDbToEntity']).mockReturnValue(mockResponse);

      const result = await contentService.findBySlug(slug, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should return not found for non-existent slug', async () => {
      const { getContentItemBySlug } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(getContentItemBySlug).mockResolvedValue(null);

      const result = await contentService.findBySlug('non-existent', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('searchContent', () => {
    it('should search content successfully', async () => {
      const searchTerm = 'ministry';
      const mockResults = [
        { content: { id: 'content-1', title: 'Ministry Article' } },
        { content: { id: 'content-2', title: 'Another Ministry Post' } },
      ];
      const mockResponses = [
        { id: 'content-1', title: 'Ministry Article', isPublished: true },
        { id: 'content-2', title: 'Another Ministry Post', isPublished: true },
      ];

      const { searchContentItems } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(searchContentItems).mockResolvedValue(mockResults);
      vi.mocked(contentService['mapDbToEntity'])
        .mockReturnValueOnce(mockResponses[0])
        .mockReturnValueOnce(mockResponses[1]);

      const result = await contentService.searchContent(searchTerm, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponses);
    });
  });

  describe('getByAuthor', () => {
    it('should get content by author successfully', async () => {
      const authorId = 'user-123';
      const mockResults = [
        { id: 'content-1', authorId, title: 'Article 1' },
        { id: 'content-2', authorId, title: 'Article 2' },
      ];
      const mockResponses = [
        { id: 'content-1', authorId, title: 'Article 1', isPublished: true },
        { id: 'content-2', authorId, title: 'Article 2', isPublished: false },
      ];

      const { getContentItemsByAuthor } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(getContentItemsByAuthor).mockResolvedValue(mockResults);
      vi.mocked(contentService['mapDbToEntity'])
        .mockReturnValueOnce(mockResponses[0])
        .mockReturnValueOnce(mockResponses[1]);

      const result = await contentService.getByAuthor(authorId, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponses);
    });

    it('should only show published content for other authors', async () => {
      const otherAuthorId = 'other-user-456';
      const mockResults = [
        {
          id: 'content-1',
          authorId: otherAuthorId,
          title: 'Published Article',
          status: 'published',
        },
      ];
      const mockResponses = [
        {
          id: 'content-1',
          authorId: otherAuthorId,
          title: 'Published Article',
          isPublished: true,
        },
      ];

      const { getContentItemsByAuthor } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(getContentItemsByAuthor).mockResolvedValue(mockResults);
      vi.mocked(contentService['mapDbToEntity']).mockReturnValue(
        mockResponses[0]
      );

      const result = await contentService.getByAuthor(otherAuthorId, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponses);
      expect(getContentItemsByAuthor).toHaveBeenCalledWith(
        otherAuthorId,
        {
          userId: 'user-123',
          organizationId: 'org-456',
          role: 'member',
        },
        { status: 'published' }
      );
    });
  });

  describe('publish', () => {
    it('should publish content successfully', async () => {
      const contentId = 'content-123';
      const mockContent = {
        id: contentId,
        authorId: 'user-123',
        title: 'Test Article',
        status: 'draft',
      };
      const mockResponse = {
        id: contentId,
        authorId: 'user-123',
        title: 'Test Article',
        status: 'published',
        publishedAt: expect.any(String),
        isPublished: true,
      };

      vi.mocked(contentService.findById).mockResolvedValue({
        success: true,
        data: mockContent as any,
      });
      vi.mocked(contentService.update).mockResolvedValue({
        success: true,
        data: mockResponse as any,
      });

      const result = await contentService.publish(contentId, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(contentService.update).toHaveBeenCalledWith(
        contentId,
        {
          status: 'published',
          publishedAt: expect.any(String),
        },
        context
      );
    });

    it('should forbid publishing content from another author', async () => {
      const contentId = 'content-123';
      const mockContent = {
        id: contentId,
        authorId: 'other-user-456',
        title: 'Test Article',
        status: 'draft',
      };

      vi.mocked(contentService.findById).mockResolvedValue({
        success: true,
        data: mockContent as any,
      });

      const result = await contentService.publish(contentId, context);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });

    it('should allow admin to publish any content', async () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      const contentId = 'content-123';
      const mockContent = {
        id: contentId,
        authorId: 'other-user-456',
        title: 'Test Article',
        status: 'draft',
      };
      const mockResponse = {
        id: contentId,
        authorId: 'other-user-456',
        title: 'Test Article',
        status: 'published',
        isPublished: true,
      };

      vi.mocked(contentService.findById).mockResolvedValue({
        success: true,
        data: mockContent as any,
      });
      vi.mocked(contentService.update).mockResolvedValue({
        success: true,
        data: mockResponse as any,
      });

      const result = await contentService.publish(contentId, adminContext);

      expect(result.success).toBe(true);
    });
  });

  describe('archive', () => {
    it('should archive content successfully', async () => {
      const contentId = 'content-123';
      const mockContent = {
        id: contentId,
        authorId: 'user-123',
        title: 'Test Article',
        status: 'published',
      };
      const mockResponse = {
        id: contentId,
        authorId: 'user-123',
        title: 'Test Article',
        status: 'archived',
        isPublished: false,
      };

      vi.mocked(contentService.findById).mockResolvedValue({
        success: true,
        data: mockContent as any,
      });
      vi.mocked(contentService.update).mockResolvedValue({
        success: true,
        data: mockResponse as any,
      });

      const result = await contentService.archive(contentId, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(contentService.update).toHaveBeenCalledWith(
        contentId,
        {
          status: 'archived',
        },
        context
      );
    });
  });

  describe('getContentStats', () => {
    it('should get content stats for own user', async () => {
      const authorId = 'user-123';
      const mockStats = {
        totalContent: 10,
        publishedContent: 8,
        draftContent: 2,
        scheduledContent: 0,
        totalViews: 1500,
        totalLikes: 45,
        totalShares: 12,
        totalComments: 8,
        averageReadingTime: 5.5,
      };

      const { getContentStats } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(getContentStats).mockResolvedValue(mockStats);

      const result = await contentService.getContentStats(authorId, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
    });

    it('should allow admin to get stats for any user', async () => {
      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      const authorId = 'user-123';
      const mockStats = {
        totalContent: 5,
        publishedContent: 3,
        totalViews: 500,
      };
      const { getContentStats } = await import(
        '@platform/database/queries/content'
      );
      vi.mocked(getContentStats).mockResolvedValue(mockStats);

      const result = await contentService.getContentStats(
        authorId,
        adminContext
      );

      expect(result.success).toBe(true);
    });

    it('should forbid non-admin from getting stats for another user', async () => {
      const result = await contentService.getContentStats(
        'other-user-456',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('authorization', () => {
    it('should allow members to create content', () => {
      expect(contentService.canCreate(context)).toBe(true);
    });

    it('should forbid guests from creating content', () => {
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      expect(contentService.canCreate(guestContext)).toBe(false);
    });

    it('should allow viewers to read content', () => {
      const viewerContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('viewer')
        .build();

      expect(contentService.canRead(viewerContext)).toBe(true);
    });

    it('should allow members to update content', () => {
      expect(contentService.canUpdate(context)).toBe(true);
    });

    it('should only allow admins to delete content', () => {
      expect(contentService.canDelete(context)).toBe(false); // member role

      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(contentService.canDelete(adminContext)).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      vi.mocked(contentService['executeFindById']).mockRejectedValue(
        new Error('Database connection failed')
      );

      const result = await contentService.findById('content-123', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Database connection failed');
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        title: '', // Invalid: empty title
        slug: 'test-article',
        contentType: 'article',
        authorId: 'user-123',
      };

      vi.mocked(contentService['validateCreateInput']).mockImplementation(
        () => {
          throw new Error('Title is required');
        }
      );

      const result = await contentService.create(invalidData, context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});
