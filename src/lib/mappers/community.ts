// Community mapper with service-compatible function names
// This file provides the mapper functions expected by the CommunityService

// Community mappers
export {
  fromCreate as fromCreateCommunityDTO,
  fromUpdate as fromUpdateCommunityDTO,
  toDTO as toCommunityDTO,
} from './communities.mapper';

// Community Membership mappers
export {
  fromCreate as fromCreateCommunityMembershipDTO,
  fromUpdate as fromUpdateCommunityMembershipDTO,
  toDTO as toCommunityMembershipDTO,
} from './communitymemberships.mapper';

// Type exports for service compatibility
export type {
  CommunityCreateDTO,
  CommunityMembershipCreateDTO,
  CommunityMembershipResponseDTO,
  CommunityMembershipUpdateDTO,
  CommunityResponseDTO,
  CommunityUpdateDTO,
} from '@/lib/contracts';
