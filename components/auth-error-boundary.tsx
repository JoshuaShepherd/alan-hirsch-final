'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; resetError: () => void }>;
}

export class AuthErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
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

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
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

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return (
          <FallbackComponent
            error={this.state.error!}
            resetError={this.resetError}
          />
        );
      }

      return (
        <div className='min-h-[100dvh] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50'>
          <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <div className='flex justify-center'>
              <AlertTriangle className='h-12 w-12 text-red-500' />
            </div>
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
              Authentication Error
            </h2>
            <div className='mt-4 p-4 bg-red-50 border border-red-200 rounded-md'>
              <div className='flex'>
                <div className='flex-shrink-0'>
                  <AlertTriangle className='h-5 w-5 text-red-400' />
                </div>
                <div className='ml-3'>
                  <h3 className='text-sm font-medium text-red-800'>
                    Something went wrong during authentication
                  </h3>
                  <div className='mt-2 text-sm text-red-700'>
                    <p>
                      An error occurred while processing your authentication
                      request.
                    </p>
                    {this.state.error && (
                      <details className='mt-2'>
                        <summary className='cursor-pointer font-medium'>
                          Technical Details
                        </summary>
                        <pre className='mt-2 text-xs bg-red-100 p-2 rounded overflow-auto'>
                          {this.state.error.message}
                        </pre>
                      </details>
                    )}
                  </div>
                  <div className='mt-4'>
                    <Button
                      onClick={this.resetError}
                      variant='outline'
                      size='sm'
                      className='bg-white hover:bg-red-50'
                    >
                      <RefreshCw className='h-4 w-4 mr-2' />
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
