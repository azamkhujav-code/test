import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    render(<Login onLogin={mockOnLogin} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Tests will be added here

  test('email input onChange updates state', () => {
    const emailInput = screen.getByLabelText('Email');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('password input onChange updates state', () => {
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('form submission with empty fields prevents onLogin call', () => {
    const submitButton = screen.getByRole('button', { name: /log in/i });
    fireEvent.click(submitButton);
    expect(mockOnLogin).not.toHaveBeenCalled();
  });
});