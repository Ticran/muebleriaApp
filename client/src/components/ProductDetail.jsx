function ProductDetail({ producto, onAgregar, onVolver }) {
    return (
        <section className="producto-detalle">
            <div className="detalle-imagen">
                <img src={`/${producto.imagen}`} alt={producto.nombre} />
            </div>

            <div className="detalle-info">
                <p className="detalle-categoria">MUEBLES HERMANOS JOTA</p>

                <h1>{producto.nombre}</h1>

                <p className="detalle-precio">${producto.precio}</p>

                <p className="detalle-stock">Stock disponible: {producto.stock}</p>

                <div className="detalle-botones">
                    <button className="btn-comprar" onClick={() => onAgregar(producto)}>
                        Agregar al carrito
                    </button>

                    <button className="btn-volver" onClick={onVolver}>
                        Volver al catálogo
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
