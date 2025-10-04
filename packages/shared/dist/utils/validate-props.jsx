'use client';
import React from 'react';
// ============================================================================
// Props Validation Utilities
// ============================================================================
/**
 * HOC for runtime props validation using Zod schemas
 */
export function withPropsValidation(Component, schema, options = {}) {
    const { strict = false, fallback: FallbackComponent, onError } = options;
    return function ValidatedComponent(props) {
        const result = schema.safeParse(props);
        if (!result.success) {
            // Log error in development
            if (process.env.NODE_ENV === 'development') {
                console.error('Props validation failed:', {
                    component: Component.name || 'Anonymous',
                    error: result.error,
                    props,
                });
            }
            // Call error handler if provided
            onError?.(result.error, props);
            // In strict mode, throw error
            if (strict) {
                throw new Error(`Props validation failed for ${Component.name || 'component'}: ${result.error.message}`);
            }
            // Return fallback component or error message
            if (FallbackComponent) {
                return <FallbackComponent error={result.error}/>;
            }
            return (<div className="p-4 border border-red-200 bg-red-50 rounded-md">
          <h3 className="text-sm font-medium text-red-800">
            Component Props Validation Error
          </h3>
          <p className="text-sm text-red-600 mt-1">{result.error.message}</p>
          {process.env.NODE_ENV === 'development' && (<details className="mt-2">
              <summary className="text-xs text-red-600 cursor-pointer">
                Show validation details
              </summary>
              <pre className="text-xs text-red-600 mt-1 overflow-auto">
                {JSON.stringify(result.error.issues, null, 2)}
              </pre>
            </details>)}
        </div>);
        }
        return <Component {...result.data}/>;
    };
}
/**
 * Hook for validating props at runtime
 */
export function usePropsValidation(props, schema, options = {}) {
    const { onError, onSuccess } = options;
    return React.useMemo(() => {
        const result = schema.safeParse(props);
        if (!result.success) {
            onError?.(result.error);
            return { isValid: false, data: null, error: result.error };
        }
        onSuccess?.(result.data);
        return { isValid: true, data: result.data, error: null };
    }, [props, schema, onError, onSuccess]);
}
export function PropsValidationError({ error, componentName = 'Component', className, }) {
    return (<div className={`p-4 border border-red-200 bg-red-50 rounded-md ${className || ''}`}>
      <h3 className="text-sm font-medium text-red-800">
        {componentName} Props Validation Error
      </h3>
      <p className="text-sm text-red-600 mt-1">{error.message}</p>
      {process.env.NODE_ENV === 'development' && (<details className="mt-2">
          <summary className="text-xs text-red-600 cursor-pointer">
            Show validation details
          </summary>
          <div className="mt-2 space-y-1">
            {error.issues.map((issue, index) => (<div key={index} className="text-xs text-red-600">
                <strong>{issue.path.join('.')}:</strong> {issue.message}
              </div>))}
          </div>
        </details>)}
    </div>);
}
/**
 * Utility for creating validated component props
 */
export function createValidatedProps(schema) {
    return {
        validate: (props) => {
            const result = schema.safeParse(props);
            if (!result.success) {
                throw new Error(`Props validation failed: ${result.error.message}`);
            }
            return result.data;
        },
        safeValidate: (props) => {
            const result = schema.safeParse(props);
            return result.success
                ? { success: true, data: result.data }
                : { success: false, error: result.error };
        },
        schema,
    };
}
/**
 * Runtime props validation for critical components
 */
export function validateCriticalProps(props, schema, componentName) {
    const result = schema.safeParse(props);
    if (!result.success) {
        const errorMessage = `Critical props validation failed for ${componentName}: ${result.error.message}`;
        // In development, log detailed error
        if (process.env.NODE_ENV === 'development') {
            console.error(errorMessage, {
                component: componentName,
                error: result.error,
                props,
            });
        }
        // In production, throw error to prevent invalid rendering
        throw new Error(errorMessage);
    }
    return result.data;
}
/**
 * Safe props validation that returns defaults on error
 */
export function safeValidateProps(props, schema, defaultProps) {
    const result = schema.safeParse(props);
    if (!result.success) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Props validation failed, using defaults:', {
                error: result.error,
                defaultProps,
            });
        }
        return defaultProps;
    }
    return result.data;
}
/**
 * Partial props validation for optional fields
 */
export function validatePartialProps(props, schema, defaultProps) {
    const result = schema.partial().safeParse(props);
    if (!result.success) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Partial props validation failed, using defaults:', {
                error: result.error,
                defaultProps,
            });
        }
        return defaultProps;
    }
    return { ...defaultProps, ...result.data };
}
// ============================================================================
// Component Props Validation Decorators
// ============================================================================
/**
 * Decorator for class components with props validation
 */
export function validateProps(schema, options = {}) {
    return function (Component) {
        return withPropsValidation(Component, schema, options);
    };
}
/**
 * Decorator for functional components with props validation
 */
export function validateComponentProps(schema) {
    return function (Component) {
        return withPropsValidation(Component, schema, {
            strict: process.env.NODE_ENV === 'development',
        });
    };
}
// ============================================================================
// Type-Safe Props Builders
// ============================================================================
/**
 * Type-safe props builder utility
 */
export function createPropsBuilder(schema) {
    return {
        build: (props) => {
            const result = schema.safeParse(props);
            if (!result.success) {
                throw new Error(`Invalid props: ${result.error.message}`);
            }
            return result.data;
        },
        safeBuild: (props) => {
            const result = schema.safeParse(props);
            return result.success
                ? { success: true, data: result.data }
                : { success: false, error: result.error };
        },
        extend: (extension) => {
            return createPropsBuilder(schema.extend(extension.shape));
        },
        schema,
    };
}
//# sourceMappingURL=validate-props.jsx.map