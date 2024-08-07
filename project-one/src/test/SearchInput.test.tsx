import { screen, fireEvent } from '@testing-library/react';
import { render } from './test-utils';
import SearchInput from '../components/SearchInput/SearchInput';

describe('SearchInput', () => {
  it('renders the search input and button', () => {
    render(<SearchInput />);

    // Check if input and button are rendered
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('enables the search button when input is changed', () => {
    render(<SearchInput />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    // Initially, the button should be disabled
    expect(button).toBeDisabled();

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: 'Rick' } });

    // Now, the button should be enabled
    expect(button).not.toBeDisabled();
  });

  it('disables the search button when input is cleared', () => {
    render(<SearchInput />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    // Simulate typing into the input field
    fireEvent.change(input, { target: { value: 'Rick' } });

    // Now, the button should be enabled
    expect(button).not.toBeDisabled();

    // Simulate clearing the input field
    fireEvent.change(input, { target: { value: '' } });

    // The button should be disabled again
    expect(button).toBeDisabled();
  });
});
