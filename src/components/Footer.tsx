import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="app-footer" aria-label="Site footer">
      <div className="footer-content">
        <span>© {new Date().getFullYear()} MyApp</span>
        <span style={{ marginLeft: 8, opacity: 0.6 }}> | Built with React</span>
      </div>
    </footer>
  );
};

export default Footer;
