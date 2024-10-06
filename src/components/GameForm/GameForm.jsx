import { useContext } from 'react';
import Button from '../Button/Button';
import NumberInput from '../NumberInput/NumberInput';
import TextInput from '../TextInput/TextInput';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { createGame } from '../../service/CreateGameService';
import { joinGame } from '../../service/JoinGameService';
import { PlayerContext } from '../../contexts/PlayerProvider';

const GameForm = ({ type, selectedGame, onClose, setshowForm }) => {
  const { redirectToLobbyPage } = useRouteNavigation();
  const { createPlayer } = useContext(PlayerContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    if (type === 'create') {
      const gameInfo = {
        ownerName: elements.ownerName.value,
        gameName: elements.gameName.value,
        minPlayers: elements.minPlayers.value,
        maxPlayers: elements.maxPlayers.value,
      };

      try {
        const createdGame = await createGame(gameInfo);
        if (createdGame && createdGame.gameId) {
          createPlayer(createdGame.ownerId, true);
          redirectToLobbyPage(createdGame.gameId);
        } else {
          alert('Error al crear la partida');
        }
      } catch (error) {
        console.error('Error al crear la partida', error);
        alert('Hubo un problema al crear el juego');
      }
    } else if (type === 'join') {
      const playerJoinData = {
        playerName: elements.playerName.value,
      };

      try {
        const playerResponseData = await joinGame(
          playerJoinData,
          selectedGame.gameId
        );
        createPlayer(playerResponseData.playerId);
        redirectToLobbyPage(selectedGame.gameId);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  if (type === 'join' && !selectedGame) return null;

  const styles = {
    create:
      'absolute bg-gray-800 p-8 rounded-lg shadow-md mx-auto mt-60 max-w-lg',
    join: 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col',
    joinSub: 'bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative',
  };

  return (
    <div className={`${styles[type]}`}>
      <div className={type === 'join' && styles['joinSub']}>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          {type === 'create'
            ? 'Crear Partida'
            : `Unirse a "${selectedGame.gameName}"`}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4'>
          {type === 'create' ? (
            <>
              <TextInput name={'ownerName'} placeholder={'Ingresa tu nombre'} />
              <TextInput
                name={'gameName'}
                placeholder={'Ingresa el nombre de la partida'}
              />
              <div className='mb-4 flex space-x-4'>
                <NumberInput
                  name={'minPlayers'}
                  min={'2'}
                  max={'4'}
                  placeholder={'Cant. min. jugadores'}
                />
                <NumberInput
                  name={'maxPlayers'}
                  min={'2'}
                  max={'4'}
                  placeholder={'Cant. max. jugadores'}
                />
              </div>
            </>
          ) : (
            <TextInput name='playerName' placeholder='Ingresa tu nombre' />
          )}
          <div className='flex flex-row justify-between'>
            <Button
              type='submit'
              text={type === 'create' ? 'Crear partida' : 'Unirse'}
              style={'formButton'}
            />
            <Button
              text={'x'}
              onPress={type === 'create' ? () => setshowForm(false) : onClose}
              style={'formButton'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
