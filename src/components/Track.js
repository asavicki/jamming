import React from 'react';
import styles from '../Styles.module.css';

export default function Track({ tracks, buttonType, onButtonClick }) {
  return (
    <>
      {tracks.map((track, id) => (
        <div className={styles.track_details_container} key={`${track.track}_${id}`}>
          {buttonType === 'add' && (
            <button
              aria-label="Add track"
              className={styles.add_remove_btn}
              onClick={() => onButtonClick(track)}
            >
              +
            </button>
          )}
          {buttonType === 'remove' && (
            <button
              aria-label="Remove track"
              className={styles.add_remove_btn}
              onClick={() => onButtonClick(track)}
            >
              &times;
            </button>
          )}
          <div>
            <img className={styles.track_image} src={track.image} alt='album cover'/>
            <audio controlsList="nodownload,play">
            <source src="audio.mp3" type="audio/mpeg" />
            </audio>
          </div>
          <div>
            <ul className={styles.track_details}>
              <li className={styles.track_name}>{track.track}</li>
              <li className={styles.track_artist}><span>by</span> {track.artist}</li>
              <li className={styles.track_album}><span>from</span> {track.album}</li>
            </ul>
          </div>
          
        </div>
      ))}
    </>
  );
}
