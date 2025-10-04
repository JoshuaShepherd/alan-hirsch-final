import type { organizations, organizationMemberships } from '../db/schema';
import type { Organization, OrganizationMembership, UserProfile } from '../contracts';
type OrganizationRow = typeof organizations.$inferSelect;
type OrganizationMembershipRow = typeof organizationMemberships.$inferSelect;
/**
 * Organization Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 */
/**
 * Map OrganizationRow to Organization
 */
export declare function toOrganizationDTO(row: OrganizationRow): Organization;
/**
 * Map OrganizationMembershipRow to OrganizationMembership
 */
export declare function toOrganizationMembershipDTO(row: OrganizationMembershipRow, user?: UserProfile, organization?: Organization): OrganizationMembership;
export {};
//# sourceMappingURL=organizations.d.ts.map