// Display Components - Alan Hirsch Digital Platform
// Export all display components organized by entity type

// Base components (generic, reusable)
export * from './base';

// Shared components (utility components)
export * from './shared';

// Entity-specific components
export { AssessmentCard } from './assessment/assessment-card';
export { ContentItemCard } from './content/content-item-card';
export * from './user';

// Re-export commonly used types
export type {
  BaseComponentProps,
  ColumnDef,
  DataTableProps,
  EmptyStateProps,
  EntityCardProps,
  EntityDisplayProps,
  EntityListProps,
  LoadingStateProps,
} from '@/lib/types/component-props';
