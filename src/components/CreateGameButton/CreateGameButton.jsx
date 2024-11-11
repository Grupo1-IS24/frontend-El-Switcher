import { useState } from 'react';
import Button from '../Button/Button';
import CreateGameForm from '../CreateGameForm/CreateGameForm';

const CreateGameButton = ({setShowForm}) => {
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
