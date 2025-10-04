import { createApiRoute, idInputSchema } from '@platform/shared/api/utils';
import {
  assessmentResponseResponseSchema,
  newAssessmentResponseSchema,
} from '@platform/shared/contracts';
import { apiResponseSchema } from '@/lib/contracts/api-responses';
import { z } from 'zod';
import {
  getAssessmentResponses,
  saveAssessmentResponses,
  getUserAssessmentById,
} from '@platform/database/queries/assessments';

// Input schema for saving responses
const saveResponsesInputSchema = z.object({
  responses: z.array(
    z.object({
      questionId: z.string().uuid(),
      responseValue: z.number().int().optional(),
      responseText: z.string().optional(),
      responseTime: z.number().int().min(0).optional(),
      confidence: z.number().int().min(1).max(5).optional(),
      skipped: z.boolean().default(false),
    })
  ),
});

// GET /api/user/assessments/[id]/responses - Get assessment responses
export const GET = createApiRoute(
  idInputSchema,
  apiResponseSchema(z.array(assessmentResponseResponseSchema)),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    // Verify user owns this assessment
    const userAssessment = await getUserAssessmentById(input.id);
    if (!userAssessment) {
      throw new Error('Assessment not found');
    }

    if (userAssessment.userId !== user.id) {
      throw new Error('Access denied');
    }

    const responses = await getAssessmentResponses(input.id);

    return {
      data: responses,
      success: true,
    };
  }
);

// POST /api/user/assessments/[id]/responses - Save assessment responses
export const POST = createApiRoute(
  idInputSchema.extend({
    data: saveResponsesInputSchema,
  }),
  apiResponseSchema(z.array(assessmentResponseResponseSchema)),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    // Verify user owns this assessment
    const userAssessment = await getUserAssessmentById(input.id);
    if (!userAssessment) {
      throw new Error('Assessment not found');
    }

    if (userAssessment.userId !== user.id) {
      throw new Error('Access denied');
    }

    // Check if assessment is already completed
    if (userAssessment.completedAt) {
      throw new Error('Cannot modify responses for completed assessment');
    }

    const savedResponses = await saveAssessmentResponses(
      input.id,
      input.data.responses
    );

    return {
      data: savedResponses,
      success: true,
    };
  }
);
