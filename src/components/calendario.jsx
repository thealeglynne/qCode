import React, { useState,useEffect  } from 'react';

import "../style/calendario.css"
import { useCitasContext, CitasProvider } from '../context/citasContext';
import LoginForm from './login';
import Header from './header';
import Gif2 from "../img/Ding.gif"

const Calendario = () => {
    const { espaciosDisponibles, actualizarEspaciosDisponibles } = useCitasContext();

  // Información de ejemplo directamente en el código
  const citasEjemplo = [
    { dia: 'lunes', horaInicio: '09:15', duracion: 60 },
    { dia: 'lunes', horaInicio: '10:30', duracion: 45 },
    { dia: 'lunes', horaInicio: '12:00', duracion: 90 },
    { dia: 'lunes', horaInicio: '16:15', duracion: 30 },
    { dia: 'martes', horaInicio: '09:00', duracion: 45 },
    { dia: 'martes', horaInicio: '10:00', duracion: 45 },
    { dia: 'martes', horaInicio: '11:00', duracion: 45 },
    { dia: 'martes', horaInicio: '12:00', duracion: 45 },
    { dia: 'martes', horaInicio: '13:00', duracion: 45 },
    { dia: 'martes', horaInicio: '14:00', duracion: 45 },
    { dia: 'martes', horaInicio: '15:00', duracion: 45 },
    { dia: 'martes', horaInicio: '16:00', duracion: 45 },
    { dia: 'miércoles', horaInicio: '10:30', duracion: 60 },
    { dia: 'miércoles', horaInicio: '12:00', duracion: 45 },
    { dia: 'miércoles', horaInicio: '14:00', duracion: 60 },
    { dia: 'jueves', horaInicio: '09:00', duracion: 45 },
    { dia: 'jueves', horaInicio: '10:30', duracion: 90 },
    { dia: 'jueves', horaInicio: '12:00', duracion: 30 },
    { dia: 'jueves', horaInicio: '14:00', duracion: 60 },
    { dia: 'viernes', horaInicio: '09:00', duracion: 60 },
    { dia: 'viernes', horaInicio: '10:30', duracion: 30 },
    { dia: 'viernes', horaInicio: '12:00', duracion: 60 },
    { dia: 'viernes', horaInicio: '14:00', duracion: 45 },
  ];


  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [citasProgramadas, setCitasProgramadas] = useState([]);
  const [seccion, setSeccion] = useState('login'); // Estado para determinar la sección a mostrar

  const [citaConfirmada, setCitaConfirmada] = useState(null);

  useEffect(() => {
    // Actualiza la interfaz cuando la lista de citas cambia
    // Esto permite visualizar todas las citas programadas en orden
  }, [citasProgramadas]);

  const programarCita = (cita) => {
    try {
      // Agrega la cita programada a la lista
      setCitasProgramadas([...citasProgramadas, cita]);
        
      // Almacena la cita confirmada para mostrarla en la interfaz
      setCitaConfirmada(cita);
    } catch (error) {
      console.error('Error al programar la cita:', error);
    }
  };
  const handleConfirmarCita = (index) => {
    const nuevaLista = [...citasProgramadas];
    nuevaLista[index].confirmada = true;  // Puedes agregar un campo 'confirmada' a tu objeto cita
    setCitasProgramadas(nuevaLista);
  };
  
  const handleBorrarCita = (index) => {
    const nuevaLista = citasProgramadas.filter((_, i) => i !== index);
    setCitasProgramadas(nuevaLista);
  };

  const handleDiaSeleccionado = (dia) => {
    setDiaSeleccionado(dia);
  };

  const filtrarCitasPorDia = () => {
    return citasEjemplo.filter((cita) => cita.dia === diaSeleccionado);
  };

  const calcularEspaciosDisponibles = () => {
    // Obtén las citas filtradas
    const citasDelDia = filtrarCitasPorDia();
  
    // Calcula la cantidad de citas disponibles
    const citasDisponibles = citasDelDia.length;
  
    return citasDisponibles;
  };

  

  const obtenerHorasDisponibles = () => {
    // Obtén las horas disponibles de las citas de ejemplo
    const horasDisponibles = citasEjemplo.map((cita) => cita.horaInicio);
    return horasDisponibles;
  };
  const esHoraDisponible = (hora) => {
    // Verifica si la hora seleccionada está en la lista de horas disponibles
    const horaDisponible = citasEjemplo.some((cita) => cita.horaInicio === hora);
    return horaDisponible;
  };
  
  const sumarMinutos = (hora, minutos) => {
    const [horaStr, minutosStr] = hora.split(':');
    const horaFecha = new Date(2022, 1, 1, parseInt(horaStr), parseInt(minutosStr));
    horaFecha.setMinutes(horaFecha.getMinutes() + minutos);
    const horaNueva = `${horaFecha.getHours()}:${String(horaFecha.getMinutes()).padStart(2, '0')}`;
    return horaNueva;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que se haya seleccionado un día y hora
    if (!diaSeleccionado || !horaSeleccionada) {
      // Manejar el caso en que no se haya seleccionado día y hora
      alert('Por favor, selecciona un día y hora disponibles.');
      return;
    }

    const horaValida = esHoraDisponible(horaSeleccionada);

    if (horaValida) {
      // Mostrar mensaje de cita lista para confirmar
      alert(`Cita lista para confirmar: ${diaSeleccionado} a las ${horaSeleccionada}`);

      // Programar la cita
      programarCita({ dia: diaSeleccionado, hora: horaSeleccionada, nombre, apellido });
    } else {
      // Mostrar mensaje de hora no disponible
      alert(`La hora ${horaSeleccionada} no está disponible. Por favor, elige otra hora.`);
    }

    // Limpiar los campos del formulario después de programar la cita
    setDiaSeleccionado('');
    setNombre('');
    setApellido('');
    setHoraSeleccionada('');
  };
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to toggle the menu state (open/close)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleOpenPopup = () => {
    console.log('Abriendo popup...');
    // Lógica adicional al abrir el popup
  };

  const handleClosePopup = () => {
    console.log('Cerrando popup...');
    // Lógica adicional al cerrar el popup
  };

  const buttonStyle = {
    // Estilos personalizados para el botón
    backgroundColor: 'blue',
    color: 'white',
    // ... otros estilos
  };

  const validUsersData = {
    "UsuarioQCODE1": "HelloWord"

    // ... otros usuarios y contraseñas
  };

  return (
    <div className='calendarioGeneralContend' >
      <div className='headerCont'>
      <Header />
      </div>
       {seccion === 'login' && (
        <div id='loguinCont' className='loguinCont'>

          <div>

          <LoginForm
            onOpenPopup={handleOpenPopup}
            onClosePopup={handleClosePopup}
            buttonStyle={buttonStyle}
            validUsersData={validUsersData}
            actualizarEspaciosDisponibles={actualizarEspaciosDisponibles}
          />
          
          </div>{/* Agrega lógica adicional según sea necesario */}
        </div>
      )}

        <div id='CalendarioCont' className='CalendarioCont'>
          <div className='imgCalendarioCont'>
            <img className='imgGifSec2' src={Gif2} alt="" />
          </div>
<div className='componentsSec2'>
  <h2 className='h2ComponentsCitas'>Agendamiento de citas</h2>
      <p className='ttextoInstrucciionesCitas'>
Selecciona el día y la hora disponibles según nuestro sistema.
Ingresa tus datos para que podamos contactarte y brindarte la atención que mereces.
Estamos aquí para ayudarte. ¡Esperamos verte pronto!</p>
      <div className='inputCitaContainer'>
      <label>
  Selecciona un día:
  <select  className='inputDia' value={diaSeleccionado} onChange={(e) => handleDiaSeleccionado(e.target.value)}>
    <option value="">Seleccionar día</option>
    <option value="lunes">Lunes</option>
    <option value="martes">Martes</option>
    <option value="miércoles">Miércoles</option>
    <option value="jueves">Jueves</option>
    <option value="viernes">Viernes</option>
    {/* Agrega más días según sea necesario */}
  </select>
</label>
      </div>
      <div className='inputsInfoCont'>
        {diaSeleccionado && (
          <div>
            <h3>Información del día {diaSeleccionado}</h3>
            <p>Espacios disponibles: {calcularEspaciosDisponibles()}</p>

            {/* Formulario de programación de cita */}
            <form onSubmit={handleSubmit}>
              <label>
                Nombre:
                <input placeholder='Nombre' type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
              </label>
              <br />
              <label>
                Apellido:
                <input placeholder='Apellodo' type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
              </label>
              <br />
              <label>
                Hora:
                <select value={horaSeleccionada} onChange={(e) => setHoraSeleccionada(e.target.value)} required>
                  <option value="">Seleccionar hora</option>
                  {/* Aquí puedes mostrar las horas disponibles del día seleccionado */}
                  {obtenerHorasDisponibles().map((hora) => (
                    <option key={hora} value={hora}>
                      {hora}
                    </option>
                  ))}
                </select>
              </label>
              <br />
  <button type="submit">Programar Cita</button>
 
            </form>
          
          </div>


          
        )}
        
         </div>
         <div id="" className='CitasContainer ' >
     {citasProgramadas.length > 0 && (
  <div>
    <h3>Citas Programadas</h3>
    {citasProgramadas.map((cita, index) => (
      <div key={index} className="CitaItem">
        <p>Día: {cita.dia}</p>
        <p>Hora: {cita.hora}</p>
        <p>Nombre: {cita.nombre}</p>
        <p>Apellido: {cita.apellido}</p>
        <button onClick={() => handleConfirmarCita(index)}>Confirmar</button>
        <button onClick={() => handleBorrarCita(index)}>Borrar</button>
      </div>
    ))}
  </div>
)}

     </div>
      </div>
  
      </div>
   
  
    
      </div>
  );
};

export default Calendario;