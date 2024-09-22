const Button = ({ text, onPress, style, type = 'button' }) => {
  // define the classes for each button style
  const baseClasses = 'lekton-bold rounded-xl transition-all';
  const typeClasses = {
    homeButton:
      'text-3xl w-80 py-6 bg-white text-black hover:bg-black hover:text-white',
    formButton:
      'text-xl p-4 bg-white text-black hover:bg-black hover:text-white',
    borderButton:
      'text-xl bg-white text-black px-4 py-1 mt-2 border-white border-2 hover:bg-transparent hover:text-white hover:border-white',
    lobbyButton_disabled: 'cursor-not-allowed',
    lobbyButton_init: '',
    lobbyButton_abandone: '',
    gameButton_pass: '',
    gameButton_abandone: '',
  };

  // get classes based on style
  const buttonClasses = `${baseClasses} ${typeClasses[style]}`;

  return (
    <button type={type} onClick={onPress} className={buttonClasses}>
      {text}
    </button>
  );
};

export default Button;
