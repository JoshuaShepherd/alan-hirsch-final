import type {
  AssessmentForm,
  AssessmentResponse,
  ContentItemForm,
  ContentItemResponse,
  OrganizationForm,
  OrganizationResponse,
  UserProfileForm,
  UserProfileResponse,
} from '@platform/contracts';
import { z } from 'zod';

// ============================================================================
// BASE COMPONENT PROPS
// ============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// ============================================================================
// PAGINATION PROPS
// ============================================================================

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface PaginationProps {
  pagination: PaginationInfo;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

// ============================================================================
// USER COMPONENT PROPS
// ============================================================================

export interface UserCardProps extends BaseComponentProps {
  item: UserProfileResponse;
  variant?: 'default' | 'compact' | 'minimal' | 'detailed';
  showActions?: boolean;
  showStats?: boolean;
  showMinistryInfo?: boolean;
  showAssessmentScores?: boolean;
  showContactInfo?: boolean;
  onEdit?: (user: UserProfileResponse) => void;
  onDelete?: (userId: string) => void;
  onView?: (user: UserProfileResponse) => void;
}

export interface UserProfileProps extends BaseComponentProps {
  data: UserProfileResponse;
  isLoading?: boolean;
  error?: string | null;
  showFullProfile?: boolean;
  showAssessmentResults?: boolean;
  showCommunityActivity?: boolean;
  showCollaborationHistory?: boolean;
  onEdit?: (user: UserProfileResponse) => void;
  onDelete?: (userId: string) => void;
  onView?: (user: UserProfileResponse) => void;
}

export interface UserListProps extends BaseComponentProps {
  data: UserProfileResponse[];
  isLoading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onEdit?: (user: UserProfileResponse) => void;
  onDelete?: (userId: string) => void;
  onView?: (user: UserProfileResponse) => void;
}

export interface UserAvatarProps extends BaseComponentProps {
  user: UserProfileResponse;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  onClick?: () => void;
}

export interface UserFormProps extends BaseComponentProps {
  onSuccess?: (user: UserProfileResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<UserProfileForm>;
  isLoading?: boolean;
  mode?: 'create' | 'update' | 'profile';
}

// ============================================================================
// CONTENT COMPONENT PROPS
// ============================================================================

export interface ContentItemCardProps extends BaseComponentProps {
  item: ContentItemResponse;
  variant?: 'default' | 'compact' | 'detailed';
  showAuthor?: boolean;
  showStats?: boolean;
  showActions?: boolean;
  onEdit?: (content: ContentItemResponse) => void;
  onDelete?: (contentId: string) => void;
  onView?: (content: ContentItemResponse) => void;
  onPublish?: (contentId: string) => void;
  onArchive?: (contentId: string) => void;
}

export interface ContentItemFormProps extends BaseComponentProps {
  onSuccess?: (content: ContentItemResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<ContentItemForm>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export interface ContentLibraryProps extends BaseComponentProps {
  data: ContentItemResponse[];
  isLoading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onEdit?: (content: ContentItemResponse) => void;
  onDelete?: (contentId: string) => void;
  onView?: (content: ContentItemResponse) => void;
}

// ============================================================================
// ASSESSMENT COMPONENT PROPS
// ============================================================================

export interface AssessmentCardProps extends BaseComponentProps {
  item: AssessmentResponse;
  variant?: 'default' | 'compact' | 'detailed';
  showStats?: boolean;
  showActions?: boolean;
  onEdit?: (assessment: AssessmentResponse) => void;
  onDelete?: (assessmentId: string) => void;
  onView?: (assessment: AssessmentResponse) => void;
  onTake?: (assessmentId: string) => void;
}

export interface AssessmentFormProps extends BaseComponentProps {
  onSuccess?: (assessment: AssessmentResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<AssessmentForm>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export interface AssessmentListProps extends BaseComponentProps {
  data: AssessmentResponse[];
  isLoading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onEdit?: (assessment: AssessmentResponse) => void;
  onDelete?: (assessmentId: string) => void;
  onView?: (assessment: AssessmentResponse) => void;
}

// ============================================================================
// ORGANIZATION COMPONENT PROPS
// ============================================================================

export interface OrganizationCardProps extends BaseComponentProps {
  item: OrganizationResponse;
  variant?: 'default' | 'compact' | 'detailed';
  showStats?: boolean;
  showActions?: boolean;
  onEdit?: (organization: OrganizationResponse) => void;
  onDelete?: (organizationId: string) => void;
  onView?: (organization: OrganizationResponse) => void;
}

export interface OrganizationFormProps extends BaseComponentProps {
  onSuccess?: (organization: OrganizationResponse) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<OrganizationForm>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export interface OrganizationListProps extends BaseComponentProps {
  data: OrganizationResponse[];
  isLoading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onEdit?: (organization: OrganizationResponse) => void;
  onDelete?: (organizationId: string) => void;
  onView?: (organization: OrganizationResponse) => void;
}

// ============================================================================
// GENERIC COMPONENT PROPS
// ============================================================================

export interface EntityCardProps<T> extends BaseComponentProps {
  item: T;
  variant?: 'default' | 'compact' | 'minimal' | 'detailed';
  showActions?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (itemId: string) => void;
  onView?: (item: T) => void;
}

export interface EntityListProps<T> extends BaseComponentProps {
  data: T[];
  isLoading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onEdit?: (item: T) => void;
  onDelete?: (itemId: string) => void;
  onView?: (item: T) => void;
}

// ============================================================================
// DATA TABLE PROPS
// ============================================================================

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (item: T) => React.ReactNode;
}

export interface DataTableProps<T> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  isLoading?: boolean;
  error?: string | null;
  sortBy?: keyof T;
  sortOrder?: 'asc' | 'desc';
  onSort?: (column: keyof T) => void;
  onRowClick?: (item: T) => void;
  selectable?: boolean;
  selectedItems?: T[];
  onSelectionChange?: (items: T[]) => void;
  pagination?: PaginationProps;
}

// ============================================================================
// TABLE COMPONENT PROPS
// ============================================================================

export type ColumnDef<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
};

export interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

// ============================================================================
// FORM COMPONENT PROPS
// ============================================================================

export interface BaseFormProps<T = unknown> extends BaseComponentProps {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
  onCancel?: () => void;
}

export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export interface FormSectionProps extends BaseComponentProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export interface FormFieldGroupProps extends BaseComponentProps {
  columns?: number;
  children: React.ReactNode;
}

// ============================================================================
// VALIDATION SCHEMAS FOR COMPONENT PROPS
// ============================================================================

export const userCardPropsSchema = z.object({
  item: z.object({}), // Will be validated by UserProfileResponse schema
  variant: z.enum(['default', 'compact', 'minimal', 'detailed']).optional(),
  showActions: z.boolean().optional(),
  showStats: z.boolean().optional(),
  showMinistryInfo: z.boolean().optional(),
  showAssessmentScores: z.boolean().optional(),
  showContactInfo: z.boolean().optional(),
  className: z.string().optional(),
});

export const dataTablePropsSchema = z.object({
  data: z.array(z.object({})),
  columns: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      width: z.string().optional(),
      align: z.enum(['left', 'center', 'right']).optional(),
      sortable: z.boolean().optional(),
      filterable: z.boolean().optional(),
    })
  ),
  isLoading: z.boolean().optional(),
  error: z.string().nullable().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  selectable: z.boolean().optional(),
  className: z.string().optional(),
});

// Pagination props validation schema
export const paginationPropsSchema = z.object({
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    hasMore: z.boolean(),
  }),
  onPageChange: z.function(),
  onLimitChange: z.function().optional(),
});

// Loading state validation schema
export const loadingStateSchema = z.object({
  isLoading: z.boolean(),
  error: z.string().nullable().optional(),
});

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

export function validateComponentProps<T>(props: T, schema: z.ZodSchema<T>): T {
  const result = schema.safeParse(props);
  if (!result.success) {
    console.warn('Component props validation failed:', result.error);
    return props; // Return original props if validation fails
  }
  return result.data;
}

// Type-safe component props validation with error handling
export function validateComponentPropsOrThrow<T>(
  props: T,
  schema: z.ZodSchema<T>
): T {
  const result = schema.safeParse(props);
  if (!result.success) {
    console.error('Component props validation failed:', result.error);
    throw new Error('Invalid component props');
  }
  return result.data;
}

// Check if component props match schema without throwing
export function isValidComponentProps<T>(
  props: unknown,
  schema: z.ZodSchema<T>
): props is T {
  return schema.safeParse(props).success;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  AssessmentForm,
  AssessmentResponse,
  ContentItemForm,
  ContentItemResponse,
  CreateAssessment,
  CreateContentItem,
  CreateOrganization,
  CreateUserProfile,
  OrganizationForm,
  OrganizationResponse,
  UpdateAssessment,
  UpdateContentItem,
  UpdateOrganization,
  UpdateUserProfile,
  UserProfileForm,
  UserProfileResponse,
} from '@platform/contracts';
