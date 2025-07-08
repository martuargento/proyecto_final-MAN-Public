# Alebourg - E-commerce React

Este proyecto es una tienda online desarrollada en React, con carrito de compras, autenticación, CRUD de productos conectado a MockAPI, búsqueda, paginación, diseño responsivo y optimización para despliegue.

## Características principales
- Carrito de compras con Context API
- Autenticación de usuarios (login simulado)
- CRUD de productos con MockAPI
- Búsqueda y paginación de productos
- Diseño responsivo con Bootstrap y styled-components
- Notificaciones con React Toastify
- SEO con React Helmet
- Accesibilidad mejorada (etiquetas ARIA)

## Requisitos previos
- Node.js >= 16.x
- npm >= 8.x

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/martinalejandronuniezcursor2/alebourgprueba.git
   cd alebourgprueba
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso en desarrollo
Para correr la app en modo desarrollo:
```bash
npm run dev
```
La app estará disponible en [http://localhost:5173](http://localhost:5173)

## Build para producción
Para construir la app lista para producción:
```bash
npm run build
```
Los archivos finales estarán en la carpeta `dist/`.

## Despliegue
Puedes desplegar la carpeta `dist/` en cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.).

## Configuración de MockAPI
- El CRUD de productos está conectado a [MockAPI](https://682f69eef504aa3c70f3f01a.mockapi.io/Alebourg).
- Puedes modificar la URL de MockAPI en `src/context/ProductosContext.jsx` si lo necesitas.

## Variables de entorno
No se requieren variables de entorno adicionales para el funcionamiento básico.

## Pruebas de compatibilidad
- El diseño es responsivo y compatible con móviles, tablets y escritorio.
- Se recomienda probar en distintos dispositivos antes del despliegue final.

## Contacto
Para dudas o sugerencias, contacta a [martinalejandronuniezcursor2](https://github.com/martinalejandronuniezcursor2).