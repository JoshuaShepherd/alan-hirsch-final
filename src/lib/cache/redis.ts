/**
 * Redis Cache Service
 *
 * This module provides a comprehensive caching strategy using Redis
 * to improve API performance as recommended in the API Infrastructure Improvements Plan.
 */

import { Redis } from '@upstash/redis';

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  tags?: string[]; // Cache tags for invalidation
  namespace?: string; // Cache namespace
}

export interface CacheStats {
  hits: number;
  misses: number;
  hitRate: number;
  totalRequests: number;
}

export class CacheService {
  private redis: Redis;
  private stats: CacheStats;
  private defaultTTL: number;
  private namespace: string;

  constructor(
    redisUrl: string,
    redisToken: string,
    options: {
      defaultTTL?: number;
      namespace?: string;
    } = {}
  ) {
    this.redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    this.defaultTTL = options.defaultTTL || 300; // 5 minutes default
    this.namespace = options.namespace || 'alan-hirsch';
    this.stats = {
      hits: 0,
      misses: 0,
      hitRate: 0,
      totalRequests: 0,
    };
  }

  /**
   * Get a value from cache
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      const fullKey = this.buildKey(key);
      const value = await this.redis.get(fullKey);

      this.stats.totalRequests++;

      if (value !== null) {
        this.stats.hits++;
        this.updateHitRate();
        return value as T;
      } else {
        this.stats.misses++;
        this.updateHitRate();
        return null;
      }
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  /**
   * Set a value in cache
   */
  async set<T>(
    key: string,
    value: T,
    options: CacheOptions = {}
  ): Promise<void> {
    try {
      const fullKey = this.buildKey(key);
      const ttl = options.ttl || this.defaultTTL;

      await this.redis.setex(fullKey, ttl, JSON.stringify(value));

      // Store cache tags for invalidation
      if (options.tags && options.tags.length > 0) {
        await this.storeCacheTags(fullKey, options.tags);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  /**
   * Delete a value from cache
   */
  async delete(key: string): Promise<void> {
    try {
      const fullKey = this.buildKey(key);
      await this.redis.del(fullKey);

      // Clean up cache tags
      await this.cleanupCacheTags(fullKey);
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }

  /**
   * Invalidate cache by pattern
   */
  async invalidate(pattern: string): Promise<void> {
    try {
      const fullPattern = this.buildKey(pattern);
      const keys = await this.redis.keys(fullPattern);

      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidate error:', error);
    }
  }

  /**
   * Invalidate cache by tags
   */
  async invalidateByTags(tags: string[]): Promise<void> {
    try {
      for (const tag of tags) {
        const tagKey = this.buildTagKey(tag);
        const keys = await this.redis.smembers(tagKey);

        if (keys.length > 0) {
          await this.redis.del(...keys);
          await this.redis.del(tagKey);
        }
      }
    } catch (error) {
      console.error('Cache invalidate by tags error:', error);
    }
  }

  /**
   * Get or set a value with automatic caching
   */
  async getOrSet<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    const cached = await this.get<T>(key);

    if (cached !== null) {
      return cached;
    }

    const value = await fetchFn();
    await this.set(key, value, options);

    return value;
  }

  /**
   * Get multiple values from cache
   */
  async mget<T>(keys: string[]): Promise<(T | null)[]> {
    try {
      const fullKeys = keys.map(key => this.buildKey(key));
      const values = await this.redis.mget(...fullKeys);

      this.stats.totalRequests += keys.length;

      return values.map((value, index) => {
        if (value !== null) {
          this.stats.hits++;
        } else {
          this.stats.misses++;
        }

        this.updateHitRate();
        return value as T | null;
      });
    } catch (error) {
      console.error('Cache mget error:', error);
      return keys.map(() => null);
    }
  }

  /**
   * Set multiple values in cache
   */
  async mset<T>(
    keyValuePairs: Array<{ key: string; value: T }>,
    options: CacheOptions = {}
  ): Promise<void> {
    try {
      const ttl = options.ttl || this.defaultTTL;

      for (const { key, value } of keyValuePairs) {
        await this.set(key, value, options);
      }
    } catch (error) {
      console.error('Cache mset error:', error);
    }
  }

  /**
   * Check if a key exists in cache
   */
  async exists(key: string): Promise<boolean> {
    try {
      const fullKey = this.buildKey(key);
      const result = await this.redis.exists(fullKey);
      return result === 1;
    } catch (error) {
      console.error('Cache exists error:', error);
      return false;
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Reset cache statistics
   */
  resetStats(): void {
    this.stats = {
      hits: 0,
      misses: 0,
      hitRate: 0,
      totalRequests: 0,
    };
  }

  /**
   * Get cache health status
   */
  async getHealth(): Promise<{
    status: 'healthy' | 'unhealthy';
    latency: number;
    error?: string;
  }> {
    try {
      const start = Date.now();
      await this.redis.ping();
      const latency = Date.now() - start;

      return {
        status: 'healthy',
        latency,
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        latency: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Clear all cache data
   */
  async clear(): Promise<void> {
    try {
      const pattern = this.buildKey('*');
      const keys = await this.redis.keys(pattern);

      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  /**
   * Build a namespaced cache key
   */
  private buildKey(key: string): string {
    return `${this.namespace}:${key}`;
  }

  /**
   * Build a cache tag key
   */
  private buildTagKey(tag: string): string {
    return `${this.namespace}:tags:${tag}`;
  }

  /**
   * Store cache tags for a key
   */
  private async storeCacheTags(key: string, tags: string[]): Promise<void> {
    for (const tag of tags) {
      const tagKey = this.buildTagKey(tag);
      await this.redis.sadd(tagKey, key);
    }
  }

  /**
   * Clean up cache tags for a key
   */
  private async cleanupCacheTags(key: string): Promise<void> {
    // This is a simplified implementation
    // In a production system, you might want to track tags more efficiently
  }

  /**
   * Update hit rate calculation
   */
  private updateHitRate(): void {
    if (this.stats.totalRequests > 0) {
      this.stats.hitRate = this.stats.hits / this.stats.totalRequests;
    }
  }
}

/**
 * Cache decorator for automatic caching of function results
 */
export function cached(
  keyGenerator: (...args: any[]) => string,
  options: CacheOptions = {}
) {
  return function (
    target: any,
    propertyName: string,
    descriptor: PropertyDescriptor
  ) {
    const method = descriptor.value;
    const cacheService = new CacheService(
      process.env['UPSTASH_REDIS_REST_URL'] || '',
      process.env['UPSTASH_REDIS_REST_TOKEN'] || ''
    );

    descriptor.value = async function (...args: any[]) {
      const key = keyGenerator(...args);

      return cacheService.getOrSet(
        key,
        () => method.apply(this, args),
        options
      );
    };

    return descriptor;
  };
}

/**
 * Predefined cache keys for common data types
 */
export const CacheKeys = {
  // User data
  userProfile: (userId: string) => `user:profile:${userId}`,
  userAssessments: (userId: string) => `user:assessments:${userId}`,
  userSubscriptions: (userId: string) => `user:subscriptions:${userId}`,

  // Organization data
  organization: (orgId: string) => `org:${orgId}`,
  organizationMembers: (orgId: string) => `org:members:${orgId}`,

  // Content data
  contentItem: (contentId: string) => `content:${contentId}`,
  contentCategory: (categoryId: string) => `content:category:${categoryId}`,
  publishedContent: (page: number, limit: number) =>
    `content:published:${page}:${limit}`,

  // Assessment data
  assessment: (assessmentId: string) => `assessment:${assessmentId}`,
  assessmentQuestions: (assessmentId: string) =>
    `assessment:questions:${assessmentId}`,
  activeAssessments: () => 'assessments:active',

  // Community data
  community: (communityId: string) => `community:${communityId}`,
  publicCommunities: (page: number, limit: number) =>
    `communities:public:${page}:${limit}`,

  // Subscription data
  subscriptionPlan: (planId: string) => `subscription:plan:${planId}`,
  activePlans: () => 'subscription:plans:active',

  // Analytics data
  userAnalytics: (userId: string, period: string) =>
    `analytics:user:${userId}:${period}`,
  organizationAnalytics: (orgId: string, period: string) =>
    `analytics:org:${orgId}:${period}`,
} as const;

/**
 * Cache tags for invalidation
 */
export const CacheTags = {
  user: (userId: string) => `user:${userId}`,
  organization: (orgId: string) => `org:${orgId}`,
  content: (contentId: string) => `content:${contentId}`,
  assessment: (assessmentId: string) => `assessment:${assessmentId}`,
  community: (communityId: string) => `community:${communityId}`,
  subscription: (planId: string) => `subscription:${planId}`,
} as const;

/**
 * Cache configuration for different data types
 */
export const CacheConfig = {
  userProfile: { ttl: 3600, tags: [] }, // 1 hour
  userAssessments: { ttl: 1800, tags: [] }, // 30 minutes
  contentItem: { ttl: 7200, tags: [] }, // 2 hours
  assessment: { ttl: 3600, tags: [] }, // 1 hour
  organization: { ttl: 1800, tags: [] }, // 30 minutes
  analytics: { ttl: 900, tags: [] }, // 15 minutes
  subscriptionPlans: { ttl: 86400, tags: [] }, // 24 hours
} as const;
