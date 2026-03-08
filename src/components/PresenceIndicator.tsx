import React from 'react';
import { UserPresence } from '../types/presence';

interface PresenceIndicatorProps {
  activeUsers: UserPresence[];
}

const PresenceIndicator: React.FC<PresenceIndicatorProps> = ({ activeUsers }) => {
  return (
    <div className="presence-indicator">
      <h3>Active Users:</h3>
      <ul>
        {activeUsers.map((user) => (
          <li key={user.clientId} className="user-indicator">
            <span className="user-avatar">{user.email[0].toUpperCase()}</span>
            <span className="user-email">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PresenceIndicator;