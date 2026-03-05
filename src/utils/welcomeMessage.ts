export const getWelcomeMessage = (user?: string): string => {
  return `Welcome${user ? `, ${user}` : ''}!`;
};