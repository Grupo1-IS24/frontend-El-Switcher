import { useContext } from 'react';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { handleJoinGame } from '../../utils/gameHandlers';
import showToast from '../../utils/toastUtil';

const JoinGameForm = ({ selectedGame, onClose }) => {
  const { redirectToLobbyPage } = useRouteNavigation();
  const { createPlayer } = useContext(PlayerContext);

  if (!selectedGame) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    if (elements.playerName.value === '') {
      showToast({
        type: 'warning',
        message: 'El nombre del jugador no puede estar vacío',
        autoClose: 3000,
      });
      return;
    }
    handleJoinGame(elements, selectedGame, createPlayer, redirectToLobbyPage);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative'>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          Unirse a &quot;{selectedGame.gameName}&quot;
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4' role='form'>
          <TextInput name='playerName' placeholder='Ingresa tu nombre' />
          {!selectedGame.isPublic && (
            <TextInput
              name='gamePassword'
              placeholder='Ingresa la contraseña'
            />
          )}
          <div className='flex flex-row justify-between'>
            <Button type='submit' text='Unirse' style='formButton' />
            <Button text='x' onPress={onClose} style='formButton' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGameForm;
