import { useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from './store/searchSlice';
import SearchResults from './components/SearchResults/SearchResults';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import TopField from './components/TopField/TopField';
import Pagination from './components/Pagination/Pagination';
import Flyout from './components/Flyout/Flyout';

import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import { useTheme } from './components/ThemeContext/ThemeContext';

const App = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const detailsId = searchParams.get('details');
  const detailsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    if (savedSearchTerm) {
      dispatch(setSearchTerm(savedSearchTerm));
    }
  }, [dispatch]);

  const handleCloseDetails = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
  };

  const isDetailsVisible = Boolean(detailsId);

  return (
    <ErrorBoundary>
      <div
        className={`app ${theme} ${isDetailsVisible ? 'split-view' : 'full-width'}`}
      >
        <ThemeToggle />
        <div className="main-content">
          <TopField />
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
        <Flyout />
      </div>
    </ErrorBoundary>
  );
};

export default App;
