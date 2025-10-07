'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} />;
}

// Card skeleton
export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('border rounded-lg p-4 space-y-3', className)}>
      <div className="flex items-center space-x-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}

// List item skeleton
export function ListItemSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('flex items-center space-x-4 p-4 border-b', className)}>
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

// Table skeleton
export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
}: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <div className="border-b bg-muted/50">
        <div className="flex">
          {Array.from({ length: columns }).map((_, index) => (
            <div key={index} className="flex-1 p-4">
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
      </div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex border-b last:border-b-0">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="flex-1 p-4">
              <Skeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Profile skeleton
export function ProfileSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="flex items-center space-x-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-16 mx-auto" />
        </div>
      </div>
    </div>
  );
}

// Stats skeleton
export function StatsSkeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
        className
      )}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-3 w-12" />
        </div>
      ))}
    </div>
  );
}

// Form skeleton
export function FormSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex space-x-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}

// Generic loading skeleton that adapts to content
export function LoadingSkeleton({
  type = 'card',
  count = 1,
  className,
}: {
  type?: 'card' | 'list' | 'table' | 'profile' | 'stats' | 'form';
  count?: number;
  className?: string;
}) {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'list':
        return <ListItemSkeleton />;
      case 'table':
        return <TableSkeleton />;
      case 'profile':
        return <ProfileSkeleton />;
      case 'stats':
        return <StatsSkeleton />;
      case 'form':
        return <FormSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  if (count === 1) {
    return <div className={className}>{renderSkeleton()}</div>;
  }

  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>{renderSkeleton()}</div>
      ))}
    </div>
  );
}

// Content-specific loading skeletons
export function UserListSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function ContentListSkeleton({
  count = 8,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function AssessmentListSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function CommunityListSkeleton({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}

export function OrganizationListSkeleton({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
