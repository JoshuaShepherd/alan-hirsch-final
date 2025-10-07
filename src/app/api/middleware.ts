// Auto-generated middleware for API routes
// Generated at: 2025-10-06T13:20:22.156Z

import { NextRequest, NextResponse } from 'next/server';

// TODO: Import from generated packages once they exist
// import { AuthService } from '@/lib/services';

// Placeholder auth service - replace with actual service once generated
const authService = {
  validateToken: async (token: string) => ({ id: 'user-id', role: 'user' }),
};

// Public routes that don't require authentication
const publicRoutes = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/forgot-password',
  '/api/health',
  '/api/webhooks',
];

// Routes that require authentication
const protectedRoutes = [
  '/api/users',
  '/api/organizations',
  '/api/assessments',
  '/api/content',
  '/api/community',
  '/api/ai',
  '/api/subscriptions',
  '/api/analytics',
  '/api/system',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for non-API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next();
  }
  
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  
  // Check if route requires authentication
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    try {
      // Extract token from Authorization header
      const authHeader = request.headers.get('authorization');
      const token = authHeader?.replace('Bearer ', '');
      
      if (!token) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Authentication token required',
          },
        }, { status: 401 });
      }
      
      // Validate token
      const user = await authService.validateToken(token);
      
      if (!user) {
        return NextResponse.json({
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: 'Invalid or expired token',
          },
        }, { status: 401 });
      }
      
      // Add user to request headers for downstream routes
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', user.id);
      requestHeaders.set('x-user-role', user.role);
      
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Authentication error:', error);
      
      return NextResponse.json({
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Authentication failed',
        },
      }, { status: 401 });
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};