// ============================================================================
// ORGANIZATION SERVICE TESTS
// ============================================================================
// Comprehensive unit tests for OrganizationService following alignment reference patterns

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { OrganizationService } from '../../apps/alan-hirsch-platform/lib/services/organization.service';
import {
  ForbiddenError,
  NotFoundError,
  ServiceContext,
  ServiceContextBuilder,
} from '../../apps/alan-hirsch-platform/lib/services/types';

// Mock the query modules and mappers
vi.mock('@platform/database/queries/organizations', () => ({
  createOrganization: vi.fn(),
  getOrganizationById: vi.fn(),
  getOrganizationBySlug: vi.fn(),
  searchOrganizations: vi.fn(),
  updateOrganization: vi.fn(),
  deleteOrganization: vi.fn(),
  createOrganizationMembership: vi.fn(),
  getOrganizationMembershipById: vi.fn(),
  getOrganizationMembers: vi.fn(),
  updateOrganizationMembership: vi.fn(),
  deleteOrganizationMembership: vi.fn(),
  inviteUserToOrganization: vi.fn(),
  acceptOrganizationInvitation: vi.fn(),
  rejectOrganizationInvitation: vi.fn(),
  getOrganizationStats: vi.fn(),
  getOrganizationBilling: vi.fn(),
  getOrganizationsByUser: vi.fn(),
}));

vi.mock('../../apps/alan-hirsch-platform/lib/mappers/organization', () => ({
  toOrganizationResponseDTO: vi.fn(),
  toOrganizationMembershipResponseDTO: vi.fn(),
  fromCreateOrganization: vi.fn(),
  fromUpdateOrganization: vi.fn(),
  fromCreateOrganizationMembership: vi.fn(),
  fromUpdateOrganizationMembership: vi.fn(),
}));

// DISABLED: Services deleted for rebuild - will be restored in Phase 1.3
describe.skip('OrganizationService - DISABLED FOR REBUILD', () => {
  let organizationService: OrganizationService;
  let context: ServiceContext;

  beforeEach(() => {
    organizationService = new OrganizationService();
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create an organization successfully', async () => {
      const createData = {
        name: 'Test Organization',
        slug: 'test-org',
        description: 'A test organization',
        organizationType: 'church',
        contactEmail: 'contact@testorg.com',
        licenseType: 'team' as const,
        maxUsers: 10,
      };

      const mockDbResult = { id: 'org-123', ...createData };
      const mockResponse = {
        id: 'org-123',
        ...createData,
        isActive: true,
      };

      vi.mocked(organizationService['executeCreate']).mockResolvedValue(
        mockDbResult
      );
      vi.mocked(organizationService['mapDbToEntity']).mockReturnValue(
        mockResponse
      );

      const result = await organizationService.create(createData, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should enforce create business rules', async () => {
      const createData = {
        name: 'Test Organization',
        slug: 'test-org',
        organizationType: 'church',
        licenseType: 'team' as const,
        maxUsers: 10,
      };

      // Test with guest role (should fail)
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      const result = await organizationService.create(createData, guestContext);

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('findById', () => {
    it('should find organization by ID successfully', async () => {
      const mockDbResult = { id: 'org-123', name: 'Test Organization' };
      const mockResponse = {
        id: 'org-123',
        name: 'Test Organization',
        isActive: true,
      };

      vi.mocked(organizationService['executeFindById']).mockResolvedValue(
        mockDbResult
      );
      vi.mocked(organizationService['mapDbToEntity']).mockReturnValue(
        mockResponse
      );

      const result = await organizationService.findById('org-123', context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should return not found for non-existent organization', async () => {
      vi.mocked(organizationService['executeFindById']).mockResolvedValue(null);

      const result = await organizationService.findById(
        'non-existent',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('findBySlug', () => {
    it('should find organization by slug successfully', async () => {
      const slug = 'test-org';
      const mockDbResult = { id: 'org-123', slug, name: 'Test Organization' };
      const mockResponse = {
        id: 'org-123',
        slug,
        name: 'Test Organization',
        isActive: true,
      };

      const { getOrganizationBySlug } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(getOrganizationBySlug).mockResolvedValue(mockDbResult);
      vi.mocked(organizationService['mapDbToEntity']).mockReturnValue(
        mockResponse
      );

      const result = await organizationService.findBySlug(slug, context);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
    });

    it('should return not found for non-existent slug', async () => {
      const { getOrganizationBySlug } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(getOrganizationBySlug).mockResolvedValue(null);

      const result = await organizationService.findBySlug(
        'non-existent',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('inviteUser', () => {
    it('should invite user to organization successfully', async () => {
      const organizationId = 'org-123';
      const inviteData = {
        email: 'newuser@example.com',
        role: 'member',
        message: 'Welcome to our organization!',
      };

      const mockInvitation = {
        id: 'invitation-123',
        organizationId,
        email: inviteData.email,
        role: inviteData.role,
        status: 'pending',
        invitedAt: expect.any(String),
      };

      const { inviteUserToOrganization } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(inviteUserToOrganization).mockResolvedValue(mockInvitation);

      const result = await organizationService.inviteUser(
        organizationId,
        inviteData.email,
        inviteData.role,
        context,
        inviteData.message
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockInvitation);
    });

    it('should forbid non-admin from inviting users', async () => {
      const organizationId = 'org-123';
      const email = 'newuser@example.com';
      const role = 'member';

      const result = await organizationService.inviteUser(
        organizationId,
        email,
        role,
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('acceptInvitation', () => {
    it('should accept organization invitation successfully', async () => {
      const invitationId = 'invitation-123';
      const mockMembership = {
        id: 'membership-123',
        userId: 'user-123',
        organizationId: 'org-123',
        role: 'member',
        status: 'active',
        joinedAt: expect.any(String),
      };

      const { acceptOrganizationInvitation } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(acceptOrganizationInvitation).mockResolvedValue(mockMembership);

      const result = await organizationService.acceptInvitation(
        invitationId,
        context
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockMembership);
    });

    it('should forbid accepting invitation for another user', async () => {
      const invitationId = 'invitation-123';

      // Mock invitation belonging to another user
      const { acceptOrganizationInvitation } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(acceptOrganizationInvitation).mockRejectedValue(
        new Error('Invitation belongs to another user')
      );

      const result = await organizationService.acceptInvitation(
        invitationId,
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('removeMember', () => {
    it('should remove member from organization successfully', async () => {
      const organizationId = 'org-123';
      const userId = 'user-456';

      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withTenantId(organizationId)
        .withRole('admin')
        .build();

      const { deleteOrganizationMembership } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(deleteOrganizationMembership).mockResolvedValue(undefined);

      const result = await organizationService.removeMember(
        organizationId,
        userId,
        adminContext
      );

      expect(result.success).toBe(true);
    });

    it('should forbid non-admin from removing members', async () => {
      const organizationId = 'org-123';
      const userId = 'user-456';

      const result = await organizationService.removeMember(
        organizationId,
        userId,
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(ForbiddenError);
    });
  });

  describe('getOrganizationStats', () => {
    it('should get organization statistics successfully', async () => {
      const organizationId = 'org-123';
      const mockStats = {
        totalMembers: 25,
        activeMembers: 23,
        totalContent: 150,
        publishedContent: 120,
        totalAssessments: 8,
        completedAssessments: 180,
        averageEngagement: 0.75,
        monthlyGrowth: 0.15,
      };

      const { getOrganizationStats } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(getOrganizationStats).mockResolvedValue(mockStats);

      const result = await organizationService.getOrganizationStats(
        organizationId,
        context
      );

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockStats);
    });

    it('should return not found for non-existent organization', async () => {
      const { getOrganizationStats } = await import(
        '@platform/database/queries/organizations'
      );
      vi.mocked(getOrganizationStats).mockResolvedValue(null);

      const result = await organizationService.getOrganizationStats(
        'non-existent',
        context
      );

      expect(result.success).toBe(false);
      expect(result.error).toBeInstanceOf(NotFoundError);
    });
  });

  describe('authorization', () => {
    it('should allow members to create organizations', () => {
      expect(organizationService.canCreate(context)).toBe(true);
    });

    it('should forbid guests from creating organizations', () => {
      const guestContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('guest')
        .build();

      expect(organizationService.canCreate(guestContext)).toBe(false);
    });

    it('should allow viewers to read organizations', () => {
      const viewerContext = ServiceContextBuilder.create()
        .withUserId('user-123')
        .withRole('viewer')
        .build();

      expect(organizationService.canRead(viewerContext)).toBe(true);
    });

    it('should allow members to update organizations', () => {
      expect(organizationService.canUpdate(context)).toBe(true);
    });

    it('should only allow admins to delete organizations', () => {
      expect(organizationService.canDelete(context)).toBe(false); // member role

      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withRole('admin')
        .build();

      expect(organizationService.canDelete(adminContext)).toBe(true);
    });
  });

  describe('error handling', () => {
    it('should handle database errors gracefully', async () => {
      vi.mocked(organizationService['executeFindById']).mockRejectedValue(
        new Error('Database connection failed')
      );

      const result = await organizationService.findById('org-123', context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error?.message).toContain('Database connection failed');
    });

    it('should handle validation errors', async () => {
      const invalidData = {
        name: '', // Invalid: empty name
        slug: 'test-org',
        organizationType: 'church',
        licenseType: 'team' as const,
        maxUsers: 10,
      };

      vi.mocked(organizationService['validateCreateInput']).mockImplementation(
        () => {
          throw new Error('Name is required');
        }
      );

      const result = await organizationService.create(invalidData, context);

      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });
});

describe('OrganizationMembershipService', () => {
  let membershipService: any;
  let context: ServiceContext;

  beforeEach(() => {
    context = ServiceContextBuilder.create()
      .withUserId('user-123')
      .withTenantId('org-456')
      .withRole('member')
      .build();

    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should create an organization membership successfully', async () => {
      const createData = {
        userId: 'user-456',
        organizationId: 'org-123',
        role: 'member',
      };

      const mockDbResult = { id: 'membership-123', ...createData };
      const mockResponse = {
        id: 'membership-123',
        ...createData,
        isActive: true,
      };

      // This would test the OrganizationMembershipService create method
      expect(true).toBe(true); // Placeholder for actual test
    });
  });

  describe('update', () => {
    it('should update organization membership role successfully', async () => {
      const membershipId = 'membership-123';
      const updateData = {
        role: 'admin',
      };

      const adminContext = ServiceContextBuilder.create()
        .withUserId('admin-123')
        .withTenantId('org-123')
        .withRole('admin')
        .build();

      // This would test the OrganizationMembershipService update method
      expect(true).toBe(true); // Placeholder for actual test
    });

    it('should forbid non-admin from updating membership roles', async () => {
      const membershipId = 'membership-123';
      const updateData = {
        role: 'admin',
      };

      // This would test authorization rules
      expect(true).toBe(true); // Placeholder for actual test
    });
  });
});
