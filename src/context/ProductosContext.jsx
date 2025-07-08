import React, { createContext, useContext, useState, useEffect } from 'react';
const MOCKAPI_URL = 'https://682f69eef504aa3c70f3f01a.mockapi.io/Alebourg';
const ProductosContext = createContext();
export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const fetchProductos = async () => {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(MOCKAPI_URL);
      if (!res.ok) throw new Error('Error al obtener productos');
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };
  useEffect(() => {
    fetchProductos();
  }, []);
  const agregarProducto = async (producto) => {
    setError(null);
    try {
      const res = await fetch(MOCKAPI_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (!res.ok) throw new Error('Error al agregar producto');
      await fetchProductos();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  const editarProducto = async (id, producto) => {
    setError(null);
    try {
      const res = await fetch(`${MOCKAPI_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto)
      });
      if (!res.ok) throw new Error('Error al editar producto');
      await fetchProductos();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  const eliminarProducto = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${MOCKAPI_URL}/${id}`, {
        method: 'DELETE' });
      if (!res.ok) throw new Error('Error al eliminar producto');
      await fetchProductos();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };
  return (
    <ProductosContext.Provider value={{ productos, cargando, error, agregarProducto, editarProducto, eliminarProducto, fetchProductos }}>
      {children}
    </ProductosContext.Provider>
  );
};
export const useProductos = () => useContext(ProductosContext); 