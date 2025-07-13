// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Search, Linkedin, Instagram, X, LogIn, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'solid' : 'transparent'}`}>
      <Link to="/" className="logo">
        <img src={logo} alt="EchoHealth Logo" />
      </Link>
      <div className="icons">
        {[Search, Linkedin, Instagram, X].map((Icon, i) => (
          <button key={i} type="button"><Icon size={20} /></button>
        ))}
        {isAuthenticated ? (
          <button
            className="auth-button logout"
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            <LogOut size={16}/> Logout
          </button>
        ) : (
          <button
            className="auth-button login"
            onClick={() => loginWithRedirect()}
          >
            <LogIn size={16}/> Login
          </button>
        )}
      </div>
    </nav>
  );
}
