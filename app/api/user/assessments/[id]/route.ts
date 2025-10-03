import { createApiRoute, idInputSchema } from '@/lib/api/utils';
import { userAssessmentResponseSchema } from '@/lib/contracts';
import { apiResponseSchema } from '@/lib/contracts/api-responses';
import { z } from 'zod';
import {
  getUserAssessmentById,
  updateUserAssessment,
  completeUserAssessment,
  deleteUserAssessment,
} from '@/lib/db/queries/assessments';

// Input schema for updating user assessment
const updateUserAssessmentInputSchema = z.object({
  completionPercentage: z.number().int().min(0).max(100).optional(),
  totalScore: z.number().int().min(0).optional(),
  maxPossibleScore: z.number().int().min(0).optional(),
  rawScores: z.record(z.string(), z.number()).optional(),
  normalizedScores: z.record(z.string(), z.number()).optional(),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  completionTime: z.number().int().min(0).optional(),
  responseConsistency: z.string().optional(),
  confidenceLevel: z.number().int().min(1).max(5).optional(),
  culturalAdjustmentApplied: z.boolean().optional(),
  culturalAdjustmentFactor: z.string().optional(),
  aiInsights: z.string().optional(),
  personalizedRecommendations: z
    .object({
      strengths: z.array(z.string()),
      growthAreas: z.array(z.string()),
      actionItems: z.array(z.string()),
      contentRecommendations: z.array(z.string()),
    })
    .optional(),
  suggestedPeers: z.array(z.string()).optional(),
  complementaryGifts: z.array(z.string()).optional(),
});

// Input schema for completing assessment
const completeAssessmentInputSchema = z.object({
  completedAt: z.string().datetime().optional(), // Will be set to now if not provided
  totalScore: z.number().int().min(0),
  maxPossibleScore: z.number().int().min(0),
  rawScores: z.record(z.string(), z.number()),
  normalizedScores: z.record(z.string(), z.number()),
  primaryGift: z.string().optional(),
  secondaryGift: z.string().optional(),
  completionTime: z.number().int().min(0),
  responseConsistency: z.string().optional(),
  aiInsights: z.string().optional(),
  personalizedRecommendations: z
    .object({
      strengths: z.array(z.string()),
      growthAreas: z.array(z.string()),
      actionItems: z.array(z.string()),
      contentRecommendations: z.array(z.string()),
    })
    .optional(),
});

// GET /api/user/assessments/[id] - Get specific user assessment
export const GET = createApiRoute(
  idInputSchema,
  apiResponseSchema(userAssessmentResponseSchema),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    const userAssessment = await getUserAssessmentById(input.id);

    if (!userAssessment) {
      throw new Error('Assessment not found');
    }

    // Ensure user can only access their own assessments
    if (userAssessment.userId !== user.id) {
      throw new Error('Access denied');
    }

    return {
      data: userAssessment,
      success: true,
    };
  }
);

// PUT /api/user/assessments/[id] - Update user assessment
export const PUT = createApiRoute(
  idInputSchema.extend({
    data: updateUserAssessmentInputSchema,
  }),
  apiResponseSchema(userAssessmentResponseSchema),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    const existingAssessment = await getUserAssessmentById(input.id);

    if (!existingAssessment) {
      throw new Error('Assessment not found');
    }

    // Ensure user can only update their own assessments
    if (existingAssessment.userId !== user.id) {
      throw new Error('Access denied');
    }

    const updatedAssessment = await updateUserAssessment(
      input.id,
      input.data as any
    );

    if (!updatedAssessment) {
      throw new Error('Failed to update assessment');
    }

    return {
      data: updatedAssessment,
      success: true,
    };
  }
);

// POST /api/user/assessments/[id]/complete - Complete user assessment
export const POST = createApiRoute(
  idInputSchema.extend({
    data: completeAssessmentInputSchema,
  }),
  apiResponseSchema(userAssessmentResponseSchema),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    const existingAssessment = await getUserAssessmentById(input.id);

    if (!existingAssessment) {
      throw new Error('Assessment not found');
    }

    // Ensure user can only complete their own assessments
    if (existingAssessment.userId !== user.id) {
      throw new Error('Access denied');
    }

    // Check if already completed
    if (existingAssessment.completedAt) {
      throw new Error('Assessment already completed');
    }

    const completionData = {
      completedAt: input.data.completedAt
        ? new Date(input.data.completedAt)
        : new Date(),
      completionPercentage: 100,
      totalScore: input.data.totalScore,
      maxPossibleScore: input.data.maxPossibleScore,
      rawScores: input.data.rawScores,
      normalizedScores: input.data.normalizedScores,
      primaryGift: input.data.primaryGift,
      secondaryGift: input.data.secondaryGift,
      completionTime: input.data.completionTime,
      responseConsistency: input.data.responseConsistency,
      aiInsights: input.data.aiInsights,
      personalizedRecommendations: input.data.personalizedRecommendations,
    };

    const completedAssessment = await completeUserAssessment(
      input.id,
      completionData
    );

    if (!completedAssessment) {
      throw new Error('Failed to complete assessment');
    }

    return {
      data: completedAssessment,
      success: true,
    };
  }
);

// DELETE /api/user/assessments/[id] - Delete user assessment
export const DELETE = createApiRoute(
  idInputSchema,
  z.object({ success: z.boolean() }),
  async (input, { user }) => {
    if (!user) {
      throw new Error('Authentication required');
    }

    const existingAssessment = await getUserAssessmentById(input.id);

    if (!existingAssessment) {
      throw new Error('Assessment not found');
    }

    // Ensure user can only delete their own assessments
    if (existingAssessment.userId !== user.id) {
      throw new Error('Access denied');
    }

    const deleted = await deleteUserAssessment(input.id);

    if (!deleted) {
      throw new Error('Failed to delete assessment');
    }

    return {
      data: { success: true },
      success: true,
    };
  }
);
