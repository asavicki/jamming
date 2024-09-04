import React, { useState } from 'react';
import Tracklist from './Tracklist';
import styles from '../Styles.module.css';

export default function PlaylistCreator({ tracklist, removeTrackFromTracklist, createPlaylist }) {
  const [playlistName, setPlaylistName] = useState('');

  const handlePlaylistNameChange = (e) => setPlaylistName(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    createPlaylist(playlistName);
    setPlaylistName('');
  };

  return (
    <div className={styles.tracks_wrapper}>
      <div className={styles.playlist_creator_container}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="playlist_name"
            id="playlist_name"
            value={playlistName}
            onChange={handlePlaylistNameChange}
            placeholder='Playlist name...'
          />
          <div style={{textAlign: 'center'}}>
            <button type='submit'>Create Playlist</button>
          </div>
          <Tracklist
            tracklist={tracklist}
            buttonType="remove"  // Specify remove button for the tracklist
            onButtonClick={removeTrackFromTracklist}  // Handle track removal
          />
        </form>
      </div>
    </div>
  );
}
