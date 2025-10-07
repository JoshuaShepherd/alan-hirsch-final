// Auto-generated API contracts for auth
// Generated at: 2025-10-06T20:01:40.347Z

import {
  createOrganizationMembershipsSchema,
  createOrganizationsSchema,
  createUserProfilesSchema,
  organizationMembershipsEntitySchema,
  organizationMembershipsQuerySchema,
  organizationsEntitySchema,
  organizationsQuerySchema,
  updateOrganizationMembershipsSchema,
  updateOrganizationsSchema,
  updateUserProfilesSchema,
  userProfilesEntitySchema,
  userProfilesQuerySchema,
} from '../schemas/auth';

// API schemas for auth
// API request/response schemas for userProfiles
export const userProfilesApiRequestSchema = createUserProfilesSchema;
export const userProfilesApiResponseSchema = userProfilesEntitySchema;
export const userProfilesApiUpdateSchema = updateUserProfilesSchema;
export const userProfilesApiQuerySchema = userProfilesQuerySchema;

// API request/response schemas for organizations
export const organizationsApiRequestSchema = createOrganizationsSchema;
export const organizationsApiResponseSchema = organizationsEntitySchema;
export const organizationsApiUpdateSchema = updateOrganizationsSchema;
export const organizationsApiQuerySchema = organizationsQuerySchema;

// API request/response schemas for organizationMemberships
export const organizationMembershipsApiRequestSchema =
  createOrganizationMembershipsSchema;
export const organizationMembershipsApiResponseSchema =
  organizationMembershipsEntitySchema;
export const organizationMembershipsApiUpdateSchema =
  updateOrganizationMembershipsSchema;
export const organizationMembershipsApiQuerySchema =
  organizationMembershipsQuerySchema;
