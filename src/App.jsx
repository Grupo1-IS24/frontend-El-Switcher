import { RouterProvider } from 'react-router-dom';
import router from './routes';
import PlayerProvider from './contexts/PlayerProvider';

const App = () => {
  return (
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  );
};

export default App;
