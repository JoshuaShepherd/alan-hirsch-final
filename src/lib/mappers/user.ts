// User mapper with service-compatible function names
// This file provides the mapper functions expected by the UserService

import {
  fromCreateUserProfileDTO as fromCreateUserProfile,
  fromUpdateUserProfileDTO as fromUpdateUserProfile,
  toUserProfileDTO,
} from './user-profiles.mapper';
// Re-export with service-expected names
export const toUserDTO = toUserProfileDTO;
export const fromCreateUserDTO = fromCreateUserProfile;
export const fromUpdateUserDTO = fromUpdateUserProfile;

// Organization mappers (imported separately to avoid circular reference)
import {
  fromCreateOrganizationsDTO as fromCreateOrganization,
  fromUpdateOrganizationsDTO as fromUpdateOrganization,
  toOrganizationsDTO as toOrganizationDTO,
} from './organizations.mapper';
export const fromCreateOrganizationDTO = fromCreateOrganization;
export const fromUpdateOrganizationDTO = fromUpdateOrganization;
export { toOrganizationDTO };

// Type exports for service compatibility
export type {
  UserCreateDTO,
  UserResponseDTO,
  UserUpdateDTO,
} from '@/lib/contracts';
