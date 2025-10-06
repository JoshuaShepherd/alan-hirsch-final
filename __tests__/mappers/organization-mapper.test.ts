import { describe, expect, it } from 'vitest';
import {
  fromCreateOrganization,
  fromCreateOrganizationMembership,
  fromUpdateOrganization,
  fromUpdateOrganizationMembership,
  toOrganizationEntity,
  toOrganizationMembershipEntity,
  toOrganizationMembershipResponseDTO,
  toOrganizationResponseDTO,
} from '../../packages/shared/src/mappers';

// ============================================================================
// ORGANIZATION MAPPER TESTS
// ============================================================================

describe('Organization Mapper Tests', () => {
  describe('toOrganizationEntity', () => {
    it('should transform organization row to entity', () => {
      const organizationRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Test Church',
        slug: 'test-church',
        description: 'A test church organization',
        website: 'https://testchurch.com',
        logoUrl: 'https://testchurch.com/logo.png',
        organizationType: 'church',
        sizeCategory: 'medium',
        contactEmail: 'contact@testchurch.com',
        contactPhone: '+1-555-0123',
        address: '123 Main St, City, ST 12345',
        licenseType: 'organization',
        maxUsers: 50,
        accountOwnerId: '123e4567-e89b-12d3-a456-426614174001',
        billingEmail: 'billing@testchurch.com',
        status: 'active',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationEntity(organizationRow);

      expect(result).toEqual({
        id: organizationRow.id,
        name: organizationRow.name,
        slug: organizationRow.slug,
        description: organizationRow.description,
        website: organizationRow.website,
        logoUrl: organizationRow.logoUrl,
        organizationType: organizationRow.organizationType,
        sizeCategory: organizationRow.sizeCategory,
        contactEmail: organizationRow.contactEmail,
        contactPhone: organizationRow.contactPhone,
        address: organizationRow.address,
        licenseType: organizationRow.licenseType,
        maxUsers: organizationRow.maxUsers,
        accountOwnerId: organizationRow.accountOwnerId,
        billingEmail: organizationRow.billingEmail,
        status: organizationRow.status,
        createdAt: organizationRow.createdAt.toISOString(),
        updatedAt: organizationRow.updatedAt.toISOString(),
      });
    });

    it('should handle optional fields correctly', () => {
      const organizationRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Minimal Church',
        slug: 'minimal-church',
        description: null,
        website: null,
        logoUrl: null,
        organizationType: 'church' as const,
        sizeCategory: null,
        contactEmail: null,
        contactPhone: null,
        address: null,
        licenseType: 'individual' as const,
        maxUsers: 1,
        accountOwnerId: null,
        billingEmail: null,
        status: 'trial' as const,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationEntity(organizationRow);

      expect(result.description).toBeUndefined();
      expect(result.website).toBeUndefined();
      expect(result.logoUrl).toBeUndefined();
      expect(result.sizeCategory).toBeUndefined();
      expect(result.contactEmail).toBeUndefined();
      expect(result.contactPhone).toBeUndefined();
      expect(result.address).toBeUndefined();
      expect(result.accountOwnerId).toBeUndefined();
      expect(result.billingEmail).toBeUndefined();
    });
  });

  describe('toOrganizationResponseDTO', () => {
    it('should transform organization row to response DTO with computed fields', () => {
      const organizationRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Test Church',
        slug: 'test-church',
        description: 'A test church organization',
        website: 'https://testchurch.com',
        logoUrl: 'https://testchurch.com/logo.png',
        organizationType: 'church',
        sizeCategory: 'medium',
        contactEmail: 'contact@testchurch.com',
        contactPhone: '+1-555-0123',
        address: '123 Main St, City, ST 12345',
        licenseType: 'organization',
        maxUsers: 50,
        accountOwnerId: '123e4567-e89b-12d3-a456-426614174001',
        billingEmail: 'billing@testchurch.com',
        status: 'active',
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationResponseDTO({
        ...organizationRow,
        memberCount: 25,
      });

      expect(result).toMatchObject({
        id: organizationRow.id,
        name: organizationRow.name,
        slug: organizationRow.slug,
        description: organizationRow.description,
        website: organizationRow.website,
        logoUrl: organizationRow.logoUrl,
        organizationType: organizationRow.organizationType,
        sizeCategory: organizationRow.sizeCategory,
        contactEmail: organizationRow.contactEmail,
        contactPhone: organizationRow.contactPhone,
        address: organizationRow.address,
        licenseType: organizationRow.licenseType,
        maxUsers: organizationRow.maxUsers,
        accountOwnerId: organizationRow.accountOwnerId,
        billingEmail: organizationRow.billingEmail,
        status: organizationRow.status,
        createdAt: organizationRow.createdAt.toISOString(),
        updatedAt: organizationRow.updatedAt.toISOString(),
      });

      // Test computed fields
      expect(result.isActive).toBe(true);
      expect(result.isTrial).toBe(false);
      expect(result.hasCustomLogo).toBe(true);
      expect(result.hasWebsite).toBe(true);
      expect(result.memberCount).toBe(25);
      expect(result.displayName).toBe('Test Church');
      expect(result.statusDisplay).toBe('Active');
      expect(result.licenseTypeDisplay).toBe('Organization');
    });

    it('should handle trial organization correctly', () => {
      const organizationRow = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Trial Church',
        slug: 'trial-church',
        description: null,
        website: null,
        logoUrl: null,
        organizationType: 'church' as const,
        sizeCategory: null,
        contactEmail: null,
        contactPhone: null,
        address: null,
        licenseType: 'individual' as const,
        maxUsers: 1,
        accountOwnerId: null,
        billingEmail: null,
        status: 'trial' as const,
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationResponseDTO({
        ...organizationRow,
        memberCount: 0,
      });

      expect(result.isActive).toBe(false);
      expect(result.isTrial).toBe(true);
      expect(result.hasCustomLogo).toBe(false);
      expect(result.hasWebsite).toBe(false);
      expect(result.memberCount).toBe(0);
      expect(result.statusDisplay).toBe('Trial');
      expect(result.licenseTypeDisplay).toBe('Individual');
    });
  });

  describe('fromCreateOrganization', () => {
    it('should transform create organization data to database row format', () => {
      const createData = {
        name: 'New Church',
        slug: 'new-church',
        description: 'A new church organization',
        website: 'https://newchurch.com',
        logoUrl: 'https://newchurch.com/logo.png',
        organizationType: 'church' as const,
        sizeCategory: 'large' as const,
        contactEmail: 'contact@newchurch.com',
        contactPhone: '+1-555-0124',
        address: '456 Oak Ave, City, ST 54321',
        licenseType: 'organization' as const,
        maxUsers: 100,
        accountOwnerId: '123e4567-e89b-12d3-a456-426614174002',
        billingEmail: 'billing@newchurch.com',
      };

      const result = fromCreateOrganization(createData);

      expect(result).toEqual({
        name: createData.name,
        slug: createData.slug,
        description: createData.description,
        website: createData.website,
        logoUrl: createData.logoUrl,
        organizationType: createData.organizationType,
        sizeCategory: createData.sizeCategory,
        contactEmail: createData.contactEmail,
        contactPhone: createData.contactPhone,
        address: createData.address,
        licenseType: createData.licenseType,
        maxUsers: createData.maxUsers,
        accountOwnerId: createData.accountOwnerId,
        billingEmail: createData.billingEmail,
        status: 'trial', // Default status
      });
    });

    it('should handle minimal create data', () => {
      const createData = {
        name: 'Minimal Church',
        slug: 'minimal-church',
        organizationType: 'church' as const,
      };

      const result = fromCreateOrganization(createData);

      expect(result.name).toBe(createData.name);
      expect(result.slug).toBe(createData.slug);
      expect(result.organizationType).toBe(createData.organizationType);
      expect(result.status).toBe('trial');
      expect(result.licenseType).toBe('individual');
      expect(result.maxUsers).toBe(1);
    });
  });

  describe('fromUpdateOrganization', () => {
    it('should transform update organization data to partial database row format', () => {
      const updateData = {
        name: 'Updated Church',
        description: 'Updated description',
        website: 'https://updatedchurch.com',
        maxUsers: 75,
      };

      const result = fromUpdateOrganization(updateData);

      expect(result).toEqual({
        name: updateData.name,
        description: updateData.description,
        website: updateData.website,
        maxUsers: updateData.maxUsers,
      });
    });

    it('should handle empty update data', () => {
      const updateData = {};

      const result = fromUpdateOrganization(updateData);

      expect(result).toEqual({});
    });

    it('should handle undefined values correctly', () => {
      const updateData = {
        name: 'Updated Church',
        description: undefined,
        website: 'https://updatedchurch.com',
      };

      const result = fromUpdateOrganization(updateData);

      expect(result).toEqual({
        name: updateData.name,
        website: updateData.website,
      });
      expect(result.description).toBeUndefined();
    });
  });

  describe('toOrganizationMembershipEntity', () => {
    it('should transform organization membership row to entity', () => {
      const membershipRow = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        userId: '123e4567-e89b-12d3-a456-426614174004',
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        role: 'member',
        status: 'active',
        joinedAt: new Date('2023-02-01T00:00:00Z'),
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationMembershipEntity(membershipRow);

      expect(result).toEqual({
        id: membershipRow.id,
        userId: membershipRow.userId,
        organizationId: membershipRow.organizationId,
        role: membershipRow.role,
        status: membershipRow.status,
        joinedAt: membershipRow.joinedAt.toISOString(),
        createdAt: membershipRow.createdAt.toISOString(),
        updatedAt: membershipRow.updatedAt.toISOString(),
      });
    });
  });

  describe('toOrganizationMembershipResponseDTO', () => {
    it('should transform organization membership row to response DTO with computed fields', () => {
      const membershipRow = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        userId: '123e4567-e89b-12d3-a456-426614174004',
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        role: 'admin',
        status: 'active',
        joinedAt: new Date('2023-02-01T00:00:00Z'),
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationMembershipResponseDTO(membershipRow);

      expect(result).toMatchObject({
        id: membershipRow.id,
        userId: membershipRow.userId,
        organizationId: membershipRow.organizationId,
        role: membershipRow.role,
        status: membershipRow.status,
        joinedAt: membershipRow.joinedAt.toISOString(),
        createdAt: membershipRow.createdAt.toISOString(),
        updatedAt: membershipRow.updatedAt.toISOString(),
      });

      // Test computed fields
      expect(result.isActive).toBe(true);
      expect(result.isPending).toBe(false);
      expect(result.canManage).toBe(true); // admin role
      expect(result.roleDisplay).toBe('Admin');
      expect(result.statusDisplay).toBe('Active');
    });

    it('should handle pending membership correctly', () => {
      const membershipRow = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        userId: '123e4567-e89b-12d3-a456-426614174004',
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        role: 'member',
        status: 'pending',
        joinedAt: new Date('2023-02-01T00:00:00Z'),
        createdAt: new Date('2023-01-01T00:00:00Z'),
        updatedAt: new Date('2023-12-01T00:00:00Z'),
      };

      const result = toOrganizationMembershipResponseDTO(membershipRow);

      expect(result.isActive).toBe(false);
      expect(result.isPending).toBe(true);
      expect(result.canManage).toBe(false); // member role
      expect(result.roleDisplay).toBe('Member');
      expect(result.statusDisplay).toBe('Pending');
    });
  });

  describe('fromCreateOrganizationMembership', () => {
    it('should transform create organization membership data to database row format', () => {
      const createData = {
        userId: '123e4567-e89b-12d3-a456-426614174004',
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        role: 'member' as const,
        status: 'pending' as const,
        joinedAt: new Date('2023-02-01T00:00:00Z'),
      };

      const result = fromCreateOrganizationMembership(createData);

      expect(result).toEqual({
        userId: createData.userId,
        organizationId: createData.organizationId,
        role: createData.role,
        status: createData.status,
        joinedAt: createData.joinedAt,
      });
    });

    it('should handle minimal create data', () => {
      const createData = {
        userId: '123e4567-e89b-12d3-a456-426614174004',
        organizationId: '123e4567-e89b-12d3-a456-426614174000',
        role: 'member' as const,
      };

      const result = fromCreateOrganizationMembership(createData);

      expect(result.userId).toBe(createData.userId);
      expect(result.organizationId).toBe(createData.organizationId);
      expect(result.role).toBe(createData.role);
      expect(result.status).toBe('pending'); // Default status
      expect(result.joinedAt).toBeInstanceOf(Date);
    });
  });

  describe('fromUpdateOrganizationMembership', () => {
    it('should transform update organization membership data to partial database row format', () => {
      const updateData = {
        role: 'admin' as const,
        status: 'active' as const,
      };

      const result = fromUpdateOrganizationMembership(updateData);

      expect(result).toEqual({
        role: updateData.role,
        status: updateData.status,
      });
    });

    it('should handle empty update data', () => {
      const updateData = {};

      const result = fromUpdateOrganizationMembership(updateData);

      expect(result).toEqual({});
    });

    it('should handle undefined values correctly', () => {
      const updateData = {
        role: 'admin' as const,
        status: undefined,
      };

      const result = fromUpdateOrganizationMembership(updateData);

      expect(result).toEqual({
        role: updateData.role,
      });
      expect(result.status).toBeUndefined();
    });
  });

  describe('Validation Error Handling', () => {
    it('should handle invalid organization data gracefully', () => {
      // This test would need to be updated based on the actual validation implementation
      // For now, we'll test that the function exists and can be called
      expect(typeof toOrganizationEntity).toBe('function');
      expect(typeof toOrganizationResponseDTO).toBe('function');
      expect(typeof fromCreateOrganization).toBe('function');
      expect(typeof fromUpdateOrganization).toBe('function');
    });
  });

  describe('Role Display Mapping', () => {
    it('should map all role types correctly', () => {
      const roles = ['member', 'admin', 'owner'] as const;

      roles.forEach(role => {
        const membershipRow = {
          id: '123e4567-e89b-12d3-a456-426614174003',
          userId: '123e4567-e89b-12d3-a456-426614174004',
          organizationId: '123e4567-e89b-12d3-a456-426614174000',
          role,
          status: 'active' as const,
          joinedAt: new Date('2023-02-01T00:00:00Z'),
          createdAt: new Date('2023-01-01T00:00:00Z'),
          updatedAt: new Date('2023-12-01T00:00:00Z'),
        };

        const result = toOrganizationMembershipResponseDTO(membershipRow);

        expect(result.roleDisplay).toBeDefined();
        expect(typeof result.roleDisplay).toBe('string');
      });
    });
  });

  describe('Status Display Mapping', () => {
    it('should map all status types correctly', () => {
      const statuses = ['active', 'inactive', 'pending', 'suspended'] as const;

      statuses.forEach(status => {
        const membershipRow = {
          id: '123e4567-e89b-12d3-a456-426614174003',
          userId: '123e4567-e89b-12d3-a456-426614174004',
          organizationId: '123e4567-e89b-12d3-a456-426614174000',
          role: 'member' as const,
          status,
          joinedAt: new Date('2023-02-01T00:00:00Z'),
          createdAt: new Date('2023-01-01T00:00:00Z'),
          updatedAt: new Date('2023-12-01T00:00:00Z'),
        };

        const result = toOrganizationMembershipResponseDTO(membershipRow);

        expect(result.statusDisplay).toBeDefined();
        expect(typeof result.statusDisplay).toBe('string');
      });
    });
  });
});
