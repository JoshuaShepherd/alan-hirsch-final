import { z } from 'zod';
export declare const ministryPlatformSearchRequestSchema: z.ZodObject<{
    query: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
    ministryRoles: z.ZodOptional<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
    culturalContexts: z.ZodOptional<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>, "many">>;
    theologicalThemes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    organizationTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>, "many">>;
    contentTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study"]>, "many">>;
    difficultyLevels: z.ZodOptional<z.ZodArray<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>, "many">>;
    assessmentTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>, "many">>;
    communityTypes: z.ZodOptional<z.ZodArray<z.ZodEnum<["general_discussion", "church_planting_cohort", "leadership_development", "theological_study", "ministry_collaboration", "regional_network"]>, "many">>;
    dateFrom: z.ZodOptional<z.ZodString>;
    dateTo: z.ZodOptional<z.ZodString>;
    minEngagement: z.ZodOptional<z.ZodNumber>;
    hasComments: z.ZodOptional<z.ZodBoolean>;
    hasCollaborations: z.ZodOptional<z.ZodBoolean>;
    organizationContext: z.ZodOptional<z.ZodObject<{
        organizationId: z.ZodString;
        userRole: z.ZodEnum<["owner", "admin", "member", "viewer"]>;
        permissions: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        organizationId: string;
        permissions: string[];
        userRole: "owner" | "admin" | "member" | "viewer";
    }, {
        organizationId: string;
        permissions: string[];
        userRole: "owner" | "admin" | "member" | "viewer";
    }>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortOrder: "asc" | "desc";
    theologicalThemes?: string[] | undefined;
    query?: string | undefined;
    organizationContext?: {
        organizationId: string;
        permissions: string[];
        userRole: "owner" | "admin" | "member" | "viewer";
    } | undefined;
    sortBy?: string | undefined;
    ministryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
    culturalContexts?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
    organizationTypes?: ("church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other")[] | undefined;
    contentTypes?: ("video" | "article" | "podcast" | "framework" | "tool" | "case_study")[] | undefined;
    difficultyLevels?: ("beginner" | "intermediate" | "advanced" | "expert")[] | undefined;
    assessmentTypes?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    communityTypes?: ("general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_collaboration")[] | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    minEngagement?: number | undefined;
    hasComments?: boolean | undefined;
    hasCollaborations?: boolean | undefined;
}, {
    page?: number | undefined;
    limit?: number | undefined;
    theologicalThemes?: string[] | undefined;
    query?: string | undefined;
    sortOrder?: "asc" | "desc" | undefined;
    organizationContext?: {
        organizationId: string;
        permissions: string[];
        userRole: "owner" | "admin" | "member" | "viewer";
    } | undefined;
    sortBy?: string | undefined;
    ministryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
    culturalContexts?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
    organizationTypes?: ("church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other")[] | undefined;
    contentTypes?: ("video" | "article" | "podcast" | "framework" | "tool" | "case_study")[] | undefined;
    difficultyLevels?: ("beginner" | "intermediate" | "advanced" | "expert")[] | undefined;
    assessmentTypes?: ("other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts")[] | undefined;
    communityTypes?: ("general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_collaboration")[] | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    minEngagement?: number | undefined;
    hasComments?: boolean | undefined;
    hasCollaborations?: boolean | undefined;
}>;
export declare const createMinistryAssessmentRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    assessmentType: z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>;
    status: z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>;
    language: z.ZodDefault<z.ZodString>;
    culturalAdaptation: z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal"]>>;
    researchBacked: z.ZodDefault<z.ZodBoolean>;
    ministryContext: z.ZodObject<{
        targetMinistryRoles: z.ZodDefault<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
        culturalAdaptations: z.ZodDefault<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>, "many">>;
        theologicalAlignment: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        practicalApplication: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        culturalAdaptations: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
        theologicalAlignment: string[];
        practicalApplication: string[];
    }, {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        culturalAdaptations?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
        theologicalAlignment?: string[] | undefined;
        practicalApplication?: string[] | undefined;
    }>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "draft" | "archived" | "under_review";
    name: string;
    description: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    language: string;
    culturalAdaptation: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal";
    researchBacked: boolean;
    ministryContext: {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        culturalAdaptations: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
        theologicalAlignment: string[];
        practicalApplication: string[];
    };
    organizationId?: string | undefined;
}, {
    name: string;
    description: string;
    assessmentType: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts";
    ministryContext: {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        culturalAdaptations?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
        theologicalAlignment?: string[] | undefined;
        practicalApplication?: string[] | undefined;
    };
    organizationId?: string | undefined;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | undefined;
    researchBacked?: boolean | undefined;
}>;
export declare const updateMinistryAssessmentRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    assessmentType: z.ZodOptional<z.ZodEnum<["apest", "mdna", "cultural_intelligence", "leadership_style", "spiritual_gifts", "other"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "active", "archived", "under_review"]>>>;
    language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    culturalAdaptation: z.ZodOptional<z.ZodDefault<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "universal"]>>>;
    researchBacked: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        targetMinistryRoles: z.ZodDefault<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
        culturalAdaptations: z.ZodDefault<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>, "many">>;
        theologicalAlignment: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        practicalApplication: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        culturalAdaptations: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
        theologicalAlignment: string[];
        practicalApplication: string[];
    }, {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        culturalAdaptations?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
        theologicalAlignment?: string[] | undefined;
        practicalApplication?: string[] | undefined;
    }>>;
    organizationId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    organizationId?: string | undefined;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    ministryContext?: {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        culturalAdaptations: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
        theologicalAlignment: string[];
        practicalApplication: string[];
    } | undefined;
}, {
    organizationId?: string | undefined;
    status?: "active" | "draft" | "archived" | "under_review" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    assessmentType?: "other" | "apest" | "mdna" | "cultural_intelligence" | "leadership_style" | "spiritual_gifts" | undefined;
    language?: string | undefined;
    culturalAdaptation?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "universal" | undefined;
    researchBacked?: boolean | undefined;
    ministryContext?: {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        culturalAdaptations?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
        theologicalAlignment?: string[] | undefined;
        practicalApplication?: string[] | undefined;
    } | undefined;
}>;
export declare const startMinistryAssessmentRequestSchema: z.ZodObject<{
    assessmentId: z.ZodString;
    userId: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    assessmentId: string;
    organizationId?: string | undefined;
}, {
    userId: string;
    assessmentId: string;
    organizationId?: string | undefined;
}>;
export declare const completeMinistryAssessmentRequestSchema: z.ZodObject<{
    assessmentId: z.ZodString;
    userId: z.ZodString;
    responses: z.ZodArray<z.ZodObject<{
        questionId: z.ZodString;
        answer: z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodArray<z.ZodString, "many">]>;
        timeSpent: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        questionId: string;
        answer: string | number | string[];
        timeSpent?: number | undefined;
    }, {
        questionId: string;
        answer: string | number | string[];
        timeSpent?: number | undefined;
    }>, "many">;
    completedAt: z.ZodString;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    assessmentId: string;
    completedAt: string;
    responses: {
        questionId: string;
        answer: string | number | string[];
        timeSpent?: number | undefined;
    }[];
    organizationId?: string | undefined;
}, {
    userId: string;
    assessmentId: string;
    completedAt: string;
    responses: {
        questionId: string;
        answer: string | number | string[];
        timeSpent?: number | undefined;
    }[];
    organizationId?: string | undefined;
}>;
export declare const createMinistryContentRequestSchema: z.ZodObject<{
    title: z.ZodString;
    excerpt: z.ZodString;
    content: z.ZodString;
    contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study"]>;
    status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
    language: z.ZodDefault<z.ZodString>;
    difficultyLevel: z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>;
    ministryContext: z.ZodObject<{
        targetMinistryRoles: z.ZodDefault<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
        theologicalDepth: z.ZodDefault<z.ZodEnum<["introductory", "intermediate", "advanced", "scholarly"]>>;
        practicalApplication: z.ZodDefault<z.ZodEnum<["theory", "practical", "hands_on", "case_study"]>>;
        culturalRelevance: z.ZodDefault<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        practicalApplication: "case_study" | "practical" | "theory" | "hands_on";
        theologicalDepth: "intermediate" | "advanced" | "introductory" | "scholarly";
        culturalRelevance: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
    }, {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        practicalApplication?: "case_study" | "practical" | "theory" | "hands_on" | undefined;
        theologicalDepth?: "intermediate" | "advanced" | "introductory" | "scholarly" | undefined;
        culturalRelevance?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
    }>;
    categoryId: z.ZodOptional<z.ZodString>;
    seriesId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    publishedAt: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    excerpt: string;
    content: string;
    title: string;
    contentType: "video" | "article" | "podcast" | "framework" | "tool" | "case_study";
    language: string;
    ministryContext: {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        practicalApplication: "case_study" | "practical" | "theory" | "hands_on";
        theologicalDepth: "intermediate" | "advanced" | "introductory" | "scholarly";
        culturalRelevance: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
    };
    difficultyLevel: "beginner" | "intermediate" | "advanced" | "expert";
    organizationId?: string | undefined;
    seriesId?: string | undefined;
    publishedAt?: string | undefined;
    categoryId?: string | undefined;
}, {
    excerpt: string;
    content: string;
    title: string;
    contentType: "video" | "article" | "podcast" | "framework" | "tool" | "case_study";
    ministryContext: {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        practicalApplication?: "case_study" | "practical" | "theory" | "hands_on" | undefined;
        theologicalDepth?: "intermediate" | "advanced" | "introductory" | "scholarly" | undefined;
        culturalRelevance?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
    };
    organizationId?: string | undefined;
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    seriesId?: string | undefined;
    publishedAt?: string | undefined;
    language?: string | undefined;
    difficultyLevel?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    categoryId?: string | undefined;
}>;
export declare const updateMinistryContentRequestSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    excerpt: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    contentType: z.ZodOptional<z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>>;
    language: z.ZodOptional<z.ZodDefault<z.ZodString>>;
    difficultyLevel: z.ZodOptional<z.ZodDefault<z.ZodEnum<["beginner", "intermediate", "advanced", "expert"]>>>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        targetMinistryRoles: z.ZodDefault<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
        theologicalDepth: z.ZodDefault<z.ZodEnum<["introductory", "intermediate", "advanced", "scholarly"]>>;
        practicalApplication: z.ZodDefault<z.ZodEnum<["theory", "practical", "hands_on", "case_study"]>>;
        culturalRelevance: z.ZodDefault<z.ZodArray<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>, "many">>;
    }, "strip", z.ZodTypeAny, {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        practicalApplication: "case_study" | "practical" | "theory" | "hands_on";
        theologicalDepth: "intermediate" | "advanced" | "introductory" | "scholarly";
        culturalRelevance: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
    }, {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        practicalApplication?: "case_study" | "practical" | "theory" | "hands_on" | undefined;
        theologicalDepth?: "intermediate" | "advanced" | "introductory" | "scholarly" | undefined;
        culturalRelevance?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
    }>>;
    categoryId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    seriesId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    organizationId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    publishedAt: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    organizationId?: string | undefined;
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    seriesId?: string | undefined;
    publishedAt?: string | undefined;
    title?: string | undefined;
    contentType?: "video" | "article" | "podcast" | "framework" | "tool" | "case_study" | undefined;
    language?: string | undefined;
    ministryContext?: {
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        practicalApplication: "case_study" | "practical" | "theory" | "hands_on";
        theologicalDepth: "intermediate" | "advanced" | "introductory" | "scholarly";
        culturalRelevance: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[];
    } | undefined;
    difficultyLevel?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    categoryId?: string | undefined;
}, {
    organizationId?: string | undefined;
    status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
    excerpt?: string | undefined;
    content?: string | undefined;
    seriesId?: string | undefined;
    publishedAt?: string | undefined;
    title?: string | undefined;
    contentType?: "video" | "article" | "podcast" | "framework" | "tool" | "case_study" | undefined;
    language?: string | undefined;
    ministryContext?: {
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        practicalApplication?: "case_study" | "practical" | "theory" | "hands_on" | undefined;
        theologicalDepth?: "intermediate" | "advanced" | "introductory" | "scholarly" | undefined;
        culturalRelevance?: ("western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global")[] | undefined;
    } | undefined;
    difficultyLevel?: "beginner" | "intermediate" | "advanced" | "expert" | undefined;
    categoryId?: string | undefined;
}>;
export declare const createMinistryCommunityRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    communityType: z.ZodEnum<["general_discussion", "church_planting_cohort", "leadership_development", "theological_study", "ministry_collaboration", "regional_network"]>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "archived", "private"]>>;
    ministryContext: z.ZodObject<{
        targetMinistryRoles: z.ZodDefault<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
        theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        ministryStage: z.ZodDefault<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
        geographicScope: z.ZodDefault<z.ZodEnum<["local", "regional", "national", "global"]>>;
    }, "strip", z.ZodTypeAny, {
        theologicalFocus: string[];
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        ministryStage: "exploring" | "developing" | "established" | "multiplying";
        geographicScope: "global" | "local" | "regional" | "national";
    }, {
        theologicalFocus?: string[] | undefined;
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        ministryStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
        geographicScope?: "global" | "local" | "regional" | "national" | undefined;
    }>;
    organizationId: z.ZodOptional<z.ZodString>;
    isPrivate: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    status: "private" | "active" | "inactive" | "archived";
    name: string;
    description: string;
    communityType: "general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_collaboration";
    ministryContext: {
        theologicalFocus: string[];
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        ministryStage: "exploring" | "developing" | "established" | "multiplying";
        geographicScope: "global" | "local" | "regional" | "national";
    };
    isPrivate: boolean;
    organizationId?: string | undefined;
}, {
    name: string;
    description: string;
    communityType: "general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_collaboration";
    ministryContext: {
        theologicalFocus?: string[] | undefined;
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        ministryStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
        geographicScope?: "global" | "local" | "regional" | "national" | undefined;
    };
    organizationId?: string | undefined;
    status?: "private" | "active" | "inactive" | "archived" | undefined;
    isPrivate?: boolean | undefined;
}>;
export declare const updateMinistryCommunityRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    communityType: z.ZodOptional<z.ZodEnum<["general_discussion", "church_planting_cohort", "leadership_development", "theological_study", "ministry_collaboration", "regional_network"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "archived", "private"]>>>;
    ministryContext: z.ZodOptional<z.ZodObject<{
        targetMinistryRoles: z.ZodDefault<z.ZodArray<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>, "many">>;
        theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        ministryStage: z.ZodDefault<z.ZodEnum<["exploring", "developing", "established", "multiplying"]>>;
        geographicScope: z.ZodDefault<z.ZodEnum<["local", "regional", "national", "global"]>>;
    }, "strip", z.ZodTypeAny, {
        theologicalFocus: string[];
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        ministryStage: "exploring" | "developing" | "established" | "multiplying";
        geographicScope: "global" | "local" | "regional" | "national";
    }, {
        theologicalFocus?: string[] | undefined;
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        ministryStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
        geographicScope?: "global" | "local" | "regional" | "national" | undefined;
    }>>;
    organizationId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isPrivate: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    organizationId?: string | undefined;
    status?: "private" | "active" | "inactive" | "archived" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    communityType?: "general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_collaboration" | undefined;
    ministryContext?: {
        theologicalFocus: string[];
        targetMinistryRoles: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[];
        ministryStage: "exploring" | "developing" | "established" | "multiplying";
        geographicScope: "global" | "local" | "regional" | "national";
    } | undefined;
    isPrivate?: boolean | undefined;
}, {
    organizationId?: string | undefined;
    status?: "private" | "active" | "inactive" | "archived" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    communityType?: "general_discussion" | "church_planting_cohort" | "leadership_development" | "theological_study" | "regional_network" | "ministry_collaboration" | undefined;
    ministryContext?: {
        theologicalFocus?: string[] | undefined;
        targetMinistryRoles?: ("other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher")[] | undefined;
        ministryStage?: "exploring" | "developing" | "established" | "multiplying" | undefined;
        geographicScope?: "global" | "local" | "regional" | "national" | undefined;
    } | undefined;
    isPrivate?: boolean | undefined;
}>;
export declare const joinMinistryCommunityRequestSchema: z.ZodObject<{
    communityId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
    organizationId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userId: string;
    role: "owner" | "admin" | "member" | "viewer";
    communityId: string;
    organizationId?: string | undefined;
}, {
    userId: string;
    communityId: string;
    organizationId?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
}>;
export declare const createMinistryOrganizationRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    organizationType: z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>;
    status: z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>;
    ministryFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    theologicalTradition: z.ZodOptional<z.ZodString>;
    denominationalAffiliation: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    address: z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        zipCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    }, {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "suspended" | "pending" | "inactive";
    name: string;
    description: string;
    organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
    ministryFocus: string[];
    website?: string | undefined;
    address?: {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    } | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    theologicalTradition?: string | undefined;
    denominationalAffiliation?: string | undefined;
}, {
    name: string;
    description: string;
    organizationType: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other";
    status?: "active" | "suspended" | "pending" | "inactive" | undefined;
    website?: string | undefined;
    address?: {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    } | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    theologicalTradition?: string | undefined;
    ministryFocus?: string[] | undefined;
    denominationalAffiliation?: string | undefined;
}>;
export declare const updateMinistryOrganizationRequestSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    organizationType: z.ZodOptional<z.ZodEnum<["church", "denomination", "seminary", "ministry_network", "nonprofit", "business", "other"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["active", "inactive", "pending", "suspended"]>>>;
    ministryFocus: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    theologicalTradition: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    denominationalAffiliation: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    website: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    address: z.ZodOptional<z.ZodOptional<z.ZodObject<{
        street: z.ZodOptional<z.ZodString>;
        city: z.ZodOptional<z.ZodString>;
        state: z.ZodOptional<z.ZodString>;
        zipCode: z.ZodOptional<z.ZodString>;
        country: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    }, {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    }>>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "suspended" | "pending" | "inactive" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    address?: {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    } | undefined;
    organizationType?: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other" | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    theologicalTradition?: string | undefined;
    ministryFocus?: string[] | undefined;
    denominationalAffiliation?: string | undefined;
}, {
    status?: "active" | "suspended" | "pending" | "inactive" | undefined;
    name?: string | undefined;
    description?: string | undefined;
    website?: string | undefined;
    address?: {
        country?: string | undefined;
        city?: string | undefined;
        street?: string | undefined;
        state?: string | undefined;
        zipCode?: string | undefined;
    } | undefined;
    organizationType?: "church" | "denomination" | "seminary" | "ministry_network" | "nonprofit" | "business" | "other" | undefined;
    email?: string | undefined;
    phone?: string | undefined;
    theologicalTradition?: string | undefined;
    ministryFocus?: string[] | undefined;
    denominationalAffiliation?: string | undefined;
}>;
export declare const inviteOrganizationMemberRequestSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<["owner", "admin", "member", "viewer"]>>;
    ministryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
    message: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    role: "owner" | "admin" | "member" | "viewer";
    email: string;
    ministryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
    message?: string | undefined;
}, {
    email: string;
    ministryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
    message?: string | undefined;
    role?: "owner" | "admin" | "member" | "viewer" | undefined;
}>;
export declare const ministryAnalyticsRequestSchema: z.ZodObject<{
    organizationId: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    dateFrom: z.ZodOptional<z.ZodString>;
    dateTo: z.ZodOptional<z.ZodString>;
    metricTypes: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    groupBy: z.ZodOptional<z.ZodEnum<["day", "week", "month", "quarter", "year"]>>;
    includeComparisons: z.ZodDefault<z.ZodBoolean>;
    includePredictions: z.ZodDefault<z.ZodBoolean>;
    filters: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, "strip", z.ZodTypeAny, {
    includeComparisons: boolean;
    includePredictions: boolean;
    organizationId?: string | undefined;
    userId?: string | undefined;
    groupBy?: "day" | "week" | "month" | "quarter" | "year" | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    metricTypes?: string[] | undefined;
    filters?: Record<string, any> | undefined;
}, {
    organizationId?: string | undefined;
    userId?: string | undefined;
    groupBy?: "day" | "week" | "month" | "quarter" | "year" | undefined;
    dateFrom?: string | undefined;
    dateTo?: string | undefined;
    metricTypes?: string[] | undefined;
    includeComparisons?: boolean | undefined;
    includePredictions?: boolean | undefined;
    filters?: Record<string, any> | undefined;
}>;
export declare const createMinistryCollaborationRequestSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    collaborationType: z.ZodEnum<["project", "study_group", "mentorship", "partnership"]>;
    status: z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>;
    participants: z.ZodArray<z.ZodString, "many">;
    organizationId: z.ZodOptional<z.ZodString>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    status: "active" | "cancelled" | "completed" | "planning";
    description: string;
    title: string;
    collaborationType: "project" | "study_group" | "mentorship" | "partnership";
    participants: string[];
    organizationId?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}, {
    description: string;
    title: string;
    collaborationType: "project" | "study_group" | "mentorship" | "partnership";
    participants: string[];
    organizationId?: string | undefined;
    status?: "active" | "cancelled" | "completed" | "planning" | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
}>;
export declare const updateMinistryCollaborationRequestSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    collaborationType: z.ZodOptional<z.ZodEnum<["project", "study_group", "mentorship", "partnership"]>>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<["planning", "active", "completed", "cancelled"]>>>;
    participants: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    organizationId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    startDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    endDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    organizationId?: string | undefined;
    status?: "active" | "cancelled" | "completed" | "planning" | undefined;
    description?: string | undefined;
    title?: string | undefined;
    collaborationType?: "project" | "study_group" | "mentorship" | "partnership" | undefined;
    startDate?: string | undefined;
    participants?: string[] | undefined;
    endDate?: string | undefined;
}, {
    organizationId?: string | undefined;
    status?: "active" | "cancelled" | "completed" | "planning" | undefined;
    description?: string | undefined;
    title?: string | undefined;
    collaborationType?: "project" | "study_group" | "mentorship" | "partnership" | undefined;
    startDate?: string | undefined;
    participants?: string[] | undefined;
    endDate?: string | undefined;
}>;
export declare const createMinistrySubscriptionRequestSchema: z.ZodObject<{
    planId: z.ZodString;
    organizationId: z.ZodString;
    billingCycle: z.ZodDefault<z.ZodEnum<["monthly", "yearly"]>>;
    paymentMethodId: z.ZodOptional<z.ZodString>;
    couponCode: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    organizationId: string;
    planId: string;
    billingCycle: "monthly" | "yearly";
    paymentMethodId?: string | undefined;
    couponCode?: string | undefined;
}, {
    organizationId: string;
    planId: string;
    billingCycle?: "monthly" | "yearly" | undefined;
    paymentMethodId?: string | undefined;
    couponCode?: string | undefined;
}>;
export declare const updateMinistrySubscriptionRequestSchema: z.ZodObject<{
    planId: z.ZodOptional<z.ZodString>;
    billingCycle: z.ZodOptional<z.ZodEnum<["monthly", "yearly"]>>;
    status: z.ZodOptional<z.ZodEnum<["active", "cancelled", "past_due", "unpaid", "trialing", "paused"]>>;
}, "strip", z.ZodTypeAny, {
    status?: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused" | undefined;
    planId?: string | undefined;
    billingCycle?: "monthly" | "yearly" | undefined;
}, {
    status?: "active" | "cancelled" | "past_due" | "unpaid" | "trialing" | "paused" | undefined;
    planId?: string | undefined;
    billingCycle?: "monthly" | "yearly" | undefined;
}>;
export declare const updateMinistryUserProfileRequestSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    displayName: z.ZodOptional<z.ZodString>;
    bio: z.ZodOptional<z.ZodString>;
    ministryRole: z.ZodOptional<z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>>;
    organizationId: z.ZodOptional<z.ZodString>;
    culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
    ministrySpecialization: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    targetAudience: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    ministryGoals: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    website: z.ZodOptional<z.ZodString>;
    socialMedia: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    organizationId?: string | undefined;
    ministryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    website?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    targetAudience?: string[] | undefined;
    ministrySpecialization?: string[] | undefined;
    ministryGoals?: string[] | undefined;
    socialMedia?: Record<string, string> | undefined;
}, {
    organizationId?: string | undefined;
    ministryRole?: "other" | "emerging_leader" | "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | undefined;
    culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
    website?: string | undefined;
    displayName?: string | undefined;
    bio?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    targetAudience?: string[] | undefined;
    ministrySpecialization?: string[] | undefined;
    ministryGoals?: string[] | undefined;
    socialMedia?: Record<string, string> | undefined;
}>;
export type MinistryPlatformSearchRequest = z.infer<typeof ministryPlatformSearchRequestSchema>;
export type CreateMinistryAssessmentRequest = z.infer<typeof createMinistryAssessmentRequestSchema>;
export type UpdateMinistryAssessmentRequest = z.infer<typeof updateMinistryAssessmentRequestSchema>;
export type StartMinistryAssessmentRequest = z.infer<typeof startMinistryAssessmentRequestSchema>;
export type CompleteMinistryAssessmentRequest = z.infer<typeof completeMinistryAssessmentRequestSchema>;
export type CreateMinistryContentRequest = z.infer<typeof createMinistryContentRequestSchema>;
export type UpdateMinistryContentRequest = z.infer<typeof updateMinistryContentRequestSchema>;
export type CreateMinistryCommunityRequest = z.infer<typeof createMinistryCommunityRequestSchema>;
export type UpdateMinistryCommunityRequest = z.infer<typeof updateMinistryCommunityRequestSchema>;
export type JoinMinistryCommunityRequest = z.infer<typeof joinMinistryCommunityRequestSchema>;
export type CreateMinistryOrganizationRequest = z.infer<typeof createMinistryOrganizationRequestSchema>;
export type UpdateMinistryOrganizationRequest = z.infer<typeof updateMinistryOrganizationRequestSchema>;
export type InviteOrganizationMemberRequest = z.infer<typeof inviteOrganizationMemberRequestSchema>;
export type MinistryAnalyticsRequest = z.infer<typeof ministryAnalyticsRequestSchema>;
export type CreateMinistryCollaborationRequest = z.infer<typeof createMinistryCollaborationRequestSchema>;
export type UpdateMinistryCollaborationRequest = z.infer<typeof updateMinistryCollaborationRequestSchema>;
export type CreateMinistrySubscriptionRequest = z.infer<typeof createMinistrySubscriptionRequestSchema>;
export type UpdateMinistrySubscriptionRequest = z.infer<typeof updateMinistrySubscriptionRequestSchema>;
export type UpdateMinistryUserProfileRequest = z.infer<typeof updateMinistryUserProfileRequestSchema>;
//# sourceMappingURL=ministry-platform.request.d.ts.map