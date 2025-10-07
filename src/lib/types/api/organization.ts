// Auto-generated types for api
// Generated at: 2025-10-06T16:27:57.959Z

import type {
  MembershipStatus,
  OrganizationRole,
  OrganizationStatus,
  OrganizationType,
} from '../common';

export interface OrganizationRequest {
  name: string;
  slug: string;
  organizationType: OrganizationType;
  description: string | undefined;
  website: string | undefined;
  logoUrl: string | undefined;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  slug: string;
  organizationType: OrganizationType;
  description: string | null;
  website: string | null;
  logoUrl: string | null;
  status: OrganizationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrganizationMembershipRequest {
  userId: string;
  role: OrganizationRole;
  permissions: string[];
}

export interface OrganizationMembershipResponse {
  id: string;
  organizationId: string;
  userId: string;
  role: OrganizationRole;
  permissions: string[];
  status: MembershipStatus;
  joinedAt: string | null;
  createdAt: string;
  updatedAt: string;
}
