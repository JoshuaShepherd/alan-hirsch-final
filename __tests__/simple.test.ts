import { describe, expect, it } from 'vitest';

describe('Basic Test Suite', () => {
  it('should run basic tests without hanging', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle async operations', async () => {
    const result = await Promise.resolve('test');
    expect(result).toBe('test');
  });

  it('should work with basic imports', () => {
    expect(typeof describe).toBe('function');
    expect(typeof it).toBe('function');
    expect(typeof expect).toBe('function');
  });

  it('should handle basic math operations', () => {
    expect(2 * 3).toBe(6);
    expect(10 - 4).toBe(6);
    expect(15 / 3).toBe(5);
  });

  it('should work with arrays and objects', () => {
    const arr = [1, 2, 3];
    expect(arr).toHaveLength(3);
    expect(arr).toContain(2);

    const obj = { name: 'test', value: 42 };
    expect(obj).toHaveProperty('name', 'test');
    expect(obj.value).toBe(42);
  });
});
