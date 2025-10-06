import React from 'react';
import { z } from 'zod';
/**
 * HOC for runtime props validation using Zod schemas
 */
export declare function withPropsValidation<T extends Record<string, any>>(Component: React.ComponentType<T>, schema: z.ZodSchema<T>, options?: {
    strict?: boolean;
    fallback?: React.ComponentType<{
        error: z.ZodError;
    }>;
    onError?: (error: z.ZodError, props: unknown) => void;
}): (props: T) => React.JSX.Element;
/**
 * Hook for validating props at runtime
 */
export declare function usePropsValidation<T>(props: T, schema: z.ZodSchema<T>, options?: {
    onError?: (error: z.ZodError) => void;
    onSuccess?: (validatedProps: T) => void;
}): {
    isValid: boolean;
    data: null;
    error: z.ZodError<T>;
} | {
    isValid: boolean;
    data: T;
    error: null;
};
/**
 * Component for validating and displaying props errors
 */
interface PropsValidationErrorProps {
    error: z.ZodError;
    componentName?: string;
    className?: string;
}
export declare function PropsValidationError({ error, componentName, className, }: PropsValidationErrorProps): React.JSX.Element;
/**
 * Utility for creating validated component props
 */
export declare function createValidatedProps<T extends Record<string, any>>(schema: z.ZodSchema<T>): {
    validate: (props: unknown) => T;
    safeValidate: (props: unknown) => {
        success: true;
        data: T;
    } | {
        success: false;
        error: z.ZodError;
    };
    schema: z.ZodType<T, z.ZodTypeDef, T>;
};
/**
 * Runtime props validation for critical components
 */
export declare function validateCriticalProps<T>(props: T, schema: z.ZodSchema<T>, componentName: string): T;
/**
 * Safe props validation that returns defaults on error
 */
export declare function safeValidateProps<T>(props: unknown, schema: z.ZodSchema<T>, defaultProps: T): T;
/**
 * Partial props validation for optional fields
 */
export declare function validatePartialProps<T extends Record<string, any>>(props: Partial<T>, schema: z.ZodSchema<T>, defaultProps: T): T;
/**
 * Decorator for class components with props validation
 */
export declare function validateProps<T extends Record<string, any>>(schema: z.ZodSchema<T>, options?: {
    strict?: boolean;
    fallback?: React.ComponentType<{
        error: z.ZodError;
    }>;
}): <P extends T>(Component: React.ComponentType<T>) => (props: T) => React.JSX.Element;
/**
 * Decorator for functional components with props validation
 */
export declare function validateComponentProps<T extends Record<string, any>>(schema: z.ZodSchema<T>): <P extends T>(Component: React.ComponentType<T>) => (props: T) => React.JSX.Element;
/**
 * Type-safe props builder utility
 */
export declare function createPropsBuilder<T extends Record<string, any>>(schema: z.ZodSchema<T>): {
    build: (props: Partial<T>) => T;
    safeBuild: (props: Partial<T>) => {
        success: true;
        data: T;
    } | {
        success: false;
        error: z.ZodError;
    };
    extend: <U extends Record<string, any>>(extension: z.ZodRawShape) => {
        build: (props: Partial<{
            [x: string]: any;
        }>) => {
            [x: string]: any;
        };
        safeBuild: (props: Partial<{
            [x: string]: any;
        }>) => {
            success: true;
            data: {
                [x: string]: any;
            };
        } | {
            success: false;
            error: z.ZodError;
        };
        extend: <U_1 extends Record<string, any>>(extension: z.ZodRawShape) => /*elided*/ any;
        schema: z.ZodType<{
            [x: string]: any;
        }, z.ZodTypeDef, {
            [x: string]: any;
        }>;
    };
    schema: z.ZodType<T, z.ZodTypeDef, T>;
};
export {};
//# sourceMappingURL=validate-props.d.ts.map