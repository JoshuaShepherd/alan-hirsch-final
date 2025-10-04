import { createMinistryRouteHandler } from '@platform/shared/api/ministry-route-handler';
import {
  ministryPlatformResponseSchema,
  ministryPlatformSearchRequestSchema,
} from '@platform/shared/contracts';
import { db } from '@platform/database/drizzle';
import {
  assessments,
  communities,
  contentItems,
  organizations,
  userProfiles,
} from '@platform/database/schema';
import { and, desc, inArray, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// ============================================================================
// MINISTRY PLATFORM SEARCH & DISCOVERY API
// ============================================================================

// GET /api/ministry - Unified ministry platform search and discovery
export const GET = createMinistryRouteHandler({
  inputSchema: ministryPlatformSearchRequestSchema,
  outputSchema: ministryPlatformResponseSchema(
    z.object({
      assessments: z.array(z.any()),
      content: z.array(z.any()),
      communities: z.array(z.any()),
      organizations: z.array(z.any()),
      users: z.array(z.any()),
      totalResults: z.number(),
    })
  ),
  method: 'GET',
  handler: async (input, context) => {
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
    } = input;

    const offset = (page - 1) * limit;

    // Build search results across all ministry platform entities
    const searchResults = await Promise.all([
      searchAssessments(input, offset, limit),
      searchContent(input, offset, limit),
      searchCommunities(input, offset, limit),
      searchOrganizations(input, offset, limit),
      searchUsers(input, offset, limit),
    ]);

    const [assessments, content, communities, organizations, users] =
      searchResults;

    // Combine and rank results based on ministry relevance
    const combinedResults = {
      assessments: assessments.data,
      content: content.data,
      communities: communities.data,
      organizations: organizations.data,
      users: users.data,
      totalResults:
        assessments.total +
        content.total +
        communities.total +
        organizations.total +
        users.total,
    };

    return combinedResults;
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
