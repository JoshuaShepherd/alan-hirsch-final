# 🏗️ **Monorepo Architecture & Troubleshooting Guide**

**Project**: Alan Hirsch Final - Ministry Platform
**Architecture**: Next.js 14+ Monorepo with TypeScript, Supabase, Drizzle ORM
**Purpose**: Comprehensive guide for troubleshooting schema, contracts, types, and data flow issues

---

## 🎯 **Monorepo Philosophy & Design Principles**

### **Core Principles**

1. **Single Source of Truth**: All related code in one repository
2. **Shared Dependencies**: Common packages for consistency
3. **Type Safety**: End-to-end TypeScript with strict validation
4. **Layered Architecture**: Clear separation of concerns
5. **Incremental Adoption**: Gradual migration and improvement

### **Package Strategy**

- **Database Package**: Schema definitions and migrations
- **Shared Package**: Common utilities and types
- **UI Package**: Reusable component library
- **ESLint Config**: Consistent code quality rules

---

## 📦 **Package Architecture Deep Dive**

### **1. Database Package (`packages/database/`)**

**Purpose**: Centralized database schema and migration management

```typescript
// packages/database/schema.ts
export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  // ... other fields
});

export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  // ... other fields
});
```

**Key Responsibilities**:

- Drizzle schema definitions
- Database migrations
- Type generation
- Connection configuration

**Troubleshooting Database Issues**:

1. **Schema Mismatches**: Check `packages/database/schema.ts` vs actual database
2. **Migration Failures**: Verify `packages/database/migrations/` are applied
3. **Type Errors**: Regenerate types with `drizzle-kit generate`
4. **Connection Issues**: Check `packages/database/drizzle.config.js`

### **2. Shared Package (`packages/shared/`)**

**Purpose**: Common utilities, types, and business logic

```typescript
// packages/shared/index.ts
export * from './types';
export * from './utils';
export * from './constants';
export * from './validators';

// packages/shared/types.ts
export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends BaseEntity {
  email: string;
  first_name: string;
  last_name: string;
  // ... other fields
}
```

**Key Responsibilities**:

- Shared TypeScript types
- Common utility functions
- Business logic constants
- Validation helpers

**Troubleshooting Shared Package Issues**:

1. **Import Errors**: Check `packages/shared/package.json` exports
2. **Type Conflicts**: Verify type definitions are unique
3. **Circular Dependencies**: Check import paths in `packages/shared/index.ts`

### **3. UI Package (`packages/ui/`)**

**Purpose**: Reusable UI components and design system

```typescript
// packages/ui/index.ts
export * from './components/button';
export * from './components/input';
export * from './components/card';
// ... other components

// packages/ui/components/button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}
```

**Key Responsibilities**:

- Component library
- Design system tokens
- Accessibility utilities
- Theme management

**Troubleshooting UI Package Issues**:

1. **Component Import Errors**: Check `packages/ui/index.ts` exports
2. **Styling Issues**: Verify Tailwind configuration
3. **Type Errors**: Check component prop interfaces

### **4. ESLint Config Package (`packages/eslint-config/`)**

**Purpose**: Consistent code quality and style rules

```javascript
// packages/eslint-config/index.js
module.exports = {
  extends: ['@typescript-eslint/recommended', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-function-return-type': 'warn',
    // ... other rules
  },
};
```

---

## 🔄 **Data Flow Architecture**

### **Request/Response Flow**

```
Frontend Component
    ↓
API Route (/app/api/)
    ↓
Service Layer (/lib/services/)
    ↓
Database Layer (/lib/db/)
    ↓
Supabase/PostgreSQL
    ↓
Mappers (/lib/mappers/)
    ↓
Contracts (/lib/contracts/)
    ↓
API Response
    ↓
Frontend Component
```

### **Type Flow**

```
Database Schema (packages/database/)
    ↓
Database Types (lib/db/schema/)
    ↓
CRUD Schemas (src/lib/schemas/crud.schemas.ts)
    ↓
API Schemas (src/lib/schemas/api.schemas.ts)
    ↓
Contracts (lib/contracts/)
    ↓
Mappers (lib/mappers/)
    ↓
Frontend Types (types/)
```

---

## 🧩 **Schema System Architecture**

### **Multi-Layer Schema Approach**

The project uses a sophisticated multi-layer schema system to ensure type safety across all layers:

#### **1. Database Schema Layer (`packages/database/`)**

```typescript
// Raw Drizzle schema - exact database structure
export const userProfiles = pgTable('user_profiles', {
  id: uuid('id').primaryKey(),
  email: varchar('email').notNull(),
  first_name: varchar('first_name').notNull(),
  // ... all database fields
});
```

#### **2. Database Validation Layer (`src/lib/schemas/database.schemas.ts`)**

```typescript
// Zod schemas for database validation
export const databaseUserProfileSchema = z.object({
  id: uuidSchema,
  email: emailSchema,
  first_name: z.string().min(1),
  // ... validated database structure
});
```

#### **3. CRUD Operation Layer (`src/lib/schemas/crud.schemas.ts`)**

```typescript
// Schemas for Create, Update, Query operations
export const newUserProfileSchema = databaseUserProfileSchema
  .omit({ id: true, created_at: true, updated_at: true })
  .partial({
    // Make optional fields for creation
    assessment_movement_alignment: true,
    // ...
  });

export const updateUserProfileSchema = newUserProfileSchema.partial({
  email: true,
  first_name: true,
  // ...
});
```

#### **4. API Contract Layer (`lib/contracts/`)**

```typescript
// API request/response contracts
export interface CreateUserProfileRequest {
  first_name: string;
  last_name: string;
  email: string;
  // ... API-specific fields
}

export interface UserProfileResponse {
  id: string;
  first_name: string;
  last_name: string;
  // ... response-specific fields
}
```

#### **5. Validation Schema Layer (`validations/`)**

```typescript
// Zod schemas for form validation
export const createUserProfileSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email format'),
  // ... validation rules
});
```

### **Schema Troubleshooting Guide**

#### **Common Schema Issues & Solutions**

1. **Type Mismatches Between Layers**

   ```typescript
   // Problem: Database field doesn't match API contract
   // Database: first_name (snake_case)
   // API: firstName (camelCase)

   // Solution: Use mappers to transform data
   export const mapUserProfileToApi = (
     db: DatabaseUserProfile
   ): UserProfileResponse => ({
     id: db.id,
     firstName: db.first_name, // Transform snake_case to camelCase
     lastName: db.last_name,
     // ...
   });
   ```

2. **Optional vs Required Field Conflicts**

   ```typescript
   // Problem: Field is optional in database but required in API

   // Solution: Use different schemas for different contexts
   export const createUserProfileSchema = z.object({
     first_name: z.string().min(1), // Required for creation
   });

   export const updateUserProfileSchema = z.object({
     first_name: z.string().min(1).optional(), // Optional for updates
   });
   ```

3. **JSONB Field Validation Issues**

   ```typescript
   // Problem: JSONB fields not validating correctly

   // Solution: Use proper JSONB schema
   export const jsonbSchema = z
     .any()
     .refine(
       val => typeof val === 'object' && val !== null && !Array.isArray(val),
       { message: 'Must be a valid JSON object' }
     );

   export const databaseUserProfileSchema = z.object({
     // ...
     brand_colors: jsonbSchema.optional(),
     privacy_settings: jsonbSchema.optional(),
   });
   ```

---

## 🔗 **Contract & Mapper System**

### **Contract Layer (`lib/contracts/`)**

**Purpose**: Define API boundaries and data contracts

```typescript
// lib/contracts/assessments.request.ts
export interface CreateAssessmentRequest {
  name: string;
  description: string;
  assessment_type: AssessmentType;
  questions_count: number;
}

export interface UpdateAssessmentRequest
  extends Partial<CreateAssessmentRequest> {
  id: string;
}

// lib/contracts/assessments.response.ts
export interface AssessmentResponse {
  id: string;
  name: string;
  description: string;
  assessment_type: AssessmentType;
  questions_count: number;
  created_at: string;
  updated_at: string;
}
```

### **Mapper Layer (`lib/mappers/`)**

**Purpose**: Transform data between different layers

```typescript
// lib/mappers/assessments.ts
export const mapDatabaseAssessmentToApi = (
  db: DatabaseAssessment
): AssessmentResponse => ({
  id: db.id,
  name: db.name,
  description: db.description,
  assessment_type: db.assessment_type,
  questions_count: db.questions_count,
  created_at: db.created_at,
  updated_at: db.updated_at,
});

export const mapApiAssessmentToDatabase = (
  api: CreateAssessmentRequest
): NewAssessment => ({
  name: api.name,
  description: api.description,
  assessment_type: api.assessment_type,
  questions_count: api.questions_count,
});
```

### **Contract & Mapper Troubleshooting**

#### **Common Issues & Solutions**

1. **Data Transformation Errors**

   ```typescript
   // Problem: Field mapping fails
   // Solution: Add proper type guards and validation

   export const mapUserProfileToApi = (
     db: DatabaseUserProfile
   ): UserProfileResponse => {
     // Validate input
     if (!db || !db.id) {
       throw new Error('Invalid database user profile');
     }

     return {
       id: db.id,
       firstName: db.first_name || '', // Handle undefined values
       lastName: db.last_name || '',
       // ...
     };
   };
   ```

2. **Type Safety Issues**

   ```typescript
   // Problem: Type mismatches in mappers
   // Solution: Use strict typing and validation

   export const validateApiRequest = <T>(
     schema: z.ZodSchema<T>,
     data: unknown
   ): T => {
     const result = schema.safeParse(data);
     if (!result.success) {
       throw new Error(`Validation failed: ${result.error.message}`);
     }
     return result.data;
   };
   ```

3. **Circular Dependency Issues**

   ```typescript
   // Problem: Circular imports between contracts and mappers
   // Solution: Use dependency injection or separate interfaces

   // lib/contracts/interfaces.ts
   export interface IUserProfileMapper {
     mapToApi(db: DatabaseUserProfile): UserProfileResponse;
     mapToDatabase(api: CreateUserProfileRequest): NewUserProfile;
   }

   // lib/mappers/user-profiles.ts
   export class UserProfileMapper implements IUserProfileMapper {
     // Implementation
   }
   ```

---

## 🗄️ **Database Architecture**

### **Supabase Integration**

```typescript
// lib/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export const supabase = createClientComponentClient();

// lib/supabase/server.ts
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const createServerSupabaseClient = () => {
  return createServerComponentClient({ cookies });
};
```

### **Drizzle ORM Integration**

```typescript
// lib/db/drizzle.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
export const db = drizzle(client, { schema });

// lib/db/queries.ts
export const getUserProfile = async (id: string) => {
  const result = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.id, id))
    .limit(1);

  return result[0];
};
```

### **Database Troubleshooting**

1. **Connection Issues**

   ```typescript
   // Check environment variables
   console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Missing');

   // Test connection
   try {
     const result = await db.select().from(userProfiles).limit(1);
     console.log('Database connection successful');
   } catch (error) {
     console.error('Database connection failed:', error);
   }
   ```

2. **Schema Mismatches**

   ```typescript
   // Compare database schema with Drizzle schema
   const dbSchema = await db.execute(
     sql`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'user_profiles'`
   );
   console.log('Database schema:', dbSchema);
   ```

3. **Migration Issues**

   ```bash
   # Check migration status
   npx drizzle-kit migrate

   # Generate new migration
   npx drizzle-kit generate
   ```

---

## 🧪 **Testing Architecture**

### **Test Organization**

```
__tests__/                    # Unit & Integration Tests
├── api/                      # API route tests
├── ui/                       # Component tests
├── mappers/                  # Mapper function tests
├── validations/              # Schema validation tests
└── mocks/                    # Mock data and utilities

tests/                        # E2E Tests
├── e2e/                      # End-to-end test scenarios
├── rls/                      # Row-level security tests
└── setup.ts                  # Test configuration
```

### **Testing Patterns**

```typescript
// __tests__/api/assessments.test.ts
describe('Assessment API', () => {
  beforeEach(() => {
    // Setup test database
    setupTestDatabase();
  });

  it('should create assessment', async () => {
    const request: CreateAssessmentRequest = {
      name: 'Test Assessment',
      description: 'Test Description',
      assessment_type: 'apest',
      questions_count: 10,
    };

    const response = await createAssessment(request);

    expect(response.success).toBe(true);
    expect(response.data).toMatchObject({
      name: request.name,
      assessment_type: request.assessment_type,
    });
  });
});
```

---

## 🔧 **Troubleshooting Quick Reference**

### **Common Issues & Solutions**

#### **1. Type Errors**

```bash
# Regenerate types
npm run type-check
npm run build

# Check specific file
npx tsc --noEmit --skipLibCheck src/lib/schemas/database.schemas.ts
```

#### **2. Schema Validation Failures**

```typescript
// Debug schema validation
const result = schema.safeParse(data);
if (!result.success) {
  console.error('Validation errors:', result.error.errors);
}
```

#### **3. Import/Export Issues**

```typescript
// Check package exports
// packages/shared/package.json
{
  "exports": {
    ".": "./index.ts",
    "./types": "./types.ts"
  }
}
```

#### **4. Database Connection Issues**

```bash
# Check Supabase connection
npm run db:check

# Test database queries
npm run db:test
```

#### **5. Build Failures**

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## 📊 **Performance & Monitoring**

### **Bundle Analysis**

```bash
# Analyze bundle size
npm run analyze

# Check for duplicate dependencies
npm run check-duplicates
```

### **Type Performance**

```bash
# Check TypeScript performance
npm run type-check -- --diagnostics
```

---

## 🚀 **Deployment Considerations**

### **Environment Variables**

```bash
# Required environment variables
DATABASE_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### **Build Optimization**

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};
```

---

## 📚 **Additional Resources**

### **Key Documentation Files**

- `__docs__/MASTER/TYPE_SYSTEM_GUIDE.md` - Comprehensive type system guide
- `__docs__/MASTER/MAPPER_GUIDELINES.md` - Mapper implementation guidelines
- `__docs__/MASTER/DB_SCHEMA_GUIDE.md` - Database schema documentation
- `__docs__/rls/` - Row-level security documentation

### **Useful Commands**

```bash
# Development
npm run dev                    # Start development server
npm run db:studio             # Open Drizzle Studio
npm run test                  # Run all tests
npm run test:watch            # Run tests in watch mode

# Building
npm run build                 # Build for production
npm run type-check           # Type check only
npm run lint                 # Lint code

# Database
npm run db:generate          # Generate migrations
npm run db:migrate           # Apply migrations
npm run db:seed              # Seed database
```

---

_This guide provides comprehensive coverage of the monorepo architecture and troubleshooting approaches. For specific issues, refer to the relevant documentation files in the `__docs__/` directory._
