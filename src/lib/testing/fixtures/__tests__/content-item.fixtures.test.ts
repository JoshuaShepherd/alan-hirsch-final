import {
  ContentItemCreateSchema,
  ContentItemResponseSchema,
  ContentItemUpdateSchema,
} from '@/lib/contracts';
import { describe, expect, it } from 'vitest';
import {
  invalidContentItemCreate,
  invalidContentItemResponse,
  validContentItemCreate,
  validContentItemResponse,
  validContentItemUpdate,
} from '../content-item.fixture';

describe('ContentItem Fixtures', () => {
  describe('Valid Create Schema', () => {
    it('should validate valid content item create fixture', () => {
      const result = ContentItemCreateSchema.safeParse(validContentItemCreate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Update Schema', () => {
    it('should validate valid content item update fixture', () => {
      const result = ContentItemUpdateSchema.safeParse(validContentItemUpdate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Response Schema', () => {
    it('should validate valid content item response fixture', () => {
      const result = ContentItemResponseSchema.safeParse(
        validContentItemResponse
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Invalid Create Schema', () => {
    it('should reject invalid content item create fixture', () => {
      const result = ContentItemCreateSchema.safeParse(
        invalidContentItemCreate
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });

  describe('Invalid Response Schema', () => {
    it('should reject invalid content item response fixture', () => {
      const result = ContentItemResponseSchema.safeParse(
        invalidContentItemResponse
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });
});
