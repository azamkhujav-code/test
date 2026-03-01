import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home Component', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  describe('Rendering', () => {
    it('should render the home component', () => {
      render(<Home onLogout={mockOnLogout} />);
      
      expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    });

    it('should render welcome message without user email when user prop is not provided', () => {
      render(<Home onLogout={mockOnLogout} />);
      
      const heading = screen.getByRole('heading', { name: /welcome/i });
      expect(heading).toHaveTextContent('Welcome!');
      expect(heading).not.toHaveTextContent(',');
    });

    it('should render welcome message with user email when user prop is provided', () => {
      render(<Home user="test@example.com" onLogout={mockOnLogout} />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Welcome, test@example.com!');
    });

    it('should render sign out button', () => {
      render(<Home onLogout={mockOnLogout} />);
      
      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      expect(signOutButton).toBeInTheDocument();
    });
  });

  describe('User Prop Handling', () => {
    it('should handle empty string user prop', () => {
      render(<Home user="" onLogout={mockOnLogout} />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Welcome!');
    });

    it('should handle undefined user prop', () => {
      render(<Home user={undefined} onLogout={mockOnLogout} />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Welcome!');
    });

    it('should display different user emails correctly', () => {
      const { rerender } = render(<Home user="user1@example.com" onLogout={mockOnLogout} />);
      
      let heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Welcome, user1@example.com!');

      rerender(<Home user="user2@example.com" onLogout={mockOnLogout} />);
      
      heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Welcome, user2@example.com!');
    });

    it('should handle user prop with special characters', () => {
      render(<Home user="user+tag@example.com" onLogout={mockOnLogout} />);
      
      const heading = screen.getByRole('heading');
      expect(heading).toHaveTextContent('Welcome, user+tag@example.com!');
    });
  });

  describe('Logout Functionality', () => {
    it('should call onLogout when sign out button is clicked', async () => {
      const user = userEvent.setup();
      render(<Home onLogout={mockOnLogout} />);
      
      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      await user.click(signOutButton);

      expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });

    it('should call onLogout when sign out button is clicked multiple times', async () => {
      const user = userEvent.setup();
      render(<Home onLogout={mockOnLogout} />);
      
      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      await user.click(signOutButton);
      await user.click(signOutButton);
      await user.click(signOutButton);

      expect(mockOnLogout).toHaveBeenCalledTimes(3);
    });

    it('should call onLogout callback function', async () => {
      const user = userEvent.setup();
      render(<Home onLogout={mockOnLogout} />);
      
      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      await user.click(signOutButton);

      expect(mockOnLogout).toHaveBeenCalled();
    });

    it('should maintain logout functionality regardless of user prop', async () => {
      const user = userEvent.setup();
      const { rerender } = render(<Home user="test@example.com" onLogout={mockOnLogout} />);
      
      const signOutButton = screen.getByRole('button', { name: /sign out/i });
      await user.click(signOutButton);

      expect(mockOnLogout).toHaveBeenCalledTimes(1);

      mockOnLogout.mockClear();

      rerender(<Home onLogout={mockOnLogout} />);
      await user.click(signOutButton);

      expect(mockOnLogout).toHaveBeenCalledTimes(1);
    });
  });

  describe('Component Structure', () => {
    it('should have proper CSS class on container', () => {
      const { container } = render(<Home onLogout={mockOnLogout} />);
      
      const homeDiv = container.querySelector('.home');
      expect(homeDiv).toBeInTheDocument();
    });

    it('should contain heading and button as children', () => {
      const { container } = render(<Home onLogout={mockOnLogout} />);
      
      const homeDiv = container.querySelector('.home');
      const heading = homeDiv?.querySelector('h1');
      const button = homeDiv?.querySelector('button');

      expect(heading).toBeInTheDocument();
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have accessible heading', () => {
      render(<Home user="test@example.com" onLogout={mockOnLogout} />);
      
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('should have accessible button', () => {
      render(<Home onLogout={mockOnLogout} />);
      
      const button = screen.getByRole('button', { name: /sign out/i });
      expect(button).toBeInTheDocument();
    });
  });
});
