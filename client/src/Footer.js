import React from 'react';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#fff700',
    color: '#4343f9',
    padding: '20px 0',
    textAlign: 'center',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1
  };

  const paragraphStyle = {
    margin: 0
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <p style={paragraphStyle}>&copy; Made with love by Dipan. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
