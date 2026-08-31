const productos = [
    {
        id: 1,
        nombre: "Aparador Uspallata",
        imagen: "imagenes/Aparador Uspallata.png"
    },
    {
        id: 2,
        nombre: "Biblioteca Recoleta",
        imagen: "imagenes/Biblioteca Recoleta.png"
    },
    {
        id: 3,
        nombre: "Butaca Mendoza",
        imagen: "imagenes/Butaca Mendoza.png"
    },
    {
        id: 4,
        nombre: "Sillón Copacabana",
        imagen: "imagenes/Sillón Copacabana.png"
    },
    {
        id: 5,
        nombre: "Mesa de Centro Araucaria",
        imagen: "imagenes/Mesa de Centro Araucaria.png"
    },
    {
        id: 6,
        nombre: "Mesa de Noche Aconcagua",
        imagen: "imagenes/Mesa de Noche Aconcagua.png"
    },
    {
        id: 7,
        nombre: "Sofá Patagonia",
        imagen: "imagenes/Sofá Patagonia.png"
    },
    {
        id: 8,
        nombre: "Mesa Comedor Pampa",
        imagen: "imagenes/Mesa Comedor Pampa.png"
    },
    {
        id: 9,
        nombre: "Sillas Córdoba",
        imagen: "imagenes/Sillas Córdoba.png"
    },
    {
        id: 10,
        nombre: "Escritorio Costa",
        precio: 320000,
        imagen: "imagenes/Escritorio Costa.png"
    },
    {
        id: 11,
        nombre: "Silla de Trabajo Belgrano",
        imagen: "imagenes/Silla de Trabajo Belgrano.png"
    }
];


async function cargarProductos(listaProductos = productos) {

    const container = document.getElementById("productos-container");

    await new Promise(resolve => setTimeout(resolve, 500));

    container.innerHTML = "";

    listaProductos.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("producto-card");

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">

            <h2>${producto.nombre}</h2>

            ${
                producto.precio
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

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBuscado)
    );

    cargarProductos(productosFiltrados);
});


cargarProductos();