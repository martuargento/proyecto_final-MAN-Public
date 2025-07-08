import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const AlternarTema = () => {
  const [esOscuro, setEsOscuro] = useState(false);
  const [esMovil, setEsMovil] = useState(window.innerWidth <= 575);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', esOscuro ? 'dark' : 'light');

    const manejarResize = () => {
      setEsMovil(window.innerWidth <= 575);
    };

    window.addEventListener('resize', manejarResize);
    return () => window.removeEventListener('resize', manejarResize);
  }, [esOscuro]);

  const alternarTema = () => {
    setEsOscuro(!esOscuro);
    document.documentElement.setAttribute('data-theme', !esOscuro ? 'dark' : 'light');
  };

  return (
    <button
      onClick={alternarTema}
      className="alternar-tema-boton"
      aria-label={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {esOscuro ? <FaSun size={20} /> : <FaMoon size={20} />}
      {esMovil && (
        <span className="alternar-tema-texto">
          {esOscuro ? "Tema claro" : "Tema oscuro"}
        </span>
      )}
    </button>
  );
};

export default AlternarTema; 