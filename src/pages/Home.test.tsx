import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';

describe('Home Component', () => {
  const mockOnLogout = jest.fn();

  test('renders welcome message without user', () => {
    render(<Home onLogout={mockOnLogout} />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  test('renders welcome message with user', () => {
    render(<Home user="John" onLogout={mockOnLogout} />);
    expect(screen.getByText('Welcome, John!')).toBeInTheDocument();
  });

  test('renders sign out button', () => {
    render(<Home onLogout={mockOnLogout} />);
    expect(screen.getByRole('button', { name: 'Sign out' })).toBeInTheDocument();
  });

  test('calls onLogout when sign out button is clicked', () => {
    render(<Home onLogout={mockOnLogout} />);
    fireEvent.click(screen.getByRole('button', { name: 'Sign out' }));
    expect(mockOnLogout).toHaveBeenCalled();
  });
});