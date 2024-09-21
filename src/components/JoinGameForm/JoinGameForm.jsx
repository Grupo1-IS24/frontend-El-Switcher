import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';

const JoinGameForm = ({ selectedGame, onClose }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario.
  };

  if (!selectedGame) {
    return null;
  }

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative'>
        <h1 className='text-2xl lekton-bold mb-6 text-center'>
          Unirse a &quot;{selectedGame.gameName}&quot;
        </h1>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <TextInput name='playerName' placeholder='Ingresa tu nombre' />

          <div className='flex justify-center space-x-20'>
            <Button text='Unirse' style='gameCardButton' type='submit' />
            <Button text='Cerrar' style='gameCardButton' onPress={onClose} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinGameForm;
