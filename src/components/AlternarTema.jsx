import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const AlternarTema = () => {
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [esMobile, setEsMobile] = useState(window.innerWidth <= 575);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', temaOscuro ? 'dark' : 'light');

    const cambiarTamanio = () => {
      setEsMobile(window.innerWidth <= 575);
    };

    window.addEventListener('resize', cambiarTamanio);
    return () => window.removeEventListener('resize', cambiarTamanio);
  }, [temaOscuro]);

  const cambiarTema = () => {
    setTemaOscuro(!temaOscuro);
    document.documentElement.setAttribute('data-theme', !temaOscuro ? 'dark' : 'light');
  };

  return (
    <button
        onClick={cambiarTema}
        className="alternar-tema-boton"
        aria-label={temaOscuro ? "Pasar a modo claro" : "Pasar a modo oscuro"}
        title={temaOscuro ? "Pasar a modo claro" : "Pasar a modo oscuro"}
    >
      {temaOscuro ? <FaSun size={20} /> : <FaMoon size={20} />}
      {esMobile && (
        <span className="alternar-tema-texto">
          {temaOscuro ? "Claro" : "Oscuro"}
        </span>
      )}
    </button>
  );
};

export default AlternarTema; 