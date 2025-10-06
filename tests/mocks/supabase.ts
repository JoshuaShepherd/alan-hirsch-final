/**
 * Mock Supabase client for testing
 * Provides realistic mock responses for RLS policy testing
 */

import { vi } from 'vitest';

// Mock data for testing
const mockUserProfiles = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    email: 'alan@example.com',
    display_name: 'Alan Hirsch',
    bio: 'Author and speaker',
    ministry_role: 'author',
    account_status: 'active',
    privacy_settings: { publicProfile: true },
  },
  {
    id: '660e8400-e29b-41d4-a716-446655440001',
    email: 'user2@example.com',
    display_name: 'User 2',
    bio: 'Test user',
    ministry_role: 'pastor',
    account_status: 'active',
    privacy_settings: { publicProfile: false },
  },
];

const mockOrganizations = [
  {
    id: '880e8400-e29b-41d4-a716-446655440003',
    name: 'Test Organization',
    slug: 'test-org',
    organization_type: 'church',
    account_owner_id: '550e8400-e29b-41d4-a716-446655440000',
    description: 'A test organization',
  },
];

const mockContentItems = [
  {
    id: 'content-123',
    title: 'Test Content',
    slug: 'test-content',
    author_id: '550e8400-e29b-41d4-a716-446655440000',
    content_type: 'article',
    status: 'published',
    visibility: 'public',
  },
];

const mockAssessments = [
  {
    id: 'assessment-123',
    name: 'Test Assessment',
    slug: 'test-assessment',
    assessment_type: 'apest',
    questions_count: 5,
    status: 'active',
  },
];

const mockCommunities = [
  {
    id: 'community-123',
    name: 'Test Community',
    slug: 'test-community',
    community_type: 'discussion',
    visibility: 'public',
    created_by: '550e8400-e29b-41d4-a716-446655440000',
  },
];

const mockSubscriptionPlans = [
  {
    id: 'plan-123',
    name: 'Basic Plan',
    slug: 'basic-plan',
    plan_type: 'individual',
    content_access_level: 'free',
    features: {},
    is_active: true,
  },
];

const mockContentCategories = [
  {
    id: 'category-123',
    name: 'Leadership',
    slug: 'leadership',
    is_active: true,
  },
];

const mockAssessmentQuestions = [
  {
    id: 'question-123',
    question_text: 'Test question',
    assessment_id: 'assessment-123',
  },
];

// Mock query builder
const createMockQueryBuilder = (tableName: string, mockData: any[]) => {
  const queryBuilder = {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    like: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    single: vi.fn().mockImplementation(() => {
      // Return first item from mock data
      const item = mockData[0];
      return Promise.resolve({ data: item, error: null });
    }),
    then: vi.fn().mockImplementation((resolve) => {
      // For regular queries, return all matching data
      const filteredData = mockData.filter(item => {
        // Simple filtering logic for testing
        return true;
      });
      resolve({ data: filteredData, error: null });
    }),
  };

  return queryBuilder;
};

// Mock Supabase client
export const createMockSupabaseClient = () => {
  const mockClient = {
    from: vi.fn().mockImplementation((tableName: string) => {
      switch (tableName) {
        case 'user_profiles':
          return createMockQueryBuilder(tableName, mockUserProfiles);
        case 'organizations':
          return createMockQueryBuilder(tableName, mockOrganizations);
        case 'content_items':
          return createMockQueryBuilder(tableName, mockContentItems);
        case 'assessments':
          return createMockQueryBuilder(tableName, mockAssessments);
        case 'communities':
          return createMockQueryBuilder(tableName, mockCommunities);
        case 'subscription_plans':
          return createMockQueryBuilder(tableName, mockSubscriptionPlans);
        case 'content_categories':
          return createMockQueryBuilder(tableName, mockContentCategories);
        case 'assessment_questions':
          return createMockQueryBuilder(tableName, mockAssessmentQuestions);
        case 'organization_memberships':
          return createMockQueryBuilder(tableName, []);
        case 'user_assessments':
          return createMockQueryBuilder(tableName, []);
        case 'user_subscriptions':
          return createMockQueryBuilder(tableName, []);
        case 'assessment_responses':
          return createMockQueryBuilder(tableName, []);
        default:
          return createMockQueryBuilder(tableName, []);
      }
    }),
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  };

  return mockClient;
};

// Mock the Supabase client creation
export const mockCreateClient = vi.fn().mockImplementation((url: string, key: string) => {
  return createMockSupabaseClient();
});

// Export mock data for use in tests
export {
  mockUserProfiles,
  mockOrganizations,
  mockContentItems,
  mockAssessments,
  mockCommunities,
  mockSubscriptionPlans,
  mockContentCategories,
  mockAssessmentQuestions,
};
