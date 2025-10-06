import { z } from 'zod';
// ============================================================================
// SUBSCRIPTION & PAYMENT ENTITY SCHEMAS
// ============================================================================
// Placeholder schemas for subscription and payment functionality
// Subscription Plan Entity Schema
export const subscriptionPlanEntitySchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    price: z.number().min(0),
    currency: z.string().length(3).default('USD'),
    interval: z.enum(['monthly', 'yearly', 'lifetime']),
    features: z.array(z.string()).default([]),
    maxUsers: z.number().int().min(1).optional(),
    isActive: z.boolean().default(true),
    stripeProductId: z.string().optional(),
    stripePriceId: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// User Subscription Entity Schema
export const userSubscriptionEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    planId: z.string().uuid(),
    status: z.enum([
        'active',
        'cancelled',
        'past_due',
        'unpaid',
        'trialing',
        'paused',
    ]),
    currentPeriodStart: z.string().datetime(),
    currentPeriodEnd: z.string().datetime(),
    cancelAtPeriodEnd: z.boolean().default(false),
    cancelledAt: z.string().datetime().optional(),
    stripeSubscriptionId: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Payment Method Entity Schema
export const paymentMethodEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    type: z.enum(['card', 'bank_account', 'paypal']),
    last4: z.string().length(4).optional(),
    brand: z.string().optional(),
    expiryMonth: z.number().int().min(1).max(12).optional(),
    expiryYear: z.number().int().min(2024).optional(),
    isDefault: z.boolean().default(false),
    stripePaymentMethodId: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Transaction Entity Schema
export const transactionEntitySchema = z.object({
    id: z.string().uuid(),
    userId: z.string().uuid(),
    subscriptionId: z.string().uuid().optional(),
    amount: z.number().min(0),
    currency: z.string().length(3).default('USD'),
    status: z.enum(['pending', 'completed', 'failed', 'refunded']),
    type: z.enum(['subscription', 'one_time', 'refund']),
    description: z.string().max(200).optional(),
    stripePaymentIntentId: z.string().optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// Coupon Entity Schema
export const couponEntitySchema = z.object({
    id: z.string().uuid(),
    code: z.string().min(1).max(50),
    description: z.string().max(200).optional(),
    type: z.enum(['percentage', 'fixed_amount']),
    value: z.number().min(0),
    currency: z.string().length(3).optional(),
    maxRedemptions: z.number().int().min(1).optional(),
    timesRedeemed: z.number().int().min(0).default(0),
    validFrom: z.string().datetime(),
    validUntil: z.string().datetime().optional(),
    isActive: z.boolean().default(true),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});
// ============================================================================
// CREATE SCHEMAS
// ============================================================================
export const createSubscriptionPlanSchema = subscriptionPlanEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createUserSubscriptionSchema = userSubscriptionEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createPaymentMethodSchema = paymentMethodEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createTransactionSchema = transactionEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export const createCouponSchema = couponEntitySchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    timesRedeemed: true,
});
// ============================================================================
// UPDATE SCHEMAS
// ============================================================================
export const updateSubscriptionPlanSchema = createSubscriptionPlanSchema.partial();
export const updateUserSubscriptionSchema = createUserSubscriptionSchema.partial();
export const updatePaymentMethodSchema = createPaymentMethodSchema.partial();
export const updateTransactionSchema = createTransactionSchema.partial();
export const updateCouponSchema = createCouponSchema.partial();
// ============================================================================
// SCHEMA ALIASES FOR BACKWARD COMPATIBILITY
// ============================================================================
export const subscriptionPlanSchema = subscriptionPlanEntitySchema;
export const userSubscriptionSchema = userSubscriptionEntitySchema;
export const transactionSchema = transactionEntitySchema;
export const paymentMethodSchema = paymentMethodEntitySchema;
export const couponSchema = couponEntitySchema;
export const newPaymentMethodSchema = createPaymentMethodSchema;
export const newSubscriptionPlanSchema = createSubscriptionPlanSchema;
export const newTransactionSchema = createTransactionSchema;
export const newUserSubscriptionSchema = createUserSubscriptionSchema;
//# sourceMappingURL=subscription.schema.js.map