import React from 'react';
import Track from '../Track/Track';
import './tracklist.css';

function TrackList({tracks, onAdd, onRemove, }) {
 
  return (
    <div className="TrackList">
      {tracks.map(track => <Track key={track.id} track={track} isRemoval={onRemove !== undefined} onAdd={onAdd} onRemove={onRemove}/>)}
    </div>
  );
}
export default TrackList;
