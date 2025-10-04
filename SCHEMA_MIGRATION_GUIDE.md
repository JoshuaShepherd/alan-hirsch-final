# Schema Migration Guide

## Overview

This guide documents the migration from the fragmented 5-layer schema system to the unified contracts package system.

## Migration Steps

### 1. New Schema Structure

- **Entity Schemas**: `packages/contracts/src/entities/` - Single source of truth
- **Operations**: `packages/contracts/src/operations/` - Derived from entities
- **API Contracts**: `packages/contracts/src/api/` - Derived from operations

### 2. Files to be Eliminated

- `src/lib/schemas/database.schemas.ts`
- `src/lib/schemas/crud.schemas.ts`
- `src/lib/schemas/api.schemas.ts`
- `src/lib/schemas/form.schemas.ts`
- `src/lib/schemas/shared.schemas.ts`
- `validations/` directory (consolidated into contracts)
- `lib/contracts/` directory (consolidated into contracts)

### 3. Import Migration Map

#### Old Imports → New Imports

**User Schemas:**

```typescript
// OLD
import {
  DatabaseUserProfile,
  NewUserProfile,
  UpdateUserProfile,
} from '@/src/lib/schemas';
import { UserProfile } from '@/validations/auth';

// NEW
import {
  UserEntity,
  CreateUser,
  UpdateUser,
} from '@platform/contracts/entities';
import { UserEntity as UserProfile } from '@platform/contracts/entities';
```

**Assessment Schemas:**

```typescript
// OLD
import {
  DatabaseAssessment,
  NewAssessment,
  UpdateAssessment,
} from '@/src/lib/schemas';
import { Assessment } from '@/validations/assessments';

// NEW
import {
  AssessmentEntity,
  CreateAssessment,
  UpdateAssessment,
} from '@platform/contracts/entities';
import { AssessmentEntity as Assessment } from '@platform/contracts/entities';
```

**Organization Schemas:**

```typescript
// OLD
import {
  DatabaseOrganization,
  NewOrganization,
  UpdateOrganization,
} from '@/src/lib/schemas';
import { Organization } from '@/validations/auth';

// NEW
import {
  OrganizationEntity,
  CreateOrganization,
  UpdateOrganization,
} from '@platform/contracts/entities';
import { OrganizationEntity as Organization } from '@platform/contracts/entities';
```

**Content Schemas:**

```typescript
// OLD
import {
  DatabaseContentItem,
  NewContentItem,
  UpdateContentItem,
} from '@/src/lib/schemas';
import { ContentItem } from '@/validations/content';

// NEW
import {
  ContentItemEntity,
  CreateContentItem,
  UpdateContentItem,
} from '@platform/contracts/entities';
import { ContentItemEntity as ContentItem } from '@platform/contracts/entities';
```

**API Contracts:**

```typescript
// OLD
import { UserApiRequest, UserApiResponse } from '@/lib/contracts';

// NEW
import { CreateUserApiRequest, UserApiResponse } from '@platform/contracts/api';
```

### 4. Migration Priority

1. **High Priority**: API routes and services
2. **Medium Priority**: Components and forms
3. **Low Priority**: Tests and documentation

### 5. Testing Strategy

- Run existing tests to ensure no functionality regression
- Update test imports to use new contracts
- Add tests for schema derivation relationships

### 6. Rollback Plan

- Keep original files in git history
- Use git checkout to restore if needed
- Document any breaking changes

## Status

- [x] Step 1.1: Create unified entity schemas
- [x] Step 1.2: Derive operations from entities
- [x] Step 1.3: Generate API contracts from operations
- [ ] Step 1.4: Eliminate redundant files and update imports
