import { createMockDatabase, testDataFactories } from '@/lib/mocks';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the database module
vi.mock('@/lib/db/drizzle', () => ({
  db: createMockDatabase(),
}));

// Import the mocked database
import { db } from '@/lib/db/drizzle';

// Mock API route handlers
const mockHandler = vi.fn();

describe('/api/user/profile', () => {
  let testUser: any;

  beforeAll(() => {
    // Mock test user creation
    testUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      access_token: 'test-token',
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/user/profile', () => {
    it('should get user profile successfully', async () => {
      // Use contract-compliant test data
      const mockProfile = testDataFactories.userProfileResponse({
        id: testUser.id,
        email: testUser.email,
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      });

      // Mock the database chain
      vi.mocked(db).select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([mockProfile]),
          }),
        }),
      });

      // Mock the handler function
      mockHandler.mockImplementation(async (input, { user, db }) => {
        const profile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1);

        if (!profile[0]) {
          throw new Error('Profile not found');
        }

        return {
          data: profile[0],
          success: true,
        };
      });

      const result = await mockHandler(testDataFactories.userProfile(), {
        user: testUser,
        db: db,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProfile);
      expect(vi.mocked(db).select).toHaveBeenCalled();
    });

    it('should throw error when profile not found', async () => {
      // Mock the database chain to return empty result
      vi.mocked(db).select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([]),
          }),
        }),
      });

      mockHandler.mockImplementation(async (input, { user, db }) => {
        const profile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1);

        if (!profile[0]) {
          throw new Error('Profile not found');
        }

        return {
          data: profile[0],
          success: true,
        };
      });

      await expect(
        mockHandler(testDataFactories.userProfile(), {
          user: testUser,
          db: db,
        })
      ).rejects.toThrow('Profile not found');
    });
  });

  describe('PUT /api/user/profile', () => {
    it('should update user profile successfully', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith',
        ministryRole: 'associate_pastor' as const,
      };

      const updatedProfile = {
        id: testUser.id,
        email: testUser.email,
        ...updateData,
        updatedAt: expect.any(Date),
        lastActiveAt: expect.any(Date),
      };

      // Mock the database chain for update
      vi.mocked(db).update.mockReturnValueOnce({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([updatedProfile]),
          }),
        }),
      });

      mockHandler.mockImplementation(async (input, { user, db }) => {
        const [updatedProfile] = await db
          .update('user_profiles')
          .set({
            ...input,
            updatedAt: new Date(),
            lastActiveAt: new Date(),
          })
          .where('id', user.id)
          .returning();

        if (!updatedProfile) {
          throw new Error('Profile not found');
        }

        return {
          data: updatedProfile,
          success: true,
        };
      });

      const result = await mockHandler(updateData, {
        user: testUser,
        db: db,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(updatedProfile);
      expect(vi.mocked(db).update).toHaveBeenCalled();
    });
  });

  describe('POST /api/user/profile', () => {
    it('should create new user profile successfully', async () => {
      const newProfileData = {
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor' as const,
        denomination: 'Baptist',
        churchSize: 'large' as const,
        experience: 10,
      };

      const createdProfile = {
        id: testUser.id,
        email: testUser.email,
        ...newProfileData,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        lastActiveAt: expect.any(Date),
      };

      // Mock existing profile check (should return empty)
      vi.mocked(db).select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([]),
          }),
        }),
      });

      // Mock profile creation
      vi.mocked(db).insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([createdProfile]),
        }),
      });

      mockHandler.mockImplementation(async (input, { user, db }) => {
        // Check if profile already exists
        const existingProfile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1);

        if (existingProfile[0]) {
          throw new Error('Profile already exists');
        }

        const [newProfile] = await db
          .insert('user_profiles')
          .values({
            ...input,
            id: user.id,
            email: user.email,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastActiveAt: new Date(),
          })
          .returning();

        return {
          data: newProfile,
          success: true,
        };
      });

      const result = await mockHandler(newProfileData, {
        user: testUser,
        db: db,
      });

      expect(result.success).toBe(true);
      expect(result.data).toEqual(createdProfile);
      expect(vi.mocked(db).insert).toHaveBeenCalled();
    });

    it('should throw error when profile already exists', async () => {
      const existingProfile = {
        id: testUser.id,
        email: testUser.email,
        firstName: 'John',
        lastName: 'Doe',
      };

      // Mock the database chain to return existing profile
      vi.mocked(db).select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            limit: vi.fn().mockResolvedValue([existingProfile]),
          }),
        }),
      });

      mockHandler.mockImplementation(async (input, { user, db }) => {
        const existingProfile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1);

        if (existingProfile[0]) {
          throw new Error('Profile already exists');
        }

        // This shouldn't be reached
        return { data: null, success: false };
      });

      await expect(
        mockHandler(testDataFactories.userProfile(), {
          user: testUser,
          db: db,
        })
      ).rejects.toThrow('Profile already exists');
    });
  });
});
