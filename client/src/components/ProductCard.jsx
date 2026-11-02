import { useNavigate } from "react-router-dom";

function ProductCard({ producto }) {
    const navigate = useNavigate();
    const rutaImagen = producto.imagenUrl ?? producto.imagen ?? "";
    const srcImagen =
        rutaImagen.startsWith("http://") ||
        rutaImagen.startsWith("https://") ||
        rutaImagen.startsWith("/")
            ? rutaImagen
            : `/${rutaImagen}`;

    return (
        <div className="product-card">
            {/* Imagen del producto */}
            <img src={srcImagen} alt={producto.nombre} />

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
