
function Navbar() {
    return (
        <header className="header">
            <div className="contenedor">

                {/* Logo y nombre de la mueblería */}
                <div className="marca">
                    <a href="/" className="logo">
                        <img
                            src="../imagenes/logo.svg"
                            alt="Logo Hermanos Jota"
                        />
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
                            <a href="/">Inicio</a>
                        </li>

                        <li>
                            <a href="/catalogo">Catálogo</a>
                        </li>

                        <li>
                            <a href="/nosotros">Nosotros</a>
                        </li>

                        <li>
                            <a href="/contacto">Contacto</a>
                        </li>
                    </ul>
                </nav>

            </div>
        </header>
    );
}

export default Navbar;

