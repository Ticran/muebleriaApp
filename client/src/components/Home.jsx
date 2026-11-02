import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";

function Home({ productos, cargando = false, error = null }) {
    // Hook de React Router para navegar entre las distintas rutas
    const navigate = useNavigate();

    // Tomamos los primeros 5 productos para la sección de destacados
    const productosDestacados = productos.slice(0, 5);

    return (
        <>
            {/* Sección Hero de presentación */}
            <section className="hero">
                <div className="hero-contenido">
                    <h1>El redescubrimiento de un arte noble</h1>

                    <p>
                        Creamos muebles pensados para trascender el tiempo y acompañar tu vida.
                        Piezas únicas que combinan diseño consciente, manos expertas y materiales
                        nobles.
                    </p>

                    <button className="btn" onClick={() => navigate("/productos")}>
                        Ver Catálogo
                    </button>
                </div>
            </section>

            {/* Sección de productos destacados */}
            <section id="productos-destacados">
                <h2>Productos destacados</h2>

                {cargando ? (
                    <p className="mensaje-carga">Cargando productos...</p>
                ) : error ? (
                    <p className="mensaje-error">{error}</p>
                ) : (
                    <div className="productos-grid">
                        {productosDestacados.map((producto) => (
                            <ProductCard key={producto._id} producto={producto} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}

export default Home;
