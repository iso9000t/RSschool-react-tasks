import React, { Component } from 'react';

interface Props {
  searchTerm: string;
  onSearch: (term: string) => void;
}

interface State {
  localSearchTerm: string;
}

class SearchInput extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      localSearchTerm: props.searchTerm,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ localSearchTerm: event.target.value });
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.state.localSearchTerm.trim();
    this.props.onSearch(trimmedSearchTerm);
    if (trimmedSearchTerm) {
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      console.log(`Saved to local storage: ${trimmedSearchTerm}`);
    } else {
      localStorage.removeItem('searchTerm');
      console.log('Search term is empty, removed from local storage.');
    }
  };

  render() {
    return (
      <div className="search-section">
        <input
          type="text"
          value={this.state.localSearchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchInput;
