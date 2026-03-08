import React from 'react';
import { CursorPosition, UserPresence } from '../types/presence';

interface CursorProps {
  user: UserPresence;
  position: CursorPosition;
}

const Cursor: React.FC<CursorProps> = ({ user, position }) => {
  return (
    <div
      className="cursor"
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        pointerEvents: 'none',
      }}
    >
      <div
        className="cursor-pointer"
        style={{
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '10px solid #000',
          transform: 'rotate(-45deg)',
        }}
      />
      <div
        className="cursor-label"
        style={{
          background: '#000',
          color: '#fff',
          padding: '2px 4px',
          borderRadius: '2px',
          fontSize: '12px',
          marginTop: '2px',
        }}
      >
        {user.email}
      </div>
    </div>
  );
};

export default Cursor;