import '@testing-library/jest-dom';
import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
} from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock environment variables for testing
process.env['NEXT_PUBLIC_SUPABASE_URL'] = 'https://test.supabase.co';
process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] = 'test-anon-key';
process.env['SUPABASE_SERVICE_ROLE_KEY'] = 'test-service-role-key';
process.env['POSTGRES_URL'] = 'postgresql://test:test@localhost:5432/test';
process.env['NEXTAUTH_SECRET'] = 'test-secret';
process.env['NEXTAUTH_URL'] = 'http://localhost:3000';

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
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signOut: vi.fn(),
      getUser: vi.fn(),
      onAuthStateChange: vi.fn(),
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

// Mock Drizzle ORM
vi.mock('@/lib/db/drizzle', () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}));

// Global test setup
beforeAll(() => {
  // Setup any global test configuration
});

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Global test teardown
afterAll(() => {
  // Cleanup any global resources
});

// Global test timeout
vi.setConfig({
  testTimeout: 10000,
  hookTimeout: 10000,
});
