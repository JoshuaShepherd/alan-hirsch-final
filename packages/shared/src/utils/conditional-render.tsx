'use client';

import React from 'react';
import { cn } from '../utils';

// ============================================================================
// Conditional Rendering Utilities
// ============================================================================

/**
 * Safe conditional rendering component that handles null/undefined data gracefully
 */
interface ConditionalRenderProps<T> {
  condition: T | null | undefined;
  children: (data: NonNullable<T>) => React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ConditionalRender<T>({
  condition,
  children,
  fallback,
  className,
}: ConditionalRenderProps<T>) {
  if (!condition) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children(condition)}</div>;
}

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

export function ConditionalRenderWithLoading<T>({
  data,
  isLoading,
  children,
  loadingFallback,
  emptyFallback,
  className,
}: ConditionalRenderWithLoadingProps<T>) {
  if (isLoading) {
    return loadingFallback ? (
      <div className={className}>{loadingFallback}</div>
    ) : null;
  }

  if (!data) {
    return emptyFallback ? (
      <div className={className}>{emptyFallback}</div>
    ) : null;
  }

  return <div className={className}>{children(data)}</div>;
}

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

export function ConditionalArrayRender<T>({
  items,
  children,
  emptyFallback,
  loadingFallback,
  isLoading = false,
  className,
}: ConditionalArrayRenderProps<T>) {
  if (isLoading) {
    return loadingFallback ? (
      <div className={className}>{loadingFallback}</div>
    ) : null;
  }

  if (!items || items.length === 0) {
    return emptyFallback ? (
      <div className={className}>{emptyFallback}</div>
    ) : null;
  }

  return <div className={className}>{children(items)}</div>;
}

/**
 * Conditional rendering with permission check
 */
interface ConditionalRenderWithPermissionProps {
  hasPermission: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ConditionalRenderWithPermission({
  hasPermission,
  children,
  fallback,
  className,
}: ConditionalRenderWithPermissionProps) {
  if (!hasPermission) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children}</div>;
}

/**
 * Conditional rendering with feature flag
 */
interface ConditionalRenderWithFeatureProps {
  featureEnabled: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ConditionalRenderWithFeature({
  featureEnabled,
  children,
  fallback,
  className,
}: ConditionalRenderWithFeatureProps) {
  if (!featureEnabled) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children}</div>;
}

/**
 * Conditional rendering with environment check
 */
interface ConditionalRenderWithEnvironmentProps {
  environment: string | string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function ConditionalRenderWithEnvironment({
  environment,
  children,
  fallback,
  className,
}: ConditionalRenderWithEnvironmentProps) {
  const currentEnv = process.env.NODE_ENV;
  const allowedEnvs = Array.isArray(environment) ? environment : [environment];

  if (!allowedEnvs.includes(currentEnv)) {
    return fallback ? <div className={className}>{fallback}</div> : null;
  }

  return <div className={className}>{children}</div>;
}

// ============================================================================
// Safe Data Access Utilities
// ============================================================================

/**
 * Safe data access hook that provides default values
 */
export function useSafeData<T>(data: T | null | undefined, defaultValue: T): T {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

/**
 * Safe array access hook
 */
export function useSafeArray<T>(
  data: T[] | null | undefined,
  defaultValue: T[] = []
): T[] {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

/**
 * Safe object access hook
 */
export function useSafeObject<T extends Record<string, any>>(
  data: T | null | undefined,
  defaultValue: T
): T {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

/**
 * Safe string access hook
 */
export function useSafeString(
  data: string | null | undefined,
  defaultValue: string = ''
): string {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

/**
 * Safe number access hook
 */
export function useSafeNumber(
  data: number | null | undefined,
  defaultValue: number = 0
): number {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

/**
 * Safe boolean access hook
 */
export function useSafeBoolean(
  data: boolean | null | undefined,
  defaultValue: boolean = false
): boolean {
  return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}

// ============================================================================
// Data Validation Utilities
// ============================================================================

/**
 * Data validation hook with fallback
 */
export function useValidatedData<T>(
  data: T | null | undefined,
  validator: (data: T) => boolean,
  defaultValue: T
): T {
  return React.useMemo(() => {
    if (!data) return defaultValue;
    return validator(data) ? data : defaultValue;
  }, [data, validator, defaultValue]);
}

/**
 * Array validation hook
 */
export function useValidatedArray<T>(
  data: T[] | null | undefined,
  validator: (items: T[]) => boolean,
  defaultValue: T[] = []
): T[] {
  return React.useMemo(() => {
    if (!data) return defaultValue;
    return validator(data) ? data : defaultValue;
  }, [data, validator, defaultValue]);
}

/**
 * String validation hook
 */
export function useValidatedString(
  data: string | null | undefined,
  validator: (str: string) => boolean,
  defaultValue: string = ''
): string {
  return React.useMemo(() => {
    if (!data) return defaultValue;
    return validator(data) ? data : defaultValue;
  }, [data, validator, defaultValue]);
}

// ============================================================================
// Conditional Styling Utilities
// ============================================================================

/**
 * Conditional class names utility
 */
export function conditionalClassNames(
  baseClasses: string,
  conditionalClasses: Record<string, boolean>
): string {
  const classes = Object.entries(conditionalClasses)
    .filter(([, condition]) => condition)
    .map(([className]) => className);

  return cn(baseClasses, ...classes);
}

/**
 * Conditional style utility
 */
export function conditionalStyles(
  baseStyles: React.CSSProperties,
  conditionalStyles: Record<string, React.CSSProperties>
): React.CSSProperties {
  return Object.entries(conditionalStyles).reduce(
    (acc, [, styles]) => ({ ...acc, ...styles }),
    baseStyles
  );
}

// ============================================================================
// Higher-Order Components for Conditional Rendering
// ============================================================================

/**
 * HOC for conditional rendering
 */
export function withConditionalRender<T extends Record<string, any>>(
  Component: React.ComponentType<T>,
  condition: (props: T) => boolean,
  fallback?: React.ComponentType<T>
) {
  return function ConditionalComponent(props: T) {
    if (!condition(props)) {
      return fallback ? <fallback {...props} /> : null;
    }

    return <Component {...props} />;
  };
}

/**
 * HOC for permission-based rendering
 */
export function withPermission(
  Component: React.ComponentType<any>,
  permission: string,
  fallback?: React.ComponentType<any>
) {
  return function PermissionComponent(props: any) {
    // This would integrate with your permission system
    const hasPermission = true; // Replace with actual permission check

    if (!hasPermission) {
      return fallback ? <fallback {...props} /> : null;
    }

    return <Component {...props} />;
  };
}

/**
 * HOC for feature flag rendering
 */
export function withFeatureFlag(
  Component: React.ComponentType<any>,
  featureFlag: string,
  fallback?: React.ComponentType<any>
) {
  return function FeatureFlagComponent(props: any) {
    // This would integrate with your feature flag system
    const featureEnabled = true; // Replace with actual feature flag check

    if (!featureEnabled) {
      return fallback ? <fallback {...props} /> : null;
    }

    return <Component {...props} />;
  };
}
