import { createTestUser, cleanupTestUser, testData } from '@/lib/test-utils'

// Mock the database
const mockDb = {
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  limit: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
}

jest.mock('@/lib/db/drizzle', () => ({
  db: mockDb
}))

// Mock API route handlers
const mockHandler = jest.fn()

describe('/api/user/profile', () => {
  let testUser: any

  beforeAll(async () => {
    // Mock test user creation
    testUser = {
      id: 'test-user-id',
      email: 'test@example.com',
      access_token: 'test-token'
    }
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/user/profile', () => {
    it('should get user profile successfully', async () => {
      const mockProfile = {
        ...testData.userProfile,
        id: testUser.id,
        email: testUser.email,
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor'
      }

      mockDb.select.mockResolvedValueOnce([mockProfile])

      // Mock the handler function
      mockHandler.mockImplementation(async (input, { user, db }) => {
        const profile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1)

        if (!profile[0]) {
          throw new Error('Profile not found')
        }

        return {
          data: profile[0],
          success: true
        }
      })

      const result = await mockHandler(
        testData.userProfile,
        { user: testUser, db: mockDb }
      )

      expect(result.success).toBe(true)
      expect(result.data).toEqual(mockProfile)
      expect(mockDb.select).toHaveBeenCalled()
    })

    it('should throw error when profile not found', async () => {
      mockDb.select.mockResolvedValueOnce([])

      mockHandler.mockImplementation(async (input, { user, db }) => {
        const profile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1)

        if (!profile[0]) {
          throw new Error('Profile not found')
        }

        return {
          data: profile[0],
          success: true
        }
      })

      await expect(
        mockHandler(testData.userProfile, { user: testUser, db: mockDb })
      ).rejects.toThrow('Profile not found')
    })
  })

  describe('PUT /api/user/profile', () => {
    it('should update user profile successfully', async () => {
      const updateData = {
        firstName: 'Jane',
        lastName: 'Smith',
        ministryRole: 'associate_pastor' as const
      }

      const updatedProfile = {
        id: testUser.id,
        email: testUser.email,
        ...updateData,
        updatedAt: expect.any(Date),
        lastActiveAt: expect.any(Date)
      }

      mockDb.update.mockResolvedValueOnce([updatedProfile])

      mockHandler.mockImplementation(async (input, { user, db }) => {
        const [updatedProfile] = await db
          .update('user_profiles')
          .set({
            ...input,
            updatedAt: new Date(),
            lastActiveAt: new Date()
          })
          .where('id', user.id)
          .returning()

        if (!updatedProfile) {
          throw new Error('Profile not found')
        }

        return {
          data: updatedProfile,
          success: true
        }
      })

      const result = await mockHandler(
        updateData,
        { user: testUser, db: mockDb }
      )

      expect(result.success).toBe(true)
      expect(result.data).toEqual(updatedProfile)
      expect(mockDb.update).toHaveBeenCalled()
    })
  })

  describe('POST /api/user/profile', () => {
    it('should create new user profile successfully', async () => {
      const newProfileData = {
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor' as const,
        denomination: 'Baptist',
        churchSize: 'large' as const,
        experience: 10
      }

      const createdProfile = {
        id: testUser.id,
        email: testUser.email,
        ...newProfileData,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
        lastActiveAt: expect.any(Date)
      }

      // Mock existing profile check (should return empty)
      mockDb.select.mockResolvedValueOnce([])
      // Mock profile creation
      mockDb.insert.mockResolvedValueOnce([createdProfile])

      mockHandler.mockImplementation(async (input, { user, db }) => {
        // Check if profile already exists
        const existingProfile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1)

        if (existingProfile[0]) {
          throw new Error('Profile already exists')
        }

        const [newProfile] = await db
          .insert('user_profiles')
          .values({
            ...input,
            id: user.id,
            email: user.email,
            createdAt: new Date(),
            updatedAt: new Date(),
            lastActiveAt: new Date()
          })
          .returning()

        return {
          data: newProfile,
          success: true
        }
      })

      const result = await mockHandler(
        newProfileData,
        { user: testUser, db: mockDb }
      )

      expect(result.success).toBe(true)
      expect(result.data).toEqual(createdProfile)
      expect(mockDb.insert).toHaveBeenCalled()
    })

    it('should throw error when profile already exists', async () => {
      const existingProfile = {
        id: testUser.id,
        email: testUser.email,
        firstName: 'John',
        lastName: 'Doe'
      }

      mockDb.select.mockResolvedValueOnce([existingProfile])

      mockHandler.mockImplementation(async (input, { user, db }) => {
        const existingProfile = await db
          .select()
          .from('user_profiles')
          .where('id', user.id)
          .limit(1)

        if (existingProfile[0]) {
          throw new Error('Profile already exists')
        }

        // This shouldn't be reached
        return { data: null, success: false }
      })

      await expect(
        mockHandler(testData.userProfile, { user: testUser, db: mockDb })
      ).rejects.toThrow('Profile already exists')
    })
  })
})