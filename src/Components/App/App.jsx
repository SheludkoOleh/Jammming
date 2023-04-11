import React, { useState, useEffect } from 'react'
import './app.css'

import SearchResult from '../SearchResult/SearchResult';
import SearchBar from '../SearchBar/SearchBar';
import PlayList from '../PlayList/PlayList';

const tracks = [
  { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
  { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
  { id: 3, name: 'Track 3', artist: 'Artist 3', album: 'Album 3' }
];

function App() {
  const [searchResult, setSearchResult] = useState([]);
  const [playList, setPlayList] = useState([]);

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

  return (
    <div>
      <h1>
        Ja<span className="highLight">mmm</span>ing
      </h1>
      <div className="app">
        <SearchBar />
        <div className="appPlayList">
          <SearchResult 
              searchResults={searchResult} 
              onAdd={addTrack}
               />
          <PlayList playList={playList}
              onRemove={removeTrack} />
        </div>
      </div>
    </div>
  );
}


export default App;
