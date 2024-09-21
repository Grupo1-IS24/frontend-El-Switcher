import { useState } from 'react';
import Button from '../Button/Button';
import CreateGameForm from '../CreateGameForm/CreateGameForm';

const CreateGameButton = () => {
  const [showForm, setshowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <CreateGameForm setshowForm={setshowForm} />
      ) : (
        <Button
          text='Crear partida'
          onPress={() => setshowForm(true)}
          style='homeButton'
        />
      )}
    </>
  );
};

export default CreateGameButton;
