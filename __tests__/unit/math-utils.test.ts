import { describe, expect, it } from 'vitest';

// Simple utility functions for testing
const add = (a: number, b: number) => a + b;
const multiply = (a: number, b: number) => a * b;
const divide = (a: number, b: number) => {
  if (b === 0) throw new Error('Division by zero');
  return a / b;
};

describe('Math Utils - Unit Tests', () => {
  describe('add function', () => {
    it('should add two positive numbers', () => {
      expect(add(2, 3)).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(add(-2, -3)).toBe(-5);
    });

    it('should add positive and negative numbers', () => {
      expect(add(5, -3)).toBe(2);
    });

    it('should handle zero', () => {
      expect(add(0, 5)).toBe(5);
      expect(add(5, 0)).toBe(5);
    });
  });

  describe('multiply function', () => {
    it('should multiply two positive numbers', () => {
      expect(multiply(3, 4)).toBe(12);
    });

    it('should multiply by zero', () => {
      expect(multiply(5, 0)).toBe(0);
    });

    it('should multiply negative numbers', () => {
      expect(multiply(-2, -3)).toBe(6);
    });
  });

  describe('divide function', () => {
    it('should divide two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(divide(7, 2)).toBe(3.5);
    });

    it('should throw error for division by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero');
    });
  });
});
