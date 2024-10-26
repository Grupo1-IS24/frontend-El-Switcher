import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import NumberInput from './NumberInput';

describe('NumberInput', () => {
  const renderComponent = (props) => render(<NumberInput {...props} />);

  it('should render the NumberInput component', () => {
    renderComponent({ name: 'test-number-input' });
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toBeInTheDocument();
  });

  it('should have the correct name attribute', () => {
    renderComponent({ name: 'test-number-input' });
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveAttribute('name', 'test-number-input');
  });

  it('should have the correct min attribute', () => {
    renderComponent({ name: 'test-number-input', min: '1' });
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveAttribute('min', '1');
  });

  it('should have the correct max attribute', () => {
    renderComponent({ name: 'test-number-input', max: '10' });
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveAttribute('max', '10');
  });

  it('should have the correct placeholder attribute', () => {
    renderComponent({ name: 'test-number-input', placeholder: 'Enter number' });
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter number');
  });

  it('should have the correct class names', () => {
    renderComponent({ name: 'test-number-input' });
    const inputElement = screen.getByRole('spinbutton');
    expect(inputElement).toHaveClass(
      'w-full',
      'px-4',
      'py-2',
      'rounded-lg',
      'bg-gray-700',
      'text-gray-200',
      'placeholder-gray-400',
      'border',
      'border-gray-600',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-amber-500'
    );
  });
});
