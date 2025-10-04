import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/drizzle';
import { assessmentQuestions, assessments } from '@/lib/db/schema';
import { asc, eq } from 'drizzle-orm';
import {
  assessmentResponseDTOSchema,
  assessmentWithQuestionsResponseSchema,
  updateAssessmentRequestSchema,
} from '@/lib/contracts';
import {
  toAssessmentResponseDTO,
  toAssessmentWithQuestionsResponseDTO,
} from '@/lib/mappers/assessments';
import { z } from 'zod';

// Input validation schemas
const assessmentIdSchema = z.object({
  id: z.string().uuid('Invalid assessment ID'),
});

// GET /api/assessments/[id] - Get assessment by ID with questions
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate path parameters
    const resolvedParams = await params;
    const { id } = assessmentIdSchema.parse(resolvedParams);

    // Get assessment
    const assessment = await db
      .select()
      .from(assessments)
      .where(eq(assessments.id, id))
      .limit(1);

    if (!assessment[0]) {
      return NextResponse.json(
        {
          error: 'Assessment not found',
          message: 'The requested assessment could not be found',
        },
        { status: 404 }
      );
    }

    // Get questions ordered by orderIndex
    const questions = await db
      .select()
      .from(assessmentQuestions)
      .where(eq(assessmentQuestions.assessmentId, id))
      .orderBy(asc(assessmentQuestions.orderIndex));

    // Map to DTO
    const response = toAssessmentWithQuestionsResponseDTO(
      assessment[0],
      questions
    );

    // Validate response with Zod schema
    const validatedResponse =
      assessmentWithQuestionsResponseSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('GET /api/assessments/[id] error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid assessment ID',
          message: 'The provided assessment ID is not valid',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: 'Internal server error',
        message:
          error instanceof Error
            ? error.message
            : 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}

// PATCH /api/assessments/[id] - Update assessment (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate path parameters
    const resolvedParams = await params;
    const { id } = assessmentIdSchema.parse(resolvedParams);

    // Parse and validate request body
    const body = await request.json();
    const input = updateAssessmentRequestSchema.parse({ ...body, id });

    // TODO: Add admin permission check
    // For now, allow any authenticated user to update assessments

    // Update assessment
    const [updatedAssessment] = await db
      .update(assessments)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(assessments.id, id))
      .returning();

    if (!updatedAssessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    // Map to DTO
    const response = toAssessmentResponseDTO(updatedAssessment);

    // Validate response with Zod schema
    const validatedResponse = assessmentResponseDTOSchema.parse(response);

    return NextResponse.json(validatedResponse);
  } catch (error) {
    console.error('PATCH /api/assessments/[id] error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/assessments/[id] - Delete assessment (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Validate path parameters
    const resolvedParams = await params;
    const { id } = assessmentIdSchema.parse(resolvedParams);

    // TODO: Add admin permission check
    // For now, allow any authenticated user to delete assessments

    // Delete assessment (cascade will handle questions and responses)
    const [deletedAssessment] = await db
      .delete(assessments)
      .where(eq(assessments.id, id))
      .returning();

    if (!deletedAssessment) {
      return NextResponse.json(
        { error: 'Assessment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Assessment deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('DELETE /api/assessments/[id] error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid assessment ID', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
