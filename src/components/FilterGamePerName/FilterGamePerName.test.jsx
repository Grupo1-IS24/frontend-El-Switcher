import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import FilterGamePerName from './FilterGamePerName';
import useFilterGameList from '../../hooks/useFilterGameList';

// Mock del hook useFilterGameList
vi.mock('../../hooks/useFilterGameList');

describe('FilterGamePerName', () => {
  const mockSetSearchGame = vi.fn();

  beforeEach(() => {
    useFilterGameList.mockReturnValue({
      searchGame: '',
      setSearchGame: mockSetSearchGame,
    });

    render(<FilterGamePerName />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should render the component', () => {
    const input = screen.getByPlaceholderText('Buscar partidas por su nombre');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should call setSearchGame when input changes', () => {
    const input = screen.getByPlaceholderText('Buscar partidas por su nombre');
    const searchValue = 'Nuevo juego';

    fireEvent.change(input, { target: { value: searchValue } });

    expect(mockSetSearchGame).toHaveBeenCalledTimes(1);

    expect(mockSetSearchGame).toHaveBeenCalledWith(searchValue);
  });
});
