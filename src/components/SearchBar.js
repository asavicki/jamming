import React, { useState } from 'react';


export default function SearchBar({ setSearchQuery, searchResults, searchQuery }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
    setQuery('');
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input 
          type='text'
          value={query}
          onChange={queryChangeHandler}
          placeholder='Search for tracks...'
        />
        <button className='search_btn' type='submit'>Search</button>
      </form>
      {searchQuery && searchResults.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
};
