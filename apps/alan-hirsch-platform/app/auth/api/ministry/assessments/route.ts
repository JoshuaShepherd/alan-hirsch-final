import {
  AssessmentApiResponseSchema,
  CreateAssessmentApiRequestSchema,
} from '@platform/contracts';
import { z } from 'zod';
import {
  createQuerySchema,
  createRouteHandler,
} from '../../../../../lib/api/route-handlers';
import { assessmentService } from '../../../../../lib/services';

// ============================================================================
// MINISTRY ASSESSMENTS API ROUTES
// ============================================================================

// Query schema for listing ministry assessments
const ministryAssessmentQuerySchema = createQuerySchema({
  search: z.string().optional(),
  assessmentType: z
    .enum([
      'apest',
      'mdna',
      'cultural_intelligence',
      'leadership_style',
      'spiritual_gifts',
      'other',
    ])
    .optional(),
  status: z.enum(['draft', 'active', 'archived', 'under_review']).optional(),
  language: z.string().optional(),
  culturalAdaptation: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
    ])
    .optional(),
  researchBacked: z.coerce.boolean().optional(),
  ministryRoles: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  organizationId: z.string().uuid().optional(),
});

// GET /api/ministry/assessments - List ministry assessments with enhanced filtering
export const GET = createRouteHandler({
  inputSchema: ministryAssessmentQuerySchema,
  outputSchema: AssessmentApiResponseSchema.array(),
  method: 'GET',
  handler: async (query, context) => {
    const result = await assessmentService.findMany(query, context);

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to fetch ministry assessments'
      );
    }

    return result.data;
  },
});

// POST /api/ministry/assessments - Create new ministry assessment
export const POST = createRouteHandler({
  inputSchema: CreateAssessmentApiRequestSchema,
  outputSchema: AssessmentApiResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    const result = await assessmentService.create(data, context);

    if (!result.success || !result.data) {
      throw new Error(
        result.error?.message || 'Failed to create ministry assessment'
      );
    }

    return result.data;
  },
});
