import { Character } from '../../types';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  results: Character[];
  loading: boolean;
}

function SearchResults({ results, loading }: Props) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemClick = (id: number) => {
    searchParams.set('details', id.toString());
    setSearchParams(searchParams);
    navigate(`details/${id}`);
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="spinner"></div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="no-results">
        <p>Nothing found</p>
      </div>
    );
  }

  return (
    <div className="results">
      {results.map((result) => (
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
}

export default SearchResults;
