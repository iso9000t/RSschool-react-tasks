import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../components/ThemeContext/ThemeContext';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { store } from '../store/store';
import App from '../App';
import NotFound from '../components/NotFound/NotFound';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';

const routes = [
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
];

test('renders main application without crashing', () => {
  const router = createMemoryRouter(routes);

  render(
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>,
  );
});
