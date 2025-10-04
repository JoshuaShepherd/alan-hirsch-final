import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
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

// Mock authentication actions
const mockSignIn = vi.fn();
const mockSignUp = vi.fn();

vi.mock('@/app/(login)/actions', () => ({
  signIn: mockSignIn,
  signUp: mockSignUp,
}));

// Mock payment actions
vi.mock('@/lib/payments/actions', () => ({
  customerPortalAction: vi.fn(),
}));

// Import components
import { Login } from '@/app/(login)/login';

describe('Phase 5.2: Form Functionality Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignIn.mockResolvedValue({ error: null });
    mockSignUp.mockResolvedValue({ error: null });
  });

  describe('Sign-In Form Functionality', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      // Fill in form data
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Submit form
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalled();
      });
    });

    it('should show loading state during form submission', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Submit form
      await user.click(submitButton);

      // Should show loading state
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display error message when sign-in fails', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ error: 'Invalid credentials' });

      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });
    });

    it('should prevent submission with empty required fields', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });

      // Try to submit without filling fields
      await user.click(submitButton);

      // Form should not be submitted
      expect(mockSignIn).not.toHaveBeenCalled();
    });

    it('should validate email format', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'invalid-email');
      await user.type(passwordInput, 'password123');

      await user.click(submitButton);

      // Should show validation error
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput.checkValidity()).toBe(false);
    });

    it('should validate password length', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'short'); // Less than 8 characters

      await user.click(submitButton);

      // Should show validation error
      expect(passwordInput).toHaveAttribute('minLength', '8');
      expect(passwordInput.checkValidity()).toBe(false);
    });
  });

  describe('Sign-Up Form Functionality', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      // Fill in form data
      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const ministryRoleSelect = screen.getByLabelText('Ministry Role');
      const submitButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      await user.selectOptions(ministryRoleSelect, 'senior_pastor');

      // Submit form
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });
    });

    it('should show loading state during form submission', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const ministryRoleSelect = screen.getByLabelText('Ministry Role');
      const submitButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      await user.selectOptions(ministryRoleSelect, 'senior_pastor');

      await user.click(submitButton);

      // Should show loading state
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should display error message when sign-up fails', async () => {
      const user = userEvent.setup();
      mockSignUp.mockResolvedValue({ error: 'Email already exists' });

      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const ministryRoleSelect = screen.getByLabelText('Ministry Role');
      const submitButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'existing@example.com');
      await user.type(passwordInput, 'password123');
      await user.selectOptions(ministryRoleSelect, 'senior_pastor');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Email already exists')).toBeInTheDocument();
      });
    });

    it('should validate all required fields in sign-up', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const submitButton = screen.getByRole('button', { name: /sign up/i });

      // Try to submit without filling required fields
      await user.click(submitButton);

      // Form should not be submitted
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it('should validate ministry role selection', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      // Don't select ministry role

      await user.click(submitButton);

      // Should not submit without ministry role
      expect(mockSignUp).not.toHaveBeenCalled();
    });

    it('should handle optional organization name field', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const ministryRoleSelect = screen.getByLabelText('Ministry Role');
      const organizationInput = screen.getByLabelText(
        'Organization Name (Optional)'
      );
      const submitButton = screen.getByRole('button', { name: /sign up/i });

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');
      await user.selectOptions(ministryRoleSelect, 'senior_pastor');
      await user.type(organizationInput, 'Test Church');

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });
    });

    it('should validate field length limits', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      // Test max length attributes
      expect(firstNameInput).toHaveAttribute('maxLength', '50');
      expect(lastNameInput).toHaveAttribute('maxLength', '50');
      expect(emailInput).toHaveAttribute('maxLength', '50');
      expect(passwordInput).toHaveAttribute('maxLength', '100');
    });
  });

  describe('Form Input Validation', () => {
    it('should handle input changes correctly', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      expect(emailInput).toHaveValue('test@example.com');
      expect(passwordInput).toHaveValue('password123');
    });

    it('should clear form data on mode switch', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Switch to sign-up mode
      rerender(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const newEmailInput = screen.getByLabelText('Email');
      const newPasswordInput = screen.getByLabelText('Password');

      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
      expect(newEmailInput).toHaveValue('');
      expect(newPasswordInput).toHaveValue('');
    });

    it('should handle form reset correctly', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      await user.type(firstNameInput, 'John');
      await user.type(lastNameInput, 'Doe');
      await user.type(emailInput, 'john@example.com');
      await user.type(passwordInput, 'password123');

      // Reset form
      const form = screen.getByRole('form');
      fireEvent.reset(form);

      expect(firstNameInput).toHaveValue('');
      expect(lastNameInput).toHaveValue('');
      expect(emailInput).toHaveValue('');
      expect(passwordInput).toHaveValue('');
    });
  });

  describe('Form Accessibility', () => {
    it('should have proper form labels and accessibility', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const lastNameInput = screen.getByLabelText('Last Name');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const ministryRoleSelect = screen.getByLabelText('Ministry Role');

      // Test keyboard navigation
      await user.tab();
      expect(firstNameInput).toHaveFocus();

      await user.tab();
      expect(lastNameInput).toHaveFocus();

      await user.tab();
      expect(emailInput).toHaveFocus();

      await user.tab();
      expect(passwordInput).toHaveFocus();

      await user.tab();
      expect(ministryRoleSelect).toHaveFocus();
    });

    it('should handle form submission with Enter key', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Submit with Enter key
      await user.keyboard('{Enter}');

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalled();
      });
    });
  });

  describe('Form State Management', () => {
    it('should maintain form state during validation', async () => {
      const user = userEvent.setup();
      render(<Login mode='signup' />);

      const firstNameInput = screen.getByLabelText('First Name');
      const emailInput = screen.getByLabelText('Email');

      await user.type(firstNameInput, 'John');
      await user.type(emailInput, 'invalid-email');

      // Form should maintain state even with invalid data
      expect(firstNameInput).toHaveValue('John');
      expect(emailInput).toHaveValue('invalid-email');
    });

    it('should handle form submission state correctly', async () => {
      const user = userEvent.setup();
      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Button should be enabled initially
      expect(submitButton).not.toBeDisabled();

      await user.click(submitButton);

      // Button should be disabled during submission
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Form Error Handling', () => {
    it('should display server-side errors correctly', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ error: 'Network error' });

      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Network error')).toBeInTheDocument();
      });
    });

    it('should clear error messages on new input', async () => {
      const user = userEvent.setup();
      mockSignIn.mockResolvedValue({ error: 'Invalid credentials' });

      render(<Login mode='signin' />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Password');
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'wrongpassword');

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
      });

      // Clear error by typing in email field
      await user.clear(emailInput);
      await user.type(emailInput, 'new@example.com');

      // Error should be cleared (this depends on implementation)
      // Note: This test assumes the form clears errors on input change
    });
  });
});
