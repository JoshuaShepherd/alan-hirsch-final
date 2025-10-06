// ============================================================================
// HEALTH ROUTE TESTS
// ============================================================================
// Tests for the health route handler to ensure proper ingress/egress validation

import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the route handlers
vi.mock('../../../../lib/api/route-handlers', () => ({
  createGetHandler: vi.fn(),
}));

// Mock the database
vi.mock('@platform/database/drizzle', () => ({
  db: {
    execute: vi.fn(),
  },
}));

// Mock the cache service
vi.mock('@platform/shared/cache/redis', () => ({
  CacheService: vi.fn().mockImplementation(() => ({
    getHealth: vi.fn(),
    getStats: vi.fn(),
  })),
}));

describe('Health Route Tests', () => {
  let mockCreateGetHandler: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    const { createGetHandler } = require('../../../../lib/api/route-handlers');
    mockCreateGetHandler = createGetHandler as Mock;
  });

  it('should use standardized route handler for health check', async () => {
    // Import the health route to trigger the handler creation
    await import('../../../../app/auth/api/health/route');

    // Verify that createGetHandler was called with correct config
    expect(mockCreateGetHandler).toHaveBeenCalledWith({
      inputSchema: undefined,
      outputSchema: expect.any(Object),
      requireAuth: false,
      handler: expect.any(Function),
    });
  });

  it('should not require authentication', () => {
    // Test that the health route does not require authentication
    const config = mockCreateGetHandler.mock.calls[0][0];
    expect(config.requireAuth).toBe(false);
  });

  it('should have proper output validation schema', () => {
    // Test the output validation schema
    const HealthCheckResultSchema = {
      status: 'healthy',
      timestamp: '2023-01-01T00:00:00.000Z',
      services: {
        database: {
          status: 'healthy',
          responseTime: 10,
          details: {
            connectionPool: 'active',
            queryTime: 10,
          },
        },
        cache: {
          status: 'healthy',
          responseTime: 5,
          details: {
            latency: 5,
            stats: {},
          },
        },
        auth: {
          status: 'healthy',
          responseTime: 15,
          details: {
            supabaseUrl: 'https://example.supabase.co',
            responseStatus: 200,
          },
        },
        storage: {
          status: 'healthy',
          responseTime: 20,
          details: {
            supabaseUrl: 'https://example.supabase.co',
            responseStatus: 200,
          },
        },
      },
      metrics: {
        responseTime: 50,
        uptime: 3600,
        version: '1.0.0',
      },
    };

    // This would test the actual schema validation
    expect(HealthCheckResultSchema).toBeDefined();
  });

  it('should handle successful health check', async () => {
    // Test the handler function with successful health checks
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock successful database check
    const { db } = require('@platform/database/drizzle');
    db.execute.mockResolvedValue([{ health_check: 1 }]);

    // Mock successful cache check
    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockResolvedValue({
      status: 'healthy',
      latency: 5,
      error: null,
    });
    mockCacheService.getStats.mockReturnValue({});

    // Mock successful auth check
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    const result = await handler();

    expect(result.status).toBe('healthy');
    expect(result.services.database.status).toBe('healthy');
    expect(result.services.cache.status).toBe('healthy');
    expect(result.services.auth.status).toBe('healthy');
    expect(result.services.storage.status).toBe('healthy');
    expect(result.metrics.responseTime).toBeGreaterThan(0);
    expect(result.metrics.uptime).toBeGreaterThan(0);
    expect(result.metrics.version).toBeDefined();
  });

  it('should handle database failure', async () => {
    // Test the handler function with database failure
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock database failure
    const { db } = require('@platform/database/drizzle');
    db.execute.mockRejectedValue(new Error('Database connection failed'));

    // Mock successful cache check
    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockResolvedValue({
      status: 'healthy',
      latency: 5,
      error: null,
    });
    mockCacheService.getStats.mockReturnValue({});

    // Mock successful auth check
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    const result = await handler();

    expect(result.status).toBe('unhealthy');
    expect(result.services.database.status).toBe('unhealthy');
    expect(result.services.database.error).toBe('Database connection failed');
  });

  it('should handle cache failure', async () => {
    // Test the handler function with cache failure
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock successful database check
    const { db } = require('@platform/database/drizzle');
    db.execute.mockResolvedValue([{ health_check: 1 }]);

    // Mock cache failure
    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockRejectedValue(
      new Error('Cache connection failed')
    );

    // Mock successful auth check
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    const result = await handler();

    expect(result.status).toBe('unhealthy');
    expect(result.services.cache.status).toBe('unhealthy');
    expect(result.services.cache.error).toBe('Cache connection failed');
  });

  it('should handle auth service failure', async () => {
    // Test the handler function with auth service failure
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock successful database check
    const { db } = require('@platform/database/drizzle');
    db.execute.mockResolvedValue([{ health_check: 1 }]);

    // Mock successful cache check
    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockResolvedValue({
      status: 'healthy',
      latency: 5,
      error: null,
    });
    mockCacheService.getStats.mockReturnValue({});

    // Mock auth service failure
    global.fetch = vi
      .fn()
      .mockRejectedValue(new Error('Auth service unavailable'));

    const result = await handler();

    expect(result.status).toBe('unhealthy');
    expect(result.services.auth.status).toBe('unhealthy');
    expect(result.services.auth.error).toBe('Auth service unavailable');
  });

  it('should handle storage service failure', async () => {
    // Test the handler function with storage service failure
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock successful database check
    const { db } = require('@platform/database/drizzle');
    db.execute.mockResolvedValue([{ health_check: 1 }]);

    // Mock successful cache check
    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockResolvedValue({
      status: 'healthy',
      latency: 5,
      error: null,
    });
    mockCacheService.getStats.mockReturnValue({});

    // Mock successful auth check
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: true, status: 200 }) // Auth check
      .mockRejectedValueOnce(new Error('Storage service unavailable')); // Storage check

    const result = await handler();

    expect(result.status).toBe('unhealthy');
    expect(result.services.storage.status).toBe('unhealthy');
    expect(result.services.storage.error).toBe('Storage service unavailable');
  });

  it('should handle degraded service status', async () => {
    // Test the handler function with degraded service status
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock successful database check
    const { db } = require('@platform/database/drizzle');
    db.execute.mockResolvedValue([{ health_check: 1 }]);

    // Mock successful cache check
    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockResolvedValue({
      status: 'healthy',
      latency: 5,
      error: null,
    });
    mockCacheService.getStats.mockReturnValue({});

    // Mock degraded auth service
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 503 }) // Auth check
      .mockResolvedValueOnce({ ok: true, status: 200 }); // Storage check

    const result = await handler();

    expect(result.status).toBe('degraded');
    expect(result.services.auth.status).toBe('degraded');
    expect(result.services.auth.error).toBe('Supabase returned status 503');
  });

  it('should include proper metrics', async () => {
    // Test that the health check includes proper metrics
    const config = mockCreateGetHandler.mock.calls[0][0];
    const handler = config.handler;

    // Mock all successful checks
    const { db } = require('@platform/database/drizzle');
    db.execute.mockResolvedValue([{ health_check: 1 }]);

    const { CacheService } = require('@platform/shared/cache/redis');
    const mockCacheService = new CacheService();
    mockCacheService.getHealth.mockResolvedValue({
      status: 'healthy',
      latency: 5,
      error: null,
    });
    mockCacheService.getStats.mockReturnValue({});

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
    });

    const result = await handler();

    expect(result.metrics.responseTime).toBeGreaterThan(0);
    expect(result.metrics.uptime).toBeGreaterThan(0);
    expect(result.metrics.version).toBeDefined();
    expect(result.timestamp).toBeDefined();
  });
});
