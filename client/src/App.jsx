import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Carrito from "./components/Carrito";

// Componente auxiliar para mostrar el detalle según el ID de la URL
function DetalleProductoRuta({ productos, cargando, error, onAgregar }) {
    // Obtenemos el ID del producto desde los parámetros de la ruta
    const { id } = useParams();

    // Buscamos el producto correspondiente al ID recibido
    const producto = productos.find((item) => String(item.id) === id);

    // Mostramos un mensaje mientras se cargan los productos
    if (cargando) {
        return (
            <section className="catalogo">
                <p className="mensaje-carga">Cargando productos...</p>
            </section>
        );
    }

    // Mostramos un mensaje si ocurrió un error al cargar los productos
    if (error) {
        return (
            <section className="catalogo">
                <p className="mensaje-error">{error}</p>
            </section>
        );
    }

    // Si no encontramos el producto, mostramos un mensaje
    if (!producto) {
        return (
            <section className="catalogo">
                <p className="mensaje-error">No se encontró el producto solicitado.</p>
            </section>
        );
    }

    // Si encontramos el producto, mostramos su detalle
    return <ProductDetail producto={producto} onAgregar={onAgregar} />;
}

function App() {
    // Estado de productos traídos del backend
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estado del carrito de compras
    const [carrito, setCarrito] = useState([]);

    // Hooks de React Router para navegar y detectar cambios de ruta
    const navigate = useNavigate();
    const location = useLocation();

    // Fetch a GET /api/productos al montar el componente
    // Carga los productos desde el backend
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

    // Cada vez que cambia la ruta, subimos el scroll arriba de todo
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Función para agregar un producto al carrito
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

        // Si se compra todo el carrito, lo vaciamos
        setCarrito([]);
    }

    // Calculamos la cantidad total de productos que hay en el carrito
    const cantidadCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    // Función para navegar al detalle de un producto desde la página de inicio
    function seleccionarProducto(producto) {
        navigate(`/productos/${producto.id}`);
    }

    return (
        <>
            {/* Barra de navegación: muestra la cantidad de productos del carrito */}
            <Navbar cantidadCarrito={cantidadCarrito} />

            {/* Definición de las rutas de la aplicación */}
            <main>
                <Routes>
                    {/* Página de inicio */}
                    <Route
                        path="/"
                        element={
                            cargando ? (
                                <section className="catalogo">
                                    <p className="mensaje-carga">Cargando productos...</p>
                                </section>
                            ) : error ? (
                                <section className="catalogo">
                                    <p className="mensaje-error">{error}</p>
                                </section>
                            ) : (
                                <Home
                                    productos={productos}
                                    onSeleccionarProducto={seleccionarProducto}
                                    onAgregar={agregarAlCarrito}
                                />
                            )
                        }
                    />

                    {/* Catálogo de productos */}
                    <Route
                        path="/productos"
                        element={
                            cargando ? (
                                <section className="catalogo">
                                    <p className="mensaje-carga">Cargando productos...</p>
                                </section>
                            ) : error ? (
                                <section className="catalogo">
                                    <p className="mensaje-error">{error}</p>
                                </section>
                            ) : (
                                <ProductList productos={productos} />
                            )
                        }
                    />

                    {/* Detalle de un producto según su ID */}
                    <Route
                        path="/productos/:id"
                        element={
                            <DetalleProductoRuta
                                productos={productos}
                                cargando={cargando}
                                error={error}
                                onAgregar={agregarAlCarrito}
                            />
                        }
                    />

                    {/* Página de contacto */}
                    <Route path="/contacto" element={<ContactForm />} />

                    {/* Página de administración: pendiente de implementar el formulario T11 */}
                    <Route
                        path="/admin/crear-producto"
                        element={
                            <section className="catalogo">
                                <h1>Crear producto</h1>
                                <p>Formulario de creación de productos próximamente.</p>
                            </section>
                        }
                    />

                    {/* Página del carrito de compras */}
                    <Route
                        path="/carrito"
                        element={
                            <Carrito
                                carrito={carrito}
                                onEliminar={eliminarDelCarrito}
                                onComprar={comprarProducto}
                            />
                        }
                    />

                    {/* Si la URL no existe, redirigimos al inicio */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {/* Pie de página */}
            <Footer />
        </>
    );
}

export default App;
