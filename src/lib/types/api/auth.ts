// Auto-generated types for api
// Generated at: 2025-10-06T16:27:57.959Z

import type { UserProfilesSelect } from '@/lib/database';
import type { MinistryRole } from '../common';

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean | undefined;
}

export interface LoginResponse {
  user: UserProfilesSelect;
  token: string;
  refreshToken: string;
  expiresAt: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  ministryRole: MinistryRole;
  organizationId: string | undefined;
}

export interface AuthError {
  code: string;
  message: string;
  field: string | undefined;
}
