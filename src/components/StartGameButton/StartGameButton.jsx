import Button from '../Button/Button';

const StartGameButton = ({ isDisabled = true }) => {
  const style = isDisabled ? 'disabled' : 'init';

  return (
    <Button
      text={'Iniciar partida'}
      style={`lobbyButton_${style}`}
      isDisabled={isDisabled}
      onPress={() => console.log('Aquí iría la lógica para iniciar la partida')}
    />
  );
};

export default StartGameButton;