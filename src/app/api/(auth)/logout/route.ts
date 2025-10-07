// Auto-generated logout route
// Generated at: 2025-10-06T13:20:22.155Z

import { getDatabaseContext } from '@/lib/database/db/context';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/logout - User logout
export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (refreshToken) {
      // Get database context
      const ctx = await getDatabaseContext();

      // Execute logout (placeholder - implement actual token revocation)
      // For now, we'll just clear the cookie
    }

    // Clear refresh token cookie
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful',
    });

    response.cookies.delete('refreshToken');

    return response;
  } catch (error) {
    console.error('Logout error:', error);

    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Logout failed',
        },
      },
      { status: 500 }
    );
  }
}
