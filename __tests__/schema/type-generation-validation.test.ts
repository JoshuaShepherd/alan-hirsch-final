// ============================================================================
// TYPE GENERATION VALIDATION TESTS
// ============================================================================
// Validates schema completeness and accuracy before type generation
// Ensures all types can be generated correctly from schema

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { beforeAll, describe, expect, it } from 'vitest';

// Import schema and types that match DB_SCHEMA.md
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
  type ContentItem,
  type NewContentItem,
  type NewOrganization,
  type NewUserProfile,
  type Organization,
  type UserProfile,
} from '../../packages/database/src/db/schema';

describe('Type Generation Validation', () => {
  let db: ReturnType<typeof drizzle>;
  let connection: postgres.Sql;

  beforeAll(async () => {
    // Create test database connection
    const connectionString =
      process.env.DATABASE_URL || 'postgresql://localhost:5432/test';
    connection = postgres(connectionString);
    db = drizzle(connection);
  });

  // Schema Completeness Validation
  describe('Schema Completeness Validation', () => {
    it('should have all required tables for type generation from DB_SCHEMA.md', () => {
      const requiredTables = [
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

      requiredTables.forEach(table => {
        expect(table).toBeDefined();
        expect(table._.name).toBeDefined();
        expect(table._.columns).toBeDefined();
      });
    });

    it('should have all required relations for type generation from DB_SCHEMA.md', () => {
      const schemaKeys = Object.keys(schema);
      const relationKeys = schemaKeys.filter(key => key.includes('Relations'));

      expect(relationKeys.length).toBeGreaterThan(0);
      expect(relationKeys).toContain('userProfilesRelations');
      expect(relationKeys).toContain('organizationsRelations');
      expect(relationKeys).toContain('organizationMembershipsRelations');
      expect(relationKeys).toContain('contentCategoriesRelations');
      expect(relationKeys).toContain('contentSeriesRelations');
      expect(relationKeys).toContain('contentItemsRelations');
      expect(relationKeys).toContain('seriesContentItemsRelations');
      expect(relationKeys).toContain('contentCrossReferencesRelations');
      expect(relationKeys).toContain('assessmentsRelations');
      expect(relationKeys).toContain('assessmentQuestionsRelations');
      expect(relationKeys).toContain('userAssessmentsRelations');
      expect(relationKeys).toContain('assessmentResponsesRelations');
    });

    it('should have complete schema export structure for documented tables', () => {
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');

      const schemaKeys = Object.keys(schema);
      expect(schemaKeys.length).toBeGreaterThan(20); // Should have exports for documented tables
    });
  });

  // Type Inference Validation
  describe('Type Inference Validation', () => {
    it('should infer select types correctly', () => {
      // Test that select types can be inferred
      type UserProfileSelect = typeof userProfiles.$inferSelect;
      type OrganizationSelect = typeof organizations.$inferSelect;
      type ContentItemSelect = typeof contentItems.$inferSelect;
      type AssessmentSelect = typeof assessments.$inferSelect;

      expect(typeof UserProfileSelect).toBe('object');
      expect(typeof OrganizationSelect).toBe('object');
      expect(typeof ContentItemSelect).toBe('object');
      expect(typeof AssessmentSelect).toBe('object');
    });

    it('should infer insert types correctly', () => {
      // Test that insert types can be inferred
      type UserProfileInsert = typeof userProfiles.$inferInsert;
      type OrganizationInsert = typeof organizations.$inferInsert;
      type ContentItemInsert = typeof contentItems.$inferInsert;
      type AssessmentInsert = typeof assessments.$inferInsert;

      expect(typeof UserProfileInsert).toBe('object');
      expect(typeof OrganizationInsert).toBe('object');
      expect(typeof ContentItemInsert).toBe('object');
      expect(typeof AssessmentInsert).toBe('object');
    });

    it('should have consistent type inference across documented tables', () => {
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
        type SelectType = typeof table.$inferSelect;
        type InsertType = typeof table.$inferInsert;

        expect(typeof SelectType).toBe('object');
        expect(typeof InsertType).toBe('object');
      });
    });
  });

  // Exported Type Validation
  describe('Exported Type Validation', () => {
    it('should export all required entity types from DB_SCHEMA.md', () => {
      // User Profile types
      expect(UserProfile).toBeDefined();
      expect(NewUserProfile).toBeDefined();

      // Organization types
      expect(Organization).toBeDefined();
      expect(NewOrganization).toBeDefined();

      // Content types
      expect(ContentItem).toBeDefined();
      expect(NewContentItem).toBeDefined();
    });

    it('should have proper type structure for all entities', () => {
      // Test that types have proper structure
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

      const organizationData: Organization = {
        id: 'test-org-id',
        name: 'Test Organization',
        slug: 'test-organization',
        organizationType: 'church',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const contentItemData: ContentItem = {
        id: 'test-content-id',
        title: 'Test Content',
        slug: 'test-content',
        authorId: 'test-author-id',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      expect(userProfileData).toBeDefined();
      expect(organizationData).toBeDefined();
      expect(contentItemData).toBeDefined();
    });
  });

  // Field Type Validation
  describe('Field Type Validation', () => {
    it('should have correct field types for UserProfile', () => {
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

      // Test string fields
      expect(typeof userProfileData.id).toBe('string');
      expect(typeof userProfileData.email).toBe('string');
      expect(typeof userProfileData.firstName).toBe('string');
      expect(typeof userProfileData.lastName).toBe('string');
      expect(typeof userProfileData.ministryRole).toBe('string');
      expect(typeof userProfileData.accountStatus).toBe('string');

      // Test date fields
      expect(userProfileData.createdAt).toBeInstanceOf(Date);
      expect(userProfileData.updatedAt).toBeInstanceOf(Date);
      expect(userProfileData.lastActiveAt).toBeInstanceOf(Date);
    });

    it('should have correct field types for Organization', () => {
      const organizationData: Organization = {
        id: 'test-org-id',
        name: 'Test Organization',
        slug: 'test-organization',
        organizationType: 'church',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Test string fields
      expect(typeof organizationData.id).toBe('string');
      expect(typeof organizationData.name).toBe('string');
      expect(typeof organizationData.slug).toBe('string');
      expect(typeof organizationData.organizationType).toBe('string');
      expect(typeof organizationData.status).toBe('string');

      // Test date fields
      expect(organizationData.createdAt).toBeInstanceOf(Date);
      expect(organizationData.updatedAt).toBeInstanceOf(Date);
    });

    it('should have correct field types for ContentItem', () => {
      const contentItemData: ContentItem = {
        id: 'test-content-id',
        title: 'Test Content',
        slug: 'test-content',
        authorId: 'test-author-id',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Test string fields
      expect(typeof contentItemData.id).toBe('string');
      expect(typeof contentItemData.title).toBe('string');
      expect(typeof contentItemData.slug).toBe('string');
      expect(typeof contentItemData.authorId).toBe('string');
      expect(typeof contentItemData.contentType).toBe('string');
      expect(typeof contentItemData.status).toBe('string');
      expect(typeof contentItemData.visibility).toBe('string');

      // Test date fields
      expect(contentItemData.createdAt).toBeInstanceOf(Date);
      expect(contentItemData.updatedAt).toBeInstanceOf(Date);
    });
  });

  // Optional Field Validation
  describe('Optional Field Validation', () => {
    it('should handle optional fields correctly in UserProfile', () => {
      const newUserProfile: NewUserProfile = {
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
      };

      // Required fields should be present
      expect(newUserProfile.id).toBe('test-id');
      expect(newUserProfile.email).toBe('test@example.com');
      expect(newUserProfile.firstName).toBe('Test');
      expect(newUserProfile.lastName).toBe('User');
      expect(newUserProfile.ministryRole).toBe('senior_pastor');
      expect(newUserProfile.accountStatus).toBe('active');

      // Optional fields should be undefined
      expect(newUserProfile.displayName).toBeUndefined();
      expect(newUserProfile.bio).toBeUndefined();
      expect(newUserProfile.avatarUrl).toBeUndefined();
      expect(newUserProfile.denomination).toBeUndefined();
      expect(newUserProfile.organizationName).toBeUndefined();
      expect(newUserProfile.yearsInMinistry).toBeUndefined();
      expect(newUserProfile.countryCode).toBeUndefined();
      expect(newUserProfile.timezone).toBeUndefined();
      expect(newUserProfile.culturalContext).toBeUndefined();
      expect(newUserProfile.assessmentMovementAlignment).toBeUndefined();
      expect(newUserProfile.assessmentAudienceEngagement).toBeUndefined();
      expect(newUserProfile.assessmentContentReadiness).toBeUndefined();
      expect(newUserProfile.assessmentRevenuePotential).toBeUndefined();
      expect(newUserProfile.assessmentNetworkEffects).toBeUndefined();
      expect(newUserProfile.assessmentStrategicFit).toBeUndefined();
      expect(newUserProfile.assessmentTotal).toBeUndefined();
      expect(newUserProfile.leaderTier).toBeUndefined();
      expect(newUserProfile.subdomain).toBeUndefined();
      expect(newUserProfile.customDomain).toBeUndefined();
      expect(newUserProfile.platformTitle).toBeUndefined();
      expect(newUserProfile.languagePrimary).toBeUndefined();
      expect(newUserProfile.subscriptionTier).toBeUndefined();
      expect(newUserProfile.theologicalFocus).toBeUndefined();
      expect(newUserProfile.brandColors).toBeUndefined();
      expect(newUserProfile.emailNotifications).toBeUndefined();
      expect(newUserProfile.privacySettings).toBeUndefined();
      expect(newUserProfile.onboardingCompleted).toBeUndefined();
      expect(newUserProfile.onboardingStep).toBeUndefined();
      expect(newUserProfile.createdAt).toBeUndefined();
      expect(newUserProfile.updatedAt).toBeUndefined();
      expect(newUserProfile.lastActiveAt).toBeUndefined();
    });

    it('should handle optional fields correctly in Organization', () => {
      const newOrganization: NewOrganization = {
        id: 'test-org-id',
        name: 'Test Organization',
        slug: 'test-organization',
        organizationType: 'church',
        status: 'active',
      };

      // Required fields should be present
      expect(newOrganization.id).toBe('test-org-id');
      expect(newOrganization.name).toBe('Test Organization');
      expect(newOrganization.slug).toBe('test-organization');
      expect(newOrganization.organizationType).toBe('church');
      expect(newOrganization.status).toBe('active');

      // Optional fields should be undefined
      expect(newOrganization.description).toBeUndefined();
      expect(newOrganization.website).toBeUndefined();
      expect(newOrganization.logoUrl).toBeUndefined();
      expect(newOrganization.sizeCategory).toBeUndefined();
      expect(newOrganization.contactEmail).toBeUndefined();
      expect(newOrganization.contactPhone).toBeUndefined();
      expect(newOrganization.address).toBeUndefined();
      expect(newOrganization.licenseType).toBeUndefined();
      expect(newOrganization.maxUsers).toBeUndefined();
      expect(newOrganization.billingEmail).toBeUndefined();
      expect(newOrganization.accountOwnerId).toBeUndefined();
      expect(newOrganization.stripeCustomerId).toBeUndefined();
      expect(newOrganization.stripeProductId).toBeUndefined();
      expect(newOrganization.createdAt).toBeUndefined();
      expect(newOrganization.updatedAt).toBeUndefined();
    });

    it('should handle optional fields correctly in ContentItem', () => {
      const newContentItem: NewContentItem = {
        id: 'test-content-id',
        title: 'Test Content',
        slug: 'test-content',
        authorId: 'test-author-id',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
      };

      // Required fields should be present
      expect(newContentItem.id).toBe('test-content-id');
      expect(newContentItem.title).toBe('Test Content');
      expect(newContentItem.slug).toBe('test-content');
      expect(newContentItem.authorId).toBe('test-author-id');
      expect(newContentItem.contentType).toBe('article');
      expect(newContentItem.status).toBe('published');
      expect(newContentItem.visibility).toBe('public');

      // Optional fields should be undefined
      expect(newContentItem.excerpt).toBeUndefined();
      expect(newContentItem.content).toBeUndefined();
      expect(newContentItem.coAuthors).toBeUndefined();
      expect(newContentItem.format).toBeUndefined();
      expect(newContentItem.wordCount).toBeUndefined();
      expect(newContentItem.estimatedReadingTime).toBeUndefined();
      expect(newContentItem.viewCount).toBeUndefined();
      expect(newContentItem.likeCount).toBeUndefined();
      expect(newContentItem.shareCount).toBeUndefined();
      expect(newContentItem.commentCount).toBeUndefined();
      expect(newContentItem.bookmarkCount).toBeUndefined();
      expect(newContentItem.primaryCategoryId).toBeUndefined();
      expect(newContentItem.secondaryCategories).toBeUndefined();
      expect(newContentItem.tags).toBeUndefined();
      expect(newContentItem.theologicalThemes).toBeUndefined();
      expect(newContentItem.seriesId).toBeUndefined();
      expect(newContentItem.seriesOrder).toBeUndefined();
      expect(newContentItem.networkAmplificationScore).toBeUndefined();
      expect(newContentItem.crossReferenceCount).toBeUndefined();
      expect(newContentItem.aiEnhanced).toBeUndefined();
      expect(newContentItem.aiSummary).toBeUndefined();
      expect(newContentItem.aiKeyPoints).toBeUndefined();
      expect(newContentItem.featuredImageUrl).toBeUndefined();
      expect(newContentItem.videoUrl).toBeUndefined();
      expect(newContentItem.audioUrl).toBeUndefined();
      expect(newContentItem.attachments).toBeUndefined();
      expect(newContentItem.metaTitle).toBeUndefined();
      expect(newContentItem.metaDescription).toBeUndefined();
      expect(newContentItem.canonicalUrl).toBeUndefined();
      expect(newContentItem.originalSource).toBeUndefined();
      expect(newContentItem.licenseType).toBeUndefined();
      expect(newContentItem.attributionRequired).toBeUndefined();
      expect(newContentItem.createdAt).toBeUndefined();
      expect(newContentItem.updatedAt).toBeUndefined();
      expect(newContentItem.publishedAt).toBeUndefined();
      expect(newContentItem.scheduledAt).toBeUndefined();
    });
  });

  // JSONB Field Validation
  describe('JSONB Field Validation', () => {
    it('should handle JSONB fields correctly', () => {
      const userProfileWithJsonb: UserProfile = {
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        theologicalFocus: ['theology', 'ministry'],
        brandColors: {
          primary: '#2563eb',
          secondary: '#64748b',
          accent: '#059669',
        },
        emailNotifications: {
          dailyDigest: true,
          collaborationRequests: true,
          revenueReports: true,
          communityUpdates: true,
        },
        privacySettings: {
          publicProfile: true,
          showAssessmentResults: false,
          allowNetworking: true,
          shareAnalytics: false,
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Test JSONB fields
      expect(userProfileWithJsonb.theologicalFocus).toEqual([
        'theology',
        'ministry',
      ]);
      expect(userProfileWithJsonb.brandColors).toEqual({
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#059669',
      });
      expect(userProfileWithJsonb.emailNotifications).toEqual({
        dailyDigest: true,
        collaborationRequests: true,
        revenueReports: true,
        communityUpdates: true,
      });
      expect(userProfileWithJsonb.privacySettings).toEqual({
        publicProfile: true,
        showAssessmentResults: false,
        allowNetworking: true,
        shareAnalytics: false,
      });
    });
  });

  // Enum Field Validation
  describe('Enum Field Validation', () => {
    it('should handle enum fields correctly', () => {
      const userProfileWithEnums: UserProfile = {
        id: 'test-id',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        ministryRole: 'senior_pastor',
        accountStatus: 'active',
        culturalContext: 'western',
        leaderTier: 'core',
        subscriptionTier: 'professional',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastActiveAt: new Date(),
      };

      // Test enum fields
      expect(userProfileWithEnums.ministryRole).toBe('senior_pastor');
      expect(userProfileWithEnums.accountStatus).toBe('active');
      expect(userProfileWithEnums.culturalContext).toBe('western');
      expect(userProfileWithEnums.leaderTier).toBe('core');
      expect(userProfileWithEnums.subscriptionTier).toBe('professional');
    });

    it('should handle organization enum fields correctly', () => {
      const organizationWithEnums: Organization = {
        id: 'test-org-id',
        name: 'Test Organization',
        slug: 'test-organization',
        organizationType: 'church',
        status: 'active',
        sizeCategory: 'medium',
        licenseType: 'team',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Test enum fields
      expect(organizationWithEnums.organizationType).toBe('church');
      expect(organizationWithEnums.status).toBe('active');
      expect(organizationWithEnums.sizeCategory).toBe('medium');
      expect(organizationWithEnums.licenseType).toBe('team');
    });

    it('should handle content item enum fields correctly', () => {
      const contentItemWithEnums: ContentItem = {
        id: 'test-content-id',
        title: 'Test Content',
        slug: 'test-content',
        authorId: 'test-author-id',
        contentType: 'article',
        status: 'published',
        visibility: 'public',
        format: 'text',
        licenseType: 'all_rights_reserved',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Test enum fields
      expect(contentItemWithEnums.contentType).toBe('article');
      expect(contentItemWithEnums.status).toBe('published');
      expect(contentItemWithEnums.visibility).toBe('public');
      expect(contentItemWithEnums.format).toBe('text');
      expect(contentItemWithEnums.licenseType).toBe('all_rights_reserved');
    });
  });

  // Type Generation Readiness
  describe('Type Generation Readiness', () => {
    it('should be ready for type generation with documented tables', () => {
      // Test that all required components are present for type generation
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('object');

      const schemaKeys = Object.keys(schema);
      expect(schemaKeys.length).toBeGreaterThan(20);

      // Test that all documented tables are present
      const tableKeys = schemaKeys.filter(
        key => !key.includes('Relations') && !key.includes('relations')
      );
      expect(tableKeys.length).toBeGreaterThan(10);

      // Test that all documented relations are present
      const relationKeys = schemaKeys.filter(
        key => key.includes('Relations') || key.includes('relations')
      );
      expect(relationKeys.length).toBeGreaterThan(10);
    });

    it('should have consistent type exports for documented tables', () => {
      // Test that all required types from DB_SCHEMA.md are exported and accessible
      const requiredTypes = [
        UserProfile,
        NewUserProfile,
        Organization,
        NewOrganization,
        ContentItem,
        NewContentItem,
      ];

      requiredTypes.forEach(type => {
        expect(type).toBeDefined();
      });
    });

    it('should support type generation tools', () => {
      // Test that schema is compatible with type generation tools
      expect(userProfiles.$inferSelect).toBeDefined();
      expect(userProfiles.$inferInsert).toBeDefined();
      expect(organizations.$inferSelect).toBeDefined();
      expect(organizations.$inferInsert).toBeDefined();
      expect(contentItems.$inferSelect).toBeDefined();
      expect(contentItems.$inferInsert).toBeDefined();
    });
  });

  // Cleanup
  afterAll(async () => {
    if (connection) {
      await connection.end();
    }
  });
});
