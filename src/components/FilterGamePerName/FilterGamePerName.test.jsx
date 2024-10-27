import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import FilterGamePerName from './FilterGamePerName';
import FilterGameListProvider from '../../contexts/FilterGameListProvider';
import userEvent from '@testing-library/user-event';

describe('FilterGamePerName', () => {
  beforeEach(() => {
    render(
      <FilterGameListProvider>
        <FilterGamePerName />
      </FilterGameListProvider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  it('should render the component', () => {
    const input = screen.getByPlaceholderText('Buscar partidas por su nombre');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('should update the input value when changed', async () => {
    const input = screen.getByPlaceholderText('Buscar partidas por su nombre');
    const searchValue = 'Nuevo juego';

    await userEvent.type(input, searchValue);

    expect(input).toHaveValue(searchValue);
  });
});
