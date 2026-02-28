import { useState } from 'react';

/**
 * Test component to verify Error Boundary functionality
 * This component can throw an error on demand to test error boundary behavior
 */
const ErrorBoundaryTest = () => {
  const [shouldThrowError, setShouldThrowError] = useState(false);

  if (shouldThrowError) {
    throw new Error('Test error thrown by ErrorBoundaryTest component');
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Error Boundary Test Component</h3>
      <p>This component can be used to test error boundary functionality.</p>
      <button 
        onClick={() => setShouldThrowError(true)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#d32f2f',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Throw Test Error
      </button>
    </div>
  );
};

export default ErrorBoundaryTest;
