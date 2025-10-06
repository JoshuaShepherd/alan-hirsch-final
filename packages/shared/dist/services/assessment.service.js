import { assessmentQuestionEntitySchema as databaseAssessmentQuestionSchema, assessmentResponseEntitySchema as databaseAssessmentResponseSchema, assessmentEntitySchema as databaseAssessmentSchema, userAssessmentEntitySchema as databaseUserAssessmentSchema, } from '@platform/contracts/entities/assessment.schema';
import { createAssessmentQuestionSchema as newAssessmentQuestionSchema, createAssessmentResponseSchema as newAssessmentResponseSchema, createAssessmentSchema as newAssessmentSchema, createUserAssessmentSchema as newUserAssessmentSchema, assessmentQuestionQuerySchema as queryAssessmentQuestionSchema, assessmentResponseQuerySchema as queryAssessmentResponseSchema, assessmentQuerySchema as queryAssessmentSchema, UpdateAssessmentQuestionOperationSchema as updateAssessmentQuestionSchema, UpdateAssessmentResponseOperationSchema as updateAssessmentResponseSchema, UpdateAssessmentOperationSchema as updateAssessmentSchema, CompleteUserAssessmentOperationSchema as updateUserAssessmentSchema, } from '@platform/contracts/operations/assessment.operations';
import { db } from '@platform/database/db/drizzle';
import { assessmentQuestions, assessmentResponses, assessments, userAssessments, } from '@platform/database/db/schema';
import { and, desc, eq, sql } from 'drizzle-orm';
import { BaseService } from './base.service';
// ============================================================================
// ASSESSMENT SERVICE
// ============================================================================
export class AssessmentService extends BaseService {
    table = assessments;
    entityName = 'Assessment';
    createSchema = newAssessmentSchema;
    updateSchema = updateAssessmentSchema;
    querySchema = queryAssessmentSchema;
    outputSchema = databaseAssessmentSchema;
    /**
     * Find assessment by slug
     */
    async findBySlug(slug) {
        try {
            const [result] = await db
                .select()
                .from(assessments)
                .where(eq(assessments.slug, slug))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findBySlug');
        }
    }
    /**
     * Find active assessments
     */
    async findActive() {
        try {
            const results = await db
                .select()
                .from(assessments)
                .where(eq(assessments.status, 'active'))
                .orderBy(assessments.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findActive');
        }
    }
    /**
     * Find assessments by type
     */
    async findByType(assessmentType) {
        try {
            const results = await db
                .select()
                .from(assessments)
                .where(and(eq(assessments.assessmentType, assessmentType), eq(assessments.status, 'active')))
                .orderBy(assessments.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByType');
        }
    }
    /**
     * Find assessments by language
     */
    async findByLanguage(language) {
        try {
            const results = await db
                .select()
                .from(assessments)
                .where(and(eq(assessments.language, language), eq(assessments.status, 'active')))
                .orderBy(assessments.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByLanguage');
        }
    }
    /**
     * Find assessments by cultural adaptation
     */
    async findByCulturalAdaptation(culturalAdaptation) {
        try {
            const results = await db
                .select()
                .from(assessments)
                .where(and(eq(assessments.culturalAdaptation, culturalAdaptation), eq(assessments.status, 'active')))
                .orderBy(assessments.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByCulturalAdaptation');
        }
    }
    /**
     * Find research-backed assessments
     */
    async findResearchBacked() {
        try {
            const results = await db
                .select()
                .from(assessments)
                .where(and(eq(assessments.researchBacked, true), eq(assessments.status, 'active')))
                .orderBy(assessments.name);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findResearchBacked');
        }
    }
    /**
     * Get assessment with questions
     */
    async findWithQuestions(assessmentId) {
        try {
            const [assessmentResult] = await db
                .select()
                .from(assessments)
                .where(eq(assessments.id, assessmentId))
                .limit(1);
            if (!assessmentResult)
                return null;
            const questionsResults = await db
                .select()
                .from(assessmentQuestions)
                .where(eq(assessmentQuestions.assessmentId, assessmentId))
                .orderBy(assessmentQuestions.orderIndex);
            const assessment = this.outputSchema.parse(assessmentResult);
            const questions = questionsResults.map(q => databaseAssessmentQuestionSchema.parse(q));
            return { assessment, questions };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findWithQuestions');
        }
    }
    /**
     * Get assessment statistics
     */
    async getAssessmentStats(assessmentId) {
        try {
            const [questionCount] = await db
                .select({ count: sql `count(*)` })
                .from(assessmentQuestions)
                .where(eq(assessmentQuestions.assessmentId, assessmentId));
            const [completionStats] = await db
                .select({
                totalCompletions: sql `count(case when completed_at is not null then 1 end)`,
                averageCompletionTime: sql `avg(completion_time)`,
                averageScore: sql `avg(total_score)`,
            })
                .from(userAssessments)
                .where(eq(userAssessments.assessmentId, assessmentId));
            return {
                totalQuestions: questionCount?.count || 0,
                totalCompletions: completionStats?.totalCompletions || 0,
                averageCompletionTime: completionStats?.averageCompletionTime || 0,
                averageScore: completionStats?.averageScore || 0,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getAssessmentStats');
        }
    }
}
// ============================================================================
// ASSESSMENT QUESTION SERVICE
// ============================================================================
export class AssessmentQuestionService extends BaseService {
    table = assessmentQuestions;
    entityName = 'AssessmentQuestion';
    createSchema = newAssessmentQuestionSchema;
    updateSchema = updateAssessmentQuestionSchema;
    querySchema = queryAssessmentQuestionSchema;
    outputSchema = databaseAssessmentQuestionSchema;
    /**
     * Find questions by assessment
     */
    async findByAssessment(assessmentId) {
        try {
            const results = await db
                .select()
                .from(assessmentQuestions)
                .where(eq(assessmentQuestions.assessmentId, assessmentId))
                .orderBy(assessmentQuestions.orderIndex);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByAssessment');
        }
    }
    /**
     * Find questions by APEST dimension
     */
    async findByAPESTDimension(dimension) {
        try {
            const results = await db
                .select()
                .from(assessmentQuestions)
                .where(eq(assessmentQuestions.apestDimension, dimension))
                .orderBy(assessmentQuestions.orderIndex);
            return results.map(result => databaseAssessmentQuestionSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByAPESTDimension');
        }
    }
    /**
     * Find required questions for an assessment
     */
    async findRequiredQuestions(assessmentId) {
        try {
            const results = await db
                .select()
                .from(assessmentQuestions)
                .where(and(eq(assessmentQuestions.assessmentId, assessmentId), eq(assessmentQuestions.isRequired, true)))
                .orderBy(assessmentQuestions.orderIndex);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findRequiredQuestions');
        }
    }
    /**
     * Update question order
     */
    async updateQuestionOrder(questionId, newOrder) {
        try {
            const [result] = await db
                .update(assessmentQuestions)
                .set({
                orderIndex: newOrder,
                updatedAt: new Date(),
            })
                .where(eq(assessmentQuestions.id, questionId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'updateQuestionOrder');
        }
    }
    /**
     * Get questions with response statistics
     */
    async getQuestionsWithStats(assessmentId) {
        try {
            const questions = await this.findByAssessment(assessmentId);
            const questionsWithStats = await Promise.all(questions.map(async (question) => {
                const [stats] = await db
                    .select({
                    responseCount: sql `count(*)`,
                    averageResponse: sql `avg(response_value)`,
                    skipRate: sql `count(case when skipped = true then 1 end)::float / count(*) * 100`,
                })
                    .from(assessmentResponses)
                    .innerJoin(userAssessments, eq(assessmentResponses.userAssessmentId, userAssessments.id))
                    .where(and(eq(assessmentResponses.questionId, question.id), eq(userAssessments.assessmentId, assessmentId)));
                return {
                    ...question,
                    responseCount: stats?.responseCount || 0,
                    averageResponse: stats?.averageResponse || 0,
                    skipRate: stats?.skipRate || 0,
                };
            }));
            return questionsWithStats;
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getQuestionsWithStats');
        }
    }
}
// ============================================================================
// USER ASSESSMENT SERVICE
// ============================================================================
export class UserAssessmentService extends BaseService {
    table = userAssessments;
    entityName = 'UserAssessment';
    createSchema = newUserAssessmentSchema;
    updateSchema = updateUserAssessmentSchema;
    querySchema = queryAssessmentResponseSchema;
    outputSchema = databaseUserAssessmentSchema;
    /**
     * Find user assessment by user and assessment
     */
    async findByUserAndAssessment(userId, assessmentId) {
        try {
            const [result] = await db
                .select()
                .from(userAssessments)
                .where(and(eq(userAssessments.userId, userId), eq(userAssessments.assessmentId, assessmentId)))
                .orderBy(desc(userAssessments.startedAt))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByUserAndAssessment');
        }
    }
    /**
     * Find user assessments by user
     */
    async findByUser(userId) {
        try {
            const results = await db
                .select({
                userAssessment: userAssessments,
                assessment: assessments,
            })
                .from(userAssessments)
                .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
                .where(eq(userAssessments.userId, userId))
                .orderBy(desc(userAssessments.completedAt));
            return results.map(({ userAssessment, assessment }) => ({
                ...this.outputSchema.parse(userAssessment),
                assessment: databaseAssessmentSchema.parse(assessment),
            }));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByUser');
        }
    }
    /**
     * Find completed user assessments by user
     */
    async findCompletedByUser(userId) {
        try {
            const results = await db
                .select({
                userAssessment: userAssessments,
                assessment: assessments,
            })
                .from(userAssessments)
                .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
                .where(and(eq(userAssessments.userId, userId), sql `${userAssessments.completedAt} IS NOT NULL`))
                .orderBy(desc(userAssessments.completedAt));
            return results.map(({ userAssessment, assessment }) => ({
                ...this.outputSchema.parse(userAssessment),
                assessment: databaseAssessmentSchema.parse(assessment),
            }));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findCompletedByUser');
        }
    }
    /**
     * Find latest incomplete assessment for user
     */
    async findLatestIncomplete(userId, assessmentType) {
        try {
            const whereConditions = [
                eq(userAssessments.userId, userId),
                sql `${userAssessments.completedAt} IS NULL`,
            ];
            if (assessmentType) {
                whereConditions.push(eq(assessments.assessmentType, assessmentType));
            }
            const [result] = await db
                .select({
                userAssessment: userAssessments,
                assessment: assessments,
            })
                .from(userAssessments)
                .innerJoin(assessments, eq(userAssessments.assessmentId, assessments.id))
                .where(and(...whereConditions))
                .orderBy(desc(userAssessments.startedAt))
                .limit(1);
            if (!result)
                return null;
            return {
                userAssessment: this.outputSchema.parse(result.userAssessment),
                assessment: databaseAssessmentSchema.parse(result.assessment),
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findLatestIncomplete');
        }
    }
    /**
     * Start a new assessment for user
     */
    async startAssessment(userId, assessmentId) {
        try {
            // Check if user already has an incomplete assessment
            const existing = await this.findLatestIncomplete(userId);
            if (existing) {
                throw new Error('User already has an incomplete assessment');
            }
            const [result] = await db
                .insert(userAssessments)
                .values({
                userId,
                assessmentId,
                startedAt: new Date(),
                completionPercentage: 0,
            })
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            if (error instanceof Error &&
                error.message.includes('already has an incomplete')) {
                throw error;
            }
            throw this.handleDatabaseError(error, 'startAssessment');
        }
    }
    /**
     * Complete an assessment
     */
    async completeAssessment(userAssessmentId, completionData) {
        try {
            const [result] = await db
                .update(userAssessments)
                .set({
                totalScore: completionData.totalScore,
                maxPossibleScore: completionData.maxPossibleScore,
                apostolicScore: completionData.apostolicScore,
                propheticScore: completionData.propheticScore,
                evangelisticScore: completionData.evangelisticScore,
                shepherdingScore: completionData.shepherdingScore,
                teachingScore: completionData.teachingScore,
                normalizedScores: completionData.normalizedScores,
                primaryGift: completionData.primaryGift,
                secondaryGift: completionData.secondaryGift,
                responseConsistency: completionData.responseConsistency !== undefined
                    ? completionData.responseConsistency.toString()
                    : null,
                confidenceLevel: completionData.confidenceLevel !== undefined
                    ? completionData.confidenceLevel
                    : null,
                completionTime: completionData.completionTime,
                culturalAdjustmentApplied: completionData.culturalAdjustmentApplied,
                culturalAdjustmentFactor: completionData.culturalAdjustmentFactor?.toString(),
                aiInsights: completionData.aiInsights
                    ? JSON.stringify(completionData.aiInsights)
                    : null,
                personalizedRecommendations: completionData.personalizedRecommendations
                    ? {
                        strengths: completionData.personalizedRecommendations,
                        growthAreas: [],
                        actionItems: [],
                        contentRecommendations: [],
                    }
                    : undefined,
                completedAt: new Date(),
                completionPercentage: 100,
                updatedAt: new Date(),
            })
                .where(eq(userAssessments.id, userAssessmentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'completeAssessment');
        }
    }
    /**
     * Update assessment progress
     */
    async updateProgress(userAssessmentId, progressData) {
        try {
            const [result] = await db
                .update(userAssessments)
                .set({
                ...progressData,
                responseConsistency: progressData.responseConsistency !== undefined
                    ? progressData.responseConsistency.toString()
                    : null,
                confidenceLevel: progressData.confidenceLevel !== undefined
                    ? progressData.confidenceLevel
                    : null,
                updatedAt: new Date(),
            })
                .where(eq(userAssessments.id, userAssessmentId))
                .returning();
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'updateProgress');
        }
    }
    /**
     * Get user assessment with responses
     */
    async findWithResponses(userAssessmentId) {
        try {
            const [userAssessmentResult] = await db
                .select()
                .from(userAssessments)
                .where(eq(userAssessments.id, userAssessmentId))
                .limit(1);
            if (!userAssessmentResult)
                return null;
            const responsesResults = await db
                .select()
                .from(assessmentResponses)
                .where(eq(assessmentResponses.userAssessmentId, userAssessmentId))
                .orderBy(assessmentResponses.createdAt);
            return {
                userAssessment: this.outputSchema.parse(userAssessmentResult),
                responses: responsesResults.map(r => databaseAssessmentResponseSchema.parse(r)),
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findWithResponses');
        }
    }
    /**
     * Get assessment completion statistics
     */
    async getCompletionStats(assessmentId) {
        try {
            const [stats] = await db
                .select({
                totalStarted: sql `count(*)`,
                totalCompleted: sql `count(case when completed_at is not null then 1 end)`,
                averageCompletionTime: sql `avg(completion_time)`,
                averageScore: sql `avg(total_score)`,
            })
                .from(userAssessments)
                .where(eq(userAssessments.assessmentId, assessmentId));
            const totalStarted = stats?.totalStarted || 0;
            const totalCompleted = stats?.totalCompleted || 0;
            const completionRate = totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;
            return {
                totalStarted,
                totalCompleted,
                completionRate,
                averageCompletionTime: stats?.averageCompletionTime || 0,
                averageScore: stats?.averageScore || 0,
            };
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'getCompletionStats');
        }
    }
}
// ============================================================================
// ASSESSMENT RESPONSE SERVICE
// ============================================================================
export class AssessmentResponseService extends BaseService {
    table = assessmentResponses;
    entityName = 'AssessmentResponse';
    createSchema = newAssessmentResponseSchema;
    updateSchema = updateAssessmentResponseSchema;
    querySchema = queryAssessmentResponseSchema;
    outputSchema = databaseAssessmentResponseSchema;
    /**
     * Find responses by user assessment
     */
    async findByUserAssessment(userAssessmentId) {
        try {
            const results = await db
                .select()
                .from(assessmentResponses)
                .where(eq(assessmentResponses.userAssessmentId, userAssessmentId))
                .orderBy(assessmentResponses.createdAt);
            return results.map(result => this.outputSchema.parse(result));
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByUserAssessment');
        }
    }
    /**
     * Find response by question and user assessment
     */
    async findByQuestionAndUserAssessment(questionId, userAssessmentId) {
        try {
            const [result] = await db
                .select()
                .from(assessmentResponses)
                .where(and(eq(assessmentResponses.questionId, questionId), eq(assessmentResponses.userAssessmentId, userAssessmentId)))
                .limit(1);
            if (!result)
                return null;
            return this.outputSchema.parse(result);
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'findByQuestionAndUserAssessment');
        }
    }
    /**
     * Save or update response
     */
    async saveResponse(userAssessmentId, questionId, responseData) {
        try {
            // Check if response already exists
            const existing = await this.findByQuestionAndUserAssessment(questionId, userAssessmentId);
            if (existing) {
                // Update existing response
                const [result] = await db
                    .update(assessmentResponses)
                    .set({
                    ...responseData,
                    updatedAt: new Date(),
                })
                    .where(eq(assessmentResponses.id, existing.id))
                    .returning();
                return this.outputSchema.parse(result);
            }
            else {
                // Create new response
                const [result] = await db
                    .insert(assessmentResponses)
                    .values({
                    userAssessmentId,
                    questionId,
                    ...responseData,
                })
                    .returning();
                return this.outputSchema.parse(result);
            }
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'saveResponse');
        }
    }
    /**
     * Bulk save responses
     */
    async bulkSaveResponses(userAssessmentId, responses) {
        try {
            return this.executeInTransaction(async (tx) => {
                const results = [];
                for (const response of responses) {
                    const savedResponse = await new AssessmentResponseService().saveResponse(userAssessmentId, response.questionId, response);
                    results.push(savedResponse);
                }
                return results;
            });
        }
        catch (error) {
            throw this.handleDatabaseError(error, 'bulkSaveResponses');
        }
    }
}
// ============================================================================
// EXPORTS
// ============================================================================
// Services are already exported as classes above
//# sourceMappingURL=assessment.service.js.map