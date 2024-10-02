import { useState, useEffect, useCallback } from 'react';
import styles from './Styles.module.css';
import PlaylistCreator from './components/PlaylistCreator';
import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Login from './components/Login';

function App() {
  // const [tracks, setTracks] = useState([]); used to MOCK Data
  const [tracklist, setTracklist] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState('');

  // TRACKLIST
  const addTrackToTracklist = (trackToAdd) => {
    // Check if the track already exists in the tracklist
    const trackExists = tracklist.some(track =>
      track.track === trackToAdd.track &&
      track.artist === trackToAdd.artist &&
      track.album === trackToAdd.album
    );
  
    // If the track does not exist, add it to the tracklist
    if (!trackExists) {
      setTracklist(prevTracklist => {
        const updatedTracklist = [trackToAdd, ...prevTracklist];
        localStorage.setItem('tracklist', JSON.stringify(updatedTracklist));
        return updatedTracklist;
      }
        );
    } else {
      console.log("Track already exists in the tracklist.");
    }
  
    // Remove track from search results
    removeTrackFromSearchResults(trackToAdd);
  };
  
  const removeTrackFromSearchResults = (trackToRemove) => {
    setSearchResults(prevSearchResults => {
      const updatedSearchResults = prevSearchResults.filter(track => track.id !== trackToRemove.id);
      localStorage.setItem('searchResults', JSON.stringify(updatedSearchResults));
      return updatedSearchResults;
    }
      );
  };

  const removeTrackFromTracklist = (trackToRemove) => {
    setTracklist(prevTracklist => {
      const updatedTracklist = prevTracklist.filter(track => track.id !== trackToRemove.id);
      localStorage.setItem('tracklist', JSON.stringify(updatedTracklist));
      return updatedTracklist;
    }
      
    );
  };

  // PLAYLISTS
  const createPlaylist = (playlistName) => {
    if (playlistName.trim() === '' || tracklist.length === 0) {
      return;
    }

    const newPlaylist = { name: playlistName, tracks: tracklist };
      const updatedPlaylists = [newPlaylist, ...playlists];
      setPlaylists(updatedPlaylists);
      localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
      setTracklist([]);
      localStorage.removeItem('tracklist');
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
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
  };

  const updatePlaylistName = (playlistIndex, newPlaylistName) => {
    const updatedPlaylists = playlists.map((playlist, index) => 
      index === playlistIndex ? { ...playlist, name: newPlaylistName } : playlist
    );
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
  };

  const deletePlaylist = (playlistIndex) => {
    const updatedPlaylists = playlists.filter((_, index) => index !== playlistIndex);
    setPlaylists(updatedPlaylists);
    localStorage.setItem('playlists', JSON.stringify(updatedPlaylists));
  };

  // TOKEN
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem('token');

    if(!token && hash) {
      token = new URLSearchParams(hash.replace('#', '')).get('access_token');
      window.location.hash = '';
      window.localStorage.setItem('token', token);
    }

    setToken(token);
  }, []);

// DATA FETCH
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/search?q=${searchQuery}&type=track`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
  console.error(`Error: ${response.status} ${response.statusText}`);
  const errorText = await response.text();  // Get the error text if it's not JSON
  console.error('Error response text:', errorText);
  return;
}
    const data = await response.json();
    console.log('API response:', data);

    const tracks = data.tracks.items.map(track => ({
      id: track.id,
      track: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[0].url,
      preview: track.preview_url,
      track_url: track.external_urls.spotify,
      artist_url: track.artists[0].external_urls.spotify,
      album_url: track.album.external_urls.spotify,
      uri: track.uri
    }));

      setSearchResults(tracks);
      localStorage.setItem('searchResults', JSON.stringify(tracks));
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }, [searchQuery, token]);

  useEffect(() => {
    if (searchQuery && token) {
      fetchData()
    }
  }, [searchQuery, token, fetchData]);

  // PLAYLIST EXPORT
  const exportPlaylist = async (playlistIndex) => {
    const playlist = playlists[playlistIndex];

    try {
      // Fetch usr ID
      const userProfileResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!userProfileResponse.ok) {
        throw new Error('Failed to fecth user profile');
      };

      const userProfile = await userProfileResponse.json();
      const userId = userProfile.id;

      // Create a new playlist
      const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlist.name,
          description: 'Playlist desciption',
          public: false
        })
      });

      if (!createPlaylistResponse.ok) {
        throw new Error('Failed to create playlist');
      };

      const createPlaylist = await createPlaylistResponse.json();
      const playlistId = createPlaylist.id;

      // Add tracks to the playlist
      const trackUris = playlist.tracks.map(track => track.uri);
      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: trackUris
        })
      });

      deletePlaylist(playlistIndex);
    } catch (error) {
      console.error('Error exporting playlist: ', error);
    }
  };

  // LOAD PLAYLISTS, SEARCHRESULTS, TRACKLIST FROM LOCAL STORAGE
  useEffect(() => {
    const storedPlaylists = localStorage.getItem('playlists');
    const storedSearchResults = localStorage.getItem('searchResults');
    const storedTracklist = localStorage.getItem('tracklist');
    
    if (storedPlaylists) {
      try {
        const parsedPlaylists = JSON.parse(storedPlaylists);
        setPlaylists(parsedPlaylists);
      } catch (error) {
        console.error("Failed to parse playlists from localStorage:", error);
      }
    };

    if (storedSearchResults) {
      try {
        const parsedSearchResults = JSON.parse(storedSearchResults);
        setSearchResults(parsedSearchResults);
      } catch (error) {
        console.error("Failed to parse searchResults from localStorage:", error);
      }
    };

    if (storedTracklist) {
      try {
        const parsedTracklist = JSON.parse(storedTracklist);
        setTracklist(parsedTracklist);
      } catch (error) {
        console.error("Failed to parse searchResults from localStorage:", error);
      }
    };
  }, []);

  // LOGOUT
  const logout = () => {
    setToken('');
    window.localStorage.removeItem('token');
  }

  return (
    <div className={styles.App}>
      {!token ? (
        <Login />
      ) : (
        <>
          <header>
            <div className={styles.app_name_container}>
              <p>Jammming <br /><span>Spotify Playlist Creator</span></p>
            </div>
            <button className={styles.logout_btn} onClick={logout}>Log Out</button>
          </header>
          <SearchBar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            searchResults={searchResults}
            tracklist={tracklist}
          />
          <div className={styles.search_res_playlist_creator_wrapper}>
            <SearchResults
              searchResults={searchResults}
              addTrackToTracklist={addTrackToTracklist}
            />
            <PlaylistCreator
              tracklist={tracklist}
              removeTrackFromTracklist={removeTrackFromTracklist}
              createPlaylist={createPlaylist}
            />
          </div>
          <div className={styles.playlists_wrapper}>
            <h1 className={styles.playlists_heading}>Playlists</h1>
            <div className={styles.playlists_container}>
              {playlists.map((playlist, index) => (
                <Playlist
                  key={index}
                  playlist={playlist}
                  playlistIndex={index}
                  removeTrackFromPlaylist={removeTrackFromPlaylist}
                  updatePlaylistName={updatePlaylistName}
                  deletePlaylist={deletePlaylist}
                  exportPlaylist={exportPlaylist}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
