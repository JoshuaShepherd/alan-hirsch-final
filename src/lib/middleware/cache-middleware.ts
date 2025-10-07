/**
 * Cache Middleware for API Routes
 *
 * This middleware provides automatic caching for API responses
 * to improve performance as recommended in the API Infrastructure Improvements Plan.
 */

import { NextRequest, NextResponse } from 'next/server';
import { CacheConfig, CacheKeys, CacheService } from '../cache/redis';

export interface CacheMiddlewareOptions {
  ttl?: number;
  tags?: string[];
  skipCache?: (request: NextRequest) => boolean;
  keyGenerator?: (request: NextRequest) => string;
}

export class CacheMiddleware {
  private cacheService: CacheService;

  constructor() {
    this.cacheService = new CacheService(
      process.env['UPSTASH_REDIS_REST_URL'] || '',
      process.env['UPSTASH_REDIS_REST_TOKEN'] || '',
      {
        namespace: 'alan-hirsch-api',
        defaultTTL: 300, // 5 minutes
      }
    );
  }

  /**
   * Middleware function for caching API responses
   */
  async withCache(
    handler: (request: NextRequest) => Promise<NextResponse>,
    options: CacheMiddlewareOptions = {}
  ) {
    return async (request: NextRequest): Promise<NextResponse> => {
      // Skip cache if specified
      if (options.skipCache && options.skipCache(request)) {
        return handler(request);
      }

      // Generate cache key
      const cacheKey = options.keyGenerator
        ? options.keyGenerator(request)
        : this.generateDefaultKey(request);

      // Try to get from cache
      const cachedResponse = await this.cacheService.get<{
        status: number;
        headers: Record<string, string>;
        body: any;
      }>(cacheKey);

      if (cachedResponse) {
        return new NextResponse(JSON.stringify(cachedResponse.body), {
          status: cachedResponse.status,
          headers: {
            ...cachedResponse.headers,
            'X-Cache': 'HIT',
            'X-Cache-Key': cacheKey,
          },
        });
      }

      // Execute handler
      const response = await handler(request);

      // Cache the response if it's successful
      if (response.status >= 200 && response.status < 300) {
        const responseBody = await response.text();
        let parsedBody: any;

        try {
          parsedBody = JSON.parse(responseBody);
        } catch {
          parsedBody = responseBody;
        }

        const cacheData = {
          status: response.status,
          headers: Object.fromEntries(response.headers as any),
          body: parsedBody,
        };

        await this.cacheService.set(cacheKey, cacheData, {
          ttl: options.ttl,
          tags: options.tags,
        });
      }

      // Add cache headers
      response.headers.set('X-Cache', 'MISS');
      response.headers.set('X-Cache-Key', cacheKey);

      return response;
    };
  }

  /**
   * Generate default cache key from request
   */
  private generateDefaultKey(request: NextRequest): string {
    const url = new URL(request.url);
    const method = request.method;
    const pathname = url.pathname;
    const searchParams = url.searchParams.toString();

    // Include user ID if available in headers
    const userId = request.headers.get('X-User-ID');
    const userPrefix = userId ? `user:${userId}:` : '';

    return `${userPrefix}${method}:${pathname}:${searchParams}`;
  }

  /**
   * Invalidate cache for a specific user
   */
  async invalidateUserCache(userId: string): Promise<void> {
    await this.cacheService.invalidate(`user:${userId}:*`);
  }

  /**
   * Invalidate cache for a specific organization
   */
  async invalidateOrganizationCache(orgId: string): Promise<void> {
    await this.cacheService.invalidate(`org:${orgId}:*`);
  }

  /**
   * Invalidate cache by tags
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    await this.cacheService.invalidateByTags(tags);
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return this.cacheService.getStats();
  }

  /**
   * Get cache health
   */
  async getCacheHealth() {
    return this.cacheService.getHealth();
  }
}

/**
 * Predefined cache configurations for common API endpoints
 */
export const ApiCacheConfig = {
  // User endpoints
  userProfile: {
    ttl: CacheConfig.userProfile.ttl,
    tags: ['user'],
    keyGenerator: (request: NextRequest) => {
      const userId = request.headers.get('X-User-ID');
      return userId ? CacheKeys.userProfile(userId) : 'user:profile:anonymous';
    },
  },

  userAssessments: {
    ttl: CacheConfig.userAssessments.ttl,
    tags: ['user', 'assessments'],
    keyGenerator: (request: NextRequest) => {
      const userId = request.headers.get('X-User-ID');
      const url = new URL(request.url);
      const page = url.searchParams.get('page') || '1';
      const limit = url.searchParams.get('limit') || '10';
      return userId
        ? `user:${userId}:assessments:${page}:${limit}`
        : 'user:assessments:anonymous';
    },
  },

  // Content endpoints
  contentList: {
    ttl: CacheConfig.contentItem.ttl,
    tags: ['content'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const page = url.searchParams.get('page') || '1';
      const limit = url.searchParams.get('limit') || '10';
      const category = url.searchParams.get('category') || 'all';
      const status = url.searchParams.get('status') || 'published';
      return `content:list:${status}:${category}:${page}:${limit}`;
    },
  },

  contentItem: {
    ttl: CacheConfig.contentItem.ttl,
    tags: ['content'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const contentId = url.pathname.split('/').pop();
      return contentId
        ? CacheKeys.contentItem(contentId)
        : 'content:item:unknown';
    },
  },

  // Assessment endpoints
  assessmentsList: {
    ttl: CacheConfig.assessment.ttl,
    tags: ['assessments'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const page = url.searchParams.get('page') || '1';
      const limit = url.searchParams.get('limit') || '10';
      const type = url.searchParams.get('type') || 'all';
      const status = url.searchParams.get('status') || 'active';
      return `assessments:list:${status}:${type}:${page}:${limit}`;
    },
  },

  assessment: {
    ttl: CacheConfig.assessment.ttl,
    tags: ['assessments'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const assessmentId = url.pathname.split('/').pop();
      return assessmentId
        ? CacheKeys.assessment(assessmentId)
        : 'assessment:unknown';
    },
  },

  // Organization endpoints
  organization: {
    ttl: CacheConfig.organization.ttl,
    tags: ['organization'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const orgId = url.pathname.split('/').pop();
      return orgId ? CacheKeys.organization(orgId) : 'organization:unknown';
    },
  },

  // Community endpoints
  communitiesList: {
    ttl: CacheConfig.organization.ttl,
    tags: ['communities'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const page = url.searchParams.get('page') || '1';
      const limit = url.searchParams.get('limit') || '10';
      const visibility = url.searchParams.get('visibility') || 'public';
      return `communities:list:${visibility}:${page}:${limit}`;
    },
  },

  // Subscription endpoints
  subscriptionPlans: {
    ttl: CacheConfig.subscriptionPlans.ttl,
    tags: ['subscriptions'],
    keyGenerator: () => CacheKeys.activePlans(),
  },

  // Analytics endpoints
  analytics: {
    ttl: CacheConfig.analytics.ttl,
    tags: ['analytics'],
    keyGenerator: (request: NextRequest) => {
      const url = new URL(request.url);
      const period = url.searchParams.get('period') || '30d';
      const userId = request.headers.get('X-User-ID');
      const orgId = request.headers.get('X-Organization-ID');

      if (userId) {
        return CacheKeys.userAnalytics(userId, period);
      } else if (orgId) {
        return CacheKeys.organizationAnalytics(orgId, period);
      }

      return `analytics:global:${period}`;
    },
  },
} as const;

/**
 * Helper function to create cached API route handlers
 */
export function createCachedRoute(
  handler: (request: NextRequest) => Promise<NextResponse>,
  config: keyof typeof ApiCacheConfig
) {
  const middleware = new CacheMiddleware();
  const cacheConfig = ApiCacheConfig[config];

  return middleware.withCache(
    handler,
    cacheConfig as unknown as CacheMiddlewareOptions
  );
}

/**
 * Helper function to invalidate cache after data mutations
 */
export async function invalidateCache(
  tags: string[],
  userId?: string,
  orgId?: string
): Promise<void> {
  const middleware = new CacheMiddleware();

  await middleware.invalidateByTags(tags);

  if (userId) {
    await middleware.invalidateUserCache(userId);
  }

  if (orgId) {
    await middleware.invalidateOrganizationCache(orgId);
  }
}
