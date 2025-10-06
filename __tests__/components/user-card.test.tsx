import { UserProfileResponse } from '@platform/shared/contracts';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserCard } from '../../apps/alan-hirsch-platform/components/display/user/user-card';

// Mock user data that matches the UserProfileResponse contract
const mockUser: UserProfileResponse = {
  id: 'user-123',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  displayName: 'John Doe',
  bio: 'Test bio',
  avatarUrl: 'https://example.com/avatar.jpg',
  ministryRole: 'senior_pastor',
  denomination: 'Baptist',
  organizationName: 'Test Church',
  yearsInMinistry: 10,
  countryCode: 'US',
  timezone: 'America/New_York',
  languagePrimary: 'en',
  culturalContext: 'western',
  assessmentMovementAlignment: 80,
  assessmentAudienceEngagement: 75,
  assessmentContentReadiness: 85,
  assessmentRevenuePotential: 70,
  assessmentNetworkEffects: 80,
  assessmentStrategicFit: 75,
  assessmentTotal: 465,
  leaderTier: 'core',
  subdomain: 'johndoe',
  customDomain: 'johndoe.com',
  platformTitle: 'John Doe Ministry',
  subscriptionTier: 'professional',
  theologicalFocus: ['Systematic Theology', 'Biblical Studies'],
  brandColors: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#059669',
  },
  emailNotifications: {
    dailyDigest: true,
    collaborationRequests: true,
    revenueReports: true,
    communityUpdates: true,
  },
  privacySettings: {
    publicProfile: true,
    showAssessmentResults: false,
    allowNetworking: true,
    shareAnalytics: false,
  },
  onboardingCompleted: true,
  onboardingStep: 10,
  accountStatus: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  lastActiveAt: '2024-01-01T00:00:00Z',
  // Computed fields
  isActive: true,
  hasCompletedOnboarding: true,
  fullName: 'John Doe',
  displayNameOrFullName: 'John Doe',
  hasCustomDomain: true,
  hasSubdomain: true,
  isPublicProfile: true,
  canReceiveNotifications: true,
  assessmentCompleted: true,
  primaryGift: 'apostolic',
  secondaryGift: 'prophetic',
  ministryExperience: '10 years in ministry',
  locationDisplay: 'US',
};

describe('UserCard', () => {
  it('renders user information correctly', () => {
    render(<UserCard item={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
    expect(screen.getByText('Baptist')).toBeInTheDocument();
    expect(screen.getByText('Test Church')).toBeInTheDocument();
  });

  it('renders compact variant correctly', () => {
    render(<UserCard item={mockUser} variant="compact" />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
    expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
  });

  it('renders minimal variant correctly', () => {
    render(<UserCard item={mockUser} variant="minimal" />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('renders detailed variant with additional information', () => {
    render(<UserCard item={mockUser} variant="detailed" />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Test bio')).toBeInTheDocument();
    expect(screen.getByText('10 years')).toBeInTheDocument();
    expect(screen.getByText('Core')).toBeInTheDocument();
    expect(screen.getByText('Professional')).toBeInTheDocument();
  });

  it('shows assessment scores when enabled', () => {
    render(<UserCard item={mockUser} showAssessmentScores={true} />);

    expect(screen.getByText('Assessment Score')).toBeInTheDocument();
    expect(screen.getByText('465/600')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn();
    render(<UserCard item={mockUser} onEdit={mockOnEdit} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalledWith(mockUser);
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockOnDelete = jest.fn();
    render(<UserCard item={mockUser} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('user-123');
  });

  it('calls onView when view button is clicked', () => {
    const mockOnView = jest.fn();
    render(<UserCard item={mockUser} onView={mockOnView} />);

    const viewButton = screen.getByText('View');
    fireEvent.click(viewButton);

    expect(mockOnView).toHaveBeenCalledWith(mockUser);
  });

  it('hides actions when showActions is false', () => {
    render(<UserCard item={mockUser} showActions={false} />);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });

  it('hides stats when showStats is false', () => {
    render(<UserCard item={mockUser} showStats={false} />);

    expect(screen.queryByText('Years')).not.toBeInTheDocument();
    expect(screen.queryByText('Tier')).not.toBeInTheDocument();
    expect(screen.queryByText('Plan')).not.toBeInTheDocument();
  });

  it('hides ministry info when showMinistryInfo is false', () => {
    render(<UserCard item={mockUser} showMinistryInfo={false} />);

    expect(screen.queryByText('Senior Pastor')).not.toBeInTheDocument();
    expect(screen.queryByText('Baptist')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <UserCard item={mockUser} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles user without display name', () => {
    const userWithoutDisplayName = {
      ...mockUser,
      displayName: undefined,
    };

    render(<UserCard item={userWithoutDisplayName} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('handles user without avatar', () => {
    const userWithoutAvatar = {
      ...mockUser,
      avatarUrl: undefined,
    };

    render(<UserCard item={userWithoutAvatar} />);

    expect(screen.getByText('JD')).toBeInTheDocument(); // Initials fallback
  });

  it('handles user with incomplete assessment', () => {
    const userWithIncompleteAssessment = {
      ...mockUser,
      assessmentTotal: undefined,
      assessmentCompleted: false,
    };

    render(
      <UserCard
        item={userWithIncompleteAssessment}
        showAssessmentScores={true}
      />
    );

    expect(screen.queryByText('Assessment Score')).not.toBeInTheDocument();
  });

  it('renders status badge with correct color', () => {
    render(<UserCard item={mockUser} />);

    const statusBadge = screen.getByText('Active');
    expect(statusBadge).toHaveClass('bg-green-100', 'text-green-800');
  });

  it('renders ministry role badge with correct color', () => {
    render(<UserCard item={mockUser} />);

    const roleBadge = screen.getByText('Senior Pastor');
    expect(roleBadge).toHaveClass('bg-blue-100', 'text-blue-800');
  });

  it('renders subscription tier badge with correct color', () => {
    render(<UserCard item={mockUser} />);

    const tierBadge = screen.getByText('Professional');
    expect(tierBadge).toHaveClass('bg-purple-100', 'text-purple-800');
  });
});
