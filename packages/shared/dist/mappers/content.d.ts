import type { contentItems, contentCategories, userProfiles } from '../db/schema';
import type { ContentItemResponse, ContentCategoryResponse, UserProfile } from '../contracts';
type ContentItemRow = typeof contentItems.$inferSelect;
type ContentCategoryRow = typeof contentCategories.$inferSelect;
type UserProfileRow = typeof userProfiles.$inferSelect;
/**
 * Map ContentItemRow to ContentItemResponse
 */
export declare function toContentItemResponseDTO(row: ContentItemRow, author?: UserProfile, category?: ContentCategoryResponse): ContentItemResponse;
/**
 * Map ContentCategoryRow to ContentCategoryResponse
 */
export declare function toContentCategoryResponseDTO(row: ContentCategoryRow): ContentCategoryResponse;
/**
 * Map UserProfileRow to UserProfile (for content author)
 */
export declare function toUserProfileDTO(row: UserProfileRow): UserProfile;
/**
 * Map content item with author and category details
 */
export declare function toContentItemWithDetailsDTO(contentRow: ContentItemRow, authorRow?: UserProfileRow, categoryRow?: ContentCategoryRow): {
    id: string;
    slug: string;
    status: "draft" | "published" | "archived" | "under_review" | "scheduled";
    metaDescription: string;
    createdAt: string;
    updatedAt: string;
    title: string;
    excerpt: string;
    content: string;
    authorId: string;
    coAuthors: string[];
    contentType: "article" | "video" | "podcast" | "framework" | "tool" | "case_study" | "interview" | "course_lesson";
    format: "video" | "text" | "audio" | "interactive" | "pdf" | "presentation";
    wordCount: number;
    estimatedReadingTime: number;
    viewCount: number;
    likeCount: number;
    shareCount: number;
    commentCount: number;
    bookmarkCount: number;
    primaryCategoryId: string;
    secondaryCategories: string[];
    tags: string[];
    theologicalThemes: string[];
    seriesId: string;
    seriesOrder: number;
    visibility: "public" | "premium" | "vip" | "private" | "organization";
    networkAmplificationScore: string;
    crossReferenceCount: number;
    aiEnhanced: boolean;
    aiSummary: string;
    aiKeyPoints: string[];
    featuredImageUrl: string;
    videoUrl: string;
    audioUrl: string;
    attachments: string[];
    metaTitle: string;
    canonicalUrl: string;
    originalSource: string;
    licenseType: "all_rights_reserved" | "creative_commons" | "public_domain" | "fair_use";
    attributionRequired: boolean;
    isPublished: boolean;
    isDraft: boolean;
    isScheduled: boolean;
    hasFeaturedImage: boolean;
    hasVideo: boolean;
    hasAudio: boolean;
    readingTimeText: string;
    viewCountText: string;
    isAiEnhanced: boolean;
    publishedAt: string | null;
    scheduledAt: string | null;
    author?: {
        id: string;
        firstName: string;
        lastName: string;
        displayName: string;
        avatarUrl: string;
    } | undefined;
    category?: {
        name: string;
        id: string;
        slug: string;
    } | undefined;
};
/**
 * Map content series with author and category details
 */
export declare function toContentSeriesWithDetailsDTO(seriesRow: any, authorRow?: UserProfileRow, categoryRow?: ContentCategoryRow): {
    id: any;
    title: any;
    slug: any;
    description: any;
    excerpt: any;
    authorId: any;
    collaborators: string[];
    seriesType: any;
    difficulty: any;
    totalItems: any;
    estimatedDuration: any;
    primaryCategoryId: any;
    tags: string[];
    visibility: any;
    status: any;
    featuredImageUrl: any;
    metaDescription: any;
    isPublished: boolean;
    isDraft: boolean;
    hasFeaturedImage: boolean;
    author: {
        id: any;
        firstName: any;
        lastName: any;
        displayName: any;
        avatarUrl: any;
    } | undefined;
    category: {
        name: string;
        id: string;
        slug: string;
        description: string;
        parentId: string;
        orderIndex: number;
        theologicalDiscipline: "systematic" | "biblical" | "practical" | "historical" | "philosophical" | "missional" | "pastoral";
        movementRelevanceScore: number;
        apestRelevance: {
            apostolic: number;
            prophetic: number;
            evangelistic: number;
            shepherding: number;
            teaching: number;
        };
        metaDescription: string;
        keywords: string[];
        isActive: boolean;
        hasParent: boolean;
        hasChildren: boolean;
        createdAt: string;
        updatedAt: string;
    } | undefined;
    createdAt: any;
    updatedAt: any;
    publishedAt: any;
};
export {};
//# sourceMappingURL=content.d.ts.map