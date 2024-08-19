
import { useState } from 'react';
import styles from './Styles.module.css';
import Track from './components/Track';
import Playlist from './components/Playlist';

function App() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      track: 'Enjoyt the Silence',
      artist: 'Depeche Mode',
      album: 'Violator',
    },
    {
      id: 2,
      track: 'Class Act, Final Front',
      artist: 'Johny Rock',
      album: 'Way Over There',
    },
  ]);

  const [tracklist, setTracklist] = useState([]);

  const addTrackToTracklist = (track) => {
    setTracklist(prevTracklist => [track, ...prevTracklist]);
  };

  const removeTrackFromTracklist = (trackToRemove) => {
    setTracklist(prevTracklist =>
      prevTracklist.filter(track => track.id !== trackToRemove.id)
    );
  };

  return (
    <div className={styles.App}>
      <h1>Results</h1>
      <Track 
        tracks={tracks} 
        addTrackToTracklist={addTrackToTracklist} 
      />
      <Playlist 
        tracklist={tracklist} 
        removeTrackFromTracklist={removeTrackFromTracklist}
      />
    </div>
  );
};

export default App;
