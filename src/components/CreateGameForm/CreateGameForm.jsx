import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import NumberInput from '../NumberInput/NumberInput';
import { createGame } from '../../service/CreateGameService';

const CreateGameForm = ({ setshowForm }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const elements = e.target.elements;

    const gameInfo = {
      ownerName: elements.ownerName.value,
      gameName: elements.gameName.value,
      minPlayers: elements.minPlayers.value,
      maxPlayers: elements.maxPlayers.value,
    };

    /* Manage createGame service */
    createGame(
      gameInfo.gameName,
      gameInfo.ownerName,
      gameInfo.minPlayers,
      gameInfo.maxPlayers
    );
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
