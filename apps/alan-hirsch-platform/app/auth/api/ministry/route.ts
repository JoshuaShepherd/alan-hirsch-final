// ============================================================================
// MINISTRY PLATFORM SEARCH & DISCOVERY API ROUTES
// ============================================================================
// Type-safe API endpoints for ministry platform search with proper ingress/egress validation
// Uses standardized route handlers with ingress/egress validation per alignment reference

import {
  assessments,
  communities,
  contentItems,
  db,
  organizations,
  userProfiles,
} from '@platform/database';
import { and, desc, inArray, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';
import { createGetHandler } from '../../../../lib/api/route-handlers';

// ============================================================================
// MINISTRY SEARCH SCHEMAS
// ============================================================================

/**
 * Ministry platform search request schema
 */
const MinistrySearchRequestSchema = z.object({
  query: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['relevance', 'date', 'popularity']).default('relevance'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  ministryRoles: z.array(z.string()).optional(),
  culturalContexts: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  organizationTypes: z.array(z.string()).optional(),
  contentTypes: z.array(z.string()).optional(),
  difficultyLevels: z.array(z.string()).optional(),
  assessmentTypes: z.array(z.string()).optional(),
  communityTypes: z.array(z.string()).optional(),
  dateFrom: z.string().datetime().optional(),
  dateTo: z.string().datetime().optional(),
  minEngagement: z.number().int().min(0).optional(),
  hasComments: z.boolean().optional(),
  hasCollaborations: z.boolean().optional(),
  organizationContext: z.string().optional(),
});

/**
 * Ministry platform search response schema
 */
const MinistrySearchResponseSchema = z.object({
  assessments: z.array(z.any()),
  content: z.array(z.any()),
  communities: z.array(z.any()),
  organizations: z.array(z.any()),
  users: z.array(z.any()),
  totalResults: z.number().int().min(0),
  pagination: z.object({
    page: z.number().int().min(1),
    limit: z.number().int().min(1),
    total: z.number().int().min(0),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrev: z.boolean(),
  }),
});

// ============================================================================
// GET /api/ministry - Unified ministry platform search and discovery
// ============================================================================

export const GET = createGetHandler({
  inputSchema: MinistrySearchRequestSchema,
  outputSchema: MinistrySearchResponseSchema,
  requireAuth: true,
  requirePermissions: ['read:ministry'],
  handler: async (validatedQuery, context) => {
    const {
      query,
      page,
      limit,
      sortBy,
      sortOrder,
      ministryRoles,
      culturalContexts,
      theologicalThemes,
      organizationTypes,
      contentTypes,
      difficultyLevels,
      assessmentTypes,
      communityTypes,
      dateFrom,
      dateTo,
      minEngagement,
      hasComments,
      hasCollaborations,
      organizationContext,
    } = validatedQuery;

    const offset = (page - 1) * limit;

    // Build search results across all ministry platform entities
    const searchResults = await Promise.all([
      searchAssessments(validatedQuery, offset, limit),
      searchContent(validatedQuery, offset, limit),
      searchCommunities(validatedQuery, offset, limit),
      searchOrganizations(validatedQuery, offset, limit),
      searchUsers(validatedQuery, offset, limit),
    ]);

    const [assessments, content, communities, organizations, users] =
      searchResults;

    const totalResults =
      assessments.total +
      content.total +
      communities.total +
      organizations.total +
      users.total;

    const totalPages = Math.ceil(totalResults / limit);

    // Combine and rank results based on ministry relevance
    return {
      assessments: assessments.data,
      content: content.data,
      communities: communities.data,
      organizations: organizations.data,
      users: users.data,
      totalResults,
      pagination: {
        page,
        limit,
        total: totalResults,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  },
});

// ============================================================================
// SEARCH HELPER FUNCTIONS
// ============================================================================

async function searchAssessments(input: any, offset: number, limit: number) {
  const conditions = [];

  if (input.query) {
    conditions.push(
      or(
        like(assessments.name, `%${input.query}%`),
        like(assessments.description, `%${input.query}%`)
      )!
    );
  }

  if (input.assessmentTypes?.length) {
    conditions.push(inArray(assessments.assessmentType, input.assessmentTypes));
  }

  if (input.culturalContexts?.length) {
    conditions.push(
      inArray(assessments.culturalAdaptation, input.culturalContexts)
    );
  }

  const results = await db
    .select()
    .from(assessments)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(assessments.publishedAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(assessments)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return {
    data: results,
    total: countResult[0]?.count ?? 0,
  };
}

async function searchContent(input: any, offset: number, limit: number) {
  const conditions = [];

  if (input.query) {
    conditions.push(
      or(
        like(contentItems.title, `%${input.query}%`),
        like(contentItems.excerpt, `%${input.query}%`)
      )!
    );
  }

  if (input.contentTypes?.length) {
    conditions.push(inArray(contentItems.contentType, input.contentTypes));
  }

  if (input.difficultyLevels?.length) {
    conditions.push(
      inArray(contentItems.difficultyLevel, input.difficultyLevels)
    );
  }

  const results = await db
    .select()
    .from(contentItems)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(contentItems.publishedAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(contentItems)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return {
    data: results,
    total: countResult[0]?.count ?? 0,
  };
}

async function searchCommunities(input: any, offset: number, limit: number) {
  const conditions = [];

  if (input.query) {
    conditions.push(
      or(
        like(communities.name, `%${input.query}%`),
        like(communities.description, `%${input.query}%`)
      )!
    );
  }

  if (input.communityTypes?.length) {
    conditions.push(inArray(communities.communityType, input.communityTypes));
  }

  const results = await db
    .select()
    .from(communities)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(communities.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(communities)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return {
    data: results,
    total: countResult[0]?.count ?? 0,
  };
}

async function searchOrganizations(input: any, offset: number, limit: number) {
  const conditions = [];

  if (input.query) {
    conditions.push(
      or(
        like(organizations.name, `%${input.query}%`),
        like(organizations.description, `%${input.query}%`)
      )!
    );
  }

  if (input.organizationTypes?.length) {
    conditions.push(
      inArray(organizations.organizationType, input.organizationTypes)
    );
  }

  const results = await db
    .select()
    .from(organizations)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(organizations.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(organizations)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return {
    data: results,
    total: countResult[0]?.count ?? 0,
  };
}

async function searchUsers(input: any, offset: number, limit: number) {
  const conditions = [];

  if (input.query) {
    conditions.push(
      or(
        like(userProfiles.firstName, `%${input.query}%`),
        like(userProfiles.lastName, `%${input.query}%`),
        like(userProfiles.displayName, `%${input.query}%`)
      )!
    );
  }

  if (input.ministryRoles?.length) {
    conditions.push(inArray(userProfiles.ministryRole, input.ministryRoles));
  }

  const results = await db
    .select()
    .from(userProfiles)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(userProfiles.createdAt))
    .limit(limit)
    .offset(offset);

  const countResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(userProfiles)
    .where(conditions.length > 0 ? and(...conditions) : undefined);

  return {
    data: results,
    total: countResult[0]?.count ?? 0,
  };
}
