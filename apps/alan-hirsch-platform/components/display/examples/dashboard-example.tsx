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
    ministryRole: 'pastor',
    denomination: 'Baptist',
    countryCode: 'US',
    leaderTier: 'core',
    subscriptionTier: 'professional',
    accountStatus: 'active',
    yearsInMinistry: 10,
    bio: 'Experienced pastor with a heart for church planting.',
    avatarUrl: undefined,
    displayName: undefined,
    culturalContext: 'western',
    languagePrimary: 'en',
    theologicalFocus: ['church_planting', 'leadership'],
    onboardingCompleted: true,
    onboardingStep: 10,
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-01-15'),
    lastActiveAt: new Date('2024-01-15'),
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    ministryRole: 'church_planter',
    denomination: 'Presbyterian',
    countryCode: 'CA',
    leaderTier: 'network',
    subscriptionTier: 'leader',
    accountStatus: 'active',
    yearsInMinistry: 5,
    bio: 'Passionate about planting churches in urban areas.',
    avatarUrl: undefined,
    displayName: undefined,
    culturalContext: 'western',
    languagePrimary: 'en',
    theologicalFocus: ['urban_ministry', 'community_development'],
    onboardingCompleted: true,
    onboardingStep: 10,
    createdAt: new Date('2023-06-20'),
    updatedAt: new Date('2024-01-10'),
    lastActiveAt: new Date('2024-01-14'),
    privacySettings: {
      publicProfile: true,
      showAssessmentResults: true,
      allowNetworking: true,
      shareAnalytics: true,
    },
  },
];

const mockAssessments = [
  {
    id: '1',
    name: 'APEST Leadership Assessment',
    slug: 'apest-leadership',
    description: 'Discover your leadership gifts and calling.',
    assessmentType: 'apest',
    questionsCount: 50,
    estimatedDuration: 15,
    version: '1.0',
    language: 'en',
    culturalAdaptation: 'western',
    researchBacked: true,
    validityScore: 0.85,
    reliabilityScore: 0.92,
    instructions: 'Answer honestly based on your natural tendencies.',
    scoringMethod: 'likert_5',
    status: 'active',
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2024-01-01'),
    publishedAt: new Date('2023-02-01'),
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
    contentType: 'article',
    format: 'text',
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
    visibility: 'public',
    status: 'published',
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
    licenseType: 'all_rights_reserved',
    attributionRequired: true,
    createdAt: new Date('2023-12-01'),
    updatedAt: new Date('2024-01-01'),
    publishedAt: new Date('2023-12-15'),
    scheduledAt: undefined,
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
      key: 'name',
      label: 'Name',
      render: user => (
        <div className="flex items-center space-x-3">
          <UserAvatar user={user} size="sm" />
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
      key: 'ministryRole',
      label: 'Role',
      render: user => (
        <span className="capitalize">
          {user.ministryRole.replace('_', ' ')}
        </span>
      ),
    },
    {
      key: 'denomination',
      label: 'Denomination',
    },
    {
      key: 'subscriptionTier',
      label: 'Subscription',
      render: user => (
        <span className="capitalize">{user.subscriptionTier}</span>
      ),
    },
    {
      key: 'accountStatus',
      label: 'Status',
      render: user => (
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
                  columns={userTableColumns}
                  onRowClick={user => console.log('User clicked:', user)}
                  className="border-0"
                />
              ) : selectedView === 'grid' ? (
                <EntityGrid
                  items={mockUsers}
                  renderItem={user => (
                    <UserCard
                      key={user.id}
                      item={user}
                      variant="default"
                      showActions={true}
                      showMinistryInfo={true}
                      onEdit={user => console.log('Edit user:', user)}
                      onDelete={id => console.log('Delete user:', id)}
                      onView={user => console.log('View user:', user)}
                    />
                  )}
                  columns={3}
                />
              ) : (
                <EntityList
                  items={mockUsers}
                  renderItem={user => (
                    <UserCard
                      key={user.id}
                      item={user}
                      variant="compact"
                      showActions={true}
                      showMinistryInfo={true}
                      onEdit={user => console.log('Edit user:', user)}
                      onDelete={id => console.log('Delete user:', id)}
                      onView={user => console.log('View user:', user)}
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
                renderItem={content => (
                  <ContentItemCard
                    key={content.id}
                    item={content}
                    variant="default"
                    showActions={true}
                    showStats={true}
                    showAuthor={true}
                    showExcerpt={true}
                    showTags={true}
                    onEdit={content => console.log('Edit content:', content)}
                    onDelete={id => console.log('Delete content:', id)}
                    onView={content => console.log('View content:', content)}
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
                renderItem={assessment => (
                  <AssessmentCard
                    key={assessment.id}
                    item={assessment}
                    variant="default"
                    showActions={true}
                    showStats={true}
                    showQuestionCount={true}
                    showDuration={true}
                    showValidityScores={true}
                    onEdit={assessment =>
                      console.log('Edit assessment:', assessment)
                    }
                    onDelete={id => console.log('Delete assessment:', id)}
                    onView={assessment =>
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
                renderItem={user => (
                  <UserCard key={user.id} item={user} variant="compact" />
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
                item={user}
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
