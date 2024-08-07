import { screen } from '@testing-library/react';
import { render } from './test-utils';
import '@testing-library/jest-dom';
import App from '../App';


test('renders the App component', () => {
  render(<App />);

  // Check for the presence of known elements
  expect(screen.getByText(/Switch to/i)).toBeInTheDocument(); // Check for ThemeToggle
  expect(screen.getAllByText(/Search/i)[0]).toBeInTheDocument(); // Check for Search Button
  expect(screen.getByText(/Page/i)).toBeInTheDocument(); // Check for Pagination
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument(); // Check for SearchResults
  expect(
    screen.getByText(/Update the search term to make a new request./i),
  ).toBeInTheDocument(); // Check for hint in TopField
});
