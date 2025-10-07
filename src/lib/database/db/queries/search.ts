// Search Query Module
// Advanced search and filtering with ministry-specific criteria

import { and, asc, count, desc, eq, like, or, sql } from 'drizzle-orm';
import { db } from '../drizzle';
import {
  assessments,
  communities,
  contentItems,
  organizations,
  userProfiles,
} from '../schema';
import type { Ctx } from './_ctx';

// ============================================================================
// SEARCH TYPES
// ============================================================================

export interface SearchFilters {
  // Content filters
  contentType?: string;
  categoryId?: string;
  authorId?: string;
  status?: 'draft' | 'published' | 'scheduled' | 'archived';
  visibility?: 'public' | 'private' | 'organization';

  // User filters
  ministryRole?: string;
  denomination?: string;
  countryCode?: string;
  culturalContext?: string;
  leaderTier?: string;

  // Community filters
  communityType?: string;
  languagePrimary?: string;

  // Assessment filters
  assessmentType?: string;
  primaryGift?: string;
  secondaryGift?: string;

  // Organization filters
  organizationType?: string;
  sizeCategory?: string;

  // Date filters
  dateFrom?: Date;
  dateTo?: Date;

  // Pagination
  limit?: number;
  offset?: number;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
}

export interface SearchResult<T> {
  results: T[];
  total: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

// ============================================================================
// GLOBAL SEARCH
// ============================================================================

/**
 * Global search across all entities
 */
export async function globalSearch(
  searchTerm: string,
  context: Ctx,
  filters: SearchFilters = {}
): Promise<{
  users: SearchResult<any>;
  content: SearchResult<any>;
  communities: SearchResult<any>;
  organizations: SearchResult<any>;
  assessments: SearchResult<any>;
}> {
  const [users, content, communities, organizations, assessments] =
    await Promise.all([
      searchUsers(searchTerm, context, filters),
      searchContent(searchTerm, context, filters),
      searchCommunities(searchTerm, context, filters),
      searchOrganizations(searchTerm, context, filters),
      searchAssessments(searchTerm, context, filters),
    ]);

  return {
    users,
    content,
    communities,
    organizations,
    assessments,
  };
}

// ============================================================================
// USER SEARCH
// ============================================================================

/**
 * Search users with ministry-specific criteria
 */
export async function searchUsers(
  searchTerm: string,
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof userProfiles.$inferSelect>> {
  const {
    ministryRole,
    denomination,
    countryCode,
    culturalContext,
    leaderTier,
    limit = 20,
    offset = 0,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = filters;

  const conditions = [
    or(
      like(userProfiles.firstName, `%${searchTerm}%`),
      like(userProfiles.lastName, `%${searchTerm}%`),
      like(userProfiles.displayName, `%${searchTerm}%`),
      like(userProfiles.email, `%${searchTerm}%`),
      like(userProfiles.organizationName, `%${searchTerm}%`)
    ),
    eq(userProfiles.accountStatus, 'active'),
  ];

  if (ministryRole) {
    conditions.push(eq(userProfiles.ministryRole, ministryRole as any));
  }
  if (denomination) {
    conditions.push(eq(userProfiles.denomination, denomination));
  }
  if (countryCode) {
    conditions.push(eq(userProfiles.countryCode, countryCode));
  }
  if (culturalContext) {
    conditions.push(eq(userProfiles.culturalContext, culturalContext as any));
  }
  if (leaderTier) {
    conditions.push(eq(userProfiles.leaderTier, leaderTier as any));
  }

  // Add context-based filtering
  if (context.tenantId) {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE user_id = user_profiles.id
        AND organization_id = ${context.tenantId}
        AND status = 'active'
      )`
    );
  }

  const orderByField =
    {
      created_at: userProfiles.createdAt,
      last_active_at: userProfiles.lastActiveAt,
      display_name: userProfiles.displayName,
    }[orderBy] || userProfiles.createdAt;

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(userProfiles)
      .where(and(...conditions))
      .orderBy(orderDirectionFn(orderByField))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(userProfiles)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

// ============================================================================
// CONTENT SEARCH
// ============================================================================

/**
 * Search content with ministry-specific criteria
 */
export async function searchContent(
  searchTerm: string,
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof contentItems.$inferSelect>> {
  const {
    contentType,
    categoryId,
    authorId,
    status = 'published',
    visibility = 'public',
    dateFrom,
    dateTo,
    limit = 20,
    offset = 0,
    orderBy = 'published_at',
    orderDirection = 'desc',
  } = filters;

  const conditions = [
    or(
      like(contentItems.title, `%${searchTerm}%`),
      like(contentItems.excerpt, `%${searchTerm}%`),
      like(contentItems.content, `%${searchTerm}%`),
      like(contentItems.aiSummary, `%${searchTerm}%`)
    ),
    eq(contentItems.status, status),
    eq(contentItems.visibility, visibility),
  ];

  if (contentType) {
    conditions.push(eq(contentItems.contentType, contentType as any));
  }
  if (categoryId) {
    conditions.push(eq(contentItems.primaryCategoryId, categoryId));
  }
  if (authorId) {
    conditions.push(eq(contentItems.authorId, authorId));
  }
  if (dateFrom) {
    conditions.push(sql`${contentItems.publishedAt} >= ${dateFrom}`);
  }
  if (dateTo) {
    conditions.push(sql`${contentItems.publishedAt} <= ${dateTo}`);
  }

  // Add context-based filtering for draft content
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      or(
        eq(contentItems.status, 'published'),
        and(
          eq(contentItems.status, 'draft'),
          eq(contentItems.authorId, context.userId)
        )
      )
    );
  }

  const orderByField =
    {
      published_at: contentItems.publishedAt,
      created_at: contentItems.createdAt,
      view_count: contentItems.viewCount,
      like_count: contentItems.likeCount,
      title: contentItems.title,
    }[orderBy] || contentItems.publishedAt;

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(contentItems)
      .where(and(...conditions))
      .orderBy(orderDirectionFn(orderByField))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(contentItems)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

// ============================================================================
// COMMUNITY SEARCH
// ============================================================================

/**
 * Search communities with ministry-specific criteria
 */
export async function searchCommunities(
  searchTerm: string,
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof communities.$inferSelect>> {
  const {
    communityType,
    languagePrimary,
    limit = 20,
    offset = 0,
    orderBy = 'current_member_count',
    orderDirection = 'desc',
  } = filters;

  const conditions = [
    or(
      like(communities.name, `%${searchTerm}%`),
      like(communities.description, `%${searchTerm}%`)
    ),
    eq(communities.visibility, 'public'),
    eq(communities.isActive, true),
  ];

  if (communityType) {
    conditions.push(eq(communities.communityType, communityType as any));
  }
  if (languagePrimary) {
    conditions.push(eq(communities.languagePrimary, languagePrimary));
  }

  // Add context-based filtering for private communities
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      or(
        eq(communities.visibility, 'public'),
        sql`EXISTS (
          SELECT 1 FROM community_memberships
          WHERE community_id = communities.id
          AND user_id = ${context.userId}
          AND status = 'active'
        )`
      )
    );
  }

  const orderByField =
    {
      current_member_count: communities.currentMemberCount,
      total_posts_count: communities.totalPostsCount,
      created_at: communities.createdAt,
      name: communities.name,
    }[orderBy] || communities.currentMemberCount;

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(communities)
      .where(and(...conditions))
      .orderBy(orderDirectionFn(orderByField))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(communities)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

// ============================================================================
// ORGANIZATION SEARCH
// ============================================================================

/**
 * Search organizations with ministry-specific criteria
 */
export async function searchOrganizations(
  searchTerm: string,
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof organizations.$inferSelect>> {
  const {
    organizationType,
    sizeCategory,
    limit = 20,
    offset = 0,
    orderBy = 'created_at',
    orderDirection = 'desc',
  } = filters;

  const conditions = [
    or(
      like(organizations.name, `%${searchTerm}%`),
      like(organizations.description, `%${searchTerm}%`)
    ),
    eq(organizations.status, 'active'),
  ];

  if (organizationType) {
    conditions.push(
      eq(organizations.organizationType, organizationType as any)
    );
  }
  if (sizeCategory) {
    conditions.push(eq(organizations.sizeCategory, sizeCategory as any));
  }

  // Add context-based filtering for non-admin users
  if (context.userId && context.role !== 'admin') {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE organization_id = organizations.id
        AND user_id = ${context.userId}
        AND status = 'active'
      )`
    );
  }

  const orderByField =
    {
      created_at: organizations.createdAt,
      name: organizations.name,
    }[orderBy] || organizations.createdAt;

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(organizations)
      .where(and(...conditions))
      .orderBy(orderDirectionFn(orderByField))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(organizations)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

// ============================================================================
// ASSESSMENT SEARCH
// ============================================================================

/**
 * Search assessments with ministry-specific criteria
 */
export async function searchAssessments(
  searchTerm: string,
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof assessments.$inferSelect>> {
  const {
    assessmentType,
    limit = 20,
    offset = 0,
    orderBy = 'published_at',
    orderDirection = 'desc',
  } = filters;

  const conditions = [
    or(
      like(assessments.name, `%${searchTerm}%`),
      like(assessments.description, `%${searchTerm}%`)
    ),
    eq(assessments.status, 'active'),
  ];

  if (assessmentType) {
    conditions.push(eq(assessments.assessmentType, assessmentType as any));
  }

  const orderByField =
    {
      published_at: assessments.publishedAt,
      created_at: assessments.createdAt,
      name: assessments.name,
    }[orderBy] || assessments.publishedAt;

  const orderDirectionFn = orderDirection === 'asc' ? asc : desc;

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(assessments)
      .where(and(...conditions))
      .orderBy(orderDirectionFn(orderByField))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(assessments)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

// ============================================================================
// ADVANCED SEARCH
// ============================================================================

/**
 * Search users by APEST profile
 */
export async function searchUsersByApestProfile(
  filters: {
    primaryGift?: string;
    secondaryGift?: string;
    minMovementAlignment?: number;
    maxMovementAlignment?: number;
    minAudienceEngagement?: number;
    maxAudienceEngagement?: number;
    leaderTier?: string;
    limit?: number;
    offset?: number;
  },
  context: Ctx
): Promise<SearchResult<typeof userProfiles.$inferSelect>> {
  const {
    primaryGift,
    secondaryGift,
    minMovementAlignment,
    maxMovementAlignment,
    minAudienceEngagement,
    maxAudienceEngagement,
    leaderTier,
    limit = 20,
    offset = 0,
  } = filters;

  const conditions = [eq(userProfiles.accountStatus, 'active')];

  if (primaryGift) {
    conditions.push(
      sql`${userProfiles.assessmentMovementAlignment} IS NOT NULL`
    );
  }
  if (secondaryGift) {
    conditions.push(
      sql`${userProfiles.assessmentAudienceEngagement} IS NOT NULL`
    );
  }
  if (minMovementAlignment !== undefined) {
    conditions.push(
      sql`${userProfiles.assessmentMovementAlignment} >= ${minMovementAlignment}`
    );
  }
  if (maxMovementAlignment !== undefined) {
    conditions.push(
      sql`${userProfiles.assessmentMovementAlignment} <= ${maxMovementAlignment}`
    );
  }
  if (minAudienceEngagement !== undefined) {
    conditions.push(
      sql`${userProfiles.assessmentAudienceEngagement} >= ${minAudienceEngagement}`
    );
  }
  if (maxAudienceEngagement !== undefined) {
    conditions.push(
      sql`${userProfiles.assessmentAudienceEngagement} <= ${maxAudienceEngagement}`
    );
  }
  if (leaderTier) {
    conditions.push(eq(userProfiles.leaderTier, leaderTier as any));
  }

  // Add context-based filtering
  if (context.tenantId) {
    conditions.push(
      sql`EXISTS (
        SELECT 1 FROM organization_memberships
        WHERE user_id = user_profiles.id
        AND organization_id = ${context.tenantId}
        AND status = 'active'
      )`
    );
  }

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(userProfiles)
      .where(and(...conditions))
      .orderBy(desc(userProfiles.assessmentTotal))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(userProfiles)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

/**
 * Search content by theological themes
 */
export async function searchContentByTheologicalThemes(
  themes: string[],
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof contentItems.$inferSelect>> {
  const { limit = 20, offset = 0 } = filters;

  const conditions = [
    sql`${contentItems.theologicalThemes} ?| ${themes}`,
    eq(contentItems.status, 'published'),
    eq(contentItems.visibility, 'public'),
  ];

  // Add context-based filtering for draft content
  if (context.userId && context.role !== 'admin') {
    const publishedCondition = eq(contentItems.status, 'published');
    const draftCondition = and(
      eq(contentItems.status, 'draft'),
      eq(contentItems.authorId, context.userId)
    );
    const combinedCondition = or(publishedCondition, draftCondition);
    if (combinedCondition) {
      conditions.push(combinedCondition);
    }
  }

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(contentItems)
      .where(and(...conditions))
      .orderBy(desc(contentItems.publishedAt))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(contentItems)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}

/**
 * Search communities by cultural context
 */
export async function searchCommunitiesByCulturalContext(
  culturalContexts: string[],
  context: Ctx,
  filters: SearchFilters = {}
): Promise<SearchResult<typeof communities.$inferSelect>> {
  const { limit = 20, offset = 0 } = filters;

  const conditions = [
    sql`${communities.culturalContext} = ANY(${culturalContexts})`,
    eq(communities.visibility, 'public'),
    eq(communities.isActive, true),
  ];

  const [results, totalCount] = await Promise.all([
    db
      .select()
      .from(communities)
      .where(and(...conditions))
      .orderBy(desc(communities.currentMemberCount))
      .limit(limit)
      .offset(offset),

    db
      .select({ count: count() })
      .from(communities)
      .where(and(...conditions))
      .then(result => result[0]?.count ?? 0),
  ]);

  return {
    results,
    total: totalCount,
    hasMore: offset + limit < totalCount,
    page: Math.floor(offset / limit) + 1,
    limit,
  };
}
