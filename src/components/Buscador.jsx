import React from 'react';

const Buscador = ({ valor, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-3 w-100"
      placeholder="Buscar por nombre o categoría..."
      value={valor}
      onChange={onChange}
      aria-label="Buscar productos por nombre o categoría"
    />
  );
};

export default Buscador; 