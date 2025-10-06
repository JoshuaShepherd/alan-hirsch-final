// Assessment Database Queries
// Comprehensive query functions for the assessment system

// TODO: Fix import path for mappers
// import {
//   toAssessmentQuestionResponseDTO,
//   toAssessmentResponseDTO,
//   toAssessmentResponseResponseDTO,
//   toUserAssessmentResponseDTO,
//   toUserAssessmentWithDetailsResponseDTO,
// } from '@/lib/mappers/assessments';

// Temporary placeholder functions until mappers are available
const toAssessmentResponseDTO = (data: any) => data;
const toAssessmentQuestionResponseDTO = (data: any) => data;
const toAssessmentResponseResponseDTO = (data: any) => data;
const toUserAssessmentResponseDTO = (data: any) => data;
const toUserAssessmentWithDetailsResponseDTO = (
  data: any,
  assessment: any
) => ({ ...data, assessment });
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  userAssessments,
  userProfiles,
} from '../schema';
import type {
  NewAssessment,
  NewAssessmentQuestion,
  NewAssessmentResponse,
  NewUserAssessment,
} from '../schema/assessments';
import { hasResults } from '../type-guards';

// ============================================================================
// ASSESSMENT QUERIES
// ============================================================================

/**
 * Get all active assessments with optional filtering
 */
export async function getAssessments(filters?: {
  assessmentType?:
    | 'apest'
    | 'mdna'
    | 'cultural_intelligence'
    | 'leadership_style'
    | 'spiritual_gifts'
    | 'other';
  status?: 'draft' | 'active' | 'archived' | 'under_review';
  language?: string;
  culturalAdaptation?:
    | 'western'
    | 'eastern'
    | 'african'
    | 'latin_american'
    | 'middle_eastern'
    | 'oceanic'
    | 'universal'
    | 'global';
  researchBacked?: boolean;
}) {
  const conditions = [];

  if (filters?.assessmentType) {
    conditions.push(eq(assessments.assessmentType, filters.assessmentType));
  }
  if (filters?.status) {
    conditions.push(eq(assessments.status, filters.status));
  }
  if (filters?.language) {
    conditions.push(eq(assessments.language, filters.language));
  }
  if (filters?.culturalAdaptation) {
    conditions.push(
      eq(assessments.culturalAdaptation, filters.culturalAdaptation)
    );
  }
  if (filters?.researchBacked !== undefined) {
    conditions.push(eq(assessments.researchBacked, filters.researchBacked));
  }

  const results = await db
    .select()
    .from(assessments)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(assessments.publishedAt));

  return results.map(toAssessmentResponseDTO);
}

/**
 * Get a specific assessment by ID
 */
export async function getAssessmentById(assessmentId: string) {
  const results = await db
    .select()
    .from(assessments)
    .where(eq(assessments.id, assessmentId))
    .limit(1);

  return hasResults(results) ? toAssessmentResponseDTO(results[0]) : null;
}

/**
 * Get a specific assessment by slug
 */
export async function getAssessmentBySlug(slug: string) {
  const results = await db
    .select()
    .from(assessments)
    .where(eq(assessments.slug, slug))
    .limit(1);

  return hasResults(results) ? toAssessmentResponseDTO(results[0]) : null;
}

/**
 * Create a new assessment
 */
export async function createAssessment(assessmentData: NewAssessment) {
  const results = await db
    .insert(assessments)
    .values({
      ...assessmentData,
      // Convert decimal fields to strings
      validityScore: assessmentData.validityScore?.toString(),
      reliabilityScore: assessmentData.reliabilityScore?.toString(),
    })
    .returning();

  if (!hasResults(results)) {
    throw new Error('Failed to create assessment');
  }

  return toAssessmentResponseDTO(results[0]);
}

/**
 * Update an assessment
 */
export async function updateAssessment(
  assessmentId: string,
  updates: Partial<NewAssessment>
) {
  const results = await db
    .update(assessments)
    .set({
      ...updates,
      // Convert decimal fields to strings
      validityScore: updates.validityScore?.toString(),
      reliabilityScore: updates.reliabilityScore?.toString(),
      updatedAt: new Date(),
    })
    .where(eq(assessments.id, assessmentId))
    .returning();

  return hasResults(results) ? toAssessmentResponseDTO(results[0]) : null;
}

/**
 * Delete an assessment
 */
export async function deleteAssessment(assessmentId: string): Promise<boolean> {
  const result = await db
    .delete(assessments)
    .where(eq(assessments.id, assessmentId));

  return result.length > 0;
}

// ============================================================================
// ASSESSMENT QUESTION QUERIES
// ============================================================================

/**
 * Get all questions for a specific assessment
 */
export async function getAssessmentQuestions(assessmentId: string) {
  const results = await db
    .select()
    .from(assessmentQuestions)
    .where(eq(assessmentQuestions.assessmentId, assessmentId))
    .orderBy(asc(assessmentQuestions.orderIndex));

  return results.map(toAssessmentQuestionResponseDTO);
}

/**
 * Get a specific question by ID
 */
export async function getAssessmentQuestionById(questionId: string) {
  const results = await db
    .select()
    .from(assessmentQuestions)
    .where(eq(assessmentQuestions.id, questionId))
    .limit(1);

  return hasResults(results)
    ? toAssessmentQuestionResponseDTO(results[0])
    : null;
}

/**
 * Create a new assessment question
 */
export async function createAssessmentQuestion(
  questionData: NewAssessmentQuestion
) {
  const results = await db
    .insert(assessmentQuestions)
    .values({
      ...questionData,
      // Convert decimal fields to strings
      weight: questionData.weight?.toString(),
    })
    .returning();

  if (!hasResults(results)) {
    throw new Error('Failed to create assessment question');
  }

  return toAssessmentQuestionResponseDTO(results[0]);
}

/**
 * Update an assessment question
 */
export async function updateAssessmentQuestion(
  questionId: string,
  updates: Partial<NewAssessmentQuestion>
) {
  const results = await db
    .update(assessmentQuestions)
    .set({
      ...updates,
      // Convert decimal fields to strings
      weight: updates.weight?.toString(),
      updatedAt: new Date(),
    })
    .where(eq(assessmentQuestions.id, questionId))
    .returning();

  return hasResults(results)
    ? toAssessmentQuestionResponseDTO(results[0])
    : null;
}

/**
 * Delete an assessment question
 */
export async function deleteAssessmentQuestion(
  questionId: string
): Promise<boolean> {
  const result = await db
    .delete(assessmentQuestions)
    .where(eq(assessmentQuestions.id, questionId));

  return result.length > 0;
}

// ============================================================================
// USER ASSESSMENT QUERIES
// ============================================================================

/**
 * Get all assessments for a specific user
 */
export async function getUserAssessments(userId: string) {
  const results = await db
    .select()
    .from(userAssessments)
    .where(eq(userAssessments.userId, userId))
    .orderBy(desc(userAssessments.createdAt));

  return results.map(toUserAssessmentResponseDTO);
}

/**
 * Get all assessments for a specific user with assessment details
 */
export async function getUserAssessmentsWithDetails(userId: string) {
  const results = await db
    .select({
      userAssessment: userAssessments,
      assessment: assessments,
    })
    .from(userAssessments)
    .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
    .where(eq(userAssessments.userId, userId))
    .orderBy(desc(userAssessments.createdAt));

  return results.map(({ userAssessment, assessment }) =>
    toUserAssessmentWithDetailsResponseDTO(userAssessment, assessment)
  );
}

/**
 * Get a specific user assessment by ID
 */
export async function getUserAssessmentById(userAssessmentId: string) {
  const results = await db
    .select()
    .from(userAssessments)
    .where(eq(userAssessments.id, userAssessmentId))
    .limit(1);

  return hasResults(results) ? toUserAssessmentResponseDTO(results[0]) : null;
}

/**
 * Get user's assessment for a specific assessment type
 */
export async function getUserAssessmentByType(
  userId: string,
  assessmentId: string
) {
  const results = await db
    .select()
    .from(userAssessments)
    .where(
      and(
        eq(userAssessments.userId, userId),
        eq(userAssessments.assessmentId, assessmentId)
      )
    )
    .limit(1);

  return hasResults(results) ? toUserAssessmentResponseDTO(results[0]) : null;
}

/**
 * Start a new user assessment
 */
export async function startUserAssessment(
  userAssessmentData: NewUserAssessment
) {
  const results = await db
    .insert(userAssessments)
    .values({
      ...userAssessmentData,
      // Convert decimal fields to strings
      responseConsistency: userAssessmentData.responseConsistency?.toString(),
      culturalAdjustmentFactor:
        userAssessmentData.culturalAdjustmentFactor?.toString(),
    })
    .returning();

  if (!hasResults(results)) {
    throw new Error('Failed to create user assessment');
  }

  return toUserAssessmentResponseDTO(results[0]);
}

/**
 * Update a user assessment
 */
export async function updateUserAssessment(
  userAssessmentId: string,
  updates: Partial<NewUserAssessment>
) {
  const results = await db
    .update(userAssessments)
    .set({
      ...updates,
      // Convert decimal fields to strings
      responseConsistency: updates.responseConsistency?.toString(),
      culturalAdjustmentFactor: updates.culturalAdjustmentFactor?.toString(),
      updatedAt: new Date(),
    })
    .where(eq(userAssessments.id, userAssessmentId))
    .returning();

  return hasResults(results) ? toUserAssessmentResponseDTO(results[0]) : null;
}

/**
 * Complete a user assessment
 */
export async function completeUserAssessment(
  userAssessmentId: string,
  completionData: {
    completedAt: Date;
    completionPercentage: number;
    totalScore: number;
    maxPossibleScore: number;
    rawScores: Record<string, number>;
    normalizedScores: Record<string, number>;
    primaryGift?: string;
    secondaryGift?: string;
    completionTime: number;
    responseConsistency?: number;
    aiInsights?: string;
    personalizedRecommendations?: any;
  }
) {
  const results = await db
    .update(userAssessments)
    .set({
      ...completionData,
      // Convert decimal fields to strings
      responseConsistency: completionData.responseConsistency?.toString(),
      updatedAt: new Date(),
    })
    .where(eq(userAssessments.id, userAssessmentId))
    .returning();

  return hasResults(results) ? toUserAssessmentResponseDTO(results[0]) : null;
}

/**
 * Delete a user assessment
 */
export async function deleteUserAssessment(
  userAssessmentId: string
): Promise<boolean> {
  const result = await db
    .delete(userAssessments)
    .where(eq(userAssessments.id, userAssessmentId));

  return result.length > 0;
}

// ============================================================================
// ASSESSMENT RESPONSE QUERIES
// ============================================================================

/**
 * Get all responses for a user assessment
 */
export async function getAssessmentResponses(userAssessmentId: string) {
  const results = await db
    .select()
    .from(assessmentResponses)
    .where(eq(assessmentResponses.userAssessmentId, userAssessmentId))
    .orderBy(asc(assessmentResponses.createdAt));

  return results.map(toAssessmentResponseResponseDTO);
}

/**
 * Get a specific response by ID
 */
export async function getAssessmentResponseById(responseId: string) {
  const results = await db
    .select()
    .from(assessmentResponses)
    .where(eq(assessmentResponses.id, responseId))
    .limit(1);

  return hasResults(results)
    ? toAssessmentResponseResponseDTO(results[0])
    : null;
}

/**
 * Create a new assessment response
 */
export async function createAssessmentResponse(
  responseData: NewAssessmentResponse
) {
  const results = await db
    .insert(assessmentResponses)
    .values({
      ...responseData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  if (!hasResults(results)) {
    throw new Error('Failed to create assessment response');
  }

  return toAssessmentResponseResponseDTO(results[0]);
}

/**
 * Update an assessment response
 */
export async function updateAssessmentResponse(
  responseId: string,
  updates: Partial<NewAssessmentResponse>
) {
  const results = await db
    .update(assessmentResponses)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(assessmentResponses.id, responseId))
    .returning();

  return hasResults(results)
    ? toAssessmentResponseResponseDTO(results[0])
    : null;
}

/**
 * Delete an assessment response
 */
export async function deleteAssessmentResponse(
  responseId: string
): Promise<boolean> {
  const result = await db
    .delete(assessmentResponses)
    .where(eq(assessmentResponses.id, responseId));

  return result.length > 0;
}

/**
 * Save multiple responses for a user assessment
 */
export async function saveAssessmentResponses(
  userAssessmentId: string,
  responses: Array<{
    questionId: string;
    responseValue?: number;
    responseText?: string;
    responseTime?: number;
    confidence?: number;
    skipped?: boolean;
  }>
) {
  // Delete existing responses for this assessment
  await db
    .delete(assessmentResponses)
    .where(eq(assessmentResponses.userAssessmentId, userAssessmentId));

  // Insert new responses
  const responseData = responses.map(response => ({
    userAssessmentId,
    ...response,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const newResponses = await db
    .insert(assessmentResponses)
    .values(responseData)
    .returning();
  return newResponses.map(toAssessmentResponseResponseDTO);
}

// ============================================================================
// ANALYTICS & REPORTING QUERIES
// ============================================================================

/**
 * Get assessment completion statistics
 */
export async function getAssessmentStats(assessmentId: string) {
  const stats = await db
    .select({
      totalAttempts: sql<number>`COUNT(*)`,
      completedAttempts: sql<number>`COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END)`,
      averageScore: sql<number>`AVG(total_score)`,
      averageCompletionTime: sql<number>`AVG(completion_time)`,
    })
    .from(userAssessments)
    .where(eq(userAssessments.assessmentId, assessmentId));

  return (
    stats[0] || {
      totalAttempts: 0,
      completedAttempts: 0,
      averageScore: 0,
      averageCompletionTime: 0,
    }
  );
}

/**
 * Get APEST score distribution for an assessment
 */
export async function getApestScoreDistribution(assessmentId: string) {
  const scores = await db
    .select({
      apostolic: sql<number>`AVG(apostolic_score)`,
      prophetic: sql<number>`AVG(prophetic_score)`,
      evangelistic: sql<number>`AVG(evangelistic_score)`,
      shepherding: sql<number>`AVG(shepherding_score)`,
      teaching: sql<number>`AVG(teaching_score)`,
    })
    .from(userAssessments)
    .where(
      and(
        eq(userAssessments.assessmentId, assessmentId),
        sql`completed_at IS NOT NULL`
      )
    );

  return (
    scores[0] || {
      apostolic: 0,
      prophetic: 0,
      evangelistic: 0,
      shepherding: 0,
      teaching: 0,
    }
  );
}

/**
 * Get users with similar APEST profiles
 */
export async function getSimilarApestProfiles(
  userId: string,
  userAssessmentId: string,
  limit: number = 10
) {
  const userProfile = await getUserAssessmentById(userAssessmentId);
  if (!userProfile?.primaryGift) return [];

  // Get users with similar APEST scores (within 10 points)
  const results = await db
    .select({
      userAssessment: userAssessments,
      user: userProfiles,
    })
    .from(userAssessments)
    .innerJoin(userProfiles, eq(userAssessments.userId, userProfiles.id))
    .where(
      and(
        eq(userAssessments.assessmentId, userProfile.assessmentId),
        sql`completed_at IS NOT NULL`,
        sql`user_id != ${userId}`,
        // Similar primary gift
        sql`primary_gift = ${userProfile.primaryGift}`
      )
    )
    .limit(limit);

  return results.map(({ userAssessment, user }) => ({
    id: userAssessment.id,
    userId: userAssessment.userId,
    primaryGift: userAssessment.primaryGift ?? '',
    secondaryGift: userAssessment.secondaryGift ?? '',
    apostolicScore: userAssessment.apostolicScore ?? 0,
    propheticScore: userAssessment.propheticScore ?? 0,
    evangelisticScore: userAssessment.evangelisticScore ?? 0,
    shepherdingScore: userAssessment.shepherdingScore ?? 0,
    teachingScore: userAssessment.teachingScore ?? 0,
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      displayName: user.displayName ?? '',
      avatarUrl: user.avatarUrl ?? '',
    },
  }));
}
