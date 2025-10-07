// Auto-generated user API mappers
// Generated at: 2025-10-06T17:55:56.827Z

import type {
  UserProfilesSelect,
  UserProfilesUpdate,
} from '@/lib/types';

export interface DatabaseFilters {
  page: number;
  limit: number;
  ministryRole?: string;
  country?: string;
  search?: string;
}

// Transform user profile request
export function userProfileRequestMapper(data: any): UserProfilesUpdate {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    ministryRole: data.ministryRole,
    bio: data.bio?.trim() || null,
    avatarUrl: data.avatarUrl || null,
  };
}

// Transform user list query
export function userListQueryMapper(query: any): DatabaseFilters {
  return {
    page: query.page || 1,
    limit: Math.min(query.limit || 20, 100),
    ministryRole: query.ministryRole,
    country: query.country,
    search: query.search?.trim(),
  };
}

// Transform user list response
export function userListResponseMapper(
  users: UserProfilesSelect[],
  total: number,
  pagination: any
): any {
  return {
    users: users.map(user => userProfilesToApi(user)),
    pagination,
    total,
  };
}

// Helper function for user profile transformation
function userProfilesToApi(user: UserProfilesSelect): UserProfilesSelect {
  return {
    id: user.id,
    email: user.email,
    passwordHash: user.passwordHash,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    ministryRole: user.ministryRole,
    denomination: user.denomination,
    organizationName: user.organizationName,
    yearsInMinistry: user.yearsInMinistry,
    countryCode: user.countryCode,
    timezone: user.timezone,
    languagePrimary: user.languagePrimary,
    culturalContext: user.culturalContext,
    subscriptionTier: user.subscriptionTier,
    accountStatus: user.accountStatus,
    lastActiveAt: user.lastActiveAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}
