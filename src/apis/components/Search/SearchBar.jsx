// SearchBar.js
import React from 'react';

function SearchBar({ value, onChange, placeholder, label }) {
  return (
    <div className='search'>
      {label}:{' '}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBar;
