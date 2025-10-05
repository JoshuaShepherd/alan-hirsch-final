import type {
  CreateOrganization,
  CreateOrganizationMembership,
  OrganizationEntity,
  OrganizationMembershipEntity,
  OrganizationMembershipResponse,
  OrganizationResponse,
  UpdateOrganization,
  UpdateOrganizationMembership,
} from '@platform/contracts';
import {
  createOrganizationMembershipSchema,
  createOrganizationSchema,
  organizationEntitySchema,
  organizationMembershipEntitySchema,
  organizationMembershipResponseSchema,
  organizationResponseSchema,
  updateOrganizationMembershipSchema,
  updateOrganizationSchema,
} from '@platform/contracts';
import type {
  organizationMemberships,
  organizations,
} from '@platform/database';

// Drizzle row types
type OrganizationRow = typeof organizations.$inferSelect;
type NewOrganizationRow = typeof organizations.$inferInsert;
type OrganizationMembershipRow = typeof organizationMemberships.$inferSelect;
type NewOrganizationMembershipRow = typeof organizationMemberships.$inferInsert;

/**
 * Organization Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 * - Validation with safeParse for runtime safety
 */

/**
 * Map OrganizationRow to OrganizationEntity
 */
export function toOrganizationEntity(row: OrganizationRow): OrganizationEntity {
  const entity = {
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
    address: row.address
      ? {
          street: row.address.street ?? undefined,
          city: row.address.city ?? undefined,
          state: row.address.state ?? undefined,
          country: row.address.country ?? undefined,
          postalCode: row.address.postalCode ?? undefined,
        }
      : undefined,
    licenseType: row.licenseType ?? 'individual',
    maxUsers: row.maxUsers ?? 1,
    accountOwnerId: row.accountOwnerId ?? undefined,
    billingEmail: row.billingEmail ?? undefined,
    status: row.status ?? 'trial',

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };

  // Validate with safeParse
  const validation = organizationEntitySchema.safeParse(entity);
  if (!validation.success) {
    console.error('Organization entity validation failed:', validation.error);
    throw new Error('Invalid organization entity data');
  }

  return validation.data;
}

/**
 * Map OrganizationRow to OrganizationResponse with computed fields
 */
export function toOrganizationResponseDTO(
  row: OrganizationRow & {
    owner?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
    members?: Array<{
      id: string;
      userId: string;
      role: string;
      status: string;
      joinedAt: string;
      user: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
      };
    }>;
    memberCount?: number;
  }
): OrganizationResponse {
  const entity = toOrganizationEntity(row);

  const response = {
    ...entity,
    // Computed fields
    isActive: entity.status === 'active',
    isTrial: entity.status === 'trial',
    hasCustomLogo: !!entity.logoUrl,
    hasWebsite: !!entity.website,
    memberCount: row.memberCount ?? 0,
    displayName: entity.name,
    statusDisplay:
      entity.status.charAt(0).toUpperCase() + entity.status.slice(1),
    licenseTypeDisplay:
      entity.licenseType.charAt(0).toUpperCase() + entity.licenseType.slice(1),

    // Related data
    owner: row.owner,
    members: row.members,
  };

  // Validate with safeParse
  const validation = organizationResponseSchema.safeParse(response);
  if (!validation.success) {
    console.error('Organization response validation failed:', validation.error);
    throw new Error('Invalid organization response data');
  }

  return validation.data;
}

/**
 * Map OrganizationMembershipRow to OrganizationMembershipEntity
 */
export function toOrganizationMembershipEntity(
  row: OrganizationMembershipRow
): OrganizationMembershipEntity {
  const entity = {
    id: row.id,
    userId: row.userId,
    organizationId: row.organizationId,
    role: row.role,
    status: row.status ?? 'pending',
    permissions: (row.permissions as string[]) ?? [],
    joinedAt: row.joinedAt?.toISOString() ?? undefined,
    invitedAt: row.invitedAt?.toISOString() ?? undefined,
    invitedBy: row.invitedBy ?? undefined,

    // Timestamps
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };

  // Validate with safeParse
  const validation = organizationMembershipEntitySchema.safeParse(entity);
  if (!validation.success) {
    console.error(
      'Organization membership entity validation failed:',
      validation.error
    );
    throw new Error('Invalid organization membership entity data');
  }

  return validation.data;
}

/**
 * Map OrganizationMembershipRow to OrganizationMembershipResponse with computed fields
 */
export function toOrganizationMembershipResponseDTO(
  row: OrganizationMembershipRow & {
    user?: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      avatarUrl?: string;
    };
    organization?: {
      id: string;
      name: string;
      slug: string;
      logoUrl?: string;
    };
    invitedByUser?: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }
): OrganizationMembershipResponse {
  const entity = toOrganizationMembershipEntity(row);

  const response = {
    ...entity,
    // Computed fields
    isActive: entity.status === 'active',
    isPending: entity.status === 'pending',
    canManage: entity.role === 'owner' || entity.role === 'admin',
    roleDisplay: entity.role.charAt(0).toUpperCase() + entity.role.slice(1),
    statusDisplay:
      entity.status.charAt(0).toUpperCase() + entity.status.slice(1),

    // Related data
    user: row.user!,
    organization: row.organization!,
    invitedByUser: row.invitedByUser,
  };

  // Validate with safeParse
  const validation = organizationMembershipResponseSchema.safeParse(response);
  if (!validation.success) {
    console.error(
      'Organization membership response validation failed:',
      validation.error
    );
    throw new Error('Invalid organization membership response data');
  }

  return validation.data;
}

/**
 * Transform CreateOrganization to database insert format
 */
export function fromCreateOrganization(
  data: CreateOrganization
): Omit<NewOrganizationRow, 'id' | 'createdAt' | 'updatedAt'> {
  // Validate input
  const validation = createOrganizationSchema.safeParse(data);
  if (!validation.success) {
    console.error('Create organization validation failed:', validation.error);
    throw new Error('Invalid create organization data');
  }

  const validatedData = validation.data;

  return {
    name: validatedData.name,
    slug: validatedData.slug,
    description: validatedData.description ?? null,
    website: validatedData.website ?? null,
    logoUrl: validatedData.logoUrl ?? null,
    organizationType: validatedData.organizationType,
    sizeCategory: validatedData.sizeCategory ?? null,
    contactEmail: validatedData.contactEmail ?? null,
    contactPhone: validatedData.contactPhone ?? null,
    address: validatedData.address
      ? {
          street: validatedData.address.street || '',
          city: validatedData.address.city || '',
          state: validatedData.address.state || '',
          country: validatedData.address.country || '',
          postalCode: validatedData.address.postalCode || '',
        }
      : null,
    licenseType: validatedData.licenseType ?? 'individual',
    maxUsers: validatedData.maxUsers ?? 1,
    accountOwnerId: validatedData.accountOwnerId ?? null,
    billingEmail: validatedData.billingEmail ?? null,
    status: validatedData.status ?? 'trial',
  };
}

/**
 * Transform UpdateOrganization to database update format
 */
export function fromUpdateOrganization(
  data: UpdateOrganization
): Partial<NewOrganizationRow> {
  // Validate input
  const validation = updateOrganizationSchema.safeParse(data);
  if (!validation.success) {
    console.error('Update organization validation failed:', validation.error);
    throw new Error('Invalid update organization data');
  }

  const validatedData = validation.data;
  const updateData: Partial<NewOrganizationRow> = {};

  // Only include fields that are provided
  if (validatedData.name !== undefined) updateData.name = validatedData.name;
  if (validatedData.description !== undefined)
    updateData.description = validatedData.description ?? null;
  if (validatedData.website !== undefined)
    updateData.website = validatedData.website ?? null;
  if (validatedData.logoUrl !== undefined)
    updateData.logoUrl = validatedData.logoUrl ?? null;
  if (validatedData.organizationType !== undefined)
    updateData.organizationType = validatedData.organizationType;
  if (validatedData.sizeCategory !== undefined)
    updateData.sizeCategory = validatedData.sizeCategory ?? null;
  if (validatedData.contactEmail !== undefined)
    updateData.contactEmail = validatedData.contactEmail ?? null;
  if (validatedData.contactPhone !== undefined)
    updateData.contactPhone = validatedData.contactPhone ?? null;
  if (validatedData.address !== undefined) {
    updateData.address = validatedData.address
      ? {
          street: validatedData.address.street || '',
          city: validatedData.address.city || '',
          state: validatedData.address.state || '',
          country: validatedData.address.country || '',
          postalCode: validatedData.address.postalCode || '',
        }
      : null;
  }
  if (validatedData.licenseType !== undefined)
    updateData.licenseType = validatedData.licenseType;
  if (validatedData.maxUsers !== undefined)
    updateData.maxUsers = validatedData.maxUsers;
  if (validatedData.accountOwnerId !== undefined)
    updateData.accountOwnerId = validatedData.accountOwnerId ?? null;
  if (validatedData.billingEmail !== undefined)
    updateData.billingEmail = validatedData.billingEmail ?? null;
  if (validatedData.status !== undefined)
    updateData.status = validatedData.status;

  return updateData;
}

/**
 * Transform CreateOrganizationMembership to database insert format
 */
export function fromCreateOrganizationMembership(
  data: CreateOrganizationMembership
): Omit<
  NewOrganizationMembershipRow,
  'id' | 'createdAt' | 'updatedAt' | 'joinedAt'
> {
  // Validate input
  const validation = createOrganizationMembershipSchema.safeParse(data);
  if (!validation.success) {
    console.error(
      'Create organization membership validation failed:',
      validation.error
    );
    throw new Error('Invalid create organization membership data');
  }

  const validatedData = validation.data;

  return {
    userId: validatedData.userId,
    organizationId: validatedData.organizationId,
    role: validatedData.role,
    status: validatedData.status ?? 'pending',
    permissions: validatedData.permissions ?? [],
    invitedAt: validatedData.invitedAt
      ? new Date(validatedData.invitedAt)
      : null,
    invitedBy: validatedData.invitedBy ?? null,
  };
}

/**
 * Transform UpdateOrganizationMembership to database update format
 */
export function fromUpdateOrganizationMembership(
  data: UpdateOrganizationMembership
): Partial<NewOrganizationMembershipRow> {
  // Validate input
  const validation = updateOrganizationMembershipSchema.safeParse(data);
  if (!validation.success) {
    console.error(
      'Update organization membership validation failed:',
      validation.error
    );
    throw new Error('Invalid update organization membership data');
  }

  const validatedData = validation.data;
  const updateData: Partial<NewOrganizationMembershipRow> = {};

  // Only include fields that are provided
  if (validatedData.role !== undefined) updateData.role = validatedData.role;
  if (validatedData.status !== undefined)
    updateData.status = validatedData.status;
  if (validatedData.permissions !== undefined)
    updateData.permissions = validatedData.permissions;
  if (validatedData.invitedAt !== undefined)
    updateData.invitedAt = validatedData.invitedAt
      ? new Date(validatedData.invitedAt)
      : null;
  if (validatedData.invitedBy !== undefined)
    updateData.invitedBy = validatedData.invitedBy ?? null;

  return updateData;
}

// Legacy function names for backward compatibility
export const toOrganizationDTO = toOrganizationEntity;
export const toOrganizationMembershipDTO = toOrganizationMembershipEntity;
