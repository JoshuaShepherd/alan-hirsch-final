'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { LoadingSkeleton } from './loading-skeleton';

interface AsyncDataProps<T> {
  data?: T;
  isLoading: boolean;
  error?: Error | null;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  children: (data: T) => React.ReactNode;
  className?: string;
  skeletonType?: 'card' | 'list' | 'table' | 'profile' | 'stats' | 'form';
  skeletonCount?: number;
}

export function AsyncData<T>({
  data,
  isLoading,
  error,
  loadingComponent,
  errorComponent,
  emptyComponent,
  children,
  className,
  skeletonType = 'card',
  skeletonCount = 1,
}: AsyncDataProps<T>) {
  // Loading state
  if (isLoading) {
    return (
      <div className={className}>
        {loadingComponent || (
          <LoadingSkeleton type={skeletonType} count={skeletonCount} />
        )}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={className}>
        {errorComponent || (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-destructive mb-4">
              <h3 className="text-lg font-semibold">Error loading data</h3>
              <p className="text-sm text-muted-foreground">{error.message}</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Empty state
  if (!data) {
    return (
      <div className={className}>
        {emptyComponent || (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="text-muted-foreground">
              <h3 className="text-lg font-semibold">No data available</h3>
              <p className="text-sm">The requested data could not be found.</p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Render data
  return <div className={className}>{children(data)}</div>;
}

// Specialized async data components for common patterns

interface AsyncListProps<T> {
  data?: T[];
  isLoading: boolean;
  error?: Error | null;
  renderItem: (item: T, index: number) => React.ReactNode;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  skeletonCount?: number;
}

export function AsyncList<T>({
  data,
  isLoading,
  error,
  renderItem,
  emptyMessage = 'No items found',
  emptyIcon,
  className,
  itemClassName,
  skeletonCount = 6,
}: AsyncListProps<T>) {
  return (
    <AsyncData
      data={data}
      isLoading={isLoading}
      error={error}
      skeletonType="card"
      skeletonCount={skeletonCount}
      className={className}
      emptyComponent={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
          <div className="text-muted-foreground">
            <h3 className="text-lg font-semibold">No items found</h3>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        </div>
      }
    >
      {items => (
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className={itemClassName}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </AsyncData>
  );
}

interface AsyncGridProps<T> {
  data?: T[];
  isLoading: boolean;
  error?: Error | null;
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: number;
  gap?: number;
  emptyMessage?: string;
  emptyIcon?: React.ReactNode;
  className?: string;
  itemClassName?: string;
  skeletonCount?: number;
}

export function AsyncGrid<T>({
  data,
  isLoading,
  error,
  renderItem,
  columns = 3,
  gap = 4,
  emptyMessage = 'No items found',
  emptyIcon,
  className,
  itemClassName,
  skeletonCount = 6,
}: AsyncGridProps<T>) {
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
    <AsyncData
      data={data}
      isLoading={isLoading}
      error={error}
      skeletonType="card"
      skeletonCount={skeletonCount}
      className={className}
      emptyComponent={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          {emptyIcon && <div className="mb-4">{emptyIcon}</div>}
          <div className="text-muted-foreground">
            <h3 className="text-lg font-semibold">No items found</h3>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        </div>
      }
    >
      {items => (
        <div
          className={cn(
            'grid',
            gridCols[columns as keyof typeof gridCols] || gridCols[3],
            gapClasses[gap as keyof typeof gapClasses] || gapClasses[4]
          )}
        >
          {items.map((item, index) => (
            <div key={index} className={itemClassName}>
              {renderItem(item, index)}
            </div>
          ))}
        </div>
      )}
    </AsyncData>
  );
}

interface AsyncTableProps<T> {
  data?: T[];
  isLoading: boolean;
  error?: Error | null;
  columns: Array<{
    key: keyof T;
    label: string;
    render?: (item: T) => React.ReactNode;
  }>;
  emptyMessage?: string;
  className?: string;
  skeletonRows?: number;
}

export function AsyncTable<T extends Record<string, any>>({
  data,
  isLoading,
  error,
  columns,
  emptyMessage = 'No data available',
  className,
  skeletonRows = 5,
}: AsyncTableProps<T>) {
  return (
    <AsyncData
      data={data}
      isLoading={isLoading}
      error={error}
      skeletonType="table"
      skeletonCount={1}
      className={className}
      emptyComponent={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground">
            <h3 className="text-lg font-semibold">No data available</h3>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        </div>
      }
    >
      {items => (
        <div className="border rounded-lg overflow-hidden">
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
      )}
    </AsyncData>
  );
}

interface AsyncProfileProps<T> {
  data?: T;
  isLoading: boolean;
  error?: Error | null;
  renderProfile: (data: T) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export function AsyncProfile<T>({
  data,
  isLoading,
  error,
  renderProfile,
  emptyMessage = 'Profile not found',
  className,
}: AsyncProfileProps<T>) {
  return (
    <AsyncData
      data={data}
      isLoading={isLoading}
      error={error}
      skeletonType="profile"
      className={className}
      emptyComponent={
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-muted-foreground">
            <h3 className="text-lg font-semibold">Profile not found</h3>
            <p className="text-sm">{emptyMessage}</p>
          </div>
        </div>
      }
    >
      {renderProfile}
    </AsyncData>
  );
}

// Conditional rendering wrapper
interface ConditionalRenderProps<T> {
  condition: T | null | undefined;
  children: (data: NonNullable<T>) => React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ConditionalRender<T>({
  condition,
  children,
  fallback,
  className,
}: ConditionalRenderProps<T>) {
  if (!condition) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children(condition)}</div>;
}

// Safe data access hook
export function useSafeData<T>(data: T | null | undefined, defaultValue: T): T {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

// Data validation hook
export function useValidatedData<T>(
  data: T | null | undefined,
  validator: (data: T) => boolean,
  defaultValue: T
): T {
  return React.useMemo(() => {
    if (!data) return defaultValue;
    return validator(data) ? data : defaultValue;
  }, [data, validator, defaultValue]);
}
