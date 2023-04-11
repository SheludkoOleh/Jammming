import React from 'react'
import TrackList from '../TrackList/TrackList'
import './searchresult.css'

function SearchResult({searchResults, onAdd}) {

  return (
    <div className="SearchResults">
      <h2>Results</h2>
        <TrackList 
          tracks={searchResults}
          onAdd={onAdd} />
    </div>
  )
}


export default SearchResult