'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button } from '../../button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
export class AuthErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error) {
        console.error('🔐 AuthErrorBoundary: Caught error', {
            error: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        });
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('🔐 AuthErrorBoundary: Error details', {
            error: error.message,
            stack: error.stack,
            componentStack: errorInfo.componentStack,
            timestamp: new Date().toISOString(),
        });
        this.setState({
            error,
            errorInfo,
        });
    }
    resetError = () => {
        console.log('🔐 AuthErrorBoundary: Resetting error state');
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };
    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                const FallbackComponent = this.props.fallback;
                return (_jsx(FallbackComponent, { error: this.state.error, resetError: this.resetError }));
            }
            return (_jsx("div", { className: 'min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50', children: _jsxs("div", { className: 'sm:mx-auto sm:w-full sm:max-w-md', children: [_jsx("div", { className: 'flex justify-center', children: _jsx(AlertTriangle, { className: 'h-12 w-12 text-red-500' }) }), _jsx("h2", { className: 'mt-6 text-center text-3xl font-extrabold text-gray-900', children: "Authentication Error" }), _jsx("div", { className: 'mt-4 p-4 bg-red-50 border border-red-200 rounded-md', children: _jsxs("div", { className: 'flex', children: [_jsx("div", { className: 'flex-shrink-0', children: _jsx(AlertTriangle, { className: 'h-5 w-5 text-red-400' }) }), _jsxs("div", { className: 'ml-3', children: [_jsx("h3", { className: 'text-sm font-medium text-red-800', children: "Something went wrong during authentication" }), _jsxs("div", { className: 'mt-2 text-sm text-red-700', children: [_jsx("p", { children: "An error occurred while processing your authentication request." }), this.state.error && (_jsxs("details", { className: 'mt-2', children: [_jsx("summary", { className: 'cursor-pointer font-medium', children: "Technical Details" }), _jsx("pre", { className: 'mt-2 text-xs bg-red-100 p-2 rounded overflow-auto', children: this.state.error.message })] }))] }), _jsx("div", { className: 'mt-4', children: _jsxs(Button, { onClick: this.resetError, variant: 'outline', size: 'sm', className: 'bg-white hover:bg-red-50', children: [_jsx(RefreshCw, { className: 'h-4 w-4 mr-2' }), "Try Again"] }) })] })] }) })] }) }));
        }
        return this.props.children;
    }
}
//# sourceMappingURL=auth-error-boundary.js.map