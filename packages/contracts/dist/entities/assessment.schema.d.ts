import { z } from 'zod';
export declare const assessmentEntitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questionsCount: z.ZodNumber;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    passingScore: z.ZodOptional<z.ZodNumber>;
    validityScore: z.ZodOptional<z.ZodNumber>;
    reliabilityScore: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    researchBacked: z.ZodDefault<z.ZodBoolean>;
    scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    slug: string;
    assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
    status: "draft" | "active" | "archived" | "under_review";
    questionsCount: number;
    version: string;
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
}, {
    id: string;
    name: string;
    slug: string;
    assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
    questionsCount: number;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    status?: "draft" | "active" | "archived" | "under_review" | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
export declare const assessmentQuestionEntitySchema: z.ZodObject<{
    id: z.ZodString;
    assessmentId: z.ZodString;
    questionText: z.ZodString;
    questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    orderIndex: z.ZodNumber;
    category: z.ZodOptional<z.ZodString>;
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
    isRequired: z.ZodDefault<z.ZodBoolean>;
    weight: z.ZodDefault<z.ZodNumber>;
    reverseScored: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
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
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
}>;
export declare const userAssessmentEntitySchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    assessmentId: z.ZodString;
    startedAt: z.ZodString;
    completedAt: z.ZodOptional<z.ZodString>;
    completionPercentage: z.ZodDefault<z.ZodNumber>;
    rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    totalScore: z.ZodOptional<z.ZodNumber>;
    maxPossibleScore: z.ZodOptional<z.ZodNumber>;
    apostolicScore: z.ZodOptional<z.ZodNumber>;
    propheticScore: z.ZodOptional<z.ZodNumber>;
    evangelisticScore: z.ZodOptional<z.ZodNumber>;
    shepherdingScore: z.ZodOptional<z.ZodNumber>;
    teachingScore: z.ZodOptional<z.ZodNumber>;
    normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    responseConsistency: z.ZodOptional<z.ZodNumber>;
    completionTime: z.ZodOptional<z.ZodNumber>;
    confidenceLevel: z.ZodOptional<z.ZodNumber>;
    culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
    culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
    aiInsights: z.ZodOptional<z.ZodString>;
    personalizedRecommendations: z.ZodOptional<z.ZodObject<{
        strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    }>>;
    suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    userId: string;
    startedAt: string;
    completionPercentage: number;
    culturalAdjustmentApplied: boolean;
    suggestedPeers: string[];
    complementaryGifts: string[];
    completedAt?: string | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    userId: string;
    startedAt: string;
    completedAt?: string | undefined;
    completionPercentage?: number | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
}>;
export declare const assessmentResponseEntitySchema: z.ZodObject<{
    id: z.ZodString;
    userAssessmentId: z.ZodString;
    questionId: z.ZodString;
    responseValue: z.ZodOptional<z.ZodNumber>;
    responseText: z.ZodOptional<z.ZodString>;
    responseTime: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    skipped: boolean;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>;
export declare const assessmentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    userAssessmentId: z.ZodString;
    questionId: z.ZodString;
    responseValue: z.ZodOptional<z.ZodNumber>;
    responseText: z.ZodOptional<z.ZodString>;
    responseTime: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    isSkipped: z.ZodBoolean;
    hasResponse: z.ZodBoolean;
    responseTimeText: z.ZodOptional<z.ZodString>;
    confidenceLevel: z.ZodOptional<z.ZodString>;
    question: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        questionText: z.ZodString;
        questionType: z.ZodString;
        orderIndex: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        apestDimension: z.ZodOptional<z.ZodString>;
        isRequired: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        isRequired: boolean;
        category?: string | undefined;
        apestDimension?: string | undefined;
    }, {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        isRequired: boolean;
        category?: string | undefined;
        apestDimension?: string | undefined;
    }>>;
    userAssessment: z.ZodOptional<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        assessmentId: z.ZodString;
        status: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        status: string;
        assessmentId: string;
        userId: string;
    }, {
        id: string;
        status: string;
        assessmentId: string;
        userId: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    skipped: boolean;
    isSkipped: boolean;
    hasResponse: boolean;
    confidenceLevel?: string | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    responseTimeText?: string | undefined;
    question?: {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        isRequired: boolean;
        category?: string | undefined;
        apestDimension?: string | undefined;
    } | undefined;
    userAssessment?: {
        id: string;
        status: string;
        assessmentId: string;
        userId: string;
    } | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    isSkipped: boolean;
    hasResponse: boolean;
    confidenceLevel?: string | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseTimeText?: string | undefined;
    question?: {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        isRequired: boolean;
        category?: string | undefined;
        apestDimension?: string | undefined;
    } | undefined;
    userAssessment?: {
        id: string;
        status: string;
        assessmentId: string;
        userId: string;
    } | undefined;
}>;
export declare const assessmentQuestionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    assessmentId: z.ZodString;
    questionText: z.ZodString;
    questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    orderIndex: z.ZodNumber;
    category: z.ZodOptional<z.ZodString>;
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
    weight: z.ZodDefault<z.ZodNumber>;
    reverseScored: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    isRequired: z.ZodBoolean;
    hasOptions: z.ZodBoolean;
    isReverseScored: z.ZodBoolean;
    typeDisplay: z.ZodString;
    dimensionDisplay: z.ZodOptional<z.ZodString>;
    assessment: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        assessmentType: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
    }, {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
    isRequired: boolean;
    weight: number;
    reverseScored: boolean;
    hasOptions: boolean;
    isReverseScored: boolean;
    typeDisplay: string;
    assessment: {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
    };
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    dimensionDisplay?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
    isRequired: boolean;
    hasOptions: boolean;
    isReverseScored: boolean;
    typeDisplay: string;
    assessment: {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
    };
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
    dimensionDisplay?: string | undefined;
}>;
export declare const userAssessmentResponseSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    assessmentId: z.ZodString;
    startedAt: z.ZodString;
    completedAt: z.ZodOptional<z.ZodString>;
    completionPercentage: z.ZodDefault<z.ZodNumber>;
    rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    totalScore: z.ZodOptional<z.ZodNumber>;
    maxPossibleScore: z.ZodOptional<z.ZodNumber>;
    apostolicScore: z.ZodOptional<z.ZodNumber>;
    propheticScore: z.ZodOptional<z.ZodNumber>;
    evangelisticScore: z.ZodOptional<z.ZodNumber>;
    shepherdingScore: z.ZodOptional<z.ZodNumber>;
    teachingScore: z.ZodOptional<z.ZodNumber>;
    normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    responseConsistency: z.ZodOptional<z.ZodNumber>;
    completionTime: z.ZodOptional<z.ZodNumber>;
    confidenceLevel: z.ZodOptional<z.ZodNumber>;
    culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
    culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
    aiInsights: z.ZodOptional<z.ZodString>;
    personalizedRecommendations: z.ZodOptional<z.ZodObject<{
        strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    }>>;
    suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    isCompleted: z.ZodBoolean;
    isInProgress: z.ZodBoolean;
    completionStatus: z.ZodString;
    durationText: z.ZodOptional<z.ZodString>;
    scorePercentage: z.ZodOptional<z.ZodNumber>;
    primaryGiftDisplay: z.ZodOptional<z.ZodString>;
    secondaryGiftDisplay: z.ZodOptional<z.ZodString>;
    apestProfile: z.ZodOptional<z.ZodObject<{
        apostolic: z.ZodNumber;
        prophetic: z.ZodNumber;
        evangelistic: z.ZodNumber;
        shepherding: z.ZodNumber;
        teaching: z.ZodNumber;
        dominant: z.ZodString;
        secondary: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
        dominant: string;
        secondary: string;
    }, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
        dominant: string;
        secondary: string;
    }>>;
    user: z.ZodObject<{
        id: z.ZodString;
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string | undefined;
    }, {
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string | undefined;
    }>;
    assessment: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        assessmentType: z.ZodString;
        questionsCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
        questionsCount: number;
    }, {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
        questionsCount: number;
    }>;
    responses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        questionId: z.ZodString;
        responseValue: z.ZodOptional<z.ZodNumber>;
        responseText: z.ZodOptional<z.ZodString>;
        responseTime: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        id: string;
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }, {
        id: string;
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    userId: string;
    startedAt: string;
    completionPercentage: number;
    culturalAdjustmentApplied: boolean;
    suggestedPeers: string[];
    complementaryGifts: string[];
    assessment: {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
        questionsCount: number;
    };
    isCompleted: boolean;
    isInProgress: boolean;
    completionStatus: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string | undefined;
    };
    completedAt?: string | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
    durationText?: string | undefined;
    scorePercentage?: number | undefined;
    primaryGiftDisplay?: string | undefined;
    secondaryGiftDisplay?: string | undefined;
    apestProfile?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
        dominant: string;
        secondary: string;
    } | undefined;
    responses?: {
        id: string;
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }[] | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    userId: string;
    startedAt: string;
    assessment: {
        id: string;
        name: string;
        slug: string;
        assessmentType: string;
        questionsCount: number;
    };
    isCompleted: boolean;
    isInProgress: boolean;
    completionStatus: string;
    user: {
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string | undefined;
    };
    completedAt?: string | undefined;
    completionPercentage?: number | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
    durationText?: string | undefined;
    scorePercentage?: number | undefined;
    primaryGiftDisplay?: string | undefined;
    secondaryGiftDisplay?: string | undefined;
    apestProfile?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
        dominant: string;
        secondary: string;
    } | undefined;
    responses?: {
        id: string;
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }[] | undefined;
}>;
export declare const assessmentResponseResponseSchema: z.ZodObject<{
    id: z.ZodString;
    userAssessmentId: z.ZodString;
    questionId: z.ZodString;
    responseValue: z.ZodOptional<z.ZodNumber>;
    responseText: z.ZodOptional<z.ZodString>;
    responseTime: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    isSkipped: z.ZodBoolean;
    hasValue: z.ZodBoolean;
    hasText: z.ZodBoolean;
    responseTimeText: z.ZodOptional<z.ZodString>;
    confidenceDisplay: z.ZodOptional<z.ZodString>;
    question: z.ZodObject<{
        id: z.ZodString;
        questionText: z.ZodString;
        questionType: z.ZodString;
        orderIndex: z.ZodNumber;
        apestDimension: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        apestDimension?: string | undefined;
    }, {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        apestDimension?: string | undefined;
    }>;
    userAssessment: z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        assessmentId: z.ZodString;
        completedAt: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        assessmentId: string;
        userId: string;
        completedAt?: string | undefined;
    }, {
        id: string;
        assessmentId: string;
        userId: string;
        completedAt?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    skipped: boolean;
    isSkipped: boolean;
    question: {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        apestDimension?: string | undefined;
    };
    userAssessment: {
        id: string;
        assessmentId: string;
        userId: string;
        completedAt?: string | undefined;
    };
    hasValue: boolean;
    hasText: boolean;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    responseTimeText?: string | undefined;
    confidenceDisplay?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    isSkipped: boolean;
    question: {
        id: string;
        questionText: string;
        questionType: string;
        orderIndex: number;
        apestDimension?: string | undefined;
    };
    userAssessment: {
        id: string;
        assessmentId: string;
        userId: string;
        completedAt?: string | undefined;
    };
    hasValue: boolean;
    hasText: boolean;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseTimeText?: string | undefined;
    confidenceDisplay?: string | undefined;
}>;
export declare const createAssessmentSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    passingScore: z.ZodOptional<z.ZodNumber>;
    validityScore: z.ZodOptional<z.ZodNumber>;
    reliabilityScore: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    researchBacked: z.ZodDefault<z.ZodBoolean>;
    scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
} & {
    name: z.ZodString;
    slug: z.ZodString;
    assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questionsCount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
    status: "draft" | "active" | "archived" | "under_review";
    questionsCount: number;
    version: string;
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    description?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
}, {
    name: string;
    slug: string;
    assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
    questionsCount: number;
    description?: string | undefined;
    status?: "draft" | "active" | "archived" | "under_review" | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
export declare const createAssessmentQuestionSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodString>;
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
    isRequired: z.ZodDefault<z.ZodBoolean>;
    weight: z.ZodDefault<z.ZodNumber>;
    reverseScored: z.ZodDefault<z.ZodBoolean>;
} & {
    assessmentId: z.ZodString;
    questionText: z.ZodString;
    questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    orderIndex: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
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
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
}>;
export declare const createUserAssessmentSchema: z.ZodObject<{
    startedAt: z.ZodString;
    rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    totalScore: z.ZodOptional<z.ZodNumber>;
    maxPossibleScore: z.ZodOptional<z.ZodNumber>;
    apostolicScore: z.ZodOptional<z.ZodNumber>;
    propheticScore: z.ZodOptional<z.ZodNumber>;
    evangelisticScore: z.ZodOptional<z.ZodNumber>;
    shepherdingScore: z.ZodOptional<z.ZodNumber>;
    teachingScore: z.ZodOptional<z.ZodNumber>;
    normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    responseConsistency: z.ZodOptional<z.ZodNumber>;
    completionTime: z.ZodOptional<z.ZodNumber>;
    confidenceLevel: z.ZodOptional<z.ZodNumber>;
    culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
    culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
    aiInsights: z.ZodOptional<z.ZodString>;
    personalizedRecommendations: z.ZodOptional<z.ZodObject<{
        strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    }>>;
    suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
} & {
    userId: z.ZodString;
    assessmentId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    assessmentId: string;
    userId: string;
    startedAt: string;
    culturalAdjustmentApplied: boolean;
    suggestedPeers: string[];
    complementaryGifts: string[];
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
}, {
    assessmentId: string;
    userId: string;
    startedAt: string;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
}>;
export declare const createAssessmentResponseSchema: z.ZodObject<{
    responseValue: z.ZodOptional<z.ZodNumber>;
    responseText: z.ZodOptional<z.ZodString>;
    responseTime: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
} & {
    userAssessmentId: z.ZodString;
    questionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userAssessmentId: string;
    questionId: string;
    skipped: boolean;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
}, {
    userAssessmentId: string;
    questionId: string;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>;
export declare const updateAssessmentSchema: z.ZodObject<Omit<{
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>>;
    estimatedDuration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    passingScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    validityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    reliabilityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    version: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    culturalAdaptation: z.ZodOptional<z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>>;
    researchBacked: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    scoringMethod: z.ZodOptional<z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodOptional<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>>;
    questionsCount: z.ZodOptional<z.ZodNumber>;
}, "slug">, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    description?: string | undefined;
    assessmentType?: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other" | undefined;
    status?: "draft" | "active" | "archived" | "under_review" | undefined;
    questionsCount?: number | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}, {
    name?: string | undefined;
    description?: string | undefined;
    assessmentType?: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other" | undefined;
    status?: "draft" | "active" | "archived" | "under_review" | undefined;
    questionsCount?: number | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
export declare const updateAssessmentQuestionSchema: z.ZodObject<{
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
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
    isRequired: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    reverseScored: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    assessmentId: z.ZodOptional<z.ZodString>;
    questionText: z.ZodOptional<z.ZodString>;
    questionType: z.ZodOptional<z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>>;
    orderIndex: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    assessmentId?: string | undefined;
    questionText?: string | undefined;
    questionType?: "binary" | "ranking" | "likert" | "multiple_choice" | "text" | undefined;
    orderIndex?: number | undefined;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
}, {
    assessmentId?: string | undefined;
    questionText?: string | undefined;
    questionType?: "binary" | "ranking" | "likert" | "multiple_choice" | "text" | undefined;
    orderIndex?: number | undefined;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
}>;
export declare const updateUserAssessmentSchema: z.ZodObject<Omit<{
    startedAt: z.ZodOptional<z.ZodString>;
    rawScores: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>>;
    totalScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    maxPossibleScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    apostolicScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    propheticScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    evangelisticScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    shepherdingScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    teachingScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    normalizedScores: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>>;
    primaryGift: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    secondaryGift: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    responseConsistency: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    completionTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    confidenceLevel: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    culturalAdjustmentApplied: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    culturalAdjustmentFactor: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    aiInsights: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    personalizedRecommendations: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    }>>>;
    suggestedPeers: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    complementaryGifts: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    userId: z.ZodOptional<z.ZodString>;
    assessmentId: z.ZodOptional<z.ZodString>;
}, "assessmentId" | "userId">, "strip", z.ZodTypeAny, {
    startedAt?: string | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
}, {
    startedAt?: string | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
}>;
export declare const updateAssessmentResponseSchema: z.ZodObject<Omit<{
    responseValue: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    responseText: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    responseTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    confidence: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    skipped: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    userAssessmentId: z.ZodOptional<z.ZodString>;
    questionId: z.ZodOptional<z.ZodString>;
}, "userAssessmentId" | "questionId">, "strip", z.ZodTypeAny, {
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}, {
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>;
export declare const assessmentQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    culturalAdaptation: z.ZodOptional<z.ZodString>;
    researchBacked: z.ZodOptional<z.ZodBoolean>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "publishedAt", "name", "questionsCount", "estimatedDuration"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeQuestions: z.ZodDefault<z.ZodBoolean>;
    includeStatistics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "name" | "questionsCount" | "estimatedDuration" | "publishedAt" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    includeQuestions: boolean;
    includeStatistics: boolean;
    assessmentType?: string | undefined;
    status?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: string | undefined;
    researchBacked?: boolean | undefined;
    search?: string | undefined;
}, {
    assessmentType?: string | undefined;
    status?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: string | undefined;
    researchBacked?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "name" | "questionsCount" | "estimatedDuration" | "publishedAt" | "createdAt" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    includeQuestions?: boolean | undefined;
    includeStatistics?: boolean | undefined;
}>;
export declare const assessmentQuestionQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    assessmentId: z.ZodOptional<z.ZodString>;
    questionType: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    apestDimension: z.ZodOptional<z.ZodString>;
    isRequired: z.ZodOptional<z.ZodBoolean>;
    sortBy: z.ZodDefault<z.ZodEnum<["orderIndex", "createdAt", "updatedAt"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeAssessment: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "orderIndex";
    sortOrder: "asc" | "desc";
    includeAssessment: boolean;
    assessmentId?: string | undefined;
    questionType?: string | undefined;
    category?: string | undefined;
    apestDimension?: string | undefined;
    isRequired?: boolean | undefined;
}, {
    assessmentId?: string | undefined;
    questionType?: string | undefined;
    category?: string | undefined;
    apestDimension?: string | undefined;
    isRequired?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "orderIndex" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    includeAssessment?: boolean | undefined;
}>;
export declare const userAssessmentQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    userId: z.ZodOptional<z.ZodString>;
    assessmentId: z.ZodOptional<z.ZodString>;
    isCompleted: z.ZodOptional<z.ZodBoolean>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    startedAfter: z.ZodOptional<z.ZodString>;
    startedBefore: z.ZodOptional<z.ZodString>;
    completedAfter: z.ZodOptional<z.ZodString>;
    completedBefore: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "startedAt", "completedAt", "totalScore", "completionPercentage"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeUser: z.ZodDefault<z.ZodBoolean>;
    includeAssessment: z.ZodDefault<z.ZodBoolean>;
    includeResponses: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "startedAt" | "completedAt" | "completionPercentage" | "totalScore";
    sortOrder: "asc" | "desc";
    includeAssessment: boolean;
    includeUser: boolean;
    includeResponses: boolean;
    assessmentId?: string | undefined;
    userId?: string | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    isCompleted?: boolean | undefined;
    startedAfter?: string | undefined;
    startedBefore?: string | undefined;
    completedAfter?: string | undefined;
    completedBefore?: string | undefined;
}, {
    assessmentId?: string | undefined;
    userId?: string | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    isCompleted?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "startedAt" | "completedAt" | "completionPercentage" | "totalScore" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    includeAssessment?: boolean | undefined;
    startedAfter?: string | undefined;
    startedBefore?: string | undefined;
    completedAfter?: string | undefined;
    completedBefore?: string | undefined;
    includeUser?: boolean | undefined;
    includeResponses?: boolean | undefined;
}>;
export declare const assessmentResponseQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    userAssessmentId: z.ZodOptional<z.ZodString>;
    questionId: z.ZodOptional<z.ZodString>;
    skipped: z.ZodOptional<z.ZodBoolean>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeQuestion: z.ZodDefault<z.ZodBoolean>;
    includeUserAssessment: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    includeQuestion: boolean;
    includeUserAssessment: boolean;
    userAssessmentId?: string | undefined;
    questionId?: string | undefined;
    skipped?: boolean | undefined;
}, {
    userAssessmentId?: string | undefined;
    questionId?: string | undefined;
    skipped?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    includeQuestion?: boolean | undefined;
    includeUserAssessment?: boolean | undefined;
}>;
export declare const startAssessmentInputSchema: z.ZodObject<{
    assessmentId: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    assessmentId: string;
    userId: string;
}, {
    assessmentId: string;
    userId: string;
}>;
export declare const completeAssessmentInputSchema: z.ZodObject<{
    userAssessmentId: z.ZodString;
    responses: z.ZodArray<z.ZodObject<{
        questionId: z.ZodString;
        responseValue: z.ZodOptional<z.ZodNumber>;
        responseText: z.ZodOptional<z.ZodString>;
        responseTime: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }, {
        questionId: string;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    userAssessmentId: string;
    responses: {
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }[];
}, {
    userAssessmentId: string;
    responses: {
        questionId: string;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }[];
}>;
export declare const saveResponsesInputSchema: z.ZodObject<{
    userAssessmentId: z.ZodString;
    responses: z.ZodArray<z.ZodObject<{
        questionId: z.ZodString;
        responseValue: z.ZodOptional<z.ZodNumber>;
        responseText: z.ZodOptional<z.ZodString>;
        responseTime: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }, {
        questionId: string;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    userAssessmentId: string;
    responses: {
        questionId: string;
        skipped: boolean;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
    }[];
}, {
    userAssessmentId: string;
    responses: {
        questionId: string;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }[];
}>;
export declare const userAssessmentFiltersSchema: z.ZodObject<{
    assessmentType: z.ZodOptional<z.ZodString>;
    isCompleted: z.ZodOptional<z.ZodBoolean>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    dateRange: z.ZodOptional<z.ZodObject<{
        start: z.ZodOptional<z.ZodString>;
        end: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        start?: string | undefined;
        end?: string | undefined;
    }, {
        start?: string | undefined;
        end?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    assessmentType?: string | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    isCompleted?: boolean | undefined;
    dateRange?: {
        start?: string | undefined;
        end?: string | undefined;
    } | undefined;
}, {
    assessmentType?: string | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    isCompleted?: boolean | undefined;
    dateRange?: {
        start?: string | undefined;
        end?: string | undefined;
    } | undefined;
}>;
export type AssessmentEntity = z.infer<typeof assessmentEntitySchema>;
export type AssessmentQuestionEntity = z.infer<typeof assessmentQuestionEntitySchema>;
export type AssessmentQuestion = AssessmentQuestionEntity;
export type UserAssessmentEntity = z.infer<typeof userAssessmentEntitySchema>;
export type AssessmentResponseEntity = z.infer<typeof assessmentResponseEntitySchema>;
export type AssessmentResponse = z.infer<typeof assessmentResponseSchema>;
export type AssessmentQuestionResponse = z.infer<typeof assessmentQuestionResponseSchema>;
export type UserAssessmentResponse = z.infer<typeof userAssessmentResponseSchema>;
export type AssessmentResponseResponse = z.infer<typeof assessmentResponseResponseSchema>;
export type CreateAssessment = z.infer<typeof createAssessmentSchema>;
export type CreateAssessmentQuestion = z.infer<typeof createAssessmentQuestionSchema>;
export type CreateUserAssessment = z.infer<typeof createUserAssessmentSchema>;
export type CreateAssessmentResponse = z.infer<typeof createAssessmentResponseSchema>;
export type UpdateAssessment = z.infer<typeof updateAssessmentSchema>;
export type UpdateAssessmentQuestion = z.infer<typeof updateAssessmentQuestionSchema>;
export type UpdateUserAssessment = z.infer<typeof updateUserAssessmentSchema>;
export type UpdateAssessmentResponse = z.infer<typeof updateAssessmentResponseSchema>;
export type AssessmentQuery = z.infer<typeof assessmentQuerySchema>;
export type AssessmentQuestionQuery = z.infer<typeof assessmentQuestionQuerySchema>;
export type UserAssessmentQuery = z.infer<typeof userAssessmentQuerySchema>;
export type AssessmentResponseQuery = z.infer<typeof assessmentResponseQuerySchema>;
export type StartAssessmentInput = z.infer<typeof startAssessmentInputSchema>;
export type CompleteAssessmentInput = z.infer<typeof completeAssessmentInputSchema>;
export type SaveResponsesInput = z.infer<typeof saveResponsesInputSchema>;
export type UserAssessmentFilters = z.infer<typeof userAssessmentFiltersSchema>;
export type AssessmentWithQuestions = AssessmentResponse;
export type AssessmentWithQuestionsResponse = AssessmentResponse;
export type Assessment = AssessmentEntity;
export type NewAssessment = CreateAssessment;
export type NewAssessmentQuestion = CreateAssessmentQuestion;
export type NewAssessmentResponse = CreateAssessmentResponse;
export type NewUserAssessment = CreateUserAssessment;
export type UserAssessment = UserAssessmentEntity;
export type AssessmentSearch = AssessmentQuery;
export declare const paginatedAssessmentListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userAssessmentId: z.ZodString;
        questionId: z.ZodString;
        responseValue: z.ZodOptional<z.ZodNumber>;
        responseText: z.ZodOptional<z.ZodString>;
        responseTime: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
        isSkipped: z.ZodBoolean;
        hasResponse: z.ZodBoolean;
        responseTimeText: z.ZodOptional<z.ZodString>;
        confidenceLevel: z.ZodOptional<z.ZodString>;
        question: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            questionText: z.ZodString;
            questionType: z.ZodString;
            orderIndex: z.ZodNumber;
            category: z.ZodOptional<z.ZodString>;
            apestDimension: z.ZodOptional<z.ZodString>;
            isRequired: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            questionText: string;
            questionType: string;
            orderIndex: number;
            isRequired: boolean;
            category?: string | undefined;
            apestDimension?: string | undefined;
        }, {
            id: string;
            questionText: string;
            questionType: string;
            orderIndex: number;
            isRequired: boolean;
            category?: string | undefined;
            apestDimension?: string | undefined;
        }>>;
        userAssessment: z.ZodOptional<z.ZodObject<{
            id: z.ZodString;
            userId: z.ZodString;
            assessmentId: z.ZodString;
            status: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            status: string;
            assessmentId: string;
            userId: string;
        }, {
            id: string;
            status: string;
            assessmentId: string;
            userId: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        userAssessmentId: string;
        questionId: string;
        skipped: boolean;
        isSkipped: boolean;
        hasResponse: boolean;
        confidenceLevel?: string | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        responseTimeText?: string | undefined;
        question?: {
            id: string;
            questionText: string;
            questionType: string;
            orderIndex: number;
            isRequired: boolean;
            category?: string | undefined;
            apestDimension?: string | undefined;
        } | undefined;
        userAssessment?: {
            id: string;
            status: string;
            assessmentId: string;
            userId: string;
        } | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        userAssessmentId: string;
        questionId: string;
        isSkipped: boolean;
        hasResponse: boolean;
        confidenceLevel?: string | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
        responseTimeText?: string | undefined;
        question?: {
            id: string;
            questionText: string;
            questionType: string;
            orderIndex: number;
            isRequired: boolean;
            category?: string | undefined;
            apestDimension?: string | undefined;
        } | undefined;
        userAssessment?: {
            id: string;
            status: string;
            assessmentId: string;
            userId: string;
        } | undefined;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        hasMore: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        userAssessmentId: string;
        questionId: string;
        skipped: boolean;
        isSkipped: boolean;
        hasResponse: boolean;
        confidenceLevel?: string | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        responseTimeText?: string | undefined;
        question?: {
            id: string;
            questionText: string;
            questionType: string;
            orderIndex: number;
            isRequired: boolean;
            category?: string | undefined;
            apestDimension?: string | undefined;
        } | undefined;
        userAssessment?: {
            id: string;
            status: string;
            assessmentId: string;
            userId: string;
        } | undefined;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        userAssessmentId: string;
        questionId: string;
        isSkipped: boolean;
        hasResponse: boolean;
        confidenceLevel?: string | undefined;
        responseValue?: number | undefined;
        responseText?: string | undefined;
        responseTime?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
        responseTimeText?: string | undefined;
        question?: {
            id: string;
            questionText: string;
            questionType: string;
            orderIndex: number;
            isRequired: boolean;
            category?: string | undefined;
            apestDimension?: string | undefined;
        } | undefined;
        userAssessment?: {
            id: string;
            status: string;
            assessmentId: string;
            userId: string;
        } | undefined;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
}>;
export declare const paginatedUserAssessmentListResponseSchema: z.ZodObject<{
    data: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        userId: z.ZodString;
        assessmentId: z.ZodString;
        startedAt: z.ZodString;
        completedAt: z.ZodOptional<z.ZodString>;
        completionPercentage: z.ZodDefault<z.ZodNumber>;
        rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        totalScore: z.ZodOptional<z.ZodNumber>;
        maxPossibleScore: z.ZodOptional<z.ZodNumber>;
        apostolicScore: z.ZodOptional<z.ZodNumber>;
        propheticScore: z.ZodOptional<z.ZodNumber>;
        evangelisticScore: z.ZodOptional<z.ZodNumber>;
        shepherdingScore: z.ZodOptional<z.ZodNumber>;
        teachingScore: z.ZodOptional<z.ZodNumber>;
        normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        primaryGift: z.ZodOptional<z.ZodString>;
        secondaryGift: z.ZodOptional<z.ZodString>;
        responseConsistency: z.ZodOptional<z.ZodNumber>;
        completionTime: z.ZodOptional<z.ZodNumber>;
        confidenceLevel: z.ZodOptional<z.ZodNumber>;
        culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
        culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
        aiInsights: z.ZodOptional<z.ZodString>;
        personalizedRecommendations: z.ZodOptional<z.ZodObject<{
            strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strip", z.ZodTypeAny, {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        }, {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        }>>;
        suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    } & {
        isCompleted: z.ZodBoolean;
        isInProgress: z.ZodBoolean;
        completionStatus: z.ZodString;
        durationText: z.ZodOptional<z.ZodString>;
        scorePercentage: z.ZodOptional<z.ZodNumber>;
        primaryGiftDisplay: z.ZodOptional<z.ZodString>;
        secondaryGiftDisplay: z.ZodOptional<z.ZodString>;
        apestProfile: z.ZodOptional<z.ZodObject<{
            apostolic: z.ZodNumber;
            prophetic: z.ZodNumber;
            evangelistic: z.ZodNumber;
            shepherding: z.ZodNumber;
            teaching: z.ZodNumber;
            dominant: z.ZodString;
            secondary: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
            dominant: string;
            secondary: string;
        }, {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
            dominant: string;
            secondary: string;
        }>>;
        user: z.ZodObject<{
            id: z.ZodString;
            firstName: z.ZodString;
            lastName: z.ZodString;
            displayName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        }, {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        }>;
        assessment: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            assessmentType: z.ZodString;
            questionsCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            id: string;
            name: string;
            slug: string;
            assessmentType: string;
            questionsCount: number;
        }, {
            id: string;
            name: string;
            slug: string;
            assessmentType: string;
            questionsCount: number;
        }>;
        responses: z.ZodOptional<z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            questionId: z.ZodString;
            responseValue: z.ZodOptional<z.ZodNumber>;
            responseText: z.ZodOptional<z.ZodString>;
            responseTime: z.ZodOptional<z.ZodNumber>;
            confidence: z.ZodOptional<z.ZodNumber>;
            skipped: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            id: string;
            questionId: string;
            skipped: boolean;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
            confidence?: number | undefined;
        }, {
            id: string;
            questionId: string;
            skipped: boolean;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
            confidence?: number | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        assessment: {
            id: string;
            name: string;
            slug: string;
            assessmentType: string;
            questionsCount: number;
        };
        isCompleted: boolean;
        isInProgress: boolean;
        completionStatus: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        completedAt?: string | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        } | undefined;
        durationText?: string | undefined;
        scorePercentage?: number | undefined;
        primaryGiftDisplay?: string | undefined;
        secondaryGiftDisplay?: string | undefined;
        apestProfile?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
            dominant: string;
            secondary: string;
        } | undefined;
        responses?: {
            id: string;
            questionId: string;
            skipped: boolean;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
            confidence?: number | undefined;
        }[] | undefined;
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        assessment: {
            id: string;
            name: string;
            slug: string;
            assessmentType: string;
            questionsCount: number;
        };
        isCompleted: boolean;
        isInProgress: boolean;
        completionStatus: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        completedAt?: string | undefined;
        completionPercentage?: number | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentApplied?: boolean | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        } | undefined;
        suggestedPeers?: string[] | undefined;
        complementaryGifts?: string[] | undefined;
        durationText?: string | undefined;
        scorePercentage?: number | undefined;
        primaryGiftDisplay?: string | undefined;
        secondaryGiftDisplay?: string | undefined;
        apestProfile?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
            dominant: string;
            secondary: string;
        } | undefined;
        responses?: {
            id: string;
            questionId: string;
            skipped: boolean;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
            confidence?: number | undefined;
        }[] | undefined;
    }>, "many">;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        hasMore: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }, {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    }>;
}, "strip", z.ZodTypeAny, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        completionPercentage: number;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        assessment: {
            id: string;
            name: string;
            slug: string;
            assessmentType: string;
            questionsCount: number;
        };
        isCompleted: boolean;
        isInProgress: boolean;
        completionStatus: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        completedAt?: string | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths: string[];
            growthAreas: string[];
            actionItems: string[];
            contentRecommendations: string[];
        } | undefined;
        durationText?: string | undefined;
        scorePercentage?: number | undefined;
        primaryGiftDisplay?: string | undefined;
        secondaryGiftDisplay?: string | undefined;
        apestProfile?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
            dominant: string;
            secondary: string;
        } | undefined;
        responses?: {
            id: string;
            questionId: string;
            skipped: boolean;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
            confidence?: number | undefined;
        }[] | undefined;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
}, {
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        userId: string;
        startedAt: string;
        assessment: {
            id: string;
            name: string;
            slug: string;
            assessmentType: string;
            questionsCount: number;
        };
        isCompleted: boolean;
        isInProgress: boolean;
        completionStatus: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            displayName?: string | undefined;
        };
        completedAt?: string | undefined;
        completionPercentage?: number | undefined;
        rawScores?: Record<string, number> | undefined;
        totalScore?: number | undefined;
        maxPossibleScore?: number | undefined;
        apostolicScore?: number | undefined;
        propheticScore?: number | undefined;
        evangelisticScore?: number | undefined;
        shepherdingScore?: number | undefined;
        teachingScore?: number | undefined;
        normalizedScores?: Record<string, number> | undefined;
        primaryGift?: string | undefined;
        secondaryGift?: string | undefined;
        responseConsistency?: number | undefined;
        completionTime?: number | undefined;
        confidenceLevel?: number | undefined;
        culturalAdjustmentApplied?: boolean | undefined;
        culturalAdjustmentFactor?: number | undefined;
        aiInsights?: string | undefined;
        personalizedRecommendations?: {
            strengths?: string[] | undefined;
            growthAreas?: string[] | undefined;
            actionItems?: string[] | undefined;
            contentRecommendations?: string[] | undefined;
        } | undefined;
        suggestedPeers?: string[] | undefined;
        complementaryGifts?: string[] | undefined;
        durationText?: string | undefined;
        scorePercentage?: number | undefined;
        primaryGiftDisplay?: string | undefined;
        secondaryGiftDisplay?: string | undefined;
        apestProfile?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
            dominant: string;
            secondary: string;
        } | undefined;
        responses?: {
            id: string;
            questionId: string;
            skipped: boolean;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
            confidence?: number | undefined;
        }[] | undefined;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        hasMore: boolean;
    };
}>;
export type PaginatedAssessmentListResponse = z.infer<typeof paginatedAssessmentListResponseSchema>;
export type PaginatedUserAssessmentListResponse = z.infer<typeof paginatedUserAssessmentListResponseSchema>;
export type UserAssessmentWithDetailsResponse = UserAssessmentResponse;
export declare const assessmentSearchSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    search: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodString>;
    language: z.ZodOptional<z.ZodString>;
    culturalAdaptation: z.ZodOptional<z.ZodString>;
    researchBacked: z.ZodOptional<z.ZodBoolean>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "publishedAt", "name", "questionsCount", "estimatedDuration"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    includeQuestions: z.ZodDefault<z.ZodBoolean>;
    includeStatistics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "name" | "questionsCount" | "estimatedDuration" | "publishedAt" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    includeQuestions: boolean;
    includeStatistics: boolean;
    assessmentType?: string | undefined;
    status?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: string | undefined;
    researchBacked?: boolean | undefined;
    search?: string | undefined;
}, {
    assessmentType?: string | undefined;
    status?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: string | undefined;
    researchBacked?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "name" | "questionsCount" | "estimatedDuration" | "publishedAt" | "createdAt" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    includeQuestions?: boolean | undefined;
    includeStatistics?: boolean | undefined;
}>;
export declare const assessmentWithQuestionsSchema: z.ZodObject<{
    assessment: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
        questionsCount: z.ZodNumber;
        estimatedDuration: z.ZodOptional<z.ZodNumber>;
        passingScore: z.ZodOptional<z.ZodNumber>;
        validityScore: z.ZodOptional<z.ZodNumber>;
        reliabilityScore: z.ZodOptional<z.ZodNumber>;
        instructions: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        version: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
        researchBacked: z.ZodDefault<z.ZodBoolean>;
        scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        status: "draft" | "active" | "archived" | "under_review";
        questionsCount: number;
        version: string;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
    }, {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        questionsCount: number;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        status?: "draft" | "active" | "archived" | "under_review" | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
        version?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    }>;
    questions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        assessmentId: z.ZodString;
        questionText: z.ZodString;
        questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
        orderIndex: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
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
        isRequired: z.ZodDefault<z.ZodBoolean>;
        weight: z.ZodDefault<z.ZodNumber>;
        reverseScored: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
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
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
        category?: string | undefined;
        apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answerOptions?: {
            value: number;
            label: string;
            description?: string | undefined;
        }[] | undefined;
        isRequired?: boolean | undefined;
        weight?: number | undefined;
        reverseScored?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    assessment: {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        status: "draft" | "active" | "archived" | "under_review";
        questionsCount: number;
        version: string;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
    };
    questions: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
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
    }[];
}, {
    assessment: {
        id: string;
        name: string;
        slug: string;
        assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
        questionsCount: number;
        createdAt: string;
        updatedAt: string;
        description?: string | undefined;
        status?: "draft" | "active" | "archived" | "under_review" | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        publishedAt?: string | undefined;
        version?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    };
    questions: {
        id: string;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        orderIndex: number;
        category?: string | undefined;
        apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answerOptions?: {
            value: number;
            label: string;
            description?: string | undefined;
        }[] | undefined;
        isRequired?: boolean | undefined;
        weight?: number | undefined;
        reverseScored?: boolean | undefined;
    }[];
}>;
export declare const assessmentSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questionsCount: z.ZodNumber;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    passingScore: z.ZodOptional<z.ZodNumber>;
    validityScore: z.ZodOptional<z.ZodNumber>;
    reliabilityScore: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    researchBacked: z.ZodDefault<z.ZodBoolean>;
    scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    slug: string;
    assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
    status: "draft" | "active" | "archived" | "under_review";
    questionsCount: number;
    version: string;
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
}, {
    id: string;
    name: string;
    slug: string;
    assessmentType: "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | "other";
    questionsCount: number;
    createdAt: string;
    updatedAt: string;
    description?: string | undefined;
    status?: "draft" | "active" | "archived" | "under_review" | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    publishedAt?: string | undefined;
    version?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
export declare const assessmentQuestionSchema: z.ZodObject<{
    id: z.ZodString;
    assessmentId: z.ZodString;
    questionText: z.ZodString;
    questionType: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    orderIndex: z.ZodNumber;
    category: z.ZodOptional<z.ZodString>;
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
    isRequired: z.ZodDefault<z.ZodBoolean>;
    weight: z.ZodDefault<z.ZodNumber>;
    reverseScored: z.ZodDefault<z.ZodBoolean>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
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
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    orderIndex: number;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
}>;
export declare const userAssessmentSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    assessmentId: z.ZodString;
    startedAt: z.ZodString;
    completedAt: z.ZodOptional<z.ZodString>;
    completionPercentage: z.ZodDefault<z.ZodNumber>;
    rawScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    totalScore: z.ZodOptional<z.ZodNumber>;
    maxPossibleScore: z.ZodOptional<z.ZodNumber>;
    apostolicScore: z.ZodOptional<z.ZodNumber>;
    propheticScore: z.ZodOptional<z.ZodNumber>;
    evangelisticScore: z.ZodOptional<z.ZodNumber>;
    shepherdingScore: z.ZodOptional<z.ZodNumber>;
    teachingScore: z.ZodOptional<z.ZodNumber>;
    normalizedScores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primaryGift: z.ZodOptional<z.ZodString>;
    secondaryGift: z.ZodOptional<z.ZodString>;
    responseConsistency: z.ZodOptional<z.ZodNumber>;
    completionTime: z.ZodOptional<z.ZodNumber>;
    confidenceLevel: z.ZodOptional<z.ZodNumber>;
    culturalAdjustmentApplied: z.ZodDefault<z.ZodBoolean>;
    culturalAdjustmentFactor: z.ZodOptional<z.ZodNumber>;
    aiInsights: z.ZodOptional<z.ZodString>;
    personalizedRecommendations: z.ZodOptional<z.ZodObject<{
        strengths: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        growthAreas: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        actionItems: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentRecommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    }, {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    }>>;
    suggestedPeers: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementaryGifts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    userId: string;
    startedAt: string;
    completionPercentage: number;
    culturalAdjustmentApplied: boolean;
    suggestedPeers: string[];
    complementaryGifts: string[];
    completedAt?: string | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths: string[];
        growthAreas: string[];
        actionItems: string[];
        contentRecommendations: string[];
    } | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    userId: string;
    startedAt: string;
    completedAt?: string | undefined;
    completionPercentage?: number | undefined;
    rawScores?: Record<string, number> | undefined;
    totalScore?: number | undefined;
    maxPossibleScore?: number | undefined;
    apostolicScore?: number | undefined;
    propheticScore?: number | undefined;
    evangelisticScore?: number | undefined;
    shepherdingScore?: number | undefined;
    teachingScore?: number | undefined;
    normalizedScores?: Record<string, number> | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    responseConsistency?: number | undefined;
    completionTime?: number | undefined;
    confidenceLevel?: number | undefined;
    culturalAdjustmentApplied?: boolean | undefined;
    culturalAdjustmentFactor?: number | undefined;
    aiInsights?: string | undefined;
    personalizedRecommendations?: {
        strengths?: string[] | undefined;
        growthAreas?: string[] | undefined;
        actionItems?: string[] | undefined;
        contentRecommendations?: string[] | undefined;
    } | undefined;
    suggestedPeers?: string[] | undefined;
    complementaryGifts?: string[] | undefined;
}>;
export declare const newAssessmentResponseSchema: z.ZodObject<{
    responseValue: z.ZodOptional<z.ZodNumber>;
    responseText: z.ZodOptional<z.ZodString>;
    responseTime: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
} & {
    userAssessmentId: z.ZodString;
    questionId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userAssessmentId: string;
    questionId: string;
    skipped: boolean;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
}, {
    userAssessmentId: string;
    questionId: string;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>;
//# sourceMappingURL=assessment.schema.d.ts.map