import { useNavigate } from "react-router-dom";

function ProductDetail({ producto, onAgregar, onEliminar }) {
    // Hook de React Router para navegar entre las distintas rutas
    const navigate = useNavigate();
    const idProducto = producto.id ?? producto._id;
    const rutaImagen = producto.imagenUrl ?? producto.imagen ?? "";
    const srcImagen =
        rutaImagen.startsWith("http://") ||
        rutaImagen.startsWith("https://") ||
        rutaImagen.startsWith("/")
            ? rutaImagen
            : `/${rutaImagen}`;

    return (
        <section className="producto-detalle">
            {/* Imagen del producto */}
            <div className="detalle-imagen">
                <img src={srcImagen} alt={producto.nombre} />
            </div>

            {/* Información y características del producto */}
            <div className="detalle-info">
                <p className="detalle-categoria">MUEBLES HERMANOS JOTA</p>

                <h1>{producto.nombre}</h1>

                {producto.descripcion && (
                    <p className="detalle-descripcion">{producto.descripcion}</p>
                )}

                <p className="detalle-precio">${producto.precio.toLocaleString("es-AR")}</p>

                <p className="detalle-stock">Stock disponible: {producto.stock}</p>

                <div className="detalle-botones">
                    {/* Agregar producto al carrito */}
                    <button className="btn-comprar" onClick={() => onAgregar(producto)}>
                        Agregar al carrito
                    </button>

                    {/* Volver al catálogo */}
                    <button className="btn-volver" onClick={() => navigate("/productos")}>
                        Volver al catálogo
                    </button>

                    <button
                        className="btn-volver"
                        disabled={!idProducto}
                        onClick={() =>
                            idProducto &&
                            navigate(
                                `/admin/editar-producto/${encodeURIComponent(String(idProducto))}`
                            )
                        }
                    >
                        Editar producto
                    </button>

                    <button
                        className="btn-eliminar"
                        disabled={!idProducto}
                        onClick={() => {
                            if (!idProducto) {
                                return;
                            }

                            const confirmar = window.confirm(
                                "¿Estás seguro de que deseas eliminar este producto?"
                            );

                            if (confirmar) {
                                onEliminar(idProducto);
                            }
                        }}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
