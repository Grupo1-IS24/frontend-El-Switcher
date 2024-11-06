import NumberInput from '../NumberInput/NumberInput';
import TextInput from '../TextInput/TextInput';
import locked from '../../assets/Icons/padlock-locked.svg';
import unlocked from '../../assets/Icons/padlock-unlocked.svg';

const CreateGameForm = ({
  setIsLocked,
  setGamePassword,
  isLocked,
  gamePassword,
}) => {
  const handleLockToggle = (e) => {
    e.preventDefault(); // Previene el envío del formulario
    setIsLocked(!isLocked);
    if (isLocked) {
      setGamePassword('');
    }
  };

  return (
    <>
      <TextInput name={'ownerName'} placeholder={'Ingresa tu nombre'} />
      <TextInput
        name={'gameName'}
        placeholder={'Ingresa el nombre de la partida'}
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
};

export default CreateGameForm;
