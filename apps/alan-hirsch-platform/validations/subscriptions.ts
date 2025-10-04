import { z } from 'zod';
import { subscriptionStatusSchema } from './shared';

// Subscription Plan Validation Schemas
export const planTypeSchema = z.enum([
  'free',
  'individual',
  'professional',
  'leader',
  'institutional',
  'enterprise',
]);

export const contentAccessLevelSchema = z.enum([
  'free',
  'premium',
  'vip',
  'leader',
  'all',
]);

export const featuresSchema = z.object({
  contentLimit: z.number().int().min(0).nullable().optional(),
  aiInteractions: z.number().int().min(0),
  communityAccess: z.boolean(),
  collaborationTools: z.boolean(),
  analytics: z.boolean(),
  customBranding: z.boolean(),
  apiAccess: z.boolean(),
  prioritySupport: z.boolean(),
  downloadContent: z.boolean(),
  offlineAccess: z.boolean(),
});

export const subscriptionPlanSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),

  // Plan Classification
  planType: planTypeSchema,

  // Pricing
  priceMonthly: z.number().min(0).optional(),
  priceAnnual: z.number().min(0).optional(),
  currency: z.string().length(3).default('USD'),

  // Access Levels
  contentAccessLevel: contentAccessLevelSchema,

  // Feature Matrix
  features: featuresSchema,

  // Limits & Quotas
  maxUsers: z.number().int().min(1).default(1),
  storageLimit: z.number().int().min(0).optional(), // GB
  bandwidthLimit: z.number().int().min(0).optional(), // GB per month

  // Stripe Integration
  stripeProductId: z.string().optional(),
  stripePriceIdMonthly: z.string().optional(),
  stripePriceIdAnnual: z.string().optional(),

  // Plan Management
  isActive: z.boolean().default(true),
  isPopular: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),

  // Trial Configuration
  trialDays: z.number().int().min(0).default(0),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newSubscriptionPlanSchema = subscriptionPlanSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// User Subscription Validation Schemas

export const billingCycleSchema = z.enum(['monthly', 'annual']);

export const userSubscriptionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  planId: z.string().uuid(),

  // Network Attribution
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),

  // Subscription Details
  status: subscriptionStatusSchema,

  // Pricing & Billing
  amount: z.number().min(0),
  currency: z.string().length(3).default('USD'),
  billingCycle: billingCycleSchema,

  // Usage Tracking
  aiInteractionsUsed: z.number().int().min(0).default(0),
  aiInteractionsLimit: z.number().int().min(0).optional(),
  storageUsed: z.number().int().min(0).default(0), // MB

  // Subscription Lifecycle
  trialEndsAt: z.date().optional(),
  currentPeriodStart: z.date(),
  currentPeriodEnd: z.date(),
  cancelledAt: z.date().optional(),
  cancelAtPeriodEnd: z.boolean().default(false),

  // Stripe Integration
  stripeSubscriptionId: z.string().optional(),
  stripeCustomerId: z.string().optional(),

  // Metrics
  monthsSubscribed: z.number().int().min(0).default(0),
  totalRevenue: z.number().min(0).default(0),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newUserSubscriptionSchema = userSubscriptionSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    trialEndsAt: true,
    cancelledAt: true,
  });

// Transaction Validation Schemas - ⏳ PLANNED
export const transactionTypeSchema = z.enum([
  'subscription',
  'one_time_purchase',
  'refund',
  'chargeback',
  'credit',
]);

export const paymentStatusSchema = z.enum([
  'pending',
  'succeeded',
  'failed',
  'cancelled',
  'refunded',
]);

export const paymentMethodSchema = z.enum([
  'card',
  'bank_transfer',
  'paypal',
  'other',
]);

export const transactionSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  subscriptionId: z.string().uuid().optional(),

  // Transaction Classification
  transactionType: transactionTypeSchema,

  // Financial Details
  grossAmount: z.number().min(0),
  platformFee: z.number().min(0),
  leaderAmount: z.number().min(0),
  currency: z.string().length(3).default('USD'),

  // Revenue Attribution
  leaderProfileId: z.string().uuid().optional(),
  organizationId: z.string().uuid().optional(),

  // Network Effects
  attributedToNetworkEffect: z.boolean().default(false),
  networkAmplificationFactor: z.number().min(0).default(1.0),

  // Payment Processing
  paymentStatus: paymentStatusSchema,
  paymentMethod: paymentMethodSchema.optional(),

  // Stripe Integration
  stripePaymentIntentId: z.string().optional(),
  stripeChargeId: z.string().optional(),

  // Metadata
  description: z.string().optional(),
  metadata: z.record(z.string(), z.any()).default({}),

  // Timestamps
  processedAt: z.date(),
  createdAt: z.date(),
});

export const newTransactionSchema = transactionSchema
  .omit({
    createdAt: true,
  })
  .partial({
    id: true,
  });

// Payment Method Validation Schemas - ⏳ PLANNED
export const paymentMethodTypeSchema = z.enum([
  'card',
  'bank_account',
  'paypal',
]);

export const paymentMethodValidationSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),

  // Payment Method Details
  type: paymentMethodTypeSchema,

  // Card Details (masked)
  last4: z.string().length(4).optional(),
  brand: z.string().optional(),
  expiryMonth: z.number().int().min(1).max(12).optional(),
  expiryYear: z.number().int().min(2020).optional(),

  // Status
  isDefault: z.boolean().default(false),
  isActive: z.boolean().default(true),

  // Stripe Integration
  stripePaymentMethodId: z.string().optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newPaymentMethodSchema = paymentMethodValidationSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
  });

// Coupon Validation Schemas - ⏳ PLANNED
export const discountTypeSchema = z.enum(['percentage', 'fixed_amount']);

export const couponSchema = z.object({
  id: z.string().uuid(),
  code: z
    .string()
    .min(1)
    .regex(/^[A-Z0-9_-]+$/),
  name: z.string().min(1),
  description: z.string().optional(),

  // Discount Configuration
  discountType: discountTypeSchema,
  discountValue: z.number().min(0),
  currency: z.string().length(3).default('USD'),

  // Usage Limits
  maxUses: z.number().int().min(1).optional(),
  usedCount: z.number().int().min(0).default(0),
  maxUsesPerUser: z.number().int().min(1).default(1),

  // Validity
  validFrom: z.date(),
  validUntil: z.date().optional(),

  // Restrictions
  minimumAmount: z.number().min(0).optional(),
  applicablePlans: z.array(z.string().uuid()).default([]),

  // Status
  isActive: z.boolean().default(true),

  // Stripe Integration
  stripeCouponId: z.string().optional(),

  // Timestamps
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const newCouponSchema = couponSchema
  .omit({
    createdAt: true,
    updatedAt: true,
  })
  .partial({
    id: true,
    validUntil: true,
  });

// Type exports
export type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;
export type NewSubscriptionPlan = z.infer<typeof newSubscriptionPlanSchema>;
export type UserSubscription = z.infer<typeof userSubscriptionSchema>;
export type NewUserSubscription = z.infer<typeof newUserSubscriptionSchema>;
export type Transaction = z.infer<typeof transactionSchema>;
export type NewTransaction = z.infer<typeof newTransactionSchema>;
export type PaymentMethod = z.infer<typeof paymentMethodValidationSchema>;
export type NewPaymentMethod = z.infer<typeof newPaymentMethodSchema>;
export type Coupon = z.infer<typeof couponSchema>;
export type NewCoupon = z.infer<typeof newCouponSchema>;
