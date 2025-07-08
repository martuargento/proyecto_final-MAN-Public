import React, { createContext, useContext, useState, useEffect } from 'react';
const CarritoContexto = createContext();
export const ProveedorCarrito = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);
  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(p => p.id === producto.id);
      if (existe) {
        return prev.map(p => p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };
  const aumentarCantidad = (id) => {
    setCarrito(prev => prev.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p));
  };
  const disminuirCantidad = (id) => {
    setCarrito(prev => prev.map(p => p.id === id && p.cantidad > 1 ? { ...p, cantidad: p.cantidad - 1 } : p));
  };
  const eliminarDelCarrito = (productoId) => {
    setCarrito(prev => prev.filter(p => p.id !== productoId));
  };
  const vaciarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
  };
  return (
    <CarritoContexto.Provider value={{
      carrito,
      agregarAlCarrito,
      aumentarCantidad,
      disminuirCantidad,
      eliminarDelCarrito,
      vaciarCarrito
    }}>
      {children}
    </CarritoContexto.Provider>
  );
};
export const usarCarrito = () => useContext(CarritoContexto);
