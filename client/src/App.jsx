import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";

function App() {
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);

    function seleccionarProducto(producto) {
        console.log("PRODUCTO SELECCIONADO:", producto);
        setProductoSeleccionado(producto);
    }

    let contenido;

    if (productoSeleccionado) {
        contenido = (
            <ProductDetail
                producto={productoSeleccionado}
                onVolver={() => setProductoSeleccionado(null)}
            />
        );
    } else {
        contenido = <ProductList onSeleccionarProducto={seleccionarProducto} />;
    }

    return (
        <>
            <Navbar />

            <main>{contenido}</main>

            <Footer />
        </>
    );
}

export default App;
