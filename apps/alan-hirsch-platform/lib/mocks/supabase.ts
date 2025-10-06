import type { TestUser } from '@platform/shared/test-utils';
import { vi } from 'vitest';

/**
 * Centralized Supabase Mock Utilities
 *
 * This module provides consistent Supabase mocking patterns for all tests.
 * It includes mocks for authentication, database operations, and other
 * Supabase services.
 */

export interface MockSupabaseConfig {
  user?: TestUser | null;
  shouldThrowError?: boolean;
  errorMessage?: string;
  delay?: number;
}

/**
 * Creates a mock Supabase client with configurable behavior
 */
export function createMockSupabaseClient(config: MockSupabaseConfig = {}) {
  const {
    user = null,
    shouldThrowError = false,
    errorMessage = 'Supabase error',
    delay = 0,
  } = config;

  const mockClient = {
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

    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    upsert: vi.fn().mockReturnThis(),

    // Query builder methods
    eq: vi.fn().mockReturnThis(),
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
    single: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockReturnThis(),
    csv: vi.fn().mockReturnThis(),
    geojson: vi.fn().mockReturnThis(),
    explain: vi.fn().mockReturnThis(),
    rollback: vi.fn().mockReturnThis(),
    returns: vi.fn().mockReturnThis(),

    // Real-time functionality
    channel: vi.fn().mockReturnValue({
      on: vi.fn().mockReturnThis(),
      subscribe: vi.fn().mockReturnThis(),
      unsubscribe: vi.fn().mockReturnThis(),
    }),
  };

  // Configure error behavior
  if (shouldThrowError) {
    const errorResponse = { data: null, error: { message: errorMessage } };

    mockClient.auth.getUser.mockResolvedValue(errorResponse);
    mockClient.auth.signInWithPassword.mockResolvedValue(errorResponse);
    mockClient.auth.signUp.mockResolvedValue(errorResponse);
    mockClient.from.mockResolvedValue(errorResponse);
  }

  return mockClient;
}

/**
 * Creates a mock Supabase client with predefined responses
 */
export function createMockSupabaseClientWithResponses<T = any>(
  responses: Record<string, { data: T[]; error: any }>,
  config: MockSupabaseConfig = {}
) {
  const mockClient = createMockSupabaseClient(config);
  let callCount = 0;

  // Mock the final execution methods
  const mockExecute = vi.fn().mockImplementation(() => {
    const responseKeys = Object.keys(responses);
    if (responseKeys.length === 0) {
      return Promise.resolve({ data: [], error: null });
    }
    const responseKey = responseKeys[callCount % responseKeys.length];
    callCount++;
    return Promise.resolve(
      responses[responseKey as keyof typeof responses] || {
        data: [],
        error: null,
      }
    );
  });

  // Configure all query methods to use the mock execute
  mockClient.single.mockImplementation(mockExecute);
  mockClient.maybeSingle.mockImplementation(mockExecute);
  mockClient.csv.mockImplementation(mockExecute);
  mockClient.geojson.mockImplementation(mockExecute);
  mockClient.explain.mockImplementation(mockExecute);

  return mockClient;
}

/**
 * Creates a mock Supabase client that simulates RLS (Row Level Security)
 */
export function createMockSupabaseClientWithRLS<T = any>(
  user: TestUser,
  data: T[],
  rlsPolicy: (user: TestUser, data: T) => boolean
) {
  const mockClient = createMockSupabaseClient({ user });

  const filteredData = data.filter(item => rlsPolicy(user, item));

  const mockExecute = vi.fn().mockResolvedValue({
    data: filteredData,
    error: null,
  });

  mockClient.single.mockImplementation(mockExecute);
  mockClient.maybeSingle.mockImplementation(mockExecute);

  return mockClient;
}

/**
 * Creates a mock Supabase client that simulates real-time subscriptions
 */
export function createMockSupabaseClientWithRealtime<T = any>(
  initialData: T[],
  config: MockSupabaseConfig = {}
) {
  const mockClient = createMockSupabaseClient(config);
  let currentData = [...initialData];
  let subscribers: Array<(payload: any) => void> = [];

  const mockChannel = {
    on: vi
      .fn()
      .mockImplementation((event: string, callback: (payload: any) => void) => {
        subscribers.push(callback);
        return mockChannel;
      }),
    subscribe: vi
      .fn()
      .mockImplementation((callback: (status: string) => void) => {
        callback('SUBSCRIBED');
        return mockChannel;
      }),
    unsubscribe: vi.fn().mockImplementation(() => {
      subscribers = [];
      return mockChannel;
    }),
  };

  (mockClient as any).channel = vi.fn().mockReturnValue(mockChannel);

  // Helper to simulate real-time updates
  const simulateRealtimeUpdate = (event: string, payload: any) => {
    subscribers.forEach(callback =>
      callback({ eventType: event, new: payload })
    );
  };

  return {
    ...mockClient,
    simulateRealtimeUpdate,
    getCurrentData: () => currentData,
    updateData: (newData: T[]) => {
      currentData = newData;
    },
  };
}

/**
 * Utility to reset all mocks in a Supabase client mock
 */
export function resetMockSupabaseClient(mockClient: any) {
  Object.keys(mockClient).forEach(key => {
    const method = mockClient[key as keyof typeof mockClient];
    if (vi.isMockFunction(method)) {
      method.mockClear();
    } else if (typeof method === 'object' && method !== null) {
      Object.keys(method).forEach(subKey => {
        const subMethod = method[subKey as keyof typeof method];
        if (vi.isMockFunction(subMethod)) {
          subMethod.mockClear();
        }
      });
    }
  });
}

/**
 * Common mock Supabase configurations for different test scenarios
 */
export const mockSupabaseConfigs = {
  // Authentication scenarios
  authenticated: (user: TestUser) => createMockSupabaseClient({ user }),
  unauthenticated: () => createMockSupabaseClient({ user: null }),

  // Error scenarios
  authError: (errorMessage: string = 'Authentication failed') =>
    createMockSupabaseClient({
      shouldThrowError: true,
      errorMessage,
    }),

  // Success scenarios
  withData: <T>(data: T[]) =>
    createMockSupabaseClientWithResponses({ default: { data, error: null } }),

  // RLS scenarios
  withRLS: <T>(
    user: TestUser,
    data: T[],
    policy: (user: TestUser, data: T) => boolean
  ) => createMockSupabaseClientWithRLS(user, data, policy),

  // Real-time scenarios
  withRealtime: <T>(data: T[], user?: TestUser) =>
    createMockSupabaseClientWithRealtime(data, { user }),
};
