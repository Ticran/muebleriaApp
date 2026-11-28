import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function resolverImagen(producto) {
    const ruta = producto.imagenUrl ?? producto.imagen ?? "";
    if (!ruta) return "/imagenes/logo.svg";
    if (ruta.startsWith("http://") || ruta.startsWith("https://") || ruta.startsWith("/")) {
        return ruta;
    }
    return `/${ruta}`;
}

function formatearIdCorto(id) {
    const texto = String(id || "");
    return texto.length > 4 ? `#${texto.slice(-4).toUpperCase()}` : `#${texto}`;
}

function AdminPanel({ productos = [], cargando = false, error = null, onEliminar }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [categoriaActiva, setCategoriaActiva] = useState("todas");
    const [eliminandoId, setEliminandoId] = useState(null);
    const [mensajeExito, setMensajeExito] = useState(location.state?.mensaje || "");
    const [errorAccion, setErrorAccion] = useState("");

    const categoriasDisponibles = useMemo(() => {
        const unicas = new Set();
        productos.forEach((p) => {
            if (p.categoria?.nombre) {
                unicas.add(p.categoria.nombre);
            }
        });
        return Array.from(unicas).sort((a, b) => a.localeCompare(b, "es"));
    }, [productos]);

    const conteos = useMemo(() => {
        let disponibles = 0;
        let bajoStock = 0;
        let sinStock = 0;

        productos.forEach((p) => {
            const stock = Number(p.stock) || 0;
            if (stock <= 0) sinStock += 1;
            else if (stock <= 3) bajoStock += 1;
            else disponibles += 1;
        });

        return {
            todos: productos.length,
            disponibles,
            bajoStock,
            sinStock
        };
    }, [productos]);

    const productosFiltrados = useMemo(() => {
        const termino = busqueda.trim().toLowerCase();

        return productos.filter((producto) => {
            const stock = Number(producto.stock) || 0;

            if (filtroEstado === "disponible" && stock <= 3) return false;
            if (filtroEstado === "bajo" && !(stock > 0 && stock <= 3)) return false;
            if (filtroEstado === "agotado" && stock > 0) return false;

            if (categoriaActiva !== "todas") {
                const cat = producto.categoria?.nombre || "";
                if (cat !== categoriaActiva) return false;
            }

            if (!termino) return true;

            const nombre = (producto.nombre || "").toLowerCase();
            const idTexto = String(producto._id ?? producto.id ?? "").toLowerCase();
            return nombre.includes(termino) || idTexto.includes(termino);
        });
    }, [productos, busqueda, filtroEstado, categoriaActiva]);

    async function handleEliminar(producto) {
        const idProducto = producto._id ?? producto.id;
        if (!idProducto || eliminandoId) return;

        const confirmar = window.confirm(
            `¿Estás seguro de que deseas eliminar "${producto.nombre}"?`
        );
        if (!confirmar) return;

        setEliminandoId(String(idProducto));
        setErrorAccion("");
        setMensajeExito("");

        try {
            await onEliminar(idProducto, { redirigir: false });
            setMensajeExito(`"${producto.nombre}" fue eliminado del catálogo.`);
        } catch (err) {
            setErrorAccion(err instanceof Error ? err.message : "No se pudo eliminar el producto.");
        } finally {
            setEliminandoId(null);
        }
    }

    const hayFiltrosActivos =
        busqueda.trim() !== "" || filtroEstado !== "todos" || categoriaActiva !== "todas";

    return (
        <section className="admin-panel contenedor">
            {/* Banner superior oscuro estilo dashboard moderno en paleta Hermanos Jota */}
            <header className="admin-hero">
                <div className="admin-hero-top">
                    <div>
                        <p className="admin-hero-kicker">Gestión de tienda</p>
                        <h1>Productos</h1>
                    </div>

                    <Link to="/admin/crear-producto" className="admin-btn-nuevo">
                        + Nuevo producto
                    </Link>
                </div>

                <div className="admin-hero-filtros" role="group" aria-label="Filtrar por estado">
                    <button
                        type="button"
                        className={`admin-pill${filtroEstado === "todos" ? " activa" : ""}`}
                        onClick={() => setFiltroEstado("todos")}
                    >
                        Todos <span className="admin-pill-count">{conteos.todos}</span>
                    </button>

                    <button
                        type="button"
                        className={`admin-pill${filtroEstado === "disponible" ? " activa" : ""}`}
                        onClick={() => setFiltroEstado("disponible")}
                    >
                        <span className="admin-dot dot-ok" aria-hidden="true"></span>
                        Disponible <span className="admin-pill-count">{conteos.disponibles}</span>
                    </button>

                    <button
                        type="button"
                        className={`admin-pill${filtroEstado === "bajo" ? " activa" : ""}`}
                        onClick={() => setFiltroEstado("bajo")}
                    >
                        <span className="admin-dot dot-bajo" aria-hidden="true"></span>
                        Stock bajo <span className="admin-pill-count">{conteos.bajoStock}</span>
                    </button>

                    <button
                        type="button"
                        className={`admin-pill${filtroEstado === "agotado" ? " activa" : ""}`}
                        onClick={() => setFiltroEstado("agotado")}
                    >
                        <span className="admin-dot dot-agotado" aria-hidden="true"></span>
                        Sin stock <span className="admin-pill-count">{conteos.sinStock}</span>
                    </button>
                </div>
            </header>

            {mensajeExito && (
                <p className="mensaje-exito admin-alerta" role="status">
                    {mensajeExito}
                </p>
            )}

            {errorAccion && (
                <p className="mensaje-error admin-alerta" role="alert">
                    {errorAccion}
                </p>
            )}

            {/* Tarjeta limpia inferior con la lista de productos */}
            <div className="admin-lista-card">
                <div className="admin-lista-cabecera">
                    <div>
                        <h2>Lista de productos</h2>
                        <p className="admin-lista-subtitulo">
                            Mostrando {productosFiltrados.length} de {productos.length} muebles
                            activos en el catálogo
                        </p>
                    </div>

                    <div className="admin-controles">
                        <div className="admin-buscador">
                            <label htmlFor="admin-buscar" className="sr-only">
                                Buscar producto
                            </label>
                            <input
                                id="admin-buscar"
                                type="search"
                                placeholder="Buscar producto..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                        </div>

                        {categoriasDisponibles.length > 0 && (
                            <div className="admin-select-wrapper">
                                <label htmlFor="admin-categoria" className="sr-only">
                                    Filtrar por categoría
                                </label>
                                <select
                                    id="admin-categoria"
                                    value={categoriaActiva}
                                    onChange={(e) => setCategoriaActiva(e.target.value)}
                                >
                                    <option value="todas">Todas las categorías</option>
                                    {categoriasDisponibles.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {cargando ? (
                    <p className="mensaje-carga">Cargando productos...</p>
                ) : error ? (
                    <p className="mensaje-error">{error}</p>
                ) : productosFiltrados.length === 0 ? (
                    <div className="admin-vacio">
                        <p>No se encontraron productos con esos filtros.</p>
                        {hayFiltrosActivos && (
                            <button
                                type="button"
                                className="btn-volver"
                                onClick={() => {
                                    setBusqueda("");
                                    setFiltroEstado("todos");
                                    setCategoriaActiva("todas");
                                }}
                            >
                                Limpiar filtros
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="admin-tabla-wrapper">
                        <table className="admin-tabla">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Producto</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado</th>
                                    <th className="admin-col-acciones">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productosFiltrados.map((producto) => {
                                    const idProducto = String(producto._id ?? producto.id);
                                    const stock = Number(producto.stock) || 0;
                                    const claseStock =
                                        stock <= 0
                                            ? "stock-agotado"
                                            : stock <= 3
                                              ? "stock-bajo"
                                              : "stock-ok";
                                    const textoEstado =
                                        stock <= 0
                                            ? "Sin stock"
                                            : stock <= 3
                                              ? "Stock bajo"
                                              : "Disponible";
                                    const estaEliminando = eliminandoId === idProducto;

                                    return (
                                        <tr key={idProducto}>
                                            <td
                                                data-label="ID"
                                                className="admin-id"
                                                title={idProducto}
                                            >
                                                {formatearIdCorto(idProducto)}
                                            </td>

                                            <td data-label="Producto">
                                                <div className="admin-producto-celda">
                                                    <img
                                                        src={resolverImagen(producto)}
                                                        alt={producto.nombre}
                                                        className="admin-thumb"
                                                    />
                                                    <strong className="admin-producto-nombre">
                                                        {producto.nombre}
                                                    </strong>
                                                </div>
                                            </td>

                                            <td data-label="Categoría" className="admin-categoria">
                                                {producto.categoria?.nombre || "Sin categoría"}
                                            </td>

                                            <td data-label="Precio" className="admin-precio">
                                                $
                                                {Number(producto.precio || 0).toLocaleString(
                                                    "es-AR"
                                                )}
                                            </td>

                                            <td data-label="Stock" className="admin-stock-num">
                                                {stock} u.
                                            </td>

                                            <td data-label="Estado">
                                                <span className={`admin-badge-stock ${claseStock}`}>
                                                    {textoEstado}
                                                </span>
                                            </td>

                                            <td
                                                data-label="Acciones"
                                                className="admin-col-acciones"
                                            >
                                                <div className="admin-acciones">
                                                    <button
                                                        type="button"
                                                        className="admin-btn-accion admin-btn-ver"
                                                        onClick={() =>
                                                            navigate(
                                                                `/productos/${encodeURIComponent(idProducto)}`
                                                            )
                                                        }
                                                    >
                                                        Ver producto
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="admin-btn-accion admin-btn-editar"
                                                        onClick={() =>
                                                            navigate(
                                                                `/admin/editar-producto/${encodeURIComponent(idProducto)}`
                                                            )
                                                        }
                                                    >
                                                        Editar
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="admin-btn-accion admin-btn-eliminar"
                                                        disabled={estaEliminando}
                                                        onClick={() => handleEliminar(producto)}
                                                    >
                                                        {estaEliminando ? "..." : "Eliminar"}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}

export default AdminPanel;
