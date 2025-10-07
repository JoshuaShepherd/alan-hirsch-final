// Auto-generated types for api
// Generated at: 2025-10-06T16:27:57.959Z

import type { ContentStatus, ContentType } from '../common';

export interface ContentItemRequest {
  title: string;
  slug: string;
  content: string;
  contentType: ContentType;
  status: ContentStatus;
  categoryId: string | undefined;
  seriesId: string | undefined;
  tags: string[] | undefined;
  metaDescription: string | undefined;
  readingTimeMinutes: number | undefined;
}

export interface ContentItemResponse {
  id: string;
  title: string;
  slug: string;
  content: string;
  contentType: ContentType;
  status: ContentStatus;
  categoryId: string | null;
  seriesId: string | null;
  tags: string[];
  metaDescription: string | null;
  readingTimeMinutes: number | null;
  viewCount: number;
  engagementScore: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface ContentSeriesRequest {
  title: string;
  slug: string;
  description: string | undefined;
  status: ContentStatus;
  categoryId: string | undefined;
}

export interface ContentCategoryRequest {
  name: string;
  slug: string;
  description: string | undefined;
  isActive: boolean;
  orderIndex: number;
}
