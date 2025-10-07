import {
  AssessmentCreateSchema,
  AssessmentResponseSchema,
  AssessmentUpdateSchema,
} from '@/lib/contracts';
import { describe, expect, it } from 'vitest';
import {
  invalidAssessmentCreate,
  invalidAssessmentResponse,
  validAssessmentCreate,
  validAssessmentResponse,
  validAssessmentUpdate,
} from '../assessment.fixture';

describe('Assessment Fixtures', () => {
  describe('Valid Create Schema', () => {
    it('should validate valid assessment create fixture', () => {
      const result = AssessmentCreateSchema.safeParse(validAssessmentCreate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Update Schema', () => {
    it('should validate valid assessment update fixture', () => {
      const result = AssessmentUpdateSchema.safeParse(validAssessmentUpdate);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Response Schema', () => {
    it('should validate valid assessment response fixture', () => {
      const result = AssessmentResponseSchema.safeParse(
        validAssessmentResponse
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Invalid Create Schema', () => {
    it('should reject invalid assessment create fixture', () => {
      const result = AssessmentCreateSchema.safeParse(invalidAssessmentCreate);
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });

  describe('Invalid Response Schema', () => {
    it('should reject invalid assessment response fixture', () => {
      const result = AssessmentResponseSchema.safeParse(
        invalidAssessmentResponse
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });
});
