import React, { useState } from 'react';
import "../style/login.css"
import { useHistory } from 'react-router-dom';
import imgText from "../img/1685228600428.png"
import ImgLogo  from "../img/logo-horizontal.webp"
import Gif from "../img/Experiments In Processing_.gif"
function LoginForm({ onOpenPopup, onClosePopup, buttonStyle, validUsersData, actualizarEspaciosDisponibles }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false);

  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validUsersData && validUsersData.hasOwnProperty(username) && validUsersData[username] === password) {
      try {
        // Actualiza espacios disponibles antes de redirigir
        await actualizarEspaciosDisponibles();
        // Esperamos a que actualizarEspaciosDisponibles se complete
    
        // Redirige o realiza otras acciones necesarias
        // ...
        handleClosePopup();

        // Scroll a la sección objetivo después de actualizar los espacios disponibles
        const targetSection = document.getElementById('CalendarioCont');
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
  
      } catch (error) {
        console.error('Error al actualizar espacios disponibles:', error);
      }
    } else {
      setError('Credenciales incorrectas');
    }
  }
  // Definir handleOpenPopup antes de su uso
  const handleOpenPopup = () => {
    setShowPopup(true);
    if (onOpenPopup) {
      onOpenPopup();
    }
  };





  const handleClosePopup = () => {
    setShowPopup(false);
    setError('');
    if (onClosePopup) {
      onClosePopup();
    }
    setShowRegisterPopup(false);
  };


  return (
    <div id='contLoginGeneral' className='contLoginGeneral'>
      <img className='imgText' src={imgText} alt="" />
     <div className='buttonLCont'>
     <h2 id='bienvenidosText' className='bienvenidosText'>Bienvenido al centro de experiencias de Quality Code Software House</h2>

      <button className='botonLogeo'  onClick={handleOpenPopup}>
        Agenda tu cita 
      </button>
      </div>
      <div className={`background-overlay ${showPopup || showRegisterPopup  ? 'active' : ''}`} onClick={handleClosePopup}></div>

      <div className={`popup-container ${showPopup ? 'active' : ''}`}>

      <div className="login-content"> 
      <img className='imgLogin' src={ImgLogo} alt="" />
      <div className='InputsContainer'>
       
      <h3 className='titleLoguin'>Login</h3>
        <h3 className='titleLogion'>Ingresa las credenciales suministradas en el correo y documentacion.</h3>
      
        <form onSubmit={handleSubmit}>
              <div id='form-group' className="form-group">
               <img src="" alt="" />
                <label className='usernameText' htmlFor="username"></label>
                <input
                     className='inputLg'
                placeholder='iingrese el usuario Usuario*****1'
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div  id='form-group' className="form-group">
                <label className="usernameText" htmlFor="password">

                </label>
                <input
                className='inputLg'
                placeholder='ingrese su contraseña'
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                </div>

              <button className="btnn" type="submit">
                INICIAR
              </button>
        </form>
       
        {error && <p className="error">{error}</p>}
      </div>
      <div className=' imgLoginGif'>
        <img className='imgLogin2' src={Gif} alt="" />
        </div>
      </div>
      </div>
      

    </div>
  );
}

export default LoginForm;