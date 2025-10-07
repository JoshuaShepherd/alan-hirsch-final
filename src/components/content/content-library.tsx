'use client';

import { useContentCategories, useContentItems } from '@/hooks/useContent';
import { ContentItemResponse } from '@/lib/contracts';
import { Badge } from '@/lib/ui/badge';
import { Button } from '@/lib/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/card';
import { Checkbox } from '@/lib/ui/checkbox';
import { Input } from '@/lib/ui/input';
import { Label } from '@/lib/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/lib/ui/select';
import {
  Bookmark,
  Calendar,
  Clock,
  Eye,
  Filter,
  Grid,
  Heart,
  List,
  MessageCircle,
  Search,
  Star,
  Tag,
  TrendingUp,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

interface ContentLibraryProps {
  initialView?: 'grid' | 'list';
  showFilters?: boolean;
  showCategories?: boolean;
  limit?: number;
}

export function ContentLibrary({
  initialView = 'grid',
  showFilters = true,
  showCategories = true,
  limit = 20,
}: ContentLibraryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('published');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const { data: contentData, isLoading } = useContentItems({
    page: 1,
    limit,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });

  const { data: categories } = useContentCategories();

  const contentItems = contentData ?? [];

  // Get all unique tags from content
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    contentItems.forEach((item: any) => {
      (item.tags || []).forEach((tag: any) => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [contentItems]);

  // Filter and sort content
  const filteredContent = useMemo(() => {
    const filtered = contentItems.filter((item: any) => {
      const matchesSearch =
        searchTerm === '' ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.tags ?? []).some((tag: any) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesType =
        typeFilter === 'all' || item.contentType === typeFilter;
      const matchesCategory =
        categoryFilter === 'all' || item.primaryCategoryId === categoryFilter;
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every(tag => (item.tags ?? []).includes(tag));
      const matchesBookmarked = !showBookmarkedOnly || item.bookmarkCount > 0; // Simplified logic

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesTags &&
        matchesBookmarked
      );
    });

    // Sort content
    switch (sortBy) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'oldest':
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case 'most_viewed':
        filtered.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        break;
      case 'most_liked':
        filtered.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
        break;
      case 'most_commented':
        filtered.sort((a, b) => (b.commentCount || 0) - (a.commentCount || 0));
        break;
      case 'alphabetical':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return filtered;
  }, [
    contentItems,
    searchTerm,
    typeFilter,
    categoryFilter,
    selectedTags,
    showBookmarkedOnly,
    sortBy,
  ]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const contentTypeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'article', label: 'Articles' },
    { value: 'video', label: 'Videos' },
    { value: 'podcast', label: 'Podcasts' },
    { value: 'framework', label: 'Frameworks' },
    { value: 'tool', label: 'Tools' },
    { value: 'case_study', label: 'Case Studies' },
    { value: 'interview', label: 'Interviews' },
    { value: 'course_lesson', label: 'Course Lessons' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most_viewed', label: 'Most Viewed' },
    { value: 'most_liked', label: 'Most Liked' },
    { value: 'most_commented', label: 'Most Commented' },
    { value: 'alphabetical', label: 'A-Z' },
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contentTypeOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-40">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {sortOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              {showCategories && categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={categoryFilter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoryFilter('all')}
                  >
                    All Categories
                  </Button>
                  {categories.map((category: any) => (
                    <Button
                      key={category.id}
                      variant={
                        categoryFilter === category.id ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => setCategoryFilter(category.id)}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              )}

              {/* Tags Filter */}
              {allTags.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    <span className="text-sm font-medium">Filter by tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map(tag => (
                      <Button
                        key={tag}
                        variant={
                          selectedTags.includes(tag) ? 'default' : 'outline'
                        }
                        size="sm"
                        onClick={() => handleTagToggle(tag)}
                      >
                        {tag}
                      </Button>
                    ))}
                    {allTags.length > 10 && (
                      <Button variant="ghost" size="sm">
                        +{allTags.length - 10} more
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Filters */}
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bookmarked"
                    checked={showBookmarkedOnly}
                    onCheckedChange={checked =>
                      setShowBookmarkedOnly(checked as boolean)
                    }
                  />
                  <Label htmlFor="bookmarked" className="text-sm">
                    Show bookmarked only
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredContent.length} of {contentItems.length} content
          items
        </div>
        {selectedTags.length > 0 && (
          <Button variant="ghost" size="sm" onClick={() => setSelectedTags([])}>
            Clear tag filters
          </Button>
        )}
      </div>

      {/* Content Display */}
      {filteredContent.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No content found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          </CardContent>
        </Card>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContent.map(item => (
            <ContentCard key={item.id} item={item as any} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredContent.map(item => (
            <ContentListItem key={item.id} item={item as any} />
          ))}
        </div>
      )}
    </div>
  );
}

function ContentCard({ item }: { item: ContentItemResponse }) {
  return (
    <Link href={`/dashboard/content/${item.slug}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{item.contentType}</Badge>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {item.estimatedReadingTime ?? 0} min
            </div>
          </div>
          <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {item.excerpt ?? ''}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {item.author?.displayName ??
                (`${item.author?.firstName ?? ''} ${item.author?.lastName ?? ''}`.trim() ||
                  'Unknown')}
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-1" />
                {item.viewCount}
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {item.likeCount}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {item.commentCount}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {(item.tags ?? []).slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="text-xs text-gray-500">
              {item.publishedAt
                ? new Date(item.publishedAt).toLocaleDateString()
                : 'Not published'}
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm">
                <Star className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ContentListItem({ item }: { item: ContentItemResponse }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Link
                href={`/dashboard/content/${item.slug}`}
                className="hover:text-blue-600"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </Link>
              <Badge variant="secondary">{item.contentType}</Badge>
              <Badge variant="outline">{item.status}</Badge>
            </div>

            <p className="text-gray-600 mb-3 line-clamp-2">
              {item.excerpt ?? 'No excerpt available'}
            </p>

            <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {item.author?.displayName ??
                  (`${item.author?.firstName ?? ''} ${item.author?.lastName ?? ''}`.trim() ||
                    'Unknown')}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString()
                  : 'Not published'}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {item.estimatedReadingTime ?? 0} min read
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {item.viewCount} views
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {(item.tags ?? []).slice(0, 5).map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-1" />
                {item.likeCount}
              </div>
              <div className="flex items-center">
                <MessageCircle className="w-4 h-4 mr-1" />
                {item.commentCount}
              </div>
              <div className="flex items-center">
                <Bookmark className="w-4 h-4 mr-1" />
                {item.bookmarkCount}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Star className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
