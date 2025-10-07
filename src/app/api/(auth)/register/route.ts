// Auto-generated register route
// Generated at: 2025-10-06T13:20:22.155Z

import { registerRequestSchema, registerResponseSchema } from '@/lib/contracts';
import { getDatabaseContext } from '@/lib/database/db/context';
import { authService } from '@/lib/services/auth.service';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// POST /api/auth/register - User registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = registerRequestSchema.parse(body);

    // Get database context
    const ctx = await getDatabaseContext();

    // Execute registration
    const result = await authService.register(ctx, validatedData);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Validate response before sending
    const validatedResponse = registerResponseSchema.parse(result.data);

    return NextResponse.json(validatedResponse, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid registration data',
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Registration failed',
        },
      },
      { status: 500 }
    );
  }
}
