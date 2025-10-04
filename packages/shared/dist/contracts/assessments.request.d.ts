import { z } from 'zod';
export declare const createAssessmentRequestSchema: z.ZodObject<{
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questionsCount: z.ZodNumber;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    passingScore: z.ZodOptional<z.ZodNumber>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    researchBacked: z.ZodDefault<z.ZodBoolean>;
    validityScore: z.ZodOptional<z.ZodString>;
    reliabilityScore: z.ZodOptional<z.ZodString>;
    instructions: z.ZodOptional<z.ZodString>;
    scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    status: "draft" | "archived" | "under_review" | "active";
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    version: string;
    language: string;
    culturalAdaptation: "global" | "universal" | "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    description?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: string | undefined;
    reliabilityScore?: string | undefined;
    instructions?: string | undefined;
}, {
    name: string;
    slug: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    description?: string | undefined;
    status?: "draft" | "archived" | "under_review" | "active" | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "global" | "universal" | "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | undefined;
    researchBacked?: boolean | undefined;
    validityScore?: string | undefined;
    reliabilityScore?: string | undefined;
    instructions?: string | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
export declare const updateAssessmentRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assessmentType: z.ZodOptional<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>>;
    questionsCount: z.ZodOptional<z.ZodNumber>;
    estimatedDuration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    passingScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    version: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    culturalAdaptation: z.ZodOptional<z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>>;
    researchBacked: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    validityScore: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    reliabilityScore: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scoringMethod: z.ZodOptional<z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    status?: "draft" | "archived" | "under_review" | "active" | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questionsCount?: number | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "global" | "universal" | "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | undefined;
    researchBacked?: boolean | undefined;
    validityScore?: string | undefined;
    reliabilityScore?: string | undefined;
    instructions?: string | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}, {
    id: string;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    status?: "draft" | "archived" | "under_review" | "active" | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questionsCount?: number | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "global" | "universal" | "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | undefined;
    researchBacked?: boolean | undefined;
    validityScore?: string | undefined;
    reliabilityScore?: string | undefined;
    instructions?: string | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
export declare const createAssessmentQuestionRequestSchema: z.ZodObject<{
    assessmentId: z.ZodString;
    questionText: z.ZodString;
    questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    orderIndex: z.ZodNumber;
    isRequired: z.ZodDefault<z.ZodBoolean>;
    category: z.ZodOptional<z.ZodString>;
    weight: z.ZodDefault<z.ZodNumber>;
    reverseScored: z.ZodDefault<z.ZodBoolean>;
    apestDimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    answerOptions: z.ZodOptional<z.ZodArray<z.ZodObject<{
        value: z.ZodNumber;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        label: string;
        description?: string | undefined;
    }, {
        value: number;
        label: string;
        description?: string | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    orderIndex: number;
    questionText: string;
    questionType: "text" | "multiple_choice" | "binary" | "ranking" | "likert";
    assessmentId: string;
    isRequired: boolean;
    weight: number;
    reverseScored: boolean;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
}, {
    orderIndex: number;
    questionText: string;
    questionType: "text" | "multiple_choice" | "binary" | "ranking" | "likert";
    assessmentId: string;
    category?: string | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
}>;
export declare const updateAssessmentQuestionRequestSchema: z.ZodObject<{
    assessmentId: z.ZodOptional<z.ZodString>;
    questionText: z.ZodOptional<z.ZodString>;
    questionType: z.ZodOptional<z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>>;
    orderIndex: z.ZodOptional<z.ZodNumber>;
    isRequired: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    reverseScored: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    apestDimension: z.ZodOptional<z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>>;
    answerOptions: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodObject<{
        value: z.ZodNumber;
        label: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        value: number;
        label: string;
        description?: string | undefined;
    }, {
        value: number;
        label: string;
        description?: string | undefined;
    }>, "many">>>;
} & {
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    orderIndex?: number | undefined;
    category?: string | undefined;
    questionText?: string | undefined;
    questionType?: "text" | "multiple_choice" | "binary" | "ranking" | "likert" | undefined;
    assessmentId?: string | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
}, {
    id: string;
    orderIndex?: number | undefined;
    category?: string | undefined;
    questionText?: string | undefined;
    questionType?: "text" | "multiple_choice" | "binary" | "ranking" | "likert" | undefined;
    assessmentId?: string | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
}>;
export declare const startAssessmentRequestSchema: z.ZodObject<{
    assessmentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    assessmentId: string;
}, {
    assessmentId: string;
}>;
export declare const saveAssessmentResponsesRequestSchema: z.ZodObject<{
    userAssessmentId: z.ZodString;
    responses: z.ZodArray<z.ZodObject<{
        questionId: z.ZodString;
        responseValue: z.ZodOptional<z.ZodNumber>;
        responseText: z.ZodOptional<z.ZodString>;
        responseTime: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        questionId: string;
        confidence?: number | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        skipped?: boolean | undefined;
    }, {
        questionId: string;
        confidence?: number | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    responses: {
        questionId: string;
        confidence?: number | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        skipped?: boolean | undefined;
    }[];
    userAssessmentId: string;
}, {
    responses: {
        questionId: string;
        confidence?: number | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        skipped?: boolean | undefined;
    }[];
    userAssessmentId: string;
}>;
export declare const completeAssessmentRequestSchema: z.ZodObject<{
    userAssessmentId: z.ZodString;
    totalScore: z.ZodNumber;
    maxPossibleScore: z.ZodNumber;
    rawScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    normalizedScores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    completionTime: z.ZodNumber;
    responseConsistency: z.ZodOptional<z.ZodString>;
    aiInsights: z.ZodOptional<z.ZodString>;
    personalizedRecommendations: z.ZodOptional<z.ZodObject<{
        strengths: z.ZodArray<z.ZodString, "many">;
        growthAreas: z.ZodArray<z.ZodString, "many">;
        actionItems: z.ZodArray<z.ZodString, "many">;
        contentRecommendations: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }>>;
}, "strip", z.ZodTypeAny, {
    rawScores: Record<string, number>;
    totalScore: number;
    maxPossibleScore: number;
    normalizedScores: Record<string, number>;
    completionTime: number;
    userAssessmentId: string;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: string | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
}, {
    rawScores: Record<string, number>;
    totalScore: number;
    maxPossibleScore: number;
    normalizedScores: Record<string, number>;
    completionTime: number;
    userAssessmentId: string;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: string | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
}>;
export declare const assessmentSearchRequestSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodOptional<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    language: z.ZodOptional<z.ZodString>;
    culturalAdaptation: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    researchBacked: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "archived" | "under_review" | "active";
    limit: number;
    page: number;
    search?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    language?: string | undefined;
    culturalAdaptation?: "global" | "universal" | "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | undefined;
    researchBacked?: boolean | undefined;
}, {
    status?: "draft" | "archived" | "under_review" | "active" | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    language?: string | undefined;
    culturalAdaptation?: "global" | "universal" | "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | undefined;
    researchBacked?: boolean | undefined;
    page?: number | undefined;
}>;
export declare const userAssessmentFiltersRequestSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    assessmentType: z.ZodOptional<z.ZodString>;
    completed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    limit: number;
    page: number;
    assessmentType?: string | undefined;
    completed?: boolean | undefined;
}, {
    limit?: number | undefined;
    assessmentType?: string | undefined;
    page?: number | undefined;
    completed?: boolean | undefined;
}>;
export type CreateAssessmentRequest = z.infer<typeof createAssessmentRequestSchema>;
export type UpdateAssessmentRequest = z.infer<typeof updateAssessmentRequestSchema>;
export type CreateAssessmentQuestionRequest = z.infer<typeof createAssessmentQuestionRequestSchema>;
export type UpdateAssessmentQuestionRequest = z.infer<typeof updateAssessmentQuestionRequestSchema>;
export type StartAssessmentRequest = z.infer<typeof startAssessmentRequestSchema>;
export type SaveAssessmentResponsesRequest = z.infer<typeof saveAssessmentResponsesRequestSchema>;
export type CompleteAssessmentRequest = z.infer<typeof completeAssessmentRequestSchema>;
export type AssessmentSearchRequest = z.infer<typeof assessmentSearchRequestSchema>;
export type UserAssessmentFiltersRequest = z.infer<typeof userAssessmentFiltersRequestSchema>;
//# sourceMappingURL=assessments.request.d.ts.map