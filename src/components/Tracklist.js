import React from 'react';
import Track from './Track';
import styles from '../Styles.module.css';

export default function Tracklist({ tracklist, buttonType, onButtonClick }) {
  return (
    <div className={styles.tracklist}>
      <Track
        tracks={tracklist}
        buttonType={buttonType}  // Specify button type (e.g., "add" or "remove")
        onButtonClick={onButtonClick}  // Handle the button click action
      />
    </div>
  );
}
