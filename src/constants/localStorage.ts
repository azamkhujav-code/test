export const LOCAL_STORAGE_KEYS = {
  USER_EMAIL: 'userEmail',
  LOGGED_IN: 'loggedIn',
} as const;

export type LocalStorageKeys = typeof LOCAL_STORAGE_KEYS[keyof typeof LOCAL_STORAGE_KEYS];