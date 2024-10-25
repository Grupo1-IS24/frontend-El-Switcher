import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingLobby from './LoadingLobby';

describe('LoadingLobby', () => {
  const renderComponent = () => render(<LoadingLobby />);

  it('should render the LoadingLobby component', () => {
    renderComponent();
    const container = screen.getByTestId('loading-lobby');
    expect(container).toBeInTheDocument();
  });

  it('should render the correct number of divs with the correct classes', () => {
    renderComponent();
    
    const mainDiv = screen.getByTestId('loading-lobby');
    expect(mainDiv).toHaveClass(
      'bg-[#0c0c0c]',
      'rounded-xl',
      'text-[#f1f1f1]',
      'text-center',
      'flex',
      'flex-col', 
      'gap-16',
      'px-8',
      'py-12',
      'w-[660px]',
      'm-auto',
      'h-[487px]'
    );
    
    const firstDiv = mainDiv.querySelector('.lekton-bold.text-6xl.underline.animate-pulse.bg-gray-700.rounded-2xl');
    expect(firstDiv).toBeInTheDocument();
    
    const secondContainer = mainDiv.querySelector('.flex.flex-col.gap-2');
    const secondDivs = secondContainer.querySelectorAll('.lekton-bold.text-4xl.animate-pulse.bg-gray-700.rounded-2xl');
    expect(secondDivs.length).toBe(3);
    
    const thirdContainer = mainDiv.querySelector('.flex.flex-row.gap-5.justify-center');
    const thirdDivs = thirdContainer.querySelectorAll('.animate-pulse.bg-gray-700.rounded-xl');
    expect(thirdDivs.length).toBe(2);
  });
});