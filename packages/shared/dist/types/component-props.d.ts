import { assessmentSchema, contentCategorySchema, contentItemSchema, contentSeriesSchema, organizationSchema, userAssessmentSchema, userProfileSchema } from '@platform/contracts';
import { z } from 'zod';
export interface BaseComponentProps {
    className?: string;
    children?: React.ReactNode;
}
export interface LoadingStateProps {
    isLoading: boolean;
    error?: Error | null;
}
export interface EmptyStateProps {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
}
export interface EntityDisplayProps<T> extends BaseComponentProps {
    data: T;
    isLoading?: boolean;
    error?: Error | null;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    onView?: (item: T) => void;
}
export interface EntityListProps<T> extends BaseComponentProps {
    items: T[];
    isLoading?: boolean;
    error?: Error | null;
    emptyMessage?: string;
    emptyIcon?: React.ReactNode;
    renderItem: (item: T, index: number) => React.ReactNode;
    onItemClick?: (item: T) => void;
    onItemEdit?: (item: T) => void;
    onItemDelete?: (id: string) => void;
}
export interface EntityCardProps<T> extends BaseComponentProps {
    item: T;
    variant?: 'default' | 'compact' | 'detailed' | 'minimal';
    showActions?: boolean;
    showStats?: boolean;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    onView?: (item: T) => void;
}
export interface ColumnDef<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    filterable?: boolean;
    render?: (item: T) => React.ReactNode;
    width?: string;
    align?: 'left' | 'center' | 'right';
}
export interface DataTableProps<T> extends BaseComponentProps {
    data: T[];
    columns: ColumnDef<T>[];
    isLoading?: boolean;
    error?: Error | null;
    sortBy?: keyof T;
    sortOrder?: 'asc' | 'desc';
    onSort?: (column: keyof T) => void;
    onRowClick?: (item: T) => void;
    selectable?: boolean;
    selectedItems?: T[];
    onSelectionChange?: (items: T[]) => void;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        onPageChange: (page: number) => void;
    };
}
export interface UserCardProps extends EntityCardProps<z.infer<typeof userProfileSchema>> {
    showMinistryInfo?: boolean;
    showAssessmentScores?: boolean;
    showContactInfo?: boolean;
    showStats?: boolean;
}
export interface UserListProps extends EntityListProps<z.infer<typeof userProfileSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        ministryRole?: string;
        countryCode?: string;
        leaderTier?: string;
        subscriptionTier?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface UserProfileProps extends EntityDisplayProps<z.infer<typeof userProfileSchema>> {
    showFullProfile?: boolean;
    showAssessmentResults?: boolean;
    showCommunityActivity?: boolean;
    showCollaborationHistory?: boolean;
}
export interface UserAvatarProps extends BaseComponentProps {
    user: z.infer<typeof userProfileSchema>;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showOnlineStatus?: boolean;
    showMinistryRole?: boolean;
}
export interface OrganizationCardProps extends EntityCardProps<z.infer<typeof organizationSchema>> {
    showMemberCount?: boolean;
    showContactInfo?: boolean;
    showLicenseInfo?: boolean;
}
export interface OrganizationListProps extends EntityListProps<z.infer<typeof organizationSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        organizationType?: string;
        sizeCategory?: string;
        status?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface OrganizationProfileProps extends EntityDisplayProps<z.infer<typeof organizationSchema>> {
    showMembers?: boolean;
    showSubscriptionInfo?: boolean;
    showActivity?: boolean;
}
export interface AssessmentCardProps extends EntityCardProps<z.infer<typeof assessmentSchema>> {
    showQuestionCount?: boolean;
    showDuration?: boolean;
    showValidityScores?: boolean;
    showCulturalAdaptation?: boolean;
}
export interface AssessmentListProps extends EntityListProps<z.infer<typeof assessmentSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        assessmentType?: string;
        status?: string;
        language?: string;
        researchBacked?: boolean;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface AssessmentDetailsProps extends EntityDisplayProps<z.infer<typeof assessmentSchema>> {
    showQuestions?: boolean;
    showStatistics?: boolean;
    showUserResults?: boolean;
    allowTakeAssessment?: boolean;
    onStartAssessment?: (assessmentId: string) => void;
}
export interface UserAssessmentCardProps extends EntityCardProps<z.infer<typeof userAssessmentSchema>> {
    showProgress?: boolean;
    showScores?: boolean;
    showRecommendations?: boolean;
    showCompletionStatus?: boolean;
}
export interface UserAssessmentListProps extends EntityListProps<z.infer<typeof userAssessmentSchema>> {
    showFilters?: boolean;
    filters?: {
        completed?: boolean;
        assessmentType?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface ContentItemCardProps extends EntityCardProps<z.infer<typeof contentItemSchema>> {
    showAuthor?: boolean;
    showStats?: boolean;
    showExcerpt?: boolean;
    showTags?: boolean;
    showCategory?: boolean;
}
export interface ContentItemListProps extends EntityListProps<z.infer<typeof contentItemSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        contentType?: string;
        status?: string;
        category?: string;
        author?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface ContentItemDetailsProps extends EntityDisplayProps<z.infer<typeof contentItemSchema>> {
    showFullContent?: boolean;
    showRelatedContent?: boolean;
    showComments?: boolean;
    allowBookmark?: boolean;
    onBookmark?: (contentId: string) => void;
}
export interface ContentSeriesCardProps extends EntityCardProps<z.infer<typeof contentSeriesSchema>> {
    showItemCount?: boolean;
    showDuration?: boolean;
    showDifficulty?: boolean;
    showAuthor?: boolean;
}
export interface ContentSeriesListProps extends EntityListProps<z.infer<typeof contentSeriesSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        seriesType?: string;
        difficulty?: string;
        status?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface ContentSeriesDetailsProps extends EntityDisplayProps<z.infer<typeof contentSeriesSchema>> {
    showItems?: boolean;
    showProgress?: boolean;
    allowEnroll?: boolean;
    onEnroll?: (seriesId: string) => void;
}
export interface ContentCategoryCardProps extends EntityCardProps<z.infer<typeof contentCategorySchema>> {
    showItemCount?: boolean;
    showMovementScore?: boolean;
    showApesetScores?: boolean;
}
export interface ContentCategoryListProps extends EntityListProps<z.infer<typeof contentCategorySchema>> {
    view?: 'grid' | 'list' | 'table';
    showHierarchy?: boolean;
    showFilters?: boolean;
    filters?: {
        theologicalDiscipline?: string;
        isActive?: boolean;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface SearchProps extends BaseComponentProps {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    onSearch?: (query: string) => void;
    debounceMs?: number;
    suggestions?: string[];
    onSuggestionSelect?: (suggestion: string) => void;
}
export interface FilterProps extends BaseComponentProps {
    filters: Record<string, unknown>;
    onFilterChange: (filters: Record<string, unknown>) => void;
    onClearFilters?: () => void;
    showClearAll?: boolean;
}
export interface PaginationProps extends BaseComponentProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange?: (limit: number) => void;
    showLimitSelector?: boolean;
    showInfo?: boolean;
}
export interface StatsCardProps extends BaseComponentProps {
    title: string;
    value: string | number;
    change?: {
        value: number;
        type: 'increase' | 'decrease' | 'neutral';
        period: string;
    };
    icon?: React.ReactNode;
    loading?: boolean;
}
export interface StatsGridProps extends BaseComponentProps {
    stats: Array<{
        title: string;
        value: string | number;
        change?: {
            value: number;
            type: 'increase' | 'decrease' | 'neutral';
            period: string;
        };
        icon?: React.ReactNode;
    }>;
    loading?: boolean;
}
export interface EntityFormProps<T> extends BaseComponentProps {
    entity?: T;
    mode: 'create' | 'edit';
    onSubmit: (data: T) => void;
    onCancel?: () => void;
    loading?: boolean;
    validationErrors?: Record<string, string>;
}
export interface EntityFormModalProps<T> extends EntityFormProps<T> {
    isOpen: boolean;
    title: string;
    description?: string;
}
export declare const userCardPropsSchema: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        passwordHash: z.ZodOptional<z.ZodString>;
        firstName: z.ZodString;
        lastName: z.ZodString;
        displayName: z.ZodOptional<z.ZodString>;
        bio: z.ZodOptional<z.ZodString>;
        avatarUrl: z.ZodOptional<z.ZodString>;
        ministryRole: z.ZodEnum<["senior_pastor", "associate_pastor", "church_planter", "denominational_leader", "seminary_professor", "seminary_student", "ministry_staff", "missionary", "marketplace_minister", "nonprofit_leader", "consultant", "academic_researcher", "emerging_leader", "other"]>;
        denomination: z.ZodOptional<z.ZodString>;
        organizationName: z.ZodOptional<z.ZodString>;
        yearsInMinistry: z.ZodOptional<z.ZodNumber>;
        countryCode: z.ZodOptional<z.ZodString>;
        timezone: z.ZodOptional<z.ZodString>;
        languagePrimary: z.ZodDefault<z.ZodString>;
        culturalContext: z.ZodOptional<z.ZodEnum<["western", "eastern", "african", "latin_american", "middle_eastern", "oceanic", "mixed", "global"]>>;
        assessmentMovementAlignment: z.ZodOptional<z.ZodNumber>;
        assessmentAudienceEngagement: z.ZodOptional<z.ZodNumber>;
        assessmentContentReadiness: z.ZodOptional<z.ZodNumber>;
        assessmentRevenuePotential: z.ZodOptional<z.ZodNumber>;
        assessmentNetworkEffects: z.ZodOptional<z.ZodNumber>;
        assessmentStrategicFit: z.ZodOptional<z.ZodNumber>;
        assessmentTotal: z.ZodOptional<z.ZodNumber>;
        leaderTier: z.ZodOptional<z.ZodEnum<["core", "network", "emerging", "community"]>>;
        subdomain: z.ZodOptional<z.ZodString>;
        customDomain: z.ZodOptional<z.ZodString>;
        platformTitle: z.ZodOptional<z.ZodString>;
        subscriptionTier: z.ZodDefault<z.ZodEnum<["free", "individual", "professional", "leader", "institutional"]>>;
        theologicalFocus: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        brandColors: z.ZodDefault<z.ZodObject<{
            primary: z.ZodDefault<z.ZodString>;
            secondary: z.ZodDefault<z.ZodString>;
            accent: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            primary: string;
            secondary: string;
            accent: string;
        }, {
            primary?: string | undefined;
            secondary?: string | undefined;
            accent?: string | undefined;
        }>>;
        emailNotifications: z.ZodDefault<z.ZodObject<{
            dailyDigest: z.ZodDefault<z.ZodBoolean>;
            collaborationRequests: z.ZodDefault<z.ZodBoolean>;
            revenueReports: z.ZodDefault<z.ZodBoolean>;
            communityUpdates: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        }, {
            dailyDigest?: boolean | undefined;
            collaborationRequests?: boolean | undefined;
            revenueReports?: boolean | undefined;
            communityUpdates?: boolean | undefined;
        }>>;
        privacySettings: z.ZodDefault<z.ZodObject<{
            publicProfile: z.ZodDefault<z.ZodBoolean>;
            showAssessmentResults: z.ZodDefault<z.ZodBoolean>;
            allowNetworking: z.ZodDefault<z.ZodBoolean>;
            shareAnalytics: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        }, {
            publicProfile?: boolean | undefined;
            showAssessmentResults?: boolean | undefined;
            allowNetworking?: boolean | undefined;
            shareAnalytics?: boolean | undefined;
        }>>;
        onboardingCompleted: z.ZodDefault<z.ZodBoolean>;
        onboardingStep: z.ZodDefault<z.ZodNumber>;
        accountStatus: z.ZodDefault<z.ZodEnum<["active", "inactive", "suspended", "pending_verification"]>>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
        lastActiveAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        languagePrimary: string;
        subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
        theologicalFocus: string[];
        brandColors: {
            primary: string;
            secondary: string;
            accent: string;
        };
        emailNotifications: {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        };
        privacySettings: {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        };
        onboardingCompleted: boolean;
        onboardingStep: number;
        accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
    }, {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        languagePrimary?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
        subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
        theologicalFocus?: string[] | undefined;
        brandColors?: {
            primary?: string | undefined;
            secondary?: string | undefined;
            accent?: string | undefined;
        } | undefined;
        emailNotifications?: {
            dailyDigest?: boolean | undefined;
            collaborationRequests?: boolean | undefined;
            revenueReports?: boolean | undefined;
            communityUpdates?: boolean | undefined;
        } | undefined;
        privacySettings?: {
            publicProfile?: boolean | undefined;
            showAssessmentResults?: boolean | undefined;
            allowNetworking?: boolean | undefined;
            shareAnalytics?: boolean | undefined;
        } | undefined;
        onboardingCompleted?: boolean | undefined;
        onboardingStep?: number | undefined;
        accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    }>;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showMinistryInfo: z.ZodOptional<z.ZodBoolean>;
    showAssessmentScores: z.ZodOptional<z.ZodBoolean>;
    showContactInfo: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    item: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        languagePrimary: string;
        subscriptionTier: "free" | "individual" | "professional" | "leader" | "institutional";
        theologicalFocus: string[];
        brandColors: {
            primary: string;
            secondary: string;
            accent: string;
        };
        emailNotifications: {
            dailyDigest: boolean;
            collaborationRequests: boolean;
            revenueReports: boolean;
            communityUpdates: boolean;
        };
        privacySettings: {
            publicProfile: boolean;
            showAssessmentResults: boolean;
            allowNetworking: boolean;
            shareAnalytics: boolean;
        };
        onboardingCompleted: boolean;
        onboardingStep: number;
        accountStatus: "active" | "inactive" | "suspended" | "pending_verification";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
    };
    variant?: "default" | "compact" | "detailed" | "minimal" | undefined;
    showActions?: boolean | undefined;
    showStats?: boolean | undefined;
    showMinistryInfo?: boolean | undefined;
    showAssessmentScores?: boolean | undefined;
    showContactInfo?: boolean | undefined;
    className?: string | undefined;
}, {
    item: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        ministryRole: "senior_pastor" | "associate_pastor" | "church_planter" | "denominational_leader" | "seminary_professor" | "seminary_student" | "ministry_staff" | "missionary" | "marketplace_minister" | "nonprofit_leader" | "consultant" | "academic_researcher" | "emerging_leader" | "other";
        createdAt: string;
        updatedAt: string;
        lastActiveAt: string;
        passwordHash?: string | undefined;
        displayName?: string | undefined;
        bio?: string | undefined;
        avatarUrl?: string | undefined;
        denomination?: string | undefined;
        organizationName?: string | undefined;
        yearsInMinistry?: number | undefined;
        countryCode?: string | undefined;
        timezone?: string | undefined;
        languagePrimary?: string | undefined;
        culturalContext?: "western" | "eastern" | "african" | "latin_american" | "middle_eastern" | "oceanic" | "mixed" | "global" | undefined;
        assessmentMovementAlignment?: number | undefined;
        assessmentAudienceEngagement?: number | undefined;
        assessmentContentReadiness?: number | undefined;
        assessmentRevenuePotential?: number | undefined;
        assessmentNetworkEffects?: number | undefined;
        assessmentStrategicFit?: number | undefined;
        assessmentTotal?: number | undefined;
        leaderTier?: "core" | "network" | "emerging" | "community" | undefined;
        subdomain?: string | undefined;
        customDomain?: string | undefined;
        platformTitle?: string | undefined;
        subscriptionTier?: "free" | "individual" | "professional" | "leader" | "institutional" | undefined;
        theologicalFocus?: string[] | undefined;
        brandColors?: {
            primary?: string | undefined;
            secondary?: string | undefined;
            accent?: string | undefined;
        } | undefined;
        emailNotifications?: {
            dailyDigest?: boolean | undefined;
            collaborationRequests?: boolean | undefined;
            revenueReports?: boolean | undefined;
            communityUpdates?: boolean | undefined;
        } | undefined;
        privacySettings?: {
            publicProfile?: boolean | undefined;
            showAssessmentResults?: boolean | undefined;
            allowNetworking?: boolean | undefined;
            shareAnalytics?: boolean | undefined;
        } | undefined;
        onboardingCompleted?: boolean | undefined;
        onboardingStep?: number | undefined;
        accountStatus?: "active" | "inactive" | "suspended" | "pending_verification" | undefined;
    };
    variant?: "default" | "compact" | "detailed" | "minimal" | undefined;
    showActions?: boolean | undefined;
    showStats?: boolean | undefined;
    showMinistryInfo?: boolean | undefined;
    showAssessmentScores?: boolean | undefined;
    showContactInfo?: boolean | undefined;
    className?: string | undefined;
}>;
export declare const assessmentCardPropsSchema: z.ZodObject<{
    item: z.ZodObject<{
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
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showQuestionCount: z.ZodOptional<z.ZodBoolean>;
    showDuration: z.ZodOptional<z.ZodBoolean>;
    showValidityScores: z.ZodOptional<z.ZodBoolean>;
    showCulturalAdaptation: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    item: {
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
    variant?: "default" | "compact" | "detailed" | "minimal" | undefined;
    showActions?: boolean | undefined;
    showStats?: boolean | undefined;
    className?: string | undefined;
    showQuestionCount?: boolean | undefined;
    showDuration?: boolean | undefined;
    showValidityScores?: boolean | undefined;
    showCulturalAdaptation?: boolean | undefined;
}, {
    item: {
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
    variant?: "default" | "compact" | "detailed" | "minimal" | undefined;
    showActions?: boolean | undefined;
    showStats?: boolean | undefined;
    className?: string | undefined;
    showQuestionCount?: boolean | undefined;
    showDuration?: boolean | undefined;
    showValidityScores?: boolean | undefined;
    showCulturalAdaptation?: boolean | undefined;
}>;
export declare const contentItemCardPropsSchema: z.ZodObject<{
    item: z.ZodObject<{
        id: z.ZodString;
        title: z.ZodString;
        slug: z.ZodString;
        excerpt: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        authorId: z.ZodString;
        coAuthors: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        contentType: z.ZodEnum<["article", "video", "podcast", "framework", "tool", "case_study", "interview", "course_lesson"]>;
        format: z.ZodDefault<z.ZodEnum<["text", "video", "audio", "interactive", "pdf", "presentation"]>>;
        wordCount: z.ZodOptional<z.ZodNumber>;
        estimatedReadingTime: z.ZodOptional<z.ZodNumber>;
        viewCount: z.ZodDefault<z.ZodNumber>;
        likeCount: z.ZodDefault<z.ZodNumber>;
        shareCount: z.ZodDefault<z.ZodNumber>;
        commentCount: z.ZodDefault<z.ZodNumber>;
        bookmarkCount: z.ZodDefault<z.ZodNumber>;
        primaryCategoryId: z.ZodOptional<z.ZodString>;
        secondaryCategories: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        tags: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        theologicalThemes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        seriesId: z.ZodOptional<z.ZodString>;
        seriesOrder: z.ZodOptional<z.ZodNumber>;
        visibility: z.ZodDefault<z.ZodEnum<["public", "premium", "vip", "private", "organization", "invite_only"]>>;
        status: z.ZodDefault<z.ZodEnum<["draft", "published", "archived", "under_review", "scheduled"]>>;
        networkAmplificationScore: z.ZodDefault<z.ZodNumber>;
        crossReferenceCount: z.ZodDefault<z.ZodNumber>;
        aiEnhanced: z.ZodDefault<z.ZodBoolean>;
        aiSummary: z.ZodOptional<z.ZodString>;
        aiKeyPoints: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        featuredImageUrl: z.ZodOptional<z.ZodString>;
        videoUrl: z.ZodOptional<z.ZodString>;
        audioUrl: z.ZodOptional<z.ZodString>;
        attachments: z.ZodDefault<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            url: z.ZodString;
            type: z.ZodString;
            size: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            name: string;
            url: string;
            type: string;
            size: number;
        }, {
            name: string;
            url: string;
            type: string;
            size: number;
        }>, "many">>;
        metaTitle: z.ZodOptional<z.ZodString>;
        metaDescription: z.ZodOptional<z.ZodString>;
        canonicalUrl: z.ZodOptional<z.ZodString>;
        originalSource: z.ZodOptional<z.ZodString>;
        publishedAt: z.ZodOptional<z.ZodString>;
        scheduledAt: z.ZodOptional<z.ZodString>;
        licenseType: z.ZodDefault<z.ZodEnum<["all_rights_reserved", "creative_commons", "public_domain", "fair_use"]>>;
        attributionRequired: z.ZodDefault<z.ZodBoolean>;
        createdAt: z.ZodString;
        updatedAt: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        coAuthors: string[];
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
        viewCount: number;
        likeCount: number;
        shareCount: number;
        commentCount: number;
        bookmarkCount: number;
        secondaryCategories: string[];
        tags: string[];
        theologicalThemes: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        aiSummary?: string | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    }, {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        coAuthors?: string[] | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        shareCount?: number | undefined;
        commentCount?: number | undefined;
        bookmarkCount?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    }>;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showAuthor: z.ZodOptional<z.ZodBoolean>;
    showExcerpt: z.ZodOptional<z.ZodBoolean>;
    showTags: z.ZodOptional<z.ZodBoolean>;
    showCategory: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    item: {
        status: "draft" | "published" | "archived" | "under_review" | "scheduled";
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        coAuthors: string[];
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
        viewCount: number;
        likeCount: number;
        shareCount: number;
        commentCount: number;
        bookmarkCount: number;
        secondaryCategories: string[];
        tags: string[];
        theologicalThemes: string[];
        visibility: "public" | "private" | "premium" | "vip" | "organization" | "invite_only";
        networkAmplificationScore: number;
        crossReferenceCount: number;
        aiEnhanced: boolean;
        aiKeyPoints: string[];
        attachments: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[];
        licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
        attributionRequired: boolean;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        primaryCategoryId?: string | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        aiSummary?: string | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
    };
    variant?: "default" | "compact" | "detailed" | "minimal" | undefined;
    showActions?: boolean | undefined;
    showStats?: boolean | undefined;
    className?: string | undefined;
    showAuthor?: boolean | undefined;
    showExcerpt?: boolean | undefined;
    showTags?: boolean | undefined;
    showCategory?: boolean | undefined;
}, {
    item: {
        id: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
        title: string;
        authorId: string;
        contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
        status?: "draft" | "published" | "archived" | "under_review" | "scheduled" | undefined;
        metaDescription?: string | undefined;
        excerpt?: string | undefined;
        content?: string | undefined;
        coAuthors?: string[] | undefined;
        format?: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation" | undefined;
        wordCount?: number | undefined;
        estimatedReadingTime?: number | undefined;
        viewCount?: number | undefined;
        likeCount?: number | undefined;
        shareCount?: number | undefined;
        commentCount?: number | undefined;
        bookmarkCount?: number | undefined;
        primaryCategoryId?: string | undefined;
        secondaryCategories?: string[] | undefined;
        tags?: string[] | undefined;
        theologicalThemes?: string[] | undefined;
        seriesId?: string | undefined;
        seriesOrder?: number | undefined;
        visibility?: "public" | "private" | "premium" | "vip" | "organization" | "invite_only" | undefined;
        networkAmplificationScore?: number | undefined;
        crossReferenceCount?: number | undefined;
        aiEnhanced?: boolean | undefined;
        aiSummary?: string | undefined;
        aiKeyPoints?: string[] | undefined;
        featuredImageUrl?: string | undefined;
        videoUrl?: string | undefined;
        audioUrl?: string | undefined;
        attachments?: {
            name: string;
            url: string;
            type: string;
            size: number;
        }[] | undefined;
        metaTitle?: string | undefined;
        canonicalUrl?: string | undefined;
        originalSource?: string | undefined;
        publishedAt?: string | undefined;
        scheduledAt?: string | undefined;
        licenseType?: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use" | undefined;
        attributionRequired?: boolean | undefined;
    };
    variant?: "default" | "compact" | "detailed" | "minimal" | undefined;
    showActions?: boolean | undefined;
    showStats?: boolean | undefined;
    className?: string | undefined;
    showAuthor?: boolean | undefined;
    showExcerpt?: boolean | undefined;
    showTags?: boolean | undefined;
    showCategory?: boolean | undefined;
}>;
export type EntityType = z.infer<typeof userProfileSchema> | z.infer<typeof organizationSchema> | z.infer<typeof assessmentSchema> | z.infer<typeof contentItemSchema> | z.infer<typeof contentSeriesSchema> | z.infer<typeof contentCategorySchema> | z.infer<typeof userAssessmentSchema>;
export declare function validateComponentPropsSchema<T>(props: unknown, schema: z.ZodSchema<T>): T;
//# sourceMappingURL=component-props.d.ts.map