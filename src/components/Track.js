import React from 'react';
import styles from '../Styles.module.css';

export default function Track({ tracks, addTrackToTracklist }) {
  return (
    <>
        {
        tracks.map((track, id) => {
            return <div className={styles.track_details} key={`${track.track}_${id}`}>
                <button
                aria-label="Add track"
                className={styles.add_button}
                onClick={() => addTrackToTracklist(track)}
                > +
                </button>
                <ul>
                    <li className={styles.track_name}>{track.track}</li>
                    <li className={styles.track_name}>{track.artist}</li>
                    <li className={styles.track_name}>{track.album}</li>
                </ul>
            </div>
        })
        }
    </>
  );
};
