import React from 'react';
import Libros from './components/libros/Libros';
import Menu from './components/menu/Menu';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar desde react-router-dom
import Prestamos from './components/prestamos/Prestamos';

function App() {
  return (
      <Router>
        <Menu />
        <Routes>
            <Route path="/libros" element={<Libros/>} />
            <Route path="/prestamos" element={<Prestamos/>} />
          </Routes>
      </Router>
  );
}

export default App;
