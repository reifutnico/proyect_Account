import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/layout/header'; 
import Footer from './components/layout/footer'; 
import Login from './components/pages/login';
import Register from './components/pages/register';
import Confirm from './components/pages/confirm';
import ConfirmToken from './components/pages/confirmToken';
import Home from './components/pages/home'; 
import About from './components/pages/about'; 
import Contact from './components/pages/contact'; 
import { useEffect, useState } from 'react'; 

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <Router>
      <AppContent role={role} />
    </Router>
  );
}

function AppContent({ role }) {
  const location = useLocation();

  return (
    <div className="app-container">
      {location.pathname !== '/register' && <Header role={role} />}
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
      {location.pathname !== '/register' && <Footer />}
    </div>
  );
}

export default App;
