// ============================================================================
// CONTENT API ROUTES TESTS
// ============================================================================
// Comprehensive tests for content API endpoints with alignment validation

import { NextRequest } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DELETE as ContentDELETE,
  GET as ContentGET,
  PATCH as ContentPATCH,
  PUT as ContentPUT,
} from '../apps/alan-hirsch-platform/app/auth/api/content/[id]/route';
import {
  GET as ContentsGET,
  POST as ContentsPOST,
} from '../apps/alan-hirsch-platform/app/auth/api/content/route';
import { contentService } from '../apps/alan-hirsch-platform/lib/services';

// ============================================================================
// MOCK SETUP
// ============================================================================

vi.mock('../apps/alan-hirsch-platform/lib/services', () => ({
  contentService: {
    findMany: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    update: vi.fn(),
    publish: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockContentService = vi.mocked(contentService);

// ============================================================================
// TEST DATA
// ============================================================================

const mockContent = {
  id: '123e4567-e89b-12d3-a456-426614174000',
  title: 'Test Article',
  slug: 'test-article',
  excerpt: 'This is a test article excerpt',
  content: 'This is the full content of the test article',
  author_id: '456e7890-e89b-12d3-a456-426614174001',
  co_authors: [],
  content_type: 'article',
  format: 'text',
  word_count: 500,
  estimated_reading_time: 3,
  view_count: 100,
  like_count: 10,
  share_count: 5,
  comment_count: 3,
  bookmark_count: 2,
  primary_category_id: '789e0123-e89b-12d3-a456-426614174002',
  secondary_categories: [],
  tags: ['test', 'article'],
  theological_themes: ['leadership'],
  series_id: null,
  series_order: null,
  visibility: 'public',
  status: 'published',
  network_amplification_score: 7.5,
  cross_reference_count: 2,
  ai_enhanced: true,
  ai_summary: 'AI-generated summary',
  ai_key_points: ['Key point 1', 'Key point 2'],
  featured_image_url: 'https://example.com/image.jpg',
  video_url: null,
  audio_url: null,
  attachments: [],
  meta_title: 'Test Article - Meta Title',
  meta_description: 'Test article meta description',
  canonical_url: 'https://example.com/test-article',
  original_source: null,
  published_at: new Date('2024-01-01T00:00:00Z'),
  scheduled_at: null,
  license_type: 'all_rights_reserved',
  attribution_required: true,
  created_at: new Date('2024-01-01T00:00:00Z'),
  updated_at: new Date('2024-01-02T00:00:00Z'),
  author: {
    id: '456e7890-e89b-12d3-a456-426614174001',
    firstName: 'John',
    lastName: 'Doe',
    displayName: 'John D',
    avatarUrl: 'https://example.com/avatar.jpg',
  },
  primaryCategory: {
    id: '789e0123-e89b-12d3-a456-426614174002',
    name: 'Leadership',
    slug: 'leadership',
  },
  series: null,
  coAuthors: [],
};

const mockPaginatedResult = {
  data: [mockContent],
  pagination: {
    page: 1,
    limit: 20,
    total: 1,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  },
};

// ============================================================================
// GET /api/content TESTS
// ============================================================================

describe('GET /api/content', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return paginated content with proper validation', async () => {
    // Arrange
    mockContentService.findMany.mockResolvedValue(mockPaginatedResult);

    const request = new NextRequest(
      'http://localhost:3000/api/content?page=1&limit=20',
      {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'read,write',
        },
      }
    );

    // Act
    const response = await ContentsGET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(1);
    expect(data.data[0]).toMatchObject({
      id: mockContent.id,
      title: mockContent.title,
      slug: mockContent.slug,
      excerpt: mockContent.excerpt,
      contentType: mockContent.content_type,
      // Computed fields
      isPublished: true,
      isDraft: false,
      isScheduled: false,
      isArchived: false,
      hasFeaturedImage: true,
      hasVideo: false,
      hasAudio: false,
      hasAttachments: false,
      isAiEnhanced: true,
      readingTimeText: '3 min read',
      viewCountText: '100',
      engagementScore: expect.any(Number),
    });
    expect(data.meta.pagination).toMatchObject({
      page: 1,
      limit: 20,
      total: 1,
      total_pages: 1,
      has_next: false,
      has_prev: false,
    });
    expect(data.meta.timestamp).toBeDefined();

    // Verify service was called with validated input
    expect(mockContentService.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        page: 1,
        limit: 20,
      }),
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read', 'write'],
      })
    );
  });

  it('should reject invalid query parameters', async () => {
    // Arrange
    const request = new NextRequest(
      'http://localhost:3000/api/content?page=invalid&limit=999',
      {
        method: 'GET',
      }
    );

    // Act
    const response = await ContentsGET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(mockContentService.findMany).not.toHaveBeenCalled();
  });

  it('should handle service errors gracefully', async () => {
    // Arrange
    mockContentService.findMany.mockRejectedValue(new Error('Database error'));

    const request = new NextRequest('http://localhost:3000/api/content', {
      method: 'GET',
      headers: {
        'x-tenant-id': 'test-tenant',
      },
    });

    // Act
    const response = await ContentsGET(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(500);
    expect(data.error).toContain('Internal server error');
    expect(data.code).toBe('INTERNAL_ERROR');
  });
});

// ============================================================================
// POST /api/content TESTS
// ============================================================================

describe('POST /api/content', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create content with proper validation', async () => {
    // Arrange
    mockContentService.create.mockResolvedValue(mockContent);

    const createData = {
      title: 'New Article',
      slug: 'new-article',
      excerpt: 'New article excerpt',
      content: 'New article content',
      authorId: '456e7890-e89b-12d3-a456-426614174001',
      contentType: 'article',
      visibility: 'public',
      status: 'draft',
    };

    const request = new NextRequest('http://localhost:3000/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tenant-id': 'test-tenant',
        'x-user-id': 'user-123',
        'x-user-role': 'admin',
        'x-permissions': 'read,write',
      },
      body: JSON.stringify(createData),
    });

    // Act
    const response = await ContentsPOST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      id: mockContent.id,
      title: mockContent.title,
      slug: mockContent.slug,
      excerpt: mockContent.excerpt,
      contentType: mockContent.content_type,
      // Computed fields should be present
      isPublished: true,
      isDraft: false,
      isAiEnhanced: true,
      readingTimeText: '3 min read',
    });

    // Verify service was called with validated input
    expect(mockContentService.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'New Article',
        slug: 'new-article',
        excerpt: 'New article excerpt',
        contentType: 'article',
        visibility: 'public',
        status: 'draft',
      }),
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read', 'write'],
      })
    );
  });

  it('should reject invalid request body', async () => {
    // Arrange
    const invalidData = {
      title: '', // Empty title should be rejected
      contentType: 'invalid_type',
    };

    const request = new NextRequest('http://localhost:3000/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invalidData),
    });

    // Act
    const response = await ContentsPOST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(data.details).toBeDefined();
    expect(mockContentService.create).not.toHaveBeenCalled();
  });

  it('should handle malformed JSON', async () => {
    // Arrange
    const request = new NextRequest('http://localhost:3000/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: 'invalid json',
    });

    // Act
    const response = await ContentsPOST(request);
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toBeDefined();
    expect(mockContentService.create).not.toHaveBeenCalled();
  });
});

// ============================================================================
// GET /api/content/[id] TESTS
// ============================================================================

describe('GET /api/content/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return content by ID with proper validation', async () => {
    // Arrange
    mockContentService.findById.mockResolvedValue(mockContent);

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'read',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentGET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      id: mockContent.id,
      title: mockContent.title,
      slug: mockContent.slug,
      excerpt: mockContent.excerpt,
      // Computed fields
      isPublished: true,
      isDraft: false,
      isAiEnhanced: true,
      readingTimeText: '3 min read',
      viewCountText: '100',
    });

    // Verify service was called with validated input
    expect(mockContentService.findById).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read'],
      })
    );
  });

  it('should reject invalid UUID format', async () => {
    // Arrange
    const request = new NextRequest(
      'http://localhost:3000/api/content/invalid-id',
      {
        method: 'GET',
      }
    );

    const params = { id: 'invalid-id' };

    // Act
    const response = await ContentGET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Invalid content ID format');
    expect(mockContentService.findById).not.toHaveBeenCalled();
  });

  it('should return 404 when content not found', async () => {
    // Arrange
    mockContentService.findById.mockResolvedValue(null);

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentGET(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(404);
    expect(data.error).toContain('Content not found');
    expect(data.code).toBe('NOT_FOUND');
  });
});

// ============================================================================
// PUT /api/content/[id] TESTS
// ============================================================================

describe('PUT /api/content/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update content with proper validation', async () => {
    // Arrange
    const updatedContent = { ...mockContent, title: 'Updated Article' };
    mockContentService.update.mockResolvedValue(updatedContent);

    const updateData = {
      title: 'Updated Article',
      excerpt: 'Updated excerpt',
    };

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'read,write',
        },
        body: JSON.stringify(updateData),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentPUT(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.title).toBe('Updated Article');
    expect(data.data.excerpt).toBe('Updated excerpt');

    // Verify service was called with validated input
    expect(mockContentService.update).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        title: 'Updated Article',
        excerpt: 'Updated excerpt',
      }),
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['read', 'write'],
      })
    );
  });

  it('should reject invalid update data', async () => {
    // Arrange
    const invalidData = {
      title: '', // Empty title should be rejected
      contentType: 'invalid_type',
    };

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invalidData),
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentPUT(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(400);
    expect(data.error).toContain('Validation failed');
    expect(mockContentService.update).not.toHaveBeenCalled();
  });
});

// ============================================================================
// PATCH /api/content/[id] TESTS
// ============================================================================

describe('PATCH /api/content/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should publish content with proper validation', async () => {
    // Arrange
    const publishedContent = { ...mockContent, status: 'published' };
    mockContentService.publish.mockResolvedValue(publishedContent);

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PATCH',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'write',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentPATCH(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data.status).toBe('published');

    // Verify service was called with validated input
    expect(mockContentService.publish).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['write'],
      })
    );
  });

  it('should return 404 when content not found for publishing', async () => {
    // Arrange
    mockContentService.publish.mockResolvedValue(null);

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PATCH',
        headers: {
          'x-tenant-id': 'test-tenant',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentPATCH(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(404);
    expect(data.error).toContain('Content not found');
    expect(data.code).toBe('NOT_FOUND');
  });
});

// ============================================================================
// DELETE /api/content/[id] TESTS
// ============================================================================

describe('DELETE /api/content/[id]', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete content with proper validation', async () => {
    // Arrange
    mockContentService.delete.mockResolvedValue(true);

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-user-id': 'user-123',
          'x-user-role': 'admin',
          'x-permissions': 'admin',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentDELETE(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.data).toMatchObject({
      deleted: true,
      id: '123e4567-e89b-12d3-a456-426614174000',
    });

    // Verify service was called with validated input
    expect(mockContentService.delete).toHaveBeenCalledWith(
      '123e4567-e89b-12d3-a456-426614174000',
      expect.objectContaining({
        tenantId: 'test-tenant',
        userId: 'user-123',
        role: 'admin',
        permissions: ['admin'],
      })
    );
  });

  it('should return 404 when content not found for deletion', async () => {
    // Arrange
    mockContentService.delete.mockResolvedValue(false);

    const request = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
        headers: {
          'x-tenant-id': 'test-tenant',
        },
      }
    );

    const params = { id: '123e4567-e89b-12d3-a456-426614174000' };

    // Act
    const response = await ContentDELETE(request, { params });
    const data = await response.json();

    // Assert
    expect(response.status).toBe(404);
    expect(data.error).toContain('Content not found');
    expect(data.code).toBe('NOT_FOUND');
  });
});

// ============================================================================
// INTEGRATION TESTS
// ============================================================================

describe('Content API Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle complete content lifecycle', async () => {
    // 1. Create content
    mockContentService.create.mockResolvedValue(mockContent);

    const createRequest = new NextRequest('http://localhost:3000/api/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Test Article',
        slug: 'test-article',
        authorId: '456e7890-e89b-12d3-a456-426614174001',
        contentType: 'article',
        visibility: 'public',
        status: 'draft',
      }),
    });

    const createResponse = await ContentsPOST(createRequest);
    expect(createResponse.status).toBe(201);

    // 2. Get content
    mockContentService.findById.mockResolvedValue(mockContent);

    const getRequest = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'GET',
      }
    );

    const getResponse = await ContentGET(getRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(getResponse.status).toBe(200);

    // 3. Update content
    const updatedContent = { ...mockContent, title: 'Updated Article' };
    mockContentService.update.mockResolvedValue(updatedContent);

    const updateRequest = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Updated Article' }),
      }
    );

    const updateResponse = await ContentPUT(updateRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(updateResponse.status).toBe(200);

    // 4. Publish content
    const publishedContent = { ...mockContent, status: 'published' };
    mockContentService.publish.mockResolvedValue(publishedContent);

    const publishRequest = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'PATCH',
      }
    );

    const publishResponse = await ContentPATCH(publishRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(publishResponse.status).toBe(200);

    // 5. Delete content
    mockContentService.delete.mockResolvedValue(true);

    const deleteRequest = new NextRequest(
      'http://localhost:3000/api/content/123e4567-e89b-12d3-a456-426614174000',
      {
        method: 'DELETE',
      }
    );

    const deleteResponse = await ContentDELETE(deleteRequest, {
      params: { id: '123e4567-e89b-12d3-a456-426614174000' },
    });
    expect(deleteResponse.status).toBe(200);

    // Verify all service methods were called
    expect(mockContentService.create).toHaveBeenCalledTimes(1);
    expect(mockContentService.findById).toHaveBeenCalledTimes(1);
    expect(mockContentService.update).toHaveBeenCalledTimes(1);
    expect(mockContentService.publish).toHaveBeenCalledTimes(1);
    expect(mockContentService.delete).toHaveBeenCalledTimes(1);
  });
});
