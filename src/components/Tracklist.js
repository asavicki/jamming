import React from 'react';
import styles from '../Styles.module.css';

export default function Tracklist({ tracklist, removeTrackFromTracklist }) {
    
  return (
    <div className={styles.tracklist}>
      {tracklist.map((track, id) => (
        <div key={`${track.track}_${id}`} className={styles.track_details}>
            <button
                aria-label="Remove track"
                className={styles.remove_button}
                onClick={() => removeTrackFromTracklist(track)}
                > -
            </button>
            <ul>
                <li className={styles.track_name}>{track.track}</li>
                <li className={styles.track_name}>{track.artist}</li>
                <li className={styles.track_name}>{track.album}</li>
            </ul>
          
        </div>
      ))}
    </div>
  );
};
