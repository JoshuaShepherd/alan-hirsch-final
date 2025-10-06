import { describe, expect, it, vi } from 'vitest';
import {
  createMockActionResponse,
  createMockNextRequest,
} from '../utils/api-test-utils';

describe('Basic API Test Suite', () => {
  it('should create mock Next.js requests', () => {
    const request = createMockNextRequest('https://example.com/api/test');
    expect(request).toBeDefined();
    expect(request.url).toBe('https://example.com/api/test');
  });

  it('should create mock action responses', () => {
    const successResponse = createMockActionResponse({ data: 'test' });
    expect(successResponse).toEqual({
      success: 'Operation completed successfully',
      data: 'test',
    });

    const errorResponse = createMockActionResponse(
      { data: 'test' },
      'Error message'
    );
    expect(errorResponse).toEqual({
      error: 'Error message',
      data: 'test',
    });
  });

  it('should work with mocked functions', () => {
    const mockFn = vi.fn().mockReturnValue('mocked result');
    const result = mockFn('test input');

    expect(result).toBe('mocked result');
    expect(mockFn).toHaveBeenCalledWith('test input');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle async operations', async () => {
    const mockAsyncFn = vi.fn().mockResolvedValue('async result');
    const result = await mockAsyncFn();

    expect(result).toBe('async result');
    expect(mockAsyncFn).toHaveBeenCalledTimes(1);
  });
});
