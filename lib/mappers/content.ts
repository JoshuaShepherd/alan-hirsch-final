import type {
  contentItems,
  contentCategories,
  userProfiles,
} from '../db/schema';
import type {
  ContentItemResponse,
  ContentCategoryResponse,
  UserProfile,
  ContentCategory,
} from '../contracts';

// Drizzle row types
type ContentItemRow = typeof contentItems.$inferSelect;
type ContentCategoryRow = typeof contentCategories.$inferSelect;
type UserProfileRow = typeof userProfiles.$inferSelect;

/**
 * Content Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 */

// Helper function to format reading time
function formatReadingTime(minutes: number | null): string {
  if (!minutes || minutes === 0) return '0 min read';
  return `${minutes} min read`;
}

// Helper function to format view count
function formatViewCount(count: number | null): string {
  if (!count || count === 0) return '0 views';
  if (count < 1000) return `${count} views`;
  if (count < 1000000) return `${Math.round(count / 1000)}K views`;
  return `${Math.round(count / 1000000)}M views`;
}

/**
 * Map ContentItemRow to ContentItemResponse
 */
export function toContentItemResponseDTO(
  row: ContentItemRow,
  author?: UserProfile,
  category?: ContentCategoryResponse
): ContentItemResponse {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? '',
    content: row.content ?? '',
    authorId: row.authorId,
    coAuthors: (row.coAuthors as string[]) ?? [],
    contentType: row.contentType,
    format: row.format ?? 'text',
    wordCount: row.wordCount ?? 0,
    estimatedReadingTime: row.estimatedReadingTime ?? 0,
    viewCount: row.viewCount ?? 0,
    likeCount: row.likeCount ?? 0,
    shareCount: row.shareCount ?? 0,
    commentCount: row.commentCount ?? 0,
    bookmarkCount: row.bookmarkCount ?? 0,
    primaryCategoryId: row.primaryCategoryId ?? '',
    secondaryCategories: (row.secondaryCategories as string[]) ?? [],
    tags: (row.tags as string[]) ?? [],
    theologicalThemes: (row.theologicalThemes as string[]) ?? [],
    seriesId: row.seriesId ?? '',
    seriesOrder: row.seriesOrder ?? 0,
    visibility:
      (row.visibility === 'invite_only' ? 'private' : row.visibility) ??
      'public',
    status: row.status ?? 'draft',
    networkAmplificationScore: row.networkAmplificationScore ?? '',
    crossReferenceCount: row.crossReferenceCount ?? 0,
    aiEnhanced: row.aiEnhanced ?? false,
    aiSummary: row.aiSummary ?? '',
    aiKeyPoints: (row.aiKeyPoints as string[]) ?? [],
    featuredImageUrl: row.featuredImageUrl ?? '',
    videoUrl: row.videoUrl ?? '',
    audioUrl: row.audioUrl ?? '',
    attachments: Array.isArray(row.attachments)
      ? row.attachments.map((att: any) => att.url || att)
      : [],
    metaTitle: row.metaTitle ?? '',
    metaDescription: row.metaDescription ?? '',
    canonicalUrl: row.canonicalUrl ?? '',
    originalSource: row.originalSource ?? '',
    licenseType: row.licenseType ?? 'all_rights_reserved',
    attributionRequired: row.attributionRequired ?? false,

    // Computed fields for UI
    isPublished: row.status === 'published',
    isDraft: row.status === 'draft',
    isScheduled: row.status === 'scheduled',
    hasFeaturedImage: row.featuredImageUrl !== null,
    hasVideo: row.videoUrl !== null,
    hasAudio: row.audioUrl !== null,
    readingTimeText: formatReadingTime(row.estimatedReadingTime),
    viewCountText: formatViewCount(row.viewCount),
    isAiEnhanced: row.aiEnhanced ?? false,

    // Related data (if provided)
    author: author
      ? {
          id: author.id,
          firstName: author.firstName ?? '',
          lastName: author.lastName ?? '',
          displayName: author.displayName ?? '',
          avatarUrl: author.avatarUrl ?? '',
        }
      : undefined,
    category: category,

    // Timestamps (formatted as ISO strings)
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    publishedAt: row.publishedAt?.toISOString() ?? null,
    scheduledAt: row.scheduledAt?.toISOString() ?? null,
  };
}

/**
 * Map ContentCategoryRow to ContentCategoryResponse
 */
export function toContentCategoryResponseDTO(
  row: ContentCategoryRow
): ContentCategoryResponse {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? '',
    parentId: row.parentId ?? '',
    orderIndex: row.orderIndex ?? 0,
    theologicalDiscipline: row.theologicalDiscipline,
    movementRelevanceScore: row.movementRelevanceScore ?? 5,
    apestRelevance: (row.apestRelevance as {
      apostolic: number;
      prophetic: number;
      evangelistic: number;
      shepherding: number;
      teaching: number;
    }) ?? {
      apostolic: 5,
      prophetic: 5,
      evangelistic: 5,
      shepherding: 5,
      teaching: 5,
    },
    metaDescription: row.metaDescription ?? '',
    keywords: (row.keywords as string[]) ?? [],
    isActive: row.isActive ?? true,

    // Computed fields for UI
    hasParent: row.parentId !== null,
    hasChildren: false, // Would need to be populated separately

    // Timestamps (formatted as ISO strings)
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

/**
 * Map UserProfileRow to UserProfile (for content author)
 */
export function toUserProfileDTO(row: UserProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    firstName: row.firstName ?? '',
    lastName: row.lastName ?? '',
    displayName: row.displayName ?? '',
    avatarUrl: row.avatarUrl ?? '',
    bio: row.bio ?? '',
    countryCode: row.countryCode ?? '',
    timezone: row.timezone ?? '',
    languagePrimary: row.languagePrimary ?? 'en',
    ministryRole: row.ministryRole,
    denomination: row.denomination ?? '',
    organizationName: row.organizationName ?? '',
    yearsInMinistry: row.yearsInMinistry ?? 0,
    culturalContext: row.culturalContext ?? 'western',
    lastActiveAt: row.lastActiveAt,

    // Required properties for UserProfile type
    theologicalFocus: row.theologicalFocus ?? [],
    brandColors: row.brandColors ?? {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#059669',
    },
    emailNotifications: row.emailNotifications ?? {
      dailyDigest: true,
      collaborationRequests: true,
      revenueReports: true,
      communityUpdates: true,
    },
    privacySettings: row.privacySettings ?? {
      publicProfile: true,
      showAssessmentResults: false,
      allowNetworking: true,
      shareAnalytics: false,
    },
    onboardingCompleted: row.onboardingCompleted ?? false,
    onboardingStep: row.onboardingStep ?? 1,
    subscriptionTier: row.subscriptionTier ?? 'free',
    accountStatus: row.accountStatus ?? 'pending_verification',

    // Timestamps (keep as Date objects for UserProfile)
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/**
 * Map content item with author and category details
 */
export function toContentItemWithDetailsDTO(
  contentRow: ContentItemRow,
  authorRow?: UserProfileRow,
  categoryRow?: ContentCategoryRow
) {
  return toContentItemResponseDTO(
    contentRow,
    authorRow ? toUserProfileDTO(authorRow) : undefined,
    categoryRow ? toContentCategoryResponseDTO(categoryRow) : undefined
  );
}

/**
 * Map content series with author and category details
 */
export function toContentSeriesWithDetailsDTO(
  seriesRow: any,
  authorRow?: UserProfileRow,
  categoryRow?: ContentCategoryRow
) {
  return {
    id: seriesRow.id,
    title: seriesRow.title,
    slug: seriesRow.slug,
    description: seriesRow.description ?? '',
    excerpt: seriesRow.excerpt ?? '',
    authorId: seriesRow.authorId,
    collaborators: (seriesRow.collaborators as string[]) ?? [],
    seriesType: seriesRow.seriesType,
    difficulty: seriesRow.difficulty,
    totalItems: seriesRow.totalItems ?? 0,
    estimatedDuration: seriesRow.estimatedDuration ?? 0,
    primaryCategoryId: seriesRow.primaryCategoryId ?? '',
    tags: (seriesRow.tags as string[]) ?? [],
    visibility: seriesRow.visibility,
    status: seriesRow.status,
    featuredImageUrl: seriesRow.featuredImageUrl ?? '',
    metaDescription: seriesRow.metaDescription ?? '',

    // Computed fields for UI
    isPublished: seriesRow.status === 'published',
    isDraft: seriesRow.status === 'draft',
    hasFeaturedImage: seriesRow.featuredImageUrl !== null,

    // Related data (if provided)
    author: authorRow
      ? {
          id: authorRow.id,
          firstName: authorRow.firstName ?? '',
          lastName: authorRow.lastName ?? '',
          displayName: authorRow.displayName ?? '',
          avatarUrl: authorRow.avatarUrl ?? '',
        }
      : undefined,
    category: categoryRow
      ? toContentCategoryResponseDTO(categoryRow)
      : undefined,

    // Timestamps (formatted as ISO strings)
    createdAt: seriesRow.createdAt.toISOString(),
    updatedAt: seriesRow.updatedAt.toISOString(),
    publishedAt: seriesRow.publishedAt?.toISOString() ?? null,
  };
}
