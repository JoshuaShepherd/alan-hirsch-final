/**
 * Surface Contract Tests
 *
 * These tests ensure that the surface contracts between packages remain stable
 * and prevent accidental breaking changes that could affect dependent packages.
 *
 * This is a critical gate test that should run before any major changes
 * to ensure the platform's API surface remains consistent.
 */

import { describe, expect, it } from 'vitest';

describe('Surface Contract Tests', () => {
  describe('@platform/contracts exports', () => {
    it('should export all required DTO aliases', async () => {
      const contracts = await import('@platform/contracts');

      // User DTOs
      expect(contracts.UserCreateDTO).toBeDefined();
      expect(contracts.UserUpdateDTO).toBeDefined();
      expect(contracts.UserResponseDTO).toBeDefined();
      expect(contracts.UserListResponseDTO).toBeDefined();

      // Organization DTOs
      expect(contracts.OrganizationCreateDTO).toBeDefined();
      expect(contracts.OrganizationUpdateDTO).toBeDefined();
      expect(contracts.OrganizationResponseDTO).toBeDefined();
      expect(contracts.OrganizationListResponseDTO).toBeDefined();

      // Assessment DTOs
      expect(contracts.AssessmentCreateDTO).toBeDefined();
      expect(contracts.AssessmentUpdateDTO).toBeDefined();
      expect(contracts.AssessmentResponseDTO).toBeDefined();
      expect(contracts.AssessmentListResponseDTO).toBeDefined();

      // Content DTOs
      expect(contracts.ContentItemCreateDTO).toBeDefined();
      expect(contracts.ContentItemUpdateDTO).toBeDefined();
      expect(contracts.ContentItemResponseDTO).toBeDefined();
      expect(contracts.ContentItemListResponseDTO).toBeDefined();

      // Additional validation schemas
      expect(contracts.crossEntityValidationSchema).toBeDefined();
      expect(contracts.ministryPlatformErrorSchema).toBeDefined();
      expect(contracts.roleBasedValidationSchema).toBeDefined();
      expect(contracts.ministryPaginatedResponseSchema).toBeDefined();
      expect(contracts.ministryPlatformResponseSchema).toBeDefined();
      expect(contracts.organizationScopedRequestSchema).toBeDefined();
    });
  });

  describe('@platform/database exports', () => {
    it('should export all required database components', async () => {
      const database = await import('@platform/database');

      // Context types
      expect(database.Ctx).toBeDefined();
      expect(database.ExtendedCtx).toBeDefined();
      expect(database.SystemCtx).toBeDefined();

      // Tables export
      expect(database.tables).toBeDefined();

      // Schema exports
      expect(database.userProfiles).toBeDefined();
      expect(database.organizations).toBeDefined();
      expect(database.assessments).toBeDefined();
      expect(database.contentItems).toBeDefined();

      // Query functions
      expect(database.getUserProfileById).toBeDefined();
      expect(database.getOrganizationById).toBeDefined();
      expect(database.getAssessmentById).toBeDefined();
      expect(database.getContentById).toBeDefined();
    });
  });

  describe('@platform/shared exports', () => {
    it('should export all required service components', async () => {
      const shared = await import('@platform/shared');

      // Services
      expect(shared.UserService).toBeDefined();
      expect(shared.OrganizationService).toBeDefined();
      expect(shared.AssessmentService).toBeDefined();
      expect(shared.ContentService).toBeDefined();
      expect(shared.BaseService).toBeDefined();

      // Mappers
      expect(shared.fromCreateUserProfileDTO).toBeDefined();
      expect(shared.fromUpdateUserProfileDTO).toBeDefined();
      expect(shared.toUserProfileDTO).toBeDefined();

      expect(shared.fromCreateOrganizationDTO).toBeDefined();
      expect(shared.fromUpdateOrganizationDTO).toBeDefined();
      expect(shared.toOrganizationDTO).toBeDefined();

      expect(shared.fromCreateAssessmentDTO).toBeDefined();
      expect(shared.fromUpdateAssessmentDTO).toBeDefined();
      expect(shared.toAssessmentDTO).toBeDefined();

      expect(shared.fromCreateContentItemDTO).toBeDefined();
      expect(shared.fromUpdateContentItemDTO).toBeDefined();
      expect(shared.toContentItemDTO).toBeDefined();
    });
  });

  describe('Query wrapper consistency', () => {
    it('should have consistent wrapper functions across query modules', async () => {
      const userQueries = await import(
        '@platform/database/db/queries/user.queries'
      );
      const orgQueries = await import(
        '@platform/database/db/queries/organization.queries'
      );
      const assessmentQueries = await import(
        '@platform/database/db/queries/assessment.queries'
      );
      const contentQueries = await import(
        '@platform/database/db/queries/content.queries'
      );

      // All query modules should export the same wrapper function names
      const expectedWrappers = [
        'getById',
        'list',
        'create',
        'update',
        'remove',
      ];

      for (const wrapper of expectedWrappers) {
        expect(userQueries[wrapper]).toBeDefined();
        expect(orgQueries[wrapper]).toBeDefined();
        expect(assessmentQueries[wrapper]).toBeDefined();
        expect(contentQueries[wrapper]).toBeDefined();
      }
    });
  });

  describe('Mapper function consistency', () => {
    it('should have consistent mapper function names across all mappers', async () => {
      const userMappers = await import(
        '@platform/shared/mappers/user-profiles.mapper'
      );
      const orgMappers = await import(
        '@platform/shared/mappers/organizations.mapper'
      );
      const assessmentMappers = await import(
        '@platform/shared/mappers/assessments.mapper'
      );
      const contentMappers = await import(
        '@platform/shared/mappers/contentitems.mapper'
      );

      // All mappers should export the same function pattern
      const expectedMappers = [
        'fromCreateUserProfileDTO',
        'fromUpdateUserProfileDTO',
        'toUserProfileDTO',
      ];

      for (const mapper of expectedMappers) {
        expect(userMappers[mapper]).toBeDefined();
      }

      // Check organization mappers
      expect(orgMappers.fromCreateOrganizationDTO).toBeDefined();
      expect(orgMappers.fromUpdateOrganizationDTO).toBeDefined();
      expect(orgMappers.toOrganizationDTO).toBeDefined();

      // Check assessment mappers
      expect(assessmentMappers.fromCreateAssessmentDTO).toBeDefined();
      expect(assessmentMappers.fromUpdateAssessmentDTO).toBeDefined();
      expect(assessmentMappers.toAssessmentDTO).toBeDefined();

      // Check content mappers
      expect(contentMappers.fromCreateContentItemDTO).toBeDefined();
      expect(contentMappers.fromUpdateContentItemDTO).toBeDefined();
      expect(contentMappers.toContentItemDTO).toBeDefined();
    });
  });

  describe('Service method consistency', () => {
    it('should have consistent service methods across all services', async () => {
      const userService = await import(
        '@platform/shared/services/user.service'
      );
      const orgService = await import(
        '@platform/shared/services/organization.service'
      );
      const assessmentService = await import(
        '@platform/shared/services/assessment.service'
      );
      const contentService = await import(
        '@platform/shared/services/content.service'
      );

      // All services should extend BaseService and have the same interface
      const services = [
        userService.UserService,
        orgService.OrganizationService,
        assessmentService.AssessmentService,
        contentService.ContentService,
      ];

      for (const ServiceClass of services) {
        expect(ServiceClass).toBeDefined();

        // Check that all services have the required methods
        const instance = new ServiceClass();
        expect(typeof instance.get).toBe('function');
        expect(typeof instance.list).toBe('function');
        expect(typeof instance.create).toBe('function');
        expect(typeof instance.update).toBe('function');
        expect(typeof instance.remove).toBe('function');
      }
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety across package boundaries', async () => {
      const contracts = await import('@platform/contracts');
      const database = await import('@platform/database');
      const shared = await import('@platform/shared');

      // Verify that types are properly exported and accessible
      expect(contracts.UserCreateDTO).toBeDefined();
      expect(contracts.UserUpdateDTO).toBeDefined();
      expect(contracts.UserResponseDTO).toBeDefined();

      expect(database.Ctx).toBeDefined();
      expect(database.userProfiles).toBeDefined();

      expect(shared.UserService).toBeDefined();
      expect(shared.fromCreateUserProfileDTO).toBeDefined();
      expect(shared.toUserProfileDTO).toBeDefined();
    });
  });
});




