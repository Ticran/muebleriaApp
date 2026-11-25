// Pruebas de contrato: Autenticación (Sprint 7)
// Se corren con:  npm run test:auth   (con el servidor prendido en otra terminal)
//
// NO modifiquen este archivo. Si una prueba falla, el que tiene que cambiar es el backend.
// Si creen que la prueba está mal, escríbanlo en el .txt y avisen en el hilo.
//
// Estas pruebas crean un usuario y un producto de prueba y los BORRAN al terminar.
// No dependen del seed ni de datos que ya tengan en la base.

const { test, after } = require('node:test');
const assert = require('node:assert/strict');
const mongoose = require('mongoose');

// Lee el .env de la carpeta desde la que corren npm (la raíz del backend).
try {
  process.loadEnvFile();
} catch {
  // Si no hay .env, siguen valiendo PORT, API_URL y MONGO_URI del entorno.
}

const BASE = process.env.API_URL || `http://localhost:${process.env.PORT || 3000}`;
const MARCA = Date.now();
const EMAIL_MIXTO = `Prueba.${MARCA}@Kit-Auth.test`; // con mayúsculas a propósito
const EMAIL = EMAIL_MIXTO.toLowerCase();
const PASSWORD = 'clave-de-prueba-123';

let tokenCliente = null;
let tokenAdmin = null;
let productoCreadoId = null;

// ---------- ayudantes ----------

async function pedir(metodo, ruta, { body, token } = {}) {
  const headers = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (token) headers.Authorization = `Bearer ${token}`;

  let respuesta;
  try {
    respuesta = await fetch(BASE + ruta, {
      method: metodo,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    assert.fail(
      `No pude conectarme a ${BASE}. ¿Está prendido el servidor (npm run dev) en otra terminal? ` +
        `Si usan otro puerto, revisen PORT en el .env.`
    );
  }

  const texto = await respuesta.text();
  let datos = null;
  try {
    datos = JSON.parse(texto);
  } catch {
    // La respuesta no es JSON (por ejemplo, un error 500 en HTML).
  }
  return { status: respuesta.status, datos, texto };
}

function mensajeDe(datos) {
  if (!datos) return undefined;
  return datos.mensaje ?? datos.error ?? datos.message;
}

function mostrar(r) {
  return `Status ${r.status}. Respuesta: ${r.texto.slice(0, 200)}`;
}

let conectado = false;
async function coleccionUsuarios() {
  if (!process.env.MONGO_URI) {
    assert.fail('No encontré MONGO_URI en el .env. La prueba necesita mirar la base.');
  }
  if (!conectado) {
    await mongoose.connect(process.env.MONGO_URI);
    conectado = true;
  }
  // La spec pide el modelo "Usuario" (colección "usuarios"). Si el agente usó "User", también lo encuentro.
  for (const nombre of ['usuarios', 'users']) {
    const col = mongoose.connection.collection(nombre);
    if (await col.findOne({ email: EMAIL })) return col;
  }
  return null;
}

function leerPayload(token) {
  const partes = String(token).split('.');
  assert.equal(partes.length, 3, 'Eso no parece un JWT (tiene que tener 3 partes separadas por puntos).');
  return JSON.parse(Buffer.from(partes[1], 'base64url').toString());
}

// ---------- FASE 1: modelo Usuario + registro ----------

test('[F1] 1. POST /api/usuarios/registro crea el usuario: 201 y sin contraseña en la respuesta', async () => {
  const r = await pedir('POST', '/api/usuarios/registro', {
    body: { nombre: 'Prueba Kit', email: EMAIL_MIXTO, password: PASSWORD },
  });
  assert.equal(r.status, 201, `Esperaba 201. ${mostrar(r)}`);
  assert.ok(r.datos && r.datos._id, `La respuesta tiene que incluir el _id del usuario. ${mostrar(r)}`);
  assert.equal(r.datos.email, EMAIL, `El email tiene que guardarse en minúsculas (mandé "${EMAIL_MIXTO}").`);
  assert.equal(r.datos.password, undefined, 'La respuesta NO puede incluir la contraseña (ni el hash).');
});

test('[F1] 2. En la base, la contraseña está hasheada con bcrypt (no en texto plano)', async () => {
  const col = await coleccionUsuarios();
  assert.ok(col, `No encontré al usuario ${EMAIL} en la colección "usuarios". ¿Se llama así el modelo (Usuario)?`);
  const doc = await col.findOne({ email: EMAIL });
  assert.notEqual(doc.password, PASSWORD, 'La contraseña está guardada en TEXTO PLANO. Tiene que guardarse el hash.');
  assert.match(String(doc.password), /^\$2[aby]\$/, 'El campo password no parece un hash de bcrypt (empieza con $2a$ o $2b$).');
});

test('[F1] 3. Registrar el mismo email otra vez responde 409', async () => {
  const r = await pedir('POST', '/api/usuarios/registro', {
    body: { nombre: 'Otra persona', email: EMAIL, password: 'otra-clave' },
  });
  assert.equal(r.status, 409, `Esperaba 409 (email ya registrado). ${mostrar(r)}`);
});

test('[F1] 4. Registro sin contraseña responde 400 (no 500)', async () => {
  const r = await pedir('POST', '/api/usuarios/registro', {
    body: { nombre: 'Sin clave', email: `sin.clave.${MARCA}@kit-auth.test` },
  });
  assert.equal(r.status, 400, `Esperaba 400. ${mostrar(r)}`);
});

// ---------- FASE 2: login + JWT ----------

test('[F2] 5. POST /api/usuarios/login devuelve un token y los datos del usuario sin contraseña', async () => {
  const r = await pedir('POST', '/api/usuarios/login', { body: { email: EMAIL, password: PASSWORD } });
  assert.equal(r.status, 200, `Esperaba 200. ${mostrar(r)}`);
  assert.ok(r.datos && r.datos.token, `La respuesta tiene que tener "token". ${mostrar(r)}`);
  assert.ok(r.datos.usuario, `La respuesta tiene que tener "usuario". ${mostrar(r)}`);
  assert.equal(r.datos.usuario.password, undefined, 'El usuario de la respuesta NO puede incluir la contraseña.');

  const payload = leerPayload(r.datos.token);
  assert.ok(payload.id || payload._id, 'El payload del token tiene que tener el id del usuario.');
  assert.equal(payload.password, undefined, 'El payload del token NO puede tener la contraseña: cualquiera puede leerlo.');
  assert.ok(payload.exp, 'El token tiene que vencer (expiresIn).');

  tokenCliente = r.datos.token;
});

test('[F2] 6. Login con email inexistente y con contraseña incorrecta: 401 y el MISMO mensaje', async () => {
  const malClave = await pedir('POST', '/api/usuarios/login', { body: { email: EMAIL, password: 'incorrecta' } });
  const malEmail = await pedir('POST', '/api/usuarios/login', {
    body: { email: `no.existe.${MARCA}@kit-auth.test`, password: PASSWORD },
  });
  assert.equal(malClave.status, 401, `Contraseña incorrecta: esperaba 401. ${mostrar(malClave)}`);
  assert.equal(malEmail.status, 401, `Email inexistente: esperaba 401. ${mostrar(malEmail)}`);
  assert.equal(
    mensajeDe(malClave.datos),
    mensajeDe(malEmail.datos),
    'Los dos errores tienen que tener el mismo mensaje. Si no, se puede averiguar qué emails están registrados.'
  );
});

// ---------- FASE 3: middleware verificarToken + perfil ----------

test('[F3] 7. GET /api/usuarios/perfil sin token responde 401', async () => {
  const r = await pedir('GET', '/api/usuarios/perfil');
  assert.equal(r.status, 401, `Esperaba 401. ${mostrar(r)}`);
});

test('[F3] 8. GET /api/usuarios/perfil con un token inválido responde 401 (no 500)', async () => {
  const r = await pedir('GET', '/api/usuarios/perfil', { token: 'esto.no.esuntoken' });
  assert.equal(r.status, 401, `Esperaba 401. ${mostrar(r)}`);
});

test('[F3] 9. GET /api/usuarios/perfil con token válido devuelve el usuario sin contraseña', async () => {
  assert.ok(tokenCliente, 'No tengo token: primero tiene que pasar la prueba 5 (login).');
  const r = await pedir('GET', '/api/usuarios/perfil', { token: tokenCliente });
  assert.equal(r.status, 200, `Esperaba 200. ${mostrar(r)}`);
  assert.equal(r.datos && r.datos.email, EMAIL, `Tiene que devolver el usuario del token. ${mostrar(r)}`);
  assert.equal(r.datos.password, undefined, 'El perfil NO puede incluir la contraseña.');
});

// ---------- FASE 4: roles (adminGuard) en las rutas de escritura de productos ----------

const PRODUCTO = {
  nombre: `Producto de prueba ${MARCA}`,
  descripcion: 'Creado por las pruebas del kit. Se borra solo.',
  precio: 1000,
  stock: 1,
  imagenUrl: 'https://example.com/prueba.jpg',
};

test('[F4] 10. POST /api/productos sin token responde 401', async () => {
  const r = await pedir('POST', '/api/productos', { body: PRODUCTO });
  if (r.status === 201 && r.datos && r.datos._id) productoCreadoId = r.datos._id;
  assert.equal(r.status, 401, `Esperaba 401: cualquiera puede crear productos. ${mostrar(r)}`);
});

test('[F4] 11. POST /api/productos con token de cliente responde 403', async () => {
  assert.ok(tokenCliente, 'No tengo token: primero tiene que pasar la prueba 5 (login).');
  const r = await pedir('POST', '/api/productos', { body: PRODUCTO, token: tokenCliente });
  if (r.status === 201 && r.datos && r.datos._id) productoCreadoId = r.datos._id;
  assert.equal(r.status, 403, `Esperaba 403: un cliente logueado no puede crear productos. ${mostrar(r)}`);
});

test('[F4] 12. Con token de admin, el guardia deja pasar (ni 401 ni 403)', async () => {
  // Esta prueba solo cuenta si existe el guardia: sin él, cualquiera "pasa".
  assert.ok(tokenCliente, 'No tengo token: primero tiene que pasar la prueba 5 (login).');
  const comoCliente = await pedir('POST', '/api/productos', { body: PRODUCTO, token: tokenCliente });
  if (comoCliente.status === 201 && comoCliente.datos && comoCliente.datos._id) productoCreadoId = comoCliente.datos._id;
  assert.equal(comoCliente.status, 403, 'Todavía no hay guardia de roles: primero tiene que pasar la prueba 11.');

  const col = await coleccionUsuarios();
  assert.ok(col, 'No encontré al usuario de prueba en la base.');
  // Lo hacemos admin directo en la base, como harían ustedes desde Compass.
  await col.updateOne({ email: EMAIL }, { $set: { rol: 'admin' } });

  // El rol viaja DENTRO del token: hay que volver a loguearse para tener un token nuevo.
  const login = await pedir('POST', '/api/usuarios/login', { body: { email: EMAIL, password: PASSWORD } });
  assert.equal(login.status, 200, `El login como admin falló. ${mostrar(login)}`);
  tokenAdmin = login.datos.token;
  assert.equal(leerPayload(tokenAdmin).rol, 'admin', 'El payload del token tiene que incluir el rol del usuario ("rol").');

  const r = await pedir('POST', '/api/productos', { body: PRODUCTO, token: tokenAdmin });
  if (r.status === 201 && r.datos && r.datos._id) productoCreadoId = r.datos._id;
  assert.notEqual(r.status, 401, `El admin recibió 401. ${mostrar(r)}`);
  assert.notEqual(r.status, 403, `El admin recibió 403: el guardia no reconoce el rol. ${mostrar(r)}`);
});

// ---------- limpieza: no dejamos basura en la base ----------

after(async () => {
  try {
    if (!conectado && process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      conectado = true;
    }
    if (conectado) {
      const db = mongoose.connection;
      // "products" si el modelo se llama Product; "productos" si se llama Producto.
      for (const nombre of ['products', 'productos']) {
        if (productoCreadoId && mongoose.isValidObjectId(productoCreadoId)) {
          await db.collection(nombre).deleteOne({ _id: new mongoose.Types.ObjectId(String(productoCreadoId)) });
        }
        await db.collection(nombre).deleteMany({ nombre: PRODUCTO.nombre });
      }
      for (const nombre of ['usuarios', 'users']) {
        await db.collection(nombre).deleteMany({ email: /@kit-auth\.test$/ });
      }
    }
  } finally {
    if (conectado) await mongoose.disconnect();
  }
});
