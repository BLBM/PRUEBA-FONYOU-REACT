import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/dashboardComponents/Dashboard'; // Asegúrate de tener este componente

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Ruta para la página de inicio */}
        <Route path="/dashboard" element={<Dashboard/>} /> 
      </Routes>
    </Router>
  );
};

export default App;
