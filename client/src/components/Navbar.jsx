import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ cantidadCarrito = 0 }) {
    // Estado del menú mobile (hamburguesa)
    const [menuAbierto, setMenuAbierto] = useState(false);

    return (
        <header className="header">
            <div className="contenedor">
                <div className="marca">
                    {/* Link permite volver a la página de inicio sin recargar la aplicación */}
                    <Link to="/" className="logo" onClick={() => setMenuAbierto(false)}>
                        <img src="/imagenes/logo.svg" alt="Logo Hermanos Jota" />
                    </Link>

                    <div className="nombre-marca">
                        <h2>Hermanos Jota</h2>
                        <span>Mueblería</span>
                    </div>
                </div>

                {/* Menú de navegación principal */}
                <nav className={`menu${menuAbierto ? " menu-abierto" : ""}`} id="menu-principal">
                    <ul>
                        <li>
                            {/* Link reemplaza la navegación anterior mediante onNavegar */}
                            <Link to="/" onClick={() => setMenuAbierto(false)}>
                                Inicio
                            </Link>
                        </li>

                        <li>
                            <Link to="/productos" onClick={() => setMenuAbierto(false)}>
                                Catálogo
                            </Link>
                        </li>

                        <li>
                            <Link to="/contacto" onClick={() => setMenuAbierto(false)}>
                                Contacto
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Acceso al carrito y contador de productos */}
                <div className="carrito">
                    <Link
                        to="/carrito"
                        id="carrito-link"
                        aria-label="Ver carrito"
                        onClick={() => setMenuAbierto(false)}
                    >
                        <img src="/imagenes/shopping-cart.svg" alt="Carrito de compras" />

                        <span id="carrito-contador">{cantidadCarrito}</span>
                    </Link>
                </div>

                {/* Botón hamburguesa: solo visible en mobile (oculto ≥768px) */}
                <button
                    type="button"
                    className="btn-menu"
                    aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuAbierto}
                    aria-controls="menu-principal"
                    onClick={() => setMenuAbierto((abierto) => !abierto)}
                >
                    <span className="barra"></span>
                    <span className="barra"></span>
                    <span className="barra"></span>
                </button>
            </div>
        </header>
    );
}

export default Navbar;
