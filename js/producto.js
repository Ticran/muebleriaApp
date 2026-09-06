async function cargarProducto() {
    const contenedor = document.getElementById("producto-detalle");
    const idProducto = Number(new URLSearchParams(window.location.search).get("id"));

    if (!idProducto) {
        contenedor.innerHTML = "<p>No se indicó un producto.</p>";
        return;
    }

    try {
        // Carga asíncrona simulada del catálogo (Promise + setTimeout)
        const productos = await cargarProductosAsync();

        const producto = productos.find(
            item => item.id === idProducto);

        if (!producto) {
            contenedor.innerHTML = "<p>Producto seleccionado no disponible.</p>";
            return;
        }

        document.title = producto.nombre + " | Hermanos Jota";

        mostrarProducto(producto);
        configurarBotonCarrito(producto);
    } catch (error) {
        contenedor.innerHTML = "<p>No se pudo cargar el producto.</p>";
        console.error("Error al cargar el producto:", error);
    }
}

// Construye el detalle del producto creando los elementos con DOM,
// evitando inyectar HTML con datos provenientes del JSON.
function mostrarProducto(producto) {
    const contenedor = document.getElementById("producto-detalle");
    contenedor.textContent = "";

    const articulo = document.createElement("article");
    articulo.classList.add("producto-detalle");

    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    const info = document.createElement("div");
    info.classList.add("producto-info");

    const titulo = document.createElement("h1");
    titulo.textContent = producto.nombre;
    info.appendChild(titulo);

    if (producto.precio) {
        const precio = document.createElement("p");
        precio.classList.add("producto-precio");
        precio.textContent = "$" + producto.precio.toLocaleString("es-AR");
        info.appendChild(precio);
    }

    if (producto.descripcion) {
        info.appendChild(crearSubtitulo("Descripción"));
        info.appendChild(crearParrafo(producto.descripcion));
    }

    if (producto.medidas) {
        info.appendChild(crearSubtitulo("Medidas"));
        info.appendChild(crearParrafo(producto.medidas));
    }
    
    if (producto.material) {
        info.appendChild(crearSubtitulo("Material"));
        info.appendChild(crearParrafo(producto.material));
    }

    if (producto.acabado) {
        info.appendChild(crearSubtitulo("Acabado"));
        info.appendChild(crearParrafo(producto.acabado));
    }

    if (producto.peso) {
        info.appendChild(crearSubtitulo("peso"));
        info.appendChild(crearParrafo(producto.peso));
    }

    if (producto.capacidad) {
        info.appendChild(crearSubtitulo("Capacidad"));
        info.appendChild(crearParrafo(producto.capacidad));
    }

    if (producto.modulares) {
        info.appendChild(crearSubtitulo("Modulares"));
        info.appendChild(crearParrafo(producto.modulares));
    }

    if (producto.tapizado) {
        info.appendChild(crearSubtitulo("Tapizado"));
        info.appendChild(crearParrafo(producto.tapizado));
    }

    if (producto.confort) {
        info.appendChild(crearSubtitulo("Confort"));
        info.appendChild(crearParrafo(producto.confort));
    }

    if (producto.rotacion) {
        info.appendChild(crearSubtitulo("Rotacion"));
        info.appendChild(crearParrafo(producto.rotacion));
    }

    if (producto.garantia) {
        info.appendChild(crearSubtitulo("Garantia"));
        info.appendChild(crearParrafo(producto.garantia));
    }

    if (producto.carga_maxima) {
        info.appendChild(crearSubtitulo("Carga maxima"));
        info.appendChild(crearParrafo(producto.carga_maxima));
    }

    if (producto.almacenamiento) {
        info.appendChild(crearSubtitulo("Almacenamiento"));
        info.appendChild(crearParrafo(producto.almacenamiento));
    }

    if (producto.caracteristicas) {
        info.appendChild(crearSubtitulo("Caracteristicas"));
        info.appendChild(crearParrafo(producto.caracteristicas));
    }

    if (producto.estructura) {
        info.appendChild(crearSubtitulo("Estructura"));
        info.appendChild(crearParrafo(producto.estructura));
    }

    if (producto.relleno) {
        info.appendChild(crearSubtitulo("Relleno"));
        info.appendChild(crearParrafo(producto.relleno));
    }

    if (producto.sostenibilidad) {
        info.appendChild(crearSubtitulo("Sostenibilidad"));
        info.appendChild(crearParrafo(producto.sostenibilidad));
    }

    if (producto.extension) {
        info.appendChild(crearSubtitulo("Extensión"));
        info.appendChild(crearParrafo(producto.extension));
    }

    if (producto.apilables) {
        info.appendChild(crearSubtitulo("Apilables"));
        info.appendChild(crearParrafo(producto.apilables));
    }

    if (producto.incluye) {
        info.appendChild(crearSubtitulo("Incluye"));
        info.appendChild(crearParrafo(producto.incluye));
    }

    if (producto.cables) {
        info.appendChild(crearSubtitulo("Cables"));
        info.appendChild(crearParrafo(producto.cables));
    }

    if (producto.regulacion) {
        info.appendChild(crearSubtitulo("Regulación"));
        info.appendChild(crearParrafo(producto.regulacion));
    }

    if (producto.certificacion) {
        info.appendChild(crearSubtitulo("Certificación"));
        info.appendChild(crearParrafo(producto.certificacion));
    }

    const boton = document.createElement("button");
    boton.type = "button";
    boton.id = "aCarrito";
    boton.textContent = "Añadir al carrito";
    info.appendChild(boton);

    const volver = document.createElement("a");
    volver.href = "productos.html";
    volver.textContent = "Volver al catálogo";
    info.appendChild(volver);

    articulo.append(imagen, info);
    contenedor.appendChild(articulo);
}

function crearSubtitulo(texto) {
    const subtitulo = document.createElement("h2");
    subtitulo.textContent = texto;
    return subtitulo;
}

function crearParrafo(texto) {
    const parrafo = document.createElement("p");
    parrafo.textContent = texto;
    return parrafo;
}

// Agrega el producto al carrito y actualiza el contador del header.
function configurarBotonCarrito(producto) {
    const agregarCarrito = document.getElementById("aCarrito");

    agregarCarrito.addEventListener("click", function () {
        // Leemos el carrito de forma segura (ver carrito.js)
        const carrito = leerCarrito();
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardamos el carrito en el localStorage

        // Actualizamos el contador y mostramos por consola los productos añadidos
        actualizarCarrito();

        // Feedback visual en el propio botón (en lugar del alert nativo del navegador)
        agregarCarrito.textContent = "✓ ¡Añadido!";
        setTimeout(() => {
            agregarCarrito.textContent = "Añadir al carrito";
        }, 1800);
    });
}

cargarProducto();