'use client';

import {
  useAssessments,
  useCreateAssessment,
  useDeleteAssessment,
  useUpdateAssessment,
} from '@/hooks/useAssessment';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@platform/ui/alert-dialog';
import { Badge } from '@platform/ui/badge';
import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@platform/ui/dropdown-menu';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import {
  AlertCircle,
  BookOpen,
  Clock,
  Edit,
  Eye,
  Filter,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
  Star,
  Trash2,
  Users,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AssessmentManagePage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('active');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [assessmentToDelete, setAssessmentToDelete] = useState<string | null>(
    null
  );

  // Build filters object
  const filters = {
    page: 1,
    limit: 50,
    query: searchTerm || '',
    assessment_type: selectedType
      ? [
          selectedType as
            | 'apest'
            | 'mdna'
            | 'cultural_intelligence'
            | 'leadership_style'
            | 'spiritual_gifts'
            | 'other',
        ]
      : undefined,
    status: [
      selectedStatus as 'draft' | 'active' | 'archived' | 'under_review',
    ],
    sort_by: 'created_at' as const,
    sort_order: 'desc' as const,
  };

  const {
    data: assessmentsResponse,
    isLoading,
    error,
  } = useAssessments(filters);
  const createAssessmentMutation = useCreateAssessment();
  const updateAssessmentMutation = useUpdateAssessment();
  const deleteAssessmentMutation = useDeleteAssessment();

  const assessments = assessmentsResponse || [];

  const getAssessmentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      apest: 'APEST',
      mdna: 'MDNA',
      cultural_intelligence: 'Cultural Intelligence',
      leadership_style: 'Leadership Style',
      spiritual_gifts: 'Spiritual Gifts',
      other: 'Other',
    };
    return labels[type] || type;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-gray-100 text-gray-800',
      archived: 'bg-red-100 text-red-800',
      under_review: 'bg-yellow-100 text-yellow-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const handleDeleteAssessment = async (assessmentId: string) => {
    try {
      await deleteAssessmentMutation.mutate(assessmentId);
      toast.success('Assessment deleted successfully');
      // Note: SWR will automatically refresh the list
      setDeleteDialogOpen(false);
      setAssessmentToDelete(null);
    } catch (error) {
      console.error('Failed to delete assessment:', error);
      toast.error('Failed to delete assessment');
    }
  };

  const handleStatusChange = async (
    assessmentId: string,
    newStatus: string
  ) => {
    try {
      await updateAssessmentMutation.mutate({
        id: assessmentId,
        status: newStatus as 'draft' | 'active' | 'archived' | 'under_review',
      });
      toast.success('Assessment status updated');
      // Note: SWR will automatically refresh the list
    } catch (error) {
      console.error('Failed to update assessment:', error);
      toast.error('Failed to update assessment');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading assessments...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <span className="ml-2 text-red-500">Failed to load assessments</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Assessment Management
            </h1>
            <p className="text-gray-600">
              Manage assessments, view analytics, and configure settings.
            </p>
          </div>
          <Button onClick={() => router.push('/dashboard/assessment/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Create Assessment
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="mr-2 h-5 w-5" />
            Filter Assessments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search assessments..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Assessment Type */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Type</label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All types</SelectItem>
                  <SelectItem value="apest">APEST</SelectItem>
                  <SelectItem value="mdna">MDNA</SelectItem>
                  <SelectItem value="cultural_intelligence">
                    Cultural Intelligence
                  </SelectItem>
                  <SelectItem value="leadership_style">
                    Leadership Style
                  </SelectItem>
                  <SelectItem value="spiritual_gifts">
                    Spiritual Gifts
                  </SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">{assessments.length}</div>
                <div className="text-sm text-gray-500">Total Assessments</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {assessments.filter(a => a.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Active</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {assessments.filter(a => a.status === 'draft').length}
                </div>
                <div className="text-sm text-gray-500">Drafts</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-purple-500 mr-3" />
              <div>
                <div className="text-2xl font-bold">
                  {assessments.reduce(
                    (sum, a) =>
                      sum +
                      (typeof a.questionsCount === 'number'
                        ? a.questionsCount
                        : 0),
                    0
                  )}
                </div>
                <div className="text-sm text-gray-500">Total Questions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment List */}
      <Card>
        <CardHeader>
          <CardTitle>Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          {assessments.length === 0 ? (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No assessments found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedType || selectedStatus !== 'active'
                  ? 'Try adjusting your filters to find assessments.'
                  : 'Create your first assessment to get started.'}
              </p>
              <Button onClick={() => router.push('/dashboard/assessment/new')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Assessment
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {assessments.map(assessment => (
                <div
                  key={assessment.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-medium">{assessment.name}</h3>
                      <Badge className={getStatusColor(assessment.status)}>
                        {assessment.status}
                      </Badge>
                      {assessment.researchBacked && (
                        <Badge
                          variant="outline"
                          className="text-green-600 border-green-600"
                        >
                          <Star className="h-3 w-3 mr-1" />
                          Research-backed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {getAssessmentTypeLabel(assessment.assessmentType)}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {assessment.estimatedDuration || 15} min
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {assessment.questionsCount} questions
                      </span>
                      <span>
                        Created{' '}
                        {new Date(assessment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {assessment.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {assessment.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(`/dashboard/assessment/${assessment.id}`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        router.push(
                          `/dashboard/assessment/edit/${assessment.id}`
                        )
                      }
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(assessment.id, 'active')
                          }
                          disabled={
                            assessment.status === 'active' ||
                            updateAssessmentMutation.isLoading
                          }
                        >
                          Activate
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(assessment.id, 'draft')
                          }
                          disabled={
                            assessment.status === 'draft' ||
                            updateAssessmentMutation.isLoading
                          }
                        >
                          Move to Draft
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleStatusChange(assessment.id, 'archived')
                          }
                          disabled={
                            assessment.status === 'archived' ||
                            updateAssessmentMutation.isLoading
                          }
                        >
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setAssessmentToDelete(assessment.id);
                            setDeleteDialogOpen(true);
                          }}
                          className="text-red-600"
                          disabled={deleteAssessmentMutation.isLoading}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Assessment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this assessment? This action
              cannot be undone. All associated questions and user responses will
              also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                assessmentToDelete && handleDeleteAssessment(assessmentToDelete)
              }
              className="bg-red-600 hover:bg-red-700"
              disabled={deleteAssessmentMutation.isLoading}
            >
              {deleteAssessmentMutation.isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="h-4 w-4 mr-2" />
              )}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
