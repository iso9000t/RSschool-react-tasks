import { store } from '../store/store';
import {
  toggleSelectedItem,
  unselectAllItems,
} from '../store/selectedItemsSlice';
import characterDetail from '../test/mocks/characterDetail.json';

describe('selectedItemsSlice', () => {
  it('should toggle selected item', () => {
    store.dispatch(toggleSelectedItem(characterDetail));
    expect(store.getState().selectedItems.selectedItems).toContainEqual(
      characterDetail,
    );
    store.dispatch(toggleSelectedItem(characterDetail));
    expect(store.getState().selectedItems.selectedItems).not.toContainEqual(
      characterDetail,
    );
  });

  it('should unselect all items', () => {
    store.dispatch(toggleSelectedItem(characterDetail));
    store.dispatch(unselectAllItems());
    expect(store.getState().selectedItems.selectedItems).toHaveLength(0);
  });
});
