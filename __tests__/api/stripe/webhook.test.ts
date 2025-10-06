/**
 * Stripe Webhook API Tests
 *
 * Tests for the Stripe webhook endpoint that handles
 * subscription events and payment notifications.
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
    webhooks: {
      constructEvent: vi.fn(),
    },
    subscriptions: {
      retrieve: vi.fn(),
    },
    customers: {
      retrieve: vi.fn(),
    },
  })),
}));

// Import the mocked database
import { db } from '@platform/database/drizzle';

// Mock the route handler
import { NextRequest } from 'next/server';
import { POST as handleWebhook } from '../../../apps/alan-hirsch-platform/app/api/stripe/webhook/route';

describe('/api/stripe/webhook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/stripe/webhook', () => {
    it('should handle checkout.session.completed event', async () => {
      const mockEvent = {
        id: 'evt_test_123',
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            customer: 'cus_test_123',
            subscription: 'sub_test_123',
            payment_status: 'paid',
            metadata: {
              planId: 'premium-plan',
              userId: 'user-123',
            },
          },
        },
      };

      const mockSubscription = {
        id: 'sub_test_123',
        customer: 'cus_test_123',
        status: 'active',
        current_period_start: 1640995200,
        current_period_end: 1643673600,
        items: {
          data: [
            {
              price: {
                id: 'price_premium',
                unit_amount: 2900,
                currency: 'usd',
                recurring: {
                  interval: 'month',
                },
              },
            },
          ],
        },
      };

      const mockCustomer = {
        id: 'cus_test_123',
        email: 'test@example.com',
        metadata: {
          userId: 'user-123',
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
        subscriptions: {
          retrieve: vi.fn().mockResolvedValue(mockSubscription),
        },
        customers: {
          retrieve: vi.fn().mockResolvedValue(mockCustomer),
        },
      };

      // Mock database operations
      vi.mocked(db).insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockResolvedValue([
            testDataFactories.userSubscription({
              id: 'sub-123',
              userId: 'user-123',
              planId: 'premium-plan',
              status: 'active',
              stripeSubscriptionId: 'sub_test_123',
              stripeCustomerId: 'cus_test_123',
            }),
          ]),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Webhook processed successfully');
    });

    it('should handle customer.subscription.updated event', async () => {
      const mockEvent = {
        id: 'evt_test_456',
        type: 'customer.subscription.updated',
        data: {
          object: {
            id: 'sub_test_123',
            customer: 'cus_test_123',
            status: 'active',
            current_period_start: 1640995200,
            current_period_end: 1643673600,
            cancel_at_period_end: false,
          },
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
      };

      // Mock database update
      vi.mocked(db).update.mockReturnValueOnce({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              testDataFactories.userSubscription({
                id: 'sub-123',
                status: 'active',
                cancelAtPeriodEnd: false,
              }),
            ]),
          }),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should handle customer.subscription.deleted event', async () => {
      const mockEvent = {
        id: 'evt_test_789',
        type: 'customer.subscription.deleted',
        data: {
          object: {
            id: 'sub_test_123',
            customer: 'cus_test_123',
            status: 'canceled',
          },
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
      };

      // Mock database update
      vi.mocked(db).update.mockReturnValueOnce({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              testDataFactories.userSubscription({
                id: 'sub-123',
                status: 'canceled',
              }),
            ]),
          }),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should handle invoice.payment_succeeded event', async () => {
      const mockEvent = {
        id: 'evt_test_101',
        type: 'invoice.payment_succeeded',
        data: {
          object: {
            id: 'in_test_123',
            customer: 'cus_test_123',
            subscription: 'sub_test_123',
            amount_paid: 2900,
            currency: 'usd',
            status: 'paid',
            period_start: 1640995200,
            period_end: 1643673600,
          },
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
      };

      // Mock database update for subscription renewal
      vi.mocked(db).update.mockReturnValueOnce({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              testDataFactories.userSubscription({
                id: 'sub-123',
                status: 'active',
                currentPeriodStart: new Date(1640995200 * 1000),
                currentPeriodEnd: new Date(1643673600 * 1000),
              }),
            ]),
          }),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should handle invoice.payment_failed event', async () => {
      const mockEvent = {
        id: 'evt_test_102',
        type: 'invoice.payment_failed',
        data: {
          object: {
            id: 'in_test_124',
            customer: 'cus_test_123',
            subscription: 'sub_test_123',
            amount_due: 2900,
            currency: 'usd',
            status: 'open',
            attempt_count: 1,
          },
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
      };

      // Mock database update for failed payment
      vi.mocked(db).update.mockReturnValueOnce({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockReturnValue({
            returning: vi.fn().mockResolvedValue([
              testDataFactories.userSubscription({
                id: 'sub-123',
                status: 'past_due',
              }),
            ]),
          }),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('should return 400 for invalid webhook signature', async () => {
      // Mock Stripe webhook verification failure
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockImplementation(() => {
            throw new Error('Invalid signature');
          }),
        },
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify({}),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'invalid-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Invalid signature');
    });

    it('should return 200 for unhandled event types', async () => {
      const mockEvent = {
        id: 'evt_test_999',
        type: 'unhandled.event.type',
        data: {
          object: {},
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
      };

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Event type not handled');
    });

    it('should handle database errors gracefully', async () => {
      const mockEvent = {
        id: 'evt_test_103',
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            customer: 'cus_test_123',
            subscription: 'sub_test_123',
            payment_status: 'paid',
            metadata: {
              planId: 'premium-plan',
              userId: 'user-123',
            },
          },
        },
      };

      // Mock Stripe webhook verification
      const mockStripe = {
        webhooks: {
          constructEvent: vi.fn().mockReturnValue(mockEvent),
        },
        subscriptions: {
          retrieve: vi.fn().mockResolvedValue({
            id: 'sub_test_123',
            customer: 'cus_test_123',
            status: 'active',
          }),
        },
        customers: {
          retrieve: vi.fn().mockResolvedValue({
            id: 'cus_test_123',
            email: 'test@example.com',
            metadata: {
              userId: 'user-123',
            },
          }),
        },
      };

      // Mock database error
      vi.mocked(db).insert.mockReturnValueOnce({
        values: vi.fn().mockReturnValue({
          returning: vi.fn().mockRejectedValue(new Error('Database error')),
        }),
      });

      const request = new NextRequest(
        'http://localhost:3000/api/stripe/webhook',
        {
          method: 'POST',
          body: JSON.stringify(mockEvent),
          headers: {
            'Content-Type': 'application/json',
            'Stripe-Signature': 'test-signature',
          },
        }
      );

      const response = await handleWebhook(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.error).toContain('Database error');
    });
  });
});
