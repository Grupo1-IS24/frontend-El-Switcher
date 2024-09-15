import { useState } from 'react';
import Button from '../Button/Button';
import { createGame } from '../../service/CreateGameService';

const CreateGameForm = ({ setshowForm }) => {
  const [values, setvalues] = useState({
    ownerName: '',
    gameName: '',
    minPlayers: '',
    maxPlayers: '',
  });

  const handleChangeText = (value, field) => {
    setvalues((prevValues) => ({
      ...prevValues,
      [field]: value,
    }));
  };

  return (
    <div className="absolute bg-gray-800 p-8 rounded-lg shadow-md mx-auto max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Crear Partida
      </h2>

      <div className="mb-4">
        <input
          value={values.ownerName}
          type="text"
          id="ownerName"
          placeholder="Ingresa tu nombre"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onChange={(e) => handleChangeText(e.target.value, 'ownerName')}
        />
      </div>

      <div className="mb-4">
        <input
          value={values.gameName}
          type="text"
          id="gameName"
          placeholder="Ingresa el nombre de la partida"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onChange={(e) => handleChangeText(e.target.value, 'gameName')}
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <input
          value={values.minPlayers}
          type="number"
          id="minPlayers"
          min={2}
          max={4}
          placeholder="Cant. min. jugadores"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onChange={(e) =>
            handleChangeText(Number(e.target.value), 'minPlayers')
          }
        />

        <input
          value={values.maxPlayers}
          type="number"
          id="maxPlayers"
          min={2}
          max={4}
          placeholder="Cant. max. jugadores"
          className="w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
          onChange={(e) =>
            handleChangeText(Number(e.target.value), 'maxPlayers')
          }
        />
      </div>

      <div className="flex flex-row justify-between">
        <Button
          type="submit"
          text="Crear partida"
          className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
          onPress={(e) => {
            e.preventDefault();
            createGame(
              values.gameName,
              values.ownerName,
              values.minPlayers,
              values.maxPlayers
            );
          }}
        />
        <Button text={'x'} onPress={() => setshowForm(false)} />
      </div>
    </div>
  );
};

export default CreateGameForm;
