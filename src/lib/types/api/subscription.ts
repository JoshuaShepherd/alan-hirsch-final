// Auto-generated API types for subscription
// Generated at: 2025-10-06T11:54:10.287Z

import { z } from 'zod';

// SubscriptionPlans API Types
export interface SubscriptionPlansRequest {
  // Request payload
}

export interface SubscriptionPlansResponse {
  id: string;
  // Response data
}

export interface SubscriptionPlansListResponse {
  data: SubscriptionPlansResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// UserSubscriptions API Types
export interface UserSubscriptionsRequest {
  // Request payload
}

export interface UserSubscriptionsResponse {
  id: string;
  // Response data
}

export interface UserSubscriptionsListResponse {
  data: UserSubscriptionsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Transactions API Types
export interface TransactionsRequest {
  // Request payload
}

export interface TransactionsResponse {
  id: string;
  // Response data
}

export interface TransactionsListResponse {
  data: TransactionsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// PaymentMethods API Types
export interface PaymentMethodsRequest {
  // Request payload
}

export interface PaymentMethodsResponse {
  id: string;
  // Response data
}

export interface PaymentMethodsListResponse {
  data: PaymentMethodsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// Coupons API Types
export interface CouponsRequest {
  // Request payload
}

export interface CouponsResponse {
  id: string;
  // Response data
}

export interface CouponsListResponse {
  data: CouponsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

