import React, { useState } from 'react'
import './searchbar.css'

function SearchBar( {onSearch} ) {
  const [term, setTerm] = useState('');

  const handleTermChange = ({ target }) => setTerm(target.value)

  const search = () => onSearch(term)

  return (
    <div className="searchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
        <button className="searchButton" onClick={search}>SEARCH</button>
    </div>
  )
}

export default SearchBar