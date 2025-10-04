import { createQuerySchema, createRouteHandler } from '@platform/shared/api/route-handler';
import {
  ministryAnalyticsRequestSchema,
  ministryMetricsResponseSchema,
} from '@platform/shared/contracts';
import { analyticsService } from '@platform/shared/services';
import { z } from 'zod';

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
      ...query,
      ministryContext: {
        userMinistryRole: context.user.ministryRole,
        organizationId: context.user.organizationId,
        culturalContext: context.user.culturalContext,
        requestingUserId: context.user.id,
      },
    };

    return await analyticsService.getMinistryAnalytics(analyticsQuery, context);
  },
});

// POST /api/ministry/analytics - Generate custom ministry analytics report
export const POST = createRouteHandler({
  inputSchema: ministryAnalyticsRequestSchema,
  outputSchema: ministryMetricsResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    // Add ministry context to analytics request
    const analyticsData = {
      ...data,
      ministryContext: {
        requestedBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await analyticsService.generateMinistryAnalyticsReport(
      analyticsData,
      context
    );
  },
});
