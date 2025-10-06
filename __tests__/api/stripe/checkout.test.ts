/**
 * Stripe Checkout API Tests
 *
 * Tests for the Stripe checkout endpoint that handles
 * subscription and payment processing.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  createMockDatabase,
  testDataFactories,
} from '../../utils/test-imports';

// Mock the database module
vi.mock('@platform/database/drizzle', () => ({
  db: createMockDatabase(),
}));

// Mock Stripe
vi.mock('stripe', () => ({
  default: vi.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: vi.fn(),
        retrieve: vi.fn(),
      },
    },
    customers: {
      create: vi.fn(),
      retrieve: vi.fn(),
    },
    subscriptions: {
      create: vi.fn(),
      retrieve: vi.fn(),
    },
  })),
}));

// Import the mocked database
import { db } from '@platform/database/drizzle';

// Mock the route handler
import { NextRequest } from 'next/server';
import { POST as createCheckoutSession } from '../../../apps/alan-hirsch-platform/app/api/stripe/checkout/route';

describe('/api/stripe/checkout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/stripe/checkout', () => {
    it('should create checkout session for subscription', async () => {
      const mockCheckoutSession = {
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/c/pay/cs_test_123',
        customer: 'cus_test_123',
        subscription: 'sub_test_123',
        status: 'open',
        payment_status: 'unpaid',
        amount_total: 2900, // $29.00
        currency: 'usd',
        metadata: {
          planId: 'premium-plan',
          userId: 'user-123',
        },
      };

      // Mock Stripe checkout session creation
      const mockStripe = {
        checkout: {
          sessions: {
            create: vi.fn().mockResolvedValue(mockCheckoutSession),
          },
        },
      };

      // Mock the database chain for user and plan lookup
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.userProfile({
              id: 'user-123',
              email: 'test@example.com',
            }),
          ]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.subscriptionPlan({
              id: 'premium-plan',
              name: 'Premium',
              price: 2900,
              interval: 'month',
            }),
          ]),
        }));

      const requestBody = {
        planId: 'premium-plan',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/checkout',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await createCheckoutSession(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('checkoutUrl');
      expect(data.data.checkoutUrl).toBe(mockCheckoutSession.url);
      expect(data.data).toHaveProperty('sessionId');
      expect(data.data.sessionId).toBe(mockCheckoutSession.id);
    });

    it('should create checkout session with trial period', async () => {
      const mockCheckoutSession = {
        id: 'cs_test_456',
        url: 'https://checkout.stripe.com/c/pay/cs_test_456',
        subscription: 'sub_test_456',
        status: 'open',
        payment_status: 'unpaid',
        subscription_data: {
          trial_period_days: 14,
        },
      };

      // Mock Stripe checkout session creation
      const mockStripe = {
        checkout: {
          sessions: {
            create: vi.fn().mockResolvedValue(mockCheckoutSession),
          },
        },
      };

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.userProfile({
              id: 'user-123',
              email: 'test@example.com',
            }),
          ]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.subscriptionPlan({
              id: 'premium-plan',
              name: 'Premium',
              price: 2900,
              interval: 'month',
            }),
          ]),
        }));

      const requestBody = {
        planId: 'premium-plan',
        trialDays: 14,
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/checkout',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await createCheckoutSession(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('checkoutUrl');
    });

    it('should handle annual subscription checkout', async () => {
      const mockCheckoutSession = {
        id: 'cs_test_789',
        url: 'https://checkout.stripe.com/c/pay/cs_test_789',
        subscription: 'sub_test_789',
        status: 'open',
        payment_status: 'unpaid',
        amount_total: 29000, // $290.00 (annual)
        currency: 'usd',
      };

      // Mock Stripe checkout session creation
      const mockStripe = {
        checkout: {
          sessions: {
            create: vi.fn().mockResolvedValue(mockCheckoutSession),
          },
        },
      };

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.userProfile({
              id: 'user-123',
              email: 'test@example.com',
            }),
          ]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.subscriptionPlan({
              id: 'premium-annual',
              name: 'Premium Annual',
              price: 29000,
              interval: 'year',
            }),
          ]),
        }));

      const requestBody = {
        planId: 'premium-annual',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/checkout',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await createCheckoutSession(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toHaveProperty('checkoutUrl');
    });

    it('should return 400 for invalid plan ID', async () => {
      // Mock empty plan result
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.userProfile({
              id: 'user-123',
              email: 'test@example.com',
            }),
          ]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([]),
        }));

      const requestBody = {
        planId: 'invalid-plan',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/checkout',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await createCheckoutSession(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Invalid plan');
    });

    it('should handle Stripe API errors', async () => {
      // Mock Stripe error
      const mockStripe = {
        checkout: {
          sessions: {
            create: vi.fn().mockRejectedValue(new Error('Stripe API error')),
          },
        },
      };

      // Mock the database chain
      vi.mocked(db)
        .select.mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.userProfile({
              id: 'user-123',
              email: 'test@example.com',
            }),
          ]),
        }))
        .mockImplementationOnce(() => ({
          from: vi.fn().mockReturnThis(),
          where: vi.fn().mockReturnThis(),
          limit: vi.fn().mockResolvedValue([
            testDataFactories.subscriptionPlan({
              id: 'premium-plan',
              name: 'Premium',
              price: 2900,
              interval: 'month',
            }),
          ]),
        }));

      const requestBody = {
        planId: 'premium-plan',
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/checkout',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await createCheckoutSession(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Stripe API error');
    });

    it('should validate required fields', async () => {
      const requestBody = {
        // Missing planId
        successUrl: 'https://example.com/success',
        cancelUrl: 'https://example.com/cancel',
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/checkout',
        {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const response = await createCheckoutSession(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('planId is required');
    });
  });
});
