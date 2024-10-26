import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import FilterGamePerName from './FilterGamePerName';
import TextInput from '../TextInput/TextInput';

vi.mock('../TextInput/TextInput', () => ({
  default: vi.fn(({ name, placeholder, value, onChange }) => (
    <input
      type='text'
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )),
}));

describe('FilterGamePerName', () => {
  const mockOnSearch = vi.fn();

  const renderComponent = () =>
    render(<FilterGamePerName onSearch={mockOnSearch} />);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the TextInput component with correct props', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Buscar partidas por su nombre');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  it('updates the search state and calls onSearch when input changes', () => {
    renderComponent();

    const input = screen.getByPlaceholderText('Buscar partidas por su nombre');
    const searchValue = 'Nuevo juego';

    fireEvent.change(input, { target: { value: searchValue } });

    expect(input).toHaveValue(searchValue);
    expect(mockOnSearch).toHaveBeenCalledWith(searchValue);
  });

  it('calls the mock function TextInput with correct props', () => {
    renderComponent();

    expect(TextInput).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'gameName',
        placeholder: 'Buscar partidas por su nombre',
        value: '',
        onChange: expect.any(Function),
      }),
      expect.anything()
    );
  });
});
