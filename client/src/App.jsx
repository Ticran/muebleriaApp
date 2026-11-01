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
function DetalleProductoRuta({ onAgregar }) {
    const { id } = useParams();

    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Consultamos el producto al backend
    useEffect(() => {
        async function obtenerProducto() {
            setCargando(true);
            setError(null);
            setProducto(null);

            try {
                const respuesta = await fetch(`http://localhost:3000/api/productos/${id}`);

                if (!respuesta.ok) {
                    throw new Error("No se encontró el producto");
                }

                const datos = await respuesta.json();
                setProducto(datos);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setCargando(false);
            }
        }

        obtenerProducto();
    }, [id]);

    if (cargando) {
        return (
            <section className="catalogo">
                <p className="mensaje-carga">Cargando producto...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="catalogo">
                <p className="mensaje-error">{error}</p>
            </section>
        );
    }

    return <ProductDetail producto={producto} onAgregar={onAgregar} />;
}

function App() {
    // Estado de productos traídos del backend
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Estado del carrito
    const [carrito, setCarrito] = useState([]);

    // Hooks de React Router
    const navigate = useNavigate();
    const location = useLocation();

    // Carga de productos desde MongoDB a través del backend
    useEffect(() => {
        fetch("http://localhost:3000/api/productos")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error al obtener los productos");
                }
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

    // Subir el scroll al cambiar de ruta
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Agregar un producto al carrito
    function agregarAlCarrito(producto) {
        setCarrito((prev) => {
            const productoExistente = prev.find((item) => item._id === producto._id);

            if (productoExistente) {
                return prev.map((item) =>
                    item._id === producto._id
                        ? {
                              ...item,
                              cantidad: item.cantidad + 1
                          }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...producto,
                    cantidad: 1
                }
            ];
        });
    }

    // Eliminar un producto del carrito
    function eliminarDelCarrito(id) {
        setCarrito((prev) => prev.filter((producto) => producto._id !== id));
    }

    // Comprar un producto o todo el carrito
    function comprarProducto(producto) {
        if (producto) {
            eliminarDelCarrito(producto._id);
            return;
        }

        setCarrito([]);
    }

    // Cantidad total de productos en el carrito
    const cantidadCarrito = carrito.reduce((total, producto) => total + producto.cantidad, 0);

    // Navegar al detalle de un producto
    function seleccionarProducto(producto) {
        navigate(`/productos/${producto._id}`);
    }

    return (
        <>
            <Navbar cantidadCarrito={cantidadCarrito} />

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

                    {/* Detalle de un producto */}
                    <Route
                        path="/productos/:id"
                        element={<DetalleProductoRuta onAgregar={agregarAlCarrito} />}
                    />

                    {/* Contacto */}
                    <Route path="/contacto" element={<ContactForm />} />

                    {/* Administración: pendiente T11 */}
                    <Route
                        path="/admin/crear-producto"
                        element={
                            <section className="catalogo">
                                <h1>Crear producto</h1>
                                <p>Formulario de creación de productos próximamente.</p>
                            </section>
                        }
                    />

                    {/* Carrito */}
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

                    {/* Redirección de rutas inexistentes */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
