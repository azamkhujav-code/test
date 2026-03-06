export interface User {
  email: string;
  loggedIn: boolean;
}

export interface AppState {
  user: User;
  showProfile: boolean;
}

export interface ProfileProps {
  user: User;
  onBack: () => void;
}