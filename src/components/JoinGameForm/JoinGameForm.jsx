import { useContext } from 'react';
import { joinGame } from '../../service/JoinGameService';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import { PlayerContext } from '../../contexts/PlayerProvider';
import useRouteNavigation from '../../hooks/useRouteNavigation';

/** 
 * @deprecated This component is deprecated and should not be used. 
 */
const JoinGameForm = ({ selectedGame, onClose }) => {
  const { createPlayer } = useContext(PlayerContext);
  const { redirectToLobbyPage } = useRouteNavigation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const elements = event.target.elements;

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
  };

  // If there is no selected game, return null and don't render the component.
  if (!selectedGame) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative'>
        <h1 className='text-2xl lekton-bold mb-6 text-center'>
          Unirse a &quot;{selectedGame.gameName}&quot;
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <TextInput name='playerName' placeholder='Ingresa tu nombre' />

          <div className='flex justify-center space-x-20'>
            <Button text='Unirse' style='borderButton' type='submit' />
            <Button text='Cerrar' style='borderButton' onPress={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGameForm;
