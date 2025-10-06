'use client';

import { cn } from '@platform/shared/utils';
import { Alert, AlertDescription, AlertTitle } from '@platform/ui/alert';
import { Button } from '@platform/ui/button';
import { AlertTriangle, Bug, Home, RefreshCw } from 'lucide-react';
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  className?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Error Boundary Component
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    this.props.onError?.(error, errorInfo);

    // Log error to console in development
    if (process.env['NODE_ENV'] === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReportBug = () => {
    const errorDetails = {
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    // In a real app, you'd send this to your error reporting service
    console.error('Error report:', errorDetails);

    // For now, copy to clipboard
    navigator.clipboard
      .writeText(JSON.stringify(errorDetails, null, 2))
      .then(() => {
        alert(
          'Error details copied to clipboard. Please share this with the development team.'
        );
      })
      .catch(() => {
        alert(
          'Please copy the error details from the console and share with the development team.'
        );
      });
  };

  override render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div
          className={cn(
            'flex flex-col items-center justify-center min-h-[400px] p-8',
            this.props.className
          )}
        >
          <Alert className="max-w-lg">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription className="mt-2">
              An unexpected error occurred. This has been logged and we'll look
              into it.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button onClick={this.handleRetry} variant="default">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={this.handleReload} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload Page
            </Button>
            <Button onClick={this.handleGoHome} variant="outline">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>

          {process.env['NODE_ENV'] === 'development' && this.state.error && (
            <details className="mt-6 max-w-2xl w-full">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                Error Details (Development)
              </summary>
              <div className="mt-2 p-4 bg-muted rounded-lg text-xs font-mono overflow-auto max-h-60">
                <div className="mb-2">
                  <strong>Error:</strong> {this.state.error.message}
                </div>
                {this.state.error.stack && (
                  <div className="mb-2">
                    <strong>Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.error.stack}
                    </pre>
                  </div>
                )}
                {this.state.errorInfo?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="whitespace-pre-wrap mt-1">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
              <Button
                onClick={this.handleReportBug}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                <Bug className="mr-2 h-3 w-3" />
                Copy Error Details
              </Button>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for functional components to handle errors
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  const captureError = React.useCallback((error: Error) => {
    setError(error);
  }, []);

  React.useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  return { captureError, resetError };
}

// Simple error display component for non-critical errors
interface ErrorDisplayProps {
  error: Error;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  title = 'Error',
  description,
  onRetry,
  onDismiss,
  className,
}: ErrorDisplayProps) {
  return (
    <Alert className={cn('border-destructive', className)}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription className="mt-2">
        {description || error.message}
      </AlertDescription>
      {(onRetry || onDismiss) && (
        <div className="flex gap-2 mt-3">
          {onRetry && (
            <Button onClick={onRetry} size="sm" variant="outline">
              <RefreshCw className="mr-2 h-3 w-3" />
              Retry
            </Button>
          )}
          {onDismiss && (
            <Button onClick={onDismiss} size="sm" variant="ghost">
              Dismiss
            </Button>
          )}
        </div>
      )}
    </Alert>
  );
}

// Error state for async data loading
interface AsyncErrorProps {
  error: Error;
  onRetry?: () => void;
  className?: string;
}

export function AsyncError({ error, onRetry, className }: AsyncErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold text-destructive mb-2">
        Failed to load data
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        {error.message || 'An unexpected error occurred while loading data.'}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

// Network error specific component
interface NetworkErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function NetworkError({ onRetry, className }: NetworkErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="text-6xl mb-4">📡</div>
      <h3 className="text-lg font-semibold mb-2">Connection Error</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        Unable to connect to the server. Please check your internet connection
        and try again.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry Connection
        </Button>
      )}
    </div>
  );
}

// Permission error component
interface PermissionErrorProps {
  onRetry?: () => void;
  className?: string;
}

export function PermissionError({ onRetry, className }: PermissionErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="text-6xl mb-4">🔒</div>
      <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        You don't have permission to access this resource. Please contact your
        administrator if you believe this is an error.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Check Again
        </Button>
      )}
    </div>
  );
}

// Not found error component
interface NotFoundErrorProps {
  resource?: string;
  onRetry?: () => void;
  className?: string;
}

export function NotFoundError({
  resource = 'Resource',
  onRetry,
  className,
}: NotFoundErrorProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 text-center',
        className
      )}
    >
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-lg font-semibold mb-2">{resource} Not Found</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">
        The {resource.toLowerCase()} you're looking for doesn't exist or may
        have been removed.
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      )}
    </div>
  );
}
