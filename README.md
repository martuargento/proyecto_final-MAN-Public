----------
Proyecto Final - Alebourg
----------

Este es mi proyecto final del curso, se trata de Alebourg,mi tienda online hecha con React. Permite ver productos, agregarlos, editarlos y borrarlos. Todo está conectado con MockAPI, que usé como base de datos. También me aseguré de que funcione bien tanto en desktop como en celular.

----------
Ya se encuentra desplegado en:
https://alebourg.vercel.app/
----------



Requisitos:
Para usarlo se necesita tenr instalado:

Node.js (versión 16 o más)

npm (versión 8 o más)

Instalacion:
Clonar el repositorio:
git clone https://github.com/martuargento/proyecto_final-MAN-Public.git

cd alebourgprueba

Instalar las dependencias:
npm install

Luego:
npm run dev

entrar en http://localhost:5173 desde el navegador.


Para producción si querés generar los archivos listos para subir a un hosting:
npm run build

Eso crea una carpeta dist con todo lo necesario.

Subirlo a un hosting
podes esa carpeta dist a algún servicio como:

Vercel, Netlify, GitHub Pages

----------
API:
La app usa MockAPI para guardar los productos. 
La URL actual está en:
src/context/ProductosContext.jsx
----------




