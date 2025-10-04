import { z } from 'zod';
/**
 * Create Assessment Operation Schema
 * Derived from CreateAssessmentSchema with operation-specific validation
 */
export declare const CreateAssessmentOperationSchema: z.ZodObject<{
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
 * Update Assessment Operation Schema
 * Derived from UpdateAssessmentSchema with operation-specific validation
 */
export declare const UpdateAssessmentOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Get Assessment by ID Operation Schema
 * Assessment retrieval with options
 */
export declare const GetAssessmentByIdOperationSchema: z.ZodObject<{
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
 * List Assessments Operation Schema
 * Paginated assessment listing with filters
 */
export declare const ListAssessmentsOperationSchema: z.ZodObject<{
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
 * Search Assessments Operation Schema
 * Full-text search for assessments
 */
export declare const SearchAssessmentsOperationSchema: z.ZodObject<{
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
 * Create Assessment Question Operation Schema
 * Derived from CreateAssessmentQuestionSchema with operation-specific validation
 */
export declare const CreateAssessmentQuestionOperationSchema: z.ZodObject<{
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
 * Update Assessment Question Operation Schema
 * Derived from UpdateAssessmentQuestionSchema with operation-specific validation
 */
export declare const UpdateAssessmentQuestionOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Reorder Assessment Questions Operation Schema
 * Bulk reordering of questions
 */
export declare const ReorderAssessmentQuestionsOperationSchema: z.ZodObject<{
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
 * Start User Assessment Operation Schema
 * Begin a new assessment for a user
 */
export declare const StartUserAssessmentOperationSchema: z.ZodObject<{
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
 * Save Assessment Responses Operation Schema
 * Save partial or complete assessment responses
 */
export declare const SaveAssessmentResponsesOperationSchema: z.ZodObject<{
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
 * Complete User Assessment Operation Schema
 * Mark assessment as complete and calculate scores
 */
export declare const CompleteUserAssessmentOperationSchema: z.ZodObject<{
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
 * Get User Assessment Operation Schema
 * Retrieve user assessment with details
 */
export declare const GetUserAssessmentOperationSchema: z.ZodObject<{
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
 * List User Assessments Operation Schema
 * Paginated user assessment listing
 */
export declare const ListUserAssessmentsOperationSchema: z.ZodObject<{
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
 * Create Assessment Response Operation Schema
 * Derived from CreateAssessmentResponseSchema with operation-specific validation
 */
export declare const CreateAssessmentResponseOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Update Assessment Response Operation Schema
 * Derived from UpdateAssessmentResponseSchema with operation-specific validation
 */
export declare const UpdateAssessmentResponseOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Bulk Update Assessment Responses Operation Schema
 * Update multiple responses at once
 */
export declare const BulkUpdateAssessmentResponsesOperationSchema: z.ZodObject<{
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
 * Get Assessment Statistics Operation Schema
 * Retrieve assessment completion and scoring statistics
 */
export declare const GetAssessmentStatisticsOperationSchema: z.ZodObject<{
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
 * Get User Assessment Insights Operation Schema
 * Retrieve AI-generated insights for user assessment
 */
export declare const GetUserAssessmentInsightsOperationSchema: z.ZodObject<{
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
export type CreateAssessmentOperation = z.infer<typeof CreateAssessmentOperationSchema>;
export type UpdateAssessmentOperation = z.infer<typeof UpdateAssessmentOperationSchema>;
export type GetAssessmentByIdOperation = z.infer<typeof GetAssessmentByIdOperationSchema>;
export type ListAssessmentsOperation = z.infer<typeof ListAssessmentsOperationSchema>;
export type SearchAssessmentsOperation = z.infer<typeof SearchAssessmentsOperationSchema>;
export type CreateAssessmentQuestionOperation = z.infer<typeof CreateAssessmentQuestionOperationSchema>;
export type UpdateAssessmentQuestionOperation = z.infer<typeof UpdateAssessmentQuestionOperationSchema>;
export type ReorderAssessmentQuestionsOperation = z.infer<typeof ReorderAssessmentQuestionsOperationSchema>;
export type StartUserAssessmentOperation = z.infer<typeof StartUserAssessmentOperationSchema>;
export type SaveAssessmentResponsesOperation = z.infer<typeof SaveAssessmentResponsesOperationSchema>;
export type CompleteUserAssessmentOperation = z.infer<typeof CompleteUserAssessmentOperationSchema>;
export type GetUserAssessmentOperation = z.infer<typeof GetUserAssessmentOperationSchema>;
export type ListUserAssessmentsOperation = z.infer<typeof ListUserAssessmentsOperationSchema>;
export type CreateAssessmentResponseOperation = z.infer<typeof CreateAssessmentResponseOperationSchema>;
export type UpdateAssessmentResponseOperation = z.infer<typeof UpdateAssessmentResponseOperationSchema>;
export type BulkUpdateAssessmentResponsesOperation = z.infer<typeof BulkUpdateAssessmentResponsesOperationSchema>;
export type GetAssessmentStatisticsOperation = z.infer<typeof GetAssessmentStatisticsOperationSchema>;
export type GetUserAssessmentInsightsOperation = z.infer<typeof GetUserAssessmentInsightsOperationSchema>;
//# sourceMappingURL=assessment.operations.d.ts.map