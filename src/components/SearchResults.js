import React from 'react';
import Track from './Track';

export default function SearchResults({ searchResults, addTrackToTracklist }) {
  

  return (
    <div>
      <h2>Search results</h2>
      {searchResults.length > 0 && (
        <Track
          tracks={searchResults}
          addTrackToTracklist={addTrackToTracklist}
        />
      )}
    </div>
  );
}
