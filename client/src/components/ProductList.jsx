import ProductCard from "./ProductCard";

function ProductList({ productos, onSeleccionarProducto, onAgregar }) {
    //Sacamos el fecth de productos, porque ahora los traemos del estado de productos, de la App.jsx.Asi puede verse en el navegador que los productos estan cargados.
    return (
        <section className="catalogo">
            <h1>Catálogo</h1>

            <div className="productos-grid">
                {productos.map((producto) => (
                    <ProductCard
                        key={producto.id}
                        producto={producto}
                        onSeleccionar={onSeleccionarProducto}
                        onAgregar={onAgregar}
                    />
                ))}
            </div>
        </section>
    );
}

export default ProductList;
