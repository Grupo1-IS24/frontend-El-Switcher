import useRouteNavigation from '../../hooks/useRouteNavigation';
import Button from '../Button/Button';
import useWinnerPlayer from '../../hooks/useWinnerPlayer';

const WinnerMessage = () => {
  const { redirectToHomePage } = useRouteNavigation();
  const { isCurrentPlayerWinner, thereIsWinner, winnerName } =
    useWinnerPlayer();

  return (
    <>
      {thereIsWinner && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[100] transition-opacity duration-500 cursor-not-allowed'>
          <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full text-center cursor-auto'>
            <h1 className='text-4xl font-bold mb-6 text-white font-lekton break-words'>
              {isCurrentPlayerWinner
                ? '¡Felicidades, ganaste!'
                : `¡Perdiste ante ${winnerName}!`}
            </h1>
            <div className='mb-8'>
              <span className='text-8xl mx-auto animate-pulse'>
                {isCurrentPlayerWinner ? '🏆' : '😞'}
              </span>
            </div>
            <Button
              text='Ir al inicio'
              style='homeButton'
              onPress={redirectToHomePage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WinnerMessage;
