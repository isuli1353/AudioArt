import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span>&copy; 2024 AudioArt. All rights reserved.</span>
      </div>
      <div className="footer-right">
        <Link to="/contact" className="footer-link">Contact</Link>
      </div>
    </footer>
  );
}

export default Footer;
