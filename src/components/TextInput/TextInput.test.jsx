import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TextInput from './TextInput';

describe('TextInput', () => {
  const renderComponent = (props) => render(<TextInput {...props} />);

  it('should render the TextInput component', () => {
    renderComponent({ name: 'test-input' });
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('should have the correct name attribute', () => {
    renderComponent({ name: 'test-input' });
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('name', 'test-input');
  });

  it('should have the correct placeholder attribute', () => {
    renderComponent({ name: 'test-input', placeholder: 'Enter text' });
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
  });

  it('should have the correct class names', () => {
    renderComponent({ name: 'test-input' });
    const inputElement = screen.getByRole('textbox');
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

  it('should render without a value when "value" is undefined', () => {
    renderComponent({ name: 'test-input' });
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('');
  });

  it('should render with a specific value if "value" is provided', () => {
    renderComponent({ name: 'test-input', value: 'Test Value' });
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('Test Value');
  });

  it('should call onChange handler when input value changes', () => {
    const mockOnChange = vi.fn();
    renderComponent({ name: 'test-input', onChange: mockOnChange });

    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'New Value' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange if onChange is undefined', () => {
    renderComponent({ name: 'test-input' });
    const inputElement = screen.getByRole('textbox');

    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(inputElement).toHaveValue('New Value');
  });
});
