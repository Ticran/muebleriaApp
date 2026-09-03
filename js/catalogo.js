let todosLosProductos = [];

async function cargarProductos(listaProductos = null) {
    const container = document.getElementById("productos-container");
    if (!listaProductos) {
        const respuesta = await fetch("data/productos.json");
        todosLosProductos = await respuesta.json();
        listaProductos = todosLosProductos;
    }
    // Esperamos 500ms para que se vea el efecto de carga (simulacion asincronica)
    await new Promise(resolve => setTimeout(resolve, 500));
    // Limpiamos el contenedor
    container.innerHTML = "";
    // Recorremos los productos y creamos una tarjeta para cada uno
    listaProductos.forEach(producto => {
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
}

const buscador = document.getElementById("buscador");

buscador.addEventListener("input", function () {

    const textoBuscado = buscador.value.toLowerCase();

    const productosFiltrados = todosLosProductos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBuscado)
    );

    // Cargamos los productos filtrados
    cargarProductos(productosFiltrados);
});


cargarProductos();