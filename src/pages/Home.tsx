import React, { useState, useEffect, useRef } from 'react';
import * as Ably from 'ably';
import usePresence from '../hooks/usePresence';
import { UserPresence, CursorPosition } from '../types/presence';

type Props = {
  user: UserPresence;
  ably: Ably.Realtime | null;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, ably, onLogout }) => {
  const [content, setContent] = useState<string>('');
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const { activeUsers, updateCursorPosition, broadcastPresenceData } = usePresence('document-1', user);

  useEffect(() => {
    if (ably) {
      const channel = ably.channels.get('document-1');
      channel.subscribe('content', (message) => {
        setContent(message.data);
      });

      return () => {
        channel.unsubscribe();
      };
    }
  }, [ably]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (ably) {
      const channel = ably.channels.get('document-1');
      channel.publish('content', newContent);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLTextAreaElement>) => {
    if (editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect();
      const position: CursorPosition = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
      updateCursorPosition(position);
    }
  };

  return (
    <div className="home">
      <h1>Welcome, {user.email}!</h1>
      <div className="active-users">
        <h3>Active Users:</h3>
        <ul>
          {activeUsers.map((activeUser) => (
            <li key={activeUser.clientId}>{activeUser.email}</li>
          ))}
        </ul>
      </div>
      <textarea
        ref={editorRef}
        value={content}
        onChange={handleContentChange}
        onMouseMove={handleMouseMove}
        placeholder="Start typing here..."
        rows={10}
        cols={50}
      />
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
