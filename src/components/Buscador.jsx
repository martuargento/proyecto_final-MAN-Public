import React from 'react';

const Buscador = ({ valor, onChange }) => {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Buscar por nombre o categoría..."
      value={valor}
      onChange={onChange}
      aria-label="Buscar productos por nombre o categoría"
      style={{ maxWidth: 400 }}
    />
  );
};

export default Buscador; 