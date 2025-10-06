import { assessments, communities, contentItems, organizations, userProfiles } from '../schema';
import type { QueryContext } from './index';
export interface SearchFilters {
    contentType?: string;
    categoryId?: string;
    authorId?: string;
    status?: 'draft' | 'published' | 'scheduled' | 'archived';
    visibility?: 'public' | 'private' | 'organization';
    ministryRole?: string;
    denomination?: string;
    countryCode?: string;
    culturalContext?: string;
    leaderTier?: string;
    communityType?: string;
    languagePrimary?: string;
    assessmentType?: string;
    primaryGift?: string;
    secondaryGift?: string;
    organizationType?: string;
    sizeCategory?: string;
    dateFrom?: Date;
    dateTo?: Date;
    limit?: number;
    offset?: number;
    orderBy?: string;
    orderDirection?: 'asc' | 'desc';
}
export interface SearchResult<T> {
    results: T[];
    total: number;
    hasMore: boolean;
    page: number;
    limit: number;
}
/**
 * Global search across all entities
 */
export declare function globalSearch(searchTerm: string, context: QueryContext, filters?: SearchFilters): Promise<{
    users: SearchResult<any>;
    content: SearchResult<any>;
    communities: SearchResult<any>;
    organizations: SearchResult<any>;
    assessments: SearchResult<any>;
}>;
/**
 * Search users with ministry-specific criteria
 */
export declare function searchUsers(searchTerm: string, context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof userProfiles.$inferSelect>>;
/**
 * Search content with ministry-specific criteria
 */
export declare function searchContent(searchTerm: string, context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof contentItems.$inferSelect>>;
/**
 * Search communities with ministry-specific criteria
 */
export declare function searchCommunities(searchTerm: string, context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof communities.$inferSelect>>;
/**
 * Search organizations with ministry-specific criteria
 */
export declare function searchOrganizations(searchTerm: string, context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof organizations.$inferSelect>>;
/**
 * Search assessments with ministry-specific criteria
 */
export declare function searchAssessments(searchTerm: string, context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof assessments.$inferSelect>>;
/**
 * Search users by APEST profile
 */
export declare function searchUsersByApestProfile(filters: {
    primaryGift?: string;
    secondaryGift?: string;
    minMovementAlignment?: number;
    maxMovementAlignment?: number;
    minAudienceEngagement?: number;
    maxAudienceEngagement?: number;
    leaderTier?: string;
    limit?: number;
    offset?: number;
}, context: QueryContext): Promise<SearchResult<typeof userProfiles.$inferSelect>>;
/**
 * Search content by theological themes
 */
export declare function searchContentByTheologicalThemes(themes: string[], context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof contentItems.$inferSelect>>;
/**
 * Search communities by cultural context
 */
export declare function searchCommunitiesByCulturalContext(culturalContexts: string[], context: QueryContext, filters?: SearchFilters): Promise<SearchResult<typeof communities.$inferSelect>>;
//# sourceMappingURL=search.d.ts.map