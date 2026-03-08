import { useState, useEffect } from 'react';
import * as Ably from 'ably';
import { UserPresence, PresenceData, CursorPosition } from '../types/presence';

const usePresence = (channelName: string, user: UserPresence) => {
  const [activeUsers, setActiveUsers] = useState<UserPresence[]>([]);
  const [ably, setAbly] = useState<Ably.Realtime | null>(null);
  const [channel, setChannel] = useState<Ably.Types.RealtimeChannelPromise | null>(null);

  useEffect(() => {
    const ablyInstance = new Ably.Realtime({ key: process.env.REACT_APP_ABLY_API_KEY });
    setAbly(ablyInstance);

    const presenceChannel = ablyInstance.channels.get(channelName);
    setChannel(presenceChannel);

    presenceChannel.presence.subscribe('enter', (member: Ably.Types.PresenceMessage) => {
      setActiveUsers((prev) => [...prev, member.data as UserPresence]);
    });

    presenceChannel.presence.subscribe('leave', (member: Ably.Types.PresenceMessage) => {
      setActiveUsers((prev) => prev.filter((u) => u.clientId !== member.clientId));
    });

    presenceChannel.presence.enter(user);

    return () => {
      presenceChannel.presence.leave();
      ablyInstance.close();
    };
  }, [channelName, user]);

  const updateCursorPosition = (position: CursorPosition) => {
    if (channel) {
      channel.presence.update({ ...user, cursorPosition: position });
    }
  };

  const broadcastPresenceData = (data: PresenceData) => {
    if (channel) {
      channel.publish('presence', data);
    }
  };

  return { activeUsers, updateCursorPosition, broadcastPresenceData };
};

export default usePresence;