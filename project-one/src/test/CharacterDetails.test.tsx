import { render, screen } from './test-utils';
import CharacterDetails from '../components/CharacterDetails/CharacterDetails';
import { server } from './mocks/server';

describe('CharacterDetails', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('renders character details successfully', async () => {
    render(<CharacterDetails />, { initialEntries: ['/details/1'] });

    expect(await screen.findByText('Rick Sanchez')).toBeInTheDocument();
    expect(await screen.findByText('Alive')).toBeInTheDocument();
    expect(await screen.findByText('Human')).toBeInTheDocument();
    expect(await screen.findByText('Male')).toBeInTheDocument();
    expect(await screen.findByText('Earth (C-137)')).toBeInTheDocument();
    expect(await screen.findByText('Citadel of Ricks')).toBeInTheDocument();
  });

});
