/**
 * INTEGRATION EXAMPLE: Type-Safe Database Services with API Routes
 *
 * This file demonstrates how the new service layer integrates with existing API routes,
 * providing complete type safety from validation through database operations.
 */
import { NextRequest, NextResponse } from 'next/server';
/**
 * Example: GET /api/users/[id]
 * Demonstrates how API routes can use services directly without additional validation
 */
export declare function GET_USER_EXAMPLE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<{
    success: boolean;
    data: any;
    timestamp: string;
}> | NextResponse<{
    error: any;
    details: any;
}>>;
/**
 * Example: POST /api/users
 * Demonstrates input validation handled by service layer
 */
export declare function POST_USER_EXAMPLE(request: NextRequest): Promise<NextResponse<{
    success: boolean;
    data: any;
    timestamp: string;
}> | NextResponse<{
    error: any;
    details: any;
}> | NextResponse<{
    error: string;
}>>;
/**
 * Example: PUT /api/users/[id]
 * Demonstrates update operations with validation
 */
export declare function PUT_USER_EXAMPLE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: any;
    timestamp: string;
}> | NextResponse<{
    error: any;
}>>;
/**
 * Example: POST /api/assessments/[id]/complete
 * Demonstrates complex operations using transactions
 */
export declare function COMPLETE_ASSESSMENT_EXAMPLE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: {
        userAssessment: any;
        responses: any;
    };
    timestamp: string;
}> | NextResponse<{
    error: any;
}>>;
/**
 * Example: POST /api/content
 * Demonstrates business logic in service layer
 */
export declare function CREATE_CONTENT_EXAMPLE(request: NextRequest): Promise<NextResponse<{
    success: boolean;
    data: any;
    timestamp: string;
}> | NextResponse<{
    error: any;
    details: any;
}> | NextResponse<{
    error: string;
}>>;
/**
 * Example: PUT /api/content/[id]/publish
 * Demonstrates entity-specific business methods
 */
export declare function PUBLISH_CONTENT_EXAMPLE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: any;
    timestamp: string;
}> | NextResponse<{
    error: any;
}>>;
/**
 * Example: GET /api/content?search=leadership&category=ministry&limit=20
 * Demonstrates complex querying with filters
 */
export declare function SEARCH_CONTENT_EXAMPLE(request: NextRequest): Promise<NextResponse<{
    success: boolean;
    data: any[] | import("./base.service").PaginatedResult<any>;
    timestamp: string;
}> | NextResponse<{
    error: any;
    details: any;
}> | NextResponse<{
    error: string;
}>>;
/**
 * Example: POST /api/organizations/[id]/members
 * Demonstrates relationship management
 */
export declare function ADD_ORGANIZATION_MEMBER_EXAMPLE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: any;
    timestamp: string;
}> | NextResponse<{
    error: any;
    details: any;
}> | NextResponse<{
    error: string;
}>>;
/**
 * Example: GET /api/users/[id]/stats
 * Demonstrates aggregated data retrieval
 */
export declare function GET_USER_STATS_EXAMPLE(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<{
    success: boolean;
    data: {
        totalContent: number;
        publishedContent: number;
        totalViews: number;
        organizationCount: number;
        lastActiveAt: Date | null;
    };
    timestamp: string;
}> | NextResponse<{
    error: any;
}>>;
/**
 * KEY BENEFITS OF THIS SERVICE LAYER INTEGRATION:
 *
 * 1. TYPE SAFETY: Complete TypeScript inference from API input to database output
 * 2. VALIDATION: Automatic Zod validation on all inputs and outputs
 * 3. BUSINESS LOGIC: Entity-specific methods encapsulate complex operations
 * 4. TRANSACTIONS: Complex multi-step operations maintain data consistency
 * 5. ERROR HANDLING: Consistent error types and messages across all operations
 * 6. REUSABILITY: Services can be used in API routes, background jobs, and tests
 * 7. MAINTAINABILITY: Clear separation of concerns between API and business logic
 * 8. TESTABILITY: Services can be easily mocked and tested independently
 *
 * USAGE PATTERNS:
 *
 * - Simple CRUD: services.user().findById(id)
 * - Complex queries: services.contentItem().searchContent(query, options)
 * - Business operations: services.userAssessment().completeAssessment(id, data)
 * - Transactions: ServiceUtils.executeInTransaction(async (services) => { ... })
 * - Relationship management: services.organizationMembership().addMember(userId, orgId, role)
 * - Analytics: services.user().getUserStats(userId)
 *
 * ERROR HANDLING:
 *
 * - ValidationError: Input/output validation failures (400)
 * - NotFoundError: Resource not found (404)
 * - ServiceError: Database or business logic errors (500)
 *
 * This service layer provides a robust foundation for all database operations
 * while maintaining complete type safety and proper error handling.
 */
//# sourceMappingURL=integration.example.d.ts.map