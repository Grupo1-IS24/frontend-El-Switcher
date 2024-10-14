import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './HomePage';
import homeBg from '../assets/img/home-bg.jpeg';

describe('HomePage', () => {
  beforeEach(() => {
    render(
      <Router>
        <HomePage />
      </Router>
    );
  });

  it('renders the BackgroundOverlay component', () => {
    const backgroundOverlay = screen.getByTestId('background-overlay');
    expect(backgroundOverlay).toBeInTheDocument();
    expect(backgroundOverlay).toHaveClass('fixed inset-0 bg-cover bg-center');
    expect(backgroundOverlay).toHaveStyle(`backgroundImage: url(${homeBg})`);
  });

  it('renders the TitleText component', () => {
    expect(screen.getByText('El switcher')).toBeInTheDocument();
  });

  it('renders the CreateGameButton component', () => {
    expect(screen.getByText('Crear partida')).toBeInTheDocument();
  });

  it('renders the JoinGameButton component', () => {
    expect(screen.getByText('Unirse a partida')).toBeInTheDocument();
  });
});
