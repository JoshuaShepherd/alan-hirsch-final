import { z } from 'zod';
/**
 * Create Assessment Operation Schema
 * Derived from CreateAssessmentSchema with operation-specific validation
 */
export declare const CreateAssessmentOperationSchema: z.ZodObject<{
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
 * Update Assessment Operation Schema
 * Derived from UpdateAssessmentSchema with operation-specific validation
 */
export declare const UpdateAssessmentOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
 * Create Assessment Question Operation Schema
 * Derived from CreateAssessmentQuestionSchema with operation-specific validation
 */
export declare const CreateAssessmentQuestionOperationSchema: z.ZodObject<{
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
 * Update Assessment Question Operation Schema
 * Derived from UpdateAssessmentQuestionSchema with operation-specific validation
 */
export declare const UpdateAssessmentQuestionOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Get User Assessment Operation Schema
 * Retrieve user assessment with details
 */
export declare const GetUserAssessmentOperationSchema: z.ZodObject<{
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
 * List User Assessments Operation Schema
 * Paginated user assessment listing
 */
export declare const ListUserAssessmentsOperationSchema: z.ZodObject<{
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
 * Create Assessment Response Operation Schema
 * Derived from CreateAssessmentResponseSchema with operation-specific validation
 */
export declare const CreateAssessmentResponseOperationSchema: z.ZodEffects<z.ZodObject<{
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
 * Update Assessment Response Operation Schema
 * Derived from UpdateAssessmentResponseSchema with operation-specific validation
 */
export declare const UpdateAssessmentResponseOperationSchema: z.ZodEffects<z.ZodObject<Omit<{
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
export declare const createAssessmentResponseSchema: z.ZodEffects<z.ZodObject<{
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
export declare const createAssessmentSchema: z.ZodObject<{
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
export declare const createUserAssessmentSchema: z.ZodObject<{
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
export declare const assessmentQuestionQuerySchema: z.ZodObject<{
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
export declare const assessmentResponseQuerySchema: z.ZodObject<{
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
export declare const assessmentQuerySchema: z.ZodObject<{
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
//# sourceMappingURL=assessment.operations.d.ts.map