import React, { useState } from 'react';
import { useProductos } from '../context/ProductosContext';
import styled from 'styled-components';
import { toast } from 'react-toastify';
const FormContainer = styled.form`
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  margin-bottom: 24px;
`;
const StyledTable = styled.table`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
`;
const ProductoForm = ({ onSubmit, productoInicial, modo, onCancel }) => {
  const [titulo, setTitulo] = useState(productoInicial?.titulo || '');
  const [precio, setPrecio] = useState(productoInicial?.precio ? String(productoInicial.precio).replace(/\D/g, '') : '');
  const [descripcion, setDescripcion] = useState(productoInicial?.descripcion || '');
  const [imagen, setImagen] = useState(productoInicial?.imagen || '');
  const [categoria, setCategoria] = useState(productoInicial?.categoria || '');
  const [errores, setErrores] = useState({});
  const validar = () => {
    const nuevosErrores = {};
    if (!titulo.trim()) nuevosErrores.titulo = 'El título es obligatorio';
    if (!precio || isNaN(precio) || Number(precio) <= 0) nuevosErrores.precio = 'El precio debe ser mayor a 0';
    if (!descripcion || descripcion.length < 10) nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres';
    if (!categoria.trim()) nuevosErrores.categoria = 'La categoría es obligatoria';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;
    onSubmit({
      titulo,
      precio: Number(String(precio).replace(/[^\d.]/g, '')),
      descripcion,
      imagen,
      categoria
    });
  };
  return (
    <FormContainer onSubmit={handleSubmit} className="mb-4" aria-label={modo === 'editar' ? 'Editar producto' : 'Agregar producto'}>
      <h5>{modo === 'editar' ? 'Editar producto' : 'Agregar producto'}</h5>
      <div className="mb-2">
        <label>Título</label>
        <input type="text" className="form-control" value={titulo} onChange={e => setTitulo(e.target.value)} />
        {errores.titulo && <div className="text-danger">{errores.titulo}</div>}
      </div>
      <div className="mb-2">
        <label>Precio</label>
        <input type="number" className="form-control" value={precio} onChange={e => setPrecio(e.target.value)} />
        {errores.precio && <div className="text-danger">{errores.precio}</div>}
      </div>
      <div className="mb-2">
        <label>Descripción</label>
        <textarea className="form-control" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        {errores.descripcion && <div className="text-danger">{errores.descripcion}</div>}
      </div>
      <div className="mb-2">
        <label>Imagen (URL)</label>
        <input type="text" className="form-control" value={imagen} onChange={e => setImagen(e.target.value)} />
      </div>
      <div className="mb-2">
        <label>Categoría</label>
        <input type="text" className="form-control" value={categoria} onChange={e => setCategoria(e.target.value)} />
        {errores.categoria && <div className="text-danger">{errores.categoria}</div>}
      </div>
      <button type="submit" className="btn btn-editar me-2" aria-label={modo === 'editar' ? 'Guardar cambios' : 'Agregar producto'}>{modo === 'editar' ? 'Guardar cambios' : 'Agregar'}</button>
      {onCancel && <button type="button" className="btn btn-eliminar" onClick={onCancel} aria-label="Cancelar edición">Cancelar</button>}
    </FormContainer>
  );
};
const ModalConfirmacion = ({ mostrar, onConfirmar, onCancelar, producto }) => {
  if (!mostrar) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)'
    }}>
      <div className="modal-dialog" style={{ zIndex: 2100, maxWidth: 500, width: '100%' }}>
        <div className="modal-content" style={{ background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.25)', color: '#222', opacity: 1 }}>
          <div className="modal-header">
            <h5 className="modal-title">Confirmar eliminación</h5>
          </div>
          <div className="modal-body">
            ¿Seguro que deseas eliminar el producto "{producto?.titulo}"?
          </div>
          <div className="modal-footer">
            <button className="btn btn-eliminar" onClick={onConfirmar} aria-label="Confirmar eliminación">Eliminar</button>
            <button className="btn btn-editar" onClick={onCancelar} aria-label="Cancelar eliminación">Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
const ModalFormulario = ({ mostrar, onClose, children }) => {
  if (!mostrar) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.5)'
    }}>
      <div className="modal-dialog" style={{ zIndex: 2100, maxWidth: 500, width: '100%' }}>
        <div className="modal-content" style={{ background: '#fff', borderRadius: 10, boxShadow: '0 4px 32px rgba(0,0,0,0.25)', color: '#222', opacity: 1 }}>
          <div className="modal-header">
            <h5 className="modal-title">{children.props.modo === 'editar' ? 'Editar producto' : 'Agregar producto'}</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
const ProductosCRUD = () => {
  const { productos, cargando, error, agregarProducto, editarProducto, eliminarProducto } = useProductos();
  const [modalForm, setModalForm] = useState({ mostrar: false, modo: 'agregar', producto: null });
  const [modalEliminar, setModalEliminar] = useState({ mostrar: false, producto: null });
  const handleAgregar = async (producto) => {
    const ok = await agregarProducto(producto);
    if (ok) toast.success('Producto agregado correctamente');
    else toast.error('Error al agregar producto');
    setModalForm({ mostrar: false, modo: 'agregar', producto: null });
  };
  const handleEditar = async (producto) => {
    const ok = await editarProducto(modalForm.producto.id, producto);
    if (ok) toast.success('Producto editado correctamente');
    else toast.error('Error al editar producto');
    setModalForm({ mostrar: false, modo: 'agregar', producto: null });
  };
  const handleEliminar = async () => {
    const ok = await eliminarProducto(modalEliminar.producto.id);
    if (ok) toast.success('Producto eliminado correctamente');
    else toast.error('Error al eliminar producto');
    setModalEliminar({ mostrar: false, producto: null });
  };
  return (
    <div className="container my-4">
      <h3>Administrar productos</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      {cargando && <div>Cargando productos...</div>}
      <button className="btn btn-agregar mb-3" onClick={() => setModalForm({ mostrar: true, modo: 'agregar', producto: null })}>
        Agregar producto
      </button>
      <div className="tabla-responsive">
        <StyledTable className="table table-striped mt-4">
          <thead>
            <tr>
              <th>Título</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Imagen</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(prod => (
              <tr key={prod.id}>
                <td>{prod.titulo}</td>
                <td>${prod.precio}</td>
                <td>{prod.descripcion}</td>
                <td>{prod.imagen && <img src={prod.imagen} alt={prod.titulo} style={{width: '60px'}} />}</td>
                <td>{prod.categoria}</td>
                <td>
                  <button className="btn btn-editar btn-sm me-2" onClick={() => setModalForm({ mostrar: true, modo: 'editar', producto: prod })} aria-label="Editar producto">
                    Editar
                  </button>
                  <button className="btn btn-eliminar btn-sm" onClick={() => setModalEliminar({ mostrar: true, producto: prod })} aria-label="Eliminar producto">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </div>
      <ModalFormulario
        mostrar={modalForm.mostrar}
        onClose={() => setModalForm({ mostrar: false, modo: 'agregar', producto: null })}
      >
        <ProductoForm
          onSubmit={modalForm.modo === 'agregar' ? handleAgregar : handleEditar}
          productoInicial={modalForm.producto}
          modo={modalForm.modo}
          onCancel={() => setModalForm({ mostrar: false, modo: 'agregar', producto: null })}
        />
      </ModalFormulario>
      <ModalConfirmacion
        mostrar={modalEliminar.mostrar}
        producto={modalEliminar.producto}
        onConfirmar={handleEliminar}
        onCancelar={() => setModalEliminar({ mostrar: false, producto: null })}
      />
    </div>
  );
};
export default ProductosCRUD; 