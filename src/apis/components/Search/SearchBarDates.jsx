// SearchBar.js
import React from 'react';

function SearchBarDate({ value, onChange, placeholder, label }) {
  return (
    <div>
      {label}:{' '}
      <input
        type="date"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}

export default SearchBarDate;
