import TextInput from '../TextInput/TextInput';

const JoinGameForm = ({ isPublic }) => (
  <>
    <TextInput name='playerName' placeholder='Ingresa tu nombre' />
    {isPublic && (
      <TextInput name='gamePassword' placeholder='Ingresa la contraseña' />
    )}
  </>
);

export default JoinGameForm;
