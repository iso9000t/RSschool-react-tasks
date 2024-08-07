import { screen, waitFor, act } from '@testing-library/react';
import { render } from './test-utils';
import Flyout from '../components/Flyout/Flyout';
import { store } from '../store/store';
import {
  toggleSelectedItem,
  unselectAllItems,
} from '../store/selectedItemsSlice';

import characterDetail from '../test/mocks/characterDetail.json';

describe('Flyout', () => {
  beforeEach(() => {
    act(() => {
      store.dispatch(unselectAllItems());
    });
  });

  it('renders nothing when no items are selected', () => {
    render(<Flyout />);
    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('renders correctly when items are selected', async () => {
    await act(async () => {
      store.dispatch(toggleSelectedItem(characterDetail));
    });

    render(<Flyout />);

    await waitFor(() => {
      expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Unselect all/i)).toBeInTheDocument();
    expect(screen.getByText(/Download/i)).toBeInTheDocument();
  });

  it('unselects all items and component is removed when Unselect All button is clicked', async () => {
    await act(async () => {
      store.dispatch(toggleSelectedItem(characterDetail));
    });

    render(<Flyout />);

    await waitFor(() => {
      expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
    });

    await act(async () => {
      screen.getByText(/Unselect all/i).click();
    });

    await waitFor(() => {
      expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
    });

    const state = store.getState();
    expect(state.selectedItems.selectedItems.length).toBe(0);
  });
});
