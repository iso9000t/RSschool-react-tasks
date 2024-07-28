import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyGetCharactersQuery } from '../../services/apiSlice';
import { Character } from '../../types';

interface SearchResultsProps {
  onTotalPagesUpdate: (total: number) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  onTotalPagesUpdate,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [trigger, { data, isLoading, error }] = useLazyGetCharactersQuery();

  const searchTerm = searchParams.get('searchTerm') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (searchTerm) {
      trigger({ searchTerm, page });
    }
  }, [searchTerm, page, trigger]);

  useEffect(() => {
    if (data) {
      onTotalPagesUpdate(data.totalPages);
    }
  }, [data, onTotalPagesUpdate]);

  const handleItemClick = (id: number) => {
    searchParams.set('details', id.toString());
    setSearchParams(searchParams);
    navigate(`details/${id}`);
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
      // Это FetchBaseQueryError
      errorMessage = `Error: ${error.status}`;
    } else if (error.message) {
      // Это SerializedError
      errorMessage = `Error: ${error.message}`;
    } else {
      errorMessage = 'Unknown error';
    }
    return <div className="error">{errorMessage}</div>;
  }

  if (!data || data.characters.length === 0) {
    return (
      <div className="no-results">
        <p>Nothing found</p>
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
          <h3>{result.name}</h3>
          <p>{result.species}</p>
          <img src={result.image} alt={result.name} />
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
