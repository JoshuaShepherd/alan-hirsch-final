import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  createMinistryAssessmentRequestSchema,
  ministryAssessmentResponseSchema,
} from '@platform/shared/contracts';
import { assessmentService } from '@platform/shared/services';
import { z } from 'zod';

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
export const GET = createPaginatedRouteHandler({
  inputSchema: ministryAssessmentQuerySchema,
  outputSchema: ministryAssessmentResponseSchema,
  method: 'GET',
  handler: async (query, context) => {
    // Add ministry-specific filtering and context
    const ministryQuery = {
      ...query,
      ministryContext: {
        userMinistryRole: context.user.ministryRole,
        organizationId: context.user.organizationId,
        culturalContext: context.user.culturalContext,
      },
    };

    return await assessmentService.searchMinistryAssessments(
      ministryQuery,
      context
    );
  },
});

// POST /api/ministry/assessments - Create new ministry assessment
export const POST = createRouteHandler({
  inputSchema: createMinistryAssessmentRequestSchema,
  outputSchema: ministryAssessmentResponseSchema,
  method: 'POST',
  handler: async (data, context) => {
    // Add ministry context to creation data
    const ministryData = {
      ...data,
      ministryContext: {
        createdBy: context.user.id,
        organizationId: context.user.organizationId,
        userMinistryRole: context.user.ministryRole,
      },
    };

    return await assessmentService.createMinistryAssessment(
      ministryData,
      context
    );
  },
});
