import { organizations, paymentMethods, subscriptionPlans, transactions, userProfiles, userSubscriptions } from '../schema';
import type { NewSubscriptionPlan, NewTransaction, NewUserSubscription } from '../schema/subscriptions';
export interface QueryContext {
    organizationId?: string;
    userId?: string;
    role?: string;
}
/**
 * Get subscription plan by ID
 */
export declare function getSubscriptionPlanById(planId: string, context: QueryContext): Promise<typeof subscriptionPlans.$inferSelect | null>;
/**
 * Get subscription plan by slug
 */
export declare function getSubscriptionPlanBySlug(slug: string, context: QueryContext): Promise<typeof subscriptionPlans.$inferSelect | null>;
/**
 * Get all active subscription plans
 */
export declare function getActiveSubscriptionPlans(context: QueryContext, options?: {
    planType?: string;
    limit?: number;
    offset?: number;
}): Promise<(typeof subscriptionPlans.$inferSelect)[]>;
/**
 * Get popular subscription plans
 */
export declare function getPopularSubscriptionPlans(context: QueryContext, limit?: number): Promise<(typeof subscriptionPlans.$inferSelect)[]>;
/**
 * Create subscription plan
 */
export declare function createSubscriptionPlan(planData: NewSubscriptionPlan, context: QueryContext): Promise<typeof subscriptionPlans.$inferSelect>;
/**
 * Update subscription plan
 */
export declare function updateSubscriptionPlan(planId: string, updates: Partial<NewSubscriptionPlan>, context: QueryContext): Promise<typeof subscriptionPlans.$inferSelect | null>;
/**
 * Delete subscription plan
 */
export declare function deleteSubscriptionPlan(planId: string, context: QueryContext): Promise<boolean>;
/**
 * Get user subscription by ID
 */
export declare function getUserSubscriptionById(subscriptionId: string, context: QueryContext): Promise<typeof userSubscriptions.$inferSelect | null>;
/**
 * Get user's active subscription
 */
export declare function getUserActiveSubscription(userId: string, context: QueryContext): Promise<{
    subscription: typeof userSubscriptions.$inferSelect;
    plan: typeof subscriptionPlans.$inferSelect | null;
    leaderProfile: typeof userProfiles.$inferSelect | null;
    organization: typeof organizations.$inferSelect | null;
} | null>;
/**
 * Get user subscription by Stripe subscription ID
 */
export declare function getUserSubscriptionByStripeId(stripeSubscriptionId: string, context: QueryContext): Promise<typeof userSubscriptions.$inferSelect | null>;
/**
 * Get user's subscription history
 */
export declare function getUserSubscriptionHistory(userId: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
}): Promise<Array<{
    subscription: typeof userSubscriptions.$inferSelect;
    plan: typeof subscriptionPlans.$inferSelect;
}>>;
/**
 * Get organization subscriptions
 */
export declare function getOrganizationSubscriptions(organizationId: string, context: QueryContext, options?: {
    status?: 'active' | 'cancelled' | 'past_due' | 'unpaid';
    limit?: number;
    offset?: number;
}): Promise<Array<{
    subscription: typeof userSubscriptions.$inferSelect;
    plan: typeof subscriptionPlans.$inferSelect;
    user: typeof userProfiles.$inferSelect;
}>>;
/**
 * Get subscription statistics
 */
export declare function getSubscriptionStats(context: QueryContext, options?: {
    organizationId?: string;
    planId?: string;
    timeframe?: 'day' | 'week' | 'month' | 'year';
}): Promise<{
    totalSubscriptions: number;
    activeSubscriptions: number;
    cancelledSubscriptions: number;
    totalRevenue: number;
    monthlyRecurringRevenue: number;
    averageRevenuePerUser: number;
    churnRate: number;
}>;
/**
 * Create user subscription
 */
export declare function createUserSubscription(subscriptionData: NewUserSubscription, context: QueryContext): Promise<typeof userSubscriptions.$inferSelect>;
/**
 * Update user subscription
 */
export declare function updateUserSubscription(subscriptionId: string, updates: Partial<NewUserSubscription>, context: QueryContext): Promise<typeof userSubscriptions.$inferSelect | null>;
/**
 * Cancel user subscription
 */
export declare function cancelUserSubscription(subscriptionId: string, context: QueryContext, options?: {
    cancelAtPeriodEnd?: boolean;
    cancellationReason?: string;
}): Promise<typeof userSubscriptions.$inferSelect | null>;
/**
 * Reactivate user subscription
 */
export declare function reactivateUserSubscription(subscriptionId: string, context: QueryContext): Promise<typeof userSubscriptions.$inferSelect | null>;
/**
 * Get transaction by ID
 */
export declare function getTransactionById(transactionId: string, context: QueryContext): Promise<typeof transactions.$inferSelect | null>;
/**
 * Get transactions by user
 */
export declare function getTransactionsByUser(userId: string, context: QueryContext, options?: {
    status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
    limit?: number;
    offset?: number;
}): Promise<(typeof transactions.$inferSelect)[]>;
/**
 * Get transactions by organization
 */
export declare function getTransactionsByOrganization(organizationId: string, context: QueryContext, options?: {
    status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
    limit?: number;
    offset?: number;
}): Promise<Array<{
    transaction: typeof transactions.$inferSelect;
    user: typeof userProfiles.$inferSelect;
}>>;
/**
 * Create transaction
 */
export declare function createTransaction(transactionData: NewTransaction, context: QueryContext): Promise<typeof transactions.$inferSelect>;
/**
 * Update transaction
 */
export declare function updateTransaction(transactionId: string, updates: Partial<NewTransaction>, context: QueryContext): Promise<typeof transactions.$inferSelect | null>;
/**
 * Get payment methods by user
 */
export declare function getPaymentMethodsByUser(userId: string, context: QueryContext): Promise<(typeof paymentMethods.$inferSelect)[]>;
/**
 * Get default payment method for user
 */
export declare function getDefaultPaymentMethod(userId: string, context: QueryContext): Promise<typeof paymentMethods.$inferSelect | null>;
/**
 * Create payment method
 */
export declare function createPaymentMethod(paymentMethodData: {
    userId: string;
    stripePaymentMethodId: string;
    type: 'card' | 'bank_account' | 'paypal';
    isDefault?: boolean;
}, context: QueryContext): Promise<typeof paymentMethods.$inferSelect>;
/**
 * Update payment method
 */
export declare function updatePaymentMethod(paymentMethodId: string, updates: Partial<typeof paymentMethods.$inferSelect>, context: QueryContext): Promise<typeof paymentMethods.$inferSelect | null>;
/**
 * Delete payment method
 */
export declare function deletePaymentMethod(paymentMethodId: string, context: QueryContext): Promise<boolean>;
//# sourceMappingURL=subscriptions.d.ts.map