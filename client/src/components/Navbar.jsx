function Navbar({ cantidadCarrito = 0, onNavegar }) {
    return (
        <header className="header">
            <div className="contenedor">
                {/* Logo y nombre de la mueblería */}
                <div className="marca">
                    <a
                        href="#catalogo"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();
                            if (onNavegar) onNavegar("catalogo");
                        }}
                    >
                        <img src="/imagenes/logo.svg" alt="Logo Hermanos Jota" />
                    </a>

                    <div className="nombre-marca">
                        <h2>Hermanos Jota</h2>
                        <span>Mueblería</span>
                    </div>
                </div>

                {/* Menú de navegación */}
                <nav className="menu">
                    <ul>
                        <li>
                            <a
                                href="#inicio"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavegar) onNavegar("inicio");
                                }}
                            >
                                Inicio
                            </a>
                        </li>

                        <li>
                            <a
                                href="#catalogo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavegar) onNavegar("catalogo");
                                }}
                            >
                                Catálogo
                            </a>
                        </li>

                        <li>
                            <a
                                href="#contacto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (onNavegar) onNavegar("contacto");
                                }}
                            >
                                Contacto
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="carrito">
                    <a
                        href="#carrito"
                        id="carrito-link"
                        aria-label="Ver carrito"
                        onClick={(e) => e.preventDefault()}
                    >
                        <img src="/imagenes/shopping-cart.svg" alt="Carrito de compras" />
                        <span id="carrito-contador">{cantidadCarrito}</span>
                    </a>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
