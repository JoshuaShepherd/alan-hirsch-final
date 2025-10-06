import { UserProfileForm as UserProfileFormType } from '@platform/shared/contracts';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { UserProfileForm } from '../../apps/alan-hirsch-platform/components/forms/user/user-profile-form';

// Mock the form components
jest.mock('../../apps/alan-hirsch-platform/components/forms/base-form', () => ({
  BaseForm: ({ children, onSubmit }: any) => (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({ firstName: 'John', lastName: 'Doe' });
      }}
    >
      {children}
      <button type="submit">Submit</button>
    </form>
  ),
  FormFieldGroup: ({ children }: any) => (
    <div data-testid="form-field-group">{children}</div>
  ),
  FormSection: ({ title, children }: any) => (
    <div data-testid="form-section">
      <h3>{title}</h3>
      {children}
    </div>
  ),
}));

jest.mock(
  '../../apps/alan-hirsch-platform/components/forms/form-field',
  () => ({
    FormField: ({ name, label, children, required }: any) => (
      <div data-testid={`form-field-${name}`}>
        <label htmlFor={name}>
          {label}
          {required && <span>*</span>}
        </label>
        {children}
      </div>
    ),
  })
);

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: (name: string) => ({ name }),
    setValue: jest.fn(),
    getValues: jest.fn(),
    watch: jest.fn(),
    formState: { errors: {} },
    handleSubmit: (fn: any) => fn,
  }),
}));

describe('UserProfileForm', () => {
  const mockOnSuccess = jest.fn();
  const mockOnError = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with correct title and description for create mode', () => {
    render(<UserProfileForm mode="create" />);

    expect(screen.getByText('Create Profile')).toBeInTheDocument();
    expect(
      screen.getByText('Set up your ministry profile and preferences')
    ).toBeInTheDocument();
  });

  it('renders form with correct title and description for update mode', () => {
    render(<UserProfileForm mode="update" />);

    expect(screen.getByText('Update Profile')).toBeInTheDocument();
    expect(
      screen.getByText('Update your profile information')
    ).toBeInTheDocument();
  });

  it('renders form with correct title and description for profile mode', () => {
    render(<UserProfileForm mode="profile" />);

    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
    expect(
      screen.getByText('Manage your profile settings and preferences')
    ).toBeInTheDocument();
  });

  it('renders all form sections', () => {
    render(<UserProfileForm />);

    expect(screen.getByText('Basic Information')).toBeInTheDocument();
    expect(screen.getByText('Ministry Context')).toBeInTheDocument();
    expect(screen.getByText('Theological Focus')).toBeInTheDocument();
    expect(screen.getByText('Location & Culture')).toBeInTheDocument();
    expect(screen.getByText('Platform Settings')).toBeInTheDocument();
    expect(screen.getByText('Privacy Settings')).toBeInTheDocument();
    expect(screen.getByText('Email Notifications')).toBeInTheDocument();
  });

  it('renders basic information fields', () => {
    render(<UserProfileForm />);

    expect(screen.getByTestId('form-field-firstName')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-lastName')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-email')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-displayName')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-bio')).toBeInTheDocument();
  });

  it('renders ministry context fields', () => {
    render(<UserProfileForm />);

    expect(screen.getByTestId('form-field-ministryRole')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-denomination')).toBeInTheDocument();
    expect(
      screen.getByTestId('form-field-organizationName')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('form-field-yearsInMinistry')
    ).toBeInTheDocument();
  });

  it('renders location and culture fields', () => {
    render(<UserProfileForm />);

    expect(screen.getByTestId('form-field-countryCode')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-timezone')).toBeInTheDocument();
    expect(
      screen.getByTestId('form-field-languagePrimary')
    ).toBeInTheDocument();
  });

  it('renders platform settings fields', () => {
    render(<UserProfileForm />);

    expect(screen.getByTestId('form-field-subdomain')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-platformTitle')).toBeInTheDocument();
  });

  it('shows required fields with asterisk in create mode', () => {
    render(<UserProfileForm mode="create" />);

    const firstNameField = screen.getByTestId('form-field-firstName');
    const lastNameField = screen.getByTestId('form-field-lastName');
    const emailField = screen.getByTestId('form-field-email');
    const ministryRoleField = screen.getByTestId('form-field-ministryRole');

    expect(firstNameField).toHaveTextContent('*');
    expect(lastNameField).toHaveTextContent('*');
    expect(emailField).toHaveTextContent('*');
    expect(ministryRoleField).toHaveTextContent('*');
  });

  it('does not show required asterisks in update mode', () => {
    render(<UserProfileForm mode="update" />);

    const firstNameField = screen.getByTestId('form-field-firstName');
    const lastNameField = screen.getByTestId('form-field-lastName');
    const emailField = screen.getByTestId('form-field-email');
    const ministryRoleField = screen.getByTestId('form-field-ministryRole');

    expect(firstNameField).not.toHaveTextContent('*');
    expect(lastNameField).not.toHaveTextContent('*');
    expect(emailField).not.toHaveTextContent('*');
    expect(ministryRoleField).not.toHaveTextContent('*');
  });

  it('does not show required asterisks in profile mode', () => {
    render(<UserProfileForm mode="profile" />);

    const firstNameField = screen.getByTestId('form-field-firstName');
    const lastNameField = screen.getByTestId('form-field-lastName');
    const emailField = screen.getByTestId('form-field-email');
    const ministryRoleField = screen.getByTestId('form-field-ministryRole');

    expect(firstNameField).not.toHaveTextContent('*');
    expect(lastNameField).not.toHaveTextContent('*');
    expect(emailField).not.toHaveTextContent('*');
    expect(ministryRoleField).not.toHaveTextContent('*');
  });

  it('renders submit button with correct text for create mode', () => {
    render(<UserProfileForm mode="create" />);

    expect(screen.getByText('Create Profile')).toBeInTheDocument();
  });

  it('renders submit button with correct text for update mode', () => {
    render(<UserProfileForm mode="update" />);

    expect(screen.getByText('Save Changes')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<UserProfileForm className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles form submission successfully', async () => {
    render(<UserProfileForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it('handles form submission with error', async () => {
    // Mock fetch to return error
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Validation error' }),
    });

    render(<UserProfileForm onSuccess={mockOnSuccess} onError={mockOnError} />);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnError).toHaveBeenCalled();
    });
  });

  it('renders with default values', () => {
    const defaultValues: Partial<UserProfileFormType> = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      ministryRole: 'church_planter',
    };

    render(<UserProfileForm defaultValues={defaultValues} />);

    // The form should render with the default values
    expect(screen.getByTestId('form-field-firstName')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-lastName')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-email')).toBeInTheDocument();
    expect(screen.getByTestId('form-field-ministryRole')).toBeInTheDocument();
  });

  it('renders ministry role options correctly', () => {
    render(<UserProfileForm />);

    // Check that the ministry role field is rendered
    expect(screen.getByTestId('form-field-ministryRole')).toBeInTheDocument();
  });

  it('renders cultural context options correctly', () => {
    render(<UserProfileForm />);

    // Check that the cultural context field is rendered
    expect(
      screen.getByTestId('form-field-culturalContext')
    ).toBeInTheDocument();
  });

  it('renders language options correctly', () => {
    render(<UserProfileForm />);

    // Check that the language field is rendered
    expect(
      screen.getByTestId('form-field-languagePrimary')
    ).toBeInTheDocument();
  });

  it('handles loading state', () => {
    render(<UserProfileForm isLoading={true} />);

    // The form should still render when loading
    expect(screen.getByText('Profile Settings')).toBeInTheDocument();
  });

  it('renders privacy settings section', () => {
    render(<UserProfileForm />);

    expect(screen.getByText('Privacy Settings')).toBeInTheDocument();
    expect(
      screen.getByText('Control your privacy and visibility')
    ).toBeInTheDocument();
  });

  it('renders email notifications section', () => {
    render(<UserProfileForm />);

    expect(screen.getByText('Email Notifications')).toBeInTheDocument();
    expect(
      screen.getByText("Choose what email updates you'd like to receive")
    ).toBeInTheDocument();
  });
});
