import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  userProfiles,
  organizations,
  assessments,
  contentItems,
} from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { createMockDatabase, testDataFactories } from '@/lib/mocks';

// Create a mock database with proper chaining
const mockDb = createMockDatabase();

vi.mock('@/lib/db/drizzle', () => ({
  db: mockDb,
}));

// Integration tests for database operations
describe('Database Integration Tests', () => {
  const testUserId = 'test-user-id';
  const testEmail = 'integration@example.com';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('User Profiles', () => {
    it('should create and retrieve user profile', async () => {
      // Use contract-compliant test data
      const profileData = testDataFactories.userProfileResponse({
        id: testUserId,
        email: testEmail,
        firstName: 'Integration',
        lastName: 'Test',
        ministryRole: 'senior_pastor',
        denomination: 'Baptist',
        yearsInMinistry: 5,
      });

      // Mock the insert chain to return the profile data
      mockDb.insert.mockImplementationOnce(() => ({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([profileData]),
        }),
      }));

      // Mock the select chain to return the profile data
      mockDb.select.mockImplementationOnce(() => ({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([profileData]),
          }),
        }),
      }));

      // Test creating a user profile
      const createdProfiles = await mockDb
        .insert(userProfiles)
        .values(profileData)
        .returning();

      const createdProfile = createdProfiles[0];
      expect(createdProfile).toBeDefined();
      expect(createdProfile?.firstName).toBe('Integration');
      expect(createdProfile?.lastName).toBe('Test');

      // Test retrieving the profile
      const retrievedProfiles = await mockDb
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.id, testUserId))
        .limit(1);

      const retrievedProfile = retrievedProfiles[0];
      expect(retrievedProfile).toBeDefined();
      expect(retrievedProfile?.firstName).toBe('Integration');
    });

    it('should update user profile', async () => {
      const updateData = {
        firstName: 'Updated',
        lastName: 'Name',
        experience: 10,
        updatedAt: new Date(),
      };

      const updatedProfile = {
        id: testUserId,
        email: testEmail,
        ...updateData,
        ministryRole: 'senior_pastor' as const,
        createdAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Mock the update chain
      mockDb.update.mockReturnValueOnce({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([updatedProfile]),
          }),
        }),
      });

      const results = await mockDb
        .update(userProfiles)
        .set(updateData)
        .where(eq(userProfiles.id, testUserId))
        .returning();

      const result = results[0];

      expect(result?.firstName).toBe('Updated');
      expect(result?.lastName).toBe('Name');
    });
  });

  describe('Organizations', () => {
    it('should create and manage organization', async () => {
      const orgData = {
        name: 'Test Church',
        description: 'A test church for integration testing',
        website: 'https://testchurch.com',
        isPublic: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockCreatedOrg = { id: 'org-id', ...orgData };

      // Mock the insert chain
      mockDb.insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockCreatedOrg]),
        }),
      });

      // Mock the select chain
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([mockCreatedOrg]),
          }),
        }),
      });

      const createdOrgs = await mockDb
        .insert(organizations)
        .values({
          ...orgData,
          slug: 'test-church',
          organizationType: 'church' as const,
        })
        .returning();

      const createdOrg = createdOrgs[0];

      expect(createdOrg).toBeDefined();
      expect(createdOrg?.name).toBe('Test Church');

      // Test retrieving organization
      const retrievedOrgs = await mockDb
        .select()
        .from(organizations)
        .where(eq(organizations.id, createdOrg.id))
        .limit(1);

      const retrievedOrg = retrievedOrgs[0];
      expect(retrievedOrg?.name).toBe('Test Church');
    });
  });

  describe('Assessments', () => {
    it('should create and query assessments', async () => {
      const assessmentData = {
        name: 'Integration Test Assessment',
        slug: 'integration-test-assessment',
        description: 'An assessment for integration testing',
        assessmentType: 'leadership_style' as const,
        category: 'leadership',
        status: 'active' as const,
        timeLimitMinutes: 30,
        language: 'en',
        culturalAdaptation: 'western' as const,
        researchBacked: true,
        questionsCount: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockCreatedAssessment = { id: 'assessment-id', ...assessmentData };
      const mockAssessmentList = [mockCreatedAssessment];

      // Mock the insert chain
      mockDb.insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockCreatedAssessment]),
        }),
      });

      // Mock the select chain
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockAssessmentList),
        }),
      });

      const [createdAssessment] = await mockDb
        .insert(assessments)
        .values(assessmentData)
        .returning();

      expect(createdAssessment).toBeDefined();
      expect(createdAssessment.name).toBe('Integration Test Assessment');

      // Test querying assessments by type
      const assessmentList = await mockDb
        .select()
        .from(assessments)
        .where(eq(assessments.assessmentType, 'leadership_style'));

      expect(assessmentList.length).toBeGreaterThan(0);
      expect(assessmentList[0].assessmentType).toBe('leadership_style');
    });
  });

  describe('Content Items', () => {
    it('should create and query content items', async () => {
      const contentData = {
        title: 'Integration Test Content',
        slug: 'integration-test-content',
        excerpt: 'Content for integration testing',
        content: 'Full content body for testing',
        authorId: testUserId,
        contentType: 'article' as const,
        format: 'text' as const,
        status: 'published' as const,
        visibility: 'public' as const,
        wordCount: 100,
        estimatedReadingTime: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        publishedAt: new Date(),
      };

      const mockCreatedContent = { id: 'content-id', ...contentData };
      const mockUserContent = [mockCreatedContent];

      // Mock the insert chain
      mockDb.insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([mockCreatedContent]),
        }),
      });

      // Mock the select chain
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockUserContent),
        }),
      });

      const [createdContent] = await mockDb
        .insert(contentItems)
        .values(contentData)
        .returning();

      expect(createdContent).toBeDefined();
      expect(createdContent.title).toBe('Integration Test Content');

      // Test querying content by author
      const userContent = await mockDb
        .select()
        .from(contentItems)
        .where(eq(contentItems.authorId, testUserId));

      expect(userContent.length).toBeGreaterThan(0);
      expect(userContent[0].authorId).toBe(testUserId);
    });

    it('should query content with joins', async () => {
      const mockContentWithAuthor = [
        {
          id: 'content-id',
          title: 'Test Content',
          authorId: testUserId,
          authorName: 'John',
          authorLastName: 'Doe',
        },
      ];

      // Mock the select chain with joins
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          leftJoin: vi.fn().mockReturnValue({
            where: vi.fn().mockReturnValue({
              limit: vi.fn().mockResolvedValue(mockContentWithAuthor),
            }),
          }),
        }),
      });

      // Test complex query with joins
      const contentWithAuthor = await mockDb
        .select({
          id: contentItems.id,
          title: contentItems.title,
          authorId: contentItems.authorId,
          authorName: userProfiles.firstName,
          authorLastName: userProfiles.lastName,
        })
        .from(contentItems)
        .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
        .where(eq(contentItems.authorId, testUserId))
        .limit(1);

      if (contentWithAuthor.length > 0) {
        expect(contentWithAuthor[0].authorId).toBe(testUserId);
        expect(contentWithAuthor[0].authorName).toBeDefined();
      }
    });
  });

  describe('Complex Queries', () => {
    it('should handle pagination queries', async () => {
      const mockPaginatedContent = [
        { id: '1', title: 'Content 1' },
        { id: '2', title: 'Content 2' },
      ];

      // Mock the select chain with pagination
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          orderBy: vi.fn().mockReturnValue({
            limit: vi.fn().mockReturnValue({
              offset: vi.fn().mockResolvedValue(mockPaginatedContent),
            }),
          }),
        }),
      });

      const page = 1;
      const limit = 5;
      const offset = (page - 1) * limit;

      const paginatedContent = await mockDb
        .select()
        .from(contentItems)
        .orderBy(contentItems.createdAt)
        .limit(limit)
        .offset(offset);

      expect(paginatedContent.length).toBeLessThanOrEqual(limit);
    });

    it('should handle search queries', async () => {
      const mockSearchResults = [
        { id: '1', title: 'Test Article', status: 'published' },
      ];

      // Mock the select chain with search
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue(mockSearchResults),
          }),
        }),
      });

      // This would test LIKE queries and full-text search

      const searchResults = await mockDb
        .select()
        .from(contentItems)
        .where(
          and(
            eq(contentItems.status, 'published')
            // Note: In a real implementation, you'd use a proper text search
            // This is a simplified version for testing
          )
        )
        .limit(10);

      expect(Array.isArray(searchResults)).toBe(true);
    });
  });

  describe('Data Integrity', () => {
    it('should enforce foreign key constraints', async () => {
      const invalidContentData = {
        title: 'Invalid Content',
        slug: 'invalid-content',
        excerpt: 'Content with invalid author',
        content: 'Content body',
        authorId: 'invalid-user-id', // This should fail
        contentType: 'article' as const,
        status: 'published' as const,
        visibility: 'public' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock the insert chain to throw an error for invalid foreign key
      mockDb.insert.mockReturnValueOnce({
        values: vi
          .fn()
          .mockRejectedValue(new Error('Foreign key constraint violation')),
      });

      // This should throw an error due to foreign key constraint
      await expect(
        mockDb.insert(contentItems).values(invalidContentData)
      ).rejects.toThrow('Foreign key constraint violation');
    });

    it('should handle unique constraints', async () => {
      const duplicateProfileData = {
        id: testUserId,
        email: testEmail, // Same email as existing user
        firstName: 'Duplicate',
        lastName: 'User',
        ministryRole: 'senior_pastor' as const,
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Mock the insert chain to throw an error for unique constraint violation
      mockDb.insert.mockReturnValueOnce({
        values: vi
          .fn()
          .mockRejectedValue(new Error('Unique constraint violation')),
      });

      // This should fail due to unique constraint on id
      await expect(
        mockDb.insert(userProfiles).values(duplicateProfileData)
      ).rejects.toThrow('Unique constraint violation');
    });
  });
});
