# Schema Validation Tests

This directory contains comprehensive validation tests for the Alan Hirsch Digital Platform database schema. These tests ensure that all schema definitions are complete, accurate, and ready for type generation.

## Overview

The schema validation test suite validates:

1. **Database Schema Completeness** - All required tables, fields, and relationships
2. **Drizzle ORM Compatibility** - Proper Drizzle table definitions and type inference
3. **Schema Consistency** - Alignment between database schema and Drizzle definitions
4. **Type Generation Readiness** - Validation that all types can be generated correctly
5. **Alignment Reference Compliance** - Schema matches the alignment reference document

## Test Files

### 1. `comprehensive-schema-validation.test.ts`

**Purpose**: Validates the complete database schema structure and field definitions.

**What it tests**:

- Schema structure and exports
- All table definitions (Auth, Content, Assessment, AI, Community, etc.)
- Field types and constraints
- Relationships and foreign keys
- Enum values and JSONB fields
- Alignment reference compliance

### 2. `drizzle-schema-validation.test.ts`

**Purpose**: Validates Drizzle ORM-specific schema features and functionality.

**What it tests**:

- Drizzle table structure and column definitions
- Type inference capabilities (`$inferSelect`, `$inferInsert`)
- Query builder compatibility
- Relation definitions
- Migration compatibility
- Performance features (prepared statements, raw SQL)

### 3. `schema-consistency-validation.test.ts`

**Purpose**: Validates consistency between database schema and Drizzle definitions.

**What it tests**:

- Table name consistency (snake_case vs camelCase)
- Column name consistency
- Data type consistency
- Constraint consistency
- Foreign key relationship consistency
- Schema export consistency

### 4. `type-generation-validation.test.ts`

**Purpose**: Validates that all types can be generated correctly from the schema.

**What it tests**:

- Schema completeness for type generation
- Type inference validation
- Exported type validation
- Field type validation
- Optional field handling
- JSONB field handling
- Enum field handling

### 5. `schema-validation-suite.test.ts`

**Purpose**: Master test suite that orchestrates all validation tests.

**What it tests**:

- Master schema validation
- Validation summary and reporting
- Final validation checklist
- Type generation readiness

## Running the Tests

### Run All Schema Validation Tests

```bash
npm run validate:schema-before-types
```

### Run Individual Test Files

```bash
# Comprehensive schema validation
npx vitest run __tests__/schema/comprehensive-schema-validation.test.ts

# Drizzle schema validation
npx vitest run __tests__/schema/drizzle-schema-validation.test.ts

# Schema consistency validation
npx vitest run __tests__/schema/schema-consistency-validation.test.ts

# Type generation validation
npx vitest run __tests__/schema/type-generation-validation.test.ts

# Master validation suite
npx vitest run __tests__/schema/schema-validation-suite.test.ts
```

### Run with Coverage

```bash
npx vitest run __tests__/schema/ --coverage
```

## Test Structure

Each test file follows this structure:

```typescript
describe('Test Category', () => {
  describe('Subcategory', () => {
    it('should validate specific aspect', () => {
      // Test implementation
    });
  });
});
```

## Validation Categories

### 1. Schema Structure Validation

- Table definitions and exports
- Column definitions and types
- Constraint definitions
- Default values

### 2. Field Type Validation

- UUID fields
- Text fields
- Timestamp fields
- JSONB fields
- Integer fields
- Boolean fields

### 3. Constraint Validation

- Primary key constraints
- Unique constraints
- Not null constraints
- Foreign key constraints

### 4. Relationship Validation

- Foreign key relationships
- Cascade delete configurations
- Relation definitions

### 5. Enum Validation

- Ministry role enums
- Organization type enums
- Content type enums
- Subscription tier enums

### 6. JSONB Field Validation

- User profile JSONB fields
- Organization JSONB fields
- Content JSONB fields
- Proper typing for complex objects

## Expected Results

When all tests pass, you should see:

```
🔍 Starting Schema Validation Before Type Generation...

📁 Checking test files...
✅ All test files present

🧪 Running comprehensive-schema-validation.test.ts...
✅ comprehensive-schema-validation.test.ts passed

🧪 Running drizzle-schema-validation.test.ts...
✅ drizzle-schema-validation.test.ts passed

🧪 Running schema-consistency-validation.test.ts...
✅ schema-consistency-validation.test.ts passed

🧪 Running type-generation-validation.test.ts...
✅ type-generation-validation.test.ts passed

🧪 Running schema-validation-suite.test.ts...
✅ schema-validation-suite.test.ts passed

📊 Schema Validation Summary:
==================================================
✅ PASSED comprehensive-schema-validation.test.ts
✅ PASSED drizzle-schema-validation.test.ts
✅ PASSED schema-consistency-validation.test.ts
✅ PASSED type-generation-validation.test.ts
✅ PASSED schema-validation-suite.test.ts
==================================================

📈 Results: 5/5 test files passed

🎉 All schema validation tests passed!
✅ Schema is ready for type generation

🚀 You can proceed with type generation
```

## Troubleshooting

### Common Issues

1. **Missing Tables**: If tests fail due to missing tables, check that all schema files are properly exported in the main schema index.

2. **Type Inference Errors**: If type inference fails, ensure that all Drizzle table definitions are properly structured.

3. **Relationship Errors**: If relationship tests fail, check that all foreign key references are properly defined.

4. **Enum Value Mismatches**: If enum tests fail, verify that enum values in the schema match the expected values in the tests.

### Debug Mode

Run tests in debug mode for more detailed output:

```bash
npx vitest run __tests__/schema/ --reporter=verbose
```

## Integration with CI/CD

These tests should be run before any type generation in your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Validate Schema Before Type Generation
  run: npm run validate:schema-before-types
```

## Maintenance

### Adding New Tables

When adding new tables to the schema:

1. Add the table definition to the appropriate schema file
2. Add the table to the main schema export
3. Add validation tests for the new table in the appropriate test files
4. Update the alignment reference if needed
5. Run the validation tests to ensure everything works

### Updating Existing Tables

When updating existing tables:

1. Update the table definition
2. Update the corresponding validation tests
3. Run the validation tests to ensure changes are valid
4. Update the alignment reference if needed

## Related Files

- `packages/database/src/db/schema/` - Schema definitions
- `__docs__/ALIGNMENT_REFERENCE.md` - Alignment reference document
- `scripts/validate-schema-before-type-generation.ts` - Validation script
- `scripts/generate-types-from-schema.ts` - Type generation script

## Support

If you encounter issues with the schema validation tests:

1. Check the test output for specific error messages
2. Verify that all schema files are properly exported
3. Ensure that the alignment reference is up to date
4. Check that all required dependencies are installed

For additional help, refer to the main project documentation or create an issue in the project repository.
