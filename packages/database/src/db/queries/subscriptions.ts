// Subscription Query Module
// Pure functions for subscription operations with context-aware access control

import { and, asc, count, desc, eq, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  organizations,
  paymentMethods,
  subscriptionPlans,
  transactions,
  userProfiles,
  userSubscriptions,
} from '../schema';
import type {
  NewSubscriptionPlan,
  NewTransaction,
  NewUserSubscription,
} from '../schema/subscriptions';
import { hasResults } from '../type-guards';

// ============================================================================
// CONTEXT TYPES
// ============================================================================

export interface QueryContext {
  organizationId?: string;
  userId?: string;
  role?: string;
}

// ============================================================================
// SUBSCRIPTION PLAN QUERIES
// ============================================================================

/**
 * Get subscription plan by ID
 */
export async function getSubscriptionPlanById(
  planId: string,
  context: QueryContext
): Promise<typeof subscriptionPlans.$inferSelect | null> {
  const result = await db
    .select()
    .from(subscriptionPlans)
    .where(
      and(
        eq(subscriptionPlans.id, planId),
        eq(subscriptionPlans.isActive, true)
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get subscription plan by slug
 */
export async function getSubscriptionPlanBySlug(
  slug: string,
  context: QueryContext
): Promise<typeof subscriptionPlans.$inferSelect | null> {
  const result = await db
    .select()
    .from(subscriptionPlans)
    .where(
      and(
        eq(subscriptionPlans.slug, slug),
        eq(subscriptionPlans.isActive, true)
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get all active subscription plans
 */
export async function getActiveSubscriptionPlans(
  context: QueryContext,
  options: {
    planType?: string;
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof subscriptionPlans.$inferSelect)[]> {
  const { planType, limit = 50, offset = 0 } = options;

  const conditions = [eq(subscriptionPlans.isActive, true)];

  if (planType) {
    conditions.push(eq(subscriptionPlans.planType, planType as any));
  }

  return db
    .select()
    .from(subscriptionPlans)
    .where(and(...conditions))
    .orderBy(asc(subscriptionPlans.sortOrder))
    .limit(limit)
    .offset(offset);
}

/**
 * Get popular subscription plans
 */
export async function getPopularSubscriptionPlans(
  context: QueryContext,
  limit: number = 3
): Promise<(typeof subscriptionPlans.$inferSelect)[]> {
  return db
    .select()
    .from(subscriptionPlans)
    .where(
      and(
        eq(subscriptionPlans.isActive, true),
        eq(subscriptionPlans.isPopular, true)
      )
    )
    .orderBy(asc(subscriptionPlans.sortOrder))
    .limit(limit);
}

/**
 * Create subscription plan
 */
export async function createSubscriptionPlan(
  planData: NewSubscriptionPlan,
  context: QueryContext
): Promise<typeof subscriptionPlans.$inferSelect> {
  const result = await db
    .insert(subscriptionPlans)
    .values({
      ...planData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create subscription plan');
  }

  return result[0];
}

/**
 * Update subscription plan
 */
export async function updateSubscriptionPlan(
  planId: string,
  updates: Partial<NewSubscriptionPlan>,
  context: QueryContext
): Promise<typeof subscriptionPlans.$inferSelect | null> {
  const result = await db
    .update(subscriptionPlans)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(subscriptionPlans.id, planId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete subscription plan
 */
export async function deleteSubscriptionPlan(
  planId: string,
  context: QueryContext
): Promise<boolean> {
  const result = await db
    .delete(subscriptionPlans)
    .where(eq(subscriptionPlans.id, planId));

  return result.length > 0;
}

// ============================================================================
// USER SUBSCRIPTION QUERIES
// ============================================================================

/**
 * Get user subscription by ID
 */
export async function getUserSubscriptionById(
  subscriptionId: string,
  context: QueryContext
): Promise<typeof userSubscriptions.$inferSelect | null> {
  const result = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.id, subscriptionId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get user's active subscription
 */
export async function getUserActiveSubscription(
  userId: string,
  context: QueryContext
): Promise<{
  subscription: typeof userSubscriptions.$inferSelect;
  plan: typeof subscriptionPlans.$inferSelect | null;
  leaderProfile: typeof userProfiles.$inferSelect | null;
  organization: typeof organizations.$inferSelect | null;
} | null> {
  const result = await db
    .select({
      subscription: userSubscriptions,
      plan: subscriptionPlans,
      leaderProfile: userProfiles,
      organization: organizations,
    })
    .from(userSubscriptions)
    .leftJoin(
      subscriptionPlans,
      eq(userSubscriptions.planId, subscriptionPlans.id)
    )
    .leftJoin(
      userProfiles,
      eq(userSubscriptions.leaderProfileId, userProfiles.id)
    )
    .leftJoin(
      organizations,
      eq(userSubscriptions.organizationId, organizations.id)
    )
    .where(
      and(
        eq(userSubscriptions.userId, userId),
        eq(userSubscriptions.status, 'active')
      )
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get user subscription by Stripe subscription ID
 */
export async function getUserSubscriptionByStripeId(
  stripeSubscriptionId: string,
  context: QueryContext
): Promise<typeof userSubscriptions.$inferSelect | null> {
  const result = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.stripeSubscriptionId, stripeSubscriptionId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get user's subscription history
 */
export async function getUserSubscriptionHistory(
  userId: string,
  context: QueryContext,
  options: {
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<{
    subscription: typeof userSubscriptions.$inferSelect;
    plan: typeof subscriptionPlans.$inferSelect;
  }>
> {
  const { limit = 20, offset = 0 } = options;

  const results = await db
    .select({
      subscription: userSubscriptions,
      plan: subscriptionPlans,
    })
    .from(userSubscriptions)
    .leftJoin(
      subscriptionPlans,
      eq(userSubscriptions.planId, subscriptionPlans.id)
    )
    .where(eq(userSubscriptions.userId, userId))
    .orderBy(desc(userSubscriptions.createdAt))
    .limit(limit)
    .offset(offset);

  return results as any;
}

/**
 * Get organization subscriptions
 */
export async function getOrganizationSubscriptions(
  organizationId: string,
  context: QueryContext,
  options: {
    status?: 'active' | 'cancelled' | 'past_due' | 'unpaid';
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<{
    subscription: typeof userSubscriptions.$inferSelect;
    plan: typeof subscriptionPlans.$inferSelect;
    user: typeof userProfiles.$inferSelect;
  }>
> {
  const { status, limit = 50, offset = 0 } = options;

  const conditions = [eq(userSubscriptions.organizationId, organizationId)];

  if (status) {
    conditions.push(eq(userSubscriptions.status, status));
  }

  const results = await db
    .select({
      subscription: userSubscriptions,
      plan: subscriptionPlans,
      user: userProfiles,
    })
    .from(userSubscriptions)
    .leftJoin(
      subscriptionPlans,
      eq(userSubscriptions.planId, subscriptionPlans.id)
    )
    .leftJoin(userProfiles, eq(userSubscriptions.userId, userProfiles.id))
    .where(and(...conditions))
    .orderBy(desc(userSubscriptions.createdAt))
    .limit(limit)
    .offset(offset);

  return results as any;
}

/**
 * Get subscription statistics
 */
export async function getSubscriptionStats(
  context: QueryContext,
  options: {
    organizationId?: string;
    planId?: string;
    timeframe?: 'day' | 'week' | 'month' | 'year';
  } = {}
): Promise<{
  totalSubscriptions: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  averageRevenuePerUser: number;
  churnRate: number;
}> {
  const { organizationId, planId, timeframe = 'month' } = options;

  const conditions = [];
  if (organizationId) {
    conditions.push(eq(userSubscriptions.organizationId, organizationId));
  }
  if (planId) {
    conditions.push(eq(userSubscriptions.planId, planId));
  }

  const timeCondition = {
    day: sql`${userSubscriptions.createdAt} >= NOW() - INTERVAL '1 day'`,
    week: sql`${userSubscriptions.createdAt} >= NOW() - INTERVAL '1 week'`,
    month: sql`${userSubscriptions.createdAt} >= NOW() - INTERVAL '1 month'`,
    year: sql`${userSubscriptions.createdAt} >= NOW() - INTERVAL '1 year'`,
  }[timeframe];

  const [stats, activeStats] = await Promise.all([
    // Overall statistics
    db
      .select({
        totalSubscriptions: count(userSubscriptions.id),
        activeSubscriptions: count(
          sql`CASE WHEN ${userSubscriptions.status} = 'active' THEN 1 END`
        ),
        cancelledSubscriptions: count(
          sql`CASE WHEN ${userSubscriptions.status} = 'cancelled' THEN 1 END`
        ),
        totalRevenue: sql<number>`COALESCE(SUM(${userSubscriptions.totalRevenue}), 0)`,
        monthlyRecurringRevenue: sql<number>`COALESCE(SUM(CASE WHEN ${userSubscriptions.status} = 'active' THEN ${userSubscriptions.amount} ELSE 0 END), 0)`,
      })
      .from(userSubscriptions)
      .where(conditions.length > 0 ? and(...conditions) : undefined),

    // Active subscriptions for ARPU calculation
    db
      .select({
        activeCount: count(userSubscriptions.id),
        activeRevenue: sql<number>`COALESCE(SUM(${userSubscriptions.amount}), 0)`,
      })
      .from(userSubscriptions)
      .where(and(...conditions, eq(userSubscriptions.status, 'active'))),
  ]);

  const totalSubscriptions = stats[0]?.totalSubscriptions ?? 0;
  const activeSubscriptions = stats[0]?.activeSubscriptions ?? 0;
  const cancelledSubscriptions = stats[0]?.cancelledSubscriptions ?? 0;
  const activeCount = activeStats[0]?.activeCount ?? 0;
  const activeRevenue = activeStats[0]?.activeRevenue ?? 0;

  return {
    totalSubscriptions,
    activeSubscriptions,
    cancelledSubscriptions,
    totalRevenue: stats[0]?.totalRevenue ?? 0,
    monthlyRecurringRevenue: stats[0]?.monthlyRecurringRevenue ?? 0,
    averageRevenuePerUser: activeCount > 0 ? activeRevenue / activeCount : 0,
    churnRate:
      totalSubscriptions > 0 ? cancelledSubscriptions / totalSubscriptions : 0,
  };
}

/**
 * Create user subscription
 */
export async function createUserSubscription(
  subscriptionData: NewUserSubscription,
  context: QueryContext
): Promise<typeof userSubscriptions.$inferSelect> {
  const result = await db
    .insert(userSubscriptions)
    .values({
      ...subscriptionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create user subscription');
  }

  return result[0];
}

/**
 * Update user subscription
 */
export async function updateUserSubscription(
  subscriptionId: string,
  updates: Partial<NewUserSubscription>,
  context: QueryContext
): Promise<typeof userSubscriptions.$inferSelect | null> {
  const result = await db
    .update(userSubscriptions)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(userSubscriptions.id, subscriptionId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Cancel user subscription
 */
export async function cancelUserSubscription(
  subscriptionId: string,
  context: QueryContext,
  options: {
    cancelAtPeriodEnd?: boolean;
    cancellationReason?: string;
  } = {}
): Promise<typeof userSubscriptions.$inferSelect | null> {
  const { cancelAtPeriodEnd = true, cancellationReason } = options;

  const updates: Partial<NewUserSubscription> = {
    status: cancelAtPeriodEnd ? 'active' : 'cancelled',
    cancelAtPeriodEnd,
    cancelledAt: cancelAtPeriodEnd ? undefined : new Date(),
  };

  if (cancellationReason) {
    updates.cancellationReason = cancellationReason;
  }

  return updateUserSubscription(subscriptionId, updates, context);
}

/**
 * Reactivate user subscription
 */
export async function reactivateUserSubscription(
  subscriptionId: string,
  context: QueryContext
): Promise<typeof userSubscriptions.$inferSelect | null> {
  return updateUserSubscription(
    subscriptionId,
    {
      status: 'active',
      cancelAtPeriodEnd: false,
      cancelledAt: null,
    },
    context
  );
}

// ============================================================================
// TRANSACTION QUERIES
// ============================================================================

/**
 * Get transaction by ID
 */
export async function getTransactionById(
  transactionId: string,
  context: QueryContext
): Promise<typeof transactions.$inferSelect | null> {
  const result = await db
    .select()
    .from(transactions)
    .where(eq(transactions.id, transactionId))
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Get transactions by user
 */
export async function getTransactionsByUser(
  userId: string,
  context: QueryContext,
  options: {
    status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
    limit?: number;
    offset?: number;
  } = {}
): Promise<(typeof transactions.$inferSelect)[]> {
  const { status, limit = 20, offset = 0 } = options;

  const conditions = [eq(transactions.userId, userId)];

  if (status) {
    conditions.push(eq(transactions.status, status));
  }

  return db
    .select()
    .from(transactions)
    .where(and(...conditions))
    .orderBy(desc(transactions.createdAt))
    .limit(limit)
    .offset(offset);
}

/**
 * Get transactions by organization
 */
export async function getTransactionsByOrganization(
  organizationId: string,
  context: QueryContext,
  options: {
    status?: 'pending' | 'succeeded' | 'failed' | 'refunded';
    limit?: number;
    offset?: number;
  } = {}
): Promise<
  Array<{
    transaction: typeof transactions.$inferSelect;
    user: typeof userProfiles.$inferSelect;
  }>
> {
  const { status, limit = 50, offset = 0 } = options;

  const conditions = [eq(transactions.organizationId, organizationId)];

  if (status) {
    conditions.push(eq(transactions.status, status));
  }

  const results = await db
    .select({
      transaction: transactions,
      user: userProfiles,
    })
    .from(transactions)
    .leftJoin(userProfiles, eq(transactions.userId, userProfiles.id))
    .where(and(...conditions))
    .orderBy(desc(transactions.createdAt))
    .limit(limit)
    .offset(offset);

  return results as any;
}

/**
 * Create transaction
 */
export async function createTransaction(
  transactionData: NewTransaction,
  context: QueryContext
): Promise<typeof transactions.$inferSelect> {
  const result = await db
    .insert(transactions)
    .values({
      ...transactionData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create transaction');
  }

  return result[0];
}

/**
 * Update transaction
 */
export async function updateTransaction(
  transactionId: string,
  updates: Partial<NewTransaction>,
  context: QueryContext
): Promise<typeof transactions.$inferSelect | null> {
  const result = await db
    .update(transactions)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(transactions.id, transactionId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

// ============================================================================
// PAYMENT METHOD QUERIES
// ============================================================================

/**
 * Get payment methods by user
 */
export async function getPaymentMethodsByUser(
  userId: string,
  context: QueryContext
): Promise<(typeof paymentMethods.$inferSelect)[]> {
  return db
    .select()
    .from(paymentMethods)
    .where(eq(paymentMethods.userId, userId))
    .orderBy(desc(paymentMethods.createdAt));
}

/**
 * Get default payment method for user
 */
export async function getDefaultPaymentMethod(
  userId: string,
  context: QueryContext
): Promise<typeof paymentMethods.$inferSelect | null> {
  const result = await db
    .select()
    .from(paymentMethods)
    .where(
      and(eq(paymentMethods.userId, userId), eq(paymentMethods.isDefault, true))
    )
    .limit(1);

  return hasResults(result) ? result[0] : null;
}

/**
 * Create payment method
 */
export async function createPaymentMethod(
  paymentMethodData: {
    userId: string;
    stripePaymentMethodId: string;
    type: 'card' | 'bank_account' | 'paypal';
    isDefault?: boolean;
  },
  context: QueryContext
): Promise<typeof paymentMethods.$inferSelect> {
  const result = await db
    .insert(paymentMethods)
    .values(paymentMethodData)
    .returning();

  if (!hasResults(result)) {
    throw new Error('Failed to create payment method');
  }

  return result[0];
}

/**
 * Update payment method
 */
export async function updatePaymentMethod(
  paymentMethodId: string,
  updates: Partial<typeof paymentMethods.$inferSelect>,
  context: QueryContext
): Promise<typeof paymentMethods.$inferSelect | null> {
  const result = await db
    .update(paymentMethods)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(paymentMethods.id, paymentMethodId))
    .returning();

  return hasResults(result) ? result[0] : null;
}

/**
 * Delete payment method
 */
export async function deletePaymentMethod(
  paymentMethodId: string,
  context: QueryContext
): Promise<boolean> {
  const result = await db
    .delete(paymentMethods)
    .where(eq(paymentMethods.id, paymentMethodId));

  return result.length > 0;
}
