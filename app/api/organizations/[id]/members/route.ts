import {
  createApiRoute,
  createPaginatedApiRoute,
  paginationInputSchema,
  idInputSchema,
} from '@/lib/api/utils';
import {
  organizationMembershipSchema,
  newOrganizationMembershipSchema,
} from '@/lib/contracts';
import { organizationMemberships, userProfiles } from '@/lib/db/schema';
import { toOrganizationMembershipDTO } from '@/lib/mappers/organizations';
import { eq, and, desc, sql } from 'drizzle-orm';
import { z } from 'zod';

// Response schemas
const membershipResponseSchema = z.object({
  data: organizationMembershipSchema.extend({
    user: z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string().optional(),
      avatarUrl: z.string().optional(),
      email: z.string(),
    }),
  }),
  success: z.boolean(),
});

// Input schema for membership search
const membershipSearchInputSchema = paginationInputSchema.extend({
  role: z.enum(['owner', 'admin', 'member', 'viewer']).optional(),
  status: z.enum(['active', 'inactive', 'pending', 'invited']).optional(),
});

// GET /api/organizations/[id]/members - Get organization members
export const GET = createPaginatedApiRoute(
  membershipSearchInputSchema,
  organizationMembershipSchema.extend({
    user: z.object({
      id: z.string(),
      firstName: z.string(),
      lastName: z.string(),
      displayName: z.string().optional(),
      avatarUrl: z.string().optional(),
      email: z.string(),
    }),
  }),
  async (input, { user, db }) => {
    const { page, limit, role, status } = input;
    const offset = ((page || 1) - 1) * (limit || 20);

    // Check if user has access to this organization
    const userMembership = await db
      .select()
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.organizationId, (input as any).id),
          eq(organizationMemberships.userId, user.id),
          eq(organizationMemberships.status, 'active')
        )
      )
      .limit(1);

    if (!userMembership[0]) {
      throw new Error('Access denied');
    }

    // Build where conditions
    const conditions = [
      eq(organizationMemberships.organizationId, (input as any).id),
    ];

    if (role) {
      conditions.push(eq(organizationMemberships.role, role));
    }
    if (status) {
      conditions.push(eq(organizationMemberships.status, status));
    }

    // Get members with user details
    const members = await db
      .select({
        id: organizationMemberships.id,
        userId: organizationMemberships.userId,
        organizationId: organizationMemberships.organizationId,
        role: organizationMemberships.role,
        permissions: organizationMemberships.permissions,
        status: organizationMemberships.status,
        joinedAt: organizationMemberships.joinedAt,
        invitedAt: organizationMemberships.invitedAt,
        invitedBy: organizationMemberships.invitedBy,
        createdAt: organizationMemberships.createdAt,
        updatedAt: organizationMemberships.updatedAt,
        user: {
          id: userProfiles.id,
          firstName: userProfiles.firstName,
          lastName: userProfiles.lastName,
          displayName: userProfiles.displayName,
          avatarUrl: userProfiles.avatarUrl,
          email: userProfiles.email,
        },
      })
      .from(organizationMemberships)
      .leftJoin(
        userProfiles,
        eq(organizationMemberships.userId, userProfiles.id)
      )
      .where(and(...conditions))
      .orderBy(desc(organizationMemberships.joinedAt))
      .limit(limit || 20)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(organizationMemberships)
      .where(and(...conditions));

    const total = countResult[0]?.count || 0;
    return {
      items: members
        .filter(member => member.user !== null) // Filter out members without user data
        .map(member => ({
          ...toOrganizationMembershipDTO(member),
          user: {
            id: member.user!.id,
            firstName: member.user!.firstName,
            lastName: member.user!.lastName,
            email: member.user!.email,
            displayName: member.user!.displayName || undefined,
            avatarUrl: member.user!.avatarUrl || undefined,
          },
        })),
      pagination: {
        page: page || 1,
        limit: limit || 20,
        total,
        totalPages: Math.ceil(total / (limit || 20)),
        hasNext: (page || 1) < Math.ceil(total / (limit || 20)),
        hasPrev: (page || 1) > 1,
      },
      success: true,
    };
  }
);

// POST /api/organizations/[id]/members - Invite member to organization
export const POST = createApiRoute(
  idInputSchema.extend({
    email: z.string().email(),
    role: z.enum(['admin', 'member', 'viewer']).default('member'),
    message: z.string().optional(),
  }),
  membershipResponseSchema,
  async (input, { user, db }) => {
    const { id, email, role, message } = input;

    // Check if user has permission to invite members
    const userMembership = await db
      .select()
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.organizationId, id),
          eq(organizationMemberships.userId, user.id),
          eq(organizationMemberships.status, 'active')
        )
      )
      .limit(1);

    if (
      !userMembership[0] ||
      !['owner', 'admin'].includes(userMembership[0].role)
    ) {
      throw new Error('Insufficient permissions');
    }

    // Find user by email
    const targetUser = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.email, email))
      .limit(1);

    if (!targetUser[0]) {
      throw new Error('User not found');
    }

    // Check if user is already a member
    const existingMembership = await db
      .select()
      .from(organizationMemberships)
      .where(
        and(
          eq(organizationMemberships.organizationId, id),
          eq(organizationMemberships.userId, targetUser[0].id)
        )
      )
      .limit(1);

    if (existingMembership[0]) {
      throw new Error('User is already a member');
    }

    // Create membership invitation
    const insertedMemberships = await db
      .insert(organizationMemberships)
      .values({
        userId: targetUser[0].id,
        organizationId: id,
        role: role || 'member',
        status: 'invited',
        invitedAt: new Date(),
        invitedBy: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Ensure we have a valid membership
    if (!insertedMemberships || insertedMemberships.length === 0) {
      throw new Error('Failed to create organization membership');
    }

    const newMembership = insertedMemberships[0];
    if (!newMembership) {
      throw new Error('Failed to create organization membership');
    }

    return {
      data: {
        ...toOrganizationMembershipDTO(newMembership),
        user: {
          id: targetUser[0].id,
          firstName: targetUser[0].firstName,
          lastName: targetUser[0].lastName,
          email: targetUser[0].email,
          displayName: targetUser[0].displayName || undefined,
          avatarUrl: targetUser[0].avatarUrl || undefined,
        },
      },
      success: true,
    };
  }
);
