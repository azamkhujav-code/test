import React, { useState, useEffect, useRef } from 'react';
import * as Ably from 'ably';
import usePresence from '../hooks/usePresence';
import { UserPresence, CursorPosition } from '../types/presence';
import PresenceIndicator from '../components/PresenceIndicator';
import Cursor from '../components/Cursor';

type Props = {
  user: UserPresence;
  ably: Ably.Realtime | null;
  onLogout: () => void;
};

const Home: React.FC<Props> = ({ user, ably, onLogout }) => {
  const [content, setContent] = useState<string>('');
  const [cursors, setCursors] = useState<{ [clientId: string]: CursorPosition }>({});
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const { activeUsers, updateCursorPosition, broadcastPresenceData } = usePresence('document-1', user);

  useEffect(() => {
    if (ably) {
      const channel = ably.channels.get('document-1');
      channel.subscribe('content', (message) => {
        setContent(message.data);
      });

      channel.subscribe('cursor', (message) => {
        setCursors((prevCursors) => ({
          ...prevCursors,
          [message.clientId]: message.data as CursorPosition,
        }));
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
      if (ably) {
        const channel = ably.channels.get('document-1');
        channel.publish('cursor', position);
      }
    }
  };

  return (
    <div className="home">
      <h1>Welcome, {user.email}!</h1>
      <PresenceIndicator activeUsers={activeUsers} />
      <div style={{ position: 'relative' }}>
        <textarea
          ref={editorRef}
          value={content}
          onChange={handleContentChange}
          onMouseMove={handleMouseMove}
          placeholder="Start typing here..."
          rows={10}
          cols={50}
        />
        {activeUsers.map((activeUser) => {
          if (activeUser.clientId !== user.clientId && cursors[activeUser.clientId]) {
            return (
              <Cursor
                key={activeUser.clientId}
                user={activeUser}
                position={cursors[activeUser.clientId]}
              />
            );
          }
          return null;
        })}
      </div>
      <button onClick={onLogout}>Sign out</button>
    </div>
  );
};

export default Home;
