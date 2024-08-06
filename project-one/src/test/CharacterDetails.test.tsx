import { render, screen, waitFor } from './test-utils';
import { http, HttpResponse } from 'msw';
import SearchResults from '../components/SearchResults/SearchResults';
import { server } from './mocks/server';
import { Route, Routes } from 'react-router-dom';

describe('SearchResults', () => {
  it('renders search results successfully', async () => {
    render(
      <Routes>
        <Route path="/" element={<SearchResults />} />
      </Routes>,
      { initialEntries: ['/'] },
    );

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(await screen.findByText('Morty Smith')).toBeInTheDocument();
  });

  it('shows error state on API failure', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.json(null, { status: 500 });
      }),
    );

    render(
      <Routes>
        <Route path="/" element={<SearchResults />} />
      </Routes>,
      { initialEntries: ['/'] },
    );

    await waitFor(() => {
      expect(screen.getByText('Error: 500')).toBeInTheDocument();
    });
  });
});
