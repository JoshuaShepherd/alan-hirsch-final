import { createApiRoute, createApiRouteInputOnly, idInputSchema } from '@/lib/api/utils'
import { organizationSchema, organizationMembershipSchema, OrganizationRow } from '@/lib/contracts'
import { organizations, organizationMemberships, userProfiles } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { z } from 'zod'

// Mapper function to convert Drizzle row to DTO
const mapOrganizationRow = (row: OrganizationRow) => organizationSchema.parse(row)

// Response schemas
const organizationResponseSchema = z.object({
  data: organizationSchema,
  success: z.boolean()
})

const organizationWithMembersResponseSchema = z.object({
  data: organizationSchema.extend({
    members: z.array(organizationMembershipSchema.extend({
      user: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        displayName: z.string().optional(),
        avatarUrl: z.string().optional()
      })
    }))
  }),
  success: z.boolean()
})

// GET /api/organizations/[id] - Get organization by ID
export const GET = createApiRoute(
  idInputSchema,
  organizationResponseSchema,
  async (input, { user, db }) => {
    const organization = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, input.id))
      .limit(1)

    if (!organization[0]) {
      throw new Error('Organization not found')
    }

    return {
      data: mapOrganizationRow(organization[0]),
      success: true
    }
  }
)

// PUT /api/organizations/[id] - Update organization
export const PUT = createApiRoute(
  idInputSchema.extend({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    website: z.string().url().optional(),
    logoUrl: z.string().url().optional(),
    organizationType: z.enum(['church', 'denomination', 'seminary', 'ministry_network', 'nonprofit', 'business', 'other']).optional(),
    sizeCategory: z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
    contactEmail: z.string().email().optional(),
    contactPhone: z.string().optional(),
    maxUsers: z.number().int().min(1).optional(),
    billingEmail: z.string().email().optional(),
    status: z.enum(['active', 'inactive', 'trial', 'suspended']).optional()
  }),
  organizationResponseSchema,
  async (input, { user, db }) => {
    const { id, ...updateData } = input

    // Check if user has permission to update this organization
    const membership = await db
      .select()
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.organizationId, id),
          eq(organizationMemberships.userId, user.id),
          eq(organizationMemberships.status, 'active')
        )
      )
      .limit(1)

    if (!membership[0] || !['owner', 'admin'].includes(membership[0].role)) {
      throw new Error('Insufficient permissions')
    }

    const [updatedOrganization] = await db
      .update(organizations)
      .set({
        ...updateData,
        updatedAt: new Date()
      })
      .where(eq(organizations.id, id))
      .returning()

    if (!updatedOrganization) {
      throw new Error('Organization not found')
    }

    return {
      data: mapOrganizationRow(updatedOrganization),
      success: true
    }
  }
)

// DELETE /api/organizations/[id] - Delete organization
export const DELETE = createApiRoute(
  idInputSchema,
  z.object({
    success: z.boolean(),
    message: z.string()
  }),
  async (input, { user, db }) => {
    // Check if user is the owner
    const membership = await db
      .select()
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.organizationId, input.id),
          eq(organizationMemberships.userId, user.id),
          eq(organizationMemberships.role, 'owner')
        )
      )
      .limit(1)

    if (!membership[0]) {
      throw new Error('Only the owner can delete this organization')
    }

    // Delete organization (cascade will handle memberships)
    await db
      .delete(organizations)
      .where(eq(organizations.id, input.id))

    return {
      success: true,
      message: 'Organization deleted successfully'
    }
  }
)
