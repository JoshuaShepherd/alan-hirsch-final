/**
 * Test import utilities to handle import resolution issues
 * Re-exports from the correct locations to avoid import failures
 */

import { vi } from 'vitest';

// Re-export from the correct locations
export * from '../../apps/alan-hirsch-platform/lib/mocks';
export * from '../../apps/alan-hirsch-platform/lib/test-utils';

// Note: Not re-exporting from packages to avoid import issues during testing
// Individual tests should import what they need directly

// Mock database utilities
export const createMockDatabase = () => ({
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  orderBy: vi.fn().mockReturnThis(),
  values: vi.fn().mockReturnThis(),
  returning: vi.fn().mockResolvedValue([]),
});

// Mock Supabase client
export const createMockSupabaseClient = () => ({
  auth: {
    signInWithPassword: vi
      .fn()
      .mockResolvedValue({ data: { user: null }, error: null }),
    signUp: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
    signOut: vi.fn().mockResolvedValue({ error: null }),
    updateUser: vi
      .fn()
      .mockResolvedValue({ data: { user: null }, error: null }),
    getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
  },
  from: vi.fn().mockReturnThis(),
  select: vi.fn().mockReturnThis(),
  insert: vi.fn().mockReturnThis(),
  update: vi.fn().mockReturnThis(),
  delete: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  order: vi.fn().mockReturnThis(),
});
