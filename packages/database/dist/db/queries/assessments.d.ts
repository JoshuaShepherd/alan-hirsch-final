import type { NewAssessment, NewAssessmentQuestion, NewAssessmentResponse, NewUserAssessment } from '@/lib/contracts';
/**
 * Get all active assessments with optional filtering
 */
export declare function getAssessments(filters?: {
    assessmentType?: 'apest' | 'mdna' | 'cultural_intelligence' | 'leadership_style' | 'spiritual_gifts' | 'other';
    status?: 'draft' | 'active' | 'archived' | 'under_review';
    language?: string;
    culturalAdaptation?: 'western' | 'eastern' | 'african' | 'latin_american' | 'middle_eastern' | 'oceanic' | 'universal' | 'global';
    researchBacked?: boolean;
}): Promise<unknown[]>;
/**
 * Get a specific assessment by ID
 */
export declare function getAssessmentById(assessmentId: string): Promise<any>;
/**
 * Get a specific assessment by slug
 */
export declare function getAssessmentBySlug(slug: string): Promise<any>;
/**
 * Create a new assessment
 */
export declare function createAssessment(assessmentData: NewAssessment): Promise<any>;
/**
 * Update an assessment
 */
export declare function updateAssessment(assessmentId: string, updates: Partial<NewAssessment>): Promise<any>;
/**
 * Delete an assessment
 */
export declare function deleteAssessment(assessmentId: string): Promise<boolean>;
/**
 * Get all questions for a specific assessment
 */
export declare function getAssessmentQuestions(assessmentId: string): Promise<unknown[]>;
/**
 * Get a specific question by ID
 */
export declare function getAssessmentQuestionById(questionId: string): Promise<any>;
/**
 * Create a new assessment question
 */
export declare function createAssessmentQuestion(questionData: NewAssessmentQuestion): Promise<any>;
/**
 * Update an assessment question
 */
export declare function updateAssessmentQuestion(questionId: string, updates: Partial<NewAssessmentQuestion>): Promise<any>;
/**
 * Delete an assessment question
 */
export declare function deleteAssessmentQuestion(questionId: string): Promise<boolean>;
/**
 * Get all assessments for a specific user
 */
export declare function getUserAssessments(userId: string): Promise<unknown[]>;
/**
 * Get all assessments for a specific user with assessment details
 */
export declare function getUserAssessmentsWithDetails(userId: string): Promise<any[]>;
/**
 * Get a specific user assessment by ID
 */
export declare function getUserAssessmentById(userAssessmentId: string): Promise<any>;
/**
 * Get user's assessment for a specific assessment type
 */
export declare function getUserAssessmentByType(userId: string, assessmentId: string): Promise<any>;
/**
 * Start a new user assessment
 */
export declare function startUserAssessment(userAssessmentData: NewUserAssessment): Promise<any>;
/**
 * Update a user assessment
 */
export declare function updateUserAssessment(userAssessmentId: string, updates: Partial<NewUserAssessment>): Promise<any>;
/**
 * Complete a user assessment
 */
export declare function completeUserAssessment(userAssessmentId: string, completionData: {
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
}): Promise<any>;
/**
 * Delete a user assessment
 */
export declare function deleteUserAssessment(userAssessmentId: string): Promise<boolean>;
/**
 * Get all responses for a user assessment
 */
export declare function getAssessmentResponses(userAssessmentId: string): Promise<unknown[]>;
/**
 * Get a specific response by ID
 */
export declare function getAssessmentResponseById(responseId: string): Promise<any>;
/**
 * Create a new assessment response
 */
export declare function createAssessmentResponse(responseData: NewAssessmentResponse): Promise<any>;
/**
 * Update an assessment response
 */
export declare function updateAssessmentResponse(responseId: string, updates: Partial<NewAssessmentResponse>): Promise<any>;
/**
 * Delete an assessment response
 */
export declare function deleteAssessmentResponse(responseId: string): Promise<boolean>;
/**
 * Save multiple responses for a user assessment
 */
export declare function saveAssessmentResponses(userAssessmentId: string, responses: Array<{
    questionId: string;
    responseValue?: number;
    responseText?: string;
    responseTime?: number;
    confidence?: number;
    skipped?: boolean;
}>): Promise<unknown[]>;
/**
 * Get assessment completion statistics
 */
export declare function getAssessmentStats(assessmentId: string): Promise<{
    totalAttempts: number;
    completedAttempts: number;
    averageScore: number;
    averageCompletionTime: number;
}>;
/**
 * Get APEST score distribution for an assessment
 */
export declare function getApestScoreDistribution(assessmentId: string): Promise<{
    apostolic: number;
    prophetic: number;
    evangelistic: number;
    shepherding: number;
    teaching: number;
}>;
/**
 * Get users with similar APEST profiles
 */
export declare function getSimilarApestProfiles(userId: string, userAssessmentId: string, limit?: number): Promise<{
    id: string;
    userId: string;
    primaryGift: string;
    secondaryGift: string;
    apostolicScore: number;
    propheticScore: number;
    evangelisticScore: number;
    shepherdingScore: number;
    teachingScore: number;
    user: {
        firstName: string;
        lastName: string;
        displayName: string;
        avatarUrl: string;
    };
}[]>;
//# sourceMappingURL=assessments.d.ts.map