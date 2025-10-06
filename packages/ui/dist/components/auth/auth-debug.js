'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Note: This component should be moved to the main app where database access is available
// import { createSupabaseClient } from '@platform/database';
import { useEffect, useState } from 'react';
import { Badge } from '../../badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../card';
export function AuthDebug() {
    const [debugInfo, setDebugInfo] = useState({
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
    return (_jsxs(Card, { className: "w-full max-w-2xl mx-auto mt-8", children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: ["\uD83D\uDD10 Auth Debug", _jsx(Badge, { variant: debugInfo.isAuthenticated ? 'default' : 'destructive', children: debugInfo.isAuthenticated ? 'Authenticated' : 'Not Authenticated' })] }) }), _jsxs(CardContent, { className: "space-y-4", children: [debugInfo.note && (_jsx("div", { className: "p-4 bg-yellow-50 border border-yellow-200 rounded-md", children: _jsx("p", { className: "text-sm text-yellow-800", children: debugInfo.note }) })), _jsxs("div", { className: "grid grid-cols-2 gap-4 text-sm", children: [_jsxs("div", { children: [_jsx("strong", { children: "Status:" }), ' ', _jsx(Badge, { variant: debugInfo.isAuthenticated ? 'default' : 'destructive', children: debugInfo.isAuthenticated
                                            ? 'Authenticated'
                                            : 'Not Authenticated' })] }), debugInfo.userId && (_jsxs("div", { children: [_jsx("strong", { children: "User ID:" }), " ", debugInfo.userId] })), debugInfo.userEmail && (_jsxs("div", { children: [_jsx("strong", { children: "Email:" }), " ", debugInfo.userEmail] })), _jsxs("div", { children: [_jsx("strong", { children: "Last Updated:" }), " ", debugInfo.timestamp] })] }), debugInfo.error && (_jsxs("div", { className: "p-4 bg-red-50 border border-red-200 rounded-md", children: [_jsx("strong", { className: "text-red-800", children: "Error:" }), _jsx("p", { className: "text-sm text-red-700 mt-1", children: debugInfo.error })] })), debugInfo.session && (_jsxs("div", { className: "p-4 bg-green-50 border border-green-200 rounded-md", children: [_jsx("strong", { className: "text-green-800", children: "Session Info:" }), _jsxs("div", { className: "mt-2 space-y-1 text-sm text-green-700", children: [_jsxs("div", { children: ["Access Token: ", debugInfo.session.access_token] }), _jsxs("div", { children: ["Refresh Token: ", debugInfo.session.refresh_token] }), debugInfo.session.expires_at && (_jsxs("div", { children: ["Expires:", ' ', new Date(debugInfo.session.expires_at * 1000).toLocaleString()] })), _jsxs("div", { children: ["Token Type: ", debugInfo.session.token_type] })] })] }))] })] }));
}
//# sourceMappingURL=auth-debug.js.map