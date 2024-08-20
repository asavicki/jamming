import React, { useState } from 'react';
import Tracklist from './Tracklist';
import styles from '../Styles.module.css';

export default function Playlist({ playlist, playlistIndex, removeTrackFromPlaylist, updatePlaylistName }) {
    const [playlistName, setPlaylistName] = useState(playlist.name);

    const hnadlePlaylistNameChange = (e) => {
        setPlaylistName(e.target.innerText);
    };

    const handleNameBlur = () => {
        updatePlaylistName(playlistIndex, playlistName);
    }
    return (
        <div className={styles.playlist}>
            <h2 
                className={styles.playlistName}  
                contentEditable='true'
                onInput={hnadlePlaylistNameChange}
                onBlur={handleNameBlur}
                suppressContentEditableWarning={true}
            >
                {playlist.name}
            </h2>
            <Tracklist 
                tracklist={playlist.tracks} 
                removeTrackFromTracklist={(track) => removeTrackFromPlaylist(playlistIndex, track)}
            />
        </div>
    );
};