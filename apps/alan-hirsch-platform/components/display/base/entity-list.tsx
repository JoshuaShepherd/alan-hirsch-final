'use client';

import { Button } from '@platform/ui/button';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { EntityListProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import { Filter, Grid, List, RefreshCw, Search, Table } from 'lucide-react';
import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { LoadingSkeleton } from './loading-skeleton';

export function EntityList<T extends Record<string, any>>({
  items,
  isLoading = false,
  error = null,
  emptyMessage = 'No items found',
  emptyIcon,
  renderItem,
  onItemClick,
  onItemEdit,
  onItemDelete,
  className,
  ...props
}: EntityListProps<T>) {
  // Loading state
  if (isLoading) {
    return <LoadingSkeleton className={className} />;
  }

  // Error state
  if (error) {
    return (
      <ErrorBoundary
        error={error}
        fallback={
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-destructive mb-4">
              <h3 className="text-lg font-semibold">Error loading items</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        }
      />
    );
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-12 text-center',
          className
        )}
      >
        {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
        <div className="text-muted-foreground">
          <h3 className="text-lg font-semibold">No items found</h3>
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

// Specialized list component with search and filters
interface EntityListWithFiltersProps<T> extends EntityListProps<T> {
  view?: 'grid' | 'list' | 'table';
  showSearch?: boolean;
  showFilters?: boolean;
  searchPlaceholder?: string;
  filters?: Array<{
    key: string;
    label: string;
    options: Array<{ value: string; label: string }>;
  }>;
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: Record<string, string>) => void;
  onViewChange?: (view: 'grid' | 'list' | 'table') => void;
}

export function EntityListWithFilters<T extends Record<string, any>>({
  items,
  isLoading = false,
  error = null,
  emptyMessage = 'No items found',
  emptyIcon,
  renderItem,
  onItemClick,
  onItemEdit,
  onItemDelete,
  view = 'grid',
  showSearch = true,
  showFilters = true,
  searchPlaceholder = 'Search items...',
  filters = [],
  onSearch,
  onFilterChange,
  onViewChange,
  className,
}: EntityListWithFiltersProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeFilters, setActiveFilters] = React.useState<
    Record<string, string>
  >({});

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Handle filter change
  const handleFilterChange = (filterKey: string, value: string) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setActiveFilters({});
    onSearch?.('');
    onFilterChange?.({});
  };

  const hasActiveFilters =
    searchQuery || Object.values(activeFilters).some(Boolean);

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          {/* Search */}
          {showSearch && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => handleSearch(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
            </div>
          )}

          {/* Filters */}
          {showFilters && filters.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {filters.map(filter => (
                <Select
                  key={filter.key}
                  value={activeFilters[filter.key] || ''}
                  onValueChange={value => handleFilterChange(filter.key, value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder={filter.label} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    {filter.options.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}

              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <Filter className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          )}
        </div>

        {/* View Controls */}
        {onViewChange && (
          <div className="flex items-center space-x-1">
            <Button
              variant={view === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('list')}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={view === 'table' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('table')}
            >
              <Table className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* List Content */}
      <EntityList
        items={items}
        isLoading={isLoading}
        error={error}
        emptyMessage={emptyMessage}
        emptyIcon={emptyIcon}
        renderItem={renderItem}
        onItemClick={onItemClick}
        onItemEdit={onItemEdit}
        onItemDelete={onItemDelete}
      />
    </div>
  );
}

// Grid view wrapper
interface EntityGridProps<T> extends EntityListProps<T> {
  columns?: number;
  gap?: number;
}

export function EntityGrid<T extends Record<string, any>>({
  items,
  renderItem,
  columns = 3,
  gap = 4,
  className,
  ...props
}: EntityGridProps<T>) {
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6',
  };

  const gapClasses = {
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  return (
    <div
      className={cn(
        'grid',
        gridCols[columns as keyof typeof gridCols] || gridCols[3],
        gapClasses[gap as keyof typeof gapClasses] || gapClasses[4],
        className
      )}
    >
      {items.map((item, index) => (
        <div key={index}>{renderItem(item, index)}</div>
      ))}
    </div>
  );
}

// Table view wrapper
interface EntityTableProps<T> extends EntityListProps<T> {
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }>;
}

export function EntityTable<T extends Record<string, any>>({
  items,
  columns,
  renderItem,
  className,
  ...props
}: EntityTableProps<T>) {
  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            {columns.map(column => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y">
          {items.map((item, index) => (
            <tr key={index} className="hover:bg-muted/50">
              {columns.map(column => (
                <td key={String(column.key)} className="px-4 py-3">
                  {column.render
                    ? column.render(item)
                    : String(item[column.key] || '-')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
