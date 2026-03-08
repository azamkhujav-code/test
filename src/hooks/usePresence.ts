import { useState, useEffect, useCallback } from 'react';
import * as Ably from 'ably';
import { UserPresence, PresenceData, CursorPosition } from '../types/presence';

const usePresence = (channelName: string, user: UserPresence) => {
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [ably, setAbly] = useState<Ably.Realtime | null>(null);
  const [channel, setChannel] = useState<Ably.Types.RealtimeChannelPromise | null>(null);

  const handlePresenceMessage = useCallback((message: Ably.Types.PresenceMessage) => {
    const presenceUser = message.data as UserPresence;
    switch (message.action) {
      case 'enter':
        setActiveUsers((prev) => [...prev, presenceUser]);
        break;
      case 'leave':
        setActiveUsers((prev) => prev.filter((u) => u.clientId !== message.clientId));
        break;
      case 'update':
        setActiveUsers((prev) =>
          prev.map((u) => (u.clientId === message.clientId ? { ...u, ...presenceUser } : u))
        );
        break;
    }
  }, []);

  useEffect(() => {
    const ablyInstance = new Ably.Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });
    setAbly(ablyInstance);

    const presenceChannel = ablyInstance.channels.get(channelName);
    setChannel(presenceChannel);

    presenceChannel.presence.subscribe(handlePresenceMessage);

    presenceChannel.presence.get((err, members) => {
      if (!err) {
        setActiveUsers(members.map((member) => member.data as UserPresence));
      }
    });

    presenceChannel.presence.enter(user);

    return () => {
      presenceChannel.presence.unsubscribe();
      presenceChannel.presence.leave();
      ablyInstance.close();
    };
  }, [channelName, user, handlePresenceMessage]);

  const updateCursorPosition = useCallback((position: CursorPosition) => {
    if (channel) {
      channel.presence.update({ ...user, cursorPosition: position });
    }
  }, [channel, user]);

  const broadcastPresenceData = useCallback((data: PresenceData) => {
    if (channel) {
      channel.publish('presence', data);
    }
  }, [channel]);

  return { activeUsers, updateCursorPosition, broadcastPresenceData };
};

export default usePresence;