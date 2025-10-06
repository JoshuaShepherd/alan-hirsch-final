import { z } from 'zod';
export declare const createAiConversationSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    title: z.ZodNullable<z.ZodString>;
    primaryTopic: z.ZodNullable<z.ZodString>;
    theologicalContext: z.ZodNullable<z.ZodObject<{
        themes: z.ZodArray<z.ZodString, "many">;
        scriptures: z.ZodArray<z.ZodString, "many">;
        traditions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    }, {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    }>>;
    userApestProfile: z.ZodNullable<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        scores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    }, {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    }>>;
    ministryContext: z.ZodNullable<z.ZodObject<{
        role: z.ZodString;
        experience: z.ZodNumber;
        focus_areas: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        role: string;
        experience: number;
        focus_areas: string[];
    }, {
        role: string;
        experience: number;
        focus_areas: string[];
    }>>;
    culturalContext: z.ZodNullable<z.ZodString>;
    conversationDurationMinutes: z.ZodNullable<z.ZodNumber>;
    userSatisfactionRating: z.ZodNullable<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodDefault<z.ZodBoolean>;
    helpfulnessRating: z.ZodNullable<z.ZodNumber>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    referencedContent: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generatedInsights: z.ZodNullable<z.ZodString>;
} & {
    userId: z.ZodString;
    conversationType: z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    conversationType: "theological_discussion" | "content_creation" | "assessment_guidance" | "ministry_advice" | "leadership_coaching" | "content_discovery" | "research_assistance" | "general";
    status: "active" | "completed" | "abandoned" | "archived";
    title: string | null;
    primaryTopic: string | null;
    theologicalContext: {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    } | null;
    userApestProfile: {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    } | null;
    ministryContext: {
        role: string;
        experience: number;
        focus_areas: string[];
    } | null;
    culturalContext: string | null;
    conversationDurationMinutes: number | null;
    userSatisfactionRating: number | null;
    theologicalAccuracyVerified: boolean;
    helpfulnessRating: number | null;
    aiModel: string;
    modelVersion: string | null;
    referencedContent: string[];
    generatedInsights: string | null;
}, {
    userId: string;
    conversationType: "theological_discussion" | "content_creation" | "assessment_guidance" | "ministry_advice" | "leadership_coaching" | "content_discovery" | "research_assistance" | "general";
    title: string | null;
    primaryTopic: string | null;
    theologicalContext: {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    } | null;
    userApestProfile: {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    } | null;
    ministryContext: {
        role: string;
        experience: number;
        focus_areas: string[];
    } | null;
    culturalContext: string | null;
    conversationDurationMinutes: number | null;
    userSatisfactionRating: number | null;
    helpfulnessRating: number | null;
    modelVersion: string | null;
    generatedInsights: string | null;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    aiModel?: string | undefined;
    referencedContent?: string[] | undefined;
}>;
export declare const createAiMessageSchema: z.ZodObject<{
    tokenCount: z.ZodNullable<z.ZodNumber>;
    citedContent: z.ZodDefault<z.ZodArray<z.ZodObject<{
        contentId: z.ZodString;
        title: z.ZodString;
        relevanceScore: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        title: string;
        contentId: string;
        relevanceScore: number;
    }, {
        title: string;
        contentId: string;
        relevanceScore: number;
    }>, "many">>;
    confidence: z.ZodNullable<z.ZodString>;
    factualAccuracy: z.ZodNullable<z.ZodBoolean>;
    theologicalSoundness: z.ZodNullable<z.ZodBoolean>;
    userRating: z.ZodNullable<z.ZodNumber>;
    userFeedback: z.ZodNullable<z.ZodString>;
    flaggedForReview: z.ZodDefault<z.ZodBoolean>;
    processingTime: z.ZodNullable<z.ZodNumber>;
} & {
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    messageIndex: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    role: "user" | "assistant" | "system";
    conversationId: string;
    content: string;
    messageIndex: number;
    tokenCount: number | null;
    citedContent: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[];
    confidence: string | null;
    factualAccuracy: boolean | null;
    theologicalSoundness: boolean | null;
    userRating: number | null;
    userFeedback: string | null;
    flaggedForReview: boolean;
    processingTime: number | null;
}, {
    role: "user" | "assistant" | "system";
    conversationId: string;
    content: string;
    messageIndex: number;
    tokenCount: number | null;
    confidence: string | null;
    factualAccuracy: boolean | null;
    theologicalSoundness: boolean | null;
    userRating: number | null;
    userFeedback: string | null;
    processingTime: number | null;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    flaggedForReview?: boolean | undefined;
}>;
export declare const createAiContentJobSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    result: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    tokensUsed: z.ZodNullable<z.ZodNumber>;
    processingCost: z.ZodNullable<z.ZodString>;
    errorMessage: z.ZodNullable<z.ZodString>;
} & {
    jobType: z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>;
    contentId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "completed" | "pending" | "processing" | "failed" | "cancelled";
    aiModel: string;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    parameters: Record<string, any>;
    priority: "low" | "normal" | "high" | "urgent";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanReviewed: boolean;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    tokensUsed: number | null;
    processingCost: string | null;
    errorMessage: string | null;
    userId?: string | undefined;
    contentId?: string | undefined;
}, {
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    tokensUsed: number | null;
    processingCost: string | null;
    errorMessage: string | null;
    userId?: string | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    contentId?: string | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
}>;
export declare const createAiCrossReferenceSuggestionSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    reasoning: z.ZodNullable<z.ZodString>;
    keyConnections: z.ZodNullable<z.ZodObject<{
        themes: z.ZodArray<z.ZodString, "many">;
        concepts: z.ZodArray<z.ZodString, "many">;
        scriptures: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    }, {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    }>>;
} & {
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    suggestedReferenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    confidenceScore: z.ZodString;
    relevanceScore: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "pending" | "approved" | "rejected" | "implemented";
    aiModel: string;
    modelVersion: string | null;
    relevanceScore: string;
    confidenceScore: string;
    humanReviewed: boolean;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    sourceContentId: string;
    targetContentId: string;
    suggestedReferenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    reasoning: string | null;
    keyConnections: {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    } | null;
}, {
    modelVersion: string | null;
    relevanceScore: string;
    confidenceScore: string;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    sourceContentId: string;
    targetContentId: string;
    suggestedReferenceType: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes";
    reasoning: string | null;
    keyConnections: {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    } | null;
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    humanReviewed?: boolean | undefined;
}>;
export declare const createTheologicalConceptSchema: z.ZodObject<{
    definition: z.ZodNullable<z.ZodString>;
    theologicalTradition: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    biblicalReferences: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    historicalPeriod: z.ZodNullable<z.ZodString>;
    relatedConcepts: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    synonyms: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    apestRelevance: z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodNumber;
        prophetic: z.ZodNumber;
        evangelistic: z.ZodNumber;
        shepherding: z.ZodNumber;
        teaching: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }>>;
} & {
    name: z.ZodString;
    slug: z.ZodString;
    conceptType: z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    slug: string;
    definition: string | null;
    conceptType: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text";
    theologicalTradition: string[];
    biblicalReferences: string[];
    historicalPeriod: string | null;
    relatedConcepts: string[];
    synonyms: string[];
    apestRelevance: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    };
}, {
    name: string;
    slug: string;
    definition: string | null;
    conceptType: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text";
    historicalPeriod: string | null;
    theologicalTradition?: string[] | undefined;
    biblicalReferences?: string[] | undefined;
    relatedConcepts?: string[] | undefined;
    synonyms?: string[] | undefined;
    apestRelevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
}>;
export declare const updateAiConversationSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    primaryTopic: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    theologicalContext: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        themes: z.ZodArray<z.ZodString, "many">;
        scriptures: z.ZodArray<z.ZodString, "many">;
        traditions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    }, {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    }>>>;
    userApestProfile: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        primary: z.ZodString;
        secondary: z.ZodString;
        scores: z.ZodRecord<z.ZodString, z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    }, {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    }>>>;
    ministryContext: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        role: z.ZodString;
        experience: z.ZodNumber;
        focus_areas: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        role: string;
        experience: number;
        focus_areas: string[];
    }, {
        role: string;
        experience: number;
        focus_areas: string[];
    }>>>;
    culturalContext: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conversationDurationMinutes: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    aiModel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modelVersion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    referencedContent: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    generatedInsights: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    userId: z.ZodOptional<z.ZodString>;
    conversationType: z.ZodOptional<z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>>;
} & {
    status: z.ZodOptional<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    userSatisfactionRating: z.ZodOptional<z.ZodNumber>;
    helpfulnessRating: z.ZodOptional<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    userId?: string | undefined;
    conversationType?: "theological_discussion" | "content_creation" | "assessment_guidance" | "ministry_advice" | "leadership_coaching" | "content_discovery" | "research_assistance" | "general" | undefined;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    title?: string | null | undefined;
    primaryTopic?: string | null | undefined;
    theologicalContext?: {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    } | null | undefined;
    userApestProfile?: {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    } | null | undefined;
    ministryContext?: {
        role: string;
        experience: number;
        focus_areas: string[];
    } | null | undefined;
    culturalContext?: string | null | undefined;
    conversationDurationMinutes?: number | null | undefined;
    userSatisfactionRating?: number | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    helpfulnessRating?: number | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    referencedContent?: string[] | undefined;
    generatedInsights?: string | null | undefined;
}, {
    userId?: string | undefined;
    conversationType?: "theological_discussion" | "content_creation" | "assessment_guidance" | "ministry_advice" | "leadership_coaching" | "content_discovery" | "research_assistance" | "general" | undefined;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    title?: string | null | undefined;
    primaryTopic?: string | null | undefined;
    theologicalContext?: {
        themes: string[];
        scriptures: string[];
        traditions: string[];
    } | null | undefined;
    userApestProfile?: {
        primary: string;
        secondary: string;
        scores: Record<string, number>;
    } | null | undefined;
    ministryContext?: {
        role: string;
        experience: number;
        focus_areas: string[];
    } | null | undefined;
    culturalContext?: string | null | undefined;
    conversationDurationMinutes?: number | null | undefined;
    userSatisfactionRating?: number | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    helpfulnessRating?: number | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    referencedContent?: string[] | undefined;
    generatedInsights?: string | null | undefined;
}>;
export declare const updateAiMessageSchema: z.ZodObject<{
    tokenCount: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    citedContent: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodObject<{
        contentId: z.ZodString;
        title: z.ZodString;
        relevanceScore: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        title: string;
        contentId: string;
        relevanceScore: number;
    }, {
        title: string;
        contentId: string;
        relevanceScore: number;
    }>, "many">>>;
    confidence: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    factualAccuracy: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    theologicalSoundness: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    processingTime: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    conversationId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["user", "assistant", "system"]>>;
    content: z.ZodOptional<z.ZodString>;
    messageIndex: z.ZodOptional<z.ZodNumber>;
} & {
    userRating: z.ZodOptional<z.ZodNumber>;
    userFeedback: z.ZodOptional<z.ZodString>;
    flaggedForReview: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    role?: "user" | "assistant" | "system" | undefined;
    conversationId?: string | undefined;
    content?: string | undefined;
    messageIndex?: number | undefined;
    tokenCount?: number | null | undefined;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    confidence?: string | null | undefined;
    factualAccuracy?: boolean | null | undefined;
    theologicalSoundness?: boolean | null | undefined;
    userRating?: number | undefined;
    userFeedback?: string | undefined;
    flaggedForReview?: boolean | undefined;
    processingTime?: number | null | undefined;
}, {
    role?: "user" | "assistant" | "system" | undefined;
    conversationId?: string | undefined;
    content?: string | undefined;
    messageIndex?: number | undefined;
    tokenCount?: number | null | undefined;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    confidence?: string | null | undefined;
    factualAccuracy?: boolean | null | undefined;
    theologicalSoundness?: boolean | null | undefined;
    userRating?: number | undefined;
    userFeedback?: string | undefined;
    flaggedForReview?: boolean | undefined;
    processingTime?: number | null | undefined;
}>;
export declare const updateAiContentJobSchema: z.ZodObject<{
    aiModel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    parameters: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>>;
    tokensUsed: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    processingCost: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    jobType: z.ZodOptional<z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>>;
    contentId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    userId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    result: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodOptional<z.ZodString>;
    humanReviewed: z.ZodOptional<z.ZodBoolean>;
    humanApproved: z.ZodOptional<z.ZodBoolean>;
    reviewNotes: z.ZodOptional<z.ZodString>;
    errorMessage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId?: string | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    contentId?: string | undefined;
    jobType?: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check" | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    result?: Record<string, any> | undefined;
    confidenceScore?: string | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | undefined;
    reviewNotes?: string | undefined;
    tokensUsed?: number | null | undefined;
    processingCost?: string | null | undefined;
    errorMessage?: string | undefined;
}, {
    userId?: string | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    contentId?: string | undefined;
    jobType?: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check" | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    result?: Record<string, any> | undefined;
    confidenceScore?: string | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | undefined;
    reviewNotes?: string | undefined;
    tokensUsed?: number | null | undefined;
    processingCost?: string | null | undefined;
    errorMessage?: string | undefined;
}>;
export declare const updateAiCrossReferenceSuggestionSchema: z.ZodObject<{
    aiModel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modelVersion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    reasoning: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    keyConnections: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        themes: z.ZodArray<z.ZodString, "many">;
        concepts: z.ZodArray<z.ZodString, "many">;
        scriptures: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    }, {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    }>>>;
    sourceContentId: z.ZodOptional<z.ZodString>;
    targetContentId: z.ZodOptional<z.ZodString>;
    suggestedReferenceType: z.ZodOptional<z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>>;
    confidenceScore: z.ZodOptional<z.ZodString>;
    relevanceScore: z.ZodOptional<z.ZodString>;
} & {
    status: z.ZodOptional<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    humanReviewed: z.ZodOptional<z.ZodBoolean>;
    humanApproved: z.ZodOptional<z.ZodBoolean>;
    reviewNotes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    relevanceScore?: string | undefined;
    confidenceScore?: string | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | undefined;
    reviewNotes?: string | undefined;
    sourceContentId?: string | undefined;
    targetContentId?: string | undefined;
    suggestedReferenceType?: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes" | undefined;
    reasoning?: string | null | undefined;
    keyConnections?: {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    } | null | undefined;
}, {
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    relevanceScore?: string | undefined;
    confidenceScore?: string | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | undefined;
    reviewNotes?: string | undefined;
    sourceContentId?: string | undefined;
    targetContentId?: string | undefined;
    suggestedReferenceType?: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes" | undefined;
    reasoning?: string | null | undefined;
    keyConnections?: {
        themes: string[];
        scriptures: string[];
        concepts: string[];
    } | null | undefined;
}>;
export declare const updateTheologicalConceptSchema: z.ZodObject<{
    theologicalTradition: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    biblicalReferences: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    relatedConcepts: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    synonyms: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    apestRelevance: z.ZodOptional<z.ZodDefault<z.ZodObject<{
        apostolic: z.ZodNumber;
        prophetic: z.ZodNumber;
        evangelistic: z.ZodNumber;
        shepherding: z.ZodNumber;
        teaching: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }, {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    }>>>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    conceptType: z.ZodOptional<z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>>;
} & {
    definition: z.ZodOptional<z.ZodString>;
    historicalPeriod: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    definition?: string | undefined;
    conceptType?: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text" | undefined;
    theologicalTradition?: string[] | undefined;
    biblicalReferences?: string[] | undefined;
    historicalPeriod?: string | undefined;
    relatedConcepts?: string[] | undefined;
    synonyms?: string[] | undefined;
    apestRelevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
}, {
    name?: string | undefined;
    slug?: string | undefined;
    definition?: string | undefined;
    conceptType?: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text" | undefined;
    theologicalTradition?: string[] | undefined;
    biblicalReferences?: string[] | undefined;
    historicalPeriod?: string | undefined;
    relatedConcepts?: string[] | undefined;
    synonyms?: string[] | undefined;
    apestRelevance?: {
        apostolic: number;
        prophetic: number;
        evangelistic: number;
        shepherding: number;
        teaching: number;
    } | undefined;
}>;
export declare const aiConversationQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "updatedAt", "totalMessages", "userSatisfactionRating"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    search: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    conversationType: z.ZodOptional<z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    aiModel: z.ZodOptional<z.ZodString>;
    hasRating: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "totalMessages" | "userSatisfactionRating" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    userId?: string | undefined;
    conversationType?: "theological_discussion" | "content_creation" | "assessment_guidance" | "ministry_advice" | "leadership_coaching" | "content_discovery" | "research_assistance" | "general" | undefined;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    aiModel?: string | undefined;
    search?: string | undefined;
    hasRating?: boolean | undefined;
}, {
    userId?: string | undefined;
    conversationType?: "theological_discussion" | "content_creation" | "assessment_guidance" | "ministry_advice" | "leadership_coaching" | "content_discovery" | "research_assistance" | "general" | undefined;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    aiModel?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "totalMessages" | "userSatisfactionRating" | "createdAt" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    hasRating?: boolean | undefined;
}>;
export declare const aiMessageQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "messageIndex", "userRating"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    search: z.ZodOptional<z.ZodString>;
    conversationId: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<["user", "assistant", "system"]>>;
    hasRating: z.ZodOptional<z.ZodBoolean>;
    flaggedForReview: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "messageIndex" | "userRating";
    sortOrder: "asc" | "desc";
    role?: "user" | "assistant" | "system" | undefined;
    conversationId?: string | undefined;
    flaggedForReview?: boolean | undefined;
    search?: string | undefined;
    hasRating?: boolean | undefined;
}, {
    role?: "user" | "assistant" | "system" | undefined;
    conversationId?: string | undefined;
    flaggedForReview?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "messageIndex" | "userRating" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    hasRating?: boolean | undefined;
}>;
export declare const aiContentJobQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "startedAt", "completedAt", "priority"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    search: z.ZodOptional<z.ZodString>;
    contentId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    jobType: z.ZodOptional<z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    priority: z.ZodOptional<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    humanReviewed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "completedAt" | "priority" | "startedAt";
    sortOrder: "asc" | "desc";
    userId?: string | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    contentId?: string | undefined;
    jobType?: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check" | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    search?: string | undefined;
}, {
    userId?: string | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    contentId?: string | undefined;
    jobType?: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check" | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "completedAt" | "priority" | "startedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
}>;
export declare const aiCrossReferenceSuggestionQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["createdAt", "confidenceScore", "relevanceScore"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    search: z.ZodOptional<z.ZodString>;
    sourceContentId: z.ZodOptional<z.ZodString>;
    targetContentId: z.ZodOptional<z.ZodString>;
    suggestedReferenceType: z.ZodOptional<z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>>;
    status: z.ZodOptional<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    humanReviewed: z.ZodOptional<z.ZodBoolean>;
    highConfidence: z.ZodOptional<z.ZodBoolean>;
    highRelevance: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "relevanceScore" | "confidenceScore";
    sortOrder: "asc" | "desc";
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    humanReviewed?: boolean | undefined;
    sourceContentId?: string | undefined;
    targetContentId?: string | undefined;
    suggestedReferenceType?: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes" | undefined;
    search?: string | undefined;
    highConfidence?: boolean | undefined;
    highRelevance?: boolean | undefined;
}, {
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    humanReviewed?: boolean | undefined;
    sourceContentId?: string | undefined;
    targetContentId?: string | undefined;
    suggestedReferenceType?: "builds_on" | "contradicts" | "supports" | "extends" | "applies" | "critiques" | "synthesizes" | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "relevanceScore" | "confidenceScore" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    highConfidence?: boolean | undefined;
    highRelevance?: boolean | undefined;
}>;
export declare const theologicalConceptQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["name", "createdAt", "contentReferences", "searchCount"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    search: z.ZodOptional<z.ZodString>;
    conceptType: z.ZodOptional<z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>>;
    theologicalTradition: z.ZodOptional<z.ZodString>;
    historicalPeriod: z.ZodOptional<z.ZodString>;
    hasDefinition: z.ZodOptional<z.ZodBoolean>;
    frequentlyUsed: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "name" | "contentReferences" | "searchCount";
    sortOrder: "asc" | "desc";
    conceptType?: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text" | undefined;
    theologicalTradition?: string | undefined;
    historicalPeriod?: string | undefined;
    hasDefinition?: boolean | undefined;
    search?: string | undefined;
    frequentlyUsed?: boolean | undefined;
}, {
    conceptType?: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text" | undefined;
    theologicalTradition?: string | undefined;
    historicalPeriod?: string | undefined;
    hasDefinition?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "name" | "contentReferences" | "searchCount" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    search?: string | undefined;
    frequentlyUsed?: boolean | undefined;
}>;
export type CreateAiConversation = z.infer<typeof createAiConversationSchema>;
export type CreateAiMessage = z.infer<typeof createAiMessageSchema>;
export type CreateAiContentJob = z.infer<typeof createAiContentJobSchema>;
export type CreateAiCrossReferenceSuggestion = z.infer<typeof createAiCrossReferenceSuggestionSchema>;
export type CreateTheologicalConcept = z.infer<typeof createTheologicalConceptSchema>;
export type UpdateAiConversation = z.infer<typeof updateAiConversationSchema>;
export type UpdateAiMessage = z.infer<typeof updateAiMessageSchema>;
export type UpdateAiContentJob = z.infer<typeof updateAiContentJobSchema>;
export type UpdateAiCrossReferenceSuggestion = z.infer<typeof updateAiCrossReferenceSuggestionSchema>;
export type UpdateTheologicalConcept = z.infer<typeof updateTheologicalConceptSchema>;
export type AiConversationQuery = z.infer<typeof aiConversationQuerySchema>;
export type AiMessageQuery = z.infer<typeof aiMessageQuerySchema>;
export type AiContentJobQuery = z.infer<typeof aiContentJobQuerySchema>;
export type AiCrossReferenceSuggestionQuery = z.infer<typeof aiCrossReferenceSuggestionQuerySchema>;
export type TheologicalConceptQuery = z.infer<typeof theologicalConceptQuerySchema>;
//# sourceMappingURL=ai.operations.d.ts.map