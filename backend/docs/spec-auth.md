# Spec: Autenticación de usuarios (backend)

Mueblería Hermanos Jota · Sprint 7

Esta spec es la **fuente de verdad**. Si el código, el campus o lo que diga el agente no coincide con lo que dice acá, manda la spec. Las pruebas de `tests/auth.test.cjs` verifican exactamente esto.

## Para qué

La consigna final pide que los clientes puedan crear una cuenta, iniciar sesión y comprar a su nombre. Esta spec cubre **solo el backend**: registro, login, una ruta protegida y roles. El front (formularios, Context, rutas protegidas) lo hacemos en clase el jueves, contra esta API.

## Paquetes

- `bcrypt` para hashear contraseñas. Si en Windows no instala, `bcryptjs` (misma API, mismo algoritmo).
- `jsonwebtoken` para firmar y verificar el token.
- Nada más. Ni `passport`, ni `express-async-handler`, ni `express-validator`.

## Variables de entorno

Se agrega una al `.env` (y su clave vacía al `.env.example`):

```
JWT_SECRET=una_frase_larga_y_aleatoria
```

El secreto **nunca** va escrito en el código.

## Modelo `Usuario`

Archivo `models/Usuario.js`. El modelo se llama `Usuario` (la colección queda `usuarios`).

| Campo | Tipo | Reglas |
|---|---|---|
| `nombre` | String | obligatorio |
| `email` | String | obligatorio, **único**, se guarda en **minúsculas** y sin espacios |
| `password` | String | obligatorio. Guarda el **hash**, nunca el texto plano |
| `rol` | String | `'cliente'` o `'admin'`. Por defecto `'cliente'` |

Con `timestamps: true`.

## Contrato

Todas las respuestas son JSON. Los errores usan el mismo formato que ya usa su proyecto (en la Mueblería de clase: `{ "mensaje": "..." }`).

| Método y ruta | Acceso | Éxito | Errores |
|---|---|---|---|
| `POST /api/usuarios/registro` | público | **201** con `{ _id, nombre, email, rol }` | **400** si falta nombre, email o password · **409** si el email ya existe |
| `POST /api/usuarios/login` | público | **200** con `{ token, usuario: { _id, nombre, email, rol } }` | **400** si falta email o password · **401** si las credenciales no coinciden |
| `GET /api/usuarios/perfil` | con token | **200** con `{ _id, nombre, email, rol }` | **401** sin token, con token mal formado, inválido o vencido |
| `POST /api/productos` | admin | lo que ya tenían (201) | **401** sin token · **403** con token de cliente |
| `PUT /api/productos/:id` | admin | lo que ya tenían | **401** · **403** |
| `DELETE /api/productos/:id` | admin | lo que ya tenían | **401** · **403** |

Los `GET` de productos siguen **públicos**.

## Reglas

1. **La contraseña nunca sale de la base.** Ni en el registro, ni en el login, ni en el perfil, ni en el token.
2. **Login: mismo status y mismo mensaje** si el email no existe o si la contraseña no coincide (`"Credenciales inválidas"`, 401). Si fueran distintos, cualquiera podría averiguar qué emails están registrados.
3. **El token** se firma con `JWT_SECRET`, vence (`expiresIn: '1h'`) y su payload es `{ id, rol }`. Nada más.
4. **El token viaja en el header** `Authorization: Bearer <token>`.
5. **401 vs 403.** 401 es "no sé quién sos" (sin token, token roto o vencido). 403 es "sé quién sos, pero no tenés permiso" (cliente queriendo crear un producto).
6. **Un token inválido es 401, no 500.** `jwt.verify` sin callback tira un error si el token no sirve: hay que atraparlo en el middleware.
7. **El email llega como texto.** Si `email` o `password` no son strings, 400 (así nadie manda `{ "$gt": "" }` a la consulta).

## Fases

Una fase por pedido al agente. Después de cada fase: leer el diff, aceptar y correr `npm run test:auth`.

### Fase 1: modelo y registro
`models/Usuario.js` y `POST /api/usuarios/registro` en `routes/usuarios.js`, montado en `/api/usuarios`.
**Al terminar pasan las pruebas 1 a 4.**

### Fase 2: login y token
`POST /api/usuarios/login` con `bcrypt.compare` y `jwt.sign`.
**Al terminar pasan las pruebas 1 a 6.**

### Fase 3: middleware y ruta protegida
`middleware/auth.js` con `verificarToken`: lee el header, verifica el token, guarda el payload en `req.usuario` y llama a `next()`. Ruta `GET /api/usuarios/perfil` protegida con ese middleware.
**Al terminar pasan las pruebas 1 a 9.**

### Fase 4: roles
En el mismo `middleware/auth.js`, `soloAdmin`: si `req.usuario.rol` es `'admin'`, `next()`; si no, 403. Encadenar `verificarToken, soloAdmin` en `POST`, `PUT` y `DELETE` de productos.
**Al terminar pasan las 12.**

⚠️ Después de la Fase 4, el formulario de alta y edición del front va a recibir 401: todavía no manda el token. **Es lo esperado.** Lo arreglamos en clase el jueves.

Para tener un admin: registren un usuario, cámbienle `rol` a `"admin"` desde Compass y **vuelvan a loguearse** (el rol viaja dentro del token).

## Fuera de alcance

Recuperar contraseña, confirmar email, refresh tokens, cookies HttpOnly, cerrar sesión en el servidor, límite de intentos. Si el agente propone alguno, no.
