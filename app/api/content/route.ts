import {
  createPaginatedApiRoute,
  paginationInputSchema,
} from '@/lib/api/utils';
import {
  contentItemSchema,
  newContentItemSchema,
  ContentItemRow,
  ContentRowDTO,
  contentItemListResponseSchema,
  contentItemResponseSchema,
} from '@/lib/contracts';
import { contentItems, userProfiles, contentCategories } from '@/lib/db/schema';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Mapper function to convert Drizzle row to DTO with null handling
const mapContentItemRow = (row: any) => {
  const mapped = {
    ...row,
    // Handle null values with sensible defaults
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    wordCount: row.wordCount ?? 0,
    estimatedReadingTime: row.estimatedReadingTime ?? 0,
    author: {
      ...row.author,
      displayName: row.author?.displayName ?? null,
      avatarUrl: row.author?.avatarUrl ?? null,
    },
    category: row.category
      ? {
          ...row.category,
        }
      : null,
  };
  return contentItemSchema.parse(mapped);
};

// Input schema for content search
const contentSearchInputSchema = paginationInputSchema.extend({
  search: z.string().optional(),
  contentType: z
    .enum([
      'article',
      'video',
      'podcast',
      'framework',
      'tool',
      'case_study',
      'interview',
      'course_lesson',
    ])
    .optional(),
  status: z
    .enum(['draft', 'published', 'archived', 'under_review', 'scheduled'])
    .default('published'),
  visibility: z
    .enum(['public', 'premium', 'vip', 'private', 'organization'])
    .optional(),
  categoryId: z.string().uuid().optional(),
  authorId: z.string().uuid().optional(),
  tags: z.array(z.string()).optional(),
  theologicalThemes: z.array(z.string()).optional(),
  seriesId: z.string().uuid().optional(),
});

// GET /api/content - Get content items with search and filtering
export const GET = createPaginatedApiRoute(
  contentSearchInputSchema,
  contentItemListResponseSchema,
  async (input, { user, db }) => {
    const {
      page,
      limit,
      search,
      contentType,
      status,
      visibility,
      categoryId,
      authorId,
      tags,
      theologicalThemes,
      seriesId,
    } = input;
    const offset = ((page || 1) - 1) * (limit || 20);

    // Build where conditions
    const conditions = [];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(contentItems.title, `%${search}%`),
          like(contentItems.excerpt, `%${search}%`),
          like(contentItems.content, `%${search}%`)
        )!
      );
    }

    // Add filter conditions
    if (contentType) {
      conditions.push(eq(contentItems.contentType, contentType));
    }
    if (status) {
      conditions.push(eq(contentItems.status, status));
    }
    if (visibility) {
      conditions.push(eq(contentItems.visibility, visibility));
    }
    if (categoryId) {
      conditions.push(eq(contentItems.primaryCategoryId, categoryId));
    }
    if (authorId) {
      conditions.push(eq(contentItems.authorId, authorId));
    }
    if (seriesId) {
      conditions.push(eq(contentItems.seriesId, seriesId));
    }

    // Get content items with author and category details
    const items = await db
      .select({
        id: contentItems.id,
        title: contentItems.title,
        slug: contentItems.slug,
        excerpt: contentItems.excerpt,
        content: contentItems.content,
        authorId: contentItems.authorId,
        coAuthors: contentItems.coAuthors,
        contentType: contentItems.contentType,
        format: contentItems.format,
        wordCount: contentItems.wordCount,
        estimatedReadingTime: contentItems.estimatedReadingTime,
        viewCount: contentItems.viewCount,
        likeCount: contentItems.likeCount,
        shareCount: contentItems.shareCount,
        commentCount: contentItems.commentCount,
        bookmarkCount: contentItems.bookmarkCount,
        primaryCategoryId: contentItems.primaryCategoryId,
        secondaryCategories: contentItems.secondaryCategories,
        tags: contentItems.tags,
        theologicalThemes: contentItems.theologicalThemes,
        seriesId: contentItems.seriesId,
        seriesOrder: contentItems.seriesOrder,
        visibility: contentItems.visibility,
        status: contentItems.status,
        networkAmplificationScore: contentItems.networkAmplificationScore,
        crossReferenceCount: contentItems.crossReferenceCount,
        aiEnhanced: contentItems.aiEnhanced,
        aiSummary: contentItems.aiSummary,
        aiKeyPoints: contentItems.aiKeyPoints,
        featuredImageUrl: contentItems.featuredImageUrl,
        videoUrl: contentItems.videoUrl,
        audioUrl: contentItems.audioUrl,
        attachments: contentItems.attachments,
        metaTitle: contentItems.metaTitle,
        metaDescription: contentItems.metaDescription,
        canonicalUrl: contentItems.canonicalUrl,
        originalSource: contentItems.originalSource,
        licenseType: contentItems.licenseType,
        attributionRequired: contentItems.attributionRequired,
        createdAt: contentItems.createdAt,
        updatedAt: contentItems.updatedAt,
        publishedAt: contentItems.publishedAt,
        scheduledAt: contentItems.scheduledAt,
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
      .from(contentItems)
      .leftJoin(userProfiles, eq(contentItems.authorId, userProfiles.id))
      .leftJoin(
        contentCategories,
        eq(contentItems.primaryCategoryId, contentCategories.id)
      )
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(contentItems.publishedAt))
      .limit(limit || 20)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contentItems)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const mappedItems = items.map(mapContentItemRow);
    const total = countResult[0]?.count || 0;

    // Create standardized response
    return {
      items: mappedItems,
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

// POST /api/content - Create new content item
export const POST = createPaginatedApiRoute(
  newContentItemSchema,
  contentItemResponseSchema,
  async (input, { user, db }) => {
    const insertedContent = await db
      .insert(contentItems)
      .values({
        ...input,
        authorId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        networkAmplificationScore: input.networkAmplificationScore?.toString(),
      })
      .returning();

    // Ensure we have valid content
    if (!insertedContent || insertedContent.length === 0) {
      throw new Error('Failed to create content item');
    }

    const newContent = insertedContent[0];

    const mappedContent = mapContentItemRow(newContent);

    // Create standardized response
    return {
      data: mappedContent,
      success: true,
    };
  }
);
