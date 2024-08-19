import React from 'react';
import Tracklist from './Tracklist'; // Only necessary for displaying tracks in each playlist
import styles from '../Styles.module.css';

export default function Playlist({ playlist, playlistIndex, removeTrackFromPlaylist }) {
    return (
        <div className={styles.playlist}>
            <h2 className={styles.playlistName}>{playlist.name}</h2>
            <Tracklist 
                tracklist={playlist.tracks} 
                removeTrackFromTracklist={(track) => removeTrackFromPlaylist(playlistIndex, track)}
            />
        </div>
    );
}