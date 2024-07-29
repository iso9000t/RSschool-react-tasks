import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorButton from '../components/ErrorButton/ErrorButton';

describe('ErrorButton Component', () => {
  it('renders and handles error correctly', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ErrorButton />);

    const button = screen.getByText(/throw error/i);

    expect(button).toBeInTheDocument();

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Test Error');

    consoleErrorMock.mockRestore();
  });
});
