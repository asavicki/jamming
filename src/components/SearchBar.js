import React, { useEffect, useState } from 'react';


export default function SearchBar({ setSearchQuery, searchResults, searchQuery }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setSearchQuery(query);
    setQuery('');
  };

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  // Simulate loading completion once data is fetched
  useEffect(() => {
    if (searchQuery) {
      setLoading(false); //Set loading to false when data is fetched
    }
  }, [searchResults]); // Update based on search results changes

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
      {loading ? (
        <p>Searching...</p>
      ) : (
        searchQuery && searchResults.length === 0 && (
          <p>No results found.</p>
        )
      )}
    </div>
  );
};
