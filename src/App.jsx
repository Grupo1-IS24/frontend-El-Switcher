import { RouterProvider } from 'react-router-dom';
import router from './routes';
import PlayerProvider from './contexts/PlayerProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <PlayerProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </PlayerProvider>
  );
};

export default App;
