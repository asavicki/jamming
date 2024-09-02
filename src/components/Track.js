import React from 'react';
import styles from '../Styles.module.css';

export default function Track({ tracks, addTrackToTracklist }) {
  return (
    <>
        {
        tracks.map((track, id) => {
            return <div className={styles.track_details_container} key={`${track.track}_${id}`}>
                <button
                  aria-label="Add track"
                  className={styles.add_button}
                  onClick={() => addTrackToTracklist(track)}
                > +
                </button>
                <ul className={styles.track_details}>
                    <li className={styles.track_name}>{track.track}</li>
                    <li className={styles.track_name}><span>by</span> {track.artist}</li>
                    <li className={styles.track_name}><span>from</span> {track.album}</li>
                </ul>
            </div>
        })
        }
    </>
  );
};
