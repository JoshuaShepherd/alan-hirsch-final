import { createApiRoute, paginationInputSchema } from '@/lib/api/utils';
import { apiResponseSchema } from '@/lib/contracts/api-responses';
import {
  userAssessmentSchema,
  newUserAssessmentSchema,
  paginatedUserAssessmentListResponseSchema,
  userAssessmentResponseSchema,
} from '@/lib/contracts';
import { z } from 'zod';
import {
  getUserAssessmentsWithDetails,
  startUserAssessment,
} from '@/lib/db/queries/assessments';

// Input schema for user assessments
const userAssessmentsInputSchema = paginationInputSchema.extend({
  assessmentType: z.string().optional(),
  completed: z.boolean().optional(),
});

// GET /api/user/assessments - Get user's assessments
export const GET = createApiRoute(
  userAssessmentsInputSchema,
  paginatedUserAssessmentListResponseSchema,
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    const userAssessments = await getUserAssessmentsWithDetails(user.id);

    // Apply filters
    let filteredAssessments = userAssessments;

    if (input.assessmentType) {
      filteredAssessments = filteredAssessments.filter(
        ua => ua.assessment?.assessmentType === input.assessmentType
      );
    }

    if (input.completed !== undefined) {
      filteredAssessments = filteredAssessments.filter(ua =>
        input.completed ? !!ua.completedAt : !ua.completedAt
      );
    }

    // Apply pagination
    const page = input.page ?? 1;
    const limit = input.limit ?? 20;
    const offset = (page - 1) * limit;
    const paginatedAssessments = filteredAssessments.slice(
      offset,
      offset + limit
    );
    const total = filteredAssessments.length;

    // Create standardized response
    return {
      items: paginatedAssessments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
      success: true,
    };
  }
);

// Input schema for starting a new assessment
const startUserAssessmentInputSchema = z.object({
  assessmentId: z.string().uuid(),
});

// POST /api/user/assessments - Start a new assessment
export const POST = createApiRoute(
  startUserAssessmentInputSchema,
  apiResponseSchema(userAssessmentResponseSchema),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    // Check if user already has an incomplete assessment of this type
    const existingAssessments = await getUserAssessmentsWithDetails(user.id);
    const incompleteAssessment = existingAssessments.find(
      ua => ua.assessmentId === input.assessmentId && !ua.completedAt
    );

    if (incompleteAssessment) {
      throw new Error('You already have an incomplete assessment of this type');
    }

    const newUserAssessment = await startUserAssessment({
      ...input,
      userId: user.id,
      startedAt: new Date(),
      completionPercentage: 0,
      culturalAdjustmentApplied: false,
      suggestedPeers: [],
      complementaryGifts: [],
    });

    // Create standardized response
    return {
      data: newUserAssessment,
      success: true,
    };
  }
);
