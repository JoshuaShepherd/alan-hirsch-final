// Auto-generated health check route
// Generated at: 2025-10-06T13:20:22.156Z

import { NextRequest, NextResponse } from 'next/server';

// TODO: Import from generated packages once they exist
// import { SystemService } from '@/lib/services';

// Placeholder system service - replace with actual service once generated
const systemService = {
  checkHealth: async () => ({
    healthy: true,
    services: {
      database: 'healthy',
      redis: 'healthy',
      storage: 'healthy',
    },
  }),
};

// GET /api/health - System health check
export async function GET(request: NextRequest) {
  try {
    // Check system health
    const healthStatus = await systemService.checkHealth();
    
    const status = healthStatus.healthy ? 200 : 503;
    
    return NextResponse.json({
      success: healthStatus.healthy,
      data: {
        status: healthStatus.healthy ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString(),
        services: healthStatus.services,
        version: process.env.APP_VERSION || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      },
    }, { status });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      success: false,
      data: {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
    }, { status: 503 });
  }
}