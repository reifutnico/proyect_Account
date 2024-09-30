import React from 'react';
import './home.css'; // Importa tu CSS para Home

const Home = () => {
    return (
        <div>
            <section id="home">
                <h1>Bienvenido a la Página de Inicio</h1>
                <p>Este es el contenido de la página de inicio.</p>
            </section>
            <section id="about">
                <h1>Sobre Nosotros</h1>
                <p>Este es el contenido sobre nosotros.</p>
            </section>
            <section id="contact">
                <h1>Contacto</h1>
                <p>Este es el contenido de contacto.</p>
            </section>
        </div>
    );
};

export default Home;
