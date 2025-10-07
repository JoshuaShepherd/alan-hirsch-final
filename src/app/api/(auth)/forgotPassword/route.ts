// Auto-generated forgot password route
// Generated at: 2025-10-06T13:20:22.155Z

import { getDatabaseContext } from '@/lib/database/db/context';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Forgot password schema
const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

// POST /api/auth/forgot-password - Forgot password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = forgotPasswordSchema.parse(body);

    // Get database context
    const ctx = await getDatabaseContext();

    // Execute forgot password (placeholder - implement actual email sending)
    // For now, just return success

    return NextResponse.json({
      success: true,
      message: 'Password reset email sent successfully',
    });
  } catch (error) {
    console.error('Forgot password error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: {
            code: 'VALIDATION_ERROR',
            message: 'Invalid email address',
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
          message: 'Failed to send password reset email',
        },
      },
      { status: 500 }
    );
  }
}
