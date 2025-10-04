import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
        avatarUrl: null,
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

// Import UI components
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import page components for integration testing
import DashboardPage from '@/app/(dashboard)/dashboard/page';
import { Login } from '@/app/(login)/login';

describe('Phase 5.3: Component Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('UI Component Rendering', () => {
    it('should render Button component correctly', () => {
      render(<Button>Test Button</Button>);
      expect(
        screen.getByRole('button', { name: 'Test Button' })
      ).toBeInTheDocument();
    });

    it('should render Input component correctly', () => {
      render(<Input placeholder='Test input' />);
      expect(screen.getByPlaceholderText('Test input')).toBeInTheDocument();
    });

    it('should render Label component correctly', () => {
      render(<Label htmlFor='test-input'>Test Label</Label>);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('should render Card components correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
          </CardHeader>
          <CardContent>Test content</CardContent>
        </Card>
      );
      expect(screen.getByText('Test Card')).toBeInTheDocument();
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('should render Avatar component correctly', () => {
      render(
        <Avatar>
          <AvatarImage src='/test-avatar.jpg' alt='Test user' />
          <AvatarFallback>TU</AvatarFallback>
        </Avatar>
      );
      expect(
        screen.getByRole('img', { name: 'Test user' })
      ).toBeInTheDocument();
    });

    it('should render Badge component correctly', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should render Alert component correctly', () => {
      render(
        <Alert>
          <AlertDescription>Test alert message</AlertDescription>
        </Alert>
      );
      expect(screen.getByText('Test alert message')).toBeInTheDocument();
    });

    it('should render Progress component correctly', () => {
      render(<Progress value={50} />);
      const progressBar = screen.getByRole('progressbar');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveAttribute('aria-valuenow', '50');
    });

    it('should render Tabs component correctly', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabsList>
            <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
            <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value='tab1'>Tab 1 content</TabsContent>
          <TabsContent value='tab2'>Tab 2 content</TabsContent>
        </Tabs>
      );
      expect(screen.getByText('Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Tab 1 content')).toBeInTheDocument();
    });
  });

  describe('Component State Management', () => {
    it('should handle Button click events correctly', async () => {
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button', { name: 'Click me' });
      await userEvent.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle Input value changes correctly', async () => {
      const user = userEvent.setup();
      render(<Input placeholder='Test input' />);

      const input = screen.getByPlaceholderText('Test input');
      await user.type(input, 'test value');

      expect(input).toHaveValue('test value');
    });

    it('should handle Tabs switching correctly', async () => {
      const user = userEvent.setup();
      render(
        <Tabs defaultValue='tab1'>
          <TabsList>
            <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
            <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value='tab1'>Tab 1 content</TabsContent>
          <TabsContent value='tab2'>Tab 2 content</TabsContent>
        </Tabs>
      );

      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      await user.click(tab2);

      expect(screen.getByText('Tab 2 content')).toBeInTheDocument();
    });
  });

  describe('Component Props and Configuration', () => {
    it('should apply Button variants correctly', () => {
      render(<Button variant='destructive'>Delete</Button>);
      const button = screen.getByRole('button', { name: 'Delete' });
      expect(button).toHaveClass('bg-destructive');
    });

    it('should apply Button sizes correctly', () => {
      render(<Button size='lg'>Large Button</Button>);
      const button = screen.getByRole('button', { name: 'Large Button' });
      expect(button).toHaveClass('h-11');
    });

    it('should handle disabled Button state correctly', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button', { name: 'Disabled Button' });
      expect(button).toBeDisabled();
    });

    it('should apply Input types correctly', () => {
      render(<Input type='email' placeholder='Email' />);
      const input = screen.getByPlaceholderText('Email');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should apply Input validation attributes correctly', () => {
      render(<Input required minLength={5} maxLength={20} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('minLength', '5');
      expect(input).toHaveAttribute('maxLength', '20');
    });
  });

  describe('Component Integration with Forms', () => {
    it('should integrate Button with form submission', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn();

      render(
        <form onSubmit={handleSubmit}>
          <Input placeholder='Test input' />
          <Button type='submit'>Submit</Button>
        </form>
      );

      const input = screen.getByPlaceholderText('Test input');
      const button = screen.getByRole('button', { name: 'Submit' });

      await user.type(input, 'test value');
      await user.click(button);

      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should integrate Label with Input correctly', () => {
      render(
        <div>
          <Label htmlFor='test-input'>Test Label</Label>
          <Input id='test-input' placeholder='Test input' />
        </div>
      );

      const label = screen.getByText('Test Label');
      const input = screen.getByPlaceholderText('Test input');

      expect(label).toHaveAttribute('for', 'test-input');
      expect(input).toHaveAttribute('id', 'test-input');
    });

    it('should handle form validation with Input components', async () => {
      const user = userEvent.setup();
      render(<Input required minLength={3} placeholder='Required input' />);

      const input = screen.getByPlaceholderText('Required input');

      // Test validation
      expect(input).toHaveAttribute('required');
      expect(input).toHaveAttribute('minLength', '3');

      // Test with invalid input
      await user.type(input, 'ab'); // Less than 3 characters
      expect(input.checkValidity()).toBe(false);

      // Test with valid input
      await user.clear(input);
      await user.type(input, 'abc'); // 3 characters
      expect(input.checkValidity()).toBe(true);
    });
  });

  describe('Component Accessibility', () => {
    it('should have proper ARIA attributes on Button', () => {
      render(<Button aria-label='Test button'>Test</Button>);
      const button = screen.getByRole('button', { name: 'Test button' });
      expect(button).toHaveAttribute('aria-label', 'Test button');
    });

    it('should have proper ARIA attributes on Progress', () => {
      render(<Progress value={75} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toHaveAttribute('aria-valuenow', '75');
      expect(progress).toHaveAttribute('aria-valuemin', '0');
      expect(progress).toHaveAttribute('aria-valuemax', '100');
    });

    it('should have proper ARIA attributes on Tabs', () => {
      render(
        <Tabs defaultValue='tab1'>
          <TabsList>
            <TabsTrigger value='tab1'>Tab 1</TabsTrigger>
            <TabsTrigger value='tab2'>Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value='tab1'>Tab 1 content</TabsContent>
          <TabsContent value='tab2'>Tab 2 content</TabsContent>
        </Tabs>
      );

      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });

      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Button>First Button</Button>
          <Button>Second Button</Button>
          <Input placeholder='Test input' />
        </div>
      );

      // Test tab navigation
      await user.tab();
      expect(
        screen.getByRole('button', { name: 'First Button' })
      ).toHaveFocus();

      await user.tab();
      expect(
        screen.getByRole('button', { name: 'Second Button' })
      ).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText('Test input')).toHaveFocus();
    });
  });

  describe('Component Error Handling', () => {
    it('should handle component errors gracefully', () => {
      // Test with invalid props
      expect(() => {
        render(<Progress value={150} />); // Invalid value > 100
      }).not.toThrow();
    });

    it('should handle missing props gracefully', () => {
      expect(() => {
        render(<Avatar />); // No children
      }).not.toThrow();
    });

    it('should handle dynamic prop changes', () => {
      const { rerender } = render(<Button>Initial Text</Button>);
      expect(
        screen.getByRole('button', { name: 'Initial Text' })
      ).toBeInTheDocument();

      rerender(<Button>Updated Text</Button>);
      expect(
        screen.getByRole('button', { name: 'Updated Text' })
      ).toBeInTheDocument();
    });
  });

  describe('Component Performance', () => {
    it('should render components efficiently', () => {
      const startTime = performance.now();

      render(
        <div>
          {Array.from({ length: 100 }, (_, i) => (
            <Button key={i}>Button {i}</Button>
          ))}
        </div>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 100 buttons in reasonable time
      expect(renderTime).toBeLessThan(1000); // Less than 1 second
      expect(screen.getAllByRole('button')).toHaveLength(100);
    });

    it('should handle large datasets efficiently', () => {
      const largeData = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
      }));

      render(
        <div>
          {largeData.map(item => (
            <Card key={item.id}>
              <CardContent>{item.name}</CardContent>
            </Card>
          ))}
        </div>
      );

      // Should render all cards
      expect(screen.getByText('Item 0')).toBeInTheDocument();
      expect(screen.getByText('Item 999')).toBeInTheDocument();
    });
  });

  describe('Component Integration with Dashboard', () => {
    it('should render dashboard components correctly', () => {
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Check that all major components are rendered
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Profile Information')).toBeInTheDocument();
      expect(screen.getByText('Subscription')).toBeInTheDocument();
      expect(screen.getByText('Assessment Progress')).toBeInTheDocument();
    });

    it('should handle dashboard component interactions', async () => {
      const user = userEvent.setup();
      render(
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardPage />
        </Suspense>
      );

      // Test clicking on quick action cards
      const takeAssessmentLink = screen
        .getByText('Take Assessment')
        .closest('a');
      expect(takeAssessmentLink).toHaveAttribute(
        'href',
        '/dashboard/assessment'
      );

      const browseContentLink = screen.getByText('Browse Content').closest('a');
      expect(browseContentLink).toHaveAttribute('href', '/dashboard/content');
    });
  });

  describe('Component Integration with Authentication', () => {
    it('should render login components correctly', () => {
      render(<Login mode='signin' />);

      // Check that all form components are rendered
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign in/i })
      ).toBeInTheDocument();
    });

    it('should render signup components correctly', () => {
      render(<Login mode='signup' />);

      // Check that all form components are rendered
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
      expect(screen.getByLabelText('Ministry Role')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /sign up/i })
      ).toBeInTheDocument();
    });
  });

  describe('Component Styling and CSS Classes', () => {
    it('should apply correct CSS classes to components', () => {
      render(<Button className='custom-class'>Test</Button>);
      const button = screen.getByRole('button', { name: 'Test' });
      expect(button).toHaveClass('custom-class');
    });

    it('should apply variant classes correctly', () => {
      render(<Button variant='outline'>Outline Button</Button>);
      const button = screen.getByRole('button', { name: 'Outline Button' });
      expect(button).toHaveClass('border-input');
    });

    it('should apply size classes correctly', () => {
      render(<Button size='sm'>Small Button</Button>);
      const button = screen.getByRole('button', { name: 'Small Button' });
      expect(button).toHaveClass('h-9');
    });
  });
});
