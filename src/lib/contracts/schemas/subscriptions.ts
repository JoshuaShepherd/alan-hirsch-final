// Auto-generated contracts for subscriptions
// Generated at: 2025-10-06T20:01:40.350Z

import { z } from 'zod';

// Entity validation schema for subscriptionPlans
export const subscriptionPlansEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  planType: z.enum(['free', 'premium', 'enterprise', 'custom']).nullable(),
  priceMonthly: z.number().nullable(),
  priceAnnual: z.number().nullable(),
  currency: z.string().default('USD').nullable(),
  contentAccessLevel: z
    .enum(['basic', 'premium', 'vip', 'unlimited'])
    .nullable(),
  features: z.object({
    contentLimit: z.number().nullable(),
    communityAccess: z.boolean(),
    aiInteractions: z.number(),
    collaborationTools: z.boolean(),
    analytics: z.boolean(),
    customBranding: z.boolean(),
    apiAccess: z.boolean(),
    prioritySupport: z.boolean(),
    downloadContent: z.boolean(),
    offlineAccess: z.boolean(),
  }),
  maxUsers: z.number().int().default(1).nullable(),
  storageLimit: z.number().int().nullable(),
  bandwidthLimit: z.number().int().nullable(),
  stripeProductId: z.string().nullable(),
  stripePriceIdMonthly: z.string().nullable(),
  stripePriceIdAnnual: z.string().nullable(),
  isActive: z.boolean().default(true).nullable(),
  isPopular: z.boolean().default(false).nullable(),
  sortOrder: z.number().int().default(0).nullable(),
  trialDays: z.number().int().default(0).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for subscriptionPlans
export const createSubscriptionPlansSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  planType: z.enum(['free', 'premium', 'enterprise', 'custom']),
  priceMonthly: z.number(),
  priceAnnual: z.number(),
  currency: z.string().optional().default('USD'),
  contentAccessLevel: z.enum(['basic', 'premium', 'vip', 'unlimited']),
  features: z
    .object({
      contentLimit: z.number().nullable(),
      communityAccess: z.boolean(),
      aiInteractions: z.number(),
      collaborationTools: z.boolean(),
      analytics: z.boolean(),
      customBranding: z.boolean(),
      apiAccess: z.boolean(),
      prioritySupport: z.boolean(),
      downloadContent: z.boolean(),
      offlineAccess: z.boolean(),
    })
    .optional(),
  maxUsers: z.number().int().optional().default(1),
  storageLimit: z.number().int(),
  bandwidthLimit: z.number().int(),
  stripeProductId: z.string(),
  stripePriceIdMonthly: z.string(),
  stripePriceIdAnnual: z.string(),
  isActive: z.boolean().optional().default(true),
  isPopular: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
  trialDays: z.number().int().optional().default(0),
});

// Update validation schema for subscriptionPlans
export const updateSubscriptionPlansSchema = z
  .object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    planType: z.enum(['free', 'premium', 'enterprise', 'custom']),
    priceMonthly: z.number(),
    priceAnnual: z.number(),
    currency: z.string().optional().default('USD'),
    contentAccessLevel: z.enum(['basic', 'premium', 'vip', 'unlimited']),
    features: z
      .object({
        contentLimit: z.number().nullable(),
        communityAccess: z.boolean(),
        aiInteractions: z.number(),
        collaborationTools: z.boolean(),
        analytics: z.boolean(),
        customBranding: z.boolean(),
        apiAccess: z.boolean(),
        prioritySupport: z.boolean(),
        downloadContent: z.boolean(),
        offlineAccess: z.boolean(),
      })
      .optional(),
    maxUsers: z.number().int().optional().default(1),
    storageLimit: z.number().int(),
    bandwidthLimit: z.number().int(),
    stripeProductId: z.string(),
    stripePriceIdMonthly: z.string(),
    stripePriceIdAnnual: z.string(),
    isActive: z.boolean().optional().default(true),
    isPopular: z.boolean().optional().default(false),
    sortOrder: z.number().int().optional().default(0),
    trialDays: z.number().int().optional().default(0),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for subscriptionPlans
export const subscriptionPlansQuerySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  planType: z.enum(['free', 'premium', 'enterprise', 'custom']),
  priceMonthly: z.number(),
  priceAnnual: z.number(),
  currency: z.string().optional().default('USD'),
  contentAccessLevel: z.enum(['basic', 'premium', 'vip', 'unlimited']),
  features: z
    .object({
      contentLimit: z.number().nullable(),
      communityAccess: z.boolean(),
      aiInteractions: z.number(),
      collaborationTools: z.boolean(),
      analytics: z.boolean(),
      customBranding: z.boolean(),
      apiAccess: z.boolean(),
      prioritySupport: z.boolean(),
      downloadContent: z.boolean(),
      offlineAccess: z.boolean(),
    })
    .optional(),
  maxUsers: z.number().int().optional().default(1),
  storageLimit: z.number().int(),
  bandwidthLimit: z.number().int(),
  stripeProductId: z.string(),
  stripePriceIdMonthly: z.string(),
  stripePriceIdAnnual: z.string(),
  isActive: z.boolean().optional().default(true),
  isPopular: z.boolean().optional().default(false),
  sortOrder: z.number().int().optional().default(0),
  trialDays: z.number().int().optional().default(0),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortDirection: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for userSubscriptions
export const userSubscriptionsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  leaderProfileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  amount: z.number(),
  currency: z.string().default('USD').nullable(),
  billingCycle: z.string().nullable(),
  aiInteractionsUsed: z.number().int().default(0).nullable(),
  aiInteractionsLimit: z.number().int().nullable(),
  storageUsed: z.number().int().default(0).nullable(),
  trialEndsAt: z.string().datetime().nullable(),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  cancelledAt: z.string().datetime().nullable(),
  cancellationReason: z.string().nullable(),
  cancelAtPeriodEnd: z.boolean().default(false).nullable(),
  stripeSubscriptionId: z.string().nullable(),
  stripeCustomerId: z.string().nullable(),
  monthsSubscribed: z.number().int().default(0).nullable(),
  totalRevenue: z.number().default(0.0).nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for userSubscriptions
export const createUserSubscriptionsSchema = z.object({
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  leaderProfileId: z.string().uuid(),
  organizationId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  amount: z.number(),
  currency: z.string().optional().default('USD'),
  billingCycle: z.string(),
  aiInteractionsUsed: z.number().int().optional().default(0),
  aiInteractionsLimit: z.number().int(),
  storageUsed: z.number().int().optional().default(0),
  trialEndsAt: z.string().datetime(),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  cancelledAt: z.string().datetime(),
  cancellationReason: z.string(),
  cancelAtPeriodEnd: z.boolean().optional().default(false),
  stripeSubscriptionId: z.string(),
  stripeCustomerId: z.string(),
  monthsSubscribed: z.number().int().optional().default(0),
  totalRevenue: z.number().optional().default(0.0),
});

// Update validation schema for userSubscriptions
export const updateUserSubscriptionsSchema = z
  .object({
    userId: z.string().uuid(),
    planId: z.string().uuid(),
    leaderProfileId: z.string().uuid(),
    organizationId: z.string().uuid(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    amount: z.number(),
    currency: z.string().optional().default('USD'),
    billingCycle: z.string(),
    aiInteractionsUsed: z.number().int().optional().default(0),
    aiInteractionsLimit: z.number().int(),
    storageUsed: z.number().int().optional().default(0),
    trialEndsAt: z.string().datetime(),
    currentPeriodStart: z.string().datetime(),
    currentPeriodEnd: z.string().datetime(),
    cancelledAt: z.string().datetime(),
    cancellationReason: z.string(),
    cancelAtPeriodEnd: z.boolean().optional().default(false),
    stripeSubscriptionId: z.string(),
    stripeCustomerId: z.string(),
    monthsSubscribed: z.number().int().optional().default(0),
    totalRevenue: z.number().optional().default(0.0),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for userSubscriptions
export const userSubscriptionsQuerySchema = z.object({
  userId: z.string().uuid(),
  planId: z.string().uuid(),
  leaderProfileId: z.string().uuid(),
  organizationId: z.string().uuid(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  amount: z.number(),
  currency: z.string().optional().default('USD'),
  billingCycle: z.string(),
  aiInteractionsUsed: z.number().int().optional().default(0),
  aiInteractionsLimit: z.number().int(),
  storageUsed: z.number().int().optional().default(0),
  trialEndsAt: z.string().datetime(),
  currentPeriodStart: z.string().datetime(),
  currentPeriodEnd: z.string().datetime(),
  cancelledAt: z.string().datetime(),
  cancellationReason: z.string(),
  cancelAtPeriodEnd: z.boolean().optional().default(false),
  stripeSubscriptionId: z.string(),
  stripeCustomerId: z.string(),
  monthsSubscribed: z.number().int().optional().default(0),
  totalRevenue: z.number().optional().default(0.0),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for transactions
export const transactionsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  subscriptionId: z.string().uuid().nullable(),
  transactionType: z.string().nullable(),
  grossAmount: z.number(),
  platformFee: z.number(),
  leaderAmount: z.number(),
  currency: z.string().default('USD').nullable(),
  leaderProfileId: z.string().uuid().nullable(),
  organizationId: z.string().uuid().nullable(),
  attributedToNetworkEffect: z.boolean().default(false).nullable(),
  networkAmplificationFactor: z.number().nullable(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']).nullable(),
  paymentStatus: z.string().nullable(),
  paymentMethod: z.string().nullable(),
  stripePaymentIntentId: z.string().nullable(),
  stripeChargeId: z.string().nullable(),
  description: z.string().nullable(),
  metadata: z.record(z.string(), z.any()),
  processedAt: z.string().datetime().default('NOW()'),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for transactions
export const createTransactionsSchema = z.object({
  userId: z.string().uuid(),
  subscriptionId: z.string().uuid(),
  transactionType: z.string(),
  grossAmount: z.number(),
  platformFee: z.number(),
  leaderAmount: z.number(),
  currency: z.string().optional().default('USD'),
  leaderProfileId: z.string().uuid(),
  organizationId: z.string().uuid(),
  attributedToNetworkEffect: z.boolean().optional().default(false),
  networkAmplificationFactor: z.number(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  paymentStatus: z.string(),
  paymentMethod: z.string(),
  stripePaymentIntentId: z.string(),
  stripeChargeId: z.string(),
  description: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  processedAt: z.string().datetime().default('NOW()'),
});

// Update validation schema for transactions
export const updateTransactionsSchema = z
  .object({
    userId: z.string().uuid(),
    subscriptionId: z.string().uuid(),
    transactionType: z.string(),
    grossAmount: z.number(),
    platformFee: z.number(),
    leaderAmount: z.number(),
    currency: z.string().optional().default('USD'),
    leaderProfileId: z.string().uuid(),
    organizationId: z.string().uuid(),
    attributedToNetworkEffect: z.boolean().optional().default(false),
    networkAmplificationFactor: z.number(),
    status: z.enum(['draft', 'published', 'archived', 'scheduled']),
    paymentStatus: z.string(),
    paymentMethod: z.string(),
    stripePaymentIntentId: z.string(),
    stripeChargeId: z.string(),
    description: z.string(),
    metadata: z.record(z.string(), z.any()).optional(),
    processedAt: z.string().datetime().optional().default('NOW()'),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for transactions
export const transactionsQuerySchema = z.object({
  userId: z.string().uuid(),
  subscriptionId: z.string().uuid(),
  transactionType: z.string(),
  grossAmount: z.number(),
  platformFee: z.number(),
  leaderAmount: z.number(),
  currency: z.string().optional().default('USD'),
  leaderProfileId: z.string().uuid(),
  organizationId: z.string().uuid(),
  attributedToNetworkEffect: z.boolean().optional().default(false),
  networkAmplificationFactor: z.number(),
  status: z.enum(['draft', 'published', 'archived', 'scheduled']),
  paymentStatus: z.string(),
  paymentMethod: z.string(),
  stripePaymentIntentId: z.string(),
  stripeChargeId: z.string(),
  description: z.string(),
  metadata: z.record(z.string(), z.any()).optional(),
  processedAt: z.string().datetime().optional().default('NOW()'),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for paymentMethods
export const paymentMethodsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  userId: z.string().uuid(),
  type: z.string().nullable(),
  last4: z.string().nullable(),
  brand: z.string().nullable(),
  expiryMonth: z.number().int().nullable(),
  expiryYear: z.number().int().nullable(),
  isDefault: z.boolean().default(false).nullable(),
  isActive: z.boolean().default(true).nullable(),
  stripePaymentMethodId: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for paymentMethods
export const createPaymentMethodsSchema = z.object({
  userId: z.string().uuid(),
  type: z.string(),
  last4: z.string(),
  brand: z.string(),
  expiryMonth: z.number().int(),
  expiryYear: z.number().int(),
  isDefault: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  stripePaymentMethodId: z.string(),
});

// Update validation schema for paymentMethods
export const updatePaymentMethodsSchema = z
  .object({
    userId: z.string().uuid(),
    type: z.string(),
    last4: z.string(),
    brand: z.string(),
    expiryMonth: z.number().int(),
    expiryYear: z.number().int(),
    isDefault: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true),
    stripePaymentMethodId: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for paymentMethods
export const paymentMethodsQuerySchema = z.object({
  userId: z.string().uuid(),
  type: z.string(),
  last4: z.string(),
  brand: z.string(),
  expiryMonth: z.number().int(),
  expiryYear: z.number().int(),
  isDefault: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  stripePaymentMethodId: z.string(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});

// Entity validation schema for coupons
export const couponsEntitySchema = z.object({
  id: z.string().uuid().default('gen_random_uuid()').nullable(),
  code: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  discountType: z.string().nullable(),
  discountValue: z.number().nullable(),
  currency: z.string().default('USD').nullable(),
  maxUses: z.number().int().nullable(),
  usedCount: z.number().int().default(0).nullable(),
  maxUsesPerUser: z.number().int().default(1).nullable(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime().nullable(),
  minimumAmount: z.number().nullable(),
  applicablePlans: z.any(),
  isActive: z.boolean().default(true).nullable(),
  stripeCouponId: z.string().nullable(),
  createdAt: z.string().datetime().default('NOW()'),
  updatedAt: z.string().datetime().default('NOW()'),
});

// Create validation schema for coupons
export const createCouponsSchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  discountType: z.string(),
  discountValue: z.number(),
  currency: z.string().optional().default('USD'),
  maxUses: z.number().int(),
  usedCount: z.number().int().optional().default(0),
  maxUsesPerUser: z.number().int().optional().default(1),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  minimumAmount: z.number(),
  applicablePlans: z.any().optional(),
  isActive: z.boolean().optional().default(true),
  stripeCouponId: z.string(),
});

// Update validation schema for coupons
export const updateCouponsSchema = z
  .object({
    code: z.string(),
    name: z.string(),
    description: z.string(),
    discountType: z.string(),
    discountValue: z.number(),
    currency: z.string().optional().default('USD'),
    maxUses: z.number().int(),
    usedCount: z.number().int().optional().default(0),
    maxUsesPerUser: z.number().int().optional().default(1),
    validFrom: z.string().datetime(),
    validUntil: z.string().datetime(),
    minimumAmount: z.number(),
    applicablePlans: z.any().optional(),
    isActive: z.boolean().optional().default(true),
    stripeCouponId: z.string(),
    updatedAt: z.string().datetime().optional().default('NOW()'),
  })
  .partial();

// Query validation schema for coupons
export const couponsQuerySchema = z.object({
  code: z.string(),
  name: z.string(),
  description: z.string(),
  discountType: z.string(),
  discountValue: z.number(),
  currency: z.string().optional().default('USD'),
  maxUses: z.number().int(),
  usedCount: z.number().int().optional().default(0),
  maxUsesPerUser: z.number().int().optional().default(1),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  minimumAmount: z.number(),
  applicablePlans: z.any().optional(),
  isActive: z.boolean().optional().default(true),
  stripeCouponId: z.string(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().max(100).optional().default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
  search: z.string().optional(),
});
