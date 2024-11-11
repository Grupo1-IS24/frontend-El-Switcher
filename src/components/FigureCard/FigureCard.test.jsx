import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FigureCard from './FigureCard';

describe('FigureCard', () => {
  const renderComponent = (props) => render(<FigureCard {...props} />);

  const checkImageAttributes = (src, alt) => {
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', src);
    expect(img).toHaveAttribute('alt', alt);
  };

  const checkButtonClass = (className) => {
    const button = screen.getByRole('button');
    expect(button).toHaveClass(className);
  };

  const checkImageClass = (className) => {
    const img = screen.getByRole('img');
    expect(img).toHaveClass(className);
  };

  describe('Image rendering', () => {
    it('should render the FigureCard component with the correct image path and alt text for valid inputs', () => {
      renderComponent({ figure: 3, difficulty: 'easy' });
      checkImageAttributes(
        '/src/assets/FigureCards/Easy/fig3.svg',
        'Figura easy 3'
      );
    });

    it('should render the default image path and alt text for invalid inputs', () => {
      renderComponent({ figure: 20, difficulty: 'easy' });
      checkImageAttributes(
        '/src/assets/FigureCards/back-fig.svg',
        'Figura de espaldas'
      );
    });

    it('should render the default image path and alt text when no props are provided', () => {
      renderComponent({});
      checkImageAttributes(
        '/src/assets/FigureCards/back-fig.svg',
        'Figura de espaldas'
      );
    });
  });

  describe('Button class application', () => {
    it('should apply the "animate-shriggleNotebook pc:animate-shriggle" class when the button is selected', () => {
      renderComponent({ isSelected: true });
      checkButtonClass('animate-shriggleNotebook pc:animate-shriggle');
    });

    it('should apply the "cursor-not-allowed" class when the button is disabled', () => {
      renderComponent({ disabled: true });
      checkButtonClass('cursor-not-allowed');
    });

    it('should not apply any special class when the button is not selected and not disabled', () => {
      renderComponent({ isSelected: false, disabled: false });
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass('animate-shriggleNotebook pc:animate-shriggle');
      expect(button).not.toHaveClass('cursor-not-allowed');
    });
  });

  describe('Button click behavior', () => {
    let mockOnClick;

    beforeEach(() => {
      mockOnClick = vi.fn();
    });

    it('should call the onClick function when the button is clicked', () => {
      renderComponent({ onClick: mockOnClick, disabled: false });
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalled();
    });

    it('should not call the onClick function when the button is disabled', () => {
      renderComponent({ onClick: mockOnClick, disabled: true });
      const button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Image class application', () => {
    it('should apply the "grayscale" class when the image is blocked', () => {
      renderComponent({ isBlocked: true });
      checkImageClass('grayscale');
    });

    it('should not apply the "grayscale" class when the image is not blocked', () => {
      renderComponent({ isBlocked: false });
      const img = screen.getByRole('img');
      expect(img).not.toHaveClass('grayscale');
    });

    it('should not apply the "grayscale" class when no props are provided', () => {
      renderComponent({});
      const img = screen.getByRole('img');
      expect(img).not.toHaveClass('grayscale');
    });
  });
});
