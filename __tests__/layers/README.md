# Layer Testing Suite

This directory contains comprehensive tests for the 4-layer architecture of the Alan Hirsch Digital Platform:

1. **Database Schema Layer** (`@platform/database`)
2. **Types Layer** (`@platform/types`)
3. **Contracts Layer** (`@platform/contracts`)
4. **Mappers Layer** (`@platform/shared/mappers`)

## Overview

The layer testing strategy ensures that each layer is thoroughly validated before system integration. This approach builds confidence in the system's architecture and reduces integration risks.

## Test Structure

### Individual Layer Tests

- **`schema-layer.test.ts`** - Tests database schema definitions, types, and relationships
- **`types-layer.test.ts`** - Tests TypeScript type definitions and their consistency
- **`contracts-layer.test.ts`** - Tests Zod validation schemas and API contracts
- **`mappers-layer.test.ts`** - Tests data transformation functions between database and API formats

### Integration Tests

- **`integration-layer-boundaries.test.ts`** - Tests the integration between different layers

### Configuration

- **`test-setup.ts`** - Shared utilities and test data factories
- **`layer-test.config.ts`** - Vitest configuration for layer tests

## Running Tests

### Run All Layer Tests

```bash
# Run the comprehensive layer test suite
npm run test:layers

# Or run directly with tsx
npx tsx scripts/test-layers.ts
```

### Run Individual Layer Tests

```bash
# Schema layer tests
npx vitest run __tests__/layers/schema-layer.test.ts --config __tests__/layers/layer-test.config.ts

# Types layer tests
npx vitest run __tests__/layers/types-layer.test.ts --config __tests__/layers/layer-test.config.ts

# Contracts layer tests
npx vitest run __tests__/layers/contracts-layer.test.ts --config __tests__/layers/layer-test.config.ts

# Mappers layer tests
npx vitest run __tests__/layers/mappers-layer.test.ts --config __tests__/layers/layer-test.config.ts

# Integration tests
npx vitest run __tests__/layers/integration-layer-boundaries.test.ts --config __tests__/layers/layer-test.config.ts
```

### Run with Coverage

```bash
# Run all layer tests with coverage
npx vitest run __tests__/layers --config __tests__/layers/layer-test.config.ts --coverage
```

## Test Categories

### Schema Layer Tests

- **Schema Exports**: Verify all schema definitions are exported correctly
- **Type Definitions**: Ensure TypeScript types match schema structure
- **Schema Relationships**: Test foreign key relationships and constraints
- **Enum Values**: Validate enum values are correctly defined
- **Default Values**: Test default value assignments
- **JSONB Fields**: Test JSONB field structure and types
- **Timestamps**: Verify timestamp field handling
- **Schema Completeness**: Ensure all required fields are present

### Types Layer Tests

- **Database Type Exports**: Verify all database types are exported
- **Type Structure Validation**: Test type structure and field types
- **Enum Type Validation**: Test enum value typing
- **Component Prop Types**: Test React component prop types
- **Utility Types**: Test utility type definitions
- **Type Compatibility**: Test compatibility between different type layers
- **Null Safety**: Test nullable field handling
- **Array and Object Types**: Test complex type structures

### Contracts Layer Tests

- **Schema Exports**: Verify all Zod schemas are exported
- **Validation Logic**: Test valid and invalid data validation
- **Enum Validation**: Test enum value validation
- **Format Validation**: Test email, UUID, URL format validation
- **Schema Coverage**: Test all exported schemas
- **Type Safety**: Test TypeScript integration
- **Performance**: Test validation performance
- **Error Handling**: Test error message quality

### Mappers Layer Tests

- **Transformation Logic**: Test data transformation functions
- **Round-trip Mapping**: Test bidirectional mapping integrity
- **Edge Cases**: Test null, undefined, and empty value handling
- **Performance**: Test mapping performance
- **Type Safety**: Test type safety in transformations
- **Data Integrity**: Test no data loss during transformation

### Integration Tests

- **Layer Boundary Integration**: Test integration between adjacent layers
- **End-to-End Data Flow**: Test complete data flow through all layers
- **Error Handling**: Test error propagation across layers
- **Type Safety**: Test type safety across all layers
- **Performance**: Test performance across all layers
- **Data Consistency**: Test data consistency across layers

## Test Data

The test suite uses consistent test data factories defined in `test-setup.ts`:

- `createTestUserProfile()` - Creates test user profile data
- `createTestOrganization()` - Creates test organization data
- `createTestAssessment()` - Creates test assessment data
- `generateMockData` - Generates various mock data types

## Coverage Requirements

The test suite enforces the following coverage requirements:

- **Global**: 80% branches, functions, lines, statements
- **Database Layer**: 70% branches, 80% functions, lines, statements
- **Types Layer**: 90% branches, functions, lines, statements
- **Contracts Layer**: 85% branches, functions, lines, statements
- **Mappers Layer**: 80% branches, functions, lines, statements

## Reporting

The test suite generates comprehensive reports:

- **JSON Report**: `test-results/layer-test-report.json`
- **Markdown Report**: `test-results/layer-test-report.md`
- **Coverage Report**: `coverage/layers/`

## Best Practices

### Test Organization

1. **Layer Isolation**: Each layer is tested in isolation
2. **Contract Validation**: Each layer's contract with adjacent layers is tested
3. **Type Safety**: TypeScript types are verified for correctness
4. **Incremental Validation**: Tests build confidence layer by layer

### Test Data Management

1. **Consistent Test Data**: Use test data factories for consistency
2. **Edge Case Coverage**: Test null, undefined, and edge cases
3. **Performance Testing**: Include performance benchmarks
4. **Error Testing**: Test error conditions and handling

### Continuous Integration

1. **Pre-commit Hooks**: Run layer tests before commits
2. **CI Pipeline**: Include layer tests in CI/CD pipeline
3. **Coverage Monitoring**: Monitor coverage trends
4. **Performance Monitoring**: Track performance metrics

## Troubleshooting

### Common Issues

1. **Import Errors**: Ensure all package aliases are configured correctly
2. **Type Errors**: Verify TypeScript configuration and type exports
3. **Test Timeouts**: Adjust timeout settings for slow tests
4. **Coverage Issues**: Check coverage configuration and thresholds

### Debug Mode

```bash
# Run tests in debug mode
npx vitest run __tests__/layers --config __tests__/layers/layer-test.config.ts --reporter=verbose

# Run specific test file in debug mode
npx vitest run __tests__/layers/schema-layer.test.ts --config __tests__/layers/layer-test.config.ts --reporter=verbose
```

## Success Metrics

### Layer Validation Checklist

- [ ] All schemas validate correctly with valid data
- [ ] All schemas reject invalid data appropriately
- [ ] All mappers transform data correctly in both directions
- [ ] All types compile without errors
- [ ] Round-trip mapping preserves data integrity
- [ ] Edge cases (null, undefined, empty) are handled correctly
- [ ] Performance is acceptable for expected data volumes
- [ ] Error handling is comprehensive and informative

### Integration Readiness

- [ ] Layer contracts are well-defined and tested
- [ ] Mock implementations are available for incomplete layers
- [ ] Type compatibility is verified across layer boundaries
- [ ] Documentation is complete for each layer's interface

## Contributing

When adding new tests:

1. Follow the existing test structure and naming conventions
2. Use the test data factories for consistent test data
3. Include both positive and negative test cases
4. Add performance tests for critical functions
5. Update documentation as needed

## Related Documentation

- [Layer Testing Strategy](../docs/LAYER_TESTING_STRATEGY.md)
- [Schema Documentation](../../packages/database/README.md)
- [Types Documentation](../../packages/types/README.md)
- [Contracts Documentation](../../packages/contracts/README.md)
- [Mappers Documentation](../../packages/shared/README.md)
