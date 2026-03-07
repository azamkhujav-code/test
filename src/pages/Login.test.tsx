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
});