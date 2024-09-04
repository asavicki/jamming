import React, { memo } from 'react';
import Tracklist from './Tracklist';
import styles from '../Styles.module.css';

function SearchResults({ searchResults, addTrackToTracklist }) {
  return (
    <div className={styles.tracks_wrapper}>
      <div className={styles.search_results_container}>
        <h2>Search results</h2>
        {searchResults.length > 0 && (
          <Tracklist
            tracklist={searchResults}
            buttonType="add"  // Specify add button for the search results
            onButtonClick={addTrackToTracklist}  // Handle adding tracks
          />
      )}
      </div>
    </div>
  );
}

export default memo(SearchResults);
