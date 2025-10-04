'use client';
import React from 'react';
import { cn } from './utils';
export function ConditionalRender({ condition, children, fallback, className, }) {
    if (!condition) {
        return fallback ? <div className={className}>{fallback}</div> : null;
    }
    return <div className={className}>{children(condition)}</div>;
}
export function ConditionalRenderWithLoading({ data, isLoading, children, loadingFallback, emptyFallback, className, }) {
    if (isLoading) {
        return loadingFallback ? (<div className={className}>{loadingFallback}</div>) : null;
    }
    if (!data) {
        return emptyFallback ? (<div className={className}>{emptyFallback}</div>) : null;
    }
    return <div className={className}>{children(data)}</div>;
}
export function ConditionalArrayRender({ items, children, emptyFallback, loadingFallback, isLoading = false, className, }) {
    if (isLoading) {
        return loadingFallback ? (<div className={className}>{loadingFallback}</div>) : null;
    }
    if (!items || items.length === 0) {
        return emptyFallback ? (<div className={className}>{emptyFallback}</div>) : null;
    }
    return <div className={className}>{children(items)}</div>;
}
export function ConditionalRenderWithPermission({ hasPermission, children, fallback, className, }) {
    if (!hasPermission) {
        return fallback ? <div className={className}>{fallback}</div> : null;
    }
    return <div className={className}>{children}</div>;
}
export function ConditionalRenderWithFeature({ featureEnabled, children, fallback, className, }) {
    if (!featureEnabled) {
        return fallback ? <div className={className}>{fallback}</div> : null;
    }
    return <div className={className}>{children}</div>;
}
export function ConditionalRenderWithEnvironment({ environment, children, fallback, className, }) {
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
export function useSafeData(data, defaultValue) {
    return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}
/**
 * Safe array access hook
 */
export function useSafeArray(data, defaultValue = []) {
    return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}
/**
 * Safe object access hook
 */
export function useSafeObject(data, defaultValue) {
    return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}
/**
 * Safe string access hook
 */
export function useSafeString(data, defaultValue = '') {
    return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}
/**
 * Safe number access hook
 */
export function useSafeNumber(data, defaultValue = 0) {
    return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}
/**
 * Safe boolean access hook
 */
export function useSafeBoolean(data, defaultValue = false) {
    return React.useMemo(() => data ?? defaultValue, [data, defaultValue]);
}
// ============================================================================
// Data Validation Utilities
// ============================================================================
/**
 * Data validation hook with fallback
 */
export function useValidatedData(data, validator, defaultValue) {
    return React.useMemo(() => {
        if (!data)
            return defaultValue;
        return validator(data) ? data : defaultValue;
    }, [data, validator, defaultValue]);
}
/**
 * Array validation hook
 */
export function useValidatedArray(data, validator, defaultValue = []) {
    return React.useMemo(() => {
        if (!data)
            return defaultValue;
        return validator(data) ? data : defaultValue;
    }, [data, validator, defaultValue]);
}
/**
 * String validation hook
 */
export function useValidatedString(data, validator, defaultValue = '') {
    return React.useMemo(() => {
        if (!data)
            return defaultValue;
        return validator(data) ? data : defaultValue;
    }, [data, validator, defaultValue]);
}
// ============================================================================
// Conditional Styling Utilities
// ============================================================================
/**
 * Conditional class names utility
 */
export function conditionalClassNames(baseClasses, conditionalClasses) {
    const classes = Object.entries(conditionalClasses)
        .filter(([, condition]) => condition)
        .map(([className]) => className);
    return cn(baseClasses, ...classes);
}
/**
 * Conditional style utility
 */
export function conditionalStyles(baseStyles, conditionalStyles) {
    return Object.entries(conditionalStyles).reduce((acc, [, styles]) => ({ ...acc, ...styles }), baseStyles);
}
// ============================================================================
// Higher-Order Components for Conditional Rendering
// ============================================================================
/**
 * HOC for conditional rendering
 */
export function withConditionalRender(Component, condition, fallback) {
    return function ConditionalComponent(props) {
        if (!condition(props)) {
            return fallback ? <fallback {...props}/> : null;
        }
        return <Component {...props}/>;
    };
}
/**
 * HOC for permission-based rendering
 */
export function withPermission(Component, permission, fallback) {
    return function PermissionComponent(props) {
        // This would integrate with your permission system
        const hasPermission = true; // Replace with actual permission check
        if (!hasPermission) {
            return fallback ? <fallback {...props}/> : null;
        }
        return <Component {...props}/>;
    };
}
/**
 * HOC for feature flag rendering
 */
export function withFeatureFlag(Component, featureFlag, fallback) {
    return function FeatureFlagComponent(props) {
        // This would integrate with your feature flag system
        const featureEnabled = true; // Replace with actual feature flag check
        if (!featureEnabled) {
            return fallback ? <fallback {...props}/> : null;
        }
        return <Component {...props}/>;
    };
}
//# sourceMappingURL=conditional-render.jsx.map