import { Component } from 'react';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import { fetchCharacters } from './services/api';
import { Character } from './types';
import ErrorBoundary from './components/ErrorBoundary';

interface State {
  searchTerm: string;
  results: Character[];
  loading: boolean;
  error: string | null;
}

class App extends Component<Record<string, never>, State> {
  constructor(props: Record<string, never>) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
      results: [],
      loading: false,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchResults(this.state.searchTerm);
  }

  setSearchTerm = (term: string) => {
    this.setState({ searchTerm: term }, () => {
      this.fetchResults(term);
    });
  };

  fetchResults = async (searchTerm: string) => {
    this.setState({ loading: true, error: null });
    try {
      const results = await fetchCharacters(searchTerm);
      this.setState({ results, loading: false });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching results:', error);
        this.setState({ loading: false, error: error.message });
      }
    }
  };

  // Method to force an error
  throwError = () => {
    throw new Error('Test Error');
  };

  render() {
    const { searchTerm, results, loading, error } = this.state;
    return (
      <ErrorBoundary>
        <div className="app">
          <button onClick={this.throwError}>Throw Error</button>{' '}
          {/* Button to throw error */}
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={this.setSearchTerm}
          />
          {error && <div className="error">{error}</div>}
          <SearchResults results={results} loading={loading} />
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
