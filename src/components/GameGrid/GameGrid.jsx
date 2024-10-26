import MessageCard from '../MessageCard/MessageCard';
import GameCard from '../GameCard/GameCard';

const GameGrid = ({ gameList, selectGame, searchGame }) => {
  const filteredGameList = gameList
    .filter((game) => game.connectedPlayers < game.maxPlayers)
    .filter((game) =>
      game.gameName.toLowerCase().startsWith(searchGame.toLowerCase())
    );

  if (filteredGameList.length === 0) {
    return (
      <MessageCard
        type={'info'}
        message='No se encontró ninguna partida con ese nombre.'
      />
    );
  }

  return (
    <div className='grid gap-10 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {filteredGameList.map((game) => (
        <div className='flex justify-center' key={game.gameId}>
          <GameCard
            gameName={game.gameName}
            maxPlayers={game.maxPlayers}
            connectedPlayers={game.connectedPlayers}
            onPressButton={() => selectGame(game)}
          />
        </div>
      ))}
    </div>
  );
};

export default GameGrid;
