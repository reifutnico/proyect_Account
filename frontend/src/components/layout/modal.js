import React from 'react';
import '../../styles/modal.css';  // Asegúrate de ajustar la ruta

const Modal = ({ isOpen, onClose, children, title }) => {
    return (
        <div className={`modal-overlay ${isOpen ? 'show' : ''}`} onClick={onClose}>
            <div className={`modal-content ${isOpen ? 'show' : ''}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
