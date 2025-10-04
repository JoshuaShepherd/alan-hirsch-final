# Type-Safe Display Components

This directory contains a comprehensive set of type-safe display components for the Alan Hirsch Digital Platform. All components are built with TypeScript strict mode, runtime validation using Zod schemas, and complete type safety from database to UI.

## 🎯 **Architecture Overview**

```
Database → Services → API Routes → Client State → Display Components → UI
    ↓         ↓         ↓            ↓              ↓               ↓
  Schema → Validated → Typed → Props Validated → Safe Render → User Interface
```

## 📁 **Directory Structure**

```
components/display/
├── base/                    # Generic, reusable components
│   ├── data-table.tsx      # Generic table with sorting/filtering
│   ├── entity-card.tsx     # Generic card wrapper
│   ├── entity-list.tsx     # Generic list with pagination
│   ├── loading-skeleton.tsx # Loading states
│   ├── error-boundary.tsx  # Error handling wrapper
│   ├── async-data.tsx      # Async data handling
│   └── index.ts           # Export all base components
├── user/                   # User-specific components
│   ├── user-card.tsx      # User display card
│   ├── user-list.tsx      # User list with search/filter
│   ├── user-profile.tsx   # Detailed user profile
│   ├── user-avatar.tsx    # User avatar component
│   └── index.ts          # Export all user components
├── assessment/            # Assessment-specific components
│   └── assessment-card.tsx # Assessment display card
├── content/               # Content-specific components
│   └── content-item-card.tsx # Content display card
├── shared/                # Shared utility components
│   ├── stats-card.tsx     # Statistics display
│   ├── empty-state.tsx    # Empty state components
│   └── index.ts          # Export shared components
├── examples/              # Usage examples
│   └── dashboard-example.tsx # Complete dashboard example
├── index.ts              # Main export file
└── README.md            # This documentation
```

## 🚀 **Quick Start**

### Basic Usage

```tsx
import { UserCard, UserList, DataTable, AsyncData } from '@/components/display';

// Simple user card
<UserCard
  item={user}
  variant="default"
  showActions={true}
  onEdit={(user) => handleEdit(user)}
/>

// User list with filters
<UserList
  items={users}
  view="grid"
  showFilters={true}
  onItemClick={(user) => navigateToUser(user.id)}
/>

// Data table
<DataTable
  data={users}
  columns={userColumns}
  onRowClick={(user) => handleRowClick(user)}
/>

// Async data handling
<AsyncData
  data={users}
  isLoading={isLoading}
  error={error}
  skeletonType="card"
>
  {(users) => <UserList items={users} />}
</AsyncData>
```

### Advanced Usage

```tsx
import {
  ConditionalRender,
  ErrorBoundary,
  withPropsValidation
} from '@/components/display';

// Conditional rendering
<ConditionalRender
  condition={user}
  fallback={<EmptyState title="No user found" />}
>
  {(user) => <UserProfile data={user} />}
</ConditionalRender>

// Error boundary
<ErrorBoundary
  onError={(error, errorInfo) => logError(error, errorInfo)}
>
  <UserList items={users} />
</ErrorBoundary>

// Props validation HOC
const ValidatedUserCard = withPropsValidation(
  UserCard,
  userCardPropsSchema,
  { strict: true }
);
```

## 🔧 **Component Categories**

### 1. Base Components (Generic)

**DataTable**

- Generic table with sorting, filtering, pagination
- Type-safe column definitions
- Row selection and bulk actions
- Responsive design

**EntityCard**

- Generic card wrapper for any entity
- Multiple variants (default, compact, detailed, minimal)
- Consistent styling and actions
- Automatic entity type detection

**EntityList**

- Generic list with multiple view modes
- Search and filtering capabilities
- Pagination support
- Loading and error states

**LoadingSkeleton**

- Multiple skeleton types (card, list, table, profile)
- Content-specific skeletons
- Configurable count and layout

**ErrorBoundary**

- Comprehensive error handling
- Development error details
- User-friendly error messages
- Error recovery mechanisms

**AsyncData**

- Handles loading, error, and empty states
- Type-safe data access
- Configurable fallbacks
- Multiple specialized variants

### 2. Entity-Specific Components

**User Components**

- `UserCard`: User display with ministry info
- `UserList`: User listing with filters
- `UserProfile`: Detailed user profile view
- `UserAvatar`: Avatar with status indicators

**Assessment Components**

- `AssessmentCard`: Assessment display with validity scores
- Assessment-specific stats and information

**Content Components**

- `ContentItemCard`: Content display with engagement stats
- Content-type specific icons and formatting

### 3. Shared Components

**StatsCard**

- Statistics display with trends
- Multiple format types (currency, percentage, compact)
- Loading states and change indicators

**EmptyState**

- Predefined empty states for common scenarios
- Customizable icons and actions
- Entity-specific empty states

## 🛡️ **Type Safety Features**

### Runtime Validation

All components use Zod schemas for runtime props validation:

```tsx
// Component props are validated at runtime
const validatedProps = validateComponentProps(
  { item: user, variant: 'default' },
  userCardPropsSchema
);
```

### Type Inference

Complete TypeScript inference throughout:

```tsx
// Full type safety from props to data access
<UserCard
  item={user} // TypeScript validates User type
  onEdit={user => {
    // TypeScript infers user parameter type
    console.log(user.id); // Full autocomplete and type checking
  }}
/>
```

### Safe Data Access

No unsafe data access patterns:

```tsx
// Safe data access with proper null checks
<ConditionalRender condition={user.profile} fallback={<ProfilePlaceholder />}>
  {profile => (
    // profile is guaranteed to be non-null here
    <UserProfile profile={profile} />
  )}
</ConditionalRender>
```

## 🎨 **Styling and Theming**

All components use Tailwind CSS with shadcn/ui components:

```tsx
// Consistent styling with theme support
<UserCard
  className="custom-class" // Additional styling
  variant="default" // Predefined variants
/>
```

## 📊 **State Management**

Components handle all possible states gracefully:

```tsx
// Loading state
<UserList items={[]} isLoading={true} />

// Error state
<UserList items={[]} error={new Error('Failed to load')} />

// Empty state
<UserList items={[]} emptyMessage="No users found" />

// Success state
<UserList items={users} />
```

## 🔍 **Search and Filtering**

Built-in search and filtering capabilities:

```tsx
<UserList
  items={users}
  showFilters={true}
  filters={{
    ministryRole: 'pastor',
    countryCode: 'US',
  }}
  onFilterChange={filters => handleFilterChange(filters)}
/>
```

## 📱 **Responsive Design**

All components are fully responsive:

```tsx
// Grid automatically adapts to screen size
<EntityGrid
  items={users}
  columns={4} // 1 on mobile, 2 on tablet, 4 on desktop
/>
```

## 🧪 **Testing**

Components are designed for easy testing:

```tsx
// Test component rendering
render(<UserCard item={mockUser} />);

// Test with different props
render(<UserCard item={mockUser} variant="compact" />);

// Test error states
render(<UserList items={[]} error={mockError} />);
```

## 🚀 **Performance**

Optimized for performance:

- Memoized components where appropriate
- Efficient re-rendering
- Lazy loading support
- Optimized bundle size

## 🔧 **Customization**

Easy to extend and customize:

```tsx
// Custom render function
<EntityList
  items={users}
  renderItem={user => <CustomUserCard user={user} />}
/>;

// Custom column definitions
const customColumns: ColumnDef<User>[] = [
  {
    key: 'name',
    label: 'Full Name',
    render: user => `${user.firstName} ${user.lastName}`,
  },
];
```

## 📚 **Examples**

See `examples/dashboard-example.tsx` for a complete implementation showing:

- Multiple entity types
- Different view modes
- Search and filtering
- Loading and error states
- Async data handling
- Conditional rendering

## 🐛 **Debugging**

Development-friendly debugging:

- Runtime props validation errors
- Detailed error messages in development
- Error boundary integration
- Console logging for invalid props

## 🔄 **Migration Guide**

If migrating from existing components:

1. Import from `@/components/display`
2. Update prop names to match new interfaces
3. Add runtime validation if needed
4. Update error handling to use new patterns

## 🤝 **Contributing**

When adding new components:

1. Follow the established patterns
2. Add runtime validation schemas
3. Include comprehensive TypeScript types
4. Add loading and error states
5. Update this documentation
6. Add usage examples

## 📝 **Best Practices**

1. **Always use runtime validation** for components that receive external data
2. **Handle all states** (loading, error, empty, success)
3. **Use conditional rendering** for optional data
4. **Provide meaningful fallbacks** for error states
5. **Follow accessibility guidelines** (ARIA labels, keyboard navigation)
6. **Test edge cases** (empty arrays, null data, network errors)
7. **Use semantic HTML** and proper component composition
8. **Optimize for performance** with proper memoization
9. **Document component APIs** with TypeScript interfaces
10. **Maintain consistency** with existing design patterns
