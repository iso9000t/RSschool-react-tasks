import { useEffect, useRef } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store/store';
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
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    if (savedSearchTerm) {
      dispatch(setSearchTerm(savedSearchTerm));
    } else {
      dispatch(setSearchTerm(''));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!searchTerm) {
      dispatch(setSearchTerm(''));
    }
  }, [dispatch, searchTerm]);

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
