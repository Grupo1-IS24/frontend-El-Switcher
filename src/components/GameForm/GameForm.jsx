import { useContext } from 'react';
import Button from '../Button/Button';
import CreateGameForm from '../CreateGameForm/CreateGameForm';
import JoinGameForm from '../JoinGameForm/JoinGameForm';
import useRouteNavigation from '../../hooks/useRouteNavigation';
import { PlayerContext } from '../../contexts/PlayerProvider';
import { handleCreateGame, handleJoinGame } from '../../utils/gameHandlers';

const GameForm = ({ type, selectedGame, onClose, setshowForm }) => {
  const { redirectToLobbyPage } = useRouteNavigation();
  const { createPlayer } = useContext(PlayerContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = e.target.elements;

    if (type === 'create') {
      handleCreateGame(elements, createPlayer, redirectToLobbyPage);
    } else if (type === 'join') {
      handleJoinGame(elements, selectedGame, createPlayer, redirectToLobbyPage);
    }
  };

  if (type === 'join' && !selectedGame) return null;

  const styles = {
    create:
      'absolute bg-gray-800 p-8 rounded-lg shadow-md mx-auto mt-60 max-w-lg',
    join: 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col',
    joinSub: 'bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md relative',
  };

  return (
    <div className={`${styles[type]}`}>
      <div className={type === 'join' ? styles['joinSub'] : undefined}>
        <h2 className='text-2xl font-bold text-white mb-6 text-center'>
          {type === 'create'
            ? 'Crear Partida'
            : `Unirse a "${selectedGame.gameName}"`}
        </h2>
        <form onSubmit={handleSubmit} className='space-y-4' role='form'>
          {type === 'create' ? (
            <CreateGameForm />
          ) : (
            <JoinGameForm isPublic={selectedGame.isPublic} />
          )}
          <div className='flex flex-row justify-between'>
            <Button
              type='submit'
              text={type === 'create' ? 'Crear partida' : 'Unirse'}
              style={'formButton'}
            />
            <Button
              text={'x'}
              onPress={type === 'create' ? () => setshowForm(false) : onClose}
              style={'formButton'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default GameForm;
