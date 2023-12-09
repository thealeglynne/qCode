import React, { useState } from 'react';
import '../style/citasMenu.css'; // Archivo de estilos CSS para el menú

const CitasMenu = ({ citasProgramadas, handleConfirmarCita, handleBorrarCita }) => {
  const [menuDesplegado, setMenuDesplegado] = useState(false);

  const toggleMenu = () => {
    setMenuDesplegado(!menuDesplegado);
  };

  return (
    <div className={`citas-menu ${menuDesplegado ? 'desplegado' : ''}`}>
      <button className="toggle-button" onClick={toggleMenu}>
        {menuDesplegado ? 'Ocultar Citas' : 'Mostrar Citas'}
      </button>
      {menuDesplegado && citasProgramadas.length > 0 && (
        <div>
          <h3>Citas Programadas</h3>
          {citasProgramadas.map((cita, index) => (
            <div key={index} className="CitaItem">
              <p>Día: {cita.dia}</p>
              <p>Hora: {cita.hora}</p>
              <p>Nombre: {cita.nombre}</p>
              <p>Apellido: {cita.apellido}</p>

              <button onClick={() => handleBorrarCita(index)}>Borrar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitasMenu;
