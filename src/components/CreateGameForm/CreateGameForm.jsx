import NumberInput from '../NumberInput/NumberInput';
import TextInput from '../TextInput/TextInput';

const CreateGameForm = () => (
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
);

export default CreateGameForm;
