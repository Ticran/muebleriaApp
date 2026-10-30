import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";

function ProductList({ productos }) {
    // Estado para almacenar el texto ingresado en el buscador
    const [busqueda, setBusqueda] = useState("");

    // Hook de React Router para navegar hacia el detalle de un producto
    const navigate = useNavigate();

    // Filtramos en tiempo real según lo que escribe el usuario
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <section className="catalogo">
            <h1>Catálogo</h1>

            {/* Buscador en tiempo real */}
            <div className="buscador">
                <label htmlFor="buscador">Buscar producto:</label>
                <input
                    type="text"
                    id="buscador"
                    placeholder="Escribí el nombre de un producto"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
            </div>

            {/* Si no hay coincidencias mostramos el mensaje, si hay mostramos la grilla */}
            {productosFiltrados.length === 0 ? (
                <p className="sin-resultados">
                    No se encontraron productos que coincidan con la búsqueda.
                </p>
            ) : (
                <div className="productos-grid">
                    {productosFiltrados.map((producto) => (
                        <ProductCard
                            key={producto.id}
                            producto={producto}
                            onSeleccionar={() => navigate(`/productos/${producto.id}`)}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

export default ProductList;
