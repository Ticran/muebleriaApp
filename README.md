# Mueblería Hermanos Jota

Curso de Desarrollo Web | ITBA  
Sprint 3 y 4 · Grupo 11 · Turno Mañana

---

## Descripción

Sitio web e-commerce para la mueblería **Hermanos Jota**, construido utilizando React para el frontend y Node.js con Express para el backend. 
La aplicacion permite visualizar el catálogo de productos, consultar el detalle de cada mueble, agregar productos al carrito y completar formulario de contacto.

---

## Arquitectura del proyecto

El proyecto está dividido en dos partes principales:

- **Frontend:** aplicación desarrollada con React y Vite.
- **Backend:** servidor desarrollado con Node.js y Express, encargado de proporcionar la API de productos.

La comunicación entre ambas partes se realiza mediante peticiones HTTP utilizando `fetch`.

muebleriaApp/
├── client/
│   └── src/
│       ├── components/
│       ├── App.jsx
│       └── index.css
│
├── backend/
│   ├── data/
│   ├── middlewares/
│   ├── node_modules/
│   ├── routes/
│   └── ...
│
└── README.md
---

## Tecnologías utilizadas

## Tecnologías utilizadas

- **React** — desarrollo de la interfaz mediante componentes reutilizables y manejo de estados.
- **Vite** — herramienta utilizada para crear y ejecutar el frontend en entorno de desarrollo.
- **JavaScript** — lógica de la aplicación, manejo de eventos, estados y comunicación con la API.
- **CSS3** — diseño responsivo mediante Flexbox, CSS Grid, variables CSS y media queries.
- **Node.js** — entorno de ejecución utilizado para desarrollar el backend.
- **Express** — framework utilizado para crear el servidor y las rutas de la API REST.
- **Fetch API** — comunicación entre el frontend y el backend mediante peticiones HTTP.
- **Git y GitHub** — control de versiones y colaboración en equipo.

---

## Equipo

| Nombre              | GitHub                                                       |
| ------------------- | ------------------------------------------------------------ |
| Javier Agustín Melo | [@AgusMelo99](https://github.com/AgusMelo99)                 |
| Valentina Urquiza   | [@val3t8](https://github.com/val3t8)                         |
| Jesica Alfonso      | [@JesicaBelenAlfonso](https://github.com/JesicaBelenAlfonso) |
| Cristian Andrada    | [@Ticran](https://github.com/Ticran)                         |
| Teresa Perello      | [@tereperelloo](https://github.com/tereperelloo-hub)         |

---

## Instrucciones de instalación y ejecución

### Backend

Ingresar a la carpeta del backend:

cd backend

Instalar las dependencias:

npm install

Iniciar el servidor:

npm run dev

El backend se ejecuta en:

http://localhost:3000


### Frontend

Abrir una nueva terminal e ingresar a la carpeta del frontend:

cd client

Instalar las dependencias:

npm install

Iniciar el servidor de desarrollo:

npm run dev

El frontend se ejecuta en:

http://localhost:5173

IMPORTANTE: Para utilizar la aplicación correctamente, deben estar ejecutándose ambos servidores simultáneamente.
---

## Repositorio

🔗 [github.com/Ticran/muebleriaApp](https://github.com/Ticran/muebleriaApp)

## Deploy

🌐 Sitio web: [Hermanos Jota](https://ticran.github.io/muebleriaApp/)
