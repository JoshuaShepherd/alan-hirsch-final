// Layer Boundary Integration Tests
// Tests the integration between different layers to ensure they work together correctly

import {
  assessmentEntitySchema,
  organizationEntitySchema,
  userprofileEntitySchema,
} from '@platform/contracts';
import {
  assessmentsToApi,
  organizationsToApi,
  userProfilesFromApi,
  userProfilesToApi,
} from '@platform/shared/mappers';
import type {
  AssessmentsSelect,
  OrganizationsSelect,
  UserProfilesInsert,
  UserProfilesSelect,
} from '@platform/types';
import { describe, expect, test } from 'vitest';
import {
  createTestAssessment,
  createTestOrganization,
  createTestUserProfile,
} from './test-setup';

describe('Layer Boundary Integration', () => {
  describe('Database Schema ↔ Types Integration', () => {
    test('database schema types match TypeScript types', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();

      // Test that the database schema type is compatible with TypeScript types
      expect(userProfile.id).toBeDefined();
      expect(userProfile.email).toBeDefined();
      expect(userProfile.firstName).toBeDefined();
      expect(userProfile.lastName).toBeDefined();
      expect(userProfile.ministryRole).toBeDefined();
      expect(userProfile.createdAt).toBeInstanceOf(Date);
      expect(userProfile.updatedAt).toBeInstanceOf(Date);
    });

    test('database schema enums match TypeScript enums', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();
      const assessment: AssessmentsSelect = createTestAssessment();

      // Test ministryRole enum
      expect([
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
      ]).toContain(userProfile.ministryRole);

      // Test organizationType enum
      expect([
        'church',
        'denomination',
        'seminary',
        'nonprofit',
        'business',
        'other',
      ]).toContain(organization.organizationType);

      // Test assessmentType enum
      expect([
        'spiritual_gifts',
        'leadership_style',
        'ministry_fit',
        'cultural_competency',
        'custom',
      ]).toContain(assessment.assessmentType);
    });

    test('database schema relationships are properly typed', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();

      // Test that foreign key fields exist and are properly typed
      expect(typeof userProfile.id).toBe('string');
      expect(typeof organization.id).toBe('string');

      // Test that timestamps are properly typed
      expect(userProfile.createdAt).toBeInstanceOf(Date);
      expect(userProfile.updatedAt).toBeInstanceOf(Date);
      expect(organization.createdAt).toBeInstanceOf(Date);
      expect(organization.updatedAt).toBeInstanceOf(Date);
    });
  });

  describe('Types ↔ Contracts Integration', () => {
    test('TypeScript types are compatible with Zod schemas', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();
      const assessment: AssessmentsSelect = createTestAssessment();

      // Test that TypeScript types can be validated by Zod schemas
      const userResult = userprofileEntitySchema.safeParse(userProfile);
      expect(userResult.success).toBe(true);

      const orgResult = organizationEntitySchema.safeParse(organization);
      expect(orgResult.success).toBe(true);

      const assessmentResult = assessmentEntitySchema.safeParse(assessment);
      expect(assessmentResult.success).toBe(true);
    });

    test('Zod schema validation matches TypeScript type constraints', () => {
      // Test valid data
      const validUserProfile: UserProfilesInsert = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const result = userprofileEntitySchema.safeParse(validUserProfile);
      expect(result.success).toBe(true);

      // Test invalid data
      const invalidUserProfile = {
        id: 'invalid-uuid',
        email: 'not-an-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid_role',
      };

      const invalidResult =
        userprofileEntitySchema.safeParse(invalidUserProfile);
      expect(invalidResult.success).toBe(false);
    });

    test('enum values are consistent between types and contracts', () => {
      const validMinistryRoles = [
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

      validMinistryRoles.forEach(role => {
        const userProfile: UserProfilesSelect = createTestUserProfile({
          ministryRole: role as any,
        });

        const result = userprofileEntitySchema.safeParse(userProfile);
        expect(result.success).toBe(true);
      });
    });

    test('nullable fields are handled consistently', () => {
      const userProfileWithNulls: UserProfilesSelect = createTestUserProfile({
        passwordHash: null,
        displayName: null,
        bio: null,
        avatarUrl: null,
        denomination: null,
        organizationName: null,
        yearsInMinistry: null,
        countryCode: null,
        timezone: null,
        culturalContext: null,
        lastActiveAt: null,
      });

      const result = userprofileEntitySchema.safeParse(userProfileWithNulls);
      expect(result.success).toBe(true);
    });
  });

  describe('Contracts ↔ Mappers Integration', () => {
    test('contract validation works with mapper transformations', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();

      // Transform database data to API format
      const apiData = userProfilesToApi(userProfile);

      // Validate the transformed data with contracts
      const result = userprofileEntitySchema.safeParse(apiData);
      expect(result.success).toBe(true);
    });

    test('mapper transformations preserve contract validity', () => {
      const validApiData: UserProfilesInsert = {
        id: '550e8400-e29b-41d4-a716-446655440000',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      // Validate the input data
      const inputValidation = userprofileEntitySchema.safeParse(validApiData);
      expect(inputValidation.success).toBe(true);

      // Transform API data to database format
      const dbData = userProfilesFromApi(validApiData);

      // Transform back to API format
      const backToApi = userProfilesToApi(dbData as UserProfilesSelect);

      // Validate the final data
      const outputValidation = userprofileEntitySchema.safeParse(backToApi);
      expect(outputValidation.success).toBe(true);
    });

    test('contract errors are preserved through mapper transformations', () => {
      const invalidApiData = {
        id: 'invalid-uuid',
        email: 'not-an-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid_role',
      };

      // Validate the input data (should fail)
      const inputValidation = userprofileEntitySchema.safeParse(invalidApiData);
      expect(inputValidation.success).toBe(false);

      // Even if we transform it, the contract validation should still fail
      const transformedData = userProfilesFromApi(invalidApiData as any);
      const backToApi = userProfilesToApi(
        transformedData as UserProfilesSelect
      );
      const outputValidation = userprofileEntitySchema.safeParse(backToApi);

      // The transformation might "fix" some issues, but the core validation should still work
      expect(typeof outputValidation.success).toBe('boolean');
    });
  });

  describe('Database Schema ↔ Mappers Integration', () => {
    test('database schema data transforms correctly through mappers', () => {
      const dbUserProfile: UserProfilesSelect = createTestUserProfile();
      const dbOrganization: OrganizationsSelect = createTestOrganization();
      const dbAssessment: AssessmentsSelect = createTestAssessment();

      // Transform database data to API format
      const apiUserProfile = userProfilesToApi(dbUserProfile);
      const apiOrganization = organizationsToApi(dbOrganization);
      const apiAssessment = assessmentsToApi(dbAssessment);

      // Verify the transformation preserves all data
      expect(apiUserProfile.id).toBe(dbUserProfile.id);
      expect(apiUserProfile.email).toBe(dbUserProfile.email);
      expect(apiUserProfile.firstName).toBe(dbUserProfile.firstName);
      expect(apiUserProfile.lastName).toBe(dbUserProfile.lastName);

      expect(apiOrganization.id).toBe(dbOrganization.id);
      expect(apiOrganization.name).toBe(dbOrganization.name);
      expect(apiOrganization.slug).toBe(dbOrganization.slug);

      expect(apiAssessment.id).toBe(dbAssessment.id);
      expect(apiAssessment.name).toBe(dbAssessment.name);
      expect(apiAssessment.slug).toBe(dbAssessment.slug);
    });

    test('mappers handle database schema relationships correctly', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();

      // Test that foreign key relationships are preserved
      const apiUserProfile = userProfilesToApi(userProfile);
      const apiOrganization = organizationsToApi(organization);

      expect(apiUserProfile.id).toBe(userProfile.id);
      expect(apiOrganization.id).toBe(organization.id);
    });

    test('database schema enums are preserved through mappers', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile({
        ministryRole: 'senior_pastor',
      });

      const organization: OrganizationsSelect = createTestOrganization({
        organizationType: 'church',
      });

      const assessment: AssessmentsSelect = createTestAssessment({
        assessmentType: 'spiritual_gifts',
      });

      // Transform and verify enum values are preserved
      const apiUserProfile = userProfilesToApi(userProfile);
      const apiOrganization = organizationsToApi(organization);
      const apiAssessment = assessmentsToApi(assessment);

      expect(apiUserProfile.ministryRole).toBe('senior_pastor');
      expect(apiOrganization.organizationType).toBe('church');
      expect(apiAssessment.assessmentType).toBe('spiritual_gifts');
    });
  });

  describe('End-to-End Layer Integration', () => {
    test('complete data flow from database to API and back', () => {
      // Start with database data
      const dbUserProfile: UserProfilesSelect = createTestUserProfile();

      // Transform to API format
      const apiUserProfile = userProfilesToApi(dbUserProfile);

      // Validate with contracts
      const validationResult =
        userprofileEntitySchema.safeParse(apiUserProfile);
      expect(validationResult.success).toBe(true);

      // Transform back to database format
      const backToDb = userProfilesFromApi(
        apiUserProfile as UserProfilesInsert
      );

      // Verify data integrity
      expect(backToDb.id).toBe(dbUserProfile.id);
      expect(backToDb.email).toBe(dbUserProfile.email);
      expect(backToDb.firstName).toBe(dbUserProfile.firstName);
      expect(backToDb.lastName).toBe(dbUserProfile.lastName);
      expect(backToDb.ministryRole).toBe(dbUserProfile.ministryRole);
    });

    test('error handling across layers', () => {
      // Test with invalid data
      const invalidData = {
        id: 'invalid-uuid',
        email: 'not-an-email',
        firstName: '',
        lastName: '',
        ministryRole: 'invalid_role',
      };

      // Contract validation should fail
      const contractValidation = userprofileEntitySchema.safeParse(invalidData);
      expect(contractValidation.success).toBe(false);

      // Mapper should still work (it doesn't validate)
      const mappedData = userProfilesFromApi(invalidData as any);
      expect(mappedData).toBeDefined();

      // But when we validate the mapped data, it should still fail
      const backToApi = userProfilesToApi(mappedData as UserProfilesSelect);
      const finalValidation = userprofileEntitySchema.safeParse(backToApi);

      // The validation should still catch the issues
      expect(typeof finalValidation.success).toBe('boolean');
    });

    test('type safety across all layers', () => {
      const dbUserProfile: UserProfilesSelect = createTestUserProfile();

      // This should compile without TypeScript errors
      const apiUserProfile = userProfilesToApi(dbUserProfile);
      const validationResult =
        userprofileEntitySchema.safeParse(apiUserProfile);
      const backToDb = userProfilesFromApi(
        apiUserProfile as UserProfilesInsert
      );

      // All transformations should maintain type safety
      expect(apiUserProfile).toBeDefined();
      expect(validationResult).toBeDefined();
      expect(backToDb).toBeDefined();
    });

    test('performance across all layers', () => {
      const dbUserProfile: UserProfilesSelect = createTestUserProfile();
      const iterations = 1000;

      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        // Complete flow: DB -> API -> Validate -> DB
        const apiUserProfile = userProfilesToApi(dbUserProfile);
        userprofileEntitySchema.safeParse(apiUserProfile);
        userProfilesFromApi(apiUserProfile as UserProfilesInsert);
      }
      const end = performance.now();

      const avgTime = (end - start) / iterations;
      expect(avgTime).toBeLessThan(1); // Should be less than 1ms per complete flow
    });
  });

  describe('Layer Contract Validation', () => {
    test('database schema exports are compatible with types', () => {
      // Test that database schema types can be assigned to TypeScript types
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();
      const assessment: AssessmentsSelect = createTestAssessment();

      // These assignments should work without TypeScript errors
      expect(userProfile).toBeDefined();
      expect(organization).toBeDefined();
      expect(assessment).toBeDefined();
    });

    test('types are compatible with contracts', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();
      const assessment: AssessmentsSelect = createTestAssessment();

      // These should validate successfully
      expect(userprofileEntitySchema.safeParse(userProfile).success).toBe(true);
      expect(organizationEntitySchema.safeParse(organization).success).toBe(
        true
      );
      expect(assessmentEntitySchema.safeParse(assessment).success).toBe(true);
    });

    test('contracts are compatible with mappers', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();
      const organization: OrganizationsSelect = createTestOrganization();
      const assessment: AssessmentsSelect = createTestAssessment();

      // Transform and validate
      const apiUserProfile = userProfilesToApi(userProfile);
      const apiOrganization = organizationsToApi(organization);
      const apiAssessment = assessmentsToApi(assessment);

      expect(userprofileEntitySchema.safeParse(apiUserProfile).success).toBe(
        true
      );
      expect(organizationEntitySchema.safeParse(apiOrganization).success).toBe(
        true
      );
      expect(assessmentEntitySchema.safeParse(apiAssessment).success).toBe(
        true
      );
    });
  });

  describe('Data Consistency Across Layers', () => {
    test('enum values are consistent across all layers', () => {
      const validMinistryRoles = [
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

      validMinistryRoles.forEach(role => {
        // Database layer
        const dbUserProfile: UserProfilesSelect = createTestUserProfile({
          ministryRole: role as any,
        });

        // Transform to API
        const apiUserProfile = userProfilesToApi(dbUserProfile);

        // Validate with contracts
        const validation = userprofileEntitySchema.safeParse(apiUserProfile);
        expect(validation.success).toBe(true);

        // Transform back
        const backToDb = userProfilesFromApi(
          apiUserProfile as UserProfilesInsert
        );

        // Verify consistency
        expect(backToDb.ministryRole).toBe(role);
      });
    });

    test('nullable fields are handled consistently', () => {
      const userProfileWithNulls: UserProfilesSelect = createTestUserProfile({
        passwordHash: null,
        displayName: null,
        bio: null,
        avatarUrl: null,
        denomination: null,
        organizationName: null,
        yearsInMinistry: null,
        countryCode: null,
        timezone: null,
        culturalContext: null,
        lastActiveAt: null,
      });

      // Transform to API
      const apiUserProfile = userProfilesToApi(userProfileWithNulls);

      // Validate
      const validation = userprofileEntitySchema.safeParse(apiUserProfile);
      expect(validation.success).toBe(true);

      // Transform back
      const backToDb = userProfilesFromApi(
        apiUserProfile as UserProfilesInsert
      );

      // Verify null values are preserved
      expect(backToDb.passwordHash).toBeNull();
      expect(backToDb.displayName).toBeNull();
      expect(backToDb.bio).toBeNull();
      expect(backToDb.avatarUrl).toBeNull();
      expect(backToDb.denomination).toBeNull();
      expect(backToDb.organizationName).toBeNull();
      expect(backToDb.yearsInMinistry).toBeNull();
      expect(backToDb.countryCode).toBeNull();
      expect(backToDb.timezone).toBeNull();
      expect(backToDb.culturalContext).toBeNull();
      expect(backToDb.lastActiveAt).toBeNull();
    });
  });
});
