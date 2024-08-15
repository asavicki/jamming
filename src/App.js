
import { useState } from 'react';
import './App.css';
import Track from './components/Track';
import Tracklist from './components/Tracklist';

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

  const [playlist, setPlaylist] = useState([{}]);

  const addTrackToPlaylist = (track) => {
    setPlaylist(prevPlaylist => [track, ...prevPlaylist])
  };

  

  return (
    <div className="App">
      <h1>Results</h1>
      <Track tracks={tracks}  />
      <Tracklist addTrack={addTrackToPlaylist}/>
    </div>
  );
}

export default App;
