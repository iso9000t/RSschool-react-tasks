import { screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from './test-utils';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import * as ThemeContext from '../components/ThemeContext/ThemeContext';

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should render the button', () => {
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: () => {},
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should render the button with correct text for light theme', () => {
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: () => {},
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Switch to dark theme');
  });

  it('should render the button with correct text for dark theme', () => {
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'dark',
      toggleTheme: () => {},
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Switch to light theme');
  });
});
