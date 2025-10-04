import { render, screen } from '@testing-library/react';
import React, { Suspense } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Next.js components and hooks
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock authentication hooks
vi.mock('@/hooks', () => ({
  useUserProfileAdapter: () => ({
    data: {
      data: {
        id: 'test-user-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        displayName: 'Test User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        subscriptionTier: 'Free',
        organizationName: 'Test Organization',
        yearsInMinistry: 5,
        assessmentTotal: 450,
        leaderTier: 'Apostolic',
      },
    },
    isLoading: false,
    error: null,
  }),
}));

// Mock payment actions
vi.mock('@/lib/payments/actions', () => ({
  customerPortalAction: vi.fn(),
}));

// Import page components
import DashboardPage from '@/app/(dashboard)/dashboard/page';
import SignInPage from '@/app/(login)/sign-in/page';
import SignUpPage from '@/app/(login)/sign-up/page';

describe('Phase 5.1: Page Loading Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication Pages', () => {
    it('should render sign-in page without errors', () => {
      expect(() => {
        render(
          <Suspense fallback={<div>Loading...</div>}>
            <SignInPage />
          </Suspense>
        );
      }).not.toThrow();

      // Check for key elements
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should render sign-up page without errors', () => {
      expect(() => {
        render(
          <Suspense fallback={<div>Loading...</div>}>
            <SignUpPage />
          </Suspense>
        );
      }).not.toThrow();

      // Check for key elements
      expect(screen.getByText('Create your account')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Ministry Role')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign up/i })
      ).toBeInTheDocument();
    });

    it('should display proper form structure in sign-in page', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      );

      // Check form structure
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      // Check required fields
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
    });

    it('should display proper form structure in sign-up page', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpPage />
        </Suspense>
      );

      // Check form structure
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();

      // Check required fields
      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const ministryRoleSelect = screen.getByLabelText('Ministry Role');

      expect(firstNameInput).toHaveAttribute('type', 'text');
      expect(firstNameInput).toHaveAttribute('required');
      expect(lastNameInput).toHaveAttribute('type', 'text');
      expect(lastNameInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('required');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('required');
      expect(ministryRoleSelect).toHaveAttribute('required');
    });
  });

  describe('Dashboard Page', () => {
    it('should render dashboard page without errors', () => {
      expect(() => {
        render(
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardPage />
          </Suspense>
        );
      }).not.toThrow();

      // Check for key elements
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Take Assessment')).toBeInTheDocument();
      expect(screen.getByText('Browse Content')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();
    });

    it('should display user profile information correctly', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Check profile information
      expect(screen.getByText('Profile Information')).toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
      expect(screen.getByText('Senior Pastor')).toBeInTheDocument();
      expect(screen.getByText('Test Organization')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument(); // Years in ministry
    });

    it('should display subscription information correctly', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Check subscription information
      expect(screen.getByText('Subscription')).toBeInTheDocument();
      expect(screen.getByText('Current Plan: Free')).toBeInTheDocument();
      expect(screen.getByText('Active account')).toBeInTheDocument();
      expect(screen.getByText('Manage Subscription')).toBeInTheDocument();
    });

    it('should display assessment progress correctly', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Check assessment information
      expect(screen.getByText('Assessment Progress')).toBeInTheDocument();
      expect(screen.getByText('APEST Assessment Score')).toBeInTheDocument();
      expect(screen.getByText('450/600')).toBeInTheDocument();
      expect(screen.getByText('Leader Tier: Apostolic')).toBeInTheDocument();
    });

    it('should display quick action cards correctly', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Check quick action cards
      const takeAssessmentCard = screen
        .getByText('Take Assessment')
        .closest('a');
      const browseContentCard = screen.getByText('Browse Content').closest('a');
      const profileCard = screen.getByText('Profile').closest('a');
      const activityCard = screen.getByText('Activity').closest('a');

      expect(takeAssessmentCard).toHaveAttribute(
        'href',
        '/dashboard/assessment'
      );
      expect(browseContentCard).toHaveAttribute('href', '/dashboard/content');
      expect(profileCard).toHaveAttribute('href', '/dashboard/general');
      expect(activityCard).toHaveAttribute('href', '/dashboard/activity');
    });
  });

  describe('Navigation and Responsive Design', () => {
    it('should have proper link navigation in sign-in page', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      );

      // Check navigation link
      const signUpLink = screen.getByText('Create an account');
      expect(signUpLink.closest('a')).toHaveAttribute('href', '/sign-up');
    });

    it('should have proper link navigation in sign-up page', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpPage />
        </Suspense>
      );

      // Check navigation link
      const signInLink = screen.getByText('Sign in to existing account');
      expect(signInLink.closest('a')).toHaveAttribute('href', '/sign-in');
    });

    it('should display responsive design classes correctly', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      );

      // Check for responsive classes
      const container = screen
        .getByText('Sign in to your account')
        .closest('div');
      expect(container).toHaveClass('sm:mx-auto', 'sm:w-full', 'sm:max-w-md');
    });
  });

  describe('Error Boundaries and Loading States', () => {
    it('should handle loading states gracefully', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Should not show loading after render
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    it('should have proper error boundary structure', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      );

      // AuthErrorBoundary should be present (mocked)
      expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels and accessibility attributes', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      );

      // Check accessibility attributes
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      expect(emailInput).toHaveAttribute('autoComplete', 'email');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should have proper form labels in sign-up page', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpPage />
        </Suspense>
      );

      // Check accessibility attributes
      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(firstNameInput).toHaveAttribute('autoComplete', 'given-name');
      expect(lastNameInput).toHaveAttribute('autoComplete', 'family-name');
      expect(emailInput).toHaveAttribute('autoComplete', 'email');
      expect(passwordInput).toHaveAttribute('autoComplete', 'new-password');
    });
  });

  describe('Form Validation Structure', () => {
    it('should have proper form validation attributes in sign-in', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignInPage />
        </Suspense>
      );

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(emailInput).toHaveAttribute('maxLength', '50');
      expect(passwordInput).toHaveAttribute('minLength', '8');
      expect(passwordInput).toHaveAttribute('maxLength', '100');
    });

    it('should have proper form validation attributes in sign-up', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <SignUpPage />
        </Suspense>
      );

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      expect(firstNameInput).toHaveAttribute('maxLength', '50');
      expect(lastNameInput).toHaveAttribute('maxLength', '50');
      expect(emailInput).toHaveAttribute('maxLength', '50');
      expect(passwordInput).toHaveAttribute('minLength', '8');
      expect(passwordInput).toHaveAttribute('maxLength', '100');
    });
  });
});
