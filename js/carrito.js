// Lógica del carrito de compras de la barra de navegación.
// Suma los productos añadidos al carrito y los muestra por consola.

function actualizarCarrito() {
    // Obtenemos el carrito del localStorage (si no existe, se crea un array vacío)
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    // Sumamos la cantidad total de productos añadidos
    const cantidadProductos = carrito.length;

    // Actualizamos el contador de la barra de navegación
    const contador = document.getElementById("carrito-contador");
    if (contador) {
        contador.textContent = cantidadProductos;
    }

    // Mostramos por consola los productos añadidos y la cantidad total
    console.log("Productos añadidos al carrito:", carrito);
    console.log("Cantidad total de productos en el carrito:", cantidadProductos);

    return cantidadProductos;
}

// Actualizamos el contador al cargar la página
actualizarCarrito();