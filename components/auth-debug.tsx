'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AuthDebugInfo {
  isAuthenticated: boolean;
  userId?: string;
  userEmail?: string;
  session?: any;
  error?: string;
  timestamp: string;
}

export function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState<AuthDebugInfo>({
    isAuthenticated: false,
    timestamp: new Date().toISOString(),
  });

  useEffect(() => {
    const supabase = createClient();

    const checkAuth = async () => {
      try {
        console.log('🔐 AuthDebug: Checking authentication state');

        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        console.log('🔐 AuthDebug: Auth state', {
          hasUser: !!user,
          hasSession: !!session,
          error: error?.message,
        });

        setDebugInfo({
          isAuthenticated: !!user,
          userId: user?.id,
          userEmail: user?.email,
          session: session
            ? {
                access_token: session.access_token ? 'present' : 'missing',
                refresh_token: session.refresh_token ? 'present' : 'missing',
                expires_at: session.expires_at,
                token_type: session.token_type,
              }
            : null,
          error: error?.message,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('🔐 AuthDebug: Error checking auth', error);
        setDebugInfo({
          isAuthenticated: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          timestamp: new Date().toISOString(),
        });
      }
    };

    checkAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('🔐 AuthDebug: Auth state changed', {
        event,
        hasSession: !!session,
      });
      checkAuth();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className='fixed bottom-4 right-4 w-80 max-h-96 overflow-auto bg-white shadow-lg border border-gray-200 z-50'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-sm font-medium text-gray-900'>
          🔐 Auth Debug Info
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-2 text-xs'>
        <div className='flex items-center justify-between'>
          <span className='text-gray-600'>Status:</span>
          <Badge
            variant={debugInfo.isAuthenticated ? 'default' : 'destructive'}
          >
            {debugInfo.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </Badge>
        </div>

        {debugInfo.userId && (
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>User ID:</span>
            <span className='font-mono text-xs text-gray-800 truncate max-w-32'>
              {debugInfo.userId}
            </span>
          </div>
        )}

        {debugInfo.userEmail && (
          <div className='flex items-center justify-between'>
            <span className='text-gray-600'>Email:</span>
            <span className='text-gray-800 truncate max-w-32'>
              {debugInfo.userEmail}
            </span>
          </div>
        )}

        {debugInfo.session && (
          <div className='space-y-1'>
            <div className='text-gray-600 font-medium'>Session:</div>
            <div className='ml-2 space-y-1'>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Access Token:</span>
                <span className='text-gray-800'>
                  {debugInfo.session.access_token}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Refresh Token:</span>
                <span className='text-gray-800'>
                  {debugInfo.session.refresh_token}
                </span>
              </div>
              <div className='flex justify-between'>
                <span className='text-gray-600'>Expires:</span>
                <span className='text-gray-800'>
                  {debugInfo.session.expires_at
                    ? new Date(
                        debugInfo.session.expires_at * 1000
                      ).toLocaleTimeString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {debugInfo.error && (
          <div className='space-y-1'>
            <div className='text-red-600 font-medium'>Error:</div>
            <div className='text-red-700 bg-red-50 p-2 rounded text-xs'>
              {debugInfo.error}
            </div>
          </div>
        )}

        <div className='text-gray-500 text-xs pt-2 border-t'>
          Last updated: {new Date(debugInfo.timestamp).toLocaleTimeString()}
        </div>
      </CardContent>
    </Card>
  );
}

