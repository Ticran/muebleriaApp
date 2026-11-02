# Especificación: Categorías de productos

## Objetivo
Cada producto puede pertenecer a una categoría (Sillas, Mesas, Sillones, Guardado...).
El catálogo se puede filtrar por categoría.

## Modelo
- Nuevo modelo `Categoria` (models/Categoria.js): `nombre` (String, obligatorio, único, trim). Con timestamps.
- `Product` agrega `categoria`: ObjectId con `ref: 'Categoria'`. Es opcional
  (los productos viejos no la tienen).

## Contrato de la API (fuente de verdad)
| Método | Ruta | Qué hace | Éxito | Errores |
|---|---|---|---|---|
| GET | /api/categorias | Lista las categorías, por nombre | 200 | — |
| POST | /api/categorias | Crea una categoría | 201 | 400 sin nombre · 409 si ya existe |
| GET | /api/productos | Lista productos con la categoría poblada (`{ _id, nombre }`) | 200 | — |
| GET | /api/productos?categoria=:id | Solo los productos de esa categoría | 200 | 400 si el id está mal formado |
| GET | /api/productos/:id | Detalle con la categoría poblada | 200 | 400 · 404 |
| POST / PUT | /api/productos(/:id) | Aceptan `categoria` (un _id) | 201 / 200 | 400 si la categoría no existe |

## Reglas
- Si el body de POST o PUT de producto trae `categoria`, verificar que exista ANTES de guardar.
  Si no existe: 400 `{ "error": "La categoría no existe" }`.
- `populate('categoria', 'nombre')`: el front solo necesita el nombre.
- Duplicados (índice unique de MongoDB, código 11000) → 409 desde el manejador central.

## Límites negativos
- NO meter las categorías como array dentro de Product ni duplicar el nombre de la categoría en cada producto: es una referencia.
- NO crear una ruta `/api/productos/categoria/:id`: el filtro es con query string `?categoria=`.
- NO romper los endpoints que ya existen ni sus respuestas.

## Fases (una por pedido al agente, revisando entre fases)
1. **Datos:** models/Categoria.js + campo `categoria` en Product.
2. **Rutas de categorías:** routes/categorias.js (GET, POST) + montarlo en index.js + 409 en el manejador.
3. **Productos:** populate en los GET, filtro `?categoria=`, validación de categoría en POST y PUT.
4. **Seed:** crear categorías y asignarlas a los productos del array.

## Cómo se evalúa
`tests/contrato.test.js`. Con el servidor prendido: `npm test`. Tiene que dar 8 de 8.
