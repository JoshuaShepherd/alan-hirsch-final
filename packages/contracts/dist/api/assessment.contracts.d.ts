import { z } from 'zod';
import { PaginatedResponseSchema } from './user.contracts';
/**
 * Create Assessment API Request Contract
 * Derived from CreateAssessmentOperationSchema
 */
export declare const CreateAssessmentApiRequestSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    description: z.ZodOptional<z.ZodString>;
    assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questions_count: z.ZodNumber;
    estimated_duration: z.ZodOptional<z.ZodNumber>;
    passing_score: z.ZodOptional<z.ZodNumber>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    research_backed: z.ZodDefault<z.ZodBoolean>;
    validity_score: z.ZodOptional<z.ZodNumber>;
    reliability_score: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    published_at: z.ZodOptional<z.ZodString>;
} & {
    name: z.ZodEffects<z.ZodString, string, string>;
    slug: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "draft" | "archived" | "under_review";
    name: string;
    slug: string;
    assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questions_count: number;
    version: string;
    language: string;
    cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
    research_backed: boolean;
    scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    description?: string | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    published_at?: string | undefined;
}, {
    name: string;
    slug: string;
    assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questions_count: number;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
}>;
/**
 * Update Assessment API Request Contract
 * Derived from UpdateAssessmentOperationSchema
 */
export declare const UpdateAssessmentApiRequestSchema: z.ZodEffects<z.ZodObject<{
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    assessment_type: z.ZodOptional<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>>;
    questions_count: z.ZodOptional<z.ZodNumber>;
    estimated_duration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    passing_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    version: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    cultural_adaptation: z.ZodOptional<z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>>;
    research_backed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    validity_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    reliability_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scoring_method: z.ZodOptional<z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    assessment_type?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questions_count?: number | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
}, {
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    assessment_type?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questions_count?: number | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
}>, {
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    assessment_type?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questions_count?: number | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
}, {
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    assessment_type?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    questions_count?: number | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
}>;
/**
 * Create Assessment Question API Request Contract
 * Derived from CreateAssessmentQuestionOperationSchema
 */
export declare const CreateAssessmentQuestionApiRequestSchema: z.ZodObject<{
    assessment_id: z.ZodString;
    question_type: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    category: z.ZodOptional<z.ZodString>;
    apest_dimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    answer_options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    is_required: z.ZodDefault<z.ZodBoolean>;
    weight: z.ZodDefault<z.ZodNumber>;
    reverse_scored: z.ZodDefault<z.ZodBoolean>;
} & {
    question_text: z.ZodEffects<z.ZodString, string, string>;
    order_index: z.ZodEffects<z.ZodNumber, number, number>;
}, "strip", z.ZodTypeAny, {
    assessment_id: string;
    question_text: string;
    question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    order_index: number;
    is_required: boolean;
    weight: number;
    reverse_scored: boolean;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
}, {
    assessment_id: string;
    question_text: string;
    question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    order_index: number;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
    is_required?: boolean | undefined;
    weight?: number | undefined;
    reverse_scored?: boolean | undefined;
}>;
/**
 * Update Assessment Question API Request Contract
 * Derived from UpdateAssessmentQuestionOperationSchema
 */
export declare const UpdateAssessmentQuestionApiRequestSchema: z.ZodEffects<z.ZodObject<{
    assessment_id: z.ZodOptional<z.ZodString>;
    question_text: z.ZodOptional<z.ZodString>;
    question_type: z.ZodOptional<z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>>;
    order_index: z.ZodOptional<z.ZodNumber>;
    category: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    apest_dimension: z.ZodOptional<z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>>;
    answer_options: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>>;
    is_required: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    weight: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    reverse_scored: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    assessment_id?: string | undefined;
    question_text?: string | undefined;
    question_type?: "binary" | "ranking" | "likert" | "multiple_choice" | "text" | undefined;
    order_index?: number | undefined;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
    is_required?: boolean | undefined;
    weight?: number | undefined;
    reverse_scored?: boolean | undefined;
}, {
    assessment_id?: string | undefined;
    question_text?: string | undefined;
    question_type?: "binary" | "ranking" | "likert" | "multiple_choice" | "text" | undefined;
    order_index?: number | undefined;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
    is_required?: boolean | undefined;
    weight?: number | undefined;
    reverse_scored?: boolean | undefined;
}>, {
    assessment_id?: string | undefined;
    question_text?: string | undefined;
    question_type?: "binary" | "ranking" | "likert" | "multiple_choice" | "text" | undefined;
    order_index?: number | undefined;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
    is_required?: boolean | undefined;
    weight?: number | undefined;
    reverse_scored?: boolean | undefined;
}, {
    assessment_id?: string | undefined;
    question_text?: string | undefined;
    question_type?: "binary" | "ranking" | "likert" | "multiple_choice" | "text" | undefined;
    order_index?: number | undefined;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
    is_required?: boolean | undefined;
    weight?: number | undefined;
    reverse_scored?: boolean | undefined;
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
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
    }, {
        question_id: string;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
    is_complete: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        skipped: boolean;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
    }[];
    is_complete: boolean;
}, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
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
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
    }, {
        question_id: string;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
    completion_time: z.ZodNumber;
    cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    completion_time: number;
    cultural_adjustment_applied: boolean;
    user_assessment_id: string;
    final_responses: {
        question_id: string;
        skipped: boolean;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
    }[];
}, {
    completion_time: number;
    user_assessment_id: string;
    final_responses: {
        question_id: string;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }[];
    cultural_adjustment_applied?: boolean | undefined;
}>;
/**
 * Create Assessment Response API Request Contract
 * Derived from CreateAssessmentResponseOperationSchema
 */
export declare const CreateAssessmentResponseApiRequestSchema: z.ZodEffects<z.ZodObject<{
    user_assessment_id: z.ZodString;
    question_id: z.ZodString;
    response_time: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
} & {
    response_value: z.ZodOptional<z.ZodNumber>;
    response_text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    user_assessment_id: string;
    question_id: string;
    skipped: boolean;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
}, {
    user_assessment_id: string;
    question_id: string;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>, {
    user_assessment_id: string;
    question_id: string;
    skipped: boolean;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
}, {
    user_assessment_id: string;
    question_id: string;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>;
/**
 * Update Assessment Response API Request Contract
 * Derived from UpdateAssessmentResponseOperationSchema
 */
export declare const UpdateAssessmentResponseApiRequestSchema: z.ZodEffects<z.ZodObject<{
    user_assessment_id: z.ZodOptional<z.ZodString>;
    question_id: z.ZodOptional<z.ZodString>;
    response_value: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    response_text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    response_time: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    confidence: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    skipped: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    user_assessment_id?: string | undefined;
    question_id?: string | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}, {
    user_assessment_id?: string | undefined;
    question_id?: string | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>, {
    user_assessment_id?: string | undefined;
    question_id?: string | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}, {
    user_assessment_id?: string | undefined;
    question_id?: string | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
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
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
    }, {
        question_id: string;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
        skipped?: boolean | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        skipped: boolean;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
    }[];
}, {
    user_assessment_id: string;
    responses: {
        question_id: string;
        response_value?: number | undefined;
        response_text?: string | undefined;
        response_time?: number | undefined;
        confidence?: number | undefined;
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
    sort_by: "created_at" | "name" | "published_at" | "relevance";
    sort_order: "asc" | "desc";
    query: string;
    status?: ("active" | "draft" | "archived" | "under_review")[] | undefined;
    assessment_type?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    language?: string[] | undefined;
    research_backed?: boolean | undefined;
}, {
    query: string;
    status?: ("active" | "draft" | "archived" | "under_review")[] | undefined;
    assessment_type?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    language?: string[] | undefined;
    research_backed?: boolean | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sort_by?: "created_at" | "name" | "published_at" | "relevance" | undefined;
    sort_order?: "asc" | "desc" | undefined;
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
    assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questions_count: z.ZodNumber;
    estimated_duration: z.ZodOptional<z.ZodNumber>;
    passing_score: z.ZodOptional<z.ZodNumber>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    research_backed: z.ZodDefault<z.ZodBoolean>;
    validity_score: z.ZodOptional<z.ZodNumber>;
    reliability_score: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    published_at: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "draft" | "archived" | "under_review";
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questions_count: number;
    version: string;
    language: string;
    cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
    research_backed: boolean;
    scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    description?: string | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    published_at?: string | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questions_count: number;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
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
    assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    questions_count: z.ZodNumber;
    estimated_duration: z.ZodOptional<z.ZodNumber>;
    passing_score: z.ZodOptional<z.ZodNumber>;
    version: z.ZodDefault<z.ZodString>;
    language: z.ZodDefault<z.ZodString>;
    cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
    research_backed: z.ZodDefault<z.ZodBoolean>;
    validity_score: z.ZodOptional<z.ZodNumber>;
    reliability_score: z.ZodOptional<z.ZodNumber>;
    instructions: z.ZodOptional<z.ZodString>;
    scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
    published_at: z.ZodOptional<z.ZodString>;
} & {
    questions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        assessment_id: z.ZodString;
        question_text: z.ZodString;
        question_type: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
        order_index: z.ZodNumber;
        category: z.ZodOptional<z.ZodString>;
        apest_dimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
        answer_options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        is_required: z.ZodDefault<z.ZodBoolean>;
        weight: z.ZodDefault<z.ZodNumber>;
        reverse_scored: z.ZodDefault<z.ZodBoolean>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        created_at: string;
        updated_at: string;
        assessment_id: string;
        question_text: string;
        question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        order_index: number;
        is_required: boolean;
        weight: number;
        reverse_scored: boolean;
        category?: string | undefined;
        apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answer_options?: Record<string, unknown> | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        assessment_id: string;
        question_text: string;
        question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        order_index: number;
        category?: string | undefined;
        apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answer_options?: Record<string, unknown> | undefined;
        is_required?: boolean | undefined;
        weight?: number | undefined;
        reverse_scored?: boolean | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "draft" | "archived" | "under_review";
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questions_count: number;
    version: string;
    language: string;
    cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
    research_backed: boolean;
    scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
    questions: {
        id: string;
        created_at: string;
        updated_at: string;
        assessment_id: string;
        question_text: string;
        question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        order_index: number;
        is_required: boolean;
        weight: number;
        reverse_scored: boolean;
        category?: string | undefined;
        apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answer_options?: Record<string, unknown> | undefined;
    }[];
    description?: string | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    published_at?: string | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    name: string;
    slug: string;
    assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    questions_count: number;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    description?: string | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string | undefined;
    cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
    questions?: {
        id: string;
        created_at: string;
        updated_at: string;
        assessment_id: string;
        question_text: string;
        question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
        order_index: number;
        category?: string | undefined;
        apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        answer_options?: Record<string, unknown> | undefined;
        is_required?: boolean | undefined;
        weight?: number | undefined;
        reverse_scored?: boolean | undefined;
    }[] | undefined;
}>;
/**
 * Assessment Question API Response Contract
 * Derived from AssessmentQuestionEntitySchema
 */
export declare const AssessmentQuestionApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    assessment_id: z.ZodString;
    question_text: z.ZodString;
    question_type: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
    order_index: z.ZodNumber;
    category: z.ZodOptional<z.ZodString>;
    apest_dimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    answer_options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    is_required: z.ZodDefault<z.ZodBoolean>;
    weight: z.ZodDefault<z.ZodNumber>;
    reverse_scored: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    assessment_id: string;
    question_text: string;
    question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    order_index: number;
    is_required: boolean;
    weight: number;
    reverse_scored: boolean;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    assessment_id: string;
    question_text: string;
    question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
    order_index: number;
    category?: string | undefined;
    apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    answer_options?: Record<string, unknown> | undefined;
    is_required?: boolean | undefined;
    weight?: number | undefined;
    reverse_scored?: boolean | undefined;
}>;
/**
 * User Assessment API Response Contract
 * Derived from UserAssessmentEntitySchema
 */
export declare const UserAssessmentApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    user_id: z.ZodString;
    assessment_id: z.ZodString;
    started_at: z.ZodString;
    completed_at: z.ZodOptional<z.ZodString>;
    completion_percentage: z.ZodDefault<z.ZodNumber>;
    total_score: z.ZodOptional<z.ZodNumber>;
    max_possible_score: z.ZodOptional<z.ZodNumber>;
    apostolic_score: z.ZodOptional<z.ZodNumber>;
    prophetic_score: z.ZodOptional<z.ZodNumber>;
    evangelistic_score: z.ZodOptional<z.ZodNumber>;
    shepherding_score: z.ZodOptional<z.ZodNumber>;
    teaching_score: z.ZodOptional<z.ZodNumber>;
    normalized_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    completion_time: z.ZodOptional<z.ZodNumber>;
    confidence_level: z.ZodOptional<z.ZodNumber>;
    cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
    ai_insights: z.ZodOptional<z.ZodString>;
    personalized_recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementary_gifts: z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    assessment_id: string;
    user_id: string;
    started_at: string;
    completion_percentage: number;
    cultural_adjustment_applied: boolean;
    personalized_recommendations: string[];
    complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
    completed_at?: string | undefined;
    total_score?: number | undefined;
    max_possible_score?: number | undefined;
    apostolic_score?: number | undefined;
    prophetic_score?: number | undefined;
    evangelistic_score?: number | undefined;
    shepherding_score?: number | undefined;
    teaching_score?: number | undefined;
    normalized_scores?: Record<string, number> | undefined;
    primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    ai_insights?: string | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    assessment_id: string;
    user_id: string;
    started_at: string;
    completed_at?: string | undefined;
    completion_percentage?: number | undefined;
    total_score?: number | undefined;
    max_possible_score?: number | undefined;
    apostolic_score?: number | undefined;
    prophetic_score?: number | undefined;
    evangelistic_score?: number | undefined;
    shepherding_score?: number | undefined;
    teaching_score?: number | undefined;
    normalized_scores?: Record<string, number> | undefined;
    primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    cultural_adjustment_applied?: boolean | undefined;
    ai_insights?: string | undefined;
    personalized_recommendations?: string[] | undefined;
    complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
}>;
/**
 * User Assessment with Details API Response Contract
 * Extends user assessment with assessment and user details
 */
export declare const UserAssessmentWithDetailsApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    user_id: z.ZodString;
    assessment_id: z.ZodString;
    started_at: z.ZodString;
    completed_at: z.ZodOptional<z.ZodString>;
    completion_percentage: z.ZodDefault<z.ZodNumber>;
    total_score: z.ZodOptional<z.ZodNumber>;
    max_possible_score: z.ZodOptional<z.ZodNumber>;
    apostolic_score: z.ZodOptional<z.ZodNumber>;
    prophetic_score: z.ZodOptional<z.ZodNumber>;
    evangelistic_score: z.ZodOptional<z.ZodNumber>;
    shepherding_score: z.ZodOptional<z.ZodNumber>;
    teaching_score: z.ZodOptional<z.ZodNumber>;
    normalized_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
    primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
    completion_time: z.ZodOptional<z.ZodNumber>;
    confidence_level: z.ZodOptional<z.ZodNumber>;
    cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
    ai_insights: z.ZodOptional<z.ZodString>;
    personalized_recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    complementary_gifts: z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
} & {
    assessment: z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
        questions_count: z.ZodNumber;
        estimated_duration: z.ZodOptional<z.ZodNumber>;
        passing_score: z.ZodOptional<z.ZodNumber>;
        version: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
        research_backed: z.ZodDefault<z.ZodBoolean>;
        validity_score: z.ZodOptional<z.ZodNumber>;
        reliability_score: z.ZodOptional<z.ZodNumber>;
        instructions: z.ZodOptional<z.ZodString>;
        scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        published_at: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        version: string;
        language: string;
        cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        research_backed: boolean;
        scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        published_at?: string | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        version?: string | undefined;
        language?: string | undefined;
        cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        research_backed?: boolean | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        published_at?: string | undefined;
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
    created_at: string;
    updated_at: string;
    assessment_id: string;
    user_id: string;
    started_at: string;
    completion_percentage: number;
    cultural_adjustment_applied: boolean;
    personalized_recommendations: string[];
    complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
    user: {
        id: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    assessment: {
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        version: string;
        language: string;
        cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        research_backed: boolean;
        scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        published_at?: string | undefined;
    };
    completed_at?: string | undefined;
    total_score?: number | undefined;
    max_possible_score?: number | undefined;
    apostolic_score?: number | undefined;
    prophetic_score?: number | undefined;
    evangelistic_score?: number | undefined;
    shepherding_score?: number | undefined;
    teaching_score?: number | undefined;
    normalized_scores?: Record<string, number> | undefined;
    primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    ai_insights?: string | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    assessment_id: string;
    user_id: string;
    started_at: string;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        display_name?: string | undefined;
        avatar_url?: string | undefined;
    };
    assessment: {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        version?: string | undefined;
        language?: string | undefined;
        cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        research_backed?: boolean | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        published_at?: string | undefined;
    };
    completed_at?: string | undefined;
    completion_percentage?: number | undefined;
    total_score?: number | undefined;
    max_possible_score?: number | undefined;
    apostolic_score?: number | undefined;
    prophetic_score?: number | undefined;
    evangelistic_score?: number | undefined;
    shepherding_score?: number | undefined;
    teaching_score?: number | undefined;
    normalized_scores?: Record<string, number> | undefined;
    primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    cultural_adjustment_applied?: boolean | undefined;
    ai_insights?: string | undefined;
    personalized_recommendations?: string[] | undefined;
    complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
}>;
/**
 * Assessment Response API Response Contract
 * Derived from AssessmentResponseEntitySchema
 */
export declare const AssessmentResponseApiResponseSchema: z.ZodObject<{
    id: z.ZodString;
    user_assessment_id: z.ZodString;
    question_id: z.ZodString;
    response_value: z.ZodOptional<z.ZodNumber>;
    response_text: z.ZodOptional<z.ZodString>;
    response_time: z.ZodOptional<z.ZodNumber>;
    confidence: z.ZodOptional<z.ZodNumber>;
    skipped: z.ZodDefault<z.ZodBoolean>;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    created_at: string;
    updated_at: string;
    user_assessment_id: string;
    question_id: string;
    skipped: boolean;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
}, {
    id: string;
    created_at: string;
    updated_at: string;
    user_assessment_id: string;
    question_id: string;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
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
        assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
        questions_count: z.ZodNumber;
        estimated_duration: z.ZodOptional<z.ZodNumber>;
        passing_score: z.ZodOptional<z.ZodNumber>;
        version: z.ZodDefault<z.ZodString>;
        language: z.ZodDefault<z.ZodString>;
        cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
        research_backed: z.ZodDefault<z.ZodBoolean>;
        validity_score: z.ZodOptional<z.ZodNumber>;
        reliability_score: z.ZodOptional<z.ZodNumber>;
        instructions: z.ZodOptional<z.ZodString>;
        scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
        published_at: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        version: string;
        language: string;
        cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        research_backed: boolean;
        scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        published_at?: string | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        version?: string | undefined;
        language?: string | undefined;
        cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        research_backed?: boolean | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        published_at?: string | undefined;
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
        status: "active" | "draft" | "archived" | "under_review";
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        version: string;
        language: string;
        cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
        research_backed: boolean;
        scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        published_at?: string | undefined;
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
        created_at: string;
        updated_at: string;
        name: string;
        slug: string;
        assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
        questions_count: number;
        status?: "active" | "draft" | "archived" | "under_review" | undefined;
        description?: string | undefined;
        estimated_duration?: number | undefined;
        passing_score?: number | undefined;
        version?: string | undefined;
        language?: string | undefined;
        cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
        research_backed?: boolean | undefined;
        validity_score?: number | undefined;
        reliability_score?: number | undefined;
        instructions?: string | undefined;
        scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
        published_at?: string | undefined;
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
            assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
            questions_count: z.ZodNumber;
            estimated_duration: z.ZodOptional<z.ZodNumber>;
            passing_score: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodString>;
            language: z.ZodDefault<z.ZodString>;
            cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            research_backed: z.ZodDefault<z.ZodBoolean>;
            validity_score: z.ZodOptional<z.ZodNumber>;
            reliability_score: z.ZodOptional<z.ZodNumber>;
            instructions: z.ZodOptional<z.ZodString>;
            scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
            status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            published_at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
        }>, "many">;
        total: z.ZodNumber;
        query: z.ZodString;
        took: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        query: string;
        total: number;
        assessments: {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        }[];
        took: number;
    }, {
        query: string;
        total: number;
        assessments: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
        }[];
        took: number;
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
        assessments: {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        }[];
        took: number;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        query: string;
        total: number;
        assessments: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
        }[];
        took: number;
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
        user_id: z.ZodString;
        assessment_id: z.ZodString;
        started_at: z.ZodString;
        completed_at: z.ZodOptional<z.ZodString>;
        completion_percentage: z.ZodDefault<z.ZodNumber>;
        total_score: z.ZodOptional<z.ZodNumber>;
        max_possible_score: z.ZodOptional<z.ZodNumber>;
        apostolic_score: z.ZodOptional<z.ZodNumber>;
        prophetic_score: z.ZodOptional<z.ZodNumber>;
        evangelistic_score: z.ZodOptional<z.ZodNumber>;
        shepherding_score: z.ZodOptional<z.ZodNumber>;
        teaching_score: z.ZodOptional<z.ZodNumber>;
        normalized_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
        primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
        secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
        completion_time: z.ZodOptional<z.ZodNumber>;
        confidence_level: z.ZodOptional<z.ZodNumber>;
        cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
        ai_insights: z.ZodOptional<z.ZodString>;
        personalized_recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        complementary_gifts: z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
        created_at: z.ZodString;
        updated_at: z.ZodString;
    } & {
        assessment: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
            questions_count: z.ZodNumber;
            estimated_duration: z.ZodOptional<z.ZodNumber>;
            passing_score: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodString>;
            language: z.ZodDefault<z.ZodString>;
            cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            research_backed: z.ZodDefault<z.ZodBoolean>;
            validity_score: z.ZodOptional<z.ZodNumber>;
            reliability_score: z.ZodOptional<z.ZodNumber>;
            instructions: z.ZodOptional<z.ZodString>;
            scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
            status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            published_at: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
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
        created_at: string;
        updated_at: string;
        assessment_id: string;
        user_id: string;
        started_at: string;
        completion_percentage: number;
        cultural_adjustment_applied: boolean;
        personalized_recommendations: string[];
        complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        };
        completed_at?: string | undefined;
        total_score?: number | undefined;
        max_possible_score?: number | undefined;
        apostolic_score?: number | undefined;
        prophetic_score?: number | undefined;
        evangelistic_score?: number | undefined;
        shepherding_score?: number | undefined;
        teaching_score?: number | undefined;
        normalized_scores?: Record<string, number> | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        completion_time?: number | undefined;
        confidence_level?: number | undefined;
        ai_insights?: string | undefined;
    }, {
        id: string;
        created_at: string;
        updated_at: string;
        assessment_id: string;
        user_id: string;
        started_at: string;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
        };
        completed_at?: string | undefined;
        completion_percentage?: number | undefined;
        total_score?: number | undefined;
        max_possible_score?: number | undefined;
        apostolic_score?: number | undefined;
        prophetic_score?: number | undefined;
        evangelistic_score?: number | undefined;
        shepherding_score?: number | undefined;
        teaching_score?: number | undefined;
        normalized_scores?: Record<string, number> | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        completion_time?: number | undefined;
        confidence_level?: number | undefined;
        cultural_adjustment_applied?: boolean | undefined;
        ai_insights?: string | undefined;
        personalized_recommendations?: string[] | undefined;
        complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
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
        created_at: string;
        updated_at: string;
        assessment_id: string;
        user_id: string;
        started_at: string;
        completion_percentage: number;
        cultural_adjustment_applied: boolean;
        personalized_recommendations: string[];
        complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        };
        completed_at?: string | undefined;
        total_score?: number | undefined;
        max_possible_score?: number | undefined;
        apostolic_score?: number | undefined;
        prophetic_score?: number | undefined;
        evangelistic_score?: number | undefined;
        shepherding_score?: number | undefined;
        teaching_score?: number | undefined;
        normalized_scores?: Record<string, number> | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        completion_time?: number | undefined;
        confidence_level?: number | undefined;
        ai_insights?: string | undefined;
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
        created_at: string;
        updated_at: string;
        assessment_id: string;
        user_id: string;
        started_at: string;
        user: {
            id: string;
            first_name: string;
            last_name: string;
            display_name?: string | undefined;
            avatar_url?: string | undefined;
        };
        assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
        };
        completed_at?: string | undefined;
        completion_percentage?: number | undefined;
        total_score?: number | undefined;
        max_possible_score?: number | undefined;
        apostolic_score?: number | undefined;
        prophetic_score?: number | undefined;
        evangelistic_score?: number | undefined;
        shepherding_score?: number | undefined;
        teaching_score?: number | undefined;
        normalized_scores?: Record<string, number> | undefined;
        primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        completion_time?: number | undefined;
        confidence_level?: number | undefined;
        cultural_adjustment_applied?: boolean | undefined;
        ai_insights?: string | undefined;
        personalized_recommendations?: string[] | undefined;
        complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
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
        completion_rate: number;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
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
        completion_rate: number;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
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
        completion_rate: number;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
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
        completion_rate: number;
        total_completions: number;
        average_completion_time: number;
        average_score: number;
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
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            strengths: string[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        }, {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            strengths: string[];
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
            type: "community" | "content" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }, {
            type: "community" | "content" | "assessment" | "development";
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
        user_assessment_id: string;
        insights: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            strengths: string[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "community" | "content" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
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
        user_assessment_id: string;
        insights: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            strengths: string[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "community" | "content" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
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
        user_assessment_id: string;
        insights: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            strengths: string[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "community" | "content" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
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
        user_assessment_id: string;
        insights: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift_analysis: string;
            secondary_gift_analysis: string;
            strengths: string[];
            growth_areas: string[];
            ministry_recommendations: string[];
            leadership_style?: string | undefined;
            cultural_considerations?: string | undefined;
        };
        recommendations: {
            type: "community" | "content" | "assessment" | "development";
            description: string;
            title: string;
            priority: "medium" | "low" | "high";
            action_url?: string | undefined;
        }[];
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
            user_id: z.ZodString;
            assessment_id: z.ZodString;
            started_at: z.ZodString;
            completed_at: z.ZodOptional<z.ZodString>;
            completion_percentage: z.ZodDefault<z.ZodNumber>;
            total_score: z.ZodOptional<z.ZodNumber>;
            max_possible_score: z.ZodOptional<z.ZodNumber>;
            apostolic_score: z.ZodOptional<z.ZodNumber>;
            prophetic_score: z.ZodOptional<z.ZodNumber>;
            evangelistic_score: z.ZodOptional<z.ZodNumber>;
            shepherding_score: z.ZodOptional<z.ZodNumber>;
            teaching_score: z.ZodOptional<z.ZodNumber>;
            normalized_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            completion_time: z.ZodOptional<z.ZodNumber>;
            confidence_level: z.ZodOptional<z.ZodNumber>;
            cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
            ai_insights: z.ZodOptional<z.ZodString>;
            personalized_recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            complementary_gifts: z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        }>;
        assessment: z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
            questions_count: z.ZodNumber;
            estimated_duration: z.ZodOptional<z.ZodNumber>;
            passing_score: z.ZodOptional<z.ZodNumber>;
            version: z.ZodDefault<z.ZodString>;
            language: z.ZodDefault<z.ZodString>;
            cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
            research_backed: z.ZodDefault<z.ZodBoolean>;
            validity_score: z.ZodOptional<z.ZodNumber>;
            reliability_score: z.ZodOptional<z.ZodNumber>;
            instructions: z.ZodOptional<z.ZodString>;
            scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
            status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
            published_at: z.ZodOptional<z.ZodString>;
        } & {
            questions: z.ZodDefault<z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                assessment_id: z.ZodString;
                question_text: z.ZodString;
                question_type: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
                order_index: z.ZodNumber;
                category: z.ZodOptional<z.ZodString>;
                apest_dimension: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
                answer_options: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
                is_required: z.ZodDefault<z.ZodBoolean>;
                weight: z.ZodDefault<z.ZodNumber>;
                reverse_scored: z.ZodDefault<z.ZodBoolean>;
                created_at: z.ZodString;
                updated_at: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                is_required: boolean;
                weight: number;
                reverse_scored: boolean;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
            }, {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
                is_required?: boolean | undefined;
                weight?: number | undefined;
                reverse_scored?: boolean | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            questions: {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                is_required: boolean;
                weight: number;
                reverse_scored: boolean;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
            }[];
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
            questions?: {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
                is_required?: boolean | undefined;
                weight?: number | undefined;
                reverse_scored?: boolean | undefined;
            }[] | undefined;
        }>;
        estimated_duration: z.ZodNumber;
        instructions: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        estimated_duration: number;
        assessment: {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            questions: {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                is_required: boolean;
                weight: number;
                reverse_scored: boolean;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
            }[];
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        };
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        };
        instructions?: string | undefined;
    }, {
        estimated_duration: number;
        assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
            questions?: {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
                is_required?: boolean | undefined;
                weight?: number | undefined;
                reverse_scored?: boolean | undefined;
            }[] | undefined;
        };
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        };
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
        estimated_duration: number;
        assessment: {
            status: "active" | "draft" | "archived" | "under_review";
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            version: string;
            language: string;
            cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
            research_backed: boolean;
            scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
            questions: {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                is_required: boolean;
                weight: number;
                reverse_scored: boolean;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
            }[];
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            published_at?: string | undefined;
        };
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        };
        instructions?: string | undefined;
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        estimated_duration: number;
        assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            name: string;
            slug: string;
            assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
            questions_count: number;
            status?: "active" | "draft" | "archived" | "under_review" | undefined;
            description?: string | undefined;
            estimated_duration?: number | undefined;
            passing_score?: number | undefined;
            version?: string | undefined;
            language?: string | undefined;
            cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
            research_backed?: boolean | undefined;
            validity_score?: number | undefined;
            reliability_score?: number | undefined;
            instructions?: string | undefined;
            scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
            published_at?: string | undefined;
            questions?: {
                id: string;
                created_at: string;
                updated_at: string;
                assessment_id: string;
                question_text: string;
                question_type: "binary" | "ranking" | "likert" | "multiple_choice" | "text";
                order_index: number;
                category?: string | undefined;
                apest_dimension?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
                answer_options?: Record<string, unknown> | undefined;
                is_required?: boolean | undefined;
                weight?: number | undefined;
                reverse_scored?: boolean | undefined;
            }[] | undefined;
        };
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        };
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
            user_id: z.ZodString;
            assessment_id: z.ZodString;
            started_at: z.ZodString;
            completed_at: z.ZodOptional<z.ZodString>;
            completion_percentage: z.ZodDefault<z.ZodNumber>;
            total_score: z.ZodOptional<z.ZodNumber>;
            max_possible_score: z.ZodOptional<z.ZodNumber>;
            apostolic_score: z.ZodOptional<z.ZodNumber>;
            prophetic_score: z.ZodOptional<z.ZodNumber>;
            evangelistic_score: z.ZodOptional<z.ZodNumber>;
            shepherding_score: z.ZodOptional<z.ZodNumber>;
            teaching_score: z.ZodOptional<z.ZodNumber>;
            normalized_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            completion_time: z.ZodOptional<z.ZodNumber>;
            confidence_level: z.ZodOptional<z.ZodNumber>;
            cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
            ai_insights: z.ZodOptional<z.ZodString>;
            personalized_recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            complementary_gifts: z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        }>;
        saved_responses: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            user_assessment_id: z.ZodString;
            question_id: z.ZodString;
            response_value: z.ZodOptional<z.ZodNumber>;
            response_text: z.ZodOptional<z.ZodString>;
            response_time: z.ZodOptional<z.ZodNumber>;
            confidence: z.ZodOptional<z.ZodNumber>;
            skipped: z.ZodDefault<z.ZodBoolean>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            id: string;
            created_at: string;
            updated_at: string;
            user_assessment_id: string;
            question_id: string;
            skipped: boolean;
            response_value?: number | undefined;
            response_text?: string | undefined;
            response_time?: number | undefined;
            confidence?: number | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            user_assessment_id: string;
            question_id: string;
            response_value?: number | undefined;
            response_text?: string | undefined;
            response_time?: number | undefined;
            confidence?: number | undefined;
            skipped?: boolean | undefined;
        }>, "many">;
        completion_percentage: z.ZodNumber;
        is_complete: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        completion_percentage: number;
        is_complete: boolean;
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        };
        saved_responses: {
            id: string;
            created_at: string;
            updated_at: string;
            user_assessment_id: string;
            question_id: string;
            skipped: boolean;
            response_value?: number | undefined;
            response_text?: string | undefined;
            response_time?: number | undefined;
            confidence?: number | undefined;
        }[];
    }, {
        completion_percentage: number;
        is_complete: boolean;
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        };
        saved_responses: {
            id: string;
            created_at: string;
            updated_at: string;
            user_assessment_id: string;
            question_id: string;
            response_value?: number | undefined;
            response_text?: string | undefined;
            response_time?: number | undefined;
            confidence?: number | undefined;
            skipped?: boolean | undefined;
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
        completion_percentage: number;
        is_complete: boolean;
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        };
        saved_responses: {
            id: string;
            created_at: string;
            updated_at: string;
            user_assessment_id: string;
            question_id: string;
            skipped: boolean;
            response_value?: number | undefined;
            response_text?: string | undefined;
            response_time?: number | undefined;
            confidence?: number | undefined;
        }[];
    };
    meta: {
        timestamp: string;
    };
}, {
    success: boolean;
    data: {
        completion_percentage: number;
        is_complete: boolean;
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        };
        saved_responses: {
            id: string;
            created_at: string;
            updated_at: string;
            user_assessment_id: string;
            question_id: string;
            response_value?: number | undefined;
            response_text?: string | undefined;
            response_time?: number | undefined;
            confidence?: number | undefined;
            skipped?: boolean | undefined;
        }[];
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
            user_id: z.ZodString;
            assessment_id: z.ZodString;
            started_at: z.ZodString;
            completed_at: z.ZodOptional<z.ZodString>;
            completion_percentage: z.ZodDefault<z.ZodNumber>;
            total_score: z.ZodOptional<z.ZodNumber>;
            max_possible_score: z.ZodOptional<z.ZodNumber>;
            apostolic_score: z.ZodOptional<z.ZodNumber>;
            prophetic_score: z.ZodOptional<z.ZodNumber>;
            evangelistic_score: z.ZodOptional<z.ZodNumber>;
            shepherding_score: z.ZodOptional<z.ZodNumber>;
            teaching_score: z.ZodOptional<z.ZodNumber>;
            normalized_scores: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>;
            primary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            secondary_gift: z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>;
            completion_time: z.ZodOptional<z.ZodNumber>;
            confidence_level: z.ZodOptional<z.ZodNumber>;
            cultural_adjustment_applied: z.ZodDefault<z.ZodBoolean>;
            ai_insights: z.ZodOptional<z.ZodString>;
            personalized_recommendations: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
            complementary_gifts: z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
            created_at: z.ZodString;
            updated_at: z.ZodString;
        } & {
            assessment: z.ZodObject<{
                id: z.ZodString;
                name: z.ZodString;
                slug: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                assessment_type: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
                questions_count: z.ZodNumber;
                estimated_duration: z.ZodOptional<z.ZodNumber>;
                passing_score: z.ZodOptional<z.ZodNumber>;
                version: z.ZodDefault<z.ZodString>;
                language: z.ZodDefault<z.ZodString>;
                cultural_adaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>>;
                research_backed: z.ZodDefault<z.ZodBoolean>;
                validity_score: z.ZodOptional<z.ZodNumber>;
                reliability_score: z.ZodOptional<z.ZodNumber>;
                instructions: z.ZodOptional<z.ZodString>;
                scoring_method: z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>;
                status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
                created_at: z.ZodString;
                updated_at: z.ZodString;
                published_at: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                version: string;
                language: string;
                cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
                research_backed: boolean;
                scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                published_at?: string | undefined;
            }, {
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                version?: string | undefined;
                language?: string | undefined;
                cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
                research_backed?: boolean | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
                published_at?: string | undefined;
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
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                version: string;
                language: string;
                cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
                research_backed: boolean;
                scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                published_at?: string | undefined;
            };
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        }, {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                version?: string | undefined;
                language?: string | undefined;
                cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
                research_backed?: boolean | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
                published_at?: string | undefined;
            };
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
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
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                version: string;
                language: string;
                cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
                research_backed: boolean;
                scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                published_at?: string | undefined;
            };
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        };
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
        };
        results: {
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
        };
        insights?: string | undefined;
    }, {
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                version?: string | undefined;
                language?: string | undefined;
                cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
                research_backed?: boolean | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
                published_at?: string | undefined;
            };
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        };
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
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
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            completion_percentage: number;
            cultural_adjustment_applied: boolean;
            personalized_recommendations: string[];
            complementary_gifts: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[];
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                status: "active" | "draft" | "archived" | "under_review";
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                version: string;
                language: string;
                cultural_adaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global";
                research_backed: boolean;
                scoring_method: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted";
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                published_at?: string | undefined;
            };
            completed_at?: string | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            ai_insights?: string | undefined;
        };
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
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
        user_assessment: {
            id: string;
            created_at: string;
            updated_at: string;
            assessment_id: string;
            user_id: string;
            started_at: string;
            user: {
                id: string;
                first_name: string;
                last_name: string;
                display_name?: string | undefined;
                avatar_url?: string | undefined;
            };
            assessment: {
                id: string;
                created_at: string;
                updated_at: string;
                name: string;
                slug: string;
                assessment_type: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
                questions_count: number;
                status?: "active" | "draft" | "archived" | "under_review" | undefined;
                description?: string | undefined;
                estimated_duration?: number | undefined;
                passing_score?: number | undefined;
                version?: string | undefined;
                language?: string | undefined;
                cultural_adaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global" | undefined;
                research_backed?: boolean | undefined;
                validity_score?: number | undefined;
                reliability_score?: number | undefined;
                instructions?: string | undefined;
                scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
                published_at?: string | undefined;
            };
            completed_at?: string | undefined;
            completion_percentage?: number | undefined;
            total_score?: number | undefined;
            max_possible_score?: number | undefined;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
            normalized_scores?: Record<string, number> | undefined;
            primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
            completion_time?: number | undefined;
            confidence_level?: number | undefined;
            cultural_adjustment_applied?: boolean | undefined;
            ai_insights?: string | undefined;
            personalized_recommendations?: string[] | undefined;
            complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
        };
        scores: {
            total_score: number;
            max_possible_score: number;
            apostolic_score?: number | undefined;
            prophetic_score?: number | undefined;
            evangelistic_score?: number | undefined;
            shepherding_score?: number | undefined;
            teaching_score?: number | undefined;
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
    id: z.ZodOptional<z.ZodString>;
    name: z.ZodOptional<z.ZodString>;
    slug: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    questions_count: z.ZodOptional<z.ZodNumber>;
    estimated_duration: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    passing_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    version: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    validity_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    reliability_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    instructions: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    scoring_method: z.ZodOptional<z.ZodDefault<z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
    published_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
} & {
    search: z.ZodOptional<z.ZodString>;
    assessment_type: z.ZodOptional<z.ZodArray<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>, "many">>;
    status: z.ZodOptional<z.ZodArray<z.ZodEnum<["draft", "active", "archived", "under_review"]>, "many">>;
    language: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    cultural_adaptation: z.ZodOptional<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>, "many">>;
    research_backed: z.ZodOptional<z.ZodBoolean>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
    published_after: z.ZodOptional<z.ZodString>;
    published_before: z.ZodOptional<z.ZodString>;
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
    offset: number;
    sort_by: "created_at" | "updated_at" | "name" | "questions_count" | "published_at";
    sort_order: "asc" | "desc";
    include_questions: boolean;
    include_statistics: boolean;
    status?: ("active" | "draft" | "archived" | "under_review")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    assessment_type?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    questions_count?: number | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string[] | undefined;
    cultural_adaptation?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global")[] | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
    published_after?: string | undefined;
    published_before?: string | undefined;
}, {
    status?: ("active" | "draft" | "archived" | "under_review")[] | undefined;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    name?: string | undefined;
    slug?: string | undefined;
    description?: string | undefined;
    assessment_type?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    questions_count?: number | undefined;
    estimated_duration?: number | undefined;
    passing_score?: number | undefined;
    version?: string | undefined;
    language?: string[] | undefined;
    cultural_adaptation?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | "global")[] | undefined;
    research_backed?: boolean | undefined;
    validity_score?: number | undefined;
    reliability_score?: number | undefined;
    instructions?: string | undefined;
    scoring_method?: "likert_5" | "likert_7" | "binary" | "ranking" | "weighted" | undefined;
    published_at?: string | undefined;
    published_after?: string | undefined;
    published_before?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "updated_at" | "name" | "questions_count" | "published_at" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_questions?: boolean | undefined;
    include_statistics?: boolean | undefined;
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
    user_assessment_id: string;
    include_responses: boolean;
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
    id: z.ZodOptional<z.ZodString>;
    started_at: z.ZodOptional<z.ZodString>;
    completed_at: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    completion_percentage: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    total_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    max_possible_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    apostolic_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    prophetic_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    evangelistic_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    shepherding_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    teaching_score: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    normalized_scores: z.ZodOptional<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodNumber>>>;
    completion_time: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    confidence_level: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    cultural_adjustment_applied: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    ai_insights: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    personalized_recommendations: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    complementary_gifts: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    search: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    assessment_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    primary_gift: z.ZodOptional<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
    secondary_gift: z.ZodOptional<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>;
    is_completed: z.ZodOptional<z.ZodBoolean>;
    completion_percentage_min: z.ZodOptional<z.ZodNumber>;
    completion_percentage_max: z.ZodOptional<z.ZodNumber>;
    started_after: z.ZodOptional<z.ZodString>;
    started_before: z.ZodOptional<z.ZodString>;
    completed_after: z.ZodOptional<z.ZodString>;
    completed_before: z.ZodOptional<z.ZodString>;
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
    offset: number;
    sort_by: "created_at" | "started_at" | "completed_at" | "total_score";
    sort_order: "asc" | "desc";
    include_assessment: boolean;
    include_user: boolean;
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    assessment_id?: string[] | undefined;
    user_id?: string[] | undefined;
    started_at?: string | undefined;
    completed_at?: string | undefined;
    completion_percentage?: number | undefined;
    total_score?: number | undefined;
    max_possible_score?: number | undefined;
    apostolic_score?: number | undefined;
    prophetic_score?: number | undefined;
    evangelistic_score?: number | undefined;
    shepherding_score?: number | undefined;
    teaching_score?: number | undefined;
    normalized_scores?: Record<string, number> | undefined;
    primary_gift?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
    secondary_gift?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    cultural_adjustment_applied?: boolean | undefined;
    ai_insights?: string | undefined;
    personalized_recommendations?: string[] | undefined;
    complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
    is_completed?: boolean | undefined;
    completion_percentage_min?: number | undefined;
    completion_percentage_max?: number | undefined;
    started_after?: string | undefined;
    started_before?: string | undefined;
    completed_after?: string | undefined;
    completed_before?: string | undefined;
}, {
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    search?: string | undefined;
    assessment_id?: string[] | undefined;
    user_id?: string[] | undefined;
    started_at?: string | undefined;
    completed_at?: string | undefined;
    completion_percentage?: number | undefined;
    total_score?: number | undefined;
    max_possible_score?: number | undefined;
    apostolic_score?: number | undefined;
    prophetic_score?: number | undefined;
    evangelistic_score?: number | undefined;
    shepherding_score?: number | undefined;
    teaching_score?: number | undefined;
    normalized_scores?: Record<string, number> | undefined;
    primary_gift?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
    secondary_gift?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    cultural_adjustment_applied?: boolean | undefined;
    ai_insights?: string | undefined;
    personalized_recommendations?: string[] | undefined;
    complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
    is_completed?: boolean | undefined;
    completion_percentage_min?: number | undefined;
    completion_percentage_max?: number | undefined;
    started_after?: string | undefined;
    started_before?: string | undefined;
    completed_after?: string | undefined;
    completed_before?: string | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    offset?: number | undefined;
    sort_by?: "created_at" | "started_at" | "completed_at" | "total_score" | undefined;
    sort_order?: "asc" | "desc" | undefined;
    include_assessment?: boolean | undefined;
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
    user_assessment_id: string;
    include_recommendations: boolean;
    include_comparisons: boolean;
    include_trends: boolean;
}, {
    user_assessment_id: string;
    include_recommendations?: boolean | undefined;
    include_comparisons?: boolean | undefined;
    include_trends?: boolean | undefined;
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