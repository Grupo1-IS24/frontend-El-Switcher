import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import FilterGameInfo from './FilterGameInfo';
import FilterGameListProvider from '../../contexts/FilterGameListProvider';
import userEvent from '@testing-library/user-event';
import useFilterGameList from '../../hooks/useFilterGameList';

vi.mock('../../hooks/useFilterGameList'); // Mockear el hook

describe('FilterGameInfo', () => {
  const resetFilterMock = vi.fn();

  beforeEach(() => {
    // Configurar el mock del hook para que devuelva la función mockeada
    useFilterGameList.mockReturnValue({ resetFilter: resetFilterMock });

    render(
      <FilterGameListProvider>
        <FilterGameInfo />
      </FilterGameListProvider>
    );
  });

  it('renders the FilterGamePerName and FilterGamePerConnectedPlayers components', () => {
    expect(
      screen.getByPlaceholderText('Buscar partidas por su nombre')
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mín. conectados')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Máx. conectados')).toBeInTheDocument();
  });

  it('renders the reset filter button', () => {
    const resetButton = screen.getByText('Reset filtro');
    expect(resetButton).toBeInTheDocument();
  });

  it('calls resetFilter when reset button is clicked', async () => {
    const resetButton = screen.getByText('Reset filtro');
    await userEvent.click(resetButton);
    expect(resetFilterMock).toHaveBeenCalledTimes(1);
  });
});
