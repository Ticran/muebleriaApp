import { useState } from "react";

function Navbar({ cantidadCarrito = 0, onNavegar }) {
    // Estado del menú mobile (hamburguesa)
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Navega a la sección y cierra el menú mobile si está abierto
    function navegarYCerrar(seccion) {
        setMenuAbierto(false);

        if (onNavegar) {
            onNavegar(seccion);
        }
    }

    return (
        <header className="header">
            <div className="contenedor">
                <div className="marca">
                    <a
                        href="#inicio"
                        className="logo"
                        onClick={(e) => {
                            e.preventDefault();
                            navegarYCerrar("inicio");
                        }}
                    >
                        <img src="/imagenes/logo.svg" alt="Logo Hermanos Jota" />
                    </a>

                    <div className="nombre-marca">
                        <h2>Hermanos Jota</h2>
                        <span>Mueblería</span>
                    </div>
                </div>

                <nav className={`menu${menuAbierto ? " menu-abierto" : ""}`} id="menu-principal">
                    <ul>
                        <li>
                            <a
                                href="#inicio"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navegarYCerrar("inicio");
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
                                    navegarYCerrar("catalogo");
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
                                    navegarYCerrar("contacto");
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
                            navegarYCerrar("carrito");
                        }}
                    >
                        <img src="/imagenes/shopping-cart.svg" alt="Carrito de compras" />

                        <span id="carrito-contador">{cantidadCarrito}</span>
                    </a>
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
