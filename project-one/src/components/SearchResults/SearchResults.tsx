import { Character } from '../../types';

interface Props {
  results: Character[];
  loading: boolean;
}

function SearchResults({ results, loading }: Props) {
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
        <div key={result.id} className="result-item">
          <h3>{result.name}</h3>
          <p>{result.species}</p>
          <img src={result.image} alt={result.name} />
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
