import { z } from 'zod';
export declare const apestScoresSchema: z.ZodRecord<z.ZodString, z.ZodNumber>;
export declare const apestScoreResultSchema: z.ZodObject<{
    rawScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    totalScore: z.ZodNumber;
    maxPossibleScore: z.ZodNumber;
    normalizedScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    apestScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    primaryGift: z.ZodString;
    secondaryGift: z.ZodString;
    completionPercentage: z.ZodNumber;
    responseConsistency: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    rawScores: Record<string, number>;
    totalScore: number;
    maxPossibleScore: number;
    normalizedScores: Record<string, number>;
    apestScores: Record<string, number>;
    primaryGift: string;
    secondaryGift: string;
    completionPercentage: number;
    responseConsistency?: number | undefined;
}, {
    rawScores: Record<string, number>;
    totalScore: number;
    maxPossibleScore: number;
    normalizedScores: Record<string, number>;
    apestScores: Record<string, number>;
    primaryGift: string;
    secondaryGift: string;
    completionPercentage: number;
    responseConsistency?: number | undefined;
}>;
export type ApestScores = z.infer<typeof apestScoresSchema>;
export type ApestScoreResult = z.infer<typeof apestScoreResultSchema>;
//# sourceMappingURL=scoring.d.ts.map