import { useState, useEffect, useCallback } from 'react';
import SearchResults from './components/SearchResults/SearchResults';
import { fetchCharacters } from './services/api';
import { Character } from './types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';

const App = () => {
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';
  const [searchTerm, setSearchTerm] = useState<string>(savedSearchTerm);
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(async (term: string) => {
    setLoading(true);
    setError(null);
    try {
      const results = await fetchCharacters(term);
      setResults(results);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Error fetching results:', error);
        setLoading(false);
        setError(error.message);
      }
    }
  }, []);

  useEffect(() => {
    fetchResults(searchTerm);
  }, [fetchResults, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchResults(term);
  };

  return (
    <ErrorBoundary>
      <div className="app">
        <TopField searchTerm={searchTerm} onSearch={handleSearch} />
        {error && <div className="error">{error}</div>}
        <div className="results-section">
          <SearchResults results={results} loading={loading} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
