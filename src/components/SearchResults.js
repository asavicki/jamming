import React, { useState, useEffect } from 'react';
import Track from './Track';

export default function SearchResults({ searchQuery, addTrackToTracklist }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/tracks?q=${searchQuery}`);
        const data = await response.json();
        const filteredData = data.filter(track => track.track.toLowerCase().includes(searchQuery.toLowerCase()));
        setSearchResults(filteredData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    if (searchQuery) {
      fetchData()
    } else {
      setSearchResults([]);
    }

  }, [searchQuery]);

  return (
    <div>
      <h2>Search results</h2>
      {searchQuery && searchResults.length === 0 && (
        <p>No results found.</p>
      )}
      {searchResults.length > 0 && (
        <Track
          tracks={searchResults}
          addTrackToTracklist={addTrackToTracklist}
        />
      )}
    </div>
  );
}
