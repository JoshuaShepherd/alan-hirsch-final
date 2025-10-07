// Auto-generated API types for system
// Generated at: 2025-10-06T11:54:10.287Z

import { z } from 'zod';

// AuditLogs API Types
export interface AuditLogsRequest {
  // Request payload
}

export interface AuditLogsResponse {
  id: string;
  // Response data
}

export interface AuditLogsListResponse {
  data: AuditLogsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// FeatureFlags API Types
export interface FeatureFlagsRequest {
  // Request payload
}

export interface FeatureFlagsResponse {
  id: string;
  // Response data
}

export interface FeatureFlagsListResponse {
  data: FeatureFlagsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// UserFeatureFlags API Types
export interface UserFeatureFlagsRequest {
  // Request payload
}

export interface UserFeatureFlagsResponse {
  id: string;
  // Response data
}

export interface UserFeatureFlagsListResponse {
  data: UserFeatureFlagsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// UserConsents API Types
export interface UserConsentsRequest {
  // Request payload
}

export interface UserConsentsResponse {
  id: string;
  // Response data
}

export interface UserConsentsListResponse {
  data: UserConsentsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// SystemNotifications API Types
export interface SystemNotificationsRequest {
  // Request payload
}

export interface SystemNotificationsResponse {
  id: string;
  // Response data
}

export interface SystemNotificationsListResponse {
  data: SystemNotificationsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// UserNotificationStatus API Types
export interface UserNotificationStatusRequest {
  // Request payload
}

export interface UserNotificationStatusResponse {
  id: string;
  // Response data
}

export interface UserNotificationStatusListResponse {
  data: UserNotificationStatusResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// ApiKeys API Types
export interface ApiKeysRequest {
  // Request payload
}

export interface ApiKeysResponse {
  id: string;
  // Response data
}

export interface ApiKeysListResponse {
  data: ApiKeysResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

