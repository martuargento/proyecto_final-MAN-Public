import React from 'react';
import { usarCarrito } from '../context/CarritoContexto';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
const ajustarPrecio = (precioOriginal, titulo = '') => {
  let precio = Number(String(precioOriginal).replace(/[^\d.]/g, '').replace(',', '.'));
  if (isNaN(precio)) return 0;
  if (/usd|dólar/i.test(titulo)) {
    precio = precio * 1000;
  }
  return precio;
};
const formatearPrecio = (precio) => {
  return Number(precio).toLocaleString('es-AR', { minimumFractionDigits: 0 });
};
import { FaTrash } from 'react-icons/fa';

const VerPedido = () => {
  const { 
    carrito, 
    aumentarCantidad, 
    disminuirCantidad, 
    eliminarDelCarrito,
    vaciarCarrito 
  } = usarCarrito();

  const total = carrito.reduce((acc, producto) => {
    const precioNumerico = ajustarPrecio(producto.precio, producto.titulo);
    return acc + (precioNumerico * producto.cantidad);
  }, 0);

  const enviarPedidoWhatsApp = () => {
    const numeroWhatsApp = "+5491133328382";
    let mensaje = "Alebourg!, Quiero realizar el siguiente pedido:\n\n";
    carrito.forEach(producto => {
      const precioUnitario = ajustarPrecio(producto.precio, producto.titulo);
      const subtotal = precioUnitario * producto.cantidad;
      mensaje += `- ${producto.titulo}: ${producto.cantidad} x $${formatearPrecio(precioUnitario)} = $${formatearPrecio(subtotal)}\n`;
    });
    mensaje += `\nTotal: $${formatearPrecio(total)}`;
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    window.open(urlWhatsApp, '_blank');
  };

  if (carrito.length === 0) {
    return (
      <Container className="my-5">
        <h4 className="text-white text-center">El carrito está vacío</h4>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {carrito.map(producto => {
          const precioNumerico = ajustarPrecio(producto.precio, producto.titulo);
          const precioUnitario = ajustarPrecio(producto.precio, producto.titulo);
          const subtotal = precioUnitario * producto.cantidad;
          return (
            <div 
              key={producto.id} 
              className="mb-4 cart-item"
              style={{
                borderRadius: '8px',
                padding: '20px'
              }}
            >
              <Row className="align-items-center">
                <Col xs={12} md={6}>
                  <div className="mb-2" style={{ fontSize: '1.1rem' }}>{producto.titulo}</div>
                  <div className="opacity-75" style={{ fontSize: '0.95rem' }}>
                    ${formatearPrecio(precioUnitario)} c/u
                  </div>
                </Col>
                <Col xs={12} md={3} className="my-3 my-md-0 d-flex justify-content-center">
                  <div className="d-flex align-items-center">
                    <Button 
                      variant="link"
                      className="cart-quantity-button p-0"
                      onClick={() => disminuirCantidad(producto.id)}
                    >
                      -
                    </Button>
                    <span className="mx-3 fw-medium">
                      {producto.cantidad}
                    </span>
                    <Button 
                      variant="link"
                      className="cart-quantity-button p-0"
                      onClick={() => aumentarCantidad(producto.id)}
                    >
                      +
                    </Button>
                    <Button 
                      variant="link"
                      className="cart-quantity-button p-0 ms-3"
                      onClick={async () => {
                        const res = await Swal.fire({
                          title: '¿Eliminar producto?',
                          text: `¿Seguro que querés eliminar "${producto.titulo}" del carrito?`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonText: 'Sí, eliminar',
                          cancelButtonText: 'No, cancelar',
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                        });
                        if (res.isConfirmed) {
                          eliminarDelCarrito(producto.id);
                          Swal.fire('¡Listo!', 'El producto fue eliminado del carrito.', 'success');
                        }
                      }}
                    >
                      <FaTrash size={14} />
                    </Button>
                  </div>
                </Col>
                <Col xs={12} md={3} className="text-md-end text-center">
                  <div style={{ fontSize: '1.2rem', fontWeight: '500' }}>
                    ${formatearPrecio(subtotal)}
                  </div>
                </Col>
              </Row>
            </div>
          );
        })}

        <div 
          className="mt-4 mb-4 p-3 cart-total"
          style={{
            borderRadius: '8px'
          }}
        >
          <Row className="align-items-center">
            <Col>
              <span className="h5 mb-0">Total:</span>
            </Col>
            <Col className="text-end">
              <span className="h4 mb-0" style={{ fontWeight: '600' }}>
                ${formatearPrecio(total)}
              </span>
            </Col>
          </Row>
        </div>

        <div className="d-flex justify-content-between mt-4">
          <Button 
            className="cart-button px-4 py-2"
            style={{ 
              minWidth: '140px'
            }}
            onClick={async () => {
              const res = await Swal.fire({
                title: '¿Vaciar carrito?',
                text: '¿Seguro que querés eliminar todos los productos del carrito?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, vaciar',
                cancelButtonText: 'No, cancelar',
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
              });
              if (res.isConfirmed) {
                vaciarCarrito();
                Swal.fire('¡Listo!', 'El carrito fue vaciado.', 'success');
              }
            }}
          >
            Vaciar carrito
          </Button>
          <Button 
            className="cart-button px-4 py-2"
            style={{ 
              minWidth: '140px'
            }}
            onClick={enviarPedidoWhatsApp}
          >
            Enviar pedido
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default VerPedido;
