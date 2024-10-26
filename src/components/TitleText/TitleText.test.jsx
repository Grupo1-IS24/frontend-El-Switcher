import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TitleText from './TitleText';

describe('TitleText', () => {
  it('should render the TitleText component', () => {
    render(<TitleText />);
    const titleElement = screen.getByText('El switcher');
    expect(titleElement).toBeInTheDocument();
  });

  it('should have the correct class names', () => {
    render(<TitleText />);
    const titleElement = screen.getByText('El switcher');
    expect(titleElement).toHaveClass(
      'text-white',
      'lekton-bold',
      'text-8xl',
      'text-center',
      'mt-24'
    );
  });
});
