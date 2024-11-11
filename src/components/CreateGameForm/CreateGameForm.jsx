import { useContext, useState } from 'react';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import NumberInput from '../NumberInput/NumberInput';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { handleCreateGame } from '../../utils/gameHandlers';
import showToast from '../../utils/toastUtil';
import locked from '../../assets/Icons/padlock-locked.svg';
import unlocked from '../../assets/Icons/padlock-unlocked.svg';

const CreateGameForm = ({ setShowForm }) => {
  const { redirectToLobbyPage } = useRouteNavigation();
  const { createPlayer } = useContext(PlayerContext);
  const [isLocked, setIsLocked] = useState(false);
  const [gamePassword, setGamePassword] = useState('');

  const handleLockToggle = (e) => {
    e.preventDefault();
    setIsLocked(!isLocked);
    if (isLocked) {
      setGamePassword('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    if (
      !elements.ownerName.value ||
      !elements.gameName.value ||
      !elements.minPlayers.value ||
      !elements.maxPlayers.value
    ) {
      showToast({
        type: 'warning',
        message: 'Todos los campos son obligatorios',
        autoClose: 3000,
      });
      return;
    }
    if (isLocked && !elements.gamePassword.value) {
      showToast({
        type: 'warning',
        message: 'Ingrese una contraseña o póngala pública',
        autoClose: 3000,
      });
      return;
    }
    handleCreateGame(elements, createPlayer, redirectToLobbyPage);
  };

  return (
    <div className='absolute bg-gray-800 p-8 rounded-lg shadow-md mx-auto mt-60 max-w-lg md:mt-0'>
      <h2 className='text-2xl font-bold text-white mb-6 text-center'>
        Crear Partida
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4' role='form'>
        <TextInput name='ownerName' placeholder='Ingresa tu nombre' />
        <TextInput
          name='gameName'
          placeholder='Ingresa el nombre de la partida'
        />
        <div className='flex w-full justify-evenly'>
          <TextInput
            name='gamePassword'
            placeholder={
              isLocked ? 'Ingresa la contraseña' : 'La partida es pública'
            }
            value={gamePassword}
            onChange={(e) => setGamePassword(e.target.value)}
            disabled={!isLocked}
          />
          <button onClick={handleLockToggle}>
            <img
              src={isLocked ? locked : unlocked}
              alt='Icono de candado'
              className='w-7 h-7 inline-block ml-2'
            />
          </button>
        </div>
        <div className='mb-4 flex space-x-4'>
          <NumberInput
            name='minPlayers'
            min='2'
            max='4'
            placeholder='Cant. min. jugadores'
          />
          <NumberInput
            name='maxPlayers'
            min='2'
            max='4'
            placeholder='Cant. max. jugadores'
          />
        </div>
        <div className='flex flex-row justify-between'>
          <Button type='submit' text='Crear partida' style='formButton' />
          <Button
            text='x'
            onPress={() => setShowForm(false)}
            style='formButton'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateGameForm;
