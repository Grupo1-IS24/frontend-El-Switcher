import GameCard from '../GameCard/GameCard';

const GameGrid = ({ gameList, selectGame }) => {
  const filteredGameList = gameList.filter(
    (game) => game.connectedPlayers < game.maxPlayers
  );

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
