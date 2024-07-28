import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from './store/paginationSlice';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';
import Pagination from './components/Pagination/Pagination';

const App = () => {
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';
  const [searchTerm, setSearchTerm] = useState<string>(savedSearchTerm);
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const detailsRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ searchTerm: term, page: '1' });
    dispatch(setCurrentPage(1));
  };

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      detailsRef.current &&
      !detailsRef.current.contains(event.target as Node)
    ) {
      handleCloseDetails();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const isDetailsVisible = Boolean(detailsId);

  return (
    <ErrorBoundary>
      <div className={`app ${isDetailsVisible ? 'split-view' : 'full-width'}`}>
        <div className="main-content">
          <TopField searchTerm={searchTerm} onSearch={handleSearch} />
          <Pagination />
          <div className="results-section">
            <SearchResults />
          </div>
        </div>
        <div
          ref={detailsRef}
          className={`details-section ${isDetailsVisible ? '' : 'hidden'}`}
        >
          <Outlet context={{ handleCloseDetails }} />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default App;
