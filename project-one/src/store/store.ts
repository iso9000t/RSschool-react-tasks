import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import paginationReducer from './paginationSlice';
import searchReducer, { SearchState } from './searchSlice';
import { rickAndMortyApi } from './apiSlice';

export const store = configureStore({
  reducer: {
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
    pagination: paginationReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState> & {
  search: SearchState;
};
export type AppDispatch = typeof store.dispatch;
