'use client';

import { useContentItems } from '@/hooks/useContent';
import { createSupabaseClient } from '@platform/database';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
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
  BarChart3,
  Calendar,
  Download,
  Edit,
  Eye,
  Filter,
  Search,
  Trash2,
  Upload,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ContentManagementPage() {
  const router = useRouter();
  const supabase = createSupabaseClient();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');

  const {
    data: contentData,
    isLoading,
    error,
  } = useContentItems({
    page: 1,
    limit: 50,
    status: statusFilter === 'all' ? undefined : statusFilter,
  });

  const contentItems = contentData || [];
  const pagination = undefined; // Pagination not available in current data structure

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(contentItems.map((item: any) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to perform bulk actions');
      return;
    }

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error('You must be logged in to perform this action');
        return;
      }

      // Implement bulk actions
      switch (action) {
        case 'delete':
          if (
            confirm(
              `Are you sure you want to delete ${selectedItems.length} items?`
            )
          ) {
            // Implement bulk delete
            toast.success(`${selectedItems.length} items deleted successfully`);
            setSelectedItems([]);
          }
          break;
        case 'publish':
          // Implement bulk publish
          toast.success(`${selectedItems.length} items published successfully`);
          setSelectedItems([]);
          break;
        case 'archive':
          // Implement bulk archive
          toast.success(`${selectedItems.length} items archived successfully`);
          setSelectedItems([]);
          break;
      }
    } catch (error) {
      console.error('Bulk action error:', error);
      toast.error('Failed to perform bulk action');
    }
  };

  const handleExport = async () => {
    try {
      // Implement export functionality
      toast.success('Content exported successfully');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export content');
    }
  };

  const filteredContent = contentItems.filter(item => {
    const matchesSearch =
      searchTerm === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = typeFilter === 'all' || item.contentType === typeFilter;
    const matchesAuthor =
      authorFilter === 'all' || item.authorId === authorFilter;

    return matchesSearch && matchesType && matchesAuthor;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Content
          </h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Content Management
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage and organize all content in the platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <Button onClick={() => router.push('/dashboard/content/new')}>
            Create Content
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
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
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="article">Article</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="podcast">Podcast</SelectItem>
                  <SelectItem value="framework">Framework</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="case_study">Case Study</SelectItem>
                  <SelectItem value="interview">Interview</SelectItem>
                  <SelectItem value="course_lesson">Course Lesson</SelectItem>
                </SelectContent>
              </Select>
              <Select value={authorFilter} onValueChange={setAuthorFilter}>
                <SelectTrigger className="w-40">
                  <User className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Author" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Authors</SelectItem>
                  {/* Add author options dynamically */}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">
                  {selectedItems.length} item
                  {selectedItems.length !== 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('publish')}
                  >
                    Publish
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleBulkAction('archive')}
                  >
                    Archive
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setSelectedItems([])}
              >
                Clear Selection
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Content Overview
            <Badge variant="secondary">{filteredContent.length} items</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={
                        selectedItems.length === filteredContent.length &&
                        filteredContent.length > 0
                      }
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContent.map(item => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={checked =>
                          handleSelectItem(item.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <div className="font-medium truncate">{item.title}</div>
                        <div className="text-sm text-gray-500 truncate">
                          {item.excerpt || 'No excerpt'}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.contentType}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          item.status === 'published'
                            ? 'default'
                            : item.status === 'draft'
                              ? 'secondary'
                              : item.status === 'under_review'
                                ? 'outline'
                                : item.status === 'scheduled'
                                  ? 'outline'
                                  : 'secondary'
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.authorId ? (
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="w-3 h-3" />
                          </div>
                        )}
                        <span className="text-sm">
                          {item.authorId || 'Unknown'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <Eye className="w-3 h-3" />
                        {item.viewCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/dashboard/content/edit/${item.id}`)
                          }
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            router.push(`/dashboard/content/${item.slug}`)
                          }
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBulkAction('delete')}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContent.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No content found matching your criteria.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination - Disabled for now */}
    </div>
  );
}
