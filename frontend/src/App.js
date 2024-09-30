import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/header'; // Asegúrate de importar el Header
import Footer from './components/footer'; // Asegúrate de importar el Footer
import Login from './components/login';
import Register from './components/register';
import Confirm from './components/confirm';
import ConfirmToken from './components/confirmToken';
import Home from './components/home'; // Cambié a mayúscula
import About from './components/about'; // Cambié a mayúscula
import Contact from './components/contact'; // Cambié a mayúscula

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/login" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/confirm/:token" element={<ConfirmToken />} />
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
