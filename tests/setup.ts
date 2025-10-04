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
    const pass =
      received &&
      received.ownerDocument &&
      received.ownerDocument.contains(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to be in the document`
          : `Expected element to be in the document`,
    };
  },
  toHaveClass: (received: any, className: string) => {
    const pass =
      received && received.classList && received.classList.contains(className);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have class "${className}"`
          : `Expected element to have class "${className}"`,
    };
  },
  toHaveTextContent: (received: any, text: string) => {
    const pass =
      received && received.textContent && received.textContent.includes(text);
    return {
      pass,
      message: () =>
        pass
          ? `Expected element not to have text content "${text}"`
          : `Expected element to have text content "${text}"`,
    };
  },
});
