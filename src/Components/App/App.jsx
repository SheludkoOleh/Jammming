import React, { useState, useEffect } from 'react'
import './app.css'

import SearchResult from '../SearchResult/SearchResult';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';
import Spotify from '../../util/Spotify';

const tracks = [
  { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
  { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
  { id: 3, name: 'Track 3', artist: 'Artist 3', album: 'Album 3' }
];

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [playList, setPlayList] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  
  const updatePlaylistName = name => setPlaylistName(name);

  useEffect(() => {
    setSearchResult(tracks);
  }, []);

  const addTrack = track => {
    setPlayList(prev => { 
      if (prev.find(savedTrack => savedTrack.id === track.id)) {
        return prev.filter(t => t !== track.id);
      }
      return [track, ...prev];
    })
  };

  const removeTrack = track => {
    const trackIndex = playList.findIndex(savedTrack => savedTrack.id === track.id);
    if (trackIndex !== -1) {
      setPlayList(prev => prev.filter((_, i) => i !== trackIndex));
    }
  };

  const savePlaylist = () => {
    const trackUris = playList.map(track => track.uri)

    Spotify.savePlaylist(playlistName, trackUris).then(() =>{
      setPlayList("New Playlist");
      setPlayList([])

    })
    
  }

  const search = term => {
    Spotify.search(term).then(searchResult => setSearchResult(searchResult))
    
  }

  return (
    <div>
      <h1>
        Ja<span className="highLight">mmm</span>ing
      </h1>
      <div className="app">
        <SearchBar onSearch={search}/>
        <div className="appPlayList">
          <SearchResult 
              searchResults={searchResult} 
              onAdd={addTrack}
               />
          <PlayList 
              playList={playList}
              playlistName={playlistName}
              onRemove={removeTrack}
              onNameChange={updatePlaylistName}
              onSave={savePlaylist} />
              
        </div>
      </div>
    </div>
  );
}


export default App;
