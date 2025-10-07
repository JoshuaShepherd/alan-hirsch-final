import { BaseForm, FormFieldGroup } from '@/lib/forms';
import { Badge } from '@/lib/ui/badge';
import { Button } from '@/lib/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/lib/ui/card';
import { Input } from '@/lib/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Filter, RotateCcw, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebouncedCallback } from 'use-debounce';
import { z } from 'zod';
import { FormField } from '../form-field';
// Generic search schema that can be extended
const baseSearchSchema = z.object({
  query: z.string().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
/**
 * Generic search form component with real-time search, filtering, and URL synchronization
 */
export function SearchForm({
  schema,
  onSearch,
  onReset,
  defaultValues,
  className,
  showFilters = true,
  showSorting = true,
  showPagination = false,
  syncWithURL = false,
  debounceMs = 300,
  placeholder = 'Search...',
  searchButtonText = 'Search',
  resetButtonText = 'Reset',
}) {
  const [isSearching, setIsSearching] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      page: 1,
      limit: 10,
      sortOrder: 'desc',
      ...defaultValues,
    },
  });
  // Debounced search function
  const debouncedSearch = useDebouncedCallback(values => {
    setIsSearching(true);
    onSearch(values);
    setIsSearching(false);
  }, debounceMs);
  // Watch for form changes and trigger search
  useEffect(() => {
    const subscription = form.watch(values => {
      const formData = values;
      debouncedSearch(formData);
      // Update active filters
      const filters = [];
      Object.entries(formData).forEach(([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== '' &&
          key !== 'query' &&
          key !== 'page' &&
          key !== 'limit'
        ) {
          filters.push(key);
        }
      });
      setActiveFilters(filters);
    });
    return () => subscription.unsubscribe();
  }, [form, debouncedSearch]);
  // URL synchronization
  useEffect(() => {
    if (!syncWithURL || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const urlData = {};
    params.forEach((value, key) => {
      const fieldName = key;
      const currentValue = form.getValues(fieldName);
      if (Array.isArray(currentValue)) {
        urlData[fieldName] = value.split(',');
      } else if (typeof currentValue === 'number') {
        urlData[fieldName] = Number(value);
      } else if (typeof currentValue === 'boolean') {
        urlData[fieldName] = value === 'true';
      } else {
        urlData[fieldName] = value;
      }
    });
    form.reset({ ...form.getValues(), ...urlData });
  }, [form, syncWithURL]);
  const handleSubmit = data => {
    onSearch(data);
  };
  const handleReset = () => {
    form.reset({
      page: 1,
      limit: 10,
      sortOrder: 'desc',
      ...defaultValues,
    });
    onReset?.();
  };
  const removeFilter = filterKey => {
    form.setValue(filterKey, undefined);
  };
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Search className="h-5 w-5" />
          <span>Search</span>
        </CardTitle>
        <CardDescription>
          Find content, users, assessments, and more
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseForm
          form={form}
          onSubmit={handleSubmit}
          submitText={searchButtonText}
          showCancel={true}
          cancelText={resetButtonText}
          onCancel={handleReset}
          isLoading={isSearching}
          className="space-y-4"
        >
          {/* Search Query */}
          <FormField
            name="query"
            label="Search"
            description="Enter keywords to search"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                {...form.register('query')}
                placeholder={placeholder}
                className="pl-10"
              />
            </div>
          </FormField>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Active Filters:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(filter => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <span>{filter}</span>
                    <button
                      type="button"
                      onClick={() => removeFilter(filter)}
                      className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  className="h-6 px-2 text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {/* Sorting */}
          {showSorting && (
            <FormFieldGroup columns={2}>
              <FormField
                name="sortBy"
                label="Sort By"
                description="Choose how to sort results"
              >
                <Select onValueChange={value => form.setValue('sortBy', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sort field" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Date Created</SelectItem>
                    <SelectItem value="updatedAt">Date Updated</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="popularity">Popularity</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField
                name="sortOrder"
                label="Sort Order"
                description="Ascending or descending order"
              >
                <Select
                  onValueChange={value => form.setValue('sortOrder', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">Ascending</SelectItem>
                    <SelectItem value="desc">Descending</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>
          )}

          {/* Pagination */}
          {showPagination && (
            <FormFieldGroup columns={2}>
              <FormField name="page" label="Page" description="Page number">
                <Input
                  type="number"
                  {...form.register('page', { valueAsNumber: true })}
                  min="1"
                />
              </FormField>

              <FormField
                name="limit"
                label="Results Per Page"
                description="Number of results per page"
              >
                <Select
                  onValueChange={value => form.setValue('limit', Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </FormFieldGroup>
          )}
        </BaseForm>
      </CardContent>
    </Card>
  );
}
// Specialized search forms for different content types
export const contentSearchSchema = baseSearchSchema.extend({
  contentType: z
    .enum([
      'article',
      'video',
      'podcast',
      'framework',
      'tool',
      'case_study',
      'interview',
      'course_lesson',
    ])
    .optional(),
  categoryId: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorId: z.string().optional(),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .optional(),
  visibility: z
    .enum(['public', 'private', 'unlisted', 'organization'])
    .optional(),
});
export const userSearchSchema = baseSearchSchema.extend({
  ministryRole: z.string().optional(),
  denomination: z.string().optional(),
  countryCode: z.string().optional(),
  subscriptionTier: z
    .enum(['free', 'individual', 'professional', 'leader', 'institutional'])
    .optional(),
  leaderTier: z.enum(['core', 'network', 'emerging', 'community']).optional(),
});
export const assessmentSearchSchema = baseSearchSchema.extend({
  assessmentType: z
    .enum([
      'apest',
      'mdna',
      'cultural_intelligence',
      'leadership_style',
      'spiritual_gifts',
      'other',
    ])
    .optional(),
  status: z.enum(['draft', 'active', 'archived', 'under_review']).optional(),
  language: z.string().optional(),
  culturalAdaptation: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
      'global',
    ])
    .optional(),
  researchBacked: z.boolean().optional(),
});
// Pre-configured search forms
export function ContentSearchForm(props) {
  return <SearchForm {...props} schema={contentSearchSchema} />;
}
export function UserSearchForm(props) {
  return <SearchForm {...props} schema={userSearchSchema} />;
}
export function AssessmentSearchForm(props) {
  return <SearchForm {...props} schema={assessmentSearchSchema} />;
}
