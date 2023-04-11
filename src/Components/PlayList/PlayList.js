import React from 'react'
import './playlist.css'
import TrackList from '../TrackList/TrackList'

function PlayList({playList, onRemove, onNameChange, playlistName}) {

  const handleNameChange = ({ target }) => onNameChange(target.value);
  return (
    <div className='playList'>
      <input value={playlistName}
              placeholder='Enter Playlist Name'
              onChange={handleNameChange} />
      <TrackList 
        tracks={playList}
        onRemove={onRemove}
        />
      <button className="playList_save">SAVE TO SPOTIFY</button>
    </div>
  )
}


export default PlayList