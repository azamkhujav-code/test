import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login Component', () => {
  const mockOnLogin = vi.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
    localStorage.clear();
  });

  it('renders the login form correctly', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('displays placeholder text in input fields', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByPlaceholderText(/you@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('updates email input when user types', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
    await user.type(emailInput, 'test@example.com');
    
    expect(emailInput.value).toBe('test@example.com');
  });

  it('updates password input when user types', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    await user.type(passwordInput, 'password123');
    
    expect(passwordInput.value).toBe('password123');
  });

  it('shows error message when form is submitted with empty email', async () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
    });
    
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('shows error message when form is submitted with empty password', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, 'test@example.com');
    
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
    });
    
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('shows error message when form is submitted with both fields empty', async () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
    });
    
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it('calls onLogin callback with email when form is submitted successfully', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('test@example.com');
      expect(mockOnLogin).toHaveBeenCalledTimes(1);
    });
  });

  it('saves user email to localStorage on successful login', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(localStorage.getItem('userEmail')).toBe('test@example.com');
      expect(localStorage.getItem('loggedIn')).toBe('true');
    });
  });

  it('does not show error message initially', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const errorMessage = screen.queryByText(/please enter both email and password/i);
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('clears error message when user corrects input and submits', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    // First submission with empty fields
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
    });
    
    // Fill in the fields and submit again
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('handles form submission via Enter key', async () => {
    const user = userEvent.setup();
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.keyboard('{Enter}');
    
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('has correct input types for email and password fields', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('has correct id attributes for accessibility', () => {
    render(<Login onLogin={mockOnLogin} />);
    
    expect(screen.getByLabelText(/email/i)).toHaveAttribute('id', 'login-email');
    expect(screen.getByLabelText(/password/i)).toHaveAttribute('id', 'login-password');
  });
});
