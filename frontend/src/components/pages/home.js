import React from 'react';
import '../../styles/home.css';
import Contact from '../pages/contact'; 
import About from '../pages/about'; 

const Home = () => {
    return (
        <div>
            <section id="home">
                <h1>Bienvenido a la Página de Inicio</h1>
                <p>Este es el contenido de la página de inicio.</p>
            </section>
            <section id="about">
            <About/>
            </section>
            <section id="contact">
            <Contact/>
            </section>
        </div>
    );
};

export default Home;
