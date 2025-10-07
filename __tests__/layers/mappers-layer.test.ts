// Mappers Layer Tests
// Tests the data transformation functions between database and API formats

import {
  assessmentsFromApi,
  assessmentsFromUpdate,
  assessmentsToApi,
  organizationsFromApi,
  organizationsFromUpdate,
  organizationsToApi,
  userProfilesFromApi,
  userProfilesFromUpdate,
  userProfilesToApi,
} from '@platform/shared/mappers';
import type {
  AssessmentsInsert,
  AssessmentsSelect,
  AssessmentsUpdate,
  OrganizationsInsert,
  OrganizationsSelect,
  OrganizationsUpdate,
  UserProfilesInsert,
  UserProfilesSelect,
  UserProfilesUpdate,
} from '@platform/types';
import { describe, expect, test } from 'vitest';
import {
  createTestAssessment,
  createTestOrganization,
  createTestUserProfile,
  testTypeCompatibility,
} from './test-setup';

describe('Mappers Layer', () => {
  describe('UserProfile Mappers', () => {
    test('userProfilesToApi transforms database to API format correctly', () => {
      const dbData: UserProfilesSelect = createTestUserProfile();

      const apiData = userProfilesToApi(dbData);

      // Verify all fields are mapped correctly
      expect(apiData.id).toBe(dbData.id);
      expect(apiData.email).toBe(dbData.email);
      expect(apiData.passwordHash).toBe(dbData.passwordHash);
      expect(apiData.firstName).toBe(dbData.firstName);
      expect(apiData.lastName).toBe(dbData.lastName);
      expect(apiData.displayName).toBe(dbData.displayName);
      expect(apiData.bio).toBe(dbData.bio);
      expect(apiData.avatarUrl).toBe(dbData.avatarUrl);
      expect(apiData.ministryRole).toBe(dbData.ministryRole);
      expect(apiData.denomination).toBe(dbData.denomination);
      expect(apiData.organizationName).toBe(dbData.organizationName);
      expect(apiData.yearsInMinistry).toBe(dbData.yearsInMinistry);
      expect(apiData.countryCode).toBe(dbData.countryCode);
      expect(apiData.timezone).toBe(dbData.timezone);
      expect(apiData.languagePrimary).toBe(dbData.languagePrimary);
      expect(apiData.culturalContext).toBe(dbData.culturalContext);
      expect(apiData.subscriptionTier).toBe(dbData.subscriptionTier);
      expect(apiData.accountStatus).toBe(dbData.accountStatus);
      expect(apiData.lastActiveAt).toBe(dbData.lastActiveAt);
      expect(apiData.createdAt).toBe(dbData.createdAt);
      expect(apiData.updatedAt).toBe(dbData.updatedAt);
    });

    test('userProfilesFromApi transforms API to database format correctly', () => {
      const apiData: UserProfilesInsert = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
        denomination: 'Baptist',
        organizationName: 'Test Church',
        yearsInMinistry: 10,
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',
        subscriptionTier: 'free',
        accountStatus: 'active',
      };

      const dbData = userProfilesFromApi(apiData);

      // Verify all fields are mapped correctly
      expect(dbData.id).toBe(apiData.id);
      expect(dbData.email).toBe(apiData.email);
      expect(dbData.firstName).toBe(apiData.firstName);
      expect(dbData.lastName).toBe(apiData.lastName);
      expect(dbData.ministryRole).toBe(apiData.ministryRole);
      expect(dbData.denomination).toBe(apiData.denomination);
      expect(dbData.organizationName).toBe(apiData.organizationName);
      expect(dbData.yearsInMinistry).toBe(apiData.yearsInMinistry);
      expect(dbData.countryCode).toBe(apiData.countryCode);
      expect(dbData.timezone).toBe(apiData.timezone);
      expect(dbData.languagePrimary).toBe(apiData.languagePrimary);
      expect(dbData.culturalContext).toBe(apiData.culturalContext);
      expect(dbData.subscriptionTier).toBe(apiData.subscriptionTier);
      expect(dbData.accountStatus).toBe(apiData.accountStatus);
    });

    test('userProfilesFromUpdate transforms update data correctly', () => {
      const updateData: UserProfilesUpdate = {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        ministryRole: 'associate_pastor',
      };

      const dbUpdateData = userProfilesFromUpdate(updateData);

      // Verify only provided fields are mapped
      expect(dbUpdateData.firstName).toBe(updateData.firstName);
      expect(dbUpdateData.lastName).toBe(updateData.lastName);
      expect(dbUpdateData.email).toBe(updateData.email);
      expect(dbUpdateData.ministryRole).toBe(updateData.ministryRole);

      // Verify undefined fields are not included
      expect(dbUpdateData.id).toBeUndefined();
      expect(dbUpdateData.passwordHash).toBeUndefined();
      expect(dbUpdateData.displayName).toBeUndefined();
      expect(dbUpdateData.bio).toBeUndefined();
    });

    test('round-trip mapping preserves data integrity', () => {
      const originalData: UserProfilesSelect = createTestUserProfile();

      // Database -> API -> Database
      const apiData = userProfilesToApi(originalData);
      const backToDb = userProfilesFromApi(apiData as UserProfilesInsert);

      // Verify data integrity
      expect(backToDb.id).toBe(originalData.id);
      expect(backToDb.email).toBe(originalData.email);
      expect(backToDb.firstName).toBe(originalData.firstName);
      expect(backToDb.lastName).toBe(originalData.lastName);
      expect(backToDb.ministryRole).toBe(originalData.ministryRole);
      expect(backToDb.denomination).toBe(originalData.denomination);
      expect(backToDb.organizationName).toBe(originalData.organizationName);
      expect(backToDb.yearsInMinistry).toBe(originalData.yearsInMinistry);
      expect(backToDb.countryCode).toBe(originalData.countryCode);
      expect(backToDb.timezone).toBe(originalData.timezone);
      expect(backToDb.languagePrimary).toBe(originalData.languagePrimary);
      expect(backToDb.culturalContext).toBe(originalData.culturalContext);
      expect(backToDb.subscriptionTier).toBe(originalData.subscriptionTier);
      expect(backToDb.accountStatus).toBe(originalData.accountStatus);
    });

    test('handles null and undefined values correctly', () => {
      const dataWithNulls: UserProfilesSelect = createTestUserProfile({
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

      const apiData = userProfilesToApi(dataWithNulls);
      expect(apiData.passwordHash).toBeNull();
      expect(apiData.displayName).toBeNull();
      expect(apiData.bio).toBeNull();
      expect(apiData.avatarUrl).toBeNull();
      expect(apiData.denomination).toBeNull();
      expect(apiData.organizationName).toBeNull();
      expect(apiData.yearsInMinistry).toBeNull();
      expect(apiData.countryCode).toBeNull();
      expect(apiData.timezone).toBeNull();
      expect(apiData.culturalContext).toBeNull();
      expect(apiData.lastActiveAt).toBeNull();
    });

    test('type compatibility between layers', () => {
      const dbData: UserProfilesSelect = createTestUserProfile();

      const apiData = testTypeCompatibility(
        dbData,
        {} as UserProfilesSelect,
        userProfilesToApi
      );

      expect(apiData).toBeDefined();
      expect(typeof apiData).toBe('object');
    });
  });

  describe('Organization Mappers', () => {
    test('organizationsToApi transforms database to API format correctly', () => {
      const dbData: OrganizationsSelect = createTestOrganization();

      const apiData = organizationsToApi(dbData);

      // Verify all fields are mapped correctly
      expect(apiData.id).toBe(dbData.id);
      expect(apiData.name).toBe(dbData.name);
      expect(apiData.slug).toBe(dbData.slug);
      expect(apiData.description).toBe(dbData.description);
      expect(apiData.website).toBe(dbData.website);
      expect(apiData.logoUrl).toBe(dbData.logoUrl);
      expect(apiData.organizationType).toBe(dbData.organizationType);
      expect(apiData.countryCode).toBe(dbData.countryCode);
      expect(apiData.timezone).toBe(dbData.timezone);
      expect(apiData.languagePrimary).toBe(dbData.languagePrimary);
      expect(apiData.culturalContext).toBe(dbData.culturalContext);
      expect(apiData.isActive).toBe(dbData.isActive);
      expect(apiData.createdAt).toBe(dbData.createdAt);
      expect(apiData.updatedAt).toBe(dbData.updatedAt);
    });

    test('organizationsFromApi transforms API to database format correctly', () => {
      const apiData: OrganizationsInsert = {
        id: 'org-123',
        name: 'Test Organization',
        slug: 'test-org',
        organizationType: 'church',
        description: 'A test organization',
        website: 'https://test.org',
        logoUrl: 'https://test.org/logo.png',
        countryCode: 'US',
        timezone: 'America/New_York',
        languagePrimary: 'en',
        culturalContext: 'western',
        isActive: true,
      };

      const dbData = organizationsFromApi(apiData);

      // Verify all fields are mapped correctly
      expect(dbData.id).toBe(apiData.id);
      expect(dbData.name).toBe(apiData.name);
      expect(dbData.slug).toBe(apiData.slug);
      expect(dbData.organizationType).toBe(apiData.organizationType);
      expect(dbData.description).toBe(apiData.description);
      expect(dbData.website).toBe(apiData.website);
      expect(dbData.logoUrl).toBe(apiData.logoUrl);
      expect(dbData.countryCode).toBe(apiData.countryCode);
      expect(dbData.timezone).toBe(apiData.timezone);
      expect(dbData.languagePrimary).toBe(apiData.languagePrimary);
      expect(dbData.culturalContext).toBe(apiData.culturalContext);
      expect(dbData.isActive).toBe(apiData.isActive);
    });

    test('organizationsFromUpdate transforms update data correctly', () => {
      const updateData: OrganizationsUpdate = {
        name: 'Updated Organization',
        description: 'Updated description',
        website: 'https://updated.org',
      };

      const dbUpdateData = organizationsFromUpdate(updateData);

      // Verify only provided fields are mapped
      expect(dbUpdateData.name).toBe(updateData.name);
      expect(dbUpdateData.description).toBe(updateData.description);
      expect(dbUpdateData.website).toBe(updateData.website);

      // Verify undefined fields are not included
      expect(dbUpdateData.id).toBeUndefined();
      expect(dbUpdateData.slug).toBeUndefined();
      expect(dbUpdateData.organizationType).toBeUndefined();
    });

    test('round-trip mapping preserves data integrity', () => {
      const originalData: OrganizationsSelect = createTestOrganization();

      // Database -> API -> Database
      const apiData = organizationsToApi(originalData);
      const backToDb = organizationsFromApi(apiData as OrganizationsInsert);

      // Verify data integrity
      expect(backToDb.id).toBe(originalData.id);
      expect(backToDb.name).toBe(originalData.name);
      expect(backToDb.slug).toBe(originalData.slug);
      expect(backToDb.organizationType).toBe(originalData.organizationType);
      expect(backToDb.description).toBe(originalData.description);
      expect(backToDb.website).toBe(originalData.website);
      expect(backToDb.logoUrl).toBe(originalData.logoUrl);
      expect(backToDb.countryCode).toBe(originalData.countryCode);
      expect(backToDb.timezone).toBe(originalData.timezone);
      expect(backToDb.languagePrimary).toBe(originalData.languagePrimary);
      expect(backToDb.culturalContext).toBe(originalData.culturalContext);
      expect(backToDb.isActive).toBe(originalData.isActive);
    });
  });

  describe('Assessment Mappers', () => {
    test('assessmentsToApi transforms database to API format correctly', () => {
      const dbData: AssessmentsSelect = createTestAssessment();

      const apiData = assessmentsToApi(dbData);

      // Verify all fields are mapped correctly
      expect(apiData.id).toBe(dbData.id);
      expect(apiData.name).toBe(dbData.name);
      expect(apiData.slug).toBe(dbData.slug);
      expect(apiData.assessmentType).toBe(dbData.assessmentType);
      expect(apiData.description).toBe(dbData.description);
      expect(apiData.instructions).toBe(dbData.instructions);
      expect(apiData.status).toBe(dbData.status);
      expect(apiData.createdAt).toBe(dbData.createdAt);
      expect(apiData.updatedAt).toBe(dbData.updatedAt);
    });

    test('assessmentsFromApi transforms API to database format correctly', () => {
      const apiData: AssessmentsInsert = {
        name: 'Test Assessment',
        slug: 'test-assessment',
        assessmentType: 'spiritual_gifts',
        description: 'A test assessment',
        instructions: 'Complete this assessment',
        status: 'active',
      };

      const dbData = assessmentsFromApi(apiData);

      // Verify all fields are mapped correctly
      expect(dbData.name).toBe(apiData.name);
      expect(dbData.slug).toBe(apiData.slug);
      expect(dbData.assessmentType).toBe(apiData.assessmentType);
      expect(dbData.description).toBe(apiData.description);
      expect(dbData.instructions).toBe(apiData.instructions);
      expect(dbData.status).toBe(apiData.status);
    });

    test('assessmentsFromUpdate transforms update data correctly', () => {
      const updateData: AssessmentsUpdate = {
        name: 'Updated Assessment',
        description: 'Updated description',
        status: 'archived',
      };

      const dbUpdateData = assessmentsFromUpdate(updateData);

      // Verify only provided fields are mapped
      expect(dbUpdateData.name).toBe(updateData.name);
      expect(dbUpdateData.description).toBe(updateData.description);
      expect(dbUpdateData.status).toBe(updateData.status);

      // Verify undefined fields are not included
      expect(dbUpdateData.slug).toBeUndefined();
      expect(dbUpdateData.assessmentType).toBeUndefined();
      expect(dbUpdateData.instructions).toBeUndefined();
    });

    test('round-trip mapping preserves data integrity', () => {
      const originalData: AssessmentsSelect = createTestAssessment();

      // Database -> API -> Database
      const apiData = assessmentsToApi(originalData);
      const backToDb = assessmentsFromApi(apiData as AssessmentsInsert);

      // Verify data integrity
      expect(backToDb.name).toBe(originalData.name);
      expect(backToDb.slug).toBe(originalData.slug);
      expect(backToDb.assessmentType).toBe(originalData.assessmentType);
      expect(backToDb.description).toBe(originalData.description);
      expect(backToDb.instructions).toBe(originalData.instructions);
      expect(backToDb.status).toBe(originalData.status);
    });
  });

  describe('Edge Cases', () => {
    test('handles empty objects correctly', () => {
      const emptyUpdate: UserProfilesUpdate = {};
      const result = userProfilesFromUpdate(emptyUpdate);
      expect(result).toEqual({});
    });

    test('handles partial data correctly', () => {
      const partialData: UserProfilesInsert = {
        id: 'user-123',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        ministryRole: 'senior_pastor',
      };

      const result = userProfilesFromApi(partialData);
      expect(result.id).toBe(partialData.id);
      expect(result.email).toBe(partialData.email);
      expect(result.firstName).toBe(partialData.firstName);
      expect(result.lastName).toBe(partialData.lastName);
      expect(result.ministryRole).toBe(partialData.ministryRole);
    });

    test('preserves Date objects correctly', () => {
      const now = new Date();
      const dataWithDates: UserProfilesSelect = createTestUserProfile({
        createdAt: now,
        updatedAt: now,
        lastActiveAt: now,
      });

      const apiData = userProfilesToApi(dataWithDates);
      expect(apiData.createdAt).toBe(now);
      expect(apiData.updatedAt).toBe(now);
      expect(apiData.lastActiveAt).toBe(now);
    });

    test('handles boolean values correctly', () => {
      const dataWithBooleans: OrganizationsSelect = createTestOrganization({
        isActive: true,
      });

      const apiData = organizationsToApi(dataWithBooleans);
      expect(apiData.isActive).toBe(true);
    });

    test('handles number values correctly', () => {
      const dataWithNumbers: UserProfilesSelect = createTestUserProfile({
        yearsInMinistry: 15,
      });

      const apiData = userProfilesToApi(dataWithNumbers);
      expect(apiData.yearsInMinistry).toBe(15);
    });
  });

  describe('Performance', () => {
    test('mapping performance is acceptable', () => {
      const userProfile = createTestUserProfile();
      const iterations = 1000;

      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        userProfilesToApi(userProfile);
      }
      const end = performance.now();

      const avgTime = (end - start) / iterations;
      expect(avgTime).toBeLessThan(0.1); // Should be less than 0.1ms per mapping
    });

    test('round-trip mapping performance is acceptable', () => {
      const userProfile = createTestUserProfile();
      const iterations = 1000;

      const start = performance.now();
      for (let i = 0; i < iterations; i++) {
        const apiData = userProfilesToApi(userProfile);
        userProfilesFromApi(apiData as UserProfilesInsert);
      }
      const end = performance.now();

      const avgTime = (end - start) / iterations;
      expect(avgTime).toBeLessThan(0.2); // Should be less than 0.2ms per round-trip
    });
  });

  describe('Type Safety', () => {
    test('mappers maintain type safety', () => {
      const userProfile: UserProfilesSelect = createTestUserProfile();

      // These should compile without TypeScript errors
      const apiData = userProfilesToApi(userProfile);
      const backToDb = userProfilesFromApi(apiData as UserProfilesInsert);

      expect(apiData).toBeDefined();
      expect(backToDb).toBeDefined();
    });

    test('mappers work with partial data', () => {
      const partialUpdate: UserProfilesUpdate = {
        firstName: 'Jane',
        lastName: 'Smith',
      };

      const result = userProfilesFromUpdate(partialUpdate);
      expect(result.firstName).toBe('Jane');
      expect(result.lastName).toBe('Smith');
    });
  });

  describe('Data Integrity', () => {
    test('no data loss during transformation', () => {
      const originalData: UserProfilesSelect = createTestUserProfile();

      // Database -> API -> Database
      const apiData = userProfilesToApi(originalData);
      const backToDb = userProfilesFromApi(apiData as UserProfilesInsert);

      // Count non-null/undefined fields in original
      const originalFields = Object.entries(originalData).filter(
        ([_, value]) => value !== null && value !== undefined
      ).length;

      // Count non-null/undefined fields in transformed data
      const transformedFields = Object.entries(backToDb).filter(
        ([_, value]) => value !== null && value !== undefined
      ).length;

      // Should have the same number of non-null fields (minus timestamps which aren't in insert)
      expect(transformedFields).toBeGreaterThanOrEqual(originalFields - 2);
    });

    test('enum values are preserved correctly', () => {
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
        const userProfile = createTestUserProfile({
          ministryRole: role as any,
        });
        const apiData = userProfilesToApi(userProfile);
        const backToDb = userProfilesFromApi(apiData as UserProfilesInsert);

        expect(backToDb.ministryRole).toBe(role);
      });
    });
  });
});
