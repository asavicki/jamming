import React, { memo } from 'react';
import Tracklist from './Tracklist';

function SearchResults({ searchResults, addTrackToTracklist }) {
  return (
    <div>
      <h2>Search results</h2>
      {searchResults.length > 0 && (
        <Tracklist
          tracklist={searchResults}
          buttonType="add"  // Specify add button for the search results
          onButtonClick={addTrackToTracklist}  // Handle adding tracks
        />
      )}
    </div>
  );
}

export default memo(SearchResults);
