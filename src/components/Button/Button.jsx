const Button = ({ text, onPress, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onPress}
      className='p-3 rounded-xl bg-white text-black hover:bg-black hover:text-white transition-all'
    >
      {text}
    </button>
  );
};

export default Button;
