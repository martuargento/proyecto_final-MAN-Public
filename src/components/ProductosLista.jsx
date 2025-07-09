import React, { useState } from 'react';
import { useProductos } from '../context/ProductosContext';
import { usarCarrito } from '../context/CarritoContexto';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';

import Buscador from './Buscador';

const PRODUCTOS_POR_PAGINA = 9;
const ProductosLista = () => {
  const { productos, cargando, error } = useProductos();
  const { agregarAlCarrito } = usarCarrito();
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const productosFiltrados = productos.filter(producto => {
    const texto = `${producto.titulo} ${producto.categoria}`.toLowerCase();
    return texto.includes(busqueda.toLowerCase());
  });
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const productosPagina = productosFiltrados.slice(
    (pagina - 1) * PRODUCTOS_POR_PAGINA,
    pagina * PRODUCTOS_POR_PAGINA
  );
  const agregarProducto = (producto) => {
    agregarAlCarrito(producto);
    toast.success('¡Agregado al carrito!');
  };
  const buscarProductos = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };
  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };
  if (cargando) return <div>Cargando productos...</div>;
  if (error) return <div className="text-danger">{error}</div>;
  return (
    <div>
      <Buscador valor={busqueda} onChange={buscarProductos} />
      <div className="row">
        {productosPagina.map(producto => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100">
              {producto.imagen && <img src={producto.imagen} className="card-img-top" alt={producto.titulo} style={{height: '200px', objectFit: 'contain'}} />}
              <div className="card-body">
                <h5 className="card-title">{producto.titulo}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                <p className="card-text"><strong>Categoría:</strong> {producto.categoria}</p>
                <button className="btn btn-primary mt-2" onClick={() => agregarProducto(producto)} aria-label="Agregar al carrito">
                  <FaCartPlus /> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
        {productosPagina.length === 0 && <div className="text-center">No encontramos productos.</div>}
      </div>
      {totalPaginas > 1 && (
        <nav aria-label="Paginador de productos">
          <ul className="pagination justify-content-center">
            <li className={`page-item${pagina === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => cambiarPagina(pagina - 1)} aria-label="Página anterior">&laquo;</button>
            </li>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <li key={i + 1} className={`page-item${pagina === i + 1 ? ' active' : ''}`}>
                <button className="page-link" onClick={() => cambiarPagina(i + 1)} aria-label={`Página ${i + 1}`}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${pagina === totalPaginas ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => cambiarPagina(pagina + 1)} aria-label="Página siguiente">&raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default ProductosLista;
