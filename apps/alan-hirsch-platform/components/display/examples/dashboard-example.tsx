'use client';

import { Button } from '@platform/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@platform/ui/card';
import { Input } from '@platform/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@platform/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@platform/ui/tabs';
import {
  FileText,
  Plus,
  Search,
  Target,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

// Import all our display components
import {
  // Assessment components
  AssessmentCard,
  AsyncData,
  ConditionalRender,
  // Content components
  ContentItemCard,
  // Base components
  DataTable,
  EmptyState,
  EntityGrid,
  EntityList,
  StatsGrid,
  UserAvatar,
  // User components
  UserCard,
  type ColumnDef,
} from '@/components/display';

// Mock data for demonstration
const mockUsers = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    ministryRole: 'senior_pastor' as const,
    denomination: 'Baptist',
    countryCode: 'US',
    leaderTier: 'core',
    subscriptionTier: 'professional' as const,
    accountStatus: 'active' as const,
    yearsInMinistry: 10,
    bio: 'Experienced pastor with a heart for church planting.',
    avatarUrl: undefined,
    displayName: undefined,
    culturalContext: 'western',
    languagePrimary: 'en',
    theologicalFocus: ['church_planting', 'leadership'],
    onboardingCompleted: true,
    onboardingStep: 10,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
    lastActiveAt: '2024-01-15T00:00:00Z',
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
    // Computed fields for UserProfileResponse
    isActive: true,
    hasCompletedOnboarding: true,
    fullName: 'John Doe',
    displayNameOrFullName: 'John Doe',
    hasCustomDomain: false,
    hasSubdomain: false,
    isPublicProfile: true,
    canReceiveNotifications: true,
    assessmentCompleted: false,
    brandColors: {
      accent: '#059669',
      primary: '#2563eb',
      secondary: '#64748b',
    },
    emailNotifications: {
      dailyDigest: true,
      revenueReports: true,
      communityUpdates: true,
      collaborationRequests: true,
    },
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    ministryRole: 'church_planter' as const,
    denomination: 'Presbyterian',
    countryCode: 'CA',
    leaderTier: 'network',
    subscriptionTier: 'leader' as const,
    accountStatus: 'active' as const,
    yearsInMinistry: 5,
    bio: 'Passionate about planting churches in urban areas.',
    avatarUrl: undefined,
    displayName: undefined,
    culturalContext: 'western',
    languagePrimary: 'en',
    theologicalFocus: ['urban_ministry', 'community_development'],
    onboardingCompleted: true,
    onboardingStep: 10,
    createdAt: '2023-06-20T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z',
    lastActiveAt: '2024-01-14T00:00:00Z',
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: true,
      allowNetworking: true,
      shareAnalytics: true,
    },
    // Computed fields for UserProfileResponse
    isActive: true,
    hasCompletedOnboarding: true,
    fullName: 'Jane Smith',
    displayNameOrFullName: 'Jane Smith',
    hasCustomDomain: false,
    hasSubdomain: false,
    isPublicProfile: true,
    canReceiveNotifications: true,
    assessmentCompleted: false,
    brandColors: {
      accent: '#059669',
      primary: '#2563eb',
      secondary: '#64748b',
    },
    emailNotifications: {
      dailyDigest: true,
      revenueReports: true,
      communityUpdates: true,
      collaborationRequests: true,
    },
  },
];

const mockAssessments = [
  {
    id: '1',
    name: 'APEST Leadership Assessment',
    slug: 'apest-leadership',
    description: 'Discover your leadership gifts and calling.',
    assessmentType: 'apest' as const,
    questionsCount: 50,
    estimatedDuration: 15,
    version: '1.0',
    language: 'en',
    culturalAdaptation: 'western' as const,
    researchBacked: true,
    validityScore: 0.85,
    reliabilityScore: 0.92,
    instructions: 'Answer honestly based on your natural tendencies.',
    scoringMethod: 'likert_5' as const,
    status: 'active' as const,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2023-02-01T00:00:00Z',
  },
];

const mockContent = [
  {
    id: '1',
    title: 'The Five-Fold Ministry Model',
    slug: 'five-fold-ministry-model',
    excerpt:
      'Understanding the biblical foundation for diverse ministry gifts.',
    content: 'Full content here...',
    authorId: '1',
    coAuthors: [],
    contentType: 'article' as const,
    format: 'text' as const,
    wordCount: 2500,
    estimatedReadingTime: 10,
    viewCount: 1250,
    likeCount: 45,
    shareCount: 12,
    commentCount: 8,
    bookmarkCount: 23,
    primaryCategoryId: 'leadership',
    secondaryCategories: [],
    tags: ['leadership', 'ministry', 'gifts'],
    theologicalThemes: ['ecclesiology', 'spiritual_gifts'],
    seriesId: undefined,
    seriesOrder: undefined,
    visibility: 'public' as const,
    status: 'published' as const,
    networkAmplificationScore: 85,
    crossReferenceCount: 3,
    aiEnhanced: true,
    aiSummary:
      'This article explores the biblical basis for the five-fold ministry.',
    aiKeyPoints: [
      'Biblical foundation',
      'Practical application',
      'Modern relevance',
    ],
    featuredImageUrl: undefined,
    videoUrl: undefined,
    audioUrl: undefined,
    attachments: [],
    metaTitle: undefined,
    metaDescription: undefined,
    canonicalUrl: undefined,
    originalSource: undefined,
    licenseType: 'all_rights_reserved' as const,
    attributionRequired: true,
    createdAt: '2023-12-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2023-12-15T00:00:00Z',
    scheduledAt: undefined,
    // Computed fields for ContentItemResponse
    isPublished: true,
    isDraft: false,
    isScheduled: false,
    isArchived: false,
    hasFeaturedImage: false,
    hasVideo: false,
    hasAudio: false,
    hasAttachments: false,
    viewCountText: '1.2K',
    likeCountText: '45',
    shareCountText: '12',
    commentCountText: '8',
    bookmarkCountText: '23',
    readingTimeText: '10 min read',
    engagementScore: 8.5,
    author: {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      displayName: 'John Doe',
      avatarUrl: undefined,
    },
  },
];

// Dashboard stats
const dashboardStats = [
  {
    title: 'Total Users',
    value: 1247,
    change: {
      value: 12,
      type: 'increase' as const,
      period: 'vs last month',
    },
    icon: Users,
    format: 'compact' as const,
  },
  {
    title: 'Content Items',
    value: 342,
    change: {
      value: 8,
      type: 'increase' as const,
      period: 'vs last month',
    },
    icon: FileText,
    format: 'compact' as const,
  },
  {
    title: 'Assessments Taken',
    value: 892,
    change: {
      value: 23,
      type: 'increase' as const,
      period: 'vs last month',
    },
    icon: Target,
    format: 'compact' as const,
  },
  {
    title: 'Engagement Rate',
    value: 78,
    change: {
      value: 5,
      type: 'increase' as const,
      period: 'vs last month',
    },
    icon: TrendingUp,
    format: 'percentage' as const,
  },
];

export function DashboardExample() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedView, setSelectedView] = useState<'grid' | 'list' | 'table'>(
    'grid'
  );
  const [isLoading, setIsLoading] = useState(false);

  // Table columns for users
  const userTableColumns: ColumnDef<(typeof mockUsers)[0]>[] = [
    {
      key: 'name' as keyof (typeof mockUsers)[0],
      header: 'Name',
      render: (user: (typeof mockUsers)[0]) => (
        <div className="flex items-center space-x-3">
          <UserAvatar user={user as any} size="sm" />
          <div>
            <div className="font-medium">
              {user.displayName || `${user.firstName} ${user.lastName}`}
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'ministryRole' as keyof (typeof mockUsers)[0],
      header: 'Role',
      render: (user: (typeof mockUsers)[0]) => (
        <span className="capitalize">
          {user.ministryRole.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'denomination' as keyof (typeof mockUsers)[0],
      header: 'Denomination',
    },
    {
      key: 'subscriptionTier' as keyof (typeof mockUsers)[0],
      header: 'Subscription',
      render: (user: (typeof mockUsers)[0]) => (
        <span className="capitalize">{user.subscriptionTier}</span>
      ),
    },
    {
      key: 'accountStatus' as keyof (typeof mockUsers)[0],
      header: 'Status',
      render: (user: (typeof mockUsers)[0]) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            user.accountStatus === 'active'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {user.accountStatus.replace('_', ' ')}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your platform and track key metrics
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Stats Grid */}
      <StatsGrid stats={dashboardStats} />

      {/* Main Content Tabs */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          {/* Search and Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="pastor">Pastor</SelectItem>
                    <SelectItem value="church_planter">
                      Church Planter
                    </SelectItem>
                    <SelectItem value="missionary">Missionary</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex space-x-1">
                  <Button
                    variant={selectedView === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedView('grid')}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={selectedView === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedView('list')}
                  >
                    List
                  </Button>
                  <Button
                    variant={selectedView === 'table' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedView('table')}
                  >
                    Table
                  </Button>
                </div>
              </div>

              {/* Display based on selected view */}
              {selectedView === 'table' ? (
                <DataTable
                  data={mockUsers}
                  columns={
                    userTableColumns.map(col => ({
                      key: col.key,
                      label: col.header,
                      render: col.render,
                    })) as any
                  }
                  onRowClick={user => console.log('User clicked:', user)}
                  className="border-0"
                />
              ) : selectedView === 'grid' ? (
                <EntityGrid
                  items={mockUsers}
                  renderItem={(user: (typeof mockUsers)[0]) => (
                    <UserCard
                      key={user.id}
                      item={user as any}
                      variant="default"
                      showActions={true}
                      showMinistryInfo={true}
                      onEdit={(user: any) => console.log('Edit user:', user)}
                      onDelete={(id: string) => console.log('Delete user:', id)}
                      onView={(user: any) => console.log('View user:', user)}
                    />
                  )}
                  columns={3}
                />
              ) : (
                <EntityList
                  items={mockUsers}
                  renderItem={(user: (typeof mockUsers)[0]) => (
                    <UserCard
                      key={user.id}
                      item={user as any}
                      variant="compact"
                      showActions={true}
                      showMinistryInfo={true}
                      onEdit={(user: any) => console.log('Edit user:', user)}
                      onDelete={(id: string) => console.log('Delete user:', id)}
                      onView={(user: any) => console.log('View user:', user)}
                    />
                  )}
                />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent>
              <EntityGrid
                items={mockContent}
                renderItem={(content: (typeof mockContent)[0]) => (
                  <ContentItemCard
                    key={content.id}
                    item={content as any}
                    variant="default"
                    showActions={true}
                    showStats={true}
                    showAuthor={true}
                    showExcerpt={true}
                    showTags={true}
                    onEdit={(content: any) =>
                      console.log('Edit content:', content)
                    }
                    onDelete={(id: string) =>
                      console.log('Delete content:', id)
                    }
                    onView={(content: any) =>
                      console.log('View content:', content)
                    }
                  />
                )}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Assessments Tab */}
        <TabsContent value="assessments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Assessments</CardTitle>
            </CardHeader>
            <CardContent>
              <EntityGrid
                items={mockAssessments}
                renderItem={(assessment: (typeof mockAssessments)[0]) => (
                  <AssessmentCard
                    key={assessment.id}
                    item={assessment as any}
                    variant="default"
                    showActions={true}
                    showQuestionCount={true}
                    showDuration={true}
                    showValidityScores={true}
                    onEdit={(assessment: any) =>
                      console.log('Edit assessment:', assessment)
                    }
                    onDelete={(id: string) =>
                      console.log('Delete assessment:', id)
                    }
                    onView={(assessment: any) =>
                      console.log('View assessment:', assessment)
                    }
                  />
                )}
                columns={3}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Async Data Example */}
      <Card>
        <CardHeader>
          <CardTitle>Async Data Example</CardTitle>
        </CardHeader>
        <CardContent>
          <AsyncData
            data={mockUsers}
            isLoading={isLoading}
            error={null}
            skeletonType="card"
            skeletonCount={3}
          >
            {users => (
              <EntityGrid
                items={users}
                renderItem={(user: (typeof mockUsers)[0]) => (
                  <UserCard
                    key={user.id}
                    item={user as any}
                    variant="compact"
                  />
                )}
                columns={3}
              />
            )}
          </AsyncData>

          <div className="mt-4">
            <Button onClick={() => setIsLoading(!isLoading)} variant="outline">
              Toggle Loading State
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Conditional Render Example */}
      <Card>
        <CardHeader>
          <CardTitle>Conditional Render Example</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionalRender
            condition={mockUsers[0]}
            fallback={<EmptyState title="No user found" />}
          >
            {user => (
              <UserCard
                item={user as any}
                variant="detailed"
                showActions={true}
                showMinistryInfo={true}
                showAssessmentScores={true}
              />
            )}
          </ConditionalRender>
        </CardContent>
      </Card>
    </div>
  );
}
