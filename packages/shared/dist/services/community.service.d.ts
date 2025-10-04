import { communities } from '@/lib/db/schema';
import { newCommunitySchema, queryCommunitySchema, updateCommunitySchema } from '@/src/lib/schemas/crud.schemas';
import { databaseCommunitySchema } from '@/src/lib/schemas/database.schemas';
import { z } from 'zod';
import { BaseService } from './base.service';
export declare class CommunityService extends BaseService<z.infer<typeof databaseCommunitySchema>, z.infer<typeof newCommunitySchema>, z.infer<typeof updateCommunitySchema>, z.infer<typeof queryCommunitySchema>, typeof communities> {
    protected table: any;
    protected entityName: string;
    protected createSchema: any;
    protected updateSchema: any;
    protected querySchema: any;
    protected outputSchema: any;
    /**
     * Find community by slug
     */
    findBySlug(slug: string): Promise<z.infer<typeof databaseCommunitySchema> | null>;
    /**
     * Find active communities
     */
    findActive(): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Find public communities
     */
    findPublic(): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Find communities by type
     */
    findByType(communityType: string): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Find communities by focus
     */
    findByFocus(focus: string): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Search communities
     */
    searchCommunities(query: string, limit?: number): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Activate community
     */
    activate(communityId: string): Promise<z.infer<typeof databaseCommunitySchema>>;
    /**
     * Deactivate community
     */
    deactivate(communityId: string): Promise<z.infer<typeof databaseCommunitySchema>>;
    /**
     * Archive community
     */
    archive(communityId: string): Promise<z.infer<typeof databaseCommunitySchema>>;
    /**
     * Get community statistics
     */
    getCommunityStats(): Promise<{
        total: number;
        active: number;
        inactive: number;
        pending: number;
        archived: number;
        byType: Record<string, number>;
        byFocus: Record<string, number>;
        byVisibility: Record<string, number>;
        totalMembers: number;
    }>;
    /**
     * Get trending communities
     */
    getTrendingCommunities(limit?: number): Promise<z.infer<typeof databaseCommunitySchema>[]>;
    /**
     * Check if slug is available
     */
    isSlugAvailable(slug: string, excludeCommunityId?: string): Promise<boolean>;
    /**
     * Update member count
     */
    updateMemberCount(communityId: string, memberCount: number): Promise<z.infer<typeof databaseCommunitySchema>>;
}
export declare const communityService: CommunityService;
//# sourceMappingURL=community.service.d.ts.map