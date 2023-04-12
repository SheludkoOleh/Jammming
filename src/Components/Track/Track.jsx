import React from "react";
import './track.css';

function Track({ track, isRemoval, onAdd, onRemove }) {
  const addTrack = () => onAdd(track);
  const removeTrack = () => onRemove(track);

  function renderAction() {
    if (isRemoval) {
      return <button className="trackAction" onClick={removeTrack}>-</button>;
    }
    return (
      <button className="trackAction" onClick={addTrack}>+</button>
    );
  }

  return (
    <div className="track">
      <div className="trackInformation">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction}
    </div>
  );
}

export default Track;
