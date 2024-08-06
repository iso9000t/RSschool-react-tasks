import { render, screen, waitFor } from './test-utils';
import { http, HttpResponse } from 'msw';
import SearchResults from '../components/SearchResults/SearchResults';
import { server } from './mocks/server';

describe('SearchResults', () => {
  it('api success scenario on load', async () => {
    render(<SearchResults />);
    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(await screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('api error scenario on load', async () => {
    server.use(
      http.get('https://rickandmortyapi.com/api/character', () => {
        return HttpResponse.error();
      }),
    );

    render(<SearchResults />);

    await waitFor(() => {
      expect(screen.queryByText('Error: FETCH_ERROR')).toBeInTheDocument();
    });
  });
});
