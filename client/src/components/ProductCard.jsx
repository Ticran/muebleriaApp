function ProductCard({ producto, onSeleccionar }) {
    return (
        <div className="product-card">
            {/* Imagen del producto */}
            <img src={`/${producto.imagen}`} alt={producto.nombre} />

            {/* Nombre y precio del producto */}
            <h3>{producto.nombre}</h3>

            <p className="precio">${producto.precio.toLocaleString("es-AR")}</p>

            {/* Acciones disponibles para cada producto */}
            <div className="acciones-card">
                {/* Al hacer clic se ejecuta la función de selección recibida por props */}
                <button onClick={() => onSeleccionar(producto)}>Ver Detalle</button>
            </div>
        </div>
    );
}

export default ProductCard;
