import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Carrito from "./components/Carrito";
import ProductForm from "./components/ProductForm";

function DetalleProductoRuta({ onAgregar }) {
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
                    `http://localhost:3000/api/productos/${encodeURIComponent(id)}`,
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

    return <ProductDetail producto={producto} onAgregar={onAgregar} />;
}

function App() {
    const location = useLocation();
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/productos")
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

    function agregarAlCarrito(producto) {
        setCarrito((actual) => {
            const idProducto = producto._id ?? producto.id;
            const existente = actual.find((item) => (item._id ?? item.id) === idProducto);

            if (existente) {
                return actual.map((item) =>
                    (item._id ?? item.id) === idProducto
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                );
            }

            return [...actual, { ...producto, cantidad: 1 }];
        });
    }

    function eliminarDelCarrito(id) {
        setCarrito((actual) => actual.filter((producto) => (producto._id ?? producto.id) !== id));
    }

    function comprarProducto(producto) {
        if (producto) {
            eliminarDelCarrito(producto._id ?? producto.id);
            return;
        }

        setCarrito([]);
    }

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
            <Navbar cantidadCarrito={cantidadCarrito} />

            <main>
                <Routes>
                    <Route path="/" element={estadoProductos || <Home productos={productos} />} />
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
                        element={<DetalleProductoRuta onAgregar={agregarAlCarrito} />}
                    />
                    <Route path="/contacto" element={<ContactForm />} />
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
                                carrito={carrito}
                                onEliminar={eliminarDelCarrito}
                                onComprar={comprarProducto}
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
