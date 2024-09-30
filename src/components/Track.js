import React, { useState } from 'react';
import styles from '../Styles.module.css';
import Full_Logo_White_RGB from '../images/Full_Logo_White_RGB.svg';

export default function Track({ tracks, buttonType, onButtonClick }) {
  const [playingTrackId, setPlayingTrackId] = useState(null);

  const togglePlay = (trackId) => {
    const audio = document.getElementById(trackId);

    if (playingTrackId === trackId) {
      audio.pause();
      setPlayingTrackId(null); // Stop the current track
    } else {
      // Pause any currently playing track
      if (playingTrackId) {
        const currentAudio = document.getElementById(playingTrackId);
        currentAudio.pause();
      }
      audio.play();
      setPlayingTrackId(trackId); // Set the new playing track
    }
  };

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
          <div className={styles.audio}>
            <button 
              className={styles.play_btn} 
              style={{ 
                backgroundImage: `url(${track.image})`, 
                backgroundSize: '100% 100%',
                display: playingTrackId === track.id ? 'none' : 'block' // Show play button if not playing
              }}
              onClick={() => togglePlay(track.id)}
            >
              <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7.555,3.168A1,1,0,0,0,6,4V20a1,1,0,0,0,1.555.832l12-8a1,1,0,0,0,0-1.664ZM8,18.131V5.869L17.2,12Z"/></svg>
            </button>
            <button 
              className={styles.pause_btn}
              style={{ 
                backgroundImage: `url(${track.image})`, 
                backgroundSize: '100% 100%', 
                display: playingTrackId === track.id ? 'block' : 'none' // Show pause button if playing
              }}
              onClick={() => togglePlay(track.id)}
            >
              <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M5,3A1,1,0,0,0,4,4V20a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1ZM9,19H6V5H9ZM14,3a1,1,0,0,0-1,1V20a1,1,0,0,0,1,1h5a1,1,0,0,0,1-1V4a1,1,0,0,0-1-1Zm4,16H15V5h3Z"/></svg>
            </button>
            <audio id={track.id}>
              <source src={track.preview} type="audio/mpeg" />
            </audio>
          </div>
          <ul className={styles.track_details}>
            <li className={styles.track_name}><a href={track.track_url} target="_blank" rel="noopener noreferrer">{track.track}</a></li>
            <li className={styles.track_artist}><span>by</span> <a href={track.artist_url} target="_blank" rel="noopener noreferrer">{track.artist}</a></li>
            <li className={styles.track_album}><span>from</span> <a href={track.album_url} target="_blank" rel="noopener noreferrer">{track.album}</a></li>
          </ul>
          <img className={styles.spotigy_logo} src={Full_Logo_White_RGB} alt="" />
        </div>
      ))}
    </>
  );
}
