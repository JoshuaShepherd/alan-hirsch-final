import { ApiError, ErrorCode } from './error-handler';
// Default security headers
export const defaultSecurityHeaders = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
};
// Input sanitization
export class InputSanitizer {
    // Sanitize string input
    static sanitizeString(input) {
        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, ''); // Remove event handlers
    }
    // Sanitize HTML content
    static sanitizeHTML(input) {
        return input
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframe tags
            .replace(/on\w+\s*=/gi, '') // Remove event handlers
            .replace(/javascript:/gi, ''); // Remove javascript: protocol
    }
    // Sanitize SQL input (basic protection)
    static sanitizeSQL(input) {
        return input
            .replace(/['"]/g, '') // Remove quotes
            .replace(/;/g, '') // Remove semicolons
            .replace(/--/g, '') // Remove SQL comments
            .replace(/\/\*/g, '') // Remove block comment start
            .replace(/\*\//g, ''); // Remove block comment end
    }
    // Sanitize file path
    static sanitizeFilePath(input) {
        return input
            .replace(/\.\./g, '') // Remove directory traversal
            .replace(/[\/\\]/g, '') // Remove path separators
            .replace(/[<>:"|?*]/g, ''); // Remove invalid filename characters
    }
    // Sanitize email
    static sanitizeEmail(input) {
        return input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9@._-]/g, ''); // Keep only valid email characters
    }
    // Sanitize URL
    static sanitizeURL(input) {
        try {
            const url = new URL(input);
            // Only allow http and https protocols
            if (!['http:', 'https:'].includes(url.protocol)) {
                throw new Error('Invalid protocol');
            }
            return url.toString();
        }
        catch {
            throw new Error('Invalid URL');
        }
    }
}
// Request validation
export class RequestValidator {
    // Validate request size
    static validateRequestSize(request, maxSize = 10 * 1024 * 1024) {
        const contentLength = request.headers.get('content-length');
        if (contentLength && parseInt(contentLength) > maxSize) {
            throw new ApiError('Request too large', ErrorCode.VALIDATION_ERROR, 413, {
                maxSize,
                actualSize: contentLength,
            });
        }
    }
    // Validate content type
    static validateContentType(request, allowedTypes = ['application/json']) {
        const contentType = request.headers.get('content-type');
        if (contentType && !allowedTypes.some(type => contentType.includes(type))) {
            throw new ApiError('Invalid content type', ErrorCode.VALIDATION_ERROR, 415, { allowedTypes, receivedType: contentType });
        }
    }
    // Validate origin
    static validateOrigin(request, allowedOrigins = []) {
        const origin = request.headers.get('origin');
        if (origin &&
            allowedOrigins.length > 0 &&
            !allowedOrigins.includes(origin)) {
            throw new ApiError('Invalid origin', ErrorCode.AUTHORIZATION_ERROR, 403, {
                allowedOrigins,
                receivedOrigin: origin,
            });
        }
    }
    // Validate user agent
    static validateUserAgent(request, blockedAgents = []) {
        const userAgent = request.headers.get('user-agent');
        if (userAgent && blockedAgents.some(agent => userAgent.includes(agent))) {
            throw new ApiError('Blocked user agent', ErrorCode.AUTHORIZATION_ERROR, 403, { blockedAgents, receivedAgent: userAgent });
        }
    }
}
// Security middleware
export function withSecurity(options = {}) {
    const { headers = {}, maxRequestSize = 10 * 1024 * 1024, allowedContentTypes = ['application/json'], allowedOrigins = [], blockedUserAgents = [], } = options;
    const securityHeaders = { ...defaultSecurityHeaders, ...headers };
    return function (handler) {
        return async (request) => {
            try {
                // Validate request size
                RequestValidator.validateRequestSize(request, maxRequestSize);
                // Validate content type
                RequestValidator.validateContentType(request, allowedContentTypes);
                // Validate origin
                RequestValidator.validateOrigin(request, allowedOrigins);
                // Validate user agent
                RequestValidator.validateUserAgent(request, blockedUserAgents);
                // Execute handler
                const response = await handler({}, request);
                // Add security headers
                Object.entries(securityHeaders).forEach(([key, value]) => {
                    response.headers.set(key, value);
                });
                return response;
            }
            catch (error) {
                if (error instanceof ApiError) {
                    throw error;
                }
                throw new ApiError('Security validation failed', ErrorCode.AUTHORIZATION_ERROR, 403);
            }
        };
    };
}
// CORS security
export function withCORS(options = {}) {
    const { origin = '*', methods = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], allowedHeaders = ['Content-Type', 'Authorization'], credentials = false, maxAge = 86400, } = options;
    return function (handler) {
        return async (request) => {
            // Handle preflight requests
            if (request.method === 'OPTIONS') {
                return new Response(null, {
                    status: 200,
                    headers: {
                        'Access-Control-Allow-Origin': Array.isArray(origin)
                            ? origin.join(', ')
                            : origin,
                        'Access-Control-Allow-Methods': methods.join(', '),
                        'Access-Control-Allow-Headers': allowedHeaders.join(', '),
                        'Access-Control-Allow-Credentials': credentials.toString(),
                        'Access-Control-Max-Age': maxAge.toString(),
                    },
                });
            }
            // Execute handler
            const response = await handler({}, request);
            // Add CORS headers
            const requestOrigin = request.headers.get('origin');
            let allowedOrigin;
            if (Array.isArray(origin)) {
                allowedOrigin =
                    requestOrigin && origin.includes(requestOrigin)
                        ? requestOrigin
                        : origin[0] || '*';
            }
            else if (origin === true) {
                allowedOrigin = requestOrigin || '*';
            }
            else {
                allowedOrigin = origin;
            }
            response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
            response.headers.set('Access-Control-Allow-Methods', methods.join(', '));
            response.headers.set('Access-Control-Allow-Headers', allowedHeaders.join(', '));
            response.headers.set('Access-Control-Allow-Credentials', credentials.toString());
            return response;
        };
    };
}
// IP whitelist/blacklist
export function withIPFilter(options = {}) {
    const { whitelist = [], blacklist = [], blockPrivateIPs = false } = options;
    return function (handler) {
        return async (request) => {
            const forwarded = request.headers.get('x-forwarded-for');
            const ip = forwarded
                ? forwarded.split(',')[0]?.trim() || 'unknown'
                : request.ip || 'unknown';
            // Check blacklist
            if (blacklist.length > 0 && blacklist.includes(ip)) {
                throw new ApiError('IP address blocked', ErrorCode.AUTHORIZATION_ERROR, 403, { ip });
            }
            // Check whitelist
            if (whitelist.length > 0 && !whitelist.includes(ip)) {
                throw new ApiError('IP address not allowed', ErrorCode.AUTHORIZATION_ERROR, 403, { ip });
            }
            // Block private IPs if configured
            if (blockPrivateIPs && isPrivateIP(ip)) {
                throw new ApiError('Private IP addresses not allowed', ErrorCode.AUTHORIZATION_ERROR, 403, { ip });
            }
            return handler({}, request);
        };
    };
}
// Helper function to check if IP is private
function isPrivateIP(ip) {
    const privateRanges = [
        /^10\./,
        /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
        /^192\.168\./,
        /^127\./,
        /^::1$/,
        /^fc00:/,
        /^fe80:/,
    ];
    return privateRanges.some(range => range.test(ip));
}
//# sourceMappingURL=security.js.map