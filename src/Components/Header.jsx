import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

function Header({ isLogin }) {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/" className="nav-link">AudioArt</Link>
      </div>
      <nav className="nav">
        {!isLogin ? (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign Up</Link>
          </>
        ) : (
          <span className="nav-link">Welcome</span>
        )}
      </nav>
    </header>
  );
}

export default Header;
