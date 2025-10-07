// Auto-generated types for validation
// Generated at: 2025-10-06T17:20:33.398Z

import { z } from 'zod';

export interface ValidationResult<T = unknown> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
  value?: unknown;
}

export interface FieldConstraint {
  field: string;
  type: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  enum?: string[];
}

export interface SchemaValidation {
  schema: string;
  version: string;
  constraints: FieldConstraint[];
}

// Validation schemas will be generated separately in contracts
export const validationSchemas = {
  // Schemas will be imported from contracts package
} as const;
