import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import SearchResults from './components/SearchResults/SearchResults';
import { fetchCharacters } from './services/api';
import { Character } from './types';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';
import Pagination from './components/Pagination/Pagination';

const App = () => {
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';
  const [searchTerm, setSearchTerm] = useState<string>(savedSearchTerm);
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const detailsId = searchParams.get('details');

  const fetchResults = useCallback(async (term: string, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const { characters, totalPages } = await fetchCharacters(term, page);
      setResults(characters);
      setTotalPages(totalPages);
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
    fetchResults(searchTerm, page);
  }, [fetchResults, searchTerm, page]);

  // Logging changes to isDetailsVisible
  useEffect(() => {
    console.log(`detailsId: ${detailsId}`); // Log detailsId directly
    console.log(`isDetailsVisible: ${Boolean(detailsId)}`);
  }, [detailsId]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    fetchResults(term, 1);
    setSearchParams({ page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const isDetailsVisible = Boolean(detailsId);

  console.log(
    `Render App: isDetailsVisible = ${isDetailsVisible}, detailsId = ${detailsId}`,
  );

  return (
    <ErrorBoundary>
      <div className={`app ${isDetailsVisible ? 'split-view' : 'full-width'}`}>
        <div className="main-content">
          <TopField searchTerm={searchTerm} onSearch={handleSearch} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasResults={results.length > 0}
          />
          {error && <div className="error">{error}</div>}
          <div className="results-section">
            <SearchResults results={results} loading={loading} />
          </div>
        </div>
        <div className={`details-section ${isDetailsVisible ? '' : 'hidden'}`}>
          <Outlet context={{ handleCloseDetails }} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
