'use client';

// Note: This component should be moved to the main app where database access is available
// import { createSupabaseClient } from '@platform/database';
import { useEffect, useState } from 'react';
import { Badge } from '../../badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../card';

interface AuthDebugInfo {
  isAuthenticated: boolean;
  userId?: string;
  userEmail?: string;
  session?: {
    access_token: string;
    refresh_token: string;
    expires_at?: number;
    token_type: string;
  } | null;
  error?: string;
  timestamp: string;
  note?: string;
}

export function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState<AuthDebugInfo>({
    isAuthenticated: false,
    timestamp: new Date().toISOString(),
    note: 'This component requires database access and should be moved to the main app',
  });

  useEffect(() => {
    // TODO: This component should be moved to the main app where database access is available
    // For now, we'll show a placeholder
    setDebugInfo({
      isAuthenticated: false,
      timestamp: new Date().toISOString(),
      note: 'This component requires database access and should be moved to the main app',
    });
  }, []);

  // Only show in development
  if (process.env['NODE_ENV'] !== 'development') {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          🔐 Auth Debug
          <Badge
            variant={debugInfo.isAuthenticated ? 'default' : 'destructive'}
          >
            {debugInfo.isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {debugInfo.note && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">{debugInfo.note}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <strong>Status:</strong>{' '}
            <Badge
              variant={debugInfo.isAuthenticated ? 'default' : 'destructive'}
            >
              {debugInfo.isAuthenticated
                ? 'Authenticated'
                : 'Not Authenticated'}
            </Badge>
          </div>

          {debugInfo.userId && (
            <div>
              <strong>User ID:</strong> {debugInfo.userId}
            </div>
          )}

          {debugInfo.userEmail && (
            <div>
              <strong>Email:</strong> {debugInfo.userEmail}
            </div>
          )}

          <div>
            <strong>Last Updated:</strong> {debugInfo.timestamp}
          </div>
        </div>

        {debugInfo.error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <strong className="text-red-800">Error:</strong>
            <p className="text-sm text-red-700 mt-1">{debugInfo.error}</p>
          </div>
        )}

        {debugInfo.session && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <strong className="text-green-800">Session Info:</strong>
            <div className="mt-2 space-y-1 text-sm text-green-700">
              <div>Access Token: {debugInfo.session.access_token}</div>
              <div>Refresh Token: {debugInfo.session.refresh_token}</div>
              {debugInfo.session.expires_at && (
                <div>
                  Expires:{' '}
                  {new Date(
                    debugInfo.session.expires_at * 1000
                  ).toLocaleString()}
                </div>
              )}
              <div>Token Type: {debugInfo.session.token_type}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
