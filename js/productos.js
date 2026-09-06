// Carga los productos destacados desde el array de productos (js/datos.js)
async function cargarDestacados() {

    // Buscamos el contenedor donde se van a mostrar los productos
    const container = document.getElementById("productos-container");

    try {
        // Carga asíncrona simulada del catálogo (Promise + setTimeout)
        const productos = await cargarProductosAsync();

        // Nos quedamos solamente con los productos marcados como destacados
        // y mostramos como máximo los primeros cuatro
        const destacados = productos
            .filter(producto => producto.destacado)
            .slice(0, 4);

        // Limpiamos el contenedor
        container.textContent = "";
        // Recorremos los productos destacados y creamos una tarjeta para cada uno
        destacados.forEach(producto => {
            container.appendChild(crearTarjeta(producto));
        });
    } catch (error) {
        container.textContent = "No se pudieron cargar los productos destacados.";
        console.error("Error al cargar los productos destacados:", error);
    }
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

// Ejecutamos la función para cargar los productos al entrar en la página
cargarDestacados();
