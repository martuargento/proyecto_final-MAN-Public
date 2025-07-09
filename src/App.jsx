import { Routes, Route } from 'react-router-dom';
import { ProveedorCarrito } from './context/CarritoContexto';
import { AuthProvider } from './context/AuthContext';
import { ProductosProvider } from './context/ProductosContext';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

import Header from './components/Header';
import Home from './components/Home';
import VerPedido from './components/VerPedido';
import Footer from './components/Footer';
import Login from './components/Login';
import ProductosPorCategoria from './components/ProductosPorCategoria';
import DetalleProducto from './components/DetalleProducto';
import RutaPrivada from './components/RutaPrivada';
import ProductosCRUD from './components/ProductosCRUD';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Alebourg | Tienda de Electrónica y Accesorios</title>
        <meta name="description" content="Catálogo, carrito y administración de productos Alebourg. Electrónica, accesorios y más." />
      </Helmet>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      <AuthProvider>
        <ProveedorCarrito>
          <ProductosProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/verpedido" element={
                <RutaPrivada>
                  <VerPedido />
                </RutaPrivada>
              } />
              <Route path="/login" element={<Login />} />
              <Route path="/categoria/:nombreCategoria" element={<ProductosPorCategoria />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />
              <Route path="/admin/productos" element={
                <RutaPrivada>
                  <ProductosCRUD />
                </RutaPrivada>
              } />
            </Routes>
            <Footer />
          </ProductosProvider>
        </ProveedorCarrito>
      </AuthProvider>
    </>
  );
}

export default App;