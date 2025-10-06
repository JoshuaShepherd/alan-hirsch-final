/**
 * API test utilities for testing API routes and server actions
 */
import { NextRequest } from 'next/server';
import { vi } from 'vitest';

export const createMockNextRequest = (
  url: string,
  options: RequestInit = {}
) => {
  return new NextRequest(url, options);
};

export const createMockRouteParams = (params: Record<string, string>) => {
  return Promise.resolve(params);
};

export const createMockFormData = (data: Record<string, string | File>) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return formData;
};

export const createMockHeaders = (headers: Record<string, string> = {}) => {
  const headerInit: HeadersInit = {};
  Object.entries(headers).forEach(([key, value]) => {
    headerInit[key] = value;
  });
  return new Headers(headerInit);
};

export const createMockActionResponse = (data: any, error?: string) => {
  if (error) {
    return { error, ...data };
  }
  return { success: 'Operation completed successfully', ...data };
};

export const mockServerAction = (fn: Function) => {
  return vi.fn().mockImplementation(fn);
};
