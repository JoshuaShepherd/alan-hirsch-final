// Auto-generated types for api
// Generated at: 2025-10-06T17:20:33.398Z

import type { PaginationMeta, SortOrder } from '../common';

export interface SuccessResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface QueryFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
  filters?: Record<string, unknown>;
}

export interface ListParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
  search?: string;
}

export interface CreateParams<T = unknown> {
  data: T;
}

export interface UpdateParams<T = unknown> {
  id: string;
  data: Partial<T>;
}

export interface DeleteParams {
  id: string;
}

export interface GetByIdParams {
  id: string;
}

export interface GetBySlugParams {
  slug: string;
}

export interface GetByEmailParams {
  email: string;
}

// Request/Response type helpers
export type RequestPayload<T = unknown> = T;
export type ResponsePayload<T = unknown> = T;
export type ListResponse<T = unknown> = {
  items: T[];
  pagination: PaginationMeta;
  total: number;
};
