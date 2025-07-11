import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaChevronDown, FaTimes, FaChevronUp } from 'react-icons/fa';
import { usarCarrito } from '../context/CarritoContexto';
import { useAuth } from '../context/AuthContext';
import { useProductos } from '../context/ProductosContext';
import { toast } from 'react-toastify';

import logo from '../assets/logo.png';
import AlternarTema from './AlternarTema';
import Swal from 'sweetalert2';

const Header = () => {
  const { carrito } = usarCarrito();
  const navegar = useNavigate();
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [categoriasMobileAbiertas, setCategoriasMobileAbiertas] = useState(false);
  const [menuMobileAbierto, setMenuMobileAbierto] = useState(false);
  const [estaCerrando, setEstaCerrando] = useState(false);
  const [temaActual, setTemaActual] = useState(document.documentElement.getAttribute('data-theme'));
  const refCategorias = useRef(null);
  const refBoton = useRef(null);
  const { logout, autenticado } = useAuth();
  const { productos } = useProductos();

  const cerrarMenu = () => {
    setEstaCerrando(true);
    setTimeout(() => {
      setCategoriasMobileAbiertas(false);
      setEstaCerrando(false);
    }, 80);
  };

  const alternarMenuMobile = () => {
    if (menuMobileAbierto) {
      setMenuMobileAbierto(false);
      setCategoriasMobileAbiertas(false);
      document.body.style.overflow = 'auto';
    } else {
      setMenuMobileAbierto(true);
      document.body.style.overflow = 'hidden';
    }
  };

  useEffect(() => {
    const manejarClickAfuera = (event) => {
      if (
        refCategorias.current && 
        !refCategorias.current.contains(event.target) &&
        refBoton.current && 
        !refBoton.current.contains(event.target)
      ) {
        setMostrarCategorias(false);
      }
    };
    document.addEventListener('mousedown', manejarClickAfuera);
    return () => document.removeEventListener('mousedown', manejarClickAfuera);
  }, []);

  const categoriasDisponibles = Array.from(new Set(productos.map(p => p.categoria).filter(Boolean)));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setTemaActual(document.documentElement.getAttribute('data-theme'));
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const cerrarSesion = () => {
    logout();
    navegar('/');
    Swal.fire({
      icon: 'success',
      title: '¡Chau!',
      text: 'Cerraste sesión correctamente',
      confirmButtonText: 'Dale',
      customClass: {
        confirmButton: 'swal2-confirm'
      }
    });
  };

  const formatearCategoria = (nombre) => {
    return nombre.toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[\/&]/g, '-')
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  const cantidadTotal = carrito.reduce((total, p) => total + p.cantidad, 0);

  return (
    <>
      <nav className="navbar navbar-expand-sm px-4 navbarestilo">
        <Link className="navbar-brand" to="/">
          <img 
            src={document.documentElement.getAttribute('data-theme') === 'light' ? '/logolight.png' : logo} 
            alt="Alebourg" 
            style={{ height: '55px', objectFit: 'contain' }} 
          />
        </Link>
        <button
          className="navbar-toggler d-sm-none"
          type="button"
          onClick={alternarMenuMobile}
          aria-controls="navbarMobile"
          aria-expanded={menuMobileAbierto}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse d-none d-sm-flex">
          <ul className="navbar-nav me-auto mb-2 mb-sm-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Productos</Link>
            </li>
            <li className="nav-item position-relative" ref={refCategorias}>
              <button 
                ref={refBoton}
                className="nav-link text-white bg-transparent border-0"
                onClick={() => setMostrarCategorias(!mostrarCategorias)}
              >
                Categorías
              </button>
              {mostrarCategorias && (
                <div className="categories-panel shadow">
                  {categoriasDisponibles.map((categoria, index) => (
                    <Link
                      key={index}
                      to={`/categoria/${formatearCategoria(categoria)}`}
                      className="category-item"
                      onClick={() => setMostrarCategorias(false)}
                    >
                      <span>{categoria}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
            {/* boton admin solo si estas autenticado */}
            {autenticado && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/admin/productos">Admin</Link>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-3">
            {autenticado ? (
              <button 
                className="btn btn-cerrar-sesion"
                onClick={cerrarSesion}
              >
                Salir
              </button>
            ) : (
              <div className="admin-hover-area">
                <Link 
                  to="/login" 
                  className="admin-link"
                >
                  Entrar
                </Link>
              </div>
            )}
            <AlternarTema />
            <Link 
              to="/verpedido" 
              className="btn btn-outline-light position-relative botonCarritoEstilo"
            >
              <FaShoppingCart size={18} />
              {cantidadTotal > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cantidadTotal}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className={`mobile-menu d-sm-none ${menuMobileAbierto ? 'show' : ''}`}>
          <div className="mobile-menu-container" style={{ 
            height: '100vh',
            backgroundColor: '#1e1e1e'
          }}>
            <div className="mobile-menu-header">
              <Link className="navbar-brand" to="/">
                <img 
                  src={document.documentElement.getAttribute('data-theme') === 'light' ? '/logolight.png' : logo} 
                  alt="Alebourg" 
                  style={{ height: '40px', objectFit: 'contain' }} 
                />
              </Link>
              <button
                className="mobile-menu-close"
                onClick={alternarMenuMobile}
              >
                <FaTimes />
              </button>
            </div>
            <div className="mobile-menu-content" style={{ 
              display: 'flex', 
              flexDirection: 'column',
              height: '100%'
            }}>
              <ul className="mobile-menu-nav">
                <li className="mobile-menu-item">
                  <Link 
                    to="/" 
                    className="mobile-menu-link"
                    onClick={alternarMenuMobile}
                  >
                    Productos
                  </Link>
                </li>
                <li className="mobile-menu-item">
                  <button 
                    className="mobile-menu-link"
                    onClick={() => setCategoriasMobileAbiertas(!categoriasMobileAbiertas)}
                  >
                    <span>Categorías</span>
                    <FaChevronDown 
                      style={{
                        transform: categoriasMobileAbiertas ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.08s ease'
                      }}
                      size={12}
                    />
                  </button>
                  {categoriasMobileAbiertas && (
                    <>
                      <div 
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'var(--mobile-overlay-bg)',
                          zIndex: 9998,
                          animation: estaCerrando ? 'fadeOut 0.08s ease-out forwards' : 'fadeIn 0.08s ease-out forwards'
                        }} 
                        onClick={cerrarMenu} 
                      />
                      <div style={{
                        position: 'fixed',
                        top: '20px',
                        left: '10px',
                        right: '10px',
                        bottom: '20px',
                        backgroundColor: 'var(--mobile-menu-bg)',
                        zIndex: 9999,
                        padding: '20px',
                        overflowY: 'auto',
                        borderRadius: '10px',
                        boxShadow: '0 0 20px rgba(0,0,0,0.3)',
                        border: '1px solid var(--mobile-menu-border)',
                        animation: estaCerrando ? 'slideDown 0.06s cubic-bezier(0.4, 0, 0.2, 1) forwards' : 'slideUp 0.06s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                        willChange: 'transform, opacity'
                      }}>
                        <style>
                          {`
                            @keyframes slideUp {
                              from {
                                opacity: 0;
                                transform: translateY(50vh) scale(0.9);
                              }
                              to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                              }
                            }
                            @keyframes slideDown {
                              from {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                              }
                              to {
                                opacity: 0;
                                transform: translateY(50vh) scale(0.9);
                              }
                            }
                            @keyframes fadeIn {
                              from {
                                opacity: 0;
                              }
                              to {
                                opacity: 1;
                              }
                            }
                            @keyframes fadeOut {
                              from {
                                opacity: 1;
                              }
                              to {
                                opacity: 0;
                              }
                            }
                          `}
                        </style>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '20px',
                          borderBottom: '1px solid var(--mobile-menu-border)',
                          paddingBottom: '10px'
                        }}>
                          <h4 style={{ 
                            color: 'var(--text-color)', 
                            margin: 0,
                            fontSize: '1.2rem',
                            fontWeight: '500'
                          }}>Categorías</h4>
                          <button 
                            onClick={cerrarMenu}
                            className="categories-close"
                            style={{
                              background: 'none',
                              padding: '10px',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            <FaTimes />
                          </button>
                        </div>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}>
                          {categoriasDisponibles.map((categoria, index) => (
                            <Link
                              key={index}
                              to={`/categoria/${formatearCategoria(categoria)}`}
                              style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 15px',
                                backgroundColor: 'var(--mobile-menu-item-bg)',
                                borderRadius: '8px',
                                color: 'var(--text-color)',
                                textDecoration: 'none',
                                transition: 'all 0.2s ease',
                                fontSize: '0.95rem'
                              }}
                              onClick={() => {
                                setCategoriasMobileAbiertas(false);
                                alternarMenuMobile();
                              }}
                            >
                              <span>{categoria}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </li>
                {/* boton admin solo si estas autenticado en mobile */}
                {autenticado && (
                  <li className="mobile-menu-item">
                    <Link 
                      to="/admin/productos" 
                      className="mobile-menu-link"
                      onClick={alternarMenuMobile}
                    >
                      Admin
                    </Link>
                  </li>
                )}
              </ul>
              <div style={{ flex: 0.2 }}></div>
              <div className="d-flex flex-column align-items-center mt-4 mb-4 w-100 px-3">
                <AlternarTema />
                {autenticado ? (
                  <button 
                    onClick={() => {
                      cerrarSesion();
                      alternarMenuMobile();
                    }}
                    className="btn btn-primary w-100 mt-3"
                    style={{ minWidth: '120px', maxWidth: '300px' }}
                  >
                    Salir
                  </button>
                ) : (
                  <Link 
                    to="/login" 
                    className="btn btn-primary w-100 mt-3"
                    style={{ minWidth: '120px', maxWidth: '300px', textAlign: 'center' }}
                    onClick={alternarMenuMobile}
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Link 
        to="/verpedido" 
        className="floating-cart-button d-sm-none"
      >
        <FaShoppingCart size={22} />
        {cantidadTotal > 0 && (
          <span className="badge">
            {cantidadTotal}
          </span>
        )}
      </Link>
    </>
  );
};

export default Header;