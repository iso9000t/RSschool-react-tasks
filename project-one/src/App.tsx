import { useState, useEffect, useRef } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';
import Pagination from './components/Pagination/Pagination';

const App = () => {
  const savedSearchTerm = localStorage.getItem('searchTerm') || '';
  const [searchTerm, setSearchTerm] = useState<string>(savedSearchTerm);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const detailsId = searchParams.get('details');
  const detailsRef = useRef<HTMLDivElement>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setSearchParams({ searchTerm: term, page: '1' });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ searchTerm, page: newPage.toString() });
  };

  const handleTotalPagesUpdate = (total: number) => {
    setTotalPages(total);
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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            hasResults={true} // изменил на true, потому что проверка будет внутри SearchResults
          />
          <div className="results-section">
            <SearchResults onTotalPagesUpdate={handleTotalPagesUpdate} />
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
