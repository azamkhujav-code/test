import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from './Home';

describe('Home Component', () => {
  const mockOnLogout = vi.fn();

  beforeEach(() => {
    mockOnLogout.mockClear();
  });

  it('renders the home component correctly', () => {
    render(<Home onLogout={mockOnLogout} />);
    
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('displays welcome message without user name when user prop is not provided', () => {
    render(<Home onLogout={mockOnLogout} />);
    
    const heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome!');
    expect(heading).not.toHaveTextContent(',');
  });

  it('displays welcome message with user name when user prop is provided', () => {
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome, test@example.com!');
  });

  it('displays welcome message with different user names correctly', () => {
    const { rerender } = render(<Home user="john@example.com" onLogout={mockOnLogout} />);
    
    let heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome, john@example.com!');
    
    rerender(<Home user="jane@example.com" onLogout={mockOnLogout} />);
    
    heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome, jane@example.com!');
  });

  it('calls onLogout callback when sign out button is clicked', () => {
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(signOutButton);
    
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('calls onLogout callback when sign out button is clicked multiple times', () => {
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    
    fireEvent.click(signOutButton);
    fireEvent.click(signOutButton);
    fireEvent.click(signOutButton);
    
    expect(mockOnLogout).toHaveBeenCalledTimes(3);
  });

  it('calls onLogout when sign out button is clicked via keyboard', async () => {
    const user = userEvent.setup();
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    signOutButton.focus();
    await user.keyboard('{Enter}');
    
    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  it('renders correctly without user prop (undefined)', () => {
    render(<Home user={undefined} onLogout={mockOnLogout} />);
    
    const heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome!');
  });

  it('renders correctly with empty string as user prop', () => {
    render(<Home user="" onLogout={mockOnLogout} />);
    
    const heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome!');
  });

  it('has correct structure with home class', () => {
    const { container } = render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const homeDiv = container.querySelector('.home');
    expect(homeDiv).toBeInTheDocument();
  });

  it('renders sign out button as a button element', () => {
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton.tagName).toBe('BUTTON');
  });

  it('displays exact button text as "Sign out"', () => {
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    expect(signOutButton).toHaveTextContent('Sign out');
  });

  it('maintains component structure after logout callback', () => {
    render(<Home user="test@example.com" onLogout={mockOnLogout} />);
    
    const signOutButton = screen.getByRole('button', { name: /sign out/i });
    fireEvent.click(signOutButton);
    
    // Component should still be rendered after clicking logout
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign out/i })).toBeInTheDocument();
  });

  it('handles special characters in user name', () => {
    render(<Home user="user+test@example.com" onLogout={mockOnLogout} />);
    
    const heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent('Welcome, user+test@example.com!');
  });

  it('handles long user names correctly', () => {
    const longEmail = 'very.long.email.address.with.many.characters@example.com';
    render(<Home user={longEmail} onLogout={mockOnLogout} />);
    
    const heading = screen.getByRole('heading', { name: /welcome/i });
    expect(heading).toHaveTextContent(`Welcome, ${longEmail}!`);
  });
});
