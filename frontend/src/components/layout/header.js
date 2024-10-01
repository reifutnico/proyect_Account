import React, { useState, useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './modal';
import '../../styles/header.css';
import Login from '../pages/login';

const Header = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        const userDataFromStorage = JSON.parse(localStorage.getItem('userData'));

        if (token && userDataFromStorage) {
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

    // Función para actualizar el estado después del login exitoso
    const handleLoginSuccess = (userData) => {
        setIsAuthenticated(true);
        setUserData(userData);
        setLoginOpen(false);  // Cierra el modal
    };

    return (
        <header className="header">
            <nav className="nav">
                <div className="nav-links">
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
                </div>
                
                <div className="logo-container">
                    <img src="ruta-al-logo.png" alt="Logo" className="logo" />
                </div>
                
                <div className="auth-buttons">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profile">
                                <button className="auth-button">Profile</button>
                            </Link>

                            {/* Mostrar contenido específico según el rol */}
                            {userData?.role_id === 1 ? (
                                <Link to="/admin">
                                    <button className="auth-button">Admin Panel</button>
                                </Link>
                            ) : (
                                <Link to="/shop">
                                    <button className="auth-button">Shop</button>
                                </Link>
                            )}

                            {/* Botón de Logout */}
                            <button className="auth-button" onClick={handleLogout}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <button className="auth-button" onClick={() => setLoginOpen(true)}>Login</button>

                            <Link to="/register">
                                <button className="auth-button">Register</button>
                            </Link>
                        </>
                    )}
                </div>
            </nav>

            <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} title="Log In">
                <Login onLoginSuccess={handleLoginSuccess} />  {/* Pasar la función de éxito */}
            </Modal>
        </header>
    );
};

export default Header;
