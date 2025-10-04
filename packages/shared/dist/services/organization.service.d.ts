import { organizationMemberships, organizations } from '@/lib/db/schema';
import { CreateOrganizationSchema, OrganizationEntitySchema, OrganizationQuerySchema, UpdateOrganizationSchema } from '@platform/contracts';
import { z } from 'zod';
import { BaseService } from './base.service';
export declare class OrganizationService extends BaseService<z.infer<typeof OrganizationEntitySchema>, z.infer<typeof CreateOrganizationSchema>, z.infer<typeof UpdateOrganizationSchema>, z.infer<typeof OrganizationQuerySchema>, typeof organizations> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find organization by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof OrganizationEntitySchema> | null>;
    /**
     * Find organizations by account owner
     */
    findByAccountOwner(accountOwnerId: string): Promise<z.infer<typeof OrganizationEntitySchema>[]>;
    /**
     * Find organizations by type
     */
    findByType(organizationType: string): Promise<z.infer<typeof OrganizationEntitySchema>[]>;
    /**
     * Find organizations by size category
     */
    findBySizeCategory(sizeCategory: string): Promise<z.infer<typeof OrganizationEntitySchema>[]>;
    /**
     * Find organizations by status
     */
    findByStatus(status: string): Promise<z.infer<typeof OrganizationEntitySchema>[]>;
    /**
     * Get organization with members
     */
    findWithMembers(organizationId: string): Promise<{
        organization: z.infer<typeof OrganizationEntitySchema>;
        members: Array<{
            membership: z.infer<typeof databaseOrganizationMembershipSchema>;
            user: any;
        }>;
    } | null>;
    /**
     * Get organization statistics
     */
    getOrganizationStats(organizationId: string): Promise<{
        memberCount: number;
        activeMembers: number;
        pendingMembers: number;
        ownerCount: number;
        adminCount: number;
        memberCount: number;
    }>;
    /**
     * Activate organization
     */
    activate(organizationId: string): Promise<z.infer<typeof OrganizationEntitySchema>>;
    /**
     * Deactivate organization
     */
    deactivate(organizationId: string): Promise<z.infer<typeof OrganizationEntitySchema>>;
    /**
     * Suspend organization
     */
    suspend(organizationId: string): Promise<z.infer<typeof OrganizationEntitySchema>>;
    /**
     * Check if slug is available
     */
    isSlugAvailable(slug: string, excludeOrganizationId?: string): Promise<boolean>;
    /**
     * Search organizations
     */
    searchOrganizations(query: string, limit?: number): Promise<z.infer<typeof OrganizationEntitySchema>[]>;
}
export declare class OrganizationMembershipService extends BaseService<z.infer<typeof databaseOrganizationMembershipSchema>, z.infer<typeof newOrganizationMembershipSchema>, z.infer<typeof updateOrganizationMembershipSchema>, z.infer<typeof queryOrganizationMembershipSchema>, typeof organizationMemberships> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find membership by user and organization
     */
    findByUserAndOrganization(userId: string, organizationId: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema> | null>;
    /**
     * Find memberships by user
     */
    findByUser(userId: string): Promise<Array<z.infer<typeof databaseOrganizationMembershipSchema> & {
        organization: z.infer<typeof OrganizationEntitySchema>;
    }>>;
    /**
     * Find memberships by organization
     */
    findByOrganization(organizationId: string): Promise<Array<z.infer<typeof databaseOrganizationMembershipSchema> & {
        user: any;
    }>>;
    /**
     * Find active memberships by user
     */
    findActiveByUser(userId: string): Promise<Array<z.infer<typeof databaseOrganizationMembershipSchema> & {
        organization: z.infer<typeof OrganizationEntitySchema>;
    }>>;
    /**
     * Find memberships by role
     */
    findByRole(organizationId: string, role: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]>;
    /**
     * Add user to organization
     */
    addMember(userId: string, organizationId: string, role?: string, invitedBy?: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>>;
    /**
     * Remove user from organization
     */
    removeMember(userId: string, organizationId: string): Promise<boolean>;
    /**
     * Update member role
     */
    updateMemberRole(userId: string, organizationId: string, newRole: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>>;
    /**
     * Update membership status
     */
    updateMembershipStatus(userId: string, organizationId: string, status: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>>;
    /**
     * Check if user is member of organization
     */
    isMember(userId: string, organizationId: string): Promise<boolean>;
    /**
     * Check if user has specific role in organization
     */
    hasRole(userId: string, organizationId: string, role: string): Promise<boolean>;
    /**
     * Check if user is admin or owner of organization
     */
    isAdminOrOwner(userId: string, organizationId: string): Promise<boolean>;
    /**
     * Get organization owners
     */
    getOwners(organizationId: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]>;
    /**
     * Get organization admins
     */
    getAdmins(organizationId: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]>;
    /**
     * Get pending memberships
     */
    getPendingMemberships(organizationId: string): Promise<z.infer<typeof databaseOrganizationMembershipSchema>[]>;
}
//# sourceMappingURL=organization.service.d.ts.map