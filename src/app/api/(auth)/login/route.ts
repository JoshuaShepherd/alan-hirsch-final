// Auto-generated login route
// Generated at: 2025-10-06T13:20:22.155Z

import { loginRequestSchema, loginResponseSchema } from '@/lib/contracts';
import { getDatabaseContext } from '@/lib/database/db/context';
import { authService } from '@/lib/services/auth.service';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// POST /api/auth/login - User login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = loginRequestSchema.parse(body);

    // Get database context
    const ctx = await getDatabaseContext();

    // Execute authentication
    const result = await authService.login(ctx, validatedData);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    // Validate response before sending
    const validatedResponse = loginResponseSchema.parse(result.data);

    // Set HTTP-only cookie for refresh token
    const response = NextResponse.json(validatedResponse, { status: 200 });

    response.cookies.set('refreshToken', validatedResponse.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid login data',
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
          message: 'Login failed',
        },
      },
      { status: 500 }
    );
  }
}
