import type { userProfiles } from '../db/schema';
import type { UserProfile } from '../contracts';
type UserProfileRow = typeof userProfiles.$inferSelect;
/**
 * User Profile Mappers - Convert Drizzle rows to UI-friendly DTOs
 *
 * These mappers handle:
 * - Null coalescing for safe UI display
 * - Date formatting for consistent API responses
 * - Computed fields for UI convenience
 * - Type safety between DB and API layers
 */
/**
 * Map UserProfileRow to UserProfile
 */
export declare function toUserProfileDTO(row: UserProfileRow): UserProfile;
/**
 * Map array of UserProfileRow to array of UserProfile
 */
export declare function toUserProfileListDTO(rows: UserProfileRow[]): UserProfile[];
export {};
//# sourceMappingURL=user-profiles.d.ts.map