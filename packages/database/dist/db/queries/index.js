// Query Modules Index
// Centralized exports for all query modules with context-aware access control
// ============================================================================
// USER QUERIES
// ============================================================================
export * from './users';
// ============================================================================
// ORGANIZATION QUERIES
// ============================================================================
export * from './organizations';
// ============================================================================
// CONTENT QUERIES
// ============================================================================
export * from './content';
// ============================================================================
// COMMUNITY QUERIES
// ============================================================================
export * from './communities';
// ============================================================================
// ASSESSMENT QUERIES
// ============================================================================
export * from './assessments';
// ============================================================================
// SUBSCRIPTION QUERIES
// ============================================================================
export * from './subscriptions';
// ============================================================================
// ANALYTICS QUERIES
// ============================================================================
export * from './analytics';
// ============================================================================
// SEARCH QUERIES
// ============================================================================
export * from './search';
// ============================================================================
// MONITORING QUERIES
// ============================================================================
export * from './monitoring';
// ============================================================================
// PERFORMANCE QUERIES
// ============================================================================
export * from './performance';
// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
/**
 * Create a query context from request data
 */
export function createQueryContext(data) {
    return {
        organizationId: data.organizationId,
        userId: data.userId,
        role: data.role,
    };
}
/**
 * Validate query context
 */
export function validateQueryContext(context) {
    return !!(context.userId || context.organizationId);
}
/**
 * Check if user has admin role
 */
export function isAdmin(context) {
    return context.role === 'admin';
}
/**
 * Check if user has organization access
 */
export function hasOrganizationAccess(context, organizationId) {
    return context.organizationId === organizationId || isAdmin(context);
}
/**
 * Check if user has user access
 */
export function hasUserAccess(context, userId) {
    return context.userId === userId || isAdmin(context);
}
//# sourceMappingURL=index.js.map