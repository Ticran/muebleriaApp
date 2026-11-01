import { useNavigate } from "react-router-dom";

function ProductCard({ producto }) {
    const navigate = useNavigate();

    return (
        <div className="product-card">
            {/* Imagen del producto */}
            <img src={`/${producto.imagenUrl}`} alt={producto.nombre} />

            {/* Nombre y precio del producto */}
            <h3>{producto.nombre}</h3>

            <p className="precio">${producto.precio.toLocaleString("es-AR")}</p>

            {/* Acciones disponibles para cada producto */}
            <div className="acciones-card">
                <button onClick={() => navigate(`/productos/${producto._id}`)}>Ver Detalle</button>
            </div>
        </div>
    );
}

export default ProductCard;
