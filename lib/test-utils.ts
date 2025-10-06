/**
 * Test utilities for the platform
 *
 * This file provides common test utilities and helpers
 * to avoid import resolution issues in test files.
 */

// Re-export from the actual test utils location if it exists
// For now, provide basic test utilities

export const createMockRequest = (url: string, options: RequestInit = {}) => {
  return new Request(url, {
    method: 'GET',
    ...options,
  });
};

export const createMockResponse = () => {
  return new Response();
};

export const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const createMockNextRequest = (
  url: string,
  options: RequestInit = {}
) => {
  return new Request(url, options);
};

export const createMockRouteParams = (params: Record<string, string>) => {
  return Promise.resolve(params);
};
