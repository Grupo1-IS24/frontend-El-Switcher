import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JoinGameForm from './JoinGameForm';

describe('JoinGameForm', () => {
  const renderComponent = () => render(<JoinGameForm />);

  it('should render the JoinGameForm component', () => {
    renderComponent();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('should render the TextInput component with the correct name and placeholder attributes', () => {
    renderComponent();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('name', 'playerName');
    expect(inputElement).toHaveAttribute('placeholder', 'Ingresa tu nombre');
  });

  it('should render the TextInput component with the correct class names', () => {
    renderComponent();
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
});