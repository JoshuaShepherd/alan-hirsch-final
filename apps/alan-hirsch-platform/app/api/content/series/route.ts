import {
  createPaginatedApiRoute,
  paginationInputSchema,
  createApiRoute,
} from '@platform/shared/api/utils';
import {
  contentSeriesSchema,
  newContentSeriesSchema,
  paginatedContentSeriesListResponseSchema,
  contentSeriesResponseSchema,
} from '@platform/shared/contracts';
import {
  contentSeries,
  userProfiles,
  contentCategories,
} from '@platform/database/schema';
import { toContentSeriesWithDetailsDTO } from '@/lib/mappers/content';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Input schema for series search
const seriesSearchInputSchema = paginationInputSchema.extend({
  search: z.string().optional(),
  seriesType: z
    .enum([
      'course',
      'learning_path',
      'book_series',
      'podcast_series',
      'video_series',
      'framework',
    ])
    .optional(),
  difficulty: z
    .enum(['beginner', 'intermediate', 'advanced', 'expert'])
    .optional(),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review'])
    .default('published'),
  visibility: z
    .enum(['public', 'premium', 'vip', 'private', 'organization'])
    .optional(),
  authorId: z.string().uuid().optional(),
  categoryId: z.string().uuid().optional(),
});

// GET /api/content/series - Get content series
export const GET = createPaginatedApiRoute(
  seriesSearchInputSchema,
  paginatedContentSeriesListResponseSchema,
  async (input, { user, db }) => {
    const {
      page,
      limit,
      search,
      seriesType,
      difficulty,
      status,
      visibility,
      authorId,
      categoryId,
    } = input;
    const offset = ((page || 1) - 1) * (limit || 20);

    // Build where conditions
    const conditions = [];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(contentSeries.title, `%${search}%`),
          like(contentSeries.description, `%${search}%`),
          like(contentSeries.excerpt, `%${search}%`)
        )!
      );
    }

    // Add filter conditions
    if (seriesType) {
      conditions.push(eq(contentSeries.seriesType, seriesType));
    }
    if (difficulty) {
      conditions.push(eq(contentSeries.difficulty, difficulty));
    }
    if (status) {
      conditions.push(eq(contentSeries.status, status));
    }
    if (visibility) {
      conditions.push(eq(contentSeries.visibility, visibility));
    }
    if (authorId) {
      conditions.push(eq(contentSeries.authorId, authorId));
    }
    if (categoryId) {
      conditions.push(eq(contentSeries.primaryCategoryId, categoryId));
    }

    // Get series with author and category details
    const series = await db
      .select({
        id: contentSeries.id,
        title: contentSeries.title,
        slug: contentSeries.slug,
        description: contentSeries.description,
        excerpt: contentSeries.excerpt,
        authorId: contentSeries.authorId,
        collaborators: contentSeries.collaborators,
        seriesType: contentSeries.seriesType,
        difficulty: contentSeries.difficulty,
        totalItems: contentSeries.totalItems,
        estimatedDuration: contentSeries.estimatedDuration,
        primaryCategoryId: contentSeries.primaryCategoryId,
        tags: contentSeries.tags,
        visibility: contentSeries.visibility,
        status: contentSeries.status,
        featuredImageUrl: contentSeries.featuredImageUrl,
        metaDescription: contentSeries.metaDescription,
        createdAt: contentSeries.createdAt,
        updatedAt: contentSeries.updatedAt,
        publishedAt: contentSeries.publishedAt,
        author: {
          id: userProfiles.id,
          firstName: userProfiles.firstName,
          lastName: userProfiles.lastName,
          displayName: userProfiles.displayName,
          avatarUrl: userProfiles.avatarUrl,
        },
        category: {
          id: contentCategories.id,
          name: contentCategories.name,
          slug: contentCategories.slug,
        },
      })
      .from(contentSeries)
      .leftJoin(userProfiles, eq(contentSeries.authorId, userProfiles.id))
      .leftJoin(
        contentCategories,
        eq(contentSeries.primaryCategoryId, contentCategories.id)
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(contentSeries.publishedAt))
      .limit(limit || 20)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contentSeries)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const mappedSeries = series.map(seriesItem =>
      toContentSeriesWithDetailsDTO(
        seriesItem,
        seriesItem.author
          ? {
              id: seriesItem.author.id,
              firstName: seriesItem.author.firstName,
              lastName: seriesItem.author.lastName,
              displayName: seriesItem.author.displayName,
              avatarUrl: seriesItem.author.avatarUrl,
              ministryRole: 'other' as const,
              email: '',
              bio: null,
              denomination: null,
              organizationName: null,
              yearsInMinistry: null,
              countryCode: null,
              timezone: null,
              languagePrimary: 'en',
              culturalContext: null,
              assessmentMovementAlignment: null,
              assessmentAudienceEngagement: null,
              assessmentContentReadiness: null,
              assessmentRevenuePotential: null,
              assessmentNetworkEffects: null,
              assessmentStrategicFit: null,
              assessmentTotal: null,
              leaderTier: null,
              subdomain: null,
              customDomain: null,
              platformTitle: null,
              subscriptionTier: 'free' as const,
              theologicalFocus: [],
              brandColors: {
                primary: '#2563eb',
                secondary: '#64748b',
                accent: '#059669',
              },
              emailNotifications: {
                dailyDigest: true,
                collaborationRequests: true,
                revenueReports: true,
                communityUpdates: true,
              },
              privacySettings: {
                publicProfile: true,
                showAssessmentResults: false,
                allowNetworking: true,
                shareAnalytics: false,
              },
              onboardingCompleted: false,
              onboardingStep: 1,
              accountStatus: 'active' as const,
              createdAt: new Date(),
              updatedAt: new Date(),
              lastActiveAt: new Date(),
            }
          : undefined,
        seriesItem.category
          ? {
              id: seriesItem.category.id,
              name: seriesItem.category.name,
              slug: seriesItem.category.slug,
              description: '',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              orderIndex: 0,
              metaDescription: '',
              parentId: '',
              theologicalDiscipline: 'systematic' as const,
              keywords: [],
              hasChildren: false,
            }
          : undefined
      )
    );
    const total = countResult[0]?.count || 0;

    // Create standardized response
    return {
      items: mappedSeries,
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

// POST /api/content/series - Create new content series
export const POST = createApiRoute(
  newContentSeriesSchema,
  contentSeriesResponseSchema,
  async (input, { user, db }) => {
    const insertedSeries = await db
      .insert(contentSeries)
      .values({
        ...input,
        authorId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Ensure we have valid series
    if (!insertedSeries || insertedSeries.length === 0) {
      throw new Error('Failed to create content series');
    }

    const newSeries = insertedSeries[0];

    // Get the author profile for the response
    const authorProfile = await db
      .select()
      .from(userProfiles)
      .where(eq(userProfiles.id, user.id))
      .limit(1);

    const mappedSeries = toContentSeriesWithDetailsDTO(
      newSeries,
      authorProfile[0],
      undefined // No category for now
    );

    return mappedSeries;
  }
);
