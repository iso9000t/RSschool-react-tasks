import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import paginationReducer, { PaginationState } from '../store/paginationSlice';
import Pagination from '../components/Pagination/Pagination';

const initialState: { pagination: PaginationState } = {
  pagination: { currentPage: 1, totalPages: 5 },
};

const renderWithProviders = (
  ui: React.ReactElement,
  {
    store = configureStore({
      reducer: { pagination: paginationReducer },
      preloadedState: initialState,
    }),
  } = {},
) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

test('renders pagination component and interacts correctly', () => {
  renderWithProviders(<Pagination />);

  const previousButton = screen.getByText(/previous/i);
  const nextButton = screen.getByText(/next/i);
  const pageInfo = screen.getByText(/page 1 of 5/i);

  expect(previousButton).toBeDisabled();
  expect(nextButton).not.toBeDisabled();
  expect(pageInfo).toBeInTheDocument();

  fireEvent.click(nextButton);
  expect(screen.getByText(/page 2 of 5/i)).toBeInTheDocument();
  expect(previousButton).not.toBeDisabled();

  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  expect(screen.getByText(/page 5 of 5/i)).toBeInTheDocument();
  expect(nextButton).toBeDisabled();

  fireEvent.click(previousButton);
  expect(screen.getByText(/page 4 of 5/i)).toBeInTheDocument();
  expect(nextButton).not.toBeDisabled();
});
