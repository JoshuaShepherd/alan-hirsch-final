import {
  SubscriptionPlanCreateSchema,
  SubscriptionPlanResponseSchema,
  SubscriptionPlanUpdateSchema,
} from '@/lib/contracts';
import { describe, expect, it } from 'vitest';
import {
  invalidSubscriptionPlanCreate,
  invalidSubscriptionPlanResponse,
  validSubscriptionPlanCreate,
  validSubscriptionPlanResponse,
  validSubscriptionPlanUpdate,
} from '../subscription-plan.fixture';

describe('SubscriptionPlan Fixtures', () => {
  describe('Valid Create Schema', () => {
    it('should validate valid subscription plan create fixture', () => {
      const result = SubscriptionPlanCreateSchema.safeParse(
        validSubscriptionPlanCreate
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Update Schema', () => {
    it('should validate valid subscription plan update fixture', () => {
      const result = SubscriptionPlanUpdateSchema.safeParse(
        validSubscriptionPlanUpdate
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Valid Response Schema', () => {
    it('should validate valid subscription plan response fixture', () => {
      const result = SubscriptionPlanResponseSchema.safeParse(
        validSubscriptionPlanResponse
      );
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error('Validation errors:', result.error.issues);
      }
    });
  });

  describe('Invalid Create Schema', () => {
    it('should reject invalid subscription plan create fixture', () => {
      const result = SubscriptionPlanCreateSchema.safeParse(
        invalidSubscriptionPlanCreate
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });

  describe('Invalid Response Schema', () => {
    it('should reject invalid subscription plan response fixture', () => {
      const result = SubscriptionPlanResponseSchema.safeParse(
        invalidSubscriptionPlanResponse
      );
      expect(result.success).toBe(false);
      if (result.success) {
        console.error('Expected validation to fail but it passed');
      }
    });
  });
});
