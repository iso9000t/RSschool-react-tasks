import { Component } from 'react';
import { Character } from '../types';

interface Props {
  results: Character[];
  loading: boolean;
}

class SearchResults extends Component<Props> {
  render() {
    const { results, loading } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {results.map((result: Character) => (
          <div key={result.id}>
            <h3>{result.name}</h3>
            <p>{result.species}</p>
            <img src={result.image} alt={result.name} />
          </div>
        ))}
      </div>
    );
  }
}

export default SearchResults;
