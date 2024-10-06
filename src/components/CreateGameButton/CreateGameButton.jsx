import { useState } from 'react';
import Button from '../Button/Button';
import GameForm from '../GameForm/GameForm';

const CreateGameButton = () => {
  const [showForm, setshowForm] = useState(false);

  return (
    <>
      {showForm ? (
        <GameForm type='create' setshowForm={setshowForm} />
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
