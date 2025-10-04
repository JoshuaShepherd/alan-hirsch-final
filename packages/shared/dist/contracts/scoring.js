import { z } from 'zod';
// APEST Scoring Schemas - Normalized for UI safety
// APEST Scores as Record<string, number> for safe indexing
export const apestScoresSchema = z.record(z.string(), z.number());
// APEST Score Result
export const apestScoreResultSchema = z.object({
    rawScores: z.record(z.string(), z.number()),
    totalScore: z.number(),
    maxPossibleScore: z.number(),
    normalizedScores: z.record(z.string(), z.number()),
    apestScores: apestScoresSchema,
    primaryGift: z.string(),
    secondaryGift: z.string(),
    completionPercentage: z.number(),
    responseConsistency: z.number().optional(),
});
//# sourceMappingURL=scoring.js.map