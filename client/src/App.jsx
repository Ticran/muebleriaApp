import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Carrito from "./components/Carrito";

function App() {
    // Estado de productos traídos del backend
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estado de navegación
    const [vista, setVista] = useState("inicio"); // "inicio" | "catalogo" | "contacto" | "carrito" --> es para saber en que vista estamos
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [carrito, setCarrito] = useState([]); // es para el carrito de compras

    // Fetch a GET /api/productos al montar el componente --> carga los productos del backend, antes lo teniamos en el estado de productos
    useEffect(() => {
        fetch("http://localhost:3000/api/productos")
            .then((res) => {
                if (!res.ok) throw new Error("Error al obtener los productos");
                return res.json();
            })
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((err) => {
                console.error(err);
                setError("No se pudieron cargar los productos");
                setCargando(false);
            });
    }, []);

    // Cada vez que cambia la vista o el producto seleccionado, subimos el scroll arriba de todo
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [vista, productoSeleccionado]);

    // Función para agregar al carrito
    function agregarAlCarrito(producto) {
        setCarrito((prev) => {
            // Buscamos si el producto ya existe en el carrito
            const productoExistente = prev.find((item) => item.id === producto.id);

            // Si ya existe, aumentamos su cantidad
            if (productoExistente) {
                return prev.map((item) =>
                    item.id === producto.id
                        ? {
                              ...item,
                              cantidad: item.cantidad + 1
                          }
                        : item
                );
            }

            // Si no existe, lo agregamos con cantidad 1
            return [
                ...prev,
                {
                    ...producto,
                    cantidad: 1
                }
            ];
        });
    }

    // Función para eliminar un producto del carrito
    function eliminarDelCarrito(id) {
        setCarrito((prev) => prev.filter((producto) => producto.id !== id));
    }

    // Función para comprar un producto o todos los productos del carrito
    function comprarProducto(producto) {
        // Si se compra un solo producto
        if (producto) {
            alert(`Compra realizada: ${producto.nombre}`);
            eliminarDelCarrito(producto.id);
            return;
        }

        // Si se compran todos los productos
        alert("Compra realizada correctamente");
        setCarrito([]);
    }

    // Función para cambiar de sección y cerrar cualquier detalle abierto
    function navegar(seccion) {
        setVista(seccion);
        setProductoSeleccionado(null); //cierra cualquier detalle abierto
    }

    // Calculamos la cantidad total de productos que hay en el carrito
    const cantidadCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    // Renderizado condicional según el estado
    let contenido;

    if (cargando) {
        contenido = (
            <section className="catalogo">
                <p className="mensaje-carga">Cargando productos...</p>
            </section>
        );
    } else if (error) {
        contenido = (
            <section className="catalogo">
                <p className="mensaje-error">{error}</p>
            </section>
        );
    } else if (productoSeleccionado) {
        // Si hay un producto elegido, mostramos su detalle
        contenido = (
            <ProductDetail
                producto={productoSeleccionado}
                onAgregar={agregarAlCarrito}
                onVolver={() => setProductoSeleccionado(null)}
            />
        );
    } else if (vista === "carrito") {
        // aca estamos en la vista del carrito
        contenido = (
            <Carrito
                carrito={carrito}
                onEliminar={eliminarDelCarrito}
                onComprar={comprarProducto}
            />
        );
    } else if (vista === "contacto") {
        // aca estamos en la vista de contacto
        contenido = <ContactForm />;
    } else if (vista === "catalogo") {
        // aca estamos en la vista de catalogo
        contenido = (
            <ProductList
                productos={productos}
                onSeleccionarProducto={setProductoSeleccionado}
                onAgregar={agregarAlCarrito}
            />
        );
    } else {
        // Por defecto: vista === "inicio"
        contenido = (
            <Home
                productos={productos}
                onSeleccionarProducto={setProductoSeleccionado}
                onAgregar={agregarAlCarrito}
                onNavegar={navegar}
            />
        );
    }

    return (
        <>
            <Navbar cantidadCarrito={cantidadCarrito} onNavegar={navegar} />

            <main>{contenido}</main>

            <Footer onNavegar={navegar} />
        </>
    );
}

export default App;
