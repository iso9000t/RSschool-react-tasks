import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorageSearchTerm from '../../hooks/useLocalStorageSearchTerm';
import { useLazyGetCharactersQuery } from '../../store/apiSlice';

import { setSearchTerm } from '../../store/searchSlice';
import { setCurrentPage } from '../../store/paginationSlice';
import { RootState } from '../../store/store';

function SearchInput() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.search.searchTerm);
  const [localSearchTerm, setLocalSearchTerm, handleSearchTermSave] =
    useLocalStorageSearchTerm('searchTerm', searchTerm);

  const [trigger] = useLazyGetCharactersQuery();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = localSearchTerm.trim();
    if (trimmedSearchTerm !== searchTerm) {
      dispatch(setSearchTerm(trimmedSearchTerm));
      dispatch(setCurrentPage(1)); // Сбрасываем текущую страницу на первую при новом поиске
      handleSearchTermSave();
      trigger({ searchTerm: trimmedSearchTerm, page: 1 });
    }
  };

  const isSearchDisabled = localSearchTerm.trim() === searchTerm.trim();
  const hintMessage = isSearchDisabled
    ? 'Update the search term to make a new request.'
    : '';

  return (
    <div className="search-section">
      <input type="text" value={localSearchTerm} onChange={handleChange} />
      <button
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className={
          isSearchDisabled ? 'search-button disabled' : 'search-button'
        }
      >
        Search
      </button>
      {isSearchDisabled && <div className="hint">{hintMessage}</div>}
    </div>
  );
}

export default SearchInput;
