import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import React from 'react';
import { afterEach, expect, vi } from 'vitest';

// Make React available globally for tests
global.React = React;

// Mock environment variables for testing
process.env['NEXT_PUBLIC_SUPABASE_URL'] = 'https://test.supabase.co';
process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = 'test-anon-key';
process.env['SUPABASE_SERVICE_ROLE_KEY'] = 'test-service-role-key';
process.env['POSTGRES_URL'] = 'postgresql://test:test@localhost:5432/test';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
    };
  },
  useSearchParams() {
    return new URLSearchParams();
  },
  usePathname() {
    return '/';
  },
}));

// Mock Supabase client
vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      signOut: vi.fn().mockResolvedValue({
        error: null,
      }),
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        },
        error: null,
      }),
      getSession: vi.fn().mockResolvedValue({
        data: {
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      }),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  })),
}));

// Mock Supabase SSR
vi.mock('@supabase/ssr', () => ({
  createBrowserClient: vi.fn(() => ({
    auth: {
      signInWithPassword: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      signUp: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      signOut: vi.fn().mockResolvedValue({
        error: null,
      }),
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        },
        error: null,
      }),
      getSession: vi.fn().mockResolvedValue({
        data: {
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      onAuthStateChange: vi.fn().mockReturnValue({
        data: {
          subscription: {
            unsubscribe: vi.fn(),
          },
        },
      }),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  })),
  createServerClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            created_at: '2024-01-01T00:00:00Z',
            updated_at: '2024-01-01T00:00:00Z',
          },
        },
        error: null,
      }),
      getSession: vi.fn().mockResolvedValue({
        data: {
          session: {
            access_token: 'test-access-token',
            refresh_token: 'test-refresh-token',
            expires_at: 9999999999,
            token_type: 'bearer',
          },
        },
        error: null,
      }),
      signOut: vi.fn().mockResolvedValue({
        error: null,
      }),
    },
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      update: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn(),
    })),
  })),
}));

// Mock database connection to prevent hanging
vi.mock('@/lib/db/drizzle', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
    offset: vi.fn().mockReturnThis(),
    orderBy: vi.fn().mockReturnThis(),
    leftJoin: vi.fn().mockReturnThis(),
    rightJoin: vi.fn().mockReturnThis(),
    innerJoin: vi.fn().mockReturnThis(),
    groupBy: vi.fn().mockReturnThis(),
    having: vi.fn().mockReturnThis(),
    and: vi.fn().mockReturnThis(),
    or: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockResolvedValue([]),
    set: vi.fn().mockReturnThis(),
    onConflictDoNothing: vi.fn().mockReturnThis(),
    onConflictDoUpdate: vi.fn().mockReturnThis(),
    then: vi.fn().mockResolvedValue([]),
  },
  client: {
    end: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock postgres connection
vi.mock('postgres', () => ({
  default: vi.fn(() => ({
    end: vi.fn().mockResolvedValue(undefined),
  })),
}));

// Cleanup after each test case
afterEach(() => {
  cleanup();
});

// Global test timeout
vi.setConfig({
  testTimeout: 10000,
});

// Extend expect with custom matchers for DOM testing
expect.extend({
  toBeInTheDocument: (received: any) => {
    const pass = received?.ownerDocument?.contains(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be in the document`
          : `Expected element to be in the document`,
    };
  },
  toHaveClass: (received: any, className: string) => {
    const pass = received?.classList?.contains(className);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have class "${className}"`
          : `Expected element to have class "${className}"`,
    };
  },
  toHaveTextContent: (received: any, text: string) => {
    const pass = received?.textContent?.includes(text);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have text content "${text}"`
          : `Expected element to have text content "${text}"`,
    };
  },
});
