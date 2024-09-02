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
    <div className={styles.PlaylistCreator}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="playlist_name">Playlist name:</label><br />
        <input
          type="text"
          name="playlist_name"
          id="playlist_name"
          value={playlistName}
          onChange={handlePlaylistNameChange}
        />
        <Tracklist
          tracklist={tracklist}
          buttonType="remove"  // Specify remove button for the tracklist
          onButtonClick={removeTrackFromTracklist}  // Handle track removal
        />
        <button type='submit'>Create a playlist</button>
      </form>
    </div>
  );
}
