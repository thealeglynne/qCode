import React from 'react';
import logo from './logo.svg';
import './App.css';
import Calendario from './components/calendario';
// Asegúrate de que la ruta sea correcta y que el nombre del archivo sea correcto
import { CitasProvider } from './context/citasContext';

// Importa o define citasProgramadas aquí


function App() {
  return (
    <CitasProvider>
      <div  className="App" style={{ overflow: 'auto' }}>
        
        <Calendario />

      </div>
    </CitasProvider>
  );
}

export default App;
