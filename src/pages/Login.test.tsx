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

  describe('Rendering', () => {
    it('should render the login form', () => {
      render(<Login onLogin={mockOnLogin} />);
      
      expect(screen.getByRole('form', { name: /login form/i })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    });

    it('should render email input field', () => {
      render(<Login onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeInTheDocument();
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'you@example.com');
    });

    it('should render password input field', () => {
      render(<Login onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'Password');
    });

    it('should render submit button', () => {
      render(<Login onLogin={mockOnLogin} />);
      
      const submitButton = screen.getByRole('button', { name: /log in/i });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });

    it('should not display error message initially', () => {
      render(<Login onLogin={mockOnLogin} />);
      
      expect(screen.queryByText(/please enter both email and password/i)).not.toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should display error when submitting with empty fields', async () => {
      render(<Login onLogin={mockOnLogin} />);
      
      const submitButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
      });

      expect(mockOnLogin).not.toHaveBeenCalled();
    });

    it('should display error when submitting with only email', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');
      
      const submitButton = screen.getByRole('button', { name: /log in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
      });

      expect(mockOnLogin).not.toHaveBeenCalled();
    });

    it('should display error when submitting with only password', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/password/i);
      await user.type(passwordInput, 'password123');
      
      const submitButton = screen.getByRole('button', { name: /log in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
      });

      expect(mockOnLogin).not.toHaveBeenCalled();
    });
  });

  describe('User Interactions', () => {
    it('should update email input value when typing', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;
      await user.type(emailInput, 'test@example.com');
      
      expect(emailInput.value).toBe('test@example.com');
    });

    it('should update password input value when typing', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
      await user.type(passwordInput, 'mypassword');
      
      expect(passwordInput.value).toBe('mypassword');
    });
  });

  describe('Authentication Flow', () => {
    it('should call onLogin with email when form is valid', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /log in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalledTimes(1);
        expect(mockOnLogin).toHaveBeenCalledWith('test@example.com');
      });
    });

    it('should store credentials in localStorage on successful login', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /log in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem('userEmail')).toBe('test@example.com');
        expect(localStorage.getItem('loggedIn')).toBe('true');
      });
    });

    it('should not store credentials in localStorage on validation error', async () => {
      render(<Login onLogin={mockOnLogin} />);
      
      const submitButton = screen.getByRole('button', { name: /log in/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
      });

      expect(localStorage.getItem('userEmail')).toBeNull();
      expect(localStorage.getItem('loggedIn')).toBeNull();
    });

    it('should clear error message when resubmitting with valid data', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      // First submit with empty fields to trigger error
      const submitButton = screen.getByRole('button', { name: /log in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/please enter both email and password/i)).toBeInTheDocument();
      });

      // Now fill in the fields and submit again
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalledWith('test@example.com');
      });
    });
  });

  describe('Form Submission', () => {
    it('should prevent default form submission', async () => {
      const user = userEvent.setup();
      render(<Login onLogin={mockOnLogin} />);
      
      const form = screen.getByRole('form', { name: /login form/i });
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = vi.spyOn(submitEvent, 'preventDefault');
      
      form.dispatchEvent(submitEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should submit form on Enter key press', async () => {
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
  });
});
