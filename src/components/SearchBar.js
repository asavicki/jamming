import React, { useEffect, useState } from 'react';
import styles from '../Styles.module.css';


export default function SearchBar({ setSearchQuery, searchResults, searchQuery, tracklist }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      setLoading(true);
    }
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

  // const paragraph = (
  //   if (loading) {
  //     return <p>Searching...</p>
  //   } else if (searchQuery && searchResults.length === 0) {}
  // )

  return (
    <div className={styles.search_bar_container}>
      <form onSubmit={handleSearch}>
        <input 
          type='text'
          value={query}
          onChange={queryChangeHandler}
          placeholder='Search for tracks, artists or albums...'
        /> <br />
        <button className={styles.search_btn} type='submit'>Search</button>
      </form>
      {loading && (
        <p>Searching...</p>
      )}
    </div>
  );
};
