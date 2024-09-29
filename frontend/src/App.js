import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/login';
import Register from './components/register';
import Confirm from './components/confirm';


function App() {

  return (
      <Router>
          <div>
              <Routes>
                  <Route path="/" element={<Login />} /> 
                  <Route path="/register" element={<Register />} />
                  <Route path="/confirm" element={<Confirm />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
