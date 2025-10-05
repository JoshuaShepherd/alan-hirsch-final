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
      logoUrl: row.logo_url ?? undefined,

      // Organization Details
      organizationType: row.organization_type,
      sizeCategory: row.size_category ?? undefined,
      contactEmail: row.contact_email ?? undefined,
      contactPhone: row.contact_phone ?? undefined,

      // Address Information
      address: row.address
        ? {
            street: row.address.street ?? undefined,
            city: row.address.city ?? undefined,
            state: row.address.state ?? undefined,
            country: row.address.country ?? undefined,
            postalCode: row.address.postal_code ?? undefined,
          }
        : undefined,

      // Billing & Account
      billingEmail: row.billing_email ?? undefined,
      accountOwnerId: row.account_owner_id ?? undefined,

      // License & Limits
      licenseType: row.license_type ?? 'individual',
      maxUsers: row.max_users ?? 1,

      // Status
      status: row.status ?? 'trial',

      // Timestamps
      createdAt: row.created_at.toISOString(),
      updatedAt: row.updated_at.toISOString(),
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
  const hasCustomLogo = !!row.logo_url;
  const hasWebsite = !!row.website;
  const hasAddress = !!row.address;
  const memberCount = row.memberCount || row.members?.length || 0;
  const displayName = row.name;
  const statusDisplay = getStatusDisplay(row.status);
  const licenseTypeDisplay = getLicenseTypeDisplay(row.license_type);

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
    logo_url: data.logoUrl ?? null,
    organization_type: data.organizationType,
    size_category: data.sizeCategory ?? null,
    contact_email: data.contactEmail ?? null,
    contact_phone: data.contactPhone ?? null,
    address: data.address
      ? {
          street: data.address.street ?? null,
          city: data.address.city ?? null,
          state: data.address.state ?? null,
          country: data.address.country ?? null,
          postal_code: data.address.postalCode ?? null,
        }
      : null,
    billing_email: data.billingEmail ?? null,
    account_owner_id: data.accountOwnerId ?? null,
    license_type: data.licenseType ?? 'individual',
    max_users: data.maxUsers ?? 1,
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
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.description !== undefined)
    updateData.description = data.description ?? null;
  if (data.website !== undefined) updateData.website = data.website ?? null;
  if (data.logoUrl !== undefined) updateData.logo_url = data.logoUrl ?? null;
  if (data.organizationType !== undefined)
    updateData.organization_type = data.organizationType;
  if (data.sizeCategory !== undefined)
    updateData.size_category = data.sizeCategory ?? null;
  if (data.contactEmail !== undefined)
    updateData.contact_email = data.contactEmail ?? null;
  if (data.contactPhone !== undefined)
    updateData.contact_phone = data.contactPhone ?? null;
  if (data.address !== undefined) {
    updateData.address = data.address
      ? {
          street: data.address.street ?? null,
          city: data.address.city ?? null,
          state: data.address.state ?? null,
          country: data.address.country ?? null,
          postal_code: data.address.postalCode ?? null,
        }
      : null;
  }
  if (data.billingEmail !== undefined)
    updateData.billing_email = data.billingEmail ?? null;
  if (data.accountOwnerId !== undefined)
    updateData.account_owner_id = data.accountOwnerId ?? null;
  if (data.licenseType !== undefined)
    updateData.license_type = data.licenseType;
  if (data.maxUsers !== undefined) updateData.max_users = data.maxUsers;
  if (data.status !== undefined) updateData.status = data.status;

  // Always update the updated_at timestamp
  updateData.updated_at = new Date();

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
