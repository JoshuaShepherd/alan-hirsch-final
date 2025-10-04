import { NextRequest } from 'next/server';
export interface RateLimitConfig {
    maxRequests: number;
    windowMs: number;
    keyGenerator?: (request: NextRequest) => string;
    skipSuccessfulRequests?: boolean;
    skipFailedRequests?: boolean;
}
interface RateLimitEntry {
    count: number;
    resetTime: number;
    blocked: boolean;
}
declare class MemoryRateLimitStore {
    private store;
    private cleanupInterval;
    constructor();
    get(key: string): Promise<RateLimitEntry | null>;
    set(key: string, entry: RateLimitEntry): Promise<void>;
    increment(key: string, windowMs: number): Promise<RateLimitEntry>;
    private cleanup;
    destroy(): void;
}
export declare class RateLimiter {
    private config;
    private store;
    constructor(config: RateLimitConfig, store?: MemoryRateLimitStore);
    check(request: NextRequest): Promise<{
        allowed: boolean;
        remaining: number;
        resetTime: number;
        totalHits: number;
    }>;
    isBlocked(request: NextRequest): Promise<boolean>;
    getRemaining(request: NextRequest): Promise<number>;
    getResetTime(request: NextRequest): Promise<number>;
}
export declare const rateLimiters: {
    auth: RateLimiter;
    api: RateLimiter;
    public: RateLimiter;
    upload: RateLimiter;
    assessment: RateLimiter;
};
export declare function withRateLimit(limiter?: RateLimiter): <T>(handler: (data: T, request: NextRequest) => Promise<Response>) => (request: NextRequest) => Promise<Response>;
export declare class UserRateLimiter extends RateLimiter {
    constructor(config: RateLimitConfig);
}
export declare class OrganizationRateLimiter extends RateLimiter {
    constructor(config: RateLimitConfig);
}
export declare function cleanupRateLimiters(): void;
export {};
//# sourceMappingURL=rate-limiter.d.ts.map