import type { NewOrganization, NewOrganizationMembership } from '@/lib/contracts';
import { organizationMemberships, organizations, userProfiles } from '../schema';
export interface QueryContext {
    organizationId?: string;
    userId?: string;
    role?: string;
}
/**
 * Get organization by ID with context-aware access control
 */
export declare function getOrganizationById(organizationId: string, context: QueryContext): Promise<typeof organizations.$inferSelect | null>;
/**
 * Get organization by slug with context-aware access control
 */
export declare function getOrganizationBySlug(slug: string, context: QueryContext): Promise<typeof organizations.$inferSelect | null>;
/**
 * Search organizations with context-aware filtering
 */
export declare function searchOrganizations(searchTerm: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
    organizationType?: string;
    sizeCategory?: string;
    status?: 'active' | 'inactive' | 'suspended';
}): Promise<(typeof organizations.$inferSelect)[]>;
/**
 * Get organizations by user with membership details
 */
export declare function getOrganizationsByUser(userId: string, context: QueryContext, options?: {
    status?: 'active' | 'pending' | 'inactive';
    role?: string;
    limit?: number;
    offset?: number;
}): Promise<Array<typeof organizations.$inferSelect & {
    membership: typeof organizationMemberships.$inferSelect;
}>>;
/**
 * Get organization statistics
 */
export declare function getOrganizationStats(organizationId: string, context: QueryContext): Promise<{
    totalMembers: number;
    activeMembers: number;
    pendingInvitations: number;
    totalSubscriptions: number;
    activeSubscriptions: number;
    monthlyRevenue: number;
    totalRevenue: number;
} | null>;
/**
 * Get organization members with user details
 */
export declare function getOrganizationMembers(organizationId: string, context: QueryContext, options?: {
    role?: string;
    status?: 'active' | 'pending' | 'inactive';
    limit?: number;
    offset?: number;
}): Promise<Array<typeof userProfiles.$inferSelect & {
    membership: typeof organizationMemberships.$inferSelect;
}>>;
/**
 * Get organization billing information
 */
export declare function getOrganizationBilling(organizationId: string, context: QueryContext): Promise<{
    billingEmail: string;
    contactEmail: string;
    contactPhone: string;
    address: Record<string, unknown>;
    licenseType: string;
    maxUsers: number;
    currentUsers: number;
    subscriptionStatus: string;
} | null>;
/**
 * Create a new organization
 */
export declare function createOrganization(organizationData: NewOrganization, context: QueryContext): Promise<typeof organizations.$inferSelect>;
/**
 * Update organization with context-aware validation
 */
export declare function updateOrganization(organizationId: string, updates: Partial<NewOrganization>, context: QueryContext): Promise<typeof organizations.$inferSelect | null>;
/**
 * Delete organization with context-aware validation
 */
export declare function deleteOrganization(organizationId: string, context: QueryContext): Promise<boolean>;
/**
 * Get organization membership by ID
 */
export declare function getOrganizationMembershipById(membershipId: string, context: QueryContext): Promise<typeof organizationMemberships.$inferSelect | null>;
/**
 * Get user's membership in organization
 */
export declare function getUserOrganizationMembership(userId: string, organizationId: string, context: QueryContext): Promise<typeof organizationMemberships.$inferSelect | null>;
/**
 * Create organization membership
 */
export declare function createOrganizationMembership(membershipData: NewOrganizationMembership, context: QueryContext): Promise<typeof organizationMemberships.$inferSelect>;
/**
 * Update organization membership
 */
export declare function updateOrganizationMembership(membershipId: string, updates: Partial<NewOrganizationMembership>, context: QueryContext): Promise<typeof organizationMemberships.$inferSelect | null>;
/**
 * Delete organization membership
 */
export declare function deleteOrganizationMembership(membershipId: string, context: QueryContext): Promise<boolean>;
/**
 * Invite user to organization
 */
export declare function inviteUserToOrganization(organizationId: string, userEmail: string, role: string, context: QueryContext): Promise<typeof organizationMemberships.$inferSelect>;
/**
 * Accept organization invitation
 */
export declare function acceptOrganizationInvitation(membershipId: string, context: QueryContext): Promise<typeof organizationMemberships.$inferSelect | null>;
/**
 * Reject organization invitation
 */
export declare function rejectOrganizationInvitation(membershipId: string, context: QueryContext): Promise<boolean>;
//# sourceMappingURL=organizations.d.ts.map