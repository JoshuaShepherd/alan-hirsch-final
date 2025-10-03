import { createClient } from '@supabase/supabase-js'
import { db } from './db/drizzle'
import { userProfiles } from './db/schema/auth'
import { eq } from 'drizzle-orm'

export const testSupabase = createClient(
  process.env['NEXT_PUBLIC_SUPABASE_URL']!,
  process.env['SUPABASE_SERVICE_ROLE_KEY']! // Use service role for tests
)

export interface TestUser {
  id: string
  email: string
  access_token?: string
}

export async function createTestUser(email: string, password: string): Promise<TestUser> {
  const { data, error } = await testSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })
  
  if (error) throw error

  // Create user profile
  await db.insert(userProfiles).values({
    id: data.user.id,
    email: data.user.email!,
    firstName: 'Test',
    lastName: 'User',
    ministryRole: 'senior_pastor'
  })

  return {
    id: data.user.id,
    email: data.user.email!,
    access_token: (data.session as any)?.access_token
  }
}

export async function cleanupTestUser(userId: string) {
  // Delete user profile first
  await db.delete(userProfiles).where(eq(userProfiles.id, userId))
  
  // Delete auth user
  await testSupabase.auth.admin.deleteUser(userId)
}

export async function createTestRequest(
  url: string, 
  options: RequestInit = {},
  userToken?: string
): Promise<Request> {
  const headers = new Headers(options.headers)
  
  if (userToken) {
    headers.set('Authorization', `Bearer ${userToken}`)
  }
  
  return new Request(url, {
    ...options,
    headers
  })
}

export function mockSupabaseAuth(user: TestUser | null = null) {
  const mockGetUser = jest.fn().mockResolvedValue({
    data: { user: user ? { id: user.id, email: user.email } : null },
    error: null
  })

  const mockSignIn = jest.fn().mockResolvedValue({
    data: user ? { user: { id: user.id, email: user.email }, session: { access_token: user.access_token } } : null,
    error: null
  })

  return {
    getUser: mockGetUser,
    signInWithPassword: mockSignIn,
    signUp: jest.fn(),
    signOut: jest.fn(),
    onAuthStateChange: jest.fn()
  }
}

export function mockDatabaseResponse<T>(data: T, error: any = null) {
  return {
    data,
    error
  }
}

// Test data factories
export const testData = {
  userProfile: {
    firstName: 'John',
    lastName: 'Doe',
    ministryRole: 'senior_pastor' as const,
    denomination: 'Baptist',
    churchSize: 'large' as const,
    experience: 10
  },
  
  organization: {
    name: 'Test Church',
    description: 'A test church organization',
    website: 'https://testchurch.com',
    isPublic: true
  },
  
  assessment: {
    title: 'Test Assessment',
    description: 'A test assessment for ministry evaluation',
    category: 'leadership' as const,
    isActive: true,
    timeLimitMinutes: 30
  },
  
  content: {
    title: 'Test Content',
    description: 'Test content for ministry training',
    category: 'teaching' as const,
    contentType: 'article' as const,
    isPublished: true
  }
}

// Database cleanup utilities
export async function cleanupTestData() {
  // This would clean up any test data created during tests
  // Implementation depends on your specific test needs
  console.log('Cleaning up test data...')
}
