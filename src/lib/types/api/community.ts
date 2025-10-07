// Auto-generated types for api
// Generated at: 2025-10-06T16:27:57.959Z

import type { CommunityVisibility, PostType } from '../common';

export interface CommunityRequest {
  name: string;
  slug: string;
  description: string | undefined;
  visibility: CommunityVisibility;
  organizationId: string | undefined;
}

export interface CommunityResponse {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  visibility: CommunityVisibility;
  organizationId: string | null;
  memberCount: number;
  postCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CommunityPostRequest {
  communityId: string;
  title: string;
  content: string;
  postType: PostType;
  isPinned: boolean | undefined;
}

export interface CommunityPostResponse {
  id: string;
  communityId: string;
  authorId: string;
  title: string;
  content: string;
  postType: PostType;
  isPinned: boolean;
  voteCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
}
