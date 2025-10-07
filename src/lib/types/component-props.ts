import type {
  AssessmentEntity,
  ContentItemForm,
  ContentItemResponse,
  OrganizationForm,
  OrganizationResponse,
  UserProfileForm,
  UserProfileResponse,
} from '@/lib/contracts';
import {
  isValidSchema,
  validateSchema,
  validateSchemaOrThrow,
} from '@/lib/contracts';
import { z } from 'zod';

// ============================================================================
// BASE COMPONENT PROPS
// ============================================================================

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface LoadingStateProps extends BaseComponentProps {
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
  showExcerpt?: boolean;
  showTags?: boolean;
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
  item: AssessmentEntity;
  variant?: 'default' | 'compact' | 'minimal' | 'detailed';
  showActions?: boolean;
  showQuestionCount?: boolean;
  showDuration?: boolean;
  showValidityScores?: boolean;
  showCulturalAdaptation?: boolean;
  onSelect?: (assessment: AssessmentEntity) => void;
  onEdit?: (assessment: AssessmentEntity) => void;
  onDelete?: (assessmentId: string) => void;
  onView?: (assessment: AssessmentEntity) => void;
  onTake?: (assessmentId: string) => void;
}

export interface AssessmentFormProps extends BaseComponentProps {
  onSuccess?: (assessment: AssessmentEntity) => void;
  onError?: (error: Error) => void;
  defaultValues?: Partial<AssessmentEntity>;
  isLoading?: boolean;
  mode?: 'create' | 'update';
}

export interface AssessmentListProps extends BaseComponentProps {
  data: AssessmentEntity[];
  isLoading?: boolean;
  error?: string | null;
  pagination?: PaginationInfo;
  onPageChange?: (page: number) => void;
  onEdit?: (assessment: AssessmentEntity) => void;
  onDelete?: (assessmentId: string) => void;
  onView?: (assessment: AssessmentEntity) => void;
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

export interface EntityCardProps<T extends BaseEntity>
  extends BaseComponentProps {
  entity: T;
  variant?: 'default' | 'compact' | 'minimal' | 'detailed';
  showActions?: boolean;
  onSelect?: (entity: T) => void;
  onEdit?: (entity: T) => void;
  onDelete?: (entityId: string) => void;
  onView?: (entity: T) => void;
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
  onItemDelete?: (itemId: string) => void;
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
  render?: (value: unknown, item: T) => React.ReactNode;
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
// VALIDATION SCHEMAS FOR COMPONENT PROPS (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================

// User Card Props Validation (simplified for alignment)
export const userCardPropsSchema = z.object({
  item: z.record(z.unknown()), // Simplified to avoid complex type mismatches
  variant: z.enum(['default', 'compact', 'minimal', 'detailed']).optional(),
  showActions: z.boolean().optional(),
  showStats: z.boolean().optional(),
  showMinistryInfo: z.boolean().optional(),
  showAssessmentScores: z.boolean().optional(),
  showContactInfo: z.boolean().optional(),
  className: z.string().optional(),
});

// Assessment Card Props Validation (simplified)
export const assessmentCardPropsSchema = z.object({
  item: z.record(z.unknown()), // Simplified to avoid complex type mismatches
  variant: z.enum(['default', 'compact', 'minimal', 'detailed']).optional(),
  showActions: z.boolean().optional(),
  showQuestionCount: z.boolean().optional(),
  showDuration: z.boolean().optional(),
  showValidityScores: z.boolean().optional(),
  showCulturalAdaptation: z.boolean().optional(),
  className: z.string().optional(),
});

// Content Item Card Props Validation (simplified)
export const contentItemCardPropsSchema = z.object({
  item: z.record(z.unknown()), // Simplified to avoid complex type mismatches
  variant: z.enum(['default', 'compact', 'detailed']).optional(),
  showAuthor: z.boolean().optional(),
  showStats: z.boolean().optional(),
  showActions: z.boolean().optional(),
  showExcerpt: z.boolean().optional(),
  showTags: z.boolean().optional(),
  className: z.string().optional(),
});

// Data Table Props Validation (simplified)
export const dataTablePropsSchema = z.object({
  data: z.array(z.record(z.unknown())), // Simplified
  columns: z.array(z.record(z.unknown())), // Simplified
  isLoading: z.boolean().optional(),
  error: z.string().nullable().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  selectable: z.boolean().optional(),
  className: z.string().optional(),
});

// Enhanced Pagination Props Validation (from ALIGNMENT_REFERENCE.md)
export const paginationPropsSchema = z.object({
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasMore: z.boolean(),
    hasPrev: z.boolean(),
  }),
  onPageChange: z.function(),
  onLimitChange: z.function().optional(),
});

// Enhanced Loading State Validation
export const loadingStateSchema = z.object({
  isLoading: z.boolean(),
  error: z.string().nullable().optional(),
});

// Form Validation Schema (Aligned with ALIGNMENT_REFERENCE.md patterns)
export const formValidationSchema = z.object({
  onSuccess: z.function().optional(),
  onError: z.function().optional(),
  isLoading: z.boolean().optional(),
  submitText: z.string().optional(),
  cancelText: z.string().optional(),
  onCancel: z.function().optional(),
  className: z.string().optional(),
});

// ============================================================================
// VALIDATION UTILITIES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================

// Enhanced validation utilities following ALIGNMENT_REFERENCE.md patterns
export function validateComponentProps<T>(props: T, schema: z.ZodSchema<T>): T {
  const result = validateSchema(schema, props);
  if (!result.success) {
    console.warn('Component props validation failed:', result.error);
    return props; // Return original props if validation fails
  }
  return result.data;
}

// Type-safe component props validation with error handling (following reference pattern)
export function validateComponentPropsOrThrow<T>(
  props: T,
  schema: z.ZodSchema<T>
): T {
  try {
    return validateSchemaOrThrow(schema, props);
  } catch (error) {
    console.error('Component props validation failed:', error);
    throw new Error('Invalid component props');
  }
}

// Check if component props match schema without throwing (following reference pattern)
export function isValidComponentProps<T>(
  props: unknown,
  schema: z.ZodSchema<T>
): props is T {
  return isValidSchema(schema, props);
}

// Enhanced validation with computed field checking
export function validateComponentPropsWithComputedFields<
  T extends Record<string, unknown>,
>(
  props: T,
  schema: z.ZodSchema<T>,
  computedFieldsSchema?: z.ZodSchema<Partial<T>>
): T {
  const result = validateSchema(schema, props);
  if (!result.success) {
    console.warn('Component props validation failed:', result.error);
    return props;
  }

  // Validate computed fields if schema provided
  if (computedFieldsSchema) {
    const computedResult = validateSchema(computedFieldsSchema, props);
    if (!computedResult.success) {
      console.warn('Computed fields validation failed:', computedResult.error);
    }
  }

  return result.data;
}

// Safe validation with detailed error reporting (following reference pattern)
export function safeValidateComponentProps<T>(
  props: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; error: z.ZodError } {
  return validateSchema(schema, props);
}

// Validation with development logging (following reference pattern)
export function validateComponentPropsWithDevLogging<T>(
  props: T,
  schema: z.ZodSchema<T>,
  context: string
): T {
  const result = validateSchema(schema, props);
  if (!result.success && process.env['NODE_ENV'] === 'development') {
    console.group(`❌ Component Props Validation Error: ${context}`);
    console.error('Validation failed:', result.error);
    console.log('Props:', props);
    console.groupEnd();
  }

  if (!result.success) {
    console.warn(`Component props validation failed in ${context}`);
    return props;
  }

  return result.data;
}

// Validation utilities for specific component types (simplified)
export function validateUserCardProps(props: unknown): unknown {
  return validateComponentProps(props, userCardPropsSchema);
}

export function validateAssessmentCardProps(props: unknown): unknown {
  return validateComponentProps(props, assessmentCardPropsSchema);
}

export function validateContentItemCardProps(props: unknown): unknown {
  return validateComponentProps(props, contentItemCardPropsSchema);
}

export function validateDataTableProps(props: unknown): unknown {
  return validateComponentProps(props, dataTablePropsSchema);
}

// Validation for form components (following reference pattern)
export function validateFormProps<T>(props: T, schema: z.ZodSchema<T>): T {
  const result = validateSchema(schema, props);
  if (!result.success) {
    console.error('Form props validation failed:', result.error);
    throw new Error('Invalid form props');
  }
  return result.data;
}

// ============================================================================
// MAPPER UTILITY TYPES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================

// Import mapper types from main types file
import type {
  APESTProfile,
  APESTScores,
  SchemaValidationOptions,
} from '@/types';

// Component-specific mapper types
export interface ComponentMapper<TProps, TData> {
  mapPropsToData: (props: TProps) => TData;
  mapDataToProps: (data: TData) => TProps;
  validateProps: (props: unknown) => TProps;
  validateData: (data: unknown) => TData;
}

// Enhanced component props with mapper support
export interface MappableComponentProps<T = unknown>
  extends BaseComponentProps {
  data?: T;
  mapper?: ComponentMapper<unknown, T>;
  validationSchema?: z.ZodSchema<T>;
}

// Props validation with mapper integration
export interface PropsWithMapper<T> {
  props: T;
  mapper?: ComponentMapper<unknown, T>;
  validationOptions?: SchemaValidationOptions;
}

// ============================================================================
// APEST UTILITY TYPES (Aligned with ALIGNMENT_REFERENCE.md)
// ============================================================================

// APEST-related component props
export interface APESTDisplayProps extends BaseComponentProps {
  profile: APESTProfile;
  showScores?: boolean;
  showGifts?: boolean;
  showTotal?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  onGiftClick?: (gift: string) => void;
}

// APEST scores display component props
export interface APESTScoresProps extends BaseComponentProps {
  scores: APESTScores;
  showLabels?: boolean;
  showValues?: boolean;
  variant?: 'bar' | 'radar' | 'list';
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// ENHANCED COMPONENT PROPS WITH COMPUTED FIELDS
// ============================================================================

// Enhanced user card props with computed fields
export interface EnhancedUserCardProps extends UserCardProps {
  computedFields?: {
    isActive: boolean;
    hasCompletedOnboarding: boolean;
    fullName: string;
    displayNameOrFullName: string;
    assessmentCompleted: boolean;
    primaryGift?: string;
    secondaryGift?: string;
  };
}

// Enhanced content item props with computed fields
export interface EnhancedContentItemCardProps extends ContentItemCardProps {
  computedFields?: {
    isPublished: boolean;
    isDraft: boolean;
    hasFeaturedImage: boolean;
    readingTimeText: string;
    viewCountText: string;
    engagementScore: number;
  };
}

// Enhanced assessment props with computed fields
export interface EnhancedAssessmentCardProps extends AssessmentCardProps {
  computedFields?: {
    isActive: boolean;
    isPublished: boolean;
    hasQuestions: boolean;
    questionCountText: string;
    durationText?: string;
  };
}

// ============================================================================
// VALIDATION SCHEMA UTILITIES
// ============================================================================

// Schema validation with computed fields
export function createComponentPropsSchemaWithComputed(
  baseSchema: z.ZodObject<Record<string, z.ZodTypeAny>>,
  computedFieldsSchema: z.ZodObject<Record<string, z.ZodTypeAny>>
): z.ZodObject<Record<string, z.ZodTypeAny>> {
  return baseSchema.merge(computedFieldsSchema);
}

// Safe validation with fallback
export function safeValidateWithFallback<T>(
  data: unknown,
  schema: z.ZodSchema<T>,
  fallback: T
): T {
  const result = validateSchema(schema, data);
  return result.success ? result.data : fallback;
}

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type {
  AssessmentEntity,
  AssessmentResponse,
  ContentItemForm,
  ContentItemResponse,
  CreateAssessment,
  CreateContentItem,
  CreateOrganization,
  CreateUserProfile,
  OrganizationForm,
  OrganizationResponse,
  PaginatedResponse,
  UpdateAssessment,
  UpdateContentItem,
  UpdateOrganization,
  UpdateUserProfile,
  UserProfileForm,
  UserProfileResponse,
} from '@/lib/contracts';
