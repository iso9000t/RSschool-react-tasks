import { render, act, fireEvent } from '@testing-library/react';

import useLocalStorageSearchTerm from '../hooks/useLocalStorageSearchTerm';

describe('useLocalStorageSearchTerm', () => {
  const key = 'searchTerm';
  const initialValue = 'initial';

  beforeEach(() => {
    localStorage.clear();
  });

  const TestComponent = ({
    hook,
  }: {
    hook: () => readonly [string, (newValue: string) => void, () => void];
  }) => {
    const [value, handleSearchTermChange, handleSearch] = hook();
    return (
      <div>
        <input
          value={value}
          onChange={(e) => handleSearchTermChange(e.target.value)}
          data-testid="input"
        />
        <button onClick={handleSearch} data-testid="button">
          Save
        </button>
      </div>
    );
  };

  it('should initialize with value from localStorage if available', () => {
    localStorage.setItem(key, 'storedValue');
    const { getByTestId } = render(
      <TestComponent
        hook={() => useLocalStorageSearchTerm(key, initialValue)}
      />,
    );
    const input = getByTestId('input') as HTMLInputElement;

    expect(input.value).toBe('storedValue');
  });

  it('should initialize with initialValue if no localStorage value', () => {
    const { getByTestId } = render(
      <TestComponent
        hook={() => useLocalStorageSearchTerm(key, initialValue)}
      />,
    );
    const input = getByTestId('input') as HTMLInputElement;

    expect(input.value).toBe(initialValue);
  });

  it('should update value when handleSearchTermChange is called', () => {
    const { getByTestId } = render(
      <TestComponent
        hook={() => useLocalStorageSearchTerm(key, initialValue)}
      />,
    );
    const input = getByTestId('input') as HTMLInputElement;

    act(() => {
      fireEvent.change(input, { target: { value: 'newValue' } });
    });

    expect(input.value).toBe('newValue');
  });

  it('should update localStorage when handleSearch is called', () => {
    const { getByTestId } = render(
      <TestComponent
        hook={() => useLocalStorageSearchTerm(key, initialValue)}
      />,
    );
    const input = getByTestId('input') as HTMLInputElement;
    const button = getByTestId('button');

    act(() => {
      fireEvent.change(input, { target: { value: 'newValue' } });
      fireEvent.click(button);
    });

    expect(localStorage.getItem(key)).toBe('newValue');
  });

  it('should remove item from localStorage when handleSearch is called with empty value', () => {
    const { getByTestId } = render(
      <TestComponent
        hook={() => useLocalStorageSearchTerm(key, initialValue)}
      />,
    );
    const input = getByTestId('input') as HTMLInputElement;
    const button = getByTestId('button');

    act(() => {
      fireEvent.change(input, { target: { value: '' } });
      fireEvent.click(button);
    });

    expect(localStorage.getItem(key)).toBe(null);
  });
});
