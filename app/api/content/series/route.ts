import {
  createPaginatedApiRoute,
  paginationInputSchema,
} from '@/lib/api/utils';
import {
  contentSeriesSchema,
  newContentSeriesSchema,
  ContentSeriesRow,
} from '@/lib/contracts';
import {
  contentSeries,
  userProfiles,
  contentCategories,
} from '@/lib/db/schema';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Mapper function to convert Drizzle row to DTO
const mapContentSeriesRow = (row: any) => contentSeriesSchema.parse(row);

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
  contentSeriesSchema.extend({
    author: z
      .object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        displayName: z.string().optional(),
        avatarUrl: z.string().optional(),
      })
      .optional(),
    category: z
      .object({
        id: z.string(),
        name: z.string(),
        slug: z.string(),
      })
      .optional(),
  }),
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

    return {
      items: series.map(mapContentSeriesRow),
      total: countResult[0]?.count || 0,
    };
  }
);

// POST /api/content/series - Create new content series
export const POST = createPaginatedApiRoute(
  newContentSeriesSchema,
  contentSeriesSchema,
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

    return {
      items: [mapContentSeriesRow(newSeries)],
      total: 1,
    };
  }
);
