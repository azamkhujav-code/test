/**
 * Props for the Login component.
 */
export interface LoginProps {
  /**
   * Callback function to be called when the user successfully logs in.
   * @param email The email of the logged-in user.
   */
  onLogin: (email: string) => void;
}

/**
 * Props for the Home component.
 */
export interface HomeProps {
  /**
   * The email of the logged-in user.
   */
  user?: string;

  /**
   * Callback function to be called when the user logs out.
   */
  onLogout: () => void;
}