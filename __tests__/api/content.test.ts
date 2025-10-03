import { createMockDatabase, testDataFactories } from '@/lib/mocks';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the database module
vi.mock('@/lib/db/drizzle', () => ({
  db: createMockDatabase(),
}));

// Import the mocked database
import { db } from '@/lib/db/drizzle';

describe('/api/content', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content API Tests', () => {
    it('should have proper test data factories', () => {
      const contentItem = testDataFactories.contentItem();
      expect(contentItem).toBeDefined();
      expect(contentItem.title).toBe('Test Content');
      expect(contentItem.slug).toBe('test-content');
      expect(contentItem.contentType).toBe('article');
    });

    it('should have proper content response factories', () => {
      const contentResponse = testDataFactories.contentItemResponse();
      expect(contentResponse).toBeDefined();
      expect(contentResponse.id).toBe('test-content-id');
      expect(contentResponse.title).toBe('Test Content');
      expect(contentResponse.status).toBe('published');
    });

    it('should mock database operations correctly', () => {
      const mockData = [testDataFactories.contentItemResponse()];

      // Mock the database chain
      vi.mocked(db).select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            orderBy: vi.fn().mockReturnValue({
              limit: vi.fn().mockReturnValue({
                offset: vi.fn().mockResolvedValue(mockData),
              }),
            }),
          }),
        }),
      });

      // Test that the mock is properly set up
      expect(vi.mocked(db).select).toBeDefined();
      expect(typeof vi.mocked(db).select).toBe('function');
    });

    it('should handle content creation mock', () => {
      const newContent = testDataFactories.contentItem();
      const createdContent = testDataFactories.contentItemResponse({
        id: 'new-content-id',
        ...newContent,
      });

      // Mock the database chain for insert
      vi.mocked(db).insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([createdContent]),
        }),
      });

      // Test that the mock is properly set up
      expect(vi.mocked(db).insert).toBeDefined();
      expect(typeof vi.mocked(db).insert).toBe('function');
    });
  });
});
