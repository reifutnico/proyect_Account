import React from 'react';
import { Link } from 'react-scroll';
import './header.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-links">
                    <Link to="home" smooth={true} duration={500}>
                        <button className="nav-button">Home</button>
                    </Link>
                    <Link to="about" smooth={true} duration={500}>
                        <button className="nav-button">About</button>
                    </Link>
                    <Link to="services" smooth={true} duration={500}>
                        <button className="nav-button">Services</button>
                    </Link>
                    <Link to="contact" smooth={true} duration={500}>
                        <button className="nav-button">Contact</button>
                    </Link>
                </div>
                <div className="logo-container">
                    <img src="ruta-al-logo.png" alt="Logo" className="logo" />
                </div>
                <div className="auth-buttons">
                    <button className="auth-button">Login</button>
                    <button className="auth-button">Register</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
