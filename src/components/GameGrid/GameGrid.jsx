import MessageCard from '../MessageCard/MessageCard';
import GameCard from '../GameCard/GameCard';
import useFilterGameList from '../../hooks/useFilterGameList';

const GameGrid = ({ gameList, selectGame }) => {
  const { filterGameList } = useFilterGameList();

  const filteredGameList = filterGameList(gameList);

  if (filteredGameList.length === 0) {
    return (
      <MessageCard
        type={'info'}
        message='No se encontró ninguna partida.'
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
