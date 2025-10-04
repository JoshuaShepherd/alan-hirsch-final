import { db } from '@platform/database/db/drizzle';
import {
  assessmentQuestions,
  assessmentResponses,
  assessments,
  userAssessments,
} from '@platform/database/db/schema';
import {
  newAssessmentQuestionSchema,
  newAssessmentResponseSchema,
  newAssessmentSchema,
  newUserAssessmentSchema,
  queryAssessmentQuestionSchema,
  queryAssessmentResponseSchema,
  queryAssessmentSchema,
  queryUserAssessmentSchema,
  updateAssessmentQuestionSchema,
  updateAssessmentResponseSchema,
  updateAssessmentSchema,
  updateUserAssessmentSchema,
} from '@/src/lib/schemas/crud.schemas';
import {
  databaseAssessmentQuestionSchema,
  databaseAssessmentResponseSchema,
  databaseAssessmentSchema,
  databaseUserAssessmentSchema,
} from '@/src/lib/schemas/database.schemas';
import { and, desc, eq, sql } from 'drizzle-orm';
import { z } from 'zod';
import { BaseService } from './base.service';

// ============================================================================
// ASSESSMENT SERVICE
// ============================================================================

export class AssessmentService extends BaseService<
  z.infer<typeof databaseAssessmentSchema>,
  z.infer<typeof newAssessmentSchema>,
  z.infer<typeof updateAssessmentSchema>,
  z.infer<typeof queryAssessmentSchema>,
  typeof assessments
> {
  protected table = assessments;
  protected entityName = 'Assessment';
  protected createSchema = newAssessmentSchema;
  protected updateSchema = updateAssessmentSchema;
  protected querySchema = queryAssessmentSchema;
  protected outputSchema = databaseAssessmentSchema;

  /**
   * Find assessment by slug
   */
  async findBySlug(
    slug: string
  ): Promise<z.infer<typeof databaseAssessmentSchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(assessments)
        .where(eq(assessments.slug, slug))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findBySlug');
    }
  }

  /**
   * Find active assessments
   */
  async findActive(): Promise<z.infer<typeof databaseAssessmentSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessments)
        .where(eq(assessments.status, 'active'))
        .orderBy(assessments.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findActive');
    }
  }

  /**
   * Find assessments by type
   */
  async findByType(
    assessmentType: string
  ): Promise<z.infer<typeof databaseAssessmentSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessments)
        .where(
          and(
            eq(assessments.assessmentType, assessmentType),
            eq(assessments.status, 'active')
          )
        )
        .orderBy(assessments.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByType');
    }
  }

  /**
   * Find assessments by language
   */
  async findByLanguage(
    language: string
  ): Promise<z.infer<typeof databaseAssessmentSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessments)
        .where(
          and(
            eq(assessments.language, language),
            eq(assessments.status, 'active')
          )
        )
        .orderBy(assessments.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByLanguage');
    }
  }

  /**
   * Find assessments by cultural adaptation
   */
  async findByCulturalAdaptation(
    culturalAdaptation: string
  ): Promise<z.infer<typeof databaseAssessmentSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessments)
        .where(
          and(
            eq(assessments.culturalAdaptation, culturalAdaptation),
            eq(assessments.status, 'active')
          )
        )
        .orderBy(assessments.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByCulturalAdaptation');
    }
  }

  /**
   * Find research-backed assessments
   */
  async findResearchBacked(): Promise<
    z.infer<typeof databaseAssessmentSchema>[]
  > {
    try {
      const results = await db
        .select()
        .from(assessments)
        .where(
          and(
            eq(assessments.researchBacked, true),
            eq(assessments.status, 'active')
          )
        )
        .orderBy(assessments.name);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findResearchBacked');
    }
  }

  /**
   * Get assessment with questions
   */
  async findWithQuestions(assessmentId: string): Promise<{
    assessment: z.infer<typeof databaseAssessmentSchema>;
    questions: z.infer<typeof databaseAssessmentQuestionSchema>[];
  } | null> {
    try {
      const [assessmentResult] = await db
        .select()
        .from(assessments)
        .where(eq(assessments.id, assessmentId))
        .limit(1);

      if (!assessmentResult) return null;

      const questionsResults = await db
        .select()
        .from(assessmentQuestions)
        .where(eq(assessmentQuestions.assessmentId, assessmentId))
        .orderBy(assessmentQuestions.orderIndex);

      const assessment = this.outputSchema.parse(assessmentResult);
      const questions = questionsResults.map(q =>
        databaseAssessmentQuestionSchema.parse(q)
      );

      return { assessment, questions };
    } catch (error) {
      throw this.handleDatabaseError(error, 'findWithQuestions');
    }
  }

  /**
   * Get assessment statistics
   */
  async getAssessmentStats(assessmentId: string): Promise<{
    totalQuestions: number;
    totalCompletions: number;
    averageCompletionTime: number;
    averageScore: number;
  }> {
    try {
      const [questionCount] = await db
        .select({ count: sql<number>`count(*)` })
        .from(assessmentQuestions)
        .where(eq(assessmentQuestions.assessmentId, assessmentId));

      const [completionStats] = await db
        .select({
          totalCompletions: sql<number>`count(case when completed_at is not null then 1 end)`,
          averageCompletionTime: sql<number>`avg(completion_time)`,
          averageScore: sql<number>`avg(total_score)`,
        })
        .from(userAssessments)
        .where(eq(userAssessments.assessmentId, assessmentId));

      return {
        totalQuestions: questionCount?.count || 0,
        totalCompletions: completionStats?.totalCompletions || 0,
        averageCompletionTime: completionStats?.averageCompletionTime || 0,
        averageScore: completionStats?.averageScore || 0,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'getAssessmentStats');
    }
  }
}

// ============================================================================
// ASSESSMENT QUESTION SERVICE
// ============================================================================

export class AssessmentQuestionService extends BaseService<
  z.infer<typeof databaseAssessmentQuestionSchema>,
  z.infer<typeof newAssessmentQuestionSchema>,
  z.infer<typeof updateAssessmentQuestionSchema>,
  z.infer<typeof queryAssessmentQuestionSchema>,
  typeof assessmentQuestions
> {
  protected table = assessmentQuestions;
  protected entityName = 'AssessmentQuestion';
  protected createSchema = newAssessmentQuestionSchema;
  protected updateSchema = updateAssessmentQuestionSchema;
  protected querySchema = queryAssessmentQuestionSchema;
  protected outputSchema = databaseAssessmentQuestionSchema;

  /**
   * Find questions by assessment
   */
  async findByAssessment(
    assessmentId: string
  ): Promise<z.infer<typeof databaseAssessmentQuestionSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessmentQuestions)
        .where(eq(assessmentQuestions.assessmentId, assessmentId))
        .orderBy(assessmentQuestions.orderIndex);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByAssessment');
    }
  }

  /**
   * Find questions by APEST dimension
   */
  async findByAPESTDimension(
    dimension: string
  ): Promise<z.infer<typeof databaseAssessmentQuestionSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessmentQuestions)
        .where(eq(assessmentQuestions.apestDimension, dimension))
        .orderBy(assessmentQuestions.orderIndex);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByAPESTDimension');
    }
  }

  /**
   * Find required questions for an assessment
   */
  async findRequiredQuestions(
    assessmentId: string
  ): Promise<z.infer<typeof databaseAssessmentQuestionSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessmentQuestions)
        .where(
          and(
            eq(assessmentQuestions.assessmentId, assessmentId),
            eq(assessmentQuestions.isRequired, true)
          )
        )
        .orderBy(assessmentQuestions.orderIndex);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findRequiredQuestions');
    }
  }

  /**
   * Update question order
   */
  async updateQuestionOrder(
    questionId: string,
    newOrder: number
  ): Promise<z.infer<typeof databaseAssessmentQuestionSchema>> {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'updateQuestionOrder');
    }
  }

  /**
   * Get questions with response statistics
   */
  async getQuestionsWithStats(assessmentId: string): Promise<
    Array<
      z.infer<typeof databaseAssessmentQuestionSchema> & {
        responseCount: number;
        averageResponse: number;
        skipRate: number;
      }
    >
  > {
    try {
      const questions = await this.findByAssessment(assessmentId);

      const questionsWithStats = await Promise.all(
        questions.map(async question => {
          const [stats] = await db
            .select({
              responseCount: sql<number>`count(*)`,
              averageResponse: sql<number>`avg(response_value)`,
              skipRate: sql<number>`count(case when skipped = true then 1 end)::float / count(*) * 100`,
            })
            .from(assessmentResponses)
            .innerJoin(
              userAssessments,
              eq(assessmentResponses.userAssessmentId, userAssessments.id)
            )
            .where(
              and(
                eq(assessmentResponses.questionId, question.id),
                eq(userAssessments.assessmentId, assessmentId)
              )
            );

          return {
            ...question,
            responseCount: stats?.responseCount || 0,
            averageResponse: stats?.averageResponse || 0,
            skipRate: stats?.skipRate || 0,
          };
        })
      );

      return questionsWithStats;
    } catch (error) {
      throw this.handleDatabaseError(error, 'getQuestionsWithStats');
    }
  }
}

// ============================================================================
// USER ASSESSMENT SERVICE
// ============================================================================

export class UserAssessmentService extends BaseService<
  z.infer<typeof databaseUserAssessmentSchema>,
  z.infer<typeof newUserAssessmentSchema>,
  z.infer<typeof updateUserAssessmentSchema>,
  z.infer<typeof queryUserAssessmentSchema>,
  typeof userAssessments
> {
  protected table = userAssessments;
  protected entityName = 'UserAssessment';
  protected createSchema = newUserAssessmentSchema;
  protected updateSchema = updateUserAssessmentSchema;
  protected querySchema = queryUserAssessmentSchema;
  protected outputSchema = databaseUserAssessmentSchema;

  /**
   * Find user assessment by user and assessment
   */
  async findByUserAndAssessment(
    userId: string,
    assessmentId: string
  ): Promise<z.infer<typeof databaseUserAssessmentSchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(userAssessments)
        .where(
          and(
            eq(userAssessments.userId, userId),
            eq(userAssessments.assessmentId, assessmentId)
          )
        )
        .orderBy(desc(userAssessments.startedAt))
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByUserAndAssessment');
    }
  }

  /**
   * Find user assessments by user
   */
  async findByUser(userId: string): Promise<
    Array<
      z.infer<typeof databaseUserAssessmentSchema> & {
        assessment: z.infer<typeof databaseAssessmentSchema>;
      }
    >
  > {
    try {
      const results = await db
        .select({
          userAssessment: userAssessments,
          assessment: assessments,
        })
        .from(userAssessments)
        .innerJoin(
          assessments,
          eq(userAssessments.assessmentId, assessments.id)
        )
        .where(eq(userAssessments.userId, userId))
        .orderBy(desc(userAssessments.completedAt));

      return results.map(({ userAssessment, assessment }) => ({
        ...this.outputSchema.parse(userAssessment),
        assessment: databaseAssessmentSchema.parse(assessment),
      }));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByUser');
    }
  }

  /**
   * Find completed user assessments by user
   */
  async findCompletedByUser(userId: string): Promise<
    Array<
      z.infer<typeof databaseUserAssessmentSchema> & {
        assessment: z.infer<typeof databaseAssessmentSchema>;
      }
    >
  > {
    try {
      const results = await db
        .select({
          userAssessment: userAssessments,
          assessment: assessments,
        })
        .from(userAssessments)
        .innerJoin(
          assessments,
          eq(userAssessments.assessmentId, assessments.id)
        )
        .where(
          and(
            eq(userAssessments.userId, userId),
            sql`${userAssessments.completedAt} IS NOT NULL`
          )
        )
        .orderBy(desc(userAssessments.completedAt));

      return results.map(({ userAssessment, assessment }) => ({
        ...this.outputSchema.parse(userAssessment),
        assessment: databaseAssessmentSchema.parse(assessment),
      }));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findCompletedByUser');
    }
  }

  /**
   * Find latest incomplete assessment for user
   */
  async findLatestIncomplete(
    userId: string,
    assessmentType?: string
  ): Promise<{
    userAssessment: z.infer<typeof databaseUserAssessmentSchema>;
    assessment: z.infer<typeof databaseAssessmentSchema>;
  } | null> {
    try {
      const whereConditions = [
        eq(userAssessments.userId, userId),
        sql`${userAssessments.completedAt} IS NULL`,
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
        .innerJoin(
          assessments,
          eq(userAssessments.assessmentId, assessments.id)
        )
        .where(and(...whereConditions))
        .orderBy(desc(userAssessments.startedAt))
        .limit(1);

      if (!result) return null;

      return {
        userAssessment: this.outputSchema.parse(result.userAssessment),
        assessment: databaseAssessmentSchema.parse(result.assessment),
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'findLatestIncomplete');
    }
  }

  /**
   * Start a new assessment for user
   */
  async startAssessment(
    userId: string,
    assessmentId: string
  ): Promise<z.infer<typeof databaseUserAssessmentSchema>> {
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
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('already has an incomplete')
      ) {
        throw error;
      }
      throw this.handleDatabaseError(error, 'startAssessment');
    }
  }

  /**
   * Complete an assessment
   */
  async completeAssessment(
    userAssessmentId: string,
    completionData: {
      rawScores?: Record<string, number>;
      totalScore?: number;
      maxPossibleScore?: number;
      apostolicScore?: number;
      propheticScore?: number;
      evangelisticScore?: number;
      shepherdingScore?: number;
      teachingScore?: number;
      normalizedScores?: Record<string, number>;
      primaryGift?: string;
      secondaryGift?: string;
      responseConsistency?: number;
      completionTime?: number;
      confidenceLevel?: number;
      culturalAdjustmentApplied?: boolean;
      culturalAdjustmentFactor?: number;
      aiInsights?: Record<string, any>;
      personalizedRecommendations?: string[];
    }
  ): Promise<z.infer<typeof databaseUserAssessmentSchema>> {
    try {
      const [result] = await db
        .update(userAssessments)
        .set({
          ...completionData,
          completedAt: new Date(),
          completionPercentage: 100,
          updatedAt: new Date(),
        })
        .where(eq(userAssessments.id, userAssessmentId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'completeAssessment');
    }
  }

  /**
   * Update assessment progress
   */
  async updateProgress(
    userAssessmentId: string,
    progressData: {
      completionPercentage?: number;
      rawScores?: Record<string, number>;
      responseConsistency?: number;
      confidenceLevel?: number;
    }
  ): Promise<z.infer<typeof databaseUserAssessmentSchema>> {
    try {
      const [result] = await db
        .update(userAssessments)
        .set({
          ...progressData,
          updatedAt: new Date(),
        })
        .where(eq(userAssessments.id, userAssessmentId))
        .returning();

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'updateProgress');
    }
  }

  /**
   * Get user assessment with responses
   */
  async findWithResponses(userAssessmentId: string): Promise<{
    userAssessment: z.infer<typeof databaseUserAssessmentSchema>;
    responses: z.infer<typeof databaseAssessmentResponseSchema>[];
  } | null> {
    try {
      const [userAssessmentResult] = await db
        .select()
        .from(userAssessments)
        .where(eq(userAssessments.id, userAssessmentId))
        .limit(1);

      if (!userAssessmentResult) return null;

      const responsesResults = await db
        .select()
        .from(assessmentResponses)
        .where(eq(assessmentResponses.userAssessmentId, userAssessmentId))
        .orderBy(assessmentResponses.createdAt);

      return {
        userAssessment: this.outputSchema.parse(userAssessmentResult),
        responses: responsesResults.map(r =>
          databaseAssessmentResponseSchema.parse(r)
        ),
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'findWithResponses');
    }
  }

  /**
   * Get assessment completion statistics
   */
  async getCompletionStats(assessmentId: string): Promise<{
    totalStarted: number;
    totalCompleted: number;
    completionRate: number;
    averageCompletionTime: number;
    averageScore: number;
  }> {
    try {
      const [stats] = await db
        .select({
          totalStarted: sql<number>`count(*)`,
          totalCompleted: sql<number>`count(case when completed_at is not null then 1 end)`,
          averageCompletionTime: sql<number>`avg(completion_time)`,
          averageScore: sql<number>`avg(total_score)`,
        })
        .from(userAssessments)
        .where(eq(userAssessments.assessmentId, assessmentId));

      const totalStarted = stats?.totalStarted || 0;
      const totalCompleted = stats?.totalCompleted || 0;
      const completionRate =
        totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;

      return {
        totalStarted,
        totalCompleted,
        completionRate,
        averageCompletionTime: stats?.averageCompletionTime || 0,
        averageScore: stats?.averageScore || 0,
      };
    } catch (error) {
      throw this.handleDatabaseError(error, 'getCompletionStats');
    }
  }
}

// ============================================================================
// ASSESSMENT RESPONSE SERVICE
// ============================================================================

export class AssessmentResponseService extends BaseService<
  z.infer<typeof databaseAssessmentResponseSchema>,
  z.infer<typeof newAssessmentResponseSchema>,
  z.infer<typeof updateAssessmentResponseSchema>,
  z.infer<typeof queryAssessmentResponseSchema>,
  typeof assessmentResponses
> {
  protected table = assessmentResponses;
  protected entityName = 'AssessmentResponse';
  protected createSchema = newAssessmentResponseSchema;
  protected updateSchema = updateAssessmentResponseSchema;
  protected querySchema = queryAssessmentResponseSchema;
  protected outputSchema = databaseAssessmentResponseSchema;

  /**
   * Find responses by user assessment
   */
  async findByUserAssessment(
    userAssessmentId: string
  ): Promise<z.infer<typeof databaseAssessmentResponseSchema>[]> {
    try {
      const results = await db
        .select()
        .from(assessmentResponses)
        .where(eq(assessmentResponses.userAssessmentId, userAssessmentId))
        .orderBy(assessmentResponses.createdAt);

      return results.map(result => this.outputSchema.parse(result));
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByUserAssessment');
    }
  }

  /**
   * Find response by question and user assessment
   */
  async findByQuestionAndUserAssessment(
    questionId: string,
    userAssessmentId: string
  ): Promise<z.infer<typeof databaseAssessmentResponseSchema> | null> {
    try {
      const [result] = await db
        .select()
        .from(assessmentResponses)
        .where(
          and(
            eq(assessmentResponses.questionId, questionId),
            eq(assessmentResponses.userAssessmentId, userAssessmentId)
          )
        )
        .limit(1);

      if (!result) return null;

      return this.outputSchema.parse(result);
    } catch (error) {
      throw this.handleDatabaseError(error, 'findByQuestionAndUserAssessment');
    }
  }

  /**
   * Save or update response
   */
  async saveResponse(
    userAssessmentId: string,
    questionId: string,
    responseData: {
      responseValue?: number;
      responseText?: string;
      responseTime?: number;
      confidence?: number;
      skipped?: boolean;
    }
  ): Promise<z.infer<typeof databaseAssessmentResponseSchema>> {
    try {
      // Check if response already exists
      const existing = await this.findByQuestionAndUserAssessment(
        questionId,
        userAssessmentId
      );

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
      } else {
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
    } catch (error) {
      throw this.handleDatabaseError(error, 'saveResponse');
    }
  }

  /**
   * Bulk save responses
   */
  async bulkSaveResponses(
    userAssessmentId: string,
    responses: Array<{
      questionId: string;
      responseValue?: number;
      responseText?: string;
      responseTime?: number;
      confidence?: number;
      skipped?: boolean;
    }>
  ): Promise<z.infer<typeof databaseAssessmentResponseSchema>[]> {
    try {
      return this.executeInTransaction(async tx => {
        const results: z.infer<typeof databaseAssessmentResponseSchema>[] = [];

        for (const response of responses) {
          const savedResponse =
            await new AssessmentResponseService().saveResponse(
              userAssessmentId,
              response.questionId,
              response
            );
          results.push(savedResponse);
        }

        return results;
      });
    } catch (error) {
      throw this.handleDatabaseError(error, 'bulkSaveResponses');
    }
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

// Services are already exported as classes above
