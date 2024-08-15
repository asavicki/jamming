import React from 'react';
import styles from '../Styles.module.css';

export default function Track({tracks}) {
  return (
    <div>
        {
        tracks.map((track, id) => {
            return <div className={styles.trackDetails} key={`${track}_${id}`}>
                <button
                aria-label="Remove thought"
                className={styles.removeButton}
                > &times;
                </button>
                <ul>
                    <li className={styles.trackName}>{track.track}</li>
                    <li className={styles.trackName}>{track.artist}</li>
                    <li className={styles.trackName}>{track.album}</li>
                </ul>
            </div>
        })
        }
    </div>
  );
};
