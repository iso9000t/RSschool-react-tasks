import { screen } from '@testing-library/react';
import { render } from './test-utils';
import '@testing-library/jest-dom';
import App from '../App';


test('renders the App component', () => {
  render(<App />);

  expect(screen.getByText(/Switch to/i)).toBeInTheDocument();
  expect(screen.getAllByText(/Search/i)[0]).toBeInTheDocument();
  expect(screen.getByText(/Page/i)).toBeInTheDocument();
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  expect(
    screen.getByText(/Update the search term to make a new request./i),
  ).toBeInTheDocument();
});
