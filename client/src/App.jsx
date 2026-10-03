import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";

function App() {
    // Estado de productos traídos del backend
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estado de navegación
    const [vista, setVista] = useState("inicio"); // "inicio" | "catalogo" | "contacto" --> es para saber en que vista estamos
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

    // Función para agregar al carrito
    function agregarAlCarrito(producto) {
        setCarrito((prev) => [...prev, producto]);
    }

    // Función para cambiar de sección y cerrar cualquier detalle abierto
    function navegar(seccion) {
        setVista(seccion);
        setProductoSeleccionado(null); //cierra cualquier detalle abierto
    }

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
            <Navbar cantidadCarrito={carrito.length} onNavegar={navegar} />
            <main>{contenido}</main>
            <Footer />
        </>
    );
}

export default App;
