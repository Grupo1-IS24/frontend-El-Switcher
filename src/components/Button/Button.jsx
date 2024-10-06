const Button = ({
  text,
  onPress,
  style,
  type = 'button',
  isDisabled = false,
}) => {
  // define the classes for each button style
  const baseClasses = 'lekton-bold rounded-xl transition-all';
  const typeClasses = {
    homeButton:
      'text-3xl w-80 py-6 bg-white text-black hover:bg-black hover:text-white',
    formButton:
      'text-xl p-4 bg-white text-black hover:bg-black hover:text-white',
    borderButton:
      'text-xl bg-white text-black px-4 py-1 mt-2 border-white border-2 hover:bg-transparent hover:text-white hover:border-white',
    lobbyButton_disabled:
      'w-[18rem] h-[4.375rem] text-3xl border-2 border-[#f1f1f1] bg-[#f1f1f1] text-[#C0C0C0] cursor-not-allowed disabled',
    lobbyButton_init:
      'w-[18rem] h-[4.375rem] text-3xl border-2 border-[#f1f1f1] bg-[#f1f1f1] text-[#0c0c0c] hover:bg-transparent hover:text-[#f1f1f1]',
    lobbyButton_leave:
      'w-[18rem] h-[4.375rem] text-3xl border-2 border-[#ee6055] bg-[#ee6055] text-[#0c0c0c] hover:bg-transparent hover:text-[#ee6055]',
    gameButton_endTurn:
      'w-[16rem] h-[4.375rem] text-2xl border-2 border-[#f1f1f1] bg-[#f1f1f1] text-[#0c0c0c] hover:bg-transparent hover:text-[#f1f1f1]',
    gameButton_leave:
      'w-[16rem] h-[4.375rem] text-2xl border-2 border-[#ee6055] bg-[#ee6055] text-[#0c0c0c] hover:bg-transparent hover:text-[#ee6055]',
  };

  // get classes based on style
  const buttonClasses = `${baseClasses} ${typeClasses[style]}`;

  return (
    <button type={type} onClick={onPress} className={buttonClasses}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default Button;
