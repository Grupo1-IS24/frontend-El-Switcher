import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timer from './Timer';
import formatTime from '../../utils/formatTime';

vi.mock('../../utils/formatTime');

describe('Timer', () => {
  const setup = (time) => render(<Timer time={time} />);

  it('should render the formatted time', () => {
    formatTime.mockReturnValue('01:00');
    setup(60);
    expect(screen.getByText('01:00')).toBeInTheDocument();
  });

  it('should apply green color class for time greater than 60 seconds', () => {
    setup(61);
    const timeElement = screen.getByText(formatTime(61));
    expect(timeElement).toHaveClass('text-[#22c55e]');
  });

  it('should apply yellow color class for time between 21 and 60 seconds', () => {
    setup(30);
    const timeElement = screen.getByText(formatTime(30));
    expect(timeElement).toHaveClass('text-[#eab308]');
  });

  it('should apply red color class for time 20 seconds or less', () => {
    setup(20);
    const timeElement = screen.getByText(formatTime(20));
    expect(timeElement).toHaveClass('text-[#ef4444]');
  });

  it('should apply red color class for time 0 seconds', () => {
    setup(0);
    const timeElement = screen.getByText(formatTime(0));
    expect(timeElement).toHaveClass('text-[#ef4444]');
  });
});
