import { toUserAssessmentResponseDTO } from '@/lib/mappers/assessment';
import {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  userAssessments,
} from '@platform/database';
import { createApiRoute, idInputSchema } from '@platform/shared/api/utils';
import { userAssessmentWithDetailsResponseSchema } from '@platform/shared/contracts';
import { and, eq } from 'drizzle-orm';
import { z } from 'zod';

// Response schemas
const completedAssessmentResponseSchema = z.object({
  data: userAssessmentWithDetailsResponseSchema.extend({
    results: z.object({
      totalScore: z.number(),
      maxPossibleScore: z.number(),
      completionPercentage: z.number().nullable(),
      primaryGift: z.string().nullable(),
      secondaryGift: z.string().nullable(),
      apestScores: z
        .object({
          apostolic: z.number().nullable(),
          prophetic: z.number().nullable(),
          evangelistic: z.number().nullable(),
          shepherding: z.number().nullable(),
          teaching: z.number().nullable(),
        })
        .nullable(),
    }),
  }),
  success: z.boolean(),
});

// POST /api/user/assessments/[id]/complete - Complete assessment and calculate results
export const POST = createApiRoute(
  idInputSchema,
  completedAssessmentResponseSchema,
  async (input, { user, db }) => {
    // Verify user owns this assessment
    const userAssessment = await db
      .select()
      .from(userAssessments)
      .where(
        and(
          eq(userAssessments.id, input.id),
          eq(userAssessments.userId, user.id)
        )
      )
      .limit(1);

    const currentAssessment = userAssessment[0];
    if (!currentAssessment) {
      throw new Error('Assessment not found or access denied');
    }

    if (currentAssessment.completedAt) {
      throw new Error('Assessment already completed');
    }

    // Get assessment details
    const assessment = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, currentAssessment.assessmentId))
      .limit(1);

    if (!assessment[0]) {
      throw new Error('Assessment not found');
    }

    const assessmentDetails = assessment[0];

    // Get all responses for this assessment
    const responses = await db
      .select({
        questionId: assessmentResponses.questionId,
        responseValue: assessmentResponses.responseValue,
        responseText: assessmentResponses.responseText,
        skipped: assessmentResponses.skipped,
      })
      .from(assessmentResponses)
      .where(eq(assessmentResponses.userAssessmentId, input.id));

    // Get questions with APEST mapping
    const questions = await db
      .select({
        id: assessmentQuestions.id,
        apestDimension: assessmentQuestions.apestDimension,
        weight: assessmentQuestions.weight,
        reverseScored: assessmentQuestions.reverseScored,
      })
      .from(assessmentQuestions)
      .where(eq(assessmentQuestions.assessmentId, assessmentDetails.id));

    // Calculate scores
    let totalScore = 0;
    let maxPossibleScore = 0;
    const apestScores: Record<string, number> = {
      apostolic: 0,
      prophetic: 0,
      evangelistic: 0,
      shepherding: 0,
      teaching: 0,
    };
    const apestCounts: Record<string, number> = {
      apostolic: 0,
      prophetic: 0,
      evangelistic: 0,
      shepherding: 0,
      teaching: 0,
    };

    // Process each question
    for (const question of questions) {
      const response = responses.find(r => r.questionId === question.id);
      const weight = parseFloat(question.weight || '1.0');

      if (response && !response.skipped && response.responseValue !== null) {
        let score = response.responseValue;
        if (question.reverseScored) {
          // Reverse score (assuming 1-5 scale)
          score = 6 - score;
        }

        totalScore += score * weight;
        maxPossibleScore += 5 * weight; // Assuming max score of 5

        // Add to APEST dimension if applicable
        const dimension = question.apestDimension;
        if (dimension && dimension in apestScores) {
          // TypeScript assertion: we've already checked dimension exists and is in apestScores
          (apestScores as any)[dimension] += score * weight;
          (apestCounts as any)[dimension] += weight;
        }
      }
    }

    // Calculate average APEST scores
    const apestAverages: Record<string, number> = {};
    for (const [dimension, count] of Object.entries(apestCounts)) {
      if (count > 0) {
        apestAverages[dimension] = Math.round(
          (apestScores as any)[dimension] / count
        );
      }
    }

    // Determine primary and secondary gifts
    const sortedApes = Object.entries(apestAverages)
      .sort(([, a], [, b]) => b - a)
      .map(([dimension]) => dimension);

    const primaryGift = sortedApes[0] || null;
    const secondaryGift = sortedApes[1] || null;

    // Update user assessment with results
    const updatedAssessments = await db
      .update(userAssessments)
      .set({
        completedAt: new Date(),
        totalScore: Math.round(totalScore),
        maxPossibleScore: Math.round(maxPossibleScore),
        completionPercentage: 100,
        apostolicScore: apestAverages['apostolic'] || 0,
        propheticScore: apestAverages['prophetic'] || 0,
        evangelisticScore: apestAverages['evangelistic'] || 0,
        shepherdingScore: apestAverages['shepherding'] || 0,
        teachingScore: apestAverages['teaching'] || 0,
        primaryGift,
        secondaryGift,
        updatedAt: new Date(),
      })
      .where(eq(userAssessments.id, input.id))
      .returning();

    // Ensure we have a valid assessment
    if (!updatedAssessments || updatedAssessments.length === 0) {
      throw new Error('Failed to update user assessment');
    }

    const updatedAssessment = updatedAssessments[0];
    if (!updatedAssessment) {
      throw new Error('Failed to update user assessment');
    }

    // Map to DTO using the shared mapper
    const userAssessmentDTO = toUserAssessmentResponseDTO(updatedAssessment);

    return {
      data: {
        ...userAssessmentDTO,
        assessment: {
          id: assessmentDetails.id,
          name: assessmentDetails.name,
          slug: assessmentDetails.slug,
          assessmentType: assessmentDetails.assessmentType,
          questionsCount: assessmentDetails.questionsCount,
          estimatedDuration: assessmentDetails.estimatedDuration,
        },
        results: {
          totalScore: Math.round(totalScore),
          maxPossibleScore: Math.round(maxPossibleScore),
          completionPercentage: 100,
          primaryGift,
          secondaryGift,
          apestScores: {
            apostolic: apestAverages['apostolic'] || null,
            prophetic: apestAverages['prophetic'] || null,
            evangelistic: apestAverages['evangelistic'] || null,
            shepherding: apestAverages['shepherding'] || null,
            teaching: apestAverages['teaching'] || null,
          },
        },
      },
      success: true,
    };
  }
);
