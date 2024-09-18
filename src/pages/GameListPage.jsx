import GameCard from '../components/GameCard/GameCard';
import useGetGameList from '../hooks/useGetGameList';

const GameListPage = () => {
  const { gameList, isLoading, error } = useGetGameList();

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-200'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='bg-red-500 text-white p-5 rounded-lg shadow-lg animate-bounce'>
          Error al cargar las partidas: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className='grid gap-10 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
      {gameList.map((game) => (
        <div className='flex justify-center' key={game.gameId}>
          <GameCard
            gameName={game.gameName}
            maxPlayers={game.maxPlayers}
            connectedPlayers={game.connectedPlayers}
          />
        </div>
      ))}
    </div>
  );
};

export default GameListPage;
