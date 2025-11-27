// src/components/SearchBar.jsx
import React, { useState } from "react";

export default function SearchBar({ onSearch, onUseLocation, loading = false }) {
  const [q, setQ] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    onSearch(q.trim());
  }

  return (
    <form className="search-row inline" onSubmit={submit} aria-label="Search form">
      <input
        className="city-input safe-shrink"
        type="search"
        placeholder="Enter city (e.g., Mumbai, Tokyo)"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Enter city"
        autoComplete="off"
      />

      <button className="btn primary" type="submit" aria-label="Search" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      <button
        type="button"
        className="btn location"
        onClick={onUseLocation}
        aria-label="Use my location"
      >
        📍 Use My Location
      </button>
    </form>
  );
}
