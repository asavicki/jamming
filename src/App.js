import { useState, useEffect } from 'react';
import styles from './Styles.module.css';
import Track from './components/Track';
import PlaylistCreator from './components/PlaylistCreator';
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

function App() {
  //TRACK
  const [tracks, setTracks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  //SEARCHRESULTS
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5001/tracks?q=${searchQuery}`);
        const data = await response.json();
        const filteredData = data.filter(track => track.track.toLowerCase().includes(searchQuery.toLowerCase()));

        setSearchResults(prevResults => [...prevResults, ...filteredData]);
        
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    if (searchQuery) {
      fetchData()
    } else {
      setSearchResults([]);
    }

  }, [searchQuery]);

  // Export a specific playlist
  const exportPlaylist = async (playlistIndex) => {
    const playlist = playlists[playlistIndex];
    
    // Create mock URIs
    const mockURIs = playlist.tracks.map(track => `spotify:track:${track.id}`);
    
    console.log('Mock URIs for export:', mockURIs);

    // Simulate API request (mocked)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
      console.log('Playlist exported successfully.');

      // Remove the exported playlist
      deletePlaylist(playlistIndex);
    } catch (error) {
      console.error('Error exporting playlist: ', error);
    }
  };

  return (
    <div className={styles.App}>
      <h1>Spotify playlist creator</h1>
      <SearchBar 
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        searchResults={searchResults} />
      <SearchResults 
        searchResults={searchResults}
        searchQuery={searchQuery}
        addTrackToTracklist={addTrackToTracklist}
      />
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
          exportPlaylist={exportPlaylist}
        />
      ))
      }
    </div>
  );
};

export default App;
