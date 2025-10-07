// Auto-generated API contracts for subscriptions
// Generated at: 2025-10-06T20:01:40.350Z

import { z } from 'zod';
import {
  subscriptionPlansEntitySchema,
  createSubscriptionPlansSchema,
  updateSubscriptionPlansSchema,
  subscriptionPlansQuerySchema,
  userSubscriptionsEntitySchema,
  createUserSubscriptionsSchema,
  updateUserSubscriptionsSchema,
  userSubscriptionsQuerySchema,
  transactionsEntitySchema,
  createTransactionsSchema,
  updateTransactionsSchema,
  transactionsQuerySchema,
  paymentMethodsEntitySchema,
  createPaymentMethodsSchema,
  updatePaymentMethodsSchema,
  paymentMethodsQuerySchema,
  couponsEntitySchema,
  createCouponsSchema,
  updateCouponsSchema,
  couponsQuerySchema,
} from '../schemas/subscriptions';

// API schemas for subscriptions
// API request/response schemas for subscriptionPlans
export const subscriptionPlansApiRequestSchema = createSubscriptionPlansSchema;
export const subscriptionPlansApiResponseSchema = subscriptionPlansEntitySchema;
export const subscriptionPlansApiUpdateSchema = updateSubscriptionPlansSchema;
export const subscriptionPlansApiQuerySchema = subscriptionPlansQuerySchema;

// API request/response schemas for userSubscriptions
export const userSubscriptionsApiRequestSchema = createUserSubscriptionsSchema;
export const userSubscriptionsApiResponseSchema = userSubscriptionsEntitySchema;
export const userSubscriptionsApiUpdateSchema = updateUserSubscriptionsSchema;
export const userSubscriptionsApiQuerySchema = userSubscriptionsQuerySchema;

// API request/response schemas for transactions
export const transactionsApiRequestSchema = createTransactionsSchema;
export const transactionsApiResponseSchema = transactionsEntitySchema;
export const transactionsApiUpdateSchema = updateTransactionsSchema;
export const transactionsApiQuerySchema = transactionsQuerySchema;

// API request/response schemas for paymentMethods
export const paymentMethodsApiRequestSchema = createPaymentMethodsSchema;
export const paymentMethodsApiResponseSchema = paymentMethodsEntitySchema;
export const paymentMethodsApiUpdateSchema = updatePaymentMethodsSchema;
export const paymentMethodsApiQuerySchema = paymentMethodsQuerySchema;

// API request/response schemas for coupons
export const couponsApiRequestSchema = createCouponsSchema;
export const couponsApiResponseSchema = couponsEntitySchema;
export const couponsApiUpdateSchema = updateCouponsSchema;
export const couponsApiQuerySchema = couponsQuerySchema;

