import { useState } from 'react';
import Button from '../Button/Button';
import CreateGameForm from '../CreateGameForm/CreateGameForm';

const CreateGameButton = () => {
  const [showForm, setshowForm] = useState(false);

  return (
    <>
      <div>
        <Button text="Crear partida" onPress={() => setshowForm(true)} />
      </div>
      {showForm && <CreateGameForm setshowForm={setshowForm} />}
    </>
  );
};

export default CreateGameButton;
