# Mueblería Hermanos Jota

Curso de Desarrollo Web | ITBA  
Sprint 5 y 6 · Grupo 11 · Turno Mañana

---

## Descripción

Aplicación web fullstack e-commerce para la mueblería **Hermanos Jota**, construida utilizando **React** (con React Router DOM) para el frontend, **Node.js con Express** para el backend y **MongoDB Atlas con Mongoose** para la persistencia de datos en la nube.

La aplicación permite visualizar el catálogo de productos en tiempo real, consultar el detalle de cada mueble, dar de alta nuevos productos, editar o eliminar productos existentes (CRUD completo), gestionar el carrito de compras y completar el formulario de contacto.

---

## Deploy en Producción

- 🌐 **Frontend (Vercel):** [https://muebleria-hermanos-jota-g11.vercel.app/](https://muebleria-hermanos-jota-g11.vercel.app/)
- 🚀 **Backend API (Render):** [https://muebleria-hermanos-jota-api-g37f.onrender.com/](https://muebleria-hermanos-jota-api-g37f.onrender.com/)
  - Endpoint de productos: [https://muebleria-hermanos-jota-api-g37f.onrender.com/api/productos](https://muebleria-hermanos-jota-api-g37f.onrender.com/api/productos)

---

## Arquitectura del proyecto

El proyecto está dividido en tres capas principales:

- **Frontend (`/client`):** aplicación SPA desarrollada con React, Vite y React Router DOM.
- **Backend (`/backend`):** API RESTful desarrollada con Node.js y Express.
- **Persistencia (MongoDB Atlas):** base de datos NoSQL en la nube modelada mediante esquemas de Mongoose.

```text
muebleriaApp/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   └── vercel.json
│
├── backend/
│   ├── data/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── db.js
│   ├── seed.js
│   ├── server.js
│   └── .env.example
│
└── README.md
```

---

## Tecnologías utilizadas

- **React** — desarrollo de la interfaz mediante componentes reutilizables y formularios controlados.
- **React Router DOM** — ruteo dinámico (`useParams`) y navegación programática (`useNavigate`).
- **Vite** — entorno de desarrollo y empaquetado del frontend.
- **CSS3** — diseño responsivo (Mobile First) mediante Flexbox, CSS Grid y variables CSS.
- **Node.js y Express** — servidor y rutas de la API RESTful (`GET`, `POST`, `PUT`, `DELETE`).
- **MongoDB Atlas y Mongoose** — base de datos en la nube, esquemas y validaciones del modelo `Product`.
- **Render y Vercel** — despliegue en la nube del backend y frontend respectivamente.
- **Git y GitHub** — control de versiones y trabajo colaborativo mediante ramas y Pull Requests.

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

## Instrucciones de instalación y ejecución local

### 1. Backend

Ingresar a la carpeta del backend e instalar las dependencias:

```bash
cd backend
npm install
```

Crear un archivo `.env` en `backend/` (siguiendo el formato de `.env.example`) con la cadena de conexión a MongoDB:

```env
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/muebleriaJotaDB
```

(Opcional) Cargar el catálogo inicial de productos en la base de datos:

```bash
npm run seed
```

Iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El backend se ejecuta en `http://localhost:3000`.

### 2. Frontend

Abrir una nueva terminal, ingresar a la carpeta del frontend e instalar las dependencias:

```bash
cd client
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

El frontend se ejecuta en `http://localhost:5173`.

> **IMPORTANTE:** Para utilizar la aplicación localmente, deben estar ejecutándose ambos servidores simultáneamente.

---

## Repositorio

🔗 [github.com/Ticran/muebleriaApp](https://github.com/Ticran/muebleriaApp)
