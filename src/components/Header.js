import React from 'react';
import styles from '../Styles.module.css';

export default function Header({ logout }) {
    return (
        <header>
            <div className={styles.app_name_container}>
                <p>Jammming <br /><span>Spotify Playlist Creator</span></p>
            </div>
            <button className={styles.logout_btn} onClick={logout}>Log Out</button>
        </header>
    )
};
