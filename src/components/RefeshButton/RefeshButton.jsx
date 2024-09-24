import Button from '../Button/Button';

const RefeshButton = ({ isVisible, onPress }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className='absolute top-4 left-4'>
      <Button
        text='
      ⟳
     '
        onPress={onPress}
        style={'formButton'}
      />
    </div>
  );
};

export default RefeshButton;
