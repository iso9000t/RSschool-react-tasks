import ErrorButton from '../ErrorButton/ErrorButton';
import SearchInput from '../SearchInput/SearchInput';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

function TopField({ searchTerm, onSearch }: Props) {
  return (
    <div className="top-field">
      <div className="search-section">
        <SearchInput searchTerm={searchTerm} onSearch={onSearch} />
      </div>
      <ErrorButton />
    </div>
  );
}

export default TopField;
