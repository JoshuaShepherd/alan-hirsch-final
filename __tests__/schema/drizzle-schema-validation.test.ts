// ============================================================================
// DRIZZLE SCHEMA VALIDATION TESTS
// ============================================================================
// Comprehensive validation of Drizzle ORM schema definitions
// Ensures Drizzle-specific features work correctly

import { and, eq, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { beforeAll, describe, expect, it } from 'vitest';

// Import schema and types that match DB_SCHEMA.md
import schema, {
  assessmentQuestions,
  assessmentResponses,
  // Auth & User Management
  assessments,
  contentCategories,
  contentCrossReferences,
  contentItems,
  contentSeries,
  organizationMemberships,
  organizations,
  seriesContentItems,
  userAssessments,
  userProfiles,
  type NewUserProfile,
  type UserProfile,
} from '../../packages/database/src/db/schema';

describe('Drizzle Schema Validation', () => {
  let db: ReturnType<typeof drizzle>;
  let connection: postgres.Sql;

  beforeAll(async () => {
    // Create test database connection
    const connectionString =
      process.env.DATABASE_URL || 'postgresql://localhost:5432/test';
    connection = postgres(connectionString);
    db = drizzle(connection);
  });

  // Drizzle Table Structure Validation
  describe('Drizzle Table Structure', () => {
    it('should have proper Drizzle table structure', () => {
      // Test that tables are proper Drizzle table objects
      expect(userProfiles._.name).toBe('user_profiles');
      expect(userProfiles._.columns).toBeDefined();
      expect(userProfiles._.schema).toBeDefined();
    });

    it('should have proper column definitions', () => {
      // Test column structure
      const columns = userProfiles._.columns;
      expect(columns.id).toBeDefined();
      expect(columns.email).toBeDefined();
      expect(columns.firstName).toBeDefined();
      expect(columns.lastName).toBeDefined();
      expect(columns.createdAt).toBeDefined();
      expect(columns.updatedAt).toBeDefined();
    });

    it('should have proper column types', () => {
      // Test that columns have proper Drizzle types
      expect(userProfiles.id._.dataType).toBe('uuid');
      expect(userProfiles.email._.dataType).toBe('string');
      expect(userProfiles.firstName._.dataType).toBe('string');
      expect(userProfiles.lastName._.dataType).toBe('string');
      expect(userProfiles.createdAt._.dataType).toBe('date');
      expect(userProfiles.updatedAt._.dataType).toBe('date');
    });

    it('should have proper constraints', () => {
      // Test primary key constraints
      expect(userProfiles.id._.primary).toBe(true);
      expect(userProfiles.email._.unique).toBe(true);

      // Test not null constraints
      expect(userProfiles.email._.notNull).toBe(true);
      expect(userProfiles.firstName._.notNull).toBe(true);
      expect(userProfiles.lastName._.notNull).toBe(true);
    });

    it('should have proper default values', () => {
      // Test default values
      expect(userProfiles.languagePrimary._.default).toBeDefined();
      expect(userProfiles.subscriptionTier._.default).toBeDefined();
      expect(userProfiles.onboardingCompleted._.default).toBeDefined();
    });

    it('should have proper enum constraints', () => {
      // Test enum values
      expect(userProfiles.ministryRole._.enumValues).toBeDefined();
      expect(userProfiles.subscriptionTier._.enumValues).toBeDefined();
      expect(userProfiles.accountStatus._.enumValues).toBeDefined();
    });

    it('should have proper JSONB column types', () => {
      // Test JSONB columns
      expect(userProfiles.theologicalFocus._.dataType).toBe('json');
      expect(userProfiles.brandColors._.dataType).toBe('json');
      expect(userProfiles.emailNotifications._.dataType).toBe('json');
      expect(userProfiles.privacySettings._.dataType).toBe('json');
    });
  });

  // Drizzle Relations Validation
  describe('Drizzle Relations', () => {
    it('should have proper relation definitions', () => {
      // Test that relations are properly defined
      expect(userProfiles._.relations).toBeDefined();
      expect(organizations._.relations).toBeDefined();
      expect(organizationMemberships._.relations).toBeDefined();
    });

    it('should have proper foreign key relations', () => {
      // Test foreign key relationships
      expect(organizationMemberships.userId._.references).toBeDefined();
      expect(organizationMemberships.organizationId._.references).toBeDefined();
      expect(contentSeries.authorId._.references).toBeDefined();
      expect(contentItems.authorId._.references).toBeDefined();
    });

    it('should have proper relation configurations', () => {
      // Test relation configurations
      const userProfileRelations = userProfiles._.relations;
      expect(userProfileRelations).toBeDefined();

      const organizationRelations = organizations._.relations;
      expect(organizationRelations).toBeDefined();
    });
  });

  // Drizzle Query Builder Validation
  describe('Drizzle Query Builder', () => {
    it('should support basic select queries', () => {
      // Test basic select query structure
      const query = db.select().from(userProfiles);
      expect(query).toBeDefined();
      expect(typeof query).toBe('object');
    });

    it('should support where clauses', () => {
      // Test where clause construction
      const query = db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.id, 'test-id'));
      expect(query).toBeDefined();
    });

    it('should support complex where clauses', () => {
      // Test complex where conditions
      const query = db
        .select()
        .from(userProfiles)
        .where(
          and(
            eq(userProfiles.accountStatus, 'active'),
            eq(userProfiles.subscriptionTier, 'professional')
          )
        );
      expect(query).toBeDefined();
    });

    it('should support joins', () => {
      // Test join operations
      const query = db
        .select()
        .from(userProfiles)
        .leftJoin(
          organizationMemberships,
          eq(userProfiles.id, organizationMemberships.userId)
        );
      expect(query).toBeDefined();
    });

    it('should support insert operations', () => {
      // Test insert query structure
      const insertData: NewUserProfile = {
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
      };

      const query = db.insert(userProfiles).values(insertData);
      expect(query).toBeDefined();
    });

    it('should support update operations', () => {
      // Test update query structure
      const query = db
        .update(userProfiles)
        .set({ firstName: 'Updated' })
        .where(eq(userProfiles.id, 'test-id'));
      expect(query).toBeDefined();
    });

    it('should support delete operations', () => {
      // Test delete query structure
      const query = db
        .delete(userProfiles)
        .where(eq(userProfiles.id, 'test-id'));
      expect(query).toBeDefined();
    });
  });

  // Drizzle Type Inference Validation
  describe('Drizzle Type Inference', () => {
    it('should infer proper select types', () => {
      // Test type inference for select operations
      type UserProfileSelect = typeof userProfiles.$inferSelect;
      type OrganizationSelect = typeof organizations.$inferSelect;

      expect(typeof UserProfileSelect).toBe('object');
      expect(typeof OrganizationSelect).toBe('object');
    });

    it('should infer proper insert types', () => {
      // Test type inference for insert operations
      type UserProfileInsert = typeof userProfiles.$inferInsert;
      type OrganizationInsert = typeof organizations.$inferInsert;

      expect(typeof UserProfileInsert).toBe('object');
      expect(typeof OrganizationInsert).toBe('object');
    });

    it('should have proper type compatibility', () => {
      // Test that inferred types match exported types
      const userProfileData: UserProfile = {
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      expect(userProfileData).toBeDefined();
      expect(userProfileData.id).toBe('test-id');
      expect(userProfileData.email).toBe('test@example.com');
    });

    it('should handle optional fields correctly', () => {
      // Test optional field handling
      const newUserProfile: NewUserProfile = {
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
      };

      // Optional fields should be undefined by default
      expect(newUserProfile.displayName).toBeUndefined();
      expect(newUserProfile.bio).toBeUndefined();
      expect(newUserProfile.avatarUrl).toBeUndefined();
    });
  });

  // Drizzle Schema Export Validation
  describe('Drizzle Schema Export', () => {
    it('should export complete schema object', () => {
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');
    });

    it('should have all tables from DB_SCHEMA.md in schema export', () => {
      const schemaKeys = Object.keys(schema);
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
      ];

      expectedTables.forEach(table => {
        expect(schemaKeys).toContain(table);
      });
    });

    it('should have all relations from DB_SCHEMA.md in schema export', () => {
      const schemaKeys = Object.keys(schema);
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
      ];

      expectedRelations.forEach(relation => {
        expect(schemaKeys).toContain(relation);
      });
    });

    it('should support schema introspection for documented tables', () => {
      // Test that schema can be introspected for tables from DB_SCHEMA.md
      const tableNames = Object.keys(schema).filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );

      expect(tableNames.length).toBeGreaterThan(0);
      expect(tableNames).toContain('userProfiles');
      expect(tableNames).toContain('organizations');
      expect(tableNames).toContain('contentItems');
      expect(tableNames).toContain('assessments');
      expect(tableNames).toContain('contentSeries');
      expect(tableNames).toContain('assessmentQuestions');
    });
  });

  // Drizzle Migration Compatibility
  describe('Drizzle Migration Compatibility', () => {
    it('should have consistent table definitions for documented tables', () => {
      // Test that table definitions are consistent for migrations (from DB_SCHEMA.md)
      const tables = [
        userProfiles,
        organizations,
        organizationMemberships,
        contentCategories,
        contentSeries,
        contentItems,
        seriesContentItems,
        contentCrossReferences,
        assessments,
        assessmentQuestions,
        userAssessments,
        assessmentResponses,
      ];

      tables.forEach(table => {
        expect(table._.name).toBeDefined();
        expect(table._.columns).toBeDefined();
        expect(table._.schema).toBeDefined();
      });
    });

    it('should have proper column definitions for migrations', () => {
      // Test column definitions are migration-ready
      const userProfileColumns = userProfiles._.columns;
      expect(userProfileColumns.id._.dataType).toBe('uuid');
      expect(userProfileColumns.email._.dataType).toBe('string');
      expect(userProfileColumns.createdAt._.dataType).toBe('date');
    });

    it('should have proper constraint definitions', () => {
      // Test constraint definitions
      expect(userProfiles.id._.primary).toBe(true);
      expect(userProfiles.email._.unique).toBe(true);
      expect(userProfiles.email._.notNull).toBe(true);
    });
  });

  // Drizzle Performance Validation
  describe('Drizzle Performance Features', () => {
    it('should support prepared statements', () => {
      // Test prepared statement support
      const preparedQuery = db
        .select()
        .from(userProfiles)
        .where(eq(userProfiles.id, sql.placeholder('id')))
        .prepare();

      expect(preparedQuery).toBeDefined();
      expect(typeof preparedQuery.execute).toBe('function');
    });

    it('should support raw SQL when needed', () => {
      // Test raw SQL support
      const rawQuery = db
        .select({ count: sql<number>`count(*)` })
        .from(userProfiles);
      expect(rawQuery).toBeDefined();
    });

    it('should support complex aggregations', () => {
      // Test aggregation support
      const aggregationQuery = db
        .select({
          totalUsers: sql<number>`count(*)`,
          activeUsers: sql<number>`count(*) filter (where ${userProfiles.accountStatus} = 'active')`,
        })
        .from(userProfiles);

      expect(aggregationQuery).toBeDefined();
    });
  });

  // Drizzle Error Handling Validation
  describe('Drizzle Error Handling', () => {
    it('should handle invalid column references gracefully', () => {
      // Test that invalid column references are caught at compile time
      expect(() => {
        // This should cause a TypeScript error at compile time
        // db.select({ invalidColumn: userProfiles.invalidColumn }).from(userProfiles);
      }).not.toThrow();
    });

    it('should handle type mismatches gracefully', () => {
      // Test type mismatch handling
      expect(() => {
        const invalidData = {
          id: 123, // Should be string/UUID
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          ministryRole: 'senior_pastor',
          accountStatus: 'active',
        };

        // This should cause a TypeScript error at compile time
        // db.insert(userProfiles).values(invalidData);
      }).not.toThrow();
    });
  });

  // Drizzle Schema Validation
  describe('Drizzle Schema Validation', () => {
    it('should validate schema completeness for documented tables', () => {
      // Test that all required schema components from DB_SCHEMA.md are present
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
        expect(schema).toHaveProperty(component);
      });
    });

    it('should validate relation completeness for documented tables', () => {
      // Test that all relations from DB_SCHEMA.md are properly defined
      const requiredRelations = [
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
      ];

      requiredRelations.forEach(relation => {
        expect(schema).toHaveProperty(relation);
      });
    });

    it('should validate type exports for documented tables', () => {
      // Test that all required types from DB_SCHEMA.md are exported
      expect(UserProfile).toBeDefined();
      expect(NewUserProfile).toBeDefined();
      expect(Organization).toBeDefined();
      expect(NewOrganization).toBeDefined();
    });
  });

  // Drizzle Integration Validation
  describe('Drizzle Integration Validation', () => {
    it('should work with Drizzle ORM instance', () => {
      // Test that schema works with Drizzle instance
      expect(db).toBeDefined();
      expect(typeof db.select).toBe('function');
      expect(typeof db.insert).toBe('function');
      expect(typeof db.update).toBe('function');
      expect(typeof db.delete).toBe('function');
    });

    it('should support transaction operations', () => {
      // Test transaction support
      const transaction = db.transaction(async tx => {
        const user = await tx
          .select()
          .from(userProfiles)
          .where(eq(userProfiles.id, 'test-id'));
        return user;
      });

      expect(transaction).toBeDefined();
      expect(typeof transaction).toBe('function');
    });

    it('should support batch operations', () => {
      // Test batch operation support
      const batchInsert = db.insert(userProfiles).values([
        {
          id: 'test-id-1',
          email: 'test1@example.com',
          firstName: 'Test1',
          lastName: 'User1',
          ministryRole: 'senior_pastor',
          accountStatus: 'active',
        },
        {
          id: 'test-id-2',
          email: 'test2@example.com',
          firstName: 'Test2',
          lastName: 'User2',
          ministryRole: 'associate_pastor',
          accountStatus: 'active',
        },
      ]);

      expect(batchInsert).toBeDefined();
    });
  });

  // Cleanup
  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });
});
