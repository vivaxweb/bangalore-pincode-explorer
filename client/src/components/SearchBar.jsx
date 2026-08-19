import React from 'react';

const SearchBar = ({ query, setQuery }) => {
  return (
    <div className="search-container" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <svg className="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        className="search-input"
        placeholder="Search by pincode or area name..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
