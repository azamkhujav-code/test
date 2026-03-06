import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock localStorage
const localStorageMock = (function() {
  let store: { [key: string]: string } = {};
  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem: function(key: string) {
      delete store[key];
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('App', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders login form when not authenticated', () => {
    render(<App />);
    expect(screen.getByLabelText('Login form')).toBeInTheDocument();
  });

  test('logs in successfully and shows home page', async () => {
    render(<App />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(screen.getByText('Welcome, test@example.com!')).toBeInTheDocument();
    });
  });

  test('shows error message for invalid login', async () => {
    render(<App />);
    
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText('Log in'));

    await waitFor(() => {
      expect(screen.getByText('An error occurred during login. Please try again.')).toBeInTheDocument();
    });
  });

  test('logs out successfully', async () => {
    localStorage.setItem('userEmail', 'test@example.com');
    localStorage.setItem('loggedIn', 'true');

    render(<App />);

    expect(screen.getByText('Welcome, test@example.com!')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Sign out'));
    
    await waitFor(() => {
      expect(screen.getByText('Confirm Logout')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Yes, log out'));

    await waitFor(() => {
      expect(screen.getByLabelText('Login form')).toBeInTheDocument();
    });
  });
});