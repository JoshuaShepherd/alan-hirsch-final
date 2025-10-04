import {
  createPaginatedRouteHandler,
  createQuerySchema,
  createRouteHandler,
} from '@platform/shared/api/route-handler';
import {
  assessmentResponseDTOSchema,
  createAssessmentRequestSchema,
} from '@platform/shared/contracts';
import { assessmentService } from '@platform/shared/services';
import { z } from 'zod';

// ============================================================================
// Assessment API Routes - Type-Safe Implementation
// ============================================================================

// Query schema for listing assessments
const assessmentQuerySchema = createQuerySchema({
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
});

// GET /api/assessments - List assessments with pagination and filtering
export const GET = createPaginatedRouteHandler({
  inputSchema: assessmentQuerySchema,
  outputSchema: assessmentResponseDTOSchema,
  method: 'GET',
  handler: async (query, context) => {
    return await assessmentService.search(query, context);
  },
});

// POST /api/assessments - Create new assessment
export const POST = createRouteHandler({
  inputSchema: createAssessmentRequestSchema,
  outputSchema: assessmentResponseDTOSchema,
  method: 'POST',
  handler: async (data, context) => {
    return await assessmentService.create(data, context);
  },
});
