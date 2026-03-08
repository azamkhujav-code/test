export const LOCAL_STORAGE_KEYS = {
  USER_EMAIL: 'userEmail',
  LOGGED_IN: 'loggedIn',
} as const;

export type LocalStorageKey = keyof typeof LOCAL_STORAGE_KEYS;