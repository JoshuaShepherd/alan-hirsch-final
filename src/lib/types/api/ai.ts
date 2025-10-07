// Auto-generated API types for ai
// Generated at: 2025-10-06T11:54:10.286Z

import { z } from 'zod';

// AiInteractions API Types
export interface AiInteractionsRequest {
  // Request payload
}

export interface AiInteractionsResponse {
  id: string;
  // Response data
}

export interface AiInteractionsListResponse {
  data: AiInteractionsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// AiModels API Types
export interface AiModelsRequest {
  // Request payload
}

export interface AiModelsResponse {
  id: string;
  // Response data
}

export interface AiModelsListResponse {
  data: AiModelsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// AiPrompts API Types
export interface AiPromptsRequest {
  // Request payload
}

export interface AiPromptsResponse {
  id: string;
  // Response data
}

export interface AiPromptsListResponse {
  data: AiPromptsResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

// AiResponses API Types
export interface AiResponsesRequest {
  // Request payload
}

export interface AiResponsesResponse {
  id: string;
  // Response data
}

export interface AiResponsesListResponse {
  data: AiResponsesResponse[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

