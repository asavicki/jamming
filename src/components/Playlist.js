import React from 'react';
import Tracklist from './Tracklist'; // Only necessary for displaying tracks in each playlist
import styles from '../Styles.module.css';

export default function Playlist({ playlist }) {
    return (
        <div className={styles.playlist}>
            <h2 className={styles.playlistName}>{playlist.name}</h2>
            <Tracklist 
                tracklist={playlist.tracks} 
                removeTrackFromTracklist={() => {} /* No need to handle removal here */}
            />
        </div>
    );
}