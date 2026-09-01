async function carProducto() {
    const URL = "data/productos.json";
    const contenedor = document.getElementById("producto-detalle");
    const idProducto = Number(new URLSearchParams(window.location.search).get("id"));



    if (!idProducto) {
        contenedor.innerHTML = 
        "<p>No se indicó un producto.</p>";
        return;
        
    }

    try {
        const respuesta = await fetch(URL);

        const productos = await respuesta.json();

        const producto = productos.find(
            item => item.id === idProducto);

        if (!producto) {
            contenedor.innerHTML = "<p>Producto selecionado no disponible.</p>";
            return;
        }

        document.title = producto.nombre + " | Hermanos Jota";

        const precio = producto.precio
            ? `<p>$${producto.precio.toLocaleString("es-AR")}</p>`
            : "";

        const descripcion = producto.descripcion
            ? `<p>${producto.descripcion}</p>`
            : `<p>Este producto no tiene descripción cargada.</p>`;

        contenedor.innerHTML = `
            <article class="producto-detalle">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >

                <div class="producto-info">

                    <h1>${producto.nombre}</h1>

                    ${precio}

                    <h2>Descripción</h2>

                    ${descripcion}
                    <h2>Material</h2>
                    <p>${producto.material}</p>
                    <h2>Fabricación</h2>
                    <p>${producto.fabricacion}</p>
                    

                    <button id="aCarrito">Añadir al carrito</button>


                    <a href= "productos.html">
                        Volver al catálogo
                    </a>

                </div>

            </article>
        `;
        const agregarCarrito = document.getElementById("aCarrito");
        agregarCarrito.addEventListener("click", function () {            
            let carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];
            carrito.push(producto);
            localStorage.setItem(
                "carrito",
                JSON.stringify(carrito));
                alert("Producto añadido al carrito");
            });
} catch (error) {

        contenedor.innerHTML = `
            <p>No se pudo cargar el producto.</p>
        `;
    }
}

carProducto();

