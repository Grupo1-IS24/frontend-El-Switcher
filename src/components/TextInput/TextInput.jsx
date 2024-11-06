const TextInput = ({
  name,
  placeholder = '',
  value = undefined,
  onChange = () => {},
  disabled = false,
}) => (
  <input
    type='text'
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    disabled={disabled}
    className={`w-full px-4 py-2 rounded-lg bg-gray-700 text-gray-200 placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 ${disabled ? 'cursor-not-allowed' : ''}`}
  />
);

export default TextInput;
