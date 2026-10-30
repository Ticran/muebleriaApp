import { useNavigate } from "react-router-dom";

function ProductDetail({ producto, onAgregar }) {
    // Hook de React Router para navegar entre las distintas rutas
    const navigate = useNavigate();

    return (
        <section className="producto-detalle">
            {/* Imagen del producto */}
            <div className="detalle-imagen">
                <img src={`/${producto.imagen}`} alt={producto.nombre} />
            </div>

            {/* Información y características del producto */}
            <div className="detalle-info">
                <p className="detalle-categoria">MUEBLES HERMANOS JOTA</p>

                <h1>{producto.nombre}</h1>

                <p className="detalle-precio">${producto.precio}</p>

                <p className="detalle-stock">Stock disponible: {producto.stock}</p>

                <div className="detalle-botones">
                    {/* Permite agregar el producto seleccionado al carrito */}
                    <button className="btn-comprar" onClick={() => onAgregar(producto)}>
                        Agregar al carrito
                    </button>

                    {/* navigate permite volver al catálogo sin recargar la aplicación */}
                    <button className="btn-volver" onClick={() => navigate("/productos")}>
                        Volver al catálogo
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
