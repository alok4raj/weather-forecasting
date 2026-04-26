import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Header({ searchQuery, onSearchChange }) {
  const { dark, toggleTheme } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-mandala">✿</span>
          <div>
            <h1 className="header-title">The Modi Family</h1>
            <p className="header-subtitle">United across generations, bound by love</p>
          </div>
        </div>

        <div className="header-actions">
          <div className={`search-box ${focused ? "focused" : ""}`}>
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search name, city, relation..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              className="search-input"
              id="global-search"
            />
            {searchQuery && (
              <button
                className="search-clear"
                onClick={() => onSearchChange("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            <span className="theme-icon">{dark ? "☀️" : "🌙"}</span>
          </button>
        </div>
      </div>

      <div className="header-quote">
        <blockquote>
          "परिवार वो जड़ें हैं जो हमें ज़मीन से जोड़ती हैं, और वो पंख जो हमें उड़ना सिखाती हैं।"
        </blockquote>
      </div>

      <div className="header-diya">✦ ✦ ✦ ✦ ✦</div>
    </header>
  );
}
