import React, { useState } from 'react';

/**
 * ErrorTest component for testing error boundaries
 * This component provides buttons to trigger different types of errors
 * Useful for development and testing error boundary functionality
 */

const ErrorTest: React.FC = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error thrown intentionally from ErrorTest component');
  }

  const throwRenderError = () => {
    setShouldThrow(true);
  };

  const throwSyncError = () => {
    throw new Error('Synchronous error thrown from button click');
  };

  const throwAsyncError = () => {
    setTimeout(() => {
      throw new Error('Async error - This will NOT be caught by error boundary');
    }, 100);
  };

  const throwPromiseError = () => {
    Promise.reject(new Error('Promise rejection - This will NOT be caught by error boundary'));
  };

  return (
    <div
      style={{
        padding: '1rem',
        margin: '1rem',
        border: '2px dashed #cbd5e0',
        borderRadius: '8px',
        backgroundColor: '#f7fafc',
      }}
    >
      <h3 style={{ marginTop: 0, color: '#2d3748' }}>Error Boundary Test Controls</h3>
      <p style={{ color: '#4a5568', fontSize: '0.875rem' }}>
        Use these buttons to test error boundary functionality. Only the first two will be caught by error boundaries.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={throwRenderError}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#e53e3e',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Throw Render Error
        </button>
        <button
          onClick={throwSyncError}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dd6b20',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Throw Sync Error
        </button>
        <button
          onClick={throwAsyncError}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#d69e2e',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Throw Async Error (Not Caught)
        </button>
        <button
          onClick={throwPromiseError}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#975a16',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem',
          }}
        >
          Throw Promise Error (Not Caught)
        </button>
      </div>
      <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#718096' }}>
        Note: Error boundaries catch errors during rendering, in lifecycle methods, and in constructors.
        They do NOT catch errors in event handlers, async code, or server-side rendering.
      </p>
    </div>
  );
};

export default ErrorTest;
