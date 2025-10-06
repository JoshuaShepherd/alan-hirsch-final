// Content Hooks Tests
// Tests for content data hooks aligned with @platform/contracts

import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  useBulkDeleteContentItems,
  useBulkUpdateContentItems,
  useContentAnalytics,
  useContentById,
  useContentBySlug,
  useContentCategories,
  useContentItems,
  useContentPerformance,
  useContentSearch,
  useContentSeries,
  useCreateContentItem,
  usePublishContentItem,
  useScheduleContentItem,
  useUpdateContentItem,
} from '../../apps/alan-hirsch-platform/hooks/useContent';

// ============================================================================
// MOCK DATA
// ============================================================================

const mockContentItem = {
  id: 'content-123',
  title: 'Test Article',
  slug: 'test-article',
  excerpt: 'This is a test article',
  content: 'Full content of the test article',
  authorId: 'user-123',
  coAuthors: [],
  contentType: 'article' as const,
  format: 'markdown' as const,
  wordCount: 500,
  estimatedReadingTime: 3,
  viewCount: 150,
  likeCount: 25,
  shareCount: 10,
  commentCount: 5,
  bookmarkCount: 8,
  primaryCategoryId: 'category-123',
  secondaryCategories: [],
  tags: ['test', 'article'],
  theologicalThemes: ['missional', 'leadership'],
  seriesId: 'series-123',
  seriesOrder: 1,
  visibility: 'public' as const,
  status: 'published' as const,
  networkAmplificationScore: 7.5,
  crossReferenceCount: 3,
  aiEnhanced: true,
  aiSummary: 'AI-generated summary',
  aiKeyPoints: ['Key point 1', 'Key point 2'],
  featuredImageUrl: 'https://example.com/image.jpg',
  attachments: [],
  metaTitle: 'Test Article - SEO Title',
  metaDescription: 'SEO description',
  publishedAt: '2023-01-01T00:00:00Z',
  licenseType: 'all_rights_reserved' as const,
  attributionRequired: true,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
  // Computed fields
  isPublished: true,
  isDraft: false,
  isScheduled: false,
  hasFeaturedImage: true,
  viewCountText: '150',
  engagementScore: 7.5,
  readingTimeText: '3 min read',
};

const mockContentCategory = {
  id: 'category-123',
  name: 'Leadership',
  slug: 'leadership',
  description: 'Articles about leadership',
  parentId: null,
  order: 1,
  isActive: true,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

const mockContentSeries = {
  id: 'series-123',
  title: 'Leadership Series',
  slug: 'leadership-series',
  description: 'A series about leadership',
  authorId: 'user-123',
  totalEpisodes: 5,
  publishedEpisodes: 3,
  isActive: true,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-01-01T00:00:00Z',
};

const mockContentAnalytics = {
  viewCount: 150,
  likeCount: 25,
  shareCount: 10,
  commentCount: 5,
  engagementScore: 7.5,
  lastViewedAt: '2023-01-01T00:00:00Z',
};

const mockContentPerformance = {
  totalViews: 150,
  uniqueViews: 120,
  averageTimeOnPage: 180,
  bounceRate: 0.25,
  conversionRate: 0.05,
  topReferrers: [
    { source: 'Google', count: 50 },
    { source: 'Facebook', count: 30 },
  ],
};

// ============================================================================
// MSW SERVER SETUP
// ============================================================================

const server = setupServer(
  rest.get('/api/content', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockContentItem],
          meta: {
            pagination: {
              page: 1,
              limit: 10,
              total: 1,
              total_pages: 1,
              has_next: false,
              has_prev: false,
            },
          },
        },
      })
    );
  }),

  rest.get('/api/content/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockContentItem,
      })
    );
  }),

  rest.get('/api/content/slug/:slug', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockContentItem,
      })
    );
  }),

  rest.get('/api/content/categories', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [mockContentCategory],
      })
    );
  }),

  rest.get('/api/content/series', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [mockContentSeries],
      })
    );
  }),

  rest.get('/api/content/:id/analytics', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockContentAnalytics,
      })
    );
  }),

  rest.get('/api/content/:id/performance', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: mockContentPerformance,
      })
    );
  }),

  rest.get('/api/content/search', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          data: [mockContentItem],
          meta: {
            pagination: {
              page: 1,
              limit: 10,
              total: 1,
              total_pages: 1,
              has_next: false,
              has_prev: false,
            },
          },
        },
      })
    );
  }),

  rest.post('/api/content', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockContentItem, ...req.body },
      })
    );
  }),

  rest.patch('/api/content/:id', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { ...mockContentItem, ...req.body },
      })
    );
  }),

  rest.post('/api/content/:id/publish', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          ...mockContentItem,
          status: 'published',
          publishedAt: new Date().toISOString(),
        },
      })
    );
  }),

  rest.post('/api/content/:id/schedule', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          ...mockContentItem,
          status: 'scheduled',
          scheduledAt: new Date().toISOString(),
        },
      })
    );
  }),

  rest.patch('/api/content/bulk', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: [mockContentItem],
      })
    );
  }),

  rest.post('/api/content/bulk-delete', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: { deletedCount: 2 },
      })
    );
  })
);

// ============================================================================
// TEST SETUP
// ============================================================================

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// ============================================================================
// TESTS
// ============================================================================

describe('useContentItems', () => {
  it('should fetch content items successfully', async () => {
    const { result } = renderHook(() => useContentItems());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockContentItem]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should handle filters', async () => {
    const params = {
      page: 1,
      limit: 10,
      status: 'published',
      category: 'leadership',
    };

    const { result } = renderHook(() => useContentItems(params));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useContentById', () => {
  it('should fetch content by ID successfully', async () => {
    const { result } = renderHook(() => useContentById('content-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockContentItem);
  });

  it('should not fetch when ID is empty', () => {
    const { result } = renderHook(() => useContentById(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useContentBySlug', () => {
  it('should fetch content by slug successfully', async () => {
    const { result } = renderHook(() => useContentBySlug('test-article'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockContentItem);
  });

  it('should not fetch when slug is empty', () => {
    const { result } = renderHook(() => useContentBySlug(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useContentCategories', () => {
  it('should fetch content categories successfully', async () => {
    const { result } = renderHook(() => useContentCategories());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockContentCategory]);
  });
});

describe('useContentSeries', () => {
  it('should fetch content series successfully', async () => {
    const { result } = renderHook(() => useContentSeries());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockContentSeries]);
  });
});

describe('useCreateContentItem', () => {
  it('should create content item successfully', async () => {
    const { result } = renderHook(() => useCreateContentItem());

    const createData = {
      title: 'New Article',
      content: 'Article content',
      contentType: 'article' as const,
      status: 'draft' as const,
    };

    await result.current.mutate(createData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockContentItem,
      ...createData,
    });
  });

  it('should validate create data', async () => {
    const { result } = renderHook(() => useCreateContentItem());

    const invalidData = {
      // Missing required fields
    };

    await expect(result.current.mutate(invalidData as any)).rejects.toThrow();
  });
});

describe('useUpdateContentItem', () => {
  it('should update content item successfully', async () => {
    const { result } = renderHook(() => useUpdateContentItem());

    const updateData = {
      id: 'content-123',
      title: 'Updated Article',
      content: 'Updated content',
    };

    await result.current.mutate(updateData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({
      ...mockContentItem,
      ...updateData,
    });
  });
});

describe('usePublishContentItem', () => {
  it('should publish content item successfully', async () => {
    const { result } = renderHook(() => usePublishContentItem());

    const publishData = {
      id: 'content-123',
      publishedAt: new Date().toISOString(),
    };

    await result.current.mutate(publishData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.status).toBe('published');
  });
});

describe('useScheduleContentItem', () => {
  it('should schedule content item successfully', async () => {
    const { result } = renderHook(() => useScheduleContentItem());

    const scheduleData = {
      id: 'content-123',
      scheduledAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    };

    await result.current.mutate(scheduleData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data?.status).toBe('scheduled');
  });
});

describe('useContentAnalytics', () => {
  it('should fetch content analytics successfully', async () => {
    const { result } = renderHook(() => useContentAnalytics('content-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockContentAnalytics);
  });

  it('should not fetch when ID is empty', () => {
    const { result } = renderHook(() => useContentAnalytics(''));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBe(null);
  });
});

describe('useContentPerformance', () => {
  it('should fetch content performance successfully', async () => {
    const { result } = renderHook(() => useContentPerformance('content-123'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual(mockContentPerformance);
  });
});

describe('useContentSearch', () => {
  it('should search content successfully', async () => {
    const { result } = renderHook(() => useContentSearch('leadership'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockContentItem]);
    expect(result.current.pagination).toBeDefined();
  });

  it('should handle search with filters', async () => {
    const { result } = renderHook(() =>
      useContentSearch('leadership', {
        status: 'published',
        category: 'leadership',
      })
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isSuccess).toBe(true);
  });
});

describe('useBulkUpdateContentItems', () => {
  it('should bulk update content items successfully', async () => {
    const { result } = renderHook(() => useBulkUpdateContentItems());

    const bulkData = {
      ids: ['content-123', 'content-456'],
      updates: { status: 'published' as const },
    };

    await result.current.mutate(bulkData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual([mockContentItem]);
  });
});

describe('useBulkDeleteContentItems', () => {
  it('should bulk delete content items successfully', async () => {
    const { result } = renderHook(() => useBulkDeleteContentItems());

    const deleteData = {
      ids: ['content-123', 'content-456'],
    };

    await result.current.mutate(deleteData);

    expect(result.current.isSuccess).toBe(true);
    expect(result.current.data).toEqual({ deletedCount: 2 });
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Content Hooks Integration', () => {
  it('should handle complete content workflow', async () => {
    // 1. Create content item
    const { result: createResult } = renderHook(() => useCreateContentItem());

    const createData = {
      title: 'Workflow Article',
      content: 'Article content',
      contentType: 'article' as const,
      status: 'draft' as const,
    };

    await createResult.current.mutate(createData);
    expect(createResult.current.isSuccess).toBe(true);

    // 2. Fetch content by ID
    const { result: fetchResult } = renderHook(() =>
      useContentById('content-123')
    );

    await waitFor(() => {
      expect(fetchResult.current.isLoading).toBe(false);
    });

    expect(fetchResult.current.isSuccess).toBe(true);

    // 3. Update content
    const { result: updateResult } = renderHook(() => useUpdateContentItem());

    const updateData = {
      id: 'content-123',
      title: 'Updated Workflow Article',
    };

    await updateResult.current.mutate(updateData);
    expect(updateResult.current.isSuccess).toBe(true);

    // 4. Publish content
    const { result: publishResult } = renderHook(() => usePublishContentItem());

    const publishData = {
      id: 'content-123',
      publishedAt: new Date().toISOString(),
    };

    await publishResult.current.mutate(publishData);
    expect(publishResult.current.isSuccess).toBe(true);
  });
});

// ============================================================================
// ERROR HANDLING TESTS
// ============================================================================

describe('Error Handling', () => {
  it('should handle network errors', async () => {
    server.use(
      rest.get('/api/content/:id', (req, res, ctx) => {
        return res.networkError('Network error');
      })
    );

    const { result } = renderHook(() => useContentById('content-123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Network error');
  });

  it('should handle validation errors', async () => {
    server.use(
      rest.get('/api/content/:id', (req, res, ctx) => {
        return res(
          ctx.json({
            success: true,
            data: {
              // Invalid data structure
              id: 'invalid',
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useContentById('content-123'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.isError).toBe(true);
    expect(result.current.error).toContain('Response validation failed');
  });
});

// ============================================================================
// TYPE SAFETY TESTS
// ============================================================================

describe('Type Safety', () => {
  it('should enforce correct types for content data', () => {
    const { result } = renderHook(() => useContentById('content-123'));

    if (result.current.data) {
      const content = result.current.data;
      expect(typeof content.id).toBe('string');
      expect(typeof content.title).toBe('string');
      expect(typeof content.content).toBe('string');
      expect(typeof content.isPublished).toBe('boolean');
      expect(typeof content.viewCount).toBe('number');
    }
  });

  it('should enforce correct types for mutation data', () => {
    const { result } = renderHook(() => useCreateContentItem());

    const createData = {
      title: 'Test Article',
      content: 'Test content',
      contentType: 'article' as const,
      status: 'draft' as const,
    };

    expect(() => result.current.mutate(createData)).not.toThrow();
  });
});
