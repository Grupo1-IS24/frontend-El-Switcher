import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';
import useDisableButton from './useDisableButton';

const TestComponent = ({ asyncFunction }) => {
  const [isDisabled, handleClick] = useDisableButton(asyncFunction);

  return React.createElement(
    'button',
    {
      onClick: handleClick,
      disabled: isDisabled,
    },
    'Click me'
  );
};

describe('useDisableButton', () => {
  it('should disable the button during async operation and enable it afterward', async () => {
    const mockAsyncFunction = vi.fn(async () => {
      return { success: true };
    });

    const { getByText } = render(
      React.createElement(TestComponent, { asyncFunction: mockAsyncFunction })
    );

    const button = getByText('Click me'); // Get the button
    expect(button).not.toBeDisabled(); // The button is enabled
    fireEvent.click(button); // Click the button
    expect(button).toBeDisabled(); // The button is disabled
    await waitFor(() => expect(button).not.toBeDisabled()); // The button is enabled again
    expect(mockAsyncFunction).toHaveBeenCalled(); // The function was called
  });

  it('should handle errors in the async function gracefully', async () => {
    const mockAsyncFunctionWithError = vi.fn(async () => {
      return { success: false, message: 'Simulated Error' };
    });

    const { getByText } = render(
      React.createElement(TestComponent, {
        asyncFunction: mockAsyncFunctionWithError,
      })
    );

    const button = getByText('Click me'); // Get the button
    expect(button).not.toBeDisabled(); // The button is enabled
    fireEvent.click(button); // Click the button
    expect(button).toBeDisabled(); // The button is disabled
    await waitFor(() => expect(button).not.toBeDisabled()); // The button is enabled again
    expect(mockAsyncFunctionWithError).toHaveBeenCalled(); // The function was called
  });
});
