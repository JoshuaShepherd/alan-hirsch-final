'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { createClient } from '@platform/database/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '../../card';
import { Badge } from '../../badge';
export function AuthDebug() {
    const [debugInfo, setDebugInfo] = useState({
        isAuthenticated: false,
        timestamp: new Date().toISOString(),
    });
    useEffect(() => {
        const supabase = createClient();
        const checkAuth = async () => {
            try {
                console.log('🔐 AuthDebug: Checking authentication state');
                const { data: { user }, error, } = await supabase.auth.getUser();
                const { data: { session }, } = await supabase.auth.getSession();
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
            }
            catch (error) {
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
        const { data: { subscription }, } = supabase.auth.onAuthStateChange((event, session) => {
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
    return (_jsxs(Card, { className: 'fixed bottom-4 right-4 w-80 max-h-96 overflow-auto bg-white shadow-lg border border-gray-200 z-50', children: [_jsx(CardHeader, { className: 'pb-2', children: _jsx(CardTitle, { className: 'text-sm font-medium text-gray-900', children: "\uD83D\uDD10 Auth Debug Info" }) }), _jsxs(CardContent, { className: 'space-y-2 text-xs', children: [_jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("span", { className: 'text-gray-600', children: "Status:" }), _jsx(Badge, { variant: debugInfo.isAuthenticated ? 'default' : 'destructive', children: debugInfo.isAuthenticated ? 'Authenticated' : 'Not Authenticated' })] }), debugInfo.userId && (_jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("span", { className: 'text-gray-600', children: "User ID:" }), _jsx("span", { className: 'font-mono text-xs text-gray-800 truncate max-w-32', children: debugInfo.userId })] })), debugInfo.userEmail && (_jsxs("div", { className: 'flex items-center justify-between', children: [_jsx("span", { className: 'text-gray-600', children: "Email:" }), _jsx("span", { className: 'text-gray-800 truncate max-w-32', children: debugInfo.userEmail })] })), debugInfo.session && (_jsxs("div", { className: 'space-y-1', children: [_jsx("div", { className: 'text-gray-600 font-medium', children: "Session:" }), _jsxs("div", { className: 'ml-2 space-y-1', children: [_jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { className: 'text-gray-600', children: "Access Token:" }), _jsx("span", { className: 'text-gray-800', children: debugInfo.session.access_token })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { className: 'text-gray-600', children: "Refresh Token:" }), _jsx("span", { className: 'text-gray-800', children: debugInfo.session.refresh_token })] }), _jsxs("div", { className: 'flex justify-between', children: [_jsx("span", { className: 'text-gray-600', children: "Expires:" }), _jsx("span", { className: 'text-gray-800', children: debugInfo.session.expires_at
                                                    ? new Date(debugInfo.session.expires_at * 1000).toLocaleTimeString()
                                                    : 'N/A' })] })] })] })), debugInfo.error && (_jsxs("div", { className: 'space-y-1', children: [_jsx("div", { className: 'text-red-600 font-medium', children: "Error:" }), _jsx("div", { className: 'text-red-700 bg-red-50 p-2 rounded text-xs', children: debugInfo.error })] })), _jsxs("div", { className: 'text-gray-500 text-xs pt-2 border-t', children: ["Last updated: ", new Date(debugInfo.timestamp).toLocaleTimeString()] })] })] }));
}
//# sourceMappingURL=auth-debug.js.map