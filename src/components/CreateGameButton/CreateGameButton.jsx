import Button from '../Button/Button';

const CreateGameButton = ({ setShowForm }) => {
  return (
    <>
      <Button
        text='Crear partida'
        onPress={() => setShowForm(true)}
        style='homeButton'
      />
    </>
  );
};

export default CreateGameButton;
