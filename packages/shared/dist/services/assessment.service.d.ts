import { assessmentQuestions, assessmentResponses, assessments, userAssessments } from '@/lib/db/schema';
import { newAssessmentQuestionSchema, newAssessmentResponseSchema, newAssessmentSchema, newUserAssessmentSchema, queryAssessmentQuestionSchema, queryAssessmentResponseSchema, queryAssessmentSchema, queryUserAssessmentSchema, updateAssessmentQuestionSchema, updateAssessmentResponseSchema, updateAssessmentSchema, updateUserAssessmentSchema } from '@/src/lib/schemas/crud.schemas';
import { databaseAssessmentQuestionSchema, databaseAssessmentResponseSchema, databaseAssessmentSchema, databaseUserAssessmentSchema } from '@/src/lib/schemas/database.schemas';
import { z } from 'zod';
import { BaseService } from './base.service';
export declare class AssessmentService extends BaseService<z.infer<typeof databaseAssessmentSchema>, z.infer<typeof newAssessmentSchema>, z.infer<typeof updateAssessmentSchema>, z.infer<typeof queryAssessmentSchema>, typeof assessments> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find assessment by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseAssessmentSchema> | null>;
    /**
     * Find active assessments
     */
    findActive(): Promise<z.infer<typeof databaseAssessmentSchema>[]>;
    /**
     * Find assessments by type
     */
    findByType(assessmentType: string): Promise<z.infer<typeof databaseAssessmentSchema>[]>;
    /**
     * Find assessments by language
     */
    findByLanguage(language: string): Promise<z.infer<typeof databaseAssessmentSchema>[]>;
    /**
     * Find assessments by cultural adaptation
     */
    findByCulturalAdaptation(culturalAdaptation: string): Promise<z.infer<typeof databaseAssessmentSchema>[]>;
    /**
     * Find research-backed assessments
     */
    findResearchBacked(): Promise<z.infer<typeof databaseAssessmentSchema>[]>;
    /**
     * Get assessment with questions
     */
    findWithQuestions(assessmentId: string): Promise<{
        assessment: z.infer<typeof databaseAssessmentSchema>;
        questions: z.infer<typeof databaseAssessmentQuestionSchema>[];
    } | null>;
    /**
     * Get assessment statistics
     */
    getAssessmentStats(assessmentId: string): Promise<{
        totalQuestions: number;
        totalCompletions: number;
        averageCompletionTime: number;
        averageScore: number;
    }>;
}
export declare class AssessmentQuestionService extends BaseService<z.infer<typeof databaseAssessmentQuestionSchema>, z.infer<typeof newAssessmentQuestionSchema>, z.infer<typeof updateAssessmentQuestionSchema>, z.infer<typeof queryAssessmentQuestionSchema>, typeof assessmentQuestions> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find questions by assessment
     */
    findByAssessment(assessmentId: string): Promise<z.infer<typeof databaseAssessmentQuestionSchema>[]>;
    /**
     * Find questions by APEST dimension
     */
    findByAPESTDimension(dimension: string): Promise<z.infer<typeof databaseAssessmentQuestionSchema>[]>;
    /**
     * Find required questions for an assessment
     */
    findRequiredQuestions(assessmentId: string): Promise<z.infer<typeof databaseAssessmentQuestionSchema>[]>;
    /**
     * Update question order
     */
    updateQuestionOrder(questionId: string, newOrder: number): Promise<z.infer<typeof databaseAssessmentQuestionSchema>>;
    /**
     * Get questions with response statistics
     */
    getQuestionsWithStats(assessmentId: string): Promise<Array<z.infer<typeof databaseAssessmentQuestionSchema> & {
        responseCount: number;
        averageResponse: number;
        skipRate: number;
    }>>;
}
export declare class UserAssessmentService extends BaseService<z.infer<typeof databaseUserAssessmentSchema>, z.infer<typeof newUserAssessmentSchema>, z.infer<typeof updateUserAssessmentSchema>, z.infer<typeof queryUserAssessmentSchema>, typeof userAssessments> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find user assessment by user and assessment
     */
    findByUserAndAssessment(userId: string, assessmentId: string): Promise<z.infer<typeof databaseUserAssessmentSchema> | null>;
    /**
     * Find user assessments by user
     */
    findByUser(userId: string): Promise<Array<z.infer<typeof databaseUserAssessmentSchema> & {
        assessment: z.infer<typeof databaseAssessmentSchema>;
    }>>;
    /**
     * Find completed user assessments by user
     */
    findCompletedByUser(userId: string): Promise<Array<z.infer<typeof databaseUserAssessmentSchema> & {
        assessment: z.infer<typeof databaseAssessmentSchema>;
    }>>;
    /**
     * Find latest incomplete assessment for user
     */
    findLatestIncomplete(userId: string, assessmentType?: string): Promise<{
        userAssessment: z.infer<typeof databaseUserAssessmentSchema>;
        assessment: z.infer<typeof databaseAssessmentSchema>;
    } | null>;
    /**
     * Start a new assessment for user
     */
    startAssessment(userId: string, assessmentId: string): Promise<z.infer<typeof databaseUserAssessmentSchema>>;
    /**
     * Complete an assessment
     */
    completeAssessment(userAssessmentId: string, completionData: {
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
    }): Promise<z.infer<typeof databaseUserAssessmentSchema>>;
    /**
     * Update assessment progress
     */
    updateProgress(userAssessmentId: string, progressData: {
        completionPercentage?: number;
        rawScores?: Record<string, number>;
        responseConsistency?: number;
        confidenceLevel?: number;
    }): Promise<z.infer<typeof databaseUserAssessmentSchema>>;
    /**
     * Get user assessment with responses
     */
    findWithResponses(userAssessmentId: string): Promise<{
        userAssessment: z.infer<typeof databaseUserAssessmentSchema>;
        responses: z.infer<typeof databaseAssessmentResponseSchema>[];
    } | null>;
    /**
     * Get assessment completion statistics
     */
    getCompletionStats(assessmentId: string): Promise<{
        totalStarted: number;
        totalCompleted: number;
        completionRate: number;
        averageCompletionTime: number;
        averageScore: number;
    }>;
}
export declare class AssessmentResponseService extends BaseService<z.infer<typeof databaseAssessmentResponseSchema>, z.infer<typeof newAssessmentResponseSchema>, z.infer<typeof updateAssessmentResponseSchema>, z.infer<typeof queryAssessmentResponseSchema>, typeof assessmentResponses> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find responses by user assessment
     */
    findByUserAssessment(userAssessmentId: string): Promise<z.infer<typeof databaseAssessmentResponseSchema>[]>;
    /**
     * Find response by question and user assessment
     */
    findByQuestionAndUserAssessment(questionId: string, userAssessmentId: string): Promise<z.infer<typeof databaseAssessmentResponseSchema> | null>;
    /**
     * Save or update response
     */
    saveResponse(userAssessmentId: string, questionId: string, responseData: {
        responseValue?: number;
        responseText?: string;
        responseTime?: number;
        confidence?: number;
        skipped?: boolean;
    }): Promise<z.infer<typeof databaseAssessmentResponseSchema>>;
    /**
     * Bulk save responses
     */
    bulkSaveResponses(userAssessmentId: string, responses: Array<{
        questionId: string;
        responseValue?: number;
        responseText?: string;
        responseTime?: number;
        confidence?: number;
        skipped?: boolean;
    }>): Promise<z.infer<typeof databaseAssessmentResponseSchema>[]>;
}
//# sourceMappingURL=assessment.service.d.ts.map