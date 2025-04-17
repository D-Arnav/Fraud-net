import React from 'react';
import searchIcon from '../assets/search.svg'; // Import the SVG file

export default function Searchbar({ onSearch }) {
  const handleInputChange = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div className="group">
      <input
        placeholder="Filter Merchants"
        type="text"
        name="text"
        className="input"
        onChange={handleInputChange}
      />
      <img
        src={searchIcon}
        alt="Search Icon"
        className="search-icon"
      />
    </div>
  );
}