import { ContactForm } from '@/components/forms/shared/contact-form';
import { CreateUserForm } from '@/components/forms/user/create-user-form';
import { newUserProfileSchema } from '@/validations/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn();

describe('Form Integration Tests', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
    vi.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  describe('CreateUserForm', () => {
    it('should render form fields correctly', () => {
      renderWithProviders(
        <CreateUserForm onSuccess={() => {}} onError={() => {}} />
      );

      expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /create user/i })
      ).toBeInTheDocument();
    });

    it('should validate required fields', async () => {
      renderWithProviders(
        <CreateUserForm onSuccess={() => {}} onError={() => {}} />
      );

      const submitButton = screen.getByRole('button', { name: /create user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/last name is required/i)).toBeInTheDocument();
        expect(
          screen.getByText(/valid email is required/i)
        ).toBeInTheDocument();
      });
    });

    it('should submit form with valid data', async () => {
      const mockSuccess = vi.fn();
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: { id: '1', name: 'Test User' } }),
      };

      (global.fetch as any).mockResolvedValueOnce(mockResponse);

      renderWithProviders(
        <CreateUserForm onSuccess={mockSuccess} onError={() => {}} />
      );

      // Fill out the form
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'john@example.com' },
      });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /create user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"firstName":"John"'),
        });
        expect(mockSuccess).toHaveBeenCalledWith({
          id: '1',
          name: 'Test User',
        });
      });
    });

    it('should handle API errors', async () => {
      const mockError = vi.fn();
      const mockResponse = {
        ok: false,
        json: () => Promise.resolve({ message: 'Email already exists' }),
      };

      (global.fetch as any).mockResolvedValueOnce(mockResponse);

      renderWithProviders(
        <CreateUserForm onSuccess={() => {}} onError={mockError} />
      );

      // Fill out the form
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'john@example.com' },
      });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /create user/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockError).toHaveBeenCalledWith(
          expect.objectContaining({
            message: 'Email already exists',
          })
        );
      });
    });
  });

  describe('ContactForm', () => {
    it('should render contact form fields', () => {
      renderWithProviders(
        <ContactForm onSuccess={() => {}} onError={() => {}} />
      );

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    });

    it('should validate email format', async () => {
      renderWithProviders(
        <ContactForm onSuccess={() => {}} onError={() => {}} />
      );

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'invalid-email' },
      });

      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/valid email is required/i)
        ).toBeInTheDocument();
      });
    });

    it('should submit contact form successfully', async () => {
      const mockSuccess = vi.fn();
      const mockResponse = {
        ok: true,
        json: () => Promise.resolve({ data: { id: '1' } }),
      };

      (global.fetch as any).mockResolvedValueOnce(mockResponse);

      renderWithProviders(
        <ContactForm onSuccess={mockSuccess} onError={() => {}} />
      );

      // Fill out the form
      fireEvent.change(screen.getByLabelText(/full name/i), {
        target: { value: 'John Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'john@example.com' },
      });
      fireEvent.change(screen.getByLabelText(/subject/i), {
        target: { value: 'Test Subject' },
      });
      fireEvent.change(screen.getByLabelText(/message/i), {
        target: { value: 'This is a test message with enough characters.' },
      });

      // Submit the form
      const submitButton = screen.getByRole('button', {
        name: /send message/i,
      });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.stringContaining('"name":"John Doe"'),
        });
        expect(mockSuccess).toHaveBeenCalledWith({ id: '1' });
      });
    });
  });

  describe('Form Validation Integration', () => {
    it('should validate user profile schema correctly', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        ministryRole: 'pastor' as const,
      };

      const result = newUserProfileSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid user profile data', () => {
      const invalidData = {
        firstName: '',
        lastName: 'Doe',
        email: 'invalid-email',
        ministryRole: 'invalid-role' as any,
      };

      const result = newUserProfileSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(3); // firstName, email, ministryRole
      }
    });
  });

  describe('Form State Management', () => {
    it('should handle form loading states', async () => {
      const mockResponse = {
        ok: true,
        json: () =>
          new Promise(resolve =>
            setTimeout(() => resolve({ data: { id: '1' } }), 100)
          ),
      };

      (global.fetch as any).mockResolvedValueOnce(mockResponse);

      renderWithProviders(
        <CreateUserForm onSuccess={() => {}} onError={() => {}} />
      );

      // Fill out the form
      fireEvent.change(screen.getByLabelText(/first name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/last name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: 'john@example.com' },
      });

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /create user/i });
      fireEvent.click(submitButton);

      // Check that button is disabled during submission
      expect(submitButton).toBeDisabled();

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });
    });
  });
});
