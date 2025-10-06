import { relations } from 'drizzle-orm';
import { boolean, decimal, integer, jsonb, pgTable, text, timestamp, uuid, } from 'drizzle-orm/pg-core';
import { organizations, userProfiles } from './auth';
// Subscription Plans - Tiered access plans with feature matrices
export const subscriptionPlans = pgTable('subscription_plans', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name').notNull(),
    slug: text('slug').notNull().unique(),
    description: text('description'),
    // Plan Classification
    planType: text('plan_type', {
        enum: [
            'free',
            'individual',
            'professional',
            'leader',
            'institutional',
            'enterprise',
        ],
    }).notNull(),
    // Pricing
    priceMonthly: decimal('price_monthly', { precision: 8, scale: 2 }),
    priceAnnual: decimal('price_annual', { precision: 8, scale: 2 }),
    currency: text('currency').default('USD'),
    // Access Levels
    contentAccessLevel: text('content_access_level', {
        enum: ['free', 'premium', 'vip', 'leader', 'all'],
    }).notNull(),
    // Feature Matrix
    features: jsonb('features')
        .$type()
        .notNull(),
    // Limits & Quotas
    maxUsers: integer('max_users').default(1), // For organizational plans
    storageLimit: integer('storage_limit'), // GB
    bandwidthLimit: integer('bandwidth_limit'), // GB per month
    // Stripe Integration
    stripeProductId: text('stripe_product_id').unique(),
    stripePriceIdMonthly: text('stripe_price_id_monthly'),
    stripePriceIdAnnual: text('stripe_price_id_annual'),
    // Plan Management
    isActive: boolean('is_active').default(true),
    isPopular: boolean('is_popular').default(false),
    sortOrder: integer('sort_order').default(0),
    // Trial Configuration
    trialDays: integer('trial_days').default(0),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// User Subscriptions - Active subscriptions with network leader attribution
export const userSubscriptions = pgTable('user_subscriptions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => userProfiles.id, { onDelete: 'cascade' }),
    planId: uuid('plan_id')
        .notNull()
        .references(() => subscriptionPlans.id),
    // Network Attribution (for revenue sharing)
    leaderProfileId: uuid('leader_profile_id').references(() => userProfiles.id),
    organizationId: uuid('organization_id').references(() => organizations.id),
    // Subscription Details
    status: text('status', {
        enum: ['active', 'cancelled', 'past_due', 'unpaid', 'trialing', 'paused'],
    }).notNull(),
    // Pricing & Billing
    amount: decimal('amount', { precision: 8, scale: 2 }).notNull(),
    currency: text('currency').default('USD'),
    billingCycle: text('billing_cycle', {
        enum: ['monthly', 'annual'],
    }).notNull(),
    // Usage Tracking
    aiInteractionsUsed: integer('ai_interactions_used').default(0),
    aiInteractionsLimit: integer('ai_interactions_limit'),
    storageUsed: integer('storage_used').default(0), // MB
    // Subscription Lifecycle
    trialEndsAt: timestamp('trial_ends_at'),
    currentPeriodStart: timestamp('current_period_start').notNull(),
    currentPeriodEnd: timestamp('current_period_end').notNull(),
    cancelledAt: timestamp('cancelled_at'),
    cancellationReason: text('cancellation_reason'),
    cancelAtPeriodEnd: boolean('cancel_at_period_end').default(false),
    // Stripe Integration
    stripeSubscriptionId: text('stripe_subscription_id').unique(),
    stripeCustomerId: text('stripe_customer_id'),
    // Metrics
    monthsSubscribed: integer('months_subscribed').default(0),
    totalRevenue: decimal('total_revenue', { precision: 10, scale: 2 }).default('0.00'),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Transactions - Complete financial history with revenue attribution
export const transactions = pgTable('transactions', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => userProfiles.id),
    subscriptionId: uuid('subscription_id').references(() => userSubscriptions.id),
    // Transaction Classification
    transactionType: text('transaction_type', {
        enum: [
            'subscription',
            'one_time_purchase',
            'refund',
            'chargeback',
            'credit',
        ],
    }).notNull(),
    // Financial Details
    grossAmount: decimal('gross_amount', { precision: 10, scale: 2 }).notNull(),
    platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).notNull(),
    leaderAmount: decimal('leader_amount', { precision: 10, scale: 2 }).notNull(),
    currency: text('currency').default('USD'),
    // Revenue Attribution
    leaderProfileId: uuid('leader_profile_id').references(() => userProfiles.id),
    organizationId: uuid('organization_id').references(() => organizations.id),
    // Network Effects
    attributedToNetworkEffect: boolean('attributed_to_network_effect').default(false),
    networkAmplificationFactor: decimal('network_amplification_factor', {
        precision: 3,
        scale: 2,
    }).default('1.0'),
    // Payment Processing
    status: text('status', {
        enum: ['pending', 'succeeded', 'failed', 'cancelled', 'refunded'],
    })
        .notNull()
        .default('pending'),
    paymentStatus: text('payment_status', {
        enum: ['pending', 'succeeded', 'failed', 'cancelled', 'refunded'],
    }).notNull(),
    paymentMethod: text('payment_method', {
        enum: ['card', 'bank_transfer', 'paypal', 'other'],
    }),
    // Stripe Integration
    stripePaymentIntentId: text('stripe_payment_intent_id'),
    stripeChargeId: text('stripe_charge_id'),
    // Metadata
    description: text('description'),
    metadata: jsonb('metadata').$type().default({}),
    // Timestamps
    processedAt: timestamp('processed_at').notNull().defaultNow(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Payment Methods - Stored payment methods for users
export const paymentMethods = pgTable('payment_methods', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
        .notNull()
        .references(() => userProfiles.id, { onDelete: 'cascade' }),
    // Payment Method Details
    type: text('type', {
        enum: ['card', 'bank_account', 'paypal'],
    }).notNull(),
    // Card Details (masked)
    last4: text('last4'),
    brand: text('brand'), // visa, mastercard, etc.
    expiryMonth: integer('expiry_month'),
    expiryYear: integer('expiry_year'),
    // Status
    isDefault: boolean('is_default').default(false),
    isActive: boolean('is_active').default(true),
    // Stripe Integration
    stripePaymentMethodId: text('stripe_payment_method_id').unique(),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Coupons & Discounts
export const coupons = pgTable('coupons', {
    id: uuid('id').primaryKey().defaultRandom(),
    code: text('code').notNull().unique(),
    name: text('name').notNull(),
    description: text('description'),
    // Discount Configuration
    discountType: text('discount_type', {
        enum: ['percentage', 'fixed_amount'],
    }).notNull(),
    discountValue: decimal('discount_value', {
        precision: 8,
        scale: 2,
    }).notNull(),
    currency: text('currency').default('USD'),
    // Usage Limits
    maxUses: integer('max_uses'),
    usedCount: integer('used_count').default(0),
    maxUsesPerUser: integer('max_uses_per_user').default(1),
    // Validity
    validFrom: timestamp('valid_from').notNull(),
    validUntil: timestamp('valid_until'),
    // Restrictions
    minimumAmount: decimal('minimum_amount', { precision: 8, scale: 2 }),
    applicablePlans: jsonb('applicable_plans').$type().default([]), // Plan IDs
    // Status
    isActive: boolean('is_active').default(true),
    // Stripe Integration
    stripeCouponId: text('stripe_coupon_id').unique(),
    // Timestamps
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
// Relations
export const subscriptionPlansRelations = relations(subscriptionPlans, ({ many }) => ({
    subscriptions: many(userSubscriptions),
}));
export const userSubscriptionsRelations = relations(userSubscriptions, ({ one, many }) => ({
    user: one(userProfiles, {
        fields: [userSubscriptions.userId],
        references: [userProfiles.id],
    }),
    plan: one(subscriptionPlans, {
        fields: [userSubscriptions.planId],
        references: [subscriptionPlans.id],
    }),
    leaderProfile: one(userProfiles, {
        fields: [userSubscriptions.leaderProfileId],
        references: [userProfiles.id],
    }),
    organization: one(organizations, {
        fields: [userSubscriptions.organizationId],
        references: [organizations.id],
    }),
    transactions: many(transactions),
}));
export const transactionsRelations = relations(transactions, ({ one }) => ({
    user: one(userProfiles, {
        fields: [transactions.userId],
        references: [userProfiles.id],
    }),
    subscription: one(userSubscriptions, {
        fields: [transactions.subscriptionId],
        references: [userSubscriptions.id],
    }),
    leaderProfile: one(userProfiles, {
        fields: [transactions.leaderProfileId],
        references: [userProfiles.id],
    }),
    organization: one(organizations, {
        fields: [transactions.organizationId],
        references: [organizations.id],
    }),
}));
export const paymentMethodsRelations = relations(paymentMethods, ({ one }) => ({
    user: one(userProfiles, {
        fields: [paymentMethods.userId],
        references: [userProfiles.id],
    }),
}));
//# sourceMappingURL=subscriptions.js.map