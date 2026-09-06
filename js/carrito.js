// Lógica del carrito de compras de la barra de navegación.
// Suma los productos añadidos al carrito y los muestra por consola.

// Lee el carrito del localStorage de forma segura.
// Si no existe, está corrupto o no es un array, devuelve un array vacío.
function leerCarrito() {
    try {
        const carrito = JSON.parse(localStorage.getItem("carrito"));
        return Array.isArray(carrito) ? carrito : [];
    } catch (error) {
        console.warn("Carrito inválido en localStorage. Se reinicia a un array vacío.", error);
        return [];
    }
}

function actualizarCarrito() {
    // Obtenemos el carrito (si no existe o está corrupto, se usa un array vacío)
    const carrito = leerCarrito();

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