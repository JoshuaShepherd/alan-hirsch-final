/**
 * INTEGRATION EXAMPLE: Type-Safe Database Services with API Routes
 *
 * This file demonstrates how the new service layer integrates with existing API routes,
 * providing complete type safety from validation through database operations.
 */

import { NotFoundError, ValidationError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { ServiceUtils, services } from './index';

// ============================================================================
// EXAMPLE 1: USER API ROUTE INTEGRATION
// ============================================================================

/**
 * Example: GET /api/users/[id]
 * Demonstrates how API routes can use services directly without additional validation
 */
export async function GET_USER_EXAMPLE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userService = services.user();

    // Service handles all validation and database operations
    const user = await userService.findById(params.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Example: POST /api/users
 * Demonstrates input validation handled by service layer
 */
export async function POST_USER_EXAMPLE(request: NextRequest) {
  try {
    const body = await request.json();
    const userService = services.user();

    // Service validates input data using Zod schemas
    const user = await userService.create(body);

    return NextResponse.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}

/**
 * Example: PUT /api/users/[id]
 * Demonstrates update operations with validation
 */
export async function PUT_USER_EXAMPLE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const userService = services.user();

    // Service validates update data and handles database operations
    const user = await userService.update(params.id, body);

    return NextResponse.json({
      success: true,
      data: user,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 2: COMPLEX TRANSACTION OPERATIONS
// ============================================================================

/**
 * Example: POST /api/assessments/[id]/complete
 * Demonstrates complex operations using transactions
 */
export async function COMPLETE_ASSESSMENT_EXAMPLE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { responses, userId } = body;

    // Use transaction service for complex multi-step operations
    const result = await ServiceUtils.executeInTransaction(async services => {
      const userAssessmentService = services.userAssessment();
      const assessmentResponseService = services.assessmentResponse();

      // 1. Get the user assessment
      const userAssessment = await userAssessmentService.findById(params.id);
      if (!userAssessment) {
        throw new NotFoundError('UserAssessment', params.id);
      }

      // 2. Save all responses
      const savedResponses = await assessmentResponseService.bulkSaveResponses(
        params.id,
        responses
      );

      // 3. Calculate scores and complete assessment
      const completionData = calculateAssessmentScores(responses);
      const completedAssessment =
        await userAssessmentService.completeAssessment(
          params.id,
          completionData
        );

      return {
        userAssessment: completedAssessment,
        responses: savedResponses,
      };
    });

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to complete assessment' },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 3: CONTENT MANAGEMENT WITH BUSINESS LOGIC
// ============================================================================

/**
 * Example: POST /api/content
 * Demonstrates business logic in service layer
 */
export async function CREATE_CONTENT_EXAMPLE(request: NextRequest) {
  try {
    const body = await request.json();
    const contentService = services.contentItem();

    // Service handles all business logic and validation
    const content = await contentService.create(body);

    // Additional business logic if needed
    if (content.status === 'published') {
      // Could trigger notifications, analytics, etc.
      await trackContentPublished(content.id);
    }

    return NextResponse.json({
      success: true,
      data: content,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create content' },
      { status: 500 }
    );
  }
}

/**
 * Example: PUT /api/content/[id]/publish
 * Demonstrates entity-specific business methods
 */
export async function PUBLISH_CONTENT_EXAMPLE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentService = services.contentItem();

    // Use entity-specific business method
    const publishedContent = await contentService.publish(params.id);

    return NextResponse.json({
      success: true,
      data: publishedContent,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to publish content' },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 4: ADVANCED QUERYING
// ============================================================================

/**
 * Example: GET /api/content?search=leadership&category=ministry&limit=20
 * Demonstrates complex querying with filters
 */
export async function SEARCH_CONTENT_EXAMPLE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentService = services.contentItem();

    const query = searchParams.get('search') || '';
    const categoryId = searchParams.get('category') || undefined;
    const limit = parseInt(searchParams.get('limit') || '20');

    let results;

    if (query) {
      // Use search method
      results = await contentService.searchContent(query, {
        contentType: 'article',
        visibility: 'public',
        limit,
      });
    } else if (categoryId) {
      // Use category filter
      results = await contentService.findByCategory(categoryId, {
        status: 'published',
        visibility: 'public',
        limit,
      });
    } else {
      // Use standard query with filters
      results = await contentService.findMany({
        where: {
          status: 'published',
          visibility: 'public',
        },
        orderBy: [{ field: 'published_at', direction: 'desc' }],
        limit,
      });
    }

    return NextResponse.json({
      success: true,
      data: results,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to search content' },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 5: ORGANIZATION MANAGEMENT
// ============================================================================

/**
 * Example: POST /api/organizations/[id]/members
 * Demonstrates relationship management
 */
export async function ADD_ORGANIZATION_MEMBER_EXAMPLE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { userId, role = 'member' } = body;

    const organizationMembershipService = services.organizationMembership();

    // Service handles relationship validation and creation
    const membership = await organizationMembershipService.addMember(
      userId,
      params.id,
      role
    );

    return NextResponse.json({
      success: true,
      data: membership,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message, details: error.details },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to add member' },
      { status: 500 }
    );
  }
}

// ============================================================================
// EXAMPLE 6: ANALYTICS AND STATISTICS
// ============================================================================

/**
 * Example: GET /api/users/[id]/stats
 * Demonstrates aggregated data retrieval
 */
export async function GET_USER_STATS_EXAMPLE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userService = services.user();

    // Service provides aggregated statistics
    const stats = await userService.getUserStats(params.id);

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json(
      { error: 'Failed to get user stats' },
      { status: 500 }
    );
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Example business logic function
 */
async function trackContentPublished(contentId: string): Promise<void> {
  // Implementation for tracking content publication
  console.log(`Content ${contentId} published`);
}

/**
 * Example assessment scoring calculation
 */
function calculateAssessmentScores(responses: any[]): any {
  // Implementation for calculating assessment scores
  return {
    totalScore: 85,
    apostolicScore: 20,
    propheticScore: 15,
    evangelisticScore: 18,
    shepherdingScore: 12,
    teachingScore: 20,
    primaryGift: 'apostolic',
    secondaryGift: 'evangelistic',
    completionTime: 1800, // 30 minutes
    confidenceLevel: 4,
  };
}

// ============================================================================
// INTEGRATION BENEFITS SUMMARY
// ============================================================================

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
