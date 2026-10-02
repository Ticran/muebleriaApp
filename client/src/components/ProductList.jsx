import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ onSeleccionarProducto }) {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/productos")
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error("Error al obtener los productos");
                }

                return respuesta.json();
            })
            .then((datos) => {
                setProductos(datos);
                setCargando(false);
            })
            .catch((error) => {
                console.error(error);
                setError("No se pudieron cargar los productos");
                setCargando(false);
            });
    }, []);

    if (cargando) {
        return (
            <section className="catalogo">
                <h1>Cargando productos...</h1>
            </section>
        );
    }

    if (error) {
        return (
            <section className="catalogo">
                <h1>{error}</h1>
            </section>
        );
    }

    return (
        <section className="catalogo">
            <h1>Catálogo</h1>

            <div className="productos-grid">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                        onSeleccionar={onSeleccionarProducto}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;
