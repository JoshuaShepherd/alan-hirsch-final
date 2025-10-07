// Layer Testing Setup - Shared utilities for testing all layers
import { expect } from 'vitest';
import type { ZodSchema } from 'zod';

// Test data factories for consistent test data across layers
export const createTestUserProfile = (overrides: any = {}) => ({
  id: 'user-123',
  email: 'test@example.com',
  passwordHash: null,
  firstName: 'John',
  lastName: 'Doe',
  displayName: null,
  bio: null,
  avatarUrl: null,
  ministryRole: 'senior_pastor' as const,
  denomination: null,
  organizationName: null,
  yearsInMinistry: null,
  countryCode: null,
  timezone: null,
  languagePrimary: 'en',
  culturalContext: null,
  subscriptionTier: 'free' as const,
  accountStatus: null,
  lastActiveAt: null,
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z'),
  ...overrides,
});

export const createTestOrganization = (overrides: any = {}) => ({
  id: 'org-123',
  name: 'Test Organization',
  slug: 'test-org',
  description: null,
  website: null,
  logoUrl: null,
  organizationType: 'church' as const,
  countryCode: null,
  timezone: null,
  languagePrimary: 'en',
  culturalContext: null,
  isActive: true,
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z'),
  ...overrides,
});

export const createTestAssessment = (overrides: any = {}) => ({
  id: 'assessment-123',
  name: 'Test Assessment',
  slug: 'test-assessment',
  description: null,
  assessmentType: 'spiritual_gifts' as const,
  isActive: true,
  createdAt: new Date('2023-01-01T00:00:00Z'),
  updatedAt: new Date('2023-01-01T00:00:00Z'),
  ...overrides,
});

// Schema validation helper
export const validateSchema = <T>(
  schema: ZodSchema<T>,
  validData: any,
  invalidData?: any
) => {
  // Test valid data
  const validResult = schema.safeParse(validData);
  expect(validResult.success).toBe(true);
  if (validResult.success) {
    expect(validResult.data).toEqual(validData);
  }

  // Test invalid data if provided
  if (invalidData) {
    const invalidResult = schema.safeParse(invalidData);
    expect(invalidResult.success).toBe(false);
  }
};

// Type compatibility helper
export const testTypeCompatibility = <T, U>(
  source: T,
  target: U,
  mapper: (data: T) => U
) => {
  const mapped = mapper(source);
  expect(mapped).toBeDefined();
  expect(typeof mapped).toBe('object');
  return mapped;
};

// Performance testing helper
export const testPerformance = (fn: () => void, maxMs: number = 100) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  expect(end - start).toBeLessThan(maxMs);
};

// Mock data generators
export const generateMockData = {
  uuid: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9),
  email: () => `test${Math.random().toString(36).substr(2, 5)}@example.com`,
  name: () => `Test ${Math.random().toString(36).substr(2, 5)}`,
  date: () => new Date('2023-01-01T00:00:00Z'),
  slug: () => `test-${Math.random().toString(36).substr(2, 5)}`,
};
