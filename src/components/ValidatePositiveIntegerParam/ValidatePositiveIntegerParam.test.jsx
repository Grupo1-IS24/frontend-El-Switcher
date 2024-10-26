import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navigate, useParams } from 'react-router-dom';
import ValidatePositiveIntegerParam from './ValidatePositiveIntegerParam';

// Mock useParams
vi.mock('react-router-dom', () => ({
  useParams: vi.fn(),
  Navigate: vi.fn(() => null),
}));

describe('ValidatePositiveIntegerParam', () => {
  const renderComponent = (paramValue) => {
    useParams.mockReturnValue({ paramName: paramValue });
    return render(
      <ValidatePositiveIntegerParam paramName='paramName'>
        <div data-testid='child-component'>Child Component</div>
      </ValidatePositiveIntegerParam>
    );
  };

  it('should render children when the parameter is a valid positive integer', () => {
    renderComponent('5');
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
  });

  it('should navigate to "Not Found" page when the parameter is not a number', () => {
    renderComponent('abc');
    expect(Navigate).toHaveBeenCalledWith({ to: '/*' }, {});
  });

  it('should navigate to "Not Found" page when the parameter is a negative number', () => {
    renderComponent('-1');
    expect(Navigate).toHaveBeenCalledWith({ to: '/*' }, {});
  });

  it('should navigate to "Not Found" page when the parameter is NaN', () => {
    renderComponent('NaN');
    expect(Navigate).toHaveBeenCalledWith({ to: '/*' }, {});
  });

  it('should navigate to "Not Found" page when the parameter is an empty string', () => {
    renderComponent('');
    expect(Navigate).toHaveBeenCalledWith({ to: '/*' }, {});
  });
});
