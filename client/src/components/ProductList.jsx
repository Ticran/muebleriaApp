/*import productos from "../data/productos";
import ProductCard from "./ProductCard";

function ProductList() {
    function seleccionarProducto(producto) {
        console.log(producto);
    }

    return (
        <div>
            {productos.map((producto) => (
                <ProductCard
                    key={producto.id}
                    producto={producto}
                    onSeleccionar={seleccionarProducto}
                />
            ))}
        </div>
    );
}

export default ProductList;*/
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/api/productos")
            .then((respuesta) => respuesta.json())
            .then((datos) => setProductos(datos));
    }, []);

    function seleccionarProducto(producto) {
        console.log(producto);
    }

    return (
         <section className="catalogo">
            <h1>Catálogo</h1>

            <div className="productos-grid">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                        onSeleccionar={seleccionarProducto}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;