import React from 'react';

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
    </div>
  );
}