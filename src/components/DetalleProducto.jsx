import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { usarCarrito } from '../context/CarritoContexto';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';


const DetalleProducto = () => {
  const { id } = useParams();
  const { productos, cargando, error } = useProductos();
  const { agregarAlCarrito } = usarCarrito();
  const producto = productos.find(p => String(p.id) === String(id));
  
  const agregarProducto = () => {
    if (producto) {
      agregarAlCarrito(producto);
      toast.success('¡Agregado al carrito!');
    }
  };

  if (cargando) return <div className="container my-5">Cargando...</div>;
  if (error) return <div className="container my-5 text-danger">{error}</div>;
  if (!producto) return <div className="container my-5">No encontramos ese producto.</div>;
  
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6">
            {producto.imagen && <img src={producto.imagen} alt={producto.titulo} className="img-fluid" style={{maxHeight: '400px', objectFit: 'contain'}} />}
        </div>
        <div className="col-md-6">
          <h2>{producto.titulo}</h2>
          <p>{producto.descripcion}</p>
          <p><strong>Precio:</strong> ${typeof producto.precio === 'number' ? producto.precio.toLocaleString('es-AR') : Number(String(producto.precio).replace(/,/g, '')).toLocaleString('es-AR')}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>
          <button className="btn btn-primary mt-2" onClick={agregarProducto} aria-label="Agregar al carrito">
            <FaCartPlus /> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
export default DetalleProducto;