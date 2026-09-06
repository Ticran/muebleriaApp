let todosLosProductos = [];

async function cargarProductos(listaProductos = null) {
    const container = document.getElementById("productos-container");

    try {
        // Si no recibimos una lista, cargamos los productos del array de js/datos.js
        if (!listaProductos) {

            container.innerHTML = `<p class="mensaje-carga">🪑 Preparando nuestro catálogo...</p>`;

            // Carga asíncrona simulada del catálogo (Promise + setTimeout)
            todosLosProductos = await cargarProductosAsync();
            listaProductos = todosLosProductos;
        }

        renderProductos(listaProductos);
    } catch (error) {
        container.textContent = "No se pudieron cargar los productos. Intentalo nuevamente más tarde.";
        console.error("Error al cargar los productos:", error);
    }
}

// Muestra los productos en el contenedor.
// Si la lista está vacía, muestra un mensaje de "sin resultados".
function renderProductos(listaProductos) {
    const container = document.getElementById("productos-container");
    container.textContent = "";

    if (listaProductos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("sin-resultados");
        mensaje.textContent = "No se encontraron productos que coincidan con la búsqueda.";
        container.appendChild(mensaje);
        return;
    }

    // Recorremos los productos y creamos una tarjeta para cada uno
    listaProductos.forEach(producto => {
        container.appendChild(crearTarjeta(producto));
    });
}

// Crea la tarjeta de un producto agregando cada valor con textContent,
// de esta manera se evita inyectar HTML con datos del catálogo (js/datos.js).
function crearTarjeta(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto-card");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.loading = "lazy";

    const nombre = document.createElement("h2");
    nombre.textContent = producto.nombre;

    tarjeta.append(imagen, nombre);

    if (producto.precio) {
        const precio = document.createElement("p");
        precio.textContent = "$" + producto.precio.toLocaleString("es-AR");
        tarjeta.appendChild(precio);
    }

    const enlace = document.createElement("a");
    enlace.href = `producto.html?id=${producto.id}`;
    enlace.textContent = "Ver producto";
    tarjeta.appendChild(enlace);

    return tarjeta;
}

const buscador = document.getElementById("buscador");

if (buscador) {
    buscador.addEventListener("input", function () {

        const textoBuscado = buscador.value.toLowerCase();

        const productosFiltrados = todosLosProductos.filter(producto =>
            producto.nombre.toLowerCase().includes(textoBuscado)
        );

        // Mostramos los productos filtrados
        cargarProductos(productosFiltrados);
    });
}


cargarProductos();