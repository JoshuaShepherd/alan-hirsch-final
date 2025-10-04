import { userProfiles } from '@/lib/db/schema';
import { CreateUserSchema, UpdateUserSchema, UserEntitySchema, UserQuerySchema } from '@platform/contracts/entities';
import { z } from 'zod';
import { BaseService } from './base.service';
export declare class UserService extends BaseService<z.infer<typeof UserEntitySchema>, z.infer<typeof CreateUserSchema>, z.infer<typeof UpdateUserSchema>, z.infer<typeof UserQuerySchema>, typeof userProfiles> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find user by email address
     */
    findByEmail(email: string): Promise<z.infer<typeof UserEntitySchema> | null>;
    /**
     * Find user by subdomain
     */
    findBySubdomain(subdomain: string): Promise<z.infer<typeof databaseUserProfileSchema> | null>;
    /**
     * Find user with their organizations
     */
    findWithOrganizations(userId: string): Promise<{
        user: z.infer<typeof databaseUserProfileSchema>;
        organizations: Array<{
            organization: any;
            membership: any;
        }>;
    } | null>;
    /**
     * Update user's last active timestamp
     */
    updateLastActive(userId: string): Promise<z.infer<typeof databaseUserProfileSchema>>;
    /**
     * Update user's password (if supported by schema)
     */
    updatePassword(userId: string, hashedPassword: string): Promise<boolean>;
    /**
     * Deactivate user account
     */
    deactivateUser(userId: string): Promise<z.infer<typeof databaseUserProfileSchema>>;
    /**
     * Activate user account
     */
    activateUser(userId: string): Promise<z.infer<typeof databaseUserProfileSchema>>;
    /**
     * Get user statistics
     */
    getUserStats(userId: string): Promise<{
        totalContent: number;
        publishedContent: number;
        totalViews: number;
        organizationCount: number;
        lastActiveAt: Date | null;
    }>;
    /**
     * Search users by name, email, or ministry role
     */
    searchUsers(query: string, limit?: number): Promise<z.infer<typeof databaseUserProfileSchema>[]>;
    /**
     * Find users by country code
     */
    findByCountry(countryCode: string, limit?: number): Promise<z.infer<typeof databaseUserProfileSchema>[]>;
    /**
     * Find users by ministry role
     */
    findByMinistryRole(ministryRole: string, limit?: number): Promise<z.infer<typeof databaseUserProfileSchema>[]>;
    /**
     * Get users created within a date range
     */
    findByDateRange(startDate: Date, endDate: Date): Promise<z.infer<typeof databaseUserProfileSchema>[]>;
    /**
     * Update user's assessment scores
     */
    updateAssessmentScores(userId: string, scores: {
        movementAlignment?: number;
        audienceEngagement?: number;
        contentReadiness?: number;
        revenuePotential?: number;
        networkEffects?: number;
        strategicFit?: number;
        total?: number;
    }): Promise<z.infer<typeof databaseUserProfileSchema>>;
    /**
     * Check if email is already in use
     */
    isEmailInUse(email: string, excludeUserId?: string): Promise<boolean>;
    /**
     * Check if subdomain is already in use
     */
    isSubdomainInUse(subdomain: string, excludeUserId?: string): Promise<boolean>;
}
//# sourceMappingURL=user.service.d.ts.map