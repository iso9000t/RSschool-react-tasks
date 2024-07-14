import { useState, useEffect, ChangeEvent } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

function SearchInput({ searchTerm, onSearch }: Props) {
  const [localSearchTerm, setLocalSearchTerm] = useState<string>(searchTerm);

  useEffect(() => {
    setLocalSearchTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = localSearchTerm.trim();
    if (trimmedSearchTerm !== searchTerm) {
      onSearch(trimmedSearchTerm);
      if (trimmedSearchTerm) {
        localStorage.setItem('searchTerm', trimmedSearchTerm);
        console.log(`Saved to local storage: ${trimmedSearchTerm}`);
      } else {
        localStorage.removeItem('searchTerm');
        console.log('Search term is empty, removed from local storage.');
      }
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
