
import { useState } from 'react';
import styles from './Styles.module.css';
import Track from './components/Track';
import Playlist from './components/Playlist';

function App() {
  const [tracks, setTracks] = useState([
    {
      track: 'Enjoyt the Silence',
      artist: 'Depeche Mode',
      album: 'Violator',
    },
    {
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
    setTracklist(prevTracklist => tracklist.filter((track) => track !== trackToRemove));
  };

  return (
    <div className={styles.App}>
      <h1>Results</h1>
      <Track tracks={tracks} addTrackToTracklist={addTrackToTracklist} removeTrackFromTracklist={removeTrackFromTracklist}/>
      <Playlist tracklist={tracklist} />
    </div>
  );
};

export default App;
