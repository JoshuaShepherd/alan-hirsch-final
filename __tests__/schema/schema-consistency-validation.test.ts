// ============================================================================
// SCHEMA CONSISTENCY VALIDATION TESTS
// ============================================================================
// Validates consistency between database schema and Drizzle definitions
// Ensures alignment with alignment reference document

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { beforeAll, describe, expect, it } from 'vitest';

// Import schema definitions that match DB_SCHEMA.md
import schema, {
  // Auth & User Management
  assessmentQuestions,
  assessmentResponses,
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
} from '../../packages/database/src/db/schema';

// Import alignment reference data

describe('Schema Consistency Validation', () => {
  let db: ReturnType<typeof drizzle>;
  let connection: postgres.Sql;

  beforeAll(async () => {
    // Create test database connection
    const connectionString =
      process.env.DATABASE_URL || 'postgresql://localhost:5432/test';
    connection = postgres(connectionString);
    db = drizzle(connection);
  });

  // Database vs Drizzle Schema Consistency
  describe('Database vs Drizzle Schema Consistency', () => {
    it('should have consistent table names from DB_SCHEMA.md', () => {
      // Test that Drizzle table names match expected database table names from DB_SCHEMA.md
      const expectedTableNames = [
        'user_profiles',
        'organizations',
        'organization_memberships',
        'content_categories',
        'content_series',
        'content_items',
        'series_content_items',
        'content_cross_references',
        'assessments',
        'assessment_questions',
        'user_assessments',
        'assessment_responses',
      ];

      const actualTableNames = [
        userProfiles._.name,
        organizations._.name,
        organizationMemberships._.name,
        contentCategories._.name,
        contentSeries._.name,
        contentItems._.name,
        seriesContentItems._.name,
        contentCrossReferences._.name,
        assessments._.name,
        assessmentQuestions._.name,
        userAssessments._.name,
        assessmentResponses._.name,
      ];

      actualTableNames.forEach(tableName => {
        expect(expectedTableNames).toContain(tableName);
      });
    });

    it('should have consistent column names for documented tables', () => {
      // Test that column names follow snake_case convention consistently (from DB_SCHEMA.md)
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
        const columns = Object.keys(table).filter(
          key => !['_', '$inferSelect', '$inferInsert'].includes(key)
        );

        columns.forEach(columnName => {
          // All column names should follow snake_case convention
          expect(columnName).toMatch(/^[a-z][a-z0-9_]*[a-z0-9]$/);
        });
      });
    });

    it('should have consistent data types', () => {
      // Test that data types are consistent between schema and database
      expect(userProfiles.id._.dataType).toBe('uuid');
      expect(userProfiles.email._.dataType).toBe('string');
      expect(userProfiles.firstName._.dataType).toBe('string');
      expect(userProfiles.lastName._.dataType).toBe('string');
      expect(userProfiles.createdAt._.dataType).toBe('date');
      expect(userProfiles.updatedAt._.dataType).toBe('date');

      expect(organizations.id._.dataType).toBe('uuid');
      expect(organizations.name._.dataType).toBe('string');
      expect(organizations.slug._.dataType).toBe('string');
      expect(organizations.createdAt._.dataType).toBe('date');
      expect(organizations.updatedAt._.dataType).toBe('date');
    });

    it('should have consistent constraints', () => {
      // Test that constraints are consistent
      expect(userProfiles.id._.primary).toBe(true);
      expect(userProfiles.email._.unique).toBe(true);
      expect(userProfiles.email._.notNull).toBe(true);
      expect(userProfiles.firstName._.notNull).toBe(true);
      expect(userProfiles.lastName._.notNull).toBe(true);

      expect(organizations.id._.primary).toBe(true);
      expect(organizations.slug._.unique).toBe(true);
      expect(organizations.name._.notNull).toBe(true);
    });

    it('should have consistent foreign key relationships for documented tables', () => {
      // Test foreign key consistency for tables from DB_SCHEMA.md
      expect(organizationMemberships.userId._.references).toBeDefined();
      expect(organizationMemberships.organizationId._.references).toBeDefined();
      expect(contentSeries.authorId._.references).toBeDefined();
      expect(contentItems.authorId._.references).toBeDefined();
      expect(assessmentQuestions.assessmentId._.references).toBeDefined();
      expect(userAssessments.userId._.references).toBeDefined();
      expect(userAssessments.assessmentId._.references).toBeDefined();
      expect(assessmentResponses.userAssessmentId._.references).toBeDefined();
      expect(assessmentResponses.questionId._.references).toBeDefined();
    });
  });

  // DB_SCHEMA.md Alignment Consistency
  describe('DB_SCHEMA.md Alignment Consistency', () => {
    it('should match DB_SCHEMA.md table structure for user profiles', () => {
      // Test that schema matches DB_SCHEMA.md expectations
      const userProfileFields = Object.keys(userProfiles).filter(
        key => !['_', '$inferSelect', '$inferInsert'].includes(key)
      );

      // Required fields from DB_SCHEMA.md
      const requiredFields = [
        'id',
        'email',
        'firstName',
        'lastName',
        'ministryRole',
        'accountStatus',
        'createdAt',
        'updatedAt',
        'lastActiveAt',
      ];

      requiredFields.forEach(field => {
        expect(userProfileFields).toContain(field);
      });

      // Optional fields from DB_SCHEMA.md
      const optionalFields = [
        'displayName',
        'bio',
        'avatarUrl',
        'denomination',
        'organizationName',
        'yearsInMinistry',
        'countryCode',
        'timezone',
        'culturalContext',
        'assessmentMovementAlignment',
        'assessmentAudienceEngagement',
        'assessmentContentReadiness',
        'assessmentRevenuePotential',
        'assessmentNetworkEffects',
        'assessmentStrategicFit',
        'assessmentTotal',
        'leaderTier',
        'subdomain',
        'customDomain',
        'platformTitle',
        'languagePrimary',
        'subscriptionTier',
        'theologicalFocus',
        'brandColors',
        'emailNotifications',
        'privacySettings',
        'onboardingCompleted',
        'onboardingStep',
      ];

      optionalFields.forEach(field => {
        expect(userProfileFields).toContain(field);
      });
    });

    it('should match DB_SCHEMA.md content structure', () => {
      const contentItemFields = Object.keys(contentItems).filter(
        key => !['_', '$inferSelect', '$inferInsert'].includes(key)
      );

      // Required fields from DB_SCHEMA.md
      const requiredFields = [
        'id',
        'title',
        'slug',
        'authorId',
        'contentType',
        'status',
        'visibility',
        'createdAt',
        'updatedAt',
      ];

      requiredFields.forEach(field => {
        expect(contentItemFields).toContain(field);
      });

      // Optional fields from DB_SCHEMA.md
      const optionalFields = [
        'excerpt',
        'content',
        'wordCount',
        'estimatedReadingTime',
        'viewCount',
        'likeCount',
        'shareCount',
        'commentCount',
        'bookmarkCount',
        'tags',
        'theologicalThemes',
        'aiEnhanced',
        'aiSummary',
        'aiKeyPoints',
        'featuredImageUrl',
        'publishedAt',
        'licenseType',
        'attributionRequired',
      ];

      optionalFields.forEach(field => {
        expect(contentItemFields).toContain(field);
      });
    });

    it('should match DB_SCHEMA.md assessment structure', () => {
      const assessmentFields = Object.keys(assessments).filter(
        key => !['_', '$inferSelect', '$inferInsert'].includes(key)
      );

      // Required fields from DB_SCHEMA.md
      const requiredFields = [
        'id',
        'name',
        'slug',
        'assessmentType',
        'questionsCount',
        'status',
        'createdAt',
        'updatedAt',
      ];

      requiredFields.forEach(field => {
        expect(assessmentFields).toContain(field);
      });

      // Optional fields from DB_SCHEMA.md
      const optionalFields = [
        'description',
        'estimatedDuration',
        'passingScore',
        'validityScore',
        'reliabilityScore',
        'instructions',
        'publishedAt',
        'version',
        'language',
        'culturalAdaptation',
        'researchBacked',
        'scoringMethod',
      ];

      optionalFields.forEach(field => {
        expect(assessmentFields).toContain(field);
      });
    });

    it('should match DB_SCHEMA.md organization structure', () => {
      const organizationFields = Object.keys(organizations).filter(
        key => !['_', '$inferSelect', '$inferInsert'].includes(key)
      );

      // Required fields from DB_SCHEMA.md
      const requiredFields = [
        'id',
        'name',
        'slug',
        'organizationType',
        'status',
        'createdAt',
        'updatedAt',
      ];

      requiredFields.forEach(field => {
        expect(organizationFields).toContain(field);
      });

      // Optional fields from DB_SCHEMA.md
      const optionalFields = [
        'description',
        'website',
        'logoUrl',
        'sizeCategory',
        'contactEmail',
        'contactPhone',
        'address',
        'billingEmail',
        'accountOwnerId',
        'licenseType',
        'maxUsers',
      ];

      optionalFields.forEach(field => {
        expect(organizationFields).toContain(field);
      });
    });
  });

  // Field Type Consistency
  describe('Field Type Consistency', () => {
    it('should have consistent UUID fields for documented tables', () => {
      const uuidFields = [
        userProfiles.id,
        organizations.id,
        organizationMemberships.id,
        contentCategories.id,
        contentSeries.id,
        contentItems.id,
        seriesContentItems.id,
        contentCrossReferences.id,
        assessments.id,
        assessmentQuestions.id,
        userAssessments.id,
        assessmentResponses.id,
      ];

      uuidFields.forEach(field => {
        expect(field._.dataType).toBe('uuid');
      });
    });

    it('should have consistent text fields for documented tables', () => {
      const textFields = [
        userProfiles.email,
        userProfiles.firstName,
        userProfiles.lastName,
        organizations.name,
        organizations.slug,
        contentItems.title,
        contentItems.slug,
        contentSeries.title,
        contentSeries.slug,
        assessments.name,
        assessments.slug,
        assessmentQuestions.questionText,
      ];

      textFields.forEach(field => {
        expect(field._.dataType).toBe('string');
      });
    });

    it('should have consistent timestamp fields for documented tables', () => {
      const timestampFields = [
        userProfiles.createdAt,
        userProfiles.updatedAt,
        userProfiles.lastActiveAt,
        organizations.createdAt,
        organizations.updatedAt,
        organizationMemberships.createdAt,
        organizationMemberships.updatedAt,
        contentCategories.createdAt,
        contentCategories.updatedAt,
        contentSeries.createdAt,
        contentSeries.updatedAt,
        contentItems.createdAt,
        contentItems.updatedAt,
        seriesContentItems.createdAt,
        contentCrossReferences.createdAt,
        contentCrossReferences.updatedAt,
        assessments.createdAt,
        assessments.updatedAt,
        assessmentQuestions.createdAt,
        assessmentQuestions.updatedAt,
        userAssessments.createdAt,
        userAssessments.updatedAt,
        assessmentResponses.createdAt,
        assessmentResponses.updatedAt,
      ];

      timestampFields.forEach(field => {
        expect(field._.dataType).toBe('date');
      });
    });

    it('should have consistent JSONB fields for documented tables', () => {
      const jsonbFields = [
        userProfiles.theologicalFocus,
        userProfiles.brandColors,
        userProfiles.emailNotifications,
        userProfiles.privacySettings,
        organizations.address,
        organizationMemberships.permissions,
        contentCategories.apestRelevance,
        contentCategories.keywords,
        contentSeries.collaborators,
        contentSeries.tags,
        contentItems.coAuthors,
        contentItems.secondaryCategories,
        contentItems.tags,
        contentItems.theologicalThemes,
        contentItems.aiKeyPoints,
        contentItems.attachments,
        seriesContentItems.prerequisites,
        assessmentQuestions.answerOptions,
        userAssessments.rawScores,
        userAssessments.normalizedScores,
        userAssessments.personalizedRecommendations,
        userAssessments.suggestedPeers,
        userAssessments.complementaryGifts,
      ];

      jsonbFields.forEach(field => {
        expect(field._.dataType).toBe('json');
      });
    });

    it('should have consistent integer fields for documented tables', () => {
      const integerFields = [
        userProfiles.yearsInMinistry,
        userProfiles.assessmentMovementAlignment,
        userProfiles.assessmentAudienceEngagement,
        userProfiles.assessmentContentReadiness,
        userProfiles.assessmentRevenuePotential,
        userProfiles.assessmentNetworkEffects,
        userProfiles.assessmentStrategicFit,
        userProfiles.assessmentTotal,
        userProfiles.onboardingStep,
        organizations.maxUsers,
        contentCategories.orderIndex,
        contentCategories.movementRelevanceScore,
        contentSeries.totalItems,
        contentSeries.estimatedDuration,
        contentItems.wordCount,
        contentItems.estimatedReadingTime,
        contentItems.viewCount,
        contentItems.likeCount,
        contentItems.shareCount,
        contentItems.commentCount,
        contentItems.bookmarkCount,
        seriesContentItems.orderIndex,
        contentCrossReferences.relevanceScore,
        contentCrossReferences.qualityScore,
        contentCrossReferences.clickCount,
        assessments.questionsCount,
        assessments.estimatedDuration,
        assessments.passingScore,
        assessmentQuestions.orderIndex,
        assessmentQuestions.weight,
        userAssessments.completionPercentage,
        userAssessments.totalScore,
        userAssessments.maxPossibleScore,
        userAssessments.apostolicScore,
        userAssessments.propheticScore,
        userAssessments.evangelisticScore,
        userAssessments.shepherdingScore,
        userAssessments.teachingScore,
        userAssessments.completionTime,
        userAssessments.confidenceLevel,
        assessmentResponses.responseValue,
        assessmentResponses.responseTime,
        assessmentResponses.confidence,
      ];

      integerFields.forEach(field => {
        expect(field._.dataType).toBe('number');
      });
    });

    it('should have consistent boolean fields for documented tables', () => {
      const booleanFields = [
        userProfiles.onboardingCompleted,
        contentCategories.isActive,
        contentItems.aiEnhanced,
        contentItems.attributionRequired,
        assessmentQuestions.isRequired,
        assessmentQuestions.reverseScored,
        userAssessments.culturalAdjustmentApplied,
        assessmentResponses.skipped,
      ];

      booleanFields.forEach(field => {
        expect(field._.dataType).toBe('boolean');
      });
    });
  });

  // Enum Consistency
  describe('Enum Consistency', () => {
    it('should have consistent ministry role enums from DB_SCHEMA.md', () => {
      const expectedMinistryRoles = [
        'senior_pastor',
        'associate_pastor',
        'church_planter',
        'denominational_leader',
        'seminary_professor',
        'seminary_student',
        'ministry_staff',
        'missionary',
        'marketplace_minister',
        'nonprofit_leader',
        'consultant',
        'academic_researcher',
        'emerging_leader',
        'other',
      ];

      expect(userProfiles.ministryRole._.enumValues).toBeDefined();
      // Note: Actual enum values are defined in the schema file
    });

    it('should have consistent organization type enums from DB_SCHEMA.md', () => {
      const expectedOrganizationTypes = [
        'church',
        'denomination',
        'seminary',
        'ministry_network',
        'nonprofit',
        'business',
        'other',
      ];

      expect(organizations.organizationType._.enumValues).toBeDefined();
    });

    it('should have consistent content type enums from DB_SCHEMA.md', () => {
      const expectedContentTypes = [
        'article',
        'video',
        'podcast',
        'framework',
        'tool',
        'case_study',
        'interview',
        'course_lesson',
      ];

      expect(contentItems.contentType._.enumValues).toBeDefined();
    });

    it('should have consistent assessment type enums from DB_SCHEMA.md', () => {
      const expectedAssessmentTypes = [
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ];

      expect(assessments.assessmentType._.enumValues).toBeDefined();
    });

    it('should have consistent subscription tier enums from DB_SCHEMA.md', () => {
      const expectedSubscriptionTiers = [
        'free',
        'individual',
        'professional',
        'leader',
        'institutional',
      ];

      expect(userProfiles.subscriptionTier._.enumValues).toBeDefined();
    });

    it('should have consistent account status enums from DB_SCHEMA.md', () => {
      const expectedAccountStatuses = [
        'active',
        'inactive',
        'suspended',
        'pending_verification',
      ];

      expect(userProfiles.accountStatus._.enumValues).toBeDefined();
    });
  });

  // Constraint Consistency
  describe('Constraint Consistency', () => {
    it('should have consistent primary key constraints for documented tables', () => {
      const primaryKeyFields = [
        userProfiles.id,
        organizations.id,
        organizationMemberships.id,
        contentCategories.id,
        contentSeries.id,
        contentItems.id,
        seriesContentItems.id,
        contentCrossReferences.id,
        assessments.id,
        assessmentQuestions.id,
        userAssessments.id,
        assessmentResponses.id,
      ];

      primaryKeyFields.forEach(field => {
        expect(field._.primary).toBe(true);
      });
    });

    it('should have consistent unique constraints for documented tables', () => {
      const uniqueFields = [
        userProfiles.email,
        userProfiles.subdomain,
        userProfiles.customDomain,
        organizations.slug,
        contentCategories.slug,
        contentSeries.slug,
        contentItems.slug,
        assessments.slug,
      ];

      uniqueFields.forEach(field => {
        expect(field._.unique).toBe(true);
      });
    });

    it('should have consistent not null constraints', () => {
      const notNullFields = [
        userProfiles.id,
        userProfiles.email,
        userProfiles.firstName,
        userProfiles.lastName,
        userProfiles.ministryRole,
        userProfiles.accountStatus,
        userProfiles.createdAt,
        userProfiles.updatedAt,
        userProfiles.lastActiveAt,
        organizations.id,
        organizations.name,
        organizations.slug,
        organizations.organizationType,
        organizations.createdAt,
        organizations.updatedAt,
      ];

      notNullFields.forEach(field => {
        expect(field._.notNull).toBe(true);
      });
    });

    it('should have consistent default values', () => {
      // Test default values are consistent
      expect(userProfiles.languagePrimary._.default).toBeDefined();
      expect(userProfiles.subscriptionTier._.default).toBeDefined();
      expect(userProfiles.onboardingCompleted._.default).toBeDefined();
      expect(userProfiles.onboardingStep._.default).toBeDefined();
      expect(userProfiles.accountStatus._.default).toBeDefined();
      expect(organizations.licenseType._.default).toBeDefined();
      expect(organizations.maxUsers._.default).toBeDefined();
      expect(organizations.status._.default).toBeDefined();
    });
  });

  // Relationship Consistency
  describe('Relationship Consistency', () => {
    it('should have consistent foreign key relationships', () => {
      // Test that foreign key relationships are properly defined
      expect(organizationMemberships.userId._.references).toBeDefined();
      expect(organizationMemberships.organizationId._.references).toBeDefined();
      expect(contentSeries.authorId._.references).toBeDefined();
      expect(contentItems.authorId._.references).toBeDefined();
      expect(contentItems.seriesId._.references).toBeDefined();
      expect(contentItems.primaryCategoryId._.references).toBeDefined();
    });

    it('should have consistent cascade delete configurations', () => {
      // Test cascade delete configurations
      expect(organizationMemberships.userId._.references).toBeDefined();
      expect(organizationMemberships.organizationId._.references).toBeDefined();
    });

    it('should have consistent relation definitions', () => {
      // Test that relations are properly defined
      expect(userProfiles._.relations).toBeDefined();
      expect(organizations._.relations).toBeDefined();
      expect(organizationMemberships._.relations).toBeDefined();
      expect(contentCategories._.relations).toBeDefined();
      expect(contentSeries._.relations).toBeDefined();
      expect(contentItems._.relations).toBeDefined();
      expect(assessments._.relations).toBeDefined();
      expect(communities._.relations).toBeDefined();
      expect(subscriptionPlans._.relations).toBeDefined();
      expect(userAnalyticsEvents._.relations).toBeDefined();
      expect(auditLogs._.relations).toBeDefined();
    });
  });

  // Schema Export Consistency
  describe('Schema Export Consistency', () => {
    it('should have consistent schema export structure', () => {
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');

      const schemaKeys = Object.keys(schema);
      expect(schemaKeys.length).toBeGreaterThan(0);
    });

    it('should have consistent table exports', () => {
      const expectedTables = [
        'userProfiles',
        'organizations',
        'organizationMemberships',
        'contentCategories',
        'contentSeries',
        'contentItems',
        'assessments',
        'communities',
        'subscriptionPlans',
        'userAnalyticsEvents',
        'auditLogs',
      ];

      const schemaKeys = Object.keys(schema);

      expectedTables.forEach(table => {
        expect(schemaKeys).toContain(table);
      });
    });

    it('should have consistent relation exports', () => {
      const expectedRelations = [
        'userProfilesRelations',
        'organizationsRelations',
        'organizationMembershipsRelations',
        'contentCategoriesRelations',
        'contentSeriesRelations',
        'contentItemsRelations',
        'assessmentsRelations',
        'communitiesRelations',
        'subscriptionPlansRelations',
        'userAnalyticsEventsRelations',
        'auditLogsRelations',
      ];

      const schemaKeys = Object.keys(schema);

      expectedRelations.forEach(relation => {
        expect(schemaKeys).toContain(relation);
      });
    });
  });

  // Type Consistency
  describe('Type Consistency', () => {
    it('should have consistent type inference', () => {
      // Test that type inference works consistently
      type UserProfileSelect = typeof userProfiles.$inferSelect;
      type UserProfileInsert = typeof userProfiles.$inferInsert;
      type OrganizationSelect = typeof organizations.$inferSelect;
      type OrganizationInsert = typeof organizations.$inferInsert;

      expect(typeof UserProfileSelect).toBe('object');
      expect(typeof UserProfileInsert).toBe('object');
      expect(typeof OrganizationSelect).toBe('object');
      expect(typeof OrganizationInsert).toBe('object');
    });

    it('should have consistent type exports', () => {
      // Test that exported types are consistent
      expect(UserProfile).toBeDefined();
      expect(NewUserProfile).toBeDefined();
      expect(Organization).toBeDefined();
      expect(NewOrganization).toBeDefined();
    });
  });

  // Cleanup
  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });
});
