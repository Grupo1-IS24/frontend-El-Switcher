import { render, screen, fireEvent } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  let mockFn;

  beforeEach(() => {
    mockFn = vi.fn();
  });

  const renderButton = (props) => render(<Button {...props} />);

  const buttonStyles = [
    {
      style: 'homeButton',
      class:
        'text-3xl w-80 py-6 bg-white text-black hover:bg-black hover:text-white',
    },
    {
      style: 'formButton',
      class: 'text-xl p-4 bg-white text-black hover:bg-black hover:text-white',
    },
    {
      style: 'borderButton',
      class:
        'text-xl bg-white text-black px-4 py-1 mt-2 border-white border-2 hover:bg-transparent hover:text-white hover:border-white',
    },
    {
      style: 'lobbyButton_disabled',
      class:
        'w-[18rem] h-[4.375rem] text-3xl border-2 border-[#f1f1f1] bg-[#f1f1f1] text-[#C0C0C0] cursor-not-allowed disabled',
    },
    {
      style: 'lobbyButton_init',
      class:
        'w-[18rem] h-[4.375rem] text-3xl border-2 border-[#f1f1f1] bg-[#f1f1f1] text-[#0c0c0c] hover:bg-transparent hover:text-[#f1f1f1]',
    },
    {
      style: 'lobbyButton_leave',
      class:
        'w-[18rem] h-[4.375rem] text-3xl border-2 border-[#ee6055] bg-[#ee6055] text-[#0c0c0c] hover:bg-transparent hover:text-[#ee6055]',
    },
    {
      style: 'gameButton_endTurn',
      class:
        'w-[16rem] h-[4.375rem] text-2xl border-2 border-[#f1f1f1] bg-[#f1f1f1] text-[#0c0c0c] hover:bg-transparent hover:text-[#f1f1f1]',
    },
    {
      style: 'gameButton_leave',
      class:
        'w-[16rem] h-[4.375rem] text-2xl border-2 border-[#ee6055] bg-[#ee6055] text-[#0c0c0c] hover:bg-transparent hover:text-[#ee6055]',
    },
  ];

  it('debería renderizar un botón con el texto "Click me"', () => {
    renderButton({ text: 'Click me', onPress: mockFn, style: 'homeButton' });
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('debería llamar a onPress cuando se hace clic en el botón', () => {
    renderButton({ text: 'Click me', onPress: mockFn, style: 'homeButton' });
    fireEvent.click(screen.getByText('Click me'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  buttonStyles.forEach(({ style, class: className }) => {
    it(`debería aplicar los estilos correctos para ${style}`, () => {
      renderButton({ text: style, onPress: mockFn, style });
      const button = screen.getByText(style);
      expect(button).toHaveClass(className);
    });

    it(`debería cambiar los estilos al pasar el mouse sobre ${style}`, () => {
      renderButton({ text: `Hover ${style}`, onPress: mockFn, style });
      const button = screen.getByText(`Hover ${style}`);
      fireEvent.mouseOver(button);
      className.split(' ').forEach((cls) => {
        if (cls.startsWith('hover:')) {
          expect(button).toHaveClass(cls);
        }
      });
    });
  });

  it('debería estar deshabilitado cuando isDisabled es true', () => {
    renderButton({
      text: 'Disabled',
      onPress: mockFn,
      style: 'homeButton',
      isDisabled: true,
    });
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  it('no debería llamar a onPress cuando el botón está deshabilitado', () => {
    renderButton({
      text: 'Disabled',
      onPress: mockFn,
      style: 'homeButton',
      isDisabled: true,
    });
    fireEvent.click(screen.getByText('Disabled'));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
