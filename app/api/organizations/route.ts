import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import {
  newOrganizationSchema,
  organizationResponseSchema,
  organizationListResponseSchema,
} from '@/lib/contracts';
import { organizations, organizationMemberships } from '@/lib/db/schema';
import { toOrganizationDTO } from '@/lib/mappers/organizations';
import { hasResults, isDefined } from '@/lib/db/type-guards';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Response schemas are now imported from contracts

// Input schema for organization search
const organizationSearchInputSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
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
export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const input = organizationSearchInputSchema.parse(queryParams);
    const { page, limit, search, organizationType, sizeCategory, status } =
      input;
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(organizations.name, `%${search}%`),
          like(organizations.description, `%${search}%`)
        ) ?? undefined
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

    const count = countResult[0]?.count ?? 0;

    const mappedOrgs = orgs.map(toOrganizationDTO);

    // Create standardized response
    const response = {
      items: {
        data: mappedOrgs,
        pagination: {
          page,
          limit,
          total: count,
          totalPages: Math.ceil(count / limit),
          hasNext: page < Math.ceil(count / limit),
          hasPrev: page > 1,
        },
      },
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = organizationListResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('GET /api/organizations error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/organizations - Create new organization
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const input = newOrganizationSchema.parse(body);

    // TODO: Add authentication check
    // For now, we'll need to get user from session/auth
    const user = { id: 'temp-user-id' }; // This should come from auth
    const db = await import('@/lib/db/drizzle').then(m => m.db);
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
    if (!hasResults(insertedOrganizations)) {
      return NextResponse.json(
        { error: 'Failed to create organization' },
        { status: 500 }
      );
    }

    const newOrganization = insertedOrganizations[0];
    if (!isDefined(newOrganization)) {
      return NextResponse.json(
        { error: 'Failed to create organization' },
        { status: 500 }
      );
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
    const response = {
      data: mappedOrg,
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = organizationResponseSchema.parse(response);

    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('POST /api/organizations error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
