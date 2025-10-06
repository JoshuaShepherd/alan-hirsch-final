import React from 'react';
import { describe, expect, it, vi } from 'vitest';
import { createMockRouter, renderWithMocks } from '../utils/ui-test-utils';

// Simple test component
const TestButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button onClick={onClick} data-testid="test-button">
    {children}
  </button>
);

const TestCard = ({ title, content }: { title: string; content: string }) => (
  <div data-testid="test-card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

describe('Basic UI Component Test Suite', () => {
  it('should render components with mocks', () => {
    const mockClick = vi.fn();
    const { getByTestId } = renderWithMocks(
      <TestButton onClick={mockClick}>Click me</TestButton>
    );

    const button = getByTestId('test-button');
    expect(button).toBeDefined();
    expect(button.textContent).toBe('Click me');
  });

  it('should render card components', () => {
    const { getByTestId } = renderWithMocks(
      <TestCard title="Test Title" content="Test content" />
    );

    const card = getByTestId('test-card');
    expect(card).toBeDefined();
    expect(card.querySelector('h2')?.textContent).toBe('Test Title');
    expect(card.querySelector('p')?.textContent).toBe('Test content');
  });

  it('should create mock router', () => {
    const mockRouter = createMockRouter();
    expect(mockRouter).toBeDefined();
    expect(typeof mockRouter.push).toBe('function');
    expect(typeof mockRouter.replace).toBe('function');
    expect(typeof mockRouter.back).toBe('function');
  });

  it('should handle component interactions', () => {
    const mockClick = vi.fn();
    const { getByTestId } = renderWithMocks(
      <TestButton onClick={mockClick}>Click me</TestButton>
    );

    const button = getByTestId('test-button');
    button.click();

    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
