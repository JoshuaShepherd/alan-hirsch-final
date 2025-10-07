import {
  UserProfileCreateSchema,
  UserProfileResponseSchema,
  UserProfileUpdateSchema,
} from '@/lib/contracts';
import { describe, expect, it } from 'vitest';
import {
  invalidUserProfileCreate,
  invalidUserProfileResponse,
  validUserProfileCreate,
  validUserProfileResponse,
  validUserProfileUpdate,
} from '../user-profile.fixture';

describe('UserProfile Fixtures', () => {
  describe('Valid Create Schema', () => {
    it('should validate valid user profile create fixture', () => {
      const result = UserProfileCreateSchema.safeParse(validUserProfileCreate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Update Schema', () => {
    it('should validate valid user profile update fixture', () => {
      const result = UserProfileUpdateSchema.safeParse(validUserProfileUpdate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Response Schema', () => {
    it('should validate valid user profile response fixture', () => {
      const result = UserProfileResponseSchema.safeParse(
        validUserProfileResponse
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Invalid Create Schema', () => {
    it('should reject invalid user profile create fixture', () => {
      const result = UserProfileCreateSchema.safeParse(
        invalidUserProfileCreate
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });

  describe('Invalid Response Schema', () => {
    it('should reject invalid user profile response fixture', () => {
      const result = UserProfileResponseSchema.safeParse(
        invalidUserProfileResponse
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });
});
