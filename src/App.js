
import { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import Tracklist from './components/Tracklist';
import Track from './components/Track';

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

  return (
    <div className="App">
      <h1>Results</h1>
      <Track tracks={tracks}  />
    </div>
  );
}

export default App;
