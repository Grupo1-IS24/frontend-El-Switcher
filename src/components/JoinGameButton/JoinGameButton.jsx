import Button from '../Button/Button';
import useRouteNavigation from '../../hooks/useRouteNavigation';

const JoinGameButton = () => {
  const { redirectToGameListPage } = useRouteNavigation(); // hook for redirect

  return (
    <Button
      text={'Unirse a partida'}
      onPress={() => redirectToGameListPage()}
      style={'homeButton'}
    />
  );
};

export default JoinGameButton;
