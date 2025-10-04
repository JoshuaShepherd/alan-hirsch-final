// API utilities and middleware exports
// Alan Hirsch Digital Platform - Type-safe API layer
// Core utilities
export * from './error-handler';
export * from './route-handler';
export * from './utils';
// Security and rate limiting
export * from './rate-limiter';
export * from './security';
// Validation middleware (avoid duplicate exports)
export { withCORS, withErrorHandling, withInputOutputValidation, withPaginationValidation, withRateLimit, withValidation, } from './validation-middleware';
export { z };
// Common schemas
export const commonSchemas = {
    // Pagination
    pagination: {
        page: z.number().int().min(1).default(1),
        limit: z.number().int().min(1).max(100).default(20),
    },
    // ID parameter
    id: {
        id: z.string().uuid(),
    },
    // Empty input
    empty: z.object({}),
    // Search input
    search: {
        search: z.string().optional(),
        sort: z.enum(['asc', 'desc']).default('desc'),
        orderBy: z.string().optional(),
    },
};
// Helper functions
export const apiHelpers = {
    // Create success response
    success: (data, message) => ({
        data,
        success: true,
        message,
        timestamp: new Date().toISOString(),
    }),
    // Create error response
    error: (message, code = 'INTERNAL_ERROR', details) => ({
        error: message,
        code,
        details,
        timestamp: new Date().toISOString(),
    }),
    // Create paginated response
    paginated: (items, pagination) => ({
        data: items,
        pagination,
        success: true,
        timestamp: new Date().toISOString(),
    }),
};
// Middleware composition helpers
export const middleware = {
    // Compose multiple middleware functions
    compose: (...middlewares) => {
        return (handler) => {
            return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
        };
    },
    // Apply security middleware
    withSecurity: (options) => {
        const { withSecurity } = require('./security');
        return withSecurity(options);
    },
    // Apply rate limiting
    withRateLimit: (limiter) => {
        const { withRateLimit } = require('./rate-limiter');
        return withRateLimit(limiter);
    },
    // Apply CORS
    withCORS: (options) => {
        const { withCORS } = require('./security');
        return withCORS(options);
    },
    // Apply validation
    withValidation: (schema) => {
        const { withValidation } = require('./validation-middleware');
        return withValidation(schema);
    },
    // Apply error handling
    withErrorHandling: () => {
        const { withErrorHandling } = require('./validation-middleware');
        return withErrorHandling();
    },
};
// Default API configuration
export const defaultConfig = {
    // Rate limiting
    rateLimit: {
        api: { maxRequests: 100, windowMs: 15 * 60 * 1000 },
        auth: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
        upload: { maxRequests: 10, windowMs: 60 * 60 * 1000 },
    },
    // Security
    security: {
        maxRequestSize: 10 * 1024 * 1024, // 10MB
        allowedContentTypes: ['application/json'],
        allowedOrigins: ['http://localhost:3000'],
        blockedUserAgents: ['bot', 'crawler', 'spider'],
    },
    // CORS
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
    },
};
// Export Zod for convenience
import { z } from 'zod';
//# sourceMappingURL=index.js.map