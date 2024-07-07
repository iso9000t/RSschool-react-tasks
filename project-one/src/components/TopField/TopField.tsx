import { Component } from 'react';
import ErrorButton from '../ErrorButton/ErrorButton';
import SearchInput from '../SearchInput/SearchInput';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

class TopField extends Component<Props> {
  render() {
    const { searchTerm, onSearch } = this.props;

    return (
      <div className="top-field">
        <div className="search-section">
          <SearchInput searchTerm={searchTerm} onSearch={onSearch} />
        </div>
        <ErrorButton />
      </div>
    );
  }
}

export default TopField;
