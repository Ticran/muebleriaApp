//javascript
// Carga los productos destacados desde el archivo JSON
async function cargarDestacados() {

    // Obtenemos los productos desde el archivo JSON
    const respuesta = await fetch("data/productos.json");
    const productos = await respuesta.json();

    // Nos quedamos solamente con los productos marcados como destacados
    // y mostramos como máximo los primeros cuatro
    const destacados = productos
        .filter(producto => producto.destacado)
        .slice(0, 4);

    // Buscamos el contenedor donde se van a mostrar los productos
    const container = document.getElementById("productos-container");

    // Recorremos los productos destacados y creamos una tarjeta para cada uno
    destacados.forEach(producto => {

        container.innerHTML += `
            <article class="producto-card">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <h3>${producto.nombre}</h3>

                <p>
                    $${producto.precio.toLocaleString("es-AR")}
                </p>

                <a href="producto.html?id=${producto.id}">
                    Ver producto
                </a>

            </article>
        `;
    });
}

// Ejecutamos la función para cargar los productos al entrar en la página
cargarDestacados();
