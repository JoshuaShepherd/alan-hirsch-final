import { describe, it, expect, vi } from 'vitest';

describe('simple tests', () => {
  it('should pass basic test', () => {
    expect(1 + 1).toBe(2);
  });
});

it('should handle async operations', async () => {
  const result = await Promise.resolve('test');
  expect(result).toBe('test');
});

it('should mock functions correctly', () => {
  const mockFn = vi.fn();
  mockFn('test');
  expect(mockFn).toHaveBeenCalledWith('test');
});
