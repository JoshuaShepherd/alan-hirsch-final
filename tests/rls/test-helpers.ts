/**
 * RLS Test Helpers
 *
 * This module provides utilities for testing Row-Level Security policies
 * with mocked Supabase clients that simulate real RLS behavior.
 */

import type { TestUser } from '@platform/shared/test-utils';
import { vi } from 'vitest';

export interface MockRLSConfig {
  user?: TestUser | null;
  organizationId?: string;
  userRole?: 'owner' | 'admin' | 'member' | 'viewer';
  isOrganizationMember?: boolean;
  isOrganizationAdmin?: boolean;
  isOrganizationOwner?: boolean;
  hasActiveSubscription?: boolean;
  hasPremiumSubscription?: boolean;
  privacySettings?: {
    publicProfile?: boolean;
    showAssessmentResults?: boolean;
    allowNetworking?: boolean;
    shareAnalytics?: boolean;
  };
}

export interface MockTableData {
  [tableName: string]: any[];
}

/**
 * Creates a mock Supabase client that simulates RLS policies
 */
export function createMockSupabaseClientWithRLS(
  config: MockRLSConfig = {},
  tableData: MockTableData = {}
) {
  const {
    user = null,
    organizationId = null,
    userRole = 'viewer',
    isOrganizationMember = false,
    isOrganizationAdmin = false,
    isOrganizationOwner = false,
    hasActiveSubscription = false,
    hasPremiumSubscription = false,
    privacySettings = {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
  } = config;

  // Helper functions to simulate RLS policies
  const rlsHelpers = {
    isUserOwner: (recordUserId: string) => user?.id === recordUserId,
    isOrganizationMember: (recordOrgId: string) =>
      isOrganizationMember && organizationId === recordOrgId,
    isOrganizationAdmin: (recordOrgId: string) =>
      isOrganizationAdmin && organizationId === recordOrgId,
    isOrganizationOwner: (recordOrgId: string) =>
      isOrganizationOwner && organizationId === recordOrgId,
    isAccountOwner: (recordAccountOwnerId: string) =>
      user?.id === recordAccountOwnerId,
    hasPublicProfile: (recordUserId: string) =>
      user?.id === recordUserId || privacySettings.publicProfile,
    isPublishedContent: (status: string, visibility: string) =>
      status === 'published' && visibility === 'public',
    isActiveRecord: (isActive: boolean) => isActive,
    hasSubscriptionAccess: () =>
      hasActiveSubscription || hasPremiumSubscription,
  };

  // Mock query builder that applies RLS policies
  const createMockQueryBuilder = (tableName: string, data: any[] = []) => {
    let filteredData = data;
    let filters: Array<{ field: string; value: any; operator: string }> = [];

    const queryBuilder = {
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockImplementation((field: string, value: any) => {
        filters.push({ field, value, operator: 'eq' });
        return queryBuilder;
      }),
      neq: vi.fn().mockReturnThis(),
      gt: vi.fn().mockReturnThis(),
      gte: vi.fn().mockReturnThis(),
      lt: vi.fn().mockReturnThis(),
      lte: vi.fn().mockReturnThis(),
      like: vi.fn().mockReturnThis(),
      ilike: vi.fn().mockReturnThis(),
      is: vi.fn().mockReturnThis(),
      in: vi.fn().mockReturnThis(),
      contains: vi.fn().mockReturnThis(),
      containedBy: vi.fn().mockReturnThis(),
      rangeGt: vi.fn().mockReturnThis(),
      rangeGte: vi.fn().mockReturnThis(),
      rangeLt: vi.fn().mockReturnThis(),
      rangeLte: vi.fn().mockReturnThis(),
      rangeAdjacent: vi.fn().mockReturnThis(),
      overlaps: vi.fn().mockReturnThis(),
      textSearch: vi.fn().mockReturnThis(),
      match: vi.fn().mockReturnThis(),
      not: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      filter: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockReturnThis(),
      range: vi.fn().mockReturnThis(),
      single: vi.fn().mockImplementation(() => {
        // Apply RLS policies first
        const rlsFilteredData = applyRLSPolicies(tableName, data);

        // Apply query filters
        let finalData = rlsFilteredData;
        for (const filter of filters) {
          if (filter.operator === 'eq') {
            finalData = finalData.filter(
              (item: any) => item[filter.field] === filter.value
            );
          }
        }

        const item = finalData[0];
        return Promise.resolve({ data: item, error: null });
      }),
      maybeSingle: vi.fn().mockImplementation(() => {
        const rlsFilteredData = applyRLSPolicies(tableName, data);
        let finalData = rlsFilteredData;
        for (const filter of filters) {
          if (filter.operator === 'eq') {
            finalData = finalData.filter(
              (item: any) => item[filter.field] === filter.value
            );
          }
        }
        const item = finalData[0];
        return Promise.resolve({ data: item || null, error: null });
      }),
      csv: vi.fn().mockImplementation(() => {
        const rlsFilteredData = applyRLSPolicies(tableName, data);
        let finalData = rlsFilteredData;
        for (const filter of filters) {
          if (filter.operator === 'eq') {
            finalData = finalData.filter(
              (item: any) => item[filter.field] === filter.value
            );
          }
        }
        return Promise.resolve({ data: finalData, error: null });
      }),
      geojson: vi.fn().mockImplementation(() => {
        const rlsFilteredData = applyRLSPolicies(tableName, data);
        let finalData = rlsFilteredData;
        for (const filter of filters) {
          if (filter.operator === 'eq') {
            finalData = finalData.filter(
              (item: any) => item[filter.field] === filter.value
            );
          }
        }
        return Promise.resolve({ data: finalData, error: null });
      }),
      explain: vi.fn().mockImplementation(() => {
        const rlsFilteredData = applyRLSPolicies(tableName, data);
        let finalData = rlsFilteredData;
        for (const filter of filters) {
          if (filter.operator === 'eq') {
            finalData = finalData.filter(
              (item: any) => item[filter.field] === filter.value
            );
          }
        }
        return Promise.resolve({ data: finalData, error: null });
      }),
      rollback: vi.fn().mockReturnThis(),
      returns: vi.fn().mockReturnThis(),
      then: vi.fn().mockImplementation(resolve => {
        const rlsFilteredData = applyRLSPolicies(tableName, data);
        let finalData = rlsFilteredData;
        for (const filter of filters) {
          if (filter.operator === 'eq') {
            finalData = finalData.filter(
              (item: any) => item[filter.field] === filter.value
            );
          }
        }
        resolve({ data: finalData, error: null });
      }),
    };

    return queryBuilder;
  };

  // Apply RLS policies based on table type
  const applyRLSPolicies = (tableName: string, data: any[]): any[] => {
    if (!user) {
      // Anonymous user - only public data
      return data.filter(item => {
        switch (tableName) {
          case 'user_profiles':
            return item.privacySettings?.publicProfile === true;
          case 'content_items':
            return item.status === 'published' && item.visibility === 'public';
          case 'communities':
            return item.visibility === 'public';
          case 'subscription_plans':
            return item.isActive === true;
          case 'content_categories':
            return item.isActive === true;
          case 'assessment_questions':
            return true; // Public by default
          default:
            return false; // No access to other tables
        }
      });
    }

    // Authenticated user - apply specific RLS policies
    return data.filter(item => {
      switch (tableName) {
        case 'user_profiles':
          return (
            rlsHelpers.isUserOwner(item.id) ||
            rlsHelpers.hasPublicProfile(item.id)
          );

        case 'organizations':
          const isMember = rlsHelpers.isOrganizationMember(item.id);
          const isAdmin = rlsHelpers.isOrganizationAdmin(item.id);
          const isOwner = rlsHelpers.isOrganizationOwner(item.id);
          const isAccountOwner = rlsHelpers.isAccountOwner(item.accountOwnerId);
          return isMember || isAdmin || isOwner || isAccountOwner;

        case 'content_items':
          return (
            rlsHelpers.isUserOwner(item.authorId) ||
            rlsHelpers.isPublishedContent(item.status, item.visibility)
          );

        case 'assessments':
          return true; // Public by default

        case 'user_assessments':
          return rlsHelpers.isUserOwner(item.userId);

        case 'communities':
          return (
            item.visibility === 'public' ||
            rlsHelpers.isOrganizationMember(item.organizationId)
          );

        case 'subscription_plans':
          return rlsHelpers.isActiveRecord(item.isActive);

        case 'user_subscriptions':
          return rlsHelpers.isUserOwner(item.userId);

        case 'organization_memberships':
          return (
            rlsHelpers.isUserOwner(item.userId) ||
            rlsHelpers.isOrganizationAdmin(item.organizationId)
          );

        case 'content_categories':
          return rlsHelpers.isActiveRecord(item.isActive);

        case 'assessment_questions':
          return true; // Public by default

        case 'assessment_responses':
          return rlsHelpers.isUserOwner(item.userId);

        default:
          return true; // Allow access to other tables by default
      }
    });
  };

  const mockClient = {
    from: vi.fn().mockImplementation((tableName: string) => {
      const data = tableData[tableName] || [];
      return createMockQueryBuilder(tableName, data);
    }),

    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: user ? { id: user.id, email: user.email } : null },
        error: null,
      }),

      signInWithPassword: vi.fn().mockResolvedValue({
        data: user
          ? {
              user: { id: user.id, email: user.email },
              session: { access_token: user.access_token },
            }
          : null,
        error: null,
      }),

      signUp: vi.fn().mockResolvedValue({
        data: user
          ? {
              user: { id: user.id, email: user.email },
              session: { access_token: user.access_token },
            }
          : null,
        error: null,
      }),

      signOut: vi.fn().mockResolvedValue({
        error: null,
      }),

      onAuthStateChange: vi.fn().mockReturnValue({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      }),

      admin: {
        createUser: vi.fn().mockResolvedValue({
          data: user
            ? {
                user: { id: user.id, email: user.email },
                session: { access_token: user.access_token },
              }
            : null,
          error: null,
        }),

        deleteUser: vi.fn().mockResolvedValue({
          data: { id: user?.id },
          error: null,
        }),

        listUsers: vi.fn().mockResolvedValue({
          data: { users: user ? [user] : [] },
          error: null,
        }),
      },
    },

    // Real-time functionality
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
      unsubscribe: vi.fn().mockReturnThis(),
    }),
  };

  return mockClient;
}

/**
 * Creates test data for RLS testing
 */
export function createRLSTestData(): MockTableData {
  const testUser1 = '550e8400-e29b-41d4-a716-446655440000';
  const testUser2 = '660e8400-e29b-41d4-a716-446655440001';
  const testUser3 = '770e8400-e29b-41d4-a716-446655440002';
  const testOrgId = '880e8400-e29b-41d4-a716-446655440003';

  return {
    user_profiles: [
      {
        id: testUser1,
        email: 'alan@example.com',
        firstName: 'Alan',
        lastName: 'Hirsch',
        displayName: 'Alan Hirsch',
        bio: 'Author and speaker',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        privacySettings: { publicProfile: true },
        avatarUrl: null,
        denomination: 'Non-denominational',
        organizationName: 'Forge Mission Training Network',
        yearsInMinistry: 30,
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',
        subdomain: 'alan-hirsch',
        customDomain: null,
        platformTitle: 'Alan Hirsch Digital Platform',
        subscriptionTier: 'leader',
        theologicalFocus: ['missional', 'apostolic', 'movement'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: testUser2,
        email: 'user2@example.com',
        firstName: 'John',
        lastName: 'Doe',
        displayName: 'User 2',
        bio: 'Test user',
        ministryRole: 'associate_pastor',
        accountStatus: 'active',
        privacySettings: { publicProfile: false },
        avatarUrl: null,
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 5,
        countryCode: 'US',
        timezone: 'America/Chicago',
        languagePrimary: 'en',
        culturalContext: 'western',
        subdomain: null,
        customDomain: null,
        platformTitle: null,
        subscriptionTier: 'individual',
        theologicalFocus: ['leadership', 'discipleship'],
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      {
        id: testUser3,
        email: 'user3@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        displayName: 'User 3',
        bio: 'Another test user',
        ministryRole: 'church_planter',
        accountStatus: 'active',
        privacySettings: { publicProfile: true },
        avatarUrl: null,
        denomination: 'Presbyterian',
        organizationName: 'New Church Plant',
        yearsInMinistry: 3,
        countryCode: 'CA',
        timezone: 'America/Toronto',
        languagePrimary: 'en',
        culturalContext: 'western',
        subdomain: null,
        customDomain: null,
        platformTitle: null,
        subscriptionTier: 'professional',
        theologicalFocus: ['church_planting', 'evangelism'],
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
      },
    ],

    organizations: [
      {
        id: testOrgId,
        name: 'Test Organization',
        slug: 'test-org',
        organizationType: 'church',
        accountOwnerId: testUser1,
        status: 'active',
        description: 'A test organization for RLS testing',
        website: 'https://test-org.example.com',
        logoUrl: null,
        sizeCategory: 'medium',
        contactEmail: 'contact@test-org.example.com',
        contactPhone: null,
        address: null,
        licenseType: 'individual',
        maxUsers: 10,
        billingEmail: 'billing@test-org.example.com',
        stripeCustomerId: null,
        stripeProductId: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],

    organization_memberships: [
      {
        id: 'membership-1',
        userId: testUser1,
        organizationId: testOrgId,
        role: 'owner',
        status: 'active',
        permissions: [],
        joinedAt: '2024-01-01T00:00:00Z',
        invitedAt: null,
        invitedBy: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'membership-2',
        userId: testUser2,
        organizationId: testOrgId,
        role: 'member',
        status: 'active',
        permissions: [],
        joinedAt: '2024-01-02T00:00:00Z',
        invitedAt: '2024-01-01T00:00:00Z',
        invitedBy: testUser1,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ],

    content_items: [
      {
        id: 'content-1',
        title: 'Public Article',
        slug: 'public-article',
        authorId: testUser1,
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        excerpt: 'This is a public article for testing.',
        content: 'Full content of the public article...',
        primaryCategoryId: 'category-1',
        publishedAt: '2024-01-01T00:00:00Z',
        viewCount: 100,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'content-2',
        title: 'Draft Article',
        slug: 'draft-article',
        authorId: testUser2,
        contentType: 'article',
        status: 'draft',
        visibility: 'public',
        excerpt: 'This is a draft article for testing.',
        content: 'Full content of the draft article...',
        primaryCategoryId: 'category-2',
        publishedAt: null,
        viewCount: 0,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
      {
        id: 'content-3',
        title: 'Private Article',
        slug: 'private-article',
        authorId: testUser1,
        contentType: 'article',
        status: 'published',
        visibility: 'private',
        excerpt: 'This is a private article for testing.',
        content: 'Full content of the private article...',
        primaryCategoryId: 'category-1',
        publishedAt: '2024-01-03T00:00:00Z',
        viewCount: 5,
        createdAt: '2024-01-03T00:00:00Z',
        updatedAt: '2024-01-03T00:00:00Z',
      },
    ],

    assessments: [
      {
        id: 'assessment-1',
        name: 'APEST Assessment',
        slug: 'apest-assessment',
        assessmentType: 'apest',
        questionsCount: 50,
        status: 'active',
        description: 'The APEST assessment for ministry leaders',
        instructions: 'Answer each question honestly based on your experience',
        timeLimit: 30,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'assessment-2',
        name: 'Leadership Assessment',
        slug: 'leadership-assessment',
        assessmentType: 'leadership_style',
        questionsCount: 30,
        status: 'active',
        description: 'Leadership style assessment',
        instructions:
          'Choose the option that best describes your leadership approach',
        timeLimit: 20,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],

    user_assessments: [
      {
        id: 'user-assessment-1',
        userId: testUser1,
        assessmentId: 'assessment-1',
        status: 'completed',
        startedAt: '2024-01-01T00:00:00Z',
        completedAt: '2024-01-01T01:00:00Z',
        score: 85,
        results: {
          apostle: 20,
          prophet: 15,
          evangelist: 25,
          shepherd: 15,
          teacher: 10,
        },
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T01:00:00Z',
      },
      {
        id: 'user-assessment-2',
        userId: testUser2,
        assessmentId: 'assessment-1',
        status: 'in_progress',
        startedAt: '2024-01-02T00:00:00Z',
        completedAt: null,
        score: null,
        results: null,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ],

    communities: [
      {
        id: 'community-1',
        name: 'Public Community',
        slug: 'public-community',
        communityType: 'discussion',
        visibility: 'public',
        createdBy: testUser1,
        description: 'A public community for testing',
        isActive: true,
        currentMemberCount: 10,
        organizationId: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'community-2',
        name: 'Private Community',
        slug: 'private-community',
        communityType: 'discussion',
        visibility: 'private',
        createdBy: testUser2,
        description: 'A private community for testing',
        isActive: true,
        currentMemberCount: 5,
        organizationId: testOrgId,
        createdAt: '2024-01-02T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
      },
    ],

    subscription_plans: [
      {
        id: 'plan-1',
        name: 'Basic Plan',
        slug: 'basic-plan',
        planType: 'individual',
        contentAccessLevel: 'free',
        features: {},
        isActive: true,
        amount: 0,
        billingCycle: 'monthly',
        sortOrder: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'plan-2',
        name: 'Premium Plan',
        slug: 'premium-plan',
        planType: 'individual',
        contentAccessLevel: 'premium',
        features: {},
        isActive: true,
        amount: 29.99,
        billingCycle: 'monthly',
        sortOrder: 2,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'plan-3',
        name: 'Inactive Plan',
        slug: 'inactive-plan',
        planType: 'individual',
        contentAccessLevel: 'free',
        features: {},
        isActive: false,
        amount: 0,
        billingCycle: 'monthly',
        sortOrder: 3,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],

    user_subscriptions: [
      {
        id: 'subscription-1',
        userId: testUser1,
        planId: 'plan-1',
        status: 'active',
        amount: 29.0,
        billingCycle: 'monthly',
        currentPeriodStart: '2024-01-01T00:00:00Z',
        currentPeriodEnd: '2024-02-01T00:00:00Z',
        stripeSubscriptionId: 'sub_test_1',
        stripeCustomerId: 'cus_test_1',
        leaderProfileId: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'subscription-2',
        userId: testUser2,
        planId: 'plan-2',
        status: 'active',
        amount: 99.0,
        billingCycle: 'monthly',
        currentPeriodStart: '2024-01-01T00:00:00Z',
        currentPeriodEnd: '2024-02-01T00:00:00Z',
        stripeSubscriptionId: 'sub_test_2',
        stripeCustomerId: 'cus_test_2',
        leaderProfileId: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],

    content_categories: [
      {
        id: 'category-1',
        name: 'Leadership',
        slug: 'leadership',
        isActive: true,
        description: 'Leadership development content',
        sortOrder: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'category-2',
        name: 'Theology',
        slug: 'theology',
        isActive: true,
        description: 'Theological content',
        sortOrder: 2,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'category-3',
        name: 'Inactive Category',
        slug: 'inactive-category',
        isActive: false,
        description: 'Inactive category for testing',
        sortOrder: 3,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],

    assessment_questions: [
      {
        id: 'question-1',
        questionText: 'How do you approach leadership?',
        assessmentId: 'assessment-1',
        questionType: 'multiple_choice',
        options: ['Option 1', 'Option 2', 'Option 3'],
        required: true,
        order: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
      {
        id: 'question-2',
        questionText: 'What is your ministry focus?',
        assessmentId: 'assessment-1',
        questionType: 'text',
        required: true,
        order: 2,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ],

    assessment_responses: [
      {
        id: 'response-1',
        userAssessmentId: 'user-assessment-1',
        questionId: 'question-1',
        responseValue: 4,
        createdAt: '2024-01-01T00:30:00Z',
        updatedAt: '2024-01-01T00:30:00Z',
      },
      {
        id: 'response-2',
        userAssessmentId: 'user-assessment-1',
        questionId: 'question-2',
        responseValue: 'Church planting and leadership development',
        createdAt: '2024-01-01T00:31:00Z',
        updatedAt: '2024-01-01T00:31:00Z',
      },
      {
        id: 'response-3',
        userAssessmentId: 'user-assessment-2',
        questionId: 'question-1',
        responseValue: 3,
        createdAt: '2024-01-02T00:30:00Z',
        updatedAt: '2024-01-02T00:30:00Z',
      },
    ],
  };
}

/**
 * Common RLS test configurations
 */
export const rlsTestConfigs = {
  // Anonymous user (no authentication)
  anonymous: () =>
    createMockSupabaseClientWithRLS({ user: null }, createRLSTestData()),

  // Authenticated user with basic access
  authenticated: (user: TestUser) =>
    createMockSupabaseClientWithRLS({ user }, createRLSTestData()),

  // Organization owner
  organizationOwner: (user: TestUser, organizationId: string) =>
    createMockSupabaseClientWithRLS(
      {
        user,
        organizationId,
        userRole: 'owner',
        isOrganizationMember: true,
        isOrganizationAdmin: true,
        isOrganizationOwner: true,
      },
      createRLSTestData()
    ),

  // Organization admin
  organizationAdmin: (user: TestUser, organizationId: string) =>
    createMockSupabaseClientWithRLS(
      {
        user,
        organizationId,
        userRole: 'admin',
        isOrganizationMember: true,
        isOrganizationAdmin: true,
      },
      createRLSTestData()
    ),

  // Organization member
  organizationMember: (user: TestUser, organizationId: string) =>
    createMockSupabaseClientWithRLS(
      {
        user,
        organizationId,
        userRole: 'member',
        isOrganizationMember: true,
      },
      createRLSTestData()
    ),

  // User with private profile
  privateProfile: (user: TestUser) =>
    createMockSupabaseClientWithRLS(
      {
        user,
        privacySettings: {
          publicProfile: false,
          showAssessmentResults: false,
          allowNetworking: false,
          shareAnalytics: false,
        },
      },
      createRLSTestData()
    ),

  // User with premium subscription
  premiumUser: (user: TestUser) =>
    createMockSupabaseClientWithRLS(
      {
        user,
        hasActiveSubscription: true,
        hasPremiumSubscription: true,
      },
      createRLSTestData()
    ),
};
