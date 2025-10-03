import { createClient } from '@supabase/supabase-js';
import { vi } from 'vitest';
import type {
  UserProfile,
  NewUserProfile,
  Organization,
  NewOrganization,
  Assessment,
  NewAssessment,
  AssessmentQuestion,
  NewAssessmentQuestion,
  ContentItem,
  NewContentItem,
  UserAssessment,
  NewUserAssessment,
  AssessmentResponse,
  NewAssessmentResponse,
} from './contracts';

const supabaseUrl = process.env['NEXT_PUBLIC_SUPABASE_URL'];
const serviceRoleKey = process.env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl) {
  throw new Error(
    'NEXT_PUBLIC_SUPABASE_URL environment variable is required for tests'
  );
}

if (!serviceRoleKey) {
  throw new Error(
    'SUPABASE_SERVICE_ROLE_KEY environment variable is required for tests'
  );
}

export const testSupabase = createClient(
  supabaseUrl,
  serviceRoleKey // Use service role for tests
);

export interface TestUser {
  id: string;
  email: string;
  access_token?: string;
}

export async function createTestUser(
  email: string,
  password: string
): Promise<TestUser> {
  const { data, error } = await testSupabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) throw error;

  // Note: User profile creation would need to be handled separately
  // to avoid circular dependencies with database imports

  if (!data.user.email) {
    throw new Error('User email is required but not provided');
  }

  return {
    id: data.user.id,
    email: data.user.email,
    access_token: (data as { session?: { access_token?: string } })?.session
      ?.access_token,
  };
}

export async function cleanupTestUser(userId: string) {
  // Delete auth user
  await testSupabase.auth.admin.deleteUser(userId);
}

export async function createTestRequest(
  url: string,
  options: RequestInit = {},
  userToken?: string
): Promise<Request> {
  const headers = new Headers(options.headers);

  if (userToken) {
    headers.set('Authorization', `Bearer ${userToken}`);
  }

  return new Request(url, {
    ...options,
    headers,
  });
}

export function mockSupabaseAuth(user: TestUser | null = null) {
  const mockGetUser = vi.fn().mockResolvedValue({
    data: { user: user ? { id: user.id, email: user.email } : null },
    error: null,
  });

  const mockSignIn = vi.fn().mockResolvedValue({
    data: user
      ? {
          user: { id: user.id, email: user.email },
          session: { access_token: user.access_token },
        }
      : null,
    error: null,
  });

  return {
    getUser: mockGetUser,
    signInWithPassword: mockSignIn,
    signUp: vi.fn(),
    signOut: vi.fn(),
    onAuthStateChange: vi.fn(),
  };
}

export function mockDatabaseResponse<T>(data: T, error: Error | null = null) {
  return {
    data,
    error,
  };
}

// ============================================================================
// CONTRACT-COMPLIANT TEST DATA FACTORIES
// ============================================================================

/**
 * Test Data Factories - Generate contract-compliant test data
 *
 * These factories ensure all test data matches our Zod schemas and DTOs
 * exactly, preventing test failures due to type mismatches.
 */

export const testDataFactories = {
  // User Profile Factories
  userProfile: (overrides: Partial<NewUserProfile> = {}): NewUserProfile => ({
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    ministryRole: 'senior_pastor',
    denomination: 'Baptist',
    yearsInMinistry: 10,
    bio: 'Test user bio',
    organizationName: 'Test Church',
    languagePrimary: 'en',
    subscriptionTier: 'free',
    theologicalFocus: [],
    brandColors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#059669',
    },
    emailNotifications: {
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    },
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
    onboardingCompleted: false,
    onboardingStep: 1,
    accountStatus: 'pending_verification',
    ...overrides,
  }),

  userProfileResponse: (overrides: Partial<UserProfile> = {}): UserProfile => ({
    id: 'test-user-id',
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    ministryRole: 'senior_pastor',
    denomination: 'Baptist',
    yearsInMinistry: 10,
    bio: 'Test user bio',
    organizationName: 'Test Church',
    languagePrimary: 'en',
    subscriptionTier: 'free',
    theologicalFocus: [],
    brandColors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#059669',
    },
    emailNotifications: {
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    },
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
    onboardingCompleted: false,
    onboardingStep: 1,
    accountStatus: 'pending_verification',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    lastActiveAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  }),

  // Organization Factories
  organization: (
    overrides: Partial<NewOrganization> = {}
  ): NewOrganization => ({
    name: 'Test Church',
    slug: 'test-church',
    description: 'A test church organization',
    website: 'https://testchurch.com',
    organizationType: 'church',
    status: 'active',
    licenseType: 'individual',
    maxUsers: 1,
    address: {
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      postalCode: '12345',
      country: 'US',
    },
    contactEmail: 'contact@testchurch.com',
    contactPhone: '+1-555-0123',
    ...overrides,
  }),

  organizationResponse: (
    overrides: Partial<Organization> = {}
  ): Organization => ({
    id: 'test-org-id',
    name: 'Test Church',
    slug: 'test-church',
    description: 'A test church organization',
    website: 'https://testchurch.com',
    organizationType: 'church',
    status: 'active',
    licenseType: 'individual',
    maxUsers: 1,
    address: {
      street: '123 Test St',
      city: 'Test City',
      state: 'TS',
      postalCode: '12345',
      country: 'US',
    },
    contactEmail: 'contact@testchurch.com',
    contactPhone: '+1-555-0123',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  }),

  // Assessment Factories
  newAssessment: (overrides: Partial<NewAssessment> = {}): NewAssessment => ({
    name: 'Test Assessment',
    slug: 'test-assessment',
    description: 'A test assessment for ministry evaluation',
    assessmentType: 'leadership_style',
    status: 'active',
    estimatedDuration: 30,
    version: '1.0',
    language: 'en',
    culturalAdaptation: 'western',
    researchBacked: true,
    questionsCount: 10,
    scoringMethod: 'likert_5',
    ...overrides,
  }),

  assessment: (overrides: Partial<Assessment> = {}): Assessment => ({
    id: 'test-assessment-id',
    name: 'Test Assessment',
    slug: 'test-assessment',
    description: 'A test assessment for ministry evaluation',
    assessmentType: 'leadership_style',
    status: 'active',
    estimatedDuration: 30,
    version: '1.0',
    language: 'en',
    culturalAdaptation: 'western',
    researchBacked: true,
    scoringMethod: 'likert_5',
    questionsCount: 10,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  }),

  // Assessment Question Factories
  assessmentQuestion: (
    overrides: Partial<NewAssessmentQuestion> = {}
  ): NewAssessmentQuestion => ({
    assessmentId: 'test-assessment-id',
    questionText: 'Test question text',
    questionType: 'multiple_choice',
    orderIndex: 1,
    isRequired: true,
    weight: 1.0,
    reverseScored: false,
    answerOptions: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    ...overrides,
  }),

  assessmentQuestionResponse: (
    overrides: Partial<AssessmentQuestion> = {}
  ): AssessmentQuestion => ({
    id: 'test-question-id',
    assessmentId: 'test-assessment-id',
    questionText: 'Test question text',
    questionType: 'multiple_choice',
    orderIndex: 1,
    isRequired: true,
    weight: 1.0,
    reverseScored: false,
    answerOptions: [
      { value: 1, label: 'Option 1' },
      { value: 2, label: 'Option 2' },
      { value: 3, label: 'Option 3' },
    ],
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  }),

  // Content Item Factories
  contentItem: (overrides: Partial<NewContentItem> = {}): NewContentItem => ({
    title: 'Test Content',
    slug: 'test-content',
    excerpt: 'Test content excerpt',
    content: 'Full test content body',
    authorId: 'test-user-id',
    coAuthors: [], // Explicitly provide coAuthors to match expected type
    contentType: 'article',
    format: 'text',
    status: 'published',
    visibility: 'public',
    wordCount: 100,
    estimatedReadingTime: 1,
    viewCount: 0, // Explicitly provide analytics fields to match expected type
    likeCount: 0,
    shareCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    secondaryCategories: [], // Explicitly provide array fields to match expected type
    tags: [],
    theologicalThemes: [],
    networkAmplificationScore: 0,
    crossReferenceCount: 0,
    aiEnhanced: false,
    aiKeyPoints: [],
    attachments: [],
    licenseType: 'all_rights_reserved',
    attributionRequired: true,
    ...overrides,
  }),

  contentItemResponse: (overrides: Partial<ContentItem> = {}): ContentItem => ({
    id: 'test-content-id',
    title: 'Test Content',
    slug: 'test-content',
    excerpt: 'Test content excerpt',
    content: 'Full test content body',
    authorId: 'test-user-id',
    contentType: 'article',
    format: 'text',
    status: 'published',
    visibility: 'public',
    wordCount: 100,
    estimatedReadingTime: 1,
    licenseType: 'all_rights_reserved',
    coAuthors: [],
    viewCount: 0,
    likeCount: 0,
    shareCount: 0,
    commentCount: 0,
    bookmarkCount: 0,
    secondaryCategories: [],
    tags: [],
    theologicalThemes: [],
    networkAmplificationScore: 0,
    crossReferenceCount: 0,
    aiEnhanced: false,
    aiSummary: undefined,
    aiKeyPoints: [],
    featuredImageUrl: undefined,
    videoUrl: undefined,
    audioUrl: undefined,
    attachments: [],
    metaTitle: undefined,
    metaDescription: undefined,
    canonicalUrl: undefined,
    originalSource: undefined,
    attributionRequired: false,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    publishedAt: new Date('2024-01-01T00:00:00Z'),
    scheduledAt: undefined,
    ...overrides,
  }),

  // User Assessment Factories
  userAssessment: (
    overrides: Partial<NewUserAssessment> = {}
  ): NewUserAssessment => ({
    userId: 'test-user-id',
    assessmentId: 'test-assessment-id',
    startedAt: new Date('2024-01-01T00:00:00Z'),
    completionPercentage: 0,
    culturalAdjustmentApplied: false,
    suggestedPeers: [],
    complementaryGifts: [],
    ...overrides,
  }),

  userAssessmentResponse: (
    overrides: Partial<UserAssessment> = {}
  ): UserAssessment => ({
    id: 'test-user-assessment-id',
    userId: 'test-user-id',
    assessmentId: 'test-assessment-id',
    startedAt: new Date('2024-01-01T00:00:00Z'),
    completedAt: undefined,
    completionPercentage: 0,
    totalScore: undefined,
    culturalAdjustmentApplied: false,
    suggestedPeers: [],
    complementaryGifts: [],
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  }),

  // Assessment Response Factories
  newAssessmentResponse: (
    overrides: Partial<NewAssessmentResponse> = {}
  ): NewAssessmentResponse => ({
    userAssessmentId: 'test-user-assessment-id',
    questionId: 'test-question-id',
    responseValue: 1,
    responseText: 'Option 1',
    skipped: false,
    ...overrides,
  }),

  assessmentResponse: (
    overrides: Partial<AssessmentResponse> = {}
  ): AssessmentResponse => ({
    id: 'test-response-id',
    userAssessmentId: 'test-user-assessment-id',
    questionId: 'test-question-id',
    responseValue: 1,
    responseText: 'Option 1',
    skipped: false,
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
    ...overrides,
  }),
};

// ============================================================================
// LEGACY TEST DATA (for backward compatibility)
// ============================================================================

export const testData = {
  userProfile: {
    firstName: 'John',
    lastName: 'Doe',
    ministryRole: 'senior_pastor' as const,
    denomination: 'Baptist',
    churchSize: 'large' as const,
    experience: 10,
  },

  organization: {
    name: 'Test Church',
    description: 'A test church organization',
    website: 'https://testchurch.com',
  },

  assessment: {
    title: 'Test Assessment',
    description: 'A test assessment for ministry evaluation',
    assessmentType: 'leadership_style' as const,
    isActive: true,
    estimatedDuration: 30,
  },

  content: {
    title: 'Test Content',
    description: 'Test content for ministry training',
    contentType: 'article' as const,
    isPublished: true,
  },
};

// ============================================================================
// DATABASE SEEDING UTILITIES
// ============================================================================

/**
 * Database seeding utilities for integration tests
 * These functions help set up test data in the database for integration tests
 */

export async function seedTestUser(
  userId: string = 'test-user-id'
): Promise<UserProfile> {
  const userData = testDataFactories.userProfileResponse({ id: userId });

  // Note: Database seeding would need to be handled separately
  // to avoid circular dependencies with database imports

  return userData;
}

export async function cleanupTestData() {
  // This would clean up any test data created during tests
  // Implementation depends on your specific test needs
  console.log('Cleaning up test data...');
}

// ============================================================================
// MOCK UTILITIES
// ============================================================================

/**
 * Mock utilities for external services
 * These provide consistent mocking patterns for Supabase, Stripe, etc.
 */

export function createMockDatabase() {
  return {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  };
}

export function createMockSupabaseClient() {
  return {
    auth: {
      getUser: vi.fn(),
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      onAuthStateChange: vi.fn(),
      admin: {
        createUser: vi.fn(),
        deleteUser: vi.fn(),
      },
    },
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  };
}

export function createMockStripeClient() {
  return {
    customers: {
      create: vi.fn(),
      retrieve: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    subscriptions: {
      create: vi.fn(),
      retrieve: vi.fn(),
      update: vi.fn(),
      cancel: vi.fn(),
    },
    checkout: {
      sessions: {
        create: vi.fn(),
        retrieve: vi.fn(),
      },
    },
  };
}
