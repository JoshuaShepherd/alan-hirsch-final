import { faker } from '@faker-js/faker';

// Valid fixtures for Subscription Plan schemas
export const validSubscriptionPlanCreate = {
  name: faker.lorem.words(2),
  slug: faker.helpers.slugify(faker.lorem.words(2)),
  description: faker.lorem.paragraph(),
  planType: 'professional' as const,
  priceMonthly: faker.number.int({ min: 9, max: 99 }),
  priceAnnual: faker.number.int({ min: 99, max: 999 }),
  currency: 'USD',
  contentAccessLevel: 'premium' as const,
  features: {
    contentLimit: 1000,
    aiInteractions: 100,
    communityAccess: true,
    collaborationTools: true,
    analytics: true,
    customBranding: false,
    apiAccess: false,
    prioritySupport: true,
    downloadContent: true,
    offlineAccess: false,
  },
  maxUsers: 10,
  storageLimit: 5000000000, // 5GB in bytes
  bandwidthLimit: 10000000000, // 10GB in bytes
  stripeProductId: faker.string.alphanumeric(20),
  stripePriceIdMonthly: faker.string.alphanumeric(20),
  stripePriceIdAnnual: faker.string.alphanumeric(20),
  isActive: true,
  isPopular: false,
};

export const validSubscriptionPlanUpdate = {
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  description: faker.lorem.paragraph(),
  priceMonthly: faker.number.int({ min: 9, max: 99 }),
  isActive: true,
  isPopular: true,
};

export const validSubscriptionPlanResponse = {
  id: faker.string.uuid(),
  name: faker.lorem.words(2),
  slug: faker.helpers.slugify(faker.lorem.words(2)),
  description: faker.lorem.paragraph(),
  planType: 'professional' as const,
  priceMonthly: faker.number.int({ min: 9, max: 99 }),
  priceAnnual: faker.number.int({ min: 99, max: 999 }),
  currency: 'USD',
  contentAccessLevel: 'premium' as const,
  features: {
    contentLimit: 1000,
    aiInteractions: 100,
    communityAccess: true,
    collaborationTools: true,
    analytics: true,
    customBranding: false,
    apiAccess: false,
    prioritySupport: true,
    downloadContent: true,
    offlineAccess: false,
  },
  maxUsers: 10,
  storageLimit: 5000000000,
  bandwidthLimit: 10000000000,
  stripeProductId: faker.string.alphanumeric(20),
  stripePriceIdMonthly: faker.string.alphanumeric(20),
  stripePriceIdAnnual: faker.string.alphanumeric(20),
  isActive: true,
  isPopular: false,
  sortOrder: faker.number.int({ min: 1, max: 10 }),
  trialDays: 14,
  createdAt: faker.date.past().toISOString(),
  updatedAt: faker.date.recent().toISOString(),
};

// Invalid fixtures for testing validation failures
export const invalidSubscriptionPlanCreate = {
  name: '', // Empty string
  slug: '', // Empty string
  planType: 'invalid_tier' as any, // Invalid enum value
  priceMonthly: -10, // Negative price
  currency: 'invalid_currency', // Invalid currency code
  contentAccessLevel: 'invalid_level' as any, // Invalid enum value
  features: 'not-an-object' as any, // Should be object
  maxUsers: -1, // Negative number
  storageLimit: -1, // Negative number
  bandwidthLimit: -1, // Negative number
  isActive: 'not-a-boolean' as any, // Should be boolean
  isPopular: 'not-a-boolean' as any, // Should be boolean
};

export const invalidSubscriptionPlanResponse = {
  id: 'not-a-uuid',
  name: '',
  planType: 'invalid_tier' as any,
  priceMonthly: 'not-a-number' as any,
  currency: 'invalid_currency',
  contentAccessLevel: 'invalid_level' as any,
  createdAt: 'not-a-datetime',
  updatedAt: 'not-a-datetime',
};
