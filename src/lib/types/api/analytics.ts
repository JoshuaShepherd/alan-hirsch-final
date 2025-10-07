// Auto-generated API types for analytics
// Generated at: 2025-10-06T11:54:10.287Z

import { z } from 'zod';

// UserAnalyticsEvents API Types
export interface UserAnalyticsEventsRequest {
  // Request payload
}

export interface UserAnalyticsEventsResponse {
  id: string;
  // Response data
}

export interface UserAnalyticsEventsListResponse {
  data: UserAnalyticsEventsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// UserContentInteractions API Types
export interface UserContentInteractionsRequest {
  // Request payload
}

export interface UserContentInteractionsResponse {
  id: string;
  // Response data
}

export interface UserContentInteractionsListResponse {
  data: UserContentInteractionsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// LearningOutcomes API Types
export interface LearningOutcomesRequest {
  // Request payload
}

export interface LearningOutcomesResponse {
  id: string;
  // Response data
}

export interface LearningOutcomesListResponse {
  data: LearningOutcomesResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// MovementMetrics API Types
export interface MovementMetricsRequest {
  // Request payload
}

export interface MovementMetricsResponse {
  id: string;
  // Response data
}

export interface MovementMetricsListResponse {
  data: MovementMetricsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// PerformanceReports API Types
export interface PerformanceReportsRequest {
  // Request payload
}

export interface PerformanceReportsResponse {
  id: string;
  // Response data
}

export interface PerformanceReportsListResponse {
  data: PerformanceReportsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

