function ProductCard({ producto, onSeleccionar }) {
    return (
        <div className="product-card">
            <img src={producto.imagen} alt={producto.nombre} />

            <h3>{producto.nombre}</h3>

            <p className="precio">${producto.precio}</p>

            <button
                onClick={() => {
                    console.log("PRODUCTO:", producto);
                    console.log("FUNCION:", onSeleccionar);
                    onSeleccionar(producto);
                }}
            >
                Ver Detalle
            </button>
        </div>
    );
}

export default ProductCard;
