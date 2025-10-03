import {
  createApiRoute,
  createPaginatedApiRoute,
  paginationInputSchema,
  emptyInputSchema,
} from '@/lib/api/utils';
import {
  organizationSchema,
  newOrganizationSchema,
  organizationResponseSchema,
  organizationListResponseSchema,
} from '@/lib/contracts';
import { organizations, organizationMemberships } from '@/lib/db/schema';
import { toOrganizationDTO } from '@/lib/mappers/organizations';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Response schemas are now imported from contracts

// Input schema for organization search
const organizationSearchInputSchema = paginationInputSchema.extend({
  search: z.string().optional(),
  organizationType: z
    .enum([
      'church',
      'denomination',
      'seminary',
      'ministry_network',
      'nonprofit',
      'business',
      'other',
    ])
    .optional(),
  sizeCategory: z.enum(['small', 'medium', 'large', 'enterprise']).optional(),
  status: z.enum(['active', 'inactive', 'trial', 'suspended']).optional(),
});

// GET /api/organizations - Get organizations with search and filtering
export const GET = createPaginatedApiRoute(
  organizationSearchInputSchema,
  organizationListResponseSchema,
  async (input, { user, db }) => {
    const {
      page = 1,
      limit = 20,
      search,
      organizationType,
      sizeCategory,
      status,
    } = input;
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(organizations.name, `%${search}%`),
          like(organizations.description, `%${search}%`)
        )!
      );
    }

    // Add filter conditions
    if (organizationType) {
      conditions.push(eq(organizations.organizationType, organizationType));
    }
    if (sizeCategory) {
      conditions.push(eq(organizations.sizeCategory, sizeCategory));
    }
    if (status) {
      conditions.push(eq(organizations.status, status));
    }

    // Get organizations
    const orgs = await db
      .select()
      .from(organizations)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(organizations.createdAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(organizations)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const count = countResult[0]?.count || 0;

    const mappedOrgs = orgs.map(toOrganizationDTO);

    // Create standardized response
    return {
      items: mappedOrgs,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: page < Math.ceil(count / limit),
        hasPrev: page > 1,
      },
      success: true,
    };
  }
);

// POST /api/organizations - Create new organization
export const POST = createApiRoute(
  newOrganizationSchema,
  organizationResponseSchema,
  async (input, { user, db }) => {
    const insertedOrganizations = await db
      .insert(organizations)
      .values({
        ...input,
        accountOwnerId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Ensure we have a valid organization
    if (!insertedOrganizations || insertedOrganizations.length === 0) {
      throw new Error('Failed to create organization');
    }

    const newOrganization = insertedOrganizations[0];
    if (!newOrganization) {
      throw new Error('Failed to create organization');
    }

    // Create membership for the owner
    await db.insert(organizationMemberships).values({
      userId: user.id,
      organizationId: newOrganization.id,
      role: 'owner',
      status: 'active',
      joinedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const mappedOrg = toOrganizationDTO(newOrganization);

    // Create standardized response
    return {
      data: mappedOrg,
      success: true,
    };
  }
);
