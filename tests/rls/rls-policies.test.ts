/**
 * Alan Hirsch Digital Platform - RLS Policy Testing Suite
 *
 * This test suite verifies that Row-Level Security policies are working correctly
 * across all platform tables. Tests cover:
 * - User ownership access patterns
 * - Organization-based access control
 * - Public content visibility
 * - Privacy settings enforcement
 * - Cross-user access prevention
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createMockSupabaseClientWithRLS,
  createRLSTestData,
  rlsTestConfigs,
} from './test-helpers';

// Mock the Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(),
}));

// Test user IDs
const TEST_USER_1 = '550e8400-e29b-41d4-a716-446655440000'; // Alan Hirsch
const TEST_USER_2 = '660e8400-e29b-41d4-a716-446655440001'; // Test user 2
const TEST_USER_3 = '770e8400-e29b-41d4-a716-446655440002'; // Test user 3

// Test organization ID
const TEST_ORG_ID = '880e8400-e29b-41d4-a716-446655440003';

// Test data
const testData = createRLSTestData();

// Test users
const testUser1 = {
  id: TEST_USER_1,
  email: 'alan@example.com',
  access_token: 'test-token-1',
};

const testUser2 = {
  id: TEST_USER_2,
  email: 'user2@example.com',
  access_token: 'test-token-2',
};

const testUser3 = {
  id: TEST_USER_3,
  email: 'user3@example.com',
  access_token: 'test-token-3',
};

describe('RLS Policies - User Profiles', () => {
  let supabaseClient: any;

  beforeEach(() => {
    // Create a fresh mock client for each test
    supabaseClient = createMockSupabaseClientWithRLS(
      { user: testUser1 },
      testData
    );
  });

  it('should allow users to view their own profile', async () => {
    const { data, error } = await supabaseClient
      .from('user_profiles')
      .select('*')
      .eq('id', TEST_USER_1)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.id).toBe(TEST_USER_1);
  });

  it('should allow users to update their own profile', async () => {
    const { error } = await supabaseClient
      .from('user_profiles')
      .update({ display_name: 'Updated Name' })
      .eq('id', TEST_USER_1);

    expect(error).toBeNull();
  });

  it('should allow viewing public profiles', async () => {
    // Use anonymous client to test public profile access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('user_profiles')
      .select('display_name, bio, ministry_role')
      .eq('id', TEST_USER_1)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.displayName).toBe('Alan Hirsch');
  });

  it('should prevent viewing private profiles of other users', async () => {
    // Use anonymous client to test private profile access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('user_profiles')
      .select('*')
      .eq('id', TEST_USER_2);

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });

  it('should prevent updating other users profiles', async () => {
    const { error } = await supabaseClient
      .from('user_profiles')
      .update({ display_name: 'Hacked Name' })
      .eq('id', TEST_USER_2);

    // Should not be able to update other user's profile
    expect(error).toBeDefined();
  });
});

describe('RLS Policies - Organizations', () => {
  let supabaseClient: any;

  beforeEach(() => {
    // Create client for organization owner
    supabaseClient = rlsTestConfigs.organizationOwner(testUser1, TEST_ORG_ID);
  });

  it('should allow organization members to view their organization', async () => {
    const { data, error } = await supabaseClient
      .from('organizations')
      .select('*')
      .eq('id', TEST_ORG_ID)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.id).toBe(TEST_ORG_ID);
  });

  it('should allow organization owners to update organization', async () => {
    const { error } = await supabaseClient
      .from('organizations')
      .update({ description: 'Updated description' })
      .eq('id', TEST_ORG_ID);

    expect(error).toBeNull();
  });

  it('should prevent non-members from viewing organization data', async () => {
    // Use anonymous client to test non-member access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('organizations')
      .select('*')
      .eq('id', TEST_ORG_ID);

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });
});

describe('RLS Policies - Content Items', () => {
  let supabaseClient: any;
  const testContentId = 'content-1'; // From test data

  beforeEach(() => {
    // Create client for content author
    supabaseClient = createMockSupabaseClientWithRLS(
      { user: testUser1 },
      testData
    );
  });

  it('should allow viewing published public content', async () => {
    // Use anonymous client to test public content access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('content_items')
      .select('title, excerpt')
      .eq('id', testContentId)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.title).toBe('Public Article');
  });

  it('should allow authors to manage their own content', async () => {
    const { error } = await supabaseClient
      .from('content_items')
      .update({ title: 'Updated Title' })
      .eq('id', testContentId);

    expect(error).toBeNull();
  });

  it('should prevent viewing draft content by non-authors', async () => {
    // Use anonymous client to test draft content access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('content_items')
      .select('*')
      .eq('id', 'content-2'); // Draft content by user 2

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });
});

describe('RLS Policies - Assessments', () => {
  let supabaseClient: any;
  const testAssessmentId = 'assessment-1';
  const testUserAssessmentId = 'user-assessment-1';

  beforeEach(() => {
    // Create client for authenticated user
    supabaseClient = createMockSupabaseClientWithRLS(
      { user: testUser1 },
      testData
    );
  });

  it('should allow authenticated users to view assessments', async () => {
    const { data, error } = await supabaseClient
      .from('assessments')
      .select('*')
      .eq('id', testAssessmentId)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.name).toBe('APEST Assessment');
  });

  it('should allow users to view their own assessments', async () => {
    const { data, error } = await supabaseClient
      .from('user_assessments')
      .select('*')
      .eq('id', testUserAssessmentId)
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.userId).toBe(TEST_USER_1);
  });

  it('should allow users to create their own assessments', async () => {
    const { error } = await supabaseClient.from('user_assessments').insert({
      user_id: TEST_USER_1,
      assessment_id: testAssessmentId,
      started_at: new Date().toISOString(),
    });

    expect(error).toBeNull();
  });

  it('should prevent users from viewing other users assessments', async () => {
    const { data, error } = await supabaseClient
      .from('user_assessments')
      .select('*')
      .eq('id', 'user-assessment-2'); // Assessment by user 2

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });
});

describe('RLS Policies - Communities', () => {
  let supabaseClient: any;

  beforeEach(() => {
    supabaseClient = createMockSupabaseClientWithRLS(
      { user: testUser1 },
      testData
    );
  });

  it('should allow viewing public communities', async () => {
    // Use anonymous client to test public community access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('communities')
      .select('*')
      .eq('id', 'community-1')
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.visibility).toBe('public');
  });

  it('should prevent viewing private communities by non-members', async () => {
    // Use anonymous client to test private community access
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('communities')
      .select('*')
      .eq('id', 'community-2'); // Private community

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });
});

describe('RLS Policies - Subscription Plans', () => {
  it('should allow viewing active subscription plans', async () => {
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('subscription_plans')
      .select('*')
      .eq('isActive', true);

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.length).toBeGreaterThan(0);
  });

  it('should prevent viewing inactive subscription plans', async () => {
    const anonymousClient = createMockSupabaseClientWithRLS(
      { user: null },
      testData
    );

    const { data, error } = await anonymousClient
      .from('subscription_plans')
      .select('*')
      .eq('id', 'plan-3'); // Inactive plan

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });
});

describe('RLS Policies - User Subscriptions', () => {
  let supabaseClient: any;

  beforeEach(() => {
    supabaseClient = createMockSupabaseClientWithRLS(
      { user: testUser1 },
      testData
    );
  });

  it('should allow users to view their own subscriptions', async () => {
    const { data, error } = await supabaseClient
      .from('user_subscriptions')
      .select('*')
      .eq('id', 'subscription-1')
      .single();

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.userId).toBe(TEST_USER_1);
  });

  it('should prevent users from viewing other users subscriptions', async () => {
    const { data, error } = await supabaseClient
      .from('user_subscriptions')
      .select('*')
      .eq('id', 'subscription-2'); // Subscription by user 2

    // Should return empty array due to RLS
    expect(data).toEqual([]);
  });
});
