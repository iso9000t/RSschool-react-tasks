import ErrorButton from '../ErrorButton/ErrorButton';
import SearchInput from '../SearchInput/SearchInput';

function TopField() {
  return (
    <div className="top-field">
      <div className="search-section">
        <SearchInput />
      </div>
      <ErrorButton />
    </div>
  );
}

export default TopField;
