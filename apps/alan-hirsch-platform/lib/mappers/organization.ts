import type {
  CreateOrganization,
  OrganizationEntity,
  OrganizationResponse,
  UpdateOrganization,
} from '@platform/contracts';
import {
  organizationEntitySchema,
  organizationResponseSchema,
} from '@platform/contracts';
import type { Organization } from '@platform/database';

// ============================================================================
// ORGANIZATION MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform database row to OrganizationEntity
 */
export function toOrganizationEntity(row: Organization): OrganizationEntity {
  try {
    if (!row) {
      throw new Error('Organization is null or undefined');
    }

    const result = {
      // Core Identity
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description ?? undefined,
      website: row.website ?? undefined,
      logoUrl: row.logoUrl ?? undefined,

      // Organization Details
      organizationType: row.organizationType,
      sizeCategory: row.sizeCategory ?? undefined,
      contactEmail: row.contactEmail ?? undefined,
      contactPhone: row.contactPhone ?? undefined,

      // Address Information
      address: row.address
        ? {
            street: row.address.street,
            city: row.address.city,
            state: row.address.state,
            country: row.address.country,
            postalCode: row.address.postalCode,
          }
        : undefined,

      // Billing & Account
      billingEmail: row.billingEmail ?? undefined,
      accountOwnerId: row.accountOwnerId ?? undefined,

      // License & Limits
      licenseType: row.licenseType ?? 'individual',
      maxUsers: row.maxUsers ?? 1,

      // Status
      status: row.status ?? 'trial',

      // Timestamps
      createdAt: row.createdAt.toISOString(),
      updatedAt: row.updatedAt.toISOString(),
    };

    // Validate the result against the schema
    const validation = organizationEntitySchema.safeParse(result);
    if (!validation.success) {
      console.error('Entity validation failed:', validation.error);
      throw new Error('Invalid entity data');
    }
    return validation.data;
  } catch (error) {
    console.error('Error in toOrganizationEntity:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      rowId: row?.id,
      rowName: row?.name,
    });
    throw new Error(
      `Failed to transform Organization to OrganizationEntity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Transform database row to OrganizationResponse with computed fields
 */
export function toOrganizationResponseDTO(
  row: Organization & {
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

  // Compute derived fields
  const isActive = row.status === 'active';
  const isTrial = row.status === 'trial';
  const isSuspended = row.status === 'suspended';
  const isCancelled = row.status === 'cancelled';
  const hasCustomLogo = !!row.logoUrl;
  const hasWebsite = !!row.website;
  const hasAddress = !!row.address;
  const memberCount = row.memberCount || row.members?.length || 0;
  const displayName = row.name;
  const statusDisplay = getStatusDisplay(row.status || 'trial');
  const licenseTypeDisplay = getLicenseTypeDisplay(
    row.licenseType || 'individual'
  );

  const result = {
    ...entity,

    // Computed fields
    isActive,
    isTrial,
    isSuspended,
    isCancelled,
    hasCustomLogo,
    hasWebsite,
    hasAddress,
    memberCount,
    displayName,
    statusDisplay,
    licenseTypeDisplay,

    // Related data
    owner: row.owner,
    members: row.members ?? [],
  };

  // Validate the result against the schema
  const validation = organizationResponseSchema.safeParse(result);
  if (!validation.success) {
    console.error('Response validation failed:', validation.error);
    throw new Error('Invalid response data');
  }
  return validation.data;
}

// ============================================================================
// CREATE/UPDATE MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform CreateOrganization to database insert format
 */
export function fromCreateOrganization(
  data: CreateOrganization
): Partial<Organization> {
  return {
    name: data.name,
    slug: data.slug,
    description: data.description ?? null,
    website: data.website ?? null,
    logoUrl: data.logoUrl ?? null,
    organizationType: data.organizationType,
    sizeCategory: data.sizeCategory ?? null,
    contactEmail: data.contactEmail ?? null,
    contactPhone: data.contactPhone ?? null,
    address: data.address
      ? {
          street: data.address.street ?? '',
          city: data.address.city ?? '',
          state: data.address.state ?? '',
          country: data.address.country ?? '',
          postalCode: data.address.postalCode ?? '',
        }
      : null,
    billingEmail: data.billingEmail ?? null,
    accountOwnerId: data.accountOwnerId ?? null,
    licenseType: data.licenseType ?? 'individual',
    maxUsers: data.maxUsers ?? 1,
    status: data.status ?? 'trial',
  };
}

/**
 * Transform UpdateOrganization to database update format
 */
export function fromUpdateOrganization(
  data: UpdateOrganization
): Partial<Organization> {
  const updateData: Partial<Organization> = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined)
    updateData.description = data.description ?? null;
  if (data.website !== undefined) updateData.website = data.website ?? null;
  if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl ?? null;
  if (data.organizationType !== undefined)
    updateData.organizationType = data.organizationType;
  if (data.sizeCategory !== undefined)
    updateData.sizeCategory = data.sizeCategory ?? null;
  if (data.contactEmail !== undefined)
    updateData.contactEmail = data.contactEmail ?? null;
  if (data.contactPhone !== undefined)
    updateData.contactPhone = data.contactPhone ?? null;
  if (data.address !== undefined) {
    updateData.address = data.address
      ? {
          street: data.address.street ?? '',
          city: data.address.city ?? '',
          state: data.address.state ?? '',
          country: data.address.country ?? '',
          postalCode: data.address.postalCode ?? '',
        }
      : null;
  }
  if (data.billingEmail !== undefined)
    updateData.billingEmail = data.billingEmail ?? null;
  if (data.accountOwnerId !== undefined)
    updateData.accountOwnerId = data.accountOwnerId ?? null;
  if (data.licenseType !== undefined) updateData.licenseType = data.licenseType;
  if (data.maxUsers !== undefined) updateData.maxUsers = data.maxUsers;
  if (data.status !== undefined) updateData.status = data.status;

  // Always update the updatedAt timestamp
  updateData.updatedAt = new Date();

  return updateData;
}

// ============================================================================
// ARRAY MAPPER FUNCTIONS
// ============================================================================

/**
 * Transform multiple database rows to OrganizationResponse array
 */
export function toOrganizationResponseArray(
  rows: (Organization & {
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
  })[]
): OrganizationResponse[] {
  return rows.map(toOrganizationResponseDTO);
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get status display text
 */
function getStatusDisplay(status: string): string {
  switch (status) {
    case 'trial':
      return 'Trial';
    case 'active':
      return 'Active';
    case 'suspended':
      return 'Suspended';
    case 'cancelled':
      return 'Cancelled';
    default:
      return 'Unknown';
  }
}

/**
 * Get license type display text
 */
function getLicenseTypeDisplay(licenseType: string): string {
  switch (licenseType) {
    case 'individual':
      return 'Individual';
    case 'team':
      return 'Team';
    case 'enterprise':
      return 'Enterprise';
    default:
      return 'Unknown';
  }
}

/**
 * Check if organization is publicly accessible
 */
export function isOrganizationPublic(
  organization: OrganizationResponse
): boolean {
  return organization.isActive && organization.status === 'active';
}

/**
 * Get organization display information
 */
export function getOrganizationDisplayInfo(
  organization: OrganizationResponse
): {
  name: string;
  type: string;
  status: string;
  members: string;
  license: string;
} {
  return {
    name: organization.name,
    type: organization.organizationType,
    status: organization.statusDisplay,
    members: `${organization.memberCount} members`,
    license: organization.licenseTypeDisplay,
  };
}

/**
 * Check if organization has reached user limit
 */
export function hasReachedUserLimit(
  organization: OrganizationResponse
): boolean {
  return organization.memberCount >= organization.maxUsers;
}

/**
 * Get organization contact information
 */
export function getOrganizationContactInfo(
  organization: OrganizationResponse
): {
  email?: string;
  phone?: string;
  website?: string;
} {
  return {
    email: organization.contactEmail,
    phone: organization.contactPhone,
    website: organization.website,
  };
}
