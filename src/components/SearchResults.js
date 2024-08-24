import React, { useState, useEffect } from 'react';
import Track from './Track';

export default function SearchResults({ searchQuery, addTrackToTracklist }) {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://locahost:5000/tracks?q=${searchQuery}');
        const data = await response.json();
        setSearchResults(data);
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
      {SearchResults.length > 0 ? (
        <Track
          tracks={searchResults}
          addTrackToTracklist={addTrackToTracklist}
        />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
