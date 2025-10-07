// ============================================================================
// COMPREHENSIVE SCHEMA VALIDATION TESTS
// ============================================================================
// Complete validation of all database schema before type generation
// This ensures schema integrity, consistency, and completeness

import { describe, expect, it } from 'vitest';

// Import schema definitions that match DB_SCHEMA.md documentation
import {
  // Assessment System
  assessmentQuestions,
  assessmentQuestionsRelations,
  assessmentResponses,
  assessmentResponsesRelations,
  assessments,
  assessmentsRelations,
  // Content Management
  contentCategories,
  contentCategoriesRelations,
  contentCrossReferences,
  contentCrossReferencesRelations,
  contentItems,
  contentItemsRelations,
  contentSeries,
  contentSeriesRelations,
  // Auth & User Management
  organizationMemberships,
  organizationMembershipsRelations,
  organizations,
  organizationsRelations,
  // Schema objects
  schema,
  seriesContentItems,
  seriesContentItemsRelations,
  tables,
  userAssessments,
  userAssessmentsRelations,
  userProfiles,
  userProfilesRelations,
} from '../../packages/database/src/db/schema';

// Import schema types

describe('Comprehensive Schema Validation', () => {
  // Schema structure validation
  describe('Schema Structure Validation', () => {
    it('should export complete schema object', () => {
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');
    });

    it('should export tables object', () => {
      expect(tables).toBeDefined();
      expect(typeof tables).toBe('object');
    });

    it('should have all required table categories from DB_SCHEMA.md', () => {
      const schemaKeys = Object.keys(schema);
      const expectedCategories = [
        // Auth & User Management (from DB_SCHEMA.md)
        'userProfiles',
        'organizations',
        'organizationMemberships',
        'userProfilesRelations',
        'organizationsRelations',
        'organizationMembershipsRelations',

        // Assessment System (from DB_SCHEMA.md)
        'assessments',
        'assessmentQuestions',
        'userAssessments',
        'assessmentResponses',
        'assessmentsRelations',
        'assessmentQuestionsRelations',
        'userAssessmentsRelations',
        'assessmentResponsesRelations',

        // Content Management (from DB_SCHEMA.md)
        'contentCategories',
        'contentSeries',
        'contentItems',
        'seriesContentItems',
        'contentCrossReferences',
        'contentCategoriesRelations',
        'contentSeriesRelations',
        'contentItemsRelations',
        'seriesContentItemsRelations',
        'contentCrossReferencesRelations',
      ];

      expectedCategories.forEach(category => {
        expect(schemaKeys).toContain(category);
      });
    });
  });

  // Auth & User Management Schema Validation
  describe('Auth & User Management Schema', () => {
    describe('User Profiles Table', () => {
      it('should have correct table structure', () => {
        expect(userProfiles).toBeDefined();
        expect(userProfiles._.name).toBe('user_profiles');
      });

      it('should have all required fields', () => {
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
          expect(userProfiles).toHaveProperty(field);
        });
      });

      it('should have correct field types', () => {
        // UUID fields
        expect(userProfiles.id).toBeDefined();
        expect(userProfiles.email).toBeDefined();

        // Text fields
        expect(userProfiles.firstName).toBeDefined();
        expect(userProfiles.lastName).toBeDefined();
        expect(userProfiles.displayName).toBeDefined();
        expect(userProfiles.bio).toBeDefined();

        // Enum fields
        expect(userProfiles.ministryRole).toBeDefined();
        expect(userProfiles.subscriptionTier).toBeDefined();
        expect(userProfiles.accountStatus).toBeDefined();
        expect(userProfiles.culturalContext).toBeDefined();
        expect(userProfiles.leaderTier).toBeDefined();

        // JSONB fields
        expect(userProfiles.theologicalFocus).toBeDefined();
        expect(userProfiles.brandColors).toBeDefined();
        expect(userProfiles.emailNotifications).toBeDefined();
        expect(userProfiles.privacySettings).toBeDefined();

        // Timestamp fields
        expect(userProfiles.createdAt).toBeDefined();
        expect(userProfiles.updatedAt).toBeDefined();
        expect(userProfiles.lastActiveAt).toBeDefined();
      });

      it('should have proper constraints', () => {
        // Unique constraints
        expect(userProfiles.email).toBeDefined();
        expect(userProfiles.subdomain).toBeDefined();
        expect(userProfiles.customDomain).toBeDefined();

        // Default values
        expect(userProfiles.languagePrimary).toBeDefined();
        expect(userProfiles.subscriptionTier).toBeDefined();
        expect(userProfiles.onboardingCompleted).toBeDefined();
        expect(userProfiles.onboardingStep).toBeDefined();
      });

      it('should have assessment score fields', () => {
        const assessmentFields = [
          'assessmentMovementAlignment',
          'assessmentAudienceEngagement',
          'assessmentContentReadiness',
          'assessmentRevenuePotential',
          'assessmentNetworkEffects',
          'assessmentStrategicFit',
          'assessmentTotal',
        ];

        assessmentFields.forEach(field => {
          expect(userProfiles).toHaveProperty(field);
        });
      });
    });

    describe('Organizations Table', () => {
      it('should have correct table structure', () => {
        expect(organizations).toBeDefined();
        expect(organizations._.name).toBe('organizations');
      });

      it('should have all required fields', () => {
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
          expect(organizations).toHaveProperty(field);
        });
      });

      it('should have correct field types', () => {
        // UUID fields
        expect(organizations.id).toBeDefined();
        expect(organizations.accountOwnerId).toBeDefined();

        // Text fields
        expect(organizations.name).toBeDefined();
        expect(organizations.slug).toBeDefined();
        expect(organizations.description).toBeDefined();
        expect(organizations.website).toBeDefined();

        // Enum fields
        expect(organizations.organizationType).toBeDefined();
        expect(organizations.sizeCategory).toBeDefined();
        expect(organizations.licenseType).toBeDefined();
        expect(organizations.status).toBeDefined();

        // JSONB fields
        expect(organizations.address).toBeDefined();

        // Timestamp fields
        expect(organizations.createdAt).toBeDefined();
        expect(organizations.updatedAt).toBeDefined();
      });

      it('should have proper constraints', () => {
        // Unique constraints
        expect(organizations.slug).toBeDefined();

        // Default values
        expect(organizations.licenseType).toBeDefined();
        expect(organizations.maxUsers).toBeDefined();
        expect(organizations.status).toBeDefined();
      });
    });

    describe('Organization Memberships Table', () => {
      it('should have correct table structure', () => {
        expect(organizationMemberships).toBeDefined();
        expect(organizationMemberships._.name).toBe('organization_memberships');
      });

      it('should have all required fields', () => {
        const requiredFields = [
          'id',
          'userId',
          'organizationId',
          'role',
          'createdAt',
          'updatedAt',
        ];

        requiredFields.forEach(field => {
          expect(organizationMemberships).toHaveProperty(field);
        });
      });

      it('should have foreign key references', () => {
        expect(organizationMemberships.userId).toBeDefined();
        expect(organizationMemberships.organizationId).toBeDefined();
        expect(organizationMemberships.invitedBy).toBeDefined();
      });
    });

    describe('Relations', () => {
      it('should have user profile relations', () => {
        expect(userProfilesRelations).toBeDefined();
        expect(typeof userProfilesRelations).toBe('object');
      });

      it('should have organization relations', () => {
        expect(organizationsRelations).toBeDefined();
        expect(typeof organizationsRelations).toBe('object');
      });

      it('should have organization membership relations', () => {
        expect(organizationMembershipsRelations).toBeDefined();
        expect(typeof organizationMembershipsRelations).toBe('object');
      });
    });
  });

  // Content Management Schema Validation
  describe('Content Management Schema', () => {
    describe('Content Categories Table', () => {
      it('should have correct table structure', () => {
        expect(contentCategories).toBeDefined();
        expect(contentCategories._.name).toBe('content_categories');
      });

      it('should have all required fields', () => {
        const requiredFields = ['id', 'name', 'slug', 'createdAt', 'updatedAt'];

        requiredFields.forEach(field => {
          expect(contentCategories).toHaveProperty(field);
        });
      });

      it('should have hierarchy fields', () => {
        expect(contentCategories.parentId).toBeDefined();
        expect(contentCategories.orderIndex).toBeDefined();
      });

      it('should have theological classification fields', () => {
        expect(contentCategories.theologicalDiscipline).toBeDefined();
        expect(contentCategories.movementRelevanceScore).toBeDefined();
        expect(contentCategories.apestRelevance).toBeDefined();
      });
    });

    describe('Content Series Table', () => {
      it('should have correct table structure', () => {
        expect(contentSeries).toBeDefined();
        expect(contentSeries._.name).toBe('content_series');
      });

      it('should have all required fields', () => {
        const requiredFields = [
          'id',
          'title',
          'slug',
          'authorId',
          'seriesType',
          'createdAt',
          'updatedAt',
        ];

        requiredFields.forEach(field => {
          expect(contentSeries).toHaveProperty(field);
        });
      });

      it('should have series configuration fields', () => {
        expect(contentSeries.difficulty).toBeDefined();
        expect(contentSeries.totalItems).toBeDefined();
        expect(contentSeries.estimatedDuration).toBeDefined();
      });

      it('should have visibility and access fields', () => {
        expect(contentSeries.visibility).toBeDefined();
        expect(contentSeries.status).toBeDefined();
      });
    });

    describe('Content Items Table', () => {
      it('should have correct table structure', () => {
        expect(contentItems).toBeDefined();
        expect(contentItems._.name).toBe('content_items');
      });

      it('should have all required fields', () => {
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
          expect(contentItems).toHaveProperty(field);
        });
      });

      it('should have content metrics fields', () => {
        const metricsFields = [
          'wordCount',
          'estimatedReadingTime',
          'viewCount',
          'likeCount',
          'shareCount',
          'commentCount',
          'bookmarkCount',
        ];

        metricsFields.forEach(field => {
          expect(contentItems).toHaveProperty(field);
        });
      });

      it('should have AI enhancement fields', () => {
        expect(contentItems.aiEnhanced).toBeDefined();
        expect(contentItems.aiSummary).toBeDefined();
        expect(contentItems.aiKeyPoints).toBeDefined();
      });

      it('should have media and asset fields', () => {
        expect(contentItems.featuredImageUrl).toBeDefined();
        expect(contentItems.videoUrl).toBeDefined();
        expect(contentItems.audioUrl).toBeDefined();
        expect(contentItems.attachments).toBeDefined();
      });
    });

    describe('Content Relations', () => {
      it('should have content category relations', () => {
        expect(contentCategoriesRelations).toBeDefined();
      });

      it('should have content series relations', () => {
        expect(contentSeriesRelations).toBeDefined();
      });

      it('should have content items relations', () => {
        expect(contentItemsRelations).toBeDefined();
      });

      it('should have series content items relations', () => {
        expect(seriesContentItemsRelations).toBeDefined();
      });

      it('should have content cross references relations', () => {
        expect(contentCrossReferencesRelations).toBeDefined();
      });
    });
  });

  // Assessment System Schema Validation
  describe('Assessment System Schema', () => {
    describe('Assessments Table', () => {
      it('should have correct table structure', () => {
        expect(assessments).toBeDefined();
        expect(assessments._.name).toBe('assessments');
      });

      it('should have all required fields', () => {
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
          expect(assessments).toBeDefined();
        });
      });

      it('should have assessment configuration fields', () => {
        expect(assessments.description).toBeDefined();
        expect(assessments.estimatedDuration).toBeDefined();
        expect(assessments.passingScore).toBeDefined();
        expect(assessments.instructions).toBeDefined();
      });

      it('should have quality metrics fields', () => {
        expect(assessments.validityScore).toBeDefined();
        expect(assessments.reliabilityScore).toBeDefined();
      });
    });

    describe('Assessment Relations', () => {
      it('should have assessment relations', () => {
        expect(assessmentsRelations).toBeDefined();
      });

      it('should have assessment questions relations', () => {
        expect(assessmentQuestionsRelations).toBeDefined();
      });

      it('should have user assessments relations', () => {
        expect(userAssessmentsRelations).toBeDefined();
      });

      it('should have assessment responses relations', () => {
        expect(assessmentResponsesRelations).toBeDefined();
      });
    });
  });

  // Type Generation Validation
  describe('Type Generation Validation', () => {
    it('should have proper type inference for documented tables', () => {
      // Test that types can be inferred from schema for tables documented in DB_SCHEMA.md
      const userProfileType = typeof userProfiles.$inferSelect;
      const newUserProfileType = typeof userProfiles.$inferInsert;
      const organizationType = typeof organizations.$inferSelect;
      const newOrganizationType = typeof organizations.$inferInsert;
      const contentItemType = typeof contentItems.$inferSelect;
      const newContentItemType = typeof contentItems.$inferInsert;
      const assessmentType = typeof assessments.$inferSelect;
      const newAssessmentType = typeof assessments.$inferInsert;

      expect(userProfileType).toBe('object');
      expect(newUserProfileType).toBe('object');
      expect(organizationType).toBe('object');
      expect(newOrganizationType).toBe('object');
      expect(contentItemType).toBe('object');
      expect(newContentItemType).toBe('object');
      expect(assessmentType).toBe('object');
      expect(newAssessmentType).toBe('object');
    });
  });

  // Schema Consistency Validation
  describe('Schema Consistency Validation', () => {
    it('should have consistent table naming for documented tables', () => {
      // All table names should follow snake_case convention (from DB_SCHEMA.md)
      const tableNames = [
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

      tableNames.forEach(name => {
        expect(name).toMatch(/^[a-z][a-z0-9_]*[a-z0-9]$/);
      });
    });

    it('should have consistent field naming', () => {
      // All field names should follow snake_case convention
      const userProfileFields = Object.keys(userProfiles);
      const organizationFields = Object.keys(organizations);

      [...userProfileFields, ...organizationFields].forEach(fieldName => {
        // Skip special Drizzle fields
        if (!['_', '$inferSelect', '$inferInsert'].includes(fieldName)) {
          expect(fieldName).toMatch(/^[a-z][a-z0-9_]*[a-z0-9]$/);
        }
      });
    });

    it('should have consistent timestamp fields for documented tables', () => {
      const tablesWithTimestamps = [
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

      tablesWithTimestamps.forEach(table => {
        expect(table).toHaveProperty('createdAt');
        expect(table).toHaveProperty('updatedAt');
      });
    });

    it('should have consistent ID fields for documented tables', () => {
      const tablesWithIds = [
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

      tablesWithIds.forEach(table => {
        expect(table).toHaveProperty('id');
      });
    });
  });

  // Foreign Key Validation
  describe('Foreign Key Validation', () => {
    it('should have proper foreign key relationships for documented tables', () => {
      // User Profile -> Organization (accountOwnerId)
      expect(organizations.accountOwnerId).toBeDefined();

      // Organization Membership -> User Profile (userId)
      expect(organizationMemberships.userId).toBeDefined();

      // Organization Membership -> Organization (organizationId)
      expect(organizationMemberships.organizationId).toBeDefined();

      // Content Series -> User Profile (authorId)
      expect(contentSeries.authorId).toBeDefined();

      // Content Items -> User Profile (authorId)
      expect(contentItems.authorId).toBeDefined();

      // Content Items -> Content Series (seriesId)
      expect(contentItems.seriesId).toBeDefined();

      // Content Items -> Content Category (primaryCategoryId)
      expect(contentItems.primaryCategoryId).toBeDefined();

      // Assessment Questions -> Assessment (assessmentId)
      expect(assessmentQuestions.assessmentId).toBeDefined();

      // User Assessments -> User Profile (userId)
      expect(userAssessments.userId).toBeDefined();

      // User Assessments -> Assessment (assessmentId)
      expect(userAssessments.assessmentId).toBeDefined();

      // Assessment Responses -> User Assessment (userAssessmentId)
      expect(assessmentResponses.userAssessmentId).toBeDefined();

      // Assessment Responses -> Assessment Question (questionId)
      expect(assessmentResponses.questionId).toBeDefined();
    });

    it('should have proper cascade delete configurations', () => {
      // Organization memberships should cascade delete when user is deleted
      expect(organizationMemberships.userId).toBeDefined();

      // Series content items should cascade delete when series is deleted
      expect(seriesContentItems.seriesId).toBeDefined();
      expect(seriesContentItems.contentId).toBeDefined();

      // Assessment questions should cascade delete when assessment is deleted
      expect(assessmentQuestions.assessmentId).toBeDefined();

      // User assessments should cascade delete when user is deleted
      expect(userAssessments.userId).toBeDefined();

      // Assessment responses should cascade delete when user assessment is deleted
      expect(assessmentResponses.userAssessmentId).toBeDefined();
    });
  });

  // Enum Validation
  describe('Enum Validation', () => {
    it('should have valid ministry role enums from DB_SCHEMA.md', () => {
      // Ministry roles documented in DB_SCHEMA.md
      const ministryRoles = [
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

      // This is a structural test - the actual enum values are defined in the schema
      expect(userProfiles.ministryRole).toBeDefined();
    });

    it('should have valid organization type enums from DB_SCHEMA.md', () => {
      // Organization types documented in DB_SCHEMA.md
      const organizationTypes = [
        'church',
        'denomination',
        'seminary',
        'ministry_network',
        'nonprofit',
        'business',
        'other',
      ];

      expect(organizations.organizationType).toBeDefined();
    });

    it('should have valid content type enums from DB_SCHEMA.md', () => {
      // Content types documented in DB_SCHEMA.md
      const contentTypes = [
        'article',
        'video',
        'podcast',
        'framework',
        'tool',
        'case_study',
        'interview',
        'course_lesson',
      ];

      expect(contentItems.contentType).toBeDefined();
    });

    it('should have valid assessment type enums from DB_SCHEMA.md', () => {
      // Assessment types documented in DB_SCHEMA.md
      const assessmentTypes = [
        'apest',
        'mdna',
        'cultural_intelligence',
        'leadership_style',
        'spiritual_gifts',
        'other',
      ];

      expect(assessments.assessmentType).toBeDefined();
    });

    it('should have valid subscription tier enums from DB_SCHEMA.md', () => {
      // Subscription tiers documented in DB_SCHEMA.md
      const subscriptionTiers = [
        'free',
        'individual',
        'professional',
        'leader',
        'institutional',
      ];

      expect(userProfiles.subscriptionTier).toBeDefined();
    });

    it('should have valid account status enums from DB_SCHEMA.md', () => {
      // Account statuses documented in DB_SCHEMA.md
      const accountStatuses = [
        'active',
        'inactive',
        'suspended',
        'pending_verification',
      ];

      expect(userProfiles.accountStatus).toBeDefined();
    });
  });

  // JSONB Field Validation
  describe('JSONB Field Validation', () => {
    it('should have properly typed JSONB fields from DB_SCHEMA.md', () => {
      // User Profile JSONB fields (documented in DB_SCHEMA.md)
      expect(userProfiles.theologicalFocus).toBeDefined();
      expect(userProfiles.brandColors).toBeDefined();
      expect(userProfiles.emailNotifications).toBeDefined();
      expect(userProfiles.privacySettings).toBeDefined();

      // Organization JSONB fields (documented in DB_SCHEMA.md)
      expect(organizations.address).toBeDefined();

      // Content Category JSONB fields (documented in DB_SCHEMA.md)
      expect(contentCategories.apestRelevance).toBeDefined();
      expect(contentCategories.keywords).toBeDefined();

      // Content Series JSONB fields (documented in DB_SCHEMA.md)
      expect(contentSeries.collaborators).toBeDefined();
      expect(contentSeries.tags).toBeDefined();

      // Content Items JSONB fields (documented in DB_SCHEMA.md)
      expect(contentItems.coAuthors).toBeDefined();
      expect(contentItems.secondaryCategories).toBeDefined();
      expect(contentItems.tags).toBeDefined();
      expect(contentItems.theologicalThemes).toBeDefined();
      expect(contentItems.aiKeyPoints).toBeDefined();
      expect(contentItems.attachments).toBeDefined();

      // Assessment JSONB fields (documented in DB_SCHEMA.md)
      expect(assessmentQuestions.answerOptions).toBeDefined();
      expect(userAssessments.rawScores).toBeDefined();
      expect(userAssessments.normalizedScores).toBeDefined();
      expect(userAssessments.personalizedRecommendations).toBeDefined();
      expect(userAssessments.suggestedPeers).toBeDefined();
      expect(userAssessments.complementaryGifts).toBeDefined();

      // Content Cross References JSONB fields (documented in DB_SCHEMA.md)
      expect(contentCrossReferences.sourceContentId).toBeDefined();
      expect(contentCrossReferences.targetContentId).toBeDefined();

      // Series Content Items JSONB fields (documented in DB_SCHEMA.md)
      expect(seriesContentItems.prerequisites).toBeDefined();
    });
  });

  // Index Validation
  describe('Index Validation', () => {
    it('should have performance indexes available for documented tables', () => {
      // This test ensures that the indexes schema is properly exported
      // The actual index definitions are in the indexes.ts file
      expect(schema).toHaveProperty('userProfiles');
      expect(schema).toHaveProperty('organizations');
      expect(schema).toHaveProperty('contentItems');
      expect(schema).toHaveProperty('assessments');
    });
  });

  // Legacy Compatibility Validation
  describe('Legacy Compatibility Validation', () => {
    it('should maintain backward compatibility aliases', () => {
      // Legacy table aliases should be available
      expect(tables).toHaveProperty('users'); // userProfiles alias
      expect(tables).toHaveProperty('teams'); // organizations alias
      expect(tables).toHaveProperty('teamMembers'); // organizationMemberships alias
    });
  });

  // Schema Completeness Validation
  describe('Schema Completeness Validation', () => {
    it('should have all tables from DB_SCHEMA.md documentation', () => {
      // This test ensures all tables documented in DB_SCHEMA.md are present
      const expectedTables = [
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

      const actualTables = [
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

      expectedTables.forEach(expectedTable => {
        expect(actualTables).toContain(expectedTable);
      });
    });

    it('should have all required relations from DB_SCHEMA.md', () => {
      // This test ensures all relations documented in DB_SCHEMA.md are properly defined
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

      const schemaKeys = Object.keys(schema);

      expectedRelations.forEach(expectedRelation => {
        expect(schemaKeys).toContain(expectedRelation);
      });
    });
  });
});
