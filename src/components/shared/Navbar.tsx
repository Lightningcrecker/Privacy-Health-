import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo className="hover:opacity-80 transition-opacity" />
          
          <div className="hidden md:flex items-center space-x-8">
            {!isAuthenticated ? (
              <>
                <NavLink to="/features">Features</NavLink>
                <NavLink to="/pricing">Pricing</NavLink>
                <NavLink to="/about">About</NavLink>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/health">Health</NavLink>
                <NavLink to="/analytics">Analytics</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <button
                  onClick={() => logout()}
                  className="px-4 py-2 rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`text-gray-300 hover:text-white transition-colors ${
        isActive ? 'text-white font-medium' : ''
      }`}
    >
      {children}
    </Link>
  );
};