import {
  OrganizationCreateSchema,
  OrganizationResponseSchema,
  OrganizationUpdateSchema,
} from '@/lib/contracts';
import { describe, expect, it } from 'vitest';
import {
  invalidOrganizationCreate,
  invalidOrganizationResponse,
  validOrganizationCreate,
  validOrganizationResponse,
  validOrganizationUpdate,
} from '../organization.fixture';

describe('Organization Fixtures', () => {
  describe('Valid Create Schema', () => {
    it('should validate valid organization create fixture', () => {
      const result = OrganizationCreateSchema.safeParse(
        validOrganizationCreate
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Update Schema', () => {
    it('should validate valid organization update fixture', () => {
      const result = OrganizationUpdateSchema.safeParse(
        validOrganizationUpdate
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Response Schema', () => {
    it('should validate valid organization response fixture', () => {
      const result = OrganizationResponseSchema.safeParse(
        validOrganizationResponse
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Invalid Create Schema', () => {
    it('should reject invalid organization create fixture', () => {
      const result = OrganizationCreateSchema.safeParse(
        invalidOrganizationCreate
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });

  describe('Invalid Response Schema', () => {
    it('should reject invalid organization response fixture', () => {
      const result = OrganizationResponseSchema.safeParse(
        invalidOrganizationResponse
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });
});
