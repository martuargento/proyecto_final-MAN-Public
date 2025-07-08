import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProductos } from '../context/ProductosContext';
import { usarCarrito } from '../context/CarritoContexto';
import { toast } from 'react-toastify';
import { FaCartPlus } from 'react-icons/fa';
import Buscador from './Buscador';
const PRODUCTOS_POR_PAGINA = 9;
const normalizar = str => str.normalize('NFD').replace(/[ -]/g, '').replace(/\s+/g, '').toLowerCase();
const ProductosPorCategoria = () => {
  const { nombreCategoria } = useParams();
  const { productos, cargando, error } = useProductos();
  const { agregarAlCarrito } = usarCarrito();
  const [busqueda, setBusqueda] = useState('');
  const [pagina, setPagina] = useState(1);
  const productosFiltrados = productos.filter(p =>
    p.categoria && normalizar(p.categoria) === normalizar(nombreCategoria) &&
    (p.titulo.toLowerCase().includes(busqueda.toLowerCase()) || p.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );
  const totalPaginas = Math.ceil(productosFiltrados.length / PRODUCTOS_POR_PAGINA);
  const productosPagina = productosFiltrados.slice(
    (pagina - 1) * PRODUCTOS_POR_PAGINA,
    pagina * PRODUCTOS_POR_PAGINA
  );
  const handleAgregar = (producto) => {
    agregarAlCarrito(producto);
    toast.success('Producto agregado al carrito');
  };
  const handleBuscar = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };
  const handlePagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPagina(nuevaPagina);
    }
  };
  if (cargando) return <div className="container my-5">Cargando productos...</div>;
  if (error) return <div className="container my-5 text-danger">{error}</div>;
  return (
    <div className="container my-5">
      <h2>Productos de la categoría: {nombreCategoria}</h2>
      <Buscador valor={busqueda} onChange={handleBuscar} />
      <div className="row">
        {productosPagina.length === 0 && <div>No hay productos en esta categoría.</div>}
        {productosPagina.map(producto => (
          <div className="col-md-4 mb-4" key={producto.id}>
            <div className="card h-100">
              {producto.imagen && <img src={producto.imagen} className="card-img-top" alt={producto.titulo} style={{height: '200px', objectFit: 'contain'}} />}
              <div className="card-body">
                <h5 className="card-title">{producto.titulo}</h5>
                <p className="card-text">{producto.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> ${producto.precio}</p>
                <p className="card-text"><strong>Categoría:</strong> {producto.categoria}</p>
                <button className="btn btn-primary mt-2" onClick={() => handleAgregar(producto)} aria-label="Agregar al carrito">
                  <FaCartPlus /> Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {totalPaginas > 1 && (
        <nav aria-label="Paginador de productos">
          <ul className="pagination justify-content-center">
            <li className={`page-item${pagina === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePagina(pagina - 1)} aria-label="Página anterior">&laquo;</button>
            </li>
            {Array.from({ length: totalPaginas }, (_, i) => (
              <li key={i + 1} className={`page-item${pagina === i + 1 ? ' active' : ''}`}>
                <button className="page-link" onClick={() => handlePagina(i + 1)} aria-label={`Página ${i + 1}`}>{i + 1}</button>
              </li>
            ))}
            <li className={`page-item${pagina === totalPaginas ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => handlePagina(pagina + 1)} aria-label="Página siguiente">&raquo;</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};
export default ProductosPorCategoria;