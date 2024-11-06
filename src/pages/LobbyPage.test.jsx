import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import LobbyPage from './LobbyPage';

// Mock the child components
vi.mock('../components/BgOverlay/BgOverlay', () => ({
  default: () => <div>BgOverlay</div>,
}));
vi.mock('../components/LobbyCard/LobbyCard', () => ({
  default: () => <div>LobbyCard</div>,
}));
vi.mock('../components/TitleText/TitleText', () => ({
  default: () => <div>TitleText</div>,
}));

describe('LobbyPage', () => {
  it('renders the BgOverlay component', () => {
    render(<LobbyPage />);
    expect(screen.getByText('BgOverlay')).toBeInTheDocument();
  });

  it('renders the TitleText component', () => {
    render(<LobbyPage />);
    expect(screen.getByText('TitleText')).toBeInTheDocument();
  });

  it('renders the LobbyCard component', () => {
    render(<LobbyPage />);
    expect(screen.getByText('LobbyCard')).toBeInTheDocument();
  });
});
