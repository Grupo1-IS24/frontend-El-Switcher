import { cleanup, render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, afterEach, expect } from 'vitest';
import { GameContext } from '../../contexts/GameProvider';
import { getBlockedCardImagePath } from '../../utils/assetUtils';
import BlockedColor from './BlockedColor';

vi.mock('../../utils/assetUtils', () => ({
  getBlockedCardImagePath: vi.fn(),
}));

describe('BlockedColor Component', () => {
  const NO_BLOCKED_COLOR_TEXT = 'No hay color bloqueado';
  const BLOCKED_COLOR_TEXT = 'El color bloqueado es:';

  const setup = (blockedColor) =>
    render(
      <GameContext.Provider value={{ blockedColor }}>
        <BlockedColor />
      </GameContext.Provider>
    );

  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should display "No hay color bloqueado" when blockedColor is undefined', () => {
    setup();

    expect(screen.getByText(NO_BLOCKED_COLOR_TEXT)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(getBlockedCardImagePath).not.toHaveBeenCalled();
  });

  it('should display the correct text and image when blockedColor is set', () => {
    const color = 'blue';
    const mockImagePath = `/mock/path/blocked_card_${color}.svg`;

    getBlockedCardImagePath.mockReturnValue(mockImagePath);

    setup(color);

    expect(screen.getByText(BLOCKED_COLOR_TEXT)).toBeInTheDocument();

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', mockImagePath);
    expect(img).toHaveAttribute('alt', `Color bloqueado es ${color}`);
  });

  it('should call getBlockedCardImagePath with the correct color', () => {
    const color = 'red';
    setup(color);

    expect(getBlockedCardImagePath).toHaveBeenCalledWith(color);
  });
});
