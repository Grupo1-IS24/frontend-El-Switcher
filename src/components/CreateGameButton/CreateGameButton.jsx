import { useState } from 'react';
import Button from '../Button/Button';
import CreateGameForm from '../CreateGameForm/CreateGameForm';

const CreateGameButton = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <CreateGameForm setShowForm={setShowForm} />
      ) : (
        <Button
          text='Crear partida'
          onPress={() => setShowForm(true)}
          style='homeButton'
        />
      )}
    </>
  );
};

export default CreateGameButton;
