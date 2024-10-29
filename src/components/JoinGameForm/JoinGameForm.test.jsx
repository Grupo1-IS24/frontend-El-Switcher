import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import JoinGameForm from './JoinGameForm';

describe('JoinGameForm', () => {
  const renderComponent = (isPublic) =>
    render(<JoinGameForm isPublic={isPublic} />);

  it('should render the JoinGameForm component', () => {
    renderComponent(false);
    const inputElement = screen.getByPlaceholderText('Ingresa tu nombre');
    expect(inputElement).toBeInTheDocument();
  });

  it('should render the TextInput component with the correct name and placeholder attributes', () => {
    renderComponent(false);
    const inputElement = screen.getByPlaceholderText('Ingresa tu nombre');
    expect(inputElement).toHaveAttribute('name', 'playerName');
    expect(inputElement).toHaveAttribute('placeholder', 'Ingresa tu nombre');
  });

  it('should render the TextInput component with the correct class names', () => {
    renderComponent(false);
    const inputElement = screen.getByPlaceholderText('Ingresa tu nombre');
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

  it('should not render the password input when isPublic is false', () => {
    renderComponent(false);
    const passwordInput = screen.queryByPlaceholderText(
      'Ingresa la contraseña'
    );
    expect(passwordInput).not.toBeInTheDocument();
  });

  it('should render the password input when isPublic is true', () => {
    renderComponent(true);
    const passwordInput = screen.getByPlaceholderText('Ingresa la contraseña');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('name', 'gamePassword');
  });
});
