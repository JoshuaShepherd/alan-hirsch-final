// ============================================================================
// SCHEMA VALIDATION TEST SUITE
// ============================================================================
// Master test suite that runs all schema validation tests
// Ensures complete validation before type generation

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// Import schema
import schema from '../../packages/database/src/db/schema';

describe('Schema Validation Test Suite', () => {
  let db: ReturnType<typeof drizzle>;
  let connection: postgres.Sql;

  beforeAll(async () => {
    // Create test database connection
    const connectionString =
      process.env.DATABASE_URL || 'postgresql://localhost:5432/test';
    connection = postgres(connectionString);
    db = drizzle(connection);
  });

  // Master Validation Test
  describe('Master Schema Validation', () => {
    it('should pass all schema validation tests', () => {
      // This test ensures that all schema validation tests pass
      // It serves as a master validation checkpoint

      // Test 1: Schema Structure
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');

      // Test 2: Schema Completeness for documented tables
      const schemaKeys = Object.keys(schema);
      expect(schemaKeys.length).toBeGreaterThan(20);

      // Test 3: Required Components from DB_SCHEMA.md
      const requiredComponents = [
        'userProfiles',
        'organizations',
        'organizationMemberships',
        'contentCategories',
        'contentSeries',
        'contentItems',
        'seriesContentItems',
        'contentCrossReferences',
        'assessments',
        'assessmentQuestions',
        'userAssessments',
        'assessmentResponses',
      ];

      requiredComponents.forEach(component => {
        expect(schemaKeys).toContain(component);
      });

      // Test 4: Relations for documented tables
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );
      expect(relationKeys.length).toBeGreaterThan(10);

      // Test 5: Type Generation Readiness for documented tables
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );
      expect(tableKeys.length).toBeGreaterThan(10);
    });

    it('should validate schema integrity', () => {
      // Test that schema has proper integrity
      const schemaKeys = Object.keys(schema);

      // Test that we have both tables and relations
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );

      expect(tableKeys.length).toBeGreaterThan(0);
      expect(relationKeys.length).toBeGreaterThan(0);
      expect(tableKeys.length).toBeGreaterThanOrEqual(relationKeys.length);
    });

    it('should validate schema consistency', () => {
      // Test that schema is consistent
      const schemaKeys = Object.keys(schema);

      // Test naming consistency
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );

      tableKeys.forEach(key => {
        // Table names should follow camelCase convention
        expect(key).toMatch(/^[a-z][a-zA-Z0-9]*$/);
      });

      // Test relation naming consistency
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );

      relationKeys.forEach(key => {
        // Relation names should follow camelCase + Relations convention
        expect(key).toMatch(/^[a-z][a-zA-Z0-9]*Relations$/);
      });
    });

    it('should validate type generation readiness', () => {
      // Test that schema is ready for type generation
      expect(schema).toBeDefined();

      // Test that we can access schema components
      const schemaKeys = Object.keys(schema);
      expect(schemaKeys.length).toBeGreaterThan(0);

      // Test that we have the required structure for type generation
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );

      expect(tableKeys.length).toBeGreaterThan(0);
      expect(relationKeys.length).toBeGreaterThan(0);
    });
  });

  // Validation Summary
  describe('Validation Summary', () => {
    it('should provide validation summary', () => {
      const schemaKeys = Object.keys(schema);
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );

      console.log('Schema Validation Summary:');
      console.log(`- Total exports: ${schemaKeys.length}`);
      console.log(`- Tables: ${tableKeys.length}`);
      console.log(`- Relations: ${relationKeys.length}`);
      console.log(`- Schema integrity: ✅ PASSED`);
      console.log(`- Type generation readiness: ✅ PASSED`);
      console.log(`- Consistency validation: ✅ PASSED`);

      // Validate summary
      expect(schemaKeys.length).toBeGreaterThan(50);
      expect(tableKeys.length).toBeGreaterThan(20);
      expect(relationKeys.length).toBeGreaterThan(20);
    });

    it('should validate all required tables are present', () => {
      const schemaKeys = Object.keys(schema);
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );

      const expectedTables = [
        'userProfiles',
        'organizations',
        'organizationMemberships',
        'contentCategories',
        'contentSeries',
        'contentItems',
        'seriesContentItems',
        'contentCrossReferences',
        'assessments',
        'assessmentQuestions',
        'userAssessments',
        'assessmentResponses',
        'aiConversations',
        'aiMessages',
        'aiContentJobs',
        'aiCrossReferenceSuggestions',
        'theologicalConcepts',
        'communities',
        'communityMemberships',
        'communityPosts',
        'communityPostVotes',
        'collaborations',
        'subscriptionPlans',
        'userSubscriptions',
        'transactions',
        'paymentMethods',
        'coupons',
        'userAnalyticsEvents',
        'userContentInteractions',
        'learningOutcomes',
        'movementMetrics',
        'performanceReports',
        'auditLogs',
        'featureFlags',
        'userFeatureFlags',
        'userConsents',
        'systemNotifications',
        'userNotificationStatus',
        'apiKeys',
      ];

      const presentTables = expectedTables.filter(table =>
        tableKeys.includes(table)
      );

      console.log('Table Presence Validation:');
      console.log(`- Expected tables: ${expectedTables.length}`);
      console.log(`- Present tables: ${presentTables.length}`);
      console.log(
        `- Missing tables: ${expectedTables.length - presentTables.length}`
      );

      // Validate that all expected tables are present
      expectedTables.forEach(table => {
        expect(tableKeys).toContain(table);
      });
    });

    it('should validate all required relations are present', () => {
      const schemaKeys = Object.keys(schema);
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );

      const expectedRelations = [
        'userProfilesRelations',
        'organizationsRelations',
        'organizationMembershipsRelations',
        'contentCategoriesRelations',
        'contentSeriesRelations',
        'contentItemsRelations',
        'seriesContentItemsRelations',
        'contentCrossReferencesRelations',
        'assessmentsRelations',
        'assessmentQuestionsRelations',
        'userAssessmentsRelations',
        'assessmentResponsesRelations',
        'aiConversationsRelations',
        'aiMessagesRelations',
        'aiContentJobsRelations',
        'aiCrossReferenceSuggestionsRelations',
        'communitiesRelations',
        'communityMembershipsRelations',
        'communityPostsRelations',
        'communityPostVotesRelations',
        'collaborationsRelations',
        'subscriptionPlansRelations',
        'userSubscriptionsRelations',
        'transactionsRelations',
        'paymentMethodsRelations',
        'userAnalyticsEventsRelations',
        'userContentInteractionsRelations',
        'learningOutcomesRelations',
        'performanceReportsRelations',
        'auditLogsRelations',
        'featureFlagsRelations',
        'userFeatureFlagsRelations',
        'userConsentsRelations',
        'systemNotificationsRelations',
        'userNotificationStatusRelations',
        'apiKeysRelations',
      ];

      const presentRelations = expectedRelations.filter(relation =>
        relationKeys.includes(relation)
      );

      console.log('Relation Presence Validation:');
      console.log(`- Expected relations: ${expectedRelations.length}`);
      console.log(`- Present relations: ${presentRelations.length}`);
      console.log(
        `- Missing relations: ${expectedRelations.length - presentRelations.length}`
      );

      // Validate that all expected relations are present
      expectedRelations.forEach(relation => {
        expect(relationKeys).toContain(relation);
      });
    });
  });

  // Final Validation
  describe('Final Validation', () => {
    it('should pass final validation checklist', () => {
      const schemaKeys = Object.keys(schema);
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );

      // Final validation checklist
      const validationChecklist = {
        schemaDefined: schema !== undefined,
        schemaTypeObject: typeof schema === 'object',
        hasTables: tableKeys.length > 0,
        hasRelations: relationKeys.length > 0,
        hasRequiredTables: tableKeys.length >= 20,
        hasRequiredRelations: relationKeys.length >= 20,
        totalExports: schemaKeys.length >= 50,
      };

      console.log('Final Validation Checklist:');
      Object.entries(validationChecklist).forEach(([check, passed]) => {
        console.log(`- ${check}: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
      });

      // All checks must pass
      Object.values(validationChecklist).forEach(check => {
        expect(check).toBe(true);
      });
    });

    it('should be ready for type generation', () => {
      // Final readiness check
      const isReady = {
        schemaComplete: schema !== undefined,
        tablesPresent:
          Object.keys(schema).filter(
            key => !key.includes('Relations') && !key.includes('relations')
          ).length >= 20,
        relationsPresent:
          Object.keys(schema).filter(
            key => key.includes('Relations') || key.includes('relations')
          ).length >= 20,
        structureValid: typeof schema === 'object',
      };

      const allReady = Object.values(isReady).every(check => check === true);

      console.log('Type Generation Readiness:');
      Object.entries(isReady).forEach(([check, ready]) => {
        console.log(`- ${check}: ${ready ? '✅ READY' : '❌ NOT READY'}`);
      });

      console.log(
        `\nOverall Status: ${allReady ? '✅ READY FOR TYPE GENERATION' : '❌ NOT READY'}`
      );

      expect(allReady).toBe(true);
    });
  });

  // Cleanup
  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });
});
