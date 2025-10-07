// Auto-generated refresh token route
// Generated at: 2025-10-06T13:20:22.155Z

import { getDatabaseContext } from '@/lib/database/db/context';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/refresh-token - Refresh access token
export async function POST(request: NextRequest) {
  try {
    // Get refresh token from cookie
    const refreshToken = request.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json(
        {
          error: {
            code: 'UNAUTHORIZED',
            message: 'Refresh token not found',
          },
        },
        { status: 401 }
      );
    }

    // Get database context
    const ctx = await getDatabaseContext();

    // Execute token refresh (placeholder - implement actual token refresh)
    // For now, return a mock response
    const mockTokens = {
      token: 'new-jwt-token',
      refreshToken: 'new-refresh-token',
      expiresAt: new Date(Date.now() + 3600000).toISOString(),
    };

    // Update refresh token cookie
    const response = NextResponse.json(mockTokens, { status: 200 });

    response.cookies.set('refreshToken', mockTokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Token refresh error:', error);

    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Token refresh failed',
        },
      },
      { status: 500 }
    );
  }
}
