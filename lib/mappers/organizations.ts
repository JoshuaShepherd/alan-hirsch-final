import type { organizations, organizationMemberships } from '../db/schema';
import type {
  Organization,
  OrganizationMembership,
  UserProfile,
} from '../contracts';

// Drizzle row types
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
export function toOrganizationDTO(row: OrganizationRow): Organization {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    website: row.website ?? '',
    logoUrl: row.logoUrl ?? '',
    organizationType: row.organizationType,
    sizeCategory: row.sizeCategory || undefined,
    contactEmail: row.contactEmail ?? '',
    contactPhone: row.contactPhone ?? '',
    accountOwnerId: row.accountOwnerId ?? '',
    billingEmail: row.billingEmail ?? '',
    status: row.status ?? 'active',

    // Computed fields for UI
    isActive: row.status === 'active',
    hasLogo: row.logoUrl !== null,

    // Timestamps (convert to ISO strings)
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Map OrganizationMembershipRow to OrganizationMembership
 */
export function toOrganizationMembershipDTO(
  row: OrganizationMembershipRow,
  user?: UserProfile,
  organization?: Organization
): OrganizationMembership {
  return {
    id: row.id,
    userId: row.userId,
    organizationId: row.organizationId,
    role: row.role,
    status: row.status ?? 'pending',
    permissions: (row.permissions as string[]) ?? [],
    joinedAt: row.joinedAt,
    invitedAt: row.invitedAt,
    invitedBy: row.invitedBy ?? '',

    // Computed fields for UI
    isActive: row.status === 'active',
    isOwner: row.role === 'owner',
    isAdmin: row.role === 'admin' || row.role === 'owner',

    // Related data (if provided)
    user,
    organization,

    // Timestamps
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
