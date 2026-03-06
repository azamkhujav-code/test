export interface User {
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginProps {
  onLogin: (email: string) => void;
}

export interface HomeProps {
  user: User;
  onLogout: () => void;
}