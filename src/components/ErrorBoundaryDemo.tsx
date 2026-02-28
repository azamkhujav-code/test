import { useState } from 'react';

/**
 * Demo component to test Error Boundary functionality
 * This component can be used to trigger errors and verify error boundaries work correctly
 */

const BuggyComponent = () => {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('This is a simulated error from BuggyComponent');
  }

  return (
    <div style={{ padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', margin: '1rem 0' }}>
      <h3>Buggy Component</h3>
      <p>This component will throw an error when you click the button.</p>
      <button 
        onClick={() => setShouldThrow(true)}
        style={{
          padding: '0.5rem 1rem',
          background: '#f44',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Trigger Error
      </button>
    </div>
  );
};

export default BuggyComponent;
