import { RouterProvider } from 'react-router-dom';
import router from './routes';
import PlayerAndGameProvider from './contexts/PlayerAndGameProvider';

const App = () => {
  return (
    <PlayerAndGameProvider>
      <RouterProvider router={router} />
    </PlayerAndGameProvider>
  );
};

export default App;
