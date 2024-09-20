import { useContext } from 'react';
import Button from '../Button/Button';
import NumberInput from '../NumberInput/NumberInput';
import TextInput from '../TextInput/TextInput';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { createGame } from '../../service/CreateGameService';
import { PlayerAndGameContext } from '../../contexts/PlayerAndGameProvider';

const CreateGameForm = ({ setshowForm }) => {
  const { redirectToLobbyPage } = useRouteNavigation(); // hook for redirect
  const { setPlayerID, setIsOwner, setGameID } = useContext(PlayerAndGameContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const elements = e.target.elements;

    const gameInfo = {
      ownerName: elements.ownerName.value,
      gameName: elements.gameName.value,
      minPlayers: elements.minPlayers.value,
      maxPlayers: elements.maxPlayers.value,
    };

    /* Manage createGame service */
    try {
      const createdGame = await createGame(gameInfo);

      // if the game was succefully created, the response get an gameId to redirect to /lobby/gameId
      if (createdGame && createdGame.gameId) {
        
        // set the playerID, isOwner and gameID.
        setPlayerID(createdGame.ownerId);
        setIsOwner(true);
        setGameID(createdGame.gameId);

        // redirect to the lobby page.
        redirectToLobbyPage(createdGame.gameId);
      } else {
        alert('Error al crear la partida');
      };
    } catch (error) {
      console.error('Error al crear la partida', error);
      alert('Hubo un problema al crear el juego');
    }
  };

  return (
    <div className='absolute bg-gray-800 p-8 rounded-lg shadow-md mx-auto max-w-lg'>
      <h2 className='text-2xl font-bold text-white mb-6 text-center'>
        Crear Partida
      </h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
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

        <div className='flex flex-row justify-between'>
          <Button type='submit' text='Crear partida' />
          <Button text={'x'} onPress={() => setshowForm(false)} />
        </div>
      </form>
    </div>
  );
};

export default CreateGameForm;
