'use client';

import { DataTableProps } from '@/lib/types/component-props';
import { cn } from '@platform/shared/utils';
import { Button } from '@platform/ui/button';
import { Checkbox } from '@platform/ui/checkbox';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@platform/ui/table';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  MoreHorizontal,
  Search,
} from 'lucide-react';
import { useMemo, useState } from 'react';

interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

interface FilterConfig {
  [key: string]: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  isLoading = false,
  error = null,
  sortBy,
  sortOrder = 'desc',
  onSort,
  onRowClick,
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  pagination,
  className,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(
    sortBy ? { key: sortBy, direction: sortOrder } : null
  );
  const [filters, setFilters] = useState<FilterConfig>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Handle sorting
  const handleSort = (column: keyof T) => {
    if (!onSort) return;

    const newDirection =
      sortConfig?.key === column && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc';

    setSortConfig({ key: column, direction: newDirection });
    onSort(column);
  };

  // Handle row selection
  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return;
    onSelectionChange(checked ? data : []);
  };

  const handleSelectItem = (item: T, checked: boolean) => {
    if (!onSelectionChange) return;

    if (checked) {
      onSelectionChange([...selectedItems, item]);
    } else {
      onSelectionChange(selectedItems.filter(selected => selected !== item));
    }
  };

  const isItemSelected = (item: T) => {
    return selectedItems.includes(item);
  };

  const isAllSelected = data.length > 0 && selectedItems.length === data.length;

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = data;

    // Apply search term
    if (searchTerm) {
      result = result.filter(item =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply column filters
    Object.entries(filters).forEach(([column, value]) => {
      if (value) {
        result = result.filter(item => {
          const itemValue = item[column];
          return String(itemValue).toLowerCase().includes(value.toLowerCase());
        });
      }
    });

    return result;
  }, [data, searchTerm, filters]);

  // Render sort icon
  const renderSortIcon = (column: keyof T) => {
    if (sortConfig?.key !== column) {
      return <MoreHorizontal className="h-4 w-4 opacity-50" />;
    }

    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-64 bg-muted animate-pulse rounded" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="h-10 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-12">
                    <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  </TableHead>
                )}
                {columns.map((column, index) => (
                  <TableHead key={String(column.key)} className={column.width}>
                    <div className="h-4 bg-muted animate-pulse rounded" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {selectable && (
                    <TableCell>
                      <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                    </TableCell>
                  )}
                  {columns.map(column => (
                    <TableCell key={String(column.key)}>
                      <div className="h-4 bg-muted animate-pulse rounded" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="text-destructive mb-4">
          <h3 className="text-lg font-semibold">Error loading data</h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  // Empty state
  if (filteredData.length === 0) {
    return (
      <div
        className={cn(
          'flex flex-col items-center justify-center py-12 text-center',
          className
        )}
      >
        <div className="text-muted-foreground mb-4">
          <h3 className="text-lg font-semibold">No data found</h3>
          <p className="text-sm">
            {searchTerm || Object.values(filters).some(Boolean)
              ? 'Try adjusting your search or filters'
              : 'No items to display'}
          </p>
        </div>
        {(searchTerm || Object.values(filters).some(Boolean)) && (
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setFilters({});
            }}
          >
            Clear Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search and Filters */}
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-2 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>

          {columns
            .filter(col => col.filterable)
            .map(column => (
              <Select
                key={String(column.key)}
                value={filters[String(column.key)] || ''}
                onValueChange={value =>
                  setFilters(prev => ({ ...prev, [column.key]: value }))
                }
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder={column.label} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  {Array.from(
                    new Set(data.map(item => String(item[column.key])))
                  ).map(value => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
        </div>

        {pagination && (
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>
              Showing{' '}
              {(pagination.pagination.page - 1) * pagination.pagination.limit +
                1}{' '}
              to{' '}
              {Math.min(
                pagination.pagination.page * pagination.pagination.limit,
                pagination.pagination.total
              )}{' '}
              of {pagination.pagination.total} results
            </span>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {selectable && (
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </TableHead>
              )}
              {columns.map(column => (
                <TableHead
                  key={String(column.key)}
                  className={cn(
                    column.width,
                    column.sortable && 'cursor-pointer hover:bg-muted/50'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center space-x-2">
                    <span>{column.label}</span>
                    {column.sortable && renderSortIcon(column.key)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow
                key={index}
                className={cn(onRowClick && 'cursor-pointer hover:bg-muted/50')}
                onClick={() => onRowClick?.(item)}
              >
                {selectable && (
                  <TableCell>
                    <Checkbox
                      checked={isItemSelected(item)}
                      onCheckedChange={checked =>
                        handleSelectItem(item, checked as boolean)
                      }
                      onClick={e => e.stopPropagation()}
                      aria-label={`Select item ${index + 1}`}
                    />
                  </TableCell>
                )}
                {columns.map(column => (
                  <TableCell
                    key={String(column.key)}
                    className={cn(
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right'
                    )}
                  >
                    {column.render
                      ? column.render(item)
                      : String(item[column.key] || '-')}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                pagination.onPageChange(pagination.pagination.page - 1)
              }
              disabled={pagination.pagination.page <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {pagination.pagination.page} of{' '}
              {Math.ceil(
                pagination.pagination.total / pagination.pagination.limit
              )}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                pagination.onPageChange(pagination.pagination.page + 1)
              }
              disabled={
                pagination.pagination.page >=
                Math.ceil(
                  pagination.pagination.total / pagination.pagination.limit
                )
              }
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {pagination.onLimitChange && (
            <Select
              value={String(pagination.pagination.limit)}
              onValueChange={value => pagination.onLimitChange?.(Number(value))}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      )}
    </div>
  );
}
