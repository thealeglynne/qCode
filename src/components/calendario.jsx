import React, { useState,useEffect  } from 'react';

import "../style/calendario.css"
import { useCitasContext, CitasProvider } from '../context/citasContext';
import LoginForm from './login';
import Header from './header';
import Gif2 from "../img/Ding.gif"
import CitasMenu from '../components/citasMenu'
import Footer from './footer';


const Calendario = () => {
    const { espaciosDisponibles, actualizarEspaciosDisponibles } = useCitasContext();

  // Información de ejemplo directamente en el código
  const citasEjemplo = {
    lunes: [
      { horaInicio: '09:15', duracion: 60 },
      { horaInicio: '10:30', duracion: 45 },
      { horaInicio: '12:00', duracion: 90 },
      { horaInicio: '16:15', duracion: 30 },
    ],
    martes: [
      { horaInicio: '09:00', duracion: 45 },
      { horaInicio: '10:00', duracion: 45 },
      { horaInicio: '11:00', duracion: 45 },
      { horaInicio: '12:00', duracion: 45 },
      { horaInicio: '13:00', duracion: 45 },
      { horaInicio: '14:00', duracion: 45 },
      { horaInicio: '15:00', duracion: 45 },
      { horaInicio: '16:00', duracion: 45 },
    ],
    miércoles: [
      { horaInicio: '10:30', duracion: 60 },
      { horaInicio: '12:00', duracion: 45 },
      { horaInicio: '14:00', duracion: 60 },
    ],
    jueves: [
      { horaInicio: '09:00', duracion: 45 },
      { horaInicio: '10:30', duracion: 90 },
      { horaInicio: '12:00', duracion: 30 },
      { horaInicio: '14:00', duracion: 60 },
    ],
    viernes: [
      { horaInicio: '09:00', duracion: 60 },
      { horaInicio: '10:30', duracion: 30 },
      { horaInicio: '12:00', duracion: 60 },
      { horaInicio: '14:00', duracion: 45 },
    ],
  };
  


  const [diaSeleccionado, setDiaSeleccionado] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [citasProgramadas, setCitasProgramadas] = useState([]);
  const [seccion, setSeccion] = useState('login'); // Estado para determinar la sección a mostrar

  const [citaConfirmada, setCitaConfirmada] = useState(null);

  useEffect(() => {
    const storedCitas = JSON.parse(localStorage.getItem('citasProgramadas')) || [];
    setCitasProgramadas(storedCitas);
  }, []);
  useEffect(() => {
    localStorage.setItem('citasProgramadas', JSON.stringify(citasProgramadas));
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
    return diaSeleccionado ? citasEjemplo[diaSeleccionado] || [] : [];
  };
  

  const calcularEspaciosDisponibles = () => {
    // Obtén las citas filtradas
    const citasDelDia = filtrarCitasPorDia();
  
    // Calcula la cantidad de citas disponibles
    const citasDisponibles = citasDelDia.length;
  
    return citasDisponibles;
  };

  

  const obtenerHorasDisponibles = () => {
    return diaSeleccionado ? citasEjemplo[diaSeleccionado].map(cita => cita.horaInicio) : [];
  };
  
  
  const esHoraDisponible = (hora) => {
    // Verifica si la hora seleccionada está en el array de horas disponibles del día seleccionado
    const horasDisponibles = citasEjemplo[diaSeleccionado] || [];
    return horasDisponibles.some((cita) => cita.horaInicio === hora);
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
         <div className='CitasContainer'>
        <CitasMenu
          citasProgramadas={citasProgramadas}
          handleConfirmarCita={handleConfirmarCita}
          handleBorrarCita={handleBorrarCita}
        />
      </div>
      </div>
  
      </div>
   

    <div className='FooterContainer'>
   
    </div>
      </div>
      
  );
};

export default Calendario;