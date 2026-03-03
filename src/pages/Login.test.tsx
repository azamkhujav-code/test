import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    render(<Login onLogin={mockOnLogin} />);
  });

  test('renders login form', () => {
    expect(screen.getByLabelText('Login form')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  test('displays error message when form is submitted with empty fields', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));
    expect(screen.getByText('Please enter both email and password.')).toBeInTheDocument();
  });

  test('calls onLogin prop when form is submitted with valid inputs', () => {
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(mockOnLogin).toHaveBeenCalledWith('test@example.com');
  });

  test('updates email and password state on input change', () => {
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });
});