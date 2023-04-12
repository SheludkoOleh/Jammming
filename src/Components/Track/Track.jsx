import React, { useMemo } from "react";
import './track.css';

function Track({ track, isRemoval, onAdd, onRemove }) {
  const renderAction = useMemo(() => {
    const addTrack = () => onAdd(track);
    const removeTrack = () => onRemove(track);

    if (isRemoval) {
      return <button className="trackAction" onClick={removeTrack}>-</button>;
    }
    return <button className="trackAction" onClick={addTrack}>+</button>;
  }, [isRemoval, onAdd, onRemove, track]);


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
