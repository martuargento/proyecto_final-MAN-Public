import React, { useState } from 'react';
import { useNavigate as usarNavegacion } from 'react-router-dom';
import { useAuth as usarAuth } from '../context/AuthContext';

import Swal from 'sweetalert2';

const IniciarSesion = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const navegar = usarNavegacion();
  const { login: iniciarSesion } = usarAuth();

  const entrar = (e) => {
    e.preventDefault();

    if (usuario === 'admin' && clave === '1234') {
      iniciarSesion();
      Swal.fire({
        title: '¡Hola!',
        text: 'Entraste correctamente',
        icon: 'success',
        background: '#1e1e1e',
        color: '#fff',
        confirmButtonColor: '#3085d6'
      });
      navegar('/');
    } else {
      Swal.fire({
        title: 'Ojo',
        text: 'Usuario o clave incorrectos',
        icon: 'error',
        background: '#1e1e1e',
        color: '#fff',
        confirmButtonColor: '#d33'
      });
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h3>Iniciar sesión</h3>
      <form onSubmit={entrar}>
        <div className="mb-3">
          <label>Usuario</label>
          <input
            type="text"
            className="form-control inputForEstilos"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Clave</label>
          <input
            type="password"
            className="form-control inputForEstilos"
            value={clave}
            onChange={e => setClave(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 iniciarSesionEstilos">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default IniciarSesion;
