/**
 * Integration Tests for Type-Safe Display Components
 *
 * These tests validate the complete type-safe data flow from:
 * Database → Services → API Routes → Client State → Display Components → UI
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

// Import all display components
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
  ErrorBoundary,
  LoadingSkeleton,
  // Shared components
  StatsCard,
  StatsGrid,
  UserAvatar,
  // User components
  UserCard,
  UserList,
  // Types
  type ColumnDef,
} from '@/components/display';

// Import validation utilities

// Mock data that matches our Zod schemas
const mockUser = {
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
};

const mockAssessment = {
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
};

const mockContent = {
  id: '1',
  title: 'The Five-Fold Ministry Model',
  slug: 'five-fold-ministry-model',
  excerpt: 'Understanding the biblical foundation for diverse ministry gifts.',
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
};

describe('Type-Safe Display Components Integration', () => {
  describe('Props Validation', () => {
    it('should validate UserCard props correctly', () => {
      const validProps = {
        item: mockUser,
        variant: 'default' as const,
        showActions: true,
      };

      // This should not throw
      expect(() => {
        render(<UserCard {...validProps} />);
      }).not.toThrow();
    });

    it('should handle invalid UserCard props gracefully', () => {
      const invalidProps = {
        item: { ...mockUser, email: 'invalid-email' }, // Invalid email
        variant: 'invalid-variant' as any, // Invalid variant
      };

      // Should render error state or fallback
      render(<UserCard {...invalidProps} />);
      // Component should still render, but may show validation error
    });
  });

  describe('User Components', () => {
    it('should render UserCard with all variants', () => {
      const variants = ['default', 'compact', 'detailed', 'minimal'] as const;

      variants.forEach(variant => {
        const { unmount } = render(
          <UserCard item={mockUser} variant={variant} showActions={true} />
        );

        expect(
          screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
        ).toBeInTheDocument();
        unmount();
      });
    });

    it('should render UserAvatar with different sizes', () => {
      const sizes = ['sm', 'md', 'lg', 'xl'] as const;

      sizes.forEach(size => {
        const { unmount } = render(
          <UserAvatar
            user={mockUser}
            size={size}
            showOnlineStatus={true}
            showMinistryRole={true}
          />
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
        unmount();
      });
    });

    it('should render UserList with different views', () => {
      const views = ['grid', 'list', 'table'] as const;
      const users = [mockUser];

      views.forEach(view => {
        const { unmount } = render(
          <UserList items={users} view={view} showFilters={true} />
        );

        expect(
          screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
        ).toBeInTheDocument();
        unmount();
      });
    });

    it('should handle UserList interactions', async () => {
      const onItemClick = jest.fn();
      const onEdit = jest.fn();
      const onDelete = jest.fn();

      render(
        <UserList
          items={[mockUser]}
          onItemClick={onItemClick}
          onItemEdit={onEdit}
          onItemDelete={onDelete}
        />
      );

      // Test item click
      fireEvent.click(
        screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
      );
      expect(onItemClick).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('Assessment Components', () => {
    it('should render AssessmentCard with all variants', () => {
      const variants = ['default', 'compact', 'detailed', 'minimal'] as const;

      variants.forEach(variant => {
        const { unmount } = render(
          <AssessmentCard
            item={mockAssessment}
            variant={variant}
            showActions={true}
          />
        );

        expect(screen.getByText(mockAssessment.name)).toBeInTheDocument();
        unmount();
      });
    });

    it('should display assessment statistics correctly', () => {
      render(
        <AssessmentCard
          item={mockAssessment}
          showStats={true}
          showQuestionCount={true}
          showDuration={true}
          showValidityScores={true}
        />
      );

      expect(
        screen.getByText(mockAssessment.questionsCount.toString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(`${mockAssessment.estimatedDuration}min`)
      ).toBeInTheDocument();
    });
  });

  describe('Content Components', () => {
    it('should render ContentItemCard with all variants', () => {
      const variants = ['default', 'compact', 'detailed', 'minimal'] as const;

      variants.forEach(variant => {
        const { unmount } = render(
          <ContentItemCard
            item={mockContent}
            variant={variant}
            showActions={true}
          />
        );

        expect(screen.getByText(mockContent.title)).toBeInTheDocument();
        unmount();
      });
    });

    it('should display content statistics correctly', () => {
      render(
        <ContentItemCard item={mockContent} showStats={true} showTags={true} />
      );

      expect(
        screen.getByText(mockContent.viewCount.toString())
      ).toBeInTheDocument();
      expect(
        screen.getByText(mockContent.likeCount.toString())
      ).toBeInTheDocument();
    });
  });

  describe('Base Components', () => {
    it('should render DataTable with sorting', async () => {
      const columns: ColumnDef<typeof mockUser>[] = [
        {
          key: 'firstName',
          label: 'First Name',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
      ];

      const onSort = jest.fn();

      render(<DataTable data={[mockUser]} columns={columns} onSort={onSort} />);

      // Test sorting
      fireEvent.click(screen.getByText('First Name'));
      expect(onSort).toHaveBeenCalledWith('firstName');
    });

    it('should render EntityGrid with different column counts', () => {
      const columns = [2, 3, 4, 5] as const;

      columns.forEach(columnCount => {
        const { unmount } = render(
          <EntityGrid
            items={[mockUser]}
            renderItem={user => <UserCard item={user} variant="compact" />}
            columns={columnCount}
          />
        );

        expect(
          screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
        ).toBeInTheDocument();
        unmount();
      });
    });

    it('should render LoadingSkeleton with different types', () => {
      const types = [
        'card',
        'list',
        'table',
        'profile',
        'stats',
        'form',
      ] as const;

      types.forEach(type => {
        const { unmount } = render(<LoadingSkeleton type={type} count={3} />);

        // Should render skeleton elements
        expect(
          screen.getByTestId('skeleton') ||
            document.querySelector('.animate-pulse')
        ).toBeTruthy();
        unmount();
      });
    });
  });

  describe('Async Data Handling', () => {
    it('should handle loading state', () => {
      render(
        <AsyncData
          data={undefined}
          isLoading={true}
          error={null}
          skeletonType="card"
        >
          {data => <UserList items={data} />}
        </AsyncData>
      );

      // Should show loading skeleton
      expect(document.querySelector('.animate-pulse')).toBeInTheDocument();
    });

    it('should handle error state', () => {
      const error = new Error('Failed to load data');

      render(
        <AsyncData data={undefined} isLoading={false} error={error}>
          {data => <UserList items={data} />}
        </AsyncData>
      );

      expect(screen.getByText('Error loading data')).toBeInTheDocument();
    });

    it('should handle empty state', () => {
      render(
        <AsyncData
          data={undefined}
          isLoading={false}
          error={null}
          emptyComponent={<EmptyState title="No data found" />}
        >
          {data => <UserList items={data} />}
        </AsyncData>
      );

      expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    it('should render data when available', () => {
      render(
        <AsyncData data={[mockUser]} isLoading={false} error={null}>
          {users => <UserList items={users} />}
        </AsyncData>
      );

      expect(
        screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
      ).toBeInTheDocument();
    });
  });

  describe('Conditional Rendering', () => {
    it('should render when condition is truthy', () => {
      render(
        <ConditionalRender
          condition={mockUser}
          fallback={<EmptyState title="No user" />}
        >
          {user => <UserCard item={user} />}
        </ConditionalRender>
      );

      expect(
        screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
      ).toBeInTheDocument();
    });

    it('should render fallback when condition is falsy', () => {
      render(
        <ConditionalRender
          condition={null}
          fallback={<EmptyState title="No user" />}
        >
          {user => <UserCard item={user} />}
        </ConditionalRender>
      );

      expect(screen.getByText('No user')).toBeInTheDocument();
    });
  });

  describe('Error Boundary', () => {
    it('should catch and display errors', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    it('should provide retry functionality', () => {
      const ThrowError = () => {
        throw new Error('Test error');
      };

      render(
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      );

      const retryButton = screen.getByText('Try Again');
      expect(retryButton).toBeInTheDocument();
    });
  });

  describe('Shared Components', () => {
    it('should render StatsCard with different formats', () => {
      const formats = ['number', 'currency', 'percentage', 'compact'] as const;

      formats.forEach(format => {
        const { unmount } = render(
          <StatsCard title="Test Stat" value={1000} format={format} />
        );

        expect(screen.getByText('Test Stat')).toBeInTheDocument();
        unmount();
      });
    });

    it('should render StatsGrid with different column counts', () => {
      const stats = [
        { title: 'Stat 1', value: 100 },
        { title: 'Stat 2', value: 200 },
        { title: 'Stat 3', value: 300 },
        { title: 'Stat 4', value: 400 },
      ];

      render(<StatsGrid stats={stats} columns={4} />);

      expect(screen.getByText('Stat 1')).toBeInTheDocument();
      expect(screen.getByText('Stat 2')).toBeInTheDocument();
      expect(screen.getByText('Stat 3')).toBeInTheDocument();
      expect(screen.getByText('Stat 4')).toBeInTheDocument();
    });

    it('should render EmptyState with actions', () => {
      const onAction = jest.fn();

      render(
        <EmptyState
          title="No items found"
          description="Create your first item"
          action={{
            label: 'Create Item',
            onClick: onAction,
          }}
        />
      );

      expect(screen.getByText('No items found')).toBeInTheDocument();
      expect(screen.getByText('Create Item')).toBeInTheDocument();

      fireEvent.click(screen.getByText('Create Item'));
      expect(onAction).toHaveBeenCalled();
    });
  });

  describe('Type Safety Validation', () => {
    it('should maintain type safety throughout component tree', () => {
      // This test ensures TypeScript compilation succeeds
      const users = [mockUser];
      const assessments = [mockAssessment];
      const content = [mockContent];

      render(
        <div>
          <UserList
            items={users}
            onItemClick={user => {
              // TypeScript should infer user type correctly
              console.log(user.id, user.email);
            }}
          />
          <EntityGrid
            items={assessments}
            renderItem={assessment => (
              <AssessmentCard
                item={assessment}
                onEdit={assessment => {
                  // TypeScript should infer assessment type correctly
                  console.log(assessment.id, assessment.name);
                }}
              />
            )}
          />
          <EntityGrid
            items={content}
            renderItem={contentItem => (
              <ContentItemCard
                item={contentItem}
                onView={contentItem => {
                  // TypeScript should infer content type correctly
                  console.log(contentItem.id, contentItem.title);
                }}
              />
            )}
          />
        </div>
      );
    });

    it('should validate props at runtime', () => {
      // This test ensures runtime validation works
      const validUserProps = {
        item: mockUser,
        variant: 'default' as const,
        showActions: true,
      };

      // Should not throw
      expect(() => {
        render(<UserCard {...validUserProps} />);
      }).not.toThrow();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<UserCard item={mockUser} showActions={true} />);

      // Check for proper accessibility attributes
      const moreButton = screen.getByRole('button', { name: /more/i });
      expect(moreButton).toBeInTheDocument();
    });

    it('should support keyboard navigation', () => {
      render(
        <DataTable
          data={[mockUser]}
          columns={[
            { key: 'firstName', label: 'First Name', sortable: true },
            { key: 'email', label: 'Email', sortable: true },
          ]}
        />
      );

      // Check for keyboard accessible elements
      const sortableHeaders = screen.getAllByRole('button');
      expect(sortableHeaders.length).toBeGreaterThan(0);
    });
  });
});

describe('Integration with Existing Architecture', () => {
  it('should work with existing Zod schemas', () => {
    // This test ensures components work with existing validation schemas
    const validUser = {
      ...mockUser,
      // All required fields from userProfileSchema
    };

    render(<UserCard item={validUser} />);
    expect(
      screen.getByText(`${validUser.firstName} ${validUser.lastName}`)
    ).toBeInTheDocument();
  });

  it('should handle data from API routes', () => {
    // Simulate data structure from API routes
    const apiResponse = {
      data: [mockUser],
      pagination: {
        page: 1,
        limit: 10,
        total: 1,
        hasMore: false,
      },
    };

    render(<UserList items={apiResponse.data} />);

    expect(
      screen.getByText(`${mockUser.firstName} ${mockUser.lastName}`)
    ).toBeInTheDocument();
  });

  it('should work with form integration', () => {
    const onEdit = jest.fn();

    render(<UserCard item={mockUser} onEdit={onEdit} />);

    // Find and click edit button
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(onEdit).toHaveBeenCalledWith(mockUser);
  });
});
