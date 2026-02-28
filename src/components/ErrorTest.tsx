import { useState } from 'react';
import type { FC } from 'react';

/**
 * Test component for demonstrating error boundary functionality
 * This component can be added to any page to test error boundaries
 */

interface ErrorTestProps {
  shouldThrow?: boolean;
}

const ErrorTest: FC<ErrorTestProps> = ({ shouldThrow = false }) => {
  const [throwError, setThrowError] = useState(shouldThrow);

  if (throwError) {
    // This will be caught by the nearest error boundary
    throw new Error('Test error thrown by ErrorTest component');
  }

  return (
    <div style={{
      padding: '1rem',
      margin: '1rem 0',
      border: '2px dashed #646cff',
      borderRadius: '8px',
      backgroundColor: '#f0f0ff',
    }}>
      <h3>Error Boundary Test</h3>
      <p>Click the button below to trigger an error and test the error boundary:</p>
      <button
        onClick={() => setThrowError(true)}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#ff6b6b',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Trigger Test Error
      </button>
    </div>
  );
};

export default ErrorTest;
