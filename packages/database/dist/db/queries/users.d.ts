import type { NewUserProfile } from '@/lib/contracts';
import { organizationMemberships, organizations, userProfiles } from '../schema';
export interface QueryContext {
    organizationId?: string;
    userId?: string;
    role?: string;
}
/**
 * Get user profile by ID with context-aware access control
 */
export declare function getUserProfileById(userId: string, context: QueryContext): Promise<typeof userProfiles.$inferSelect | null>;
/**
 * Get user profile by email with context-aware access control
 */
export declare function getUserProfileByEmail(email: string, context: QueryContext): Promise<typeof userProfiles.$inferSelect | null>;
/**
 * Get user profile by subdomain
 */
export declare function getUserProfileBySubdomain(subdomain: string): Promise<typeof userProfiles.$inferSelect | null>;
/**
 * Search user profiles with context-aware filtering
 */
export declare function searchUserProfiles(searchTerm: string, context: QueryContext, options?: {
    limit?: number;
    offset?: number;
    orderBy?: 'name' | 'created_at' | 'last_active_at';
    orderDirection?: 'asc' | 'desc';
}): Promise<(typeof userProfiles.$inferSelect)[]>;
/**
 * Get users by organization with role filtering
 */
export declare function getUsersByOrganization(organizationId: string, context: QueryContext, options?: {
    role?: string;
    limit?: number;
    offset?: number;
    status?: 'active' | 'pending' | 'inactive';
}): Promise<Array<typeof userProfiles.$inferSelect & {
    membership: typeof organizationMemberships.$inferSelect;
}>>;
/**
 * Get user's APEST assessment scores
 */
export declare function getUserApestScores(userId: string, context: QueryContext): Promise<{
    movementAlignment: number;
    audienceEngagement: number;
    contentReadiness: number;
    revenuePotential: number;
    networkEffects: number;
    strategicFit: number;
    total: number;
    leaderTier: string;
} | null>;
/**
 * Get user's ministry context and preferences
 */
export declare function getUserMinistryContext(userId: string, context: QueryContext): Promise<{
    ministryRole: string;
    denomination: string;
    organizationName: string;
    yearsInMinistry: number;
    countryCode: string;
    timezone: string;
    culturalContext: string;
    theologicalFocus: string[];
    languagePrimary: string;
} | null>;
/**
 * Get user's platform customization settings
 */
export declare function getUserPlatformSettings(userId: string, context: QueryContext): Promise<{
    subdomain: string;
    customDomain: string;
    platformTitle: string;
    brandColors: Record<string, string>;
    emailNotifications: Record<string, boolean>;
    privacySettings: Record<string, boolean>;
} | null>;
/**
 * Get user's onboarding status
 */
export declare function getUserOnboardingStatus(userId: string, context: QueryContext): Promise<{
    completed: boolean;
    step: number;
    nextStep?: string;
} | null>;
/**
 * Create a new user profile
 */
export declare function createUserProfile(userData: NewUserProfile, context: QueryContext): Promise<typeof userProfiles.$inferSelect>;
/**
 * Update user profile with context-aware validation
 */
export declare function updateUserProfile(userId: string, updates: Partial<NewUserProfile>, context: QueryContext): Promise<typeof userProfiles.$inferSelect | null>;
/**
 * Update user's last active timestamp
 */
export declare function updateUserLastActive(userId: string, context: QueryContext): Promise<void>;
/**
 * Get user statistics for dashboard
 */
export declare function getUserStats(userId: string, context: QueryContext): Promise<{
    totalContent: number;
    publishedContent: number;
    totalViews: number;
    totalSubscribers: number;
    activeSubscribers: number;
    communitiesJoined: number;
    assessmentsCompleted: number;
} | null>;
/**
 * Validate user access to organization
 */
export declare function validateUserOrganizationAccess(userId: string, organizationId: string): Promise<boolean>;
/**
 * Get user's organization memberships
 */
export declare function getUserOrganizationMemberships(userId: string, context: QueryContext): Promise<Array<typeof organizationMemberships.$inferSelect & {
    organization: typeof organizations.$inferSelect;
}>>;
//# sourceMappingURL=users.d.ts.map