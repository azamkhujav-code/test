import React from 'react';

type Props = {
  user?: string | null;
  onLogout?: () => void;
};

const Header: React.FC<Props> = ({ user, onLogout }) => {
  return (
    <header className="app-header" style={headerStyle}>
      <div className="logo-text" style={{ fontWeight: 700 }}>DemoApp</div>
      <div className="user-area" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user && <span>Logged in as {user}</span>}
        {onLogout && (
          <button onClick={onLogout} style={buttonStyle}>Sign out</button>
        )}
      </div>
    </header>
  );
};

const headerStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  background: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 10
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 12px',
  borderRadius: 6,
  border: '1px solid #ccc',
  background: '#f8f8f8',
  cursor: 'pointer'
};

export default Header;
