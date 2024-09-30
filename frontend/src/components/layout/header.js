import React, { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll'; // Renombrar el Link de react-scroll para evitar confusiones
import { Link } from 'react-router-dom'; // Asegúrate de importar Link de react-router-dom
import Modal from './modal'; // Componente Modal para Login
import '../../styles/header.css';  // Ajusta la ruta
import Login from '../pages/login'; // Importa el componente Login

const Header = () => {
    const [isLoginOpen, setLoginOpen] = useState(false);

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
                    {/* Botón de Login abre el modal */}
                    <button className="auth-button" onClick={() => setLoginOpen(true)}>Login</button>
                    
                    {/* Botón de Register redirige a la página de registro */}
                    <Link to="/register">
                        <button className="auth-button">Register</button>
                    </Link>
                </div>
            </nav>

            {/* Modal de Login */}
            <Modal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} title="Log In">
                <Login />
            </Modal>
        </header>
    );
};

export default Header;
