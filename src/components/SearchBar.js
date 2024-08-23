import React, { useState } from 'react';
import styles from './Styles.module.css';

export default function SearchBar({ setSearchQuery }) {
  const  [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query);
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
        <button className={styles.search_button} type='submit'>Search</button>
      </form>
    </div>
  );
};
