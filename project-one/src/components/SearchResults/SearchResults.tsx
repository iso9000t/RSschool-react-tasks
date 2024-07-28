import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPages } from '../../store/paginationSlice';
import { Character } from '../../types';
import { useLazyGetCharactersQuery } from '../../store/apiSlice';
import { RootState } from '../../store/store';
import { toggleSelectedItem } from '../../store/selectedItemsSlice';

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trigger, { data, isLoading, error }] = useLazyGetCharactersQuery();
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItems.selectedItems,
  );

  useEffect(() => {
    if (searchTerm) {
      trigger({ searchTerm, page: currentPage });
    }
  }, [searchTerm, currentPage, trigger]);

  useEffect(() => {
    if (data) {
      dispatch(setTotalPages(data.totalPages));
    }
  }, [data, dispatch]);

  const handleItemClick = (id: number) => {
    searchParams.set('details', id.toString());
    setSearchParams(searchParams);
    navigate(`details/${id}`);
  };

  const handleCheckboxChange = (character: Character) => {
    dispatch(toggleSelectedItem(character));
  };

  if (isLoading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    let errorMessage;
    if ('status' in error) {
      if (error.status === 404) {
        errorMessage = 'No data found';
      } else {
        errorMessage = `Error: ${error.status}`;
      }
    } else if ('message' in error) {
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = 'Unknown error';
    }
    return <div className="error">{errorMessage}</div>;
  }

  if (!data || data.characters.length === 0) {
    return (
      <div className="no-results">
        <p>No data found</p>
      </div>
    );
  }

  return (
    <div className="results">
      {data.characters.map((result: Character) => (
        <div
          key={result.id}
          className="result-item"
          role="button"
          tabIndex={0}
          onClick={() => handleItemClick(result.id)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleItemClick(result.id);
            }
          }}
        >
          <input
            type="checkbox"
            checked={selectedItems.some((item) => item.id === result.id)}
            onChange={() => handleCheckboxChange(result)}
            onClick={(e) => e.stopPropagation()}
          />
          <h3>{result.name}</h3>
          <p>{result.species}</p>
          <img src={result.image} alt={result.name} />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
