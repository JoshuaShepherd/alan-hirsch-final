export interface ExplainPlan {
    query: string;
    plan: string;
    executionTime: number;
    cost: number;
    rows: number;
    recommendations: string[];
}
export interface IndexRecommendation {
    table: string;
    columns: string[];
    type: 'btree' | 'hash' | 'gin' | 'gist';
    reason: string;
    estimatedImprovement: string;
}
export interface QueryOptimization {
    originalQuery: string;
    optimizedQuery: string;
    performanceGain: number;
    explanation: string;
}
/**
 * 1. Get user profile by email (most frequent query)
 */
export declare function explainGetUserByEmail(): Promise<ExplainPlan>;
/**
 * 2. Get published content with pagination
 */
export declare function explainGetPublishedContent(): Promise<ExplainPlan>;
/**
 * 3. Get user assessments with details
 */
export declare function explainGetUserAssessments(): Promise<ExplainPlan>;
/**
 * 4. Get organization members
 */
export declare function explainGetOrganizationMembers(): Promise<ExplainPlan>;
/**
 * 5. Search content with full-text search
 */
export declare function explainSearchContent(): Promise<ExplainPlan>;
/**
 * 6. Get community posts with author details
 */
export declare function explainGetCommunityPosts(): Promise<ExplainPlan>;
/**
 * 7. Get user subscription details
 */
export declare function explainGetUserSubscription(): Promise<ExplainPlan>;
/**
 * 8. Get content by category with counts
 */
export declare function explainGetContentByCategory(): Promise<ExplainPlan>;
/**
 * 9. Get trending content
 */
export declare function explainGetTrendingContent(): Promise<ExplainPlan>;
/**
 * 10. Get user analytics events
 */
export declare function explainGetUserAnalytics(): Promise<ExplainPlan>;
/**
 * Get index recommendations for top queries
 */
export declare function getIndexRecommendations(): Promise<IndexRecommendation[]>;
/**
 * Get query optimization suggestions
 */
export declare function getQueryOptimizations(): Promise<QueryOptimization[]>;
/**
 * Get performance metrics for all top queries
 */
export declare function getTopQueriesPerformance(): Promise<{
    queries: Array<{
        name: string;
        averageTime: number;
        executionCount: number;
        slowestExecution: number;
        recommendations: string[];
    }>;
    overallMetrics: {
        averageQueryTime: number;
        slowestQuery: string;
        mostFrequentQuery: string;
        totalOptimizationPotential: number;
    };
}>;
/**
 * Generate performance report
 */
export declare function generatePerformanceReport(): Promise<{
    summary: string;
    topIssues: string[];
    recommendations: string[];
    estimatedImprovements: string[];
}>;
//# sourceMappingURL=performance.d.ts.map