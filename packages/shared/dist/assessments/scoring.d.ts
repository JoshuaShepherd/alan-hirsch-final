import type { AssessmentQuestion, AssessmentResponse } from '@/lib/contracts';
export declare const APEST_DIMENSIONS: readonly ["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"];
export type ApestDimension = (typeof APEST_DIMENSIONS)[number];
export type ApestScores = {
    apostolic: number;
    prophetic: number;
    evangelistic: number;
    shepherding: number;
    teaching: number;
};
export interface AssessmentScoreResult {
    rawScores: Record<string, number>;
    totalScore: number;
    maxPossibleScore: number;
    normalizedScores: Record<string, number>;
    apestScores?: ApestScores;
    primaryGift?: string;
    secondaryGift?: string;
    completionPercentage: number;
    responseConsistency?: number;
}
/**
 * Calculate APEST scores from responses
 */
export declare function calculateApestScores(questions: AssessmentQuestion[], responses: AssessmentResponse[]): ApestScores;
/**
 * Determine primary and secondary gifts from APEST scores
 */
export declare function determineApestGifts(scores: ApestScores): {
    primaryGift: string;
    secondaryGift: string;
};
/**
 * Calculate response consistency (standard deviation of responses)
 */
export declare function calculateResponseConsistency(responses: AssessmentResponse[]): number;
/**
 * Calculate completion percentage
 */
export declare function calculateCompletionPercentage(questions: AssessmentQuestion[], responses: AssessmentResponse[]): number;
/**
 * Normalize scores to 0-100 scale
 */
export declare function normalizeScores(rawScores: Record<string, number>, maxPossibleScores: Record<string, number>): Record<string, number>;
/**
 * Calculate maximum possible scores for each dimension
 */
export declare function calculateMaxPossibleScores(questions: AssessmentQuestion[]): Record<string, number>;
/**
 * Main scoring function for APEST assessments
 */
export declare function scoreApestAssessment(questions: AssessmentQuestion[], responses: AssessmentResponse[]): AssessmentScoreResult;
/**
 * Generate AI insights for APEST results
 */
export declare function generateApestInsights(apestScores: ApestScores, primaryGift: string, secondaryGift: string): string;
/**
 * Generate personalized recommendations
 */
export declare function generatePersonalizedRecommendations(apestScores: ApestScores, primaryGift: string, _secondaryGift: string): {
    strengths: string[];
    growthAreas: string[];
    actionItems: string[];
    contentRecommendations: string[];
};
//# sourceMappingURL=scoring.d.ts.map