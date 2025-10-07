// Auto-generated schema validation mappers
// Generated at: 2025-10-06T17:55:56.828Z

import { z } from 'zod';

export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface UserFriendlyError {
  field: string;
  message: string;
  code: string;
}

// Transform data through schema validation
export function schemaValidationMapper<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): ValidationResult<T> {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData,
      errors: undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        data: undefined,
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code,
        })),
      };
    }
    throw error;
  }
}

// Transform validation errors to user-friendly messages
export function errorTransformationMapper(errors: ValidationError[]): UserFriendlyError[] {
  return errors.map(error => ({
    field: error.field,
    message: getUserFriendlyMessage(error.code, error.message),
    code: error.code,
  }));
}

// Helper function to get user-friendly error messages
function getUserFriendlyMessage(code: string, message: string): string {
  const messageMap: Record<string, string> = {
    too_small: 'This field is too short',
    too_big: 'This field is too long',
    invalid_string: 'Please enter a valid value',
    invalid_email: 'Please enter a valid email address',
    invalid_url: 'Please enter a valid URL',
    invalid_date: 'Please enter a valid date',
    invalid_number: 'Please enter a valid number',
    invalid_boolean: 'Please enter true or false',
    invalid_enum: 'Please select a valid option',
    invalid_uuid: 'Please enter a valid ID',
    invalid_array: 'Please enter a valid list',
    invalid_object: 'Please enter valid data',
    required: 'This field is required',
    optional: 'This field is optional',
  };
  return messageMap[code] || message;
}
