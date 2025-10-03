import { GET, POST } from '@/app/api/content/route'
import { createTestUser, cleanupTestUser, testData } from '@/lib/test-utils'

// Mock the API utilities
jest.mock('@/lib/api/utils', () => ({
  createPaginatedApiRoute: jest.fn((inputSchema, outputSchema, handler) => async (request: any) => {
    let validatedInput: any
    if (request.url) {
      // GET request - extract params from URL
      const url = new URL(request.url)
      const params = Object.fromEntries(url.searchParams)
      validatedInput = inputSchema.parse(params)
    } else {
      // POST request - parse JSON body
      validatedInput = inputSchema.parse(request.body || request)
    }
    const result = await handler(validatedInput, { user: { id: 'test-user-id', email: 'test@example.com' }, db: mockDb })
    return {
      json: () => Promise.resolve({
        data: result.items,
        pagination: {
          page: validatedInput.page || 1,
          limit: validatedInput.limit || 20,
          total: result.total,
          hasMore: false
        }
      })
    }
  }),
}))

// Mock the database
const mockDb = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  offset: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
}

jest.mock('@/lib/db/drizzle', () => ({
  db: mockDb
}))

describe('/api/content', () => {
  let testUser: any

  beforeAll(async () => {
    testUser = await createTestUser('test@example.com', 'password123')
  })

  afterAll(async () => {
    await cleanupTestUser(testUser.id)
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/content', () => {
    it('should get content items with pagination', async () => {
      const mockContentItems = [
        {
          id: '1',
          title: 'Test Article 1',
          slug: 'test-article-1',
          excerpt: 'This is a test article',
          content: 'Full content of the test article',
          authorId: testUser.id,
          contentType: 'article',
          status: 'published',
          visibility: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
          author: {
            id: testUser.id,
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'John Doe',
            avatarUrl: null
          },
          category: {
            id: 'cat-1',
            name: 'Leadership',
            slug: 'leadership'
          }
        },
        {
          id: '2',
          title: 'Test Video 1',
          slug: 'test-video-1',
          excerpt: 'This is a test video',
          content: 'Video content description',
          authorId: testUser.id,
          contentType: 'video',
          status: 'published',
          visibility: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
          author: {
            id: testUser.id,
            firstName: 'John',
            lastName: 'Doe',
            displayName: 'John Doe',
            avatarUrl: null
          },
          category: {
            id: 'cat-2',
            name: 'Teaching',
            slug: 'teaching'
          }
        }
      ]

      const mockCount = [{ count: 2 }]

      mockDb.select
        .mockResolvedValueOnce(mockContentItems) // First call for content items
        .mockResolvedValueOnce(mockCount) // Second call for count

      const mockRequest = {
        url: 'http://localhost:3000/api/content?page=1&limit=10&status=published'
      }

      const response = await GET(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual(mockContentItems)
      expect(result.pagination.total).toBe(2)
      expect(mockDb.select).toHaveBeenCalledTimes(2)
      expect(mockDb.leftJoin).toHaveBeenCalledTimes(2) // author and category joins
    })

    it('should filter content by search term', async () => {
      const mockContentItems = [
        {
          id: '1',
          title: 'Leadership Principles',
          slug: 'leadership-principles',
          excerpt: 'Key principles for effective leadership',
          content: 'Full content about leadership',
          authorId: testUser.id,
          contentType: 'article',
          status: 'published',
          visibility: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
          author: {
            id: testUser.id,
            firstName: 'John',
            lastName: 'Doe'
          },
          category: {
            id: 'cat-1',
            name: 'Leadership',
            slug: 'leadership'
          }
        }
      ]

      const mockCount = [{ count: 1 }]

      mockDb.select
        .mockResolvedValueOnce(mockContentItems)
        .mockResolvedValueOnce(mockCount)

      const mockRequest = {
        url: 'http://localhost:3000/api/content?page=1&limit=10&search=leadership&status=published'
      }

      const response = await GET(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual(mockContentItems)
      expect(result.pagination.total).toBe(1)
    })

    it('should filter content by type', async () => {
      const mockContentItems = [
        {
          id: '1',
          title: 'Test Video',
          slug: 'test-video',
          excerpt: 'A test video',
          content: 'Video content',
          authorId: testUser.id,
          contentType: 'video',
          status: 'published',
          visibility: 'public',
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
          author: {
            id: testUser.id,
            firstName: 'John',
            lastName: 'Doe'
          },
          category: {
            id: 'cat-1',
            name: 'Teaching',
            slug: 'teaching'
          }
        }
      ]

      const mockCount = [{ count: 1 }]

      mockDb.select
        .mockResolvedValueOnce(mockContentItems)
        .mockResolvedValueOnce(mockCount)

      const mockRequest = {
        url: 'http://localhost:3000/api/content?page=1&limit=10&contentType=video&status=published'
      }

      const response = await GET(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual(mockContentItems)
      expect(result.pagination.total).toBe(1)
    })

    it('should filter content by visibility', async () => {
      const mockContentItems = [
        {
          id: '1',
          title: 'Premium Content',
          slug: 'premium-content',
          excerpt: 'This is premium content',
          content: 'Premium content body',
          authorId: testUser.id,
          contentType: 'article',
          status: 'published',
          visibility: 'premium',
          createdAt: new Date(),
          updatedAt: new Date(),
          publishedAt: new Date(),
          author: {
            id: testUser.id,
            firstName: 'John',
            lastName: 'Doe'
          },
          category: {
            id: 'cat-1',
            name: 'Premium',
            slug: 'premium'
          }
        }
      ]

      const mockCount = [{ count: 1 }]

      mockDb.select
        .mockResolvedValueOnce(mockContentItems)
        .mockResolvedValueOnce(mockCount)

      const mockRequest = {
        url: 'http://localhost:3000/api/content?page=1&limit=10&visibility=premium&status=published'
      }

      const response = await GET(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual(mockContentItems)
      expect(result.pagination.total).toBe(1)
    })

    it('should handle empty results', async () => {
      const mockContentItems: any[] = []
      const mockCount = [{ count: 0 }]

      mockDb.select
        .mockResolvedValueOnce(mockContentItems)
        .mockResolvedValueOnce(mockCount)

      const mockRequest = {
        url: 'http://localhost:3000/api/content?page=1&limit=10&search=nonexistent&status=published'
      }

      const response = await GET(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual([])
      expect(result.pagination.total).toBe(0)
    })
  })

  describe('POST /api/content', () => {
    it('should create new content item successfully', async () => {
      const newContentData = {
        title: 'New Test Article',
        slug: 'new-test-article',
        excerpt: 'This is a new test article',
        content: 'Full content of the new test article',
        contentType: 'article',
        format: 'markdown',
        status: 'draft',
        visibility: 'public',
        primaryCategoryId: 'cat-1',
        tags: ['leadership', 'ministry'],
        theologicalThemes: ['missional', 'apostolic']
      }

      const createdContent = {
        id: 'new-content-id',
        ...newContentData,
        authorId: testUser.id,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }

      mockDb.insert.mockResolvedValueOnce([createdContent])

      const mockRequest = {
        body: newContentData
      }

      const response = await POST(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual([createdContent])
      expect(result.pagination.total).toBe(1)
      expect(mockDb.insert).toHaveBeenCalled()
      expect(mockDb.values).toHaveBeenCalledWith({
        ...newContentData,
        authorId: testUser.id,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    })

    it('should create content with minimal required data', async () => {
      const minimalData = {
        title: 'Minimal Content',
        slug: 'minimal-content',
        excerpt: 'Minimal content excerpt',
        content: 'Minimal content body',
        contentType: 'article'
      }

      const createdContent = {
        id: 'minimal-content-id',
        ...minimalData,
        authorId: testUser.id,
        status: 'draft',
        visibility: 'public',
        format: 'markdown',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      }

      mockDb.insert.mockResolvedValueOnce([createdContent])

      const mockRequest = {
        body: minimalData
      }

      const response = await POST(mockRequest as any)
      const result = await response.json()

      expect(result.data).toEqual([createdContent])
      expect(result.pagination.total).toBe(1)
    })
  })
})
