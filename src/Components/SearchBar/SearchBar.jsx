import React from 'react'
import './searchbar.css'

function SearchBar() {
  return (
    <div className="searchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className="searchButton">SEARCH</button>
    </div>
  )
}

export default SearchBar