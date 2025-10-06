import { z } from 'zod';
export declare const aiConversationEntitySchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    conversationType: z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>;
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
    totalMessages: z.ZodDefault<z.ZodNumber>;
    conversationDurationMinutes: z.ZodNullable<z.ZodNumber>;
    userSatisfactionRating: z.ZodNullable<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodDefault<z.ZodBoolean>;
    helpfulnessRating: z.ZodNullable<z.ZodNumber>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    totalTokensUsed: z.ZodDefault<z.ZodNumber>;
    referencedContent: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generatedInsights: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
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
    totalMessages: number;
    conversationDurationMinutes: number | null;
    userSatisfactionRating: number | null;
    theologicalAccuracyVerified: boolean;
    helpfulnessRating: number | null;
    aiModel: string;
    modelVersion: string | null;
    totalTokensUsed: number;
    referencedContent: string[];
    generatedInsights: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}, {
    id: string;
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
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    totalMessages?: number | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    aiModel?: string | undefined;
    totalTokensUsed?: number | undefined;
    referencedContent?: string[] | undefined;
}>;
export declare const aiMessageEntitySchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    messageIndex: z.ZodNumber;
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
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant" | "system";
    createdAt: string;
    updatedAt: string;
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
    id: string;
    role: "user" | "assistant" | "system";
    createdAt: string;
    updatedAt: string;
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
export declare const aiContentJobEntitySchema: z.ZodObject<{
    id: z.ZodString;
    contentId: z.ZodNullable<z.ZodString>;
    userId: z.ZodNullable<z.ZodString>;
    jobType: z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    result: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    aiModel: z.ZodDefault<z.ZodString>;
    tokensUsed: z.ZodNullable<z.ZodNumber>;
    processingCost: z.ZodNullable<z.ZodString>;
    errorMessage: z.ZodNullable<z.ZodString>;
    retryCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    startedAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string | null;
    status: "completed" | "pending" | "processing" | "failed" | "cancelled";
    aiModel: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    contentId: string | null;
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
    retryCount: number;
    startedAt: string | null;
}, {
    id: string;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    tokensUsed: number | null;
    processingCost: string | null;
    errorMessage: string | null;
    startedAt: string | null;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    retryCount?: number | undefined;
}>;
export declare const aiCrossReferenceSuggestionEntitySchema: z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    suggestedReferenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    confidenceScore: z.ZodString;
    relevanceScore: z.ZodString;
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
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    reviewedAt: z.ZodNullable<z.ZodString>;
    implementedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "approved" | "rejected" | "implemented";
    aiModel: string;
    modelVersion: string | null;
    createdAt: string;
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
    reviewedAt: string | null;
    implementedAt: string | null;
}, {
    id: string;
    modelVersion: string | null;
    createdAt: string;
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
    reviewedAt: string | null;
    implementedAt: string | null;
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    humanReviewed?: boolean | undefined;
}>;
export declare const theologicalConceptEntitySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    definition: z.ZodNullable<z.ZodString>;
    conceptType: z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>;
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
    contentReferences: z.ZodDefault<z.ZodNumber>;
    searchCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
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
    contentReferences: number;
    searchCount: number;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
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
    contentReferences?: number | undefined;
    searchCount?: number | undefined;
}>;
export type AiConversationEntity = z.infer<typeof aiConversationEntitySchema>;
export type AiMessageEntity = z.infer<typeof aiMessageEntitySchema>;
export type AiContentJobEntity = z.infer<typeof aiContentJobEntitySchema>;
export type AiCrossReferenceSuggestionEntity = z.infer<typeof aiCrossReferenceSuggestionEntitySchema>;
export type TheologicalConceptEntity = z.infer<typeof theologicalConceptEntitySchema>;
export type AiConversation = AiConversationEntity;
export type AiMessage = AiMessageEntity;
export type AiContentJob = AiContentJobEntity;
export type AiCrossReferenceSuggestion = AiCrossReferenceSuggestionEntity;
export type TheologicalConcept = TheologicalConceptEntity;
export declare const createAiConversationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    userId: z.ZodString;
    conversationType: z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>;
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
    totalMessages: z.ZodDefault<z.ZodNumber>;
    conversationDurationMinutes: z.ZodNullable<z.ZodNumber>;
    userSatisfactionRating: z.ZodNullable<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodDefault<z.ZodBoolean>;
    helpfulnessRating: z.ZodNullable<z.ZodNumber>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    totalTokensUsed: z.ZodDefault<z.ZodNumber>;
    referencedContent: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generatedInsights: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
}, "id" | "totalMessages" | "totalTokensUsed" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
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
    completedAt: string | null;
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
    completedAt: string | null;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    aiModel?: string | undefined;
    referencedContent?: string[] | undefined;
}>;
export declare const createAiMessageSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    messageIndex: z.ZodNumber;
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
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "tokenCount" | "processingTime">, "strip", z.ZodTypeAny, {
    role: "user" | "assistant" | "system";
    conversationId: string;
    content: string;
    messageIndex: number;
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
}, {
    role: "user" | "assistant" | "system";
    conversationId: string;
    content: string;
    messageIndex: number;
    confidence: string | null;
    factualAccuracy: boolean | null;
    theologicalSoundness: boolean | null;
    userRating: number | null;
    userFeedback: string | null;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    flaggedForReview?: boolean | undefined;
}>;
export declare const createAiContentJobSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    contentId: z.ZodNullable<z.ZodString>;
    userId: z.ZodNullable<z.ZodString>;
    jobType: z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    result: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    aiModel: z.ZodDefault<z.ZodString>;
    tokensUsed: z.ZodNullable<z.ZodNumber>;
    processingCost: z.ZodNullable<z.ZodString>;
    errorMessage: z.ZodNullable<z.ZodString>;
    retryCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    startedAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "tokensUsed" | "processingCost">, "strip", z.ZodTypeAny, {
    userId: string | null;
    status: "completed" | "pending" | "processing" | "failed" | "cancelled";
    aiModel: string;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    parameters: Record<string, any>;
    priority: "low" | "normal" | "high" | "urgent";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanReviewed: boolean;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    errorMessage: string | null;
    retryCount: number;
    startedAt: string | null;
}, {
    userId: string | null;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    errorMessage: string | null;
    startedAt: string | null;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    retryCount?: number | undefined;
}>;
export declare const createAiCrossReferenceSuggestionSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    suggestedReferenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    confidenceScore: z.ZodString;
    relevanceScore: z.ZodString;
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
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    reviewedAt: z.ZodNullable<z.ZodString>;
    implementedAt: z.ZodNullable<z.ZodString>;
}, "id" | "createdAt" | "reviewedAt" | "implementedAt">, "strip", z.ZodTypeAny, {
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
export declare const createTheologicalConceptSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    definition: z.ZodNullable<z.ZodString>;
    conceptType: z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>;
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
    contentReferences: z.ZodDefault<z.ZodNumber>;
    searchCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "contentReferences" | "searchCount">, "strip", z.ZodTypeAny, {
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
    userId: z.ZodOptional<z.ZodString>;
    conversationType: z.ZodOptional<z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>>;
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
    userSatisfactionRating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    theologicalAccuracyVerified: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    helpfulnessRating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    aiModel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modelVersion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    referencedContent: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    generatedInsights: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
    userSatisfactionRating?: number | null | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    helpfulnessRating?: number | null | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    referencedContent?: string[] | undefined;
    generatedInsights?: string | null | undefined;
    completedAt?: string | null | undefined;
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
    userSatisfactionRating?: number | null | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    helpfulnessRating?: number | null | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    referencedContent?: string[] | undefined;
    generatedInsights?: string | null | undefined;
    completedAt?: string | null | undefined;
}>;
export declare const updateAiMessageSchema: z.ZodObject<{
    role: z.ZodOptional<z.ZodEnum<["user", "assistant", "system"]>>;
    conversationId: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    messageIndex: z.ZodOptional<z.ZodNumber>;
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
    userRating: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    userFeedback: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    flaggedForReview: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    role?: "user" | "assistant" | "system" | undefined;
    conversationId?: string | undefined;
    content?: string | undefined;
    messageIndex?: number | undefined;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    confidence?: string | null | undefined;
    factualAccuracy?: boolean | null | undefined;
    theologicalSoundness?: boolean | null | undefined;
    userRating?: number | null | undefined;
    userFeedback?: string | null | undefined;
    flaggedForReview?: boolean | undefined;
}, {
    role?: "user" | "assistant" | "system" | undefined;
    conversationId?: string | undefined;
    content?: string | undefined;
    messageIndex?: number | undefined;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    confidence?: string | null | undefined;
    factualAccuracy?: boolean | null | undefined;
    theologicalSoundness?: boolean | null | undefined;
    userRating?: number | null | undefined;
    userFeedback?: string | null | undefined;
    flaggedForReview?: boolean | undefined;
}>;
export declare const updateAiContentJobSchema: z.ZodObject<{
    userId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>>;
    aiModel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    completedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    contentId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    jobType: z.ZodOptional<z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>>;
    parameters: z.ZodOptional<z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    priority: z.ZodOptional<z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>>;
    result: z.ZodOptional<z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>>;
    confidenceScore: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    humanReviewed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    humanApproved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    reviewNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    errorMessage: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    retryCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    startedAt: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    userId?: string | null | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    completedAt?: string | null | undefined;
    contentId?: string | null | undefined;
    jobType?: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check" | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    result?: Record<string, any> | null | undefined;
    confidenceScore?: string | null | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | null | undefined;
    reviewNotes?: string | null | undefined;
    errorMessage?: string | null | undefined;
    retryCount?: number | undefined;
    startedAt?: string | null | undefined;
}, {
    userId?: string | null | undefined;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    completedAt?: string | null | undefined;
    contentId?: string | null | undefined;
    jobType?: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check" | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    result?: Record<string, any> | null | undefined;
    confidenceScore?: string | null | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | null | undefined;
    reviewNotes?: string | null | undefined;
    errorMessage?: string | null | undefined;
    retryCount?: number | undefined;
    startedAt?: string | null | undefined;
}>;
export declare const updateAiCrossReferenceSuggestionSchema: z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>>;
    aiModel: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    modelVersion: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    relevanceScore: z.ZodOptional<z.ZodString>;
    confidenceScore: z.ZodOptional<z.ZodString>;
    humanReviewed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    humanApproved: z.ZodOptional<z.ZodNullable<z.ZodBoolean>>;
    reviewNotes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    sourceContentId: z.ZodOptional<z.ZodString>;
    targetContentId: z.ZodOptional<z.ZodString>;
    suggestedReferenceType: z.ZodOptional<z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>>;
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
}, "strip", z.ZodTypeAny, {
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    modelVersion?: string | null | undefined;
    relevanceScore?: string | undefined;
    confidenceScore?: string | undefined;
    humanReviewed?: boolean | undefined;
    humanApproved?: boolean | null | undefined;
    reviewNotes?: string | null | undefined;
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
    humanApproved?: boolean | null | undefined;
    reviewNotes?: string | null | undefined;
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
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    definition: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    conceptType: z.ZodOptional<z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>>;
    theologicalTradition: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    biblicalReferences: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    historicalPeriod: z.ZodOptional<z.ZodNullable<z.ZodString>>;
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
}, "strip", z.ZodTypeAny, {
    name?: string | undefined;
    slug?: string | undefined;
    definition?: string | null | undefined;
    conceptType?: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text" | undefined;
    theologicalTradition?: string[] | undefined;
    biblicalReferences?: string[] | undefined;
    historicalPeriod?: string | null | undefined;
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
    definition?: string | null | undefined;
    conceptType?: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text" | undefined;
    theologicalTradition?: string[] | undefined;
    biblicalReferences?: string[] | undefined;
    historicalPeriod?: string | null | undefined;
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
export declare const aiConversationResponseSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    conversationType: z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>;
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
    totalMessages: z.ZodDefault<z.ZodNumber>;
    conversationDurationMinutes: z.ZodNullable<z.ZodNumber>;
    userSatisfactionRating: z.ZodNullable<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodDefault<z.ZodBoolean>;
    helpfulnessRating: z.ZodNullable<z.ZodNumber>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    totalTokensUsed: z.ZodDefault<z.ZodNumber>;
    referencedContent: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generatedInsights: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
} & {
    isActive: z.ZodBoolean;
    isCompleted: z.ZodBoolean;
    isAbandoned: z.ZodBoolean;
    isArchived: z.ZodBoolean;
    hasUserRating: z.ZodBoolean;
    conversationDurationText: z.ZodOptional<z.ZodString>;
    tokenUsageText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
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
    totalMessages: number;
    conversationDurationMinutes: number | null;
    userSatisfactionRating: number | null;
    theologicalAccuracyVerified: boolean;
    helpfulnessRating: number | null;
    aiModel: string;
    modelVersion: string | null;
    totalTokensUsed: number;
    referencedContent: string[];
    generatedInsights: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    isActive: boolean;
    isCompleted: boolean;
    isAbandoned: boolean;
    isArchived: boolean;
    hasUserRating: boolean;
    conversationDurationText?: string | undefined;
    tokenUsageText?: string | undefined;
}, {
    id: string;
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
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    isActive: boolean;
    isCompleted: boolean;
    isAbandoned: boolean;
    isArchived: boolean;
    hasUserRating: boolean;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    totalMessages?: number | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    aiModel?: string | undefined;
    totalTokensUsed?: number | undefined;
    referencedContent?: string[] | undefined;
    conversationDurationText?: string | undefined;
    tokenUsageText?: string | undefined;
}>;
export declare const aiMessageResponseSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    messageIndex: z.ZodNumber;
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
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    isUserMessage: z.ZodBoolean;
    isAssistantMessage: z.ZodBoolean;
    isSystemMessage: z.ZodBoolean;
    hasUserRating: z.ZodBoolean;
    hasUserFeedback: z.ZodBoolean;
    isFlagged: z.ZodBoolean;
    processingTimeText: z.ZodOptional<z.ZodString>;
    confidenceText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant" | "system";
    createdAt: string;
    updatedAt: string;
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
    hasUserRating: boolean;
    isUserMessage: boolean;
    isAssistantMessage: boolean;
    isSystemMessage: boolean;
    hasUserFeedback: boolean;
    isFlagged: boolean;
    processingTimeText?: string | undefined;
    confidenceText?: string | undefined;
}, {
    id: string;
    role: "user" | "assistant" | "system";
    createdAt: string;
    updatedAt: string;
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
    hasUserRating: boolean;
    isUserMessage: boolean;
    isAssistantMessage: boolean;
    isSystemMessage: boolean;
    hasUserFeedback: boolean;
    isFlagged: boolean;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    flaggedForReview?: boolean | undefined;
    processingTimeText?: string | undefined;
    confidenceText?: string | undefined;
}>;
export declare const aiContentJobResponseSchema: z.ZodObject<{
    id: z.ZodString;
    contentId: z.ZodNullable<z.ZodString>;
    userId: z.ZodNullable<z.ZodString>;
    jobType: z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    result: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    aiModel: z.ZodDefault<z.ZodString>;
    tokensUsed: z.ZodNullable<z.ZodNumber>;
    processingCost: z.ZodNullable<z.ZodString>;
    errorMessage: z.ZodNullable<z.ZodString>;
    retryCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    startedAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
} & {
    isPending: z.ZodBoolean;
    isProcessing: z.ZodBoolean;
    isCompleted: z.ZodBoolean;
    isFailed: z.ZodBoolean;
    isCancelled: z.ZodBoolean;
    hasError: z.ZodBoolean;
    needsHumanReview: z.ZodBoolean;
    isHighPriority: z.ZodBoolean;
    processingCostText: z.ZodOptional<z.ZodString>;
    confidenceText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string | null;
    status: "completed" | "pending" | "processing" | "failed" | "cancelled";
    aiModel: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    contentId: string | null;
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
    retryCount: number;
    startedAt: string | null;
    isCompleted: boolean;
    isPending: boolean;
    isProcessing: boolean;
    isFailed: boolean;
    isCancelled: boolean;
    hasError: boolean;
    needsHumanReview: boolean;
    isHighPriority: boolean;
    confidenceText?: string | undefined;
    processingCostText?: string | undefined;
}, {
    id: string;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    tokensUsed: number | null;
    processingCost: string | null;
    errorMessage: string | null;
    startedAt: string | null;
    isCompleted: boolean;
    isPending: boolean;
    isProcessing: boolean;
    isFailed: boolean;
    isCancelled: boolean;
    hasError: boolean;
    needsHumanReview: boolean;
    isHighPriority: boolean;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    retryCount?: number | undefined;
    confidenceText?: string | undefined;
    processingCostText?: string | undefined;
}>;
export declare const aiCrossReferenceSuggestionResponseSchema: z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    suggestedReferenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    confidenceScore: z.ZodString;
    relevanceScore: z.ZodString;
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
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    reviewedAt: z.ZodNullable<z.ZodString>;
    implementedAt: z.ZodNullable<z.ZodString>;
} & {
    isPending: z.ZodBoolean;
    isApproved: z.ZodBoolean;
    isRejected: z.ZodBoolean;
    isImplemented: z.ZodBoolean;
    needsReview: z.ZodBoolean;
    hasHighConfidence: z.ZodBoolean;
    hasHighRelevance: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "approved" | "rejected" | "implemented";
    aiModel: string;
    modelVersion: string | null;
    createdAt: string;
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
    reviewedAt: string | null;
    implementedAt: string | null;
    isPending: boolean;
    isApproved: boolean;
    isRejected: boolean;
    isImplemented: boolean;
    needsReview: boolean;
    hasHighConfidence: boolean;
    hasHighRelevance: boolean;
}, {
    id: string;
    modelVersion: string | null;
    createdAt: string;
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
    reviewedAt: string | null;
    implementedAt: string | null;
    isPending: boolean;
    isApproved: boolean;
    isRejected: boolean;
    isImplemented: boolean;
    needsReview: boolean;
    hasHighConfidence: boolean;
    hasHighRelevance: boolean;
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    humanReviewed?: boolean | undefined;
}>;
export declare const theologicalConceptResponseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    definition: z.ZodNullable<z.ZodString>;
    conceptType: z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>;
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
    contentReferences: z.ZodDefault<z.ZodNumber>;
    searchCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
} & {
    isActive: z.ZodBoolean;
    hasDefinition: z.ZodBoolean;
    hasRelatedConcepts: z.ZodBoolean;
    apestScoreText: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
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
    contentReferences: number;
    searchCount: number;
    isActive: boolean;
    hasDefinition: boolean;
    hasRelatedConcepts: boolean;
    apestScoreText?: string | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    slug: string;
    definition: string | null;
    conceptType: "doctrine" | "practice" | "tradition" | "movement" | "person" | "event" | "text";
    historicalPeriod: string | null;
    isActive: boolean;
    hasDefinition: boolean;
    hasRelatedConcepts: boolean;
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
    contentReferences?: number | undefined;
    searchCount?: number | undefined;
    apestScoreText?: string | undefined;
}>;
export type AiConversationResponse = z.infer<typeof aiConversationResponseSchema>;
export type AiMessageResponse = z.infer<typeof aiMessageResponseSchema>;
export type AiContentJobResponse = z.infer<typeof aiContentJobResponseSchema>;
export type AiCrossReferenceSuggestionResponse = z.infer<typeof aiCrossReferenceSuggestionResponseSchema>;
export type TheologicalConceptResponse = z.infer<typeof theologicalConceptResponseSchema>;
export declare const aiConversationSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    conversationType: z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>;
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
    totalMessages: z.ZodDefault<z.ZodNumber>;
    conversationDurationMinutes: z.ZodNullable<z.ZodNumber>;
    userSatisfactionRating: z.ZodNullable<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodDefault<z.ZodBoolean>;
    helpfulnessRating: z.ZodNullable<z.ZodNumber>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    totalTokensUsed: z.ZodDefault<z.ZodNumber>;
    referencedContent: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generatedInsights: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
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
    totalMessages: number;
    conversationDurationMinutes: number | null;
    userSatisfactionRating: number | null;
    theologicalAccuracyVerified: boolean;
    helpfulnessRating: number | null;
    aiModel: string;
    modelVersion: string | null;
    totalTokensUsed: number;
    referencedContent: string[];
    generatedInsights: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}, {
    id: string;
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
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    totalMessages?: number | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    aiModel?: string | undefined;
    totalTokensUsed?: number | undefined;
    referencedContent?: string[] | undefined;
}>;
export declare const aiMessageSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    messageIndex: z.ZodNumber;
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
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    role: "user" | "assistant" | "system";
    createdAt: string;
    updatedAt: string;
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
    id: string;
    role: "user" | "assistant" | "system";
    createdAt: string;
    updatedAt: string;
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
export declare const aiContentJobSchema: z.ZodObject<{
    id: z.ZodString;
    contentId: z.ZodNullable<z.ZodString>;
    userId: z.ZodNullable<z.ZodString>;
    jobType: z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    result: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    aiModel: z.ZodDefault<z.ZodString>;
    tokensUsed: z.ZodNullable<z.ZodNumber>;
    processingCost: z.ZodNullable<z.ZodString>;
    errorMessage: z.ZodNullable<z.ZodString>;
    retryCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    startedAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    userId: string | null;
    status: "completed" | "pending" | "processing" | "failed" | "cancelled";
    aiModel: string;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    contentId: string | null;
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
    retryCount: number;
    startedAt: string | null;
}, {
    id: string;
    userId: string | null;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    tokensUsed: number | null;
    processingCost: string | null;
    errorMessage: string | null;
    startedAt: string | null;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    retryCount?: number | undefined;
}>;
export declare const aiCrossReferenceSuggestionSchema: z.ZodObject<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    suggestedReferenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    confidenceScore: z.ZodString;
    relevanceScore: z.ZodString;
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
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    reviewedAt: z.ZodNullable<z.ZodString>;
    implementedAt: z.ZodNullable<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    status: "pending" | "approved" | "rejected" | "implemented";
    aiModel: string;
    modelVersion: string | null;
    createdAt: string;
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
    reviewedAt: string | null;
    implementedAt: string | null;
}, {
    id: string;
    modelVersion: string | null;
    createdAt: string;
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
    reviewedAt: string | null;
    implementedAt: string | null;
    status?: "pending" | "approved" | "rejected" | "implemented" | undefined;
    aiModel?: string | undefined;
    humanReviewed?: boolean | undefined;
}>;
export declare const theologicalConceptSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    definition: z.ZodNullable<z.ZodString>;
    conceptType: z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>;
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
    contentReferences: z.ZodDefault<z.ZodNumber>;
    searchCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
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
    contentReferences: number;
    searchCount: number;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
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
    contentReferences?: number | undefined;
    searchCount?: number | undefined;
}>;
export declare const newAiContentJobSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    contentId: z.ZodNullable<z.ZodString>;
    userId: z.ZodNullable<z.ZodString>;
    jobType: z.ZodEnum<["summarize", "extract_key_points", "generate_cross_references", "enhance_seo", "translate", "generate_questions", "create_outline", "fact_check"]>;
    parameters: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodAny>>;
    priority: z.ZodDefault<z.ZodEnum<["low", "normal", "high", "urgent"]>>;
    status: z.ZodDefault<z.ZodEnum<["pending", "processing", "completed", "failed", "cancelled"]>>;
    result: z.ZodNullable<z.ZodRecord<z.ZodString, z.ZodAny>>;
    confidenceScore: z.ZodNullable<z.ZodString>;
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    aiModel: z.ZodDefault<z.ZodString>;
    tokensUsed: z.ZodNullable<z.ZodNumber>;
    processingCost: z.ZodNullable<z.ZodString>;
    errorMessage: z.ZodNullable<z.ZodString>;
    retryCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    startedAt: z.ZodNullable<z.ZodString>;
    completedAt: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "tokensUsed" | "processingCost">, "strip", z.ZodTypeAny, {
    userId: string | null;
    status: "completed" | "pending" | "processing" | "failed" | "cancelled";
    aiModel: string;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    parameters: Record<string, any>;
    priority: "low" | "normal" | "high" | "urgent";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanReviewed: boolean;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    errorMessage: string | null;
    retryCount: number;
    startedAt: string | null;
}, {
    userId: string | null;
    completedAt: string | null;
    contentId: string | null;
    jobType: "summarize" | "extract_key_points" | "generate_cross_references" | "enhance_seo" | "translate" | "generate_questions" | "create_outline" | "fact_check";
    result: Record<string, any> | null;
    confidenceScore: string | null;
    humanApproved: boolean | null;
    reviewNotes: string | null;
    errorMessage: string | null;
    startedAt: string | null;
    status?: "completed" | "pending" | "processing" | "failed" | "cancelled" | undefined;
    aiModel?: string | undefined;
    parameters?: Record<string, any> | undefined;
    priority?: "low" | "normal" | "high" | "urgent" | undefined;
    humanReviewed?: boolean | undefined;
    retryCount?: number | undefined;
}>;
export declare const newAiConversationSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    userId: z.ZodString;
    conversationType: z.ZodEnum<["theological_discussion", "content_creation", "assessment_guidance", "ministry_advice", "leadership_coaching", "content_discovery", "research_assistance", "general"]>;
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
    totalMessages: z.ZodDefault<z.ZodNumber>;
    conversationDurationMinutes: z.ZodNullable<z.ZodNumber>;
    userSatisfactionRating: z.ZodNullable<z.ZodNumber>;
    theologicalAccuracyVerified: z.ZodDefault<z.ZodBoolean>;
    helpfulnessRating: z.ZodNullable<z.ZodNumber>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    totalTokensUsed: z.ZodDefault<z.ZodNumber>;
    referencedContent: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    generatedInsights: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["active", "completed", "abandoned", "archived"]>>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
    completedAt: z.ZodNullable<z.ZodString>;
}, "id" | "totalMessages" | "totalTokensUsed" | "createdAt" | "updatedAt">, "strip", z.ZodTypeAny, {
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
    completedAt: string | null;
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
    completedAt: string | null;
    status?: "active" | "completed" | "abandoned" | "archived" | undefined;
    theologicalAccuracyVerified?: boolean | undefined;
    aiModel?: string | undefined;
    referencedContent?: string[] | undefined;
}>;
export declare const newAiCrossReferenceSuggestionSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    sourceContentId: z.ZodString;
    targetContentId: z.ZodString;
    suggestedReferenceType: z.ZodEnum<["builds_on", "contradicts", "supports", "extends", "applies", "critiques", "synthesizes"]>;
    confidenceScore: z.ZodString;
    relevanceScore: z.ZodString;
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
    humanReviewed: z.ZodDefault<z.ZodBoolean>;
    humanApproved: z.ZodNullable<z.ZodBoolean>;
    reviewNotes: z.ZodNullable<z.ZodString>;
    status: z.ZodDefault<z.ZodEnum<["pending", "approved", "rejected", "implemented"]>>;
    aiModel: z.ZodDefault<z.ZodString>;
    modelVersion: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodString;
    reviewedAt: z.ZodNullable<z.ZodString>;
    implementedAt: z.ZodNullable<z.ZodString>;
}, "id" | "createdAt" | "reviewedAt" | "implementedAt">, "strip", z.ZodTypeAny, {
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
export declare const newAiMessageSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    conversationId: z.ZodString;
    role: z.ZodEnum<["user", "assistant", "system"]>;
    content: z.ZodString;
    messageIndex: z.ZodNumber;
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
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "tokenCount" | "processingTime">, "strip", z.ZodTypeAny, {
    role: "user" | "assistant" | "system";
    conversationId: string;
    content: string;
    messageIndex: number;
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
}, {
    role: "user" | "assistant" | "system";
    conversationId: string;
    content: string;
    messageIndex: number;
    confidence: string | null;
    factualAccuracy: boolean | null;
    theologicalSoundness: boolean | null;
    userRating: number | null;
    userFeedback: string | null;
    citedContent?: {
        title: string;
        contentId: string;
        relevanceScore: number;
    }[] | undefined;
    flaggedForReview?: boolean | undefined;
}>;
export declare const newTheologicalConceptSchema: z.ZodObject<Omit<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    definition: z.ZodNullable<z.ZodString>;
    conceptType: z.ZodEnum<["doctrine", "practice", "tradition", "movement", "person", "event", "text"]>;
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
    contentReferences: z.ZodDefault<z.ZodNumber>;
    searchCount: z.ZodDefault<z.ZodNumber>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
}, "id" | "createdAt" | "updatedAt" | "contentReferences" | "searchCount">, "strip", z.ZodTypeAny, {
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
export type NewAiConversation = CreateAiConversation;
export type NewAiMessage = CreateAiMessage;
export type NewAiContentJob = CreateAiContentJob;
export type NewAiCrossReferenceSuggestion = CreateAiCrossReferenceSuggestion;
export type NewTheologicalConcept = CreateTheologicalConcept;
//# sourceMappingURL=ai.schema.d.ts.map