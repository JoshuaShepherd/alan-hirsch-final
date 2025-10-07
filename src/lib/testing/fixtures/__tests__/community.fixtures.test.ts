import {
  CommunityCreateSchema,
  CommunityResponseSchema,
  CommunityUpdateSchema,
} from '@/lib/contracts';
import { describe, expect, it } from 'vitest';
import {
  invalidCommunityCreate,
  invalidCommunityResponse,
  validCommunityCreate,
  validCommunityResponse,
  validCommunityUpdate,
} from '../community.fixture';

describe('Community Fixtures', () => {
  describe('Valid Create Schema', () => {
    it('should validate valid community create fixture', () => {
      const result = CommunityCreateSchema.safeParse(validCommunityCreate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Update Schema', () => {
    it('should validate valid community update fixture', () => {
      const result = CommunityUpdateSchema.safeParse(validCommunityUpdate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Response Schema', () => {
    it('should validate valid community response fixture', () => {
      const result = CommunityResponseSchema.safeParse(validCommunityResponse);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Invalid Create Schema', () => {
    it('should reject invalid community create fixture', () => {
      const result = CommunityCreateSchema.safeParse(invalidCommunityCreate);
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });

  describe('Invalid Response Schema', () => {
    it('should reject invalid community response fixture', () => {
      const result = CommunityResponseSchema.safeParse(
        invalidCommunityResponse
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });
});
