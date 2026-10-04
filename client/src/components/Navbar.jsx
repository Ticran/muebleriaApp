function Navbar({ cantidadCarrito = 0, onNavegar }) {
    return (
        <header className="header">
            <div className="contenedor">
                <div className="marca">
                    <a
                        href="#inicio"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();

                            if (onNavegar) {
                                onNavegar("inicio");
                            }
                        }}
                    >
                        <img src="/imagenes/logo.svg" alt="Logo Hermanos Jota" />
                    </a>

                    <div className="nombre-marca">
                        <h2>Hermanos Jota</h2>
                        <span>Mueblería</span>
                    </div>
                </div>

                <nav className="menu">
                    <ul>
                        <li>
                            <a
                                href="#inicio"
                                onClick={(e) => {
                                    e.preventDefault();

                                    if (onNavegar) {
                                        onNavegar("inicio");
                                    }
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

                                    if (onNavegar) {
                                        onNavegar("catalogo");
                                    }
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

                                    if (onNavegar) {
                                        onNavegar("contacto");
                                    }
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
                        onClick={(e) => {
                            e.preventDefault();

                            if (onNavegar) {
                                onNavegar("carrito");
                            }
                        }}
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
