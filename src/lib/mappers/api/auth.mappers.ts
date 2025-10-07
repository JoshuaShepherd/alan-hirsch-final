// Auto-generated auth API mappers
// Generated at: 2025-10-06T17:55:56.827Z

import type {
  UserProfilesSelect,
  OrganizationsSelect,
} from '@/lib/types';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: string;
}

// Transform login request
export function loginRequestMapper(data: any): any {
  return {
    email: data.email.toLowerCase().trim(),
    password: data.password,
    rememberMe: data.rememberMe || false,
  };
}

// Transform login response
export function loginResponseMapper(user: UserProfilesSelect, tokens: AuthTokens): any {
  return {
    user: userProfilesToApi(user),
    token: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: tokens.expiresAt,
  };
}

// Transform registration request
export function registerRequestMapper(data: any): any {
  return {
    email: data.email.toLowerCase().trim(),
    password: data.password,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    ministryRole: data.ministryRole,
    organizationId: data.organizationId,
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
