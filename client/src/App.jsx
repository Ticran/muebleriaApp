import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Carrito from "./components/Carrito";
import ProductForm from "./components/ProductForm";

function App() {
    const location = useLocation();
    const navigate = useNavigate();

    // Estado de productos traídos del backend
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

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

    // Cada vez que cambia la ruta o el producto seleccionado, subimos el scroll arriba de todo
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname, productoSeleccionado]);

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
            eliminarDelCarrito(producto.id);
            return;
        }
        setCarrito([]);
    }

    // Función para cambiar de sección y cerrar cualquier detalle abierto
    function navegar(seccion) {
        const rutas = {
            inicio: "/",
            catalogo: "/productos",
            contacto: "/contacto",
            carrito: "/carrito",
            crearProducto: "/admin/crear-producto"
        };

        if (rutas[seccion]) {
            setProductoSeleccionado(null);
            navigate(rutas[seccion]);
        }
    }

    function agregarProductoAlCatalogo(producto) {
        const productoNormalizado = {
            ...producto,
            id: producto.id ?? producto._id,
            imagen: producto.imagen ?? producto.imagenUrl
        };

        setProductos((productosActuales) => [...productosActuales, productoNormalizado]);
    }

    function actualizarProductoEnCatalogo(producto) {
        const productoNormalizado = {
            ...producto,
            id: producto.id ?? producto._id,
            imagen: producto.imagen ?? producto.imagenUrl
        };
        const idActualizado = String(productoNormalizado.id);

        setProductoSeleccionado(null);
        setProductos((productosActuales) =>
            productosActuales.map((productoActual) =>
                String(productoActual.id ?? productoActual._id) === idActualizado
                    ? { ...productoActual, ...productoNormalizado }
                    : productoActual
            )
        );
    }

    // Calculamos la cantidad total de productos que hay en el carrito
    const cantidadCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    const estadoProductos = cargando ? (
        <section className="catalogo">
            <p className="mensaje-carga">Cargando productos...</p>
        </section>
    ) : error ? (
        <section className="catalogo">
            <p className="mensaje-error">{error}</p>
        </section>
    ) : null;

    return (
        <>
            <Navbar cantidadCarrito={cantidadCarrito} onNavegar={navegar} />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={
                            estadoProductos || (
                                <Home
                                    productos={productos}
                                    onSeleccionarProducto={setProductoSeleccionado}
                                    onAgregar={agregarAlCarrito}
                                    onNavegar={navegar}
                                />
                            )
                        }
                    />
                    <Route
                        path="/productos"
                        element={
                            estadoProductos ||
                            (productoSeleccionado ? (
                                <ProductDetail
                                    producto={productoSeleccionado}
                                    onAgregar={agregarAlCarrito}
                                    onVolver={() => {
                                        setProductoSeleccionado(null);
                                        navigate("/productos");
                                    }}
                                />
                            ) : (
                                <>
                                    {location.state?.mensaje && (
                                        <p className="mensaje-exito contenedor" role="status">
                                            {location.state.mensaje}
                                        </p>
                                    )}
                                    <ProductList
                                        productos={productos}
                                        onSeleccionarProducto={setProductoSeleccionado}
                                        onAgregar={agregarAlCarrito}
                                    />
                                </>
                            ))
                        }
                    />
                    <Route path="/contacto" element={estadoProductos || <ContactForm />} />
                    <Route
                        path="/carrito"
                        element={
                            estadoProductos || (
                                <Carrito
                                    carrito={carrito}
                                    onEliminar={eliminarDelCarrito}
                                    onComprar={comprarProducto}
                                />
                            )
                        }
                    />
                    <Route
                        path="/admin/crear-producto"
                        element={
                            <ProductForm
                                key={location.pathname}
                                onCreated={agregarProductoAlCatalogo}
                            />
                        }
                    />
                    <Route
                        path="/admin/editar-producto/:id"
                        element={
                            <ProductForm
                                key={location.pathname}
                                onUpdated={actualizarProductoEnCatalogo}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            <Footer onNavegar={navegar} />
        </>
    );
}

export default App;
