import React from 'react';

const Buscador = ({ valor, onChange }) => {
  return (
      <input
          type="text"
          className="form-control mb-3 w-100"
          placeholder="Buscar productos..."
          value={valor}
          onChange={onChange}
          aria-label="Buscar productos"
      />
  );
};

export default Buscador;