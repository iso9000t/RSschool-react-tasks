import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../types';

export interface SelectedItemsState {
  selectedItems: Character[];
}

const initialState: SelectedItemsState = {
  selectedItems: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    toggleSelectedItem(state, action: PayloadAction<Character>) {
      const index = state.selectedItems.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index >= 0) {
        state.selectedItems.splice(index, 1); // Убираем элемент, если он уже был выбран
      } else {
        state.selectedItems.push(action.payload); // Добавляем элемент, если он еще не был выбран
      }
    },
    unselectAllItems(state) {
      state.selectedItems = [];
    },
  },
});

export const { toggleSelectedItem, unselectAllItems } =
  selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
