import { z } from 'zod';
import { PaginatedResponseSchema } from './user.contracts';
/**
 * Create Assessment API Request Contract
 * Derived from CreateAssessmentOperationSchema
 */
export declare const CreateAssessmentApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    description: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
    estimatedDuration: z.ZodOptional<z.ZodNumber>;
    version: z.ZodDefault<z.ZodString>;
    passingScore: z.ZodOptional<z.ZodNumber>;
    validityScore: z.ZodOptional<z.ZodNumber>;
    reliabilityScore: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    researchBacked: z.ZodDefault<z.ZodBoolean>;
    scoringMethod: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questionsCount: z.ZodNumber;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "active" | "draft" | "archived" | "under_review";
    slug: string;
    version: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
}, {
    name: string;
    slug: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
/**
 * Update Assessment API Request Contract
 * Derived from UpdateAssessmentOperationSchema
 */
export declare const UpdateAssessmentApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    estimatedDuration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    version: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    passingScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    validityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    reliabilityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
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
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questionsCount?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}, {
    name?: string | undefined;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questionsCount?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>, {
    name?: string | undefined;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questionsCount?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}, {
    name?: string | undefined;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questionsCount?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
/**
 * Create Assessment Question API Request Contract
 * Derived from CreateAssessmentQuestionOperationSchema
 */
export declare const CreateAssessmentQuestionApiRequestSchema: z.ZodObject<{
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
} & {
    question_text: z.ZodEffects<z.ZodString, string, string>;
    order_index: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    orderIndex: number;
    order_index: number;
    assessmentId: string;
    questionText: string;
    questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
    isRequired: boolean;
    weight: number;
    reverseScored: boolean;
    question_text: string;
    category?: string | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
}, {
    orderIndex: number;
    order_index: number;
    assessmentId: string;
    questionText: string;
    questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
    question_text: string;
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
/**
 * Update Assessment Question API Request Contract
 * Derived from UpdateAssessmentQuestionOperationSchema
 */
export declare const UpdateAssessmentQuestionApiRequestSchema: z.ZodEffects<z.ZodObject<{
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
    orderIndex?: number | undefined;
    category?: string | undefined;
    assessmentId?: string | undefined;
    questionText?: string | undefined;
    questionType?: "text" | "binary" | "ranking" | "likert" | "multiple_choice" | undefined;
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
    orderIndex?: number | undefined;
    category?: string | undefined;
    assessmentId?: string | undefined;
    questionText?: string | undefined;
    questionType?: "text" | "binary" | "ranking" | "likert" | "multiple_choice" | undefined;
    apestDimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answerOptions?: {
        value: number;
        label: string;
        description?: string | undefined;
    }[] | undefined;
    isRequired?: boolean | undefined;
    weight?: number | undefined;
    reverseScored?: boolean | undefined;
}>, {
    orderIndex?: number | undefined;
    category?: string | undefined;
    assessmentId?: string | undefined;
    questionText?: string | undefined;
    questionType?: "text" | "binary" | "ranking" | "likert" | "multiple_choice" | undefined;
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
    orderIndex?: number | undefined;
    category?: string | undefined;
    assessmentId?: string | undefined;
    questionText?: string | undefined;
    questionType?: "text" | "binary" | "ranking" | "likert" | "multiple_choice" | undefined;
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
/**
 * Reorder Assessment Questions API Request Contract
 * Derived from ReorderAssessmentQuestionsOperationSchema
 */
export declare const ReorderAssessmentQuestionsApiRequestSchema: z.ZodObject<{
    assessment_id: z.ZodString;
    question_orders: z.ZodArray<z.ZodObject<{
        question_id: z.ZodString;
        order_index: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        order_index: number;
        question_id: string;
    }, {
        order_index: number;
        question_id: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    assessment_id: string;
    question_orders: {
        order_index: number;
        question_id: string;
    }[];
}, {
    assessment_id: string;
    question_orders: {
        order_index: number;
        question_id: string;
    }[];
}>;
/**
 * Start User Assessment API Request Contract
 * Derived from StartUserAssessmentOperationSchema
 */
export declare const StartUserAssessmentApiRequestSchema: z.ZodObject<{
    user_id: z.ZodString;
    assessment_id: z.ZodString;
    context: z.ZodOptional<z.ZodObject<{
        organization_id: z.ZodOptional<z.ZodString>;
        session_id: z.ZodOptional<z.ZodString>;
        user_agent: z.ZodOptional<z.ZodString>;
        ip_address: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        organization_id?: string | undefined;
        session_id?: string | undefined;
        user_agent?: string | undefined;
        ip_address?: string | undefined;
    }, {
        organization_id?: string | undefined;
        session_id?: string | undefined;
        user_agent?: string | undefined;
        ip_address?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    assessment_id: string;
    user_id: string;
    context?: {
        organization_id?: string | undefined;
        session_id?: string | undefined;
        user_agent?: string | undefined;
        ip_address?: string | undefined;
    } | undefined;
}, {
    assessment_id: string;
    user_id: string;
    context?: {
        organization_id?: string | undefined;
        session_id?: string | undefined;
        user_agent?: string | undefined;
        ip_address?: string | undefined;
    } | undefined;
}>;
/**
 * Save Assessment Responses API Request Contract
 * Derived from SaveAssessmentResponsesOperationSchema
 */
export declare const SaveAssessmentResponsesApiRequestSchema: z.ZodObject<{
    user_assessment_id: z.ZodString;
    responses: z.ZodArray<z.ZodObject<{
        question_id: z.ZodString;
        response_value: z.ZodOptional<z.ZodNumber>;
        response_text: z.ZodOptional<z.ZodString>;
        response_time: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        question_id: string;
        skipped: boolean;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
    }, {
        question_id: string;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
    is_complete: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        skipped: boolean;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
    }[];
    is_complete: boolean;
}, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        skipped?: boolean | undefined;
    }[];
    is_complete?: boolean | undefined;
}>;
/**
 * Complete User Assessment API Request Contract
 * Derived from CompleteUserAssessmentOperationSchema
 */
export declare const CompleteUserAssessmentApiRequestSchema: z.ZodObject<{
    user_assessment_id: z.ZodString;
    final_responses: z.ZodArray<z.ZodObject<{
        question_id: z.ZodString;
        response_value: z.ZodOptional<z.ZodNumber>;
        response_text: z.ZodOptional<z.ZodString>;
        response_time: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        question_id: string;
        skipped: boolean;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
    }, {
        question_id: string;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
    completion_time: z.ZodNumber;
    cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    user_assessment_id: string;
    final_responses: {
        question_id: string;
        skipped: boolean;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
    }[];
    completion_time: number;
    cultural_adjustment_applied: boolean;
}, {
    user_assessment_id: string;
    final_responses: {
        question_id: string;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        skipped?: boolean | undefined;
    }[];
    completion_time: number;
    cultural_adjustment_applied?: boolean | undefined;
}>;
/**
 * Create Assessment Response API Request Contract
 * Derived from CreateAssessmentResponseOperationSchema
 */
export declare const CreateAssessmentResponseApiRequestSchema: z.ZodEffects<z.ZodObject<{
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
    responseValue: z.ZodOptional<z.ZodNumber>;
    responseText: z.ZodOptional<z.ZodString>;
    responseTime: z.ZodOptional<z.ZodNumber>;
} & {
    userAssessmentId: z.ZodString;
    questionId: z.ZodString;
} & {
    response_value: z.ZodOptional<z.ZodNumber>;
    response_text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    skipped: boolean;
    userAssessmentId: string;
    questionId: string;
    confidence?: number | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}, {
    userAssessmentId: string;
    questionId: string;
    confidence?: number | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}>, {
    skipped: boolean;
    userAssessmentId: string;
    questionId: string;
    confidence?: number | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}, {
    userAssessmentId: string;
    questionId: string;
    confidence?: number | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}>;
/**
 * Update Assessment Response API Request Contract
 * Derived from UpdateAssessmentResponseOperationSchema
 */
export declare const UpdateAssessmentResponseApiRequestSchema: z.ZodEffects<z.ZodObject<Omit<{
    confidence: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    skipped: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    responseValue: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    responseText: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    responseTime: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    userAssessmentId: z.ZodOptional<z.ZodString>;
    questionId: z.ZodOptional<z.ZodString>;
}, "userAssessmentId" | "questionId">, "strip", z.ZodTypeAny, {
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}, {
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}>, {
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}, {
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}>;
/**
 * Bulk Update Assessment Responses API Request Contract
 * Derived from BulkUpdateAssessmentResponsesOperationSchema
 */
export declare const BulkUpdateAssessmentResponsesApiRequestSchema: z.ZodObject<{
    user_assessment_id: z.ZodString;
    responses: z.ZodArray<z.ZodObject<{
        question_id: z.ZodString;
        response_value: z.ZodOptional<z.ZodNumber>;
        response_text: z.ZodOptional<z.ZodString>;
        response_time: z.ZodOptional<z.ZodNumber>;
        confidence: z.ZodOptional<z.ZodNumber>;
        skipped: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        question_id: string;
        skipped: boolean;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
    }, {
        question_id: string;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        skipped: boolean;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
    }[];
}, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        confidence?: number | undefined;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        skipped?: boolean | undefined;
    }[];
}>;
/**
 * Search Assessments API Request Contract
 * Derived from SearchAssessmentsOperationSchema
 */
export declare const SearchAssessmentsApiRequestSchema: z.ZodObject<{
    query: z.ZodString;
    assessment_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["draft", "active", "archived", "under_review"]>, "many">>;
    language: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    research_backed: z.ZodOptional<z.ZodBoolean>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["relevance", "created_at", "published_at", "name"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    query: string;
    sort_by: "name" | "published_at" | "relevance" | "created_at";
    sort_order: "asc" | "desc";
    status?: ("active" | "draft" | "archived" | "under_review")[] | undefined;
    language?: string[] | undefined;
    assessment_type?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    research_backed?: boolean | undefined;
}, {
    query: string;
    status?: ("active" | "draft" | "archived" | "under_review")[] | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort_by?: "name" | "published_at" | "relevance" | "created_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    language?: string[] | undefined;
    assessment_type?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    research_backed?: boolean | undefined;
}>;
/**
 * Assessment API Response Contract
 * Derived from AssessmentEntitySchema
 */
export declare const AssessmentApiResponseSchema: z.ZodObject<{
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
    name: string;
    status: "active" | "draft" | "archived" | "under_review";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    version: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
}>;
/**
 * Assessment with Questions API Response Contract
 * Extends assessment with questions
 */
export declare const AssessmentWithQuestionsApiResponseSchema: z.ZodObject<{
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
} & {
    questions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        orderIndex: number;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
        orderIndex: number;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    name: string;
    status: "active" | "draft" | "archived" | "under_review";
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    version: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
    researchBacked: boolean;
    scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    questions: {
        id: string;
        orderIndex: number;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
}, {
    name: string;
    id: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questionsCount: number;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    publishedAt?: string | undefined;
    estimatedDuration?: number | undefined;
    version?: string | undefined;
    passingScore?: number | undefined;
    validityScore?: number | undefined;
    reliabilityScore?: number | undefined;
    instructions?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    questions?: {
        id: string;
        orderIndex: number;
        createdAt: string;
        updatedAt: string;
        assessmentId: string;
        questionText: string;
        questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
    }[] | undefined;
}>;
/**
 * Assessment Question API Response Contract
 * Derived from AssessmentQuestionEntitySchema
 */
export declare const AssessmentQuestionApiResponseSchema: z.ZodObject<{
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
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
    orderIndex: number;
    createdAt: string;
    updatedAt: string;
    assessmentId: string;
    questionText: string;
    questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
/**
 * User Assessment API Response Contract
 * Derived from UserAssessmentEntitySchema
 */
export declare const UserAssessmentApiResponseSchema: z.ZodObject<{
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
    completionPercentage: number;
    userId: string;
    assessmentId: string;
    startedAt: string;
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
    userId: string;
    assessmentId: string;
    startedAt: string;
    completionPercentage?: number | undefined;
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
/**
 * User Assessment with Details API Response Contract
 * Extends user assessment with assessment and user details
 */
export declare const UserAssessmentWithDetailsApiResponseSchema: z.ZodObject<{
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
        name: string;
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        version: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        version?: string | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    }>;
    user: z.ZodObject<{
        id: z.ZodString;
        first_name: z.ZodString;
        last_name: z.ZodString;
        display_name: z.ZodOptional<z.ZodString>;
        avatar_url: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    }, {
        id: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string;
    updatedAt: string;
    completionPercentage: number;
    userId: string;
    assessmentId: string;
    startedAt: string;
    culturalAdjustmentApplied: boolean;
    suggestedPeers: string[];
    complementaryGifts: string[];
    user: {
        id: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    assessment: {
        name: string;
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        version: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
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
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    assessmentId: string;
    startedAt: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    assessment: {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        version?: string | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    };
    completionPercentage?: number | undefined;
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
/**
 * Assessment Response API Response Contract
 * Derived from AssessmentResponseEntitySchema
 */
export declare const AssessmentResponseApiResponseSchema: z.ZodObject<{
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
    skipped: boolean;
    userAssessmentId: string;
    questionId: string;
    confidence?: number | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}, {
    id: string;
    createdAt: string;
    updatedAt: string;
    userAssessmentId: string;
    questionId: string;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
    responseValue?: number | undefined;
    responseText?: string | undefined;
    responseTime?: number | undefined;
}>;
/**
 * Assessment List API Response Contract
 * Paginated list of assessments
 */
export declare const AssessmentListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodArray<z.ZodObject<{
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
        name: string;
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        version: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
    }, {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        version?: string | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        name: string;
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        version: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        language: string;
        culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
        researchBacked: boolean;
        scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        name: string;
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questionsCount: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        publishedAt?: string | undefined;
        estimatedDuration?: number | undefined;
        version?: string | undefined;
        passingScore?: number | undefined;
        validityScore?: number | undefined;
        reliabilityScore?: number | undefined;
        instructions?: string | undefined;
        language?: string | undefined;
        culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
        researchBacked?: boolean | undefined;
        scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Assessment Search API Response Contract
 * Search results for assessments
 */
export declare const AssessmentSearchApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        assessments: z.ZodArray<z.ZodObject<{
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
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        }, {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        query: string;
        total: number;
        took: number;
        assessments: {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        }[];
    }, {
        query: string;
        total: number;
        took: number;
        assessments: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        }[];
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        query: string;
        total: number;
        took: number;
        assessments: {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        }[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        query: string;
        total: number;
        took: number;
        assessments: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        }[];
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * User Assessment List API Response Contract
 * Paginated list of user assessments
 */
export declare const UserAssessmentListApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
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
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        }, {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        }>;
        user: z.ZodObject<{
            id: z.ZodString;
            first_name: z.ZodString;
            last_name: z.ZodString;
            display_name: z.ZodOptional<z.ZodString>;
            avatar_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        }, {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        }>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        createdAt: string;
        updatedAt: string;
        completionPercentage: number;
        userId: string;
        assessmentId: string;
        startedAt: string;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
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
    }, {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        assessmentId: string;
        startedAt: string;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        };
        completionPercentage?: number | undefined;
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
    }>, "many">;
    meta: z.ZodObject<{
        pagination: z.ZodObject<{
            page: z.ZodNumber;
            limit: z.ZodNumber;
            total: z.ZodNumber;
            total_pages: z.ZodNumber;
            has_next: z.ZodBoolean;
            has_prev: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }, {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        }>;
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }, {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        completionPercentage: number;
        userId: string;
        assessmentId: string;
        startedAt: string;
        culturalAdjustmentApplied: boolean;
        suggestedPeers: string[];
        complementaryGifts: string[];
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
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
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        id: string;
        createdAt: string;
        updatedAt: string;
        userId: string;
        assessmentId: string;
        startedAt: string;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        };
        completionPercentage?: number | undefined;
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
    }[];
    meta: {
        pagination: {
            page: number;
            limit: number;
            total: number;
            total_pages: number;
            has_next: boolean;
            has_prev: boolean;
        };
        timestamp: string;
    };
}>;
/**
 * Assessment Statistics API Response Contract
 * Assessment completion and scoring statistics
 */
export declare const AssessmentStatisticsApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        assessment_id: z.ZodString;
        total_completions: z.ZodNumber;
        average_completion_time: z.ZodNumber;
        average_score: z.ZodNumber;
        completion_rate: z.ZodNumber;
        score_distribution: z.ZodArray<z.ZodObject<{
            score_range: z.ZodString;
            count: z.ZodNumber;
            percentage: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            percentage: number;
            score_range: string;
            count: number;
        }, {
            percentage: number;
            score_range: string;
            count: number;
        }>, "many">;
        apest_distribution: z.ZodOptional<z.ZodObject<{
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
        trends: z.ZodOptional<z.ZodArray<z.ZodObject<{
            date: z.ZodString;
            completions: z.ZodNumber;
            average_score: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            date: string;
            average_score: number;
            completions: number;
        }, {
            date: string;
            average_score: number;
            completions: number;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        assessment_id: string;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
        completion_rate: number;
        score_distribution: {
            percentage: number;
            score_range: string;
            count: number;
        }[];
        trends?: {
            date: string;
            average_score: number;
            completions: number;
        }[] | undefined;
        apest_distribution?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        } | undefined;
    }, {
        assessment_id: string;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
        completion_rate: number;
        score_distribution: {
            percentage: number;
            score_range: string;
            count: number;
        }[];
        trends?: {
            date: string;
            average_score: number;
            completions: number;
        }[] | undefined;
        apest_distribution?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        } | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        assessment_id: string;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
        completion_rate: number;
        score_distribution: {
            percentage: number;
            score_range: string;
            count: number;
        }[];
        trends?: {
            date: string;
            average_score: number;
            completions: number;
        }[] | undefined;
        apest_distribution?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        assessment_id: string;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
        completion_rate: number;
        score_distribution: {
            percentage: number;
            score_range: string;
            count: number;
        }[];
        trends?: {
            date: string;
            average_score: number;
            completions: number;
        }[] | undefined;
        apest_distribution?: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * User Assessment Insights API Response Contract
 * AI-generated insights for user assessment
 */
export declare const UserAssessmentInsightsApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        user_assessment_id: z.ZodString;
        insights: z.ZodObject<{
            primary_gift_analysis: z.ZodString;
            secondary_gift_analysis: z.ZodString;
            complementary_gifts: z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">;
            strengths: z.ZodArray<z.ZodString, "many">;
            growth_areas: z.ZodArray<z.ZodString, "many">;
            ministry_recommendations: z.ZodArray<z.ZodString, "many">;
            leadership_style: z.ZodOptional<z.ZodString>;
            cultural_considerations: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            strengths: string[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        }, {
            strengths: string[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        }>;
        recommendations: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<["content", "community", "assessment", "development"]>;
            title: z.ZodString;
            description: z.ZodString;
            priority: z.ZodEnum<["low", "medium", "high"]>;
            action_url: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            type: "content" | "community" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }, {
            type: "content" | "community" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }>, "many">;
        comparisons: z.ZodOptional<z.ZodObject<{
            peer_average: z.ZodObject<{
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
            }>;
            cultural_adjustment: z.ZodObject<{
                applied: z.ZodBoolean;
                adjustment_factor: z.ZodNumber;
                notes: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            }, {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            peer_average: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            cultural_adjustment: {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            };
        }, {
            peer_average: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            cultural_adjustment: {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            };
        }>>;
    }, "strip", z.ZodTypeAny, {
        insights: {
            strengths: string[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "content" | "community" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
        user_assessment_id: string;
        comparisons?: {
            peer_average: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            cultural_adjustment: {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            };
        } | undefined;
    }, {
        insights: {
            strengths: string[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "content" | "community" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
        user_assessment_id: string;
        comparisons?: {
            peer_average: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            cultural_adjustment: {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            };
        } | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        insights: {
            strengths: string[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "content" | "community" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
        user_assessment_id: string;
        comparisons?: {
            peer_average: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            cultural_adjustment: {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            };
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        insights: {
            strengths: string[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "content" | "community" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
        user_assessment_id: string;
        comparisons?: {
            peer_average: {
                apostolic: number;
                prophetic: number;
                evangelistic: number;
                shepherding: number;
                teaching: number;
            };
            cultural_adjustment: {
                applied: boolean;
                adjustment_factor: number;
                notes?: string | undefined;
            };
        } | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Start User Assessment API Response Contract
 * Response for starting a new assessment
 */
export declare const StartUserAssessmentApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        user_assessment: z.ZodObject<{
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
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
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
            userId: string;
            assessmentId: string;
            startedAt: string;
            completionPercentage?: number | undefined;
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
        } & {
            questions: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            questions: {
                id: string;
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        }, {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            questions?: {
                id: string;
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            }[] | undefined;
        }>;
        estimated_duration: z.ZodNumber;
        instructions: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        assessment: {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            questions: {
                id: string;
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
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
        };
        estimated_duration: number;
        instructions?: string | undefined;
    }, {
        assessment: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            questions?: {
                id: string;
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            }[] | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            completionPercentage?: number | undefined;
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
        };
        estimated_duration: number;
        instructions?: string | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        assessment: {
            name: string;
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            version: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            language: string;
            culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
            researchBacked: boolean;
            scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            questions: {
                id: string;
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
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
        };
        estimated_duration: number;
        instructions?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        assessment: {
            name: string;
            id: string;
            slug: string;
            createdAt: string;
            updatedAt: string;
            assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questionsCount: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            publishedAt?: string | undefined;
            estimatedDuration?: number | undefined;
            version?: string | undefined;
            passingScore?: number | undefined;
            validityScore?: number | undefined;
            reliabilityScore?: number | undefined;
            instructions?: string | undefined;
            language?: string | undefined;
            culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
            researchBacked?: boolean | undefined;
            scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            questions?: {
                id: string;
                orderIndex: number;
                createdAt: string;
                updatedAt: string;
                assessmentId: string;
                questionText: string;
                questionType: "text" | "binary" | "ranking" | "likert" | "multiple_choice";
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
            }[] | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            completionPercentage?: number | undefined;
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
        };
        estimated_duration: number;
        instructions?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Save Assessment Responses API Response Contract
 * Response for saving assessment responses
 */
export declare const SaveAssessmentResponsesApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        user_assessment: z.ZodObject<{
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
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
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
            userId: string;
            assessmentId: string;
            startedAt: string;
            completionPercentage?: number | undefined;
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
        saved_responses: z.ZodArray<z.ZodObject<{
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
            skipped: boolean;
            userAssessmentId: string;
            questionId: string;
            confidence?: number | undefined;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            userAssessmentId: string;
            questionId: string;
            confidence?: number | undefined;
            skipped?: boolean | undefined;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
        }>, "many">;
        completion_percentage: z.ZodNumber;
        is_complete: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        is_complete: boolean;
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
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
        };
        saved_responses: {
            id: string;
            createdAt: string;
            updatedAt: string;
            skipped: boolean;
            userAssessmentId: string;
            questionId: string;
            confidence?: number | undefined;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
        }[];
        completion_percentage: number;
    }, {
        is_complete: boolean;
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            completionPercentage?: number | undefined;
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
        };
        saved_responses: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userAssessmentId: string;
            questionId: string;
            confidence?: number | undefined;
            skipped?: boolean | undefined;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
        }[];
        completion_percentage: number;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        is_complete: boolean;
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
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
        };
        saved_responses: {
            id: string;
            createdAt: string;
            updatedAt: string;
            skipped: boolean;
            userAssessmentId: string;
            questionId: string;
            confidence?: number | undefined;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
        }[];
        completion_percentage: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        is_complete: boolean;
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            completionPercentage?: number | undefined;
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
        };
        saved_responses: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userAssessmentId: string;
            questionId: string;
            confidence?: number | undefined;
            skipped?: boolean | undefined;
            responseValue?: number | undefined;
            responseText?: string | undefined;
            responseTime?: number | undefined;
        }[];
        completion_percentage: number;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Complete User Assessment API Response Contract
 * Response for completing an assessment
 */
export declare const CompleteUserAssessmentApiResponseSchema: z.ZodObject<{
    success: z.ZodBoolean;
    data: z.ZodObject<{
        user_assessment: z.ZodObject<{
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
                name: string;
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                version: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                language: string;
                culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
                researchBacked: boolean;
                scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
            }, {
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                version?: string | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
                language?: string | undefined;
                culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
                researchBacked?: boolean | undefined;
                scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            }>;
            user: z.ZodObject<{
                id: z.ZodString;
                first_name: z.ZodString;
                last_name: z.ZodString;
                display_name: z.ZodOptional<z.ZodString>;
                avatar_url: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            }, {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            }>;
        }, "strip", z.ZodTypeAny, {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                name: string;
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                version: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                language: string;
                culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
                researchBacked: boolean;
                scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
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
        }, {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                version?: string | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
                language?: string | undefined;
                culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
                researchBacked?: boolean | undefined;
                scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            };
            completionPercentage?: number | undefined;
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
        scores: z.ZodObject<{
            total_score: z.ZodNumber;
            max_possible_score: z.ZodNumber;
            apostolic_score: z.ZodOptional<z.ZodNumber>;
            prophetic_score: z.ZodOptional<z.ZodNumber>;
            evangelistic_score: z.ZodOptional<z.ZodNumber>;
            shepherding_score: z.ZodOptional<z.ZodNumber>;
            teaching_score: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        }, {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        }>;
        results: z.ZodObject<{
            primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            complementary_gifts: z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">;
        }, "strip", z.ZodTypeAny, {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        }, {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        }>;
        insights: z.ZodOptional<z.ZodString>;
        recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        recommendations: string[];
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                name: string;
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                version: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                language: string;
                culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
                researchBacked: boolean;
                scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
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
        };
        results: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        };
        insights?: string | undefined;
    }, {
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                version?: string | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
                language?: string | undefined;
                culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
                researchBacked?: boolean | undefined;
                scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            };
            completionPercentage?: number | undefined;
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
        };
        results: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        };
        insights?: string | undefined;
        recommendations?: string[] | undefined;
    }>;
    meta: z.ZodObject<{
        timestamp: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        timestamp: string;
    }, {
        timestamp: string;
    }>;
}, "strip", z.ZodTypeAny, {
    success: boolean;
    data: {
        recommendations: string[];
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            completionPercentage: number;
            userId: string;
            assessmentId: string;
            startedAt: string;
            culturalAdjustmentApplied: boolean;
            suggestedPeers: string[];
            complementaryGifts: string[];
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                name: string;
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                version: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                language: string;
                culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal";
                researchBacked: boolean;
                scoringMethod: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
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
        };
        results: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        };
        insights?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        };
        user_assessment: {
            id: string;
            createdAt: string;
            updatedAt: string;
            userId: string;
            assessmentId: string;
            startedAt: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                name: string;
                id: string;
                slug: string;
                createdAt: string;
                updatedAt: string;
                assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questionsCount: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                publishedAt?: string | undefined;
                estimatedDuration?: number | undefined;
                version?: string | undefined;
                passingScore?: number | undefined;
                validityScore?: number | undefined;
                reliabilityScore?: number | undefined;
                instructions?: string | undefined;
                language?: string | undefined;
                culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "global" | "universal" | undefined;
                researchBacked?: boolean | undefined;
                scoringMethod?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            };
            completionPercentage?: number | undefined;
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
        };
        results: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        };
        insights?: string | undefined;
        recommendations?: string[] | undefined;
    };
    meta: {
        timestamp: string;
    };
}>;
/**
 * Get Assessment by ID API Query Contract
 * Derived from GetAssessmentByIdOperationSchema
 */
export declare const GetAssessmentByIdApiQuerySchema: z.ZodObject<{
    id: z.ZodString;
    include_questions: z.ZodDefault<z.ZodBoolean>;
    include_responses: z.ZodDefault<z.ZodBoolean>;
    include_statistics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    include_questions: boolean;
    include_responses: boolean;
    include_statistics: boolean;
}, {
    id: string;
    include_questions?: boolean | undefined;
    include_responses?: boolean | undefined;
    include_statistics?: boolean | undefined;
}>;
/**
 * List Assessments API Query Contract
 * Derived from ListAssessmentsOperationSchema
 */
export declare const ListAssessmentsApiQuerySchema: z.ZodObject<{
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
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["created_at", "updated_at", "published_at", "name", "questions_count"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_questions: z.ZodDefault<z.ZodBoolean>;
    include_statistics: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "name" | "createdAt" | "updatedAt" | "publishedAt" | "estimatedDuration" | "questionsCount";
    sortOrder: "asc" | "desc";
    sort_by: "name" | "published_at" | "created_at" | "updated_at" | "questions_count";
    sort_order: "asc" | "desc";
    offset: number;
    include_questions: boolean;
    include_statistics: boolean;
    includeQuestions: boolean;
    includeStatistics: boolean;
    status?: string | undefined;
    search?: string | undefined;
    assessmentType?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: string | undefined;
    researchBacked?: boolean | undefined;
}, {
    status?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    search?: string | undefined;
    sortBy?: "name" | "createdAt" | "updatedAt" | "publishedAt" | "estimatedDuration" | "questionsCount" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    sort_by?: "name" | "published_at" | "created_at" | "updated_at" | "questions_count" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    offset?: number | undefined;
    assessmentType?: string | undefined;
    language?: string | undefined;
    culturalAdaptation?: string | undefined;
    researchBacked?: boolean | undefined;
    include_questions?: boolean | undefined;
    include_statistics?: boolean | undefined;
    includeQuestions?: boolean | undefined;
    includeStatistics?: boolean | undefined;
}>;
/**
 * Get User Assessment API Query Contract
 * Derived from GetUserAssessmentOperationSchema
 */
export declare const GetUserAssessmentApiQuerySchema: z.ZodObject<{
    user_assessment_id: z.ZodString;
    include_assessment: z.ZodDefault<z.ZodBoolean>;
    include_responses: z.ZodDefault<z.ZodBoolean>;
    include_insights: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    include_responses: boolean;
    user_assessment_id: string;
    include_assessment: boolean;
    include_insights: boolean;
}, {
    user_assessment_id: string;
    include_responses?: boolean | undefined;
    include_assessment?: boolean | undefined;
    include_insights?: boolean | undefined;
}>;
/**
 * List User Assessments API Query Contract
 * Derived from ListUserAssessmentsOperationSchema
 */
export declare const ListUserAssessmentsApiQuerySchema: z.ZodObject<{
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
} & {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    offset: z.ZodDefault<z.ZodNumber>;
    sort_by: z.ZodDefault<z.ZodEnum<["started_at", "completed_at", "created_at", "total_score"]>>;
    sort_order: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    include_assessment: z.ZodDefault<z.ZodBoolean>;
    include_user: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "createdAt" | "updatedAt" | "completionPercentage" | "startedAt" | "completedAt" | "totalScore";
    sortOrder: "asc" | "desc";
    sort_by: "created_at" | "started_at" | "completed_at" | "total_score";
    sort_order: "asc" | "desc";
    offset: number;
    include_assessment: boolean;
    includeUser: boolean;
    includeAssessment: boolean;
    includeResponses: boolean;
    include_user: boolean;
    userId?: string | undefined;
    assessmentId?: string | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    isCompleted?: boolean | undefined;
    startedAfter?: string | undefined;
    startedBefore?: string | undefined;
    completedAfter?: string | undefined;
    completedBefore?: string | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "createdAt" | "updatedAt" | "completionPercentage" | "startedAt" | "completedAt" | "totalScore" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    sort_by?: "created_at" | "started_at" | "completed_at" | "total_score" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    offset?: number | undefined;
    userId?: string | undefined;
    assessmentId?: string | undefined;
    primaryGift?: string | undefined;
    secondaryGift?: string | undefined;
    include_assessment?: boolean | undefined;
    isCompleted?: boolean | undefined;
    startedAfter?: string | undefined;
    startedBefore?: string | undefined;
    completedAfter?: string | undefined;
    completedBefore?: string | undefined;
    includeUser?: boolean | undefined;
    includeAssessment?: boolean | undefined;
    includeResponses?: boolean | undefined;
    include_user?: boolean | undefined;
}>;
/**
 * Get Assessment Statistics API Query Contract
 * Derived from GetAssessmentStatisticsOperationSchema
 */
export declare const GetAssessmentStatisticsApiQuerySchema: z.ZodObject<{
    assessment_id: z.ZodString;
    date_range: z.ZodOptional<z.ZodObject<{
        start_date: z.ZodString;
        end_date: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        start_date: string;
        end_date: string;
    }, {
        start_date: string;
        end_date: string;
    }>>;
    group_by: z.ZodDefault<z.ZodEnum<["day", "week", "month"]>>;
}, "strip", z.ZodTypeAny, {
    assessment_id: string;
    group_by: "day" | "week" | "month";
    date_range?: {
        start_date: string;
        end_date: string;
    } | undefined;
}, {
    assessment_id: string;
    date_range?: {
        start_date: string;
        end_date: string;
    } | undefined;
    group_by?: "day" | "week" | "month" | undefined;
}>;
/**
 * Get User Assessment Insights API Query Contract
 * Derived from GetUserAssessmentInsightsOperationSchema
 */
export declare const GetUserAssessmentInsightsApiQuerySchema: z.ZodObject<{
    user_assessment_id: z.ZodString;
    include_recommendations: z.ZodDefault<z.ZodBoolean>;
    include_comparisons: z.ZodDefault<z.ZodBoolean>;
    include_trends: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    include_comparisons: boolean;
    include_trends: boolean;
    user_assessment_id: string;
    include_recommendations: boolean;
}, {
    user_assessment_id: string;
    include_comparisons?: boolean | undefined;
    include_trends?: boolean | undefined;
    include_recommendations?: boolean | undefined;
}>;
export type CreateAssessmentApiRequest = z.infer<typeof CreateAssessmentApiRequestSchema>;
export type UpdateAssessmentApiRequest = z.infer<typeof UpdateAssessmentApiRequestSchema>;
export type CreateAssessmentQuestionApiRequest = z.infer<typeof CreateAssessmentQuestionApiRequestSchema>;
export type UpdateAssessmentQuestionApiRequest = z.infer<typeof UpdateAssessmentQuestionApiRequestSchema>;
export type ReorderAssessmentQuestionsApiRequest = z.infer<typeof ReorderAssessmentQuestionsApiRequestSchema>;
export type StartUserAssessmentApiRequest = z.infer<typeof StartUserAssessmentApiRequestSchema>;
export type SaveAssessmentResponsesApiRequest = z.infer<typeof SaveAssessmentResponsesApiRequestSchema>;
export type CompleteUserAssessmentApiRequest = z.infer<typeof CompleteUserAssessmentApiRequestSchema>;
export type CreateAssessmentResponseApiRequest = z.infer<typeof CreateAssessmentResponseApiRequestSchema>;
export type UpdateAssessmentResponseApiRequest = z.infer<typeof UpdateAssessmentResponseApiRequestSchema>;
export type BulkUpdateAssessmentResponsesApiRequest = z.infer<typeof BulkUpdateAssessmentResponsesApiRequestSchema>;
export type SearchAssessmentsApiRequest = z.infer<typeof SearchAssessmentsApiRequestSchema>;
export type AssessmentApiResponse = z.infer<typeof AssessmentApiResponseSchema>;
export type AssessmentWithQuestionsApiResponse = z.infer<typeof AssessmentWithQuestionsApiResponseSchema>;
export type AssessmentQuestionApiResponse = z.infer<typeof AssessmentQuestionApiResponseSchema>;
export type UserAssessmentApiResponse = z.infer<typeof UserAssessmentApiResponseSchema>;
export type UserAssessmentWithDetailsApiResponse = z.infer<typeof UserAssessmentWithDetailsApiResponseSchema>;
export type AssessmentResponseApiResponse = z.infer<typeof AssessmentResponseApiResponseSchema>;
export type AssessmentListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof AssessmentApiResponseSchema>>>;
export type AssessmentSearchApiResponse = z.infer<typeof AssessmentSearchApiResponseSchema>;
export type UserAssessmentListApiResponse = z.infer<ReturnType<typeof PaginatedResponseSchema<typeof UserAssessmentWithDetailsApiResponseSchema>>>;
export type AssessmentStatisticsApiResponse = z.infer<typeof AssessmentStatisticsApiResponseSchema>;
export type UserAssessmentInsightsApiResponse = z.infer<typeof UserAssessmentInsightsApiResponseSchema>;
export type StartUserAssessmentApiResponse = z.infer<typeof StartUserAssessmentApiResponseSchema>;
export type SaveAssessmentResponsesApiResponse = z.infer<typeof SaveAssessmentResponsesApiResponseSchema>;
export type CompleteUserAssessmentApiResponse = z.infer<typeof CompleteUserAssessmentApiResponseSchema>;
export type GetAssessmentByIdApiQuery = z.infer<typeof GetAssessmentByIdApiQuerySchema>;
export type ListAssessmentsApiQuery = z.infer<typeof ListAssessmentsApiQuerySchema>;
export type GetUserAssessmentApiQuery = z.infer<typeof GetUserAssessmentApiQuerySchema>;
export type ListUserAssessmentsApiQuery = z.infer<typeof ListUserAssessmentsApiQuerySchema>;
export type GetAssessmentStatisticsApiQuery = z.infer<typeof GetAssessmentStatisticsApiQuerySchema>;
export type GetUserAssessmentInsightsApiQuery = z.infer<typeof GetUserAssessmentInsightsApiQuerySchema>;
//# sourceMappingURL=assessment.contracts.d.ts.map