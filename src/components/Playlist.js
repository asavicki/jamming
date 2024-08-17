import React, { useState } from 'react';
import Tracklist from './Tracklist';

export default function Playlist({ tracklist }) {
    const [playlistName, setPlaylistName] = useState('');

    const handlePlaylistNameChange = (e) => setPlaylistName(e.target.value);

  return (
    <div className='Playlist'>
      <form action="submit">
        <label htmlFor="playlist_name">Playlist name:</label><br/>
        <input 
            type="text" 
            name="playlist_name" 
            id="playlist_name" 
            value={playlistName}
            onChange={handlePlaylistNameChange}    
        />
        <Tracklist tracklist={tracklist} />
        <button type='submit'>Create a playlist</button>
      </form>
    </div>
  );
};
