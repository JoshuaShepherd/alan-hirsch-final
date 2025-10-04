import { assessmentSchema, collaborationSchema, communityPostSchema, communitySchema, contentCategorySchema, contentItemSchema, contentSeriesSchema, organizationSchema, subscriptionPlanSchema, userAssessmentSchema, userProfileSchema, userSubscriptionSchema } from '@/validations';
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
export interface CommunityCardProps extends EntityCardProps<z.infer<typeof communitySchema>> {
    showMemberCount?: boolean;
    showPostCount?: boolean;
    showModerationLevel?: boolean;
    showJoinStatus?: boolean;
}
export interface CommunityListProps extends EntityListProps<z.infer<typeof communitySchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        communityType?: string;
        visibility?: string;
        joinApprovalRequired?: boolean;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface CommunityDetailsProps extends EntityDisplayProps<z.infer<typeof communitySchema>> {
    showPosts?: boolean;
    showMembers?: boolean;
    showGuidelines?: boolean;
    allowJoin?: boolean;
    onJoin?: (communityId: string) => void;
}
export interface CommunityPostCardProps extends EntityCardProps<z.infer<typeof communityPostSchema>> {
    showAuthor?: boolean;
    showEngagement?: boolean;
    showTags?: boolean;
    showReplyCount?: boolean;
    allowVote?: boolean;
    onVote?: (postId: string, voteType: 'upvote' | 'downvote') => void;
}
export interface CommunityPostListProps extends EntityListProps<z.infer<typeof communityPostSchema>> {
    showFilters?: boolean;
    filters?: {
        postType?: string;
        status?: string;
        author?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface SubscriptionPlanCardProps extends EntityCardProps<z.infer<typeof subscriptionPlanSchema>> {
    showPricing?: boolean;
    showFeatures?: boolean;
    showPopular?: boolean;
    showTrialInfo?: boolean;
    currentPlan?: boolean;
}
export interface SubscriptionPlanListProps extends EntityListProps<z.infer<typeof subscriptionPlanSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        planType?: string;
        isActive?: boolean;
        isPopular?: boolean;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
    onSelectPlan?: (planId: string) => void;
}
export interface UserSubscriptionCardProps extends EntityCardProps<z.infer<typeof userSubscriptionSchema>> {
    showUsage?: boolean;
    showBillingInfo?: boolean;
    showNextBilling?: boolean;
    allowManage?: boolean;
    onManage?: (subscriptionId: string) => void;
}
export interface UserSubscriptionListProps extends EntityListProps<z.infer<typeof userSubscriptionSchema>> {
    showFilters?: boolean;
    filters?: {
        status?: string;
        billingCycle?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface CollaborationCardProps extends EntityCardProps<z.infer<typeof collaborationSchema>> {
    showCollaborators?: boolean;
    showProgress?: boolean;
    showRevenue?: boolean;
    showDeliverables?: boolean;
}
export interface CollaborationListProps extends EntityListProps<z.infer<typeof collaborationSchema>> {
    view?: 'grid' | 'list' | 'table';
    showFilters?: boolean;
    filters?: {
        collaborationType?: string;
        status?: string;
        leadAuthor?: string;
    };
    onFilterChange?: (filters: Record<string, unknown>) => void;
}
export interface CollaborationDetailsProps extends EntityDisplayProps<z.infer<typeof collaborationSchema>> {
    showCollaborators?: boolean;
    showDeliverables?: boolean;
    showCommunication?: boolean;
    showRevenue?: boolean;
    allowJoin?: boolean;
    onJoin?: (collaborationId: string) => void;
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
    item: any;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showMinistryInfo: z.ZodOptional<z.ZodBoolean>;
    showAssessmentScores: z.ZodOptional<z.ZodBoolean>;
    showContactInfo: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showMinistryInfo?: unknown;
    showAssessmentScores?: unknown;
    showContactInfo?: unknown;
    className?: unknown;
}, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showMinistryInfo?: unknown;
    showAssessmentScores?: unknown;
    showContactInfo?: unknown;
    className?: unknown;
}>;
export declare const assessmentCardPropsSchema: z.ZodObject<{
    item: any;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showQuestionCount: z.ZodOptional<z.ZodBoolean>;
    showDuration: z.ZodOptional<z.ZodBoolean>;
    showValidityScores: z.ZodOptional<z.ZodBoolean>;
    showCulturalAdaptation: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showQuestionCount?: unknown;
    showDuration?: unknown;
    showValidityScores?: unknown;
    showCulturalAdaptation?: unknown;
    className?: unknown;
}, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showQuestionCount?: unknown;
    showDuration?: unknown;
    showValidityScores?: unknown;
    showCulturalAdaptation?: unknown;
    className?: unknown;
}>;
export declare const contentItemCardPropsSchema: z.ZodObject<{
    item: any;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showAuthor: z.ZodOptional<z.ZodBoolean>;
    showExcerpt: z.ZodOptional<z.ZodBoolean>;
    showTags: z.ZodOptional<z.ZodBoolean>;
    showCategory: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showAuthor?: unknown;
    showExcerpt?: unknown;
    showTags?: unknown;
    showCategory?: unknown;
    className?: unknown;
}, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showAuthor?: unknown;
    showExcerpt?: unknown;
    showTags?: unknown;
    showCategory?: unknown;
    className?: unknown;
}>;
export declare const communityCardPropsSchema: z.ZodObject<{
    item: any;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showMemberCount: z.ZodOptional<z.ZodBoolean>;
    showPostCount: z.ZodOptional<z.ZodBoolean>;
    showModerationLevel: z.ZodOptional<z.ZodBoolean>;
    showJoinStatus: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showMemberCount?: unknown;
    showPostCount?: unknown;
    showModerationLevel?: unknown;
    showJoinStatus?: unknown;
    className?: unknown;
}, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showMemberCount?: unknown;
    showPostCount?: unknown;
    showModerationLevel?: unknown;
    showJoinStatus?: unknown;
    className?: unknown;
}>;
export declare const subscriptionPlanCardPropsSchema: z.ZodObject<{
    item: any;
    variant: z.ZodOptional<z.ZodEnum<["default", "compact", "detailed", "minimal"]>>;
    showActions: z.ZodOptional<z.ZodBoolean>;
    showStats: z.ZodOptional<z.ZodBoolean>;
    showPricing: z.ZodOptional<z.ZodBoolean>;
    showFeatures: z.ZodOptional<z.ZodBoolean>;
    showPopular: z.ZodOptional<z.ZodBoolean>;
    showTrialInfo: z.ZodOptional<z.ZodBoolean>;
    currentPlan: z.ZodOptional<z.ZodBoolean>;
    className: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showPricing?: unknown;
    showFeatures?: unknown;
    showPopular?: unknown;
    showTrialInfo?: unknown;
    currentPlan?: unknown;
    className?: unknown;
}, {
    [x: string]: any;
    item?: unknown;
    variant?: unknown;
    showActions?: unknown;
    showStats?: unknown;
    showPricing?: unknown;
    showFeatures?: unknown;
    showPopular?: unknown;
    showTrialInfo?: unknown;
    currentPlan?: unknown;
    className?: unknown;
}>;
export type UserCardProps = z.infer<typeof userCardPropsSchema>;
export type AssessmentCardProps = z.infer<typeof assessmentCardPropsSchema>;
export type ContentItemCardProps = z.infer<typeof contentItemCardPropsSchema>;
export type CommunityCardProps = z.infer<typeof communityCardPropsSchema>;
export type SubscriptionPlanCardProps = z.infer<typeof subscriptionPlanCardPropsSchema>;
export type EntityType = z.infer<typeof userProfileSchema> | z.infer<typeof organizationSchema> | z.infer<typeof assessmentSchema> | z.infer<typeof contentItemSchema> | z.infer<typeof contentSeriesSchema> | z.infer<typeof contentCategorySchema> | z.infer<typeof communitySchema> | z.infer<typeof subscriptionPlanSchema> | z.infer<typeof userSubscriptionSchema> | z.infer<typeof userAssessmentSchema> | z.infer<typeof communityPostSchema> | z.infer<typeof collaborationSchema>;
export declare function validateComponentProps<T>(props: unknown, schema: z.ZodSchema<T>): T;
//# sourceMappingURL=component-props.d.ts.map