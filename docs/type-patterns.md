# TypeScript Patterns & Best Practices

This document contains common type patterns, error handling examples, and best practices used throughout the project.

## Table of Contents

- [Common Type Patterns](#common-type-patterns)
- [Error Handling](#error-handling)
- [Database Query Patterns](#database-query-patterns)
- [API Response Patterns](#api-response-patterns)
- [Component Prop Patterns](#component-prop-patterns)
- [Form Validation Patterns](#form-validation-patterns)

## Common Type Patterns

### User Types

```typescript
// User with optional fields
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// User with nullable fields
interface UserProfile {
  id: string;
  userId: string;
  bio?: string | null;
  avatar?: string | null;
  preferences: UserPreferences;
}

// User preferences with defaults
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: boolean;
  language: string;
}
```

### API Response Types

```typescript
// Standard API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Paginated response
interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error response
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}
```

### Database Types

```typescript
// Base entity with common fields
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Assessment with relations
interface Assessment extends BaseEntity {
  title: string;
  description: string;
  userId: string;
  organizationId: string;
  status: 'draft' | 'published' | 'archived';
  questions: Question[];
  results?: AssessmentResult[];
}

// Question with proper typing
interface Question {
  id: string;
  text: string;
  type: 'multiple-choice' | 'text' | 'rating' | 'boolean';
  options?: string[];
  required: boolean;
  order: number;
}
```

## Error Handling

### API Error Handling

```typescript
// API route error handling
export async function GET(request: Request) {
  try {
    const data = await fetchData();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('API Error:', error);

    if (error instanceof ValidationError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 400 }
      );
    }

    if (error instanceof DatabaseError) {
      return NextResponse.json(
        { success: false, error: 'Database error occurred' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Client-Side Error Handling

```typescript
// React component error handling
interface ComponentProps {
  userId: string;
}

export function UserProfile({ userId }: ComponentProps) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/users/${userId}`);
        const result: ApiResponse<User> = await response.json();

        if (!result.success || !result.data) {
          throw new Error(result.error || 'Failed to fetch user');
        }

        setUser(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return <div>{user.name}</div>;
}
```

### Error Boundary

```typescript
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Database Query Patterns

### Drizzle Query Patterns

```typescript
// Type-safe database queries
export async function getUserById(id: string): Promise<User | null> {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    console.error('Database error:', error);
    throw new DatabaseError('Failed to fetch user');
  }
}

// Insert with proper typing
export async function createUser(userData: CreateUserInput): Promise<User> {
  try {
    const result = await db
      .insert(users)
      .values({
        ...userData,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    if (!result[0]) {
      throw new DatabaseError('Failed to create user');
    }

    return result[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new DatabaseError('Failed to create user');
  }
}

// Update with validation
export async function updateUser(
  id: string,
  updates: Partial<UpdateUserInput>
): Promise<User> {
  try {
    const result = await db
      .update(users)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!result[0]) {
      throw new DatabaseError('User not found');
    }

    return result[0];
  } catch (error) {
    console.error('Database error:', error);
    throw new DatabaseError('Failed to update user');
  }
}
```

### Transaction Patterns

```typescript
// Database transaction with proper error handling
export async function createAssessmentWithQuestions(
  assessmentData: CreateAssessmentInput,
  questions: CreateQuestionInput[]
): Promise<Assessment> {
  return await db.transaction(async tx => {
    try {
      // Create assessment
      const [assessment] = await tx
        .insert(assessments)
        .values({
          ...assessmentData,
          id: generateId(),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      if (!assessment) {
        throw new DatabaseError('Failed to create assessment');
      }

      // Create questions
      const questionValues = questions.map((question, index) => ({
        ...question,
        id: generateId(),
        assessmentId: assessment.id,
        order: index + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const createdQuestions = await tx
        .insert(questions)
        .values(questionValues)
        .returning();

      return {
        ...assessment,
        questions: createdQuestions,
      };
    } catch (error) {
      console.error('Transaction error:', error);
      throw new DatabaseError('Failed to create assessment with questions');
    }
  });
}
```

## API Response Patterns

### Standard API Route

```typescript
// GET endpoint with proper typing
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate input
    const validatedId = z.string().uuid().parse(id);

    // Fetch data
    const user = await getUserById(validatedId);

    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID' },
        { status: 400 }
      );
    }

    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### POST Endpoint with Validation

```typescript
// POST endpoint with input validation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input using Zod
    const validatedData = CreateUserSchema.parse(body);

    // Check for existing user
    const existingUser = await getUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 409 }
      );
    }

    // Create user
    const user = await createUser(validatedData);

    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

## Component Prop Patterns

### Form Component Props

```typescript
// Form component with proper typing
interface AssessmentFormProps {
  initialData?: Partial<Assessment>;
  onSubmit: (data: CreateAssessmentInput) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

export function AssessmentForm({
  initialData,
  onSubmit,
  onCancel,
  loading = false,
  errors = {},
}: AssessmentFormProps) {
  const [formData, setFormData] = useState<CreateAssessmentInput>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'draft',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### List Component Props

```typescript
// Generic list component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  className?: string;
}

export function List<T>({
  items,
  renderItem,
  loading = false,
  error = null,
  emptyMessage = 'No items found',
  className,
}: ListProps<T>) {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (items.length === 0) return <div>{emptyMessage}</div>;

  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
```

## Form Validation Patterns

### Zod Schema Patterns

```typescript
// User validation schemas
export const CreateUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const UserQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  sortBy: z.enum(['name', 'email', 'createdAt']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Assessment validation schemas
export const CreateAssessmentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export const CreateQuestionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['multiple-choice', 'text', 'rating', 'boolean']),
  options: z.array(z.string()).optional(),
  required: z.boolean().default(true),
  order: z.number().min(0),
});
```

### Form Hook Patterns

```typescript
// Custom form hook with validation
export function useAssessmentForm(initialData?: Partial<Assessment>) {
  const [formData, setFormData] = useState<CreateAssessmentInput>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'draft',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = (data: CreateAssessmentInput): boolean => {
    try {
      CreateAssessmentSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const updateField = (field: keyof CreateAssessmentInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const submit = async (): Promise<boolean> => {
    if (!validate(formData)) return false;

    setLoading(true);
    try {
      // Submit logic here
      return true;
    } catch (error) {
      console.error('Form submission error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    errors,
    loading,
    updateField,
    submit,
    validate: () => validate(formData),
  };
}
```

## Best Practices Summary

### Do's ✅

- Always define explicit return types for functions
- Use proper interfaces for object shapes
- Prefer union types over `any`
- Use generic types for reusable components
- Handle null/undefined cases explicitly
- Validate all external data with Zod schemas
- Use proper error types, not `any`
- Implement error boundaries in React components
- Use Drizzle's type-safe queries
- Handle database errors gracefully

### Don'ts ❌

- Don't use `any` types without team discussion
- Don't use non-null assertions (`!`) unless absolutely necessary
- Don't ignore TypeScript errors
- Don't use implicit any in function parameters
- Don't expose sensitive data to client
- Don't skip input validation
- Don't use raw database rows in API responses
- Don't define Zod schemas outside contracts/validations directories

---

_This document should be updated as new patterns emerge and best practices evolve._

