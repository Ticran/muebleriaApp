// Carga los productos destacados desde el archivo JSON
async function cargarDestacados() {

    // Buscamos el contenedor donde se van a mostrar los productos
    const container = document.getElementById("productos-container");

    try {
        // Obtenemos los productos desde el archivo JSON
        const respuesta = await fetch("data/productos.json");
        const productos = await respuesta.json();

        // Nos quedamos solamente con los productos marcados como destacados
        // y mostramos como máximo los primeros cuatro
        const destacados = productos
            .filter(producto => producto.destacado)
            .slice(0, 4);


        // Limpiamos el contenedor
        container.innerHTML = "";
        // Recorremos los productos destacados y creamos una tarjeta para cada uno (manteniendo consistencia con el catalogo.js)
        destacados.forEach(producto => {
            // Creamos una tarjeta
            const tarjeta = document.createElement("article");
            tarjeta.classList.add("producto-card");
            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                ${producto.precio
                    ? `<p>$${producto.precio.toLocaleString("es-AR")}</p>`
                    : ""
                }
                <a href="producto.html?id=${producto.id}">
                    Ver producto
                </a>
            `;
            container.appendChild(tarjeta);
        });
    } catch (error) {
        container.innerHTML = `<p>No se pudieron cargar los productos destacados.</p>`;
        console.error("Error al cargar los productos destacados:", error);
    }
}

// Ejecutamos la función para cargar los productos al entrar en la página
cargarDestacados();
