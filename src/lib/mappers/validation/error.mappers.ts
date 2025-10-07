// Auto-generated error mappers
// Generated at: 2025-10-06T17:55:56.828Z

export interface DatabaseError {
  code: string;
  message: string;
  constraint?: string;
  detail?: string;
}

export interface ServiceError {
  code: string;
  message: string;
  operation: string;
  context?: Record<string, any>;
}

export interface ApiError {
  statusCode: number;
  code: string;
  message: string;
  timestamp: string;
}

// Transform database error
export function databaseErrorMapper(error: any): DatabaseError {
  return {
    code: error.code || 'DATABASE_ERROR',
    message: error.message || 'A database error occurred',
    constraint: error.constraint,
    detail: error.detail,
  };
}

// Transform service error
export function serviceErrorMapper(error: Error, operation: string, context?: Record<string, any>): ServiceError {
  return {
    code: 'SERVICE_ERROR',
    message: error.message,
    operation,
    context,
  };
}

// Transform API error
export function apiErrorMapper(error: Error, statusCode: number = 500): ApiError {
  return {
    statusCode,
    code: 'API_ERROR',
    message: error.message,
    timestamp: new Date().toISOString(),
  };
}
