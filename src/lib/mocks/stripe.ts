import { vi } from 'vitest';

/**
 * Centralized Stripe Mock Utilities
 *
 * This module provides consistent Stripe mocking patterns for all tests.
 * It includes mocks for customers, subscriptions, checkout sessions, and
 * other Stripe services.
 */

export interface MockStripeConfig {
  shouldThrowError?: boolean;
  errorMessage?: string;
  delay?: number;
}

export interface MockCustomer {
  id: string;
  email: string;
  name?: string;
  created: number;
  metadata?: Record<string, string>;
}

export interface MockSubscription {
  id: string;
  customer: string;
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'trialing'
    | 'unpaid';
  current_period_start: number;
  current_period_end: number;
  items: {
    data: Array<{
      id: string;
      price: {
        id: string;
        unit_amount: number;
        currency: string;
      };
    }>;
  };
}

export interface MockCheckoutSession {
  id: string;
  customer: string;
  payment_status: 'paid' | 'unpaid' | 'no_payment_required';
  status: 'complete' | 'expired' | 'open';
  url?: string;
  success_url: string;
  cancel_url: string;
}

/**
 * Creates a mock Stripe client with configurable behavior
 */
export function createMockStripeClient(config: MockStripeConfig = {}) {
  const {
    shouldThrowError = false,
    errorMessage = 'Stripe error',
    delay = 0,
  } = config;

  const mockStripe = {
    customers: {
      create: vi.fn().mockResolvedValue({
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Test Customer',
        created: Date.now() / 1000,
        metadata: {},
      } as MockCustomer),

      retrieve: vi.fn().mockResolvedValue({
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Test Customer',
        created: Date.now() / 1000,
        metadata: {},
      } as MockCustomer),

      update: vi.fn().mockResolvedValue({
        id: 'cus_test123',
        email: 'test@example.com',
        name: 'Updated Customer',
        created: Date.now() / 1000,
        metadata: {},
      } as MockCustomer),

      delete: vi.fn().mockResolvedValue({
        id: 'cus_test123',
        deleted: true,
      }),

      list: vi.fn().mockResolvedValue({
        data: [],
        has_more: false,
        object: 'list',
        url: '/v1/customers',
      }),
    },

    subscriptions: {
      create: vi.fn().mockResolvedValue({
        id: 'sub_test123',
        customer: 'cus_test123',
        status: 'active',
        current_period_start: Date.now() / 1000,
        current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60, // 30 days from now
        items: {
          data: [
            {
              id: 'si_test123',
              price: {
                id: 'price_test123',
                unit_amount: 2900, // $29.00
                currency: 'usd',
              },
            },
          ],
        },
      } as MockSubscription),

      retrieve: vi.fn().mockResolvedValue({
        id: 'sub_test123',
        customer: 'cus_test123',
        status: 'active',
        current_period_start: Date.now() / 1000,
        current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60,
        items: {
          data: [
            {
              id: 'si_test123',
              price: {
                id: 'price_test123',
                unit_amount: 2900,
                currency: 'usd',
              },
            },
          ],
        },
      } as MockSubscription),

      update: vi.fn().mockResolvedValue({
        id: 'sub_test123',
        customer: 'cus_test123',
        status: 'active',
        current_period_start: Date.now() / 1000,
        current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60,
        items: {
          data: [
            {
              id: 'si_test123',
              price: {
                id: 'price_test123',
                unit_amount: 2900,
                currency: 'usd',
              },
            },
          ],
        },
      } as MockSubscription),

      cancel: vi.fn().mockResolvedValue({
        id: 'sub_test123',
        customer: 'cus_test123',
        status: 'canceled',
        current_period_start: Date.now() / 1000,
        current_period_end: Date.now() / 1000 + 30 * 24 * 60 * 60,
        items: {
          data: [
            {
              id: 'si_test123',
              price: {
                id: 'price_test123',
                unit_amount: 2900,
                currency: 'usd',
              },
            },
          ],
        },
      } as MockSubscription),

      list: vi.fn().mockResolvedValue({
        data: [],
        has_more: false,
        object: 'list',
        url: '/v1/subscriptions',
      }),
    },

    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: 'cs_test123',
          customer: 'cus_test123',
          payment_status: 'unpaid',
          status: 'open',
          url: 'https://checkout.stripe.com/c/pay/cs_test123',
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
        } as MockCheckoutSession),

        retrieve: vi.fn().mockResolvedValue({
          id: 'cs_test123',
          customer: 'cus_test123',
          payment_status: 'paid',
          status: 'complete',
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
        } as MockCheckoutSession),

        expire: vi.fn().mockResolvedValue({
          id: 'cs_test123',
          customer: 'cus_test123',
          payment_status: 'unpaid',
          status: 'expired',
          success_url: 'https://example.com/success',
          cancel_url: 'https://example.com/cancel',
        } as MockCheckoutSession),
      },
    },

    prices: {
      create: vi.fn().mockResolvedValue({
        id: 'price_test123',
        unit_amount: 2900,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        product: 'prod_test123',
      }),

      retrieve: vi.fn().mockResolvedValue({
        id: 'price_test123',
        unit_amount: 2900,
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
        product: 'prod_test123',
      }),

      list: vi.fn().mockResolvedValue({
        data: [],
        has_more: false,
        object: 'list',
        url: '/v1/prices',
      }),
    },

    products: {
      create: vi.fn().mockResolvedValue({
        id: 'prod_test123',
        name: 'Test Product',
        description: 'A test product',
        active: true,
        metadata: {},
      }),

      retrieve: vi.fn().mockResolvedValue({
        id: 'prod_test123',
        name: 'Test Product',
        description: 'A test product',
        active: true,
        metadata: {},
      }),

      update: vi.fn().mockResolvedValue({
        id: 'prod_test123',
        name: 'Updated Product',
        description: 'An updated test product',
        active: true,
        metadata: {},
      }),

      list: vi.fn().mockResolvedValue({
        data: [],
        has_more: false,
        object: 'list',
        url: '/v1/products',
      }),
    },

    webhooks: {
      constructEvent: vi.fn().mockReturnValue({
        id: 'evt_test123',
        type: 'customer.subscription.created',
        data: {
          object: {
            id: 'sub_test123',
            customer: 'cus_test123',
            status: 'active',
          },
        },
      }),
    },
  };

  // Configure error behavior
  if (shouldThrowError) {
    const errorResponse = {
      error: { message: errorMessage, type: 'api_error' },
    };

    Object.keys(mockStripe).forEach(service => {
      const serviceObj = (mockStripe as any)[service];
      if (typeof serviceObj === 'object') {
        Object.keys(serviceObj).forEach(method => {
          const methodObj = serviceObj[method as keyof typeof serviceObj];
          if (vi.isMockFunction(methodObj)) {
            methodObj.mockRejectedValue(errorResponse);
          }
        });
      }
    });
  }

  return mockStripe;
}

/**
 * Creates a mock Stripe client with predefined responses
 */
export function createMockStripeClientWithResponses(
  responses: Record<string, any>,
  config: MockStripeConfig = {}
) {
  const mockStripe = createMockStripeClient(config);
  let callCount = 0;

  // Override specific methods with predefined responses
  Object.keys(responses).forEach(methodPath => {
    const parts = methodPath.split('.');
    if (parts.length !== 2) return; // Skip invalid method paths
    const [service, method] = parts;
    if (!service || !method) return; // Skip if service or method is undefined
    const serviceObj = (mockStripe as any)[service];
    if (serviceObj?.[method as keyof typeof serviceObj]) {
      const methodObj = serviceObj[method as keyof typeof serviceObj];
      methodObj.mockImplementation(() => {
        const response = responses[methodPath as keyof typeof responses];
        callCount++;
        return Promise.resolve(response);
      });
    }
  });

  return mockStripe;
}

/**
 * Creates a mock Stripe client that simulates webhook events
 */
export function createMockStripeClientWithWebhooks(
  webhookEvents: Array<{ type: string; data: unknown }>,
  config: MockStripeConfig = {}
) {
  const mockStripe = createMockStripeClient(config);
  let eventIndex = 0;

  mockStripe.webhooks.constructEvent.mockImplementation(
    (payload: string, signature: string, secret: string) => {
      if (eventIndex < webhookEvents.length) {
        const event = webhookEvents[eventIndex];
        eventIndex++;
        return event;
      }
      throw new Error('No more webhook events');
    }
  );

  return mockStripe;
}

/**
 * Utility to reset all mocks in a Stripe client mock
 */
export function resetMockStripeClient(mockStripe: unknown) {
  Object.keys(mockStripe as object).forEach(service => {
    const serviceObj = (mockStripe as any)[service];
    if (typeof serviceObj === 'object') {
      Object.keys(serviceObj).forEach(method => {
        const methodObj = serviceObj[method as keyof typeof serviceObj];
        if (vi.isMockFunction(methodObj)) {
          methodObj.mockClear();
        }
      });
    }
  });
}

/**
 * Common mock Stripe configurations for different test scenarios
 */
export const mockStripeConfigs = {
  // Success scenarios
  success: () => createMockStripeClient(),

  // Error scenarios
  apiError: (errorMessage: string = 'API error') =>
    createMockStripeClient({ shouldThrowError: true, errorMessage }),

  // Customer scenarios
  withCustomer: (customer: MockCustomer) =>
    createMockStripeClientWithResponses({
      'customers.retrieve': customer,
    }),

  // Subscription scenarios
  withSubscription: (subscription: MockSubscription) =>
    createMockStripeClientWithResponses({
      'subscriptions.retrieve': subscription,
    }),

  // Checkout scenarios
  withCheckoutSession: (session: MockCheckoutSession) =>
    createMockStripeClientWithResponses({
      'checkout.sessions.retrieve': session,
    }),

  // Webhook scenarios
  withWebhooks: (events: Array<{ type: string; data: unknown }>) =>
    createMockStripeClientWithWebhooks(events),
};
