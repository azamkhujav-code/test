import React from 'react';

// Simple top navigation header component
const Header: React.FC = () => {
  return (
    <header className="app-header" aria-label="Main site header">
      <div className="app-header-inner">
        <div className="logo" aria-label="Site logo">
          <span role="img" aria-label="spark">⚡</span>
          <span style={{ marginLeft: 8, fontWeight: 700 }}>MyApp</span>
        </div>
        <nav className="nav" aria-label="Main navigation">
          <a href="#" onClick={(e) => e.preventDefault()} style={{ marginRight: 16 }}>Home</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Login</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
