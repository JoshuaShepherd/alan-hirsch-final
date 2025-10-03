import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { assessments } from '@/lib/db/schema';
import { desc, eq, and, like, or, sql } from 'drizzle-orm';
import {
  assessmentSearchRequestSchema,
  createAssessmentRequestSchema,
  assessmentSchema,
  assessmentListResponseSchema,
  assessmentResponseSchema,
} from '@/lib/contracts';
import {
  toAssessmentResponseDTO,
  toPaginatedAssessmentListResponseDTO,
} from '@/lib/mappers/assessments';
import { z } from 'zod';

// Input validation schemas
const getAssessmentsInputSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  search: z.string().optional(),
  assessmentType: z
    .enum([
      'apest',
      'mdna',
      'cultural_intelligence',
      'leadership_style',
      'spiritual_gifts',
      'other',
    ])
    .optional(),
  status: z.enum(['draft', 'active', 'archived', 'under_review']).optional(),
  language: z.string().optional(),
  culturalAdaptation: z
    .enum([
      'western',
      'eastern',
      'african',
      'latin_american',
      'middle_eastern',
      'oceanic',
      'universal',
    ])
    .optional(),
  researchBacked: z.coerce.boolean().optional(),
});

// GET /api/assessments - Get available assessments
export async function GET(request: NextRequest) {
  try {
    // Parse and validate query parameters
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const input = getAssessmentsInputSchema.parse(queryParams);

    const {
      page,
      limit,
      search,
      assessmentType,
      status,
      language,
      culturalAdaptation,
      researchBacked,
    } = input;
    const offset = (page - 1) * limit;

    // Build where conditions
    const conditions = [];

    // Add search condition
    if (search) {
      conditions.push(
        or(
          like(assessments.name, `%${search}%`),
          like(assessments.description, `%${search}%`)
        )!
      );
    }

    // Add filter conditions
    if (assessmentType) {
      conditions.push(eq(assessments.assessmentType, assessmentType));
    }
    if (status) {
      conditions.push(eq(assessments.status, status));
    }
    if (language) {
      conditions.push(eq(assessments.language, language));
    }
    if (culturalAdaptation) {
      conditions.push(eq(assessments.culturalAdaptation, culturalAdaptation));
    }
    if (researchBacked !== undefined) {
      conditions.push(eq(assessments.researchBacked, researchBacked));
    }

    // Get assessments
    const assessmentList = await db
      .select()
      .from(assessments)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(assessments.publishedAt))
      .limit(limit)
      .offset(offset);

    // Get total count
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(assessments)
      .where(conditions.length > 0 ? and(...conditions) : undefined);

    const count = countResult[0]?.count || 0;

    // Map to DTOs
    const assessmentDTOs = assessmentList.map(toAssessmentResponseDTO);

    // Create standardized response
    const response = {
      items: assessmentDTOs,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
        hasNext: page < Math.ceil(count / limit),
        hasPrev: page > 1,
      },
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = assessmentListResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('GET /api/assessments error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request parameters', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/assessments - Create new assessment (admin only)
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const input = createAssessmentRequestSchema.parse(body);

    // TODO: Add admin permission check
    // For now, allow any authenticated user to create assessments

    const insertedAssessments = await db
      .insert(assessments)
      .values({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning();

    // Ensure we have a valid assessment
    if (!insertedAssessments || insertedAssessments.length === 0) {
      return NextResponse.json(
        { error: 'Failed to create assessment' },
        { status: 500 }
      );
    }

    const newAssessment = insertedAssessments[0];
    if (!newAssessment) {
      return NextResponse.json(
        { error: 'Failed to create assessment' },
        { status: 500 }
      );
    }

    // Map to DTO
    const assessmentDTO = toAssessmentResponseDTO(newAssessment);

    // Create standardized response
    const response = {
      data: assessmentDTO,
      success: true,
    };

    // Validate response with Zod schema
    const validatedResponse = assessmentResponseSchema.parse(response);

    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('POST /api/assessments error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request body', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
