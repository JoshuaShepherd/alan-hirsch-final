import { z } from 'zod';
export declare const assessmentTypeSchema: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
export declare const culturalAdaptationSchema: z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal", "global"]>;
export declare const scoringMethodSchema: z.ZodEnum<["likert_5", "likert_7", "binary", "ranking", "weighted"]>;
export declare const assessmentStatusSchema: z.ZodEnum<["draft", "active", "archived", "under_review"]>;
export declare const questionTypeSchema: z.ZodEnum<["likert", "multiple_choice", "binary", "ranking", "text"]>;
export declare const apestDimensionSchema: z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>;
/**
 * Complete Assessment Entity Schema
 * This is the single source of truth for all assessment data structures
 */
export declare const AssessmentEntitySchema: z.ZodObject<{
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
 * Complete Assessment Question Entity Schema
 * This is the single source of truth for all assessment question data structures
 */
export declare const AssessmentQuestionEntitySchema: z.ZodObject<{
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
 * Complete User Assessment Entity Schema
 * This is the single source of truth for all user assessment data structures
 */
export declare const UserAssessmentEntitySchema: z.ZodObject<{
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
 * Complete Assessment Response Entity Schema
 * This is the single source of truth for all assessment response data structures
 */
export declare const AssessmentResponseEntitySchema: z.ZodObject<{
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
 * Create Assessment Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateAssessmentSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Assessment Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateAssessmentSchema: z.ZodObject<{
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
}>;
/**
 * Assessment Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const AssessmentQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Create Assessment Question Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateAssessmentQuestionSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Assessment Question Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateAssessmentQuestionSchema: z.ZodObject<{
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
}>;
/**
 * Create User Assessment Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateUserAssessmentSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update User Assessment Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateUserAssessmentSchema: z.ZodObject<{
    assessment_id: z.ZodOptional<z.ZodString>;
    user_id: z.ZodOptional<z.ZodString>;
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
    primary_gift: z.ZodOptional<z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>>;
    secondary_gift: z.ZodOptional<z.ZodOptional<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>>>;
    completion_time: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    confidence_level: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    cultural_adjustment_applied: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    ai_insights: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    personalized_recommendations: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    complementary_gifts: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodEnum<["apostolic", "prophetic", "evangelistic", "shepherding", "teaching"]>, "many">>>;
}, "strip", z.ZodTypeAny, {
    assessment_id?: string | undefined;
    user_id?: string | undefined;
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
    primary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    secondary_gift?: "apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching" | undefined;
    completion_time?: number | undefined;
    confidence_level?: number | undefined;
    cultural_adjustment_applied?: boolean | undefined;
    ai_insights?: string | undefined;
    personalized_recommendations?: string[] | undefined;
    complementary_gifts?: ("apostolic" | "prophetic" | "evangelistic" | "shepherding" | "teaching")[] | undefined;
}, {
    assessment_id?: string | undefined;
    user_id?: string | undefined;
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
 * User Assessment Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const UserAssessmentQuerySchema: z.ZodObject<{
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
}, "strip", z.ZodTypeAny, {
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
}>;
/**
 * Create Assessment Response Schema - Derived from Entity
 * Omits auto-generated fields
 */
export declare const CreateAssessmentResponseSchema: z.ZodObject<Omit<{
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
}, "id" | "created_at" | "updated_at">, "strip", z.ZodTypeAny, {
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
 * Update Assessment Response Schema - Derived from Create Schema
 * Makes all fields optional for partial updates
 */
export declare const UpdateAssessmentResponseSchema: z.ZodObject<{
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
}>;
/**
 * Assessment Response Query Schema - For filtering and searching
 * Extends entity with optional filters
 */
export declare const AssessmentResponseQuerySchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    response_value: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    response_text: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    response_time: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    confidence: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    created_at: z.ZodOptional<z.ZodString>;
    updated_at: z.ZodOptional<z.ZodString>;
} & {
    user_assessment_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    question_id: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    skipped: z.ZodOptional<z.ZodBoolean>;
    created_after: z.ZodOptional<z.ZodString>;
    created_before: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    user_assessment_id?: string[] | undefined;
    question_id?: string[] | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}, {
    id?: string | undefined;
    created_at?: string | undefined;
    updated_at?: string | undefined;
    created_after?: string | undefined;
    created_before?: string | undefined;
    user_assessment_id?: string[] | undefined;
    question_id?: string[] | undefined;
    response_value?: number | undefined;
    response_text?: string | undefined;
    response_time?: number | undefined;
    confidence?: number | undefined;
    skipped?: boolean | undefined;
}>;
export type AssessmentEntity = z.infer<typeof AssessmentEntitySchema>;
export type CreateAssessment = z.infer<typeof CreateAssessmentSchema>;
export type UpdateAssessment = z.infer<typeof UpdateAssessmentSchema>;
export type AssessmentQuery = z.infer<typeof AssessmentQuerySchema>;
export type AssessmentQuestionEntity = z.infer<typeof AssessmentQuestionEntitySchema>;
export type CreateAssessmentQuestion = z.infer<typeof CreateAssessmentQuestionSchema>;
export type UpdateAssessmentQuestion = z.infer<typeof UpdateAssessmentQuestionSchema>;
export type UserAssessmentEntity = z.infer<typeof UserAssessmentEntitySchema>;
export type CreateUserAssessment = z.infer<typeof CreateUserAssessmentSchema>;
export type UpdateUserAssessment = z.infer<typeof UpdateUserAssessmentSchema>;
export type UserAssessmentQuery = z.infer<typeof UserAssessmentQuerySchema>;
export type AssessmentResponseEntity = z.infer<typeof AssessmentResponseEntitySchema>;
export type CreateAssessmentResponse = z.infer<typeof CreateAssessmentResponseSchema>;
export type UpdateAssessmentResponse = z.infer<typeof UpdateAssessmentResponseSchema>;
export type AssessmentResponseQuery = z.infer<typeof AssessmentResponseQuerySchema>;
export type AssessmentType = z.infer<typeof assessmentTypeSchema>;
export type CulturalAdaptation = z.infer<typeof culturalAdaptationSchema>;
export type ScoringMethod = z.infer<typeof scoringMethodSchema>;
export type AssessmentStatus = z.infer<typeof assessmentStatusSchema>;
export type QuestionType = z.infer<typeof questionTypeSchema>;
export type ApestDimension = z.infer<typeof apestDimensionSchema>;
//# sourceMappingURL=assessment.schema.d.ts.map