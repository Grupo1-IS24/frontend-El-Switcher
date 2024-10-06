import Button from "../Button/Button";

/**
 * @deprecated This component is deprecated and should not be used.
 */
const RefeshButton = ({ isVisible, onPress }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className='absolute top-4 left-4'>
      <Button text='🗘' onPress={onPress} style={'formButton'} />
    </div>
  );
};

export default RefeshButton;