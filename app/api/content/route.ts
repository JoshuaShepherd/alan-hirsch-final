import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import {
  contentItemSchema,
  newContentItemSchema,
  paginatedContentItemListResponseSchema,
  contentItemResponseSchema,
} from '@/lib/contracts';
import { contentItems, userProfiles, contentCategories } from '@/lib/db/schema';
import {
  toContentItemResponseDTO,
  toContentItemWithDetailsDTO,
} from '@/lib/mappers/content';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import { z } from 'zod';

// Input schema for content search
const contentSearchInputSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
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
export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const input = contentSearchInputSchema.parse(queryParams);
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
    const offset = (page - 1) * limit;

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
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(contentItems)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const mappedItems = items.map(item => toContentItemResponseDTO(item));
    const total = countResult[0]?.count || 0;

    // Create standardized response
    const response = {
      items: {
        data: mappedItems,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasNext: page < Math.ceil(total / limit),
          hasPrev: page > 1,
        },
      },
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse =
      paginatedContentItemListResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('GET /api/content error:', error);

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

// POST /api/content - Create new content item
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const input = newContentItemSchema.parse(body);

    // TODO: Add authentication check
    // For now, we'll need to get user from session/auth
    const user = { id: 'temp-user-id' }; // This should come from auth
    const db = await import('@/lib/db/drizzle').then(m => m.db);
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
      return NextResponse.json(
        { error: 'Failed to create content item' },
        { status: 500 }
      );
    }

    const newContent = insertedContent[0];
    if (!newContent) {
      return NextResponse.json(
        { error: 'Failed to create content item' },
        { status: 500 }
      );
    }

    const mappedContent = toContentItemResponseDTO(newContent);

    // Create standardized response
    const response = {
      data: mappedContent,
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = contentItemResponseSchema.parse(response);

    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('POST /api/content error:', error);

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
