import React from 'react'
import './playlist.css'
import TrackList from '../TrackList/TrackList'

function PlayList({playList, onRemove}) {
  return (
    <div className="playList">
      <input defaultValue={'New Playlist'}/>
      <TrackList 
        tracks={playList}
        onRemove={onRemove}
        />
      <button className="playList_save">SAVE TO SPOTIFY</button>
    </div>
  )
}


export default PlayList