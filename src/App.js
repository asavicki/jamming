import { useState } from 'react';
import styles from './Styles.module.css';
import Track from './components/Track';
import PlaylistCreator from './components/PlaylistCreator';
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

  //TRACKLIST
  const [tracklist, setTracklist] = useState([]);

  const addTrackToTracklist = (trackToAdd) => {
    // Check if the track already exists in the tracklist
    const trackExists = tracklist.some(track =>
      track.track === trackToAdd.track &&
      track.artist === trackToAdd.artist &&
      track.album === trackToAdd.album
    );
  
    // If the track does not exist, add it to the tracklist
    if (!trackExists) {
      setTracklist(prevTracklist => [trackToAdd, ...prevTracklist]);
    } else {
      console.log("Track already exists in the tracklist.");
    }
  };

  const removeTrackFromTracklist = (trackToRemove) => {
    setTracklist(prevTracklist =>
      prevTracklist.filter(track => track.id !== trackToRemove.id)
    );
  };

  //PLAYLISTS
  const [playlists, setPlaylists] = useState([]);

  const createPlaylist = (playlistName) => {
    if (playlistName.trim() !== '') {
      setPlaylists([ { name: playlistName, tracks: tracklist }, ...playlists ]);
      setTracklist([]);
    }
    
  };

  const removeTrackFromPlaylist = (playlistIndex, trackToRemove) => {
    const updatedPlaylists = playlists.map((playlist, index) => {
      if (index === playlistIndex) {
        return {
          ...playlist,
          tracks: playlist.tracks.filter(track => track.id !== trackToRemove.id)
        };
      }
      return playlist;
    });
    setPlaylists(updatedPlaylists);
  };

  const updatePlaylistName = (playlistIndex, newPlaylistName) => {
    const updatedPlaylists = playlists.map((playlist, index) => 
      index === playlistIndex ? { ...playlist, name: newPlaylistName } : playlist
    );
    setPlaylists(updatedPlaylists);
  };

  const deletePlaylist = (playlistIndex) => {
    setPlaylists(prevPlaylists => prevPlaylists.filter((_, index) => index !== playlistIndex));
  };

  return (
    <div className={styles.App}>
      <h1>Results</h1>
      <Track 
        tracks={tracks} 
        addTrackToTracklist={addTrackToTracklist} 
      />
      <PlaylistCreator 
        tracklist={tracklist} 
        removeTrackFromTracklist={removeTrackFromTracklist}
        createPlaylist={createPlaylist}
      />
      {
      playlists.map((playlist, index) => (
        <Playlist 
          key={index} 
          playlist={playlist}
          playlistIndex={index}
          removeTrackFromPlaylist={removeTrackFromPlaylist}
          updatePlaylistName={updatePlaylistName}
          deletePlaylist={deletePlaylist}
        />
      ))
      }
    </div>
  );
};

export default App;
