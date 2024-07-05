import React, { Component } from 'react';

interface Props {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

class SearchInput extends Component<Props> {
  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.setSearchTerm(event.target.value);
  };

  handleSearch = () => {
    const trimmedSearchTerm = this.props.searchTerm.trim();
    if (trimmedSearchTerm) {
      // Check if trimmedSearchTerm is not empty
      localStorage.setItem('searchTerm', trimmedSearchTerm);
      console.log(`Saved to local storage: ${trimmedSearchTerm}`);
    } else {
      console.log('Search term is empty, not saving to local storage.');
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchInput;
