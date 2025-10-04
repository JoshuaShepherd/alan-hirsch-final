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
export function toOrganizationDTO(row) {
    return {
        id: row.id,
        name: row.name,
        slug: row.slug,
        description: row.description ?? undefined,
        website: row.website ?? undefined,
        logoUrl: row.logoUrl ?? undefined,
        organizationType: row.organizationType,
        sizeCategory: row.sizeCategory ?? undefined,
        contactEmail: row.contactEmail ?? undefined,
        contactPhone: row.contactPhone ?? undefined,
        address: row.address ?? undefined,
        licenseType: row.licenseType ?? 'individual',
        maxUsers: row.maxUsers ?? 1,
        accountOwnerId: row.accountOwnerId ?? undefined,
        billingEmail: row.billingEmail ?? undefined,
        status: row.status ?? 'trial',
        // Timestamps
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
/**
 * Map OrganizationMembershipRow to OrganizationMembership
 */
export function toOrganizationMembershipDTO(row, user, organization) {
    return {
        id: row.id,
        userId: row.userId,
        organizationId: row.organizationId,
        role: row.role,
        status: row.status ?? 'pending',
        permissions: row.permissions ?? [],
        joinedAt: row.joinedAt ?? undefined,
        invitedAt: row.invitedAt ?? undefined,
        invitedBy: row.invitedBy ?? '',
        // Note: Computed fields like isOwner, isAdmin are not part of the OrganizationMembership type
        // These would need to be added to the validation schema or handled separately
        // Note: user and organization properties are not part of the OrganizationMembership type
        // These would need to be added to the validation schema or handled separately
        // Timestamps
        createdAt: row.createdAt,
        updatedAt: row.updatedAt,
    };
}
//# sourceMappingURL=organizations.js.map