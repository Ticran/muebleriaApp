function ProductCard({ producto, onSeleccionar }) {
    return (
        <div className="product-card">
            <img src={`/${producto.imagen}`} alt={producto.nombre} />

            <h3>{producto.nombre}</h3>

            <p className="precio">${producto.precio.toLocaleString("es-AR")}</p>

            <div className="acciones-card">
                <button onClick={() => onSeleccionar(producto)}>Ver Detalle</button>
            </div>
        </div>
    );
}

export default ProductCard;
