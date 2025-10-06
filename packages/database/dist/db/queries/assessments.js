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
const toAssessmentResponseDTO = (data) => data;
const toAssessmentQuestionResponseDTO = (data) => data;
const toAssessmentResponseResponseDTO = (data) => data;
const toUserAssessmentResponseDTO = (data) => data;
const toUserAssessmentWithDetailsResponseDTO = (data, assessment) => ({ ...data, assessment });
import { and, asc, desc, eq, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import { assessmentQuestions, assessmentResponses, assessments, userAssessments, userProfiles, } from '../schema';
import { hasResults } from '../type-guards';
// ============================================================================
// ASSESSMENT QUERIES
// ============================================================================
/**
 * Get all active assessments with optional filtering
 */
export async function getAssessments(filters) {
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
        conditions.push(eq(assessments.culturalAdaptation, filters.culturalAdaptation));
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
export async function getAssessmentById(assessmentId) {
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
export async function getAssessmentBySlug(slug) {
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
export async function createAssessment(assessmentData) {
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
export async function updateAssessment(assessmentId, updates) {
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
export async function deleteAssessment(assessmentId) {
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
export async function getAssessmentQuestions(assessmentId) {
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
export async function getAssessmentQuestionById(questionId) {
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
export async function createAssessmentQuestion(questionData) {
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
export async function updateAssessmentQuestion(questionId, updates) {
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
export async function deleteAssessmentQuestion(questionId) {
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
export async function getUserAssessments(userId) {
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
export async function getUserAssessmentsWithDetails(userId) {
    const results = await db
        .select({
        userAssessment: userAssessments,
        assessment: assessments,
    })
        .from(userAssessments)
        .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
        .where(eq(userAssessments.userId, userId))
        .orderBy(desc(userAssessments.createdAt));
    return results.map(({ userAssessment, assessment }) => toUserAssessmentWithDetailsResponseDTO(userAssessment, assessment));
}
/**
 * Get a specific user assessment by ID
 */
export async function getUserAssessmentById(userAssessmentId) {
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
export async function getUserAssessmentByType(userId, assessmentId) {
    const results = await db
        .select()
        .from(userAssessments)
        .where(and(eq(userAssessments.userId, userId), eq(userAssessments.assessmentId, assessmentId)))
        .limit(1);
    return hasResults(results) ? toUserAssessmentResponseDTO(results[0]) : null;
}
/**
 * Start a new user assessment
 */
export async function startUserAssessment(userAssessmentData) {
    const results = await db
        .insert(userAssessments)
        .values({
        ...userAssessmentData,
        // Convert decimal fields to strings
        responseConsistency: userAssessmentData.responseConsistency?.toString(),
        culturalAdjustmentFactor: userAssessmentData.culturalAdjustmentFactor?.toString(),
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
export async function updateUserAssessment(userAssessmentId, updates) {
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
export async function completeUserAssessment(userAssessmentId, completionData) {
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
export async function deleteUserAssessment(userAssessmentId) {
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
export async function getAssessmentResponses(userAssessmentId) {
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
export async function getAssessmentResponseById(responseId) {
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
export async function createAssessmentResponse(responseData) {
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
export async function updateAssessmentResponse(responseId, updates) {
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
export async function deleteAssessmentResponse(responseId) {
    const result = await db
        .delete(assessmentResponses)
        .where(eq(assessmentResponses.id, responseId));
    return result.length > 0;
}
/**
 * Save multiple responses for a user assessment
 */
export async function saveAssessmentResponses(userAssessmentId, responses) {
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
export async function getAssessmentStats(assessmentId) {
    const stats = await db
        .select({
        totalAttempts: sql `COUNT(*)`,
        completedAttempts: sql `COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END)`,
        averageScore: sql `AVG(total_score)`,
        averageCompletionTime: sql `AVG(completion_time)`,
    })
        .from(userAssessments)
        .where(eq(userAssessments.assessmentId, assessmentId));
    return (stats[0] || {
        totalAttempts: 0,
        completedAttempts: 0,
        averageScore: 0,
        averageCompletionTime: 0,
    });
}
/**
 * Get APEST score distribution for an assessment
 */
export async function getApestScoreDistribution(assessmentId) {
    const scores = await db
        .select({
        apostolic: sql `AVG(apostolic_score)`,
        prophetic: sql `AVG(prophetic_score)`,
        evangelistic: sql `AVG(evangelistic_score)`,
        shepherding: sql `AVG(shepherding_score)`,
        teaching: sql `AVG(teaching_score)`,
    })
        .from(userAssessments)
        .where(and(eq(userAssessments.assessmentId, assessmentId), sql `completed_at IS NOT NULL`));
    return (scores[0] || {
        apostolic: 0,
        prophetic: 0,
        evangelistic: 0,
        shepherding: 0,
        teaching: 0,
    });
}
/**
 * Get users with similar APEST profiles
 */
export async function getSimilarApestProfiles(userId, userAssessmentId, limit = 10) {
    const userProfile = await getUserAssessmentById(userAssessmentId);
    if (!userProfile?.primaryGift)
        return [];
    // Get users with similar APEST scores (within 10 points)
    const results = await db
        .select({
        userAssessment: userAssessments,
        user: userProfiles,
    })
        .from(userAssessments)
        .innerJoin(userProfiles, eq(userAssessments.userId, userProfiles.id))
        .where(and(eq(userAssessments.assessmentId, userProfile.assessmentId), sql `completed_at IS NOT NULL`, sql `user_id != ${userId}`, 
    // Similar primary gift
    sql `primary_gift = ${userProfile.primaryGift}`))
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
//# sourceMappingURL=assessments.js.map