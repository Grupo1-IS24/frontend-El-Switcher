import useRouteNavigation from '../../hooks/useRouteNavigation';
import Button from '../Button/Button';

const WinnerMessage = () => {
  const { redirectToHomePage } = useRouteNavigation();

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-500'>
      <div className='bg-gray-800 rounded-lg p-8 max-w-md w-full text-center'>
        <h1 className='text-4xl font-bold mb-6 text-white font-lekton'>
          ¡Ganaste!
        </h1>
        <div className='mb-8'>
          <span className='text-8xl mx-auto animate-pulse'>🏆</span>
        </div>
        <Button
          text='Ir al inicio'
          style='homeButton'
          onPress={redirectToHomePage}
        />
      </div>
    </div>
  );
};

export default WinnerMessage;
