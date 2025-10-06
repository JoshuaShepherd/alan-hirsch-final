export interface QueryContext {
    organizationId?: string;
    userId?: string;
    role?: string;
}
export * from './users';
export * from './organizations';
export * from './content';
export * from './communities';
export * from './assessments';
export * from './subscriptions';
export * from './analytics';
export { globalSearch, searchAssessments, searchCommunities, searchContent, searchContentByTheologicalThemes, searchOrganizations, searchUsers, type SearchFilters, type SearchResult, } from './search';
export * from './monitoring';
export * from './performance';
/**
 * Create a query context from request data
 */
export declare function createQueryContext(data: {
    organizationId?: string;
    userId?: string;
    role?: string;
}): QueryContext;
/**
 * Validate query context
 */
export declare function validateQueryContext(context: QueryContext): boolean;
/**
 * Check if user has admin role
 */
export declare function isAdmin(context: QueryContext): boolean;
/**
 * Check if user has organization access
 */
export declare function hasOrganizationAccess(context: QueryContext, organizationId: string): boolean;
/**
 * Check if user has user access
 */
export declare function hasUserAccess(context: QueryContext, userId: string): boolean;
//# sourceMappingURL=index.d.ts.map