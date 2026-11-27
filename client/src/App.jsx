import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Carrito from "./components/Carrito";
import ProductForm from "./components/ProductForm";
import Login from "./components/Login";
import { useCart } from "./context/useCart";

const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:3000").replace(/\/$/, "");

function DetalleProductoRuta({ onAgregar, onEliminar }) {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        async function obtenerProducto() {
            setCargando(true);
            setError(null);
            setProducto(null);

            try {
                const respuesta = await fetch(
                    `${API_URL}/api/productos/${encodeURIComponent(id)}`,
                    { signal: controller.signal }
                );
                const datos = await respuesta.json();

                if (!respuesta.ok) {
                    throw new Error(datos.error?.mensaje || "No se encontró el producto.");
                }

                setProducto(datos);
            } catch (err) {
                if (!controller.signal.aborted) {
                    console.error(err);
                    setError(err instanceof Error ? err.message : "No se encontró el producto.");
                }
            } finally {
                if (!controller.signal.aborted) {
                    setCargando(false);
                }
            }
        }

        obtenerProducto();

        return () => controller.abort();
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

    return <ProductDetail producto={producto} onAgregar={onAgregar} onEliminar={onEliminar} />;
}

function App() {
    const { agregarAlCarrito, eliminarDelCarrito } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        fetch(`${API_URL}/api/productos`)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al obtener los productos");
                }
                return respuesta.json();
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    

    function agregarProductoAlCatalogo(producto) {
        const productoNormalizado = {
            ...producto,
            _id: producto._id ?? producto.id,
            imagenUrl: producto.imagenUrl ?? producto.imagen
        };

        setProductos((actuales) => [...actuales, productoNormalizado]);
    }

    function actualizarProductoEnCatalogo(producto) {
        const productoNormalizado = {
            ...producto,
            _id: producto._id ?? producto.id,
            imagenUrl: producto.imagenUrl ?? producto.imagen
        };
        const idActualizado = String(productoNormalizado._id);

        setProductos((actuales) =>
            actuales.map((actual) =>
                String(actual._id ?? actual.id) === idActualizado
                    ? { ...actual, ...productoNormalizado }
                    : actual
            )
        );
    }

    async function eliminarProducto(id) {
        const idEliminado = String(id);

        try {
            const respuesta = await fetch(
                `${API_URL}/api/productos/${encodeURIComponent(idEliminado)}`,
                { method: "DELETE" }
            );

            if (!respuesta.ok) {
                throw new Error("Error al eliminar el producto");
            }

            setProductos((actuales) =>
                actuales.filter((producto) => String(producto._id ?? producto.id) !== idEliminado)
            );
            eliminarDelCarrito(idEliminado);
            

            navigate("/productos", {
                state: { mensaje: "Producto eliminado correctamente." }
            });
        } catch (err) {
            console.error("Error al eliminar el producto:", err);
            setError("No se pudo eliminar el producto");
        }
    }

    
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
            <Navbar />

            <main>
                <Routes>
                    <Route
                        path="/"
                        element={<Home productos={productos} cargando={cargando} error={error} />}
                    />
                    <Route
                        path="/productos"
                        element={
                            estadoProductos || (
                                <>
                                    {location.state?.mensaje && (
                                        <p className="mensaje-exito contenedor" role="status">
                                            {location.state.mensaje}
                                        </p>
                                    )}
                                    <ProductList productos={productos} />
                                </>
                            )
                        }
                    />
                    <Route
                        path="/productos/:id"
                        element={
                            <DetalleProductoRuta
                                onAgregar={agregarAlCarrito}
                                onEliminar={eliminarProducto}
                            />
                        }
                    />
                    <Route path="/contacto" element={<ContactForm />} />
                    <Route path="/login" element={<Login />} />
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
                    <Route
                        path="/carrito"
                        element={
                            <Carrito
                                
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
