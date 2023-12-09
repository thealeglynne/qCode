// context/citasContext.js
import React, { createContext, useContext, useState } from 'react';

const CitasContext = createContext();

export const CitasProvider = ({ children }) => {
  const [citas, setCitas] = useState([]);

  const actualizarCitas = (nuevasCitas) => {
    setCitas(nuevasCitas);
  };

  const [espaciosDisponibles, setEspaciosDisponibles] = useState(0);

  const actualizarEspaciosDisponibles = () => {
    const duracionTotal = citas.reduce((total, cita) => total + cita.duracion, 0);
    const tiempoTotalAtencion = 480; // 8 horas * 60 minutos
    const espacios = tiempoTotalAtencion - duracionTotal;
    setEspaciosDisponibles(espacios);
  };

  const contextValues = {
    citas,
    espaciosDisponibles,
    actualizarCitas,
    actualizarEspaciosDisponibles,
  };

  return <CitasContext.Provider value={contextValues}>{children}</CitasContext.Provider>;
};

export const useCitasContext = () => {
  return useContext(CitasContext);
};
