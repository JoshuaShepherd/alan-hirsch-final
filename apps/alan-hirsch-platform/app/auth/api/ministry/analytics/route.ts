import {
  ministryAnalyticsRequestSchema,
  ministryMetricsResponseSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  createQuerySchema,
  createRouteHandler,
} from '../../../../../lib/api/route-handlers';
import { analyticsService } from '../../../../../lib/services';

// ============================================================================
// MINISTRY ANALYTICS API ROUTES
// ============================================================================

// Query schema for ministry analytics
const ministryAnalyticsQuerySchema = createQuerySchema({
  organizationId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  metricTypes: z.array(z.string()).optional(),
  groupBy: z.enum(['day', 'week', 'month', 'quarter', 'year']).optional(),
  includeComparisons: z.coerce.boolean().default(false),
  includePredictions: z.coerce.boolean().default(false),
});

// GET /api/ministry/analytics - Get ministry analytics and metrics
export const GET = createRouteHandler({
  inputSchema: ministryAnalyticsQuerySchema,
  outputSchema: ministryMetricsResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    // Add ministry context to analytics query
    const analyticsQuery = {
      startDate: query.dateFrom,
      endDate: query.dateTo,
      organizationId: query.organizationId,
      userId: query.userId,
    };

    const result = await analyticsService.getMinistryAnalytics(
      analyticsQuery,
      context
    );

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch ministry analytics'
      );
    }

    return result.data;
  },
});

// POST /api/ministry/analytics - Generate custom ministry analytics report
export const POST = createRouteHandler({
  inputSchema: ministryAnalyticsRequestSchema,
  outputSchema: ministryMetricsResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    const result = await analyticsService.generateMinistryAnalyticsReport(
      data,
      context
    );

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to generate ministry analytics report'
      );
    }

    return result.data;
  },
});
