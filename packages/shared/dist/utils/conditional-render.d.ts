import React from 'react';
/**
 * Safe conditional rendering component that handles null/undefined data gracefully
 */
interface ConditionalRenderProps<T> {
    condition: T | null | undefined;
    children: (data: NonNullable<T>) => React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}
export declare function ConditionalRender<T>({ condition, children, fallback, className, }: ConditionalRenderProps<T>): React.JSX.Element | null;
/**
 * Conditional rendering with loading state
 */
interface ConditionalRenderWithLoadingProps<T> {
    data: T | null | undefined;
    isLoading: boolean;
    children: (data: NonNullable<T>) => React.ReactNode;
    loadingFallback?: React.ReactNode;
    emptyFallback?: React.ReactNode;
    className?: string;
}
export declare function ConditionalRenderWithLoading<T>({ data, isLoading, children, loadingFallback, emptyFallback, className, }: ConditionalRenderWithLoadingProps<T>): React.JSX.Element | null;
/**
 * Conditional rendering for arrays
 */
interface ConditionalArrayRenderProps<T> {
    items: T[] | null | undefined;
    children: (items: T[]) => React.ReactNode;
    emptyFallback?: React.ReactNode;
    loadingFallback?: React.ReactNode;
    isLoading?: boolean;
    className?: string;
}
export declare function ConditionalArrayRender<T>({ items, children, emptyFallback, loadingFallback, isLoading, className, }: ConditionalArrayRenderProps<T>): React.JSX.Element | null;
/**
 * Conditional rendering with permission check
 */
interface ConditionalRenderWithPermissionProps {
    hasPermission: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}
export declare function ConditionalRenderWithPermission({ hasPermission, children, fallback, className, }: ConditionalRenderWithPermissionProps): React.JSX.Element | null;
/**
 * Conditional rendering with feature flag
 */
interface ConditionalRenderWithFeatureProps {
    featureEnabled: boolean;
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}
export declare function ConditionalRenderWithFeature({ featureEnabled, children, fallback, className, }: ConditionalRenderWithFeatureProps): React.JSX.Element | null;
/**
 * Conditional rendering with environment check
 */
interface ConditionalRenderWithEnvironmentProps {
    environment: string | string[];
    children: React.ReactNode;
    fallback?: React.ReactNode;
    className?: string;
}
export declare function ConditionalRenderWithEnvironment({ environment, children, fallback, className, }: ConditionalRenderWithEnvironmentProps): React.JSX.Element | null;
/**
 * Safe data access hook that provides default values
 */
export declare function useSafeData<T>(data: T | null | undefined, defaultValue: T): T;
/**
 * Safe array access hook
 */
export declare function useSafeArray<T>(data: T[] | null | undefined, defaultValue?: T[]): T[];
/**
 * Safe object access hook
 */
export declare function useSafeObject<T extends Record<string, any>>(data: T | null | undefined, defaultValue: T): T;
/**
 * Safe string access hook
 */
export declare function useSafeString(data: string | null | undefined, defaultValue?: string): string;
/**
 * Safe number access hook
 */
export declare function useSafeNumber(data: number | null | undefined, defaultValue?: number): number;
/**
 * Safe boolean access hook
 */
export declare function useSafeBoolean(data: boolean | null | undefined, defaultValue?: boolean): boolean;
/**
 * Data validation hook with fallback
 */
export declare function useValidatedData<T>(data: T | null | undefined, validator: (data: T) => boolean, defaultValue: T): T;
/**
 * Array validation hook
 */
export declare function useValidatedArray<T>(data: T[] | null | undefined, validator: (items: T[]) => boolean, defaultValue?: T[]): T[];
/**
 * String validation hook
 */
export declare function useValidatedString(data: string | null | undefined, validator: (str: string) => boolean, defaultValue?: string): string;
/**
 * Conditional class names utility
 */
export declare function conditionalClassNames(baseClasses: string, conditionalClasses: Record<string, boolean>): string;
/**
 * Conditional style utility
 */
export declare function conditionalStyles(baseStyles: React.CSSProperties, conditionalStyles: Record<string, React.CSSProperties>): React.CSSProperties;
/**
 * HOC for conditional rendering
 */
export declare function withConditionalRender<T extends Record<string, any>>(Component: React.ComponentType<T>, condition: (props: T) => boolean, fallback?: React.ComponentType<T>): (props: T) => React.JSX.Element | null;
/**
 * HOC for permission-based rendering
 */
export declare function withPermission(Component: React.ComponentType<any>, permission: string, fallback?: React.ComponentType<any>): (props: any) => React.JSX.Element | null;
/**
 * HOC for feature flag rendering
 */
export declare function withFeatureFlag(Component: React.ComponentType<any>, featureFlag: string, fallback?: React.ComponentType<any>): (props: any) => React.JSX.Element | null;
export {};
//# sourceMappingURL=conditional-render.d.ts.map