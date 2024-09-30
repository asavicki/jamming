
  // SEARCHRESULTS
  // Mock code
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5001/tracks?q=${searchQuery}`);
  //       const data = await response.json();
  //       const filteredData = data.filter(track => track.track.toLowerCase().includes(searchQuery.toLowerCase()));

  //       setSearchResults(prevResults => [...prevResults, ...filteredData]);
        
  //     } catch (error) {
  //       console.error('Error fetching data: ', error);
  //     }
  //   };

  //   if (searchQuery) {
  //     fetchData()
  //   } else {
  //     setSearchResults([]);
  //   }

  // }, [searchQuery]);

  // Mock POST
  // const exportPlaylist = async (playlistIndex) => {
  //   const playlist = playlists[playlistIndex];
    
  //   // Create mock URIs
  //   const mockURIs = playlist.tracks.map(track => `spotify:track:${track.id}`);
    
  //   console.log('Mock URIs for export:', mockURIs);

  //   // Simulate API request (mocked)
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
  //     console.log('Playlist exported successfully.');

  //     // Remove the exported playlist
  //     deletePlaylist(playlistIndex);
  //   } catch (error) {
  //     console.error('Error exporting playlist: ', error);
  //   }
  // };