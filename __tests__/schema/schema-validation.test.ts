// ============================================================================
// DATABASE SCHEMA VALIDATION TESTS
// ============================================================================
// Tests to verify schema integrity after MCP-Supabase generation

import { describe, expect, it } from 'vitest';

// Import schema definitions directly
import {
  assessments,
  contentItems,
  organizations,
  userProfiles,
} from '../../packages/database/src/db/schema';

describe('Database Schema Validation', () => {
  describe('Schema Exports', () => {
    it('should export all required schema tables', () => {
      // Check that all required schema exports are available
      expect(userProfiles).toBeDefined();
      expect(contentItems).toBeDefined();
      expect(assessments).toBeDefined();
      expect(organizations).toBeDefined();
    });

    it('should have proper table structure', () => {
      // Check that tables are Drizzle table objects
      expect(typeof userProfiles).toBe('object');
      expect(typeof contentItems).toBe('object');
      expect(typeof assessments).toBe('object');
      expect(typeof organizations).toBe('object');
    });
  });

  describe('Field Validation', () => {
    it('should have required fields for UserProfile', () => {
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

    it('should have required fields for ContentItem', () => {
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

    it('should have required fields for Assessment', () => {
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
        expect(assessments).toHaveProperty(field);
      });
    });

    it('should have required fields for Organization', () => {
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
  });

  describe('Field Type Validation', () => {
    it('should validate UUID fields are properly defined', () => {
      // Check that ID fields exist and are defined
      expect(userProfiles.id).toBeDefined();
      expect(contentItems.id).toBeDefined();
      expect(assessments.id).toBeDefined();
      expect(organizations.id).toBeDefined();
    });

    it('should validate required fields are defined', () => {
      // Check that required fields exist
      expect(userProfiles.email).toBeDefined();
      expect(userProfiles.firstName).toBeDefined();
      expect(userProfiles.lastName).toBeDefined();
      expect(userProfiles.ministryRole).toBeDefined();

      expect(contentItems.title).toBeDefined();
      expect(contentItems.slug).toBeDefined();
      expect(contentItems.authorId).toBeDefined();

      expect(assessments.name).toBeDefined();
      expect(assessments.slug).toBeDefined();
      expect(assessments.assessmentType).toBeDefined();

      expect(organizations.name).toBeDefined();
      expect(organizations.slug).toBeDefined();
      expect(organizations.organizationType).toBeDefined();
    });

    it('should validate enum fields are defined', () => {
      // Check that enum fields exist
      expect(userProfiles.ministryRole).toBeDefined();
      expect(userProfiles.subscriptionTier).toBeDefined();
      expect(userProfiles.accountStatus).toBeDefined();
      expect(userProfiles.culturalContext).toBeDefined();
      expect(userProfiles.leaderTier).toBeDefined();
    });

    it('should validate timestamp fields are defined', () => {
      // Check that timestamp fields exist
      expect(userProfiles.createdAt).toBeDefined();
      expect(userProfiles.updatedAt).toBeDefined();
      expect(userProfiles.lastActiveAt).toBeDefined();

      expect(contentItems.createdAt).toBeDefined();
      expect(contentItems.updatedAt).toBeDefined();

      expect(assessments.createdAt).toBeDefined();
      expect(assessments.updatedAt).toBeDefined();

      expect(organizations.createdAt).toBeDefined();
      expect(organizations.updatedAt).toBeDefined();
    });
  });

  describe('Relationship Validation', () => {
    it('should validate foreign key fields exist', () => {
      // Check that foreign key fields exist
      expect(contentItems.authorId).toBeDefined();
    });

    it('should validate JSONB fields are defined', () => {
      // Check that JSONB fields exist
      expect(userProfiles.theologicalFocus).toBeDefined();
      expect(userProfiles.brandColors).toBeDefined();
      expect(userProfiles.emailNotifications).toBeDefined();
      expect(userProfiles.privacySettings).toBeDefined();
    });
  });

  describe('Constraint Validation', () => {
    it('should validate unique fields are defined', () => {
      // Check that unique fields exist
      expect(userProfiles.email).toBeDefined();
      expect(userProfiles.subdomain).toBeDefined();
      expect(userProfiles.customDomain).toBeDefined();

      expect(contentItems.slug).toBeDefined();
      expect(assessments.slug).toBeDefined();
      expect(organizations.slug).toBeDefined();
    });

    it('should validate default value fields are defined', () => {
      // Check that fields with default values exist
      expect(userProfiles.languagePrimary).toBeDefined();
      expect(userProfiles.subscriptionTier).toBeDefined();
      expect(userProfiles.theologicalFocus).toBeDefined();
      expect(userProfiles.brandColors).toBeDefined();
    });

    it('should validate assessment score fields are defined', () => {
      // Check that assessment score fields exist
      expect(userProfiles.assessmentMovementAlignment).toBeDefined();
      expect(userProfiles.assessmentAudienceEngagement).toBeDefined();
      expect(userProfiles.assessmentContentReadiness).toBeDefined();
      expect(userProfiles.assessmentRevenuePotential).toBeDefined();
      expect(userProfiles.assessmentNetworkEffects).toBeDefined();
      expect(userProfiles.assessmentStrategicFit).toBeDefined();
      expect(userProfiles.assessmentTotal).toBeDefined();
    });
  });

  describe('Alignment Reference Compliance', () => {
    it('should match alignment reference field mappings', () => {
      // Test that schemas match the alignment reference document
      const userProfileFields = Object.keys(userProfiles);

      // Required fields from alignment reference
      expect(userProfileFields).toContain('id');
      expect(userProfileFields).toContain('email');
      expect(userProfileFields).toContain('firstName');
      expect(userProfileFields).toContain('lastName');
      expect(userProfileFields).toContain('ministryRole');
      expect(userProfileFields).toContain('accountStatus');
      expect(userProfileFields).toContain('createdAt');
      expect(userProfileFields).toContain('updatedAt');
      expect(userProfileFields).toContain('lastActiveAt');

      // Optional fields from alignment reference
      expect(userProfileFields).toContain('displayName');
      expect(userProfileFields).toContain('bio');
      expect(userProfileFields).toContain('avatarUrl');
      expect(userProfileFields).toContain('denomination');
      expect(userProfileFields).toContain('organizationName');
      expect(userProfileFields).toContain('yearsInMinistry');
      expect(userProfileFields).toContain('countryCode');
      expect(userProfileFields).toContain('timezone');
      expect(userProfileFields).toContain('culturalContext');
      expect(userProfileFields).toContain('assessmentMovementAlignment');
      expect(userProfileFields).toContain('assessmentAudienceEngagement');
      expect(userProfileFields).toContain('assessmentContentReadiness');
      expect(userProfileFields).toContain('assessmentRevenuePotential');
      expect(userProfileFields).toContain('assessmentNetworkEffects');
      expect(userProfileFields).toContain('assessmentStrategicFit');
      expect(userProfileFields).toContain('assessmentTotal');
      expect(userProfileFields).toContain('leaderTier');
      expect(userProfileFields).toContain('subdomain');
      expect(userProfileFields).toContain('customDomain');
      expect(userProfileFields).toContain('platformTitle');
      expect(userProfileFields).toContain('languagePrimary');
      expect(userProfileFields).toContain('subscriptionTier');
      expect(userProfileFields).toContain('theologicalFocus');
      expect(userProfileFields).toContain('brandColors');
      expect(userProfileFields).toContain('emailNotifications');
      expect(userProfileFields).toContain('privacySettings');
      expect(userProfileFields).toContain('onboardingCompleted');
      expect(userProfileFields).toContain('onboardingStep');
    });

    it('should validate content item fields match alignment reference', () => {
      const contentItemFields = Object.keys(contentItems);

      // Required fields from alignment reference
      expect(contentItemFields).toContain('id');
      expect(contentItemFields).toContain('title');
      expect(contentItemFields).toContain('slug');
      expect(contentItemFields).toContain('authorId');
      expect(contentItemFields).toContain('contentType');
      expect(contentItemFields).toContain('status');
      expect(contentItemFields).toContain('visibility');
      expect(contentItemFields).toContain('createdAt');
      expect(contentItemFields).toContain('updatedAt');

      // Optional fields from alignment reference
      expect(contentItemFields).toContain('excerpt');
      expect(contentItemFields).toContain('content');
      expect(contentItemFields).toContain('wordCount');
      expect(contentItemFields).toContain('estimatedReadingTime');
      expect(contentItemFields).toContain('viewCount');
      expect(contentItemFields).toContain('likeCount');
      expect(contentItemFields).toContain('shareCount');
      expect(contentItemFields).toContain('commentCount');
      expect(contentItemFields).toContain('bookmarkCount');
      expect(contentItemFields).toContain('tags');
      expect(contentItemFields).toContain('theologicalThemes');
      expect(contentItemFields).toContain('aiEnhanced');
      expect(contentItemFields).toContain('aiSummary');
      expect(contentItemFields).toContain('aiKeyPoints');
      expect(contentItemFields).toContain('featuredImageUrl');
      expect(contentItemFields).toContain('publishedAt');
      expect(contentItemFields).toContain('licenseType');
      expect(contentItemFields).toContain('attributionRequired');
    });

    it('should validate assessment fields match alignment reference', () => {
      const assessmentFields = Object.keys(assessments);

      // Required fields from alignment reference
      expect(assessmentFields).toContain('id');
      expect(assessmentFields).toContain('name');
      expect(assessmentFields).toContain('slug');
      expect(assessmentFields).toContain('assessmentType');
      expect(assessmentFields).toContain('questionsCount');
      expect(assessmentFields).toContain('status');
      expect(assessmentFields).toContain('createdAt');
      expect(assessmentFields).toContain('updatedAt');

      // Optional fields from alignment reference
      expect(assessmentFields).toContain('description');
      expect(assessmentFields).toContain('estimatedDuration');
      expect(assessmentFields).toContain('passingScore');
      expect(assessmentFields).toContain('validityScore');
      expect(assessmentFields).toContain('reliabilityScore');
      expect(assessmentFields).toContain('instructions');
      expect(assessmentFields).toContain('publishedAt');
      expect(assessmentFields).toContain('version');
      expect(assessmentFields).toContain('language');
      expect(assessmentFields).toContain('culturalAdaptation');
      expect(assessmentFields).toContain('researchBacked');
      expect(assessmentFields).toContain('scoringMethod');
    });

    it('should validate organization fields match alignment reference', () => {
      const organizationFields = Object.keys(organizations);

      // Required fields from alignment reference
      expect(organizationFields).toContain('id');
      expect(organizationFields).toContain('name');
      expect(organizationFields).toContain('slug');
      expect(organizationFields).toContain('organizationType');
      expect(organizationFields).toContain('status');
      expect(organizationFields).toContain('createdAt');
      expect(organizationFields).toContain('updatedAt');

      // Optional fields from alignment reference
      expect(organizationFields).toContain('description');
      expect(organizationFields).toContain('website');
      expect(organizationFields).toContain('logoUrl');
      expect(organizationFields).toContain('sizeCategory');
      expect(organizationFields).toContain('contactEmail');
      expect(organizationFields).toContain('contactPhone');
      expect(organizationFields).toContain('address');
      expect(organizationFields).toContain('billingEmail');
      expect(organizationFields).toContain('accountOwnerId');
      expect(organizationFields).toContain('licenseType');
      expect(organizationFields).toContain('maxUsers');
    });
  });
});
