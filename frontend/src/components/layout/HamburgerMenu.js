import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/HamburgerMenu.css';

const HamburgerMenu = ({ role, isAuthenticated, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Referencia para el menú

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Función que cierra el menú si se hace clic fuera de él
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // useEffect para manejar el evento de clic fuera del menú
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const menuItems = isAuthenticated
    ? role === 1
      ? [
          { name: 'Admin Panel', path: '/admin' },
          { name: 'Settings', path: '/settings' }
        ]
      : [
          { name: 'Shop', path: '/shop' },
          { name: 'Settings', path: '/settings' }
        ]
    : [];

  return (
    <div className={`hamburger-container ${isOpen ? 'open' : ''}`} ref={menuRef}>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`menu ${isOpen ? 'show' : ''}`}>



      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>

      <Link to="/profile">
                    <button className="auth-button">Profile</button>
        </Link>


        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <div className="menu-item">{item.name}</div>
          </Link>
        ))}

        {isAuthenticated && (
          <div className="menu-item" onClick={handleLogout}>
            Log Out
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
