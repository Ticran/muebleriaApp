AGENTS.md — Backend de Mueblería Hermanos Jota
> Plantilla. Antes de usarla, revisen cada línea marcada con ✏️ contra SU proyecto
> y corríjanla. Un AGENTS.md que no describe el proyecto real es peor que no tenerlo.
Qué es este proyecto
API REST de un e-commerce de muebles. Express + MongoDB (Atlas) con Mongoose.
El frontend (React, en /client) consume esta API.
Stack (no cambiar versiones ni agregar librerías sin pedirlo)
Node 22 · Express 5 · Mongoose 9 · CommonJS (`require` / `module.exports`)
Variables de entorno con `node --env-file=.env`. NO instalar dotenv.
Pruebas: `node --test` (sin Jest, sin Mocha).
Estructura
`server.js`: arma la app, middlewares, routers, 404 y manejador de errores.
`db.js`: conexión a MongoDB.
`models/`: un archivo por modelo (Product.js, ...).
`routes/`: un router de Express por recurso (productRoutes.js, ...). No hay carpeta `controllers/`.
La lógica de base de datos va en routes, nunca en server.js.
Reglas de la API
Rutas bajo `/api/<recurso-en-plural>`.
Errores SIEMPRE con la forma `{ "error": "mensaje en español" }`.
Códigos: 200 ok · 201 creado · 400 datos inválidos o id mal formado ·
404 id con formato válido que no existe · 409 duplicado · 500 error del servidor.
Los errores de Mongoose los traduce el manejador de errores central de server.js
(ValidationError → 400, CastError → 400, código 11000 → 409). No dupliques esa lógica en las rutas.
Nombres de campos en español, como el modelo Product: nombre, descripcion, precio, stock, imagenUrl.
Límites negativos (lo que NO hay que hacer)
NO usar try/catch en las rutas: Express 5 manda solo los errores de rutas async al manejador.
NO usar `{ new: true }` en findByIdAndUpdate: está deprecado en Mongoose 9. Usar `returnDocument: 'after'` y `runValidators: true`.
NO devolver 500 cuando un recurso no existe: es 404.
NO poner rutas fijas (ej. `/ofertas`) después de `/:id` en un router: Express tomaría "ofertas" como id.
NO escribir el connection string en el código ni tocar el archivo .env.
NO cambiar nombres de campos ni de rutas que ya existen: el frontend depende de ellos.
NO modificar archivos fuera de lo que pide cada tarea. Si hace falta, preguntar primero.
Cómo trabajar
Una tarea por vez. Al terminar cada una, listar qué archivos cambiaste y por qué.
Antes de dar algo por terminado: `npm test` tiene que pasar (con el servidor prendido).
## Reglas de trabajo (agregadas después de la práctica de Categorías)

- Si una regla de este archivo choca con el código que ya existe, avisá y preguntá antes de refactorizar código que no es parte de la tarea.
- Si la spec no define un caso, preguntá. No decidas.
- NO cambies los mensajes ni el formato de respuestas que ya existen.
- NO mates procesos, liberes puertos ni reinicies el servidor sin pedir permiso.
- NO corras comandos que escriban en la base (npm test, npm run test:auth, npm run seed) sin avisar antes.
- Si la misma lógica va en dos rutas, usá una función o un middleware compartido.
- Al terminar cada fase, listá TODOS los archivos que tocaste, incluso los cambios de formato.

## Seguridad (autenticación)

- NO leas, muestres ni copies el contenido de `.env`. Si necesitás una variable nueva, agregá la clave vacía a `.env.example` y avisá.
- NO escribas secretos en el código: el secreto del token se lee de `process.env.JWT_SECRET`.
- NUNCA devuelvas la contraseña ni su hash en una respuesta, ni la pongas en el payload del token.
- NO instales paquetes que no estén en la spec (`bcrypt` o `bcryptjs`, y `jsonwebtoken`).
- NO modifiques `tests/auth.test.cjs`. Si una prueba falla, se corrige el backend.
- NO crees archivos de prueba nuevos sin pedir permiso. Las pruebas del contrato son las de `tests/auth.test.cjs`.

