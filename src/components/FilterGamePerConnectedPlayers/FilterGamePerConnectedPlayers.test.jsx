import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterAll } from 'vitest';
import FilterGamePerConnectedPlayers from './FilterGamePerConnectedPlayers';
import FilterGameListProvider from '../../contexts/FilterGameListProvider';
import userEvent from '@testing-library/user-event';

describe('FilterGamePerConnectedPlayers', () => {
  const getMinPlayersInput = () =>
    screen.getByPlaceholderText('Mín. conectados');

  const getMaxPlayersInput = () =>
    screen.getByPlaceholderText('Máx. conectados');

  beforeEach(() => {
    render(
      <FilterGameListProvider>
        <FilterGamePerConnectedPlayers />
      </FilterGameListProvider>
    );
  });

  afterAll(() => {
    cleanup();
  });

  it('should render the component', () => {
    const minPlayers = getMinPlayersInput();
    const maxPlayers = getMaxPlayersInput();

    expect(minPlayers).toBeInTheDocument();
    expect(maxPlayers).toBeInTheDocument();
  });

  it('should update the minPlayers value when changed', async () => {
    const minPlayers = getMinPlayersInput();

    await userEvent.type(minPlayers, '2');

    expect(minPlayers).toHaveValue(2);
  });

  it('should update the maxPlayers value when changed', async () => {
    const maxPlayers = getMaxPlayersInput();

    await userEvent.type(maxPlayers, '4');

    expect(maxPlayers).toHaveValue(4);
  });

  it('should update the minPlayers value when changed and maxPlayers is lower', async () => {
    const minPlayers = getMinPlayersInput();
    const maxPlayers = getMaxPlayersInput();

    await userEvent.type(minPlayers, '3');
    await userEvent.type(maxPlayers, '4');

    expect(minPlayers).toHaveValue(3);
    expect(maxPlayers).toHaveValue(4);
  });

  it('should not allow minPlayers to be set higher than maxPlayers', async () => {
    const minPlayers = getMinPlayersInput();
    const maxPlayers = getMaxPlayersInput();

    await userEvent.type(maxPlayers, '3');
    await userEvent.clear(minPlayers);
    await userEvent.type(minPlayers, '4');

    expect(minPlayers).toHaveValue(null); // should not allow value to be set.
    expect(maxPlayers).toHaveValue(3); // should retain the value within limits
  });

  it('should not allow maxPlayers to be set lower than minPlayers', async () => {
    const minPlayers = getMinPlayersInput();
    const maxPlayers = getMaxPlayersInput();

    await userEvent.type(minPlayers, '2');
    await userEvent.clear(maxPlayers);
    await userEvent.type(maxPlayers, '1');

    expect(maxPlayers).toHaveValue(null); // should not allow value to be set.
    expect(minPlayers).toHaveValue(2); // should retain the value within limits
  });

  it('should preserve the maxPlayers value if the new value is invalid', async () => {
    const maxPlayers = getMaxPlayersInput();

    await userEvent.type(maxPlayers, '3');
    await userEvent.type(maxPlayers, '5'); // invalid value

    expect(maxPlayers).toHaveValue(3);
  });

  it('should preserve the minPlayers value if the new value is invalid', async () => {
    const minPlayers = getMinPlayersInput();

    await userEvent.type(minPlayers, '2');
    await userEvent.type(minPlayers, '0');

    expect(minPlayers).toHaveValue(2);
  });
});
