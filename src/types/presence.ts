import { Types } from 'ably';

export interface UserPresence {
  clientId: string;
  email: string;
  cursorPosition: CursorPosition;
}

export interface CursorPosition {
  x: number;
  y: number;
}

export interface PresenceData {
  user: UserPresence;
  action: Types.PresenceAction;
}