import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import { store } from '../store/store';
import App from '../App';
import NotFound from '../components/NotFound/NotFound';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'details/:id',
        element: <CharacterDetails />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

test('renders the app without crashing', () => {
  render(
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>,
  );

  expect(screen.getByText('Loading...')).toBeInTheDocument();
});
