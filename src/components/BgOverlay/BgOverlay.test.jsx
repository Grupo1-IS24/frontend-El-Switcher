import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import BackgroundOverlay from './BgOverlay';
import homeBg from '../../assets/img/home-bg.jpeg';

describe('BackgroundOverlay', () => {
  it('renders the BackgroundOverlay component', () => {
    render(<BackgroundOverlay />);
    const backgroundOverlay = screen.getByTestId('background-overlay');
    expect(backgroundOverlay).toBeInTheDocument();
    expect(backgroundOverlay).toHaveClass('fixed inset-0 bg-cover bg-center');
    expect(backgroundOverlay).toHaveStyle(`backgroundImage: url(${homeBg})`);
  });
});
