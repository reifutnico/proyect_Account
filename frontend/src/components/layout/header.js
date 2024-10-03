import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './modal';
import HamburgerMenu from './HamburgerMenu'; // Importar el nuevo componente
import '../../styles/header.css';
import Login from '../pages/login';
import iconPerfil from '../../img/iconPerfil.png';

const Header = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userDataFromStorage = JSON.parse(localStorage.getItem('userData'));

        if (userDataFromStorage) {
            setIsAuthenticated(true);
            setUserData(userDataFromStorage);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        setIsAuthenticated(false);
        setUserData(null);
        navigate('/');
    };

    const handleLoginSuccess = (userData) => {
        setIsAuthenticated(true);
        setUserData(userData);
        setLoginOpen(false);  
    };

    return (
        <header className="header">
            <nav className="nav">
            {isAuthenticated ? (
                <div className="logo-container">
                    <Link to="/">
                        <img src="ruta-al-logo.png" alt="Logo" className="logo" />
                    </Link>
                </div>
            ) : null}
    
                <div className="nav-links">
                    {!isAuthenticated ? (
                        <>
                            <ScrollLink to="home" smooth={true} duration={500}>
                                <button className="nav-button">Home</button>
                            </ScrollLink>
                            <ScrollLink to="about" smooth={true} duration={500}>
                                <button className="nav-button">About</button>
                            </ScrollLink>
                            <ScrollLink to="services" smooth={true} duration={500}>
                                <button className="nav-button">Services</button>
                            </ScrollLink>
                            <ScrollLink to="contact" smooth={true} duration={500}>
                                <button className="nav-button">Contact</button>
                            </ScrollLink>
                        </>
                    ) : null}
                </div>
    
                <div className="auth-buttons">
                    {!isAuthenticated ? (
                        <>
                            <button className="auth-button" onClick={() => setLoginOpen(true)}>
                                Login
                            </button>
                            <Link to="/register">
                                <button className="auth-button">Register</button>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/profile">
                                <img
                                    src={userData?.image || iconPerfil}
                                    alt="Profile"
                                    className="profile-image"
                                    onError={(e) => {
                                        e.target.src = iconPerfil;
                                    }}
                                />
                            </Link>
                            <HamburgerMenu
                                role={userData?.role_id}
                                isAuthenticated={isAuthenticated}
                                handleLogout={handleLogout}
                            />
                        </>
                    )}
                </div>
            </nav>
    
            <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} title="Log In">
                <Login onLoginSuccess={handleLoginSuccess} />
            </Modal>
        </header>
    );
}
export default Header;
