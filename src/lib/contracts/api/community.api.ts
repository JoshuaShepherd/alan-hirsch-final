// Auto-generated API contracts for community
// Generated at: 2025-10-06T20:01:40.350Z

import {
  collaborationsEntitySchema,
  collaborationsQuerySchema,
  communitiesEntitySchema,
  communitiesQuerySchema,
  communityMembershipsEntitySchema,
  communityMembershipsQuerySchema,
  communityPostVotesEntitySchema,
  communityPostVotesQuerySchema,
  createcollaborationsSchema,
  createcommunitiesSchema,
  createcommunityMembershipsSchema,
  createcommunityPostVotesSchema,
  updatecollaborationsSchema,
  updatecommunitiesSchema,
  updatecommunityMembershipsSchema,
  updatecommunityPostVotesSchema,
} from '../schemas/community';

// API schemas for community
// API request/response schemas for communities
export const communitiesApiRequestSchema = createcommunitiesSchema;
export const communitiesApiResponseSchema = communitiesEntitySchema;
export const communitiesApiUpdateSchema = updatecommunitiesSchema;
export const communitiesApiQuerySchema = communitiesQuerySchema;

// API request/response schemas for communityMemberships
export const communityMembershipsApiRequestSchema =
  createcommunityMembershipsSchema;
export const communityMembershipsApiResponseSchema =
  communityMembershipsEntitySchema;
export const communityMembershipsApiUpdateSchema =
  updatecommunityMembershipsSchema;
export const communityMembershipsApiQuerySchema =
  communityMembershipsQuerySchema;

// API request/response schemas for communityPostVotes
export const communityPostVotesApiRequestSchema =
  createcommunityPostVotesSchema;
export const communityPostVotesApiResponseSchema =
  communityPostVotesEntitySchema;
export const communityPostVotesApiUpdateSchema = updatecommunityPostVotesSchema;
export const communityPostVotesApiQuerySchema = communityPostVotesQuerySchema;

// API request/response schemas for collaborations
export const collaborationsApiRequestSchema = createcollaborationsSchema;
export const collaborationsApiResponseSchema = collaborationsEntitySchema;
export const collaborationsApiUpdateSchema = updatecollaborationsSchema;
export const collaborationsApiQuerySchema = collaborationsQuerySchema;
